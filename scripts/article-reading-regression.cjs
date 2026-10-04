const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  let file = path.resolve(root, relative);
  if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, TextEncoder, URL, console }, { filename: file });
  return exports;
}
const reading = load('src/utils/articleReadingPosition');
const { getBodyReadingPosition, getHeadingJumpScroll } = load('src/utils/readingProgress');
const { ARTICLES } = load('src/data/articleData');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const sync = load('src/utils/learningSync');
const catalog = ARTICLES.map(article => ({ articleId: article.id, revision: reading.articleReadingRevision(article.contentMarkdown),
  headingIds: parseMarkdownBlocks(article.contentMarkdown).flatMap((block, index) => block.type === 'h2' ? ['article-heading-' + index] : []) }));
for (const article of catalog) {
  assert(article.headingIds.length > 0, article.articleId + ' has live resume sections');
  assert.equal(new Set(article.headingIds).size, article.headingIds.length);
  const position = reading.createArticleReadingPosition(article, article.headingIds[Math.floor(article.headingIds.length / 2)], 41.6, '2026-10-04T01:00:00.000Z');
  assert.equal(position.progress, 42);
  assert.equal(reading.articleReadingResumeHref(position, article), `/articles/${article.articleId}#${position.headingId}`);
  assert.equal(JSON.stringify(Object.keys(position).sort()), JSON.stringify(['articleId', 'headingId', 'progress', 'revision', 'updatedAt', 'version']), 'only public IDs and viewing position are stored');
  assert(reading.validArticleReadingPosition(position, article));
}
const meta = catalog[0];
const position = reading.createArticleReadingPosition(meta, meta.headingIds[1], 42, '2026-10-04T01:00:00.000Z');
const laterPosition = reading.createArticleReadingPosition(catalog[1], catalog[1].headingIds[1], 100, '2026-10-04T02:00:00.000Z');
for (const invalid of [null, {}, [], { ...position, version: 2 }, { ...position, articleId: '../notes?text=private' },
  { ...position, revision: 'outdated' }, { ...position, headingId: 'article-heading-99999' }, { ...position, headingId: 'javascript:alert(1)' },
  { ...position, progress: -1 }, { ...position, progress: 101 }, { ...position, progress: NaN }, { ...position, progress: 1.1 },
  { ...position, updatedAt: '2026-02-30T01:00:00.000Z' }]) assert.equal(reading.validArticleReadingPosition(invalid, meta), false);
assert.notEqual(reading.articleReadingRevision('original'), reading.articleReadingRevision('original + changed paragraph'));
assert.equal(reading.readArticleReadingPosition({ [reading.articleReadingKey(meta.articleId)]: position }, { ...meta, revision: '00000000' }), null, 'revised article cannot resume against old paragraph anchors');
assert.equal(reading.articleReadingResumeHref({ ...position, headingId: 'missing' }, meta), '/articles/' + meta.articleId);
assert.throws(() => reading.articleReadingKey('https://example.com'));
assert.equal(reading.readArticleReadingPosition({ 'settings:article-reading:other': position }, meta), null);
const device = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const key = reading.articleReadingKey(meta.articleId);
const entry = sync.nextLearningEntry({}, key, position, device);
let ownerA = { [key]: entry };
const ownerB = {};
assert.equal(reading.readArticleReadingPositions(sync.learningValues(ownerA), catalog).length, 1);
assert.equal(reading.readArticleReadingPositions(sync.learningValues(ownerB), catalog).length, 0, 'another owner has no imported reading position');
const second = sync.nextLearningEntry(ownerA, reading.articleReadingKey(catalog[1].articleId), laterPosition, device);
ownerA = { ...ownerA, [second.key]: second };
assert.equal(reading.readArticleReadingPositions(sync.learningValues(ownerA), catalog)[0].articleId, catalog[1].articleId, 'latest viewing position sorts first');
const beforeReset = ownerA;
const reset = sync.nextLearningEntry(ownerA, 'reset', { at: '2026-10-04T03:00:00.000Z' }, device);
ownerA = sync.mergeLearningDocuments({ ...ownerA, reset }, beforeReset);
assert.equal(reading.readArticleReadingPositions(sync.learningValues(ownerA), catalog).length, 0, 'learning reset also clears old reading positions');
assert(new TextEncoder().encode(JSON.stringify(position)).length < 500, 'positions stay far below the sync byte limit');

