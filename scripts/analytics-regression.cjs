/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS analytics regression harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
process.env.NEXT_PUBLIC_GA_ID='G-HARITARO123';
const events = [];
const storage = new Map();
const windowStub = {
  location: { origin: 'https://www.haritaro.jp', pathname: '/curriculum/lecture-yinyang-1', search: '?query=private', hash: '#patient' },
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
  sessionStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
};
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader({ window: windowStub, document: { referrer: 'https://www.haritaro.jp/notes?patient=private#private' }, URL, console, Date, setTimeout, clearTimeout });
const analytics = load('src/utils/analytics');
const { publicAnalyticsPath, analyticsDocumentPath, analyticsReferrer, sanitizeAnalyticsParams, learningReturnGap, trackEvent, trackPublicNavigationAction, trackAtlasDisclosure, flushAnalyticsEvents, trackLearningPageView, trackWebVital, trackSubscriptionStep, trackSubscriptionPurchase } = analytics;

(async()=>{
assert.equal(publicAnalyticsPath('/notes?patient=private'), null);
assert.equal(publicAnalyticsPath('/auth/login#secret'), null);
assert.equal(publicAnalyticsPath('/account/subscription'), null);
assert.equal(publicAnalyticsPath('/api/contact'), null);
assert.equal(publicAnalyticsPath('/unknown/patient-123'), null);
assert.equal(publicAnalyticsPath('/learn/courses/yinyang-foundations?query=private#answer'), '/learn/courses/yinyang-foundations');
assert.equal(analyticsDocumentPath('/search', false), '/search', 'The bare search landing page can be measured');
assert.equal(analyticsDocumentPath('/search', true), null, 'Query-bearing results are outside Google tag initialization');
assert.equal(analyticsDocumentPath('/tsubo', true), null, 'The atlas search also accepts private search text');
assert.equal(analyticsDocumentPath('/tsubo/pairs', true), null, 'Pair filters also accept search text');
assert.equal(analyticsDocumentPath('/tsubo/extra-points/yintang', false), '/tsubo/extra-points/yintang');
assert.equal(analyticsDocumentPath('/tsubo/extra-points/taiyang', false), '/tsubo/extra-points/taiyang');
assert.equal(analyticsDocumentPath('/tsubo/extra-points/yintang', true), null);
assert.equal(publicAnalyticsPath('/tsubo/extra-points/private-details'), null);
assert.equal(analyticsReferrer(windowStub.location.origin + '/search?q=private', windowStub.location.origin), windowStub.location.origin + '/search');
assert.equal(analyticsReferrer('https://external.example/private-patient?query=private#private', windowStub.location.origin), 'https://external.example');
assert.equal(analyticsReferrer('https://www.haritaro.jp/notes?patient=private', windowStub.location.origin), '');
assert.equal(analyticsReferrer('https://www.haritaro.jp/articles/example?query=private', windowStub.location.origin), 'https://www.haritaro.jp/articles/example');
assert.equal(learningReturnGap('2026-10-01', '2026-10-02'), 1);
assert.equal(learningReturnGap('2026-10-01', '2026-10-08'), 7);
for (const previous of ['2026-10-02', '2026-09-24', '2026-10-03', '2026-02-30', 'private']) assert.equal(learningReturnGap(previous, '2026-10-02'), null);
const safe = sanitizeAnalyticsParams({ course_id: 'yinyang-foundations', lecture_id: 'lecture-yinyang-1', score: 2, total: 3, passed: true, metric_value: 0.05, return_gap_days: 8, query: 'private', answers: 'private', patient_name: 'private', note: 'private', user_id: 'private' });
assert.deepEqual(Object.keys(safe).sort(), ['course_id', 'lecture_id', 'metric_value', 'passed', 'score', 'total']);
assert.equal(sanitizeAnalyticsParams({ course_id: 'patient-123' }).course_id, undefined);

// Early actions retain only sanitized parameters until the Google tag is ready.
trackEvent('search_submit', { placement: 'hero_quick_search', query: 'private' });
windowStub.gtag = (command, name, params) => events.push({ command, name, params });
flushAnalyticsEvents();
assert.equal(events[0].name, 'search_submit');
assert.equal(events[0].params.query, undefined);
assert.equal(events[0].params.page_location, 'https://www.haritaro.jp/curriculum/lecture-yinyang-1');
assert.equal(events[0].params.page_referrer, '');
assert.equal(events[0].params.send_to,'G-HARITARO123');
const previous = new Date(); previous.setDate(previous.getDate() - 1);
storage.set('haritaro:analytics:learning-day:v1', `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, '0')}-${String(previous.getDate()).padStart(2, '0')}`);
trackEvent('quiz_start', { lecture_id: 'lecture-yinyang-1' });
trackEvent('quiz_answer', { lecture_id: 'lecture-yinyang-1', passed: true, answers: 'private' });
trackEvent('quiz_complete', { lecture_id: 'lecture-yinyang-1', total: 3, score: 2 });
assert.equal(events.filter(event => event.name === 'learning_activity').length, 1);
assert.equal(events.filter(event => event.name === 'learning_return_7d').length, 1);
assert.equal(events.find(event => event.name === 'learning_return_7d').params.return_gap_days, 1);
trackLearningPageView('/curriculum/lecture-yinyang-1');
trackWebVital({ name: 'CLS', value: 0.05, rating: 'good', navigationType: 'navigate' }, '/curriculum/lecture-yinyang-1?patient=private');
assert.equal(events.at(-1).name, 'web_vital_cls_good');
assert.equal(events.at(-1).params.value, 50);
assert.equal(events.at(-1).params.metric_value, 0.05);
const count = events.length;
trackWebVital({ name: 'INP', value: NaN, rating: 'good', navigationType: 'navigate' }, '/');
windowStub.location.pathname = '/notes';
trackEvent('note_save_success', { destination_type: 'note' });
trackWebVital({ name: 'INP', value: 100, rating: 'good', navigationType: 'navigate' }, '/');
assert.equal(events.length, count);
assert(!JSON.stringify(events).includes('private'));

for (const [pathname, action, eventName, placement] of [
  ['/', 'home_atlas', 'home_series_open', 'atlas'],
  ['/', 'home_reading', 'home_series_open', 'reading'],
  ['/', 'home_clinical', 'home_series_open', 'clinical'],
  ['/tsubo/li4', 'atlas_compare', 'atlas_compare_open', 'atlas_location'],
  ['/tsubo/compare', 'compare_case', 'compare_case_open', 'compare_result'],
  ['/tsubo/compare', 'compare_atlas', 'compare_atlas_open', 'point_detail'],
  ['/learn/acupuncture/research/urinary-incontinence', 'topic_source', 'research_source_open', 'research_article'],
  ['/tsubo/st36', 'atlas_source', 'research_source_open', 'atlas'],
  ['/diagnosis', 'gorou_examples', 'gorou_examples_open', 'rest_examples'],
]) {
  windowStub.location.pathname = pathname;
  const before = events.length;
  trackPublicNavigationAction(action);
  assert.equal(events.length, before + 1, action);
  assert.equal(events.at(-1).name, eventName);
  assert.deepEqual(Object.keys(events.at(-1).params).sort(), ['page_location', 'page_path', 'page_referrer', 'placement', 'send_to']);
  assert.equal(events.at(-1).params.placement, placement);
  assert.equal(events.at(-1).params.page_location, windowStub.location.origin + pathname);
}
windowStub.location.pathname = '/tsubo/st36';
trackEvent('atlas_location_check_start', { placement: 'nearby_diagram', answer: 'private' });
assert.equal(events.at(-1).name, 'atlas_location_check_start');
assert.deepEqual(Object.keys(events.at(-1).params).sort(), ['page_location', 'page_path', 'page_referrer', 'placement', 'send_to']);
windowStub.location.pathname = '/cases/case-01-headache-liver-fire';
trackEvent('case_study_start', { placement: 'case_study', answers: 'private', patient_name: 'private' });
assert.equal(events.at(-1).name, 'case_study_start');
assert.deepEqual(Object.keys(events.at(-1).params).sort(), ['page_location', 'page_path', 'page_referrer', 'placement', 'send_to']);
assert.equal(events.at(-1).params.page_location, windowStub.location.origin + windowStub.location.pathname);
trackEvent('case_study_complete', { placement: 'case_study', answers: 'private' });
assert.equal(events.at(-1).name, 'case_study_complete');
assert.deepEqual(Object.keys(events.at(-1).params).sort(), ['page_location', 'page_path', 'page_referrer', 'placement', 'send_to']);
const beforeBadRead = events.length;
trackPublicNavigationAction('atlas_compare');
trackPublicNavigationAction('compare_case');
windowStub.location.pathname = '/diagnosis';
trackPublicNavigationAction('home_reading'); // The identifier is not valid on the Gorou route.
trackPublicNavigationAction('__proto__');
trackPublicNavigationAction('https://example.net/doi-private');
windowStub.location.pathname = '/learn/acupuncture/research/private-draft';
trackPublicNavigationAction('topic_source');
windowStub.location.pathname = '/search';
trackEvent('search_result_click', { placement: 'site_search_results', query: 'private' });
trackWebVital({ name: 'LCP', value: 100, rating: 'good', navigationType: 'navigate' }, '/search');
windowStub.location.pathname = '/tsubo';
trackEvent('search_result_click', { placement: 'atlas_search_results', query: 'private' });
assert.equal(events.length, beforeBadRead, 'Unexpected actions and search-result routes send no telemetry');
assert(!JSON.stringify(events).includes('private'));

const diagram = { kind: 'regional' };
windowStub.location.search = '';
for (const pathname of ['/tsubo/st37', '/tsubo/extra-points/yintang']) {
  windowStub.location.pathname = pathname;
  trackAtlasDisclosure(diagram, 'private');
  assert.equal(events.at(-1).name, 'atlas_anatomy_open');
  assert.equal(events.at(-1).params.content_type, 'atlas_anatomy_regional');
  assert.equal(events.at(-1).params.page_path, pathname);
  assert.equal(events.at(-1).params.page_referrer, '');
  assert.equal(events.at(-1).params.content_id, undefined);
}
const atlasCount = events.length;
for (const pathname of ['/tsubo/st99', '/tsubo/compare', '/tsubo/extra-points/private-details', '/notes']) {
  windowStub.location.pathname = pathname;
  trackAtlasDisclosure(diagram);
}
windowStub.location.pathname = '/tsubo/st37';
windowStub.location.search = '?private=input';
trackAtlasDisclosure(diagram);
assert.equal(events.length, atlasCount, 'Unknown, non-point, private, and query-bearing URLs send no atlas disclosure events');
windowStub.location.search = '';

// Run the actual disclosure effect with browser event targets and a fake tag.
const detailsPath = path.join(root, 'src/components/common/HashTargetDetails.tsx');
const detailsCode = ts.transpileModule(fs.readFileSync(detailsPath, 'utf8'), { compilerOptions: {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.CommonJS,
  jsx: ts.JsxEmit.ReactJSX,
} }).outputText;
const research = { kind: 'research', studyIds: ['postoperative-nausea', 'insomnia-review'] };
const detailsListeners = new Map();
const hashListeners = new Map();
const studyElements = new Map([...research.studyIds, 'unknown-private'].map(id => [id, { id, scrollIntoView() {} }]));
const detailsNode = {
  open: false,
  contains: element => studyElements.get(element.id) === element,
  addEventListener: (type, fn) => detailsListeners.set(type, fn),
  removeEventListener: type => detailsListeners.delete(type),
};
const detailsWindow = {
  location: windowStub.location,
  addEventListener: (type, fn) => hashListeners.set(type, fn),
  removeEventListener: type => hashListeners.delete(type),
};
const detailsExports = {};
let cleanup;
vm.runInNewContext(detailsCode, {
  exports: detailsExports,
  window: detailsWindow,
  document: { getElementById: id => studyElements.get(id) ?? null },
  require(id) {
    if (id === '@/utils/analytics') return analytics;
    if (id === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
    if (id === 'react') return {
      useRef: current => ({ current: current === null ? detailsNode : current }),
      useEffect: effect => { cleanup = effect(); },
    };
    throw new Error('Unexpected disclosure dependency: ' + id);
  },
}, { filename: detailsPath });
windowStub.location.pathname = '/tsubo/pc6';
windowStub.location.hash = '';
detailsExports.default({ analytics: research, summary: '研究' });
assert.equal(events.length, atlasCount, 'A collapsed disclosure sends nothing on mount');
const toggle = () => detailsListeners.get('toggle')({ target: detailsNode });
detailsNode.open = true;
toggle();
assert.equal(events.at(-1).params.content_type, 'atlas_research_list');
assert.equal(events.length, atlasCount + 1);
detailsNode.open = false;
toggle();
assert.equal(events.length, atlasCount + 1, 'Closing the research list sends nothing');
const goToStudy = id => {
  windowStub.location.hash = '#' + id;
  hashListeners.get('hashchange')();
};
goToStudy(research.studyIds[0]);
assert(detailsNode.open, 'A direct research link still opens its disclosure');
toggle();
assert.equal(events.length, atlasCount + 2, 'Hash opening and its native toggle count once');
assert.equal(events.at(-1).name, 'atlas_research_open');
assert.equal(events.at(-1).params.content_type, 'atlas_research_topic');
assert.equal(events.at(-1).params.content_id, research.studyIds[0]);
assert.equal(events.at(-1).params.page_location, windowStub.location.origin + '/tsubo/pc6');
goToStudy('unknown-private');
assert.equal(events.length, atlasCount + 2, 'An arbitrary fragment cannot become a research topic');
goToStudy(research.studyIds[1]);
detailsListeners.get('toggle')({ target: { open: true } });
assert.equal(events.length, atlasCount + 3, 'Opening a different published result counts once while the list is open');
assert.equal(events.at(-1).params.content_id, research.studyIds[1]);
cleanup();
assert.equal(detailsListeners.size + hashListeners.size, 0);
const firstRenderCount = events.length;
detailsExports.default({ analytics: research, summary: '研究' });
assert.equal(events.length, firstRenderCount + 1, 'A deep link revealed by the browser before hydration still records once');
toggle();
assert.equal(events.length, firstRenderCount + 1, 'A hydration-time native toggle must not double count');
cleanup();
assert(!JSON.stringify(events).includes('private'));
windowStub.location.hash = '';

windowStub.location.pathname='/pricing';
trackSubscriptionStep('upgrade_click','monthly');trackSubscriptionStep('checkout_login_required','monthly');trackSubscriptionStep('begin_checkout','yearly');
const checkoutEvent=events.at(-1);assert.equal(checkoutEvent.name,'begin_checkout');assert.equal(checkoutEvent.params.currency,'JPY');assert.equal(checkoutEvent.params.value,9800);assert.equal(checkoutEvent.params.items[0].item_id,'haritaro_premium_yearly');
trackSubscriptionStep('checkout_error','monthly','network_error');assert.equal(events.at(-1).params.method,'network_error');
windowStub.location.pathname='/checkout/complete';
const purchase={transactionId:'ht_'+'a'.repeat(64),plan:'monthly',value:980,currency:'JPY'};
assert.equal(trackSubscriptionPurchase(purchase),true);assert.equal(trackSubscriptionPurchase(purchase),false);
assert.equal(events.at(-1).name,'purchase');assert.equal(events.at(-1).params.items[0].price,980);assert.equal(events.at(-1).params.page_location,'https://www.haritaro.jp/checkout/complete');
assert(!JSON.stringify(events).includes('private'));
const beforeInvalid=events.length;
assert.equal(trackSubscriptionPurchase({...purchase,transactionId:'cs_live_secret'}),false);assert.equal(trackSubscriptionPurchase({...purchase,value:Infinity}),false);
assert.equal(events.length,beforeInvalid);
delete windowStub.gtag;
const queuedPurchase={...purchase,transactionId:'ht_'+'b'.repeat(64)};
assert.equal(trackSubscriptionPurchase(queuedPurchase),true);assert.equal(trackSubscriptionPurchase(queuedPurchase),false);
windowStub.gtag=(command,name,params)=>events.push({command,name,params});flushAnalyticsEvents();
assert.equal(events.filter(e=>e.name==='purchase'&&e.params.transaction_id===queuedPurchase.transactionId).length,1);
windowStub.location.pathname='/account/subscription';
assert.equal(trackSubscriptionPurchase({...purchase,transactionId:'ht_'+'c'.repeat(64)}),false);
const beforePrivateBilling=events.length;trackSubscriptionStep('begin_checkout','monthly');assert.equal(events.length,beforePrivateBilling);
windowStub.location.pathname='/pricing';
let navigationDeadline;
await Promise.race([
  trackSubscriptionStep('begin_checkout','monthly'),
  new Promise((_,reject)=>{navigationDeadline=setTimeout(()=>reject(new Error('Blocked analytics must not stall payment navigation')),5000);}),
]).finally(()=>clearTimeout(navigationDeadline));

const ga = fs.readFileSync(path.join(root, 'src/components/GoogleAnalytics.tsx'), 'utf8');
assert(ga.includes('ga-disable-'));
assert(ga.includes('safePath && ready && <Script'));
const init = ga.match(/dangerouslySetInnerHTML=\{\{ __html: `([\s\S]*?)` \}\}/)[1]
  .replace(/\$\{gaId\}/g, 'G-GC398NZKVE').replace(/\$\{JSON.stringify\(safePath\)\}/g, '"/pricing"');
const bootWindow = { location: { origin: 'https://www.haritaro.jp' } };
vm.runInNewContext(init, { window: bootWindow, dataLayer: [], Date });
assert.equal(bootWindow['ga-disable-G-GE4JNB164V'], true);
assert.equal(bootWindow['ga-disable-G-GC398NZKVE'], undefined);
assert(ga.includes('allow_google_signals: false'));
assert(ga.includes('analyticsDocumentPath(pathname, Boolean(searchParams?.size))'));
assert(ga.includes('getAttribute("data-analytics-action")'));
assert(!ga.includes('link_url'));
assert(fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8').includes('<Suspense fallback={null}><GoogleAnalytics /></Suspense>'));
assert(ga.includes('G-XXXXXXXXXX'));
// Evaluate the actual ID guard: the owner's confirmed stream must remain valid.
const idGuard = ga.match(/const validId = (.+);/)[1];
for (const [gaId, expected] of [['G-GC398NZKVE', true], ['G-GE4JNB164V', true], ['553537039', false], ['G-XXXXXXXXXX', false], ['', false], [undefined, false]]) {
  assert.equal(vm.runInNewContext(idGuard, { gaId }), expected);
}
assert(fs.readFileSync(path.join(root, 'src/components/WebVitalsReporter.tsx'), 'utf8').includes('next/web-vitals'));
console.log('Passed: public-route privacy, atlas disclosure and research-anchor events, safe event queue, daily activity, 1–7-day return boundaries, and official Web Vitals values.');
})().catch(error=>{console.error(error);process.exitCode=1;});
