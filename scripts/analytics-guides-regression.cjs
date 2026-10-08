/* eslint-disable @typescript-eslint/no-require-imports -- Aggregate analytics regression. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const { generatePublicGuideRoutes } = require('./generate-public-guide-routes.cjs');
const fs = require('node:fs');
const path = require('node:path');
const origin = 'https://www.haritaro.jp';
const calls = [];
const window = { location: { origin, pathname: '/' }, gtag: (...args) => calls.push(args) };
const document = { referrer: origin + '/notes?patient_name=private' };
const load = createDataLoader({ window, document });
const { SYMPTOMS } = load('src/data/symptomData');
const { CLINICAL_COMPLAINTS } = load('src/data/clinicalWorkflow');
const { PUBLIC_SYMPTOM_PATHS, PUBLIC_CLINICAL_GUIDE_PATHS } = load('src/config/publicGuideRoutes');
const { publicAnalyticsPath, analyticsReferrer, trackEvent, trackWebVital } = load('src/utils/analytics');
const routes = [...SYMPTOMS.map(item => '/symptoms/' + item.id), ...CLINICAL_COMPLAINTS.map(item => '/clinical/symptoms/' + item.slug), '/updates'];
assert.equal(PUBLIC_SYMPTOM_PATHS.length, 12);
assert.equal(PUBLIC_CLINICAL_GUIDE_PATHS.length, 6);
assert.equal(fs.readFileSync(path.join(__dirname, '../src/config/publicGuideRoutes.ts'), 'utf8').replace(/\r\n/g, '\n'), generatePublicGuideRoutes(), 'Generated public guide routes stay synchronized');
for (const route of routes) {
  assert.equal(publicAnalyticsPath(route + '?patient_name=private#private-note'), route, route + ': safe page view without URL suffix');
  assert.equal(analyticsReferrer(origin + route + '?q=private', origin), origin + route);
  window.location.pathname = route;
  const before = calls.length;
  trackEvent('context_link_click', { placement: 'guide_navigation', item_type: 'lecture', query: 'private', patient_name: 'private' });
  trackWebVital({ name: 'LCP', value: 1250, rating: 'good', navigationType: 'navigate' }, route);
  assert.equal(calls.length - before, 2, route + ': public event and Web Vital are delivered');
  for (const call of calls.slice(before)) {
    assert.equal(call[0], 'event');
    assert.equal(call[2].page_path, route);
    assert.equal(call[2].page_location, origin + route);
    assert.equal(call[2].page_referrer, '');
    assert(!JSON.stringify(call).includes('private'), route + ': no query, note or patient information');
  }
}
for (const route of ['/notes', '/clinical/workspace', '/auth/login', '/account/subscription', '/symptoms/private-note', '/clinical/symptoms/private-person', '/updates/private']) {
  assert.equal(publicAnalyticsPath(route), null, route + ': unpublished and private routes remain excluded');
  window.location.pathname = route;
  const before = calls.length;
  trackEvent('context_link_click', { placement: 'guide_navigation' });
  trackWebVital({ name: 'LCP', value: 1250, rating: 'good', navigationType: 'navigate' }, '/symptoms/stress-insomnia');
  assert.equal(calls.length, before, route + ': no aggregate transmission from private or unknown routes');
}
console.log('Passed: all 12 symptom guides, 6 clinical guides and updates emit safe aggregate events/Web Vitals; private and unknown routes stay excluded.');
