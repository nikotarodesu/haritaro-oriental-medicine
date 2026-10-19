/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the real differential UI without a browser. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const { CLINICAL_PATTERNS } = load('src/data/clinicalWorkflow');
const plain = value => JSON.parse(JSON.stringify(value));
function freeze(value) {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
const patternList = ids => freeze(ids.map(id => plain(CLINICAL_PATTERNS.find(pattern => pattern.id === id))));
const filename = path.resolve(__dirname, '../src/components/clinical/ClinicalCandidateDifferential.tsx');
const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  fileName: filename,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;

function hookHost() {
  const slots = [], effects = [];
  let cursor = 0;
  const changed = (old, deps) => !old || !deps || old.length !== deps.length || deps.some((value, index) => !Object.is(value, old[index]));
  const hooks = { ...React,
    useId: () => 'differential-ui',
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[index].value, value => { slots[index].value = typeof value === 'function' ? value(slots[index].value) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { value: compute(), deps }; return slots[index].value; },
    useCallback(callback, deps) { return hooks.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { const previous = slots[index]; slots[index] = { deps }; effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); }); } },
  };
  return { hooks, render(component, props) { cursor = 0; const tree = component(props); while (effects.length) effects.shift()(); return tree; } };
}
function resolve(node) {
  if (Array.isArray(node)) return node.map(resolve);
  if (!node || typeof node !== 'object') return node;
  if (typeof node.type === 'function') return resolve(node.type(node.props));
  return { ...node, props: { ...node.props, children: resolve(node.props?.children) } };
}
function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  return node && typeof node === 'object' ? [node, ...nodes(node.props?.children)] : [];
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node && typeof node === 'object' ? text(node.props?.children) : '';
}
function harness(ids, observations = {}, examination = {}, focusIds = null) {
  const host = hookHost(), exported = {}, checks = [], focusChanges = [];
  let detailsCalls = 0, tree;
  const inputs = freeze({ candidateIds: [...ids], principle: '  手入力の治法を保持\n追加確認を優先する。  ', points: [{ code: 'LI4', reason: '架空の比較理由' }],
    patterns: patternList(ids), observations: plain(observations), examination: plain(examination) });
  const before = JSON.stringify(inputs);
  let controlledFocus = focusIds;
  vm.runInNewContext(output, { exports: exported, require: id => id === 'react' ? host.hooks : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) }, { filename });
  const api = {
    render(nextFocus = controlledFocus) { controlledFocus = nextFocus; tree = resolve(host.render(exported.default, {
      patterns: inputs.patterns, observations: inputs.observations, examination: inputs.examination, focusIds: controlledFocus,
      onFocusChange: next => focusChanges.push(plain(next)), onCheck: id => checks.push(id), onRecordDetails: () => { detailsCalls++; },
    })); return tree; },
    tree: () => tree, checks, focusChanges,
    detailsCalls: () => detailsCalls,
    boxes: () => nodes(tree).filter(node => node.type === 'input' && node.props.type === 'checkbox'),
    checkedNames: () => api.boxes().filter(node => node.props.checked).map(box => text(nodes(tree).find(node => node.type === 'label' && nodes(node).includes(box)))),
    button(label) { const button = nodes(tree).find(node => node.type === 'button' && text(node) === label); assert(button, 'Button: ' + label); return button; },
    finding(label) { const row = nodes(tree).find(node => node.type === 'li' && nodes(node).some(child => child.type === 'strong' && text(child) === label)); assert(row, 'Finding: ' + label); return row; },
    unchanged() { assert.equal(JSON.stringify(inputs), before, 'Comparison controls cannot mutate candidate IDs, findings, treatment or points'); },
  };
  api.render(); return api;
}

for (const ids of [[], ['qi']]) {
  const client = harness(ids);
  assert(text(client.tree()).includes('上の一覧から候補を2件以上選んでください。'));
  assert(nodes(client.tree()).some(node => node.type === 'a' && node.props.href === '#clinical-catalog-heading'));
  assert(!nodes(client.tree()).some(node => node.type === 'h5'), 'Under two selected candidates cannot display a fabricated comparison');
  assert.equal(client.focusChanges.length, 0); client.unchanged();
}
const ids = ['spleen-qi', 'spleen-yang', 'liver-qi', 'liver-heat', 'yin', 'stasis'];
const focused = harness(ids);
assert.deepEqual(focused.checkedNames(), ['脾気虚', '脾陽虚', '肝気鬱結', '肝鬱化火']);
assert(focused.boxes().slice(4).every(box => box.props.disabled), 'The fifth and sixth comparison targets are disabled at four');
assert.equal(focused.focusChanges.length, 0, 'Default focus is displayed without rewriting the selected candidates');
focused.boxes()[0].props.onChange({ target: { checked: false } });
assert.deepEqual(focused.focusChanges.at(-1), ids.slice(1, 4));
assert.equal(focused.boxes().filter(box => box.props.checked).length, 4, 'Focus is controlled by props until the host applies the callback');
focused.render(focused.focusChanges.at(-1));
assert(!focused.boxes()[4].props.disabled);
focused.boxes()[4].props.onChange({ target: { checked: true } });
assert.deepEqual(focused.focusChanges.at(-1), [...ids.slice(1, 4), 'yin']);
focused.render(focused.focusChanges.at(-1));
assert.equal(focused.boxes().filter(box => box.props.checked).length, 4);
assert(focused.boxes()[0].props.disabled && focused.boxes()[5].props.disabled);
const changeCount = focused.focusChanges.length;
focused.boxes()[5].props.onChange({ target: { checked: true } });
assert.equal(focused.focusChanges.length, changeCount, 'Even a direct disabled add handler cannot exceed four');
focused.render(ids);
assert.equal(focused.boxes().filter(box => box.props.checked).length, 4, 'Oversized controlled focus is bounded without changing candidate selection');
focused.render([]);
assert(text(focused.tree()).includes('違いを見る候補を2件以上チェックしてください。'));
focused.unchanged();

