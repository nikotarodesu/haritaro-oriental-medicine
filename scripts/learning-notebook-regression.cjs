const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  let file = path.resolve(root, relative);
  if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(file), id)) : require(id);
  vm.runInNewContext(js, { exports, require: localRequire, TextEncoder, URL, console }, { filename: file });
  return exports;
}
const notebook = load('src/utils/learningReflection');
const sync = load('src/utils/learningSync');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { PROGRESSIVE_CASES } = load('src/data/progressiveCases');
const { REFLECTION_LECTURES, REFLECTION_CASES } = load('src/data/learningReflectionCatalog');
const { CASE_REASONING_RUBRICS } = load('src/data/caseReasoningRubrics');
const { gradeCaseReasoning } = load('src/utils/caseReasoningScore');
const { readCaseLearningRecords, getCaseRevision } = load('src/utils/learningFocus');
const catalogText = fs.readFileSync(path.join(root, 'src/data/learningReflectionCatalog.ts'), 'utf8');
assert(!/contentMarkdown|presentation|steps:/.test(catalogText), 'client source catalogue contains metadata only');
assert.equal(JSON.stringify(REFLECTION_LECTURES), JSON.stringify(CURRICULUM_DATA.flatMap(stage => stage.lectures).filter(lecture => lecture.isPublished).map(({ id, title }) => ({ id, title }))));
assert.equal(JSON.stringify(REFLECTION_CASES), JSON.stringify(PROGRESSIVE_CASES.map(({ id, title }) => ({ id, title }))));

const id = '12345678-1234-4234-8234-123456789abc';
const snapshotId = '12345678-1234-4234-8234-123456789abd';
const otherId = '12345678-1234-4234-8234-123456789abe';
const device = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const now = '2026-10-04T00:00:00.000Z';
const later = '2026-10-05T00:00:00.000Z';
const source = notebook.resolveLearningReflectionSource('lecture', 'lecture-yinyang-1');
assert.equal(source.href, '/curriculum/lecture-yinyang-1');
assert.equal(notebook.buildLearningReflectionHref(source), '/notes?tab=learning&sourceType=lecture&sourceId=lecture-yinyang-1');
assert.equal(notebook.buildLearningReflectionHref({ type: 'case', id: 'fatigue-reasoning' }), '/notes?tab=learning&sourceType=case&sourceId=fatigue-reasoning');
for (const invalid of ['https://example.com', '../notes', 'lecture-yinyang-1&text=secret', '<script>', 'private-note-id', '__proto__']) {
  assert.equal(notebook.resolveLearningReflectionSource('lecture', invalid), null);
  assert.equal(notebook.buildLearningReflectionHref({ type: 'lecture', id: invalid }), '/notes?tab=learning');
}
assert.equal(notebook.resolveLearningReflectionSource('patient', 'fatigue-reasoning'), null);

const fields = { title: '  自分の振り返り  ', keyPoints: '観察と解釈を分ける', uncertainty: '', reasoning: '説明できるかを考えた', nextCheck: '要点を読み直す' };
const note = notebook.createLearningReflection(fields, source, id, now);
assert.equal(note.title, '自分の振り返り');
assert.equal(note.createdAt, now);
assert.equal(notebook.validLearningReflection(note), true);
const entry = sync.nextLearningEntry({}, notebook.reflectionKey(id), note, device);
let ownerA = { [entry.key]: entry };
let ownerB = {};
assert.equal(notebook.readLearningReflections(sync.learningValues(ownerA)).length, 1);
assert.equal(notebook.readLearningReflections(sync.learningValues(ownerB)).length, 0, 'another owner has no imported reflection');
const edited = notebook.createLearningReflection({ ...fields, keyPoints: '観察と解釈、未確認事項を分ける' }, source, id, later, note);
const reorderedByCloud = Object.fromEntries(Object.entries(note).reverse());
reorderedByCloud.source = { id: source.id, type: source.type };
assert.equal(notebook.sameLearningReflection(note, reorderedByCloud), true, 'cloud JSON key order does not create an edit conflict');
assert.equal(notebook.sameLearningReflection(note, edited), false, 'actual concurrent edits are detected');
assert.equal(JSON.stringify(notebook.reflectionEditingBaseline(note)), JSON.stringify(notebook.reflectionEditingBaseline(reorderedByCloud)), 'edit baseline ignores cloud object order');
assert.equal(edited.createdAt, now);
assert.equal(edited.updatedAt, later);
const oldEntry = sync.nextLearningEntry(ownerA, notebook.reflectionHistoryKey(id, snapshotId), note, device);
ownerA = { ...ownerA, [oldEntry.key]: oldEntry };
const editEntry = sync.nextLearningEntry(ownerA, notebook.reflectionKey(id), edited, device);
ownerA = { ...ownerA, [editEntry.key]: editEntry };
let values = sync.learningValues(ownerA);
assert.equal(notebook.readLearningReflections(values)[0].keyPoints, edited.keyPoints);
assert.equal(notebook.readLearningReflectionHistory(values, id)[0].keyPoints, note.keyPoints);
assert.equal(notebook.getReflectionComparisons(values, edited.source, edited)[0].updatedAt, now);
assert.equal(notebook.getReflectionComparisons(values, { type: 'lecture', id: 'lecture-wuxing-1' }).length, 0, 'other material does not appear as an earlier reflection');
const nextNote = notebook.createLearningReflection(fields, source, otherId, '2026-10-06T00:00:00.000Z');
assert.equal(notebook.getReflectionComparisons({ ...values, [notebook.reflectionKey(otherId)]: nextNote }, nextNote.source, nextNote)[0].id, id);
assert.equal(notebook.getReflectionComparisons(values, note.source, note).length, 0, 'future version is not labeled earlier');

