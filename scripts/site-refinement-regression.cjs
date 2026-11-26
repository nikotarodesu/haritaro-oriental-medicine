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
const { CASE_COURSE_READING_HREF, caseReviewLectureHref, caseReviewReturnHref, isReadingFromCaseCourse } = load('src/utils/caseStudyNavigation');
const { KNEE_POINT_COMPARISON_HREF } = load('src/config/acupunctureLearning');
const { CASE_STUDY_DESCRIPTORS, PUBLIC_CASE_STUDY_IDS, getCaseStudyUsingAcupoint } = load('src/data/cases/caseStudyCatalog');
const { ATLAS_LEARNING_PAIRS, getAtlasLearningPair } = load('src/data/tsubo/atlas/learningPairs');
const { ATLAS_STUDY_ROUTES, atlasStudyExercise, KNEE_ATLAS_STUDY_ROUTE } = load('src/data/tsubo/atlas/studyRoutes');
const { KIKEI_VESSELS } = load('src/data/kikeiData');
const { OVERDOSE_PRESETS } = load('src/data/haiketsuData');
const { NEARBY_COMPARISONS } = load('src/data/tsubo/atlas/nearbyComparisons');

let learningValues = {};
let caseCatalogSearch = '';

function component(file, exportName = 'default') {
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
      if (id === 'next/navigation') return { useSearchParams: () => new URLSearchParams(caseCatalogSearch) };
      if (id === '@/components/cases/CaseCatalog') return { __esModule: true, default: component('src/components/cases/CaseCatalog.tsx') };
      if (id === '@/components/cases/CaseCourseComparison') return { __esModule: true, default: component('src/components/cases/CaseCourseComparison.tsx') };
      if (id === '@/components/cases/CaseStudyResume') return { __esModule: true, default: component('src/components/cases/CaseStudyResume.tsx') };
      if (id === '@/utils/analytics') return { trackEvent() {} };
      if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ ready: true, values: learningValues, status: 'local', setEntry() {} }) };
      if (id === './CaseStudyReview') return { __esModule: true, default: component('src/components/cases/CaseStudyReview.tsx') };
      if (id === './CaseQuestionReferences') return { __esModule: true, default: component('src/components/cases/CaseQuestionReferences.tsx'), CaseHistoryContent: component('src/components/cases/CaseQuestionReferences.tsx', 'CaseHistoryContent') };
      if (id === './CaseComplaintFigure') return { __esModule: true, default: component('src/components/cases/CaseComplaintFigure.tsx') };
      if (id === './CaseObservationFigure') return { __esModule: true, default: component('src/components/cases/CaseObservationFigure.tsx') };
      if (mockComponents[id]) return { __esModule: true, default: mockComponents[id] };
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    },
  }, { filename: file });
  return exports[exportName];
}

