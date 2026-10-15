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
const Link = ({ href, placement, children, ...props }) => React.createElement('a', { ...props, href, 'data-placement': placement }, children);
const Start = () => null;
const Card = () => null;
function homeComponent(relative) {
  const file = path.join(root, relative), exports = {};
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, require: id => {
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => progress };
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
const { SITE_UPDATES } = load('src/config/contentUpdates');
assert(SITE_UPDATES.length > 3, 'Full update archive remains available');
console.log('Home entry passed: primary hero wiring, actual resume-aware button, loading/new-owner isolation, first visit, last lecture, next course step, direct lecture, invalid ID and all-complete history.');
