/* eslint-disable @typescript-eslint/no-require-imports -- Offline client-handler regression checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function nodes(node) {
  if (!node || typeof node !== 'object') return [];
  return [node, ...[].concat(node.props?.children || []).flatMap(nodes)];
}
function text(node) {
  if (typeof node === 'string') return node;
  if (!node || typeof node !== 'object') return '';
  return [].concat(node.props?.children || []).map(text).join('');
}
function client(relative, overrides = {}, location = { hash: '', search: '' }) {
  const slots = [], effects = [], timers = new Map(), frames = new Map(), listeners = new Map();
  const pushes = [], focused = [], scrolled = [];
  let cursor = 0, nextTimer = 0, tree;
  const changed = (before, after) => !before || !after || before.length !== after.length || before.some((item, index) => item !== after[index]);
  const react = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useRef(initial) { const index = cursor++; return slots[index] ||= { current: initial }; },
    useEffect(callback, dependencies) { const index = cursor++; if (changed(slots[index]?.dependencies, dependencies)) { const previous = slots[index]; slots[index] = { dependencies }; effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = callback(); }); } },
  };
  const browser = { location, history: { replaceState(_state, _title, hash) { location.hash = hash; } },
    setTimeout(callback) { timers.set(++nextTimer, callback); return nextTimer; }, clearTimeout(id) { timers.delete(id); },
    requestAnimationFrame(callback) { frames.set(++nextTimer, callback); return nextTimer; }, cancelAnimationFrame(id) { frames.delete(id); },
    addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); } };
  const Empty = () => null;
  const exported = {};
  const file = path.resolve(__dirname, '..', relative);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports: exported, URLSearchParams, window: browser, document: { getElementById: id => ({ scrollIntoView() { scrolled.push(id); } }) },
    setTimeout: browser.setTimeout, clearTimeout: browser.clearTimeout, require: id => {
      if (id in overrides) return overrides[id];
      if (id === 'react') return react;
      if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ clinicalStorageOwner: 'guest' }) };
      if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }) };
      if (id === 'next/link' || id.startsWith('@/components/')) return Empty;
      return require(id);
    } }, { filename: file });
  const api = {
    pushes, focused, scrolled, location,
    render(props = {}) { cursor = 0; tree = exported.default(props); for (const node of nodes(tree)) if (node.props?.ref) node.props.ref({ focus: () => focused.push(node.props.id) }); while (effects.length) effects.shift()(); return tree; },
    tree: () => tree,
    flush() { const pending = [...timers.values()]; timers.clear(); pending.forEach(callback => callback()); },
    flushFrames() { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); },
    event(name) { for (const callback of listeners.get(name) || []) callback(); },
    button(label) { const button = nodes(tree).find(node => node.type === 'button' && text(node).includes(label)); assert(button, label); return button; },
    tabs() { return nodes(tree).filter(node => node.props?.role === 'tab'); },
    panels() { return nodes(tree).filter(node => node.props?.role === 'tabpanel'); },
    unmount() { for (const slot of slots) slot?.cleanup?.(); },
    listenerCount(name) { return listeners.get(name)?.size || 0; },
  };
  return api;
}
const simulator = client('src/components/SimulatorHub.tsx');
simulator.render({ relatedArticles: [] });
assert.equal(simulator.tabs().length, 3);
assert.equal(simulator.panels().filter(panel => !panel.props.hidden).length, 1);
assert.equal(simulator.panels()[0].props.hidden, false);
const panelTypes = simulator.panels().map(panel => nodes(panel).map(node => node.type));
simulator.button('条件選択').props.onClick(); simulator.render({ relatedArticles: [] });
assert.equal(simulator.panels()[1].props.hidden, false);
assert.equal(simulator.location.hash, '#condition-training');
assert.equal(simulator.tabs().filter(tab => tab.props.tabIndex === 0).length, 1);
assert.deepEqual(simulator.panels().map(panel => nodes(panel).map(node => node.type)), panelTypes, 'Tab switching keeps all child components mounted');
let prevented = false;
simulator.tabs()[1].props.onKeyDown({ key: 'End', preventDefault() { prevented = true; } }); simulator.render({ relatedArticles: [] });
assert(prevented); assert.equal(simulator.panels()[2].props.hidden, false); assert.equal(simulator.focused.at(-1), 'revision-training-tab');
simulator.tabs()[2].props.onKeyDown({ key: 'ArrowRight', preventDefault() {} }); simulator.render({ relatedArticles: [] });
assert.equal(simulator.panels()[0].props.hidden, false);
simulator.tabs()[0].props.onKeyDown({ key: 'ArrowLeft', preventDefault() {} }); simulator.render({ relatedArticles: [] });
assert.equal(simulator.panels()[2].props.hidden, false);
simulator.tabs()[2].props.onKeyDown({ key: 'Home', preventDefault() {} }); simulator.render({ relatedArticles: [] });
assert.equal(simulator.panels()[0].props.hidden, false);
simulator.location.hash = '#condition-training'; simulator.event('hashchange'); simulator.render({ relatedArticles: [] }); simulator.flushFrames();
assert.equal(simulator.panels()[1].props.hidden, false); assert.equal(simulator.scrolled.at(-1), 'condition-training');
simulator.unmount(); assert.equal(simulator.listenerCount('hashchange'), 0);
for (const target of ['#condition-training', '#revision-training', '#simulator-result']) {
  const deep = client('src/components/SimulatorHub.tsx', {}, { hash: target, search: '' });
  deep.render({ relatedArticles: [] }); deep.flush(); deep.render({ relatedArticles: [] }); deep.flushFrames();
  assert.equal(deep.panels()[target === '#revision-training' ? 2 : 1].props.hidden, false);
}
for (const query of ['fromCase', 'fromDiagnosis', 'fromTsubo']) {
  const deep = client('src/components/SimulatorHub.tsx', {}, { hash: '', search: '?' + query + '=1' });
  deep.render({ relatedArticles: [] }); deep.flush(); deep.render({ relatedArticles: [] });
  assert.equal(deep.panels()[1].props.hidden, false, query + ' incoming link opens the conditions');
}

const point = code => ({ code, role: 'other', reason: '保持する理由', alternative: '保持する代替案' });
let encounter = { patientIdentifier: 'TEST', chiefComplaint: '検証用の主訴', safety: 'reviewed', points: [point('LI4'), point('ST44')] };
let canWrite = true, written = null;
const writes = [];
const bridge = client('src/components/clinical/ClinicalToolBridge.tsx', { '@/utils/clinicalEncounter': {
  readClinicalEncounter: () => ({ encounter }),
  writeClinicalEncounter: next => { if (!canWrite) return false; written = next; writes.push(next); return true; },
} });
const props = { selectedCodes: ['LI4', 'LR3'], editableCodes: ['LI4', 'LR3'] };
bridge.render(props); bridge.flush(); bridge.render(props);
bridge.button('この構成を反映して記録へ戻る').props.onClick();
assert.equal(bridge.pushes.at(-1), '/clinical/workspace'); assert.equal(written.step, 3);
assert.equal(JSON.stringify(written.points.map(item => item.code)), '["LI4","LR3","ST44"]', 'Dictionary points outside the 32-point palette survive');
assert.equal(written.points[0].reason, '保持する理由');
const count = bridge.pushes.length;
canWrite = false; bridge.button('この構成を反映して記録へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('転記を保存できません'));
canWrite = true; encounter = { ...encounter, safety: 'unknown' };
bridge.button('この構成を反映して記録へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('安全確認が未完了'));
encounter = { ...encounter, safety: 'refer' };
bridge.button('この構成を反映して記録へ戻る').props.onClick(); bridge.render(props); assert.equal(bridge.pushes.length, count);
encounter = { ...encounter, safety: 'reviewed', points: Array.from({ length: 12 }, (_, index) => point('ST' + (index + 1))) };
bridge.button('この構成を反映して記録へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('12穴まで'));
encounter = null; bridge.button('この構成を反映して記録へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('下書きが見つかりません'));
assert.equal(writes.length, 1, 'Only a successful safe transfer writes and navigates');
let storageOwner = 'account:A';
let ownerDraft = { patientIdentifier: 'OWNER-A-PRIVATE', chiefComplaint: 'Aの主訴', safety: 'reviewed', points: [point('LI4')] };
let readCount = 0;
const restored = [];
const isolated = client('src/components/clinical/ClinicalToolBridge.tsx', {
  '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({ clinicalStorageOwner: storageOwner }) },
  '@/utils/clinicalEncounter': {
    readClinicalEncounter: () => { readCount++; return { encounter: ownerDraft }; },
    writeClinicalEncounter: () => true,
  },
});
const isolatedProps = { ...props, onRestore: codes => restored.push([...codes]) };
isolated.render(isolatedProps);
assert.equal(nodes(isolated.tree()).some(node => node.props?.role === 'status'), true);
assert(!text(isolated.tree()).includes('OWNER-A-PRIVATE'));
isolated.flush(); isolated.render(isolatedProps);
assert(text(isolated.tree()).includes('OWNER-A-PRIVATE'));
assert.equal(readCount, 1);
storageOwner = null;
isolated.render(isolatedProps); isolated.flush();
assert(!text(isolated.tree()).includes('OWNER-A-PRIVATE'), 'An unresolved actor never renders the previous account draft');
assert.equal(readCount, 1, 'Do not read a namespace before actor resolution');
storageOwner = 'account:B';
ownerDraft = { patientIdentifier: 'OWNER-B-PRIVATE', chiefComplaint: 'Bの主訴', safety: 'reviewed', points: [point('ST36')] };
isolated.render(isolatedProps);
assert(!text(isolated.tree()).includes('OWNER-A-PRIVATE'));
assert(!text(isolated.tree()).includes('OWNER-B-PRIVATE'), 'The new actor waits for a fresh draft read');
isolated.flush(); isolated.render(isolatedProps);
assert(text(isolated.tree()).includes('OWNER-B-PRIVATE'));
assert(!text(isolated.tree()).includes('OWNER-A-PRIVATE'));
assert.equal(readCount, 2);
assert.equal(JSON.stringify(restored), '[["LI4"],["ST36"]]');
storageOwner = 'account:C'; isolated.render(isolatedProps);
storageOwner = 'account:D'; ownerDraft = null; isolated.render(isolatedProps);
isolated.flush(); isolated.render(isolatedProps);
assert.equal(readCount, 3, 'A superseded account read is cancelled before it can restore points');
assert(!text(isolated.tree()).includes('OWNER-A-PRIVATE') && !text(isolated.tree()).includes('OWNER-B-PRIVATE'));
assert(text(isolated.tree()).includes('所見から記録を始める'));
assert.equal(restored.length, 2, 'A missing new-account draft cannot restore the former account points');
const legacyMock = client('src/components/clinical/ClinicalToolBridge.tsx', {
  '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({}) },
  '@/utils/clinicalEncounter': { readClinicalEncounter: () => ({ encounter: null }) },
});
legacyMock.render(); legacyMock.flush(); legacyMock.render();
assert(text(legacyMock.tree()).includes('所見から記録を始める'), 'Legacy mocks without an owner use the guest namespace');
console.log('Clinical exercises passed: persistent three-tab panels, keyboard/hash/query routes, saved point transfer, safety/storage/12-point guards out-of-palette preservation and actor-switch display isolation.');
