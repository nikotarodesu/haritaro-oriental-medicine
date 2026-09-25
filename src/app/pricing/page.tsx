"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Bookmark,
  FileText, 
  Compass, 
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  AlertCircle,
  GraduationCap,
  Layers,
  ChevronDown,
  Printer,
  QrCode
} from "lucide-react";
import { SUBSCRIPTION_CONFIG, isSubscriptionSalesEnabled } from "@/config/subscription";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isPremium } = useAuth();
  const salesEnabled = isSubscriptionSalesEnabled();

  const currentPricing = SUBSCRIPTION_CONFIG.pricing[billingCycle];

  const handleSubscribe = async () => {
    if (!salesEnabled) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: billingCycle,
          userId: user?.id,
          userEmail: user?.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "決済画面の起動に失敗しました。時間をおいてお試しください。");
      }
    } catch (e: any) {
      console.error("Checkout error:", e);
      setError("通信エラーが発生しました。ネットワーク状況をご確認ください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16 text-[#232826] dark:text-[#FAF8F5]">
      
      {/* 決済準備中バナー（販売無効時のみ表示） */}
      {!salesEnabled && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FCF4EB] dark:bg-[#251B12] border border-[#F3DEC5] dark:border-[#4D331F] text-center space-y-1 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SUBSCRIPTION_CONFIG.statusMessages.comingSoonTitle}</span>
          </div>
          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {SUBSCRIPTION_CONFIG.statusMessages.comingSoonSubtitle}
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. 冒頭の見出しと説明（第5項文案） */}
      {/* ======================================================== */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold">
          <Crown className="w-3.5 h-3.5" />
          <span>はり太郎 プレミアム</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5] leading-snug">
          学んだ知識を、臨床で考える力へ。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          症例で考える。経穴を比べる。学びと臨床の記録を残す。<br className="hidden sm:inline" />
          東洋医学を深く学びたい学生と、日々の臨床に役立てたい鍼灸師へ。
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. 料金カード（第6項仕様：無料 / プレミアム） */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-4xl mx-auto">
        
        {/* 無料カード */}
        <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider">
                無料プラン
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                無料
              </h2>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
                まずは基礎を学び、使い心地を試したい方へ。
              </p>
            </div>

            <div className="pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">0円</span>
              </div>
            </div>

            <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
              <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB]">利用できる主な内容:</span>
              <ul className="text-sm space-y-3 text-[#59615D] dark:text-[#96A6B2]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>基礎カリキュラムと経穴辞典を読む</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>3症例で演習を試す</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>臨床ノート3件・配穴20件まで保存</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Link
              href="/cases"
              className="w-full py-3 px-4 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-center text-sm font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all flex items-center justify-center gap-1.5"
            >
              <span>無料で試す</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center">
              会員登録なしですぐにお試しいただけます
            </p>
          </div>
        </div>

        {/* プレミアムカード */}
        <div className="relative rounded-3xl bg-white dark:bg-[#17222B] border-2 border-[#1E3D34] dark:border-[#74BA9E] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" />
                <span>有料プラン</span>
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                プレミアム
              </h2>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
                症例演習を深め、ノートや配穴を継続して蓄積したい方へ。
              </p>
            </div>

            {/* カード内 支払いサイクル切り替え */}
            <div className="p-1 rounded-xl bg-[#F2EDE2] dark:bg-[#111920] inline-flex items-center w-full">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-[#1E2933] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                    : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826]"
                }`}
              >
                月払い
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-[#1E2933] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                    : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826]"
                }`}
              >
                年払い（2か月分お得）
              </button>
            </div>

            {/* 料金表示 */}
            <div className="pt-1 space-y-1">
              {billingCycle === "monthly" ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      月額980円
                    </span>
                    <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">（税込）</span>
                  </div>
                  <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-1">
                    手軽に始められる月額払い。いつでも解約可能です。
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      年額9,800円
                    </span>
                    <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">（税込）</span>
                  </div>
                  <div className="space-y-0.5 mt-1 text-xs text-[#59615D] dark:text-[#96A6B2]">
                    <p className="font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
                      月払い12か月分より1,960円お得 / 1年分をまとめてお支払い
                    </p>
                    <p className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      （月あたり約817円相当 ※請求は年1回の9,800円一括となります）
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 箇条書き3点 */}
            <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">プレミアムで利用できる内容:</span>
              <ul className="text-sm space-y-3 text-[#232826] dark:text-[#FAF8F5]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>全20症例で考える練習を重ねる</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>臨床ノート500件・配穴1,000件まで保存</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                  <span>経穴比較・配穴練習・印刷機能を活用</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {isPremium ? (
              <Link
                href="/account/subscription"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-sm font-bold shadow transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-[#E6C387]" />
                <span>すでに加入中（契約管理へ）</span>
              </Link>
            ) : salesEnabled ? (
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-sm font-bold shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>決済画面へ移動中...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {billingCycle === "yearly" ? "年額9,800円で申し込む" : "月額980円で申し込む"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-1.5">
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D8CFC0] dark:bg-[#2A3B4A] text-[#737C77] dark:text-[#8899A6] text-sm font-bold cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>現在お申し込み準備中（近日再開）</span>
                </button>
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center">
                  ※正式公開時にお知らせいたします。現在は無料機能をご利用ください。
                </p>
              </div>
            )}

            {/* 契約・解約注記 */}
            <div className="space-y-1 text-[11px] text-[#737C77] dark:text-[#8899A6] leading-relaxed">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>自動更新。マイページからいつでも次回の更新を停止できます。</span>
              </p>
              {billingCycle === "yearly" && (
                <p className="pl-5 text-[#B86924] dark:text-[#E6C387]">
                  ※年払いは1年分の一括払いのため、契約期間中の途中解約に伴う日割り返金は行っていません（期間終了まで全機能をご利用いただけます）。
                </p>
              )}
              <p className="text-center pt-1">
                お申し込み前に
                <Link href="/terms" className="underline hover:text-[#1E3D34] dark:hover:text-[#74BA9E] mx-1">
                  利用規約
                </Link>
                および
                <Link href="/tokushoho" className="underline hover:text-[#1E3D34] dark:hover:text-[#74BA9E] mx-1">
                  特定商取引法に基づく表記
                </Link>
                をご確認ください。
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. 有料にするとできること：3つのメリット（第7項仕様） */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-4xl mx-auto pt-4 sm:pt-8">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            有料にするとできること
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            症例演習・経穴比較・記録の蓄積を通じて、臨床思考を深めます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* メリット 1 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              症例を通して、考え方を練習する
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              問診や四診の情報から、弁証・治法・配穴を考えます。解説を読み、自分の判断と照らし合わせられます。
            </p>
          </div>

          {/* メリット 2 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              経穴を比べて、選ぶ理由を整理する
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              似た働きを持つ経穴を並べて確認。配穴の練習を通して、なぜそのツボを選ぶのかを言葉にできます。
            </p>
          </div>

          {/* メリット 3 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              学びと臨床の記録を、次に生かす
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              症例の経過や配穴の理由を、自分のノートに蓄積。記録の振り返りや、養生シートの印刷に活用できます。
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. 無料とプレミアムの比較表：主要6項目（第8項仕様） */}
      {/* ======================================================== */}
      <div className="space-y-4 max-w-4xl mx-auto pt-4 sm:pt-8">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] text-center sm:text-left">
            無料とプレミアムの比較
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            ※基礎カリキュラム・経穴辞典・通常モードの弁証シミュレーターは、無料で利用できます。
          </p>
        </div>

        {/* PC向けテーブル表示 */}
        <div className="hidden md:block rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#F2EDE2] dark:bg-[#1A2530]">
                <th className="p-4 font-bold text-[#232826] dark:text-[#FAF8F5] w-2/5">
                  機能
                </th>
                <th className="p-4 font-bold text-[#59615D] dark:text-[#8899A6] w-3/10 text-center">
                  無料
                </th>
                <th className="p-4 font-bold text-[#1E3D34] dark:text-[#74BA9E] w-3/10 text-center bg-[#EBF3EF]/60 dark:bg-[#182823]/60">
                  プレミアム
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D2] dark:divide-[#22303D]">
              {SUBSCRIPTION_CONFIG.features.map((feature) => (
                <tr key={feature.id} className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                  <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                    {feature.title}
                  </td>
                  <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                    {feature.free}
                  </td>
                  <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                    {feature.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* スマホ向けカード型2段表示（横スクロール崩れを防止） */}
        <div className="md:hidden space-y-3">
          {SUBSCRIPTION_CONFIG.features.map((feature) => (
            <div 
              key={feature.id}
              className="p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] space-y-2 text-xs"
            >
              <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                {feature.title}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8E1D1] dark:border-[#22303D]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">無料</span>
                  <p className="text-[#59615D] dark:text-[#96A6B2]">{feature.free}</p>
                </div>
                <div className="space-y-0.5 bg-[#EBF3EF]/50 dark:bg-[#182823]/50 p-2 rounded-lg">
                  <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E]">プレミアム</span>
                  <p className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{feature.premium}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. 保存についての重要な案内（第10項仕様） */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#FCF4EB] dark:bg-[#251B12] border border-[#F3DEC5] dark:border-[#4D331F] space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#B86924] dark:text-[#E6C387]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>ノート保存についての重要な案内</span>
        </div>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          ノートは、利用中の端末・ブラウザに保存されます。別の端末へは自動で引き継がれません。ブラウザの保存データを削除すると記録が失われる場合があるため、定期的なバックアップ（ファイルの保存）をおすすめします。
        </p>
      </div>

      {/* ======================================================== */}
      {/* 6. よくある質問（FAQ：第11項仕様・厳選5問） */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-3xl mx-auto pt-4 sm:pt-8">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            よくある質問
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            ご利用前に確認したい点についてお答えします。
          </p>
        </div>

        <div className="space-y-3">
          {/* Q1 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>無料とプレミアムは何が違いますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              基礎カリキュラムの学習や経穴辞典は無料で利用できます。プレミアムでは、症例演習が3例から全20例に広がり、臨床ノート（最大500件）や配穴（最大1,000件）の保存件数が大幅に増加します。さらに3穴比較、配穴練習、A4印刷など、臨床思考を深めるすべての機能をご利用いただけます。
            </p>
          </details>

          {/* Q2 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>学生でも使えますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい、鍼灸学生の方の自己学習にも適しています。授業や国家試験対策の基礎知識の確認に加え、20の症例演習や配穴の理由付けトレーニングなど、臨床実習や将来の現場を想定した実践的な学習に役立ちます。
            </p>
          </details>

          {/* Q3 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>スマホとパソコンでノートを共有できますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              ノートデータは利用中の端末・ブラウザ内に保存される仕様のため、別端末への自動引き継ぎには対応していません。マイノート内のバックアップ機能（JSONファイルの書き出し）を使い、もう一方の端末で読み込むことで、手動でデータを移行することは可能です。
            </p>
          </details>

          {/* Q4 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>いつでも解約できますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい、マイページからいつでも次回の自動更新を停止（解約予約）できます。更新を停止しても、現在の契約期間の終了日まではプレミアム機能をそのままご利用いただけます。年払いプランは1年分の一括払いのため、途中解約に伴う返金には対応しておりません。
            </p>
          </details>

          {/* Q5 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>解約すると、保存したノートはどうなりますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              解約後も、端末のブラウザ内に保存された既存のノートや配穴はそのまま閲覧できます。ただし、無料枠の上限（ノート3件・配穴20件）を超えている場合は、新しいノートの追加保存ができなくなります。必要に応じて解約前にバックアップファイルを保存してください。
            </p>
          </details>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. 最後の申込ボタンと無料で試すリンク */}
      {/* ======================================================== */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center space-y-4 shadow-sm">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          まずは無料体験から始めてみませんか？
        </h3>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
          登録不要ですぐに3症例の演習や基本機能をお試しいただけます。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isPremium ? (
            <Link
              href="/account/subscription"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs sm:text-sm font-bold shadow transition-all"
            >
              契約状況を確認する
            </Link>
          ) : salesEnabled ? (
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer disabled:opacity-60"
            >
              {billingCycle === "yearly" ? "年額9,800円で申し込む" : "月額980円で申し込む"}
            </button>
          ) : null}
          <Link
            href="/cases"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all"
          >
            無料で演習を試す
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 8. 末尾の折りたたみ：マイノートの詳しい使い方 */}
      {/* ======================================================== */}
      <div className="max-w-3xl mx-auto pt-4 border-t border-[#E8E1D1] dark:border-[#22303D]">
        <details className="group rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] cursor-pointer hover:text-[#232826] dark:hover:text-[#FAF8F5]">
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>マイノートの詳しい使い方（待合室案内・養生シート・臨床での活用）</span>
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 shrink-0 ml-2" />
          </summary>

          <div className="mt-4 space-y-4 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 leading-relaxed">
            <p>
              マイノートは、日々の症例メモや自分だけの配穴集を作成・管理できるツールです。臨床現場での補助機能として以下の活用方法に対応しています。
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>1. 待合室での案内用紙の印刷</span>
                </span>
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                  待合室に掲示する案内用紙（QRコード付きA4 POP）を印刷できます。患者さんが待ち時間に「気血水体質診断」を行えます。
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>2. 診断結果をもとにしたノート作成</span>
                </span>
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                  診断結果の画面から直接臨床ノートの作成画面を開くことで、体質や参考ツボの情報を引き継いで記録を開始できます。
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
                <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>3. 患者さん向け養生シートの印刷</span>
                </span>
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                  記録したノートから、おすすめのツボやセルフケアの注意点をまとめたA4シートを印刷し、患者さんにお渡しできます。
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <Link
                href="/notes"
                className="inline-flex items-center gap-1.5 font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
              >
                <span>マイノートを開く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </details>
      </div>

    </div>
  );
}


