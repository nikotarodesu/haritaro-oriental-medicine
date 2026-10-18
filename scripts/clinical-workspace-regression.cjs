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
const CandidatePicker = () => null;
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
  const flags = { failLocal, failSession };
  const writes = [], cloudWrites = [], bulkWrites = [], cloudAccounts = new Map(), pendingDownloads = new Map(), pendingUpserts = new Map(), frames = [], focused = [], scrolled = [], groups = new Map(), timers = new Map();
  const auth = { user: null, isPremium: false, isConfigured: false, isLoading: initialLoading };
  let timerId = 0, context, tree, cloudOk = true;
  function storage(values, kind) { return {
    getItem: id => values.get(id) ?? null,
    setItem(id, value) { if (flags[kind === 'local' ? 'failLocal' : 'failSession']) throw Error('storage unavailable'); values.set(id, value); writes.push({ kind, id, value }); },
    removeItem(id) { if (flags[kind === 'local' ? 'failLocal' : 'failSession']) throw Error('storage unavailable'); values.delete(id); },
  }; }
  const localStorage = storage(localValues, 'local'), sessionStorage = storage(sessionValues, 'session');
  const browser = { location: { search: '' }, confirm: () => true };
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
    assert(input, 'Requested input must exist after returning to the observations step: ' + id);
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
    chooseCandidates(ids) { api.candidatePicker().props.onChange(ids); api.render(); },
    principleButton(label, sectionClass = 'clinical-principle-suggestions') { const section = nodes(tree).find(node => node.props?.className === sectionClass); assert(section, 'Treatment section ' + sectionClass); const button = nodes(section).find(node => node.type === 'button' && text(node) === label + '＋'); assert(button, 'Treatment button ' + label); return button; },
    addPrinciple(label, sectionClass) { const button = api.principleButton(label, sectionClass); assert(!button.props.disabled, 'Treatment can be added: ' + label); button.props.onClick(); api.render(); },
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
    reopened.review(); reopened.click('この記録を更新する');
    assert.equal(reopened.context().patientNotes.length, 1); assert.equal(reopened.note().id, id, 'Reloaded saved drafts update rather than add');
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
    client.click('3.候補・治法');
    const unknownButton = nodes(client.tree()).find(node => node.type === 'button' && node.props.className === 'clinical-missing-sign');
    assert(unknownButton, 'Selected candidate exposes a concrete missing observation');
    unknownButton.props.onClick(); client.render(); client.flushFrames();
    assert.equal(client.focused.length, 1); assert.equal(client.scrolled[0], client.focused[0]);
    assert([...client.groups.values()].some(group => group.open));
    assert.equal(client.encounter().observations.fatigue, 'absent', 'Returning for another observation never resets a confirmed negative');
    assert(CLINICAL_PATTERNS.length > 7, 'Expanded candidates retain observation focus behavior');
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
  await check('unconfigured candidate comparisons state their limits instead of presenting four empty cells or zero counts', () => {
    const client = harness({ initialEncounter: sampleEncounter({ step: 2, candidateIds: ['qi-counterflow', 'liver-qi'], observations: {} }) });
    const options = client.candidatePicker().props.patterns;
    const counterflow = options.find(option => option.id === 'qi-counterflow');
    assert(counterflow, 'The candidate is still available without a numeric matching model');
    for (const count of ['supportCount', 'unknownCount', 'conflictCount']) assert.equal(counterflow[count], undefined, count + ' must not imply a measured zero');
    const rows = nodes(client.tree()).filter(node => node.type === 'article' && node.props.className === 'clinical-comparison-row');
    assert.deepEqual(rows.map(row => String(row.key)), ['qi-counterflow', 'liver-qi'], 'Comparison order follows the clinician selection');
    const unsupported = rows[0];
    assert.equal(nodes(unsupported).filter(node => node.props?.className === 'clinical-comparison-fields').length, 0);
    assert.equal(nodes(unsupported).filter(node => node.props?.className === 'clinical-comparison-cell').length, 0);
    assert(text(unsupported).includes('現在の入力項目では照合できません'));
    assert(nodes(unsupported).some(node => node.props?.className === 'clinical-additional-checks'), 'Additional observations remain available');
    const liver = rows[1];
    const conflict = nodes(liver).find(node => node.props?.['data-kind'] === 'conflicting');
    assert.equal(text(nodes(conflict).find(node => node.type === 'dd')), 'この候補には照合項目を設定していません');
    assert.equal(options.find(option => option.id === 'liver-qi').conflictCount, undefined);
    assert.equal(nodes(liver).filter(node => node.props?.className === 'clinical-comparison-cell').length, 4, 'Configured support observations retain their comparison controls');
    client.chooseCandidates(['spleen-qi']);
    const checked = client.candidatePicker().props.patterns.find(option => option.id === 'spleen-qi');
    assert.equal(checked.conflictCount, 0, 'A configured conflict set can honestly report no entered matching conflict');
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
    reopened.review(); reopened.click('この記録を更新する');
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
