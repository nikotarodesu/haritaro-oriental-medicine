const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const events = [];
const storage = new Map();
const windowStub = {
  location: { origin: 'https://www.haritaro.jp', pathname: '/curriculum/lecture-yinyang-1', search: '?query=private', hash: '#patient' },
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
};
const exportsStub = {};
const code = ts.transpileModule(fs.readFileSync(path.join(root, 'src/utils/analytics.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
vm.runInNewContext(code, { exports: exportsStub, window: windowStub, document: { referrer: 'https://www.haritaro.jp/notes?patient=private#private' }, URL, console, Date });
const { publicAnalyticsPath, analyticsReferrer, sanitizeAnalyticsParams, learningReturnGap, trackEvent, flushAnalyticsEvents, trackLearningPageView, trackWebVital } = exportsStub;

assert.equal(publicAnalyticsPath('/notes?patient=private'), null);
assert.equal(publicAnalyticsPath('/auth/login#secret'), null);
assert.equal(publicAnalyticsPath('/account/subscription'), null);
assert.equal(publicAnalyticsPath('/api/contact'), null);
assert.equal(publicAnalyticsPath('/unknown/patient-123'), null);
assert.equal(publicAnalyticsPath('/learn/courses/yinyang-foundations?query=private#answer'), '/learn/courses/yinyang-foundations');
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

const ga = fs.readFileSync(path.join(root, 'src/components/GoogleAnalytics.tsx'), 'utf8');
assert(ga.includes('ga-disable-'));
assert(ga.includes('allow_google_signals: false'));
assert(ga.includes('G-XXXXXXXXXX'));
// Evaluate the actual ID guard: the owner's confirmed stream must remain valid.
const idGuard = ga.match(/const validId = (.+);/)[1];
for (const [gaId, expected] of [['G-GC398NZKVE', true], ['G-GE4JNB164V', true], ['553537039', false], ['G-XXXXXXXXXX', false], ['', false], [undefined, false]]) {
  assert.equal(vm.runInNewContext(idGuard, { gaId }), expected);
}
assert(fs.readFileSync(path.join(root, 'src/components/WebVitalsReporter.tsx'), 'utf8').includes('next/web-vitals'));
console.log('Passed: public-route privacy, safe event queue, daily activity, 1–7-day return boundaries, and official Web Vitals values.');
