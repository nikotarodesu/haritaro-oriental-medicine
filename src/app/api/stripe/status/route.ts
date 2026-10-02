import { authenticatedUser, BillingError, billingErrorResponse, stripeClient, syncSubscription } from '@/lib/billing';
export async function GET(request: Request) {
  try {
    let user = await authenticatedUser();
    const sessionId = new URL(request.url).searchParams.get('session_id');
    let subscriptionId: string | undefined = user.app_metadata.subscription?.stripeSubscriptionId;
    if (sessionId) {
      if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) throw new BillingError('決済情報を確認できません。', 400);
      const session = await stripeClient().checkout.sessions.retrieve(sessionId);
      if (session.metadata?.userId !== user.id || session.client_reference_id !== user.id) throw new BillingError('ご本人の決済のみ確認できます。', 403);
      if (session.status !== 'complete' || !['paid','no_payment_required'].includes(session.payment_status)) return Response.json({ pending: true }, { headers: { 'Cache-Control': 'no-store' } });
      subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
      if (!subscriptionId) throw new BillingError('契約情報を確認できません。', 409);
    }
    if (subscriptionId) user = await syncSubscription(stripeClient(), subscriptionId, user.id);
    return Response.json({ role: user.app_metadata.role || 'free', subscription: user.app_metadata.subscription || null }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return billingErrorResponse(error); }
}
