/* eslint-disable @typescript-eslint/no-require-imports -- Offline client-handler regression checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const children = node => !node || typeof node !== 'object' ? [] : [].concat(node.props?.children || []);
const nodes = node => !node || typeof node !== 'object' ? [] : [node, ...children(node).flatMap(nodes)];
const text = node => typeof node === 'string' ? node : children(node).map(text).join('');
const source = path.resolve(__dirname, '../src/components/clinical/ClinicalToolBridge.tsx');
const code = ts.transpileModule(fs.readFileSync(source, 'utf8'), { fileName: source, compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
} }).outputText;

function bridge({ owner = 'guest', stored = { encounter: null, error: null } } = {}) {
  const slots = [], effects = [], timers = new Map(), pushes = [], restores = [], writes = [];
  let cursor = 0, timerId = 0, tree, reads = 0;
  const exported = {};
  const Empty = () => null;
  const state = { owner, stored, canWrite: true };
  const react = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useEffect(callback, dependencies) {
      const index = cursor++, previous = slots[index];
      if (!previous || dependencies.some((value, position) => value !== previous.dependencies[position])) {
        slots[index] = { dependencies };
        effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = callback(); });
      }
    },
  };
  vm.runInNewContext(code, { exports: exported,
    setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    require(id) {
      if (id === 'react') return react;
      if (id === 'next/link') return Empty;
      if (id === 'next/navigation') return { useRouter: () => ({ push: href => pushes.push(href) }) };
      if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ clinicalStorageOwner: state.owner }) };
      if (id === '@/utils/clinicalEncounter') return {
        readClinicalEncounter() { reads++; return state.stored; },
        writeClinicalEncounter(next) { if (!state.canWrite) return false; writes.push(next); return true; },
      };
      return require(id);
    },
  }, { filename: source });
  const restore = codes => restores.push([...codes]);
  return { state, pushes, restores, writes,
    render(props = {}) { cursor = 0; tree = exported.default({ onRestore: restore, ...props }); while (effects.length) effects.shift()(); return tree; },
    flush() { const pending = [...timers.values()]; timers.clear(); pending.forEach(callback => callback()); },
    tree: () => tree,
    reads: () => reads,
    unmount() { for (const slot of slots) slot?.cleanup?.(); },
  };
}

for (const stored of [
  { encounter: null, error: null },
  { encounter: null, error: '下書きを読み込めません。' },
]) {
  const page = bridge({ stored });
  assert.equal(page.render(), null, 'Ordinary pages do not flash a clinical loading status');
  page.flush();
  assert.equal(page.render(), null, 'No draft means no generic start-record promotion');
  assert.equal(page.reads(), 1);
  assert.equal(page.restores.length, 0);
  assert.equal(page.pushes.length, 0);
}
const unresolved = bridge({ owner: null });
assert.equal(unresolved.render(), null);
unresolved.flush(); assert.equal(unresolved.reads(), 0, 'Unresolved account state must not read another namespace');

const point = code => ({ code, role: 'other', reason: '採用理由', alternative: '変更条件' });
const draft = (id, codes = ['LI4']) => ({ patientIdentifier: id, chiefComplaint: '肩の重さ', safety: 'reviewed', points: codes.map(point) });
const active = bridge({ owner: 'account:A', stored: { encounter: draft('匿名A'), error: null } });
active.render(); active.flush(); active.render();
assert(text(active.tree()).includes('匿名A · 肩の重さ'));
assert(text(active.tree()).includes('記録へ戻る'));
assert(!text(active.tree()).includes('記録を始める'));
assert.equal(nodes(active.tree()).filter(node => node.props?.href === '/clinical/workspace').length, 1);
assert.deepEqual(active.restores, [['LI4']]);
active.state.owner = null;
assert.equal(active.render(), null, 'Account loading immediately hides private draft context');
active.flush(); assert.equal(active.reads(), 1);
active.state.owner = 'account:B'; active.state.stored = { encounter: draft('匿名B', ['ST36']), error: null };
assert.equal(active.render(), null);
active.state.owner = 'account:C'; active.state.stored = { encounter: null, error: null };
assert.equal(active.render(), null); active.flush();
assert.equal(active.render(), null);
assert.equal(active.reads(), 2, 'Superseded account reads are cancelled');
assert.deepEqual(active.restores, [['LI4']], 'Missing new-account drafts cannot restore old selections');
active.state.owner = 'account:D'; active.state.stored = { encounter: draft('匿名D', ['SP6']), error: null };
active.render(); active.unmount(); active.flush();
assert.equal(active.reads(), 2, 'Unmounting cancels a pending draft restore');

const selection = bridge({ stored: { encounter: draft('転記用', ['LI4', 'ST44']), error: null } });
const props = { selectedCodes: ['LI4', 'LR3'], editableCodes: ['LI4', 'LR3'] };
selection.render(props); selection.flush(); selection.render(props);
const importButton = () => nodes(selection.tree()).find(node => node.type === 'button');
selection.state.canWrite = false; importButton().props.onClick(); selection.render(props);
assert.equal(selection.pushes.length, 0, 'A failed save keeps the current page and draft intact');
assert(text(selection.tree()).includes('転記を保存できません'));
selection.state.canWrite = true; importButton().props.onClick();
assert.equal(selection.pushes.at(-1), '/clinical/workspace');
assert.equal(selection.writes.length, 1);
assert.equal(JSON.stringify(selection.writes[0].points.map(item => item.code)), '["LI4","LR3","ST44"]');
assert.equal(selection.writes[0].points[0].reason, '採用理由');
console.log('Contextual clinical bridge passed: hidden absent/loading/error states, verified draft return, cancelled account reads and safe point transfer.');
