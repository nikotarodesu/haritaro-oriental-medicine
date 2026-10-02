import type { UserSubscription } from '@/types/auth';

export function safeReturnPath(value: string | null | undefined, fallback = '/account/subscription'): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return fallback;
  try {
    const url = new URL(value, 'https://www.haritaro.jp');
    return url.origin === 'https://www.haritaro.jp' ? url.pathname + url.search + url.hash : fallback;
  } catch { return fallback; }
}

export function hasPremiumAccess(role: unknown, subscription: UserSubscription | undefined, now = Date.now()): boolean {
  if (role === 'admin') return true;
  return role === 'premium' && Boolean(subscription && Number.isFinite(subscription.currentPeriodEnd) && subscription.currentPeriodEnd > now && ['active', 'canceled'].includes(subscription.status));
}
