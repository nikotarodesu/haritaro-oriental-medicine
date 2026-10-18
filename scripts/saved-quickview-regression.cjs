/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the actual recent-record view without reading or writing real user data. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = path.resolve(__dirname, '../src/components/MyClinicalRecordDrawer.tsx');
const code = ts.transpileModule(fs.readFileSync(source, 'utf8'), { fileName: source,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
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
function harness(patch = {}) {
  const context = { memos: [], patientNotes: [], isDrawerOpen: true, isReady: true, clinicalStorageOwner: 'guest', syncStatus: 'local', ...patch };
  let closes = 0, pathname = '/tsubo/li4', cursor = 0, tree;
  const slots = [], effects = [], modalCalls = [];
  context.closeDrawer = () => { closes++; context.isDrawerOpen = false; };
  const changed = (previous, deps) => !previous || deps.some((item, index) => !Object.is(item, previous[index]));
  const hooks = { ...React,
    useRef(initial) { const index = cursor++; return slots[index] ||= { current: initial }; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { deps, value: compute() }; return slots[index].value; },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { slots[index] = { deps }; effects.push(effect); } },
  };
  const component = {};
  vm.runInNewContext(code, { exports: component, Intl, require(id) {
    if (id === 'react') return hooks;
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id === 'next/navigation') return { usePathname: () => pathname };
    if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => context };
    if (id === '@/hooks/useModalDialog') return { useModalDialog: (open, ref, close) => modalCalls.push({ open, ref, close }) };
    return require(id);
  } });
  function render() { cursor = 0; tree = component.default(); return tree; }
  function flush() { while (effects.length) effects.shift()(); }
  render(); flush();
  return { context, modalCalls, render, flush, tree: () => tree, closes: () => closes, pathname: value => { pathname = value; } };
}
const stock = (id, updatedAt, createdAt = 1) => ({ id, title: '保存した経穴 ' + id, updatedAt, createdAt });
const note = (id, updatedAt) => ({ id, chiefComplaint: '保存した主訴 ' + id, patientIdentifier: 'TEST-' + id, updatedAt, createdAt: 1 });
const memos = [stock('old', 1), stock('newest', 90), stock('middle', 40), stock('older', 20)];
const patientNotes = [note('new-note', 80), note('middle-note', 50), note('old-note', 10)];
const original = JSON.stringify({ memos, patientNotes });
let view = harness({ memos, patientNotes });
let rows = nodes(view.tree()).filter(node => node.type === 'li');
assert.equal(rows.length, 5, 'Mixed saved records are limited to the latest five total');
assert.deepEqual(rows.map(row => text(nodes(row).find(node => node.type === 'h3'))), ['保存した経穴 newest', '保存した主訴 new-note', '保存した主訴 middle-note', '保存した経穴 middle', '保存した経穴 older']);
assert.equal(JSON.stringify({ memos, patientNotes }), original, 'Displaying and sorting never mutate existing stored arrays');
assert.equal(nodes(view.tree()).filter(node => node.props?.href === '/notes').length, 1, 'One notebook entry replaces the duplicate management interface');
assert.equal(nodes(view.tree()).filter(node => ['input', 'textarea', 'select', 'form'].includes(node.type)).length, 0);
const dialog = nodes(view.tree()).find(node => node.props?.role === 'dialog');
assert.equal(dialog.props['aria-modal'], 'true');
assert(nodes(view.tree()).some(node => node.props?.id === dialog.props['aria-labelledby']));
assert(view.modalCalls.at(-1).open && view.modalCalls.at(-1).ref === dialog.props.ref);
const close = nodes(view.tree()).find(node => node.type === 'button');
assert(close.props['data-modal-autofocus']); close.props.onClick();
assert.equal(view.closes(), 1); assert.equal(view.render(), null);

for (const identity of [{ isReady: false }, { clinicalStorageOwner: null }, { isReady: false, syncStatus: 'offline' }]) {
  view = harness({ memos, patientNotes, ...identity });
  assert(!text(view.tree()).includes('保存した経穴') && !text(view.tree()).includes('TEST-'), 'Unverified records and anonymous identifiers never render');
  assert(nodes(view.tree()).some(node => node.props?.role === (identity.syncStatus === 'offline' ? 'alert' : 'status')));
  assert(nodes(view.tree()).some(node => node.props?.href === '/notes'), 'Recovery remains reachable while records are blocked');
}
view = harness();
assert.match(text(view.tree()), /保存した記録はまだありません/);
assert.equal(nodes(view.tree()).filter(node => node.type === 'a' || node.props?.href).length, 1, 'Empty state has a single next action');

view = harness({ memos, patientNotes });
view.context.isReady = false; view.context.clinicalStorageOwner = null;
view.render();
assert(!text(view.tree()).includes('保存した経穴'), 'Account transitions mask data in the first render before effects');
view.flush(); assert.equal(view.closes(), 1); assert.equal(view.render(), null);
view.context.clinicalStorageOwner = 'account-b'; view.context.memos = []; view.context.patientNotes = []; view.context.isReady = true;
view.render(); view.flush(); view.context.isDrawerOpen = true; view.render(); view.flush();
assert(!text(view.tree()).includes('保存した経穴') && text(view.tree()).includes('まだありません'), 'Reopening under another owner retains no earlier snapshot');

view = harness({ memos }); view.pathname('/notes'); view.render(); view.flush();
assert.equal(view.closes(), 1, 'Route navigation closes the quick view');
view = harness({ memos }); nodes(view.tree()).find(node => node.props?.href === '/notes').props.onClick();
assert.equal(view.closes(), 1, 'Notebook navigation closes the modal');
view = harness({ memos: [stock('invalid', Infinity, NaN), stock('too-large', 9e99, 2)] });
assert.doesNotThrow(() => renderToStaticMarkup(view.tree()), 'Invalid legacy dates never prevent opening saved records');
console.log('Saved quick view passed: latest five mixed records, unchanged storage, concise management handoff, readiness/account isolation, route closure, dialog integration and invalid-date recovery.');
