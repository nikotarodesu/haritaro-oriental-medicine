'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { safeReturnPath } from '@/utils/authPolicy';

export default function GoogleAuthForm({ mode }: { mode: 'login' | 'register' }) {
  const params = useSearchParams();
  const [error, setError] = useState('');
  const returnTo = safeReturnPath(params.get('returnTo'));
  const oauthError = params.get('error') === 'oauth_failed';
  return <div className="mx-auto max-w-md px-4 py-12 sm:py-20 space-y-6 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-2xl font-bold text-center">{mode === 'register' ? 'Googleで無料会員登録' : 'Googleでログイン'}</h1>
    <p className="text-sm text-center leading-relaxed">Googleアカウントで登録・ログインできます。初めての方は認証後に無料アカウントが作成されます。</p>
    <div className="rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] p-5 sm:p-7 space-y-5">
      {(error || oauthError) && <p role="alert" className="rounded-xl bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-700 dark:text-red-300">{error || 'Google認証が完了しませんでした。もう一度お試しください。'}</p>}
      <GoogleSignInButton mode={mode} returnTo={returnTo} onError={setError} />
      <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">Google認証画面でアカウントを選び、完了すると元のページへ戻ります。サイト用のパスワードを作る必要はありません。ログインだけで料金が発生することはありません。</p>
      <p className="text-xs leading-relaxed">マイノートはログイン後に同期状態を確認できます。学習進捗はこのブラウザに保存されます。</p>
      <p className="text-xs"><Link className="underline" href="/terms">利用規約</Link>・<Link className="underline" href="/privacy">プライバシーポリシー</Link>をご確認ください。</p>
    </div>
    <p className="text-center text-sm"><Link className="inline-flex min-h-11 items-center underline" href={returnTo === '/account/subscription' ? '/learn' : returnTo}>ログインせずに学習を続ける →</Link></p>
  </div>;
}
