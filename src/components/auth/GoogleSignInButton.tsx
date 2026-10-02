"use client";
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { safeReturnPath } from '@/utils/authPolicy';
interface Credential { credential?: string }
interface GoogleId {
  initialize: (config: {client_id: string; callback: (response: Credential)=>void; nonce: string; auto_select: boolean; context: string}) => void;
  renderButton: (parent: HTMLElement, options: {type: string;theme: string;size: string;text: string;shape: string;width: number;locale: string}) => void;
  cancel: () => void;
}
declare global { interface Window { google?: { accounts: { id: GoogleId } } } }
export default function GoogleSignInButton({mode='login', returnTo='/account/subscription', onError, className=''}: {mode?: 'login'|'register';returnTo?: string;onError?: (message:string)=>void;className?: string}) {
  const router = useRouter(); const {isConfigured,loginWithGoogle,loginWithGoogleIdToken}=useAuth();
  const container=useRef<HTMLDivElement>(null); const report=useRef(onError);
  const [busy,setBusy]=useState(false); const [ready,setReady]=useState(false);
  const [nonce,setNonce]=useState<{raw:string;hash:string}|null>(null);
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  useEffect(()=>{report.current=onError;},[onError]);
  useEffect(()=>{
    let active=true;
    const prepare=async()=>{
      try {
        const bytes=crypto.getRandomValues(new Uint8Array(32)); const raw=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
        const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw));
        if(active)setNonce({raw,hash:Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')});
      } catch { /* OAuth remains available if secure nonce generation fails. */ }
    }; void prepare(); return ()=>{active=false;};
  },[]);
  useEffect(()=>{
    if(!isConfigured||!clientId||!ready||!nonce||!container.current||!window.google?.accounts.id)return;
    try {
      window.google.accounts.id.initialize({client_id:clientId,nonce:nonce.hash,auto_select:false,context:mode==='register'?'signup':'signin',callback:async response=>{
        if(!response.credential)return;
        setBusy(true); report.current?.('');
        try { const result=await loginWithGoogleIdToken(response.credential,nonce.raw);
          if(result.success){router.replace(safeReturnPath(returnTo));router.refresh();}
          else report.current?.(result.error||'Google認証を確認できませんでした。');
        } finally {setBusy(false);}
      }});
      container.current.replaceChildren();
      window.google.accounts.id.renderButton(container.current,{type:'standard',theme:'outline',size:'large',text:mode==='register'?'signup_with':'signin_with',shape:'pill',width:Math.min(300,container.current.clientWidth||260),locale:'ja'});
    } catch { /* The redirect button below remains available. */ }
    return ()=>window.google?.accounts.id.cancel();
  },[isConfigured,clientId,ready,nonce,mode,returnTo,loginWithGoogleIdToken,router]);
  const oauth=async()=>{setBusy(true);report.current?.('');const result=await loginWithGoogle(safeReturnPath(returnTo));if(!result.success){report.current?.(result.error||'Googleログインを開始できませんでした。');setBusy(false);}};
  return <div className={'space-y-3 '+className}>
    {clientId&&isConfigured&&<Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={()=>setReady(true)} />}
    <div ref={container} className="flex justify-center w-full" />
    <button type="button" disabled={busy||!isConfigured} onClick={oauth} className="min-h-11 w-full rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#1C2732] px-3 py-3 font-bold text-sm text-[#232826] dark:text-[#FAF8F5] disabled:opacity-60">
      {busy?'Googleアカウントを確認中...':ready&&nonce?'Googleログインを別の方法で開く':'Googleアカウントでログイン・登録'}
    </button>
    <p className="text-xs text-center text-[#59615D] dark:text-[#96A6B2]">{isConfigured?'ボタンが表示されない場合も、上のリンクでGoogle認証へ進めます。':'ログインは現在準備中です。学習コンテンツは引き続き利用できます。'}</p>
  </div>;
}
