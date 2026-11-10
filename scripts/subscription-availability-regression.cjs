/* eslint-disable @typescript-eslint/no-require-imports -- Isolated route regression harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/app/api/stripe/availability/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const env = {
  STRIPE_SECRET_KEY: 'sk_live_fixture', STRIPE_WEBHOOK_SECRET: 'whsec_fixture',
  SUPABASE_SERVICE_ROLE_KEY: 'private_fixture', STRIPE_PRICE_ID_MONTHLY: 'monthly',
  STRIPE_PRICE_ID_YEARLY: 'yearly', NEXT_PUBLIC_SUPABASE_URL: 'https://fixture.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public_fixture',
};
async function check({ overrides = {}, enabled = true, health = true, fails = false, host = 'www.haritaro.jp' } = {}) {
  const exports = {}; const calls = [];
  vm.runInNewContext(code, {
    exports, require: () => ({ isSubscriptionSalesEnabled: () => enabled }),
    process: { env: { ...env, ...overrides } }, URL, Response,
    AbortSignal: { timeout: ms => { assert.equal(ms, 4000); return 'bounded-signal'; } },
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (fails) throw new Error('network/timeout failure with private_fixture');
      return { ok: health };
    },
  });
  const response = await exports.GET({ url: `https://${host}/api/stripe/availability` });
  const body = await response.json();
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert(!JSON.stringify(body).includes('fixture'), 'Never expose configuration or upstream errors');
  return { response, body, calls };
}
(async () => {
  const ready = await check();
  assert.equal(ready.body.available, true);
  assert.equal(ready.calls[0].url, 'https://fixture.supabase.co/auth/v1/health');
  assert.equal(ready.calls[0].options.headers.apikey, 'public_fixture');
  assert.equal(ready.calls[0].options.signal, 'bounded-signal');
  assert.equal(ready.calls[0].options.cache, 'no-store');
  const publishable = await check({ overrides: { NEXT_PUBLIC_SUPABASE_ANON_KEY: '', NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_fixture' } });
  assert.equal(publishable.body.available, true, 'Production publishable keys must work like legacy anon keys');
  assert.equal(publishable.calls[0].options.headers.apikey, 'sb_publishable_fixture');
  for (const scenario of [{ enabled: false }, ...Object.keys(env).map(key => ({ overrides: { [key]: '' } })), { overrides: { STRIPE_SECRET_KEY: 'sk_test_fixture' } }]) {
    const result = await check(scenario);
    assert.equal(result.body.available, false);
    assert.equal(result.calls.length, 0);
  }
  assert.equal((await check({ host: 'localhost', overrides: { STRIPE_SECRET_KEY: 'sk_test_fixture' } })).body.available, true);
  for (const scenario of [{ health: false }, { fails: true }]) {
    const result = await check(scenario);
    assert.equal(result.response.status, 503);
    assert.equal(result.body.available, undefined);
    assert(result.body.error);
  }
  console.log('Availability passed: live/test separation, required configuration, bounded auth health check, fail-closed outage handling and no secret disclosure.');
})().catch(error => { console.error(error); process.exitCode = 1; });
