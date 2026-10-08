/* eslint-disable @typescript-eslint/no-require-imports -- Exercise real renderers and persistent hook state offline. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
let hookSlots = null, hookIndex = 0;
const hookReact = { ...React,
  useState(initial) {
    if (!hookSlots) return React.useState(initial);
    const slots = hookSlots, index = hookIndex++;
    if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
    return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }];
  },
  useMemo(compute, deps) {
    if (!hookSlots) return React.useMemo(compute, deps);
    const index = hookIndex++;
    if (!hookSlots[index] || deps.some((dep, i) => !Object.is(dep, hookSlots[index].deps[i]))) hookSlots[index] = { value: compute(), deps };
    return hookSlots[index].value;
  },
};
const Popup = () => null;
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
    if (id === 'react') return hookReact;
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    if (id === '@/components/glossary/GlossaryPopup') return Popup;
    if (['@/components/CurriculumDiagram', '@/components/EastWestTermSwitch'].includes(id)) return () => null;
    if (id === './CitationBadge') return ({ targetAnchorId }) => React.createElement('sup', { 'data-reference': targetAnchorId });
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(result.outputText, { exports, require: localRequire, URL, console, process }, { filename: file });
  return exports;
}
const Glossary = load('src/components/GlossaryRenderer').default;
const Citation = load('src/components/CitationTextRenderer').default;
const Markdown = load('src/components/MarkdownBody').default;
const { createGlossarySeenSnapshots } = load('src/utils/glossaryOccurrences');
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const buttons = markup => [...markup.matchAll(/<button\b[^>]*>(.*?)<\/button>/gs)].map(match => match[1]);
function stableRender(Component, props) {
  const before = props.seenTerms ? [...props.seenTerms] : [];
  const server = render(Component, props);
  assert.equal(render(Component, props), server, 'Rendering identical props twice matches SSR and its replay');
  assert.deepEqual(props.seenTerms ? [...props.seenTerms] : [], before, 'Caller-owned term state is never changed');
  return server;
}
const direct = stableRender(Glossary, { text: '**陰陽**を比べる。陰陽<br>気虚。気虚', seenTerms: new Set(['既知']) });
assert.deepEqual(buttons(direct), ['陰陽', '気虚'], 'Only the first ordinary occurrence is interactive, across emphasis and line breaks');
assert(direct.includes('<strong') && direct.includes('<br/>'));
assert.deepEqual(buttons(stableRender(Glossary, { text: '陰陽と気虚', seenTerms: new Set(['陰陽']) })), ['気虚'], 'An explicit seen-before snapshot suppresses only its own terms');
assert.deepEqual(buttons(render(Glossary, { text: '陰陽 気虚', enablePopup: false })), []);

const inline = stableRender(Citation, { text: '**陰陽 [^named] 陰陽** [気虚](/safety) 気虚 [^named] 気虚', seenTerms: new Set(), resolvedReferences: [{ id: 'named', index: 3, anchorId: 'ref-named' }] });
assert.deepEqual(buttons(inline), ['陰陽', '気虚'], 'Citations and bold segments retain one first occurrence per term');
assert.equal([...inline.matchAll(/data-reference="ref-named"/g)].length, 2);
assert(!/<a\b[^>]*>[^<]*<button/.test(inline), 'A Markdown link does not contain a glossary button');
assert(inline.includes('href="/safety"'));
const content = '## 陰陽\n\n陰陽 [気虚](/safety) [^named]\n\n- 気虚 [^named] 陰陽\n- 気滞 気虚\n\n| 瘀血 | 気滞 |\n| --- | --- |\n| 瘀血 | 相生 |\n\n> 相生 瘀血';
const body = stableRender(Markdown, { contentMarkdown: content, seenTerms: new Set(), resolvedReferences: [{ id: 'named', index: 3, anchorId: 'ref-named' }] });
assert.deepEqual(buttons(body), ['陰陽', '気虚', '気滞', '瘀血', '相生'], 'First occurrences follow headings, paragraphs, lists, table headers/cells and quotations');
assert.match(body, /<h2[^>]*>.*?<button[^>]*>陰陽<\/button>/s);
assert.match(body, /<li[^>]*><button[^>]*>気虚<\/button>/s, 'A link label does not consume the later eligible occurrence');
const snapshots = createGlossarySeenSnapshots(['陰陽', '陰陽 気虚']);
assert.deepEqual(buttons(render(Glossary, { text: '陰陽 気虚', seenTerms: snapshots[1] })), ['気虚']);
assert.deepEqual(buttons(render(Glossary, { text: '陰陽', seenTerms: snapshots[0] })), ['陰陽'], 'Children may render in reverse order without changing first-occurrence ownership');

// Preserve the same hook slots while replaying the real component. This catches
// the old memoized fallback Set, which ordinary repeated SSR remounts cannot.
function nodes(node, result = []) {
  if (Array.isArray(node)) { node.forEach(child => nodes(child, result)); return result; }
  if (!node || typeof node !== 'object') return result;
  result.push(node); nodes(node.props?.children, result); return result;
}
const slots = [];
function replay(props) {
  hookSlots = slots; hookIndex = 0;
  try { return Glossary(props); } finally { hookSlots = null; }
}
const props = { text: '陰陽と陰陽、気虚。' };
let tree = replay(props);
const initial = renderToStaticMarkup(tree);
assert.equal(renderToStaticMarkup(replay(props)), initial, 'A retained component can replay without losing its first buttons');
nodes(tree).find(node => node.type === 'button').props.onClick({ preventDefault() {}, stopPropagation() {} });
tree = replay(props);
assert(nodes(tree).some(node => node.type === Popup && node.props.isOpen && node.props.term.term === '陰陽'), 'Clicking still opens the selected term');
assert.deepEqual(buttons(renderToStaticMarkup(tree)), ['陰陽', '気虚'], 'Opening the popup does not consume inline glossary buttons');
nodes(tree).find(node => node.type === Popup).props.onClose();
assert.equal(renderToStaticMarkup(replay(props)), initial, 'Closing the popup restores the same inline markup');
assert.deepEqual(buttons(renderToStaticMarkup(replay({ text: '気滞と気滞。' }))), ['気滞'], 'Replacing text cannot retain the prior text occurrence state');

// Render the actual popup with a portal boundary spy. The dialog must be sent
// to the document body rather than emitted inside a Markdown paragraph/button.
const { GLOSSARY_TERMS } = load('src/data/glossaryData');
const popupSource = path.join(root, 'src/components/glossary/GlossaryPopup.tsx');
const popupJs = ts.transpileModule(fs.readFileSync(popupSource, 'utf8'), { fileName: popupSource,
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
let portal = null;
function realPopup(document) {
  const exports = {};
  vm.runInNewContext(popupJs, { exports, document, require: id => {
    if (id === 'react-dom') return { createPortal: (children, target) => { portal = { children, target }; return null; } };
    if (id === 'next/link') return ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children);
    return require(id);
  } }, { filename: popupSource });
  return exports.default;
}
const bodyTarget = {};
const openPopup = { isOpen: true, term: GLOSSARY_TERMS['陰陽'], onClose() {} };
assert.equal(render(realPopup(undefined), openPopup), '', 'SSR without document emits no modal markup');
assert.equal(portal, null);
const BrowserPopup = realPopup({ body: bodyTarget });
assert.equal(render(BrowserPopup, { ...openPopup, isOpen: false }), '');
assert.equal(portal, null, 'An inactive popup creates no portal');
assert.equal(render(BrowserPopup, openPopup), '', 'Opening a dialog leaves inline server markup empty');
assert.equal(portal.target, bodyTarget, 'Dialog contents are placed in document.body');
const popupMarkup = renderToStaticMarkup(portal.children);
assert(popupMarkup.includes('role="dialog"') && popupMarkup.includes('aria-modal="true"'));
assert(popupMarkup.includes('aria-labelledby="glossary-popup-title"') && popupMarkup.includes('id="glossary-popup-title"'));
assert(popupMarkup.includes(GLOSSARY_TERMS['陰陽'].oneLiner), 'The real portal contains the selected term explanation');
console.log('Passed: deterministic glossary SSR/replay, persistent popup state, first occurrences across Markdown/citations, immutable snapshots and body-only dialog portals.');
