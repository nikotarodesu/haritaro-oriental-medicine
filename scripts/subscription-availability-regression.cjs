/* eslint-disable @typescript-eslint/no-require-imports -- Isolated route regression harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const compilerOptions = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 };
const retirementSource = 'src/app/_legacy/retirementResponses.ts';
const availabilitySource = 'src/app/api/stripe/availability/route.ts';
const legacyEnv = {
  NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES: 'true',
  STRIPE_SECRET_KEY: 'sk_live_fixture',
  STRIPE_WEBHOOK_SECRET: 'whsec_fixture',
  SUPABASE_SERVICE_ROLE_KEY: 'private_fixture',
  STRIPE_PRICE_ID_MONTHLY: 'monthly',
  STRIPE_PRICE_ID_YEARLY: 'yearly',
  NEXT_PUBLIC_SUPABASE_URL: 'https://fixture.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public_fixture',
};

async function check(env) {
  const outwardCalls = [];
  function load(file) {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions }).outputText;
    vm.runInNewContext(code, {
      exports, Request, Response,
      process: { env },
      require: id => {
        if (id === '@/app/_legacy/retirementResponses') return load(retirementSource);
        outwardCalls.push(id);
        throw new Error('Retired availability route must not import ' + id);
      },
      fetch: async (url) => {
        outwardCalls.push(url);
        throw new Error('Retired availability route must not fetch');
      },
    }, { filename: file });
    return exports;
  }

  const handlers = load(availabilitySource);
  for (const method of ['GET', 'HEAD', 'POST']) {
    const response = await handlers[method](new Request('https://www.haritaro.jp/api/stripe/availability', { method }));
    assert.equal(response.status, 410);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.match(response.headers.get('Content-Type'), /application\/json/);
    if (method === 'HEAD') {
      assert.equal(await response.text(), '');
    } else {
      const body = await response.json();
      assert.equal(body.error, 'subscription_ended');
      assert.equal(body.available, undefined);
      assert(!JSON.stringify(body).includes('fixture'), 'Never expose legacy credentials');
    }
  }
  assert.deepEqual(outwardCalls, []);
}

(async () => {
  await check({});
  await check(legacyEnv);
  console.log('Availability passed: 410 even with legacy live settings, no caching, upstream calls or credential disclosure.');
})().catch(error => { console.error(error); process.exitCode = 1; });
