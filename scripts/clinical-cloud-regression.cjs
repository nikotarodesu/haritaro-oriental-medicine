/* eslint-disable @typescript-eslint/no-require-imports -- Real adapters against isolated PostgreSQL; no live accounts or records. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { PGlite } = require('@electric-sql/pglite');
const root = path.resolve(__dirname, '..');
const userA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const userB = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const copy = value => JSON.parse(JSON.stringify(value));
const fixture = (id, points) => ({ id, patientIdentifier: 'TEST-001', visitDate: '2026-10-27', chiefComplaint: '架空の検証用記録', selectedPoints: ['太衝'], selfCarePoints: points, treatmentPlan: '検証用', nextAction: '確認', createdAt: 100, updatedAt: 200 });

async function main() {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); insert into auth.users values ('${userA}'), ('${userB}'); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$; grant usage on schema auth to authenticated; grant execute on function auth.uid() to authenticated;`);
    const migration = fs.readFileSync(path.join(root, 'supabase/migrations/20261027021246_preserve_patient_note_self_care_points.sql'), 'utf8').replace(/\r\n/g, '\n');
    const schema = fs.readFileSync(path.join(root, 'supabase/schema.sql'), 'utf8').replace(/\r\n/g, '\n');
    assert(schema.includes(migration.trim()), 'Fresh setup and the existing-project migration have identical protection');
    await db.exec(schema.slice(0, schema.indexOf('-- Nullable distinguishes')));
    // A legacy record must survive the additive migration unchanged.
    await db.exec(`insert into public.patient_notes(id,user_id,patient_identifier,visit_date,chief_complaint,created_at,updated_at) values ('legacy','${userA}','TEST-OLD','2026-10-27','fixture',1,2);`);
    await db.exec(migration); await db.exec(migration);
    assert.equal((await db.query("select self_care_points from public.patient_notes where id='legacy'")).rows[0].self_care_points, null);
    await db.exec('grant select, insert, update, delete on public.patient_notes, public.clinical_memos to authenticated;');
    const asUser = async user => { await db.exec('reset role; set role authenticated;'); await db.query("select set_config('request.jwt.claim.sub', $1, false)", [user]); };
    await asUser(userA);

    const upsert = async (table, input) => {
      const allowedTables = ['patient_notes', 'clinical_memos'];
      assert(allowedTables.includes(table));
      const rows = Array.isArray(input) ? input : [input];
      const keys = Object.keys(rows[0]);
      assert(keys.every(key => /^[a-z_]+$/.test(key)));
      for (const row of rows) assert.deepEqual(Object.keys(row), keys, 'Mixed batches send the same explicit columns');
      const quoted = keys.map(key => '"' + key + '"');
      try {
        await db.transaction(async transaction => {
          for (const row of rows) await transaction.query(`insert into public.${table} (${quoted.join(',')}) values (${keys.map((_, index) => '$' + (index + 1)).join(',')}) on conflict (id) do update set ${keys.filter(key => key !== 'id').map(key => '"' + key + '" = excluded."' + key + '"').join(',')}`, keys.map(key => row[key]));
        });
        return { error: null };
      } catch (error) { return { error: { message: error.message } }; }
    };
    let failReads = false, failWrites = false;
    const client = { from(table) { return {
      upsert: input => failWrites ? Promise.resolve({ error: { message: 'fixture failure' } }) : upsert(table, input),
      select: () => ({ order: async () => failReads ? { data: null, error: { message: 'fixture failure' } } : { data: (await db.query(`select * from public.${table} order by updated_at desc`)).rows, error: null } }),
    }; } };
    const exports = {}, filename = path.join(root, 'src/lib/supabase/clinicalMemosDb.ts');
    const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
    vm.runInNewContext(source, { exports, console: { warn() {} }, require(id) { if (id === '@/lib/supabase/client') return { createClient: () => client, isSupabaseConfigured: () => true }; throw Error('Unexpected runtime import: ' + id); } }, { filename });

    // Save -> SQL row -> a separate download -> domain object retains the print-only points.
    const note = fixture('round-trip', ['合谷', '足三里']);
    assert.equal(await exports.upsertPatientNoteToSupabase(userA, note), true);
    let downloaded = await exports.fetchPatientNotesFromSupabase();
    assert.deepEqual(copy(downloaded.find(item => item.id === note.id).selfCarePoints), note.selfCarePoints);
    assert.deepEqual(copy(downloaded.find(item => item.id === note.id).selectedPoints), note.selectedPoints, 'Treatment points stay separate');
    const databaseRow = (await db.query('select * from public.patient_notes where id=$1', [note.id])).rows[0];
    assert.deepEqual(databaseRow.self_care_points, note.selfCarePoints);
    // Legacy tabs can omit the new column; NULL from mixed/old local data must also preserve it.
    const legacyRow = exports.patientNoteToRow(userA, { ...note, selfCarePoints: undefined });
    assert.equal(legacyRow.self_care_points, null);
    delete legacyRow.self_care_points;
    assert.equal((await upsert('patient_notes', legacyRow)).error, null);
    assert.equal(await exports.upsertPatientNoteToSupabase(userA, { ...note, selfCarePoints: undefined }), true);
    downloaded = await exports.fetchPatientNotesFromSupabase();
    assert.deepEqual(copy(downloaded.find(item => item.id === note.id).selfCarePoints), note.selfCarePoints);
    assert.equal(await exports.upsertPatientNoteToSupabase(userA, { ...note, selfCarePoints: [] }), true);
    assert.deepEqual(copy((await exports.fetchPatientNotesFromSupabase()).find(item => item.id === note.id).selfCarePoints), [], 'An intentional empty list clears the old selection');
    const sync = await exports.syncLocalDataToSupabase(userA, [fixture('bulk-new', ['内関']), fixture('bulk-unknown', undefined), fixture('bulk-empty', [])], []);
    assert.equal(sync.notesSynced, 3);
    downloaded = await exports.fetchPatientNotesFromSupabase();
    assert.deepEqual(copy(downloaded.find(item => item.id === 'bulk-new').selfCarePoints), ['内関']);
    assert.equal(downloaded.find(item => item.id === 'bulk-unknown').selfCarePoints, undefined);
    assert.deepEqual(copy(downloaded.find(item => item.id === 'bulk-empty').selfCarePoints), []);
    assert.equal(exports.rowToPatientNote({ ...databaseRow, self_care_points: undefined }).selfCarePoints, undefined, 'Legacy snapshots still decode');
    failReads = true; assert.equal(await exports.fetchPatientNotesFromSupabase(), null); failReads = false;
    failWrites = true; assert.equal(await exports.upsertPatientNoteToSupabase(userA, note), false); failWrites = false;

    // The migration cannot widen table ownership or expose the trigger as an RPC.
    await asUser(userB);
    assert.equal((await exports.fetchPatientNotesFromSupabase()).length, 0);
    assert.equal(await exports.upsertPatientNoteToSupabase(userB, note), false, 'Another account cannot overwrite an existing ID');
    assert.equal((await db.query("update public.patient_notes set self_care_points = array['合谷'] returning id")).rows.length, 0);
    assert.equal((await db.query("select has_function_privilege('authenticated', 'public.preserve_patient_note_self_care_points()', 'EXECUTE') as allowed")).rows[0].allowed, false);
    await db.exec('reset role; set role anon;');
    await assert.rejects(() => db.query('select self_care_points from public.patient_notes'));
    console.log('PASS: care-sheet points survive single and bulk cloud save/download, legacy omission/NULL preserve selections, explicit clearing works, repeatable additive migration, failed requests and unchanged RLS/account isolation.');
  } finally { await db.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
