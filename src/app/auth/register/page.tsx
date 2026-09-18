"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
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
          アカウントを作成してマイカルテの保存や学習履歴の同期を始めましょう。
        </p>
      </div>

      {/* 登録フォーム */}
      <div className="bg-[#FAF8F5] dark:bg-[#152028] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6 shadow-md">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold">
            {error}
          </div>
        )}

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
              <span>パスワード</span>
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
            className="w-full py-3 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
