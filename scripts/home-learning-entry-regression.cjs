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
  const base = path.resolve(root, name);
  const file = [base + '.ts', base + '.tsx', path.join(base, 'index.ts')].find(candidate => fs.existsSync(candidate));
  assert(file, `Cannot resolve ${name}`);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(code, { exports, require: id => {
    if (id === 'next/link') return { __esModule: true, default: props => React.createElement('a', { href: props.href, className: props.className }, props.children) };
    if (id === '@/components/design/PageIntro') return { __esModule: true, default: ({ title, children }) => React.createElement('header', null, title, children) };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  } }, { filename: file });
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


const home = renderToStaticMarkup(React.createElement(load('src/app/page').default));
assert.match(home, /role="search"/);
assert.match(home, /action="\/search"/);
assert.match(home, /<input(?=[^>]*type="search")(?=[^>]*name="q")[^>]*>/);
const destinationPairs = [['/tsubo','はり太郎のツボ図鑑'], ['/learn','はり太郎の東洋医学'], ['/clinical','はり太郎の臨床演習']];
for (const [href, name] of destinationPairs) assert(home.includes('href="' + href + '">' + name + '</a>'), name);
assert(home.includes('href="/symptoms"'));
assert.match(home, /<h1[^>]*>知<\/h1>/);
assert(!home.includes('学習履歴を確認中') && !home.includes('href="/pricing"') && !home.includes('href="/notes"'));

const reading = renderToStaticMarkup(React.createElement(load('src/app/learn/page').default));
for (const href of ['/curriculum/lecture-intro-1', '/diagnosis', '/articles', '/curriculum']) assert(reading.includes('href="' + href + '"'), href);
const { getPublicLectureGroups, getPublicLectureReadingPosition } = load('src/data/publicLectures');
const readingChapters = getPublicLectureGroups('reading');
const readingOrder = readingChapters.flatMap(group => group.entries.map(article => article.id));
const readingIds = new Set(readingOrder);
assert(readingIds.size > 1);
for (const { id } of getPublicLectureGroups().flatMap(group => group.entries)) {
  assert.equal(reading.includes(`href="/curriculum/${id}"`), readingIds.has(id), id);
  if (!readingIds.has(id)) assert.equal(getPublicLectureReadingPosition(id), null, id);
}
for (const chapter of readingChapters) {
  chapter.entries.forEach(({ id }, index) => {
    const position = getPublicLectureReadingPosition(id);
    const ordinal = readingOrder.indexOf(id);
    assert.equal(position.chapter, chapter.label, id);
    assert.equal(position.number, index + 1, id);
    assert.equal(position.total, chapter.entries.length, id);
    assert.equal(position.previous?.id, readingOrder[ordinal - 1], id);
    assert.equal(position.next?.id, readingOrder[ordinal + 1], id);
  });
}
const learningMap = reading.match(/<nav[^>]*aria-labelledby="learning-path-title"[^>]*>(.*?)<\/nav>/)?.[1];
assert(learningMap, 'The ordered study map renders on the public reading hub');
const mapLinks = Array.from(learningMap.matchAll(/href="\/curriculum\/([^"]+)"/g), match => match[1]);
assert.equal(mapLinks.length, 5);
let lastMapStop = -1;
for (const id of mapLinks) {
  const stop = readingChapters.findIndex(chapter => chapter.entries[0].id === id);
  assert(stop > lastMapStop, id + ' starts a reading chapter in the index order');
  lastMapStop = stop;
}
assert(!reading.includes('学習履歴を確認中') && !reading.includes('href="/notes"'));
console.log(`Passed: homepage search and three series, public study map, ${readingOrder.length} adjacent lectures in index order, and legacy learning URL selection.`);
