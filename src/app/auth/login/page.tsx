"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, setDemoRole } = useAuth();
  const router = useRouter();

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
        router.push("/account/subscription");
      } else {
        setError(result.error || "ログインに失敗しました");
      }
    } catch (err: any) {
      setError(err.message || "ログイン処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: "free" | "premium") => {
    setDemoRole(role, "monthly");
    router.push("/account/subscription");
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
          マイカルテ・学習進捗の同期とプレミアム機能をご利用いただけます。
        </p>
      </div>

      {/* ログインフォーム */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-md">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold">
            {error}
          </div>
        )}

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
                <span>パスワード</span>
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
            className="w-full py-3 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? "ログイン中..." : "ログインする"}</span>
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

        {/* テスト・ワンクリックログイン */}
        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-2">
          <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block text-center">
            動作確認用ワンクリックログイン
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("free")}
              className="py-2 px-2.5 rounded-lg border border-[#D8CFC0] text-[11px] font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBE4D5]"
            >
              無料会員で入る
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("premium")}
              className="py-2 px-2.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#B86924] text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCECD8]"
            >
              プレミアムで入る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
