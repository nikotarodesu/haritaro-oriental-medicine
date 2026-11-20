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
  vm.runInNewContext(code, { exports, URL, require: id => {
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
assert.doesNotMatch(home, />\s*知\s*</);
assert.match(home, /<h1[^>]*>ツボと東洋医学<\/h1>/);
assert.match(home, /href="\/learn"><svg[^>]*>[\s\S]*?<\/svg>東洋医学を学ぶ<\/a>/);
const collection = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
assert.deepEqual(collection.mainEntity.itemListElement.map(item => [new URL(item.url).pathname, item.name]), destinationPairs);
assert(home.indexOf('id="platform-series-title"') < home.indexOf('id="platform-index-title"'));
assert(!home.includes('学習履歴を確認中') && !home.includes('href="/pricing"') && !home.includes('href="/notes"'));

const reading = renderToStaticMarkup(React.createElement(load('src/app/learn/page').default));
const { getPublicLectureGroups } = load('src/data/publicLectures');
const { readingUnits, getLectureIndexGroups, readingPartHref, readingLinkHref } = load('src/data/publicLectures/readingUnits');
for (const href of [readingUnits[0].href, '/learn/essentials', '/diagnosis', '/articles', '/curriculum']) assert(reading.includes('href="' + href + '"'), href);
const readingChapters = getLectureIndexGroups('reading');
const sourceChapters = getPublicLectureGroups('reading');
const readingOrder = readingChapters.flatMap(group => group.entries.map(entry => entry.href));
assert.equal(readingUnits.length, 24);
assert.equal(readingOrder.join('|'), readingUnits.map(unit => unit.href).join('|'));
assert.equal(new Set(readingOrder).size, readingOrder.length);
for (const href of readingOrder) assert(reading.includes(`href="${href}"`), href);
assert(!reading.includes('href="/curriculum/lecture-'));
for (const chapter of sourceChapters) {
  const contained = readingUnits.filter(unit => unit.chapter === chapter.id).flatMap(unit => unit.parts.map(part => part.lectureId));
  assert.equal([...contained].sort().join('|'), chapter.entries.map(entry => entry.id).sort().join('|'), chapter.id + ' contains each original part once');
}
for (const unit of readingUnits) {
  for (const part of unit.parts) {
    assert.equal(readingPartHref(part.lectureId), unit.href + '#' + part.anchor);
    assert.equal(readingLinkHref('/curriculum/' + part.lectureId, unit.href), '#' + part.anchor);
  }
}
const learningMap = reading.match(/<nav[^>]*aria-labelledby="learning-path-title"[^>]*>(.*?)<\/nav>/)?.[1];
assert(learningMap, 'The ordered study map renders on the public reading hub');
const mapLinks = Array.from(learningMap.matchAll(/href="(\/learn\/lectures\/[^"]+)"/g), match => match[1]);
assert.equal(mapLinks.length, 5);
let lastMapStop = -1;
for (const href of mapLinks) {
  const stop = readingChapters.findIndex(chapter => chapter.entries[0].href === href);
  assert(stop > lastMapStop, href + ' starts a reading chapter in the index order');
  lastMapStop = stop;
}
assert(!reading.includes('学習履歴を確認中') && !reading.includes('href="/notes"'));
const essentials = renderToStaticMarkup(React.createElement(load('src/app/learn/essentials/page').default));
const essentialTopics = [...essentials.matchAll(/<article[^>]*class="essentials-topic"[^>]*>/g)];
assert.equal(essentialTopics.length, 12);
for (const [, anchor] of essentials.matchAll(/href="#([^"]+)"/g)) {
  assert(essentials.includes(`id="${anchor}"`), anchor + ' is a live topic group');
}
const deepLinks = [...essentials.matchAll(/href="(\/learn\/lectures\/[^"]+#[^"]+)"/g)];
assert.equal(deepLinks.length, 12);
const partHrefs = new Set(readingUnits.flatMap(unit => unit.parts.map(part => readingPartHref(part.lectureId))));
for (const [, href] of deepLinks) assert(partHrefs.has(href), href + ' is a real section in a consolidated lecture');
assert.equal((essentials.match(/class="essentials-example"/g) || []).length, 12);
assert.equal((essentials.match(/<details class="essentials-diagram">/g) || []).length, 12);
assert.equal((essentials.match(/data-study-diagram="/g) || []).length, 12);
console.log(`Passed: three public series, study map, 12 examples, diagrams and section links, and ${readingOrder.length} consolidated lectures in index order.`);
