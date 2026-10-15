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
    : id === '@/contexts/LearningSyncContext' ? { useLearningSync: () => ({ values, ready: true, setEntry: (key, value) => { writes.push({ key, value }); values = { ...values, [key]: value }; }, reset() {} }) }
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
const scheduled = { ...record, answeredAt: '2026-10-15T03:00:00.000Z', lastReviewDate: '2026-10-15',
  nextReviewDate: '2026-10-29', consecutiveCorrect: 4, attempts: 9, mistakes: 2, historyEpoch: 'legacy' };
values = { ['quiz:' + record.questionId]: scheduled, 'attempt:previous': scheduled };
writes.length = 0;
context().saveQuizResult({ ...record, answeredAt: '2026-10-15T04:00:00.000Z' });
let latest = context().quizResults[record.questionId];
assert.equal(latest.attempts, 10, 'A same-day retry adds practice instead of starting a new history');
assert.equal(latest.mistakes, 2);
assert.equal(latest.consecutiveCorrect, 4);
assert.equal(latest.nextReviewDate, '2026-10-29', 'A successful same-day retry preserves the established review date');
assert.equal(context().quizHistory.length, 2);
context().saveQuizResult({ ...record, userAnswerIndex: (record.correctAnswerIndex + 1) % record.options.length, isCorrect: false, answeredAt: '2026-10-15T05:00:00.000Z' });
latest = context().quizResults[record.questionId];
assert.equal(latest.attempts, 11);
assert.equal(latest.mistakes, 3);
assert.equal(latest.consecutiveCorrect, 0);
assert.equal(latest.nextReviewDate, '2026-10-16', 'A failed retry brings the next review forward');
context().clearQuizResult(record.questionId);
assert.equal(context().quizResults[record.questionId], undefined, 'Explicit clearing still clears the current result');
context().saveQuizResult({ ...record, answeredAt: '2026-10-15T06:00:00.000Z' });
assert.equal(context().quizResults[record.questionId].attempts, 1, 'An explicit clear retains its intentional history-reset semantics');
assert.equal(context().quizHistory.length, 4, 'Explicit clearing never destroys immutable attempts');

