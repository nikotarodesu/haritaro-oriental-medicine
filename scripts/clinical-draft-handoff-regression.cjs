/* eslint-disable @typescript-eslint/no-require-imports -- Run real notes/interview handlers with isolated owner-scoped storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const plain = value => JSON.parse(JSON.stringify(value));
let checks = 0;
function check(name, action) { try { action(); checks++; } catch (error) { error.message = name + ': ' + error.message; throw error; } }
function nodes(node, list = []) { if (Array.isArray(node)) node.forEach(child => nodes(child, list)); else if (node && typeof node === 'object') { list.push(node); nodes(node.props?.children, list); } return list; }
function text(node) { if (Array.isArray(node)) return node.map(text).join(''); if (typeof node === 'string' || typeof node === 'number') return String(node); return node && typeof node === 'object' ? text(node.props?.children) : ''; }
function environment() {
  const values = new Map([['haritaro_clinical_active_owner_v1', 'guest']]);
  const shared = { values, notes: [], owner: 'guest', failSession: false, failLocal: false, failMemo: false, confirms: true, saved: [], alerts: [], fileReads: [], imports: [] };
  const sessionStorage = { getItem: key => values.get(key) ?? null, setItem(key, value) { if (shared.failSession) throw Error('blocked'); values.set(key, value); }, removeItem(key) { if (shared.failSession) throw Error('blocked'); values.delete(key); } };
  const browser = { location: { search: '', pathname: '/notes', hash: '' }, history: { replaceState() {}, pushState() {} }, confirm: () => shared.confirms, alert: value => shared.alerts.push(value), scrollTo() {}, pageYOffset: 0 };
  const load = createDataLoader({ Intl, sessionStorage, window: browser });
  return { ...shared, shared, sessionStorage, browser, load };
}
const handoff = (patch = {}) => ({ sourceTool: '対面問診メモ', patientIdentifier: 'TEST-301', visitDate: '2026-10-18', chiefComplaint: '動作で変わる痛み', treatmentPlan: '  問診から引き継いだ本文。\n再確認する。  ', ...patch });
function hookHost() {
  const slots = [], effects = []; let cursor = 0;
  const changed = (old, deps) => !old || !deps || old.length !== deps.length || deps.some((value, index) => !Object.is(value, old[index]));
  const hooks = { ...React,
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[index].value, value => { slots[index].value = typeof value === 'function' ? value(slots[index].value) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { value: compute(), deps }; return slots[index].value; },
    useCallback(callback, deps) { return hooks.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { const previous = slots[index]; slots[index] = { deps }; effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); }); } },
  };
  return { hooks, render(component, props) { cursor = 0; const result = component(props); while (effects.length) effects.shift()(); return result; } };
}
function client(kind, env) {
  const { shared, sessionStorage, browser, load } = env;
  const timers = new Map(), pushes = []; let timerId = 0, tree;
  const host = hookHost(), exports = {};
  const context = { memos: [], clipCount: 0, maxLimit: 100, patientNotes: shared.notes, patientNoteCount: shared.notes.length, maxPatientNoteLimit: 100, isPatientNoteLimitReached: false, isReady: true, clinicalStorageOwner: shared.owner, syncStatus: 'local', removeMemo() {}, updatePersonalNote() {}, loadRecommendedPresets() {}, removePatientNote() {}, addMemo: () => !shared.failMemo, importDataFromJson: value => { shared.imports.push(value); return { success: true }; }, exportAllDataAsJson: () => '{}', exportAllDataAsCsv: () => '', triggerSync: async () => {},
    saveWorkspaceNote(fields, id) {
      const result = load('src/utils/clinicalNoteSave').persistClinicalNote(shared.notes, fields, id, 100, notes => { if (shared.failLocal) throw Error('quota'); shared.notes = plain(notes); shared.saved.push(plain(notes)); });
      return result.result;
    },
  };
  const filename = kind === 'notes' ? 'src/app/notes/page.tsx' : 'src/components/diagnosis/DiagnosisClient.tsx';
  const file = path.join(root, filename);
  let code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  if (kind === 'notes') code += '\nexports.TestClinicalNotesPage = ClinicalNotesPage;';
  const Empty = () => null;
  vm.runInNewContext(code, { exports, Intl, Date, Math, URLSearchParams, window: browser, sessionStorage, document: { title: '', getElementById: () => null }, navigator: { clipboard: { writeText: async () => {} } }, alert: browser.alert,
    setTimeout(callback, delay = 0) { timers.set(++timerId, { callback, delay }); return timerId; }, clearTimeout(id) { timers.delete(id); },
    FileReader: class { readAsText() { shared.fileReads.push(this); } },
    require: id => {
      if (id === 'react') return host.hooks;
      if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }), useSearchParams: () => new URLSearchParams() };
      if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => context };
      if (id === '@/contexts/AuthContext') return { useAuth: () => ({ isPremium: false, isAuthenticated: shared.owner !== 'guest' }) };
      if (id === '@/hooks/useModalDialog') return { useModalDialog() {} };
      if (id === '@/utils/analytics') return { trackEvent() {} };
      if (id === 'next/dynamic') return () => Empty;
      if (id === 'next/link' || id.startsWith('@/components/') || id === './NotesStorageSupport') return Empty;
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    },
  }, { filename: file });
  const api = { pushes,
    render() { context.patientNotes = shared.notes; context.patientNoteCount = shared.notes.length; context.clinicalStorageOwner = shared.owner; tree = host.render(kind === 'notes' ? exports.TestClinicalNotesPage : exports.default, { initialTab: 'clinical', relatedArticles: [] }); return tree; },
    flush() { const pending = [...timers]; for (const [id, item] of pending) { timers.delete(id); item.callback(); } api.render(); },
    tree: () => tree,
    button(label) { const found = nodes(tree).find(node => node.type === 'button' && text(node) === label); assert(found, 'Button: ' + label); return found; },
    click(label) { const button = api.button(label); assert(!button.props.disabled); button.props.onClick(); api.render(); },
    field(name) { const field = nodes(tree).find(node => ['input', 'textarea', 'select'].includes(node.type) && node.props.name === name); assert(field, 'Field: ' + name); return field; },
    change(name, value) { api.field(name).props.onChange({ target: { value } }); api.render(); },
    save() { const form = nodes(tree).find(node => node.type === 'form' && node.props.onSubmit); assert(form); form.props.onSubmit({ preventDefault() {} }); api.render(); },
    setOwner(owner) { shared.owner = owner; sessionStorage.setItem('haritaro_clinical_active_owner_v1', owner); api.render(); api.flush(); },
    note: () => shared.notes[0],
  };
  api.render(); api.flush(); return api;
}
check('failed custom prescription saves retain input and the open form until successful retry', () => {
  const env = environment(), notes = client('notes', env);
  const tab = nodes(notes.tree()).find(node => node.type === 'button' && text(node).startsWith('配穴集'));
  assert(tab); tab.props.onClick(); notes.render(); notes.click('自作の配穴を追加');
  notes.change('customStockTitle', '検証用配穴'); notes.change('customStockPoints', '合谷、太衝'); notes.change('customStockSummary', '保持する入力');
  const submit = () => { const form = nodes(notes.tree()).find(node => node.type === 'form'); assert(form); form.props.onSubmit({ preventDefault() {} }); notes.render(); };
  env.shared.failMemo = true; submit();
  assert.equal(notes.field('customStockTitle').props.value, '検証用配穴');
  assert.equal(notes.field('customStockSummary').props.value, '保持する入力');
  assert(nodes(notes.tree()).some(node => node.props?.role === 'alert' && text(node).includes('保存できませんでした')));
  env.shared.failMemo = false; submit();
  assert(!nodes(notes.tree()).some(node => node.props?.name === 'customStockTitle'), 'Success closes the saved form');
});
check('a file selected under a previous owner is not imported after an account switch', () => {
  const env = environment(), notes = client('notes', env);
  const support = nodes(notes.tree()).find(node => typeof node.props?.onFileUpload === 'function'); assert(support);
  support.props.onFileUpload({ target: { files: [{}], value: 'backup.json' } });
  assert.equal(env.shared.fileReads.length, 1);
  notes.setOwner('account-B');
  env.shared.fileReads[0].onload({ target: { result: '{}' } });
  assert.equal(env.shared.imports.length, 0);
  assert(env.shared.alerts.some(message => message.includes('アカウントが切り替わった')));
});
check('handoffs are non-destructive, owner-scoped and an older token cannot consume a newer handoff', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote');
  assert(drafts.saveDraftPatientNote(handoff(), 'guest'));
  const old = drafts.loadDraftPatientNote('guest'), token = drafts.draftPatientNoteToken(old);
  assert.equal(drafts.loadDraftPatientNote('guest').treatmentPlan, old.treatmentPlan);
  assert(drafts.saveDraftPatientNote(handoff({ chiefComplaint: '新しい引き継ぎ' }), 'guest'));
  assert(drafts.clearDraftPatientNote(token, 'guest'));
  assert.equal(drafts.loadDraftPatientNote('guest').chiefComplaint, '新しい引き継ぎ');
  env.sessionStorage.setItem('haritaro_clinical_active_owner_v1', 'A');
  assert.equal(drafts.loadDraftPatientNote('A'), null);
  assert.equal(drafts.saveDraftPatientNote(handoff(), 'guest'), false);
  assert.equal(drafts.clearDraftPatientNote(token, 'guest'), false);
  env.sessionStorage.setItem('haritaro_clinical_active_owner_v1', 'guest');
  assert.equal(drafts.loadDraftPatientNote('guest').chiefComplaint, '新しい引き継ぎ');
  env.shared.failSession = true; assert.equal(drafts.saveDraftPatientNote(handoff(), 'guest'), false);
});
check('cleanup never deletes a newer editor or reports success when a storage read fails', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote'), editors = env.load('src/utils/clinicalNoteEditor');
  const editor = { version: 1, id: 'newer-editor', owner: 'guest', fields: editors.emptyClinicalNoteEditor() };
  assert(editors.writeClinicalNoteEditor(editor, 'guest'));
  drafts.saveDraftPatientNote(handoff(), 'guest'); const token = drafts.draftPatientNoteToken(drafts.loadDraftPatientNote('guest'));
  const get = env.sessionStorage.getItem;
  env.sessionStorage.getItem = key => { if (key === 'haritaro_clinical_note_editor_v1' || key === 'haritaro_draft_patient_note') throw Error('read unavailable'); return get(key); };
  assert.equal(editors.clearClinicalNoteEditor('older-editor', 'guest'), false);
  assert.equal(drafts.clearDraftPatientNote(token, 'guest'), false);
  env.sessionStorage.getItem = get;
  assert.equal(editors.readClinicalNoteEditor('guest').id, 'newer-editor'); assert(drafts.loadDraftPatientNote('guest'));
  assert.equal(editors.clearClinicalNoteEditor('older-editor', 'guest'), false);
});
check('notes retain edited imports across a reload, a close/reopen and failed saves until durable success', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote'), editors = env.load('src/utils/clinicalNoteEditor');
  drafts.saveDraftPatientNote(handoff(), 'guest');
  let notes = client('notes', env);
  const edited = '  編集した引き継ぎ本文。\n条件を追加で確認。  ';
  notes.change('treatmentPlan', edited); notes.change('chiefComplaint', '修正した主訴');
  assert.equal(editors.readClinicalNoteEditor('guest').fields.treatmentPlan, edited);
  assert(drafts.loadDraftPatientNote('guest'), 'Receiving did not delete the incoming handoff');
  notes = client('notes', env);
  assert.equal(notes.field('treatmentPlan').props.value, edited); assert.equal(notes.field('chiefComplaint').props.value, '修正した主訴');
  notes.click('閉じて後で続ける'); assert(notes.button('下書きを再開する')); notes.click('下書きを再開する');
  env.shared.failLocal = true; notes.save();
  assert.equal(env.shared.notes.length, 0); assert(drafts.loadDraftPatientNote('guest')); assert(editors.readClinicalNoteEditor('guest'));
  assert.equal(notes.field('treatmentPlan').props.value, edited);
  env.shared.failLocal = false; notes.save();
  assert.equal(env.shared.notes.length, 1); assert.equal(notes.note().treatmentPlan, edited.trim());
  assert.equal(drafts.loadDraftPatientNote('guest'), null); assert.equal(editors.readClinicalNoteEditor('guest'), null);
});
check('saving an older active editor leaves a newly arrived handoff available to open separately', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote');
  drafts.saveDraftPatientNote(handoff(), 'guest'); let notes = client('notes', env);
  notes.change('chiefComplaint', '古い下書きへの編集');
  drafts.saveDraftPatientNote(handoff({ chiefComplaint: '後から届いた主訴' }), 'guest');
  notes = client('notes', env);
  assert.equal(notes.field('chiefComplaint').props.value, '古い下書きへの編集');
  notes.save(); assert.equal(notes.note().chiefComplaint, '古い下書きへの編集');
  assert.equal(drafts.loadDraftPatientNote('guest').chiefComplaint, '後から届いた主訴');
  notes.click('新しい引き継ぎを開く');
  assert.equal(notes.field('chiefComplaint').props.value, '後から届いた主訴');
  notes.click('この下書きを破棄');
  assert.equal(drafts.loadDraftPatientNote('guest'), null);
});
check('stale editor input/save/discard handlers cannot cross an account change', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote'), editors = env.load('src/utils/clinicalNoteEditor');
  drafts.saveDraftPatientNote(handoff(), 'guest'); const notes = client('notes', env);
  const staleInput = notes.field('chiefComplaint').props.onChange;
  const staleSave = nodes(notes.tree()).find(node => node.type === 'form').props.onSubmit;
  const staleDiscard = notes.button('この下書きを破棄').props.onClick;
  notes.setOwner('A');
  drafts.saveDraftPatientNote(handoff({ patientIdentifier: 'A-only', chiefComplaint: 'A専用の記録' }), 'A');
  const accountNotes = client('notes', env); const before = plain(editors.readClinicalNoteEditor('A'));
  staleInput({ target: { value: 'Guest old callback' } }); staleSave({ preventDefault() {} }); staleDiscard(); notes.render();
  assert.deepEqual(plain(editors.readClinicalNoteEditor('A')), before); assert.equal(env.shared.notes.length, 0);
  assert.equal(accountNotes.field('chiefComplaint').props.value, 'A専用の記録');
  notes.setOwner('guest'); assert.equal(notes.field('chiefComplaint').props.value, '動作で変わる痛み');
});
check('direct note creation and editing are recoverable and keep the original note ID after reload', () => {
  const env = environment(); let notes = client('notes', env);
  notes.click('臨床ノートを新規作成'); notes.change('patientIdentifier', 'DIRECT-01'); notes.change('chiefComplaint', '直接入力した主訴');
  notes = client('notes', env); assert.equal(notes.field('chiefComplaint').props.value, '直接入力した主訴'); notes.save();
  const id = notes.note().id;
  const open = nodes(notes.tree()).find(node => node.type === 'button' && node.props.className === 'notes-open-record'); assert(open); open.props.onClick(); notes.render();
  notes.change('chiefComplaint', '既存記録の再編集'); notes = client('notes', env); notes.save();
  assert.equal(env.shared.notes.length, 1); assert.equal(notes.note().id, id); assert.equal(notes.note().chiefComplaint, '既存記録の再編集');
});
check('an editor whose original note was deleted requires confirmation to preserve it as a new record', () => {
  const env = environment(); let notes = client('notes', env);
  notes.click('臨床ノートを新規作成'); notes.change('patientIdentifier', 'RECOVER-01'); notes.change('chiefComplaint', '削除後も保持する主訴'); notes.save();
  const deletedId = notes.note().id;
  const open = nodes(notes.tree()).find(node => node.type === 'button' && node.props.className === 'notes-open-record'); open.props.onClick(); notes.render();
  notes.change('treatmentPlan', '  破棄しない編集本文。  '); notes.click('閉じて後で続ける');
  env.shared.notes = []; notes = client('notes', env);
  assert.equal(notes.field('treatmentPlan').props.value, '  破棄しない編集本文。  ');
  assert(text(notes.tree()).includes('元の保存済み記録が見つかりません'));
  env.shared.confirms = false; notes.click('新しい臨床ノートとして保存');
  assert.equal(env.shared.notes.length, 0); assert.equal(notes.field('treatmentPlan').props.value, '  破棄しない編集本文。  ');
  env.shared.confirms = true; notes.click('新しい臨床ノートとして保存');
  assert.equal(env.shared.notes.length, 1); assert.notEqual(notes.note().id, deletedId); assert.equal(notes.note().chiefComplaint, '削除後も保持する主訴');
});
check('interview answers reload and reflect only their memo into the matching active encounter', () => {
  const env = environment(), encounters = env.load('src/utils/clinicalEncounter');
  const original = { ...encounters.emptyClinicalEncounter(), savedNoteId: 'pn_keep', patientIdentifier: 'TEST-301', chiefComplaint: '既存の主訴', candidateIds: ['liver-qi'], principle: '手書きの治法', points: [{ code: 'LI4', role: 'branch', reason: '保持する理由', alternative: '保持する条件' }] };
  assert(encounters.writeClinicalEncounter(original));
  let interview = client('interview', env); assert.equal(interview.field('patientIdentifier').props.value, 'TEST-301');
  interview.click('当てはまる');
  let note = nodes(interview.tree()).find(node => node.type === 'input' && node.props.placeholder?.startsWith('臨床メモ')); assert(note); note.props.onChange({ target: { value: '  発症時期を確認した。  ' } }); interview.render();
  interview = client('interview', env);
  note = nodes(interview.tree()).find(node => node.type === 'input' && node.props.placeholder?.startsWith('臨床メモ')); assert.equal(note.props.value, '  発症時期を確認した。  ');
  interview.click('問診結果をまとめる'); interview.flush(); interview.click('この記録へ反映して戻る');
  assert.equal(interview.pushes.at(-1), '/clinical/workspace');
  const result = encounters.readClinicalEncounter().encounter;
  assert.equal(result.patientIdentifier, original.patientIdentifier); assert.equal(result.chiefComplaint, original.chiefComplaint);
  assert.equal(result.savedNoteId, original.savedNoteId); assert.equal(result.principle, original.principle); assert.deepEqual(plain(result.points), original.points); assert.deepEqual(plain(result.candidateIds), original.candidateIds);
  assert(result.interviewMemo.includes('発症時期を確認した。') && result.interviewMemo.includes('確認して該当なし') === false);
  assert.equal(result.step, 1); assert(encounters.clinicalEncounterNote(result, []).treatmentPlan.includes('【対面問診メモ】'));
});
check('interview transfer blocks a different ID or failed write and never navigates on failure', () => {
  const env = environment(), encounters = env.load('src/utils/clinicalEncounter');
  encounters.writeClinicalEncounter({ ...encounters.emptyClinicalEncounter(), patientIdentifier: 'TARGET', chiefComplaint: '保持する主訴' });
  const interview = client('interview', env); interview.change('patientIdentifier', 'OTHER'); interview.click('当てはまる'); interview.click('問診結果をまとめる'); interview.flush();
  interview.click('この記録へ反映して戻る'); assert.equal(interview.pushes.length, 0); assert(text(interview.tree()).includes('匿名IDが異なります'));
  interview.change('patientIdentifier', 'TARGET'); env.shared.failSession = true; interview.click('この記録へ反映して戻る');
  assert.equal(interview.pushes.length, 0); assert.equal(encounters.readClinicalEncounter().encounter.interviewMemo, undefined);
  assert(text(interview.tree()).includes('問診入力は保持しています'));
});
check('standalone interview handoff navigates only after a retained draft write succeeds', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote'); const interview = client('interview', env);
  interview.change('patientIdentifier', 'STANDALONE'); interview.click('当てはまる'); interview.click('問診結果をまとめる'); interview.flush();
  env.shared.failSession = true; interview.click('臨床ノートに残す'); assert.equal(interview.pushes.length, 0);
  env.shared.failSession = false; interview.click('臨床ノートに残す'); assert.equal(interview.pushes.at(-1), '/notes'); assert.equal(drafts.loadDraftPatientNote('guest').patientIdentifier, 'STANDALONE');
});
check('saved display markers survive navigation and reload while edits and legacy records remain distinguishable', () => {
  const env = environment(), encounters = env.load('src/utils/clinicalEncounter');
  let encounter = { ...encounters.emptyClinicalEncounter(), savedNoteId: 'pn_saved', patientIdentifier: 'SAVED-01', chiefComplaint: '保存した主訴' };
  assert.equal(encounters.clinicalEncounterSaveState(encounter), 'unverified');
  encounter = { ...encounter, savedAt: 12345, savedFingerprint: encounters.clinicalEncounterFingerprint(encounter) };
  assert.equal(encounters.clinicalEncounterSaveState(encounter), 'saved');
  assert.equal(encounters.clinicalEncounterSaveState({ ...encounter, step: 4 }), 'saved');
  assert(encounters.writeClinicalEncounter(encounter)); assert.equal(encounters.clinicalEncounterSaveState(encounters.readClinicalEncounter().encounter), 'saved');
  assert.equal(encounters.clinicalEncounterSaveState({ ...encounter, interviewMemo: '新しい問診メモ' }), 'changed');
  assert.equal(encounters.clinicalEncounterSaveState({ ...encounter, chiefComplaint: '修正' }), 'changed');
});
console.log(`Clinical draft handoff passed: ${checks} flows for non-consuming imports, edited reload recovery, same-ID updates, exact-token cleanup, account fences, retained interview input, matching encounter reflection and saved-state markers.`);
