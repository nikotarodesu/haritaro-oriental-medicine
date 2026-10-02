/* eslint-disable @typescript-eslint/no-require-imports -- This operator script runs as CommonJS. */
// Operator-only, read-only diagnostics. Never print keys, API bodies or customer data.
const { loadEnvConfig } = require('@next/env');
const Stripe = require('stripe');
loadEnvConfig(process.cwd());
const results = [];
const check = (name, ok, detail) => results.push({ name, status: ok ? 'OK' : 'NEEDS_ACTION', detail });
const events = ['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted', 'customer.subscription.paused', 'customer.subscription.resumed', 'invoice.paid', 'invoice.payment_failed', 'invoice.payment_action_required'];
async function remote(name, action) {
  try { await action(); }
  catch { check(name, false, '読み取り確認に失敗。キーの権限・接続先・設定を管理画面で確認してください。'); }
}
(async () => {
  const key = process.env.STRIPE_SECRET_KEY || '';
  const live = /^(sk|rk)_live_/.test(key);
  check('Stripeキー', /^(sk|rk)_(test|live)_/.test(key), live ? '本番用' : 'テスト用または未設定');
  if (process.argv.includes('--production')) check('本番環境のキー', live, '本番サイトには本番キーが必要');
  for (const name of ['STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_ID_MONTHLY', 'STRIPE_PRICE_ID_YEARLY', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']) check(name, Boolean(process.env[name]), '値は表示しません');
  check('販売スイッチ', process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTION_SALES === 'true', '設定完了と決済の通し検証後に有効化');
  if (process.argv.includes('--remote') && key) {
    const stripe = new Stripe(key, { apiVersion: '2026-08-26.dahlia', timeout: 15000, maxNetworkRetries: 1 });
    for (const [plan, amount, interval] of [['MONTHLY', 980, 'month'], ['YEARLY', 9800, 'year']]) {
      const id = process.env['STRIPE_PRICE_ID_' + plan];
      if (id) await remote(plan + '料金', async () => {
        const price = await stripe.prices.retrieve(id);
        check(plan + '料金', price.active && price.currency === 'jpy' && price.unit_amount === amount && price.recurring?.interval === interval && price.recurring?.interval_count === 1 && price.livemode === live, '有効なJPY継続価格・金額・期間・環境を照合');
        check(plan + '税込価格', price.tax_behavior === 'inclusive', 'サイトの税込表示と一致するか確認。automatic_taxは自動で有効化しません');
      });
    }
    await remote('Webhook', async () => {
      const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
      const destination = process.env.BILLING_CHECK_WEBHOOK_URL || 'https://www.haritaro.jp/api/webhook/stripe';
      const endpoint = endpoints.data.find(item => item.url === destination);
      check('Webhook', Boolean(endpoint && endpoint.status === 'enabled' && endpoint.livemode === live && (endpoint.enabled_events.includes('*') || events.every(event => endpoint.enabled_events.includes(event)))), '宛先・有効状態・受信イベントを照合。署名キーの一致は実際の配信テストで確認');
    });
    await remote('契約管理画面', async () => {
      const configs = await stripe.billingPortal.configurations.list({ active: true, limit: 100 });
      const config = configs.data.find(item => item.is_default);
      check('契約管理画面', Boolean(config?.features.subscription_cancel.enabled && config.features.subscription_cancel.mode === 'at_period_end' && config.features.payment_method_update.enabled && config.features.invoice_history.enabled), '既定設定の期間末解約・支払方法変更・請求履歴を確認');
    });
  }
  console.log(JSON.stringify({ checks: results, verification: '設定診断のみ。Google本人認証・決済・会員権限反映の通し検証は別途必要。APIの作成・更新・請求は行いません。' }, null, 2));
  if (results.some(result => result.status !== 'OK')) process.exitCode = 1;
})().catch(() => { console.error('診断を完了できませんでした。秘密情報は出力していません。'); process.exitCode = 1; });
