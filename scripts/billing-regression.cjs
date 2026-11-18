/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS VM regression harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const uid = '11111111-1111-4111-8111-111111111111';
const other = '22222222-2222-4222-8222-222222222222';
process.env.STRIPE_SECRET_KEY = 'sk_live_fixture';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fixture';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'fixture';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://fixture.supabase.co';
process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES = 'true';
process.env.STRIPE_PRICE_ID_MONTHLY = 'price_monthly';
const end = Math.floor(Date.now() / 1000) + 3600;
const fixture = () => ({id:'sub_fixture',status:'active',customer:'cus_fixture',metadata:{userId:uid},cancel_at_period_end:false,latest_invoice:{status:'paid'},items:{data:[{current_period_start:end-3600,current_period_end:end,price:{id:'price_monthly',currency:'jpy',unit_amount:980,recurring:{interval:'month',interval_count:1}}}]}});
const state = { user:{id:uid,email:'fixture@example.invalid',app_metadata:{}}, subscription:fixture(), writes:[], serviceCalls:[], failSave:false, failRead:false };
const admin = { auth:{admin:{
  getUserById:async()=>({data:{user:state.failRead?null:state.user},error:state.failRead?{message:'fixture'}:null}),
  updateUserById:async(id,body)=>{if(state.failSave)return {data:{user:null},error:{message:'fixture'}};state.writes.push(body);state.user={...state.user,app_metadata:body.app_metadata};return {data:{user:state.user},error:null};}
}}};
class FakeStripe {
  constructor() {
    state.serviceCalls.push('Stripe');
    this.subscriptions = { retrieve: async id => {
      if (state.failSubscription === id) throw new Error('fixture retrieval failed');
      return state.subscriptions?.[id] || state.subscription;
    } };
    this.checkout = { sessions: { list: async () => ({ data: state.unrelated ? [] : [{ metadata: { userId: uid } }] }) } };
  }
}
const overrides = {
  stripe: FakeStripe,
  '@supabase/supabase-js': { createClient: () => { state.serviceCalls.push('Supabase admin'); return admin; } },
  '@/lib/supabase/server': { createClient: async () => {
    state.serviceCalls.push('Supabase auth');
    return { auth: { getUser: async () => ({ data: { user: state.user }, error: null }) } };
  } },
};
const cache = new Map();
function load(candidate) {
  const file=path.resolve(candidate+'.ts');if(cache.has(file))return cache.get(file);
  const exports={};cache.set(file,exports);
  const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const localRequire=id=>overrides[id] || (id.startsWith('@/')?load('src/'+id.slice(2)):require(id));
  vm.runInNewContext(js,{exports,require:localRequire,process,URL,Response,Request,console,Date,fetch: async () => { state.serviceCalls.push('fetch'); throw new Error('Unexpected fetch'); }},{filename:file});return exports;
}
const retiredPaths = ['/api/stripe/checkout', '/api/stripe/portal', '/api/stripe/status', '/api/analytics/subscription-frame', '/api/webhook/stripe'];
const {subscriptionState,syncSubscription}=load('src/lib/billing');
const {safeReturnPath,hasPremiumAccess}=load('src/utils/authPolicy');
(async()=>{
  for(const input of ['https://evil.invalid','//evil.invalid','/\\evil.invalid','/\nevil.invalid'])assert.equal(safeReturnPath(input),'/account/subscription');
  assert.equal(safeReturnPath('/pricing#pricing-cards'),'/pricing#pricing-cards');
  assert(!hasPremiumAccess('premium',undefined));assert(!hasPremiumAccess('premium',{status:'active',currentPeriodEnd:Date.now()-1}));
  for (const route of retiredPaths) {
    const handlers = load('src/app' + route + '/route');
    for (const method of ['GET', 'HEAD', 'POST']) {
      const response = await handlers[method](new Request(
        'https://www.haritaro.jp' + route + '?session_id=cs_fixture',
        { method, ...(method === 'POST' && { body: JSON.stringify({ plan: 'monthly', userId: uid }) }) },
      ));
      assert.equal(response.status, 410, method + ' ' + route);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.equal(response.headers.get('Location'), null);
      if (method === 'HEAD') assert.equal(await response.text(), '');
      else assert.equal((await response.json()).error, 'subscription_ended');
    }
  }
  assert.deepEqual(state.serviceCalls, [], 'retired routes must not contact Stripe or Supabase');
  assert.deepEqual(state.writes, [], 'retired routes must not write to membership data');

  await assert.rejects(syncSubscription(new FakeStripe(), 'sub_fixture', other));
  await syncSubscription(new FakeStripe(), 'sub_fixture', uid);
  assert.equal(state.user.app_metadata.role, 'premium');
  const verifiedUser = state.user;
  state.user={...verifiedUser,app_metadata:{...verifiedUser.app_metadata,billing_customer_id:'cus_other'}};
  await assert.rejects(syncSubscription(new FakeStripe(),'sub_fixture',uid));
  state.user={...verifiedUser,app_metadata:{...verifiedUser.app_metadata,subscription:{...verifiedUser.app_metadata.subscription,stripeSubscriptionId:'sub_new'}}};
  const writesBeforeOldRenewal=state.writes.length;await syncSubscription(new FakeStripe(),'sub_fixture',uid);
  assert.equal(state.writes.length,writesBeforeOldRenewal,'old active contract must not overwrite another current contract');state.user=verifiedUser;
  assert.equal(state.user.app_metadata.subscription.currentPeriodEnd,end*1000);
  state.subscription.cancel_at=end;
  const timestampCancellation=subscriptionState(state.subscription);
  assert.equal(timestampCancellation.status,'canceled','cancel_at must identify a scheduled end even when cancel_at_period_end is false');
  assert.equal(timestampCancellation.cancelAtPeriodEnd,true);
  assert(hasPremiumAccess('premium',timestampCancellation,end*1000-1));
  assert(!hasPremiumAccess('premium',timestampCancellation,end*1000));
  await syncSubscription(new FakeStripe(),'sub_fixture',uid);
  assert.equal(state.user.app_metadata.role,'premium');assert.equal(state.user.app_metadata.subscription.status,'canceled');
  state.subscription.cancel_at=end-600;
  assert.equal(subscriptionState(state.subscription).currentPeriodEnd,(end-600)*1000,'access must stop at an earlier scheduled cancellation');
  state.subscription.cancel_at=end+3600;
  assert.equal(subscriptionState(state.subscription).status,'active','a cancellation after this period does not stop the next renewal yet');
  assert.equal(subscriptionState(state.subscription).currentPeriodEnd,end*1000,'future cancellation must not extend the paid period');
  state.subscription.cancel_at=null;
  assert.equal(subscriptionState(state.subscription).status,'active');
  state.subscription.cancel_at_period_end=true;assert.equal(subscriptionState(state.subscription).status,'canceled');
  state.subscription.items.data[0].price.id='price_unrelated';assert.throws(()=>subscriptionState(state.subscription));state.subscription.items.data[0].price.id='price_monthly';
  state.subscription.latest_invoice.status='open';assert.equal(subscriptionState(state.subscription).status,'incomplete');
  state.subscription.status='past_due';await syncSubscription(new FakeStripe(),'sub_fixture',uid);assert.equal(state.user.app_metadata.role,'free');
  state.subscription.status='canceled';assert.equal(subscriptionState(state.subscription).status,'none');
  console.log('Passed: retired billing endpoints reject requests without external calls or membership writes.');
})().catch(error=>{console.error(error);process.exitCode=1;});
