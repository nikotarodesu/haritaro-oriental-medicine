/* eslint-disable @typescript-eslint/no-require-imports -- Exercise native inline controls and real recording rules. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { clinicalFindingInputs } = load('src/utils/clinicalFindingInput');
const { EXAMINATION_FIELDS, examinationValue, updateExaminationValue, resolvedExaminationObservations } = load('src/data/clinicalExamination');
const { CLINICAL_SIGNS, CLINICAL_PATTERNS, compareClinicalPattern } = load('src/data/clinicalWorkflow');
const { EXAMINATION_FINDINGS } = load('src/data/clinicalExaminationComparison');
const { clinicalCandidateDifferential } = load('src/utils/clinicalCandidateDifferential');
const plain = value => JSON.parse(JSON.stringify(value));
const ids = findings => plain(clinicalFindingInputs(findings).map(input => input.id));

assert.deepEqual(ids([]), []);
assert.deepEqual(ids(['paleTongue', 'redTongue', 'exam:purple', 'paleTongue']), ['tongueColor'], 'Tongue findings share one actual colour input');
assert.deepEqual(ids(['fixedPain']), ['painQuality', 'painLocation'], 'Compound fixed pain exposes both required observations');
assert.deepEqual(ids(['weakPulse', 'rapidPulse', 'greasyCoat']), ['pulseStrength', 'pulseSpeed', 'coatTexture']);
assert.deepEqual(ids(['exam:distending', 'fixedPain', 'exam:dryCough', 'exam:phlegm', 'fatigue', 'fatigue']), ['painQuality', 'painLocation', 'cough', 'fatigue'], 'Mixed findings deduplicate actual fields while retaining source order');
assert.deepEqual(ids(['exam:unconfigured']), [], 'Unconfigured findings cannot invent an input');
for (const finding of EXAMINATION_FINDINGS) {
  const inputs = clinicalFindingInputs([finding.id]);
  assert(inputs.some(input => input.kind === 'examination' && input.id === finding.field));
  if (finding.requires) assert(inputs.some(input => input.kind === 'examination' && input.id === finding.requires.field));
}
const fatigue = clinicalFindingInputs(['fatigue'])[0];
assert.equal(fatigue.kind, 'observation');
assert.equal(fatigue.question, CLINICAL_SIGNS.find(sign => sign.id === 'fatigue').question);

const filename = path.resolve(__dirname, '../src/components/clinical/ClinicalFindingInput.tsx');
const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  fileName: filename,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const exported = {};
let scope = 0;
vm.runInNewContext(output, { exports: exported, require: id => id === 'react' ? { useId: () => `inline-${++scope}` } : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) }, { filename });
const Component = exported.default;
function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  return node && typeof node === 'object' ? [node, ...[].concat(node.props?.children || []).flatMap(nodes)] : [];
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node && typeof node === 'object' ? [].concat(node.props?.children || []).map(text).join('') : '';
}
let findingIds = [], observations = {}, examination = {}, tree;
const changes = [];
function render() {
  tree = Component({
    findingIds, observations, examination,
    onObservationChange: (id, status) => { changes.push(['observation', id, status]); observations = { ...observations, [id]: status }; },
    onExaminationChange: (id, value) => {
      changes.push(['examination', id, value]);
      examination = updateExaminationValue(examination, id, value);
      observations = resolvedExaminationObservations(observations, examination);
    },
  });
  return tree;
}
const selects = () => nodes(tree).filter(node => node.type === 'select');
const select = label => {
  const result = selects().find(node => node.props['aria-label'] === label);
  assert(result, `Native select is available: ${label}`);
  return result;
};
const options = node => nodes(node).filter(item => item.type === 'option').map(option => option.props.value);
const change = (label, value) => { select(label).props.onChange({ target: { value } }); render(); };
render(); assert.equal(tree, null);
findingIds = ['paleTongue', 'redTongue', 'exam:purple']; render();
assert.equal(selects().length, 1);
let tongue = select('舌体の色');
assert.deepEqual(plain(options(tongue)), ['', ...EXAMINATION_FIELDS.find(field => field.id === 'tongueColor').options], 'Structured choices exactly match the original form');
assert.equal(tongue.props.value, '');
assert.equal(changes.length, 0, 'Rendering never writes observations');
const firstId = tongue.props.id;
assert(nodes(tree).some(node => node.type === 'label' && node.props.htmlFor === firstId && text(node) === '舌体の色'));
const secondTree = Component({ findingIds, observations, examination, onObservationChange() {}, onExaminationChange() {} });
assert(nodes(secondTree).find(node => node.type === 'select').props.id !== firstId, 'Separate inline panels have separately scoped label IDs');
change('舌体の色', '紅');
assert.deepEqual(changes.at(-1), ['examination', 'tongueColor', '紅']);
assert.equal(select('舌体の色').props.value, '紅');
assert(compareClinicalPattern(CLINICAL_PATTERNS.find(pattern => pattern.id === 'liver-heat'), observations, examination).supported.includes('redTongue'), 'Callback output immediately feeds the existing comparison');
change('舌体の色', '判断困難');
assert.deepEqual(changes.at(-1), ['examination', 'tongueColor', '判断困難']);
assert.equal(select('舌体の色').props.value, '判断困難');
assert(!compareClinicalPattern(CLINICAL_PATTERNS.find(pattern => pattern.id === 'liver-heat'), observations, examination).supported.includes('redTongue'));
change('舌体の色', '');
assert.deepEqual(changes.at(-1), ['examination', 'tongueColor', '']);
assert.equal(select('舌体の色').props.value, '');

findingIds = ['rapidPulse', 'weakPulse']; observations = { rapidPulse: 'absent', weakPulse: 'present' }; examination = {}; render();
assert.equal(select('脈の速さ').props.value, '速くない（通常・遅い未区分）', 'Legacy absent rapid pulse is not converted to normal speed');
assert.equal(select('脈の強さ').props.value, '弱い・無力');
for (const node of selects()) assert(options(node).includes(node.props.value), 'Legacy values remain selectable native choices');
change('脈の速さ', '遅い（遅）');
assert.deepEqual(changes.at(-1), ['examination', 'pulseSpeed', '遅い（遅）']);
assert.equal(select('脈の速さ').props.value, '遅い（遅）');

findingIds = ['fixedPain']; observations = { fixedPain: 'present' }; examination = {}; render();
assert.equal(selects().length, 2);
assert.equal(select('痛みの性質（主なもの）').props.value, '刺すような痛み');
assert.equal(select('痛む場所の変化').props.value, '固定している');
change('痛む場所の変化', '');
assert.deepEqual(changes.at(-1), ['examination', 'painLocation', '']);
assert.equal(observations.fixedPain, 'unknown', 'Clearing either compound input removes fixed-pain support');
change('痛みの性質（主なもの）', '刺すような痛み');
assert.equal(observations.fixedPain, 'unknown', 'Stabbing quality alone cannot restore a fixed location');
change('痛む場所の変化', '固定している');
assert.equal(observations.fixedPain, 'present');

findingIds = ['fatigue', 'cold', 'exam:dryCough', 'exam:phlegm']; observations = {}; examination = {}; render();
assert.equal(selects().length, 3);
assert.deepEqual(plain(options(select('疲労・気力低下'))), ['unknown', 'present', 'absent']);
assert.equal(select('疲労・気力低下').props.value, 'unknown');
for (const node of selects()) {
  assert(nodes(tree).some(item => item.type === 'label' && item.props.htmlFor === node.props.id), 'Every select has an explicit matching label');
  if (node.props['aria-describedby']) assert(nodes(tree).some(item => item.props?.id === node.props['aria-describedby'] && text(item)), 'Observation guidance has a working accessible description');
}
for (const value of ['present', 'absent', 'unknown']) {
  change('疲労・気力低下', value);
  assert.deepEqual(changes.at(-1), ['observation', 'fatigue', value]);
  assert.equal(select('疲労・気力低下').props.value, value);
}
change('冷え・温めると軽減', 'present');
assert.deepEqual(changes.at(-1), ['observation', 'cold', 'present']);
const focused = ['spleen-qi', 'spleen-yang'].map(id => CLINICAL_PATTERNS.find(pattern => pattern.id === id));
assert(clinicalCandidateDifferential(focused, observations, examination).differences.some(finding => finding.id === 'cold' && finding.status === 'present'), 'Inline original-sign changes immediately feed differences');
change('咳・痰', '乾いた咳');
assert.deepEqual(changes.at(-1), ['examination', 'cough', '乾いた咳']);

findingIds = ['redTongue', 'rapidPulse']; observations = {}; examination = { inspectionDetails: '紅舌', pulseRate: '120' }; render();
assert.equal(select('舌体の色').props.value, '');
assert.equal(select('脈の速さ').props.value, '', 'Neither text nor numbers infer a recorded finding');
assert.equal(examinationValue('pulseSpeed', examination, observations), '');
findingIds = ['greasyCoat', 'exam:thick', 'exam:dryCoat']; examination = {}; render();
change('舌苔の性状', '苔を認めない');
for (const id of ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture']) assert.equal(examination[id], '苔を認めない', 'Callbacks preserve the existing coating-consistency handler');
assert.equal(select('舌苔の厚さ').props.value, '苔を認めない');
assert.equal(select('舌苔の乾湿').props.value, '苔を認めない');
assert(nodes(tree).some(node => node.props?.className === 'clinical-inline-finding-fields'));
assert.equal(nodes(tree).filter(node => node.props?.className === 'clinical-inline-finding-field').length, selects().length);

console.log('Clinical inline finding inputs: exact native choices, shared-field deduplication, compound pain, legacy pulse values, controlled updates, original-sign questions, scoped labels, comparison callbacks, clear/unknown states and no text or numeric inference passed.');
