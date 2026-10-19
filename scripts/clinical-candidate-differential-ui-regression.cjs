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
const { updateExaminationValue, resolvedExaminationObservations } = load('src/data/clinicalExamination');
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
const inputFilename = path.resolve(__dirname, '../src/components/clinical/ClinicalFindingInput.tsx');
const inputOutput = ts.transpileModule(fs.readFileSync(inputFilename, 'utf8'), {
  fileName: inputFilename,
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
function harness(ids, observations = {}, examination = {}, focusIds = null, applyInline = false) {
  const host = hookHost(), exported = {}, inputExports = {}, checks = [], focusChanges = [], observationChanges = [], examinationChanges = [];
  let detailsCalls = 0, tree;
  const inputs = freeze({ candidateIds: [...ids], principle: '  手入力の治法を保持\n追加確認を優先する。  ', points: [{ code: 'LI4', reason: '架空の比較理由' }],
    patterns: patternList(ids), observations: plain(observations), examination: plain(examination) });
  const before = JSON.stringify(inputs);
  let controlledFocus = focusIds;
  let currentObservations = inputs.observations, currentExamination = inputs.examination;
  const localRequire = id => id === 'react' ? host.hooks : id === './ClinicalFindingInput' ? inputExports : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id);
  vm.runInNewContext(inputOutput, { exports: inputExports, require: localRequire }, { filename: inputFilename });
  vm.runInNewContext(output, { exports: exported, require: localRequire }, { filename });
  const api = {
    render(nextFocus = controlledFocus) { controlledFocus = nextFocus; tree = resolve(host.render(exported.default, {
      patterns: inputs.patterns, observations: currentObservations, examination: currentExamination, focusIds: controlledFocus,
      onFocusChange: next => focusChanges.push(plain(next)), onCheck: id => checks.push(id), onRecordDetails: () => { detailsCalls++; },
      onObservationChange: (id, status) => { observationChanges.push([id, status]); if (applyInline) currentObservations = freeze({ ...currentObservations, [id]: status }); },
      onExaminationChange: (id, value) => { examinationChanges.push([id, value]); if (applyInline) { currentExamination = freeze(plain(updateExaminationValue(currentExamination, id, value))); currentObservations = freeze(plain(resolvedExaminationObservations(currentObservations, currentExamination))); } },
    })); return tree; },
    tree: () => tree, checks, focusChanges, observationChanges, examinationChanges,
    observations: () => currentObservations, examination: () => currentExamination,
    detailsCalls: () => detailsCalls,
    boxes: () => nodes(tree).filter(node => node.type === 'input' && node.props.type === 'checkbox'),
    checkedNames: () => api.boxes().filter(node => node.props.checked).map(box => text(nodes(tree).find(node => node.type === 'label' && nodes(node).includes(box)))),
    button(label) { const button = nodes(tree).find(node => node.type === 'button' && text(node) === label); assert(button, 'Button: ' + label); return button; },
    select(label) { const input = nodes(tree).find(node => node.type === 'select' && node.props['aria-label'] === label); assert(input, 'Inline select: ' + label); return input; },
    change(label, value) { api.select(label).props.onChange({ target: { value } }); api.render(); },
    questionKeys: () => nodes(tree).filter(node => node.props?.className === 'clinical-differential-question').map(node => String(node.key)),
    differenceKeys: () => nodes(tree).filter(node => node.props?.className === 'clinical-differential-finding').map(node => String(node.key)),
    differencePlacement(key) { const row = nodes(tree).find(node => node.props?.className === 'clinical-differential-finding' && String(node.key) === key); assert(row); return nodes(tree).some(node => node.type === 'details' && nodes(node).includes(row)) ? 'more' : 'primary'; },
    questionPlacement(key) { const row = nodes(tree).find(node => node.props?.className === 'clinical-differential-question' && String(node.key) === key); assert(row, 'Retained question: ' + key); return nodes(tree).some(node => node.type === 'details' && nodes(node).includes(row)) ? 'more' : 'primary'; },
    finding(label) { const row = nodes(tree).find(node => node.type === 'li' && nodes(node).some(child => child.type === 'strong' && text(child) === label)); assert(row, 'Finding: ' + label); return row; },
    review(label) { const button = nodes(api.finding(label)).find(node => node.type === 'button' && node.props['aria-expanded'] !== undefined); assert(button); button.props.onClick(); api.render(); },
    editor(label) { const editor = nodes(api.finding(label)).find(node => node.props?.className === 'clinical-differential-editor'); assert(editor && !editor.props.hidden, 'Open inline editor: ' + label); return editor; },
    reviewChange(label, field, value) { const input = nodes(api.editor(label)).find(node => node.type === 'select' && node.props['aria-label'] === field); assert(input, 'Review input: ' + field); input.props.onChange({ target: { value } }); api.render(); },
    sharedFinding(label) { const list = nodes(tree).find(node => node.props?.className === 'clinical-differential-shared'); assert(list); const row = nodes(list).find(node => node.type === 'li' && nodes(node).some(child => child.type === 'strong' && text(child) === label)); assert(row, 'Shared finding: ' + label); return row; },
    sharedReview(label) { nodes(api.sharedFinding(label)).find(node => node.type === 'button').props.onClick(); api.render(); },
    sharedEditor(label) { const editor = nodes(api.sharedFinding(label)).find(node => node.props?.className === 'clinical-differential-editor'); assert(editor && !editor.props.hidden); return editor; },
    sharedChange(label, field, value) { const input = nodes(api.sharedEditor(label)).find(node => node.type === 'select' && node.props['aria-label'] === field); assert(input, 'Shared review input: ' + field); input.props.onChange({ target: { value } }); api.render(); },
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
compared.render();
assert.equal(compared.checks.length, 0, 'Review buttons never navigate to the four-examination screen');
assert(nodes(compared.editor('紅舌')).some(node => node.type === 'select' && node.props['aria-label'] === '舌体の色' && node.props.value === '紅'));
const openRedButton = nodes(compared.finding('紅舌')).find(node => node.type === 'button');
assert.equal(openRedButton.props['aria-expanded'], true);
assert.equal(openRedButton.props['aria-controls'], compared.editor('紅舌').props.id, 'Expanded button identifies its accessible editor');
compared.unchanged();

const review = harness(['spleen-qi', 'liver-heat', 'stasis'], { fatigue: 'present', heat: 'present' }, { tongueColor: '紅' }, null, true);
review.review('熱感・ほてり');
review.reviewChange('熱感・ほてり', '熱感・ほてり', 'absent');
assert.deepEqual(relations(review, '熱感・ほてり'), ['合いにくい所見を認めない', '支持所見を認めない', '照合設定なし']);
review.reviewChange('熱感・ほてり', '熱感・ほてり', 'unknown');
assert.equal(review.observations().heat, 'unknown');
assert(text(review.finding('熱感・ほてり')).includes('未確認・判断困難等'));
assert(nodes(review.editor('熱感・ほてり')).some(node => node.type === 'select' && node.props.value === 'unknown'), 'Resetting a known finding retains the same active editor');
assert(text(review.tree()).includes('未確認に戻した所見 1件'));
review.reviewChange('熱感・ほてり', '熱感・ほてり', 'present');
assert(text(review.finding('熱感・ほてり')).includes('支持する'));
review.review('紅舌');
assert(!nodes(review.finding('熱感・ほてり')).some(node => node.type === 'select'), 'Only the newly requested review editor stays open');
review.reviewChange('紅舌', '舌体の色', '淡白');
assert.deepEqual(relations(review, '紅舌'), ['合いにくい所見を認めない', '支持所見を認めない', '照合設定なし']);
assert.deepEqual(relations(review, '淡白舌'), ['支持する', '合いにくい', '照合設定なし']);
review.reviewChange('紅舌', '舌体の色', '');
assert.equal(review.examination().tongueColor, '');
assert(nodes(review.editor('紅舌')).some(node => node.type === 'select' && node.props.value === ''));
review.review('紅舌');
assert(nodes(review.finding('紅舌')).some(node => node.props?.className === 'clinical-differential-editor' && node.props.hidden));
review.review('紅舌');
assert(nodes(review.editor('紅舌')).some(node => node.type === 'select'));
review.render(['spleen-qi', 'stasis']);
assert(!nodes(review.tree()).some(node => node.props?.className === 'clinical-differential-editor' && !node.props.hidden), 'A different focus scope cannot retain an old active review editor');
assert.equal(review.checks.length, 0); assert.equal(review.focusChanges.length, 0); review.unchanged();

const reviewPain = harness(['stasis', 'liver-qi'], {}, { painQuality: '刺すような痛み', painLocation: '固定している' }, null, true);
reviewPain.review('固定した刺すような痛み');
assert.deepEqual(nodes(reviewPain.editor('固定した刺すような痛み')).filter(node => node.type === 'select').map(node => node.props['aria-label']), ['痛みの性質（主なもの）', '痛む場所の変化']);
reviewPain.reviewChange('固定した刺すような痛み', '痛む場所の変化', '');
assert.equal(reviewPain.observations().fixedPain, 'unknown');
assert.equal(nodes(reviewPain.editor('固定した刺すような痛み')).filter(node => node.type === 'select').length, 2, 'Both parts remain editable after the compound finding becomes unknown');
reviewPain.reviewChange('固定した刺すような痛み', '痛む場所の変化', '固定している');
assert.equal(reviewPain.observations().fixedPain, 'present');
assert.equal(reviewPain.checks.length, 0); reviewPain.unchanged();

const reviewCoat = harness(['spleen-qi', 'liver-heat', 'stasis', 'damp'], {
  fatigue: 'present', appetite: 'present', loose: 'present', cold: 'present', stress: 'present', heat: 'present', dry: 'present', heavy: 'present',
}, { tongueColor: '紅', tongueSize: '腫大・胖大', tongueTeeth: '明瞭', coatColor: '黄', coatThickness: '厚い', coatTexture: '膩苔（きめ細かく粘る）', coatMoisture: '乾燥している' }, null, true);
const reviewPlacements = Object.fromEntries(reviewCoat.differenceKeys().map(id => [id, reviewCoat.differencePlacement(id)]));
assert.equal(reviewCoat.differencePlacement('greasyCoat'), 'more');
reviewCoat.review('膩苔');
reviewCoat.reviewChange('膩苔', '舌苔の性状', '苔を認めない');
assert(nodes(reviewCoat.editor('膩苔')).some(node => node.type === 'select' && node.props.value === '苔を認めない'));
for (const [id, placement] of Object.entries(reviewPlacements)) assert.equal(reviewCoat.differencePlacement(id), placement, 'Linked coating changes cannot reparent a review row: ' + id);
reviewCoat.reviewChange('膩苔', '舌苔の性状', '');
assert.equal(reviewCoat.differencePlacement('greasyCoat'), 'more');
assert(nodes(reviewCoat.editor('膩苔')).some(node => node.type === 'select' && node.props.value === ''));
assert.equal(reviewCoat.checks.length, 0); reviewCoat.unchanged();

const questions = harness(['spleen-qi', 'liver-heat', 'stasis']);
questions.change('舌体の色', '紅');
assert.deepEqual(questions.examinationChanges.at(-1), ['tongueColor', '紅'], 'A grouped tongue question edits its actual field directly');
questions.change('脈の強さ', '弱い・無力');
assert.deepEqual(questions.examinationChanges.at(-1), ['pulseStrength', '弱い・無力']);
questions.change('脈の速さ', '速い（数）');
assert.deepEqual(questions.examinationChanges.at(-1), ['pulseSpeed', '速い（数）']);
questions.change('疲労・気力低下', 'present');
assert.deepEqual(questions.observationChanges.at(-1), ['fatigue', 'present']);
assert.equal(questions.checks.length, 0, 'Inline answers never invoke navigation back to the four-examination screen');
assert.deepEqual(relations(questions, '舌体の色'), ['ありなら支持', 'ありなら合いにくい', '照合設定なし', 'ありなら合いにくい', 'ありなら支持', '照合設定なし', '照合設定なし', '照合設定なし', 'ありなら支持'],
  'Grouped unknown findings preserve support, conflict and unmapped relations without inventing absence');
questions.unchanged();
const cough = harness(['qi-counterflow', 'liver-qi']);
cough.change('咳・痰', '乾いた咳');
assert.deepEqual(cough.examinationChanges.at(-1), ['cough', '乾いた咳'], 'Detailed-only questions edit the original structured field');
cough.unchanged();

const live = harness(['spleen-qi', 'liver-heat', 'stasis', 'damp'], {}, {}, null, true);
const initialQuestionKeys = live.questionKeys();
const initialPlacement = Object.fromEntries(initialQuestionKeys.map(key => [key, live.questionPlacement(key)]));
live.change('疲労・気力低下', 'present');
assert.deepEqual(live.questionKeys(), initialQuestionKeys, 'Answered questions stay mounted and in their original order');
assert.equal(live.select('疲労・気力低下').props.value, 'present');
assert(text(live.finding('疲労・気力低下')).includes('支持する'), 'Inline answers immediately update the displayed differences');
live.change('舌体の色', '紅');
assert.equal(live.select('舌体の色').props.value, '紅');
assert.deepEqual(relations(live, '紅舌'), ['合いにくい', '支持する', '照合設定なし', '照合設定なし']);
assert(text(live.tree()).includes('この画面で確認済み'));
live.change('舌体の色', '');
assert.equal(live.select('舌体の色').props.value, '', 'An answered field remains editable after resetting to unconfirmed');
assert.deepEqual(live.questionKeys(), initialQuestionKeys);
for (const [key, placement] of Object.entries(initialPlacement)) assert.equal(live.questionPlacement(key), placement, key + ': editing never reparents a control across the first-six boundary');
live.change('痛みの性質（主なもの）', '刺すような痛み');
assert.equal(live.observations().fixedPain, 'unknown', 'The first part of compound pain remains unconfirmed');
assert.equal(live.select('痛む場所の変化').props.value, '');
live.change('痛む場所の変化', '固定している');
assert.equal(live.observations().fixedPain, 'present');
assert(text(live.finding('固定した刺すような痛み')).includes('支持する'));
live.change('痛む場所の変化', '');
assert.equal(live.observations().fixedPain, 'unknown');
live.change('舌体の色', '紅');
live.render(['stasis', 'damp']);
assert(!live.questionKeys().includes('tongueColor'), 'Answered retained inputs from an earlier focus scope do not leak into a changed comparison');
assert.equal(live.focusChanges.length, 0, 'Answering fields never changes focused or selected candidates');
assert.equal(live.checks.length, 0);
live.unchanged();

const inconsistentCoat = harness(['yin', 'damp'], {}, { coatColor: '苔を認めない', coatThickness: '厚い', coatTexture: '膩苔（きめ細かく粘る）' });
assert(nodes(inconsistentCoat.tree()).some(node => node.props?.role === 'alert' && text(node).includes('再確認するまで苔の詳細は比較根拠に使いません')), 'Old contradictory coating values explain why their comparison evidence is withheld');
inconsistentCoat.unchanged();
const coat = harness(['yin', 'damp', 'stasis'], { nightSweat: 'absent', heavy: 'absent' }, {
  tongueColor: '淡紅', tongueSpots: 'なし', tongueMoisture: '潤っている', cough: '咳・痰を認めない',
  pulseWidth: '中等度', pulseFlow: '滑らか（滑）', edema: '認めない',
}, null, true);
assert.equal(coat.questionPlacement('coatThickness'), 'primary');
assert.equal(coat.questionPlacement('coatTexture'), 'more');
const coatQuestionKeys = coat.questionKeys();
coat.change('舌苔の厚さ', '苔を認めない');
for (const key of ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture']) assert.equal(coat.examination()[key], '苔を認めない');
assert.equal(coat.select('舌苔の性状').props.value, '苔を認めない');
assert.equal(coat.questionPlacement('coatThickness'), 'primary');
assert.equal(coat.questionPlacement('coatTexture'), 'more', 'Synchronized coating values cannot move an active overflow editor into the primary list');
assert.deepEqual(coat.questionKeys(), coatQuestionKeys);
coat.change('舌苔の性状', '膩苔（きめ細かく粘る）');
assert.equal(coat.examination().coatThickness, '');
assert.equal(coat.select('舌苔の厚さ').props.value, '', 'Choosing visible coating again restores linked fields to unconfirmed');
assert.equal(coat.questionPlacement('coatTexture'), 'more');
assert.deepEqual(coat.questionKeys(), coatQuestionKeys, 'Reopened linked coating checks keep the same keys and order');
coat.unchanged();

const shared = harness(['spleen-qi', 'spleen-yang'], { fatigue: 'present' });
const sharedList = nodes(shared.tree()).find(node => node.props?.className === 'clinical-differential-shared');
assert(text(sharedList).includes('疲労・気力低下'));
const equivalent = harness(['qi', 'heart-qi'], { fatigue: 'present' });
assert(text(equivalent.tree()).includes('気虚と心気虚は、現在の入力項目では見分けられません。'));
const context = nodes(equivalent.tree()).find(node => node.type === 'details' && node.props.className?.includes('clinical-differential-context'));
assert(!context.props.open, 'Additional clinical checks also start collapsed, including equivalent models');
assert(text(context).includes('動悸の性状・時間帯、活動時の息切れ'));
assert(text(context).includes('主訴の経過と、臓腑を考える追加所見'));
assert(text(equivalent.tree()).includes('現在の照合項目には、違いを見るための未確認項目が残っていません。'));
equivalent.button('確認した部位・経過などを四診の補足に記録する →').props.onClick();
assert.equal(equivalent.detailsCalls(), 1, 'Supplementary recording uses its dedicated callback');
assert.equal(equivalent.focusChanges.length, 0);
equivalent.unchanged(); shared.unchanged();

const sharedLive = harness(['spleen-qi', 'lung-qi'], { fatigue: 'present' }, { tongueColor: '淡白', pulseStrength: '弱い・無力' }, null, true);
sharedLive.sharedReview('疲労・気力低下');
const sharedButton = nodes(sharedLive.sharedFinding('疲労・気力低下')).find(node => node.type === 'button');
assert.equal(sharedButton.props['aria-expanded'], true);
assert.equal(sharedButton.props['aria-controls'], sharedLive.sharedEditor('疲労・気力低下').props.id);
sharedLive.sharedChange('疲労・気力低下', '疲労・気力低下', 'absent');
assert.equal(sharedLive.observations().fatigue, 'absent');
assert.equal(sharedLive.sharedFinding('疲労・気力低下').props['data-status'], 'absent');
assert(text(sharedLive.sharedFinding('疲労・気力低下')).includes('確認してなし'));
sharedLive.sharedChange('疲労・気力低下', '疲労・気力低下', 'unknown');
assert.equal(sharedLive.sharedFinding('疲労・気力低下').props['data-status'], 'unknown');
assert(nodes(sharedLive.sharedEditor('疲労・気力低下')).some(node => node.type === 'select' && node.props.value === 'unknown'), 'Shared editors stay mounted when their positive evidence is removed');
sharedLive.sharedChange('疲労・気力低下', '疲労・気力低下', 'present');
assert.equal(sharedLive.sharedFinding('疲労・気力低下').props['data-status'], 'present');
sharedLive.sharedReview('淡白舌');
assert(!nodes(sharedLive.sharedFinding('疲労・気力低下')).some(node => node.type === 'select'));
sharedLive.sharedChange('淡白舌', '舌体の色', '紅');
assert.equal(sharedLive.sharedFinding('淡白舌').props['data-status'], 'absent');
assert.deepEqual(relations(sharedLive, '紅舌'), ['合いにくい', '照合設定なし'], 'Changing a common input immediately recomputes distinguishing findings too');
sharedLive.sharedChange('淡白舌', '舌体の色', '');
assert.equal(sharedLive.sharedFinding('淡白舌').props['data-status'], 'unknown');
assert(nodes(sharedLive.sharedEditor('淡白舌')).some(node => node.type === 'select' && node.props.value === ''));
sharedLive.sharedChange('淡白舌', '舌体の色', '淡白');
sharedLive.sharedReview('淡白舌');
sharedLive.sharedReview('淡白舌');
assert(nodes(sharedLive.sharedEditor('淡白舌')).some(node => node.type === 'select' && node.props.value === '淡白'), 'Shared recording can be closed and reopened without changing the value');
sharedLive.sharedReview('弱い脈');
sharedLive.sharedChange('弱い脈', '脈の強さ', '強い・有力');
assert.equal(sharedLive.observations().weakPulse, 'absent');
assert.equal(sharedLive.sharedFinding('弱い脈').props['data-status'], 'absent');
sharedLive.render(['spleen-qi', 'stasis']);
assert(!nodes(sharedLive.tree()).some(node => node.props?.className === 'clinical-differential-editor' && !node.props.hidden), 'A changed focus scope cannot retain an unrelated shared editor');
assert.equal(sharedLive.checks.length, 0); assert.equal(sharedLive.focusChanges.length, 0); sharedLive.unchanged();

const sharedCoat = harness(['yin', 'heart-yin'], {}, { coatThickness: '少ない', coatMoisture: '乾燥している' }, null, true);
sharedCoat.sharedReview('舌苔の乾燥');
sharedCoat.sharedChange('舌苔の乾燥', '舌苔の乾湿', '苔を認めない');
assert.equal(sharedCoat.sharedFinding('舌苔の乾燥').props['data-status'], 'unknown', 'A missing coat does not become a confirmed dry coat');
for (const key of ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture']) assert.equal(sharedCoat.examination()[key], '苔を認めない');
assert(nodes(sharedCoat.sharedEditor('舌苔の乾燥')).some(node => node.type === 'select' && node.props.value === '苔を認めない'));
sharedCoat.sharedChange('舌苔の乾燥', '舌苔の乾湿', '潤っている');
assert.equal(sharedCoat.sharedFinding('舌苔の乾燥').props['data-status'], 'absent');
assert.equal(sharedCoat.examination().coatThickness, '');
assert.equal(sharedCoat.checks.length, 0); sharedCoat.unchanged();

console.log('Clinical candidate differential UI: controlled focus, inline original-field callbacks, live differences, retained answers and stable overflow, coating reconciliation, compound pain, scoped retention, identical-model limits and immutable clinical inputs passed.');
