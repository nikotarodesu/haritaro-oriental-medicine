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


// The embedded comparison preserves the three exercises after note retirement.
const examples = client('src/components/learning/ClinicalComparisonExamples.tsx');
examples.render();
assert.equal(nodes(examples.tree()).filter(node => node.type === 'button' && 'aria-pressed' in node.props).length, 3);
assert(!nodes(examples.tree()).some(node => node.type === 'h1'), 'Embedded examples have no duplicate page heading');
assert(!nodes(examples.tree()).some(node => node.type === 'button' && text(node).includes('保存')));
for (const [label, pattern] of [['肝の鑑別', '肝気鬱結証'], ['脾胃の鑑別', '中気下陥証'], ['腎の鑑別', '腎陰虚証']]) {
  examples.button(label).props.onClick(); examples.render();
  const profiles = nodes(examples.tree()).filter(node => node.props?.profile).map(node => node.props.profile);
  assert.equal(profiles.length, 2);
  assert.equal(profiles[0].pattern, pattern);
  assert(profiles.every(profile => profile.contraindications && profile.needleMethod && profile.primaryPoints.length > 0), 'Every example preserves safety and point content');
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
  readClinicalEncounter: owner => { assert.equal(owner, 'guest'); return { encounter }; },
  writeClinicalEncounter: (next, owner) => { assert.equal(owner, 'guest'); if (!canWrite) return false; written = next; writes.push(next); return true; },
} });
const props = { selectedCodes: ['LI4', 'LR3'], editableCodes: ['LI4', 'LR3'] };
bridge.render(props); bridge.flush(); bridge.render(props);
bridge.button('この構成を反映して作業画面へ戻る').props.onClick();
assert.equal(bridge.pushes.at(-1), '/clinical/workspace'); assert.equal(written.step, 3);
assert.equal(JSON.stringify(written.points.map(item => item.code)), '["LI4","LR3","ST44"]', 'Dictionary points outside the 32-point palette survive');
assert.equal(written.points[0].reason, '保持する理由');
const count = bridge.pushes.length;
canWrite = false; bridge.button('この構成を反映して作業画面へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('下書きに反映できませんでした'));
canWrite = true; encounter = { ...encounter, safety: 'unknown' };
bridge.button('この構成を反映して作業画面へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('安全確認が未完了'));
encounter = { ...encounter, safety: 'refer' };
bridge.button('この構成を反映して作業画面へ戻る').props.onClick(); bridge.render(props); assert.equal(bridge.pushes.length, count);
encounter = { ...encounter, safety: 'reviewed', points: Array.from({ length: 12 }, (_, index) => point('ST' + (index + 1))) };
bridge.button('この構成を反映して作業画面へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('12穴まで'));
encounter = null; bridge.button('この構成を反映して作業画面へ戻る').props.onClick(); bridge.render(props);
assert.equal(bridge.pushes.length, count); assert(text(bridge.tree()).includes('下書きが見つかりません'));
assert.equal(writes.length, 1, 'Only a successful safe transfer writes and navigates');
const restored = [];
const cleanDraft = client('src/components/clinical/ClinicalToolBridge.tsx', {
  '@/utils/clinicalEncounter': {
    readClinicalEncounter: owner => { assert.equal(owner, 'guest'); return { encounter: { ...props, patientIdentifier: 'TEST-GUEST', points: [point('ST36')] } }; },
  },
});
const cleanProps = { ...props, onRestore: codes => restored.push([...codes]) };
cleanDraft.render(cleanProps);
assert.equal(cleanDraft.tree(), null, 'Do not show a bridge until the session draft is read');
cleanDraft.flush(); cleanDraft.render(cleanProps);
assert(text(cleanDraft.tree()).includes('TEST-GUEST'));
assert.equal(JSON.stringify(restored), '[["ST36"]]');
const unavailable = client('src/components/clinical/ClinicalToolBridge.tsx', {
  '@/utils/clinicalEncounter': { readClinicalEncounter: () => ({ encounter: null }) },
});
unavailable.render(); unavailable.flush(); unavailable.render();
assert.equal(unavailable.tree(), null, 'A missing session draft has no bridge or create-record promotion');

const diagnosisData = {};
const diagnosisPath = path.resolve(__dirname, '../src/data/diagnosisData.ts');
const diagnosisCode = ts.transpileModule(fs.readFileSync(diagnosisPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
vm.runInNewContext(diagnosisCode, { exports: diagnosisData });
const check = client('src/components/diagnosis/DiagnosisClient.tsx', {
  '@/config/acupunctureLearning': { PATTERN_AGREEMENT_HREF: '/library' },
  './ClinicalInterviewBoard': () => null,
  '@/data/acupointLookup': { ACUPOINT_LOOKUP: [] },
  '@/data/diagnosisData': diagnosisData,
  '@/utils/clinicalEncounter': {},
  '@/utils/clinicalInterview': {},
  '@/utils/analytics': { trackEvent() {} },
});
const checkProps = { relatedArticles: [], studyLinks: {} };
const checkResults = () => {
  check.button('回答に関連する分類を見る').props.onClick();
  check.render(checkProps);
};
const resultHeadings = () => nodes(check.tree()).filter(node => node.type === 'h2').map(text);
check.render(checkProps);
checkResults();
assert(resultHeadings().includes('選んだ項目はありません'));
check.button('朝起きたときに体が重く').props.onClick(); check.render(checkProps);
checkResults();
assert(resultHeadings().includes('気虚（ききょ）'), 'One match immediately opens that classification');
check.button('ため息がよく出た').props.onClick(); check.render(checkProps);
checkResults();
assert(resultHeadings().includes('同じ数の項目を選んだ分類'), 'Tied results present both choices before opening a classification');
assert.equal(check.button('気虚').props['aria-pressed'], false);
assert.equal(check.button('気滞').props['aria-pressed'], false);
check.button('気滞').props.onClick(); check.render(checkProps);
assert.equal(check.button('気滞').props['aria-pressed'], true);
assert(resultHeadings().includes('気滞（きたい）'));
check.button('気虚').props.onClick(); check.render(checkProps);
assert(resultHeadings().includes('気虚（ききょ）'));
check.button('ため息がよく出た').props.onClick(); check.render(checkProps);
assert(!resultHeadings().includes('同じ数の項目を選んだ分類'), 'Changing an answer invalidates the prior result');

const caseData = {};
const casePath = path.resolve(__dirname, '../src/data/clinicalCasesData.ts');
const caseCode = ts.transpileModule(fs.readFileSync(casePath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
vm.runInNewContext(caseCode, { exports: caseData, require: () => ({ KNEE_POINT_COMPARISON_HREF: '/tsubo' }) });
const firstQuestions = caseData.CLINICAL_CASES.map(item => item.reasoningSteps[0]);
assert.equal(new Set(firstQuestions.map(step => step.question)).size, 20);
assert.equal(new Set(firstQuestions.map(step => step.options.findIndex(option => option.isCorrect))).size, 3);
for (const clinicalCase of caseData.CLINICAL_CASES) {
  const answer = clinicalCase.reasoningSteps[0].options.find(option => option.isCorrect);
  assert.equal(answer.id, 'safety-1', 'Stored answers retain their original ID');
  assert.notEqual(answer.feedback, caseData.CLINICAL_CASE_SAFETY_GUIDANCE[clinicalCase.id].message);
}
console.log('Clinical exercises passed: comparison sets, persistent exercise tabs, safe draft transfer, tied self-check results, and 20 case-specific safety questions.');
