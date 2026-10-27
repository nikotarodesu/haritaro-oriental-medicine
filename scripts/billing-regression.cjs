/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS VM regression harness. */
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
const fixture = () => ({id:'sub_fixture',status:'active',customer:'cus_fixture',metadata:{userId:uid},cancel_at_period_end:false,latest_invoice:{status:'paid'},items:{data:[{current_period_start:end-3600,current_period_end:end,price:{id:'price_monthly',currency:'jpy',unit_amount:980,recurring:{interval:'month',interval_count:1}}}]}});
const state = { user:{id:uid,email:'fixture@example.invalid',app_metadata:{}}, subscription:fixture(), writes:[], checkouts:[], portals:[], duplicate:false, failSave:false, failRead:false, invalidPrice:false, sessionOwner:uid, paymentStatus:'paid' };
const admin = { auth:{admin:{
  getUserById:async()=>({data:{user:state.failRead?null:state.user},error:state.failRead?{message:'fixture'}:null}),
  updateUserById:async(id,body)=>{if(state.failSave)return {data:{user:null},error:{message:'fixture'}};state.writes.push(body);state.user={...state.user,app_metadata:body.app_metadata};return {data:{user:state.user},error:null};}
}}};
class FakeStripe {
  constructor() {
    this.customers = {create:async(body,options)=>{(state.customerCreates||=[]).push({body,options});return {id:state.nextCustomer||'cus_fixture'};},retrieve:async(id)=>{if(state.customerReadFails)throw new Error('fixture lookup failure');return id===state.deletedCustomer?{id,deleted:true}:{id,metadata:{userId:state.customerOwner||uid}};}};
    this.webhooks = new Stripe('sk_test_fixture').webhooks;
    this.prices = {retrieve:async()=>({active:true,currency:'jpy',unit_amount:state.invalidPrice?1:980,recurring:{interval:'month',interval_count:1}})};
    this.subscriptions = {retrieve:async(id)=>{if(state.failSubscription===id)throw new Error('fixture retrieval failed');return state.subscriptions?.[id]||state.subscription;},list:async()=>({data:state.duplicate?[{status:'active'}]:[]})};
    this.checkout = {sessions:{
      create:async(body,options)=>{state.checkouts.push({body,options});return {url:'https://checkout.stripe.com/fixture'};},
      list:async(params)=>({data:params.customer?(state.sessions||[]):(state.unrelated?[]:[{metadata:{userId:uid}}])}),
      retrieve:async()=>({id:'cs_fixture',created:state.sessionCreated??Math.floor(Date.now()/1000),amount_total:state.amountTotal??980,currency:'jpy',metadata:{userId:state.sessionOwner,...(!state.legacyCheckout?{analyticsVersion:'1'}:{})},client_reference_id:state.sessionOwner,status:'complete',payment_status:state.paymentStatus,subscription:'sub_fixture'})
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
  assert.equal(state.checkouts[0].body.metadata.userId,uid);assert.equal(state.checkouts[0].body.customer,'cus_fixture');
  assert.equal(state.user.app_metadata.billing_customer_id,'cus_fixture');
  assert.equal(state.checkouts[0].body.subscription_data.metadata.userId,uid);
  assert(!('payment_method_types' in state.checkouts[0].body));
  const firstKey=state.checkouts[0].options.idempotencyKey;
  await checkout(req('/api/stripe/checkout',{plan:'monthly'}));assert.equal(state.checkouts[1].options.idempotencyKey,firstKey);assert.equal(state.checkouts[1].body.integration_identifier,state.checkouts[0].body.integration_identifier);
  const realNow=Date.now;Date.now=()=>realNow()+600000;
  try {await checkout(req('/api/stripe/checkout',{plan:'monthly'}));assert.equal(state.checkouts.at(-1).options.idempotencyKey,firstKey,'retry after ten minutes must retain the attempt key');}finally{Date.now=realNow;}
  assert.equal((await portal(req('/api/stripe/portal',{customerId:'cus_other'}))).status,409);
  const createdCount=state.checkouts.length;
  state.sessions=[{id:'cs_pending',mode:'subscription',status:'open',metadata:{userId:uid,plan:'monthly'},url:'https://checkout.stripe.com/pending'}];
  const reused=await checkout(req('/api/stripe/checkout',{plan:'monthly'}));assert.equal((await reused.json()).url,'https://checkout.stripe.com/pending');assert.equal(state.checkouts.length,createdCount);
  state.sessions[0].metadata.plan='yearly';assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);
  state.sessions=[{id:'cs_old',mode:'subscription',status:'expired',metadata:{userId:uid}}];
  await checkout(req('/api/stripe/checkout',{plan:'monthly'}));assert.notEqual(state.checkouts.at(-1).options.idempotencyKey,firstKey);
  state.sessions=[{id:'cs_paid',mode:'subscription',status:'complete',metadata:{userId:uid},subscription:'sub_fixture'}];
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);state.sessions=[];
  state.customerOwner=other;assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);delete state.customerOwner;
  state.user=freeUser;state.failSave=true;const countBeforeFailure=state.checkouts.length;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);assert.equal(state.checkouts.length,countBeforeFailure);state.failSave=false;
  state.user={...freeUser,app_metadata:{subscription:{stripeCustomerId:'cus_fixture'}}};state.duplicate=true;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);state.duplicate=false;
  assert.equal((await portal(req('/api/stripe/portal',{customerId:'cus_other'}))).status,200);assert.equal(state.portals[0].customer,'cus_fixture');
  await assert.rejects(syncSubscription(new FakeStripe(),'sub_fixture',other));
  await syncSubscription(new FakeStripe(),'sub_fixture',uid);assert.equal(state.user.app_metadata.role,'premium');
  const verifiedUser=state.user;
  const receiptResponse=await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'));
  const receipt=(await receiptResponse.json()).purchase;
  assert.match(receipt.transactionId,/^ht_[a-f0-9]{64}$/);assert.equal(receipt.plan,'monthly');assert.equal(receipt.value,980);assert.equal(receipt.currency,'JPY');
  assert(!JSON.stringify(receipt).includes('cs_fixture'));assert(!JSON.stringify(receipt).includes('cus_fixture'));assert(!JSON.stringify(receipt).includes(uid));
  assert.equal((await (await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).json()).purchase.transactionId,receipt.transactionId);
  state.legacyCheckout=true;assert.equal((await (await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).json()).purchase,null);delete state.legacyCheckout;
  state.sessionCreated=Math.floor(Date.now()/1000)-2*86400;
  assert((await (await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).json()).purchase,'delayed payment can still be measured');
  state.sessionCreated=Math.floor(Date.now()/1000)-8*86400;
  assert.equal((await (await status(new Request('https://www.haritaro.jp/api/stripe/status?session_id=cs_fixture'))).json()).purchase,null,'old sessions must not become new purchases');delete state.sessionCreated;
  assert.equal((await (await status(new Request('https://www.haritaro.jp/api/stripe/status'))).json()).purchase,null,'opening account management is not a purchase');
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
  assert.equal((await webhook(req('/api/webhook/stripe',{}))).status,400);
  assert.equal((await webhook(new Request('https://www.haritaro.jp/api/webhook/stripe',{method:'POST',headers:{'stripe-signature':'invalid'},body:'{}'}))).status,400);
  const signed=(type,livemode=true,subscription='sub_fixture')=>{const payload=JSON.stringify({id:'evt_fixture',livemode,type,data:{object:{id:subscription,parent:{subscription_details:{subscription}}}}});const signature=new Stripe('sk_test_fixture').webhooks.generateTestHeaderString({payload,secret:'whsec_fixture'});return new Request('https://www.haritaro.jp/api/webhook/stripe',{method:'POST',headers:{'stripe-signature':signature},body:payload});};
  assert.equal((await webhook(signed('invoice.paid',false))).status,400);
  delete process.env.STRIPE_SECRET_KEY;assert.equal((await webhook(signed('invoice.paid'))).status,503);process.env.STRIPE_SECRET_KEY='sk_live_fixture';
  // A legacy paid contract can belong to another customer of the same member.
  // Both invoice and renewal deliveries must succeed without replacing access.
  const current={...fixture(),id:'sub_current',customer:'cus_current'};
  state.user={...freeUser,app_metadata:{role:'premium',billing_customer_id:'cus_current',subscription:{stripeCustomerId:'cus_current',stripeSubscriptionId:'sub_current'}}};
  state.subscription={...fixture(),metadata:{}}; // ownership falls back to the old Checkout session
  state.subscriptions={sub_current:current};
  const beforeLegacy=state.writes.length;
  const currentUser=state.user;
  assert.equal((await webhook(signed('customer.subscription.updated'))).status,200);
  assert.equal((await webhook(signed('invoice.paid'))).status,200);
  assert.equal(state.writes.length,beforeLegacy);assert.equal(state.user,currentUser);
  current.status='canceled';state.user={...currentUser,app_metadata:{...currentUser.app_metadata,role:'free'}};
  assert.equal((await webhook(signed('invoice.paid'))).status,200);
  assert.equal(state.user.app_metadata.role,'free','a paid legacy contract must not restore access after the current contract ends');
  assert.equal(state.writes.length,beforeLegacy);
  current.metadata.userId=other;
  await assert.rejects(syncSubscription(new FakeStripe(),'sub_fixture'),/関連付けが一致/);
  current.metadata.userId=uid;current.customer='cus_wrong';
  await assert.rejects(syncSubscription(new FakeStripe(),'sub_fixture'),/関連付けが一致/);
  current.customer='cus_current';state.failSubscription='sub_current';
  assert.equal((await webhook(signed('invoice.paid'))).status,503,'unavailable ownership verification must remain retryable');
  delete state.failSubscription;delete state.subscriptions;state.user=verifiedUser;state.subscription=fixture();
  state.unrelated=true;state.subscription={...fixture(),metadata:{}};const writesBeforeUnrelated=state.writes.length;
  assert.equal((await webhook(signed('customer.subscription.updated'))).status,200);assert.equal(state.writes.length,writesBeforeUnrelated);state.unrelated=false;state.subscription=fixture();
  state.failSave=true;assert.equal((await webhook(signed('customer.subscription.updated'))).status,503);state.failSave=false;
  state.subscription=fixture();await webhook(signed('invoice.paid'));assert.equal(state.user.app_metadata.role,'premium');
  state.subscription.status='canceled';await webhook(signed('customer.subscription.deleted'));assert.equal(state.user.app_metadata.role,'free');
  await webhook(signed('customer.subscription.updated'));assert.equal(state.user.app_metadata.role,'free','late event must retrieve current canceled state');
  // Re-enrollment after a dashboard customer deletion creates one replacement,
  // persists it first, rotates both idempotency keys and ignores old terminal events.
  const deletedUser={...freeUser,app_metadata:{role:'free',billing_customer_id:'cus_deleted',subscription:{stripeCustomerId:'cus_deleted',stripeSubscriptionId:'sub_deleted',status:'none'}}};
  const deletedSub={...fixture(),id:'sub_deleted',customer:'cus_deleted',status:'canceled'};
  state.user=deletedUser;state.deletedCustomer='cus_deleted';state.nextCustomer='cus_recreated';state.subscriptions={sub_deleted:deletedSub};state.sessions=[];
  const createsBefore=state.customerCreates.length;
  assert.equal((await portal(req('/api/stripe/portal',{}))).status,409);
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,200);
  assert.equal(state.customerCreates.length,createsBefore+1);
  const replacementKey=state.customerCreates.at(-1).options.idempotencyKey;
  assert.notEqual(replacementKey,state.customerCreates[0].options.idempotencyKey);
  assert.equal(state.checkouts.at(-1).body.customer,'cus_recreated');
  assert.notEqual(state.checkouts.at(-1).options.idempotencyKey,firstKey);
  const replacementCheckoutKey=state.checkouts.at(-1).options.idempotencyKey;
  assert.equal(state.user.app_metadata.billing_customer_id,'cus_recreated');assert.equal(state.user.app_metadata.subscription,null);
  assert.equal(state.user.app_metadata.role,'free');assert.deepEqual(Array.from(state.user.app_metadata.billing_retired_customer_ids),['cus_deleted']);
  await checkout(req('/api/stripe/checkout',{plan:'monthly'}));
  assert.equal(state.customerCreates.length,createsBefore+1);assert.equal(state.checkouts.at(-1).options.idempotencyKey,replacementCheckoutKey);
  const retiredWrites=state.writes.length;
  assert.equal((await webhook(signed('customer.subscription.deleted',true,'sub_deleted'))).status,200);
  assert.equal(state.writes.length,retiredWrites);assert.equal(state.user.app_metadata.billing_customer_id,'cus_recreated');
  deletedSub.status='active';await assert.rejects(syncSubscription(new FakeStripe(),'sub_deleted'),/関連付けが一致/);deletedSub.status='canceled';
  state.subscriptions.sub_recreated={...fixture(),id:'sub_recreated',customer:'cus_recreated'};
  await syncSubscription(new FakeStripe(),'sub_recreated',uid);assert.equal(state.user.app_metadata.role,'premium');
  const writesAfterNewPayment=state.writes.length;
  assert.equal((await webhook(signed('customer.subscription.deleted',true,'sub_deleted'))).status,200);
  assert.equal(state.writes.length,writesAfterNewPayment);assert.equal(state.user.app_metadata.role,'premium');assert.equal(state.user.app_metadata.subscription.stripeSubscriptionId,'sub_recreated');
  state.user=deletedUser;state.failSave=true;const beforeFailedReplacement=state.checkouts.length;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);
  assert.equal(state.checkouts.length,beforeFailedReplacement);assert.equal(state.user.app_metadata.billing_customer_id,'cus_deleted');
  assert.equal(state.customerCreates.at(-1).options.idempotencyKey,replacementKey);state.failSave=false;
  deletedSub.status='active';const beforeUnexpectedActive=state.customerCreates.length;
  assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,409);assert.equal(state.customerCreates.length,beforeUnexpectedActive);deletedSub.status='canceled';
  state.customerReadFails=true;assert.equal((await checkout(req('/api/stripe/checkout',{plan:'monthly'}))).status,503);assert.equal(state.customerCreates.length,beforeUnexpectedActive);state.customerReadFails=false;
  const auth=fs.readFileSync('src/contexts/AuthContext.tsx','utf8');assert(!/user_metadata\??\.role|setDemoRole|upgradeToPremium|localStorage\.getItem\(AUTH/.test(auth));
  const account=fs.readFileSync('src/app/account/subscription/page.tsx','utf8');assert(!/demo_upgraded|setDemoRole|upgradeToPremium/.test(account));
  console.log('Passed: authenticated billing, ownership, trusted roles, payment/expiry/cancellation, duplicate checkout, signature verification and webhook failure/retry. No external requests or charges.');
})().catch(error=>{console.error(error);process.exitCode=1;});
