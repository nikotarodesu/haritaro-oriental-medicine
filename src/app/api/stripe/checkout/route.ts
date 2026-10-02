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
    const { data: { user: account }, error: fulfillmentError } = await admin.auth.admin.getUserById(user.id);
    if (fulfillmentError || !account) throw new BillingError('会員権限の反映設定を確認中です。お申し込みはまだ確定していません。');
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new BillingError('決済の連携設定が未完了です。');
    const stripe = stripeClient();
    const config = SUBSCRIPTION_CONFIG.pricing[plan];
    const priceId = plan === 'monthly' ? process.env.STRIPE_PRICE_ID_MONTHLY : process.env.STRIPE_PRICE_ID_YEARLY;
    if (!priceId || !/^price_[A-Za-z0-9]+$/.test(priceId)) throw new BillingError('料金プランは現在準備中です。');
    const price = await stripe.prices.retrieve(priceId);
    if (!price.active || price.currency !== 'jpy' || price.unit_amount !== config.amount || price.recurring?.interval !== config.billingInterval || price.recurring?.interval_count !== 1) throw new BillingError('料金の設定を確認中です。');
    let customerId: string | undefined = account.app_metadata.billing_customer_id || account.app_metadata.subscription?.stripeCustomerId;
    if (!customerId) {
      // Persist ownership before creating any payable session. A save failure stops sales.
      const customer = await stripe.customers.create({ metadata: { userId: user.id, application: 'haritaro' } }, {
        idempotencyKey: 'haritaro_customer_' + createHash('sha256').update(user.id).digest('hex'),
      });
      customerId = customer.id;
      const { error } = await admin.auth.admin.updateUserById(user.id, { app_metadata: { ...account.app_metadata, billing_customer_id: customerId } });
      if (error) throw new BillingError('会員情報の保存を確認中です。お申し込みはまだ確定していません。');
    }
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted || (customer.metadata.userId && customer.metadata.userId !== user.id)) throw new BillingError('決済と会員の関連付けを確認できません。', 409);
    const current = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 });
    if (current.has_more || current.data.some(sub => ['active','trialing','past_due','incomplete','unpaid','paused'].includes(sub.status))) throw new BillingError('既存の契約があります。マイページの決済管理から変更してください。', 409);
    const sessions = await stripe.checkout.sessions.list({ customer: customerId, limit: 100 });
    if (sessions.has_more) throw new BillingError('決済履歴の確認が必要です。お問い合わせください。', 409);
    const previous = sessions.data.find(session => session.mode === 'subscription' && session.metadata?.userId === user.id);
    const open = sessions.data.find(session => session.status === 'open' && session.mode === 'subscription');
    if (open) {
      if (open.metadata?.userId !== user.id || open.metadata?.plan !== plan) throw new BillingError('未完了のお申し込みがあります。先に選んだプランから決済を再開するか、決済画面の期限切れを待ってください。', 409);
      if (!open.url) throw new BillingError('決済画面を確認できませんでした。');
      return Response.json({ url: open.url }, { headers: { 'Cache-Control': 'no-store' } });
    }
    // A completed checkout may precede subscription visibility or webhook delivery.
    if (previous?.status === 'complete') {
      const id = typeof previous.subscription === 'string' ? previous.subscription : previous.subscription?.id;
      if (!id) throw new BillingError('先ほどのお申し込みを確認中です。マイページで契約状態を再確認してください。', 409);
      const existing = await stripe.subscriptions.retrieve(id);
      if (!['canceled', 'incomplete_expired'].includes(existing.status)) throw new BillingError('先ほどのお申し込みがあります。マイページで契約状態を再確認してください。', 409);
    }
    // Advance only after Stripe records the preceding attempt, never on a clock bucket.
    // Concurrent plan selections share a key: Stripe rejects different parameters.
    const attempt = createHash('sha256').update(user.id + ':' + (previous?.id || 'first')).digest('hex');
    const origin = new URL(request.url).origin;
    const suffix = attempt.slice(0,8).replace(/[0-9]/g, char => String.fromCharCode(97 + Number(char)));
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      client_reference_id: user.id, metadata: { userId: user.id, plan }, subscription_data: { metadata: { userId: user.id, plan } },
      integration_identifier: 'haritaro_' + suffix,
      success_url: origin + '/account/subscription?session_id={CHECKOUT_SESSION_ID}', cancel_url: origin + '/pricing?canceled=true',
    }, { idempotencyKey: 'haritaro_checkout_' + attempt });
    if (!session.url) throw new BillingError('決済画面を確認できませんでした。');
    return Response.json({ url: session.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error && error.type === 'StripeIdempotencyError') return billingErrorResponse(new BillingError('別のお申し込みを処理中です。先に選んだプランから再度お試しください。', 409));
    return billingErrorResponse(error);
  }
}
