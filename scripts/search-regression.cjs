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
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (id === 'next/navigation') return { useRouter: () => ({ push() {} }) };
    if (id === 'next/link') return { __esModule: true, default: React.forwardRef(function TestLink({ children, prefetch, onNavigate, ...props }, ref) { return React.createElement('a', { ...props, ref }, children); }) };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, URL, process, console }, { filename: file });
  return exports;
}

const { prepareSearchItem, prepareSearchQuery, scoreSearchItem, matchesSearchCategory, nextSearchResultIndex, SEARCH_CATEGORIES, searchMatchHint } = load('src/utils/search');
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
console.log('Search regression passed: all 361 exact codes, prepared scoring, category coverage, keyboard bounds, public learning links, rendered combobox semantics, pagination and empty results.');
