/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the actual learning hub, reader order and compatibility destinations. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader({ Intl });
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { LEARNING_COURSES } = load('src/data/learningCourses');
const { LEARNING_COURSES_HREF, resolveCourseJourney, getCourseNextAction } = load('src/utils/courseJourney');
const { revealLectureSection } = load('src/utils/lectureAnchors');
const lectures = CURRICULUM_DATA.flatMap(chapter => chapter.lectures);
const plain = value => JSON.parse(JSON.stringify(value));
const Empty = () => null;
const Link = ({ href, children }) => React.createElement('a', { href }, children);
const Markdown = () => null;
const Quiz = () => null;
const Application = () => null;
const Assessment = () => null;
const References = () => null;
const CourseCards = () => null;
const Guide = () => null;
const flatten = (node, result = []) => { if (Array.isArray(node)) node.forEach(child => flatten(child, result)); else if (node && typeof node === 'object') { result.push(node); flatten(node.props?.children, result); } return result; };
const text = node => Array.isArray(node) ? node.map(text).join('') : typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? text(node.props?.children) : '';
let progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: null, totalCompleted: 0, quizResults: {}, toggleLectureCompleted() {}, recordVisitedLecture() {} };
let availability = 'ready', syncStatus = 'local';
const docTargets = new Map(), listeners = new Map(), pushes = [], events = [];
let saveSucceeds = false;
const windowMock = { location: { search: '', hash: '' }, scrollTo() {}, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name, fn) => { if (listeners.get(name) === fn) listeners.delete(name); } };
const documentMock = { getElementById: id => docTargets.get(id) || null, documentElement: {}, body: {} };
function component(relative, extra = () => undefined, globals = {}) {
  const file = path.join(root, relative), exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require: id => {
    const mocked = extra(id); if (mocked !== undefined) return mocked;
    if (id === 'next/link') return Link;
    if (id === '@/data/curriculumIndexCatalog') return component('src/data/curriculumIndexCatalog.ts', external => external === 'server-only' ? {} : undefined);
    if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }) };
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ status: syncStatus, values: {} }) };
    if (id === '@/contexts/AuthContext') return { useAuth: () => ({ isAuthenticated: false }) };
    if (id === '@/hooks/useProgressAvailability') return { useProgressAvailability: () => availability };
    if (id === '@/utils/analytics') return { trackEvent: (...args) => events.push(args) };
    if (id === '@/utils/draftNote') return { saveDraftPatientNote: () => saveSucceeds };
    if (id === '@/components/home/RecentTools') return { useRecentTools: () => [] };
    if (id === '@/components/InteractiveQuiz') return { InteractiveQuiz: Quiz };
    if (id === '@/components/MarkdownBody') return Markdown;
    if (id === '@/components/ArticleReferences') return References;
    if (id === '@/components/clinical/ClinicalLectureApplication') return Application;
    if (id === '@/components/curriculum/ChapterAssessment') return Assessment;
    if (id === '@/components/learning/LearningCourseCards') return CourseCards;
    if (id === '@/components/learning/LearningGuideStart') return Guide;
    if (id === '@/components/learning/ContentNavigationLink' || id === './ContentNavigationLink') return Link;
    if (id.startsWith('@/components/')) return Empty;
    return id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  }, console, URLSearchParams, window: windowMock, document: documentMock, ...globals }, { filename: file });
  return exports;
}
function readerHost() {
  const slots = [], refs = [], effects = []; let cursor = 0, tree;
  const hooks = { ...React, useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }]; }, useRef(initial) { const index = cursor++; if (!(index in slots)) { slots[index] = { current: initial }; refs.push(slots[index]); } return slots[index]; }, useEffect(effect) { effects.push(effect); } };
  const Reader = component('src/components/curriculum/CurriculumLectureReader.tsx', id => id === 'react' ? hooks : undefined).default;
  return { render(lecture, patch = {}) { cursor = 0; effects.length = 0; tree = Reader({ lecture, lectureNavigation: lectures, quiz: CURRICULUM_QUIZZES[lecture.id], resolvedReferences: [], reviewQuestions: [], chapterAssessment: null, ...patch }); return tree; }, nodes: () => flatten(tree), text: () => text(tree), refs, effects };
}

