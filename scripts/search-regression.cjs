/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  const candidate = path.resolve(root, relative);
  const file = ['.ts', '.tsx'].map(extension => candidate + extension).find(fs.existsSync) || (fs.existsSync(path.join(candidate, 'index.ts')) ? path.join(candidate, 'index.ts') : candidate);
  if (cache.has(file)) return cache.get(file);
  if (file.endsWith('.json')) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    cache.set(file, json);
    return json;
  }
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (id === 'next/navigation') return { useRouter: () => ({ push() {} }) };
    // Next-specific props are removed from the rendered HTML in this test shim.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (id === 'next/link') return { __esModule: true, default: React.forwardRef(function TestLink({ children, prefetch, onNavigate, ...props }, ref) { return React.createElement('a', { ...props, ref }, children); }) };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, URL, process, console }, { filename: file });
  return exports;
}

const { normalizeSearchText, prepareSearchItem, prepareSearchQuery, scoreSearchItem, matchesSearchCategory, nextSearchResultIndex, SEARCH_CATEGORIES, searchMatchHint } = load('src/utils/search');
const { preparePurposeSearchQuery, rankPurposeSearchResults } = load('src/utils/searchPurpose');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const pointIndex = ACUPOINTS_MASTER.map(point => prepareSearchItem({ title: `${point.name} (${point.code})`, exactCode: point.code, tags: [point.kana, point.code, ...(point.aliases || []), ...(point.indications || [])] }));
function best(query) { return pointIndex.map(index => ({ index, score: scoreSearchItem(index, prepareSearchQuery(query)) })).filter(result => result.score > 0).sort((a, b) => b.score - a.score)[0]?.index.item; }
for (const point of ACUPOINTS_MASTER) {
  for (const query of [point.code, point.code.toLowerCase(), point.code.replace(/(\d)/, ' $1')]) assert.equal(best(query)?.exactCode, point.code, query);
}
const fixture = prepareSearchItem({ title: '陰陽の比較', subtitle: '条件をそろえて考える', tags: ['診断の根拠'] });
for (const query of ['陰陽', '陰陽 根拠', ' 陰陽　根拠 ', '陰陽 根拠 根拠', '', '無関係']) {
  assert.equal(scoreSearchItem(fixture, query), scoreSearchItem(fixture, prepareSearchQuery(query)), query + ' prepared query parity');
}
assert.equal(scoreSearchItem(fixture, '陰陽 根拠 根拠'), scoreSearchItem(fixture, '陰陽 根拠'), 'Repeating a token must not change relevance');
assert.equal(scoreSearchItem(fixture, '陰陽 未収録語'), 0, 'All terms must match');
assert.equal(searchMatchHint(fixture, prepareSearchQuery('陰陽')), null);
assert.equal(searchMatchHint(fixture, prepareSearchQuery('陰陽 根拠')), '関連語に一致');
assert.equal(searchMatchHint(prepareSearchItem({ title: '合谷（LI4）', exactCode: 'LI4' }), prepareSearchQuery('ＬＩ ４')), '経穴コードが一致');

const types = ['article', 'acupoint', 'lecture', 'case', 'tool', 'glossary', 'kokushi', 'classic', 'paper', 'symptom'];
assert.equal(new Set(SEARCH_CATEGORIES.map(category => category.id)).size, SEARCH_CATEGORIES.length);
for (const type of types) {
  assert(matchesSearchCategory(type, 'all'));
  const partitions = SEARCH_CATEGORIES.filter(category => category.id !== 'all' && matchesSearchCategory(type, category.id));
  assert.equal(partitions.length, 1, type + ' has one specific filter');
}
assert(matchesSearchCategory('glossary', 'glossary'));
assert(!matchesSearchCategory('glossary', 'library'));
assert(matchesSearchCategory('paper', 'library'));
assert(matchesSearchCategory('classic', 'library'));
assert.equal(nextSearchResultIndex(-1, 'next', 25), 0);
assert.equal(nextSearchResultIndex(-1, 'previous', 25), 24);
assert.equal(nextSearchResultIndex(0, 'previous', 25), 0);
assert.equal(nextSearchResultIndex(24, 'next', 25), 24);
assert.equal(nextSearchResultIndex(24, 'next', 50), 25, 'Expanded results can be reached');
assert.equal(nextSearchResultIndex(0, 'next', 0), -1);
assert.equal(nextSearchResultIndex(30, 'next', 2), 0, 'Stale selection recovers to a valid result');

