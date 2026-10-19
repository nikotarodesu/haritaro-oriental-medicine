/* eslint-disable @typescript-eslint/no-require-imports -- Verify real, bounded catalogue comparisons. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CLINICAL_PATTERNS } = load('src/data/clinicalWorkflow');
const { clinicalCandidateDifferential } = load('src/utils/clinicalCandidateDifferential');
const plain = value => JSON.parse(JSON.stringify(value));
const patterns = ids => ids.map(id => CLINICAL_PATTERNS.find(pattern => pattern.id === id));
const compare = (ids, observations = {}, examination = {}) => clinicalCandidateDifferential(patterns(ids), observations, examination);
const flattenedChecks = result => result.nextChecks.flatMap(check => check.findings);
const relation = (finding, id) => finding.relations.find(item => item.patternId === id)?.relation;
const empty = { shared: [], sharedFindings: [], differences: [], nextChecks: [], equivalentPairs: [] };

assert.deepEqual(plain(compare([])), empty);
assert.deepEqual(plain(compare(['qi'], { fatigue: 'present' })), empty);
assert.deepEqual(plain(compare(['qi', 'qi'], { fatigue: 'present' })), empty, 'Repeated IDs cannot create a comparison against itself');

let result = compare(['spleen-qi', 'spleen-yang'], { fatigue: 'present', cold: 'present' });
assert(result.shared.some(finding => finding.id === 'fatigue' && finding.status === 'present'));
let cold = result.differences.find(finding => finding.id === 'cold');
assert(cold && cold.status === 'present');
assert.equal(relation(cold, 'spleen-qi'), 'unmapped', 'No association must not mean an opposing finding');
assert.equal(relation(cold, 'spleen-yang'), 'support');
assert(!result.shared.some(finding => finding.id === 'cold'));
result = compare(['spleen-qi', 'spleen-yang'], { fatigue: 'absent', cold: 'absent' });
assert(!result.shared.length, 'Confirmed absence cannot become a shared supporting finding');
assert.equal(result.sharedFindings.find(finding => finding.id === 'fatigue')?.status, 'absent', 'Retained shared editors read actual absence without treating it as positive support');
assert(result.sharedFindings.every(finding => finding.relations.every(item => item.relation === 'support')));
assert.equal(compare(['spleen-qi', 'spleen-yang']).sharedFindings.find(finding => finding.id === 'fatigue')?.status, 'unknown');
cold = result.differences.find(finding => finding.id === 'cold');
assert(cold && cold.status === 'absent' && relation(cold, 'spleen-yang') === 'support', 'Observation state stays separate from catalogue relation');
assert(!flattenedChecks(result).some(finding => finding.id === 'cold'), 'Known absence is not another unanswered question');

result = compare(['liver-qi', 'liver-heat']);
cold = flattenedChecks(result).find(finding => finding.id === 'cold');
assert(cold && cold.status === 'unknown', 'Unconfirmed conflict-only findings are included');
assert.equal(relation(cold, 'liver-qi'), 'unmapped');
assert.equal(relation(cold, 'liver-heat'), 'conflict');
assert(!flattenedChecks(result).some(finding => finding.id === 'stress'), 'Shared unconfirmed supporting findings are not distinguishing checks');
assert(!result.shared.length && !result.differences.length);

result = compare(['spleen-qi', 'liver-heat', 'stasis']);
const tongueChecks = result.nextChecks.filter(check => check.key === 'tongueColor');
assert.equal(tongueChecks.length, 1, 'Related positive and negative tongue findings share one actual input field');
assert.equal(tongueChecks[0].label, '舌体の色');
assert.equal(tongueChecks[0].group, '望診');
assert.deepEqual(plain(tongueChecks[0].findings.map(finding => finding.id)), ['paleTongue', 'redTongue', 'exam:purple']);
assert(result.nextChecks.find(check => check.key === 'pulseStrength')?.findings.some(finding => finding.id === 'weakPulse'));
assert(result.nextChecks.find(check => check.key === 'pulseSpeed')?.findings.some(finding => finding.id === 'rapidPulse'));
assert(result.nextChecks.find(check => check.key === 'painQuality')?.findings.some(finding => finding.id === 'fixedPain'));
assert(result.nextChecks.find(check => check.key === 'fatigue')?.label === '疲労・気力低下', 'Unstructured signs keep their original key and label');

result = compare(['spleen-qi', 'liver-heat'], { paleTongue: 'present', redTongue: 'absent' }, { tongueColor: '紅' });
assert.equal(result.differences.find(finding => finding.id === 'paleTongue')?.status, 'absent', 'Current structured fields override stale legacy flags');
const red = result.differences.find(finding => finding.id === 'redTongue');
assert(red && red.status === 'present');
assert.equal(relation(red, 'spleen-qi'), 'conflict');
assert.equal(relation(red, 'liver-heat'), 'support');
result = compare(['spleen-qi', 'liver-heat'], { paleTongue: 'present' });
assert.equal(result.differences.find(finding => finding.id === 'paleTongue')?.status, 'present', 'Legacy observations retain their meaning');
result = compare(['spleen-qi', 'liver-heat'], { paleTongue: 'present' }, { tongueColor: '判断困難' });
assert(flattenedChecks(result).some(finding => finding.id === 'paleTongue'));
assert(!result.differences.some(finding => finding.id === 'paleTongue'), 'Unclear structured input cannot preserve stale positive evidence');

for (const ids of [['qi', 'heart-qi'], ['blood', 'liver-blood'], ['kidney-yin', 'liver-kidney-yin']]) {
  result = compare(ids, { fatigue: 'present', paleTongue: 'present' }, { pulseWidth: '細い' });
  assert.deepEqual(plain(result.equivalentPairs.map(pair => pair.ids)), [ids]);
  assert.deepEqual(plain(result.equivalentPairs[0].names), patterns(ids).map(pattern => pattern.name));
  assert(!result.differences.length && !result.nextChecks.length, 'Identical definitions cannot invent structured distinctions');
}
assert(!compare(['spleen-qi', 'spleen-yang']).equivalentPairs.length, 'Identical current evidence does not imply identical full models');
result = compare(['qi', 'heart-qi', 'blood', 'liver-blood']);
assert.deepEqual(plain(result.equivalentPairs.map(pair => pair.ids)), [['qi', 'heart-qi'], ['blood', 'liver-blood']], 'All equivalent pairs are reported independently');

result = compare(['yin', 'damp'], {}, { coatColor: '苔を認めない', coatThickness: '厚い', coatTexture: '膩苔（きめ細かく粘る）' });
const coatIds = ['greasyCoat', 'exam:thick', 'exam:scant', 'exam:dryCoat'];
assert(!result.shared.some(finding => coatIds.includes(finding.id)) && !result.differences.some(finding => coatIds.includes(finding.id)), 'Inconsistent coating is withheld from known observations');
for (const id of coatIds) assert(flattenedChecks(result).some(finding => finding.id === id && finding.status === 'unknown'));
result = compare(['yin', 'damp'], {}, { inspectionDetails: '紅舌 少苔 厚苔', pulseRate: '120' });
assert(!result.shared.length && !result.differences.length, 'Free text and measured pulse rate are not interpreted as evidence');
result = compare(['stasis', 'liver-qi'], {}, { painQuality: '刺すような痛み' });
assert(flattenedChecks(result).some(finding => finding.id === 'fixedPain'), 'Compound pain remains unknown until fixed location is confirmed');

const inputPatterns = patterns(['liver-heat', 'spleen-qi']);
const observations = Object.freeze({ fatigue: 'present', cold: 'absent' });
const examination = Object.freeze({ tongueColor: '紅', pulseStrength: '弱い・無力' });
const snapshot = JSON.stringify({ inputPatterns, observations, examination });
result = clinicalCandidateDifferential(inputPatterns, observations, examination);
assert.equal(JSON.stringify({ inputPatterns, observations, examination }), snapshot, 'Comparisons cannot mutate clinical inputs or catalogue definitions');
for (const finding of [...result.shared, ...result.differences, ...flattenedChecks(result)]) {
  assert.deepEqual(plain(finding.relations.map(item => item.patternId)), ['liver-heat', 'spleen-qi'], 'Relation columns preserve focus order');
}
assert.deepEqual(plain(compare(['spleen-qi', 'liver-heat', 'stasis']).nextChecks.map(check => check.group)),
  plain(compare(['spleen-qi', 'liver-heat', 'stasis']).nextChecks.map(check => check.group).sort((left, right) => ['問診', '望診', '聞診', '切診'].indexOf(left) - ['問診', '望診', '聞診', '切診'].indexOf(right))), 'Questions follow the input form rather than a diagnostic ranking');

console.log('Clinical candidate differential: shared and distinguishing observations, conflict-only unknowns, exact input grouping, equivalent models, coating contradictions, legacy overrides, compound pain, free text and immutable focus order passed.');
