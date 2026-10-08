/* eslint-disable @typescript-eslint/no-require-imports -- Execute the actual learning controls against ready/loading owner fixtures. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader();
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_CHAPTERS_META } = load('src/data/curriculumOutline');
const { LEARNING_QUESTIONS } = load('src/data/learningQuestionBank');
const { getLearningCourseForSeries } = load('src/data/learningCourses');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const catalog = { chapters: CURRICULUM_CHAPTERS_META, lectures, plannedLessons: {} };
const Link = () => null;
const Empty = () => null;
function nodes(node, list = []) {
  if (Array.isArray(node)) { node.forEach(child => nodes(child, list)); return list; }
  if (!node || typeof node !== 'object') return list;
  list.push(node); nodes(node.props?.children, list); return list;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? text(node.props?.children) : '';
}
function component(relative, requireMock) {
  const file = path.join(root, relative), exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, require: id => requireMock(id) ?? (id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id)), console, URLSearchParams }, { filename: file });
  return exports;
}

// Use the real progress provider methods, so the controls also exercise the
// shared readiness guard instead of assuming a successful write in a UI mock.
let sync = { ready: false, values: {} }, owner = 'guest';
const writes = [];
const providerReact = { ...React, useMemo: compute => compute(), useCallback: callback => callback };
const Provider = component('src/contexts/CurriculumProgressContext.tsx', id => {
  if (id === 'react') return providerReact;
  if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ ...sync,
    setEntry(key, value) { writes.push({ owner, key, value }); sync.values = { ...sync.values, [key]: value }; }, reset() {} }) };
}).CurriculumProgressProvider;
let progress;
function updateProgress() {
  progress = Provider({ children: null, catalog: { questions: LEARNING_QUESTIONS, totalPublished: lectures.length, totalPlanned: lectures.length } }).props.value;
}
updateProgress();
function harness(relative, props) {
  let cursor = 0, tree, params = new URLSearchParams();
  const slots = [];
  const fakeReact = { ...React, useEffect() {},
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
  };
  const Component = component(relative, id => {
    if (id === 'react') return fakeReact;
    if (id === 'next/link') return Link;
    if (id === 'next/navigation') return { useRouter: () => ({ push() {} }), useSearchParams: () => params };
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (id === '@/utils/analytics') return { trackEvent() {} };
    if (id === '@/utils/referenceResolver') return { resolveArticleReferences: () => [] };
    if (id === '@/components/InteractiveQuiz') return { InteractiveQuiz: Empty };
    if (id === '@/components/LearningMap') return { LearningMap: Empty };
    if (id === '@/components/IncorrectQuestionsModal') return { IncorrectQuestionsModal: Empty };
    if (id === '@/components/learning/LearningCourseLink') return { CourseJourneyResolver: Empty };
    if (id.startsWith('@/components/')) return Empty;
  }).default;
  return { render(nextProps = props, nextParams = params) { props = nextProps; params = nextParams; cursor = 0; updateProgress(); tree = Component(props); return tree; },
    nodes: () => nodes(tree), text: () => text(tree) };
}
const reader = harness('src/components/curriculum/CurriculumLectureReader.tsx', { lecture: lectures[0], lectureNavigation: lectures });
const index = harness('src/components/curriculum/CurriculumIndexClient.tsx', { catalog, relatedArticles: [] });
const completionButtons = client => client.nodes().filter(node => node.type === 'button' && typeof node.props['aria-pressed'] === 'boolean');
function click(node) { node.props.onClick({ preventDefault() {}, stopPropagation() {} }); }

// Loading controls are visibly disabled. Invoke their actual handlers as well,
// proving that non-DOM callers cannot turn an ignored click into a saved flag.
reader.render(); index.render();
assert.equal(completionButtons(reader).length, 2, 'Both top and bottom reader controls are covered');
assert.equal(completionButtons(index).length, CURRICULUM_CHAPTERS_META[0].lectureIds.length, 'Every expanded chapter completion control is covered');
for (const client of [reader, index]) for (const button of completionButtons(client)) {
  assert.equal(button.props.disabled, true);
  assert.equal(button.props['aria-pressed'], false);
  assert(/確認中/.test(text(button)), 'Readiness is visible, not only a hidden tooltip');
  click(button);
}
progress.toggleLectureCompleted(lectures[0].id);
progress.setLectureCompleted(lectures[0].id, true);
assert.equal(writes.length, 0, 'Neither control nor provider saves a loading-state completion');

// A hydrated owner can mark and unmark the same lecture using either reader
// position, and the actual index reflects the same shared record.
sync = { ready: true, values: {} }; owner = 'account-a';
reader.render(); index.render();
for (const client of [reader, index]) assert(completionButtons(client).every(button => !button.props.disabled));
click(completionButtons(reader)[0]); reader.render(); index.render();
assert(completionButtons(reader).every(button => button.props['aria-pressed']));
assert.equal(completionButtons(index)[0].props['aria-pressed'], true);
assert(reader.text().includes('受講完了（解除する）'));
click(completionButtons(reader)[1]); reader.render(); index.render();
assert.equal(completionButtons(index)[0].props['aria-pressed'], false);
click(completionButtons(index)[1]); reader.render({ lecture: lectures[1], lectureNavigation: lectures });
assert(completionButtons(reader).every(button => button.props['aria-pressed']), 'Index completion reaches the matching reader');
assert(writes.every(write => write.owner === 'account-a'));

// During owner restoration, previous records do not make the UI actionable.
// After the new owner is ready, its first click is attributed only to it.
const beforeTransition = writes.length;
sync = { ready: false, values: {} }; owner = 'account-b';
reader.render(); index.render();
for (const client of [reader, index]) for (const button of completionButtons(client)) { assert(button.props.disabled); click(button); }
progress.setLectureCompleted(lectures[1].id, true);
assert.equal(writes.length, beforeTransition);
sync = { ready: true, values: {} }; reader.render();
assert(completionButtons(reader).every(button => !button.props['aria-pressed']));
click(completionButtons(reader)[0]);
assert.equal(writes.at(-1).owner, 'account-b');
assert.equal(writes.at(-1).key, 'lecture:' + lectures[1].id);

// All lecture review cards retain question/return links, while stage-0/1 use
// that chapter's ungraded short example and stage-2/3 keep the clinical cases.
const card = harness('src/components/learning/ReviewQuestionCard.tsx', { lectureId: lectures[0].id });
for (const lecture of lectures) {
  const question = LEARNING_QUESTIONS.find(item => item.kind === 'lecture' && item.lectureId === lecture.id);
  const params = new URLSearchParams({ review: question.id });
  card.render({ lectureId: lecture.id }, params);
  const links = card.nodes().filter(node => node.type === Link);
  const chapter = CURRICULUM_CHAPTERS_META.find(item => item.lectureIds.includes(lecture.id));
  const clinical = ['stage-2', 'stage-3'].includes(chapter.stageId);
  const course = getLearningCourseForSeries(chapter.seriesId);
  const expected = clinical ? '/simulator#case-training' : `/learn/courses/${course.slug}#course-mini-case-${course.seriesId}`;
  assert(links.some(link => link.props.href === expected), lecture.id + ': the appropriate learning stage is preserved');
  assert.equal(links.some(link => link.props.href === '/simulator#case-training'), clinical);
  assert(card.text().includes(question.question) && card.text().includes(question.explanation));
  assert(links.some(link => link.props.href === '/kokushi#learning-review'));
}
const validSession = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
card.render({ lectureId: lectures[0].id }, new URLSearchParams({ review: LEARNING_QUESTIONS.find(item => item.lectureId === lectures[0].id).id, reviewSession: validSession }));
assert(card.nodes().some(node => node.type === Link && node.props.href === `/kokushi?resumeReview=${validSession}#learning-review-practice`), 'Stage-specific practice does not discard the interrupted review return');
card.render({ lectureId: lectures[1].id });
assert.equal(card.text(), '', 'A mismatched question never offers a misleading practice destination');
const customId = 'tsubo-unknown-meridian';
sync.values['quiz:' + customId] = { questionId: customId, lectureId: 'external-reading', chapterId: 'tsubo', chapterTitle: '経穴', lectureTitle: '経穴',
  questionText: '確認問題', options: ['正答', '誤答'], userAnswerIndex: 0, correctAnswerIndex: 0, isCorrect: true,
  explanation: '位置と判断を分ける', answeredAt: '2026-10-08T00:00:00.000Z', kind: 'acupoint', revision: 'custom-revision' };
card.render({ lectureId: 'external-reading' }, new URLSearchParams({ review: customId }));
assert(card.nodes().some(node => node.type === Link && node.props.href === '/glossary'), 'Unknown lecture stages fall back to vocabulary rather than clinical judgment');
assert(card.nodes().some(node => node.type === Link && node.props.href === '/tsubo/practice'), 'Acupoint review retains its original exercise');
console.log(`Passed: actual reader/index completion controls, loading/provider guards, mark/unmark and owner transitions; ${lectures.length} staged review cards, session return and unknown-stage fallback.`);