const body = { top: 200, height: 2400, viewportHeight: 800, headerHeight: 80, toolbarHeight: 44 };
let geometry = getBodyReadingPosition(body);
assert.equal(geometry.visible, false, 'toolbar stays hidden before the article body');
assert.equal(geometry.progress, 0);
geometry = getBodyReadingPosition({ ...body, top: 80 });
assert.equal(geometry.visible, true);
assert.equal(geometry.progress, 0);
geometry = getBodyReadingPosition({ ...body, top: -760 });
assert.equal(geometry.progress, 50);
assert.equal(geometry.visible, true);
geometry = getBodyReadingPosition({ ...body, top: -1600 });
assert.equal(geometry.progress, 100);
assert.equal(geometry.visible, true, '100% viewport position alone does not mark all sections read');
geometry = getBodyReadingPosition({ ...body, top: -2300 });
assert.equal(geometry.visible, false, 'fixed toolbar hides over related articles and references');
assert.equal(getBodyReadingPosition({ ...body, toolbarHeight: 88 }).threshold, 184, 'large font toolbar height participates in heading offsets');
assert.equal(getBodyReadingPosition({ ...body, height: 300, top: 80 }).progress, 100, 'short articles do not divide by zero');
assert.equal(getHeadingJumpScroll({ ...body, headingTop: 1540, scrollY: 400, documentHeight: 6000 }), 1800);
assert.equal(getHeadingJumpScroll({ ...body, headingTop: 4000, scrollY: 400, documentHeight: 1800 }), 1000, 'jump clamps to the real document end');
assert.equal(getHeadingJumpScroll({ ...body, headingTop: -1000, scrollY: 100, documentHeight: 6000 }), 0, 'jump cannot scroll above the document');

// Reproduce selecting the last TOC section then leaving before any rAF callback.
const browserExports = {};
const fakeWindow = { innerHeight: 800, scrollY: 1000, location: { hash: '#reading-figure-first' }, history: { pushState(_state, _title, fragment) { fakeWindow.location.hash = fragment; } }, scrollTo({ top, behavior }) { assert.equal(behavior, 'instant'); fakeWindow.scrollY = top; } };
const attributes = new Map();
const selectedHeading = { getBoundingClientRect: () => ({ top: 5700 - fakeWindow.scrollY }), hasAttribute: name => attributes.has(name), setAttribute: (name, value) => attributes.set(name, value), removeAttribute: name => attributes.delete(name), addEventListener() {}, focus({ preventScroll }) { assert(preventScroll); fakeDocument.activeElement = selectedHeading; } };
const selectedBody = { contains: element => element === selectedHeading, getBoundingClientRect: () => ({ top: 500 - fakeWindow.scrollY, height: 6000 }) };
const fakeDocument = { activeElement: null, documentElement: { scrollHeight: 7500 }, getElementById: id => id === 'article-heading-54' ? selectedHeading : null,
  querySelector: selector => selector === 'header' ? { getBoundingClientRect: () => ({ height: 68 }) } : selector === '[data-reading-toolbar]' ? { getBoundingClientRect: () => ({ height: 48 }) } : selector === '#article-content [data-reading-body]' ? selectedBody : null };
const browserSource = ts.transpileModule(fs.readFileSync(path.join(root, 'src/utils/readingProgress.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
vm.runInNewContext(browserSource, { exports: browserExports, window: fakeWindow, document: fakeDocument });
const explicit = browserExports.jumpToReadingHeading('article-heading-54', '#article-content [data-reading-body]');
assert.equal(explicit.headingId, 'article-heading-54', 'selected section is available synchronously, before a scroll frame');
assert.equal(fakeWindow.scrollY, 5568);
assert.equal(selectedHeading.getBoundingClientRect().top, 132, 'selected section aligns below measured header and toolbar');
assert.equal(fakeWindow.location.hash, '#article-heading-54');
assert.equal(fakeDocument.activeElement, selectedHeading);
const immediateMeta = { ...meta, headingIds: ['article-heading-49', 'article-heading-54'] };
const immediate = reading.createArticleReadingPosition(immediateMeta, explicit.headingId, explicit.progress, '2026-10-04T04:00:00.000Z');
const immediateEntry = sync.nextLearningEntry({}, reading.articleReadingKey(meta.articleId), immediate, device);
assert.equal(reading.readArticleReadingPosition(sync.learningValues({ [immediateEntry.key]: immediateEntry }), immediateMeta).headingId, 'article-heading-54', 'immediate departure keeps the selected section rather than the preceding pending section');
assert.equal(browserExports.jumpToReadingHeading('outside-body', '#article-content [data-reading-body]'), null);
console.log(`Article reading regression passed: ${catalog.length} live articles, revision-safe anchors, public-only fields, owner isolation, reset/merge, body-scoped geometry, and synchronous TOC/resume jump focus and persistence.`);