const casesIndex = renderToStaticMarkup(React.createElement(component('src/app/cases/page.tsx')));
assert.match(casesIndex, /<nav aria-label="パンくず"[^>]*>.*?href="\/clinical"/);
assert.match(casesIndex, /<header[^>]*>.*?頭痛の模擬症例を読む.*?<\/header>/);
assert.equal(casesIndex.split('20件の症例').length - 1, 1, 'The catalog displays the count with the active filters');
assert.doesNotMatch(casesIndex, />症例を読む(?:\s|<)/, 'Catalog cards use their unique titles as link names');
assert.match(casesIndex, /href="#case-comparison"/);
assert.match(casesIndex, /id="case-comparison"[^>]*>.*<table/);
const painChart = casesIndex.match(/<table id="case-pain-course".*?<\/table>/s)?.[0];
assert(painChart, 'Both patients share the same pain scale');
assert.deepEqual(Array.from(painChart.matchAll(/<rect width="(\d+)" height="1"/g), match => Number(match[1])), [6, 6, 3, 3, 3, 6]);
assert.match(casesIndex, /id="case-comparison"[^>]*>.*?<fieldset[^>]*disabled/, 'Comparison choices wait for their client handler and saved answer');
assert(casesIndex.includes('href="' + CASE_COURSE_READING_HREF + '"'));
const comparisonReading = new URL(CASE_COURSE_READING_HREF, 'https://www.haritaro.jp');
assert(isReadingFromCaseCourse(comparisonReading.searchParams));
assert(!isReadingFromCaseCourse(new URLSearchParams('fromExercise=case-comparison&fromExercise=case-comparison')));
assert.equal(comparisonReading.hash, '#part-lecture-treatment-1-section-2');
caseCatalogSearch = 'symptom=fatigue';
const fatigueIndex = renderToStaticMarkup(React.createElement(component('src/app/cases/page.tsx')));
assert(fatigueIndex.includes('aria-pressed="true"') && fatigueIndex.includes('2件の症例'));
assert(fatigueIndex.includes('href="/cases/case-02-fatigue-spleen-deficiency"'));
assert(!fatigueIndex.includes('href="/cases/case-20-bells-palsy"'));
caseCatalogSearch = '';
const CaseViewer = component('src/components/cases/CaseStudyViewer.tsx');
const CaseObservationFigure = component('src/components/cases/CaseObservationFigure.tsx');
assert.equal(CLINICAL_CASES.length, 20);
assert.equal(CASE_STUDY_DESCRIPTORS.length, CLINICAL_CASES.length);
const histories = CLINICAL_CASES.map(({ patient }) => patient.historyOfPresentIllness);
assert.equal(histories.filter(history => typeof history !== 'string' && !('kind' in history)).length, 13);
assert.equal(histories.filter(history => typeof history !== 'string' && 'kind' in history).length, 7);
assert.equal(NEARBY_COMPARISONS.length, 8);
for (const group of NEARBY_COMPARISONS) {
  assert(group.points.some(point => point.code === group.question.answerCode), group.id);
}
for (const clinicalCase of CLINICAL_CASES) {
  assert(casesIndex.includes('href="/cases/' + clinicalCase.id + '"'), clinicalCase.id);
  const readingHref = caseReviewLectureHref('/learn/lectures/assessment-basics#part-lecture-diagnosis-1', clinicalCase.id);
  const readingUrl = new URL(readingHref, 'https://www.haritaro.jp');
  assert.equal(readingUrl.hash, '#part-lecture-diagnosis-1');
  assert.equal(caseReviewReturnHref(readingUrl.searchParams, PUBLIC_CASE_STUDY_IDS), '/cases/' + clinicalCase.id + '#case-practice-review');
  const viewer = React.createElement(CaseViewer, { clinicalCase, reviewResources: { readingHref } });
  const html = renderToStaticMarkup(viewer);
  for (const step of clinicalCase.reasoningSteps) {
    if (step.termNote) assert(html.includes(step.termNote), clinicalCase.id + ' explains the term before answering');
    if (step.studyLink) assert(html.includes('href="' + step.studyLink.href + '"'), clinicalCase.id + ' links to the relevant diagram');
  }
  assert(html.includes('href="#case-examination"') && html.includes('id="case-examination"'), clinicalCase.id);
  assert(html.includes('href="#case-reasoning"') && html.includes('id="case-reasoning"'), clinicalCase.id);
  assert(html.includes('aria-label="表示する所見"') && html.includes('aria-pressed="true"'), clinicalCase.id);
  assert(html.includes('id="case-history"'), clinicalCase.id + ': stable link to symptom history');
  for (const label of ['症状の経過を見返す', '診察の記録を見返す']) {
    assert.equal(html.split(label).length - 1, clinicalCase.reasoningSteps.length, clinicalCase.id + ': references are available at every question');
  }
  assert(!html.includes('class="case-observation-links"'), clinicalCase.id + ': reveal the evidence links with the explanation');
  assert(!html.includes('data-case-observation-figure'), clinicalCase.id + ': keep the observation-to-pattern figure behind the explanation');
  assert(!html.includes('class="clinical-role-figure"'), clinicalCase.id + ': reveal the point links with the explanation');
  const history = clinicalCase.patient.historyOfPresentIllness;
  const historyHtml = html.match(/<section id="case-history"[^>]*>(.*?)<\/section>/)?.[1];
  assert(historyHtml && typeof history !== 'string');
  const findings = 'kind' in history;
  assert(historyHtml.includes(`data-case-history-figure="${findings ? 'findings' : 'timeline'}"`), clinicalCase.id + ': render the correct diagram for the vignette');
  assert.match(historyHtml, /<svg[^>]+aria-hidden="true"/);
  assert.doesNotMatch(historyHtml, /<text\b/);
  assert.equal(historyHtml.split('class="case-history-connector"').length - 1, findings ? 0 : history.entries.length - 1);
  if (!findings) {
    assert(historyHtml.includes('class="case-history-connector-down"') && historyHtml.includes('class="case-history-connector-across"'));
  }
  let priorIndex = -1;
  for (const entry of history.entries) {
    const item = 'label' in entry
      ? `${entry.label}</dt><dd>${entry.description}</dd>`
      : `<strong>${entry.when}</strong><p>${entry.description}</p>`;
    const index = historyHtml.indexOf(item);
    assert(index > priorIndex, clinicalCase.id + ': render every vignette entry in its original order as HTML');
    priorIndex = index;
  }
  if (clinicalCase.caseNumber === 8) {
    assert.match(html, /data-case-complaint-figure="back-leg".*?本人の右.*?ふくらはぎまで.*?実線は引きつるような痛み.*?点線はしびれ/);
  } else if (clinicalCase.caseNumber === 11) {
    assert.match(html, /data-case-complaint-figure="neck-arm".*?本人の右.*?親指まで.*?肩甲骨の内側.*?左右の記載はありません/);
  } else {
    assert(!html.includes('data-case-complaint-figure'));
  }
  const { observations } = clinicalCase.clinicalExplanation;
  if (observations?.length) {
    const diagram = renderToStaticMarkup(React.createElement(CaseObservationFigure, {
      observations,
      pattern: clinicalCase.correctDiagnosis.pattern,
      onExaminationSelect() {},
    }));
    assert.match(diagram, /<svg[^>]+aria-hidden="true"/);
    assert(diagram.includes(clinicalCase.correctDiagnosis.pattern));
    for (const { target, label } of observations) {
      const anchor = ['history', 'complaint'].includes(target) ? target : 'examination-content';
      assert(diagram.includes(label + 'を見る') && diagram.includes(`href="#case-${anchor}"`));
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
  assert(completedHtml.includes('href="' + readingHref + '"'), clinicalCase.id);
  assert(!completedHtml.includes('href="#case-question-2"'), clinicalCase.id);
  learningValues = {};
  values[caseStudyAttemptKey(clinicalCase.id)] = 'new-attempt';
  assert.equal(getCaseStudyProgress(values, clinicalCase).answered, 0, clinicalCase.id + ': restarting excludes the previous attempt');
  values[caseStudyAnswerKey(clinicalCase.id, last.stepNumber)] = { attempt: 'new-attempt', optionId: 'unavailable', answeredAt: 40 };
  assert.equal(getCaseStudyProgress(values, clinicalCase).answered, 0, clinicalCase.id + ': stale answer IDs are ignored');
}
for (const query of ['', 'fromCase=missing', 'fromCase=https%3A%2F%2Fexample.com', 'fromCase=case-01-headache-liver-fire&fromCase=case-01-headache-liver-fire']) {
  assert.equal(caseReviewReturnHref(new URLSearchParams(query), PUBLIC_CASE_STUDY_IDS), undefined, query);
}
const [olderCase, latestCase, finishedCase] = CASE_STUDY_DESCRIPTORS;
for (const [study, steps, answeredAt] of [
  [olderCase, olderCase.reasoningSteps.slice(0, 1), 10],
  [latestCase, latestCase.reasoningSteps.slice(0, 2), 20],
  [finishedCase, finishedCase.reasoningSteps, 30],
]) {
  for (const step of steps) {
    learningValues[caseStudyAnswerKey(study.id, step.stepNumber)] = { attempt: 'initial', optionId: step.options[0].id, answeredAt };
  }
}
const resume = renderToStaticMarkup(React.createElement(component('src/components/cases/CaseStudyResume.tsx'), { studies: CASE_STUDY_DESCRIPTORS }));
assert(resume.includes('href="/cases/' + latestCase.id + '#case-question-3"'), 'Resume opens the first unanswered question in the latest unfinished case');
const resumedIndex = renderToStaticMarkup(React.createElement(component('src/app/cases/page.tsx')));
assert.match(resumedIndex, /<header[^>]*>.*?続きから解く.*?<\/header>/);
assert(!resumedIndex.includes('頭痛の模擬症例を読む'), 'The resume action replaces the introductory action');
learningValues = {};
assert.equal(getCaseStudyUsingAcupoint('pc6')?.id, 'case-05-insomnia-heart-kidney');
assert.equal(getCaseStudyUsingAcupoint('LI4')?.id, 'case-11-cervicobrachial-syndrome');
assert.equal(getCaseStudyUsingAcupoint('missing'), undefined);
for (const route of ATLAS_STUDY_ROUTES) {
  const study = CLINICAL_CASES.find(item => item.id === route.caseId);
  const step = study.reasoningSteps.find(item => item.stepTitle === route.stepTitle);
  assert.equal(atlasStudyExercise(route).href, '/cases/' + study.id + '#case-question-' + step.stepNumber);
}
assert.equal(atlasStudyExercise(ATLAS_STUDY_ROUTES.find(route => route.codes.includes('PC6'))).href, '/cases/case-06-gerd-liver-stomach#case-question-4');
const kneeCase = CLINICAL_CASES.find(study => study.id === KNEE_ATLAS_STUDY_ROUTE.caseId);
assert.equal(kneeCase.reasoningSteps.find(step => step.stepTitle === KNEE_ATLAS_STUDY_ROUTE.stepTitle).studyLink.href, KNEE_POINT_COMPARISON_HREF);
for (const pair of ATLAS_LEARNING_PAIRS) {
  assert(PUBLIC_CASE_STUDY_IDS.includes(pair.caseId), pair.caseId);
  assert.equal(getAtlasLearningPair(pair.codes), pair);
  assert.equal(getAtlasLearningPair([...pair.codes].reverse()), pair);
  assert.equal(getAtlasLearningPair([...pair.codes, 'PC7']), undefined);
}

const Vessel = component('src/components/kikei/KikeiDetailClient.tsx');
assert.equal(KIKEI_VESSELS.length, 8);
for (const vessel of KIKEI_VESSELS) {
  const html = renderToStaticMarkup(React.createElement(Vessel, { vessel }));
  assert(html.includes('data-test="pathway"') && html.includes('data-test="quiz"'), vessel.slug);
}

const prescription = renderToStaticMarkup(React.createElement(component('src/app/practice/haiketsu/page.tsx')));
assert(prescription.includes('id="haiketsu-palette"') && prescription.includes('例として2穴を選択済み（合谷・太衝）'));
assert(prescription.includes('最初から選ぶ'));
assert(prescription.includes('href="#haiketsu-review"') && prescription.includes('id="haiketsu-review"'));
assert.equal(prescription.split('href="#haiketsu-review"').length - 1, 1);
assert(!prescription.includes('class="clinical-role-points"'), 'The role figure shows counts while the selected list shows point names');
assert(!prescription.includes('readOnly'), 'Both writing controls accept input');
assert(prescription.includes('id="haiketsu-title"') && prescription.includes('id="haiketsu-rationale"'));
for (const preset of OVERDOSE_PRESETS) assert(prescription.includes(preset.name), preset.id);

const install = fs.readFileSync('src/components/pwa/PwaInstallPrompt.tsx', 'utf8');
assert(!install.includes('setTimeout('), 'Installation must not interrupt an initial visit');
assert.match(install, /addEventListener\("haritaro:install-app"/);
console.log('Passed: 20 public case exercises, all eight Kikei diagrams and quizzes, all prescription exercises, and user-requested install guidance.');
