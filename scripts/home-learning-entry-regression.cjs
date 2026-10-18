/* eslint-disable @typescript-eslint/no-require-imports -- Matches the existing CommonJS regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(name) {
  const file = path.resolve(root, name + (name.endsWith('.ts') ? '' : '.ts'));
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, require: id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id) });
  return exports;
}
const { getHomeLearningEntry: entry } = load('src/utils/homeLearningEntry');
const { LEARNING_COURSES } = load('src/data/learningCourses');
const lectures = [...LEARNING_COURSES.flatMap(course => course.steps.map(step => ({ id: step.lectureId, title: step.title }))), { id: 'lecture-diagnosis-1', title: '四診' }];
assert.equal(entry(lectures, {}, null).href, '/learn/courses/oriental-medicine-introduction');
assert.equal(entry(lectures, {}, null).started, false);
assert.equal(entry(lectures, {}, 'lecture-yinyang-2').href, '/curriculum/lecture-yinyang-2?course=yinyang-foundations');
assert.equal(entry(lectures, { 'lecture-yinyang-1': true, 'lecture-yinyang-2': true }, 'lecture-yinyang-2').href, '/curriculum/lecture-yinyang-3?course=yinyang-foundations');
const diagnosisCourse = LEARNING_COURSES.find(course => course.seriesId === 'diagnosis');
assert.equal(entry(lectures, {}, 'lecture-diagnosis-1').href, `/curriculum/lecture-diagnosis-1?course=${diagnosisCourse.slug}`);
assert.equal(entry([...lectures, { id: 'lecture-yinyang-5', title: '各論' }], {}, 'lecture-yinyang-5').href, '/curriculum/lecture-yinyang-5');
assert(!entry(lectures, {}, 'https://invalid.example').href.includes('invalid'));
const complete = Object.fromEntries(lectures.map(lecture => [lecture.id, true]));
assert.equal(entry(lectures, complete, 'lecture-yinyang-4').href, '/learn#learn-courses-heading');

// Render the actual primary home action against hydrated and loading progress.
let progress = { isMounted: false, completedLectures: {}, lastVisitedLectureId: null };
let guideAvailability = 'ready', guideSyncStatus = 'local';
const Link = ({ href, placement, children, ...props }) => React.createElement('a', { ...props, href, 'data-placement': placement }, children);
const Start = () => null;
const Card = () => null;
function homeComponent(relative) {
  const file = path.join(root, relative), exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, require: id => {
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => ({ status: guideSyncStatus }) };
    if (id === '@/hooks/useProgressAvailability') return { useProgressAvailability: () => guideAvailability };
    if (id === '@/components/learning/ContentNavigationLink' || id === './ContentNavigationLink') return { __esModule: true, default: Link };
    if (id === '@/components/home/HomeLearningStartClient') return { __esModule: true, default: Start };
    if (id === '@/components/home/HomeLearningProgressClient') return { __esModule: true, default: Card };
    if (id === '@/components/home/HomeArtwork') return { HomeToolIcon: () => null };
    if (id === 'lucide-react') return { ArrowRight: () => null, BookOpen: () => null };
    return id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id);
  } });
  return exports.default;
}
const ProgressCard = homeComponent('src/components/HomeLearningProgressCard.tsx');
const hero = ProgressCard({ variant: 'hero' });
assert.equal(hero.type, Start, 'The primary entry uses the compact resume-aware client');
assert.equal(ProgressCard({}).type, Card, 'The separate progress card retains its detailed presentation');
assert(hero.props.lectures.length > 0);
assert(hero.props.lectures.every(lecture => Object.keys(lecture).sort().join(',') === 'id,title'), 'The primary client receives only public resume IDs and titles');
assert.match(fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8'), /<HomeLearningProgressCard variant="hero"\s*\/>/, 'The homepage primary action is wired to the resume-aware variant');
const StartClient = homeComponent('src/components/home/HomeLearningStartClient.tsx');
const renderStart = () => renderToStaticMarkup(React.createElement(StartClient, { lectures }));
let startMarkup = renderStart();
assert(startMarkup.includes('第1講から始める') && startMarkup.includes('href="/curriculum/lecture-intro-1?course=oriental-medicine-introduction"'), 'The loading shell keeps the direct first-lecture entry');
progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: null };
assert(renderStart().includes('第1講から始める'), 'A new learner starts with the first lecture');
progress.lastVisitedLectureId = 'lecture-yinyang-2';
startMarkup = renderStart();
assert(startMarkup.includes('続きから学ぶ') && startMarkup.includes('href="/curriculum/lecture-yinyang-2?course=yinyang-foundations"'), 'A returning reader sees the current lecture as the primary action');
assert(!startMarkup.includes('第1講から始める'));
progress.completedLectures = { 'lecture-yinyang-1': true, 'lecture-yinyang-2': true };
assert(renderStart().includes('href="/curriculum/lecture-yinyang-3?course=yinyang-foundations"'), 'Finishing a lecture advances the primary action within its course');
progress = { isMounted: true, completedLectures: complete, lastVisitedLectureId: 'lecture-yinyang-4' };
startMarkup = renderStart();
assert(startMarkup.includes('復習するコースを選ぶ') && startMarkup.includes('href="/learn#learn-courses-heading"'), 'A learner who completed all lectures chooses a course to review instead of seeing a misleading next-lecture prompt');
assert(!startMarkup.includes('続きから学ぶ') && !startMarkup.includes('第1講から始める'));
progress = { isMounted: false, completedLectures: complete, lastVisitedLectureId: 'lecture-yinyang-2' };
assert(!renderStart().includes('続きから学ぶ'), 'Unready owner data cannot expose a previous learner resume action');
progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: 'https://outside.example/private' };
assert(!renderStart().includes('outside.example'), 'Invalid saved IDs never become a primary navigation destination');

// The learning guide has the same resume semantics, with one primary action
// and explicit unavailable/loading feedback instead of a second resume card.
const GuideStart = homeComponent('src/components/learning/LearningGuideStart.tsx');
const renderGuide = () => renderToStaticMarkup(React.createElement(GuideStart, { lectures }));
const guideSource = fs.readFileSync(path.join(root, 'src/app/learn/page.tsx'), 'utf8');
assert.match(guideSource, /<LearningGuideStart lectures=/, 'The learning guide wires its resume-aware primary action');
assert(!guideSource.includes('HomeLearningProgressCard'), 'The learning guide has no competing large resume card');
assert.equal((guideSource.match(/href="\/curriculum"/g) || []).length, 1, 'The learning guide has one full-curriculum destination');
progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: null, totalCompleted: 0 };
let guideMarkup = renderGuide();
assert(guideMarkup.includes('第1講から始める') && guideMarkup.includes('href="/curriculum/lecture-intro-1?course=oriental-medicine-introduction"'));
assert.equal((guideMarkup.match(/class="page-primary-action"/g) || []).length, 1);
progress = { isMounted: true, completedLectures: { 'lecture-yinyang-1': true }, lastVisitedLectureId: 'lecture-yinyang-2', totalCompleted: 1 };
guideMarkup = renderGuide();
assert(guideMarkup.includes('続きから学ぶ') && guideMarkup.includes('href="/curriculum/lecture-yinyang-2?course=yinyang-foundations"') && guideMarkup.includes('1 / '), 'Ready learning history selects the current course lecture');
progress.completedLectures['lecture-yinyang-2'] = true;
assert(renderGuide().includes('href="/curriculum/lecture-yinyang-3?course=yinyang-foundations"'), 'Completing a lecture advances the single guide entry');
guideAvailability = 'loading'; progress.isMounted = false;
guideMarkup = renderGuide();
assert(guideMarkup.includes('学習履歴を確認中') && guideMarkup.includes('第1講から始める') && !guideMarkup.includes('続きから学ぶ') && !guideMarkup.includes('1 / '), 'Loading owner records cannot expose the previous resume or count');
guideAvailability = 'unavailable';
guideMarkup = renderGuide();
assert(guideMarkup.includes('保存済みの記録は削除していません') && guideMarkup.includes('再読み込み') && !guideMarkup.includes('続きから学ぶ'), 'Unavailable storage keeps a safe entry and recovery feedback');
guideAvailability = 'ready'; guideSyncStatus = 'offline'; progress.isMounted = true;
assert(renderGuide().includes('クラウドへの同期は未完了'), 'Offline progress keeps visible sync feedback');
guideSyncStatus = 'local';
progress = { isMounted: true, completedLectures: complete, lastVisitedLectureId: 'lecture-yinyang-4', totalCompleted: Object.keys(complete).length };
guideMarkup = renderGuide();
assert(guideMarkup.includes('復習するコースを選ぶ') && guideMarkup.includes('href="/learn#learn-courses-heading"') && !guideMarkup.includes('続きから学ぶ'), 'All-complete history offers review rather than a nonexistent next lecture');
const { SITE_UPDATES } = load('src/config/contentUpdates');
assert(SITE_UPDATES.length > 3, 'Full update archive remains available');
console.log('Home and learning-guide entries passed: one primary action, actual first/resume/next/review destinations, loading-owner isolation, unavailable recovery, offline feedback and preserved home hero.');
