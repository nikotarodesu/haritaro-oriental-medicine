/* eslint-disable @typescript-eslint/no-require-imports -- Offline component rendering. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(candidate) {
  let file = path.resolve(root, candidate);
  if (!path.extname(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (id === 'next/dynamic') return loader => {
      const target = loader.toString().match(/require\(["']([^"']+)["']\)/)?.[1];
      assert(target, 'dynamic imports are statically addressable');
      // Load the new renderer synchronously for real SSR markup. Existing interactive
      // renderers are checked for dispatch coverage; their interaction tests are separate.
      if (target.endsWith('/CurriculumStudyDiagram')) return props => React.createElement(load(path.resolve(path.dirname(file), target)).default, props);
      return () => React.createElement('figure', { 'data-existing-diagram': target });
    };
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (['@/components/EastWestTermSwitch', '@/components/glossary/GlossaryPopup'].includes(id)) return () => null;
    if (id === './CitationBadge') return () => null;
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(code, { exports, require: localRequire, process, console, URL }, { filename: file });
  return exports;
}
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { CURRICULUM_STUDY_DIAGRAMS } = load('src/data/curriculumStudyDiagrams');
const { CURRICULUM_STUDY_DIAGRAM_IDS } = load('src/data/curriculumStudyDiagramIds');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const Diagram = load('src/components/CurriculumDiagram').default;
const MarkdownBody = load('src/components/MarkdownBody').default;
const usages = CURRICULUM_DATA.flatMap(stage => stage.lectures).flatMap(lecture => parseMarkdownBlocks(lecture.contentMarkdown).filter(block => block.type === 'diagram').map(block => ({ id: block.diagramId, lecture: lecture.id })));
assert.equal(usages.length, 72, 'all current diagram tokens are exercised');
for (const usage of usages) assert(React.isValidElement(Diagram({ id: usage.id })), `${usage.lecture}: ${usage.id} must not silently return null`);
assert.equal(CURRICULUM_STUDY_DIAGRAM_IDS.length, 59);
assert.equal(new Set(CURRICULUM_STUDY_DIAGRAM_IDS).size, 59);
assert.deepEqual([...CURRICULUM_STUDY_DIAGRAM_IDS].sort(), Object.keys(CURRICULUM_STUDY_DIAGRAMS).sort());
for (const id of CURRICULUM_STUDY_DIAGRAM_IDS) {
  assert.equal(usages.filter(usage => usage.id === id).length, 1, `${id}: actual lecture placement`);
  const figure = CURRICULUM_STUDY_DIAGRAMS[id];
  const html = renderToStaticMarkup(React.createElement(MarkdownBody, { contentMarkdown: `## 図解確認\n\n:::diagram ${id}`, idPrefix: 'diagram-test' }));
  assert(html.includes(`data-reading-figure="${id}"`), `${id}: parser → dispatcher → renderer produces real figure HTML`);
  assert(html.includes(`aria-labelledby="reading-figure-${id}-title"`));
  assert(html.includes(`aria-describedby="reading-figure-${id}-caption"`));
  assert(html.includes(figure.title));
  assert(html.includes(figure.caption));
  assert.equal((html.match(/<li\b/g) ?? []).length, figure.items.length);
  for (const item of figure.items) { assert(html.includes(item.label)); assert(html.includes(item.description)); }
  assert(!/<text\b/.test(html), `${id}: text wraps as HTML, not tiny SVG labels`);
}
for (const [id, labels] of Object.entries({
  'pathomechanism-four-layers': ['病因', '病機', '症状・所見', '証'],
  'diagnosis-five-layers': ['病名（現代医学）', '症状・所見', '病機', '証', '治療方針'],
  'treatment-six-layers-pyramid': ['証', '治則', '治法', '配穴・方法', '操作・刺激量', '評価'],
  'pathomechanism-chronic-three-factors': ['発症要因', '増悪・軽減要因', '維持要因'],
  'diagnosis-cognitive-biases': ['アンカリング', '利用可能性', '確証バイアス', 'サンクコスト'],
})) assert.deepEqual(Array.from(CURRICULUM_STUDY_DIAGRAMS[id].items, item => item.label), labels, `${id}: taught concepts stay distinct`);
console.log('Passed: 72 actual diagram tokens resolve; 59 study figures render through the real parser/dispatcher with named concepts, wrapping labels and accessible captions.');