(async () => {
  // One canonical hub owns the resume action, all course cards and course list schema.
  const Hub = component('src/app/learn/page.tsx').default;
  const hub = flatten(Hub());
  assert(hub.some(node => node.type === Guide));
  const cards = hub.find(node => node.type === CourseCards);
  assert.deepEqual(plain(cards.props.courses.map(course => course.slug)), plain(LEARNING_COURSES.map(course => course.slug)));
  assert.equal(hub.filter(node => node.type === CourseCards).length, 1);
  assert(hub.some(node => node.props?.id === 'learn-courses-heading'));
  const schema = JSON.parse(hub.find(node => node.type === 'script').props.dangerouslySetInnerHTML.__html);
  const list = schema['@graph'].find(item => item['@type'] === 'CollectionPage');
  assert.equal(list.url, 'https://www.haritaro.jp/learn');
  assert.deepEqual(plain(list.mainEntity.itemListElement.map(item => item.url)), plain(LEARNING_COURSES.map(course => 'https://www.haritaro.jp/learn/courses/' + course.slug)));
  const Redirect = component('src/app/learn/courses/page.tsx', id => id === 'next/navigation' ? { permanentRedirect(destination) { throw Object.assign(new Error('redirect'), { destination }); } } : undefined).default;
  assert.throws(() => Redirect(), error => error.destination === LEARNING_COURSES_HREF);
  const Course = component('src/app/learn/courses/[slug]/page.tsx', id => id === 'next/navigation' ? { notFound() { throw new Error('not found'); } } : undefined);
  for (const course of LEARNING_COURSES) {
    const page = flatten(await Course.default({ params: Promise.resolve({ slug: course.slug }) }));
    assert(page.some(node => node.type === Link && node.props.href === LEARNING_COURSES_HREF), course.slug + ': back to canonical list');
    const metadata = await Course.generateMetadata({ params: Promise.resolve({ slug: course.slug }) });
    assert.equal(metadata.alternates.canonical, 'https://www.haritaro.jp/learn/courses/' + course.slug, course.slug + ': preserve individual course URL');
  }

  const GuideStart = component('src/components/learning/LearningGuideStart.tsx').default;
  progress = { ...progress, totalCompleted: 2, completedLectures: { [lectures[0].id]: true, [lectures[1].id]: true }, lastVisitedLectureId: lectures[1].id };
  let guide = flatten(GuideStart({ lectures }));
  assert(guide.some(node => node.props?.id === 'learning-progress'));
  assert(guide.some(node => node.type === 'progress' && node.props.value === 2 && node.props.max === lectures.length));
  for (const state of ['loading', 'unavailable']) {
    availability = state; guide = flatten(GuideStart({ lectures }));
    assert(!guide.some(node => node.type === 'progress'), state + ': no previous owner progress');
    assert(guide.some(node => node.type === Link && node.props.href.includes(LEARNING_COURSES[0].steps[0].lectureId)));
  }
  availability = 'ready';
  const CardClient = component('src/components/learning/LearningCourseCardsClient.tsx').default;
  const cardTree = flatten(CardClient({ courses: LEARNING_COURSES, readingMinutes: Object.fromEntries(LEARNING_COURSES.map(course => [course.slug, 10])) }));
  assert.equal(cardTree.filter(node => node.type === 'progress').length, LEARNING_COURSES.length, 'Each course displays its own progress');
  const HomeSupport = component('src/components/home/HomeLearningProgressClient.tsx', id => id === 'react' ? { ...React, useMemo: fn => fn() } : undefined).default;
  assert(flatten(HomeSupport({ lectures, supportOnly: true })).some(node => node.type === Link && node.props.href === '/learn#learning-progress'), 'Home progress opens the actual progress section');
  const completed = Object.fromEntries(lectures.map(lecture => [lecture.id, true]));
  assert.equal(load('src/utils/homeLearningEntry').getHomeLearningEntry(lectures, completed, lectures.at(-1).id).href, LEARNING_COURSES_HREF);

  // Render every actual lesson: no supplemental block sits between its body, existing quiz and continuation.
  progress = { ...progress, completedLectures: {}, totalCompleted: 0, lastVisitedLectureId: null };
  const reader = readerHost();
  for (const lecture of lectures) {
    reader.render(lecture, { chapterAssessment: { id: 'chapter-fixture' } });
    const article = reader.nodes().find(node => node.type === 'article');
    const children = flatten([article.props.children]).filter(node => article.props.children.includes(node));
    const body = children.findIndex(node => node.props?.id === 'lecture-content');
    const quiz = children.findIndex(node => node.props?.id === 'lecture-quiz');
    const continuation = children.findIndex(node => node.props?.className?.includes('curriculum-lecture-completion'));
    const supplements = children.findIndex(node => node.props?.id === 'lecture-supplements');
    assert.deepEqual([quiz, continuation, supplements], [body + 1, body + 2, body + 3], lecture.id + ': body, quiz, next, supplements');
    assert.equal(reader.nodes().find(node => node.type === Markdown).props.contentMarkdown, lecture.contentMarkdown, lecture.id + ': keep body and headings intact');
    assert.equal(reader.nodes().find(node => node.type === Quiz).props.quiz, CURRICULUM_QUIZZES[lecture.id], lecture.id + ': preserve existing grading data');
    assert(flatten(children[supplements]).some(node => node.type === Assessment), lecture.id + ': chapter assessment remains available');
    assert.equal(children[supplements].props.open, undefined, 'Supplemental material starts collapsed');
    assert(reader.nodes().some(node => node.type === References), lecture.id + ': sources remain available outside supplement');
    if (['intro', 'zangfu', 'meridians'].includes(lecture.seriesId) || ['stage-2', 'stage-3'].includes(lecture.stageId)) assert(flatten(children[supplements]).some(node => node.type === Application));
  }
  const course = LEARNING_COURSES[0], first = lectures.find(lecture => lecture.id === course.steps[0].lectureId);
  reader.render(first);
  reader.nodes().find(node => typeof node.props?.onResolve === 'function').props.onResolve({ lectureId: first.id, journey: resolveCourseJourney(first.id, course.slug) });
  reader.render(first);
  const actions = reader.nodes().find(node => node.props?.className === 'curriculum-lecture-primary-actions');
  assert(flatten(actions).some(node => node.type === Link && node.props.href === getCourseNextAction(resolveCourseJourney(first.id, course.slug), {}).href), 'The primary next action retains its course context');

  // Existing fragment links reveal collapsed ancestors, both from in-page clicks and browser hash navigation.
  const outer = { tagName: 'DETAILS', open: false, parentElement: null }, inner = { tagName: 'DETAILS', open: false, parentElement: outer };
  const target = { tagName: 'SECTION', parentElement: inner, scrollIntoView() {} };
  revealLectureSection(target); assert(outer.open && inner.open);
  outer.open = inner.open = false; docTargets.set('chapter-assessment', target);
  reader.refs[0].current = { contains: node => node === target, scrollIntoView() {} };
  reader.nodes().find(node => node.type === 'article').props.onClickCapture({ target: { closest: () => ({ getAttribute: () => '#chapter-assessment' }) } });
  assert(outer.open && inner.open, 'In-page anchor opens the original chapter assessment');
  outer.open = inner.open = false; windowMock.location.hash = '#chapter-assessment';
  const cleanups = reader.effects.map(effect => effect()).filter(value => typeof value === 'function');
  assert(outer.open && inner.open, 'Direct fragment URLs reveal supplements');
  outer.open = inner.open = false; listeners.get('hashchange')(); assert(outer.open && inner.open, 'Browser hash navigation reveals supplements');
  assert.doesNotThrow(() => reader.nodes().find(node => node.type === 'article').props.onClickCapture({ target: { closest: () => ({ getAttribute: () => '#%invalid' }) } }));
  cleanups.forEach(cleanup => cleanup());

  // A failed draft handoff keeps the reader open; retry succeeds without changing the lesson.
  const clinical = lectures.find(lecture => lecture.stageId === 'stage-2');
  reader.render(clinical); pushes.length = 0;
  const save = () => reader.nodes().find(node => node.type === 'button' && text(node).includes('この講義を臨床ノートに記録')).props.onClick();
  save(); reader.render(clinical);
  assert.equal(pushes.length, 0);
  assert(reader.nodes().some(node => node.props?.role === 'alert' && text(node).includes('保存できませんでした')));
  saveSucceeds = true; save(); reader.render(clinical);
  assert.deepEqual(pushes, ['/notes']);
  assert(!reader.nodes().some(node => node.props?.role === 'alert' && text(node).includes('保存できませんでした')));
  assert.equal(events.filter(([name]) => name === 'curriculum_save_to_note').length, 1, 'Only a successful handoff records the save event');
  const markup = renderToStaticMarkup(React.createElement(CardClient, { courses: LEARNING_COURSES, readingMinutes: Object.fromEntries(LEARNING_COURSES.map(course => [course.slug, 10])) }));
  assert.equal((markup.match(/クイズ・演習の時間は別です/g) || []).length, 0, 'Shared timing explanation is not repeated on eleven cards');
  console.log('Learning usability: canonical hub/legacy redirect, 11 preserved course URLs and progress cards, all 94 body→quiz→next flows, course context, fragment access and failed-save recovery passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
