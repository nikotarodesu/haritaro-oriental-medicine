/* eslint-disable @typescript-eslint/no-require-imports -- Run actual quiz handlers with persistent hooks and controlled browser events. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader();
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { LEARNING_COURSES } = load('src/data/learningCourses');
const { resolveCourseJourney } = load('src/utils/courseJourney');
const { shuffledIndices } = load('src/utils/learningReview');
const quiz = CURRICULUM_QUIZZES['lecture-intro-1'];
const sourceFile = path.join(root, 'src/components/InteractiveQuiz.tsx');
const compiled = ts.transpileModule(fs.readFileSync(sourceFile, 'utf8'), { fileName: sourceFile,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
function nodes(node, result = []) {
  if (Array.isArray(node)) { node.forEach(child => nodes(child, result)); return result; }
  if (!node || typeof node !== 'object') return result;
  result.push(node); nodes(node.props?.children, result); return result;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? text(node.props?.children) : '';
}
const optionText = button => text(nodes(button).find(node => node.props?.className === 'flex-1 leading-snug'));
function harness(props = { quiz }, overrides = {}) {
  const slots = [], scheduled = [], listeners = new Set(), timers = new Map();
  const saved = [], cleared = [], completed = [], events = [], pushes = [], scrolls = [], focused = [], highlights = [], headings = [];
  const elements = new Map();
  function element(id, textContent = '') {
    if (!elements.has(id)) elements.set(id, { textContent, scrollIntoView: () => scrolls.push(id), focus: () => focused.push(id), hasAttribute: () => false, setAttribute() {}, classList: { add: () => highlights.push(id), remove() {} } });
    return elements.get(id);
  }
  let cursor = 0, tree, timerId = 0;
  const context = { isMounted: true, quizResults: {}, completedLectures: {}, ...overrides,
    saveQuizResult(record) { saved.push(record); context.quizResults = { ...context.quizResults, [record.questionId]: record }; },
    clearQuizResult(id) { cleared.push(id); const next = { ...context.quizResults }; delete next[id]; context.quizResults = next; },
    setLectureCompleted(id, value) { completed.push([id, value]); context.completedLectures = { ...context.completedLectures, [id]: value }; },
  };
  const changed = (previous, deps) => !previous || !deps || deps.length !== previous.length || deps.some((dep, i) => !Object.is(dep, previous[i]));
  const fakeReact = { ...React,
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[index].value, next => { slots[index].value = typeof next === 'function' ? next(slots[index].value) : next; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { value: compute(), deps }; return slots[index].value; },
    useCallback(callback, deps) { return fakeReact.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { const previous = slots[index]; slots[index] = { deps }; scheduled.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); }); } },
  };
  const exports = {};
  const browser = { addEventListener(name, callback) { if (name === 'keydown') listeners.add(callback); }, removeEventListener(name, callback) { if (name === 'keydown') listeners.delete(callback); }, scrollTo() {} };
  const Link = () => null;
  const deterministicMath = Object.create(Math); deterministicMath.random = () => 0.25;
  vm.runInNewContext(compiled, { exports, require: id => {
    if (id === 'react') return fakeReact;
    if (id === 'next/link') return Link;
    if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }) };
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => context };
    if (id === '@/components/learning/QuestionEvidence') return () => null;
    if (id === '@/utils/analytics') return { trackEvent: (name, data) => events.push({ name, data }) };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    return require(id);
  }, window: browser, document: { getElementById: id => element(id), querySelectorAll: () => headings },
  Math: deterministicMath, Date, console, setTimeout: callback => { timers.set(++timerId, callback); return timerId; }, clearTimeout: id => timers.delete(id) }, { filename: sourceFile });
  const Component = exports.InteractiveQuiz;
  const api = { context, saved, cleared, completed, events, pushes, scrolls, focused, highlights,
    addHeading(id, label) { headings.push(element(id, label)); },
    render(next = props) { props = next; cursor = 0; tree = Component(props); while (scheduled.length) scheduled.shift()(); return tree; },
    tree: () => tree,
    button(label) { const result = nodes(tree).find(node => node.type === 'button' && text(node).includes(label)); assert(result, label); return result; },
    options(id) { const card = nodes(tree).find(node => node.props?.id === 'quiz-card-' + id); assert(card, id); return nodes(card).filter(node => node.type === 'button').slice(0, props.quiz.questions.find(q => q.id === id).options.length); },
    choose(question, original) { const option = api.options(question.id).find(node => optionText(node) === question.options[original]); assert(option, 'The original option is rendered'); option.props.onClick(); },
    key(key, flags = {}, interactive = false) { let prevented = false; const event = { key, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, isComposing: false, repeat: false, defaultPrevented: false,
      target: { tagName: 'DIV', isContentEditable: false, closest: () => interactive ? {} : null }, ...flags, preventDefault() { prevented = true; } };
      for (const listener of listeners) listener(event); return prevented; },
    flushTimers() { const current = [...timers.values()]; timers.clear(); current.forEach(callback => callback()); },
  };
  api.render(); return api;
}
const failures = [];
let checks = 0;
function check(name, test) { try { test(); checks++; } catch (error) { failures.push(name + ': ' + error.message); } }
function answerAll(client, wrongIndices = []) {
  quiz.questions.forEach((question, index) => { client.choose(question, wrongIndices.includes(index) ? (question.correctIndex + 1) % 3 : question.correctIndex); client.render(); });
}
check('partial answers and one immutable grade per question', () => {
  const client = harness({ quiz, nextLecture: { id: 'lecture-intro-2', title: '次の講義' } });
  assert.equal(client.saved.length, 0);
  assert(!text(client.tree()).includes('レッスンクリア！'));
  const first = quiz.questions[0];
  const staleClick = client.options(first.id).find(node => optionText(node) === first.options[first.correctIndex]).props.onClick;
  staleClick(); staleClick(); client.render();
  assert.equal(client.saved.length, 1, 'A rapid duplicate click cannot grade twice');
  assert.equal(client.saved[0].userAnswerIndex, first.correctIndex);
  assert.equal(client.saved[0].isCorrect, true);
  assert.deepEqual([...client.saved[0].options], [...first.options]);
  client.choose(quiz.questions[1], quiz.questions[1].correctIndex); client.render();
  assert(!text(client.tree()).includes('レッスンクリア！'), 'Two correct answers are not presented as a finished attempt while the third is unanswered');
  assert.equal(client.completed.length, 0);
  assert.equal(client.key('Enter'), false);
  assert.equal(client.pushes.length, 0);
  client.choose(quiz.questions[2], (quiz.questions[2].correctIndex + 1) % 3); client.render();
  assert(text(client.tree()).includes('レッスンクリア！'));
  assert.deepEqual(client.completed, [[quiz.lectureId, true]]);
  assert.equal(client.events.filter(event => event.name === 'quiz_complete').length, 1);
  assert.equal(client.events.find(event => event.name === 'quiz_complete').data.score, 2);
  assert.equal(client.key('Enter'), true);
  assert.deepEqual(client.pushes, ['/curriculum/lecture-intro-2']);
});
check('remaining-score badge', () => {
  const client = harness(); answerAll(client, [1, 2]);
  assert(text(client.tree()).includes('あと1問で合格'), 'One correct answer out of three needs one more, in both summary areas');
  assert.equal(client.completed.length, 0);
  assert.equal(client.key('Enter'), false);
});
check('missed-only and all-question retries', () => {
  const client = harness(); answerAll(client, [2]);
  client.button('間違えた問題（1問）だけ再挑戦').props.onClick(); client.render(); client.flushTimers();
  assert.deepEqual(client.cleared, [quiz.questions[2].id]);
  assert(client.options(quiz.questions[0].id).every(node => node.props.disabled));
  assert(client.options(quiz.questions[2].id).every(node => !node.props.disabled));
  assert(!text(client.tree()).includes('レッスンクリア！'));
  assert(client.scrolls.includes('quiz-card-' + quiz.questions[2].id));
  client.choose(quiz.questions[2], quiz.questions[2].correctIndex); client.render();
  assert(text(client.tree()).includes('パーフェクト（3/3）'));
  assert(nodes(client.tree()).some(node => node.props?.className === 'fixed inset-0 pointer-events-none z-50 overflow-hidden'));
  assert.equal(client.key('r'), true); client.render();
  assert.deepEqual(client.cleared.slice(-3), [...quiz.questions].map(question => question.id));
  assert(client.options(quiz.questions[0].id).every(node => !node.props.disabled));
  assert(!nodes(client.tree()).some(node => node.props?.className === 'fixed inset-0 pointer-events-none z-50 overflow-hidden'), 'Retrying clears the previous completion animation');
  client.choose(quiz.questions[0], quiz.questions[0].correctIndex); client.render();
  assert.equal(client.saved.length, 5, 'Cleared questions accept a new answer');
});
check('shuffle rendering and keyboard grade the original option', () => {
  const client = harness();
  const first = quiz.questions[0];
  const expected = shuffledIndices(first.options.length, first.id);
  assert.deepEqual(client.options(first.id).map(optionText), [...expected].map(index => first.options[index]));
  assert.equal(client.key('1'), true); client.render();
  assert.equal(client.saved[0].userAnswerIndex, expected[0]);
  client.button('シャッフルON').props.onClick(); client.render();
  const second = quiz.questions[1];
  assert(client.options(second.id).every((node, index) => optionText(node) === second.options[index]));
  assert.equal(client.key('b'), true); client.render();
  assert.equal(client.saved[1].userAnswerIndex, 1);
  client.button('シャッフルOFF').props.onClick(); client.render();
  assert.equal(new Set(client.options(quiz.questions[2].id).map(text)).size, 3);
  assert.equal(client.saved[0].userAnswerIndex, expected[0], 'Toggling display order never changes an existing answer');
});
check('a reused quiz remains shuffled for its next lecture', () => {
  const nextQuiz = Object.values(CURRICULUM_QUIZZES).find(group => group.lectureId !== quiz.lectureId && group.questions.some(question => shuffledIndices(3, question.id).join() !== '0,1,2'));
  const client = harness(); client.render({ quiz: nextQuiz });
  assert(text(client.tree()).includes('シャッフルON'));
  for (const question of nextQuiz.questions) {
    const order = shuffledIndices(question.options.length, question.id);
    assert(client.options(question.id).every((node, index) => optionText(node) === question.options[order[index]]), 'ON cannot fall back to the original answer order after props change');
  }
});
check('answer feedback identifies the correct option in its displayed order', () => {
  const client = harness();
  const question = quiz.questions[0];
  const announcements = () => nodes(client.tree()).filter(node => node.props?.role === 'status' && node.props?.className === 'sr-only');
  assert.equal(announcements().length, 3, 'Result announcements exist before answering');
  assert(announcements().every(node => text(node) === ''));
  client.choose(question, (question.correctIndex + 1) % 3); client.render();
  const order = shuffledIndices(question.options.length, question.id);
  assert(text(client.tree()).includes(`正答：${String.fromCharCode(65 + order.indexOf(question.correctIndex))} ${question.options[question.correctIndex]}`));
  assert(text(announcements()[0]).includes(`第1問、不正解。正答は${String.fromCharCode(65 + order.indexOf(question.correctIndex))}、${question.options[question.correctIndex]}`));
  client.button('シャッフルON').props.onClick(); client.render();
  assert(text(client.tree()).includes(`正答：${String.fromCharCode(65 + question.correctIndex)} ${question.options[question.correctIndex]}`), 'Feedback stays accurate after changing the display order');
});
check('loading, reset and account readiness do not leave locked unanswered items', () => {
  const client = harness({ quiz }, { isMounted: false });
  assert(client.options(quiz.questions[0].id).every(node => node.props.disabled), 'Answers wait until current-owner history is ready');
  client.options(quiz.questions[0].id)[0].props.onClick();
  assert.equal(client.key('1'), false);
  assert.equal(client.saved.length, 0);
  client.context.isMounted = true; client.render();
  client.choose(quiz.questions[0], quiz.questions[0].correctIndex); client.render();
  client.context.quizResults = {}; client.render();
  client.choose(quiz.questions[0], quiz.questions[0].correctIndex); client.render();
  assert.equal(client.saved.length, 2, 'Global reset clears the transient duplicate guard');
  client.context.isMounted = false; client.context.quizResults = {}; client.render();
  client.context.isMounted = true; client.render();
  client.choose(quiz.questions[0], quiz.questions[0].correctIndex); client.render();
  assert.equal(client.saved.length, 3, 'Readiness reset isolates the incoming account attempt');
});
check('multiple choices in one React batch finish exactly once', () => {
  const client = harness();
  for (const question of quiz.questions) client.choose(question, question.correctIndex);
  assert.equal(client.saved.length, 3);
  assert.deepEqual(client.completed, [[quiz.lectureId, true]], 'Final scoring includes pending choices before a render flush');
  assert.equal(client.events.filter(event => event.name === 'quiz_complete').length, 1);
  client.render(); assert(text(client.tree()).includes('パーフェクト（3/3）'));
});
check('resetting a completed attempt clears its celebration', () => {
  const client = harness(); answerAll(client);
  const hasConfetti = () => nodes(client.tree()).some(node => node.props?.className === 'fixed inset-0 pointer-events-none z-50 overflow-hidden');
  assert(hasConfetti(), 'A just-completed perfect attempt has its celebration');
  client.context.quizResults = {}; client.render();
  assert(!hasConfetti(), 'An unanswered attempt cannot retain a previous perfect-score celebration');
  assert(client.options(quiz.questions[0].id).every(node => !node.props.disabled));
});
check('native and modified keyboard actions are preserved', () => {
  const client = harness({ quiz, nextLecture: { id: 'lecture-intro-2', title: '次の講義' } });
  for (const flag of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat', 'isComposing', 'defaultPrevented']) {
    assert.equal(client.key('a', { [flag]: true }), false, flag + ' must not grade');
  }
  assert.equal(client.key('a', { target: { tagName: 'INPUT' } }), false);
  assert.equal(client.key('a', { target: { tagName: 'SUMMARY', closest: () => ({}) } }, true), false);
  assert.equal(client.key('a', {}, true), false, 'A dialog or nested interactive control owns its keys');
  assert.equal(client.saved.length, 0);
  answerAll(client);
  assert.equal(client.key('Enter', { target: { tagName: 'SUMMARY', closest: () => ({}) } }), false, 'Opening a disclosure cannot navigate away');
  assert.equal(client.key('Enter', {}, true), false, 'An open glossary dialog does not trigger lecture navigation');
  assert.equal(client.pushes.length, 0);
});
check('course continuation, incomplete steps and final return use actual routing handlers', () => {
  for (const course of LEARNING_COURSES) {
    const first = course.steps[0].lectureId;
    const ownQuiz = CURRICULUM_QUIZZES[first];
    const client = harness({ quiz: ownQuiz, courseJourney: resolveCourseJourney(first, course.slug), nextLecture: { id: 'lecture-practice-1', title: '全講義順' } });
    ownQuiz.questions.forEach(question => { client.choose(question, question.correctIndex); client.render(); });
    client.button('コースの次のステップへ').props.onClick();
    assert.equal(client.pushes[0], `/curriculum/${course.steps[1].lectureId}?course=${course.slug}`);
    const last = course.steps.at(-1).lectureId, lastQuiz = CURRICULUM_QUIZZES[last];
    const lastClient = harness({ quiz: lastQuiz, courseJourney: resolveCourseJourney(last, course.slug) }, { completedLectures: Object.fromEntries(course.steps.slice(0, -1).map(step => [step.lectureId, true])) });
    lastQuiz.questions.forEach(question => { lastClient.choose(question, question.correctIndex); lastClient.render(); });
    assert.equal(lastClient.key('Enter'), true);
    assert.equal(lastClient.pushes[0], `/learn/courses/${course.slug}#course-next`);
  }
});
check('restored success does not falsely claim an unchecked lecture is recorded', () => {
  const client = harness({ quiz }, { quizResults: Object.fromEntries(quiz.questions.map(question => [question.id, { userAnswerIndex: question.correctIndex }])) });
  assert(!text(client.tree()).includes('受講完了が自動記録されました'), 'A restored score cannot assert a completion record that is false');
  assert.equal(client.completed.length, 0, 'Rendering does not override a manually unchecked lecture');
});
check('perfect score text derives its denominator', () => {
  const short = { ...quiz, passingScore: 1, questions: quiz.questions.slice(0, 2) };
  const client = harness({ quiz: short }); short.questions.forEach(question => { client.choose(question, question.correctIndex); client.render(); });
  assert(text(client.tree()).includes('パーフェクト（2/2）'));
});
check('explanation reading uses a real heading or a focused body fallback', () => {
  const first = quiz.questions[0];
  const explicit = { ...first, relatedSectionTitle: '確認する見出し' };
  const explicitClient = harness({ quiz: { ...quiz, questions: [explicit, ...quiz.questions.slice(1)] } });
  explicitClient.addHeading('matched-heading', '確認する見出し');
  explicitClient.choose(explicit, explicit.correctIndex); explicitClient.render();
  explicitClient.button('「確認する見出し」を講義本文で読み直す').props.onClick();
  assert.deepEqual(explicitClient.scrolls, ['matched-heading']);
  assert.deepEqual(explicitClient.focused, ['matched-heading']);
  assert.deepEqual(explicitClient.highlights, ['matched-heading']);
  const generic = { ...first, question: '【見つからない設問ラベル】問い', relatedSectionTitle: undefined };
  const fallback = harness({ quiz: { ...quiz, questions: [generic, ...quiz.questions.slice(1)] } });
  fallback.choose(generic, generic.correctIndex); fallback.render();
  assert(!text(fallback.tree()).includes('「見つからない設問ラベル」を講義本文で読み直す'), 'Inferred topics are not promised as specific headings');
  fallback.button('講義本文を読み直す').props.onClick();
  assert.deepEqual(fallback.scrolls, ['lecture-content']);
  assert.deepEqual(fallback.focused, ['lecture-content'], 'Fallback moves keyboard focus to the reading body');
  assert.deepEqual(fallback.highlights, [], 'Fallback does not falsely highlight an unmatched topic');
});
let questionGrades = 0;
check('every published lecture grades real option clicks for perfect and incorrect attempts', () => {
  for (const group of Object.values(CURRICULUM_QUIZZES)) {
    for (const correct of [true, false]) {
      const client = harness({ quiz: group });
      for (const question of group.questions) {
        client.choose(question, correct ? question.correctIndex : (question.correctIndex + 1) % question.options.length); client.render();
        const record = client.saved.at(-1);
        assert.equal(record.questionId, question.id);
        assert.equal(record.lectureId, group.lectureId);
        assert.equal(record.isCorrect, correct);
        assert.deepEqual([...record.options], [...question.options]);
        questionGrades++;
      }
      assert.equal(client.saved.length, group.questions.length, group.lectureId + ': each original option is graded once');
      const completion = client.events.filter(event => event.name === 'quiz_complete');
      assert.equal(completion.length, 1);
      assert.equal(completion[0].data.score, correct ? group.questions.length : 0);
      assert.equal(completion[0].data.passed, correct);
      assert.equal(client.completed.length, correct ? 1 : 0, group.lectureId + ': failed attempts cannot grant lecture completion');
      assert(text(client.tree()).includes(`この${group.questions.length}問は講義の基本事項を確かめる練習です`));
    }
  }
});
if (failures.length) assert.fail(failures.join('\n'));
console.log(`Passed: ${checks} actual quiz-handler flows, ${Object.keys(CURRICULUM_QUIZZES).length} lectures / ${questionGrades} option grades, ${LEARNING_COURSES.length} course routes, partial/final grading, retries, shuffle, pending batches, ready/reset isolation, native keyboard behavior and reading focus.`);
