/* eslint-disable @typescript-eslint/no-require-imports -- Offline regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { buildPrescriptionMemo } = load('src/utils/prescriptionMemo');
const { ACUPOINT_ROLES } = load('src/data/haiketsuData');
for (const id of Object.keys(ACUPOINT_ROLES)) {
  const memo = buildPrescriptionMemo({ selectedPointIds: [id], title: '', rationale: '', isPremium: false, timestamp: 1 });
  assert.deepEqual(Array.from(memo.points), [ACUPOINT_ROLES[id].name]);
  assert.equal(memo.title, `${ACUPOINT_ROLES[id].name}の配穴メモ`, `${id}: the free saved title must name the currently selected point`);
  assert.equal(memo.elements.length, 0, `${id}: selecting a point must not invent a five-element label`);
  assert.equal(memo.indications.length, 0, `${id}: selecting a point must not invent clinical indications`);
  assert.match(memo.summary, /現在の配穴の選定理由ではありません/);
  assert.match(memo.mechanism, /治療効果や安全性の確認結果ではありません/);
}
const saved = buildPrescriptionMemo({ selectedPointIds: ['gokoku', 'ashisanri', 'gokoku', 'missing'], title: '比較した配穴', rationale: '学習で比較した理由', isPremium: true, timestamp: 2 });
assert.deepEqual(Array.from(saved.points), ['合谷', '足三里']);
assert.equal(saved.title, '比較した配穴');
assert.equal(saved.summary, '選定理由: 学習で比較した理由');
assert.match(saved.subTitle, /計2穴/);
assert.throws(() => buildPrescriptionMemo({ selectedPointIds: ['missing'], title: '', rationale: '', isPremium: false }), /経穴を選んで/);
const page = fs.readFileSync('src/app/practice/haiketsu/page.tsx', 'utf8');
assert.match(page, /addMemo\(buildPrescriptionMemo\(/, 'The real save handler must use the tested record builder');

// All public sales prompts must use the same endpoint and fail closed.
async function availabilityScenario({ enabled = true, response, reject = false, unmount = false, active = true }) {
  const updates = [];
  let effect, fetchCount = 0, resolve;
  const request = new Promise(done => { resolve = done; });
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync('src/hooks/useSubscriptionAvailability.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(js, { exports, fetch: (url, options) => { assert.equal(url, '/api/stripe/availability'); assert.equal(options.cache, 'no-store'); fetchCount++; return request.then(() => { if (reject) throw new Error('offline'); return response; }); }, require: id => id === 'react' ? { useState: value => [value, next => updates.push(next)], useCallback: cb => cb, useEffect: cb => { effect = cb; } } : { isSubscriptionSalesEnabled: () => enabled } });
  const initial = exports.useSubscriptionAvailability(active);
  assert.equal(initial.salesEnabled, false);
  const cleanup = effect();
  if (unmount) cleanup?.();
  resolve();
  await new Promise(done => setImmediate(done));
  return { updates, fetchCount };
}

async function retryAvailabilityScenario() {
  const states = [];
  let cursor = 0, effect, cleanup, fetchCount = 0;
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync('src/hooks/useSubscriptionAvailability.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const react = {
    useState(initial) {
      const slot = cursor++;
      if (!(slot in states)) states[slot] = initial;
      return [states[slot], next => { states[slot] = typeof next === 'function' ? next(states[slot]) : next; }];
    },
    useCallback: callback => callback,
    useEffect: callback => { effect = callback; },
  };
  vm.runInNewContext(js, { exports, fetch: async () => {
    fetchCount++;
    if (fetchCount === 1) throw new Error('offline');
    return { ok: true, json: async () => ({ available: true }) };
  }, require: id => id === 'react' ? react : { isSubscriptionSalesEnabled: () => true } });
  const render = () => { cursor = 0; return exports.useSubscriptionAvailability(); };
  render();
  cleanup = effect();
  await new Promise(done => setImmediate(done));
  let current = render();
  assert.equal(current.status, 'error');
  assert.equal(current.salesEnabled, false, 'Unknown availability cannot enable checkout');
  current.retry();
  assert.equal(states[0], 'checking', 'Retry immediately replaces the failure with progress');
  cleanup();
  current = render();
  cleanup = effect();
  await new Promise(done => setImmediate(done));
  current = render();
  assert.equal(fetchCount, 2, 'Retry makes a new request after a failed check');
  assert.equal(current.status, 'available');
  assert.equal(current.salesEnabled, true, 'A successful retry restores the sales entry');
  cleanup();
}

function renderAvailabilityNotice(status) {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync('src/components/subscription/SubscriptionAvailabilityNotice.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(js, { exports, require: id => id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) });
  return renderToStaticMarkup(React.createElement(exports.default, { status, onRetry() {} }));
}
(async () => {
  for (const [response, expected] of [
    [{ ok: true, json: async () => ({ available: true }) }, 'available'],
    [{ ok: true, json: async () => ({ available: false }) }, 'unavailable'],
    [{ ok: true, json: async () => ({ available: 'true' }) }, 'error'],
    [{ ok: true, json: async () => { throw new Error('invalid JSON'); } }, 'error'],
    [{ ok: false }, 'error'],
  ]) assert.deepEqual((await availabilityScenario({ response })).updates, ['checking', expected]);
  assert.deepEqual((await availabilityScenario({ reject: true })).updates, ['checking', 'error']);
  assert.equal((await availabilityScenario({ enabled: false })).fetchCount, 0);
  assert.equal((await availabilityScenario({ active: false })).fetchCount, 0);
  assert.deepEqual((await availabilityScenario({ response: { ok: true, json: async () => ({ available: true }) }, unmount: true })).updates, []);
  await retryAvailabilityScenario();
  for (const status of ['checking', 'error']) {
    const html = renderAvailabilityNotice(status);
    assert(!html.includes('準備中') && !html.includes('受付開始日は未定'), 'A loading or failed request must not claim that sales are stopped');
    assert(html.includes('role="status"'));
  }
  assert(renderAvailabilityNotice('error').includes('受付状況を再確認する'));
  assert(renderAvailabilityNotice('unavailable').includes('準備中'));
  for (const file of ['src/app/pricing/page.tsx', 'src/components/auth/AuthModal.tsx', 'src/components/cases/CaseStudyViewer.tsx', 'src/app/practice/haiketsu/page.tsx']) assert.match(fs.readFileSync(file, 'utf8'), /useSubscriptionAvailability/);
  const modal = fs.readFileSync('src/components/auth/AuthModal.tsx', 'utf8');
  assert.match(modal, /useModalDialog\(isOpen/);
  assert.match(modal, /role="dialog" aria-modal="true"/);
  assert(!modal.includes('学習ノート保存上限 1,000'));
  const install = fs.readFileSync('src/components/pwa/PwaInstallPrompt.tsx', 'utf8');
  assert(!install.includes('setTimeout('), 'Installation must not interrupt an initial visit');
  assert.match(install, /addEventListener\("haritaro:install-app"/);
  console.log(`Passed: ${Object.keys(ACUPOINT_ROLES).length} single-point records, combinations, honest metadata, sales readiness/error/unmount handling, common modal and user-requested install guidance.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
