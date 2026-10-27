/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the real provider with queued React updates and isolated stores. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const plain = value => JSON.parse(JSON.stringify(value));
const { parseClinicalBackup, mergeClinicalBackup, persistClinicalBackup } = load('src/utils/clinicalBackup');
const { clinicalStorageKeys } = load('src/utils/clinicalStorage');
const memo = (id, extra = {}) => ({ id, type: 'custom', title: id, points: ['合谷'], elements: ['金'], indications: [], summary: '学習メモ', createdAt: 10, updatedAt: 20, ...extra });
const note = (id, extra = {}) => ({ id, patientIdentifier: 'TEST-001', chiefComplaint: '架空例', visitDate: '2026-10-27', selectedPoints: [], createdAt: 10, updatedAt: 20, ...extra });
const backup = (memos = [], patientNotes = []) => JSON.stringify({ version: 1, appName: 'haritaro_oriental_medicine_mynote', memos, patientNotes });

function provider() {
  const slots = [], effects = [], updates = [], timers = new Map(), values = new Map(), calls = [];
  let cursor = 0, timerId = 0, failKey = null, rendering = false;
  const remoteMemos = new Map(), remoteNotes = new Map();
  const auth = { user: { id: 'test-account-a' }, isConfigured: true, isPremium: false, isLoading: false };
  const changed = (a, b) => !a || !b || a.length !== b.length || b.some((value, i) => !Object.is(value, a[i]));
  const hooks = { ...React,
    useState(initial) { const i = cursor++; slots[i] ||= { value: typeof initial === 'function' ? initial() : initial }; return [slots[i].value, next => updates.push(() => {
      if (typeof next === 'function') { next(slots[i].value); slots[i].value = next(slots[i].value); } else slots[i].value = next;
    })]; },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
    useMemo(compute, deps) { const i = cursor++; if (changed(slots[i]?.deps, deps)) slots[i] = { value: compute(), deps }; return slots[i].value; },
    useCallback(callback, deps) { return hooks.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const i = cursor++; if (changed(slots[i]?.deps, deps)) { const previous = slots[i]; slots[i] = { deps }; effects.push(() => { previous?.cleanup?.(); slots[i].cleanup = effect(); }); } },
  };
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem(key, value) { if (key === failKey) throw Error('quota'); values.set(key, value); },
    removeItem: key => values.delete(key),
  };
  const db = {
    async fetchPatientNotesFromSupabase() { return plain([...remoteNotes.values()]); },
    async fetchClinicalMemosFromSupabase() { return plain([...remoteMemos.values()]); },
    async syncLocalDataToSupabase(owner, notes, memos) { notes.forEach(item => remoteNotes.set(item.id, plain(item))); memos.forEach(item => remoteMemos.set(item.id, plain(item))); return { notesSynced: notes.length, memosSynced: memos.length }; },
    async upsertClinicalMemoToSupabase(owner, item) { assert(!rendering, 'No cloud writes during a React updater/render'); calls.push(['upsert', owner, plain(item)]); remoteMemos.set(item.id, plain(item)); return true; },
    async deleteClinicalMemoFromSupabase(id) { assert(!rendering); calls.push(['delete', id]); remoteMemos.delete(id); return true; },
  };
  const filename = path.resolve(__dirname, '../src/contexts/ClinicalMemoContext.tsx');
  const source = fs.readFileSync(filename, 'utf8');
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { fileName: filename, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, {
    exports, require: id => id === 'react' ? hooks : id === '@/contexts/AuthContext' ? { useAuth: () => auth } : id === '@/lib/supabase/lazyClinicalMemosDb' ? db : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id),
    localStorage: storage, sessionStorage: storage, console, window: { confirm: () => true },
    setTimeout(callback, delay) { timers.set(++timerId, { callback, delay }); return timerId; }, clearTimeout(id) { timers.delete(id); },
  }, { filename });
  const app = {
    values, calls, auth, storage,
    fail(key) { failKey = key; },
    render() { rendering = true; while (updates.length) updates.shift()(); cursor = 0; const tree = exports.ClinicalMemoProvider({ children: null }); rendering = false; while (effects.length) effects.shift()(); return tree.props.value; },
    async ready() { let state; for (let i = 0; i < 5; i++) { state = app.render(); for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await Promise.resolve(); await Promise.resolve(); } return app.render(); },
  };
  return app;
}

