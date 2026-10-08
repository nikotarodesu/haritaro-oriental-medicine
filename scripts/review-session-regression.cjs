/* eslint-disable @typescript-eslint/no-require-imports -- Offline session and client-event checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
function memoryStorage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
const storage = memoryStorage();
const browser = { sessionStorage: storage, location: { search: '' } };
const load = createDataLoader({ window: browser });
const session = load('src/utils/reviewSession');
const { LEARNING_QUESTIONS } = load('src/data/learningQuestionBank');
const { shuffledIndices } = load('src/utils/learningReview');
const questions = LEARNING_QUESTIONS.slice(0, 3);
const now = Date.UTC(2026, 9, 8, 0);
const owner = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
let checkpoint = session.createReviewSession(questions, owner, id, now);
assert(checkpoint);
assert.equal(JSON.stringify(Object.keys(checkpoint).sort()), JSON.stringify(['version','owner','id','createdAt','updatedAt','questions','index','choice','answers'].sort()));
assert(!JSON.stringify(checkpoint).includes(questions[0].question), 'temporary storage contains IDs/revisions, never textbook text');
checkpoint = session.chooseReviewAnswer(checkpoint, questions[0].correctIndex, questions, now + 10);
checkpoint = session.submitReviewAnswer(checkpoint, questions, now + 20);
assert.equal(session.submitReviewAnswer(checkpoint, questions, now + 21), null, 'submitted state cannot grade twice');
checkpoint = session.advanceReviewSession(checkpoint, questions, now + 30);
checkpoint = session.chooseReviewAnswer(checkpoint, 1, questions, now + 40);
session.saveReviewSession(storage, checkpoint);
const restored = session.restoreReviewSession(storage, owner, questions, id, now + 50).session;
assert.deepEqual(JSON.parse(JSON.stringify(restored)), JSON.parse(JSON.stringify(checkpoint)));
assert.equal(restored.index, 1);
assert.equal(restored.choice, 1, 'unsubmitted selections also survive a return');
assert.equal(JSON.stringify(shuffledIndices(4, `${restored.id}-${questions[1].id}`)), JSON.stringify(shuffledIndices(4, `${checkpoint.id}-${questions[1].id}`)), 'same answer order after restoration');

for (const invalid of [null, [], {}, { ...checkpoint, version: 2 }, { ...checkpoint, owner: 'other' },
  { ...checkpoint, id: 'https://outside.example' }, { ...checkpoint, index: -1 }, { ...checkpoint, index: 3 },
  { ...checkpoint, choice: 99 }, { ...checkpoint, choice: undefined }, { ...checkpoint, answers: [null, null, null] },
  { ...checkpoint, answers: [0, null, 0] }, { ...checkpoint, answers: [0] }, { ...checkpoint, questions: [...checkpoint.questions, checkpoint.questions[0]] },
  { ...checkpoint, updatedAt: '2026-02-30T00:00:00.000Z' }, { ...checkpoint, updatedAt: new Date(now + 120_000).toISOString() }]) {
  assert.equal(session.validateReviewSession(invalid, owner, questions, now + 50), null);
}
assert.equal(session.validateReviewSession(checkpoint, owner, questions, now + session.REVIEW_SESSION_TTL), null, '24h expiry');
assert.equal(session.validateReviewSession(checkpoint, owner, questions.slice(1), now + 50), null, 'removed questions invalidate the whole set');
const revisionChange = questions.map((q, i) => i === 1 ? { ...q, revision: 'new-revision' } : q);
assert.equal(session.validateReviewSession(checkpoint, owner, revisionChange, now + 50), null);
const changedOptions = questions.map((q, i) => i === 1 ? { ...q, options: [...q.options].reverse() } : q);
assert.equal(session.validateReviewSession(checkpoint, owner, changedOptions, now + 50), null, 'changed option order invalidates even an unchanged source revision');
assert.equal(session.advanceReviewSession(checkpoint, changedOptions, now + 50), null);
const replacement = session.createReviewSession(questions, owner, 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', now + 60);
session.saveReviewSession(storage, replacement);
assert.equal(session.restoreReviewSession(storage, owner, questions, id, now + 70).status, 'different');
assert(storage.getItem(session.REVIEW_SESSION_KEY), 'an old explanation link does not delete a newer set');
assert.equal(session.restoreReviewSession(storage, 'other-owner', questions, null, now + 70).session, null);
assert.equal(storage.getItem(session.REVIEW_SESSION_KEY), null, 'owner mismatch is purged');
storage.setItem(session.REVIEW_SESSION_KEY, 'not json');
assert.equal(session.restoreReviewSession(storage, owner, questions, null, now + 70).status, 'invalid');
assert.equal(storage.getItem(session.REVIEW_SESSION_KEY), null);
storage.setItem(session.REVIEW_SESSION_KEY, ' '.repeat(1_000_001));
assert.equal(session.restoreReviewSession(storage, owner, questions, null, now + 70).status, 'invalid', 'oversized payloads are rejected before parsing');
assert.equal(session.restoreReviewSession(null, owner, questions).status, 'unavailable');
const unavailable = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); }, removeItem() { throw Error('blocked'); } };
assert.equal(session.saveReviewSession(unavailable, replacement), false);
assert.equal(session.restoreReviewSession(unavailable, owner, questions).session, null);
assert.equal(session.reviewSessionReturnHref('javascript:alert(1)'), '/kokushi#learning-review');

// Execute real ReviewWorkspace event handlers, then remount it as a route navigation would.
let auth = { user: { id: owner }, isLoading: false };
let progress = { isMounted: true, quizResults: {}, quizHistory: [], revisedQuestionCount: 0, lastVisitedLectureId: null };
let answersSaved = 0;
progress.saveQuizResult = record => { answersSaved++; progress.quizResults = { ...progress.quizResults, [record.questionId]: record }; };
let hooks = [], cursor = 0, uuid = 1;
const fakeReact = { ...React, useMemo: compute => compute(), useEffect() {},
  useState(initial) { const index = cursor++; if (!(index in hooks)) hooks[index] = typeof initial === 'function' ? initial() : initial; return [hooks[index], next => { hooks[index] = typeof next === 'function' ? next(hooks[index]) : next; }]; },
  useRef(initial) { const index = cursor++; if (!(index in hooks)) hooks[index] = { current: initial }; return hooks[index]; } };
const Link = () => null;
const FocusReview = () => null;
function client(relative) {
  const file = path.join(root, relative);
  const exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = name => {
    if (name === 'react') return fakeReact;
    if (name === 'next/link') return Link;
    if (name === 'next/navigation') return { useSearchParams: () => new URLSearchParams(browser.location.search) };
    if (name === '@/contexts/AuthContext') return { useAuth: () => auth };
    if (name === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (name === '@/utils/analytics') return { trackEvent() {} };
    if (name === '@/data/tsubo/studyStorage') return { recordAnswerInStore() {} };
    if (name === './LearningFocusReview') return FocusReview;
    if (name === './QuestionEvidence' || name === './LearningSyncStatus') return () => null;
    if (name.startsWith('@/')) return load('src/' + name.slice(2));
    return require(name);
  };
  vm.runInNewContext(compiled, { exports, require: localRequire, window: browser, URLSearchParams, Date, console,
    crypto: { randomUUID: () => `00000000-0000-4000-8000-${String(uuid++).padStart(12, '0')}` }, setTimeout, clearTimeout });
  return exports.default;
}
const Panel = client('src/components/learning/LearningReviewPanel.tsx');
const Card = client('src/components/learning/ReviewQuestionCard.tsx');
let workspace, workspaceProps, tree;
function mount() {
  hooks = []; cursor = 0;
  const outer = Panel();
  if (typeof outer.type !== 'function') { tree = outer; workspace = null; return; }
  workspace = outer.type; workspaceProps = outer.props; render();
}
function render() { cursor = 0; tree = workspace(workspaceProps); }
function nodes(node, list = []) {
  if (Array.isArray(node)) { node.forEach(item => nodes(item, list)); return list; }
  if (!node || typeof node !== 'object') return list;
  list.push(node); nodes(node.props?.children, list); return list;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? text(node.props?.children) : '';
}
function button(label) { const node = nodes(tree).find(node => node.type === 'button' && text(node).includes(label)); assert(node, label); return node; }
mount();
nodes(tree).find(node => node.type === FocusReview).props.onStart(questions); render();
const started = JSON.parse(storage.getItem(session.REVIEW_SESSION_KEY));
button(questions[0].options[questions[0].correctIndex]).props.onClick(); render();
const grade = button('回答を確定').props.onClick;
grade(); grade(); render();
assert.equal(answersSaved, 1, 'actual handler ignores a rapid second submit');
assert(text(tree).includes('正解です。'));
const explanation = nodes(tree).find(node => node.type === Link && text(node) === '要点と関連講義を読む');
browser.location.search = new URL(explanation.props.href, 'https://www.haritaro.jp').search;
const card = Card({ lectureId: questions[0].lectureId });
const back = nodes(card).find(node => node.type === Link && text(node) === '中断した復習に戻る');
assert(back);
assert.equal(back.props.href, session.reviewSessionReturnHref(started.id));
browser.location.search = new URL(back.props.href, 'https://www.haritaro.jp').search;
mount();
assert(text(tree).includes('中断した復習を再開しました'));
assert(text(tree).includes('正解です。'));
assert.equal(answersSaved, 1, 'restoration does not add an answer or alter its interval');
assert(!nodes(tree).some(node => node.type === 'button' && text(node) === '回答を確定'));
button('次の問題へ').props.onClick(); render();
button(questions[1].options[0]).props.onClick(); render();
mount();
assert(nodes(tree).some(node => node.type === 'button' && node.props['aria-pressed'] && text(node).includes(questions[1].options[0])), 'unsubmitted selection returns on the same question');
assert(text(tree).includes('2 / 3'));
button('回答を確定').props.onClick(); render();
button('次の問題へ').props.onClick(); render();
button(questions[2].options[0]).props.onClick(); render();
button('回答を確定').props.onClick(); render();
button('復習を完了する').props.onClick(); render();
assert.equal(storage.getItem(session.REVIEW_SESSION_KEY), null);
assert(text(tree).includes('今回の復習が完了しました'));
mount();
assert(!text(tree).includes(questions[2].question), 'completed sets cannot resurrect');
browser.location.search = ''; mount();
nodes(tree).find(node => node.type === FocusReview).props.onStart(questions); render();
auth = { ...auth, user: { id: 'other-owner' } }; mount();
assert.equal(storage.getItem(session.REVIEW_SESSION_KEY), null);
assert(!nodes(tree).some(node => node.props?.id === 'learning-review-practice'), 'account switch hides all previous selections');
auth = { ...auth, isLoading: true }; mount();
assert(text(tree).includes('学習履歴を確認しています'));

// A real generated acupoint question follows the same route return without a textbook-map entry.
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { generateQuestionsForPoints } = load('src/data/tsubo/quizData');
const { questionRevision } = load('src/utils/learningReview');
const generated = generateQuestionsForPoints(ACUPOINTS_MASTER, 'meridian_of_point', undefined, 'session-regression').find(q => q.acupointCode === 'LI4');
assert(generated);
const ordered = [...generated.options].sort((a,b) => a.id.localeCompare(b.id));
const correctIndex = ordered.findIndex(option => option.id === generated.correctOptionId);
const acupoint = { id: `tsubo-${generated.acupointCode}-${generated.skill}`, question: generated.prompt,
  options: ordered.map(option => option.text), correctIndex, explanation: generated.explanation,
  lectureId: 'lecture-treatment-8', lectureTitle: 'LI4・経穴演習', chapterId: 'tsubo', chapterTitle: '経穴演習', kind: 'acupoint',
  href: '/tsubo/practice', revision: questionRevision(generated.prompt, [ordered[correctIndex].text], 0, generated.explanation) };
auth = { user: { id: owner }, isLoading: false };
progress.quizResults[acupoint.id] = { ...acupoint, questionId: acupoint.id, questionText: acupoint.question, correctAnswerIndex: acupoint.correctIndex, practiceHref: acupoint.href };
browser.location.search = ''; mount();
nodes(tree).find(node => node.type === FocusReview).props.onStart([acupoint]); render();
button(acupoint.options[correctIndex]).props.onClick(); render();
button('回答を確定').props.onClick(); render();
const acupointExplanation = nodes(tree).find(node => node.type === Link && text(node) === '要点と関連講義を読む');
browser.location.search = new URL(acupointExplanation.props.href, 'https://www.haritaro.jp').search;
const acupointCard = Card({ lectureId: acupoint.lectureId });
assert(text(acupointCard).includes(acupoint.question));
assert(nodes(acupointCard).some(node => node.type === Link && text(node) === '経穴演習で確認'));
const acupointBack = nodes(acupointCard).find(node => node.type === Link && text(node) === '中断した復習に戻る');
assert(acupointBack);
browser.location.search = new URL(acupointBack.props.href, 'https://www.haritaro.jp').search;
const savedBeforeReturn = answersSaved; mount();
assert(text(tree).includes(acupoint.question));
assert(text(tree).includes('正解です。'));
assert.equal(answersSaved, savedBeforeReturn, 'acupoint restoration also never replays grading');

// Execute the actual lecture key handler, extracted with the TypeScript AST.
const readerFile = path.join(root, 'src/components/curriculum/CurriculumLectureReader.tsx');
const ast = ts.createSourceFile(readerFile, fs.readFileSync(readerFile, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let keyFunction;
function inspect(node) { if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'handleKeyDown') keyFunction = node.initializer.getText(ast); ts.forEachChild(node, inspect); }
inspect(ast); assert(keyFunction);
const handlerExports = {}, pushes = [];
vm.runInNewContext(ts.transpileModule(`exports.handle = ${keyFunction}`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { exports: handlerExports, getLectureShortcut: load('src/utils/lectureKeyboardNavigation').getLectureShortcut,
    previousHref: '/previous-lecture', nextHref: '/next-lecture', router: { push: href => pushes.push(href) } });
function key(key, flags = {}, interactive = false) {
  let prevented = false;
  handlerExports.handle({ key, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, isComposing: false, defaultPrevented: false,
    target: { isContentEditable: false, closest: () => interactive ? {} : null }, ...flags, preventDefault() { prevented = true; } });
  return prevented;
}
assert.equal(key('ArrowLeft', { altKey: true }), false);
assert.equal(key('ArrowRight', { altKey: true }), false);
for (const flag of ['altKey','ctrlKey','metaKey','shiftKey','isComposing','defaultPrevented']) assert.equal(key('[', { [flag]: true }), false);
assert.equal(key('[', {}, true), false);
assert.equal(pushes.length, 0, 'browser history, composing and interactive controls are untouched');
assert.equal(key('['), true); assert.equal(key(']'), true);
assert.deepEqual(pushes, ['/previous-lecture','/next-lecture']);
console.log('Passed: revision-safe temporary review sessions, route return/selection/grading/answer order, duplicate-submit protection, completion/new sets/owner isolation, blocked storage, and real lecture keyboard handlers.');
