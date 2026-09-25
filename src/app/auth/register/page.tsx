"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Google 登録/ログイン
  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const result = await loginWithGoogle("/account/subscription");
      if (!result.success) {
        setError(result.error || "Google連携の開始に失敗しました");
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "予期しないエラーが発生しました");
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await register(email, name, password);
      if (result.success) {
        router.push("/account/subscription");
      } else {
        setError(result.error || "登録に失敗しました");
      }
    } catch (err: any) {
      setError(err.message || "会員登録中にエラーが発生しました");
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
          無料会員登録
        </h1>
        <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
          アカウントを作成してマイノートの保存や学習履歴の同期を始めましょう。
        </p>
      </div>

      {/* 登録カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-md">
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Googleでワンクリック登録（おすすめ） */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#1C2732] border-2 border-[#D8CFC0] dark:border-[#384C5E] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:bg-[#FAF8F5] dark:hover:bg-[#22303D] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 group"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>{isGoogleLoading ? "Googleへ接続中..." : "Google アカウントで登録 / ログイン"}</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737C77] dark:text-[#8899A6]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>パスワード設定不要・1クリックで完了</span>
          </div>
        </div>

        {/* 仕切り線 */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E8E1D1] dark:border-[#263542] w-full" />
          <span className="bg-[#FAF8F5] dark:bg-[#152028] px-3 text-[11px] text-[#8C9590] dark:text-[#748796] shrink-0 font-medium">
            またはメールアドレスで登録
          </span>
          <div className="border-t border-[#E8E1D1] dark:border-[#263542] w-full" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5" />
              <span>お名前（ニックネーム可）</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="はり太郎 読者"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#10171F] text-xs text-[#232826] dark:text-[#FAF8F5] focus:outline-hidden focus:border-[#1E3D34] dark:focus:border-[#74BA9E]"
            />
          </div>

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
            <label className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>パスワード（任意）</span>
            </label>
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
            <span>{isLoading ? "登録中..." : "無料アカウントを作成"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 text-center space-y-2">
          <div className="text-xs text-[#737C77] dark:text-[#8899A6]">
            すでにアカウントをお持ちの方
          </div>
          <Link
            href="/auth/login"
            className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
