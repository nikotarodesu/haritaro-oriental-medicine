/* eslint-disable @typescript-eslint/no-require-imports -- Verify the real dictionary filter and input handlers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const data = load('src/data/tsubo/index');
const { normalizeSearchText } = load('src/utils/search');
const { prepareAcupointSearch, getAcupointMatchReason } = load('src/utils/acupointSearch');
const points = Array.from(data.getAllAcupoints());
const indices = points.map(point => ({ point, search: prepareAcupointSearch(point) }));
const codes = query => indices.filter(({ search }) => getAcupointMatchReason(search, normalizeSearchText(query))).map(({ point }) => point.code);
const toKatakana = value => value.replace(/[ぁ-ゖ]/g, character => String.fromCharCode(character.charCodeAt(0) + 0x60));
for (const point of points) {
  for (const query of [point.code, point.code.toLowerCase(), point.code.replace(/[A-Z0-9]/g, character => String.fromCharCode(character.charCodeAt(0) + 0xfee0)), point.name, point.kana, toKatakana(point.kana)]) {
    assert(codes(query).includes(point.code), point.code + ': lookup failed for ' + query);
  }
}
for (const variants of [['ごうこく', 'ゴウコク', 'ｺﾞｳｺｸ'], ['たいしょう', 'タイショウ', 'ﾀｲｼｮｳ'], ['LI4', 'ｌｉ４', 'ＬＩ ４'], ['太谿', '太渓']]) {
  for (const query of variants) assert.deepEqual(codes(query), codes(variants[0]), query + ': spellings must return the same results');
}
const li4 = indices.find(({ point }) => point.code === 'LI4');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('ｺﾞｳｺｸ')), '読み一致');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('ＬＩ ４')), 'コード完全一致');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('合谷')), '経穴名完全一致');
assert.deepEqual(codes('存在しない検索語xyz'), []);
assert.equal(getAcupointMatchReason(li4.search, ''), null);

function nodes(node, output = []) {
  if (Array.isArray(node)) node.forEach(child => nodes(child, output));
  else if (node && typeof node === 'object') { output.push(node); nodes(node.props?.children, output); }
  return output;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node && typeof node === 'object' ? text(node.props?.children) : '';
}
const filename = path.resolve(__dirname, '../src/components/tsubo/TsuboInteractiveClient.tsx');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { fileName: filename, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
function dictionary(params = '') {
  let cursor = 0;
  const slots = [];
  const hooks = { ...React,
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute) { cursor++; return compute(); },
    useCallback(callback) { cursor++; return callback; },
    useEffect() { cursor++; },
  };
  const exported = {};
  const stub = () => null;
  vm.runInNewContext(compiled, { exports: exported, URLSearchParams, console, require: id => {
    if (id === 'react') return hooks;
    if (id === 'next/navigation') return { useSearchParams: () => new URLSearchParams(params) };
    if (id === 'next/link') return 'a';
    if (id === '@/data/tsubo') return data;
    if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ memos: [] }) };
    if (id.startsWith('@/components/')) return stub;
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    return require(id);
  } }, { filename });
  let tree;
  function render() { cursor = 0; tree = exported.default(); return tree; }
  render();
  return {
    change(value) { const input = nodes(tree).find(node => node.props?.id === 'tsubo-search'); input.props.onChange({ target: { value } }); render(); },
    resultCodes() { return nodes(tree).filter(node => String(node.props?.id || '').startsWith('tsubo-card-')).map(node => node.props.id.slice('tsubo-card-'.length).toUpperCase()); },
    text: () => text(tree),
  };
}
for (const query of ['ゴウコク', 'ｺﾞｳｺｸ', 'ＬＩ ４', 'ごうこく']) {
  const view = dictionary(); view.change(query);
  assert.deepEqual(view.resultCodes(), ['LI4'], 'Actual dictionary onChange: ' + query);
  assert(view.text().includes(query), 'Keep the user’s original spelling in the input status');
  assert(view.text().includes(query.includes('Ｌ') ? 'コード完全一致' : '読み一致'));
}
const restored = dictionary('q=' + encodeURIComponent('ﾀｲｼｮｳ'));
assert.deepEqual(restored.resultCodes(), ['LR3'], 'An existing search bookmark accepts half-width kana');
const filtered = dictionary('meridian=' + encodeURIComponent('肝経'));
filtered.change('ｺﾞｳｺｸ'); assert.deepEqual(filtered.resultCodes(), [], 'A reading match must not bypass a selected meridian');
const noResults = dictionary(); noResults.change('存在しない検索語xyz'); assert.deepEqual(noResults.resultCodes(), []);
noResults.change('ｺﾞｳｺｸ'); assert.deepEqual(noResults.resultCodes(), ['LI4'], 'Changing a failed query recovers actual results');
console.log('Dictionary search passed: 361 names/codes/readings, width and kana variants, match reasons, real inputs, bookmarked searches and retained filters.');
