/* eslint-disable @typescript-eslint/no-require-imports -- Offline guest-provider and public bundle-boundary regression. */
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
    event(name, data) { for (const listener of listeners.get(name) || []) listener(data); },
    unmount() { for (const slot of slots) slot?.cleanup?.(); },
  };
}

async function guestLearning() {
  const guestKey = 'haritaro-learning-v2:guest';
  const legacyKey = 'haritaro-learning-progress-v1';
  const legacy = JSON.stringify({ completedLectures: { 'old-progress': true } });
  const oldAccountKey = 'haritaro-learning-v2:former-account';
  const oldAccountData = JSON.stringify({ 'lecture:private': { value: true } });
  const storage = new Map([[legacyKey, legacy], [oldAccountKey, oldAccountData]]);
  let adapter;
  const app = providerHarness('src/contexts/LearningSyncContext.tsx', 'LearningSyncProvider', {
    '@/utils/learningStorageBridge': { setLearningStorageAdapter(value) { adapter = value; } },
  }, storage);
  try {
    assert.equal(app.render().ready, false);
    await settle();
    const ready = app.render();
    assert.equal(ready.ready, true);
    assert.equal(ready.status, 'local');
    assert.equal(ready.values['lecture:old-progress'], true);
    assert.equal(ready.values['lecture:private'], undefined);
    assert.equal(adapter.owner, 'guest');
    ready.setEntry('lecture:new-progress', true);
    assert.equal(app.render().values['lecture:new-progress'], true);
    assert.equal(JSON.parse(storage.get(guestKey))['lecture:new-progress'].value, true);
    assert.equal(storage.get(oldAccountKey), oldAccountData);
    assert.equal(storage.get(legacyKey), legacy);
  } finally { app.unmount(); }
  assert.equal(adapter, null);
}

function staticBoundaries() {
  const seen = new Set();
  const appRoot = path.join(root, 'src', 'app');
  function visit(candidate) {
    if (/\.(?:css|json|svg|woff2?|png|jpe?g|webp|avif)$/.test(candidate)) return;
    const file = [candidate, ...['.ts', '.tsx', '.js', '.jsx'].map(ext => candidate + ext), ...['index.ts', 'index.tsx'].map(name => path.join(candidate, name))]
      .find(option => /\.[jt]sx?$/.test(option) && fs.existsSync(option) && fs.statSync(option).isFile());
    assert(file, 'Unresolved local dependency: ' + candidate);
    if (seen.has(file)) return;
    seen.add(file);
    const relative = path.relative(root, file).replaceAll(path.sep, '/');
    assert(!/(?:^|\/)lib\/supabase\//.test(relative), 'Public routes exclude the Supabase runtime: ' + relative);
    assert(!/(?:AuthContext|ClinicalMemoContext|GoogleAuthForm|\/lib\/billing)\./.test(relative), 'Public routes exclude retired account modules: ' + relative);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function dependency(id) {
      assert(!id.startsWith('@supabase/') && id !== 'stripe', 'Public routes exclude auth and payment SDKs: ' + relative);
      if (id.startsWith('@/')) visit(path.join(root, 'src', id.slice(2)));
      if (id.startsWith('.')) visit(path.resolve(path.dirname(file), id));
    }
    function inspect(node) {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        if (node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier) && !node.isTypeOnly && !node.importClause?.isTypeOnly) {
          const bindings = node.importClause?.namedBindings;
          if (!(bindings && ts.isNamedImports(bindings) && !node.importClause.name && bindings.elements.every(item => item.isTypeOnly))) {
            dependency(node.moduleSpecifier.text);
          }
        }
      } else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || ts.isIdentifier(node.expression) && node.expression.text === 'require')) {
        if (node.arguments.length && ts.isStringLiteralLike(node.arguments[0])) dependency(node.arguments[0].text);
      }
      ts.forEachChild(node, inspect);
    }
    inspect(ast);
  }
  for (const entry of fs.readdirSync(appRoot, { recursive: true, withFileTypes: true })) {
    if (entry.isFile() && /^(?:page|layout)\.tsx$/.test(entry.name)) visit(path.join(entry.parentPath, entry.name));
  }
  assert(seen.size > 100, 'The public route graph must include actual route dependencies');
  return seen.size;
}

function buildMeasurements() {
  const measurements = [];
  for (const route of ['/', '/learn', '/curriculum/lecture-intro-1', '/tsubo/li4', '/articles/science-of-yinyang-gogyo']) {
    const html = fs.readFileSync(path.join(root, '.next/server/app', (route === '/' ? 'index' : route.slice(1)) + '.html'), 'utf8');
    const scripts = [...new Set([...html.matchAll(/<script\b[^>]*>/g)].filter(match => !/nomodule/i.test(match[0])).flatMap(match => match[0].match(/src="\/_next\/([^"?]+)/)?.slice(1) || []))];
    let rawBytes = 0, gzipBytes = 0;
    for (const script of scripts) {
      const bytes = fs.readFileSync(path.join(root, '.next', decodeURIComponent(script)));
      assert(!bytes.includes('AuthApiError') && !bytes.includes('auth/v1') && !bytes.includes('sync_learning_entries'), route + ': initial scripts exclude authentication and cloud synchronization');
      rawBytes += bytes.length; gzipBytes += zlib.gzipSync(bytes).length;
    }
    measurements.push({ route, scriptCount: scripts.length, rawBytes, gzipBytes });
  }
  console.log(JSON.stringify({ note: 'Modern initial script tags in the local build; gzip estimates, not total post-hydration downloads or speed scores.', measurements }, null, 2));
}

(async () => {
  const modules = staticBoundaries();
  await guestLearning();
  if (process.argv.includes('--build-output')) buildMeasurements();
  console.log('PASS: ' + modules + ' public route modules exclude auth, cloud and Stripe; guest progress saves locally and preserves former account data.');
})().catch(error => { console.error(error); process.exitCode = 1; });
