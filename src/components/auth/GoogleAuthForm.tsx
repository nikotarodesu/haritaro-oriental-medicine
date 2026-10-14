'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageIntro from '@/components/design/PageIntro';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';
import { safeReturnPath } from '@/utils/authPolicy';

export default function GoogleAuthForm({ mode }: { mode: 'login' | 'register' }) {
  const params = useSearchParams();
  const [error, setError] = useState('');
  const returnTo = safeReturnPath(params.get('returnTo'));
  const oauthError = params.get('error') === 'oauth_failed';
  return <div className="page-layout page-layout--compact space-y-6">
    <PageIntro eyebrow="学習とノートを、自分のアカウントで" title={mode === 'register' ? 'Googleで無料会員登録' : 'Googleでログイン'} description="Googleアカウントで登録・ログインできます。初めての方は認証後に無料アカウントが作成されます。" art="account" compact />
    <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border-washi)] bg-[var(--bg-card)] p-5 sm:p-7 space-y-5">
      {(error || oauthError) && <p role="alert" className="rounded-xl bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-700 dark:text-red-300">{error || 'Google認証が完了しませんでした。もう一度お試しください。'}</p>}
      <GoogleSignInButton mode={mode} returnTo={returnTo} onError={setError} />
      <p className="flex items-start gap-3 text-sm leading-relaxed text-[#59615D] dark:text-[#96A6B2]"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-readable)]" aria-hidden="true" /><span>Google認証画面でアカウントを選び、完了すると元のページへ戻ります。サイト用のパスワードを作る必要はありません。ログインだけで料金が発生することはありません。</span></p>
      <p className="text-sm leading-relaxed">マイノートはログイン後に同期状態を確認できます。学習進捗はこのブラウザに保存されます。</p>
      <p className="text-sm"><Link className="underline" href="/terms">利用規約</Link>・<Link className="underline" href="/privacy">プライバシーポリシー</Link>をご確認ください。</p>
    </div>
    <p className="text-center text-sm"><Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4" href={returnTo === '/account/subscription' ? '/learn' : returnTo}><ArrowLeft size={16} aria-hidden="true" />ログインせずに学習を続ける</Link></p>
  </div>;
}
