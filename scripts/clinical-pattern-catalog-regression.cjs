/* eslint-disable @typescript-eslint/no-require-imports -- Verify persisted pattern IDs and partial comparison catalog references. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader({ Intl });
const { CLINICAL_PATTERN_CATEGORIES, CLINICAL_PATTERNS, CLINICAL_PRINCIPLES, CLINICAL_SIGNS, CLINICAL_COMPLAINTS, compareClinicalPattern } = load('src/data/clinicalWorkflow');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { emptyClinicalEncounter, parseClinicalEncounter, clinicalEncounterNote } = load('src/utils/clinicalEncounter');
const plain = value => JSON.parse(JSON.stringify(value));
const unique = (values, context) => assert.equal(new Set(values).size, values.length, context + ': duplicate value');
const nonempty = (value, context) => assert(typeof value === 'string' && value.trim(), context + ': expected nonempty text');
const signIds = new Set(CLINICAL_SIGNS.map(sign => sign.id));
const lectures = new Map(CURRICULUM_DATA.flatMap(series => series.lectures).map(lecture => [lecture.id, lecture]));
const pointCodes = new Set(ACUPOINTS_MASTER.map(point => point.code));
const patterns = new Map(CLINICAL_PATTERNS.map(pattern => [pattern.id, pattern]));

assert.equal(CLINICAL_SIGNS.length, 19, 'The expanded catalog must not silently expand the observation form.');
assert.equal(CLINICAL_PATTERNS.length, 26);
assert.deepEqual(plain(CLINICAL_PATTERN_CATEGORIES), ['気血津液', '肝胆', '心', '脾胃', '肺', '腎']);
unique(CLINICAL_PATTERNS.map(pattern => pattern.id), 'pattern IDs');
for (const category of CLINICAL_PATTERN_CATEGORIES) assert(CLINICAL_PATTERNS.some(pattern => pattern.category === category), category + ': empty category');
for (const pattern of CLINICAL_PATTERNS) {
  for (const key of ['id', 'name', 'summary', 'principle', 'distinguish']) nonempty(pattern[key], pattern.id + '.' + key);
  assert(CLINICAL_PATTERN_CATEGORIES.includes(pattern.category), pattern.id + ': unknown category');
  assert(lectures.get(pattern.lectureId)?.isPublished, pattern.id + ': lecture must be published');
  assert(Array.isArray(pattern.additionalChecks) && pattern.additionalChecks.length >= 2, pattern.id + ': partial models need additional checks');
  pattern.additionalChecks.forEach(value => nonempty(value, pattern.id + '.additionalChecks'));
  unique(pattern.additionalChecks, pattern.id + '.additionalChecks');
  if (pattern.aliases) { pattern.aliases.forEach(value => nonempty(value, pattern.id + '.aliases')); unique(pattern.aliases, pattern.id + '.aliases'); }
  for (const key of ['supports', 'conflicts']) {
    unique(pattern[key], pattern.id + '.' + key);
    for (const id of pattern[key]) assert(signIds.has(id), pattern.id + ': unknown observation ' + id);
  }
  assert(!pattern.supports.some(id => pattern.conflicts.includes(id)), pattern.id + ': same sign supports and conflicts');
  for (const point of pattern.points) assert(pointCodes.has(point.code), pattern.id + ': unknown point code');
  const unconfirmed = compareClinicalPattern(pattern, {});
  assert.deepEqual(plain(unconfirmed), { supported: [], missing: [], unknown: plain(pattern.supports), conflicting: [] }, pattern.id + ': unknown must not become absent');
  const encounter = { ...emptyClinicalEncounter(), candidateIds: [pattern.id], principle: '自由記載の方針を保持' };
  const parsed = parseClinicalEncounter(plain(encounter));
  assert(parsed, pattern.id + ': candidate must survive draft loading');
  assert.equal(parsed.principle, encounter.principle, pattern.id + ': loading a candidate must not select a treatment');
  assert.equal(clinicalEncounterNote(parsed, []).syndrome, pattern.name, pattern.id + ': saved note must preserve its name');
}
for (const complaint of CLINICAL_COMPLAINTS) for (const id of complaint.patternIds) assert(patterns.has(id), complaint.slug + ': missing preset candidate');

// These IDs already exist in saved drafts and remain valid with their original display and point examples.
const legacy = [
  ['spleen-qi', '脾気虚', '補気健脾', ['ST36', 'SP3']],
  ['spleen-yang', '脾陽虚', '温陽健脾', ['ST36', 'CV12']],
  ['liver-qi', '肝気鬱結', '疏肝理気', ['LR3', 'GB34']],
  ['liver-heat', '肝鬱化火', '疏肝理気・清熱', ['LR3', 'LR2']],
  ['yin', '陰虚の候補', '滋陰（虚熱の有無も確認）', ['KI3', 'SP6']],
  ['stasis', '瘀血の候補', '活血・通絡', ['SP10', 'BL17']],
  ['damp', '湿・痰湿の候補', '化湿・健脾', ['SP9', 'ST40']],
];
for (const [id, name, principle, codes] of legacy) {
  const pattern = patterns.get(id);
  assert(pattern, id + ': missing legacy ID');
  assert.equal(pattern.name, name);
  assert.equal(pattern.principle, principle);
  assert.deepEqual(plain(pattern.points.map(point => point.code)), codes);
}
const legacyIds = new Set(legacy.map(([id]) => id));
for (const pattern of CLINICAL_PATTERNS.filter(pattern => !legacyIds.has(pattern.id))) assert.equal(pattern.points.length, 0, pattern.id + ': new choices must not add automatic point prescriptions');

// None of the existing 19 flags captures upward counterflow; leave this model available for manual reasoning.
const counterflow = patterns.get('qi-counterflow');
const allPresent = Object.fromEntries(CLINICAL_SIGNS.map(sign => [sign.id, 'present']));
assert.deepEqual(plain(compareClinicalPattern(counterflow, allPresent)), { supported: [], missing: [], unknown: [], conflicting: [] });
assert(counterflow.additionalChecks.length > 0, 'No covered flags must never mean no further information is needed.');

assert.equal(CLINICAL_PRINCIPLES.length, 24);
unique(CLINICAL_PRINCIPLES.map(principle => principle.id), 'principle IDs');
unique(CLINICAL_PRINCIPLES.map(principle => principle.label), 'principle labels');
for (const principle of CLINICAL_PRINCIPLES) for (const key of ['id', 'label', 'group']) nonempty(principle[key], 'principle.' + key);
assert.equal(parseClinicalEncounter({ ...emptyClinicalEncounter(), candidateIds: ['missing-pattern'] }), null, 'Unknown IDs must not be silently accepted.');
console.log('Clinical pattern catalog: 26 choices / 6 groups, 24 manual principles, legacy IDs, partial coverage and saved-note references passed.');
