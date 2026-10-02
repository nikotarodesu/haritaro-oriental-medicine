import { createHash } from 'node:crypto';
import { SUBSCRIPTION_CONFIG, isSubscriptionSalesEnabled } from '@/config/subscription';
import { adminClient, authenticatedUser, BillingError, billingErrorResponse, checkOrigin, stripeClient } from '@/lib/billing';
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const user = await authenticatedUser();
    const { plan }: { plan?: unknown } = await request.json();
    if (plan !== 'monthly' && plan !== 'yearly') throw new BillingError('プランを選択してください。', 400);
    if (!isSubscriptionSalesEnabled()) throw new BillingError('お申し込みは現在準備中です。');
    if (['www.haritaro.jp','haritaro.jp'].includes(new URL(request.url).hostname) && !/^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || '')) throw new BillingError('本番決済の準備中です。お申し込みはまだ確定していません。');
    const admin = adminClient();
    const { error: fulfillmentError } = await admin.auth.admin.getUserById(user.id);
    if (fulfillmentError) throw new BillingError('会員権限の反映設定を確認中です。お申し込みはまだ確定していません。');
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new BillingError('決済の連携設定が未完了です。');
    const stripe = stripeClient();
    const config = SUBSCRIPTION_CONFIG.pricing[plan];
    const priceId = plan === 'monthly' ? process.env.STRIPE_PRICE_ID_MONTHLY : process.env.STRIPE_PRICE_ID_YEARLY;
    if (!priceId || !/^price_[A-Za-z0-9]+$/.test(priceId)) throw new BillingError('料金プランは現在準備中です。');
    const price = await stripe.prices.retrieve(priceId);
    if (!price.active || price.currency !== 'jpy' || price.unit_amount !== config.amount || price.recurring?.interval !== config.billingInterval || price.recurring?.interval_count !== 1) throw new BillingError('料金の設定を確認中です。');
    const customerId: string | undefined = user.app_metadata.subscription?.stripeCustomerId;
    if (customerId) {
      const current = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 });
      if (current.data.some(sub => ['active','trialing','past_due','incomplete','unpaid','paused'].includes(sub.status))) throw new BillingError('既存の契約があります。マイページの決済管理から変更してください。', 409);
    }
    const origin = new URL(request.url).origin;
    const suffix = createHash('sha256').update(user.id + plan + Math.floor(Date.now()/300000)).digest('hex').slice(0,8).replace(/[0-9]/g, char => String.fromCharCode(97 + Number(char)));
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', line_items: [{ price: priceId, quantity: 1 }],
      ...(customerId ? { customer: customerId } : { customer_email: user.email }),
      client_reference_id: user.id, metadata: { userId: user.id, plan }, subscription_data: { metadata: { userId: user.id, plan } },
      integration_identifier: 'haritaro_' + suffix,
      success_url: origin + '/account/subscription?session_id={CHECKOUT_SESSION_ID}', cancel_url: origin + '/pricing?canceled=true',
    }, { idempotencyKey: 'checkout_' + user.id + '_' + plan + '_' + Math.floor(Date.now() / 300000) });
    return Response.json({ url: session.url });
  } catch (error) { return billingErrorResponse(error); }
}
