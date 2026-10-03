import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const propertyId = process.env.GA4_PROPERTY_ID || args.find(value => /^\d+$/.test(value));
const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(root, 'credentials/ga4-key.json');
const output = args.find(value => value.startsWith('--output='))?.slice('--output='.length);
const dryRun = args.includes('--dry-run');
const DAY = 86400000;
const dayBefore = days => new Date(Date.now() - days * DAY).toISOString().slice(0, 10);
// Use completed, equal-length periods and allow Search Console reporting to settle.
const periods = [
  { name: 'current_28_days', startDate: dayBefore(30), endDate: dayBefore(3) },
  { name: 'previous_28_days', startDate: dayBefore(58), endDate: dayBefore(31) },
];
const hostFilter = { filter: { fieldName: 'hostName', stringFilter: { matchType: 'FULL_REGEXP', value: '^(www\\.)?haritaro\\.jp$', caseSensitive: false } } };
const publicFilter = { andGroup: { expressions: [hostFilter, { notExpression: {
  filter: { fieldName: 'pagePath', stringFilter: { matchType: 'FULL_REGEXP', value: '^/(notes|auth|account|api)(/.*)?$', caseSensitive: false } },
} }] } };
const eventNames = [
  'article_view', 'lecture_view', 'quiz_start', 'quiz_answer', 'quiz_complete', 'review_start', 'review_complete',
  'case_training_start', 'case_training_complete', 'context_link_click', 'learning_activity', 'learning_return_7d',
  ...['lcp', 'inp', 'cls'].flatMap(name => ['good', 'needs_improvement', 'poor'].map(rating => `web_vital_${name}_${rating}`)),
];

export function isHaritaroProperty(siteUrl) {
  if (siteUrl === 'sc-domain:haritaro.jp') return true;
  try {
    const url = new URL(siteUrl);
    return ['https:', 'http:'].includes(url.protocol) && ['haritaro.jp', 'www.haritaro.jp'].includes(url.hostname)
      && url.pathname === '/' && !url.search && !url.hash;
  } catch { return false; }
}

function table(response) {
  const dimensions = response.dimensionHeaders?.map(header => header.name) || [];
  const metrics = response.metricHeaders?.map(header => header.name) || [];
  return {
    status: 'ok', hasData: !!response.rows?.length, rowCount: response.rowCount || 0,
    metadata: { timeZone: response.metadata?.timeZone || null, subjectToThresholding: !!response.metadata?.subjectToThresholding, dataLossFromOtherRow: !!response.metadata?.dataLossFromOtherRow },
    rows: (response.rows || []).map(row => Object.fromEntries([
      ...dimensions.map((name, index) => [name, row.dimensionValues?.[index]?.value || '']),
      ...metrics.map((name, index) => [name, Number(row.metricValues?.[index]?.value || 0)]),
    ])),
  };
}

function failed(reason) { return { status: reason, rows: null }; }

async function gaReports() {
  if (!propertyId || !/^\d+$/.test(propertyId)) return failed('property_id_missing');
  if (!fs.existsSync(credentialPath)) return failed('credentials_missing');
  const client = new BetaAnalyticsDataClient({ keyFilename: credentialPath });
  const requests = {
    overview: { metrics: ['activeUsers', 'sessions', 'screenPageViews'].map(name => ({ name })), dimensionFilter: publicFilter },
    pages: { dimensions: [{ name: 'pagePath' }], metrics: ['screenPageViews', 'activeUsers'].map(name => ({ name })), dimensionFilter: publicFilter, orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 100 },
    learningAndPerformance: {
      dimensions: ['eventName', 'deviceCategory'].map(name => ({ name })),
      metrics: ['eventCount', 'totalUsers'].map(name => ({ name })),
      dimensionFilter: { andGroup: { expressions: [publicFilter, { filter: { fieldName: 'eventName', inListFilter: { values: eventNames } } }] } },
      limit: 1000,
    },
  };
  const results = await Promise.allSettled(Object.entries(requests).map(async ([name, request]) => {
    const [response] = await client.runReport({ property: `properties/${propertyId}`, dateRanges: periods, ...request });
    return [name, table(response)];
  }));
  return Object.fromEntries(results.map((result, index) => result.status === 'fulfilled'
    ? result.value : [Object.keys(requests)[index], failed('api_or_permission_error')]));
}

async function gscReports() {
  if (!fs.existsSync(credentialPath)) return failed('credentials_missing');
  const auth = new google.auth.GoogleAuth({ keyFile: credentialPath, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
  const client = google.searchconsole({ version: 'v1', auth });
  try {
    const { data } = await client.sites.list();
    const accessible = (data.siteEntry || []).filter(site => isHaritaroProperty(site.siteUrl) && site.permissionLevel !== 'siteUnverifiedUser');
    const requested = process.env.GSC_SITE_URL;
    if (requested && !isHaritaroProperty(requested)) return failed('site_must_be_haritaro');
    const siteUrl = requested
      ? accessible.find(site => site.siteUrl === requested)?.siteUrl
      : accessible.find(site => site.siteUrl === 'sc-domain:haritaro.jp')?.siteUrl || accessible.find(site => site.siteUrl === 'https://www.haritaro.jp/')?.siteUrl || accessible[0]?.siteUrl;
    if (!siteUrl) return failed('haritaro_property_not_accessible');
    const results = await Promise.allSettled(periods.map(async period => {
      const [summary, pages] = await Promise.all([
        client.searchanalytics.query({ siteUrl, requestBody: { startDate: period.startDate, endDate: period.endDate, dataState: 'final' } }),
        client.searchanalytics.query({ siteUrl, requestBody: { startDate: period.startDate, endDate: period.endDate, dimensions: ['page'], rowLimit: 100, dataState: 'final' } }),
      ]);
      return [period.name, { status: 'ok', hasData: !!summary.data.rows?.length, summary: summary.data.rows?.[0] || null, pages: pages.data.rows || [] }];
    }));
    return { siteUrl, ...Object.fromEntries(results.map((result, index) => result.status === 'fulfilled' ? result.value : [periods[index].name, failed('api_or_permission_error')])) };
  } catch { return failed('api_or_permission_error'); }
}

async function main() {
  const report = {
    generatedAt: new Date().toISOString(), site: 'https://www.haritaro.jp', periods,
    notes: [
      'No private page bodies, account identifiers or typed search queries are collected.',
      'Action counts describe separate events, not a proven same-user conversion funnel.',
      'learning_return_7d is a same-browser calendar-day return signal, not cohort retention.',
      'Web-vital rating counts are field measurements; exact percentiles require raw metric distributions.',
      'Missing setup, permissions and empty results are reported explicitly, never replaced with estimates.',
    ],
  };
  if (dryRun) {
    Object.assign(report, { mode: 'dry_run', ga4HostFilter: hostFilter, credentialsPresent: fs.existsSync(credentialPath), propertyConfigured: !!propertyId && /^\d+$/.test(propertyId), gscConfiguredSiteValid: !process.env.GSC_SITE_URL || isHaritaroProperty(process.env.GSC_SITE_URL) });
  } else {
    const [ga4, gsc] = await Promise.all([gaReports(), gscReports()]);
    Object.assign(report, { ga4, searchConsole: gsc });
  }
  const serialized = JSON.stringify(report, null, 2) + '\n';
  if (output) {
    const destination = path.resolve(output);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, serialized);
    console.log('Growth report saved. Missing data and permissions are included in its status fields.');
  } else console.log(serialized);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(() => { console.error('Growth report could not be generated. Check local configuration and read-only permissions.'); process.exitCode = 1; });
