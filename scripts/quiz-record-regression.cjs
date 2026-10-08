/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the actual progress provider with a local store. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { LEARNING_QUESTIONS } = load('src/data/learningQuestionBank');
const { getLearningProgressCatalog } = load('src/data/learningProgressCatalog');
const { validQuizRecord } = load('src/utils/learningQuizHistory');
let values = {};
const writes = [];
const file = path.resolve(__dirname, '../src/contexts/CurriculumProgressContext.tsx');
const exportsForProvider = {};
const hooks = { ...React, useMemo: callback => callback(), useCallback: callback => callback };
const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  fileName: file,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
vm.runInNewContext(source, {
  exports: exportsForProvider, crypto, Date, console,
  require: id => id === 'react' ? hooks
    : id === '@/contexts/LearningSyncContext' ? { useLearningSync: () => ({ values, ready: true, setEntry: (key, value) => writes.push({ key, value }), reset() {} }) }
      : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id),
}, { filename: file });
const question = LEARNING_QUESTIONS.find(item => item.id === 'lecture-intro-1-q1');
const record = {
  questionId: question.id, lectureId: question.lectureId,
  chapterId: question.chapterId, chapterTitle: question.chapterTitle, lectureTitle: question.lectureTitle,
  questionText: question.question, explanation: question.explanation, options: [...question.options],
  userAnswerIndex: question.correctIndex, correctAnswerIndex: question.correctIndex, isCorrect: true,
  answeredAt: '2026-10-08T03:00:00Z', revision: question.revision,
};
const context = () => exportsForProvider.CurriculumProgressProvider({ children: null, catalog: getLearningProgressCatalog() }).props.value;
values = { ['quiz:' + record.questionId]: record };
assert.equal(context().quizResults[record.questionId].isCorrect, true, 'Current valid answers remain visible');

values = { ['quiz:' + record.questionId]: { ...record, isCorrect: false }, 'attempt:invalid': { ...record, isCorrect: false } };
assert.equal(Object.keys(context().quizResults).length, 0, 'Contradictory saved grades do not enter review or scoring');
assert.equal(context().quizHistory.length, 0, 'Contradictory attempts do not reappear through history replay');
context().saveQuizResult({ ...record, isCorrect: false });
assert.equal(writes.length, 0, 'Contradictory grades are rejected before persistence');

values = { ['quiz:' + record.questionId]: { ...record, questionId: 'lecture-intro-1-q2' } };
assert.equal(Object.keys(context().quizResults).length, 0, 'A storage-key mismatch cannot answer another question');

values = { ['quiz:' + record.questionId]: { ...record, revision: 'old-revision' }, ['lecture:' + record.lectureId]: true };
assert.equal(Object.keys(context().quizResults).length, 0, 'A revised question requires a new answer');
assert.equal(context().revisedQuestionCount, 1);
assert.equal(context().completedLectures[record.lectureId], true, 'Question edits preserve the separate lecture attendance record');

values = {};
context().saveQuizResult(record);
assert.equal(writes.length, 2, 'A valid answer writes both its snapshot and immutable attempt');
assert.equal(writes[0].key, 'quiz:' + record.questionId);
assert(writes[1].key.startsWith('attempt:'));
for (const write of writes) {
  assert(validQuizRecord(write.value));
  assert.equal(write.value.revision, question.revision);
  assert.equal(write.value.kind, 'lecture');
  assert.equal(write.value.attempts, 1);
}
console.log('Passed: actual quiz progress provider rejects inconsistent grades and mismatched keys, preserves valid history/attendance, invalidates old revisions and saves immutable attempts.');
