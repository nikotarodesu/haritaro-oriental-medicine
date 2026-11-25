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
const { getPointSearchTopic, normalizeSearchText } = load('src/utils/search');
const { preparePurposeSearchQuery } = load('src/utils/searchPurpose');
const { prepareAcupointSearch, getAcupointMatchReason } = load('src/utils/acupointSearch');
const points = Array.from(data.getAllAcupoints());
const indices = points.map(point => ({ point, search: prepareAcupointSearch(point) }));
const codes = query => indices.filter(({ search }) => getAcupointMatchReason(search, getPointSearchTopic(normalizeSearchText(query)))).map(({ point }) => point.code);
const toKatakana = value => value.replace(/[ぁ-ゖ]/g, character => String.fromCharCode(character.charCodeAt(0) + 0x60));
for (const point of points) {
  for (const query of [point.code, point.code.toLowerCase(), point.code.replace(/[A-Z0-9]/g, character => String.fromCharCode(character.charCodeAt(0) + 0xfee0)), point.name, point.kana, toKatakana(point.kana)]) {
    assert(codes(query).includes(point.code), point.code + ': lookup failed for ' + query);
  }
}
for (const variants of [['ごうこく', 'ゴウコク', 'ｺﾞｳｺｸ'], ['たいしょう', 'タイショウ', 'ﾀｲｼｮｳ'], ['LI4', 'ｌｉ４', 'ＬＩ ４', 'LI-4', 'ＬＩ－４'], ['太谿', '太渓'], ['頭痛', 'ずつう']]) {
  for (const query of variants) assert.deepEqual(codes(query), codes(variants[0]), query + ': spellings must return the same results');
}
for (const query of ['列缺', '列欠', 'れっけつ']) assert(codes(query).includes('LU7'), query);
const li4 = indices.find(({ point }) => point.code === 'LI4');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('ｺﾞｳｺｸ')), '読み方に含まれる');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('ＬＩ ４')), '番号が一致');
assert.equal(getAcupointMatchReason(li4.search, normalizeSearchText('合谷')), 'ツボの名前が一致');
assert.deepEqual(codes('存在しない検索語xyz'), []);
assert.equal(getAcupointMatchReason(li4.search, ''), null);
for (const query of ['手首のツボ', '手首にあるつぼはどこ？', '手首の近くの経穴']) {
  assert.deepEqual(codes(query), codes('手首'), query);
  assert.equal(preparePurposeSearchQuery(query).query.normalized, '手首', 'Global and dictionary search use the same topic');
}

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
  let location = new URL('https://www.haritaro.jp/tsubo' + (params ? '?' + params : ''));
  const browser = {
    get location() { return location; },
    history: { replaceState(_state, _unused, target) { location = new URL(target, location); } },
  };
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
  vm.runInNewContext(compiled, { exports: exported, URL, URLSearchParams, window: browser, console, require: id => {
    if (id === 'react') return hooks;
    if (id === 'next/navigation') return { useSearchParams() { throw new Error('The visible dictionary must render without reading the router query'); } };
    if (id === 'next/link') return 'a';
    if (id === '@/data/tsubo') return data;
    if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ memos: [] }) };
    if (id.startsWith('@/components/')) return stub;
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    return require(id);
  } }, { filename });
  let tree;
  const nearbyComparisons = React.createElement('section', { id: 'nearby-comparisons' });
  function render() { cursor = 0; tree = exported.default({ nearbyComparisons }); return tree; }
  function restore() {
    nodes(tree).find(node => typeof node.props?.restore === 'function').props.restore(location.searchParams.toString());
    render();
  }
  render();
  if (params) restore();
  return {
    navigate(target) { location = new URL(target, location); restore(); },
    change(value) { const input = nodes(tree).find(node => node.props?.id === 'tsubo-search'); input.props.onChange({ target: { value } }); render(); },
    click(label) { nodes(tree).find(node => node.type === 'button' && text(node) === label).props.onClick(); render(); },
    resultCodes() { return nodes(tree).filter(node => String(node.props?.id || '').startsWith('tsubo-card-')).map(node => node.props.id.slice('tsubo-card-'.length).toUpperCase()); },
    locationPreview() { return text(nodes(tree).find(node => node.props?.className === 'atlas-result-location')); },
    url: () => location.href,
    hasSearchForm: () => nodes(tree).some(node => node.type === 'form' && node.props.action === '/search'),
    searchLinks: () => nodes(nodes(tree).find(node => node.type === 'form')).filter(node => node.type === 'a').map(node => node.props.href),
    comparisonFollowsResults() {
      const elements = nodes(tree);
      assert.equal(elements.filter(node => node.props?.id === 'nearby-comparisons').length, 1);
      return elements.findIndex(node => node.props?.id === 'nearby-comparisons') > elements.findIndex(node => node.props?.id === 'tsubo-list');
    },
    text: () => text(tree),
  };
}

