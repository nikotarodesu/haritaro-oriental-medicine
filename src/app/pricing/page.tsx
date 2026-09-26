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
  AlertCircle,
  GraduationCap,
  ChevronDown,
  Printer,
  Maximize2
} from "lucide-react";
import { SUBSCRIPTION_CONFIG, isSubscriptionSalesEnabled } from "@/config/subscription";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [sampleViewTab, setSampleViewTab] = useState<"note" | "sheet">("note");
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
      {/* 1. 臨床家向けの短い見出し・価格の目安・体験ボタン */}
      {/* ======================================================== */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-semibold">
          <Crown className="w-3.5 h-3.5" />
          <span>はり太郎 プレミアム</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5] leading-tight">
          臨床の記録を、次の施術に生かす。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
          弁証・配穴・施術後の変化を、マイノートに。<br className="hidden sm:inline" />
          自分の配穴集を活用し、患者さんに渡す養生シートまで作れます。
        </p>

        {/* 価格の目安 */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#737C77] dark:text-[#8899A6]">
          <span>月額980円（税込）</span>
          <span>／</span>
          <span>年払い9,800円（税込・2か月分お得）</span>
        </div>

        {/* 体験ボタンと補助リンク */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/notes"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-[#E6C387]" />
            <span>マイノートを無料で試す</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#pricing-cards"
            className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] hover:text-[#232826] dark:hover:text-white underline underline-offset-4 py-2"
          >
            料金と無料版との違いを見る ↓
          </a>
        </div>

        <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
          ※無料で臨床ノート3件・配穴20件まで保存可能。会員登録不要ですぐにお試しいただけます。
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. マイノートと養生シートの完成見本 */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto space-y-6 pt-2">
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
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
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
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
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
              <span>※端末内に安全保存</span>
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
              <span className="text-[10px]">※手渡しで患者満足度向上</span>
            </div>
          </div>

        </div>

        {/* 見本下の3行まとめ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
              <Check className="w-4 h-4 shrink-0" />
              <span>記録する</span>
            </span>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              弁証・配穴・施術後の変化を1つの画面に整理して記録。
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
              <Check className="w-4 h-4 shrink-0" />
              <span>振り返る</span>
            </span>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              過去の記録や、蓄積した自分の配穴集をすぐに参照。
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
              <Check className="w-4 h-4 shrink-0" />
              <span>渡す</span>
            </span>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              記録した養生指導をA4シートにして患者さんに手渡し。
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#737C77] dark:text-[#8899A6]">
          ※ノートはお使いの端末・ブラウザ内に保存されます。外部サーバーへ個人情報が送信されることはありません。
        </p>
      </div>

      {/* ======================================================== */}
      {/* 3. 料金カード（無料 / プレミアム） */}
      {/* ======================================================== */}
      <div id="pricing-cards" className="scroll-mt-8 space-y-6 max-w-4xl mx-auto pt-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            料金プラン
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            無料でも3件まで記録可能。日々の臨床を蓄積したい方にプレミアムを用意しています。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* 無料カード */}
          <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider">
                  無料プラン
                </span>
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
                    <span>臨床ノート3件・配穴20件まで保存</span>
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
                    <span>3症例で臨床演習を試す</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Link
                href="/notes"
                className="w-full py-3 px-4 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-center text-sm font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all flex items-center justify-center gap-1.5"
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
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
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
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
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
      {/* 4. 無料とプレミアムの3つの主な違い */}
      {/* ======================================================== */}
      <div className="space-y-6 max-w-4xl mx-auto pt-2">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
            <Sparkles className="w-4 h-4" />
            <span>プランの違い</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            無料とプレミアムの3つの主な違い
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#8899A6]">
            基礎知識の学習（カリキュラム・経穴辞典・弁証シミュレーター）は無料。日々の臨床蓄積と深い実践演習をプレミアムで提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          {/* 違い1: 臨床記録 */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                マイノートの保存枠
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                無料版はノート3件・配穴20件。プレミアムなら<strong className="text-[#1E3D34] dark:text-[#74BA9E]">ノート500件・配穴1,000件</strong>まで拡張され、日々の臨床を継続して蓄積できます。
              </p>
            </div>
            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6]">
              養生シート印刷・手元バックアップ対応
            </div>
          </div>

          {/* 違い2: 症例演習 */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                臨床症例演習 全20例
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                無料体験の3症例に加え、<strong className="text-[#1E3D34] dark:text-[#74BA9E]">全20症例</strong>の問診開示・弁証推論・処方配穴プロセスを実践演習できます。
              </p>
            </div>
            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6]">
              <Link href="/cases" className="text-[#1E3D34] dark:text-[#74BA9E] underline">
                無料3症例を試す →
              </Link>
            </div>
          </div>

          {/* 違い3: 発展学習ツール */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                発展・比較ツールの解放
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                ツボの鑑別を深める<strong className="text-[#1E3D34] dark:text-[#74BA9E]">3穴同時比較</strong>や、<strong className="text-[#1E3D34] dark:text-[#74BA9E]">奇経八脈の全流注図（全8脈）</strong>、要穴特訓など思考深化ツールが使い放題になります。
              </p>
            </div>
            <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] text-[11px] text-[#737C77] dark:text-[#8899A6]">
              学生・臨床家双方の学びを支援
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. 簡潔な比較表（マイノートが上段） */}
      {/* ======================================================== */}
      <div className="space-y-4 max-w-4xl mx-auto pt-4">
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
                  3件
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
                  20件
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
            { title: "臨床ノートの保存件数", free: "3件", premium: "500件" },
            { title: "配穴の保存件数", free: "20件", premium: "1,000件" },
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
      {/* 6. 保存方法とプライバシーの安心設計 */}
      {/* ======================================================== */}
      <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#EBF7F2] dark:bg-[#14261E] border border-[#BDE3D4] dark:border-[#24523F] space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#1D5E46] dark:text-[#8EE0C0]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#2E7D5B] dark:text-[#74BA9E]" />
          <span>クラウド自動同期と患者プライバシーの安心設計</span>
        </div>
        <p className="text-xs sm:text-sm text-[#315143] dark:text-[#A0C4B4] leading-relaxed">
          無料ログインすると、クラウド自動保存・PCスマホ間同期が有効になります。データベースには患者様の実名・連絡先・住所・生年月日を保持しない<strong>完全匿名設計（カルテ番号管理）</strong>と、本人以外アクセスできない<strong>厳格な行レベルセキュリティ（RLS）</strong>を採用。情報漏洩リスクとデータ消失リスクの双方を徹底して防ぎます。（※未ログイン時は登録不要でお使いの端末内のみに保存されます）
        </p>
      </div>

      {/* ======================================================== */}
      {/* 7. よくある質問（FAQ：指示書第11項の5問） */}
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
          {/* Q1 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>無料と有料は、マイノートで何が変わりますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              主な違いは保存できる件数です。無料版では臨床ノート3件・配穴20件までですが、プレミアムでは臨床ノート500件・配穴1,000件まで保存枠が広がります。養生シートの印刷やクラウド自動同期、バックアップ機能は無料枠内でもお試しいただけます。
            </p>
          </details>

          {/* Q2 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>スマホとPCで同じ記録を使えますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい、無料ログイン（Googleログイン等）していただくことで、クラウド自動保存・PCスマホ間同期が有効になり、PCで書いたノートを通勤中のスマホですぐに確認・編集できます。行レベルセキュリティ（RLS）によりご本人以外のアクセスは物理的に遮断され、患者さんの実名も保持しない匿名設計のため安全にご利用いただけます。また、未ログイン時でも手動バックアップ（ファイル保存・読込）によるデータ移行が可能です。
            </p>
          </details>

          {/* Q3 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>記録は消えることがありますか？バックアップはどうしますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              ログインしてクラウド同期を有効にしている場合、安全なクラウドデータベースに保存されるため、ブラウザの閲覧履歴削除や端末の故障・機種変更でも記録が消えることはありません。未ログイン（端末保存のみ）の状態でブラウザ履歴やキャッシュを一括消去するとデータが消える可能性があるため、無料ログインでのクラウド保護、またはマイノート画面の「ファイルに保存」ボタンからの定期的な手元バックアップをおすすめします。
            </p>
          </details>

          {/* Q4 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>解約後、保存した記録はどうなりますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              解約後も、端末内に保存された既存のノートや配穴はそのまま閲覧・印刷できます。ただし、無料枠の上限（ノート3件・配穴20件）を超えている場合は新しいノートの追加保存ができなくなります。必要に応じて解約前にバックアップファイルを保存してください。
            </p>
          </details>

          {/* Q5 */}
          <details className="group rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer">
              <span>学生でも使えますか？</span>
              <ChevronDown className="w-4 h-4 text-[#737C77] transition-transform group-open:rotate-180 shrink-0 ml-2" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed border-t border-[#E8E1D1] dark:border-[#22303D] pt-3">
              はい、学生の方の学習にも最適です。臨床実習での症例記録や配穴の整理に加え、全20症例の演習問題や経穴比較ツールなど、将来の臨床を見据えた実践的なトレーニング教材として活用いただけます。
            </p>
          </details>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 8. 最後の申込ボタンとマイノート体験リンク */}
      {/* ======================================================== */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center space-y-4 shadow-sm">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          まずはマイノートの使い心地をお試しください
        </h3>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
          会員登録なしで、今すぐ3件のノート作成と養生シート印刷を体験できます。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/notes"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs sm:text-sm font-bold shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Bookmark className="w-4 h-4 text-[#E6C387]" />
            <span>マイノートを無料で試す</span>
          </Link>
          {isPremium ? (
            <Link
              href="/account/subscription"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm font-bold hover:bg-[#EBE4D5] dark:hover:bg-[#1F2C37] transition-all"
            >
              契約状況を確認する
            </Link>
          ) : salesEnabled ? (
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] text-xs sm:text-sm font-bold hover:bg-[#EBF3EF] transition-all cursor-pointer disabled:opacity-60"
            >
              {billingCycle === "yearly" ? "年額9,800円で申し込む" : "月額980円で申し込む"}
            </button>
          ) : null}
        </div>
      </div>

    </div>
  );
}



