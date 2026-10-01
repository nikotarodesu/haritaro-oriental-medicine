"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, User as UserIcon, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const [returnTo, setReturnTo] = useState<string>("/account/subscription");

  // URLパラメータ（OAuthエラー・戻り先URL等の検知）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth_failed") {
      setError("Google認証に失敗したか、キャンセルされました。もう一度お試しください。");
    }
    const rawReturnTo = params.get("returnTo");
    if (rawReturnTo && rawReturnTo.startsWith("/") && !rawReturnTo.startsWith("//") && !rawReturnTo.includes("\\")) {
      setReturnTo(rawReturnTo);
    }
  }, []);

  // 従来のメールログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push(returnTo);
      } else {
        setError(result.error || "ログインに失敗しました");
      }
    } catch (err: any) {
      setError(err.message || "ログイン処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 space-y-8">
      {/* 見出し */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          はり太郎の東洋医学
        </Link>
        <h1 className="text-xl font-bold text-[#404743] dark:text-[#C5D2DB]">
          会員ログイン
        </h1>
        <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
          マイノート・学習進捗の同期とプレミアム機能をご利用いただけます。
        </p>
      </div>

      {/* ログインカード */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-md">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* 1. Googleでログイン（最優先・おすすめ） */}
        <GoogleSignInButton
          mode="login"
          returnTo={returnTo}
          onError={(msg) => setError(msg)}
        />

        {/* 仕切り線 */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E8E1D1] dark:border-[#263542] w-full" />
          <span className="bg-[#FAF8F5] dark:bg-[#152028] px-3 text-[11px] text-[#8C9590] dark:text-[#748796] shrink-0 font-medium">
            またはメールアドレスでログイン
          </span>
          <div className="border-t border-[#E8E1D1] dark:border-[#263542] w-full" />
        </div>

        {/* 2. メールログインフォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>メールアドレス</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@haritaro.jp"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#10171F] text-xs text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>パスワード（任意）</span>
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#10171F] text-xs text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? "ログイン中..." : "メールでログインする"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
          <div className="text-center text-xs text-[#737C77] dark:text-[#8899A6]">
            アカウントをお持ちでない方はこちら
          </div>
          <Link
            href="/auth/register"
            className="w-full block py-2.5 px-4 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-center text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBE4D5] dark:hover:bg-[#1E2933] transition-colors"
          >
            無料会員登録（新規作成）
          </Link>
        </div>
      </div>
    </div>
  );
}
