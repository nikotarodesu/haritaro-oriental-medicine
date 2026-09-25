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
  RefreshCw,
  QrCode,
  Printer,
  HeartHandshake,
  Shield,
  Stethoscope,
  ChevronRight,
  Lock
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* 準備中ステータスバナー */}
      {!salesEnabled && (
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#FCF4EB] dark:bg-[#251B12] border border-[#F3DEC5] dark:border-[#4D331F] text-center space-y-1 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SUBSCRIPTION_CONFIG.statusMessages.comingSoonTitle}</span>
          </div>
          <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {SUBSCRIPTION_CONFIG.statusMessages.comingSoonSubtitle}
          </p>
        </div>
      )}

      {/* ヘッダーエリア */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>はり太郎 プレミアム会員プラン</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床現場と学習を直結する、<br className="hidden sm:inline" />
          東洋医学の最高峰プロフェッショナルツール。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          患者ごとの臨床カルテ管理・独自配穴ストック・待合室問診POPやA4養生シート印刷ができる【最大の目玉機能: マイノート】を完全解放。厳選20症例の本格臨床演習や奇経八脈SVG図など、プロ臨床家と学習者のためのすべての機能をフル活用いただけます。
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
                  <span>東洋医学8大体系カリキュラムの閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床弁証シミュレーター（通常モード）</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#737C77] shrink-0" />
                  <span>マイノート: <strong>臨床ノート3件・配穴20件まで</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#737C77] shrink-0" />
                  <span>臨床症例演習: <strong>無料体験3症例</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/notes"
              className="w-full py-3 px-4 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-center text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>まずはマイノート無料枠（3件）を体験</span>
            </Link>
            <Link
              href="/cases"
              className="w-full py-2 px-4 text-center text-[11px] font-semibold text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5] block transition-colors"
            >
              無料体験症例（3例）を試す →
            </Link>
          </div>
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
                マイノート完全解放・全20症例・全ツール・大容量保存枠を含むすべての機能が即座に解放されます。
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
              
              {/* 最大の目玉機能ハイライトカード */}
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#10171F]/80 border-2 border-[#B86924]/40 dark:border-[#E6C387]/40 shadow-sm space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>【一番の目玉機能】マイノート完全解放</span>
                </div>
                <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                  患者臨床録 500件 ＆ 独自配穴 1,000件の大容量保存
                </p>
                <ul className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] space-y-1 pl-1">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                    <span><strong>待合室用 問診QRコードPOP</strong> の印刷機能</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                    <span><strong>患者用 A4養生指導シート</strong> のワンクリック印刷</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                    <span>ID/イニシャル管理 ＆ 端末内LocalStorage完全保存</span>
                  </li>
                </ul>
              </div>

              <ul className="text-xs space-y-2.5 text-[#232826] dark:text-[#FAF8F5]">
                <li className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span>臨床症例演習: <strong>全20症例・完全解放</strong></span>
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
                  <span>ノートJSON/Markdown出力 ＆ A4印刷完全対応</span>
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
            ) : salesEnabled ? (
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
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#D8CFC0] dark:bg-[#2A3B4A] text-[#737C77] dark:text-[#8899A6] text-xs sm:text-sm font-bold shadow-inner cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>現在お申し込み準備中（近日再開）</span>
                </button>
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center">
                  ※正式公開時にお知らせいたします。現在は無料体験機能をご利用ください。
                </p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#737C77] dark:text-[#8899A6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>Stripeによる安全な暗号化決済 / いつでも解約可能</span>
            </div>
            <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center mt-2 leading-relaxed">
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

      {/* ======================================================== */}
      {/* 👑 【目玉機能特設セクション】マイノート臨床サポートシステム */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-[#F4ECE1] to-[#EBE2D3] dark:from-[#152028] dark:via-[#192732] dark:to-[#121B23] border-2 border-[#B86924] dark:border-[#E6C387] p-6 sm:p-10 space-y-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B86924] text-white text-xs font-bold tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#FAF8F5]" />
            <span>プレミアム限定・最大の目玉機能</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
            院内臨床と学習を一変させる、<br className="hidden sm:inline" />
            患者カルテ＆配穴ストック「マイノート」
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            はり太郎の「マイノート」は、単なるメモ帳ではありません。待合室での体質チェックから、施術中の弁証・配穴決定、お見送り時の養生シート手渡しまで、<strong>日々の臨床業務を劇的にスムーズにし、患者満足度を高めるプロフェッショナルのための実践システム</strong>です。
          </p>
        </div>

        {/* 院内3ステップ臨床フローの図解カード */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h3 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
              【現場ですぐ使える】院内3ステップ臨床フロー
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCF4EB] dark:bg-[#2A2016] rounded-bl-3xl -z-0 opacity-60" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3D34] text-white">
                  STEP 1
                </span>
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6]">待合室にて</span>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#B86924] dark:text-[#E6C387]">
                <QrCode className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  待合室問診POPで体質チェック
                </h4>
              </div>
              <p className="relative z-10 text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                ワンクリックで「待合室用A4 POP」を印刷して掲示。患者さんがスマホで「気血水体質診断」「五労チェッカー」を待ち時間に気軽に回答します。
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCF4EB] dark:bg-[#2A2016] rounded-bl-3xl -z-0 opacity-60" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B86924] text-white">
                  STEP 2
                </span>
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6]">問診・施術</span>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
                <FileText className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  臨床ノートに1クリック自動反映
                </h4>
              </div>
              <p className="relative z-10 text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                患者さんの診断結果から「臨床ノート作成」を押すだけで、気血水スコアやおすすめツボが自動入力。問診時間を短縮し、的確な弁証配穴に専念できます。
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCF4EB] dark:bg-[#2A2016] rounded-bl-3xl -z-0 opacity-60" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3D34] text-white">
                  STEP 3
                </span>
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6]">会計・お見送り</span>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-[#B86924] dark:text-[#E6C387]">
                <Printer className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                  患者用A4養生シートを印刷手渡し
                </h4>
              </div>
              <p className="relative z-10 text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                作成した臨床ノートから「患者用 養生アドバイスシート（A4）」を即座に印刷。セルフケアのツボやお灸の注意点を手渡しでき、リピート率と信頼度が大幅に向上します。
              </p>
            </div>
          </div>
        </div>

        {/* 3つの安心・強力ポイント（セキュリティ・配穴ストック・容量） */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#10171F]/70 border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <Lock className="w-4 h-4 shrink-0" />
              <span className="font-bold text-xs">個人情報保護・漏洩リスクゼロ</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              患者データは外部サーバーへ送信せず、先生のお使いのブラウザ（LocalStorage）に暗号化保存。患者IDやイニシャルでの識別を推奨し、あはき法・個人情報保護法に配慮した設計です。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#10171F]/70 border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <div className="flex items-center gap-2 text-[#B86924] dark:text-[#E6C387]">
              <Bookmark className="w-4 h-4 shrink-0" />
              <span className="font-bold text-xs">自分だけの「秘伝配穴帖」</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              サイト内の361経穴辞典や症状別検索から、気になるツボや名配穴をワンタップ保存。選定理由や独自の加減法を書き込み、自分だけの臨床配穴集を構築できます。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#10171F]/70 border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="font-bold text-xs">臨床ノート500件 / 配穴1,000件</span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              無料プラン（臨床ノート3件・配穴20件）から大幅解放。毎日の症例を上限を気にせずストック可能。JSON/Markdownによるワンクリックバックアップ・復元も完備しています。
            </p>
          </div>
        </div>

        {/* マイノートへの体験ボタン */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E0D5C1] dark:border-[#263745]">
          <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
            ※ 無料会員のままでも、臨床ノート3件・配穴20件まで今すぐ機能をお試しいただけます。
          </span>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <span>マイノート（臨床録＆配穴）を実際に見てみる</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 提供機能の完全比較一覧表 */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            プラン別 機能比較一覧
          </h2>
          <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
            無料会員とプレミアム会員の利用可能範囲の詳しい比較です。
          </p>
        </div>

        <div className="rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#F2EDE2] dark:bg-[#1A2530]">
                  <th className="p-4 sm:p-5 font-bold text-[#232826] dark:text-[#FAF8F5] w-1/2">
                    機能名 / 説明
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#59615D] dark:text-[#8899A6] w-1/4 text-center">
                    無料プラン
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#B86924] dark:text-[#E6C387] w-1/4 text-center bg-[#FAF1E3] dark:bg-[#231B13]">
                    👑 プレミアム
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D2] dark:divide-[#22303D]">
                {SUBSCRIPTION_CONFIG.features.map((feature, idx) => (
                  <tr 
                    key={feature.id}
                    className={idx === 0 ? "bg-[#FCF7ED] dark:bg-[#1C1E1A]" : "hover:bg-white/40 dark:hover:bg-[#10171F]/40"}
                  >
                    <td className="p-4 sm:p-5 space-y-1">
                      <div className="flex items-center gap-2">
                        {idx === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#B86924] text-white text-[10px] font-bold shrink-0">
                            最大目玉
                          </span>
                        )}
                        <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                          {feature.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                        {feature.description}
                      </p>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-[#59615D] dark:text-[#96A6B2] font-medium align-middle">
                      {feature.free}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#FAF1E3]/50 dark:bg-[#231B13]/50 align-middle">
                      {feature.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* よくあるご質問 (FAQ) */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-3xl mx-auto pt-6">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] text-center">
          よくあるご質問
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <span className="text-[#B86924] dark:text-[#E6C387]">Q.</span>
              <span>いつでも解約できますか？違約金などはありますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-5">
              はい、いつでもマイページから1クリックで次回更新を停止（解約予約）できます。違約金や契約期間の縛りは一切ございません。解約後も現在の契約期間の終了日まではプレミアム機能をご利用いただけます。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <span className="text-[#B86924] dark:text-[#E6C387]">Q.</span>
              <span>マイノートに記録した患者情報はどこに保存されますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-5">
              患者情報（主訴・弁証・配穴・経過）は先生がお使いの端末（ブラウザのLocalStorage）にのみ安全に暗号化保存されます。当サービスの外部サーバーへ個人情報が送信されることは一切ないため、安心して日々のカルテとしてご活用いただけます。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <span className="text-[#B86924] dark:text-[#E6C387]">Q.</span>
              <span>年払いプランの途中解約や月払いからの変更はできますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-5">
              年払いプランは1年分の一括払いとなり、2ヶ月分割引（実質月額817円）が適用されています。期間中の途中解約に伴う日割り・月割りでの返金は承っておりませんが、満了日まで全機能をお使いいただけます。プランの切り替えはマイページからいつでも行えます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

