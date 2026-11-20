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
    if (['@/components/CurriculumDiagram', '@/components/EastWestTermSwitch'].includes(id)) return () => null;
    if (id === './CitationBadge') return ({ displayNumber, targetAnchorId }) => React.createElement('sup', { 'data-reference': targetAnchorId }, displayNumber);
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, URL, console, process }, { filename: file });
  return exports;
}
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const { resolveConceptArtPlacement, resolveReadingInsertions } = load('src/utils/readingInserts');
const { ARTICLES, getArticlePreviews } = load('src/data/articleData');
const { ARTICLE_READING_GUIDES } = load('src/data/articleReadingGuides');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_READING_INSERTS, CURRICULUM_READING_QUESTIONS, createCurriculumReadingLinks, getCurriculumRelatedArticleIds } = load('src/data/curriculumReadingGuides');
const MarkdownBody = load('src/components/MarkdownBody').default;
const StudyDiagram = load('src/components/reading/StudyDiagram').default;
const { getPublicLectureGroups, getPublicLectureArticle } = load('src/data/publicLectures/index');
const { getPublicLectureDiagram, publicLectureDiagrams } = load('src/data/publicLectures/diagrams/index');
const { readingUnits } = load('src/data/publicLectures/readingUnits');
const { readingUnitRevisions } = load('src/data/publicLectures/revisions/index');
const { reviseLectureSections } = load('src/data/publicLectures/revisions/types');
const articleIds = new Set(ARTICLES.map(article => article.id));
const figureIds = new Set();
let checkedFigures = 0;

const publicLectures = getPublicLectureGroups().flatMap(group => group.entries.map(entry => entry.id));
assert.equal(Object.keys(publicLectureDiagrams).length, publicLectures.length);
for (const lectureId of publicLectures) {
  const diagram = getPublicLectureDiagram(lectureId);
  assert(diagram && diagram.items.length >= 2 && diagram.items.length <= 6, lectureId);
  assert((diagram.afterSection ?? 1) <= getPublicLectureArticle(lectureId).sections.length, lectureId + ' figure placement');
  const id = 'reading-figure-' + (diagram.anchor ?? lectureId);
  const html = renderToStaticMarkup(React.createElement(StudyDiagram, { diagram, id }));
  assert(html.includes('aria-labelledby="' + id + '-title"') && html.includes('<figcaption'), lectureId);
  assert(html.includes('<svg') && !html.includes('<text'), lectureId + ' has SVG connections and scalable HTML text');
  const paths = Array.from(html.matchAll(/<svg[^>]*class="study-diagram-flow-arrow"/g)).length;
  assert.equal(paths, diagram.layout === 'flow' ? diagram.items.length - 1 : 0, lectureId + ' flow connections');
  if (diagram.layout === 'relations') assert.equal((html.match(/<svg/g) || []).length, diagram.items.length, lectureId);
}
console.log(`Passed: ${publicLectures.length} public lectures have restrained, accessible SVG diagrams placed beside the explanation.`);

assert.equal(Object.keys(readingUnitRevisions).length, readingUnits.length, 'Every published unit has tailored copy and a recap');
for (const unit of readingUnits) {
  const revision = readingUnitRevisions[unit.slug];
  assert(revision, unit.slug);
  assert.equal(Object.keys(revision.copy).length, unit.parts.length, unit.slug);
  let before = 0;
  let after = 0;
  for (const { lectureId } of unit.parts) {
    const original = getPublicLectureArticle(lectureId);
    const copy = revision.copy[lectureId];
    assert.equal(copy?.length, original.sections.length, lectureId + ' keeps every existing section and figure position');
    assert(copy.every(text => text != null), lectureId + ' uses edited prose in every section');
    const edited = reviseLectureSections(original.sections, copy);
    assert(edited.every(section => section.paragraphs.length && section.paragraphs.every(text => text.trim())), lectureId);
    assert.equal(JSON.stringify(edited.map(section => [section.heading, section.links])), JSON.stringify(original.sections.map(section => [section.heading, section.links])), lectureId);
    before += original.lead.length + original.sections.flatMap(section => section.paragraphs).join('').length;
    after += edited.flatMap(section => section.paragraphs).join('').length;
  }
  assert(after < before, unit.slug + ' removes repeated introductory prose');
  assert.equal(new Set(revision.takeaways).size, 3, unit.slug);
  assert.equal(revision.questions.length, 2, unit.slug);
  for (const item of revision.questions) {
    assert.equal(new Set(item.choices).size, 3, unit.slug + ' has three distinct choices');
    assert(item.question.trim() && item.choices[item.answer]?.trim() && item.explanation.trim(), unit.slug);
  }
}
console.log(`Passed: ${readingUnits.length} edited units preserve section anchors and source links, each with three takeaways and two explained questions.`);

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
    if (figure.exercise) {
      assert(illustrated.includes(figure.exercise.prompt), id + ' example asks the reader to compare');
      const exercise = illustrated.match(new RegExp(`<details data-reading-exercise="${figure.id}"[^>]*>[\\s\\S]*?<\\/details>`))?.[0];
      assert(exercise && !/<details[^>]*\sopen(?:[\s=>])/.test(exercise), id + ' answer starts hidden until the reader asks');
      assert(exercise.includes(figure.exercise.answer), id + ' authored reasoning remains available');
    }
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
for (const [lectureId, questions] of Object.entries(CURRICULUM_READING_QUESTIONS)) {
  const lecture = lectures.find(item => item.id === lectureId);
  assert(lecture, lectureId + ' question guide exists');
  const headings = parseMarkdownBlocks(lecture.contentMarkdown).filter(block => block.type === 'h2').map(block => block.content);
  assert(questions.length >= 2 && questions.length <= 3, lectureId + ' concise question guide');
  for (const question of questions) assert(headings.includes(question.heading), lectureId + ' question points to an existing heading');
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
assert.equal(resolveConceptArtPlacement(sampleBlocks, 'A', new Map()), -1, 'An existing diagram takes priority over another same-section image');
const separateSections = parseMarkdownBlocks('## A\n\nOne.\n\n## B\n\nTwo.');
const figureInB = resolveReadingInsertions(separateSections, [{ afterHeading: 'B', afterParagraph: 1, figure: marker }]);
assert.equal(resolveConceptArtPlacement(separateSections, 'A', figureInB), 1, 'A visual in a later section must not suppress the current explanation');
assert.equal(resolveConceptArtPlacement(separateSections, 'B', figureInB), -1, 'A same-section figure replaces redundant artwork');
assert.equal(resolveConceptArtPlacement(separateSections, 'Missing', new Map()), -1, 'Missing headings do not move artwork to an unrelated section');
assert.equal(checkedFigures, 26, 'The duplicate qi/blood relationship card is replaced by the existing triangle diagram');
console.log(`Passed: ${ARTICLES.length} articles, ${Object.keys(CURRICULUM_READING_INSERTS).length} lectures, ${checkedFigures} figure placements/renderings, stable heading anchors, 36 related destinations, and metadata-only article previews.`);
