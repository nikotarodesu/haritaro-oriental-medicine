/* eslint-disable @typescript-eslint/no-require-imports -- Offline regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
const { caseStudyAnswerKey, caseStudyAttemptKey, getCaseStudyProgress } = load('src/utils/caseStudyProgress');
const { KIKEI_VESSELS } = load('src/data/kikeiData');
const { OVERDOSE_PRESETS } = load('src/data/haiketsuData');
const { NEARBY_COMPARISONS } = load('src/data/tsubo/atlas/nearbyComparisons');

let learningValues = {};

function component(file) {
  const source = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(source, /useAuth|AuthModal|useSubscriptionAvailability|\/notes|\/pricing|プレミアム/);
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  const mockComponents = {
    'next/link': ({ href, children }) => React.createElement('a', { href }, children),
    '@/components/design/PageIntro': ({ title, children }) => React.createElement('header', null, title, children),
    '@/components/design/PageArtwork': () => null,
    '@/components/MedicalSafetyNotice': () => null,
    '@/components/cases/CaseStudyResume': () => null,
    '@/components/clinical/ClinicalToolBridge': () => null,
    '@/components/learning/PrescriptionScoringGuide': () => null,
    '@/components/learning/ContentNavigationLink': ({ href, children }) => React.createElement('a', { href }, children),
    '@/components/kikei/KikeiPathwaySvg': () => React.createElement('svg', { 'data-test': 'pathway' }),
    '@/components/kikei/KikeiQuizSection': () => React.createElement('div', { 'data-test': 'quiz' }),
    '@/components/kikei/KikeiEvidenceNote': () => null,
  };
  vm.runInNewContext(js, {
    exports,
    URL,
    require(id) {
      if (id === '@/components/design/PageBreadcrumb') return { __esModule: true, default: component('src/components/design/PageBreadcrumb.tsx') };
      if (id === '@/components/design/PageArtwork') return { PageSymbol: mockComponents[id] };
      if (id === 'next/navigation') return { useSearchParams: () => new URLSearchParams() };
      if (id === '@/utils/analytics') return { trackEvent() {} };
      if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ ready: true, values: learningValues, status: 'local', setEntry() {} }) };
      if (id === './CaseStudyReview') return { __esModule: true, default: component('src/components/cases/CaseStudyReview.tsx') };
      if (mockComponents[id]) return { __esModule: true, default: mockComponents[id] };
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    },
  }, { filename: file });
  return exports.default;
}

const casesIndex = renderToStaticMarkup(React.createElement(component('src/app/cases/page.tsx')));
assert.match(casesIndex, /<nav aria-label="パンくず"[^>]*>.*?href="\/clinical"/);
const CaseViewer = component('src/components/cases/CaseStudyViewer.tsx');
assert.equal(CLINICAL_CASES.length, 20);
assert.equal(CLINICAL_CASES.filter(({ patient }) => typeof patient.historyOfPresentIllness !== 'string').length, 13);
assert.equal(NEARBY_COMPARISONS.length, 7);
for (const group of NEARBY_COMPARISONS) {
  assert(group.points.some(point => point.code === group.question.answerCode), group.id);
}
for (const clinicalCase of CLINICAL_CASES) {
  assert(casesIndex.includes('href="/cases/' + clinicalCase.id + '"'), clinicalCase.id);
  const viewer = React.createElement(CaseViewer, { clinicalCase, reviewResources: { readingHref: '/learn/lectures/assessment-basics' } });
  const html = renderToStaticMarkup(viewer);
  assert(html.includes('href="#case-examination"') && html.includes('id="case-examination"'), clinicalCase.id);
  assert(html.includes('href="#case-reasoning"') && html.includes('id="case-reasoning"'), clinicalCase.id);
  assert(html.includes('aria-label="表示する所見"') && html.includes('aria-pressed="true"'), clinicalCase.id);
  assert(html.includes('id="case-history"'), clinicalCase.id + ': stable link to symptom history');
  assert(!html.includes('class="case-observation-links"'), clinicalCase.id + ': reveal the evidence links with the explanation');
  assert(!html.includes('この症例に出てくるツボの位置と注意点'), clinicalCase.id + ': reveal the point links with the explanation');
  const history = clinicalCase.patient.historyOfPresentIllness;
  if (typeof history === 'string') {
    assert(html.includes(history) && !html.includes('class="case-history-timeline"'), clinicalCase.id + ': keep narrative history where there is no timeline');
  } else {
    assert(html.includes('class="case-history-timeline"'), clinicalCase.id + ': prerender the timeline');
    let priorIndex = -1;
    for (const { when, description } of history.entries) {
      const index = html.indexOf('<strong>' + when + '</strong><p>' + description + '</p>');
      assert(index > priorIndex, clinicalCase.id + ': render every timeline entry in order');
      priorIndex = index;
    }
  }
  assert(!html.includes('id="case-practice-review"'), clinicalCase.id);
  const values = {};
  const steps = clinicalCase.reasoningSteps;
  const last = steps.at(-1);
  values[caseStudyAnswerKey(clinicalCase.id, last.stepNumber)] = { attempt: 'initial', optionId: last.options[0].id, answeredAt: 20 };
  assert.equal(getCaseStudyProgress(values, clinicalCase).complete, false, clinicalCase.id + ': answering only the last step does not complete the case');
  for (const [index, step] of steps.entries()) {
    const option = step.options.find(item => item.isCorrect === (index !== 0));
    values[caseStudyAnswerKey(clinicalCase.id, step.stepNumber)] = { attempt: 'initial', optionId: option.id, answeredAt: 30 };
  }
  assert.equal(getCaseStudyProgress(values, clinicalCase).complete, true, clinicalCase.id);
  learningValues = values;
  const completedHtml = renderToStaticMarkup(viewer);
  assert(completedHtml.includes('id="case-practice-review"') && completedHtml.includes('href="#case-question-1"'), clinicalCase.id);
  assert(!completedHtml.includes('href="#case-question-2"'), clinicalCase.id);
  learningValues = {};
  values[caseStudyAttemptKey(clinicalCase.id)] = 'new-attempt';
  assert.equal(getCaseStudyProgress(values, clinicalCase).answered, 0, clinicalCase.id + ': restarting excludes the previous attempt');
  values[caseStudyAnswerKey(clinicalCase.id, last.stepNumber)] = { attempt: 'new-attempt', optionId: 'unavailable', answeredAt: 40 };
  assert.equal(getCaseStudyProgress(values, clinicalCase).answered, 0, clinicalCase.id + ': stale answer IDs are ignored');
}

const Vessel = component('src/components/kikei/KikeiDetailClient.tsx');
assert.equal(KIKEI_VESSELS.length, 8);
for (const vessel of KIKEI_VESSELS) {
  const html = renderToStaticMarkup(React.createElement(Vessel, { vessel }));
  assert(html.includes('data-test="pathway"') && html.includes('data-test="quiz"'), vessel.slug);
}

const prescription = renderToStaticMarkup(React.createElement(component('src/app/practice/haiketsu/page.tsx')));
assert(prescription.includes('id="haiketsu-palette"') && prescription.includes('8穴'));
assert(prescription.includes('href="#haiketsu-review"') && prescription.includes('id="haiketsu-review"'));
assert(!prescription.includes('readOnly'), 'Both writing controls accept input');
assert(prescription.includes('id="haiketsu-title"') && prescription.includes('id="haiketsu-rationale"'));
for (const preset of OVERDOSE_PRESETS) assert(prescription.includes(preset.name), preset.id);

const install = fs.readFileSync('src/components/pwa/PwaInstallPrompt.tsx', 'utf8');
assert(!install.includes('setTimeout('), 'Installation must not interrupt an initial visit');
assert.match(install, /addEventListener\("haritaro:install-app"/);
console.log('Passed: 20 public case exercises, all eight Kikei diagrams and quizzes, all prescription exercises, and user-requested install guidance.');
