import Stripe from 'stripe';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { SUBSCRIPTION_CONFIG } from '@/config/subscription';
import type { UserSubscription } from '@/types/auth';

export class BillingError extends Error {
  constructor(message: string, public status = 503) { super(message); }
}
export function billingErrorResponse(error: unknown): Response {
  if (error instanceof BillingError) return Response.json({ error: error.message }, { status: error.status });
  console.error('Billing operation failed');
  return Response.json({ error: '契約情報を確認できませんでした。時間をおいて再度お試しください。' }, { status: 503 });
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new BillingError('このサイトから操作してください。', 403);
}
export async function authenticatedUser() {
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw new BillingError('Googleアカウントでログインしてください。', 401);
  return data.user;
}
export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) throw new BillingError('決済は現在準備中です。');
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-08-26.dahlia' });
}
export function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new BillingError('会員権限の反映設定が未完了のため、お申し込みを停止しています。');
  return createAdminClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}
export function subscriptionState(subscription: Stripe.Subscription): UserSubscription {
  const item = subscription.items.data[0];
  const interval = item?.price.recurring?.interval;
  const expected = SUBSCRIPTION_CONFIG.pricing[interval === 'year' ? 'yearly' : 'monthly'];
  if (subscription.items.data.length !== 1 || item?.price.currency !== 'jpy' || item.price.unit_amount !== expected.amount || !['month', 'year'].includes(interval || '') || item.price.recurring?.interval_count !== 1) {
    throw new BillingError('このサイトの対象プランを確認できません。', 409);
  }
  const invoice = subscription.latest_invoice;
  const paid = typeof invoice === 'object' && invoice !== null && invoice.status === 'paid';
  const status = subscription.status === 'active' && paid
    ? (subscription.cancel_at_period_end ? 'canceled' : 'active')
    : subscription.status === 'past_due' ? 'past_due' : ['incomplete', 'trialing'].includes(subscription.status) || (subscription.status === 'active' && !paid) ? 'incomplete' : 'none';
  return {
    plan: interval === 'year' ? 'yearly' : 'monthly', status,
    currentPeriodStart: (item.current_period_start || 0) * 1000,
    currentPeriodEnd: (item.current_period_end || 0) * 1000,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    stripeSubscriptionId: subscription.id,
  };
}
export async function syncSubscription(stripe: Stripe, subscriptionId: string, expectedUserId?: string) {
  // Retrieve current state for every delivery; delayed events never restore stale access.
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['latest_invoice'] });
  let userId = subscription.metadata.userId;
  if (!userId) {
    const sessions = await stripe.checkout.sessions.list({ subscription: subscription.id, limit: 1 });
    userId = sessions.data[0]?.metadata?.userId || '';
  }
  if (!userId || !/^[0-9a-f-]{36}$/i.test(userId)) throw new BillingError('契約と会員の関連付けを確認できません。', 409);
  if (expectedUserId && expectedUserId !== userId) throw new BillingError('ご本人の契約のみ確認できます。', 403);
  const admin = adminClient();
  const { data: { user }, error: getError } = await admin.auth.admin.getUserById(userId);
  if (getError || !user) throw new BillingError('会員情報の取得に失敗しました。');
  const state = subscriptionState(subscription);
  const existingId = user.app_metadata.subscription?.stripeSubscriptionId;
  // Ignore a late deletion from an older subscription when a newer one exists.
  if (existingId && existingId !== subscriptionId && state.status === 'none') return user;
  const { data, error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { ...user.app_metadata, role: user.app_metadata.role === 'admin' ? 'admin' : ['active', 'canceled'].includes(state.status) && state.currentPeriodEnd > Date.now() ? 'premium' : 'free', subscription: state },
  });
  if (error || !data.user) throw new BillingError('会員権限の反映に失敗しました。');
  return data.user;
}
