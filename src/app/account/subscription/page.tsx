"use client";
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { SUBSCRIPTION_CONFIG } from '@/config/subscription';
export default function SubscriptionManagementPage() {
  const {user,isLoading,isPremium,refreshUser,logout,migrateLocalData}=useAuth();
  const {clipCount,maxLimit,patientNoteCount,maxPatientNoteLimit,syncStatus,triggerSync}=useClinicalMemo();
  const [message,setMessage]=useState('');const [error,setError]=useState('');const [processing,setProcessing]=useState(false);
  const [localReport,setLocalReport]=useState<ReturnType<typeof migrateLocalData>|null>(null);
  const checkBilling=useCallback(async(sessionId?:string)=>{
    setProcessing(true);setError('');
    try {
      const url='/api/stripe/status'+(sessionId?'?session_id='+encodeURIComponent(sessionId):'');
      const response=await fetch(url,{cache:'no-store'});const data=await response.json();
      if(!response.ok)throw new Error(data.error||'契約情報を確認できませんでした。');
      if(data.pending){setMessage('決済の確定を待っています。自動で再確認します。しばらく反映されない場合は「契約状態を再確認」を押してください。');return true;}
      await refreshUser();
      if(sessionId){setMessage(data.role==='premium'?'決済と会員権限の反映を確認しました。':'決済情報を確認しました。現在の契約状態をご確認ください。');window.history.replaceState({},'',window.location.pathname);}
      else setMessage('サーバーの契約状態を確認しました。');
    }catch(err){setError(err instanceof Error?err.message:'契約情報を確認できませんでした。');}
    finally{setProcessing(false);}
    return false;
  },[refreshUser]);
  useEffect(()=>{
    if(isLoading||!user?.id)return;
    let stopped=false;let attempts=0;
    const sessionId=new URLSearchParams(window.location.search).get('session_id')||undefined;
    let timer:ReturnType<typeof setTimeout>;
    const poll=async()=>{
      if(stopped)return;
      const pending=await checkBilling(sessionId);
      if(stopped||!pending)return;
      if(attempts++<5)timer=setTimeout(()=>void poll(),attempts*2000);
      else setMessage('決済の確定に時間がかかっています。再度お申し込みせず「契約状態を再確認」を押してください。反映されない場合はお問い合わせください。');
    };
    timer=setTimeout(()=>void poll(),0);
    return ()=>{stopped=true;clearTimeout(timer);};
  },[isLoading,user?.id,checkBilling]);
  const openPortal=async()=>{
    setProcessing(true);setError('');
    try{const response=await fetch('/api/stripe/portal',{method:'POST'});const data=await response.json();if(!response.ok||!data.url)throw new Error(data.error||'契約管理を開けませんでした。');window.location.assign(data.url);}
    catch(err){setError(err instanceof Error?err.message:'契約管理を開けませんでした。');setProcessing(false);}
  };
  const signOut=async()=>{try{await logout();setMessage('ログアウトしました。');setError('');}catch(err){setError(err instanceof Error?err.message:'ログアウトできませんでした。');}};
  const subscription=user?.subscription;
  const plan=SUBSCRIPTION_CONFIG.pricing[subscription?.plan==='yearly'?'yearly':'monthly'];
  const statusLabels={active:'有効',canceled:'次回更新を停止・期間満了まで有効',past_due:'お支払いの確認が必要',incomplete:'決済の確定待ち',none:'有効な契約なし'};
  const syncLabels={local:'このブラウザ内に保存',syncing:'クラウド同期中',synced:'クラウド同期済み',offline:'同期未完了・通信や設定を確認してください'};
  const button='inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] px-4 py-3 text-sm font-bold disabled:opacity-60';
  return <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16 space-y-6 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">マイページ・契約管理</h1>
    <p className="text-sm leading-relaxed">契約は決済サービスで確認します。解約・再開・支払方法の変更はStripeの管理画面で手続きできます。</p>
    {message&&<p role="status" className="rounded-xl bg-[#EBF3EF] dark:bg-[#182823] p-4 text-sm">{message}</p>}
    {error&&<p role="alert" className="rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 p-4 text-sm">{error}</p>}
    <section className="rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 space-y-4">
      <h2 className="font-bold text-xl">{isLoading?'ログイン状態を確認中...':user?(isPremium?'プレミアム会員':'無料会員'):'未ログイン'}</h2>
      {user?<><p className="break-all text-sm">{user.name} ／ {user.email}</p><button onClick={signOut} className={button}>ログアウト</button></>:<Link className={button} href="/auth/login?returnTo=%2Faccount%2Fsubscription">Googleでログイン・無料登録</Link>}
      {subscription&&<dl className="grid sm:grid-cols-2 gap-4 text-sm"><div><dt>契約状態</dt><dd className="font-bold mt-1">{statusLabels[subscription.status]||'確認が必要です'}</dd></div><div><dt>プラン</dt><dd className="font-bold mt-1">{plan.displayPrice} / {plan.periodLabel}（税込）</dd></div><div><dt>現在の期間満了日</dt><dd className="font-bold mt-1">{subscription.currentPeriodEnd?new Date(subscription.currentPeriodEnd).toLocaleDateString('ja-JP'):'未確定'}</dd></div></dl>}
      <div className="flex flex-wrap gap-3">
        {user&&<button disabled={processing} onClick={()=>checkBilling(new URLSearchParams(window.location.search).get('session_id')||undefined)} className={button}>{processing?'契約情報を確認中...':'契約状態を再確認'}</button>}
        {subscription?.stripeCustomerId&&<button disabled={processing} onClick={openPortal} className={button}>Stripeで契約・解約・支払方法を管理</button>}
        {!isPremium&&<Link href="/pricing" className={button}>料金と無料版との違いを見る</Link>}
      </div>
      <p className="text-xs leading-relaxed">決済完了画面への移動だけでは会員権限は変わりません。反映されない場合は契約状態を再確認し、<Link href="/contact" className="underline">お問い合わせ</Link>ください。</p>
    </section>
    <section className="rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 space-y-4">
      <h2 className="text-xl font-bold">保存データと同期状態</h2>
      <p className="text-sm">臨床ノート {patientNoteCount} / {maxPatientNoteLimit}件 ／ 配穴・ツボストック {clipCount} / {maxLimit}件</p>
      <p role="status" className="text-sm font-bold">{syncLabels[syncStatus]}</p>
      <p className="text-xs leading-relaxed">学習進捗・クイズ履歴はこのブラウザに保存されます。クラウド同期の表示は臨床ノートと配穴ストックの状態です。マイノートから手元にバックアップも保存できます。</p>
      <div className="flex flex-wrap gap-3"><button disabled={!user||syncStatus==='syncing'} onClick={()=>void triggerSync()} className={button}>ノートの同期を再試行</button><button onClick={()=>setLocalReport(migrateLocalData())} className={button}>端末内の学習データ件数を確認</button><Link href="/notes" className={button}>マイノート・バックアップへ</Link></div>
      {localReport&&<p className="text-xs">このブラウザ：配穴・ツボ {localReport.memoCount}件、完了した講義 {localReport.curriculumProgressCount}件、クイズ履歴 {localReport.quizResultCount}件。件数確認はデータ移行や同期の完了を意味しません。</p>}
    </section>
  </div>;
}
