import { subscriptionAnalyticsRelayHtml } from '@/lib/subscriptionAnalyticsRelay';

export function GET() {
  const html = subscriptionAnalyticsRelayHtml(process.env.NEXT_PUBLIC_GA_ID || '');
  return new Response(html || null, {
    status: html ? 200 : 204,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline' https://www.googletagmanager.com; connect-src https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com; img-src https://*.google-analytics.com; frame-ancestors 'self'; base-uri 'none'; form-action 'none'",
    },
  });
}
