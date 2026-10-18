/* eslint-disable @typescript-eslint/no-require-imports -- Exercise actual offline picker handlers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../src/components/clinical/ClinicalCandidatePicker.tsx');
const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  fileName: filename,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const slots = [], exported = {};
let cursor = 0, tree, changes = 0;
let selectedIds = Object.freeze(['qi', 'model-24']);
const patterns = [
  { id: 'qi', name: '気滞', category: '気血津液', aliases: ['きたい'], supportCount: 1, unknownCount: 2, conflictCount: 0 },
  { id: 'kidney', name: '腎陰虚', category: '臓腑', aliases: ['じんいんきょ'], summary: '追加確認中心' },
  ...Array.from({ length: 24 }, (_, index) => ({ id: `model-${index + 1}`, name: `候補${index + 1}`, category: index % 2 ? '臓腑' : '気血津液', aliases: [`Model${index + 1}`] })),
];
vm.runInNewContext(output, { exports: exported, require: id => id === 'react' ? {
  useId: () => 'candidate-search',
  useState(initial) {
    const index = cursor++;
    if (!(index in slots)) slots[index] = initial;
    return [slots[index], next => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }];
  },
} : require(id) }, { filename });

function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  return node && typeof node === 'object' ? [node, ...[].concat(node.props?.children || []).flatMap(nodes)] : [];
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node && typeof node === 'object' ? [].concat(node.props?.children || []).map(text).join('') : '';
}
function render() {
  cursor = 0;
  tree = exported.default({ patterns, selectedIds, onChange: next => { selectedIds = Object.freeze(next); changes++; } });
}
function button(label) {
  const result = nodes(tree).find(node => node.type === 'button' && text(node) === label);
  assert(result, `Button is available: ${label}`);
  return result;
}
const search = () => nodes(tree).find(node => node.type === 'input' && node.props.type === 'search');
const options = () => nodes(tree).filter(node => node.type === 'input' && node.props.type === 'checkbox');
const selection = () => nodes(tree).find(node => node.props?.className === 'clinical-catalog-selection');
const expandButton = () => nodes(tree).find(node => node.type === 'button' && 'aria-expanded' in node.props);
const resultLabel = () => text(nodes(tree).find(node => node.props?.role === 'status'));
const query = value => { search().props.onChange({ target: { value } }); render(); };
const click = label => { button(label).props.onClick(); render(); };

render();
assert.equal(options().length, 6, 'Discovery starts with six compact candidate rows');
assert(resultLabel().includes('26件のうち 6件'));
assert(text(selection()).includes('候補24×'), 'Every selected candidate is visible even outside the first six');
assert.equal(expandButton().props['aria-expanded'], false);
assert.equal(expandButton().props['aria-controls'], nodes(tree).find(node => node.type === 'fieldset').props.id);
assert(!nodes(selection()).some(node => /^h[1-6]$/.test(node.type)), 'Selection summary does not introduce another section heading');
click('ほかの候補を表示（残り20件）');
assert.equal(options().length, 26);
assert.equal(expandButton().props['aria-expanded'], true);
assert(resultLabel().includes('26件のうち 26件'));
click('表示を少なくする');
assert.equal(options().length, 6);
assert.equal(selectedIds.join(','), 'qi,model-24', 'Collapsing does not drop hidden selected candidates');

click('ほかの候補を表示（残り20件）');
click('臓腑');
assert.equal(options().length, 6, 'Changing category resets expansion');
assert.equal(expandButton().props['aria-expanded'], false);
assert(resultLabel().includes('13件のうち 6件'));
assert.equal(button('臓腑').props['aria-pressed'], true);
assert(text(selection()).includes('気滞×'), 'Selected strip survives category filtering');
click('ほかの候補を表示（残り7件）');
assert.equal(options().length, 13);
query('腎　陰');
assert.equal(options().length, 1, 'Space-separated search requires every term');
assert.equal(expandButton(), undefined);
assert(resultLabel().includes('1件のうち 1件'));
const kidneyRow = nodes(tree).find(node => node.props?.className === 'clinical-catalog-option');
assert(text(kidneyRow).includes('追加確認中心'));
assert(!nodes(kidneyRow).some(node => node.props?.className === 'clinical-catalog-option-counts'), 'Candidates without observation coverage show no fabricated count');

click('すべて');
query('ｷﾀｲ');
assert.equal(options().length, 1, 'NFKC and kana normalization match the reading alias');
assert(text(tree).includes('支持 1件 · 未確認 2件 · 合いにくい 0件'));
query('ＭＯＤＥＬ２４');
assert.equal(options().length, 1, 'Full-width latin aliases are case-insensitive');
assert(options()[0].props.checked, 'Hidden selected values remain checked when discovered');
query('該当しない語句');
assert.equal(options().length, 0);
assert(text(tree).includes('該当する候補がありません'));
assert.equal(changes, 0, 'Searching, filtering, and expanding never mutate selection');
click('絞り込みを解除');
assert.equal(options().length, 6);
assert.equal(search().props.value, '');
assert.equal(button('すべて').props['aria-pressed'], true);
assert.equal(selectedIds.join(','), 'qi,model-24', 'No-results recovery resets filters only');

click('ほかの候補を表示（残り20件）');
query('');
assert.equal(options().length, 6, 'Typing also resets expansion even with an empty query');
query('きたい');
options()[0].props.onChange({ target: { checked: false } }); render();
assert.equal(selectedIds.join(','), 'model-24');
options()[0].props.onChange({ target: { checked: true } }); render();
assert.equal(selectedIds.join(','), 'model-24,qi');
options()[0].props.onChange({ target: { checked: true } }); render();
assert.equal(selectedIds.join(','), 'model-24,qi', 'Repeated checked events do not duplicate IDs');
nodes(tree).find(node => node.type === 'button' && node.props['aria-label'] === '候補24を候補から外す').props.onClick(); render();
assert.equal(selectedIds.join(','), 'qi', 'Selected-strip remove works outside the current search');
click('選択をすべて外す');
assert.equal(selectedIds.length, 0);
assert(!options()[0].props.checked);
assert(!nodes(tree).some(node => node.type === 'button' && text(node) === '選択をすべて外す'));
query('肝');
nodes(tree).find(node => node.type === 'button' && node.props['aria-label'] === '候補名の検索を消去').props.onClick(); render();
assert.equal(search().props.value, '');
assert.equal(options().length, 6, 'Search clear restores compact discovery');
assert(nodes(tree).some(node => node.type === 'label' && node.props.htmlFor === search().props.id), 'Search has an explicit accessible label');
assert(nodes(tree).some(node => node.props?.role === 'status' && node.props['aria-live'] === 'polite' && node.props['aria-atomic'] === 'true'));
console.log('Clinical candidate picker: compact discovery, counts, filters, normalized search, selection retention, reset, and accessibility passed.');
