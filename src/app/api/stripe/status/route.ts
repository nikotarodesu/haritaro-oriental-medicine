import { authenticatedUser, BillingError, billingErrorResponse, stripeClient, syncSubscription } from '@/lib/billing';
import { createHash } from 'node:crypto';
import type Stripe from 'stripe';
export async function GET(request: Request) {
  try {
    let user = await authenticatedUser();
    const sessionId = new URL(request.url).searchParams.get('session_id');
    let checkout: Stripe.Checkout.Session | undefined;
    let subscriptionId: string | undefined = user.app_metadata.subscription?.stripeSubscriptionId;
    if (sessionId) {
      if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) throw new BillingError('決済情報を確認できません。', 400);
      const session = await stripeClient().checkout.sessions.retrieve(sessionId);
      if (session.metadata?.userId !== user.id || session.client_reference_id !== user.id) throw new BillingError('ご本人の決済のみ確認できます。', 403);
      if (session.status !== 'complete' || !['paid','no_payment_required'].includes(session.payment_status)) return Response.json({ pending: true }, { headers: { 'Cache-Control': 'no-store' } });
      subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
      if (!subscriptionId) throw new BillingError('契約情報を確認できません。', 409);
      checkout = session;
    }
    if (subscriptionId) {
      const synced = await syncSubscription(stripeClient(), subscriptionId, user.id);
      if (!synced) throw new BillingError('ご本人の契約を確認できません。', 409);
      user = synced;
    }
    const current = user.app_metadata.subscription;
    const eligible = checkout && checkout.metadata?.analyticsVersion === '1'
      && checkout.created * 1000 >= Date.now() - 7 * 86400000 && checkout.created * 1000 <= Date.now()
      && current?.stripeSubscriptionId === subscriptionId && ['active', 'canceled'].includes(current.status)
      && current.currentPeriodEnd > Date.now() && ['monthly', 'yearly'].includes(current.plan)
      && checkout.currency === 'jpy' && Number.isInteger(checkout.amount_total) && checkout.amount_total !== null && checkout.amount_total >= 0;
    const purchase = eligible && checkout ? { transactionId: 'ht_' + createHash('sha256').update(checkout.id).digest('hex'), plan: current.plan, currency: 'JPY', value: checkout.amount_total } : null;
    return Response.json({ role: user.app_metadata.role || 'free', subscription: current || null, purchase }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return billingErrorResponse(error); }
}