// Exercise the other public review entry with the actual validated provider.
const modalFile = path.resolve(__dirname, '../src/components/IncorrectQuestionsModal.tsx');
const modalExports = {};
const slots = [];
let cursor = 0, activeWorkspace = null, owner = 'learner-a', open = true, tree;
const modalHooks = { ...React,
  useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }]; },
  useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
  useId() { const index = cursor++; if (!(index in slots)) slots[index] = 'review-modal-' + index; return slots[index]; },
};
const modalJs = ts.transpileModule(fs.readFileSync(modalFile, 'utf8'), { fileName: modalFile,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
vm.runInNewContext(modalJs, { exports: modalExports, Date, console,
  require: id => id === 'react' ? modalHooks
    : id === '@/contexts/AuthContext' ? { useAuth: () => ({ user: { id: owner } }) }
      : id === '@/contexts/CurriculumProgressContext' ? { useCurriculumProgress: context }
        : id === '@/hooks/useModalDialog' ? { useModalDialog() {} }
          : id === 'next/link' ? () => null : require(id),
}, { filename: modalFile });
function modalNodes(node, result = []) {
  if (Array.isArray(node)) { node.forEach(child => modalNodes(child, result)); return result; }
  if (!node || typeof node !== 'object') return result;
  result.push(node); modalNodes(node.props?.children, result); return result;
}
function modalText(node) {
  if (Array.isArray(node)) return node.map(modalText).join('');
  return typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? modalText(node.props?.children) : '';
}
function renderModal() {
  cursor = 0;
  const workspace = modalExports.IncorrectQuestionsModal({ isOpen: open, onClose() { open = false; } });
  if (!workspace) { activeWorkspace = null; slots.length = 0; tree = null; return; }
  if (activeWorkspace !== workspace.key) { slots.length = 0; activeWorkspace = workspace.key; }
  cursor = 0; tree = workspace.type(workspace.props);
}
function modalButton(label) { const button = modalNodes(tree).find(node => node.type === 'button' && modalText(node).includes(label)); assert(button, label); return button; }
const wrongIndex = (record.correctAnswerIndex + 1) % record.options.length;
const wrong = { ...record, userAnswerIndex: wrongIndex, isCorrect: false, kind: 'lecture', practiceHref: question.href,
  answeredAt: new Date().toISOString(), lastReviewDate: load('src/utils/learningReview').localStudyDate(), attempts: 3, mistakes: 3, consecutiveCorrect: 0, historyEpoch: 'legacy' };
values = { ['quiz:' + wrong.questionId]: wrong, 'attempt:prior-wrong': wrong }; writes.length = 0;
renderModal();
assert(modalNodes(tree).some(node => node.props?.role === 'dialog' && node.props?.['aria-modal'] === 'true'));
modalButton(`${wrongIndex + 1}. ${record.options[wrongIndex]}`).props.onClick(); renderModal();
const grade = modalButton('回答して判定する').props.onClick;
grade(); grade(); renderModal();
assert.equal(writes.filter(write => write.key.startsWith('attempt:')).length, 1, 'Rapid duplicate grading records only one attempt');
latest = context().quizResults[wrong.questionId];
assert.equal(latest.isCorrect, false);
assert.equal(latest.attempts, 4);
assert.equal(latest.mistakes, 4, 'Incorrect modal answers use the normal failure schedule and history');
assert.equal(latest.kind, wrong.kind);
assert.equal(latest.revision, wrong.revision);
assert.equal(latest.practiceHref, wrong.practiceHref);
assert(modalText(tree).includes('不正解です。解説を読み'));
assert(modalText(tree).includes(wrong.explanation));
modalButton('もう一度考える').props.onClick(); renderModal();
modalButton(`${record.correctAnswerIndex + 1}. ${record.options[record.correctAnswerIndex]}`).props.onClick(); renderModal();
modalButton('回答して判定する').props.onClick(); renderModal();
latest = context().quizResults[wrong.questionId];
assert.equal(latest.isCorrect, true);
assert.equal(latest.attempts, 5);
assert.equal(latest.mistakes, 4);
assert.equal(writes.filter(write => write.key.startsWith('attempt:')).length, 2);
assert(modalText(tree).includes('正解です。解説で考え方を確認'));
assert(modalText(tree).includes(wrong.explanation), 'A correct result remains visible until closing');
assert(!modalNodes(tree).some(node => node.type === 'button' && modalText(node).includes('回答して判定する')));
owner = 'learner-b'; values = {}; renderModal();
assert(!modalText(tree).includes(wrong.questionText), 'An identity change cannot retain the previous learner practice set');
owner = 'learner-a'; values = { ['quiz:' + latest.questionId]: latest }; renderModal();
assert(!modalText(tree).includes(wrong.questionText), 'Reopening uses current weak questions rather than the completed temporary set');
const retiredQuestion = LEARNING_QUESTIONS.find(item => item.kind === 'exam');
const retiredRecord = { ...wrong, questionId: retiredQuestion.id, lectureId: retiredQuestion.lectureId,
  chapterId: retiredQuestion.chapterId, chapterTitle: retiredQuestion.chapterTitle, lectureTitle: retiredQuestion.lectureTitle,
  questionText: retiredQuestion.question, explanation: retiredQuestion.explanation, options: [...retiredQuestion.options],
  userAnswerIndex: (retiredQuestion.correctIndex + 1) % retiredQuestion.options.length,
  correctAnswerIndex: retiredQuestion.correctIndex, kind: 'exam', revision: retiredQuestion.revision, practiceHref: retiredQuestion.href };
values = { ['quiz:' + retiredRecord.questionId]: retiredRecord, 'attempt:retired': retiredRecord };
open = false; renderModal(); open = true; renderModal();
assert.equal(context().getIncorrectQuestions().length, 1, 'The historical context API still exposes the saved exam record');
assert.equal(context().quizHistory.length, 1, 'Retiring public questions preserves immutable exam history');
assert(!modalText(tree).includes(retiredRecord.questionText), 'Retired exam questions cannot be newly practiced from the weak-question modal');
assert(!modalNodes(tree).some(node => node.type === 'button' && modalText(node).includes('回答して判定する')));
values = { ...values, ['quiz:' + wrong.questionId]: wrong };
open = false; renderModal(); open = true; renderModal();
assert(modalText(tree).includes(wrong.questionText), 'Current lecture mistakes remain available alongside preserved exam history');
assert(!modalText(tree).includes(retiredRecord.questionText));
console.log('Passed: actual provider validation, immutable history, retry schedules, explicit clear semantics, correct/incorrect modal practice, account isolation and retired-exam history without new public practice.');