async function main() {
  const current = memo('existing', { summary: '新しい内容' });
  assert.equal(parseClinicalBackup(backup([current], [note('n')])).memos[0].id, current.id);
  for (const invalid of ['{}', 'null', backup([{}]), backup([], [null]), backup([memo('x'), memo('x')]), backup([], [note('n', { selectedPoints: null })]), backup([memo('x', { createdAt: 1e30 })]), backup([memo('x', { elements: ['未知'] })])]) assert.throws(() => parseClinicalBackup(invalid));
  assert.deepEqual(plain(mergeClinicalBackup([current], [memo('existing'), memo('new')])).map(item => item.summary), ['学習メモ', '新しい内容']);
  const raw = new Map([['m', 'original']]);
  const disk = { getItem: key => raw.get(key) ?? null, setItem(key, value) { if (key === 'n') throw Error('quota'); raw.set(key, value); }, removeItem: key => raw.delete(key) };
  assert.throws(() => persistClinicalBackup(disk, { memos: 'm', notes: 'n' }, [current], []));
  assert.equal(raw.get('m'), 'original', 'A failed notes write restores the previous memo snapshot');

  const app = provider(), keys = clinicalStorageKeys('test-account-a');
  let state = await app.ready(); assert.equal(state.isReady, true);
  assert.equal(state.addMemo(memo('first')), true, 'Save returns success even when React queues its state update');
  assert.equal(JSON.parse(app.values.get(keys.memos)).length, 1, 'Success means data is already durable before the next render');
  assert.equal(state.addMemo(memo('second')), true, 'Rapid consecutive saves do not overwrite each other');
  state = app.render(); assert.equal(state.memos.length, 2);
  assert.equal(app.calls.filter(call => call[0] === 'upsert').length, 2, 'Exactly one upload per successful save');
  state.updatePersonalNote('first', '追記'); app.render();
  assert.equal(app.calls.at(-1)[2].personalNotes, '追記', 'Queued rendering cannot skip cloud edits');
  const before = app.values.get(keys.memos), calls = app.calls.length;
  app.fail(keys.memos);
  assert.equal(state.addMemo(memo('rejected')), false);
  state.removeMemo('first'); state.updatePersonalNote('first', '保存されない');
  state = app.render();
  assert.equal(app.values.get(keys.memos), before); assert.equal(state.memos.length, 2);
  assert.equal(app.calls.length, calls, 'Failed local writes do not change the cloud');
  assert.equal(state.lastToast.type, 'warning');
  app.fail(null);
  assert.equal(state.importDataFromJson('{}').success, false);
  assert.equal(state.importDataFromJson(backup([], [note('invalid', { selectedPoints: null })])).success, false);
  assert.equal(app.values.get(keys.memos), before, 'Malformed imports retain every current record');
  app.fail(keys.notes);
  assert.equal(state.importDataFromJson(backup([memo('imported')])).success, false);
  assert.equal(app.values.get(keys.memos), before, 'Partial backup writes roll back');
  app.fail(null);
  const imported = state.importDataFromJson(backup([memo('first', { summary: '古い内容' }), memo('imported')], [note('new-note')]));
  assert.equal(imported.success, true);
  state = await app.ready();
  assert.equal(state.memos.length, 3); assert.equal(state.patientNotes.length, 1);
  assert.equal(state.memos.find(item => item.id === 'first').personalNotes, '追記');
  const stale = state;
  app.auth.user = { id: 'test-account-b' }; state = await app.ready();
  assert.equal(stale.importDataFromJson(backup([memo('foreign')])).success, false, 'A late file read cannot write through an old account callback');
  assert.equal(stale.addMemo(memo('foreign')), false);
  const limitApp = provider(); let limited = await limitApp.ready();
  for (let i = 0; i < limited.maxLimit - 1; i++) assert(limited.addMemo(memo('limit-' + i)));
  limited.loadRecommendedPresets(); limited = limitApp.render();
  assert.equal(limited.memos.length, limited.maxLimit, 'Preset loading respects the same save limit');
  assert.equal(limited.importDataFromJson(backup([memo('overflow')])).success, false);
  console.log('PASS: queued/strict React saves, durable success, exactly-once cloud writes, storage failure retention, validated non-destructive backup import, rollback, account isolation and preset/import limits.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