const malformed = [null, [], {}, { ...note, version: 2 }, { ...note, id: 'invalid' }, { ...note, source: { type: 'lecture', id: 'private' } },
  { ...note, createdAt: later }, { ...note, updatedAt: '2026-02-30T00:00:00.000Z' }, { ...note, title: ' ' }, { ...note, keyPoints: 'x\0y' },
  { ...note, keyPoints: 'x'.repeat(1001) }, { ...note, extra: 'あ'.repeat(5000) }];
for (const invalid of malformed) assert.equal(notebook.validLearningReflection(invalid), false);
assert.equal(notebook.readLearningReflections({ 'settings:reflection:invalid': note, [notebook.reflectionKey(otherId)]: note }).length, 0, 'mismatched record key cannot impersonate a note');
assert.throws(() => notebook.createLearningReflection({ ...fields, keyPoints: '', uncertainty: '', reasoning: '', nextCheck: '' }, source, id, now));
assert.throws(() => notebook.createLearningReflection(fields, source, otherId, later, note));
assert.throws(() => notebook.reflectionHistoryKey(id, 'not-a-snapshot'));
const maximum = Object.fromEntries(Object.entries(notebook.REFLECTION_LIMITS).map(([key, limit]) => [key, 'あ'.repeat(limit)]));
const maximumNote = notebook.createLearningReflection(maximum, source, id, now);
assert(notebook.reflectionByteLength(maximumNote) < 15000);
assert(sync.validLearningEntry(sync.nextLearningEntry({}, notebook.reflectionKey(id), maximumNote, device)), 'maximum Japanese input fits sync byte limit');
const beforeDeletion = ownerA;
for (const key of notebook.getReflectionRemovalKeys(values, id)) {
  const removed = sync.nextLearningEntry(ownerA, key, null, device);
  ownerA = { ...ownerA, [key]: removed };
}
ownerA = sync.mergeLearningDocuments(ownerA, beforeDeletion);
assert.equal(notebook.readLearningReflections(sync.learningValues(ownerA)).length, 0);
assert.equal(notebook.readLearningReflectionHistory(sync.learningValues(ownerA), id).length, 0, 'stale sync cannot resurrect deleted snapshots');
const deletionMarker = sync.nextLearningEntry(ownerA, notebook.reflectionDeletionKey(id), { version: 1, deletedAt: later }, device);
ownerA = { ...ownerA, [deletionMarker.key]: deletionMarker };
const unseenOfflineEdit = sync.nextLearningEntry(ownerA, notebook.reflectionKey(id), edited, device);
const unseenOfflineHistory = sync.nextLearningEntry({ ...ownerA, [unseenOfflineEdit.key]: unseenOfflineEdit }, notebook.reflectionHistoryKey(id, otherId), note, device);
const withLateEdits = sync.mergeLearningDocuments(ownerA, { [unseenOfflineEdit.key]: unseenOfflineEdit, [unseenOfflineHistory.key]: unseenOfflineHistory });
assert.equal(notebook.readLearningReflections(sync.learningValues(withLateEdits)).length, 0, 'a deleted note stays hidden when a higher-counter offline edit arrives');
assert.equal(notebook.readLearningReflectionHistory(sync.learningValues(withLateEdits), id).length, 0, 'an unseen offline snapshot does not restore deleted history');
assert.equal(notebook.getReflectionRemovalKeys({ [notebook.reflectionHistoryKey(id, snapshotId)]: { damaged: true } }, id).length, 2, 'deletion removes damaged history too');
const bEntry = sync.nextLearningEntry(ownerB, notebook.reflectionKey(otherId), nextNote, device);
ownerB = { [bEntry.key]: bEntry };
assert.equal(notebook.readLearningReflections(sync.learningValues(ownerB))[0].id, otherId);
assert.equal(notebook.readLearningReflections(sync.learningValues(ownerA)).length, 0, 'owner B save does not populate owner A');

