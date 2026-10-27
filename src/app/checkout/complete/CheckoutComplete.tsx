'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageIntro from '@/components/design/PageIntro';
import { useAuth } from '@/contexts/AuthContext';
import { isPurchaseReceipt, trackSubscriptionPurchase } from '@/utils/analytics';

export default function CheckoutComplete() {
  const { user, isLoading, refreshUser } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('お支払いと会員サービスへの反映を確認しています。');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const check = useCallback(async (signal?: AbortSignal) => {
    setProcessing(true); setError('');
    try {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) throw new Error('決済情報を確認できません。マイページで契約状態をご確認ください。');
      const response = await fetch('/api/stripe/status?session_id=' + encodeURIComponent(sessionId), { cache: 'no-store', signal });
      const data = await response.json();
      if (signal?.aborted) return false;
      if (!response.ok) throw new Error(data.error || 'お申し込みを確認できませんでした。');
      if (data.pending) { setMessage('決済の確定を待っています。再度お申し込みせず、そのままお待ちください。'); return true; }
      if (isPurchaseReceipt(data.purchase)) {
        trackSubscriptionPurchase(data.purchase);
        setMessage('お支払いとプレミアム会員への反映を確認しました。');
      } else {
        setMessage('サーバーの契約情報を確認しました。現在の状態はマイページでご確認いただけます。');
      }
      setConfirmed(true);
      await refreshUser();
    } catch (cause) {
      if (!signal?.aborted) setError(cause instanceof Error ? cause.message : 'お申し込みを確認できませんでした。');
    } finally { if (!signal?.aborted) setProcessing(false); }
    return false;
  }, [refreshUser]);

  useEffect(() => {
    if (isLoading || !user?.id) return;
    const abort = new AbortController();
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      if (abort.signal.aborted) return;
      const pending = await check(abort.signal);
      if (!pending || abort.signal.aborted) return;
      if (attempts++ < 5) timer = setTimeout(() => void poll(), attempts * 2000);
      else setMessage('決済の確定に時間がかかっています。再度お申し込みせず、「もう一度確認」をお試しください。');
    };
    timer = setTimeout(() => void poll(), 0);
    return () => { abort.abort(); clearTimeout(timer); };
  }, [isLoading, user?.id, check]);

  return <div className="page-layout page-layout--reading space-y-6">
    <PageIntro eyebrow="お申し込み" title="お支払いと会員サービスを確認" description="確認が終わるまで、重ねてお申し込みいただく必要はありません。" art="account" compact />
    {!isLoading && !user ? <section className="space-y-4">
      <p>お申し込みに使用したGoogleアカウントでログインして、決済を確認してください。</p>
      <button className="page-secondary-action" onClick={() => router.push('/auth/login?returnTo=' + encodeURIComponent('/checkout/complete' + window.location.search))}>Googleでログインして確認</button>
    </section> : <section className="space-y-4">
      <p role="status">{message}</p>
      {error && <p role="alert" className="text-red-700 dark:text-red-300">{error}</p>}
      {user && !confirmed && <button className="page-secondary-action disabled:opacity-60" disabled={processing} onClick={() => void check()}>{processing ? '確認中…' : 'もう一度確認'}</button>}
    </section>}
    <div className="flex flex-wrap gap-3">
      <Link className="page-secondary-action" href="/account/subscription">マイページ・契約管理へ</Link>
      <Link className="page-secondary-action" href="/clinical">臨床ホームへ</Link>
    </div>
    <p className="text-sm page-muted">確認できない場合は、追加の申し込みをせず<Link className="underline" href="/contact">お問い合わせ</Link>ください。</p>
  </div>;
}
