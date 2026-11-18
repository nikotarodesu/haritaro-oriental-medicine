/* eslint-disable @typescript-eslint/no-require-imports -- Run real interview handlers with isolated session storage. */
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
  const shared = { failSession: false, confirms: true, scrolls: [] };
  const sessionStorage = { getItem: key => values.get(key) ?? null, setItem(key, value) { if (shared.failSession) throw Error('blocked'); values.set(key, value); }, removeItem(key) { if (shared.failSession) throw Error('blocked'); values.delete(key); } };
  const browser = { location: { search: '', pathname: '/diagnosis', hash: '' }, history: { replaceState() {}, pushState() {} }, confirm: () => shared.confirms, scrollTo() {}, matchMedia: () => ({ matches: false }), pageYOffset: 0 };
  const load = createDataLoader({ Intl, sessionStorage, window: browser });
  return { shared, sessionStorage, browser, load };
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
function client(env) {
  const { shared, sessionStorage, browser, load } = env;
  const timers = new Map(), pushes = []; let timerId = 0, tree;
  const host = hookHost(), exports = {};
  const filename = 'src/components/diagnosis/DiagnosisClient.tsx';
  const file = path.join(root, filename);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const Empty = () => null;
  const boardHost = hookHost(), boardExports = {};
  {
    const boardFile = path.join(root, 'src/components/diagnosis/ClinicalInterviewBoard.tsx');
    const boardCode = ts.transpileModule(fs.readFileSync(boardFile, 'utf8'), { fileName: boardFile, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
    vm.runInNewContext(boardCode, { exports: boardExports, window: browser, require: id => {
      if (id === 'react') return boardHost.hooks;
      if (id.endsWith('.module.css')) return { __esModule: true, default: new Proxy({}, { get: (_, name) => name }) };
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    } }, { filename: boardFile });
  }
  const InterviewBoard = props => boardHost.render(boardExports.default, props);
  function expandInterviewBoard(node) {
    if (Array.isArray(node)) return node.map(expandInterviewBoard);
    if (!node || typeof node !== 'object') return node;
    if (node.type === InterviewBoard) return InterviewBoard(node.props);
    return { ...node, props: { ...node.props, children: expandInterviewBoard(node.props?.children) } };
  }
  vm.runInNewContext(code, { exports, Intl, Date, Math, URLSearchParams, window: browser, sessionStorage, document: { title: '', getElementById: () => null }, navigator: { clipboard: { writeText: async () => {} } },
    setTimeout(callback, delay = 0) { timers.set(++timerId, { callback, delay }); return timerId; }, clearTimeout(id) { timers.delete(id); },
    require: id => {
      if (id === 'react') return host.hooks;
      if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }), useSearchParams: () => new URLSearchParams() };
      if (id === '@/hooks/useModalDialog') return { useModalDialog() {} };
      if (id === '@/utils/analytics') return { trackEvent() {} };
      if (id === 'next/dynamic') return () => Empty;
      if (id === './ClinicalInterviewBoard') return { __esModule: true, default: InterviewBoard };
      if (id === 'next/link' || id.startsWith('@/components/')) return Empty;
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    },
  }, { filename: file });
  const api = { pushes,
    render() {
      tree = expandInterviewBoard(host.render(exports.default, { initialTab: 'clinical', relatedArticles: [], studyLinks: {} }));
      const heading = nodes(tree).find(node => node.props?.id === 'clinical-interview-heading');
      if (heading?.props.ref) heading.props.ref.current = { focus() {}, scrollIntoView(options) { shared.scrolls.push(options); } };
      return tree;
    },
    flush() { const pending = [...timers]; for (const [id, item] of pending) { timers.delete(id); item.callback(); } api.render(); },
    tree: () => tree,
    button(label) { const found = nodes(tree).find(node => node.type === 'button' && (text(node) === label || node.props['aria-label'] === label)); assert(found, 'Button: ' + label); return found; },
    click(label) { const button = api.button(label); assert(!button.props.disabled); button.props.onClick(); api.render(); },
    field(name) { const field = nodes(tree).find(node => ['input', 'textarea', 'select'].includes(node.type) && node.props.name === name); assert(field, 'Field: ' + name); return field; },
    change(name, value) { api.field(name).props.onChange({ target: { value } }); api.render(); },
  };
  api.render(); api.flush(); return api;
}
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
check('interview answers reload and reflect only their memo into the matching active encounter', () => {
  const env = environment(), encounters = env.load('src/utils/clinicalEncounter');
  const original = { ...encounters.emptyClinicalEncounter(), savedNoteId: 'pn_keep', patientIdentifier: 'TEST-301', chiefComplaint: '既存の主訴', candidateIds: ['liver-qi'], principle: '手書きの治法', points: [{ code: 'LI4', role: 'branch', reason: '保持する理由', alternative: '保持する条件' }] };
  assert(encounters.writeClinicalEncounter(original));
  let interview = client(env); assert.equal(interview.field('patientIdentifier').props.value, 'TEST-301');
  interview.click('当てはまる');
  let note = nodes(interview.tree()).find(node => node.type === 'textarea' && node.props.id === 'clinical-interview-note'); assert(note); note.props.onChange({ target: { value: '  発症時期を確認した。  ' } }); interview.render();
  interview = client(env);
  note = nodes(interview.tree()).find(node => node.type === 'textarea' && node.props.id === 'clinical-interview-note'); assert.equal(note.props.value, '  発症時期を確認した。  ');
  interview.click('問診結果をまとめる'); interview.flush(); interview.click('反映して作業画面へ戻る');
  assert.equal(interview.pushes.at(-1), '/clinical/workspace');
  const result = encounters.readClinicalEncounter().encounter;
  assert.equal(result.patientIdentifier, original.patientIdentifier); assert.equal(result.chiefComplaint, original.chiefComplaint);
  assert.equal(result.savedNoteId, original.savedNoteId); assert.equal(result.principle, original.principle); assert.deepEqual(plain(result.points), original.points); assert.deepEqual(plain(result.candidateIds), original.candidateIds);
  assert(result.interviewMemo.includes('発症時期を確認した。') && result.interviewMemo.includes('確認して該当なし') === false);
  assert.equal(result.step, 1); assert(encounters.clinicalEncounterNote(result, []).treatmentPlan.includes('【対面問診メモ】'));
});
check('topic navigation retains answers and notes while filtering never advances after an answer', () => {
  const env = environment(), drafts = env.load('src/utils/clinicalInterview');
  const interview = client(env);
  const topic = id => nodes(interview.tree()).find(node => node.type === 'button' && node.key === String(id) && node.props['aria-controls']);
  const selectedHeading = () => text(nodes(interview.tree()).find(node => node.props?.id === 'clinical-interview-heading'));
  const groups = [[1, 4, 5], [2, 7, 8], [3, 9, 10], [6, 11, 12]];
  const openGroup = index => { const tab = nodes(interview.tree()).find(node => node.props?.id === `interview-topic-${index}`); assert(tab); tab.props.onClick(); interview.render(); };
  const select = id => { openGroup(groups.findIndex(ids => ids.includes(id))); const button = topic(id); assert(button); button.props.onClick(); interview.render(); };
  for (const [index, ids] of groups.entries()) {
    openGroup(index);
    assert.deepEqual(nodes(interview.tree()).filter(node => node.type === 'button' && node.props['aria-controls'] === 'clinical-interview-detail').map(node => Number(node.key)), ids);
    assert.equal(nodes(interview.tree()).find(node => node.props?.id === `interview-topic-${index}`).props['aria-selected'], true);
  }
  const note = () => nodes(interview.tree()).find(node => node.props?.id === 'clinical-interview-note');
  select(12); assert.equal(env.shared.scrolls.at(-1).block, 'nearest', 'Wide screens reveal an offscreen detail heading without unnecessary full alignment'); interview.click('該当なし');
  note().props.onChange({ target: { value: '最後の項目へ先に記録したメモ' } }); interview.render();
  env.browser.matchMedia = () => ({ matches: true });
  select(1); assert.equal(env.shared.scrolls.at(-1).block, 'start', 'Stacked screens move directly from the topic grid to the selected detail');
  env.browser.matchMedia = () => ({ matches: false });
  interview.click('当てはまる'); select(12);
  assert.equal(note().props.value, '最後の項目へ先に記録したメモ');
  assert(interview.button('該当なし').props['aria-pressed']);
  const filter = nodes(interview.tree()).find(node => node.type === 'button' && text(node).startsWith('未確認のみ'));
  filter.props.onClick(); interview.render(); assert.equal(selectedHeading(), '手足・腰の冷え');
  assert.equal(topic(12), undefined, 'Answered questions are hidden only in the active topic');
  openGroup(1); assert.equal(selectedHeading(), 'ため息・つかえ感');
  interview.click('不明');
  assert.equal(selectedHeading(), 'ため息・つかえ感', 'Answering a filtered item does not discard its open detail');
  assert.equal(topic(2), undefined);
  interview.click('未確認'); assert(topic(2), 'An explicitly unconfirmed answer returns to the filter');
  interview.click('次の未確認へ'); assert.equal(selectedHeading(), '肌・髪・爪');
  assert.equal(nodes(interview.tree()).find(node => node.props?.id === 'interview-topic-2').props['aria-selected'], true, 'Next unconfirmed opens the matching topic');
  const retained = drafts.readClinicalInterview('guest');
  assert.equal(retained.statuses[12], 'not_applicable'); assert.equal(retained.statuses[1], 'applicable'); assert.equal(retained.statuses[2], 'unconfirmed');
  assert.equal(retained.notes[12], '最後の項目へ先に記録したメモ');
});
check('interview uses the guest key even when an old tab has a former account owner', () => {
  const env = environment(), drafts = env.load('src/utils/clinicalInterview');
  env.sessionStorage.setItem('haritaro_clinical_active_owner_v1', 'former');
  assert(drafts.writeClinicalInterview({ patientIdentifier: 'FORMER-ONLY', statuses: {}, notes: {} }, 'former'));
  const interview = client(env);
  assert.equal(interview.field('patientIdentifier').props.value, '');
  interview.change('patientIdentifier', 'GUEST-ONLY');
  interview.click('不明');
  assert.equal(drafts.readClinicalInterview('guest').patientIdentifier, 'GUEST-ONLY');
  assert.equal(drafts.readClinicalInterview('former').patientIdentifier, 'FORMER-ONLY');
  interview.click('問診を終了・新しい問診を開始');
  assert.equal(drafts.readClinicalInterview('guest'), null);
  assert.equal(drafts.readClinicalInterview('former').patientIdentifier, 'FORMER-ONLY');
});
check('a note-only interview cannot be cleared without the existing discard confirmation', () => {
  const env = environment(), drafts = env.load('src/utils/clinicalInterview');
  const interview = client(env);
  const note = nodes(interview.tree()).find(node => node.props?.id === 'clinical-interview-note');
  note.props.onChange({ target: { value: '回答前に聞き取ったメモ' } }); interview.render();
  env.shared.confirms = false; interview.click('問診を終了・新しい問診を開始');
  assert.equal(drafts.readClinicalInterview('guest').notes[1], '回答前に聞き取ったメモ');
  env.shared.confirms = true; interview.click('問診を終了・新しい問診を開始');
  assert.equal(drafts.readClinicalInterview('guest'), null);
});
check('interview transfer blocks a different ID or failed write and never navigates on failure', () => {
  const env = environment(), encounters = env.load('src/utils/clinicalEncounter');
  encounters.writeClinicalEncounter({ ...encounters.emptyClinicalEncounter(), patientIdentifier: 'TARGET', chiefComplaint: '保持する主訴' });
  const interview = client(env); interview.change('patientIdentifier', 'OTHER'); interview.click('当てはまる'); interview.click('問診結果をまとめる'); interview.flush();
  interview.click('反映して作業画面へ戻る'); assert.equal(interview.pushes.length, 0); assert(text(interview.tree()).includes('匿名IDが異なります'));
  interview.change('patientIdentifier', 'TARGET'); env.shared.failSession = true; interview.click('反映して作業画面へ戻る');
  assert.equal(interview.pushes.length, 0); assert.equal(encounters.readClinicalEncounter().encounter.interviewMemo, undefined);
  assert(text(interview.tree()).includes('問診入力は保持しています'));
});
check('a standalone interview has no note creation action or navigation', () => {
  const env = environment(), drafts = env.load('src/utils/draftNote');
  const interview = client(env);
  interview.change('patientIdentifier', 'STANDALONE');
  interview.click('当てはまる'); interview.click('問診結果をまとめる'); interview.flush();
  assert.equal(interview.pushes.length, 0);
  assert(!text(interview.tree()).includes('臨床ノートに残す'));
  assert(!text(interview.tree()).includes('反映して作業画面へ戻る'));
  assert.equal(drafts.loadDraftPatientNote('guest'), null);
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
console.log(`Clinical draft handoff passed: ${checks} flows for legacy draft isolation, retained interview input, matching encounter reflection, retired note creation and saved-state marker compatibility.`);
