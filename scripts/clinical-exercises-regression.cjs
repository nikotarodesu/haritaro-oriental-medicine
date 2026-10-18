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
  const pushes = [], focused = [], scrolled = [], elements = new Map();
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
    pushes, focused, scrolled, location, elements,
    render(props = {}) { cursor = 0; tree = exported.default(props); for (const node of nodes(tree)) if (node.props?.ref) {
      const element = elements.get(node.props.id) || { open: false, focus: () => focused.push(node.props.id) };
      elements.set(node.props.id, element);
      if (typeof node.props.ref === 'function') node.props.ref(element); else node.props.ref.current = element;
    } while (effects.length) effects.shift()(); return tree; },
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
simulator.location.hash = '#comparison-examples'; simulator.event('hashchange'); simulator.render({ relatedArticles: [] }); simulator.flushFrames();
assert.equal(simulator.panels()[1].props.hidden, false);
assert.equal(simulator.elements.get('comparison-examples').open, true);
assert.equal(simulator.scrolled.at(-1), 'comparison-examples');
simulator.unmount(); assert.equal(simulator.listenerCount('hashchange'), 0);
for (const target of ['#condition-training', '#revision-training', '#simulator-result', '#simulator-conditions', '#comparison-examples']) {
  const deep = client('src/components/SimulatorHub.tsx', {}, { hash: target, search: '' });
  deep.render({ relatedArticles: [] }); deep.flush(); deep.render({ relatedArticles: [] }); deep.flushFrames();
  assert.equal(deep.panels()[target === '#revision-training' ? 2 : 1].props.hidden, false);
  if (target === '#comparison-examples') {
    assert.equal(deep.elements.get('comparison-examples').open, true, 'Comparison deep links open the native disclosure');
    assert.equal(deep.scrolled.at(-1), 'comparison-examples');
  }
}
for (const query of ['fromCase', 'fromDiagnosis', 'fromTsubo']) {
  const deep = client('src/components/SimulatorHub.tsx', {}, { hash: '', search: '?' + query + '=1' });
  deep.render({ relatedArticles: [] }); deep.flush(); deep.render({ relatedArticles: [] });
  assert.equal(deep.panels()[1].props.hidden, false, query + ' incoming link opens the conditions');
}