const purposeFixtures = [
  { id: 'unreviewed-paper', type: 'paper', title: '肩こり', reviewStatus: 'needs-review' },
  { id: 'checked-paper', type: 'paper', title: '肩こりに関する研究', reviewStatus: 'source-checked' },
  { id: 'withdrawn-paper', type: 'paper', title: '肩こり', reviewStatus: 'do-not-use' },
  { id: 'point', type: 'acupoint', title: '合谷（LI4）', exactCode: 'LI4', exactTerms: ['合谷', 'ごうこく'], tags: ['肩こり', '合谷', 'ごうこく'] },
  { id: 'professional', type: 'tool', searchRole: 'professional-guide', title: '首・肩こり｜鍼灸師の確認ガイド' },
  { id: 'public-guide', type: 'symptom', title: '頭痛・首肩こりの受診目安' },
].map(prepareSearchItem);
function rankedFixture(query, purpose) { return rankPurposeSearchResults(purposeFixtures, preparePurposeSearchQuery(query, purpose)).map(result => result.item.id); }
assert.deepEqual(rankedFixture('肩こり'), ['public-guide', 'professional', 'point', 'unreviewed-paper', 'checked-paper'], 'Plain symptom searches start with guides and points, even when an unreviewed paper has an exact title');
assert.deepEqual(rankedFixture('肩こり', 'research'), ['checked-paper', 'unreviewed-paper', 'professional', 'public-guide', 'point'], 'Research readers see checked interpretation before unreviewed matching papers');
assert.equal(rankedFixture('肩こり 論文')[0], 'checked-paper', 'Research modifiers change purpose without hiding condition matches');
assert.equal(rankedFixture('肩こり エビデンス')[0], 'checked-paper', 'Japanese script normalization preserves research intent');
assert.equal(rankedFixture('肩こり 論文', 'guide')[0], 'public-guide', 'The reader can override inferred research intent');
for (const query of ['LI4', 'ＬＩ ４', '合谷', 'ごうこく']) {
  for (const purpose of ['auto', 'guide', 'research']) assert.equal(rankedFixture(query, purpose)[0], 'point', query + ' direct point lookup in ' + purpose);
}
assert(!rankedFixture('肩こり', 'research').includes('withdrawn-paper'), 'Do-not-use evidence is not a navigable search recommendation');
assert.equal(preparePurposeSearchQuery('論文').query.normalized, '論文', 'An intent-only query still searches the catalog');
assert.equal(preparePurposeSearchQuery('陰陽').purpose, 'guide', 'Ordinary study queries use guide ordering');

