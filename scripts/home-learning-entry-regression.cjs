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
assert.equal(entry(lectures, complete, 'lecture-yinyang-4').href, '/learn/courses');

// Render the actual primary home action against hydrated and loading progress.
let progress = { isMounted: false, completedLectures: {}, lastVisitedLectureId: null };
let syncState = { values: {}, status: 'local' };
let authenticated = false;
let recentTools = [];
let progressAvailability = 'ready';
const Link = ({ href, placement, children, ...props }) => React.createElement('a', { ...props, href, 'data-placement': placement }, children);
const Start = () => null;
const Card = () => null;
function homeComponent(relative) {
  const file = path.join(root, relative), exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, require: id => {
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
    if (id === '@/contexts/LearningSyncContext') return { useLearningSync: () => syncState };
    if (id === '@/contexts/AuthContext') return { useAuth: () => ({ isAuthenticated: authenticated }) };
    if (id === '@/hooks/useProgressAvailability') return { useProgressAvailability: () => progressAvailability };
    if (id === '@/components/home/RecentTools') return { useRecentTools: () => recentTools };
    if (id === '@/utils/analytics') return { trackEvent() {} };
    if (id === 'next/link') return { __esModule: true, default: Link };
    if (id === '@/components/learning/ContentNavigationLink') return { __esModule: true, default: Link };
    if (id === '@/components/home/HomeLearningStartClient') return { __esModule: true, default: Start };
    if (id === '@/components/home/HomeLearningProgressClient') return { __esModule: true, default: Card };
    if (id === '@/components/home/HomeArtwork') return { HomeToolIcon: () => null };
    if (id === 'lucide-react') return { ArrowRight: () => null };
    return id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id);
  } });
  return exports.default;
}
const ProgressCard = homeComponent('src/components/HomeLearningProgressCard.tsx');
const hero = ProgressCard({ variant: 'hero' });
assert.equal(hero.type, Start, 'The primary entry uses the compact resume-aware client');
assert.equal(ProgressCard({}).type, Card, 'The separate progress card retains its detailed presentation');
assert.equal(ProgressCard({ variant: 'support' }).props.supportOnly, true, 'The homepage support variant requests the secondary presentation');
assert.equal(ProgressCard({}).props.supportOnly, false, 'Learning pages retain their full resume card');
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
assert(startMarkup.includes('復習するコースを選ぶ') && startMarkup.includes('href="/learn/courses"'), 'A learner who completed all lectures chooses a course to review instead of seeing a misleading next-lecture prompt');
assert(!startMarkup.includes('続きから学ぶ') && !startMarkup.includes('第1講から始める'));
progress = { isMounted: false, completedLectures: complete, lastVisitedLectureId: 'lecture-yinyang-2' };
assert(!renderStart().includes('続きから学ぶ'), 'Unready owner data cannot expose a previous learner resume action');
progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: 'https://outside.example/private' };
assert(!renderStart().includes('outside.example'), 'Invalid saved IDs never become a primary navigation destination');

// Render the actual support component: the hero owns the primary action, while
// progress and storage/sync failures remain reachable in the compact section.
const SupportClient = homeComponent('src/components/home/HomeLearningProgressClient.tsx');
const renderSupport = () => renderToStaticMarkup(React.createElement(SupportClient, { lectures, supportOnly: true }));
progress = { isMounted: false, completedLectures: {}, lastVisitedLectureId: null, totalCompleted: 0, quizResults: {} };
progressAvailability = 'loading';
assert.equal(renderSupport(), '', 'An unready owner does not expose another learner progress or recommendation');
progress = { ...progress, isMounted: true };
progressAvailability = 'ready';
assert.equal(renderSupport(), '', 'A first visit does not add a duplicate first-lecture card below the hero');
progress = { ...progress, lastVisitedLectureId: 'lecture-yinyang-2', totalCompleted: 2, completedLectures: { 'lecture-yinyang-1': true, 'lecture-yinyang-2': true } };
let supportMarkup = renderSupport();
assert(supportMarkup.includes('<summary>学習の記録') && supportMarkup.includes('2 / '), 'Returning learners retain completion counts in the secondary disclosure');
assert(!supportMarkup.includes('ui-button-primary') && !supportMarkup.includes('home-start-button'), 'The support section never adds another primary action');
assert(/href="\/(?:curriculum|learn|simulator)/.test(supportMarkup), 'The progress disclosure retains its public learning recommendation');
recentTools = [
  { href: '/tsubo', title: '経穴辞典' }, { href: '/notes', title: 'ノート' },
  { href: '/learn/review', title: '講義の復習' }, { href: '/simulator', title: '弁証推論' },
];
supportMarkup = renderSupport();
for (const tool of recentTools.slice(0, 3)) assert(supportMarkup.includes(`href="${tool.href}"`), 'The three most recent public tool destinations remain available');
assert(!supportMarkup.includes('弁証推論'), 'Recent tools remain bounded to three entries');
progressAvailability = 'unavailable';
supportMarkup = renderSupport();
assert(supportMarkup.includes('role="status"') && supportMarkup.includes('履歴を読み込めませんでした') && supportMarkup.includes('再読み込み'), 'Storage or history failures remain visible outside the disclosure');
assert(!supportMarkup.includes('<summary>学習の記録'), 'Unavailable history does not present stale completion counts');
recentTools = [];
progress = { isMounted: true, completedLectures: {}, lastVisitedLectureId: null, totalCompleted: 0, quizResults: {} };
progressAvailability = 'ready';
authenticated = true;
for (const status of ['offline', 'setup']) {
  syncState = { values: {}, status };
  supportMarkup = renderSupport();
  assert(supportMarkup.includes('role="status"') && supportMarkup.includes('href="/learn/review#learning-review"'), `${status}: cloud sync attention cannot disappear for a learner without local history or recent tools`);
  assert(!supportMarkup.includes('ui-button-primary'), `${status}: sync recovery remains a secondary action`);
}
authenticated = false;
syncState = { values: {}, status: 'local' };
const { SITE_UPDATES } = load('src/config/contentUpdates');
assert(SITE_UPDATES.length > 3, 'Full update archive remains available');
console.log('Home entry passed: actual hero/support variants, one primary action, owner isolation, first/return/all-complete history, retained recommendations/recent tools, and visible storage/offline/setup recovery.');
