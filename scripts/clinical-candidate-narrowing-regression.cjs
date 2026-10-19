/* eslint-disable @typescript-eslint/no-require-imports -- Exercise real evidence and offline picker handlers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const workflow = load('src/data/clinicalWorkflow');
const { clinicalCandidateEvidence } = load('src/utils/clinicalCandidateNarrowing');
const plain = value => JSON.parse(JSON.stringify(value));
const compare = (id, observations = {}, examination = {}) => workflow.compareClinicalPattern(
  workflow.CLINICAL_PATTERNS.find(pattern => pattern.id === id), observations, examination,
);
const evidence = (id, observations = {}, examination = {}) => clinicalCandidateEvidence(compare(id, observations, examination));

for (const pattern of workflow.CLINICAL_PATTERNS) {
  assert.deepEqual(plain(evidence(pattern.id)), {
    supportGroups: [], supportReasons: [], conflictReasons: [], missingCount: 0,
  }, `${pattern.id}: unconfirmed findings cannot generate evidence`);
}
const tongue = { tongueColor: '淡白', tongueSize: '腫大・胖大', tongueTeeth: '明瞭' };
assert.deepEqual(plain(evidence('spleen-qi', {}, tongue)), {
  supportGroups: ['望診'], supportReasons: ['淡白舌', '腫大・胖大舌', '舌の歯痕'],
  conflictReasons: [], missingCount: 0,
}, 'Three tongue findings still represent only one examination group');
assert.deepEqual(plain(evidence('spleen-qi', { fatigue: 'present', weakVoice: 'present', weakPulse: 'present' }, tongue).supportGroups),
  ['問診', '望診', '聞診', '切診'], 'Legacy and detailed findings map to the four examination groups in stable order');
assert.deepEqual(plain(evidence('spleen-qi', { paleTongue: 'present', weakPulse: 'present' }, {
  tongueColor: '淡白', pulseStrength: '弱い・無力',
}).supportReasons), ['淡白舌', '弱い脈'], 'Detailed and legacy versions do not duplicate the same reason');
const contradictory = evidence('spleen-qi', { fatigue: 'present', appetite: 'absent', heat: 'present' }, { tongueColor: '紅' });
assert.deepEqual(plain(contradictory), {
  supportGroups: ['問診'], supportReasons: ['疲労・気力低下'],
  conflictReasons: ['熱感・ほてり', '紅舌'], missingCount: 2,
}, 'Conflicts and absent support findings remain separate and cannot add support groups');
assert(!evidence('spleen-qi', { paleTongue: 'present' }, { tongueColor: '紅' }).supportReasons.includes('淡白舌'),
  'Current structured input overrides a stale legacy positive');
assert.deepEqual(plain(evidence('yin', {}, { tongueColor: '判断困難', tongueMoisture: '部位で異なる', inspectionDetails: '紅舌 少苔', pulseRate: '120' }).supportReasons), [],
  'Unclear observations, free text and measured pulse rate are not interpreted as support');
assert.deepEqual(plain(evidence('damp', {}, {
  coatColor: '苔を認めない', coatThickness: '厚い', coatTexture: '膩苔（きめ細かく粘る）',
}).supportReasons), [], 'Inconsistent coating input is withheld from evidence');
assert.deepEqual(plain(evidence('stasis', {}, { painQuality: '刺すような痛み' }).supportReasons), [],
  'Stabbing pain without a confirmed fixed location cannot become fixed-pain support');
assert.deepEqual(plain(evidence('stasis', {}, { painQuality: '刺すような痛み', painLocation: '固定している' }).supportReasons), ['固定した刺すような痛み']);

function actualOptions(observations = {}, examination = {}) {
  return workflow.CLINICAL_PATTERNS.map(pattern => {
    const comparison = workflow.compareClinicalPattern(pattern, observations, examination);
    return {
      id: pattern.id, name: pattern.name, category: pattern.category,
      supportCount: comparison.supported.length, unknownCount: comparison.unknown.length,
      conflictCount: comparison.conflicting.length, ...clinicalCandidateEvidence(comparison),
    };
  });
}

const filename = path.resolve(__dirname, '../src/components/clinical/ClinicalCandidatePicker.tsx');
const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  fileName: filename,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const slots = [], exported = {};
let cursor = 0, tree, changes = 0, safetyReviews = 0;
let selectedIds = Object.freeze(['qi-counterflow', 'stasis']);
let patterns = actualOptions({}, tongue);
let evidenceBlockedReason;
vm.runInNewContext(output, { exports: exported, require: id => id === 'react' ? {
  useId: () => 'narrowing-search',
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
  tree = exported.default({
    patterns, selectedIds, evidenceFiltering: true, evidenceBlockedReason,
    onReviewSafety: () => { safetyReviews++; },
    onChange: next => { selectedIds = Object.freeze(next); changes++; },
  });
}
function button(label) {
  const result = nodes(tree).find(node => node.type === 'button' && text(node) === label);
  assert(result, `Button is available: ${label}`);
  return result;
}
const click = label => { button(label).props.onClick(); render(); };
const status = () => text(nodes(tree).find(node => node.props?.role === 'status'));
const rows = () => nodes(tree).filter(node => node.props?.className === 'clinical-catalog-option');
const rowNames = () => plain(rows().map(row => text(nodes(row).find(node => node.type === 'strong'))));
const search = () => nodes(tree).find(node => node.type === 'input' && node.props.type === 'search');
const query = value => { search().props.onChange({ target: { value } }); render(); };
const selection = () => text(nodes(tree).find(node => node.props?.className === 'clinical-catalog-selection'));
const names = ids => ids.map(id => workflow.CLINICAL_PATTERNS.find(pattern => pattern.id === id).name);

render();
assert.equal(button('全候補を表示').props['aria-pressed'], true, 'The default view includes all candidates');
assert(status().includes('該当26件のうち 6件'));
assert.deepEqual(rowNames(), plain(workflow.CLINICAL_PATTERNS.slice(0, 6).map(pattern => pattern.name)), 'Default order remains catalogue order');
click('支持所見あり（9件）');
assert(status().includes('支持所見あり · 該当9件のうち 6件'));
assert.deepEqual(rowNames(), names(['spleen-qi', 'spleen-yang', 'blood', 'yang', 'liver-blood', 'liver-spleen']),
  'Supported candidates remain in catalogue order instead of ranking by raw support count');
assert(selection().includes('気逆×') && selection().includes('瘀血の候補×'), 'Unsupported selected candidates remain visible in the selection strip');
click('ほかの候補を表示（残り3件）');
assert.equal(rows().length, 9);
click('複数の四診で支持（0件）');
assert.equal(rows().length, 0, 'Multiple tongue findings cannot pass the multiple-examination filter');
assert(text(tree).includes('同じ舌診の複数項目は1つの四診として数えます'));

patterns = actualOptions({ fatigue: 'present' }, tongue); render();
assert.equal(button('複数の四診で支持（5件）').props['aria-pressed'], true);
assert.deepEqual(rowNames(), names(['spleen-qi', 'spleen-yang', 'yang', 'lung-qi', 'kidney-yang']),
  'Adding a second examination group recomputes the active filter without a stale empty state');
assert(text(rows()[0]).includes('支持のある四診：問診・望診'));
assert(text(rows()[0]).includes('支持：疲労・気力低下、淡白舌、腫大・胖大舌 ほか1件'), 'Compact reasons remain readable and disclose additional findings');

patterns = actualOptions({ fatigue: 'present', heat: 'present', appetite: 'absent' }, tongue); render();
const qiRow = rows().find(row => text(row).includes('脾気虚'));
assert(qiRow, 'A candidate with positive support and conflict stays in the filtered result');
assert(text(qiRow).includes('合いにくい：熱感・ほてり'));
assert(text(qiRow).includes('支持所見：確認してなし 1件'), 'Absent support is shown separately from conflicting findings');
query('腎');
assert.deepEqual(rowNames(), names(['kidney-yang']), 'Search intersects with the active evidence filter');
click('脾胃');
assert.equal(rows().length, 0, 'Category also intersects with search and evidence filtering');
click('絞り込みを解除');
assert.equal(search().props.value, '');
assert.equal(button('すべて').props['aria-pressed'], true);
assert.equal(button('全候補を表示').props['aria-pressed'], true, 'Empty-result recovery resets evidence, search and category filters together');
assert.equal(rows().length, 6);

patterns = actualOptions(); render();
click('支持所見あり（0件）');
assert.equal(rows().length, 0, 'Clearing observations recomputes support counts and active filtering');
assert(text(tree).includes('現在の入力では支持所見と結びつく候補がありません'));
assert.equal(changes, 0, 'Filter changes and observation recomputation never mutate selected IDs');
assert.equal(selectedIds.join(','), 'qi-counterflow,stasis');

for (const reason of ['安全確認が未完了です。', '医療評価を優先する状態です。']) {
  evidenceBlockedReason = reason; render();
  assert.equal(button('全候補を表示').props['aria-pressed'], true, 'Blocked evidence filters effectively fall back to all candidates');
  assert.equal(button('支持所見あり（0件）').props.disabled, true);
  assert.equal(button('複数の四診で支持（0件）').props.disabled, true);
  assert.equal(button('支持所見あり（0件）').props['aria-pressed'], false);
  assert.equal(rows().length, 6);
  assert(text(tree).includes(reason));
  click('主訴・安全確認へ戻る');
}
assert.equal(safetyReviews, 2, 'Safety and referral states both expose a working review callback');
assert.equal(changes, 0, 'Safety review also leaves candidate selection untouched');
assert.equal(selectedIds.join(','), 'qi-counterflow,stasis');
assert(nodes(tree).some(node => node.props?.role === 'status' && node.props['aria-live'] === 'polite' && node.props['aria-atomic'] === 'true'));

console.log('Clinical candidate narrowing: real evidence grouping, tongue correlation, legacy deduplication, conflicts, missing and unknown findings, live filters, catalogue order, selection retention, resets and safety blocking passed.');
