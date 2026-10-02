import { isSubscriptionSalesEnabled } from '@/config/subscription';
export async function GET(request: Request) {
  const productionSite = ['www.haritaro.jp','haritaro.jp'].includes(new URL(request.url).hostname);
  const key = process.env.STRIPE_SECRET_KEY || '';
  const available = Boolean(isSubscriptionSalesEnabled() && key && (!productionSite || /^(sk|rk)_live_/.test(key)) && process.env.STRIPE_WEBHOOK_SECRET && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.STRIPE_PRICE_ID_MONTHLY && process.env.STRIPE_PRICE_ID_YEARLY);
  return Response.json({ available }, { headers: { 'Cache-Control': 'no-store' } });
}
