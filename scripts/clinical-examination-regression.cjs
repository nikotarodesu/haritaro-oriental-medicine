/* eslint-disable @typescript-eslint/no-require-imports -- Exercise real comparison and persistence functions. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader({ Intl });
const exam = load('src/data/clinicalExamination');
const comparison = load('src/data/clinicalExaminationComparison');
const workflow = load('src/data/clinicalWorkflow');
const encounters = load('src/utils/clinicalEncounter');
const plain = value => JSON.parse(JSON.stringify(value));
const pattern = id => workflow.CLINICAL_PATTERNS.find(item => item.id === id);
const compare = (id, examination, observations = {}) => workflow.compareClinicalPattern(pattern(id), observations, examination);
let checks = 0;
for (const field of exam.EXAMINATION_FIELDS) {
  assert.equal(new Set(field.options).size, field.options.length);
  for (const value of ['', ...field.options]) assert(exam.validClinicalExamination({ [field.id]: value }), field.id + ': ' + value);
  checks++;
}
assert.equal(Object.keys(comparison.EXAMINATION_ASSOCIATIONS).length, workflow.CLINICAL_PATTERNS.length);
for (const [id, association] of Object.entries(comparison.EXAMINATION_ASSOCIATIONS)) {
  assert(pattern(id));
  for (const key of ['supports', 'conflicts']) for (const finding of association[key] || []) assert(comparison.EXAMINATION_FINDINGS.some(item => item.id === 'exam:' + finding), id + ': ' + finding);
  assert(!association.supports.some(id => association.conflicts?.includes(id)));
  const unknown = compare(id, {});
  assert.equal(unknown.supported.length, 0); assert.equal(unknown.missing.length, 0); assert.equal(unknown.conflicting.length, 0);
  for (const finding of comparison.EXAMINATION_FINDINGS) {
    for (const value of finding.present) assert.equal(comparison.examinationFindingStatus(finding, { [finding.field]: value }), 'present');
    for (const value of ['', '判断困難']) assert.equal(comparison.examinationFindingStatus(finding, { [finding.field]: value }), 'unknown');
  }
  checks++;
}
const qi = compare('spleen-qi', { tongueColor: '淡白', tongueSize: '腫大・胖大', tongueTeeth: '明瞭' });
for (const id of ['paleTongue', 'exam:swollen', 'exam:teeth']) assert(qi.supported.includes(id));
assert(compare('spleen-qi', { tongueColor: '紅' }, { paleTongue: 'present', redTongue: 'absent' }).conflicting.includes('redTongue'), 'Structured colour overrides stale raw flags');
assert(!compare('spleen-qi', { tongueColor: '判断困難' }, { paleTongue: 'present' }).supported.includes('paleTongue'));
const yin = compare('yin', { tongueColor: '紅', coatThickness: '少ない', tongueMoisture: '乾燥している', pulseWidth: '細い' });
for (const id of ['redTongue', 'exam:scant', 'exam:dryTongue', 'exam:fine']) assert(yin.supported.includes(id));
assert(compare('yin', { coatThickness: '厚い' }).conflicting.includes('exam:thick'));
assert(compare('liver-heat', { coatColor: '黄' }).supported.includes('exam:yellow'));
const damp = compare('damp', { coatTexture: '膩苔（きめ細かく粘る）', coatThickness: '厚い', pulseFlow: '滑らか（滑）', edema: '認める' });
for (const id of ['greasyCoat', 'exam:thick', 'exam:slippery', 'exam:edema']) assert(damp.supported.includes(id));
assert(compare('lung-yin', { cough: '乾いた咳', voiceQuality: 'かすれる' }).supported.includes('exam:dryCough'));
assert(compare('qi', { sweating: '安静時にも自然に汗が出る（自汗）' }).supported.includes('exam:selfSweat'));
assert(compare('qi', { sweating: '普段と変わらない' }).unknown.includes('exam:selfSweat'), 'Usual sweating does not exclude spontaneous sweating');
assert(compare('qi-counterflow', { cough: '痰を伴う咳' }).supported.includes('exam:cough'));
assert(compare('stasis', { tongueColor: '青紫', tongueSpots: '点状' }).supported.includes('exam:purple'));
assert(!compare('stasis', { painQuality: '刺すような痛み' }).supported.includes('fixedPain'), 'Stabbing alone cannot establish fixed location');
assert(compare('stasis', { painQuality: '刺すような痛み', painLocation: '固定している' }).supported.includes('fixedPain'));
assert.equal(compare('stasis', { painQuality: '刺すような痛み', painLocation: '固定している' }).supported.filter(id => id === 'fixedPain').length, 1);
assert(compare('spleen-yang', { pulseDepth: '深いところで触れる（沈）', pulseWidth: '細い' }).supported.includes('exam:deep'));
assert(comparison.comparisonContext(pattern('yin'), { tenderness: 'あり', pulseRhythm: '不整を認める', palpationDetails: '架空の補足' }).some(text => text.includes('圧痛：あり')));
const coatAbsent = exam.updateExaminationValue({ coatColor: '黄', coatThickness: '厚い', coatMoisture: '乾燥している' }, 'coatTexture', '苔を認めない');
for (const key of ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture']) assert.equal(coatAbsent[key], '苔を認めない');
const coatPresent = exam.updateExaminationValue(coatAbsent, 'coatColor', '黄');
assert.equal(coatPresent.coatColor, '黄'); assert.equal(coatPresent.coatThickness, '');
const inconsistent = { coatColor: '苔を認めない', coatThickness: '厚い', coatTexture: '膩苔（きめ細かく粘る）' };
assert(exam.examinationIssues(inconsistent).length);
assert(!compare('damp', inconsistent).supported.some(id => id === 'greasyCoat' || id === 'exam:thick'));
assert.equal(exam.examinationValue('tongueTeeth', { tongueShape: '歯痕' }), '明瞭');
const sample = { ...encounters.emptyClinicalEncounter(), examination: { tongueColor: '紅', coatThickness: '少ない', tongueTeeth: '明瞭', tongueCracks: '浅い裂紋' }, observations: { paleTongue: 'present' } };
assert(encounters.parseClinicalEncounter(plain(sample)));
const note = encounters.clinicalEncounterNote(sample, []);
for (const text of ['紅舌：あり', '淡白舌：なし', '舌の歯痕：明瞭', '舌の裂紋：浅い裂紋']) assert(note.treatmentPlan.includes(text));
assert.equal(encounters.clinicalFollowup({ ...note, id: 'test', createdAt: 1, updatedAt: 1 }).examination, undefined);
assert.equal(compare('yin', { pulseRate: '120' }).supported.length, 0);
assert.equal(compare('yin', { inspectionDetails: '紅舌 少苔' }).supported.length, 0, 'Free text does not generate findings');
console.log(`Clinical examination passed: ${checks} field/catalog checks, tongue/pulse/interview/listening associations, unknowns, compound pain, negative findings, contextual inputs, coating consistency, legacy drafts and note persistence.`);