// The extracted comparison keeps all original examples available and obeys memo save outcomes.
let comparisonReady = true, comparisonOwner = 'guest', comparisonCanSave = false;
const comparisonWrites = [];
const examples = client('src/components/learning/ClinicalComparisonExamples.tsx', {
  '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({
    isReady: comparisonReady, clinicalStorageOwner: comparisonOwner,
    addMemo: item => { if (comparisonCanSave) comparisonWrites.push(item); return comparisonCanSave; },
  }) },
});
examples.render();
assert.equal(nodes(examples.tree()).filter(node => node.type === 'button' && 'aria-pressed' in node.props).length, 3);
assert(!nodes(examples.tree()).some(node => node.type === 'h1'), 'Embedded examples have no duplicate page heading');
examples.button('比較例を保存').props.onClick(); examples.render();
assert(text(examples.tree()).includes('保存できませんでした'));
assert.equal(examples.button('比較例を保存').props.disabled, false, 'Rejected memo writes can be retried');
comparisonCanSave = true;
examples.button('比較例を保存').props.onClick(); examples.render();
assert(examples.button('保存済み').props.disabled);
assert.equal(comparisonWrites.length, 1);
assert.equal(comparisonWrites[0].type, 'pair');
assert(comparisonWrites[0].mechanism.includes('【案A】') && comparisonWrites[0].mechanism.includes('【案B】'));
assert.equal(comparisonWrites[0].points.join('・'), '太衝・期門・行間・侠渓');
comparisonOwner = 'account:second'; examples.render();
assert.equal(examples.button('比較例を保存').props.disabled, false, 'Saved display never leaks to a different actor');
comparisonReady = false; examples.render();
assert(examples.button('比較例を保存').props.disabled);
examples.button('比較例を保存').props.onClick(); examples.render();
assert.equal(comparisonWrites.length, 1, 'Unready actors cannot invoke memo writes');
comparisonReady = true;
for (const [label, pattern] of [['肝の鑑別', '肝気鬱結証'], ['脾胃の鑑別', '中気下陥証'], ['腎の鑑別', '腎陰虚証']]) {
  examples.button(label).props.onClick(); examples.render();
  const profiles = nodes(examples.tree()).filter(node => node.props?.profile).map(node => node.props.profile);
  assert.equal(profiles.length, 2);
  assert.equal(profiles[0].pattern, pattern);
  assert(profiles.every(profile => profile.contraindications && profile.needleMethod && profile.primaryPoints.length > 0), 'Every example preserves safety and point content');
  const started = Date.now(), dateBefore = new Date().toLocaleDateString('ja-JP');
  const previousWrites = comparisonWrites.length;
  examples.button('比較例を保存').props.onClick(); examples.render();
  const finished = Date.now(), memo = comparisonWrites.at(-1), dateAfter = new Date().toLocaleDateString('ja-JP');
  assert.equal(comparisonWrites.length, previousWrites + 1, label + ' saves once');
  assert.equal(JSON.stringify(memo.elements), '[]', label + ' invents no five-element attributes');
  assert.equal(memo.indications.join('・'), profiles.map(profile => profile.pattern).join('・'));
  assert.equal(memo.points.join('・'), profiles.flatMap(profile => profile.primaryPoints).join('・'));
  const savedAt = Number(memo.id.replace('compare-', ''));
  assert(savedAt >= started && savedAt <= finished, label + ' uses the actual comparison save time');
  assert([dateBefore, dateAfter].some(date => memo.personalNotes === '比較検討日: ' + date));
  assert(examples.button('保存済み').props.disabled);
  examples.button('保存済み').props.onClick(); examples.render();
  assert.equal(comparisonWrites.length, previousWrites + 1, label + ' cannot re-save a saved selection');
}
let redirected = '';
const aliasPath = path.resolve(__dirname, '../src/app/simulator/compare/page.tsx');
const aliasExports = {};
const aliasCode = ts.transpileModule(fs.readFileSync(aliasPath, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
vm.runInNewContext(aliasCode, { exports: aliasExports, require: id => {
  assert.equal(id, 'next/navigation');
  return { permanentRedirect: href => { redirected = href; } };
} });
aliasExports.default();
assert.equal(redirected, '/simulator#comparison-examples', 'Old comparison URLs permanently reach their new disclosure');
assert(!fs.readFileSync(path.resolve(__dirname, '../src/app/cases/page.tsx'), 'utf8').includes('<ClinicalRevisionTraining'), 'The case catalog does not duplicate revision exercises');

// A rapid hash switch must not scroll to a now-hidden panel or survive unmount.
const rapid = client('src/components/SimulatorHub.tsx');
rapid.render({ relatedArticles: [] }); rapid.flush(); rapid.render({ relatedArticles: [] });
rapid.location.hash = '#comparison-examples'; rapid.event('hashchange');
rapid.location.hash = '#revision-training'; rapid.event('hashchange');
rapid.render({ relatedArticles: [] }); rapid.flushFrames();
assert.equal(rapid.scrolled.join(','), 'revision-training', 'Only the latest hash can scroll');
rapid.location.hash = '#comparison-examples'; rapid.event('hashchange'); rapid.render({ relatedArticles: [] });
rapid.button('症例演習').props.onClick(); rapid.render({ relatedArticles: [] }); rapid.flushFrames();
assert.equal(rapid.scrolled.join(','), 'revision-training', 'Selecting a tab cancels a pending disclosure scroll');
rapid.location.hash = '#comparison-examples'; rapid.event('hashchange');
rapid.location.hash = '#revision-training'; rapid.event('hashchange');
rapid.unmount(); rapid.flushFrames();
assert.equal(rapid.scrolled.join(','), 'revision-training', 'Unmount cancels pending scrolling after rapid hash changes');

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
assert.equal(isolated.tree(), null, 'Do not show a bridge before the current actor draft is resolved');
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
assert.equal(isolated.tree(), null, 'A missing draft has no bridge or create-record promotion');
assert.equal(restored.length, 2, 'A missing new-account draft cannot restore the former account points');
const legacyMock = client('src/components/clinical/ClinicalToolBridge.tsx', {
  '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({}) },
  '@/utils/clinicalEncounter': { readClinicalEncounter: () => ({ encounter: null }) },
});
legacyMock.render(); legacyMock.flush(); legacyMock.render();
assert.equal(legacyMock.tree(), null, 'Legacy mocks without an owner keep an empty guest namespace unobtrusive');
console.log('Clinical exercises passed: embedded comparisons, legacy alias, memo save/retry guards, persistent three-tab panels, keyboard/hash/query routes, saved point transfer, safety/storage/12-point guards out-of-palette preservation and actor-switch display isolation.');
