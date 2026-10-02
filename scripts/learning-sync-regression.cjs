/* eslint-disable @typescript-eslint/no-require-imports -- Local PostgreSQL regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { PGlite } = require('@electric-sql/pglite');
const { createDataLoader } = require('./data-loader.cjs');
const storage = new Map();
const load = createDataLoader({ window: {}, crypto, structuredClone, localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) } });
const sync = load('src/utils/learningSync');
const bridge = load('src/utils/learningStorageBridge');
const study = load('src/data/tsubo/studyStorage');
const history = load('src/utils/learningQuizHistory');
const score = load('src/utils/caseReasoningScore');
const { CASE_REASONING_RUBRICS } = load('src/data/caseReasoningRubrics');
const deviceA = '11111111-1111-4111-8111-111111111111';
const deviceB = '22222222-2222-4222-8222-222222222222';
const userA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const userB = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const entry = (key, value, counter, device = deviceA) => ({ key, value, counter, device });

async function main() {
  const a = { 'lecture:one': entry('lecture:one', true, 1) };
  const b = { 'lecture:two': entry('lecture:two', true, 1, deviceB) };
  const merged = sync.mergeLearningDocuments(a, b);
  assert.equal(Object.keys(sync.learningValues(merged)).length, 2);
  assert.equal(JSON.stringify(sync.mergeLearningDocuments(a, b)), JSON.stringify(sync.mergeLearningDocuments(a, b, a, b)));
  assert.equal(sync.mergeLearningDocuments({ x: entry('quiz:q', 'old', 1) }, { x: entry('quiz:q', 'new', 1, deviceB) })['quiz:q'].value, 'new');
  const reset = entry('reset', true, 5);
  assert.equal(Object.keys(sync.learningValues(sync.mergeLearningDocuments(merged, { reset }))).length, 0);
  assert.equal(sync.learningValues(sync.mergeLearningDocuments(merged, { 'quiz:q': entry('quiz:q', null, 4) }))['quiz:q'], undefined);
  assert.equal(sync.validLearningEntry(entry('quiz:q', 'あ'.repeat(6000), 1)), false);
  assert.equal(sync.validLearningEntry(entry('quiz:q', true, -1)), false);

  let document = {};
  const adapter = owner => ({ owner, values: () => sync.learningValues(document), set: (key, value) => { document[key] = sync.nextLearningEntry(document, key, value, deviceA); } });
  storage.set('haritaro_tsubo_study_v1', JSON.stringify({ version: 1, records: { private: { totalAttempts: 99 } } }));
  assert.equal(Object.keys(study.loadStudyData().records).length, 0, 'No unowned fallback during authentication');
  bridge.setLearningStorageAdapter(adapter(userA));
  adapter(userA).set('lecture:one', true);
  const q = { acupointCode: 'LU1', skill: 'location', id: 'q' };
  study.recordAnswerInStore(q, 'a', true, '2026-10-02');
  study.recordSelfEvaluationInStore(q, 'needsReview', '2026-10-02');
  assert.equal(study.loadStudyData().records.LU1_location.totalAttempts, 2);
  assert.equal(study.loadStudyData().records.LU1_location.flaggedForReview, true);
  study.saveActiveSession({ contentVersion: 2, id: 'private-session' });
  bridge.setLearningStorageAdapter(adapter(userB));
  assert.equal(study.loadActiveSession(), null, 'Active session belongs to its account');
  bridge.setLearningStorageAdapter(adapter(userA));
  assert.equal(study.loadActiveSession().id, 'private-session');
  study.resetAllStudyData();
  assert.equal(Object.keys(study.loadStudyData().records).length, 0);
  assert.equal(sync.learningValues(document)['lecture:one'], true, 'Tsubo reset does not erase lecture progress');
  study.recordAnswerInStore(q, 'a', true, '2026-10-03');
  assert.equal(study.loadStudyData().history[0].answeredCount, 1, 'Reset does not resurrect old activity');
  const oldDocument = document;
  const good = study.computeNextReview(undefined, 'LU1', 'location', true, '2026-10-02');
  const bad = study.computeNextReview(undefined, 'LU1', 'location', false, '2026-10-02');
  document = sync.mergeLearningDocuments({
    'tsubo:record:LU1_location': entry('tsubo:record:LU1_location', good, 1),
    'tsubo:answer:a': entry('tsubo:answer:a', { recordKey: 'LU1_location', record: good, date: '2026-10-02', answeredAt: '2026-10-02T10:00:00Z', correct: true }, 2),
    'tsubo:event:a': entry('tsubo:event:a', { date: '2026-10-02', answeredCount: 1, correctCount: 1 }, 3),
  }, {
    'tsubo:record:LU1_location': entry('tsubo:record:LU1_location', bad, 1, deviceB),
    'tsubo:answer:b': entry('tsubo:answer:b', { recordKey: 'LU1_location', record: bad, date: '2026-10-02', answeredAt: '2026-10-02T11:00:00Z', correct: false }, 2, deviceB),
    'tsubo:event:b': entry('tsubo:event:b', { date: '2026-10-02', answeredCount: 1, correctCount: 0 }, 3, deviceB),
  });
  assert.equal(study.loadStudyData().records.LU1_location.totalAttempts, 2, 'Acupoint attempts survive concurrent offline answers');
  assert.equal(study.loadStudyData().records.LU1_location.totalCorrect, 1);
  assert.equal(study.loadStudyData().history[0].answeredCount, 2, 'Daily activity sums distinct offline events');
  document = oldDocument;

  const base = { questionId: 'q', lectureId: 'l', chapterId: 'c', chapterTitle: 'C', lectureTitle: 'L', questionText: 'Q', explanation: 'E', options: ['a', 'b'], userAnswerIndex: 0, correctAnswerIndex: 0, isCorrect: true, revision: 'r', historyEpoch: 'legacy', answeredAt: '2026-10-02T10:00:00Z', lastReviewDate: '2026-10-02', nextReviewDate: '2026-10-03', attempts: 1, mistakes: 0, consecutiveCorrect: 1 };
  const other = { ...base, userAnswerIndex: 1, isCorrect: false, answeredAt: '2026-10-02T11:00:00Z' };
  const combined = history.mergeQuizAttempts(base, [base, other]);
  assert.equal(combined.attempts, 2, 'Two offline attempts both count');
  assert.equal(combined.mistakes, 1);
  assert.equal(combined.consecutiveCorrect, 0);
  assert.equal(history.mergeQuizAttempts({ ...base, historyEpoch: 'new' }, [base, other]).attempts, 1, 'Cleared question does not replay old attempts');
  assert.equal(history.validQuizRecord({ ...base, options: null }), false);
  for (const stages of Object.values(CASE_REASONING_RUBRICS)) for (const reasons of stages) {
    const support = reasons.filter(reason => reason.supports).map(reason => reason.id);
    assert.equal(score.gradeCaseReasoning(2, reasons, support).total, 6);
    assert(score.gradeCaseReasoning(2, reasons, reasons.map(reason => reason.id)).reasoningPoints < 4, 'Selecting all reasons is penalized');
    assert(score.gradeCaseReasoning(2, reasons, []).reasoningPoints === 0);
    if (reasons.some(reason => reason.critical)) assert(score.gradeCaseReasoning(0, reasons, support).safetyReviewRequired);
  }

  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); insert into auth.users values ('${userA}'),('${userB}'); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$; grant usage on schema auth to authenticated;`);
    const sql = fs.readFileSync('supabase/learning-sync.sql', 'utf8');
    await db.exec(sql);
    await db.exec(sql); // Additive setup can be retried safely.
    const asUser = async user => { await db.exec('reset role; set role authenticated;'); await db.query("select set_config('request.jwt.claim.sub', $1, false)", [user]); };
    const write = values => db.query('select entry_key,counter,device,value from public.sync_learning_entries($1::jsonb)', [JSON.stringify(values.map(e => ({ entry_key: e.key, counter: e.counter, device: e.device, value: e.value })))]);
    await asUser(userA);
    await write([entry('lecture:one', true, 2)]);
    await write([entry('lecture:one', false, 1)]);
    let result = await db.query('select * from public.learning_entries');
    assert.equal(result.rows[0].value, true, 'Stale offline snapshot rejected atomically');
    await write([entry('lecture:one', false, 2, deviceB)]);
    assert.equal((await db.query('select value from public.learning_entries')).rows[0].value, false, 'Tie-break agrees with client');
    await asUser(userB);
    assert.equal((await db.query('select * from public.learning_entries')).rows.length, 0, 'Other user cannot read A');
    assert.equal((await db.query('update public.learning_entries set value = \'true\' returning *')).rows.length, 0, 'Other user cannot change A');
    await assert.rejects(() => db.query('insert into public.learning_entries(user_id,entry_key,counter,device,value) values ($1, $2, 1, $3, $4)', [userA, 'quiz:foreign', deviceA, 'true']));
    await write([entry('lecture:one', true, 1)]);
    await assert.rejects(() => db.query('update public.learning_entries set user_id=$1', [userA]), 'Cannot transfer ownership');
    await assert.rejects(() => write([entry('quiz:rollback', true, 1), entry('invalid-key', true, 1)]));
    assert.equal((await db.query("select * from public.learning_entries where entry_key='quiz:rollback'")).rows.length, 0, 'Invalid batch rolls back all entries');
    await assert.rejects(() => write(Array.from({ length: 101 }, (_, i) => entry('quiz:' + i, true, 1))));
    await assert.rejects(() => write([entry('quiz:big', 'あ'.repeat(6000), 1)]));
    await db.exec('reset role; set role anon;');
    await assert.rejects(() => db.query('select * from public.learning_entries'), 'Anonymous read denied');
    await assert.rejects(() => write([entry('quiz:q', true, 1)]), 'Anonymous RPC denied');
  } finally { await db.close(); }
  console.log('PASS: account isolation, RLS, atomic conflict merge, offline histories, resets, import namespaces, reason scoring and safety flags.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
