/* eslint-disable @typescript-eslint/no-require-imports -- Regression runner for browser session transitions. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');

const storage = new Map();
let refuseWrites = false;
const localStorage = {
  getItem: key => storage.get(key) || null,
  setItem: (key, value) => { if (refuseWrites) throw new Error('Quota exceeded'); storage.set(key, value); },
  removeItem: key => storage.delete(key),
};
const browser = { addEventListener() {}, removeEventListener() {} };
const load = createDataLoader({ window: browser, localStorage, crypto, structuredClone, console: { ...console, error() {} } });
const bridge = load('src/utils/learningStorageBridge');
const study = load('src/data/tsubo/studyStorage');
const entry = load('src/data/tsubo/practiceEntry');
const { isValidStudySession } = load('src/data/tsubo/studySessionValidation');
const { MERIDIANS, getAllAcupoints, generateQuestionsForPoints } = load('src/data/tsubo/index');
const points = getAllAcupoints();
const adapter = owner => ({ owner, values: () => ({}), set() {} });
bridge.setLearningStorageAdapter(adapter('account-a'));

const session = (id, courseId = 'meridian_lung', isCompleted = false, mode = 'batch') => {
  const course = entry.resolvePracticeCourse(courseId);
  const questions = generateQuestionsForPoints(points.filter(point => point.meridianId === course.meridianId), 'location_to_name', 3, id);
  return { sessionId: id, contentVersion: 2, courseId, courseTitle: '十四経脈学習', mode, questions, currentIndex: 1,
    answers: { [questions[0].id]: { selectedOptionId: questions[0].correctOptionId, isCorrect: true, confirmedAt: 1 } },
    selfEvaluations: {}, isCompleted, startedAt: 1 };
};

for (const meridian of MERIDIANS) {
  const byId = entry.resolvePracticeCourse(`meridian_${meridian.id}`);
  const byCode = entry.resolvePracticeCourse(`meridian_${meridian.codePrefix.toLowerCase()}`);
  assert.equal(byId.id, byCode.id);
  assert.equal(byId.meridianId, meridian.id);
  assert.equal(byId.title, meridian.name);
}
for (const invalid of ['', 'meridian_', 'meridian_intestine', 'meridian_l', 'meridian_lung_extra', 'meridian_lung<script>', 'https://outside.example', 'unknown']) {
  assert.equal(entry.resolvePracticeCourse(invalid), null);
}
assert.equal(entry.readRequestedPracticeCourse(new URLSearchParams('course=meridian_lung&course=meridian_lung')), null);
assert.equal(entry.readRequestedPracticeCourse(new URLSearchParams('course=meridian_lu')).id, 'meridian_lung');

const old = session('old');
assert(isValidStudySession(old));
assert(isValidStudySession({ ...old, isCompleted: true, currentIndex: old.questions.length }), 'Completed legacy index at the end remains valid');
assert(isValidStudySession({ ...old, selfEvaluations: undefined }), 'Optional self-check history remains optional');
let generatedQuestions = 0;
for (const skill of ['location_to_name', 'meridian_of_point', 'category_of_point', 'puncture_method', 'golden_pairs', 'five_elements_shu', 'mixed']) {
  const questions = generateQuestionsForPoints(points, skill, undefined, 'validation');
  assert(isValidStudySession({ ...old, currentIndex: 0, questions, answers: {} }), 'Real generated sessions remain valid: ' + skill);
  generatedQuestions += questions.length;
}
const firstQuestion = old.questions[0];
const answer = old.answers[firstQuestion.id];
const badQuestion = patch => ({ ...old, questions: [{ ...firstQuestion, ...patch }], currentIndex: 0, answers: {} });
const broken = [null, {}, { ...old, contentVersion: 1 }, { ...old, mode: 'unknown' }, { ...old, isCompleted: 'false' },
  { ...old, questions: null }, { ...old, questions: [null] }, { ...old, questions: [] },
  badQuestion({ id: '' }), badQuestion({ acupointCode: 'ZZ1' }), badQuestion({ acupointCode: 'LU999' }), badQuestion({ skill: 'mixed' }),
  badQuestion({ prompt: null }), badQuestion({ explanation: {} }), badQuestion({ meridianName: null }), badQuestion({ locationReference: null }),
  badQuestion({ options: null }), badQuestion({ options: [null] }), badQuestion({ options: [] }),
  badQuestion({ options: [{ id: 'a', text: null }] }), badQuestion({ correctOptionId: 'missing' }),
  badQuestion({ options: [firstQuestion.options[0], firstQuestion.options[0]] }),
  { ...old, questions: [firstQuestion, firstQuestion] },
  { ...old, currentIndex: -1 }, { ...old, currentIndex: 0.5 }, { ...old, currentIndex: old.questions.length },
  { ...old, isCompleted: true, currentIndex: old.questions.length + 1 },
  { ...old, answers: [] }, { ...old, answers: { missing: answer } },
  { ...old, answers: { [firstQuestion.id]: { ...answer, selectedOptionId: 'missing' } } },
  { ...old, answers: { [firstQuestion.id]: { ...answer, isCorrect: false } } },
  { ...old, answers: { [firstQuestion.id]: { ...answer, confirmedAt: null } } },
  { ...old, selfEvaluations: [] }, { ...old, selfEvaluations: { missing: 'remembered' } },
  { ...old, selfEvaluations: { [firstQuestion.id]: 'invalid' } }, { ...old, startedAt: null }, { ...old, completedAt: -1 },
];
for (const corrupt of broken) {
  assert.equal(isValidStudySession(corrupt), false);
  storage.set('haritaro_tsubo_active_session_v1:account-a', JSON.stringify(corrupt));
  assert.equal(study.loadActiveSession(), null, 'Corrupt v2 active sessions are ignored before rendering');
}
storage.set('haritaro_tsubo_paused_sessions_v1:account-a', JSON.stringify([...broken, old]));
assert.equal(study.loadPausedSessions().length, 1, 'Only valid interrupted sessions are available to resume');
assert.equal(study.loadPausedSessions()[0].sessionId, old.sessionId);
storage.delete('haritaro_tsubo_paused_sessions_v1:account-a');
const requested = entry.resolvePracticeCourse('meridian_large-intestine');
assert.equal(entry.getPracticeEntryAction(old, requested), 'choose');
assert.equal(entry.getPracticeEntryAction(old, entry.resolvePracticeCourse('meridian_lu')), 'resume');
assert.equal(entry.getPracticeEntryAction(null, requested), 'start');
assert.equal(entry.getPracticeEntryAction({ ...old, isCompleted: true }, requested), 'start');
assert.equal(entry.getPracticeEntryAction(old, null), 'resume');
assert.equal(entry.getPracticeEntryAction(null, null), 'home');
assert(entry.getPracticeSessionTitle(old).includes('手の太陰肺経（3問）'));

// Execute the real component with controlled hooks and storage, then use its actual buttons.
function createHarness(queryString) {
  const states = [];
  const dependencies = [];
  const cleanups = [];
  const effects = [];
  let stateIndex = 0;
  let effectIndex = 0;
  let params = new URLSearchParams(queryString);
  let timers = [];
  const alerts = [];
  const values = {};
  const mockReact = { ...React,
    useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial; return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }]; },
    useMemo: fn => fn(),
    useCallback: fn => fn,
    useEffectEvent: fn => fn,
    useEffect(fn, deps) {
      const index = effectIndex++;
      if (!dependencies[index] || deps.some((value, i) => value !== dependencies[index][i])) {
        dependencies[index] = deps;
        effects.push(() => { cleanups[index]?.(); cleanups[index] = fn(); });
      }
    },
  };
  const source = fs.readFileSync('src/app/tsubo/practice/PracticeClient.tsx', 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const exports = {};
  const router = { replace(url) { params = new URL(url, 'https://www.haritaro.jp').searchParams; } };
  const stubs = {
    react: mockReact,
    '@/data/tsubo': load('src/data/tsubo/index'),
    'next/navigation': { useSearchParams: () => params, useRouter: () => router },
    'next/link': { __esModule: true, default: 'a' },
    '@/contexts/LearningSyncContext': { useLearningSync: () => ({ ready: true, values }) },
    '@/contexts/AuthContext': { useAuth: () => ({ user: null }) },
    '@/contexts/CurriculumProgressContext': { useCurriculumProgress: () => ({ saveQuizResult() {} }) },
    '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({ memos: [] }) },
    '@/components/learning/LearningSyncStatus': { __esModule: true, default: () => null },
  };
  const localRequire = id => Object.hasOwn(stubs, id) ? stubs[id] : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id);
  vm.runInNewContext(output, { exports, require: localRequire, crypto, Date, window: browser, localStorage,
    alert: message => alerts.push(message), confirm: () => true,
    setTimeout(fn) { const timer = { fn, cancelled: false }; timers.push(timer); return timer; },
    clearTimeout(timer) { timer.cancelled = true; }, console }, { filename: 'PracticeClient.tsx' });
  const shell = exports.default();
  const content = shell.props.children.type;
  let tree;
  const visit = (element, fn) => {
    if (Array.isArray(element)) { element.forEach(child => visit(child, fn)); return; }
    if (!element || typeof element !== 'object') return;
    fn(element);
    visit(element.props?.children, fn);
  };
  const textOf = element => Array.isArray(element) ? element.map(textOf).join('') : typeof element === 'string' || typeof element === 'number' ? String(element) : textOf(element?.props?.children || []);
  function render() {
    stateIndex = 0; effectIndex = 0;
    tree = content();
    effects.splice(0).forEach(effect => effect());
    const pending = timers; timers = [];
    pending.forEach(timer => { if (!timer.cancelled) timer.fn(); });
    stateIndex = 0; effectIndex = 0; tree = content();
    return tree;
  }
  return {
    render, alerts,
    text: () => textOf(tree),
    click(label, courseTitle) {
      let found;
      visit(tree, element => {
        if (courseTitle && textOf(element).includes(courseTitle)) {
          visit(element.props?.children, child => {
            if (child.type === 'button' && (textOf(child) === label || child.props['aria-label'] === label) && !found) found = child;
          });
        } else if (!courseTitle && element.type === 'button' && (textOf(element) === label || element.props['aria-label'] === label)) found = element;
      });
      assert(found, 'Real button is available: ' + label);
      found.props.onClick();
      render();
    },
    clickCard(label, courseTitle) {
      let card;
      visit(tree, element => { if (element.type === 'div' && textOf(element.props?.children).includes(courseTitle) && element.props?.className?.includes('space-y-3')) card = element; });
      assert(card, 'Resume card exists: ' + courseTitle);
      let button;
      visit(card, element => { if (element.type === 'button' && textOf(element) === label) button = element; });
      assert(button); button.props.onClick(); render();
    },
  };
}

study.saveActiveSession(old);
let harness = createHarness('course=meridian_lu');
harness.render();
assert(harness.text().includes('手の太陰肺経（3問）'));
assert(!harness.text().includes('指定のコースを新しく始める'));
assert.equal(study.loadActiveSession().sessionId, old.sessionId);

study.saveActiveSession(old);
harness = createHarness('course=meridian_large-intestine');
harness.render();
assert(harness.text().includes('途中の学習を再開'));
assert(harness.text().includes('手の陽明大腸経'));
assert.equal(study.loadActiveSession().sessionId, old.sessionId, 'Entry does not replace unanswered work');
harness.click('指定のコースを新しく始める');
let current = study.loadActiveSession();
assert.equal(current.courseId, 'meridian_large-intestine');
assert(current.questions.every(question => question.acupointCode.startsWith('LI')));
assert(current.courseTitle.includes(`手の陽明大腸経（${current.questions.length}問）`));
assert.equal(study.loadPausedSessions()[0].sessionId, old.sessionId);
assert.equal(study.loadPausedSessions()[0].currentIndex, old.currentIndex);
assert.equal(JSON.stringify(study.loadPausedSessions()[0].answers), JSON.stringify(old.answers));
harness.click('セッションを中断して保存');
assert.equal(study.loadActiveSession(), null);
assert.equal(study.loadPausedSessions().length, 2);
assert(harness.text().includes('中断した学習から続ける'));
harness.clickCard('この学習を再開', '手の太陰肺経（3問）');
assert.equal(study.loadActiveSession().sessionId, old.sessionId);
assert.equal(study.loadActiveSession().currentIndex, old.currentIndex);
assert.equal(JSON.stringify(study.loadActiveSession().answers), JSON.stringify(old.answers));
assert(harness.text().includes('手の太陰肺経（3問）'));
assert(!harness.text().includes('指定のコースを新しく始める'));

const one = session('one-by-one', 'meridian_lung', false, 'one_by_one');
study.saveActiveSession(one);
harness = createHarness(''); harness.render();
harness.click('中断して保存');
assert(study.loadPausedSessions().some(item => item.sessionId === one.sessionId && item.currentIndex === 1));
harness.clickCard('この学習を再開', '手の太陰肺経（3問）');
assert.equal(study.loadActiveSession().currentIndex, 1);

study.resetAllStudyData();
for (const query of ['course=meridian_intestine', 'course=meridian_lung&course=meridian_heart', 'course=https%3A%2F%2Foutside.example']) {
  harness = createHarness(query); harness.render();
  assert(harness.text().includes('指定された学習コースが見つかりません'));
  assert.equal(study.loadActiveSession(), null);
  assert.equal(harness.alerts.length, 0);
}
study.saveActiveSession(session('complete', 'meridian_lung', true));
harness = createHarness('course=meridian_stomach'); harness.render();
assert.equal(study.loadActiveSession().courseId, 'meridian_stomach');
assert.equal(study.loadPausedSessions().length, 0, 'Completed work is not queued as interrupted');

study.saveActiveSession(old);
harness = createHarness('course=meridian_heart'); harness.render();
refuseWrites = true;
harness.click('指定のコースを新しく始める');
refuseWrites = false;
assert.equal(study.loadActiveSession().sessionId, old.sessionId, 'Failed backup cannot overwrite an active answer');
assert.equal(harness.alerts.length, 1);

study.savePausedSession(old);
bridge.setLearningStorageAdapter(adapter('account-b'));
assert.equal(study.loadPausedSessions().length, 0);
assert.equal(study.loadActiveSession(), null);
bridge.setLearningStorageAdapter(adapter('account-a'));
assert.equal(study.loadPausedSessions()[0].sessionId, old.sessionId);
study.resetAllStudyData();
assert.equal(study.loadPausedSessions().length, 0);
assert.equal(study.loadActiveSession(), null);
bridge.setLearningStorageAdapter(null);
assert.equal(study.savePausedSession(old), false);
assert.equal(study.loadPausedSessions().length, 0);
console.log(JSON.stringify({ passed: true, meridians: MERIDIANS.length, componentFlows: 8, generatedQuestions, corruptSessionsRejected: broken.length, interruptedAnswersPreserved: true, accountIsolation: true, storageFailureProtected: true }));
