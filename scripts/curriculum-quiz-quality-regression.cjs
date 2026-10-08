/* eslint-disable @typescript-eslint/no-require-imports */
// Structural and editorial safety guards for the audited latter 48 lessons.
// These checks catch known regressions; they do not certify clinical validity or
// substitute for a human review of the single best answer and distractors.
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { questionRevision, updateReviewSchedule } = load('src/utils/learningReview');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const auditedSeries = ['pathomechanism', 'diagnosis', 'treatment', 'practice'];
const ids = new Set();
const prohibitedClaims = [
  /根本的な治癒と再発予防.{0,8}可能/,
  /根本治療を完結させ/,
  /治療効果を飛躍的に高め/,
  /深い介入が必要/,
  /陽気を絶滅させ/,
  /痛みを半減させて可動域を確保/,
  /手関節の崑崙/,
  /前回の刺激量が患者の許容閾値を超えていた/,
  /気滞上逆.{0,20}自律神経の/,
];
// Physically impossible distractors let learners answer without understanding.
const absurdDistractors = /不老不死|新品の身体|マッチョ|風速計|致死率100%|骨密度が瞬時に10倍/;

for (const series of auditedSeries) {
  const lessons = lectures.filter(lecture => lecture.seriesId === series);
  assert.equal(lessons.length, 12, `${series}: all 12 lessons are covered`);
  for (const lecture of lessons) {
    const quiz = CURRICULUM_QUIZZES[lecture.id];
    assert.ok(quiz, `${lecture.id}: quiz exists`);
    assert.equal(quiz.questions.length, 3, `${lecture.id}: exactly 3 questions`);
    const headings = new Set(lecture.contentMarkdown.split('\n')
      .filter(line => /^#{2,4}\s+/.test(line))
      .map(line => line.replace(/^#{2,4}\s+/, '').trim()));
    for (const [index, question] of quiz.questions.entries()) {
      assert.equal(question.id, `${lecture.id}-q${index + 1}`, 'stable question IDs');
      assert.ok(!ids.has(question.id), `${question.id}: unique ID`);
      ids.add(question.id);
      assert.equal(question.options.length, 3);
      assert.equal(new Set(question.options.map(option => option.trim())).size, 3, `${question.id}: distinct choices`);
      assert.ok(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 3);
      const correct = question.options[question.correctIndex];
      assert.ok(!/(?:、|を|として|論理的に)$/.test(correct), `${question.id}: no unfinished answer`);
      if (question.relatedSectionTitle) {
        assert.ok(headings.has(question.relatedSectionTitle), `${question.id}: real source section`);
      }
      const asserted = `${correct}\n${question.explanation}`;
      for (const prohibited of prohibitedClaims) {
        assert.ok(!prohibited.test(asserted), `${question.id}: no unsupported categorical claim: ${prohibited}`);
      }
      assert.ok(!question.options.some(option => absurdDistractors.test(option)), `${question.id}: substantive distractors`);
      // Stable IDs must not retain mastery after a materially revised explanation.
      const revision = questionRevision(question.question, question.options, question.correctIndex, question.explanation);
      const oldRevision = questionRevision(question.question, question.options, question.correctIndex, `${question.explanation}旧版`);
      assert.notEqual(revision, oldRevision);
      const revised = updateReviewSchedule({ revision: oldRevision, consecutiveCorrect: 5, attempts: 9, mistakes: 2 }, true, revision, '2026-10-08');
      assert.equal(revised.consecutiveCorrect, 1);
      assert.equal(revised.attempts, 1);
    }
  }
}
assert.equal(ids.size, 144);
// Protect the specific body/question mismatches found in this audit.
for (const number of [2, 3, 4, 5, 7, 8, 9, 10, 11]) {
  const lecture = lectures.find(item => item.id === `lecture-lifedynamics-${number}`);
  for (const question of CURRICULUM_QUIZZES[lecture.id].questions) {
    assert.ok(question.relatedSectionTitle && lecture.contentMarkdown.split('\n').some(line => line.replace(/^#{2,4}\s+/, '') === question.relatedSectionTitle), `${question.id}: revised life question returns to its taught concept`);
  }
}
const bodyGuards = {
  'lecture-pathomechanism-10': /復元力は必ず|まず標.{0,50}応急処置で取り除き/,
  'lecture-diagnosis-5': /数時間や数日では変化しません/,
  'lecture-diagnosis-8': /存在することはほぼ確実|決定打となるキラーサイン/,
  'lecture-treatment-8': /全身の痛覚伝達をブロックする|現代解剖学的に証明されています|遠隔.{0,15}上の手である/,
  'lecture-practice-8': /血流が一気に良くなるため|一番の原因は/,
  'lecture-practice-10': /方向性は合致|本治は着実に前進/,
  'lecture-practice-11': /鎮痛薬の服薬ゼロ/,
};
for (const [id, unsupported] of Object.entries(bodyGuards)) {
  assert.ok(!unsupported.test(lectures.find(lecture => lecture.id === id).contentMarkdown), `${id}: no known unsupported body claim`);
}
assert.ok(!CURRICULUM_QUIZZES['lecture-yinyang-5'].questions[1].options.some(option => /純金/.test(option)), 'yin/yang distractors test the taught roles');
console.log('Passed: 48 lessons / 144 questions, stable IDs, distinct choices, source anchors, known safety regressions and revised-review reset.');
