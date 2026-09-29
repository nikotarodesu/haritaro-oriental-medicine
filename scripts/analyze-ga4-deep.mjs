import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propertyId = '553537039';
const keyFilePath = path.resolve(__dirname, '../credentials/ga4-key.json');

const client = new BetaAnalyticsDataClient({ keyFilename: keyFilePath });

async function deepAnalyze() {
  console.log('=== GA4 深層データ分析開始 ===\n');

  // 1. デバイス別比率（モバイル vs PC）
  const [deviceRes] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
  });
  console.log('【1. デバイス別比率】');
  deviceRes.rows?.forEach(r => {
    console.log(`  ${r.dimensionValues[0].value}: ユーザー ${r.metricValues[0].value}名, セッション ${r.metricValues[1].value}, PV ${r.metricValues[2].value}`);
  });

  // 2. イベント別発生数（ユーザーの行動）
  const [eventRes] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 20,
  });
  console.log('\n【2. 主要イベント発生数】');
  eventRes.rows?.forEach(r => {
    console.log(`  ${r.dimensionValues[0].value}: ${r.metricValues[0].value}回 (ユーザー: ${r.metricValues[1].value}名)`);
  });

  // 3. ページ別のエンゲージメント率と直帰率（全ページ）
  const [pageEngageRes] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 25,
  });
  console.log('\n【3. ページ別エンゲージメント・直帰率 Top 25】');
  pageEngageRes.rows?.forEach(r => {
    const pvs = r.metricValues[0].value;
    const users = r.metricValues[1].value;
    const dur = Math.round(parseFloat(r.metricValues[2].value));
    const bounce = (parseFloat(r.metricValues[3].value) * 100).toFixed(1);
    console.log(`  ${r.dimensionValues[0].value} -> PV: ${pvs}, 滞在: ${dur}s, 直帰率: ${bounce}%`);
  });
}

deepAnalyze().catch(console.error);
