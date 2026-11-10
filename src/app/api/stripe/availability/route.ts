import { isSubscriptionSalesEnabled } from '@/config/subscription';
export async function GET(request: Request) {
  const productionSite = ['www.haritaro.jp','haritaro.jp'].includes(new URL(request.url).hostname);
  const key = process.env.STRIPE_SECRET_KEY || '';
  const available = Boolean(isSubscriptionSalesEnabled() && key && (!productionSite || /^(sk|rk)_live_/.test(key)) && process.env.STRIPE_WEBHOOK_SECRET && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.STRIPE_PRICE_ID_MONTHLY && process.env.STRIPE_PRICE_ID_YEARLY && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (available) {
    try {
      const health = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
        cache: 'no-store', signal: AbortSignal.timeout(4000),
      });
      if (!health.ok) throw new Error('Authentication unavailable');
    } catch {
      // A connection failure does not establish that sales are intentionally stopped.
      return Response.json({ error: '受付状況を確認できませんでした。' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
  }
  return Response.json({ available }, { headers: { 'Cache-Control': 'no-store' } });
}