const GlobalSearchModal = load('src/components/search/GlobalSearchModal').default;
function render(query, isOpen = true) { return renderToStaticMarkup(React.createElement(GlobalSearchModal, { isOpen, initialQuery: query, onClose() {} })); }
assert.equal(render('陰陽', false), '');
const empty = render('');
assert(empty.includes('role="dialog"'));
assert(empty.includes('role="combobox"'));
assert(empty.includes('aria-expanded="false"'));
assert(!empty.includes('role="listbox"'));
const points = render('ＬＩ ４');
assert(points.includes('aria-expanded="true"'));
assert(points.includes('href="/tsubo/li4"'));
assert(points.includes('経穴コードが一致'));
const controls = points.match(/aria-controls="([^"]+)"/)?.[1];
assert(controls && points.includes(`id="${controls}" role="listbox"`), 'Combobox controls a rendered result list');
const options = Array.from(points.matchAll(/<a[^>]+role="option"[^>]*>/g), match => match[0]);
assert(options.length > 0);
for (const option of options) {
  assert(option.includes('tabindex="-1"'), 'Options use input arrows rather than a long Tab sequence');
  assert(option.includes('aria-selected="false"'), 'Typing alone does not imply a chosen result');
  assert(option.includes('aria-posinset='));
  assert(option.includes('aria-setsize='));
}
assert(render('学習ノート').includes('href="/notes?tab=learning"'));
function optionUrls(html) { return Array.from(html.matchAll(/<a(?=[^>]*role="option")[^>]*href="([^"]+)"/g), match => match[1]); }
for (const [canonical, aliases] of [
  ['肝気鬱結', ['肝気郁結', '肝気欝結', 'かんきうっけつ', 'カンキウッケツ']],
  ['瘀血', ['お血', 'おけつ', 'オケツ']],
  ['肩こり', ['肩凝り', 'かたこり']],
  ['陰陽', ['いんよう', 'インヨウ']],
  ['相克', ['相剋', 'そうこく']],
]) {
  const expected = optionUrls(render(canonical));
  assert(expected.length > 0, canonical + ': the canonical query finds actual catalog content');
  for (const alias of aliases) {
    assert.equal(normalizeSearchText(alias), normalizeSearchText(canonical), alias);
    assert.deepEqual(optionUrls(render(alias)), expected, alias + ': the same term returns the same ordered public destinations');
    assert.deepEqual(optionUrls(render(alias + ' 論文')), optionUrls(render(canonical + ' 論文')), alias + ': research intent is preserved');
  }
}
assert.equal(normalizeSearchText('郁子'), '郁子', 'Do not replace unrelated characters in names');
assert.notEqual(normalizeSearchText('うつ病'), normalizeSearchText('肝気鬱結'), 'A medical diagnosis is not a traditional term alias');
assert.notEqual(normalizeSearchText('血栓'), normalizeSearchText('瘀血'), 'No aliases from medical findings to traditional patterns');
const shoulder = render('肩こり');
const shoulderUrls = optionUrls(shoulder);
assert.equal(shoulderUrls[0], '/symptoms/headache-stiff-neck', 'Symptom lookup opens the individual public guide first');
assert.equal(shoulderUrls[1], '/clinical/symptoms/shoulder', 'The professional confirmation guide follows the public guide');
const firstPoint = shoulderUrls.findIndex(url => url.startsWith('/tsubo/'));
const firstPaper = shoulderUrls.findIndex(url => url.startsWith('/library#paper-'));
assert(firstPoint >= 0 && (firstPaper === -1 || firstPoint < firstPaper), 'Points appear before specialized papers for a symptom query');
assert.equal(optionUrls(render('合谷'))[0], '/tsubo/li4', 'The whole catalog retains exact point-name lookup');
assert.equal(optionUrls(points)[0], '/tsubo/li4', 'The whole catalog retains exact point-code lookup');
const research = render('肩こり 論文');
assert(optionUrls(research)[0]?.startsWith('/library#paper-'), 'Explicit research intent promotes a relevant paper: ' + optionUrls(research).slice(0, 3).join(', '));
assert(research.includes('書誌照合済み・解釈確認待ち'), 'Unreviewed interpretations are visibly distinguished from a checked summary');
assert(shoulder.includes('検索の目的に合わせて表示順を変える'));
assert(shoulder.includes('論文・原典'));
const { REFLECTION_CASES } = load('src/data/learningReflectionCatalog');
for (const caseItem of REFLECTION_CASES) assert(render(caseItem.title).includes(`href="/simulator?case=${caseItem.id}#case-training"`), caseItem.id + ' exact public training link');
const many = render('気');
assert((many.match(/role="option"/g) || []).length === 25, 'Long result sets retain the first page');
assert(many.includes('さらに表示'));
assert(many.includes('専門用語'));
assert(many.includes('講義・コース'));
const absent = render('zzzz-not-found-2026');
assert(absent.includes('見つかりませんでした'));
assert(absent.includes('検索語を消して入力し直す'));
assert(!absent.includes('role="option"'));
console.log('Search regression passed: all 361 exact codes, purpose-aware symptom/research ranking, individual symptom links, interpretation status, prepared scoring, category coverage, keyboard bounds, public learning links, combobox semantics, pagination and empty results.');