const initial = dictionary();
assert.equal(initial.resultCodes().length, 24, 'The initial card list renders independently of the URL observer');
assert(initial.hasSearchForm(), 'Native search remains available before JavaScript starts');
for (const href of ['#nearby-comparisons', '/symptoms', '/tsubo/compare']) assert(initial.searchLinks().includes(href), href);
assert(!initial.comparisonFollowsResults(), 'The comparison index is near the search form while browsing');
const firstPoint = points.find(point => point.code === initial.resultCodes()[0]);
const firstStop = firstPoint.locationSimple.indexOf('。');
assert(firstStop >= 0 && firstStop < firstPoint.locationSimple.length - 1, 'The reference card has multiple location sentences');
assert.equal(initial.locationPreview(), firstPoint.locationSimple.slice(0, firstStop + 1), 'Cards show the first location sentence');
for (const query of ['ゴウコク', 'ｺﾞｳｺｸ', 'ＬＩ ４', 'ごうこく']) {
  const view = dictionary(); view.change(query);
  assert.deepEqual(view.resultCodes(), ['LI4'], 'Actual dictionary onChange: ' + query);
  assert(view.text().includes(query), 'Keep the user’s original spelling in the input status');
  assert(view.text().includes(query.includes('Ｌ') ? '番号が一致' : '読み方に含まれる'));
}
const restored = dictionary('q=' + encodeURIComponent('ﾀｲｼｮｳ'));
assert.deepEqual(restored.resultCodes(), ['LR3'], 'An existing search bookmark accepts half-width kana');
assert(restored.comparisonFollowsResults(), 'A filtered list shows results before the comparison index');
assert(restored.searchLinks().includes('#nearby-comparisons'), 'The comparison link still works after a search');
const filtered = dictionary('meridian=' + encodeURIComponent('肝経'));
filtered.change('ｺﾞｳｺｸ'); assert.deepEqual(filtered.resultCodes(), [], 'A reading match must not bypass a selected meridian');
const secondPage = dictionary('meridian=' + encodeURIComponent('胃経') + '&page=2');
assert.equal(secondPage.resultCodes()[0], 'ST25', 'A bookmarked filtered page opens on the chosen page');
secondPage.navigate('/tsubo?q=' + encodeURIComponent('ごうこく') + '&from=terms#tsubo-list');
assert.deepEqual(secondPage.resultCodes(), ['LI4'], 'A new router URL updates the same dictionary');
secondPage.change('足三里');
const sharedUrl = new URL(secondPage.url());
assert.equal(sharedUrl.searchParams.get('q'), '足三里');
assert.equal(sharedUrl.searchParams.get('from'), 'terms');
assert.equal(sharedUrl.hash, '#tsubo-list');
const noResults = dictionary(); noResults.change('存在しない検索語xyz'); assert.deepEqual(noResults.resultCodes(), []);
noResults.click('「手首」で探す');
assert.equal(new URL(noResults.url()).searchParams.get('q'), '手首');
assert.equal(noResults.resultCodes()[0], 'LU9', 'Wrist locations come before points that only use the wrist to measure distance');
noResults.change('手首のツボ');
assert.equal(noResults.resultCodes()[0], 'LU9');
assert.equal(new URL(noResults.url()).searchParams.get('q'), '手首のツボ', 'The shareable URL preserves the original question');
assert(noResults.text().includes('「手首」で検索'));
noResults.change('ｺﾞｳｺｸ'); assert.deepEqual(noResults.resultCodes(), ['LI4'], 'Changing a failed query recovers actual results');
console.log('Dictionary search passed: 361 names/codes/readings, width and kana variants, match reasons, real inputs, bookmarked searches and retained filters.');