const compared = harness(['spleen-qi', 'liver-heat', 'stasis'], { fatigue: 'present', heat: 'absent', cold: 'absent' }, { tongueColor: '紅' });
const relations = (client, label) => nodes(client.finding(label)).filter(node => node.type === 'dd').map(text);
assert.deepEqual(relations(compared, '紅舌'), ['合いにくい', '支持する', '照合設定なし'], 'Present support, conflict and unmapped relations have distinct descriptions');
assert.deepEqual(relations(compared, '熱感・ほてり'), ['合いにくい所見を認めない', '支持所見を認めない', '照合設定なし'],
  'An absent supporting finding is not called conflicting evidence');
assert.deepEqual(relations(compared, '冷え・温めると軽減'), ['照合設定なし', '合いにくい所見を認めない', '照合設定なし']);
assert.deepEqual(relations(compared, '疲労・気力低下'), ['支持する', '照合設定なし', '照合設定なし']);
const redReview = nodes(compared.finding('紅舌')).find(node => node.type === 'button' && text(node) === '入力を見直す');
redReview.props.onClick();
assert.equal(compared.checks.at(-1), 'redTongue', 'Review buttons pass the exact finding ID to the parent');
compared.unchanged();

const questions = harness(['spleen-qi', 'liver-heat', 'stasis']);
questions.button('舌体の色を確認する →').props.onClick();
assert.equal(questions.checks.at(-1), 'paleTongue', 'A grouped tongue question navigates using its first real mapped finding');
questions.button('脈の強さを確認する →').props.onClick();
assert.equal(questions.checks.at(-1), 'weakPulse');
questions.button('脈の速さを確認する →').props.onClick();
assert.equal(questions.checks.at(-1), 'rapidPulse');
assert.deepEqual(relations(questions, '舌体の色'), ['ありなら支持', 'ありなら合いにくい', '照合設定なし', 'ありなら合いにくい', 'ありなら支持', '照合設定なし', '照合設定なし', '照合設定なし', 'ありなら支持'],
  'Grouped unknown findings preserve support, conflict and unmapped relations without inventing absence');
questions.unchanged();
const cough = harness(['qi-counterflow', 'liver-qi']);
cough.button('咳・痰を確認する →').props.onClick();
assert.equal(cough.checks.at(-1), 'exam:cough', 'Detailed-only questions retain their structured finding IDs');
cough.unchanged();

const shared = harness(['spleen-qi', 'spleen-yang'], { fatigue: 'present' });
const sharedList = nodes(shared.tree()).find(node => node.props?.className === 'clinical-differential-shared');
assert(text(sharedList).includes('疲労・気力低下'));
const equivalent = harness(['qi', 'heart-qi'], { fatigue: 'present' });
assert(text(equivalent.tree()).includes('気虚と心気虚は、現在の入力項目では見分けられません。'));
const context = nodes(equivalent.tree()).find(node => node.type === 'details' && node.props.className?.includes('clinical-differential-context'));
assert.equal(context.props.open, true, 'Identical models open their additional clinical checks');
assert(text(context).includes('動悸の性状・時間帯、活動時の息切れ'));
assert(text(context).includes('主訴の経過と、臓腑を考える追加所見'));
assert(text(equivalent.tree()).includes('現在の照合項目には、違いを見るための未確認項目が残っていません。'));
equivalent.button('確認した部位・経過などを四診の補足に記録する →').props.onClick();
assert.equal(equivalent.detailsCalls(), 1, 'Supplementary recording uses its dedicated callback');
assert.equal(equivalent.focusChanges.length, 0);
equivalent.unchanged(); shared.unchanged();

console.log('Clinical candidate differential UI: controlled four-target focus, empty states, present/absent/conflict/unmapped relations, grouped next-check callbacks, identical-model limits, additional recording and immutable clinical inputs passed.');
