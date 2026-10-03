/* eslint-disable @typescript-eslint/no-require-imports -- Offline renderer regression uses CommonJS. */
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
    fileName: file, reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, file + ' syntax');
  const localRequire = id => {
    // Exercise the real renderer/glossary; stub only routing and inactive overlays.
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (id === '@/components/glossary/GlossaryPopup') return () => null;
    if (id === './CitationBadge') return ({ displayNumber, targetAnchorId }) =>
      React.createElement('sup', { 'data-number': displayNumber, 'data-reference': targetAnchorId }, displayNumber);
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(result.outputText, { exports, require: localRequire, URL, console, process }, { filename: file });
  return exports;
}
const { tokenizeCitationInline } = load('src/utils/citationInlineTokens');
const links = text => tokenizeCitationInline(text).filter(token => token.type === 'link');
assert.equal(links('[受診の目安](/safety)')[0].href, '/safety');
assert.equal(links('[文献](#references)')[0].href, '#references');
assert.equal(links('[資料](https://example.org/a_(b)?x=1)')[0].href, 'https://example.org/a_(b)?x=1');
for (const input of [
  '[x](javascript:alert(1))', '[x](data:text/html,body)', '[x](mailto:a@example.org)',
  '[x](//example.org)', '[x](/\\example.org)', '[x](https://)', '[x](https://example.org "title")',
  '![image](https://example.org/image.png)', '[x](https://example.org', '\\[x](/safety)',
  'https://example.org/a。', '(https://example.org/a).', '**https://example.org/a**',
]) {
  assert.equal(links(input).length, 0, 'Unsupported target/syntax stays text: ' + input);
  assert.equal(tokenizeCitationInline(input).map(token => token.value || '').join(''), input);
}
const Renderer = load('src/components/CitationTextRenderer').default;
const render = text => renderToStaticMarkup(React.createElement(Renderer, {
  text, seenTerms: new Set(),
  resolvedReferences: [{ id: 'named', index: 3, anchorId: 'ref-named' }],
}));
const html = render('**前文 [気虚の説明](/safety) [^named] 後文** と気虚 [ref:3] [資料](https://example.org)');
const internal = html.match(/<a href="\/safety"[^>]*>(.*?)<\/a>/s);
assert(internal && internal[1].includes('気虚の説明'), 'Internal Markdown link renders');
assert(!internal[1].includes('<button'), 'Link label has no nested glossary button');
assert(html.includes('<button'), 'Ordinary glossary text stays interactive');
assert.match(html, /<strong[^>]*>前文 .*?<a href="\/safety".*?<\/strong>/s, 'Emphasis spans links');
assert.equal((html.match(/data-reference="ref-named"/g) || []).length, 2, 'Named/numeric citations stay resolved');
assert.match(html, /href="https:\/\/example.org"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
assert(!render('[x](javascript:alert(1))').includes('<a'), 'Unsafe target never becomes an anchor');
assert.match(render('[**気虚**](/safety)'), /<a[^>]*><strong[^>]*>気虚<\/strong><\/a>/, 'Label emphasis stays intact');
assert.match(render('**https://example.org/a**'), /<strong[^>]*>https:\/\/example.org\/a<\/strong>/, 'Bare URL stays text and keeps emphasis');
console.log('Passed Markdown link targets, unsupported syntax, emphasis, citation resolution and glossary label rendering checks.');
