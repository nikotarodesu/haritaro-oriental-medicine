"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { useRouter } from "next/navigation";
import {
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  FileText,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  Printer,
} from "lucide-react";
import { useSubscriptionAvailability } from "@/hooks/useSubscriptionAvailability";
import SubscriptionAvailabilityNotice from "@/components/subscription/SubscriptionAvailabilityNotice";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [sampleViewTab, setSampleViewTab] = useState<"note" | "sheet">("note");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isPremium } = useAuth();
  const { status, salesEnabled, retry } = useSubscriptionAvailability();



  const handleSubscribe = async () => {
    if (!salesEnabled) return;
    if (!user) { router.push('/auth/login?returnTo=%2Fpricing%23pricing-cards'); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: billingCycle,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "決済画面の起動に失敗しました。時間をおいてお試しください。");
      }
    } catch (e: unknown) {
      console.error("Checkout error:", e);
      setError("通信エラーが発生しました。ネットワーク状況をご確認ください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-layout space-y-10 sm:space-y-14">

      {/* 決済準備中バナー（販売無効時のみ表示） */}
      {!salesEnabled && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FCF4EB] dark:bg-[#251B12] border border-[#F3DEC5] dark:border-[#4D331F] text-center space-y-1 shadow-sm">
          <SubscriptionAvailabilityNotice status={status} onRetry={retry} />
        </div>
      )}

      {/* ======================================================== */}
      {/* 臨床記録の概要 */}
      {/* ======================================================== */}
      <PageIntro eyebrow="はり太郎 プレミアム" title="臨床の記録を、次の施術に生かす。" description="弁証・配穴・施術後の変化をマイノートに。配穴集や患者さんへ渡す養生シートも作れます。" art="notes">
        <a href="#pricing-features" className="ui-text-link mt-3 text-sm">機能の違いを見る<ArrowRight size={16} aria-hidden="true" /></a>
      </PageIntro>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* ======================================================== */}
      {/* 料金カード（無料 / プレミアム） */}
      {/* ======================================================== */}
      <div id="pricing-cards" className="scroll-mt-28 space-y-6 max-w-4xl mx-auto pt-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            料金プラン
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">

          {/* 無料カード */}
          <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  無料
                </h3>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
                  まずは、1件の記録から。使い心地を試したい方へ。
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-[#232826] dark:text-[#FAF8F5]">0円</span>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">（登録不要）</span>
                </div>
              </div>

              <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
                <span className="text-xs font-bold text-[#404743] dark:text-[#C5D2DB]">無料枠で利用できる内容:</span>
                <ul className="text-sm space-y-3 text-[#59615D] dark:text-[#96A6B2]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>臨床ノート10件・配穴30件まで保存</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>作成したノートの養生シートA4印刷</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>基礎カリキュラムと経穴辞典を読む</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <Link href="/cases" className="underline underline-offset-4">無料の3症例を試す</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Link
                href="/notes"
                className="page-secondary-action w-full justify-center"
              >
                <Bookmark className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>マイノートを無料で試す</span>
              </Link>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center">
                会員登録なしですぐにお使いいただけます
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
                <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  プレミアム
                </h3>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
                  日々の臨床記録と、自分の配穴集を蓄積したい方へ。
                </p>
              </div>

              {/* 支払いサイクル切り替え */}
              <div className="p-1 rounded-xl bg-[#F2EDE2] dark:bg-[#111920] inline-flex items-center w-full">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`min-h-11 flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    billingCycle === "monthly"
                      ? "bg-white dark:bg-[#1E2933] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                      : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826]"
                  }`}
                >
                  月払い
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`min-h-11 flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                    billingCycle === "yearly"
                      ? "bg-white dark:bg-[#1E2933] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
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

              {/* 箇条書き */}
              <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-4 space-y-3">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">プレミアムで利用できる内容:</span>
                <ul className="text-sm space-y-3 text-[#232826] dark:text-[#FAF8F5]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>臨床ノート500件・配穴1,000件まで保存</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>保存した全ノートの養生シートA4印刷</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>臨床症例演習: 全20症例が利用可能</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span>経穴比較（3穴）・配穴練習・ファイル保存を活用</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              {isPremium ? (
                <div className="space-y-2">
                  <Link
                    href="/notes"
                    className="page-primary-action w-full justify-center"
                  >
                    <Bookmark className="w-4 h-4 text-[#E6C387]" />
                    <span>マイノートを開く</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/account/subscription"
                    className="w-full py-2 px-4 rounded-xl text-center text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center justify-center gap-1"
                  >
                    <Crown className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                    <span>ご加入中プランの確認・管理へ</span>
                  </Link>
                </div>
              ) : salesEnabled ? (
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="page-primary-action w-full justify-center disabled:opacity-60"
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
                    <span>{status === "checking" ? "受付状況を確認中…" : status === "error" ? "受付状況を確認できません" : "現在お申し込み準備中"}</span>
                  </button>
                  {status === "error" ? <button type="button" onClick={retry} className="min-h-11 w-full rounded-lg text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">受付状況を再確認する</button>
                    : status === "unavailable" ? <p className="text-sm text-[#737C77] dark:text-[#8899A6] text-center">受付開始日は未定です。現在は無料機能をご利用ください。</p> : null}
                </div>
              )}

              {/* 契約注記 */}
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
      </div>

      {/* ======================================================== */}
      {/* 2. マイノートと養生シートの完成見本 */}
      {/* ======================================================== */}
      <details className="page-help max-w-4xl mx-auto">
        <summary>マイノート・養生シートの完成見本を見る</summary>
        <div className="space-y-6 pt-2">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <FileText className="w-4 h-4" />
            <span>完成見本（架空のサンプルデータ）</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            マイノートでできること
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            日々の臨床ノートを作成し、そのまま患者さんへお渡しできる養生シートを印刷できます。
          </p>
        </div>

        {/* スマホ用タブ切り替え（PCでは2列並列） */}
        <div className="flex md:hidden items-center justify-center p-1 rounded-xl bg-[#F2EDE2] dark:bg-[#1E2933] max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setSampleViewTab("note")}
            aria-pressed={sampleViewTab === "note"}
            className={`min-h-11 flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              sampleViewTab === "note"
                ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#8899A6]"
            }`}
          >
            見本A：臨床ノート
          </button>
          <button
            type="button"
            onClick={() => setSampleViewTab("sheet")}
            aria-pressed={sampleViewTab === "sheet"}
            className={`min-h-11 flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              sampleViewTab === "sheet"
                ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#8899A6]"
            }`}
          >
            見本B：養生シート
          </button>
        </div>

        {/* 2大見本カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* 見本A：臨床ノート */}
          <div className={`rounded-2xl border-2 border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#152028] p-5 sm:p-6 space-y-4 shadow-sm ${
            sampleViewTab === "sheet" ? "hidden md:block" : "block"
          }`}>
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]">
                  見本A：臨床ノート
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">（施術者用画面）</span>
              </div>
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">架空のサンプル</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">PT-012（K.T様・30代女性）</span>
                <span>来院日: 2026-03-24</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block">【主訴】</span>
                <p className="font-medium text-[#232826] dark:text-[#FAF8F5] bg-[#FAF8F5] dark:bg-[#10171F] p-2.5 rounded-lg border border-[#E8E1D1] dark:border-[#22303D] leading-relaxed">
                  デスクワークによる激しい後頭部〜側頭部の頭痛。夕方になると目の奥が重く開きにくい。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-0.5">
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block font-bold">体質見立て</span>
                  <span className="font-bold text-[#B86924] dark:text-[#E6C387]">気滞・肝鬱化火</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-0.5">
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block font-bold">弁証</span>
                  <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">肝陽上亢・気機不暢</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block">【採用配穴】</span>
                <div className="flex flex-wrap gap-1.5">
                  {["太衝", "陽陵泉", "風池", "百会"].map((pt) => (
                    <span key={pt} className="px-2 py-0.5 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold border border-[#C5DED4] dark:border-[#2C4A3E]">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block">【施術後の変化】</span>
                <p className="text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                  施術直後より頭部の締め付け感が消失。目の開けやすさを自覚。
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6] flex items-center justify-between">
              <span>※匿名設計・安全クラウド同期対応</span>
              <Link href="/notes" className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline">
                マイノートで試す →
              </Link>
            </div>
          </div>

          {/* 見本B：患者向け養生シート */}
          <div className={`rounded-2xl border-2 border-emerald-800/40 bg-white text-gray-900 p-5 sm:p-6 space-y-4 shadow-sm ${
            sampleViewTab === "note" ? "hidden md:block" : "block"
          }`}>
            <div className="flex items-center justify-between border-b-2 border-emerald-900 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#1E3D34] text-white">
                  見本B：患者用 養生シート
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 mt-1">
                  東洋医学 養生＆セルフケア処方せん
                </h3>
              </div>
              <div className="text-right text-[10px] text-gray-500">
                <p>カルテNo: PT-012</p>
                <p>A4印刷対応</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-lg space-y-0.5">
                <span className="text-[10px] font-bold text-gray-600 block">本日のお悩み・主訴</span>
                <p className="font-bold text-gray-900">デスクワークによる激しい後頭部〜側頭部の頭痛</p>
              </div>

              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-emerald-900 block">東洋医学的なお体の見立て</span>
                <p className="font-bold text-emerald-950">気滞・肝鬱化火 ／ 肝陽上亢</p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  ストレスや過度の緊張、デスクワークにより頭部への気血の巡りが滞りやすい状態です。
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-700 block">【ご自宅で温めるおすすめのツボ】</span>
                <div className="grid grid-cols-2 gap-1.5 text-center">
                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                    <span className="font-bold block text-xs">太衝（足の甲）</span>
                    <span className="text-[10px] text-gray-500">イライラ・頭痛を鎮める</span>
                  </div>
                  <div className="p-1.5 rounded bg-gray-50 border border-gray-200">
                    <span className="font-bold block text-xs">風池（後頭部）</span>
                    <span className="text-[10px] text-gray-500">首肩の緊張・目の奥の疲れ</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg space-y-0.5">
                <span className="text-[10px] font-bold text-amber-900 block">日常生活でのセルフケア</span>
                <p className="text-[11px] text-amber-950 leading-relaxed">
                  就寝前のスマートフォン制限とホットアイマスク。入浴時はぬるめのお湯で首元を温めてください。
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between">
              <span className="flex items-center gap-1 text-gray-700 font-medium">
                <Printer className="w-3.5 h-3.5 text-[#1E3D34]" />
                <span>ワンクリックでA4印刷可能</span>
              </span>
            </div>
          </div>

        </div>


        <p className="text-center text-xs text-[#737C77] dark:text-[#8899A6]">
          見本は架空の記録です。実際の記録には、患者名や連絡先など個人を特定できる情報を入力しないでください。
        </p>
        </div>
      </details>


      {/* ======================================================== */}
      {/* 機能比較 */}
      {/* ======================================================== */}
      <div id="pricing-features" className="scroll-mt-28 space-y-4 max-w-4xl mx-auto pt-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] text-center sm:text-left">
            無料とプレミアムの機能比較
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            ※基礎カリキュラム・経穴辞典・通常モードの弁証シミュレーターは、無料でご利用いただけます。
          </p>
        </div>

        {/* PC向けテーブル表示 */}
        <div className="hidden md:block rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#F2EDE2] dark:bg-[#1A2530]">
                <th className="p-4 font-bold text-[#232826] dark:text-[#FAF8F5] w-2/5">
                  比較項目
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
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  臨床ノートの保存件数
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  10件
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  500件
                </td>
              </tr>
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  配穴の保存件数
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  30件
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  1,000件
                </td>
              </tr>
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  養生シートの印刷
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  無料枠内のノートで印刷可能
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  保存した全ノートで印刷可能
                </td>
              </tr>
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  バックアップ・復元
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  無料枠内でファイル保存・読込可能
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  全データでファイル保存・読込可能
                </td>
              </tr>
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  臨床症例演習
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  3症例
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  全20症例
                </td>
              </tr>
              <tr className="hover:bg-white/40 dark:hover:bg-[#10171F]/40">
                <td className="p-4 font-medium text-[#232826] dark:text-[#FAF8F5]">
                  経穴比較・配穴練習・奇経八脈
                </td>
                <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                  各機能の無料範囲（2穴比較・任督2脈）
                </td>
                <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/30 dark:bg-[#182823]/30">
                  全機能利用可能（3穴比較・全8脈など）
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* スマホ向けカード型2段表示 */}
        <div className="md:hidden space-y-3">
          {[
            { title: "臨床ノートの保存件数", free: "10件", premium: "500件" },
            { title: "配穴の保存件数", free: "30件", premium: "1,000件" },
            { title: "養生シートの印刷", free: "無料枠内のノートで印刷可能", premium: "保存した全ノートで印刷可能" },
            { title: "バックアップ・復元", free: "無料枠内でファイル保存・読込可能", premium: "全データでファイル保存・読込可能" },
            { title: "臨床症例演習", free: "3症例", premium: "全20症例" },
            { title: "経穴比較・配穴練習・奇経八脈", free: "各機能の無料範囲（2穴比較・任督2脈）", premium: "全機能利用可能（3穴比較・全8脈）" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028] space-y-2 text-xs"
            >
              <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                {item.title}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8E1D1] dark:border-[#22303D]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">無料</span>
                  <p className="text-[#59615D] dark:text-[#96A6B2]">{item.free}</p>
                </div>
                <div className="space-y-0.5 bg-[#EBF3EF]/50 dark:bg-[#182823]/50 p-2 rounded-lg">
                  <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E]">プレミアム</span>
                  <p className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{item.premium}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 保存方法と入力時の注意 */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#EBF7F2] dark:bg-[#14261E] border border-[#BDE3D4] dark:border-[#24523F] space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#1D5E46] dark:text-[#8EE0C0]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#2E7D5B] dark:text-[#74BA9E]" />
          <span>記録の保存と患者情報について</span>
        </div>
        <p className="text-xs sm:text-sm text-[#315143] dark:text-[#A0C4B4] leading-relaxed">
          未ログイン時の記録は、この端末内に保存されます。同じGoogleアカウントでログインすると、端末間で同期できます。患者名・連絡先・住所・生年月日は入力せず、患者番号などで管理してください。自由記述にも、個人を特定できる情報を含めないでください。
        </p>
      </div>

      {/* ======================================================== */}
      {/* よくある質問 */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-3xl mx-auto pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            よくある質問
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            ご利用前に確認したい点についてお答えします。
          </p>
        </div>

        <div className="space-y-3">

          {/* Q2 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>スマホとPCで同じ記録を使えますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい。各端末で同じGoogleアカウントにログインすると同期できます。端末を切り替える前に、マイノートの同期状態を確認してください。ログインしない場合は、ファイル保存・読込で記録を移せます。
            </p>
          </details>

          {/* Q3 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>記録は消えることがありますか？バックアップはどうしますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              同期済みの記録は、同じアカウントで確認できます。未同期の記録や端末内だけに保存した記録は、端末の故障やブラウザデータの削除で失われる場合があります。マイノートの「ファイルに保存」から、定期的にバックアップを保存してください。
            </p>
          </details>

          {/* Q4 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>解約後、保存した記録はどうなりますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              解約後も、これまでに保存された既存のノートや配穴はそのまま閲覧・印刷できます。ただし、無料枠の上限（ノート10件・配穴30件）を超えている場合は新しいノートの追加保存ができなくなります。必要に応じて解約前にバックアップファイルを保存してください。
            </p>
          </details>

          {/* Q5 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>学生でも使えますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい。実習の振り返りや配穴の整理に使えます。学習教材は無料で読め、症例演習は無料で3症例、プレミアムで全20症例を利用できます。
            </p>
          </details>
        </div>
      </div>

      <nav aria-label="料金ページの関連リンク" className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#E5DEC9] pt-6 dark:border-[#2A3B4A]">
        <a href="#pricing-cards" className="ui-text-link">料金プランに戻る<ArrowRight size={16} aria-hidden="true" /></a>
        <Link href="/notes" className="ui-text-link">マイノートを試す<ArrowRight size={16} aria-hidden="true" /></Link>
      </nav>

    </div>
  );
}



