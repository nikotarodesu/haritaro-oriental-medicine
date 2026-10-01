"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: (momentListener?: (notification: any) => void) => void;
          cancel: () => void;
        };
      };
    };
  }
}

// Google アイコン（フォールバック用）
function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

// 暗号学的に安全な Nonce の生成（Supabase Nonce 検証用）
async function generateNonce(): Promise<{ nonce: string; hashedNonce: string }> {
  try {
    const rawValues = new Uint8Array(32);
    window.crypto.getRandomValues(rawValues);
    const nonce = btoa(String.fromCharCode(...rawValues));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return { nonce, hashedNonce };
  } catch (e) {
    // 万が一 Web Crypto が使えない環境（非HTTPS等）のフォールバック
    const fallback = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return { nonce: fallback, hashedNonce: fallback };
  }
}

interface GoogleSignInButtonProps {
  mode?: "login" | "register";
  returnTo?: string;
  onError?: (error: string) => void;
  className?: string;
}

export default function GoogleSignInButton({
  mode = "login",
  returnTo = "/account/subscription",
  onError,
  className = "",
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const { loginWithGoogle, loginWithGoogleIdToken } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [nonceData, setNonceData] = useState<{ nonce: string; hashedNonce: string } | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // 1. 初回マウント時に Nonce を事前生成
  useEffect(() => {
    generateNonce().then(setNonceData);
  }, []);

  // 2. Google Identity Services 初期化とボタン描画
  useEffect(() => {
    if (!clientId || !isScriptReady || !nonceData || !containerRef.current) return;
    if (typeof window === "undefined" || !window.google?.accounts?.id) return;

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential?: string }) => {
          if (!response.credential) {
            onError?.("Googleから認証情報を受信できませんでした。");
            return;
          }
          setIsLoading(true);
          try {
            const res = await loginWithGoogleIdToken(response.credential, nonceData.nonce);
            if (res.success) {
              router.push(returnTo);
            } else {
              onError?.(res.error || "Googleログインに失敗しました。");
              setIsLoading(false);
            }
          } catch (err: any) {
            onError?.(err.message || "予期しないエラーが発生しました。");
            setIsLoading(false);
          }
        },
        nonce: nonceData.hashedNonce,
        use_fedcm_for_prompt: true,
        auto_select: false,
        context: mode === "register" ? "signup" : "signin",
      });

      // 親要素の横幅に合わせてレスポンシブに描画（Google許容幅: 200〜400px）
      const parentWidth = containerRef.current.offsetWidth || 340;
      const targetWidth = Math.max(200, Math.min(parentWidth, 380));

      containerRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: mode === "register" ? "signup_with" : "signin_with",
        shape: "pill",
        logo_alignment: "left",
        width: targetWidth,
        locale: "ja",
      });

      // Google One Tap プロンプトの表示（対応ブラウザ）
      window.google.accounts.id.prompt(() => {
        // One Tap の通知はサイレントに処理
      });
    } catch (e) {
      console.error("Failed to initialize Google Identity Services:", e);
    }
  }, [clientId, isScriptReady, nonceData, mode, returnTo, loginWithGoogleIdToken, onError, router]);

  // すでに window.google が読み込まれているか検知
  useEffect(() => {
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      setIsScriptReady(true);
    }
  }, []);

  // 3. フォールバック処理（OAuthリダイレクト）
  const handleFallbackOAuthLogin = async () => {
    setIsLoading(true);
    onError?.("");
    try {
      const result = await loginWithGoogle(returnTo);
      if (!result.success) {
        onError?.(result.error || "Googleログインの開始に失敗しました。");
        setIsLoading(false);
      }
    } catch (err: any) {
      onError?.(err.message || "予期しないエラーが発生しました。");
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Google Identity Services SDK の非同期ロード */}
      {clientId && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => setIsScriptReady(true)}
        />
      )}

      {/* 処理中のローディング表示 */}
      {isLoading ? (
        <div className="w-full py-3 px-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1C2732] border-2 border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>Googleアカウントを確認中...</span>
        </div>
      ) : clientId ? (
        /* GIS が設定されている場合: Google公式のレンダリングボタンコンテナ */
        <div className="flex flex-col items-center justify-center w-full">
          <div ref={containerRef} className="flex justify-center w-full min-h-[44px]" />
          {!isScriptReady && (
            <button
              type="button"
              onClick={handleFallbackOAuthLogin}
              className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#1C2732] border-2 border-[#D8CFC0] dark:border-[#384C5E] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#22303D] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <GoogleIcon className="w-5 h-5 shrink-0" />
              <span>
                {mode === "register" ? "Google アカウントで登録 / ログイン" : "Google アカウントでログイン / 登録"}
              </span>
            </button>
          )}
        </div>
      ) : (
        /* NEXT_PUBLIC_GOOGLE_CLIENT_ID 未設定時の安全なフォールバックボタン */
        <button
          type="button"
          onClick={handleFallbackOAuthLogin}
          className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#1C2732] border-2 border-[#D8CFC0] dark:border-[#384C5E] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#22303D] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <GoogleIcon className="w-5 h-5 shrink-0" />
          <span>
            {mode === "register" ? "Google アカウントで登録 / ログイン" : "Google アカウントでログイン / 登録"}
          </span>
        </button>
      )}

      {/* サブテキスト案内 */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737C77] dark:text-[#8899A6]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
        <span>
          {mode === "register"
            ? "パスワード設定不要・1クリックで安全に登録"
            : "パスワード不要・1クリックで安全にログイン"}
        </span>
      </div>
    </div>
  );
}
