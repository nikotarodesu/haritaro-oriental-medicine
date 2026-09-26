"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Crown, 
  User as UserIcon, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Bookmark,
  Sliders,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

export default function SubscriptionManagementPage() {
  const { 
    user, 
    isPremium, 
    cancelSubscription, 
    resumeSubscription, 
    upgradeToPremium, 
    migrateLocalData,
    setDemoRole,
    logout
  } = useAuth();
  const { memos, clipCount, maxLimit } = useClinicalMemo();

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [migrationReport, setMigrationReport] = useState<any>(null);

  // URLパラメータのチェック（Stripe Checkout後のリダイレクト等）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isUpgraded = params.get("upgraded") === "true" || params.get("demo_upgraded") === "true";
    const plan = (params.get("plan") as any) === "yearly" ? "yearly" : "monthly";

    if (isUpgraded) {
      upgradeToPremium(plan);
      setActionMessage("プレミアム会員へのご登録が完了いたしました！全機能をお楽しみください。");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [upgradeToPremium]);

  // 解約処理
  const handleCancel = async () => {
    if (!window.confirm("プレミアム会員の次回更新を停止（解約予約）しますか？\n期間満了日までは引き続き全機能をご利用いただけます。")) {
      return;
    }
    setIsProcessing(true);
    try {
      await cancelSubscription();
      setActionMessage("解約予約を受け付けました。現在の契約期間終了日まで引き続きご利用いただけます。");
    } catch (e: any) {
      alert("処理に失敗しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 解約キャンセル（契約再開）
  const handleResume = async () => {
    setIsProcessing(true);
    try {
      await resumeSubscription();
      setActionMessage("定期更新を再開いたしました。ありがとうございます！");
    } catch (e: any) {
      alert("処理に失敗しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Stripe カスタマーポータルを開く
  const handleOpenPortal = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: user?.subscription?.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "ポータルの起動に失敗しました");
      }
    } catch (e: any) {
      alert("エラーが発生しました: " + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ローカルデータ移行の確認
  const handleMigrate = () => {
    const report = migrateLocalData();
    setMigrationReport(report);
    setActionMessage(`ローカルデータの確認が完了しました（保存カルテ: ${report.memoCount}件、受講済み講義: ${report.curriculumProgressCount}講）。`);
  };

  const plan = user?.subscription?.plan || "monthly";
  const planInfo = SUBSCRIPTION_CONFIG.pricing[plan];
  const isCanceled = user?.subscription?.status === "canceled";
  const periodEndFormatted = user?.subscription?.currentPeriodEnd
    ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "なし";

  const usagePercent = Math.min(100, Math.round((clipCount / maxLimit) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-12">
      {/* ページ見出し */}
      <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#263542] pb-6">
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E]">ホーム</Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">マイページ・契約管理</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
          マイページ・契約プラン管理
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
          ご登録の会員情報、現在のサブスクリプション状況の確認、解約・変更手続きを行えます。
        </p>
      </div>

      {/* 通知メッセージ */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#74BA9E] text-xs sm:text-sm font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{actionMessage}</span>
          </div>
          <button 
            onClick={() => setActionMessage(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* 会員ランク・契約ステータスカード */}
      <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D1] dark:border-[#22303D] pb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isPremium 
                ? "bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F]"
                : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
            }`}>
              {isPremium ? <Crown className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6]">現在のプラン</span>
                {user?.role === "admin" ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#B86924] text-white text-[10px] font-bold">
                    ADMIN
                  </span>
                ) : isPremium ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#1E3D34] text-white text-[10px] font-bold">
                    PREMIUM
                  </span>
                ) : null}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                {user?.role === "admin"
                  ? "管理者モード（全記事・全症例・全ツール完全解放）"
                  : isPremium 
                  ? `プレミアム会員（${plan === "yearly" ? "年払い" : "月払い"}）`
                  : "無料会員（一般プラン）"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPremium ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1E3D34] to-[#2B6958] hover:opacity-95 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Crown className="w-3.5 h-3.5 text-[#E6C387]" />
                <span>プレミアム会員に登録する</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : isCanceled ? (
              <button
                type="button"
                onClick={handleResume}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white text-xs font-bold shadow-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>定期更新を再開する</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] hover:bg-[#F2EDE2] dark:hover:bg-[#1E2C38] text-xs font-bold text-[#737C77] dark:text-[#8899A6] transition-all"
              >
                <span>次回更新を停止（解約予約）</span>
              </button>
            )}
          </div>
        </div>

        {/* 契約詳細情報テーブル */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
            <span className="text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>次回更新日 / 満了日</span>
            </span>
            <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
              {periodEndFormatted}
            </div>
            {isCanceled && (
              <p className="text-[11px] text-[#B86924] dark:text-[#E6C387] font-semibold">
                ※解約予約済み（期間終了まで利用可）
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] space-y-1">
            <span className="text-[#737C77] dark:text-[#8899A6] flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span>ご請求金額</span>
            </span>
            <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
              {isPremium ? `${planInfo.displayPrice} / ${planInfo.periodLabel}` : "¥0（無料）"}
            </div>
            {isPremium && (
              <p className="text-[11px] text-[#59615D] dark:text-[#8899A6]">
                消費税込
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <span className="text-[#737C77] dark:text-[#8899A6] flex items-center gap-1.5">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5" />
                )}
                <span>アカウント（メール）</span>
                {user?.authProvider === "google" && (
                  <span className="px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-200 dark:border-blue-900/50">
                    Google連携
                  </span>
                )}
              </span>
              <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5] truncate">
                {user?.email || "未ログイン（ゲスト）"}
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#8899A6] truncate">
                {user ? (user.name ? `${user.name} としてログイン中` : "ログイン中") : "端末ローカルデータのみ利用中"}
              </p>
            </div>

            <div className="pt-1">
              {user ? (
                <button
                  type="button"
                  onClick={() => logout()}
                  className="inline-flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 hover:underline font-bold"
                >
                  <LogOut className="w-3 h-3" />
                  <span>ログアウト</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1 text-[11px] text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold"
                >
                  <span>Googleでログイン / 新規登録</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 外部ポータルへの案内（Stripeカスタマーポータル） */}
        {isPremium && (
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-[#FAF8F5] dark:bg-[#10171F] p-4 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
            <div className="space-y-0.5">
              <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                クレジットカード情報の変更・領収書のダウンロード
              </span>
              <p className="text-[#59615D] dark:text-[#8899A6]">
                Stripeの安全な決済管理画面（カスタマーポータル）にて行えます。
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenPortal}
              disabled={isProcessing}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#F2EDE2] transition-colors shrink-0"
            >
              <span>決済管理ポータルを開く</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* マイノートの保存容量メーター */}
      <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>マイノート（配穴・臨床録）保存枠</span>
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              臨床知見、重要配穴、患者症例ノートの保存状況です。
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              {clipCount}
            </span>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
              {" "}/ {maxLimit} 件
            </span>
          </div>
        </div>

        {/* プログレスバー */}
        <div className="w-full h-3 rounded-full bg-[#EBE4D5] dark:bg-[#1E2933] overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              usagePercent > 90 ? "bg-[#B86924]" : "bg-[#1E3D34] dark:bg-[#74BA9E]"
            }`}
            style={{ width: `${Math.max(2, usagePercent)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
          <span>使用率: {usagePercent}%</span>
          <span>
            {isPremium
              ? "プレミアム会員: 最大1,000件の大容量枠"
              : "無料会員: 最大20件まで（プレミアムで1,000件に拡張可能）"}
          </span>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
          >
            <span>マイノート（臨床録・配穴）を開く</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ローカルデータの安全同期と移行確認 */}
      <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#152028] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>ローカルデータの同期・引き継ぎ確認</span>
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              端末（ブラウザ）に保存されている学習ノートやカリキュラム受講履歴をアカウントと安全に同期します。
            </p>
          </div>
          <button
            type="button"
            onClick={handleMigrate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#10171F] border border-[#D8CFC0] dark:border-[#384C5E] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>データ同期ステータスを確認</span>
          </button>
        </div>

        {migrationReport && (
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D] text-xs space-y-1">
            <div className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">✓ 同期・引き継ぎ確認済み</div>
            <div className="text-[#59615D] dark:text-[#96A6B2]">
              ・保存した学習ノート: {migrationReport.memoCount} 件<br />
              ・受講済みカリキュラム講義: {migrationReport.curriculumProgressCount} 講<br />
              ・クイズ回答記録: {migrationReport.quizResultCount} 問
            </div>
          </div>
        )}
      </div>

      {/* 開発・検証・動作確認用ツール（デモ切り替えスイッチ） */}
      <div className="p-5 rounded-2xl bg-[#F4EFE6] dark:bg-[#10171F] border border-[#E0D5C1] dark:border-[#263745] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
          <Sliders className="w-4 h-4" />
          <span>動作検証用・ワンクリック権限シミュレーター</span>
        </div>
        <p className="text-xs text-[#59615D] dark:text-[#8899A6]">
          このツールにより、Stripeの決済を実行する前の段階でも「無料会員（20件上限・3症例体験）」「プレミアム月額会員（1,000件・全機能）」「プレミアム年額会員」の挙動を即座にテストできます。
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setDemoRole("free");
              setActionMessage("無料会員モードに切り替えました（ノート上限20件、症例3例体験）");
            }}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-xs font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#FAF8F5]"
          >
            無料会員としてテスト
          </button>
          <button
            type="button"
            onClick={() => {
              setDemoRole("premium", "monthly");
              setActionMessage("プレミアム会員（月額980円）に切り替えました（全機能解放）");
            }}
            className="px-3 py-1.5 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#B86924] text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCECD8]"
          >
            プレミアム月額としてテスト
          </button>
          <button
            type="button"
            onClick={() => {
              setDemoRole("premium", "yearly");
              setActionMessage("プレミアム会員（年額9,800円）に切り替えました（全機能解放）");
            }}
            className="px-3 py-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] border border-[#1E3D34] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#D8EADB]"
          >
            プレミアム年額としてテスト
          </button>
        </div>
      </div>
    </div>
  );
}
