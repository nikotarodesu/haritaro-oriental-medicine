const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative.endsWith('.ts') ? relative : relative + '.ts');
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, Date, Map, Set, console }, { filename: file });
  return exports;
}
const { PROGRESSIVE_CASES } = load('src/data/progressiveCases');
const { CASE_REASONING_RUBRICS } = load('src/data/caseReasoningRubrics');
const { LEARNING_FOCUS, CASE_REASON_FOCUS, learningFocusLectureHref } = load('src/data/learningFocus');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { LEARNING_QUESTION_MAP } = load('src/data/learningQuestionBank');
const { gradeCaseReasoning } = load('src/utils/caseReasoningScore');
const { validCaseLearningRecord, readCaseLearningRecords, getCaseRevision, getCaseStageFocusIds, getCaseLearningNeeds } = load('src/utils/learningFocus');
const lectures = new Map(CURRICULUM_DATA.flatMap(chapter => chapter.lectures).map(lecture => [lecture.id, lecture]));
for (const focus of LEARNING_FOCUS) {
  assert(lectures.has(focus.lectureId), focus.id);
  assert(lectures.get(focus.lectureId).contentMarkdown.includes(focus.heading), focus.id + ' existing heading');
  assert(focus.questionIds.length > 0);
  for (const id of focus.questionIds) assert(LEARNING_QUESTION_MAP.has(id), id);
  assert(learningFocusLectureHref(focus).startsWith('/curriculum/' + focus.lectureId + '?focus='));
}
for (const item of PROGRESSIVE_CASES) {
  assert.equal(CASE_REASON_FOCUS[item.id].length, item.steps.length);
  CASE_REASONING_RUBRICS[item.id].forEach((reasons, index) => {
    assert.equal(Object.keys(CASE_REASON_FOCUS[item.id][index]).sort().join('|'), reasons.map(reason => reason.id).sort().join('|'));
    for (const value of Object.values(CASE_REASON_FOCUS[item.id][index])) assert(LEARNING_FOCUS.some(focus => focus.id === value));
  });
}
function completed(caseId, overrides = {}, answeredAt = '2026-10-03T14:00:00.000Z') {
  const item = PROGRESSIVE_CASES.find(c => c.id === caseId);
  const answers = {}, reasonAnswers = {};
  item.steps.forEach((step, index) => {
    answers[index] = overrides[index]?.choice ?? step.options.findIndex(option => option.points === 2);
    reasonAnswers[index] = overrides[index]?.reasons || CASE_REASONING_RUBRICS[caseId][index].filter(reason => reason.supports).map(reason => reason.id);
  });
  const grades = item.steps.map((step, index) => gradeCaseReasoning(step.options[answers[index]].points, CASE_REASONING_RUBRICS[caseId][index], reasonAnswers[index]));
  return { caseId, revision: getCaseRevision(caseId), answers, reasonAnswers, score: grades.reduce((sum, grade) => sum + grade.total, 0), safetyReviewRequired: grades.some(grade => grade.safetyReviewRequired), answeredAt };
}
for (const item of PROGRESSIVE_CASES) {
  const record = completed(item.id);
  assert(validCaseLearningRecord(record));
  assert.equal(record.score, 36);
  assert.equal(getCaseLearningNeeds({ ['case:' + item.id]: record }).length, 0);
  assert(!validCaseLearningRecord({ ...record, revision: 'obsolete' }));
  assert(!validCaseLearningRecord({ ...record, score: 35 }));
  assert(!validCaseLearningRecord({ ...record, safetyReviewRequired: true }));
  assert(!validCaseLearningRecord({ ...record, answeredAt: 'invalid' }));
  assert(!validCaseLearningRecord({ ...record, answeredAt: '2026-02-30T14:00:00.000Z' }));
  const incomplete = structuredClone(record); delete incomplete.answers[5];
  assert(!validCaseLearningRecord(incomplete));
  const wrongChoice = structuredClone(record); wrongChoice.answers[0] = 999;
  assert(!validCaseLearningRecord(wrongChoice));
  const unknown = structuredClone(record); unknown.reasonAnswers[0] = ['private-free-text'];
  assert(!validCaseLearningRecord(unknown));
  const duplicate = structuredClone(record); duplicate.reasonAnswers[0].push(duplicate.reasonAnswers[0][0]);
  assert(!validCaseLearningRecord(duplicate));
}
const unsafe = completed('back-pain-referral', { 1: { choice: 1, reasons: ['pain-first'] } });
assert(validCaseLearningRecord(unsafe));
const needs = getCaseLearningNeeds({ 'case:back-pain-referral': unsafe, 'case:attempt-1': unsafe });
assert.equal(needs[0].focusId, 'safety-check');
assert(needs[0].safetyReviewRequired);
assert.equal(needs[0].href, '/kokushi?focus=safety-check#learning-focus-review');
assert.equal(readCaseLearningRecords({ 'case:back-pain-referral': unsafe, 'case:attempt-1': unsafe }).length, 1);
const perfectLater = completed('back-pain-referral', {}, '2026-10-03T15:00:00.000Z');
const history = { 'case:back-pain-referral': perfectLater, 'case:attempt-1': unsafe, 'case:attempt-2': perfectLater };
assert.equal(readCaseLearningRecords(history).length, 2);
assert.equal(readCaseLearningRecords(history)[0].score, unsafe.score);
assert.equal(getCaseLearningNeeds(history).length, 0, 'Old mistakes must not override the latest completed attempt');
assert.equal(readCaseLearningRecords(history, 'mixed-temperature').length, 0);
assert.equal(readCaseLearningRecords({ 'settings:reflection:a': unsafe, 'case:unknown': unsafe }).length, 0);
assert.equal(getCaseStageFocusIds('unknown', 0, 0, []).length, 0);
const comparison = completed('mixed-temperature', { 2: { choice: 1, reasons: ['last'] } });
assert(getCaseLearningNeeds({ 'case:mixed-temperature': comparison }).some(need => need.focusId === 'comparison'));
const review = fs.readFileSync(path.join(root, 'src/components/learning/LearningFocusReview.tsx'), 'utf8');
assert(review.includes('learning-focus-review'));
assert(review.includes('LEARNING_QUESTION_MAP'));
assert(review.includes('Suspense'));
const caseUi = fs.readFileSync(path.join(root, 'src/components/learning/ProgressiveCaseTraining.tsx'), 'utf8');
assert(caseUi.includes('教材からたどる考え方'));
assert(caseUi.includes('buildLearningReflectionHref'));
assert(caseUi.includes('setBaseline(latestRecord)'));
console.log('Passed: explicit case focus mappings, existing headings/questions, complete revision-validated case history, deduplication, safety priority, and latest-attempt review needs.');
