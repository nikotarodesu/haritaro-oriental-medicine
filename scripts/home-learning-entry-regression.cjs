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
let lastVisitedLectureId = null;
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
    if (id.endsWith('.module.css')) return { __esModule: true, default: new Proxy({}, { get: (_, name) => String(name) }) };
    if (id === 'next/link') return { __esModule: true, default: props => React.createElement('a', { href: props.href, className: props.className }, props.children) };
    if (id === '@/components/design/PageIntro') return { __esModule: true, default: ({ title, children }) => React.createElement('header', null, title, children) };
    if (id === '@/contexts/CurriculumProgressContext') return { useCurriculumProgress: () => ({ isMounted: true, lastVisitedLectureId }) };
    if (id === '@/utils/analytics') return { trackEvent() {} };
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
assert.equal(entry(lectures, complete, 'lecture-yinyang-4').href, '/learn#learning-course-list');


const home = renderToStaticMarkup(React.createElement(load('src/app/page').default));
assert.match(home, /role="search"/);
assert.match(home, /action="\/search"/);
assert.match(home, /<input(?=[^>]*type="search")(?=[^>]*name="q")[^>]*>/);
const destinationPairs = [['/tsubo','はり太郎のツボ図鑑'], ['/learn','はり太郎の東洋医学'], ['/clinical','はり太郎の臨床演習']];
const homeActions = home.match(/<ul class="platform-series-grid">([\s\S]*?)<\/ul>/)[1];
for (const [[href, name], action] of destinationPairs.map((pair, index) => [pair, ['ツボを調べる', '講義を読む', '症例で練習する'][index]])) {
  const card = homeActions.split('</li>').find(item => item.includes(`href="${href}"`));
  assert(card?.includes(action) && card.includes('<svg'), `${name} is reachable through its illustrated homepage action`);
}
assert(home.includes('href="/symptoms"'));
assert.doesNotMatch(home, />\s*知\s*</);
assert.match(home, /<h1[^>]*>東洋医学を学ぶ<\/h1>/);
assert(home.includes('href="/learn/acupuncture"'), 'The acupuncture guide remains available from home');
assert(home.indexOf('role="search"') < home.indexOf('class="platform-series-grid"'));
assert(home.indexOf('class="platform-series-grid"') < home.indexOf('href="/symptoms"'), 'The general guide follows the main paths');
assert(home.indexOf('href="/symptoms"') < home.indexOf('href="/tsubo/li4#acupoint-location"'), 'The featured figure follows the choices in DOM order');
const collection = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
assert.equal(collection.name, '東洋医学を学ぶ');
assert(home.includes(collection.description), 'The homepage description matches the visible introduction');
assert.equal(collection.isPartOf['@id'], 'https://www.haritaro.jp/#website');
assert.deepEqual(collection.mainEntity.itemListElement.map(item => [new URL(item.url).pathname, item.name]), destinationPairs);
assert(home.indexOf('id="platform-series-title"') < home.indexOf('id="platform-index-title"'));
assert(!home.includes('学習履歴を確認中') && !home.includes('href="/pricing"') && !home.includes('href="/notes"'));

const reading = renderToStaticMarkup(React.createElement(load('src/app/learn/page').default));
const { getPublicLectureGroups } = load('src/data/publicLectures');
const { readingUnits, getLectureIndexGroups, readingPartHref, readingLinkHref } = load('src/data/publicLectures/readingUnits');
const { readingLectureMerges } = load('src/data/publicLectures/readingLectureMerges');
for (const href of [readingUnits[0].href, '/learn/essentials', '/diagnosis', '/articles', '/curriculum']) assert(reading.includes('href="' + href + '"'), href);
const ReadingStart = load('src/components/curriculum/PublicReadingStart').default;
assert.match(reading, /第1講から読む/);
lastVisitedLectureId = 'lecture-diagnosis-4';
const resumedReading = renderToStaticMarkup(React.createElement(ReadingStart, { firstHref: readingUnits[0].href }));
assert(resumedReading.includes('href="' + readingPartHref(lastVisitedLectureId) + '"') && resumedReading.includes('続きから読む'));
lastVisitedLectureId = 'unknown-lecture';
assert.match(renderToStaticMarkup(React.createElement(ReadingStart, { firstHref: readingUnits[0].href })), /第1講から読む/);
lastVisitedLectureId = null;
const readingChapters = getLectureIndexGroups('reading');
const sourceChapters = getPublicLectureGroups('reading');
const readingOrder = readingChapters.flatMap(group => group.entries.map(entry => entry.href));
assert.equal(readingUnits.length + readingLectureMerges.length, 24, 'The previous 24 addresses remain accounted for');
for (const [former, current] of readingLectureMerges) {
  assert(!readingUnits.some(unit => unit.slug === former), former + ' is no longer a separate lecture');
  assert(readingUnits.some(unit => unit.slug === current), current + ' is a current lecture');
}
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
const contentsStart = reading.indexOf('<section id="learn-courses-heading"');
const contentsEnd = reading.indexOf('id="oriental-reading"', contentsStart);
assert(contentsStart >= 0 && contentsEnd > contentsStart, 'Lecture contents are the first group after the introduction');
const contents = reading.slice(contentsStart, contentsEnd);
assert.equal((reading.match(/id="learn-courses-heading"/g) || []).length, 1, 'The hub has one lecture index');
assert(reading.includes('href="#learn-courses-heading"'), 'The introduction links to the index');
assert(contents.includes('id="learning-path-title"') && contents.includes('id="reading-topics"'), 'Existing lecture index bookmarks reach the same section');
assert(contents.includes('id="learn-yin-yang-example"'), 'The illustrated example remains with the lecture index');
const chapterAnchors = Array.from(contents.matchAll(/<section id="chapter-([^"]+)"/g), match => match[1]);
assert.equal(chapterAnchors.join('|'), readingChapters.map(chapter => chapter.id).join('|'), 'All chapter anchors remain in the published order');
const contentsLinks = Array.from(contents.matchAll(/href="(\/learn\/lectures\/[a-z0-9-]+)"/g), match => match[1]);
assert.equal(contentsLinks.join('|'), readingOrder.join('|'), 'The index links to all 16 lectures once in reading order');
assert(contents.includes('<section id="chapter-intro"><details class="reader-contents" open="">'), 'The first chapter shows its lectures before interaction');
assert.equal((contents.match(/<details[^>]*\sopen=""/g) || []).length, 1, 'Other chapters can be opened when needed');
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
console.log(`Passed: three public series, the single reading index and legacy bookmarks, 12 examples, diagrams and section links, and ${readingOrder.length} consolidated lectures in index order.`);
