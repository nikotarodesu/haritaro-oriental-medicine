/* eslint-disable @typescript-eslint/no-require-imports -- Run real clinical providers and input handlers with isolated browser storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader({ Intl });
const encounters = load('src/utils/clinicalEncounter');
const { persistClinicalNote } = load('src/utils/clinicalNoteSave');
const { CLINICAL_PATTERNS } = load('src/data/clinicalWorkflow');
const { clinicalCandidateDifferential } = load('src/utils/clinicalCandidateDifferential');
const CandidatePicker = () => null;
const CandidateDifferential = () => null;
const { SUBSCRIPTION_CONFIG } = load('src/config/subscription');
const storageScopes = load('src/utils/clinicalStorage');
const key = storageScopes.clinicalStorageKeys('guest').notes;
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
const plain = value => JSON.parse(JSON.stringify(value));
const failures = [];
let checks = 0;
async function check(name, action) { try { await action(); checks++; } catch (error) { failures.push(name + ': ' + error.stack); } }
function sampleEncounter(patch = {}) {
  return { ...encounters.emptyClinicalEncounter(), patientIdentifier: 'TEST-042', chiefComplaint: '首の回旋時の痛み', visitDate: '2026-10-18', safety: 'reviewed', observations: { fatigue: 'present', cold: 'absent' }, candidateIds: ['liver-qi'], rationale: '所見を比較した学習記録', principle: '理気という候補', points: [{ code: 'LI4', role: 'branch', reason: '比較した根拠', alternative: '再評価して変更' }], metric: '首を右へ回すときの痛みNRS', before: '6', after: '3', functionMemo: '右への振り向き', plan: '本人と目標を相談', reaction: '直後の報告', nextAction: '翌日以降の変化を確認', ...patch };
}
function sampleNote(id = 'pn_existing', patch = {}) {
  return { ...encounters.clinicalEncounterNote(sampleEncounter(), ['合谷']), id, createdAt: 1, updatedAt: 2, ...patch };
}
function nodes(node, list = []) {
  if (Array.isArray(node)) node.forEach(child => nodes(child, list));
  else if (node && typeof node === 'object') { list.push(node); nodes(node.props?.children, list); }
  return list;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node && typeof node === 'object' ? text(node.props?.children) : '';
}
function compile(relative) {
  const file = path.join(root, relative);
  return { file, code: ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText };
}
const providerSource = compile('src/contexts/ClinicalMemoContext.tsx');
const workspaceSource = compile('src/components/clinical/ClinicalWorkspace.tsx');
function hookHost() {
  const slots = [], effects = [];
  let cursor = 0;
  const changed = (old, deps) => !old || !deps || old.length !== deps.length || deps.some((value, index) => !Object.is(value, old[index]));
  const hooks = { ...React,
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[index].value, value => { slots[index].value = typeof value === 'function' ? value(slots[index].value) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { value: compute(), deps }; return slots[index].value; },
    useCallback(callback, deps) { return hooks.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { const previous = slots[index]; slots[index] = { deps }; effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); }); } },
  };
  return { hooks, render(component, props) { cursor = 0; const tree = component(props); while (effects.length) effects.shift()(); return tree; } };
}
function harness({ initialEncounter = sampleEncounter(), initialNotes = [], failLocal = false, failSession = false, mount = true, localEntries = [], initialLoading = false } = {}) {
  const localValues = new Map([[key, JSON.stringify(initialNotes)], ...localEntries]);
  const sessionValues = new Map(initialEncounter ? [[encounters.CLINICAL_ENCOUNTER_KEY, JSON.stringify(initialEncounter)]] : []);
  const flags = { failLocal, failSession, confirm: true };
  const writes = [], cloudWrites = [], bulkWrites = [], cloudAccounts = new Map(), pendingDownloads = new Map(), pendingUpserts = new Map(), frames = [], focused = [], scrolled = [], groups = new Map(), timers = new Map();
  const auth = { user: null, isPremium: false, isConfigured: false, isLoading: initialLoading };
  let timerId = 0, context, tree, cloudOk = true;
  function storage(values, kind) { return {
    getItem: id => values.get(id) ?? null,
    setItem(id, value) { if (flags[kind === 'local' ? 'failLocal' : 'failSession']) throw Error('storage unavailable'); values.set(id, value); writes.push({ kind, id, value }); },
    removeItem(id) { if (flags[kind === 'local' ? 'failLocal' : 'failSession']) throw Error('storage unavailable'); values.delete(id); },
  }; }
  const localStorage = storage(localValues, 'local'), sessionStorage = storage(sessionValues, 'session');
  const browser = { location: { search: '' }, confirm: () => flags.confirm };
  const localLoad = createDataLoader({ Intl, sessionStorage, localStorage, window: browser });
  const providerHost = hookHost(), workspaceHost = hookHost();
  const providerExports = {}, workspaceExports = {};
  const shared = { Intl, Date, Math, URL, URLSearchParams, localStorage, sessionStorage, window: browser,
    console: { ...console, error() {}, warn() {} },
    setTimeout(callback, delay = 0) { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimeout(id) { timers.delete(id); },
  };
  const accountData = owner => { if (!cloudAccounts.has(owner)) cloudAccounts.set(owner, { notes: [], memos: [] }); return cloudAccounts.get(owner); };
  const upsert = (items, item) => [plain(item), ...items.filter(previous => previous.id !== item.id)];
  const cloud = {
    upsertPatientNoteToSupabase: async (userId, note) => {
      cloudWrites.push({ userId, note: plain(note) });
      const ok = pendingUpserts.has(userId) ? await pendingUpserts.get(userId).promise : cloudOk;
      if (ok) accountData(userId).notes = upsert(accountData(userId).notes, note);
      return ok;
    },
    upsertClinicalMemoToSupabase: async () => true,
    deletePatientNoteFromSupabase: async () => true,
    deleteClinicalMemoFromSupabase: async () => true,
    fetchPatientNotesFromSupabase: async () => {
      const owner = auth.user?.id;
      return pendingDownloads.has(owner) ? pendingDownloads.get(owner).notes.promise : plain(accountData(owner).notes);
    },
    fetchClinicalMemosFromSupabase: async () => {
      const owner = auth.user?.id;
      return pendingDownloads.has(owner) ? pendingDownloads.get(owner).memos.promise : plain(accountData(owner).memos);
    },
    syncLocalDataToSupabase: async (userId, notes, memos) => {
      bulkWrites.push({ userId, notes: plain(notes), memos: plain(memos) });
      const account = accountData(userId);
      notes.forEach(note => { account.notes = upsert(account.notes, note); });
      memos.forEach(memo => { account.memos = upsert(account.memos, memo); });
      return { notesSynced: notes.length, memosSynced: memos.length };
    },
  };
  vm.runInNewContext(providerSource.code, { ...shared, exports: providerExports, require: id => {
    if (id === 'react') return providerHost.hooks;
    if (id === '@/contexts/AuthContext') return { useAuth: () => auth };
    if (id === '@/lib/supabase/lazyClinicalMemosDb') return cloud;
    if (id.startsWith('@/')) return localLoad('src/' + id.slice(2));
    return require(id);
  } }, { filename: providerSource.file });
  const document = { getElementById(id) {
    const input = nodes(tree).find(node => node.props?.id === id);
    assert(input, 'Requested focus target must exist in the rendered workspace: ' + id);
    return { focus: () => focused.push(id), scrollIntoView: () => scrolled.push(id), closest(selector) {
      assert.equal(selector, 'details');
      const group = nodes(tree).find(node => node.type === 'details' && nodes(node).includes(input));
      assert(group, 'The requested observation stays in its native disclosure');
      if (!groups.has(group.key)) groups.set(group.key, { open: Boolean(group.props.open) });
      return groups.get(group.key);
    } };
  } };
  vm.runInNewContext(workspaceSource.code, { ...shared, document, requestAnimationFrame: callback => { frames.push(callback); return frames.length; }, exports: workspaceExports, require: id => {
    if (id === 'react') return workspaceHost.hooks;
    if (id === 'next/link' || id === '@/components/design/PageIntro' || id === './ClinicalEvidenceKey') return () => null;
    if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => context };
    if (id === './ClinicalCandidatePicker') return CandidatePicker;
    if (id === './ClinicalCandidateDifferential') return CandidateDifferential;
    if (id.startsWith('@/')) return localLoad('src/' + id.slice(2));
    return require(id);
  } }, { filename: workspaceSource.file });
  const api = { flags, writes, cloudWrites, bulkWrites, cloudAccounts, focused, scrolled, groups, localValues, sessionValues,
    providerRender() { context = providerHost.render(providerExports.ClinicalMemoProvider, { children: null }).props.value; return context; },
    render() { api.providerRender(); tree = workspaceHost.render(workspaceExports.default); return tree; },
    flushTimers() { const pending = [...timers].filter(([, item]) => item.delay === 0); for (const [id, item] of pending) { timers.delete(id); item.callback(); } },
    flushFrames() { while (frames.length) frames.shift()(); },
    context: () => context,
    tree: () => tree,
    note: () => context.patientNotes[0],
    encounter: () => localLoad('src/utils/clinicalEncounter').readClinicalEncounter().encounter,
    button(label) { const found = nodes(tree).find(node => node.type === 'button' && text(node) === label); assert(found, 'Button ' + label); return found; },
    click(label) { const button = api.button(label); assert(!button.props.disabled, 'Enabled button: ' + label); button.props.onClick(); api.render(); },
    field(label) { const parent = nodes(tree).find(node => node.type === 'label' && text(node).startsWith(label)); assert(parent, 'Field label ' + label); const input = nodes(parent).find(node => ['input', 'select', 'textarea'].includes(node.type)); assert(input); return input; },
    change(label, value) { api.field(label).props.onChange({ target: { value } }); api.render(); },
    candidatePicker() { const picker = nodes(tree).find(node => node.type === CandidatePicker); assert(picker, 'Real workspace supplies a candidate picker'); return picker; },
    candidateDifferential() { const differential = nodes(tree).find(node => node.type === CandidateDifferential); assert(differential, 'Real workspace supplies the selected-candidate differential'); return differential; },
    chooseCandidates(ids) { api.candidatePicker().props.onChange(ids); api.render(); },
    principleButton(label, sectionClass = 'clinical-principle-suggestions') { const section = nodes(tree).find(node => node.props?.className === sectionClass); assert(section, 'Treatment section ' + sectionClass); const button = nodes(section).find(node => node.type === 'button' && ['＋', '追加済み', '上限'].some(state => text(node) === label + state)); assert(button, 'Treatment button ' + label); return button; },
    addPrinciple(label, sectionClass) { const button = api.principleButton(label, sectionClass); assert(!button.props.disabled, 'Treatment can be added: ' + label); button.props.onClick(); api.render(); },
    additionFeedback() { return nodes(tree).find(node => node.props?.role === 'status' && text(node).includes('入力欄へ「')); },
    hasUndo() { return nodes(tree).some(node => node.type === 'button' && text(node) === '直前の追加を戻す'); },
    review() { api.click('入力内容を確認'); },
    cloudResult(value) { cloudOk = value; },
    setAuth(owner, loading = false) { auth.user = owner ? { id: owner } : null; auth.isConfigured = Boolean(owner); auth.isLoading = loading; api.render(); },
    seedDraft(owner, encounter) { sessionValues.set(owner === 'guest' ? encounters.CLINICAL_ENCOUNTER_KEY : encounters.CLINICAL_ENCOUNTER_KEY + ':' + encodeURIComponent(owner), JSON.stringify(encounter)); },
    holdDownloads(owner) { const pending = { notes: deferred(), memos: deferred() }; pendingDownloads.set(owner, pending); return { resolve(notes = [], memos = []) { pendingDownloads.delete(owner); pending.notes.resolve(notes); pending.memos.resolve(memos); } }; },
    holdUpsert(owner) { const pending = deferred(); pendingUpserts.set(owner, pending); return pending; },
    async settle() { for (let index = 0; index < 8; index++) { await Promise.resolve(); api.render(); api.flushTimers(); api.render(); } },
    async enableCloud() { api.seedDraft('test-account', initialEncounter); api.setAuth('test-account'); await api.settle(); },
  };
  api.render();
  if (mount) { api.flushTimers(); api.render(); api.flushTimers(); api.render(); }
  writes.length = 0;
  return api;
}

(async () => {
  await check('pure save rejects invalid fields, missing update target, and a full store without writing', () => {
    const notes = [sampleNote()]; let writes = 0;
    const fields = encounters.clinicalEncounterNote(sampleEncounter(), ['合谷']);
    for (const invalid of [{ ...fields, patientIdentifier: ' ' }, { ...fields, chiefComplaint: '' }, { ...fields, visitDate: 'invalid' }]) assert.equal(persistClinicalNote(notes, invalid, undefined, 2, () => writes++).result.ok, false);
    assert.equal(persistClinicalNote(notes, fields, 'missing-id', 2, () => writes++).result.ok, false);
    assert.equal(persistClinicalNote(notes, fields, undefined, 1, () => writes++).result.ok, false);
    assert.equal(writes, 0);
  });
  await check('pure save commits once, retains legacy metadata, and updates at the limit without duplication', () => {
    const prior = sampleNote('legacy', { gender: '女性', ageGroup: '40代', selfCarePoints: ['足三里'], constitution: '既存の分類' });
    const original = plain(prior); let written;
    const fields = encounters.clinicalEncounterNote(sampleEncounter({ chiefComplaint: '修正した主訴' }), ['合谷']);
    const result = persistClinicalNote([prior], fields, prior.id, 1, next => { written = plain(next); });
    assert(result.result.ok); assert.equal(result.result.id, prior.id); assert.equal(written.length, 1);
    assert.equal(written[0].createdAt, prior.createdAt); assert.equal(written[0].chiefComplaint, '修正した主訴');
    assert.equal(written[0].gender, prior.gender); assert.deepEqual(written[0].selfCarePoints, prior.selfCarePoints);
    assert.deepEqual(prior, original, 'The previous object is not mutated');
  });
  await check('a failed physical write does not return success or mutate the previous snapshot', () => {
    const prior = sampleNote(); const before = plain(prior);
    const result = persistClinicalNote([prior], encounters.clinicalEncounterNote(sampleEncounter(), ['合谷']), prior.id, 1, () => { throw Error('quota'); });
    assert.equal(result.result.ok, false); assert.equal(result.note, undefined); assert.equal(result.notes, undefined); assert.deepEqual(prior, before);
  });
  await check('encounter conversion preserves the old note schema, metric reader and safety exclusions', () => {
    const encounter = sampleEncounter();
    const note = encounters.clinicalEncounterNote(encounter, ['合谷']);
    assert.equal(note.selectedPoints.join(), '合谷'); assert.equal(note.sourceTool, undefined); assert.equal(note.selectedPointsInput, undefined);
    assert.equal(note.savedNoteId, undefined); assert.equal(encounters.readClinicalMetric(note).before, '6');
    const held = encounters.clinicalEncounterNote({ ...encounter, safety: 'refer' }, ['合谷']);
    assert.equal(held.selectedPoints.length, 0); assert(!held.treatmentPlan.includes('合谷')); assert(!held.treatmentPlan.includes('LI4'));
    assert.match(held.treatmentPlan, /施術を保留・医療評価を優先/); assert.match(held.treatmentPlan, /施術は保留/);
    assert.equal(encounter.points.length, 1, 'Converting a held intervention cannot erase the editable draft');
    assert(encounters.parseClinicalEncounter(encounter)); assert(encounters.parseClinicalEncounter({ ...encounter, savedNoteId: 'existing' }));
    assert.equal(encounters.parseClinicalEncounter({ ...encounter, savedNoteId: {} }), null);
    assert.equal(encounters.clinicalFollowup(sampleNote()).savedNoteId, undefined, 'A new visit cannot overwrite the previous visit');
  });
  await check('real Provider blocks saving until its stored notes are loaded', () => {
    const client = harness({ mount: false });
    const result = client.context().saveWorkspaceNote(encounters.clinicalEncounterNote(sampleEncounter(), ['合谷']));
    assert.equal(result.ok, false); assert.equal(client.localValues.get(key), '[]');
  });
  await check('real Workspace saves, modifies a reviewed section, and updates the same note', () => {
    const client = harness(); client.review();
    client.click('臨床ノートに保存する');
    const id = client.note().id, createdAt = client.note().createdAt;
    assert.equal(client.context().patientNotes.length, 1); assert.equal(client.encounter().savedNoteId, id);
    assert(client.button('保存済み').props.disabled); assert.match(text(client.tree()), /このブラウザに記録を保存しました/);
    client.click('主訴・安全確認を修正'); client.change('主訴', '修正後の首の痛み'); client.review();
    client.click('この記録を更新する');
    assert.equal(client.context().patientNotes.length, 1); assert.equal(client.note().id, id); assert.equal(client.note().createdAt, createdAt);
    assert.equal(client.note().chiefComplaint, '修正後の首の痛み'); assert.equal(JSON.parse(client.localValues.get(key))[0].chiefComplaint, '修正後の首の痛み');
    const reopened = harness({ initialEncounter: client.encounter(), initialNotes: plain(client.context().patientNotes) });
    reopened.review(); assert(reopened.button('保存済み').props.disabled, 'An unchanged saved draft remains saved after reload');
    reopened.click('主訴・安全確認を修正'); reopened.change('主訴', '再読込後に更新した主訴'); reopened.review(); reopened.click('この記録を更新する');
    assert.equal(reopened.context().patientNotes.length, 1); assert.equal(reopened.note().id, id, 'Reloaded edited drafts update rather than add');
  });
  await check('a deleted saved note is never shown as saved or recreated without explicit recovery confirmation', () => {
    const client = harness(); client.review(); client.click('臨床ノートに保存する');
    const deletedId = client.note().id;
    client.context().removePatientNote(deletedId); client.render();
    assert.equal(client.context().patientNotes.length, 0);
    assert(text(client.tree()).includes('元の保存済み記録が見つかりません'));
    assert(!nodes(client.tree()).some(node => node.type === 'button' && text(node) === '保存済み'));
    const retained = plain(client.encounter());
    const reopened = harness({ initialEncounter: retained, initialNotes: [] }); reopened.review();
    reopened.flags.confirm = false; reopened.click('新しい臨床ノートとして保存');
    assert.equal(reopened.context().patientNotes.length, 0); assert.deepEqual(plain(reopened.encounter()), retained);
    reopened.flags.confirm = true; reopened.click('新しい臨床ノートとして保存');
    assert.equal(reopened.context().patientNotes.length, 1); assert.notEqual(reopened.note().id, deletedId);
    assert.equal(reopened.note().chiefComplaint, retained.chiefComplaint); assert.equal(reopened.encounter().points[0].reason, retained.points[0].reason);
    assert(reopened.button('保存済み').props.disabled);
  });
  await check('rapid repeated save events cannot create duplicate records', () => {
    const client = harness(); client.review();
    const click = client.button('臨床ノートに保存する').props.onClick;
    click(); click(); client.render();
    assert.equal(client.context().patientNotes.length, 1); assert.equal(JSON.parse(client.localValues.get(key)).length, 1);
    assert.equal(nodes(client.tree()).filter(node => node.props?.role === "alert").length, 0, "A repeated click is ignored without contradicting the successful save");
  });
  await check('localStorage failure retains the input and previous store, then retry succeeds', () => {
    const existing = sampleNote('other', { patientIdentifier: 'TEST-OTHER' });
    const client = harness({ initialNotes: [existing], failLocal: true }); client.review(); client.click('臨床ノートに保存する');
    assert.equal(client.context().patientNotes.length, 1); assert.equal(client.note().id, existing.id);
    assert.equal(client.encounter().chiefComplaint, '首の回旋時の痛み'); assert.equal(client.encounter().savedNoteId, undefined);
    assert.match(text(client.tree()), /このブラウザに保存できませんでした/); assert(!text(client.tree()).includes('このブラウザに記録を保存しました'));
    client.flags.failLocal = false; client.click('臨床ノートに保存する'); assert.equal(client.context().patientNotes.length, 2);
  });
  await check('sessionStorage failure stops a save before the durable note is touched', () => {
    const client = harness(); client.review(); client.flags.failSession = true; client.click('臨床ノートに保存する');
    assert.equal(client.context().patientNotes.length, 0); assert.equal(client.localValues.get(key), '[]');
    assert.match(text(client.tree()), /下書きを保存できない/); assert.equal(client.button('臨床ノートに保存する').props.disabled, false);
  });
  await check('a full real Provider allows editing an existing note but rejects a new record', () => {
    const count = SUBSCRIPTION_CONFIG.limits.freePatientNoteMax;
    const notes = Array.from({ length: count }, (_, index) => sampleNote('full-' + index));
    const client = harness({ initialNotes: notes }); client.review(); client.click('臨床ノートに保存する');
    assert.equal(client.context().patientNotes.length, count); assert.match(text(client.tree()), /保存上限/);
    const update = harness({ initialNotes: notes, initialEncounter: sampleEncounter({ savedNoteId: 'full-0', chiefComplaint: '上限到達後の修正' }) });
    update.review(); update.click('この記録を更新する');
    assert.equal(update.context().patientNotes.length, count); assert.equal(update.note().chiefComplaint, '上限到達後の修正');
  });
  await check('medical referral removes points from the durable note and unreviewed safety blocks saving', () => {
    const referral = harness({ initialEncounter: sampleEncounter({ safety: 'refer' }) }); referral.review(); referral.click('臨床ノートに保存する');
    assert.equal(referral.note().selectedPoints.length, 0); assert(!referral.note().treatmentPlan.includes('LI4')); assert.match(referral.note().treatmentPlan, /医療評価を優先/);
    const unreviewed = harness({ initialEncounter: sampleEncounter({ safety: 'unknown' }) }); unreviewed.review(); unreviewed.click('臨床ノートに保存する');
    assert.equal(unreviewed.context().patientNotes.length, 0); assert.match(text(unreviewed.tree()), /安全確認の状態を記録/);
  });
  await check('only committed notes use the existing cloud write and cloud failure stays visible', async () => {
    const client = harness(); await client.enableCloud(); client.cloudResult(false); client.review(); client.click('臨床ノートに保存する');
    assert.equal(client.context().syncStatus, "syncing", "Local success is distinct from a pending cloud write");
    assert.equal(client.cloudWrites.length, 1); assert.equal(client.cloudWrites[0].userId, 'test-account');
    assert.equal(client.cloudWrites[0].note.id, client.note().id);
    await client.settle();
    assert.equal(client.context().syncStatus, 'offline'); assert.equal(client.context().patientNotes.length, 1);
    const blocked = harness(); await blocked.enableCloud(); blocked.flags.failLocal = true; blocked.review(); blocked.click('臨床ノートに保存する');
    assert.equal(blocked.cloudWrites.length, 0, 'Failed local persistence cannot upload an apparent success');
    const successful = harness(); await successful.enableCloud(); successful.review(); successful.click("臨床ノートに保存する");
    assert.equal(successful.context().syncStatus, "syncing");
    await successful.settle();
    assert.equal(successful.context().syncStatus, "synced", "A completed cloud write marks the record synced");
  });
  await check('native observation groups preserve unknown status and candidate buttons return focus to the exact input', () => {
    const client = harness({ initialEncounter: sampleEncounter({ observations: {}, step: 1 }) });
    assert.equal(nodes(client.tree()).filter(node => node.type === 'details' && node.props.className === 'clinical-observation-group').length, 4);
    client.change('疲労・気力低下', 'absent'); assert.equal(client.encounter().observations.fatigue, 'absent');
    client.click('3.候補・治法'); client.flushFrames();
    const priorFocus = client.focused.length;
    const unknownButton = nodes(client.tree()).find(node => node.type === 'button' && node.props.className === 'clinical-missing-sign');
    assert(unknownButton, 'Selected candidate exposes a concrete missing observation');
    unknownButton.props.onClick(); client.render(); client.flushFrames();
    assert.equal(client.focused.length, priorFocus + 1); assert.equal(client.scrolled.at(-1), client.focused.at(-1));
    assert(client.focused.at(-1).startsWith('clinical-sign-'), 'Observation navigation does not leave focus on the step heading');
    assert([...client.groups.values()].some(group => group.open));
    assert.equal(client.encounter().observations.fatigue, 'absent', 'Returning for another observation never resets a confirmed negative');
    assert(CLINICAL_PATTERNS.length > 7, 'Expanded candidates retain observation focus behavior');
  });
  await check('structured four examinations retain pulse dimensions, comparison semantics and note content', () => {
    const client = harness({ initialEncounter: sampleEncounter({ observations: {}, step: 1 }) });
    client.change('脈の速さ', '速い（数）');
    client.change('脈の強さ', '弱い・無力');
    client.change('脈の深さ', '深いところで触れる（沈）');
    client.change('実測脈拍（回/分）', '88');
    client.change('触診した部位・左右・圧の深さ', '右肩・浅部');
    client.change('圧痛', 'あり');
    client.change('舌苔の色', '黄');
    client.change('声の性状', 'かすれる');
    client.change('問診の補足・その他の所見', '夜間に変動する架空の記録');
    assert.equal(client.encounter().observations.rapidPulse, 'present');
    assert.equal(client.encounter().observations.weakPulse, 'present');
    client.change('実測脈拍（回/分）', '60');
    assert.equal(client.encounter().observations.rapidPulse, 'present', 'A measured rate never diagnoses a traditional pulse quality');
    const restored = harness({ initialEncounter: client.encounter() });
    assert.equal(restored.field('脈の深さ').props.value, '深いところで触れる（沈）');
    restored.click('5.記録・再評価'); restored.review();
    assert(text(restored.tree()).includes('触診した部位・左右・圧の深さ：右肩・浅部'));
    restored.click('臨床ノートに保存する');
    for (const fact of ['脈の深さ：深いところで触れる（沈）', '実測脈拍（回/分）：60', '圧痛：あり', '舌苔の色：黄', '声の性状：かすれる', '夜間に変動する架空の記録']) assert(restored.note().treatmentPlan.includes(fact), fact);
    assert.equal(encounters.clinicalFollowup(restored.note()).examination, undefined, 'New visits must not inherit old examination results');
    client.change('脈の速さ', '判断困難');
    client.change('脈の強さ', '中等度');
    assert.equal(client.encounter().observations.rapidPulse, 'unknown');
    assert.equal(client.encounter().observations.weakPulse, 'absent');
    client.change('脈の強さ', '');
    assert.equal(client.encounter().observations.weakPulse, 'unknown');
  });
  await check('old pulse drafts preserve confirmed negatives and structured drafts reject invalid fields', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 1, observations: { rapidPulse: 'absent', weakPulse: 'present' } }) });
    assert.equal(client.field('脈の速さ').props.value, '速くない（通常・遅い未区分）');
    assert.equal(client.field('脈の強さ').props.value, '弱い・無力');
    for (const examination of [{ pulseDepth: 'invented' }, { pulseRate: '-1' }, { pulseRate: '80.5' }, { pulseRate: '0' }, { pulseRate: '1200' }, { unexpected: 'data' }, { pulseConditions: 'x'.repeat(2001) }, []]) assert.equal(encounters.parseClinicalEncounter(sampleEncounter({ examination })), null);
    assert(encounters.parseClinicalEncounter(sampleEncounter({ examination: { pulseRate: '', pulseDepth: '判断困難' } })));
    const safety = harness({ initialEncounter: sampleEncounter({ step: 0, safety: 'unknown' }) });
    const disclosure = nodes(safety.tree()).find(node => node.type === 'details' && node.props.className?.includes('clinical-safety-disclosure'));
    assert(disclosure && !disclosure.props.open, 'Safety explanation starts collapsed');
    assert(safety.field('安全確認の状態'), 'Per-visit safety control stays visible');
    safety.click('4.配穴の理由');
    assert.equal(safety.encounter().step, 0, 'Collapsing explanation never bypasses safety');
  });
  await check('expanded candidate choices update the draft and compare only the selected mixed categories', () => {
    const manual = '  本人の希望と追加所見を確認してから治法を考える。  ';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: [], principle: manual }) });
    const options = client.candidatePicker().props.patterns;
    assert(options.length > 7, 'The workspace exposes the expanded catalogue');
    assert.equal(new Set(options.map(option => option.id)).size, options.length);
    assert.deepEqual(plain([...new Set(options.map(option => option.category))]), ['気血津液', '肝胆', '心', '脾胃', '肺', '腎'], 'The workspace groups the catalogue in the intended logical order');
    assert(options.some(option => option.id === 'lung-qi' && option.category === '肺'));
    assert(options.some(option => option.id === 'heart-blood' && option.category === '心'));
    assert(options.some(option => option.id === 'kidney-yin' && option.category === '腎'));
    client.chooseCandidates(['lung-qi', 'heart-blood']);
    assert.deepEqual(plain(client.encounter().candidateIds), ['lung-qi', 'heart-blood']);
    const rows = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row');
    assert.equal(rows.length, 2);
    assert.deepEqual(rows.map(row => String(row.key)).sort(), ['heart-blood', 'lung-qi']);
    assert.equal(client.field('今回検討する治法').props.value, manual, 'Choosing candidates never replaces handwritten treatment');
    client.change('その他の候補・併存して考える見立て', ' 別の原因も併存して検討する。 ');
    const summary = nodes(client.tree()).find(node => node.type === 'aside' && node.props['aria-label'] === '作業中の記録の要約');
    assert(text(summary).includes('肺気虚') && text(summary).includes('心血虚'));
    assert(text(summary).includes('別の原因も併存して検討する。'));
    client.chooseCandidates([]);
    assert.equal(nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row').length, 0);
    assert.equal(client.field('今回検討する治法').props.value, manual);
    assert.equal(client.encounter().customCandidates, ' 別の原因も併存して検討する。 ');
  });
  await check('new structured comparisons cover cough while unconfigured conflicts remain explicit', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi-counterflow', 'liver-qi'], observations: {} }) });
    const options = client.candidatePicker().props.patterns;
    const counterflow = options.find(option => option.id === 'qi-counterflow');
    assert(counterflow);
    assert.equal(counterflow.supportCount, 0);
    assert.equal(counterflow.unknownCount, 1, 'Unexamined cough is an unknown, never a negative finding');
    assert.equal(counterflow.conflictCount, undefined);
    const rows = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row');
    assert.deepEqual(rows.map(row => String(row.key)), ['qi-counterflow', 'liver-qi'], 'Comparison order follows the clinician selection');
    const cough = rows[0];
    assert.equal(nodes(cough).filter(node => node.props?.className === 'clinical-comparison-cell').length, 4);
    assert(text(cough).includes('咳を認めるを確認'));
    assert(nodes(cough).some(node => node.props?.className === 'clinical-additional-checks'), 'Additional observations remain available');
    const liver = rows[1];
    const conflict = nodes(liver).find(node => node.props?.['data-kind'] === 'conflicting');
    assert.equal(text(nodes(conflict).find(node => node.type === 'dd')), 'この候補には照合項目を設定していません');
    assert.equal(options.find(option => option.id === 'liver-qi').conflictCount, undefined);
    assert.equal(nodes(liver).filter(node => node.props?.className === 'clinical-comparison-cell').length, 4, 'Configured support observations retain their comparison controls');
    client.chooseCandidates(['spleen-qi']);
    const checked = client.candidatePicker().props.patterns.find(option => option.id === 'spleen-qi');
    assert.equal(checked.conflictCount, 0, 'A configured conflict set can honestly report no entered matching conflict');
  });
  await check('detailed tongue and other examination inputs update the rendered candidate comparison and exact input navigation', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 1, observations: {}, candidateIds: [] }) });
    for (const [label, value] of [['舌体の色', '紅'], ['舌体の乾湿', '乾燥している'], ['舌苔の厚さ', '少ない'], ['脈の太さ', '細い'], ['声の性状', 'かすれる'], ['咳・痰', '乾いた咳'], ['圧痛', 'あり']]) client.change(label, value);
    client.click('3.候補・治法'); client.chooseCandidates(['yin', 'spleen-qi', 'lung-yin', 'liver-heat']);
    const rows = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row');
    const yin = text(nodes(rows[0]).find(node => node.props?.['data-kind'] === 'supported'));
    for (const finding of ['紅舌', '少苔・無苔', '舌体の乾燥', '細い脈']) assert(yin.includes(finding), finding);
    assert(text(nodes(rows[1]).find(node => node.props?.['data-kind'] === 'conflicting')).includes('紅舌'));
    assert(text(nodes(rows[2]).find(node => node.props?.['data-kind'] === 'supported')).includes('乾いた咳'));
    assert(text(rows[0]).includes('圧痛：あり'), 'Local findings remain available for additional assessment');
    const yellow = nodes(rows[3]).find(node => node.type === 'button' && text(node) === '黄苔を確認');
    assert(yellow); yellow.props.onClick(); client.render(); client.flushFrames();
    assert.equal(client.focused.at(-1), 'clinical-exam-coatColor');
    client.change('舌苔の色', '黄'); client.click('3.候補・治法');
    const changed = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row').at(-1);
    assert(text(nodes(changed).find(node => node.props?.['data-kind'] === 'supported')).includes('黄苔'));
  });
  await check('selected-candidate differential receives real inputs and focus changes never alter the clinical draft', () => {
    const initial = sampleEncounter({ step: 2, candidateIds: ['spleen-qi', 'liver-heat', 'stasis', 'damp', 'lung-yin'],
      observations: { fatigue: 'present', cold: 'absent' }, examination: { tongueColor: '淡白', painQuality: '刺すような痛み' },
      principle: '  手入力の治法\n追加確認してから見直す。  ' });
    const client = harness({ initialEncounter: initial });
    const differential = client.candidateDifferential();
    assert.deepEqual(plain(differential.props.patterns.map(pattern => pattern.id)), initial.candidateIds, 'Only selected patterns are supplied, in clinician selection order');
    assert.deepEqual(plain(differential.props.observations), initial.observations);
    assert.deepEqual(plain(differential.props.examination), initial.examination);
    assert.equal(differential.props.focusIds, null);
    const before = plain(client.encounter()), writes = client.writes.length;
    differential.props.onFocusChange(['stasis', 'liver-heat']); client.render();
    assert.deepEqual(plain(client.candidateDifferential().props.focusIds), ['stasis', 'liver-heat']);
    assert.deepEqual(plain(client.encounter()), before, 'Comparison focus is UI state; it cannot change candidate IDs, observations, points or handwritten treatment');
    assert.equal(client.writes.length, writes, 'Changing comparison focus does not rewrite the clinical draft');
  });
  await check('inline differential answers save immediately and recompute candidate evidence and differences without leaving comparison', () => {
    const initial = sampleEncounter({ step: 2, candidateIds: ['spleen-qi', 'liver-heat', 'stasis', 'damp'], observations: {}, examination: {},
      principle: '  比較画面で四診を追記する。\n手入力の治法を保持。  ' });
    const client = harness({ initialEncounter: initial });
    const focus = ['damp', 'stasis', 'spleen-qi', 'liver-heat'];
    client.candidateDifferential().props.onFocusChange(focus); client.render();
    const option = id => client.candidatePicker().props.patterns.find(pattern => pattern.id === id);
    const result = () => { const props = client.candidateDifferential().props; return clinicalCandidateDifferential(props.patterns, props.observations, props.examination); };
    const assertPreserved = () => {
      assert.equal(client.encounter().step, 2);
      assert.deepEqual(plain(client.encounter().candidateIds), initial.candidateIds);
      assert.equal(client.encounter().principle, initial.principle);
      assert.deepEqual(plain(client.encounter().points), initial.points);
      assert.deepEqual(plain(client.candidateDifferential().props.focusIds), focus);
      assert.equal(client.focused.length, 0, 'Inline answers do not move keyboard focus to another step');
    };
    client.candidateDifferential().props.onObservationChange('fatigue', 'present');
    assert.equal(JSON.parse(client.sessionValues.get(encounters.CLINICAL_ENCOUNTER_KEY)).observations.fatigue, 'present', 'The observation is physically saved during its input event');
    client.render(); assertPreserved();
    assert.equal(option('spleen-qi').supportCount, 1);
    assert.deepEqual(plain(option('spleen-qi').supportGroups), ['問診']);
    assert(result().differences.some(finding => finding.id === 'fatigue' && finding.status === 'present'));
    client.candidateDifferential().props.onExaminationChange('tongueColor', '淡白');
    assert.equal(JSON.parse(client.sessionValues.get(encounters.CLINICAL_ENCOUNTER_KEY)).examination.tongueColor, '淡白', 'Detailed findings are saved before the next render');
    client.render(); assertPreserved();
    assert.equal(option('spleen-qi').supportCount, 2);
    assert.deepEqual(plain(option('spleen-qi').supportGroups), ['問診', '望診'], 'The existing multiple-examination filter receives current group coverage immediately');
    assert(option('spleen-qi').supportReasons.includes('淡白舌'));
    assert(result().differences.some(finding => finding.id === 'paleTongue' && finding.status === 'present'));
    client.candidateDifferential().props.onExaminationChange('tongueColor', '紅'); client.render(); assertPreserved();
    assert(!option('spleen-qi').supportReasons.includes('淡白舌'));
    assert(option('spleen-qi').conflictReasons.includes('紅舌'));
    assert(option('liver-heat').supportReasons.includes('紅舌'));
    assert(result().differences.some(finding => finding.id === 'redTongue' && finding.status === 'present'));
    client.candidateDifferential().props.onExaminationChange('tongueColor', ''); client.render(); assertPreserved();
    assert.equal(option('liver-heat').supportCount, 0);
    assert.equal(option('spleen-qi').conflictReasons.length, 0);
    assert.deepEqual(plain(option('spleen-qi').supportGroups), ['問診']);
    assert(result().nextChecks.some(check => check.key === 'tongueColor'), 'Resetting a detailed field restores its distinguishing question');
    client.candidateDifferential().props.onObservationChange('fatigue', 'absent'); client.render(); assertPreserved();
    assert.equal(option('spleen-qi').supportCount, 0);
    assert.equal(option('spleen-qi').missingCount, 1);
    assert(result().differences.some(finding => finding.id === 'fatigue' && finding.status === 'absent'));
    client.candidateDifferential().props.onObservationChange('fatigue', 'unknown'); client.render(); assertPreserved();
    assert.equal(option('spleen-qi').supportCount, 0);
    assert.equal(option('spleen-qi').missingCount, 0);
    assert(result().nextChecks.some(check => check.key === 'fatigue'), 'Resetting an ordinary sign restores its unanswered question');
    assert(client.writes.some(write => write.kind === 'session' && write.id === encounters.CLINICAL_ENCOUNTER_KEY));
    const restored = harness({ initialEncounter: client.encounter() });
    assert.equal(restored.encounter().step, 2);
    assert.equal(restored.candidateDifferential().props.observations.fatigue, 'unknown');
    assert.equal(restored.candidateDifferential().props.examination.tongueColor, '');
    assert.equal(restored.field('今回検討する治法').props.value, initial.principle);
  });
  await check('inline compound pain and coating reconciliation use the original four-examination state and preserve it across both screens', () => {
    const initial = sampleEncounter({ step: 2, candidateIds: ['yin', 'damp', 'stasis'], observations: {}, examination: {}, principle: '  追加所見で治法を手動検討。  ' });
    const client = harness({ initialEncounter: initial });
    const option = id => client.candidatePicker().props.patterns.find(pattern => pattern.id === id);
    const change = (id, value) => { client.candidateDifferential().props.onExaminationChange(id, value); client.render(); assert.equal(client.encounter().step, 2); };
    change('painQuality', '刺すような痛み');
    assert.equal(client.encounter().observations.fixedPain, 'unknown');
    assert(!option('stasis').supportReasons.includes('固定した刺すような痛み'));
    change('painLocation', '固定している');
    assert.equal(client.encounter().observations.fixedPain, 'present');
    assert(option('stasis').supportReasons.includes('固定した刺すような痛み'));
    change('painLocation', '');
    assert.equal(client.encounter().observations.fixedPain, 'unknown');
    assert.equal(option('stasis').supportCount, 0, 'Clearing either part removes compound-pain support immediately');
    change('painLocation', '固定している');
    change('coatTexture', '膩苔（きめ細かく粘る）');
    change('coatThickness', '厚い');
    assert(option('damp').supportReasons.includes('膩苔') && option('damp').supportReasons.includes('厚い舌苔'));
    change('coatColor', '苔を認めない');
    for (const id of ['coatColor', 'coatThickness', 'coatTexture', 'coatMoisture']) assert.equal(client.encounter().examination[id], '苔を認めない');
    assert.equal(client.encounter().observations.greasyCoat, 'absent');
    assert(!option('damp').supportReasons.includes('膩苔') && !option('damp').supportReasons.includes('厚い舌苔'));
    assert(option('yin').supportReasons.includes('少苔・無苔'));
    change('coatTexture', '膩苔（きめ細かく粘る）');
    for (const id of ['coatColor', 'coatThickness', 'coatMoisture']) assert.equal(client.encounter().examination[id], '', 'Visible coating reopens related unconfirmed fields');
    assert.equal(client.encounter().observations.greasyCoat, 'present');
    assert(option('damp').supportReasons.includes('膩苔'));
    assert(!option('yin').supportReasons.includes('少苔・無苔'));
    assert.deepEqual(plain(client.encounter().candidateIds), initial.candidateIds);
    assert.equal(client.encounter().principle, initial.principle);
    const stored = plain(client.encounter());
    client.click('2.四診所見');
    assert.equal(client.field('痛みの性質（主なもの）').props.value, '刺すような痛み');
    assert.equal(client.field('痛む場所の変化').props.value, '固定している');
    assert.equal(client.field('舌苔の性状').props.value, '膩苔（きめ細かく粘る）');
    assert.equal(client.field('舌苔の厚さ').props.value, '');
    client.change('舌苔の厚さ', '厚い'); client.click('3.候補・治法');
    assert.equal(client.candidateDifferential().props.examination.coatThickness, '厚い', 'Changes in the original four-examination form also update inline comparison props');
    assert(option('damp').supportReasons.includes('厚い舌苔'));
    assert.deepEqual(plain(client.encounter().candidateIds), stored.candidateIds);
    assert.equal(client.field('今回検討する治法').props.value, stored.principle);
  });
  await check('shared finding edits update support groups, actual common status and candidate differences in the same saved comparison', () => {
    const initial = sampleEncounter({ step: 2, candidateIds: ['spleen-qi', 'lung-qi'], observations: { fatigue: 'present' }, examination: { tongueColor: '淡白' } });
    const client = harness({ initialEncounter: initial });
    const option = id => client.candidatePicker().props.patterns.find(pattern => pattern.id === id);
    const result = () => load('src/utils/clinicalCandidateDifferential').clinicalCandidateDifferential(client.candidateDifferential().props.patterns, client.candidateDifferential().props.observations, client.candidateDifferential().props.examination);
    assert(result().shared.some(finding => finding.id === 'paleTongue'));
    for (const id of initial.candidateIds) assert.deepEqual(plain(option(id).supportGroups), ['問診', '望診']);
    client.candidateDifferential().props.onExaminationChange('tongueColor', '紅');
    assert.equal(client.encounter().examination.tongueColor, '紅', 'The edit is physically saved in the input event');
    client.render();
    assert.equal(result().sharedFindings.find(finding => finding.id === 'paleTongue').status, 'absent');
    assert(!result().shared.some(finding => finding.id === 'paleTongue'));
    assert(result().differences.some(finding => finding.id === 'redTongue' && finding.status === 'present'));
    for (const id of initial.candidateIds) assert.deepEqual(plain(option(id).supportGroups), ['問診']);
    client.candidateDifferential().props.onObservationChange('fatigue', 'absent'); client.render();
    for (const id of initial.candidateIds) assert.equal(option(id).supportCount, 0);
    client.candidateDifferential().props.onObservationChange('fatigue', 'unknown'); client.render();
    assert.equal(result().sharedFindings.find(finding => finding.id === 'fatigue').status, 'unknown');
    assert.equal(client.encounter().step, 2);
    assert.equal(client.focused.length, 0);
    assert.deepEqual(plain(client.encounter().candidateIds), initial.candidateIds);
    assert.equal(client.encounter().principle, initial.principle);
    assert.deepEqual(plain(client.encounter().points), initial.points);
    const restored = harness({ initialEncounter: client.encounter() });
    assert.equal(restored.candidateDifferential().props.observations.fatigue, 'unknown');
    assert.equal(restored.candidateDifferential().props.examination.tongueColor, '紅');
    assert.equal(restored.encounter().step, 2);
  });
  await check('reviewing either part of a legacy fixed-pain finding retains the other displayed part', () => {
    for (const [id, value, retainedId, retainedValue] of [
      ['painLocation', '移動する', 'painQuality', '刺すような痛み'],
      ['painQuality', '鈍い痛み', 'painLocation', '固定している'],
    ]) {
      const initial = sampleEncounter({ step: 2, candidateIds: ['stasis', 'liver-qi'], observations: { fixedPain: 'present' }, examination: {} });
      const client = harness({ initialEncounter: initial });
      client.candidateDifferential().props.onExaminationChange(id, value); client.render();
      assert.equal(client.encounter().examination[id], value);
      assert.equal(client.encounter().examination[retainedId], retainedValue, 'Editing a legacy composite cannot erase the other displayed part');
      assert.equal(client.encounter().observations.fixedPain, 'absent');
      assert.equal(client.encounter().step, 2);
      assert.deepEqual(plain(client.encounter().candidateIds), initial.candidateIds);
      assert.equal(client.encounter().principle, initial.principle);
    }
  });
  await check('differential finding edits stay inline while supplementary context retains its separate memo navigation', () => {
    const initial = sampleEncounter({ step: 2, candidateIds: ['spleen-qi', 'liver-heat', 'stasis', 'lung-yin'],
      observations: { fatigue: 'present', cold: 'absent' }, examination: { tongueColor: '淡白', painQuality: '刺すような痛み' },
      principle: '  比較しても手入力の治法を保持\n局在は追加確認する。  ' });
    const client = harness({ initialEncounter: initial });
    const before = plain(client.encounter());
    assert.equal(client.candidateDifferential().props.onCheck, undefined, 'Known-finding review has no callback that navigates to another step');
    assert.equal(client.encounter().step, 2);
    assert.deepEqual(plain(client.encounter()), before);
    client.candidateDifferential().props.onRecordDetails(); client.render(); client.flushFrames();
    assert.equal(client.encounter().step, 1);
    assert.equal(client.focused.at(-1), 'clinical-examination-memo');
    assert.equal(client.scrolled.at(-1), 'clinical-examination-memo');
    const memo = nodes(client.tree()).find(node => node.type === 'textarea' && node.props.id === 'clinical-examination-memo');
    assert(memo, 'Supplementary context returns to the live four-examination memo');
    assert.deepEqual(plain({ ...client.encounter(), step: before.step }), before, 'Recording navigation cannot replace selected candidates or handwritten treatment');
  });
  await check('new candidates and custom hypotheses survive review, reload and same-ID updates with exact manual treatment', () => {
    const manual = '  症状の経過を先に確認する。\n治法は本人と相談して見直す。  ';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: [], principle: '' }) });
    client.chooseCandidates(['lung-qi', 'heart-blood']);
    client.change('その他の候補・併存して考える見立て', '独自の併存仮説\n現時点では保留');
    client.change('今回検討する治法', manual);
    client.review();
    const review = nodes(client.tree()).find(node => node.props?.className === 'clinical-review-section' && text(node).startsWith('候補・治法'));
    assert(text(review).includes('肺気虚／心血虚／独自の併存仮説\n現時点では保留'));
    assert(text(review).includes(manual.trimEnd()), 'The preview retains handwritten wording');
    client.click('臨床ノートに保存する');
    const id = client.note().id, createdAt = client.note().createdAt;
    assert.equal(client.note().syndrome, '肺気虚／心血虚／独自の併存仮説\n現時点では保留');
    assert(client.note().treatmentPlan.includes('治法：' + manual + '\n\n'));
    client.click('候補・治法を修正');
    client.chooseCandidates(['kidney-yin']);
    client.change('その他の候補・併存して考える見立て', '再評価した併存仮説');
    assert.equal(client.field('今回検討する治法').props.value, manual);
    client.review(); client.click('この記録を更新する');
    assert.equal(client.context().patientNotes.length, 1);
    assert.equal(client.note().id, id); assert.equal(client.note().createdAt, createdAt);
    assert.equal(client.note().syndrome, '腎陰虚／再評価した併存仮説');
    const reopened = harness({ initialEncounter: client.encounter(), initialNotes: plain(client.context().patientNotes) });
    reopened.click('3.候補・治法');
    assert.deepEqual(plain(reopened.candidatePicker().props.selectedIds), ['kidney-yin']);
    assert.equal(reopened.field('その他の候補・併存して考える見立て').props.value, '再評価した併存仮説');
    assert.equal(reopened.field('今回検討する治法').props.value, manual);
    reopened.review(); assert(reopened.button('保存済み').props.disabled, 'Navigation does not invalidate the saved marker');
    assert.equal(reopened.context().patientNotes.length, 1); assert.equal(reopened.note().id, id);
    assert(reopened.note().treatmentPlan.includes(manual));
    const backup = JSON.parse(reopened.context().exportAllDataAsJson());
    assert.equal(backup.patientNotes[0].syndrome, reopened.note().syndrome);
    assert.equal(backup.patientNotes[0].treatmentPlan, reopened.note().treatmentPlan);
    const csv = reopened.context().exportAllDataAsCsv();
    assert(csv.includes('腎陰虚／再評価した併存仮説') && csv.includes(manual));
  });
  await check('candidate suggestions add atomic treatment terms once and retain subsequent manual edits', () => {
    const manual = '  疏肝理気の適否を再確認する。  ';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['liver-heat'], principle: manual }) });
    const suggestions = nodes(client.tree()).find(node => node.props?.className === 'clinical-principle-suggestions');
    assert.deepEqual(nodes(suggestions).filter(node => node.type === 'button').map(text).sort(), ['清熱＋', '疏肝理気＋'].sort(), 'Compound reference treatments can be chosen individually');
    client.addPrinciple('疏肝理気');
    assert.equal(client.field('今回検討する治法').props.value, manual + '\n疏肝理気');
    assert(client.principleButton('疏肝理気').props.disabled);
    assert(client.principleButton('疏肝理気', 'clinical-principle-catalog').props.disabled);
    client.addPrinciple('清熱', 'clinical-principle-catalog');
    assert.equal(client.encounter().principle, manual + '\n疏肝理気\n清熱');
    assert(client.principleButton('清熱').props.disabled && client.principleButton('清熱', 'clinical-principle-catalog').props.disabled);
    const edited = '  手書きで再整理した方針。\n保留する点を本人と共有。  ';
    client.change('今回検討する治法', edited);
    assert(!client.principleButton('清熱').props.disabled, 'Removing a term manually makes it available again');
    client.chooseCandidates(['qi']);
    assert.equal(client.encounter().principle, edited);
    client.addPrinciple('補気');
    assert.equal(client.encounter().principle, edited + '\n補気');
  });
  await check('treatment addition announces its exact action and undo restores every byte of the handwritten prefix', () => {
    const manual = '  追加所見を確認する。\n本人と相談する。  ';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: manual }) });
    assert.equal(client.additionFeedback(), undefined); assert(!client.hasUndo());
    client.addPrinciple('補気');
    assert(text(client.additionFeedback()).includes('入力欄へ「補気」を追加しました。'));
    assert(client.hasUndo()); assert(text(client.principleButton('補気')).includes('追加済み'));
    assert.equal(client.field('今回検討する治法').props.value, manual + '\n補気');
    client.click('直前の追加を戻す');
    assert.equal(client.field('今回検討する治法').props.value, manual);
    assert.equal(client.encounter().principle, manual);
    assert(!client.hasUndo()); assert(!client.principleButton('補気').props.disabled);
    const undone = nodes(client.tree()).find(node => node.props?.className === 'clinical-principle-feedback');
    assert.equal(undone.props.role, 'status'); assert.equal(undone.props['aria-live'], 'polite');
    assert(text(undone).includes('「補気」の追加を戻しました。'));
  });
  await check('undo reverses only the most recent addition and candidate changes preserve editable treatment', () => {
    const manual = '先に観察条件を確認する。';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['liver-heat'], principle: manual }) });
    client.addPrinciple('疏肝理気');
    const afterFirst = manual + '\n疏肝理気';
    client.addPrinciple('清熱');
    assert.equal(client.encounter().principle, afterFirst + '\n清熱');
    client.chooseCandidates(['qi']);
    assert.equal(client.field('今回検討する治法').props.value, afterFirst + '\n清熱');
    assert(client.hasUndo());
    client.click('直前の追加を戻す');
    assert.equal(client.field('今回検討する治法').props.value, afterFirst);
    assert(!client.hasUndo(), 'The UI exposes a single-step undo rather than a hidden history');
    client.addPrinciple('補気');
    const edited = '  本人と相談して手書きで修正。\n現時点では保留。 ';
    client.change('今回検討する治法', edited);
    assert.equal(client.field('今回検討する治法').props.value, edited);
    assert(!client.hasUndo(), 'Manual changes cannot be overwritten by the old undo snapshot');
    assert.equal(client.additionFeedback(), undefined, 'Old addition feedback clears when the clinician edits the text');
    client.chooseCandidates(['lung-qi']);
    assert.equal(client.field('今回検討する治法').props.value, edited);
  });
  await check('blocked treatment additions do not claim success or create an undo snapshot', () => {
    const duplicate = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: '既存の方針\n補気' }) });
    assert(duplicate.principleButton('補気').props.disabled);
    duplicate.principleButton('補気').props.onClick(); duplicate.render();
    assert.equal(duplicate.additionFeedback(), undefined); assert(!duplicate.hasUndo());
    assert.equal(duplicate.encounter().principle, '既存の方針\n補気');
    const full = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: '記'.repeat(20000) }) });
    assert(full.principleButton('補気').props.disabled);
    assert(text(full.principleButton('補気')).includes('上限'));
    full.principleButton('補気').props.onClick(); full.render();
    assert.equal(full.additionFeedback(), undefined); assert(!full.hasUndo());
    assert.equal(full.field('今回検討する治法').props.value.length, 20000);
  });
  await check('treatment feedback describes an input change even when draft storage fails and undo keeps the error visible', () => {
    const manual = '  再評価してから判断。  ';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: manual }) });
    client.flags.failSession = true;
    client.addPrinciple('補気');
    assert.equal(client.field('今回検討する治法').props.value, manual + '\n補気');
    assert.equal(client.encounter().principle, manual, 'A failed write leaves the recoverable snapshot unchanged');
    assert(text(client.additionFeedback()).includes('入力欄へ「補気」を追加しました。'));
    assert(nodes(client.tree()).some(node => node.props?.role === 'alert' && text(node).includes('下書きを保存できませんでした')));
    client.click('直前の追加を戻す');
    assert.equal(client.field('今回検討する治法').props.value, manual);
    assert(nodes(client.tree()).some(node => node.props?.role === 'alert' && text(node).includes('下書きを保存できませんでした')));
    assert(!client.hasUndo());
  });
  await check('treatment undo is cleared on account changes and a fresh record without leaking private feedback', async () => {
    const manual = 'Guest専用の方針';
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: manual }) });
    client.addPrinciple('補気'); assert(client.hasUndo());
    const staleUndo = client.button('直前の追加を戻す').props.onClick;
    const staleAdd = client.principleButton('清熱', 'clinical-principle-catalog').props.onClick;
    client.seedDraft('account-A', sampleEncounter({ step: 2, candidateIds: ['qi'], principle: 'A専用の方針' }));
    client.setAuth('account-A'); assert(!client.hasUndo());
    staleUndo(); staleAdd(); client.render();
    assert.equal(JSON.parse(client.sessionValues.get(encounters.CLINICAL_ENCOUNTER_KEY)).principle, manual + '\n補気', 'Disposed guest callbacks cannot rewrite the retained guest draft');
    await client.settle();
    staleUndo(); staleAdd(); client.render();
    assert.equal(client.field('今回検討する治法').props.value, 'A専用の方針');
    assert.equal(client.encounter().principle, 'A専用の方針', 'Disposed guest callbacks cannot write into the active account draft');
    assert(!client.hasUndo()); assert.equal(client.additionFeedback(), undefined);
    client.setAuth(null); await client.settle();
    assert.equal(client.field('今回検討する治法').props.value, manual + '\n補気');
    assert(!client.hasUndo(), 'A restored draft does not inherit an old UI-only undo action');
    client.addPrinciple('清熱', 'clinical-principle-catalog'); assert(client.hasUndo());
    client.click('新しい記録を始める');
    assert(!client.hasUndo()); assert.equal(client.additionFeedback(), undefined);
    assert.equal(client.encounter(), null, 'Starting fresh removes the prior tab draft');
    client.click('3.候補・治法');
    assert.equal(client.field('今回検討する治法').props.value, '');
  });
  await check('step and review navigation move keyboard focus to the new heading while preserving safety gates', () => {
    const client = harness();
    client.click('3.候補・治法'); client.flushFrames();
    assert.equal(client.focused.at(-1), 'clinical-workspace-step-heading');
    assert.equal(client.scrolled.at(-1), 'clinical-workspace-step-heading');
    const step = nodes(client.tree()).find(node => node.props?.id === 'clinical-workspace-step-heading');
    assert.equal(step.type, 'h2'); assert.equal(step.props.tabIndex, -1); assert.equal(text(step), '候補・治法');
    client.review(); client.flushFrames();
    assert.equal(client.focused.at(-1), 'clinical-workspace-review-heading');
    const review = nodes(client.tree()).find(node => node.props?.id === 'clinical-workspace-review-heading');
    assert.equal(review.props.tabIndex, -1);
    client.click('入力に戻る'); client.flushFrames();
    assert.equal(client.focused.at(-1), 'clinical-workspace-step-heading', 'Returning from review restores a live keyboard target');
    assert.equal(client.scrolled.at(-1), 'clinical-workspace-step-heading');
    assert.equal(nodes(client.tree()).find(node => node.props?.id === 'clinical-workspace-step-heading').props.tabIndex, -1);
    const blocked = harness({ initialEncounter: sampleEncounter({ safety: 'unknown' }) });
    blocked.click('4.配穴の理由'); blocked.flushFrames();
    assert.equal(blocked.encounter().step, 0, 'A rejected transition preserves the current step');
    assert.equal(blocked.writes.length, 0, 'Rejected navigation does not persist a partial transition');
    assert.equal(blocked.focused.length, 0, 'A blocked step cannot move focus into an unavailable section');
    assert.match(text(blocked.tree()), /配穴の検討前に安全確認を記録/);
  });
  await check('selected comparisons use native disclosure controls and local jump targets are keyboard-addressable', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['liver-heat', 'spleen-qi'] }) });
    const rows = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row');
    const details = rows.map(row => nodes(row).find(node => node.type === 'details'));
    assert(details.every(Boolean));
    assert.equal(details[0].props.open, true, 'The first selected comparison is initially readable');
    assert(!details[1].props.open, 'Other comparisons remain compact until requested');
    for (const item of details) {
      const summary = nodes(item).find(node => node.type === 'summary');
      assert(summary); assert.equal(nodes(summary).filter(node => node.type === 'button').length, 0, 'Disclosure summaries avoid nested buttons');
    }
    for (const id of ['clinical-compare-heading', 'clinical-principle-heading']) {
      const heading = nodes(client.tree()).find(node => node.props?.id === id);
      assert.equal(heading.type, 'h3'); assert.equal(heading.props.tabIndex, -1);
    }
    const anchors = nodes(client.tree()).filter(node => node.type === 'a').map(node => node.props.href);
    assert(anchors.includes('#clinical-compare-heading'));
    assert(anchors.includes('#clinical-principle-heading'));
    client.chooseCandidates([]);
    const emptyAnchors = nodes(client.tree()).filter(node => node.type === 'a').map(node => node.props.href);
    assert(!emptyAnchors.includes('#clinical-compare-heading'));
    assert(emptyAnchors.includes('#clinical-principle-heading'), 'A custom-only hypothesis retains direct access to the treatment editor');
  });
  await check('custom-only hypotheses remain available to review and save without forcing a catalogue selection', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: [], customCandidates: '' }) });
    assert.equal(client.field('その他の候補・併存して考える見立て').props.maxLength, 2000);
    client.change('その他の候補・併存して考える見立て', '一覧以外の仮説を保留して記録');
    client.review(); client.click('臨床ノートに保存する');
    assert.equal(client.note().syndrome, '一覧以外の仮説を保留して記録');
    assert.equal(client.encounter().candidateIds.length, 0);
  });
  await check('treatment additions stop at the draft limit and leave full manual text intact', () => {
    const current = '記'.repeat(19998);
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi'], principle: current }) });
    assert(client.principleButton('補気').props.disabled);
    assert(client.principleButton('補気', 'clinical-principle-catalog').props.disabled);
    assert.equal(client.field('今回検討する治法').props.value, current);
    client.change('今回検討する治法', '記'.repeat(19997));
    assert(!client.principleButton('補気').props.disabled);
    client.addPrinciple('補気');
    assert.equal(client.encounter().principle.length, 20000);
    assert(encounters.parseClinicalEncounter(client.encounter()), 'A full treatment remains reloadable');
    assert(client.principleButton('清熱', 'clinical-principle-catalog').props.disabled);
  });
  await check('search adds a point in one action and prevents duplicate or over-limit additions', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 3, points: [] }) });
    client.change('経穴名・コードで探して追加', 'LI4'); client.click('合谷（LI4）＋追加');
    assert.equal(client.encounter().points.length, 1); assert(client.button('合谷（LI4）追加済み').props.disabled);
    const maxed = harness({ initialEncounter: sampleEncounter({ step: 3, points: Array.from({ length: 12 }, (_, index) => ({ code: 'ST' + (index + 1), role: 'other', reason: '', alternative: '' })) }) });
    maxed.change('経穴名・コードで探して追加', 'LI4'); assert(maxed.button('合谷（LI4）＋追加').props.disabled);
    assert.equal(maxed.encounter().points.length, 12);
  });
  await check('legacy snapshots remain intact, are guest-only and never auto-upload to a login', async () => {
    const legacy = JSON.stringify([sampleNote('unowned-v1')]);
    const legacyMemo = JSON.stringify([{ id: 'legacy-memo', title: '旧配穴記録', createdAt: 1, updatedAt: 1 }]);
    const client = harness({ localEntries: [[key, undefined], [storageScopes.LEGACY_PATIENT_NOTES_KEY, legacy], [storageScopes.LEGACY_CLINICAL_MEMOS_KEY, legacyMemo]] });
    client.localValues.delete(key); client.setAuth(null, true); await client.settle(); client.setAuth(null); await client.settle();
    assert.equal(client.note().id, 'unowned-v1'); assert.equal(client.context().memos[0].id, 'legacy-memo');
    assert.equal(client.localValues.get(storageScopes.LEGACY_PATIENT_NOTES_KEY), legacy);
    client.setAuth('account-B'); await client.settle();
    assert.equal(client.context().patientNotes.length, 0); assert.equal(client.context().memos.length, 0);
    assert.equal(client.bulkWrites.length, 0, 'Unowned and guest records are never offered to a login');
    assert.equal(client.cloudWrites.length, 0); assert.equal(client.localValues.get(storageScopes.LEGACY_PATIENT_NOTES_KEY), legacy);
    client.setAuth(null); await client.settle(); assert.equal(client.note().id, 'unowned-v1');
    client.context().clearAllPatientNotes(); client.render();
    assert.equal(client.localValues.get(key), '[]', 'A cleared guest namespace overrides legacy fallback');
    assert.equal(client.localValues.get(storageScopes.LEGACY_PATIENT_NOTES_KEY), legacy, 'Clearing current notes never silently deletes the retained legacy snapshot');
  });
  await check('auth loading and pending initial sync block every save path and hide prior records', async () => {
    const client = harness({ initialNotes: [sampleNote('guest-private')], initialLoading: true });
    const fields = encounters.clinicalEncounterNote(sampleEncounter(), ['合谷']);
    assert.equal(client.context().clinicalStorageOwner, null); assert.equal(client.context().isReady, false);
    assert.equal(client.context().patientNotes.length, 0); assert.equal(client.context().saveWorkspaceNote(fields).ok, false);
    assert.equal(client.context().addPatientNote(fields), false); assert.equal(client.context().importDataFromJson(JSON.stringify({ patientNotes: [] })).success, false);
    const pending = client.holdDownloads('account-A'); client.setAuth('account-A'); await client.settle();
    assert.equal(client.context().clinicalStorageOwner, 'account-A'); assert.equal(client.context().syncStatus, 'syncing'); assert.equal(client.context().isReady, false);
    assert.equal(client.context().saveWorkspaceNote(fields).ok, false); assert.equal(client.cloudWrites.length, 0);
    pending.resolve([sampleNote('A-remote')]); await client.settle();
    assert.equal(client.context().isReady, true); assert.equal(client.note().id, 'A-remote');
    assert.equal(JSON.parse(client.localValues.get(key))[0].id, 'guest-private');
  });
  await check('an initial sync failure retains the account cache and requires a successful retry before saving', async () => {
    const accountKey = storageScopes.clinicalStorageKeys('account-A').notes;
    const client = harness({ localEntries: [[accountKey, JSON.stringify([sampleNote('A-cache')])]] });
    const pending = client.holdDownloads('account-A'); client.setAuth('account-A'); await client.settle();
    pending.resolve(null, []); await client.settle();
    assert.equal(client.context().syncStatus, 'offline'); assert.equal(client.context().isReady, false); assert.equal(client.note().id, 'A-cache');
    assert.equal(client.context().saveWorkspaceNote(encounters.clinicalEncounterNote(sampleEncounter(), [])).ok, false);
    assert.equal(JSON.parse(client.localValues.get(accountKey))[0].id, 'A-cache');
    assert.equal(client.bulkWrites[0].userId, 'account-A'); assert.equal(client.bulkWrites[0].notes[0].id, 'A-cache');
    await client.context().triggerSync(); await client.settle();
    assert.equal(client.context().isReady, true); assert.equal(client.context().syncStatus, 'synced'); assert.equal(client.note().id, 'A-cache');
  });
  await check('account namespaces stay separate through A to B to logout and stale handlers cannot mutate or export', async () => {
    const A = storageScopes.clinicalStorageKeys('account-A'), B = storageScopes.clinicalStorageKeys('account-B');
    const client = harness({ initialNotes: [sampleNote('G-note')], localEntries: [[A.notes, JSON.stringify([sampleNote('A-note')])], [B.notes, JSON.stringify([sampleNote('B-note')])]] });
    client.setAuth('account-A'); await client.settle(); const old = client.context(); assert.equal(client.note().id, 'A-note');
    client.setAuth('account-B'); assert.equal(client.context().patientNotes.length, 0); assert.equal(client.context().clinicalStorageOwner, null);
    await client.settle(); assert.equal(client.note().id, 'B-note');
    assert.equal(old.saveWorkspaceNote(encounters.clinicalEncounterNote(sampleEncounter(), [])).ok, false);
    old.removePatientNote('A-note'); assert.equal(JSON.parse(old.exportAllDataAsJson()).patientNotes.length, 0);
    await old.triggerSync(); client.render(); assert.equal(client.note().id, 'B-note');
    assert.equal(client.bulkWrites.length, 2); assert.equal(client.bulkWrites[0].notes[0].id, 'A-note'); assert.equal(client.bulkWrites[1].notes[0].id, 'B-note');
    assert.equal(client.bulkWrites[1].userId, 'account-B');
    client.setAuth(null); await client.settle(); assert.equal(client.note().id, 'G-note'); assert.equal(client.context().syncStatus, 'local');
    assert.equal(JSON.parse(client.localValues.get(A.notes))[0].id, 'A-note'); assert.equal(JSON.parse(client.localValues.get(B.notes))[0].id, 'B-note');
  });
  await check('an old account download cannot replace B or guest state after its owner changes', async () => {
    for (const destination of ['account-B', null]) {
      const client = harness({ initialNotes: [sampleNote('G-note')] });
      const pending = client.holdDownloads('account-A'); client.setAuth('account-A'); await client.settle();
      client.cloudAccounts.set('account-B', { notes: [sampleNote('B-note')], memos: [] });
      client.setAuth(destination); await client.settle();
      const before = plain(client.context().patientNotes), status = client.context().syncStatus;
      pending.resolve([sampleNote('A-late-private')]); await client.settle();
      assert.deepEqual(plain(client.context().patientNotes), before); assert.equal(client.context().syncStatus, status);
      assert.equal(client.context().clinicalStorageOwner, destination || 'guest');
      assert(![...client.localValues.values()].some(value => value?.includes('A-late-private')), 'Stale download is never cached into any active namespace');
    }
  });
  await check('old account save success or failure cannot change B or logout status', async () => {
    for (const [destination, result] of [['account-B', true], [null, false]]) {
      const client = harness({ initialNotes: [sampleNote('G-note')] });
      client.setAuth('account-A'); await client.settle(); const pending = client.holdUpsert('account-A');
      const saved = client.context().saveWorkspaceNote(encounters.clinicalEncounterNote(sampleEncounter({ patientIdentifier: 'A-private' }), []));
      assert(saved.ok); client.render(); assert.equal(client.context().syncStatus, 'syncing');
      client.cloudAccounts.set('account-B', { notes: [sampleNote('B-note')], memos: [] });
      client.setAuth(destination); await client.settle(); const before = plain(client.context().patientNotes), status = client.context().syncStatus;
      pending.resolve(result); await client.settle();
      assert.deepEqual(plain(client.context().patientNotes), before); assert.equal(client.context().syncStatus, status);
      assert.equal(client.cloudWrites.length, 1); assert.equal(client.cloudWrites[0].userId, 'account-A');
      const accountSaved = JSON.parse(client.localValues.get(storageScopes.clinicalStorageKeys('account-A').notes));
      assert.equal(accountSaved[0].id, saved.id, 'Local success remains recoverable for its original account');
      assert.equal(client.context().clinicalStorageOwner, destination || 'guest');
    }
  });
  await check('a failed owner-marker write blocks the new account without destroying the old draft or cache', async () => {
    const client = harness({ initialNotes: [sampleNote('G-note')] });
    const draft = client.sessionValues.get(encounters.CLINICAL_ENCOUNTER_KEY), cached = client.localValues.get(key);
    client.flags.failSession = true; client.setAuth('account-B'); await client.settle();
    assert.equal(client.context().clinicalStorageOwner, null); assert.equal(client.context().isReady, false); assert.equal(client.context().patientNotes.length, 0);
    assert.equal(client.context().saveWorkspaceNote(encounters.clinicalEncounterNote(sampleEncounter(), [])).ok, false);
    assert.equal(client.context().addPatientNote(encounters.clinicalEncounterNote(sampleEncounter(), [])), false);
    assert.equal(client.context().syncStatus, 'offline'); assert.match(client.context().lastToast.message, /保存先を確認できません/);
    assert.equal(client.sessionValues.get(encounters.CLINICAL_ENCOUNTER_KEY), draft); assert.equal(client.localValues.get(key), cached); assert.equal(client.cloudWrites.length, 0);
  });
  await check('real Workspace reloads only the matching account draft and returns to the retained guest draft', async () => {
    const client = harness({ initialEncounter: sampleEncounter({ chiefComplaint: 'Guestの下書き' }) });
    client.seedDraft('account-A', sampleEncounter({ chiefComplaint: 'Aの下書き' })); client.seedDraft('account-B', sampleEncounter({ chiefComplaint: 'Bの下書き' }));
    client.setAuth('account-A'); assert(!text(client.tree()).includes('Guestの下書き')); await client.settle();
    assert.equal(client.field('主訴').props.value, 'Aの下書き'); client.change('主訴', 'Aの修正下書き');
    client.setAuth('account-B'); assert(!text(client.tree()).includes('Aの修正下書き')); await client.settle(); assert.equal(client.field('主訴').props.value, 'Bの下書き');
    client.setAuth(null); await client.settle(); assert.equal(client.field('主訴').props.value, 'Guestの下書き');
    client.setAuth('account-A'); await client.settle(); assert.equal(client.field('主訴').props.value, 'Aの修正下書き');
  });
  if (failures.length) { console.error(failures.join('\n\n')); process.exitCode = 1; }
  else console.log(`Clinical workspace passed: ${checks} real save/input flows, failed physical writes, count limits, same-ID updates, reload/retry, referral point exclusion, cloud handoff, auth/loading fences, account changes, stale async results, legacy retention, owner-scoped drafts, observation focus, selected candidate comparisons, comparison limits, manual treatment and one-action point selection.`);
})();
