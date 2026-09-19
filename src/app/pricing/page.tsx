"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Bookmark,
  FileText, 
  Layers, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isPremium } = useAuth();

  const currentPricing = SUBSCRIPTION_CONFIG.pricing[billingCycle];

  const handleSubscribe = async () => {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* ヘッダーエリア */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>はり太郎 プレミアム会員プラン</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床思考を深める、<br className="hidden sm:inline" />
          東洋医学の最高峰学習ツール。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          基礎理論の習得から臨床現場での即応力へ。厳選された20の臨床症例演習、大容量マイカルテ（1,000件保存）、奇経八脈の全流注図、条件比較シミュレーターなど、臨床家・学習者のための全機能を無制限にご活用いただけます。
        </p>

        {/* 支払いサイクル切り替えスイッチ */}
        <div className="pt-4 flex items-center justify-center">
          <div className="p-1 rounded-2xl bg-[#EBE4D5] dark:bg-[#1E2933] inline-flex items-center relative shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                  : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
              }`}
            >
              月払い（¥980 / 月）
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                  : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
              }`}
            >
              <span>年払い（¥9,800 / 年）</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                2ヶ月分お得
              </span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* プラン比較カード */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* 無料プラン */}
        <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider">
                無料プラン
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                無料会員（一般プラン）
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                基礎理論と361経穴辞典、基本ツボ検索をご利用いただけます。
              </p>
            </div>

            <div className="pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">¥0</span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">/ 永久無料</span>
              </div>
            </div>

            <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
              <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB]">利用可能な機能:</span>
              <ul className="text-xs space-y-2.5 text-[#59615D] dark:text-[#96A6B2]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>361経穴辞典・症状別ツボ検索の全機能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>東洋医学8大体系カリキュラム（全92講）の閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床弁証シミュレーター（通常モード）</span>
                </li>
                <li className="flex items-center gap-2 text-[#232826] dark:text-[#FAF8F5] font-semibold">
                  <Check className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0" />
                  <span>臨床症例演習: <strong>無料体験3症例</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#737C77] shrink-0" />
                  <span>マイカルテ保存枠: <strong>最大20件まで</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/cases"
            className="w-full py-3 px-4 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-center text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all"
          >
            まずは無料体験症例（3例）を試す
          </Link>
        </div>

        {/* プレミアムプラン */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FAF8F5] to-[#F5ECE1] dark:from-[#17222B] dark:to-[#121B23] border-2 border-[#B86924] dark:border-[#E6C387] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span>おすすめ・完全版</span>
                </span>
                {billingCycle === "yearly" && (
                  <span className="px-2 py-0.5 rounded-full bg-[#B86924] text-white text-[10px] font-bold">
                    実質 月額 約817円
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                {billingCycle === "yearly" ? "プレミアム年額プラン" : "プレミアム月額プラン"}
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                全症例・全ツール・1,000件保存枠を含むすべての機能が即座に解放されます。
              </p>
            </div>

            <div className="pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  {currentPricing.displayPrice}
                </span>
                <span className="text-xs font-semibold text-[#59615D] dark:text-[#96A6B2]">
                  / {currentPricing.periodLabel}（税込）
                </span>
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-1">
                {currentPricing.description}
              </p>
            </div>

            <div className="border-t border-[#E8E1D1] dark:border-[#263745] pt-4 space-y-3">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">プレミアム解放機能:</span>
              <ul className="text-xs space-y-2.5 text-[#232826] dark:text-[#FAF8F5]">
                <li className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床症例演習: <strong>全20症例・完全解放</strong></span>
                </li>
                <li className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>マイカルテ保存枠: <strong>最大1,000件（大容量）</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>配穴練習機能（自作配穴・選定理由・教材比較）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>奇経八脈（全8脈）流注SVG図・臨床演習</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>3穴横並び精密比較ツール</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>ノートJSON/Markdown出力 ＆ A4印刷対応</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            {isPremium ? (
              <Link
                href="/account/subscription"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-[#E6C387]" />
                <span>すでに加入中（契約管理へ）</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1E3D34] to-[#2B6958] hover:from-[#162D26] hover:to-[#225547] text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>決済画面へ移動中...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 text-[#E6C387]" />
                    <span>{billingCycle === "yearly" ? "年額プランで登録する" : "月額プランで登録する"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
            <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#737C77] dark:text-[#8899A6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>Stripeによる安全な暗号化決済 / いつでも解約可能</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
