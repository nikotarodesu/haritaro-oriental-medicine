"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  FileText, 
  Layers, 
  Flame,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const { user, isPremium, upgradeToPremium } = useAuth();

  const currentPricing = SUBSCRIPTION_CONFIG.pricing[billingCycle];

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // Checkout API呼び出し
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
        // Stripe Checkout 画面へ遷移
        window.location.href = data.url;
      } else if (data.demo && data.redirectUrl) {
        // デモ・テストモード時の自動昇格＆マイページ遷移
        await upgradeToPremium(billingCycle);
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || "決済セッションの作成に失敗しました");
      }
    } catch (e: any) {
      console.error(e);
      // フォールバック: デモ昇格
      await upgradeToPremium(billingCycle);
      window.location.href = `/account/subscription?plan=${billingCycle}&demo_upgraded=true`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* ヒーローヘッダー */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>はり太郎 プレミアム会員</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-tight">
          臨床思考を深める、<br className="hidden sm:inline" />
          東洋医学の最高峰学習ツール。
        </h1>

        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          基礎理論の習得から臨床現場での即応力へ。厳選された20の臨床症例演習、大容量マイカルテ（1,000件保存）、奇経八脈の全流注図、条件比較シミュレーターなど、臨床家・学習者のための全機能を無制限にご活用いただけます。
        </p>

        {/* 月払い / 年払い 切り替えスイッチ */}
        <div className="pt-4 flex items-center justify-center">
          <div className="p-1 rounded-2xl bg-[#EBE4D5] dark:bg-[#1E2933] inline-flex items-center relative shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                  : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826]"
              }`}
            >
              月払い（¥980 / 月）
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E] shadow-sm"
                  : "text-[#59615D] dark:text-[#8899A6] hover:text-[#232826]"
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

      {/* プラン比較カード（無料会員 vs プレミアム会員） */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* 無料会員カード */}
        <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-7 sm:p-9 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider">
                無料プラン
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                無料会員（ゲスト）
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
                  <span>マイカルテ保存: <strong>最大20件まで</strong></span>
                </li>
                <li className="flex items-center gap-2 text-[#8899A6]">
                  <X className="w-4 h-4 text-[#8899A6] shrink-0" />
                  <span className="line-through">条件比較シミュレーター（2条件並行比較）</span>
                </li>
                <li className="flex items-center gap-2 text-[#8899A6]">
                  <X className="w-4 h-4 text-[#8899A6] shrink-0" />
                  <span className="line-through">奇経八脈（全8脈）流注SVG図・交会穴解説</span>
                </li>
                <li className="flex items-center gap-2 text-[#8899A6]">
                  <X className="w-4 h-4 text-[#8899A6] shrink-0" />
                  <span className="line-through">マイカルテのA4印刷 ＆ JSON/Markdown書き出し</span>
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

        {/* プレミアム会員カード（注目・強調） */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FAF8F5] to-[#F5ECE1] dark:from-[#17222B] dark:to-[#121B23] border-2 border-[#B86924] dark:border-[#E6C387] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xl">
          {/* おすすめバッジ */}
          <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#B86924] to-[#C87A35] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>臨床実践・学習に推奨</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>プレミアム会員</span>
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                {billingCycle === "yearly" ? "プレミアム年額プラン" : "プレミアム月額プラン"}
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                全20症例の完全演習、大容量ノート、高度な鑑別・比較ツールをすべて解放。
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
              {billingCycle === "yearly" && (
                <p className="text-xs text-[#B86924] dark:text-[#E6C387] font-bold mt-1">
                  ※ 月あたり実質約817円（月払いに比べて年間1,960円お得）
                </p>
              )}
            </div>

            <div className="border-t border-[#E0D2BE] dark:border-[#2C3B49] pt-4 space-y-3">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">プレミアム限定の特典:</span>
              <ul className="text-xs space-y-2.5 text-[#232826] dark:text-[#FAF8F5]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>臨床症例演習 全20症例</strong>（初級〜上級・四診解説完備）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>マイカルテ保存 1,000件</strong>（無料枠の50倍の大容量）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>条件比較シミュレーター</strong>（2つの病態・治療案を並列比較）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>配穴練習機能</strong>（選定理由の記録・教材名配穴との比較）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>奇経八脈（全8脈）</strong>流注SVG図・交会穴解説・演習</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>経穴比較ツール（最大3穴）</strong> ＆ マイカルテ直接保存</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>A4カルテ印刷 ＆ JSON/Markdownエクスポート</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                  <span><strong>忘却曲線スマート復習</strong> ＆ 文献・症例資料集</span>
                </li>
              </ul>
            </div>
          </div>

          {isPremium ? (
            <Link
              href="/account/subscription"
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-center font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-[#E6C387]" />
              <span>ご契約中のマイページを見る</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B86924] to-[#C87A35] hover:from-[#9C5417] hover:to-[#B86924] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-[#FAF8F5]" />
              <span>{isLoading ? "処理中..." : `プレミアム会員に登録する（${currentPricing.displayPrice} / ${currentPricing.periodLabel}）`}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* 安心の3大ポリシー */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
        <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">いつでも解約可能</h4>
          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            最低契約期間の縛りはありません。マイページからいつでもワンクリックで解約予約が可能です。
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">即時全機能解放</h4>
          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            お申し込み完了後、直ちに20症例や奇経八脈、比較ツールなどの全プレミアム機能をご利用いただけます。
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">ローカルデータ安全同期</h4>
          <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            これまで端末（ブラウザ）に保存していたマイカルテや学習進捗は、自動的にお手元のアカウントへ引き継がれます。
          </p>
        </div>
      </div>

      {/* 詳細機能比較テーブル */}
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            機能詳細の完全比較
          </h3>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
            無料会員とプレミアム会員でご利用いただける機能一覧です。
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#152028]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#F2EDE2] dark:bg-[#10171F]">
                <th className="p-4 font-bold text-[#232826] dark:text-[#FAF8F5] w-2/5">機能・コンテンツ</th>
                <th className="p-4 font-bold text-[#59615D] dark:text-[#8899A6] text-center w-1/4">無料会員</th>
                <th className="p-4 font-bold text-[#B86924] dark:text-[#E6C387] text-center w-1/3">プレミアム会員</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DEC9] dark:divide-[#2A3B4A]">
              {SUBSCRIPTION_CONFIG.features.map((feat) => (
                <tr key={feat.id} className="hover:bg-[#FFFFFF]/50 dark:hover:bg-[#1C2834]/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[#232826] dark:text-[#FAF8F5]">{feat.title}</div>
                    <div className="text-xs text-[#59615D] dark:text-[#96A6B2] mt-0.5">{feat.description}</div>
                  </td>
                  <td className="p-4 text-center text-[#59615D] dark:text-[#96A6B2]">
                    {feat.free}
                  </td>
                  <td className="p-4 text-center font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    {feat.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* よくある質問（FAQ） */}
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            よくあるご質問（FAQ）
          </h3>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0" />
              <span>いつでも解約できますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-6">
              はい、マイページの「契約管理」画面からいつでもワンクリックで解約いただけます。解約後も、すでにお支払い済みの契約期間終了日までは引き続きプレミアム機能をすべてご利用いただけます。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0" />
              <span>月払いから年払い（またはその逆）に変更できますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-6">
              はい、マイページまたはStripeカスタマーポータルより、次回更新時に適用されるプラン変更がいつでも可能です。年払いをお選びいただくと、月払いと比較して2ヶ月分（年間1,960円）お得になります。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <h4 className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0" />
              <span>これまでに保存したマイカルテや学習進捗はどうなりますか？</span>
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed pl-6">
              ブラウザに保存されていた既存データはそのまま引き継がれます。さらに無料枠の20件制限が1,000件へ大幅に拡大され、外部へのJSON/Markdownエクスポートや印刷も可能になります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
