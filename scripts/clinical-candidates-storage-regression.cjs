/* eslint-disable @typescript-eslint/no-require-imports -- Exercise real draft conversion and persistence helpers. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const memory = new Map();
const sessionStorage = {
  getItem: key => memory.get(key) ?? null,
  setItem: (key, value) => memory.set(key, value),
  removeItem: key => memory.delete(key),
};
const load = createDataLoader({ Intl, sessionStorage });
const encounters = load('src/utils/clinicalEncounter');
const { appendClinicalPrinciple } = load('src/utils/clinicalTreatment');
const { persistClinicalNote } = load('src/utils/clinicalNoteSave');
const { CLINICAL_PATTERNS } = load('src/data/clinicalWorkflow');
const plain = value => JSON.parse(JSON.stringify(value));
let checks = 0;
function check(name, action) {
  try { action(); checks++; } catch (error) { error.message = name + ': ' + error.message; throw error; }
}
function sample(patch = {}) {
  return { ...encounters.emptyClinicalEncounter(), patientIdentifier: 'TEST-CANDIDATE', chiefComplaint: '再評価を必要とする痛み', visitDate: '2026-10-18', safety: 'reviewed', candidateIds: ['liver-qi'], principle: '本人の希望と追加所見を確認する。', ...patch };
}
const patternName = id => CLINICAL_PATTERNS.find(pattern => pattern.id === id).name;

check('old drafts without the new field and all original candidate IDs remain readable', () => {
  const legacy = sample({ savedNoteId: 'pn_legacy', candidateIds: ['spleen-qi', 'spleen-yang', 'liver-qi', 'liver-heat', 'yin', 'stasis', 'damp'] });
  delete legacy.customCandidates;
  assert(encounters.parseClinicalEncounter(legacy));
  assert.equal(encounters.parseClinicalEncounter(legacy).savedNoteId, 'pn_legacy');
  assert.equal(encounters.emptyClinicalEncounter().customCandidates, '');
  assert.equal(encounters.clinicalEncounterDraft(legacy, []).syndrome, legacy.candidateIds.map(patternName).join('／'));
});
check('only optional strings up to the limit are accepted and parsing never mutates a draft', () => {
  const encounter = sample({ customCandidates: '仮'.repeat(2000), savedNoteId: 'pn_keep' });
  const before = plain(encounter);
  assert(encounters.parseClinicalEncounter(encounter));
  assert.deepEqual(plain(encounter), before);
  for (const invalid of [null, 7, {}, [], '仮'.repeat(2001)]) assert.equal(encounters.parseClinicalEncounter({ ...encounter, customCandidates: invalid }), null);
  assert.equal(encounters.parseClinicalEncounter({ ...encounter, candidateIds: ['missing-catalogue-id'] }), null);
});
check('candidate names retain chosen order, omit empty custom text and remove identical entries', () => {
  const known = [patternName('liver-qi'), patternName('spleen-qi')];
  assert.deepEqual(plain(encounters.clinicalCandidateNames(sample({ candidateIds: ['liver-qi', 'spleen-qi', 'liver-qi'], customCandidates: '  その他の仮説\n条件を追加確認  ' }))), [...known, 'その他の仮説\n条件を追加確認']);
  assert.deepEqual(plain(encounters.clinicalCandidateNames(sample({ customCandidates: ' \n ' }))), [known[0]]);
  assert.deepEqual(plain(encounters.clinicalCandidateNames(sample({ customCandidates: '  ' + known[0] + '  ' }))), [known[0]]);
});
check('custom-only hypotheses and handwritten treatments convert through the unchanged note schema', () => {
  const encounter = sample({ candidateIds: [], customCandidates: '  独自に検討した仮説\n現時点では保留  ', principle: '  所見を追加してから治法を判断する。\n本人と相談する。  ' });
  const draft = encounters.clinicalEncounterDraft(encounter, []);
  const note = encounters.clinicalEncounterNote(encounter, []);
  assert.equal(draft.syndrome, '独自に検討した仮説\n現時点では保留');
  assert.equal(note.syndrome, draft.syndrome);
  assert(note.treatmentPlan.includes('治法：' + encounter.principle + '\n\n'));
  for (const field of ['customCandidates', 'candidateIds', 'principle', 'savedNoteId']) assert.equal(note[field], undefined);
  assert.deepEqual(Object.keys(note).sort(), ['patientIdentifier', 'chiefComplaint', 'visitDate', 'syndrome', 'selectedPoints', 'treatmentPlan', 'patientReaction', 'nextAction'].sort());
});
check('the full custom limit is retained without truncating a saved syndrome', () => {
  const customCandidates = '仮'.repeat(2000);
  const encounter = sample({ customCandidates });
  const note = encounters.clinicalEncounterNote(encounter, []);
  assert.equal(note.syndrome, patternName('liver-qi') + '／' + customCandidates);
});
check('a session reload and same-ID update retain custom text, manual treatment and legacy metadata', () => {
  memory.clear();
  const encounter = sample({ savedNoteId: 'pn_existing', customCandidates: '独自の仮説', principle: '  自分の言葉で記録。\n再確認する。  ' });
  assert(encounters.writeClinicalEncounter(encounter));
  const restored = encounters.readClinicalEncounter().encounter;
  assert.equal(restored.customCandidates, encounter.customCandidates);
  assert.equal(restored.principle, encounter.principle);
  assert.equal(restored.savedNoteId, encounter.savedNoteId);
  const prior = { ...encounters.clinicalEncounterNote(encounter, []), id: 'pn_existing', createdAt: 5, updatedAt: 6, ageGroup: '40代', selfCarePoints: ['合谷'] };
  let written;
  const result = persistClinicalNote([prior], encounters.clinicalEncounterNote(restored, []), restored.savedNoteId, 1, notes => { written = notes; });
  assert.equal(result.result.ok, true);
  assert.equal(written.length, 1);
  assert.equal(written[0].id, prior.id);
  assert.equal(written[0].createdAt, prior.createdAt);
  assert.equal(written[0].syndrome, patternName('liver-qi') + '／独自の仮説');
  assert(written[0].treatmentPlan.includes(encounter.principle));
  assert.equal(written[0].ageGroup, prior.ageGroup);
  assert.deepEqual(plain(written[0].selfCarePoints), ['合谷']);
});
check('custom draft fields never cross guest or account storage boundaries', () => {
  memory.clear();
  const ownerKey = encounters.CLINICAL_ACTIVE_OWNER_KEY;
  const guest = sample({ customCandidates: 'guest-only', savedNoteId: 'pn_guest' });
  assert(encounters.writeClinicalEncounter(guest));
  memory.set(ownerKey, 'account:A');
  assert.equal(encounters.readClinicalEncounter().encounter, null);
  assert(encounters.writeClinicalEncounter(sample({ customCandidates: 'A-only', savedNoteId: 'pn_A' })));
  memory.set(ownerKey, 'account:B');
  assert.equal(encounters.readClinicalEncounter().encounter, null);
  assert(encounters.writeClinicalEncounter(sample({ customCandidates: 'B-only', savedNoteId: 'pn_B' })));
  memory.set(ownerKey, 'account:A');
  assert.equal(encounters.readClinicalEncounter().encounter.customCandidates, 'A-only');
  assert.equal(encounters.readClinicalEncounter().encounter.savedNoteId, 'pn_A');
  assert(encounters.clearClinicalEncounter());
  memory.set(ownerKey, 'guest');
  assert.equal(encounters.readClinicalEncounter().encounter.customCandidates, 'guest-only');
  memory.set(ownerKey, 'account:B');
  assert.equal(encounters.readClinicalEncounter().encounter.customCandidates, 'B-only');
});
check('a referred record retains hypotheses but excludes intervention and never mutates the editable draft', () => {
  const encounter = sample({ customCandidates: '別の原因も追加確認', safety: 'refer', points: [{ code: 'LI4', role: 'other', reason: '検討中', alternative: '' }], principle: '実施前の検討として補気', plan: '次回に再確認' });
  const before = plain(encounter);
  const note = encounters.clinicalEncounterNote(encounter, ['合谷']);
  assert.equal(note.syndrome, patternName('liver-qi') + '／別の原因も追加確認');
  assert.equal(note.selectedPoints.length, 0);
  assert(!note.treatmentPlan.includes('合谷'));
  assert(!note.treatmentPlan.includes('LI4'));
  assert(!note.treatmentPlan.includes(encounter.principle));
  assert(note.treatmentPlan.includes('施術を保留し医療評価を優先'));
  assert.deepEqual(plain(encounter), before);
  const followup = encounters.clinicalFollowup({ ...note, id: 'pn_prior', createdAt: 1, updatedAt: 1 });
  assert.equal(followup.customCandidates, '');
  assert.equal(followup.principle, '');
  assert.equal(followup.savedNoteId, undefined);
  assert(followup.previousSummary.includes(note.syndrome));
});
check('new treatment terms append without altering any handwritten prefix', () => {
  const manual = '  まず「理気」の適否を追加所見で検討する。\n本人の希望も確認する。  ';
  assert.equal(appendClinicalPrinciple(manual, '理気'), manual + '\n理気');
  assert.equal(appendClinicalPrinciple(manual, '  補気  '), manual + '\n補気');
  assert.equal(appendClinicalPrinciple('', '  補気  '), '補気');
  assert.equal(appendClinicalPrinciple(' \n ', '補気'), ' \n \n補気');
  assert.equal(appendClinicalPrinciple(manual, ' \n '), manual);
});
check('exact treatment tokens prevent duplicates across canonical separators without matching prose substrings', () => {
  for (const separator of ['・', '、', ',', '，', ';', '；', '\n']) {
    const current = '  補気  ' + separator + '  理気  ';
    assert.equal(appendClinicalPrinciple(current, '理気'), current);
    assert.equal(appendClinicalPrinciple(current, '補気'), current);
  }
  assert.equal(appendClinicalPrinciple('滋陰補気', '補気'), '滋陰補気\n補気');
  assert.equal(appendClinicalPrinciple('理気は追加確認後に検討', '理気'), '理気は追加確認後に検討\n理気');
  const first = appendClinicalPrinciple('本人と相談', '補気');
  assert.equal(appendClinicalPrinciple(first, '補気'), first);
});
check('whole composite lines are not added twice and treatment appends cannot invalidate draft length', () => {
  const composite = '  まず条件を再確認する。\r\n疏肝理気・清熱  ';
  assert.equal(appendClinicalPrinciple(composite, '疏肝理気・清熱'), composite);
  const atLimit = '記'.repeat(19997);
  const full = appendClinicalPrinciple(atLimit, '補気');
  assert.equal(full.length, 20000);
  assert.equal(full, atLimit + '\n補気');
  assert(encounters.parseClinicalEncounter(sample({ principle: full })));
  for (const current of ['記'.repeat(19998), '記'.repeat(20000)]) assert.equal(appendClinicalPrinciple(current, '補気'), current);
  assert.equal(appendClinicalPrinciple('', '記'.repeat(20001)), '');
});
console.log(`Clinical candidate storage passed: ${checks} flows for legacy drafts, custom hypotheses, owner isolation, unchanged note schema, same-ID updates, referral safety and editable treatment appends.`);
