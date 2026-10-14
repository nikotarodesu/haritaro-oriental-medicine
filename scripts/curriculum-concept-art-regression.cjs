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
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
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
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const { CURRICULUM_CONCEPT_ART, getCurriculumConceptArt } = load('src/components/curriculum/CurriculumConceptArt');
const MarkdownBody = load('src/components/MarkdownBody').default;
const lectures = CURRICULUM_DATA.flatMap(series => series.lectures);
const headingIds = html => Array.from(html.matchAll(/<h[1-4][^>]*id="([^"]+)"/g), match => match[1]).join('|');
let count = 0;
for (const [id, specification] of Object.entries(CURRICULUM_CONCEPT_ART)) {
  const lecture = lectures.find(item => item.id === id);
  assert(lecture?.isPublished, id + ': artwork belongs to a published lecture');
  const source = lecture.contentMarkdown;
  const blocks = parseMarkdownBlocks(source);
  assert.equal(blocks.filter(block => block.type === 'h2' && block.content === specification.afterHeading).length, 1, id + ': unique actual section placement');
  const conceptArt = getCurriculumConceptArt(id);
  assert(conceptArt?.node, id + ': artwork generated');
  const art = renderToStaticMarkup(conceptArt.node);
  assert(art.includes('role="img"') && /aria-label=|<title\b/.test(art), id + ': accessible image meaning');
  assert(!/<text\b|<foreignObject\b|<figcaption\b/.test(art), id + ': no visible SVG text or prose');
  assert.equal(art.replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, '').trim(), '', id + ': no visible HTML text around the image');
  assert(!/(?:d|transform|cx|cy)="[^"]*\.\d{4,}/.test(art), id + ': derived SVG geometry avoids server/browser float serialization drift');
  const base = renderToStaticMarkup(React.createElement(MarkdownBody, { contentMarkdown: source, idPrefix: 'lecture' }));
  const illustrated = renderToStaticMarkup(React.createElement(MarkdownBody, { contentMarkdown: source, idPrefix: 'lecture', conceptArt }));
  assert.equal(headingIds(illustrated), headingIds(base), id + ': original heading anchors preserved');
  assert.equal((illustrated.match(/class="[^"]*curriculum-concept-art/g) || []).length, 1, id + ': exactly one reachable illustration');
  assert.equal(illustrated.replace(art, ''), base, id + ': authored body rendering unchanged apart from artwork');
  count++;
}
assert.equal(getCurriculumConceptArt('unknown-lecture'), null, 'unmapped lectures remain unchanged');
console.log(`Passed: ${count} wordless illustrations in real published sections, accessible names, stable heading anchors and unchanged authored bodies.`);
