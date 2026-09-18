"use client";

import React from "react";
import Link from "next/link";
import { 
  X, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Lock,
  GraduationCap,
  Layers,
  FileText
} from "lucide-react";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  featureKey?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  title = "プレミアム会員限定機能です",
  description = "このコンテンツを利用するには、はり太郎プレミアム会員へのご登録が必要です。",
  featureKey,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#152029] rounded-3xl border-2 border-[#D4C3A3] dark:border-[#384C5E] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 背景装飾 */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#B86924]/10 dark:bg-[#E6C387]/10 rounded-full blur-2xl pointer-events-none" />

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#737C77] hover:text-[#232826] dark:text-[#8899A6] dark:hover:text-[#FAF8F5] rounded-full hover:bg-[#EBE4D5] dark:hover:bg-[#1E2C38] transition-colors"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>

        {/* アイコンとタイトル */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] shadow-xs">
            <Crown className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
            {description}
          </p>
        </div>

        {/* プレミアム会員の特典ハイライト */}
        <div className="bg-[#FFFFFF] dark:bg-[#10171F] rounded-2xl p-4 border border-[#E8E1D1] dark:border-[#22303D] space-y-2.5">
          <div className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>プレミアム会員で解放される全機能</span>
          </div>
          <ul className="text-xs space-y-2 text-[#404743] dark:text-[#C5D2DB]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
              <span><strong>臨床症例演習 全20症例</strong>（段階的問診・四診開示と専門解説）</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
              <span><strong>マイカルテ保存上限 1,000件</strong> ＋ A4印刷・JSON/MD書き出し</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
              <span><strong>奇経八脈（全8脈）</strong>流注SVG図 ＆ 八脈交会穴配穴理論</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
              <span><strong>配穴設計・臨床演習機能</strong>（自作配穴の作成・教材名配穴との比較・保存）</span>
            </li>
          </ul>
        </div>

        {/* 準備中案内 */}
        <div className="space-y-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#11171E] border border-[#E5DEC9] dark:border-[#2A3B4A] text-center space-y-1">
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
              現在リニューアル準備中です
            </span>
            <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
              プレミアム会員の一般受付は近日中に再開予定です。正式オープンまで今しばらくお待ちください。
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#162D26] text-white font-bold text-xs shadow-sm transition-all"
          >
            閉じる
          </button>

          <div className="text-center text-[11px] text-[#737C77] dark:text-[#8899A6] pt-1">
            <Link 
              href="/auth/login"
              onClick={onClose}
              className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] underline underline-offset-2"
            >
              すでに会員の方はこちら（ログイン）
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
