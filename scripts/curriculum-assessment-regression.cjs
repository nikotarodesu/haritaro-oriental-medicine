/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const lectures = CURRICULUM_DATA.flatMap((stage) => stage.lectures);
const groups = Object.values(CURRICULUM_QUIZZES);
const questionIds = new Set();
const uniqueCorrect = [0, 0, 0];
const uniquePasses = [0, 0, 0];
const expectedPasses = [0, 0, 0];
const exclusionPasses = [0, 0];
let tiedCorrect = 0;

assert.equal(lectures.length, 94);
assert.equal(groups.length, lectures.length);
for (const lecture of lectures) {
  const group = CURRICULUM_QUIZZES[lecture.id];
  assert.ok(group, `${lecture.id}: assessment exists`);
  assert.equal(group.questions.length, 3, `${lecture.id}: three questions`);
  assert.equal(group.passingScore, 2, `${lecture.id}: consistent pass threshold`);
  const headings = new Set(lecture.contentMarkdown.split('\n')
    .filter((line) => /^#{2,4}\s+/.test(line))
    .map((line) => line.replace(/^#{2,4}\s+/, '').trim()));
  const uniqueScores = [0, 0, 0];
  const rankProbabilities = [[], [], []];

  group.questions.forEach((question, index) => {
    const id = `${lecture.id}-q${index + 1}`;
    assert.equal(question.id, id, `${lecture.id}: stable question ID`);
    assert.ok(!questionIds.has(id), `${id}: unique question ID`);
    questionIds.add(id);
    assert.equal(question.options.length, 3, `${id}: three alternatives`);
    assert.equal(new Set(question.options.map((option) => option.trim())).size, 3, `${id}: distinct alternatives`);
    assert.ok(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < 3, `${id}: valid answer`);
    assert.ok(question.relatedSectionTitle && headings.has(question.relatedSectionTitle), `${id}: explicit return to an actual heading`);
    assert.ok(!/の基本として/.test(question.question), `${id}: do not ask the learner to select the course objective`);
    assert.ok(!question.options.some((option) => /最初に考えた仮説に合う情報を中心に集め|一つの症状や所見だけで判断を確定し、経過や他の情報との照合を省く/.test(option)), `${id}: do not reuse the generic distractor pair`);
    assert.ok(question.explanation.trim().length >= 30, `${id}: provide reasoning as well as an answer`);

    const lengths = question.options.map((option) => option.length);
    const sorted = [...lengths].sort((left, right) => left - right);
    const answerLength = lengths[question.correctIndex];
    const answerTies = lengths.filter((length) => length === answerLength).length;
    if (answerTies === 1) {
      const rank = lengths.filter((length) => length < answerLength).length;
      uniqueCorrect[rank]++;
      uniqueScores[rank]++;
    } else {
      tiedCorrect++;
    }
    for (let rank = 0; rank < 3; rank++) {
      const target = sorted[rank];
      const ties = lengths.filter((length) => length === target).length;
      rankProbabilities[rank].push(answerLength === target ? 1 / ties : 0);
    }
  });

  for (let rank = 0; rank < 3; rank++) {
    if (uniqueScores[rank] >= group.passingScore) uniquePasses[rank]++;
    const [a, b, c] = rankProbabilities[rank];
    // At least two successes from three independent choices. A tie is guessed
    // uniformly; treating every tie as wrong would understate the shortcut.
    expectedPasses[rank] += a * b + a * c + b * c - 2 * a * b * c;
  }
  for (let extreme = 0; extreme < 2; extreme++) {
    const probabilities = group.questions.map((question) => {
      const lengths = question.options.map((option) => option.length);
      const target = extreme === 0 ? Math.max(...lengths) : Math.min(...lengths);
      const ties = lengths.filter((length) => length === target).length;
      // Only exclude a uniquely longest/shortest choice. With no unique
      // extreme there is no exclusion clue, so choose among all three.
      if (ties !== 1) return 1 / 3;
      return lengths[question.correctIndex] === target ? 0 : 1 / 2;
    });
    const [a, b, c] = probabilities;
    exclusionPasses[extreme] += a * b + a * c + b * c - 2 * a * b * c;
  }
}
for (let extreme = 0; extreme < 2; extreme++) {
  assert.ok(exclusionPasses[extreme] / groups.length <= 0.35, `excluding length extreme ${extreme}: shortcut must not pass more than 35% of lessons`);
}
assert.equal(questionIds.size, 282);
for (let rank = 0; rank < 3; rank++) {
  assert.ok(uniquePasses[rank] / groups.length <= 0.3, `length rank ${rank}: unique-length shortcut must not pass more than 30% of lessons`);
  // A regression ceiling, not a claim that every length strategy is at chance.
  // Chance alone passes 7/27 (~26%) of lessons. Report the tie-aware results
  // below so review can distinguish that baseline from residual weak clues.
  assert.ok(expectedPasses[rank] / groups.length <= 0.4, `length rank ${rank}: including ties, shortcut must not pass more than 40% of lessons`);
}

const diagnosis = CURRICULUM_QUIZZES['lecture-diagnosis-7'].questions;
assert.match(diagnosis[0].question, /病位.*病性.*勢力関係/, 'diagnosis 7: apply separate classification axes');
assert.match(diagnosis[0].options[diagnosis[0].correctIndex], /表裏.*寒熱.*虚実/);
assert.match(diagnosis[1].question, /今日始まった/, 'diagnosis 7: distinguish onset time from exterior/interior');
assert.match(diagnosis[1].explanation, /急性・慢性.*表裏.*同じ意味ではありません/);
assert.match(diagnosis[2].question, /根拠.*不足/, 'diagnosis 7: preserve uncertainty in a mixed example');
assert.match(diagnosis[2].explanation, /保留.*見直す条件/);
assert.equal(new Set(diagnosis.map((question) => question.relatedSectionTitle)).size, 3, 'diagnosis 7: three distinct learning tasks');
const negativeFindings = CURRICULUM_QUIZZES['lecture-practice-3'].questions[2];
assert.match(negativeFindings.question, /発熱・麻痺はない/);
assert.match(negativeFindings.explanation, /2項目.*陰性所見/, 'a recorded negative finding is different from a missing field');
assert.match(negativeFindings.explanation, /まだ確認していない事項/, 'retain the limits of the recorded negatives');

console.log('Passed: 94 lessons / 282 questions, explicit source headings, concrete tasks, and diagnosis 7 coverage.');
console.log(`Length-only diagnostic (short / middle / long): unique correct ${uniqueCorrect.join(' / ')}, tied correct ${tiedCorrect}; unique lesson passes ${uniquePasses.join(' / ')} of ${groups.length}.`);
console.log(`With random choices within equal lengths: expected lesson passes ${expectedPasses.map((value) => value.toFixed(2)).join(' / ')} of ${groups.length}; chance baseline ${(groups.length * 7 / 27).toFixed(2)}. These are content diagnostics, not measurements of learner performance.`);
console.log(`Excluding a unique longest / shortest choice, then guessing: expected lesson passes ${exclusionPasses.map((value) => value.toFixed(2)).join(' / ')} of ${groups.length}.`);