// The notebook only presents complete attempts on the current public case revision.
const caseItem = PROGRESSIVE_CASES[0];
const answers = {}, reasonAnswers = {}, grades = [];
caseItem.steps.forEach((step, index) => {
  answers[index] = step.options.findIndex(option => option.points === 2);
  reasonAnswers[index] = CASE_REASONING_RUBRICS[caseItem.id][index].filter(reason => reason.supports).map(reason => reason.id);
  grades.push(gradeCaseReasoning(step.options[answers[index]].points, CASE_REASONING_RUBRICS[caseItem.id][index], reasonAnswers[index]));
});
const attempt = { caseId: caseItem.id, score: grades.reduce((sum, grade) => sum + grade.total, 0), revision: getCaseRevision(caseItem.id), answers, reasonAnswers, safetyReviewRequired: false, answeredAt: now };
assert.equal(readCaseLearningRecords({ [`case:${caseItem.id}`]: attempt, 'case:attempt-valid': attempt }, caseItem.id).length, 1);
assert.equal(readCaseLearningRecords({ 'case:attempt-old': { ...attempt, revision: 'old' }, 'case:attempt-incomplete': { ...attempt, answers: {} } }, caseItem.id).length, 0);

// Incomplete input survives a SPA departure; drafts are private to the same owner and public source.
const draft = notebook.createLearningReflectionDraft({ ...fields, title: '' }, source, later, notebook.reflectionEditingBaseline(note));
const draftKey = notebook.reflectionDraftKey(draft.source);
assert.equal(draftKey, 'settings:reflection-draft:lecture/lecture-yinyang-1');
const draftEntry = sync.nextLearningEntry({}, draftKey, draft, device);
const draftOwnerA = { [entry.key]: entry, [draftKey]: draftEntry };
const draftValues = sync.learningValues(draftOwnerA);
assert.equal(notebook.readLearningReflectionDraft(draftValues, draft.source).title, '', 'unfinished title is restored without requiring a complete saved note');
assert.equal(notebook.readLearningReflectionDraft(draftValues, { type: 'case', id: 'fatigue-reasoning' }), null);
assert.equal(notebook.readLearningReflectionDraft(sync.learningValues(ownerB), draft.source), null, 'another owner cannot resume an unimported draft');
assert.equal(notebook.resolveReflectionDraftBaseline(draftValues, draft).conflict, false);
const cloudReorderedDraft = { ...draft, editing: Object.fromEntries(Object.entries(draft.editing).reverse()) };
assert.equal(notebook.resolveReflectionDraftBaseline(draftValues, cloudReorderedDraft).conflict, false);
assert.equal(notebook.resolveReflectionDraftBaseline({ ...draftValues, [entry.key]: edited }, draft).conflict, true, 'a resumed draft never overwrites a newer saved note');
assert.equal(notebook.resolveReflectionDraftBaseline({ ...draftValues, [entry.key]: { ...note, keyPoints: '別の画面での変更' } }, draft).conflict, true, 'same-timestamp changed text is still detected');
const clearedDraft = sync.nextLearningEntry(draftOwnerA, draftKey, null, device);
const afterSaved = sync.mergeLearningDocuments({ ...draftOwnerA, [draftKey]: clearedDraft }, draftOwnerA);
assert.equal(notebook.readLearningReflectionDraft(sync.learningValues(afterSaved), draft.source), null, 'a saved/discarded draft does not return after stale sync');
const maxDraft = notebook.createLearningReflectionDraft(maximum, source, later, notebook.reflectionEditingBaseline(note));
assert(notebook.reflectionByteLength(maxDraft) <= notebook.REFLECTION_MAX_BYTES);
assert(sync.validLearningEntry(sync.nextLearningEntry({}, draftKey, maxDraft, device)));
for (const invalid of [null, {}, { ...draft, version: 2 }, { ...draft, source: { type: 'lecture', id: '../private' } }, { ...draft, editing: { ...draft.editing, id: 'bad' } }, { ...draft, reasoning: 'x'.repeat(1001) }, { ...draft, extra: 'あ'.repeat(5000) }]) {
  assert.equal(notebook.validLearningReflectionDraft(invalid), false);
}
assert.equal(notebook.readLearningReflectionDrafts({ 'settings:reflection-draft:case/fatigue-reasoning': draft }).length, 0, 'mismatched source key is ignored');
assert.throws(() => notebook.reflectionDraftKey({ type: 'lecture', id: 'unpublished' }));
assert.throws(() => notebook.createLearningReflectionDraft({ ...fields, reasoning: '\u0001'.repeat(1000), keyPoints: '\u0001'.repeat(1000), nextCheck: '\u0001'.repeat(800) }, source, later, null), 'UTF8/JSON byte cap is enforced for control-heavy input too');
const deletionValues = { ...draftValues, [notebook.reflectionDeletionKey(id)]: { version: 1, deletedAt: later } };
assert.equal(notebook.readLearningReflectionDraft(deletionValues, draft.source), null, 'a deleted note cannot reappear through its old edit draft');
assert(notebook.getReflectionRemovalKeys(draftValues, id).includes(draftKey), 'deleting a note removes its stored editing draft');
console.log('Learning notebook regression passed: public-source links, metadata parity, save/edit/history, byte limits, damaged records, owner isolation, deletion merge, case record validation, source-scoped draft recovery and edit conflicts.');
