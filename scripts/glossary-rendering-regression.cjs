/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the real reading renderers offline. */
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
  const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const localRequire = id => {
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (['@/components/CurriculumDiagram', '@/components/EastWestTermSwitch'].includes(id)) return () => null;
    if (id === './CitationBadge') return ({ targetAnchorId }) => React.createElement('sup', { 'data-reference': targetAnchorId });
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(result.outputText, { exports, require: localRequire, URL, console, process }, { filename: file });
  return exports;
}
const InlineText = load('src/components/InlineTextRenderer').default;
const Citation = load('src/components/CitationTextRenderer').default;
const Markdown = load('src/components/MarkdownBody').default;
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
function stableRender(Component, props) {
  const server = render(Component, props);
  assert.equal(render(Component, props), server, 'Rendering identical props twice matches SSR and its replay');
  assert(!/<button\b|role="(?:dialog|tooltip)"|aria-modal=|glossary-popup|の解説を見る/.test(server), 'Reading text has no glossary controls or popup markup');
  return server;
}
const direct = stableRender(InlineText, { text: '**陰陽**を比べる。陰陽<br>気虚。気虚' });
assert.match(direct, /<strong[^>]*>陰陽<\/strong>を比べる。陰陽<br\/>気虚。気虚/);
for (const lineBreak of ['<br>', '<br/>', '<br />', '<BR>']) {
  assert.equal(render(InlineText, { text: '陰陽' + lineBreak + '気滞' }), '陰陽<br/>気滞', 'Authored line breaks stay intact');
}
assert.equal(render(InlineText, { text: '' }), '');
assert.equal(stableRender(InlineText, { text: '陰陽と陰陽、気滞と気滞。' }), '陰陽と陰陽、気滞と気滞。', 'Every term remains ordinary text');
assert.equal(stableRender(InlineText, { text: '気虚と気虚。' }), '気虚と気虚。', 'Replacing the text retains no prior term state');

const references = [{ id: 'named', index: 3, anchorId: 'ref-named' }];
const inline = stableRender(Citation, { text: '**陰陽 [^named] 陰陽** [**気虚**](/glossary#term-気虚) 気虚 [ref:3] 気虚 [資料](https://example.org)', resolvedReferences: references });
assert.equal([...inline.matchAll(/data-reference="ref-named"/g)].length, 2, 'Named and numeric citations keep their reference targets');
assert.match(inline, /<strong[^>]*>陰陽 <sup[^>]*><\/sup> 陰陽<\/strong>/, 'Emphasis spans a citation');
assert.match(inline, /<a href="\/glossary#term-気虚"[^>]*><strong[^>]*>気虚<\/strong><\/a>/, 'A regular glossary link retains label emphasis');
assert.match(inline, /href="https:\/\/example.org"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/, 'External link behavior is retained');

const content = '## 陰陽\n\n陰陽 [気虚](/glossary#term-気虚) [^named]\n\n- 気虚 [ref:3] 陰陽\n- 気滞 気虚\n\n| 瘀血 | 気滞 |\n| --- | --- |\n| 瘀血 | 相生 |\n\n> 相生 瘀血';
const body = stableRender(Markdown, { contentMarkdown: content, resolvedReferences: references });
assert.match(body, /<h2[^>]*id="section-heading-0"[^>]*>陰陽<\/h2>/, 'Heading text and anchor remain intact');
assert.match(body, /<li[^>]*>気虚 <sup[^>]*><\/sup> 陰陽<\/li>/, 'List terms remain readable beside citations');
assert.match(body, /<th[^>]*>瘀血<\/th>/, 'Table headers remain ordinary text');
assert.match(body, /<td[^>]*>相生<\/td>/, 'Table cells remain ordinary text');
assert.match(body, /<blockquote[^>]*>相生 瘀血<\/blockquote>/, 'Quoted terms remain ordinary text');
assert(body.includes('href="/glossary#term-気虚"'), 'The glossary page remains reachable through regular links');
assert.equal([...body.matchAll(/data-reference="ref-named"/g)].length, 2, 'Markdown citations keep their reference targets');
console.log('Passed: popup-free inline and Markdown rendering, deterministic SSR/replay, emphasis, authored line breaks, regular glossary links and citations.');
