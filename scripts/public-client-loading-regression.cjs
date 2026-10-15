/* eslint-disable @typescript-eslint/no-require-imports -- Offline async-provider and bundle-boundary regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader();
const userA = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const userB = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
const settle = () => new Promise(resolve => setTimeout(resolve, 5));

function providerHarness(file, component, overrides, storage = new Map()) {
  const slots = [], scheduled = [], listeners = new Map();
  let cursor = 0;
  const changed = (previous, deps) => !previous || !deps || deps.length !== previous.length || deps.some((item, index) => !Object.is(item, previous[index]));
  const react = { ...React,
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial }; return [slots[index].value, next => { slots[index].value = typeof next === 'function' ? next(slots[index].value) : next; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useMemo(compute, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) slots[index] = { value: compute(), deps }; return slots[index].value; },
    useCallback(callback, deps) { return react.useMemo(() => callback, deps); },
    useEffect(effect, deps) { const index = cursor++; if (changed(slots[index]?.deps, deps)) { const previous = slots[index]; slots[index] = { deps }; scheduled.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); }); } },
  };
  const localStorage = { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) };
  const exports = {};
  const source = path.join(root, file);
  const js = ts.transpileModule(fs.readFileSync(source, 'utf8'), { fileName: source, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, { exports, require: id => id === 'react' ? react : Object.hasOwn(overrides, id) ? overrides[id] : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id),
    URL, Date, console, crypto, localStorage, sessionStorage: localStorage, setTimeout, clearTimeout, setInterval, clearInterval,
    window: { location: { origin: 'https://www.haritaro.jp' }, addEventListener(name, handler) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(handler); }, removeEventListener(name, handler) { listeners.get(name)?.delete(handler); } },
  }, { filename: source });
  return {
    render() { cursor = 0; const tree = exports[component]({ children: null }); while (scheduled.length) scheduled.shift()(); return tree.props.value; },
    event(name) { for (const listener of listeners.get(name) || []) listener({}); },
    unmount() { for (const slot of slots) slot?.cleanup?.(); },
  };
}

async function authLoading() {
  const sdk = deferred(), identity = deferred();
  let callback, subscriptions = 0, unsubscribed = 0, loadCount = 0;
  let getUser = () => identity.promise;
  const client = { auth: { getUser: () => getUser(), onAuthStateChange(handler) { callback = handler; subscriptions++; return { data: { subscription: { unsubscribe() { unsubscribed++; } } } }; }, signOut: async () => ({ error: null }) } };
  const app = providerHarness('src/contexts/AuthContext.tsx', 'AuthProvider', { '@/lib/supabase/browser': { isSupabaseConfigured: () => true, loadBrowserClient: () => { loadCount++; return sdk.promise; } } });
  try {
    assert.equal(app.render().isLoading, true);
    assert.equal(loadCount, 1, 'Identity restoration starts immediately without an idle delay');
    await settle();
    assert.equal(app.render().isLoading, true, 'Loading the SDK must not expose guest state as ready');
    sdk.resolve(client); await settle();
    assert.equal(subscriptions, 1, 'Subscribe immediately once the existing singleton is available');
    assert.equal(app.render().isLoading, true, 'Loading stays pending through server identity verification');
    identity.resolve({ data: { user: { id: userA, app_metadata: { role: 'premium', subscription: { status: 'active', currentPeriodEnd: Date.now() + 60000 } }, user_metadata: { role: 'admin' }, created_at: '2026-10-01' } }, error: null });
    await settle();
    let state = app.render();
    assert.equal(state.user.id, userA);
    assert.equal(state.user.role, 'premium', 'Only server-owned role metadata controls access');
    assert.equal(state.isPremium, true);
    assert.equal(state.isLoading, false);
    callback('SIGNED_OUT', null);
    assert.equal(app.render().user, null, 'Sign-out still clears the active identity');
    getUser = async () => ({ data: { user: { id: userB, app_metadata: { role: 'free' }, user_metadata: {}, created_at: '2026-10-01' } }, error: null });
    callback('SIGNED_IN', { user: { id: userB } }); await settle();
    state = app.render();
    assert.equal(state.user.id, userB, 'An account switch still verifies the new identity');
    assert.equal(state.isPremium, false);
    assert.equal(subscriptions, 1, 'Restoration and account switches reuse the subscription');
  } finally { app.unmount(); }
  assert.equal(unsubscribed, 1);

  const pending = deferred(); let lateSubscriptions = 0;
  const unmounted = providerHarness('src/contexts/AuthContext.tsx', 'AuthProvider', { '@/lib/supabase/browser': { isSupabaseConfigured: () => true, loadBrowserClient: () => pending.promise } });
  unmounted.render(); unmounted.unmount();
  pending.resolve({ auth: { onAuthStateChange() { lateSubscriptions++; }, getUser: async () => ({ data: { user: null } }) } }); await settle();
  assert.equal(lateSubscriptions, 0, 'A late SDK load cannot subscribe after unmount');

  let attempts = 0, recoveredSubscriptions = 0;
  const retry = providerHarness('src/contexts/AuthContext.tsx', 'AuthProvider', { '@/lib/supabase/browser': { isSupabaseConfigured: () => true, loadBrowserClient: async () => { if (++attempts === 1) throw new Error('chunk unavailable'); return { auth: { getUser: async () => ({ data: { user: null }, error: null }), onAuthStateChange() { recoveredSubscriptions++; return { data: { subscription: { unsubscribe() {} } } }; } } }; } } });
  try {
    retry.render(); await settle(); assert.equal(retry.render().isLoading, false);
    retry.event('focus'); await settle();
    assert.equal(recoveredSubscriptions, 1, 'A later focus can recover both loading and the auth subscription');
  } finally { retry.unmount(); }

  const unconfigured = providerHarness('src/contexts/AuthContext.tsx', 'AuthProvider', { '@/lib/supabase/browser': { isSupabaseConfigured: () => false, loadBrowserClient() { throw new Error('Unconfigured pages must not load the SDK'); } } });
  try { unconfigured.render(); await settle(); assert.equal(unconfigured.render().isLoading, false); } finally { unconfigured.unmount(); }
}

async function learningLoading(switchAccount) {
  const sdk = deferred(), storage = new Map(), writes = [], reads = [];
  let auth = { user: { id: userA }, isLoading: false }, identityCalls = 0;
  const app = providerHarness('src/contexts/LearningSyncContext.tsx', 'LearningSyncProvider', {
    '@/contexts/AuthContext': { useAuth: () => auth },
    '@/lib/supabase/browser': { loadBrowserClient: () => sdk.promise },
    '@/utils/learningStorageBridge': { setLearningStorageAdapter() {} },
  }, storage);
  const client = { auth: { getUser: async () => { identityCalls++; return { data: { user: auth.user }, error: null }; } },
    from(name) { assert.equal(name, 'learning_entries'); return { select() { return this; }, eq(column, owner) { assert.equal(column, 'user_id'); reads.push(owner); return this; }, order() { return this; }, range: async () => ({ data: [], error: null }) }; },
    rpc: async (name, params) => { assert.equal(name, 'sync_learning_entries'); writes.push(...params.entries.map(entry => ({ owner: auth.user.id, ...entry }))); return { data: params.entries, error: null }; },
  };
  try {
    app.render(); await settle();
    let current = app.render(); assert.equal(current.ready, true, 'Account-local history is ready while the cloud SDK loads');
    current.setEntry('lecture:before-load', true);
    assert.equal(app.render().values['lecture:before-load'], true, 'Local progress saves immediately without waiting for SDK loading');
    if (switchAccount) {
      auth = { user: { id: userB }, isLoading: false };
      assert.equal(app.render().ready, false, 'Prior account data is not shown during a switch');
      await settle(); current = app.render();
      assert.equal(current.values['lecture:before-load'], undefined);
      current.setEntry('lecture:account-b', true);
    }
    sdk.resolve(client); await settle(); app.render();
    if (switchAccount) {
      assert.equal(identityCalls, 1, 'Stale account work stops before identity verification or remote access');
      assert.deepEqual(reads, [userB]);
      assert(writes.every(item => item.owner === userB && item.entry_key !== 'lecture:before-load'));
      assert.equal(JSON.parse(storage.get('haritaro-learning-v2:' + userA))['lecture:before-load'].value, true);
    } else {
      assert(writes.some(item => item.owner === userA && item.entry_key === 'lecture:before-load' && item.value === true), 'An update made while loading is included in the initial cloud merge');
    }
  } finally { app.unmount(); }
}

async function lazyClinicalOperations() {
  const calls = [], exports = {};
  const source = 'src/lib/supabase/lazyClinicalMemosDb.ts';
  const js = ts.transpileModule(fs.readFileSync(source, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const db = { upsertPatientNoteToSupabase(...args) { calls.push({ method: 'upsertPatientNoteToSupabase', args }); return Promise.resolve(true); } };
  vm.runInNewContext(js, { exports, require: id => { assert.equal(id, './clinicalMemosDb'); return db; } });
  const note = { id: 'note' };
  const operation = exports.upsertPatientNoteToSupabase(userA, note);
  assert.equal(calls.length, 0, 'Cloud code is not evaluated synchronously in the local save handler');
  assert.equal(await operation, true);
  assert.equal(calls[0].args[0], userA);
  assert.equal(calls[0].args[1], note, 'The saved record is passed unchanged');
}

function staticBoundaries() {
  const seen = new Set();
  function visit(file) {
    file = path.resolve(root, file);
    if (!path.extname(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
    if (seen.has(file) || file.endsWith('.json')) return;
    seen.add(file);
    assert(!file.endsWith(path.normalize('supabase/client.ts')) && !file.endsWith(path.normalize('supabase/clinicalMemosDb.ts')), 'Provider static dependencies exclude the cloud runtime: ' + file);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    for (const node of ast.statements) {
      if (!(ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) || !node.moduleSpecifier || node.isTypeOnly || node.importClause?.isTypeOnly) continue;
      const bindings = node.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings) && !node.importClause.name && bindings.elements.every(item => item.isTypeOnly)) continue;
      const id = node.moduleSpecifier.text;
      assert(!id.startsWith('@supabase/'), 'SDK import belongs behind a dynamic boundary: ' + file);
      if (id.startsWith('@/')) visit('src/' + id.slice(2));
      else if (id.startsWith('.')) visit(path.resolve(path.dirname(file), id));
    }
  }
  for (const source of ['src/contexts/AuthContext.tsx', 'src/contexts/LearningSyncContext.tsx', 'src/contexts/ClinicalMemoContext.tsx']) visit(source);
}

function buildMeasurements() {
  const measurements = [];
  for (const route of ['/', '/learn', '/curriculum/lecture-intro-1', '/tsubo/li4', '/articles/science-of-yinyang-gogyo']) {
    const html = fs.readFileSync(path.join(root, '.next/server/app', (route === '/' ? 'index' : route.slice(1)) + '.html'), 'utf8');
    const scripts = [...new Set([...html.matchAll(/<script\b[^>]*>/g)].filter(match => !/nomodule/i.test(match[0])).flatMap(match => match[0].match(/src="\/_next\/([^"?]+)/)?.slice(1) || []))];
    let rawBytes = 0, gzipBytes = 0;
    for (const script of scripts) {
      const bytes = fs.readFileSync(path.join(root, '.next', decodeURIComponent(script)));
      assert(!bytes.includes('AuthApiError') && !bytes.includes('auth/v1'), route + ': initial scripts exclude the dynamically loaded authentication SDK');
      rawBytes += bytes.length; gzipBytes += zlib.gzipSync(bytes).length;
    }
    measurements.push({ route, scriptCount: scripts.length, rawBytes, gzipBytes });
  }
  console.log(JSON.stringify({ note: 'Modern initial script tags in the local build; gzip estimates, not total post-hydration downloads or speed scores.', measurements }, null, 2));
}

const deadline = setTimeout(() => { console.error('Provider loading regression timed out while awaiting an unresolved async operation.'); process.exit(1); }, 15000);
(async () => {
  staticBoundaries();
  await authLoading();
  await learningLoading(false);
  await learningLoading(true);
  await lazyClinicalOperations();
  if (process.argv.includes('--build-output')) buildMeasurements();
  console.log('PASS: deferred SDK boundary, verified auth readiness/subscription/recovery, late-load cleanup, immediate local saves and account-safe initial synchronization.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(deadline));
