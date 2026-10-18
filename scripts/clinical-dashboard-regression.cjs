/* eslint-disable @typescript-eslint/no-require-imports -- Exercise real dashboard actions against isolated draft storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const base = createDataLoader({ Intl })('src/utils/clinicalEncounter');
const componentFile = path.join(root, 'src/components/clinical/ClinicalDashboard.tsx');
const componentCode = ts.transpileModule(fs.readFileSync(componentFile, 'utf8'), { fileName: componentFile,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const plain = value => JSON.parse(JSON.stringify(value));
function sampleEncounter(patch = {}) {
  return { ...base.emptyClinicalEncounter(), savedNoteId: 'pn_existing', patientIdentifier: 'TEST-A', chiefComplaint: '首の痛み', visitDate: '2026-10-18', safety: 'reviewed', observations: { fatigue: 'present' }, candidateIds: ['liver-qi'], points: [{ code: 'LI4', role: 'branch', reason: '前回の検討', alternative: '再確認' }], metric: '右回旋時の痛み', before: '6', after: '3', nextAction: '次回の動作確認', ...patch };
}
function sampleNote(id, patch = {}) {
  return { ...base.clinicalEncounterNote(sampleEncounter(), ['合谷']), id, createdAt: 1, updatedAt: 2, ...patch };
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
function harness({ initialDraft = null, notes = [], confirm = true, readFail = false, writeFail = false } = {}) {
  const values = new Map(initialDraft ? [[base.CLINICAL_ENCOUNTER_KEY, JSON.stringify(initialDraft)]] : []);
  const writes = [], pushes = [], prompts = [], state = [], timers = [], events = new Map();
  const flags = { confirm, readFail, writeFail };
  let cursor = 0, tree;
  const storage = {
    getItem(key) { if (flags.readFail) throw Error('storage unavailable'); return values.get(key) ?? null; },
    setItem(key, value) { if (flags.writeFail) throw Error('storage unavailable'); writes.push({ key, value }); values.set(key, value); },
  };
  const browser = { confirm(message) { prompts.push(message); return flags.confirm; }, addEventListener(name, callback) { events.set(name, callback); }, removeEventListener(name) { events.delete(name); } };
  const localLoad = createDataLoader({ Intl, sessionStorage: storage, window: browser });
  const hooks = { ...React,
    useState(initial) { const index = cursor++; if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial; return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value; }]; },
    useEffect(effect) { const index = cursor++; if (!(index in state)) { state[index] = true; effect(); } },
  };
  const Link = () => null, componentExports = {};
  vm.runInNewContext(componentCode, { exports: componentExports, window: browser, setTimeout(callback) { timers.push(callback); return timers.length; }, clearTimeout() {}, require: id => {
    if (id === 'react') return hooks;
    if (id === 'next/link') return { __esModule: true, default: Link };
    if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }) };
    if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ patientNotes: notes }) };
    if (id === './ClinicalArtwork') return { ClinicalHeroArtwork: () => null, ClinicalComplaintIcon: () => null };
    if (id.startsWith('@/')) return localLoad('src/' + id.slice(2));
    return require(id);
  } }, { filename: componentFile });
  function render() { cursor = 0; tree = componentExports.default(); return tree; }
  render(); while (timers.length) timers.shift()(); render();
  return { flags, values, writes, pushes, prompts, render, tree: () => tree,
    readDraft: () => JSON.parse(values.get(base.CLINICAL_ENCOUNTER_KEY) || 'null'),
    button(label) { const button = nodes(tree).find(node => node.type === 'button' && text(node).includes(label)); assert(button, 'Available dashboard action: ' + label); return button; },
    recentButtons() { return nodes(tree).filter(node => node.type === 'button' && node.props.className === 'clinical-recent-card'); },
  };
}
const original = sampleEncounter();
let view = harness({ initialDraft: original });
const resume = nodes(view.tree()).find(node => node.props?.href === '/clinical/workspace' && text(node).includes('下書きを再開'));
assert(resume && resume.props['data-primary'] === 'true', 'Existing drafts get the primary resume link');
assert.equal(view.button('新しい記録').props['data-primary'], false);
assert.equal(view.writes.length, 0, 'Displaying or resuming a draft never replaces it');

view = harness();
assert.equal(view.button('新しい記録').props.disabled, false, 'New-record action becomes available after the draft check');
view.button('新しい記録').props.onClick();
assert.equal(view.prompts.length, 0);
assert.equal(view.readDraft().patientIdentifier, '');
assert.equal(view.readDraft().safety, 'unknown');
assert.deepEqual(view.pushes, ['/clinical/workspace']);

view = harness({ initialDraft: original, confirm: false });
view.button('新しい記録').props.onClick();
assert.match(view.prompts[0], /下書き/);
assert.equal(view.writes.length, 0);
assert.deepEqual(view.pushes, []);
assert.deepEqual(view.readDraft(), plain(original), 'Cancel preserves every original draft field');

view = harness({ initialDraft: original });
view.button('新しい記録').props.onClick();
assert.equal(view.readDraft().patientIdentifier, '');
assert.equal(view.readDraft().savedNoteId, undefined);
assert.deepEqual(view.readDraft().observations, {});
assert.deepEqual(view.readDraft().points, []);
assert.equal(view.readDraft().safety, 'unknown');
assert.deepEqual(view.pushes, ['/clinical/workspace']);

view = harness({ initialDraft: original, readFail: true });
view.button('新しい記録').props.onClick();
view.render();
assert.equal(view.writes.length, 0, 'Unreadable draft storage must never be overwritten');
assert.equal(view.prompts.length, 0);
assert.deepEqual(view.pushes, []);
assert(nodes(view.tree()).some(node => node.props?.role === 'alert' && /下書き/.test(text(node))));

view = harness({ initialDraft: original, writeFail: true });
view.button('新しい記録').props.onClick();
view.render();
assert.deepEqual(view.readDraft(), plain(original), 'A failed replacement retains the old draft');
assert.deepEqual(view.pushes, [], 'Failed draft persistence never navigates to an apparently new record');
assert(nodes(view.tree()).some(node => node.props?.role === 'alert' && /保存できません/.test(text(node))));

const note = sampleNote('pn_previous');
view = harness({ initialDraft: original, notes: [note], confirm: false });
view.recentButtons()[0].props.onClick();
assert.match(view.prompts[0], /下書きを置き換え/);
assert.equal(view.writes.length, 0);
assert.deepEqual(view.readDraft(), plain(original));

view = harness({ initialDraft: original, notes: [note], writeFail: true });
view.recentButtons()[0].props.onClick();
assert.deepEqual(view.pushes, []);
assert.deepEqual(view.readDraft(), plain(original));

view = harness({ initialDraft: original, notes: [note] });
view.recentButtons()[0].props.onClick();
const followup = view.readDraft();
assert.equal(followup.patientIdentifier, note.patientIdentifier);
assert.equal(followup.metric, '右回旋時の痛み');
assert.match(followup.previousSummary, /次回の動作確認/);
assert.equal(followup.savedNoteId, undefined, 'A follow-up creates a new visit rather than updating the previous saved note');
assert.equal(followup.safety, 'unknown');
assert.deepEqual(followup.observations, {}, 'Prior findings and safety decisions require fresh confirmation');
assert.deepEqual(followup.points, []);
assert.deepEqual(view.pushes, ['/clinical/workspace']);

const notes = [
  sampleNote('a-old-edited', { patientIdentifier: 'TEST-A', visitDate: '2026-10-01', updatedAt: 9999, chiefComplaint: '古い来院' }),
  sampleNote('a-new', { patientIdentifier: 'TEST-A', visitDate: '2026-10-18', updatedAt: 4, chiefComplaint: '最新の来院' }),
  sampleNote('b-earlier-edit', { patientIdentifier: 'TEST-B', visitDate: '2026-10-17', updatedAt: 10, chiefComplaint: '同日編集前' }),
  sampleNote('b-latest-edit', { patientIdentifier: 'TEST-B', visitDate: '2026-10-17', updatedAt: 11, chiefComplaint: '同日編集後' }),
  sampleNote('c', { patientIdentifier: 'TEST-C', visitDate: '2026-10-16' }),
  sampleNote('d', { patientIdentifier: 'TEST-D', visitDate: '2026-10-15' }),
];
const snapshot = JSON.stringify(notes);
view = harness({ notes });
const recent = view.recentButtons();
assert.equal(recent.length, 3, 'Three distinct anonymous IDs remain reachable even with multiple visits');
assert.match(text(recent[0]), /TEST-A.*最新の来院/);
assert.match(text(recent[1]), /TEST-B.*同日編集後/);
assert.match(text(recent[2]), /TEST-C/);
recent[1].props.onClick();
assert.match(view.readDraft().previousSummary, /2026-10-17/);
assert.equal(view.readDraft().chiefComplaint, '同日編集後');
assert.equal(JSON.stringify(notes), snapshot, 'Sorting and selecting a follow-up never mutate saved notes');
console.log('Clinical dashboard regression passed: protected draft start/resume, persistence failures, fresh follow-up safety, and latest visit per anonymous ID.');
