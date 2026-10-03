const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  let file = path.resolve(root, relative);
  if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, process, URL, console }, { filename: file });
  return exports;
}
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { KOKUSHI_PAST_EXAMS } = load('src/data/kokushiPastExams');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { LEARNING_QUESTIONS } = load('src/data/learningQuestionBank');
const { getLearningProgressCatalog } = load('src/data/learningProgressCatalog');
const { questionRevision, updateReviewSchedule, shuffledIndices } = load('src/utils/learningReview');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { generateQuestionsForPoints } = load('src/data/tsubo/quizData');
const sim = load('src/data/simulatorData');
const { PROGRESSIVE_CASES } = load('src/data/progressiveCases');
const { computeNextReview } = load('src/data/tsubo/studyStorage');

const lectureIds = new Set(CURRICULUM_DATA.flatMap(s => s.lectures).map(l => l.id));
assert.equal(Object.keys(CURRICULUM_QUIZZES).length, 81);
assert.equal(LEARNING_QUESTIONS.length, 253);
assert.equal(new Set(LEARNING_QUESTIONS.map(q => q.id)).size, 253);
const progressCatalog = getLearningProgressCatalog();
const publishedCount = CURRICULUM_DATA.flatMap(chapter=>chapter.lectures).length;
assert.equal(progressCatalog.totalPublished, publishedCount);
assert.equal(progressCatalog.questions.length, LEARNING_QUESTIONS.length);
for (const [index, question] of LEARNING_QUESTIONS.entries()) {
  const summary = progressCatalog.questions[index];
  assert.equal(JSON.stringify(Object.keys(summary).sort()), JSON.stringify(['href','id','kind','revision']));
  for (const key of ['id','revision','kind','href']) assert.equal(summary[key], question[key], `${question.id}: ${key}`);
}
for (const q of LEARNING_QUESTIONS) {
  assert(lectureIds.has(q.lectureId), `${q.id}: missing lecture`);
  assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `${q.id}: invalid answer`);
  assert.equal(new Set(q.options).size, q.options.length, `${q.id}: repeated options`);
  assert(q.explanation.length > 10, `${q.id}: missing explanation`);
  const order = shuffledIndices(q.options.length, q.id);
  assert.equal(new Set(order).size, q.options.length);
  assert.equal(order.filter(i => i === q.correctIndex).length, 1);
}
// Known multiple-answer regressions: only one option has the tested relationship/measurement.
const relations = new Set(['酸|苦','苦|甘','甘|辛','辛|鹹','鹹|酸']);
const five = KOKUSHI_PAST_EXAMS.find(q => q.id === 'kokushi-33-toyo-71');
assert.equal(five.options.filter(o => relations.has(o.split('──').map(t => t.trim()).join('|'))).length, 1);
assert(relations.has(five.options[five.correctIndex].split('──').map(t=>t.trim()).join('|')));
const lengths = new Map([['両乳頭の間',8], ['前髪際から後髪際まで',12], ['臍中央から恥骨結合上縁まで',5], ['腋窩横紋前端から肘窩横紋まで',9]]);
const bone = KOKUSHI_PAST_EXAMS.find(q => q.id === 'kokushi-33-keiketsu-82');
assert.equal(bone.options.filter(o => lengths.get(o) === 8).length,1);
assert.equal(lengths.get(bone.options[bone.correctIndex]),8);
for (const position of [0,1,2,3]) assert(KOKUSHI_PAST_EXAMS.some(q => q.correctIndex === position));

const revision = questionRevision('q',['a','b'],0,'explanation');
let schedule = updateReviewSchedule(undefined,true,revision,'2026-10-02');
assert.equal(schedule.nextReviewDate,'2026-10-03');
schedule = updateReviewSchedule(schedule,true,revision,'2026-10-02');
assert.equal(schedule.consecutiveCorrect,1);
schedule = updateReviewSchedule(schedule,true,revision,'2026-10-03');
assert.equal(schedule.nextReviewDate,'2026-10-06');
schedule = updateReviewSchedule(schedule,false,revision,'2026-10-03');
assert.equal(schedule.consecutiveCorrect,0);
assert.equal(schedule.nextReviewDate,'2026-10-04');
schedule = updateReviewSchedule(schedule,true,revision,'2026-10-03');
assert.equal(schedule.consecutiveCorrect,0);
assert.equal(schedule.nextReviewDate,'2026-10-04');
const revised = questionRevision('corrected q',['a','b'],1,'new explanation');
assert.notEqual(revised,revision);
assert.equal(updateReviewSchedule(schedule,true,revised,'2026-10-04').attempts,1);
let acupointReview = computeNextReview(undefined, 'LU1', 'puncture_method', true, '2026-10-02');
acupointReview = computeNextReview(acupointReview, 'LU1', 'puncture_method', true, '2026-10-02');
assert.equal(acupointReview.consecutiveSuccesses, 1);
assert.equal(acupointReview.nextReviewDate, '2026-10-03');
acupointReview = computeNextReview(acupointReview, 'LU1', 'puncture_method', false, '2026-10-03');
assert.equal(acupointReview.consecutiveSuccesses, 0);
assert.equal(acupointReview.nextReviewDate, '2026-10-04');

