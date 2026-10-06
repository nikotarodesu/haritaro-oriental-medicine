/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const compile = file => ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const policy = {};
vm.runInNewContext(compile('src/utils/clarity.ts'), { exports: policy, URL });
const origin = 'https://www.haritaro.jp';
// An upload compressed before shutdown must use its original envelope. It must
// neither dereference the stopped SDK nor use a later page's sequence number.
require('./patch-clarity.cjs');
const sdkSource = fs.readFileSync(path.join(root, 'node_modules/clarity-js/build/clarity.module.js'), 'utf8');
assert(sdkSource.includes('send(payload, zipped, JSON.parse(e)[1], last);'));
const uploadCall = sdkSource.match(/send\(payload, zipped, JSON\.parse\(e\)\[1\], last\);/)[0];
for (const liveEnvelope of [null, { sequence: 999 }]) {
  let received;
  vm.runInNewContext(uploadCall, { payload: 'public-payload', zipped: null, e: JSON.stringify(['0.8.71', 3]), last: false, data$1: liveEnvelope, send: (...args) => { received = args; } });
  assert.equal(received[2], 3);
}
for (const route of ['/', '/about', '/learn', '/learn/courses', '/articles']) assert(policy.isClarityPage(route, origin));
for (const route of ['/notes', '/clinical', '/clinical/workspace', '/diagnosis', '/simulator', '/practice/haiketsu', '/curriculum/lecture-yinyang-1', '/auth/login', '/account/subscription', '/contact', '/?q=private', '/learn#private', 'https://evil.example/learn']) assert(!policy.isClarityPage(route, origin));
for (const referrer of ['', origin + '/learn', 'https://external.example/']) assert(policy.isClarityReferrer(referrer, origin));
for (const referrer of [origin + '/notes', origin + '/?query=private', 'https://external.example/?q=private', 'https://external.example/private-person', 'invalid']) assert(!policy.isClarityReferrer(referrer, origin));

function setup({ pathname = '/', referrer = '', projectId = 'ypobv9qync', gpc = false, delayed = false, failure = false } = {}) {
  const listeners = new Map();
  const calls = [];
  let active = false;
  let restarts = 0;
  let release;
  const window = { location: { origin, href: origin + pathname }, addEventListener: (name, listener) => listeners.set(name, listener), history: {} };
  for (const method of ['pushState', 'replaceState']) window.history[method] = (_data, _unused, url) => { if (url != null) window.location.href = new URL(url, window.location.href).href; };
  const sdk = {
    start(config) {
      active = true;
      calls.push(config);
      // Simulate Clarity's own history proxy and automatic SPA restart.
      for (const method of ['pushState', 'replaceState']) {
        const original = window.history[method];
        window.history[method] = (...args) => { original(...args); if (active) restarts++; };
      }
    },
    stop() { active = false; },
    metadata(callback) { if (active) callback(); },
  };
  const sdkPromise = delayed ? new Promise(resolve => { release = () => resolve({ clarity: sdk }); }) : Promise.resolve({ clarity: sdk });
  class Element {
    constructor(sensitive = false, href = null) { this.sensitive = sensitive; this.href = href; }
    closest(selector) { return selector === 'a[href]' ? (this.href ? this : null) : (this.sensitive ? this : null); }
    getAttribute() { return this.href; }
  }
  const document = { referrer, documentElement: { dataset: {} }, addEventListener: (name, listener) => listeners.set(name, listener) };
  const exports = {};
  vm.runInNewContext(compile('src/instrumentation-client.ts'), {
    exports, window, document, navigator: { globalPrivacyControl: gpc }, Element, URL,
    process: { env: { NEXT_PUBLIC_CLARITY_ID: projectId } },
    require(name) { if (name === './utils/clarity') return policy; if (failure) throw new Error('blocked'); return sdkPromise; },
  });
  return { exports, listeners, calls, window, document, Element, release, active: () => active, restarts: () => restarts };
}
const settle = () => new Promise(resolve => setImmediate(resolve));
(async () => {
  for (const options of [{ pathname: '/notes' }, { pathname: '/?query=private' }, { referrer: origin + '/notes' }, { projectId: '' }, { gpc: true }]) {
    const app = setup(options); await settle(); assert.equal(app.calls.length, 0); assert.equal(app.document.documentElement.dataset.clarityStatus, 'excluded');
  }
  const app = setup(); await settle();
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0].track, false);
  assert.deepEqual(Array.from(app.calls[0].mask), ['body']);
  assert.equal(app.calls[0].cookies.length, 0);
  app.exports.onRouterTransitionStart('/notes');
  app.window.history.pushState({}, '', '/notes');
  assert.equal(app.active(), false);
  assert.equal(app.restarts(), 0);
  for (const method of ['pushState', 'replaceState']) {
    const native = setup(); await settle(); native.window.history[method]({}, '', '/?q=private'); assert.equal(native.active(), false); assert.equal(native.restarts(), 0);
  }
  for (const event of ['pointerdown', 'focusin', 'keydown', 'popstate', 'hashchange', 'pagehide']) {
    const interaction = setup(); await settle(); interaction.listeners.get(event)({ target: new interaction.Element(true) }); assert.equal(interaction.active(), false);
  }
  const delayed = setup({ delayed: true });
  delayed.exports.onRouterTransitionStart('/notes'); delayed.window.location.href = origin + '/notes'; delayed.release(); await settle(); assert.equal(delayed.calls.length, 0);
  const focusBeforeDownload = setup({ delayed: true }); focusBeforeDownload.listeners.get('focusin')({ target: new focusBeforeDownload.Element(true) }); focusBeforeDownload.release(); await settle(); assert.equal(focusBeforeDownload.calls.length, 0);
  const failed = setup({ failure: true }); await settle(); assert.equal(failed.document.documentElement.dataset.clarityStatus, 'unavailable');
  const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8'); assert(layout.includes('data-clarity-mask="true"')); assert(layout.includes('data-clarity-sensitive'));
  console.log('Passed: Clarity allowlist, URL/referrer privacy, no cookies, input/overlay guards, synchronous navigation stop, no SDK restart, delayed SDK cancellation, and load failure.');
})().catch(error => { console.error(error); process.exitCode = 1; });
