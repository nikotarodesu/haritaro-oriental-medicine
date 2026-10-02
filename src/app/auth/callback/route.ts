import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { safeReturnPath } from '@/utils/authPolicy';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeReturnPath(url.searchParams.get('next'));
  const code = url.searchParams.get('code');
  if (code) {
    try { const { error } = await (await createClient()).auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
    } catch { /* Return a retry link without exposing provider errors. */ }
  }
  const destination = new URL('/auth/login', url.origin);
  destination.searchParams.set('error','oauth_failed'); destination.searchParams.set('returnTo',next);
  return NextResponse.redirect(destination);
}