let generatedCount=0;
for (const skill of ['location_to_name','puncture_method','five_elements_shu','golden_pairs','meridian_of_point','category_of_point','mixed']) {
  const questions = generateQuestionsForPoints(ACUPOINTS_MASTER, skill, undefined, 'regression');
  generatedCount += questions.length;
  for (const q of questions) {
    assert.equal(q.options.length,4, `${q.id}: option count`);
    assert.equal(new Set(q.options.map(o=>o.id)).size,4, `${q.id}: duplicate option IDs`);
    assert.equal(new Set(q.options.map(o=>o.text)).size,4, `${q.id}: duplicate option text`);
    assert.equal(q.options.filter(o=>o.id===q.correctOptionId).length,1, `${q.id}: answer missing`);
    assert(!q.options.some(o=>/適応経穴|他穴の手技例/.test(o.subtext || '')),`${q.id}: answer leak`);
    assert(!q.explanation.includes('穴穴'),`${q.id}: doubled suffix`);
    assert(!q.explanation.includes('。。'),`${q.id}: doubled punctuation`);
    if (q.skill === 'five_elements_shu') assert(ACUPOINTS_MASTER.find(p=>p.code===q.acupointCode).fiveElementsCategory);
    if (q.skill === 'golden_pairs') {
      const p = ACUPOINTS_MASTER.find(p=>p.code===q.acupointCode);
      assert(p.goldenPairs?.some(pair=>pair.partnerCode===q.correctOptionId),`${q.id}: invented pair`);
      assert.equal(q.options.filter(o=>p.goldenPairs?.some(pair=>pair.partnerCode===o.id)).length,1,`${q.id}: multiple registered pairs`);
    }
  }
}
const none = { palpation:'unconfirmed',tempReaction:'unconfirmed',drinking:'unconfirmed',tongue:'unconfirmed' };
const mixed = { palpation:'an_ki',tempReaction:'warm_relief',drinking:'cold_drink',tongue:'red_yellow' };
const result = sim.synthesizeComprehensiveDiagnosis('interior','heat','excess','qizhi','liver','none', mixed);
assert.equal(result.status,'conflict');
assert.equal(result.acupointOptions.length,0);
const reversed = Object.fromEntries(Object.entries(mixed).reverse());
assert.equal(JSON.stringify(result),JSON.stringify(sim.synthesizeComprehensiveDiagnosis('interior','heat','excess','qizhi','liver','none',reversed)));
let scenarios=0;
for (const depth of ['exterior','interior']) for (const temp of ['cold','heat']) for (const state of ['deficiency','excess']) for (const qi of sim.QIXUESHUI_OPTIONS) for (const organ of sim.ZANGFU_OPTIONS) for (const complex of ['none',...sim.COMPLEX_STATE_OPTIONS.map(c=>c.value)]) {
  const args=[depth,temp,state,qi.value,organ.value,complex,none];
  const r=sim.synthesizeComprehensiveDiagnosis(...args);
  assert.notEqual(r.status,'confirmed');
  assert(r.missingInformation.length > 0);
  assert.equal(sim.synthesizeComprehensiveDiagnosis(...args,'red_flags').acupointOptions.length,0);
  for (const pair of r.acupointOptions) for (const point of [pair.primaryAcupoint,pair.secondaryAcupoint]) {
    const master = ACUPOINTS_MASTER.find(p=>p.legacyId===point.id || p.id===point.id);
    assert(master,`unknown ${point.id}`);
    assert.equal(point.name,master.name);
    assert.equal(point.meridian,master.meridian);
    assert(pair.pairName.includes(point.name));
  }
  scenarios++;
}
assert.equal(sim.synthesizeComprehensiveDiagnosis('interior','heat','excess','qini','heart').acupointOptions.length,0);
for (const c of PROGRESSIVE_CASES) {
  assert.equal(c.steps.length,6); assert(lectureIds.has(c.lectureId));
  for (const step of c.steps) { assert.equal(step.options.filter(o=>o.points===2).length,1); assert(step.reveal); }
}
console.log(`Passed: 253 learning questions, ${generatedCount} generated acupoint questions, review intervals/revisions, ${scenarios} simulator combinations and 18 case decisions.`);
