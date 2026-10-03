/* eslint-disable @typescript-eslint/no-require-imports -- Offline rendering checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  let file = path.resolve(root, relative);
  if (!path.extname(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const localRequire = id => {
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (['@/components/CurriculumDiagram', '@/components/EastWestTermSwitch', '@/components/glossary/GlossaryPopup'].includes(id)) return () => null;
    if (id === './CitationBadge') return ({ displayNumber, targetAnchorId }) => React.createElement('sup', { 'data-reference': targetAnchorId }, displayNumber);
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, URL, console, process }, { filename: file });
  return exports;
}
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const { resolveReadingInsertions } = load('src/utils/readingInserts');
const { ARTICLES, getArticlePreviews } = load('src/data/articleData');
const { ARTICLE_READING_GUIDES } = load('src/data/articleReadingGuides');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_READING_INSERTS, createCurriculumReadingLinks, getCurriculumRelatedArticleIds } = load('src/data/curriculumReadingGuides');
const MarkdownBody = load('src/components/MarkdownBody').default;
const articleIds = new Set(ARTICLES.map(article => article.id));
const figureIds = new Set();
let checkedFigures = 0;

function checkInsertions(id, content, inserts) {
  const blocks = parseMarkdownBlocks(content);
  const original = JSON.stringify(blocks);
  const placements = resolveReadingInsertions(blocks, inserts);
  assert.equal(Array.from(placements.values()).flat().length, inserts.length, id + ' placement: heading or paragraph changed');
  assert.equal(JSON.stringify(blocks), original, id + ' source block preservation');
  const plain = renderToStaticMarkup(React.createElement(MarkdownBody, { contentMarkdown: content, idPrefix: 'test-heading' }));
  const illustrated = renderToStaticMarkup(React.createElement(MarkdownBody, { contentMarkdown: content, idPrefix: 'test-heading', readingInserts: inserts }));
  const headingIds = html => Array.from(html.matchAll(/<h[1-4][^>]*id="([^"]+)"/g), match => match[1]).join('|');
  assert.equal(headingIds(illustrated), headingIds(plain), id + ' stable heading anchors and TOC');
  assert.equal((illustrated.match(/data-reading-figure=/g) || []).length, inserts.length, id + ' figure rendering');
  for (const insert of inserts) {
    const figure = insert.figure;
    assert(!figureIds.has(figure.id), 'duplicate figure id ' + figure.id);
    figureIds.add(figure.id);
    assert(figure.items.length >= 2 && figure.items.length <= 3, id + ' readable concept count');
    assert(illustrated.includes(`id="reading-figure-${figure.id}"`), id + ' jump target');
    assert(illustrated.includes(`aria-labelledby="reading-figure-${figure.id}-title"`), id + ' accessible name');
    assert(illustrated.includes(figure.caption.replaceAll('&', '&amp;')), id + ' scope caption');
    for (const item of figure.items) assert(illustrated.includes(item.label.replaceAll('&', '&amp;')), id + ' HTML concept label');
    checkedFigures += 1;
  }
  assert(!/<svg[^>]*>[\s\S]*?<text\b/.test(illustrated), id + ' labels must not shrink inside SVG');
}

assert.equal(Object.keys(ARTICLE_READING_GUIDES).length, ARTICLES.length);
for (const article of ARTICLES) {
  const guide = ARTICLE_READING_GUIDES[article.id];
  checkInsertions(article.id, article.contentMarkdown, guide.inserts);
  assert.equal(guide.nextArticles.length, 3);
  assert.equal(new Set(guide.nextArticles.map(link => link.articleId)).size, 3);
  for (const link of guide.nextArticles) {
    assert(articleIds.has(link.articleId) && link.articleId !== article.id, article.id + ' relevant article destination');
    assert(link.reason.length >= 24 && link.reason.length <= 45, article.id + ' reason explains what to read next');
  }
}
const lectures = CURRICULUM_DATA.flatMap(series => series.lectures);
for (const [lectureId, inserts] of Object.entries(CURRICULUM_READING_INSERTS)) {
  const lecture = lectures.find(item => item.id === lectureId);
  assert(lecture, lectureId + ' exists');
  checkInsertions(lectureId, lecture.contentMarkdown, inserts);
}
for (const lecture of lectures) {
  const links = createCurriculumReadingLinks(lecture.id, getArticlePreviews(getCurriculumRelatedArticleIds(lecture.id)));
  assert(links.length <= 2, lecture.id + ' limited related reading');
  for (const link of links) assert(articleIds.has(link.href.split('/').pop()), lecture.id + ' live article destination');
}
for (const preview of getArticlePreviews(Array.from(articleIds))) assert(!('contentMarkdown' in preview), 'article list must not ship all bodies');

// Paragraph placement must ignore lists/tables/custom diagrams and retain nested subheadings.
const sample = '## A\n\nOne.\n\n- item\n\n### Detail\n\n:::diagram unused\n\nTwo.\n\n## B\n\nThree.';
const sampleBlocks = parseMarkdownBlocks(sample);
const marker = { id: 'sample', title: 'Sample', layout: 'compare', items: [], caption: '' };
const positions = resolveReadingInsertions(sampleBlocks, [{ afterHeading: 'A', afterParagraph: 2, figure: marker }]);
assert.equal(sampleBlocks[Array.from(positions.keys())[0]].content, 'Two.');
assert.equal(resolveReadingInsertions(sampleBlocks, [{ afterHeading: 'Missing', afterParagraph: 1, figure: marker }]).size, 0);
assert.equal(resolveReadingInsertions(sampleBlocks, [{ afterHeading: 'B', afterParagraph: 2, figure: marker }]).size, 0);
assert.equal(checkedFigures, 20);
console.log(`Passed: ${ARTICLES.length} articles, ${Object.keys(CURRICULUM_READING_INSERTS).length} lectures, ${checkedFigures} figure placements/renderings, stable heading anchors, 36 related destinations, and metadata-only article previews.`);
