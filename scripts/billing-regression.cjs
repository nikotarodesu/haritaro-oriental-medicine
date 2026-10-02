const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const Stripe = require('stripe');
const uid = '11111111-1111-4111-8111-111111111111';
const other = '22222222-2222-4222-8222-222222222222';
process.env.STRIPE_SECRET_KEY = 'sk_live_fixture';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fixture';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'fixture';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://fixture.supabase.co';
process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES = 'true';
process.env.STRIPE_PRICE_ID_MONTHLY = 'price_monthly';
const end = Math.floor(Date.now() / 1000) + 3600;
const fixture = () => ({id:'sub_fixture',status:'active',customer:'cus_fixture',metadata:{userId:uid},cancel_at_period_end:false,latest_invoice:{status:'paid'},items:{data:[{current_period_start:end-3600,current_period_end:end,price:{currency:'jpy',unit_amount:980,recurring:{interval:'month',interval_count:1}}}]}});
const state = { user:{id:uid,email:'fixture@example.invalid',app_metadata:{}}, subscription:fixture(), writes:[], checkouts:[], portals:[], duplicate:false, failSave:false, failRead:false, invalidPrice:false, sessionOwner:uid, paymentStatus:'paid' };
const admin = { auth:{admin:{
  getUserById:async()=>({data:{user:state.failRead?null:state.user},error:state.failRead?{message:'fixture'}:null}),
  updateUserById:async(id,body)=>{if(state.failSave)return {data:{user:null},error:{message:'fixture'}};state.writes.push(body);state.user={...state.user,app_metadata:body.app_metadata};return {data:{user:state.user},error:null};}
}}};
class FakeStripe {
  constructor() {
    this.webhooks = new Stripe('sk_test_fixture').webhooks;
    this.prices = {retrieve:async()=>({active:true,currency:'jpy',unit_amount:state.invalidPrice?1:980,recurring:{interval:'month',interval_count:1}})};
    this.subscriptions = {retrieve:async()=>state.subscription,list:async()=>({data:state.duplicate?[{status:'active'}]:[]})};
    this.checkout = {sessions:{
      create:async(body,options)=>{state.checkouts.push({body,options});return {url:'https://checkout.stripe.com/fixture'};},
      list:async()=>({data:[{metadata:{userId:uid}}]}),
      retrieve:async()=>({metadata:{userId:state.sessionOwner},client_reference_id:state.sessionOwner,status:'complete',payment_status:state.paymentStatus,subscription:'sub_fixture'})
    }};
    this.billingPortal = {sessions:{create:async(body)=>{state.portals.push(body);return {url:'https://billing.stripe.com/fixture'};}}};
  }
}
const overrides = {stripe:FakeStripe,'@supabase/supabase-js':{createClient:()=>admin},'@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user:state.user},error:state.user?null:{message:'no session'}})}})}};
const cache = new Map();
function load(candidate) {
  const file=path.resolve(candidate+'.ts');if(cache.has(file))return cache.get(file);
  const exports={};cache.set(file,exports);
  const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const localRequire=id=>overrides[id] || (id.startsWith('@/')?load('src/'+id.slice(2)):require(id));
  vm.runInNewContext(js,{exports,require:localRequire,process,URL,Response,Request,console,Date},{filename:file});return exports;
}
const checkout=load('src/app/api/stripe/checkout/route').POST;
const portal=load('src/app/api/stripe/portal/route').POST;
const status=load('src/app/api/stripe/status/route').GET;
const webhook=load('src/app/api/webhook/stripe/route').POST;
const {subscriptionState,syncSubscription}=load('src/lib/billing');
const {safeReturnPath,hasPremiumAccess}=load('src/utils/authPolicy');
const req=(route,body,origin='https://www.haritaro.jp')=>new Request('https://www.haritaro.jp'+route,{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
(async()=>{
  for(const input of ['https://evil.invalid','//evil.invalid','/\\evil.invalid','/\nevil.invalid'])assert.equal(safeReturnPath(input),'/account/subscription');
  assert.equal(safeReturnPath('/pricing#pricing-cards'),'/pricing#pricing-cards');
  assert(!hasPremiumAccess('premium',undefined));assert(!hasPremiumAccess('premium',{status:'active',currentPeriodEnd:Date.now()-1}));
  const freeUser=state.user;
  state.user=null;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly',userId:uid}))).status,401);
  assert.equal((await portal(req('/api/stripe/portal',{customerId:'cus_other'}))).status,401);
  assert.equal((await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).status,401);
  assert.equal(state.checkouts.length,0);state.user=freeUser;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'},'https://evil.invalid'))).status,403);
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'invalid'}))).status,400);
  state.sessionOwner=other;assert.equal((await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).status,403);state.sessionOwner=uid;
  state.paymentStatus='unpaid';assert.equal((await (await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).json()).pending,true);state.paymentStatus='paid';
  process.env.STRIPE_SECRET_KEY='sk_test_fixture';assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);process.env.STRIPE_SECRET_KEY='sk_live_fixture';
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);assert.equal(state.checkouts.length,0);
  process.env.SUPABASE_SERVICE_ROLE_KEY='fixture';state.failRead=true;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);assert.equal(state.checkouts.length,0);state.failRead=false;state.invalidPrice=true;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);state.invalidPrice=false;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly',userId:other,userEmail:'other@example.invalid'}))).status,200);
  assert.equal(state.checkouts[0].body.metadata.userId,uid);assert.equal(state.checkouts[0].body.customer_email,freeUser.email);
  assert.equal(state.checkouts[0].body.subscription_data.metadata.userId,uid);
  assert(!('payment_method_types' in state.checkouts[0].body));
  const firstKey=state.checkouts[0].options.idempotencyKey;
  await checkout(req('/api/stripe/checkout',{plan:'monthly'}));assert.equal(state.checkouts[1].options.idempotencyKey,firstKey);assert.equal(state.checkouts[1].body.integration_identifier,state.checkouts[0].body.integration_identifier);
  assert.equal((await portal(req('/api/stripe/portal',{customerId:'cus_other'}))).status,409);
  state.user={...freeUser,app_metadata:{subscription:{stripeCustomerId:'cus_fixture'}}};state.duplicate=true;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);state.duplicate=false;
  assert.equal((await portal(req('/api/stripe/portal',{customerId:'cus_other'}))).status,200);assert.equal(state.portals[0].customer,'cus_fixture');
  await assert.rejects(syncSubscription(new FakeStripe(),'sub_fixture',other));
  await syncSubscription(new FakeStripe(),'sub_fixture',uid);assert.equal(state.user.app_metadata.role,'premium');
  assert.equal(state.user.app_metadata.subscription.currentPeriodEnd,end*1000);
  state.subscription.cancel_at_period_end=true;assert.equal(subscriptionState(state.subscription).status,'canceled');
  state.subscription.latest_invoice.status='open';assert.equal(subscriptionState(state.subscription).status,'incomplete');
  state.subscription.status='past_due';await syncSubscription(new FakeStripe(),'sub_fixture',uid);assert.equal(state.user.app_metadata.role,'free');
  state.subscription.status='canceled';assert.equal(subscriptionState(state.subscription).status,'none');
  assert.equal((await webhook(req('/api/webhook/stripe',{}))).status,400);
  assert.equal((await webhook(new Request('https://www.haritaro.jp/api/webhook/stripe',{method:'POST',headers:{'stripe-signature':'invalid'},body:'{}'}))).status,400);
  const signed=type=>{const payload=JSON.stringify({id:'evt_fixture',type,data:{object:{id:'sub_fixture',parent:{subscription_details:{subscription:'sub_fixture'}}}}});const signature=new Stripe('sk_test_fixture').webhooks.generateTestHeaderString({payload,secret:'whsec_fixture'});return new Request('https://www.haritaro.jp/api/webhook/stripe',{method:'POST',headers:{'stripe-signature':signature},body:payload});};
  state.failSave=true;assert.equal((await webhook(signed('customer.subscription.updated'))).status,503);state.failSave=false;
  state.subscription=fixture();await webhook(signed('invoice.paid'));assert.equal(state.user.app_metadata.role,'premium');
  state.subscription.status='canceled';await webhook(signed('customer.subscription.deleted'));assert.equal(state.user.app_metadata.role,'free');
  await webhook(signed('customer.subscription.updated'));assert.equal(state.user.app_metadata.role,'free','late event must retrieve current canceled state');
  const auth=fs.readFileSync('src/contexts/AuthContext.tsx','utf8');assert(!/user_metadata\??\.role|setDemoRole|upgradeToPremium|localStorage\.getItem\(AUTH/.test(auth));
  const account=fs.readFileSync('src/app/account/subscription/page.tsx','utf8');assert(!/demo_upgraded|setDemoRole|upgradeToPremium/.test(account));
  console.log('Passed: authenticated billing, ownership, trusted roles, payment/expiry/cancellation, duplicate checkout, signature verification and webhook failure/retry. No external requests or charges.');
})().catch(error=>{console.error(error);process.exitCode=1;});
