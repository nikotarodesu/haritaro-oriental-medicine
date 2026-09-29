"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  X, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

const STORAGE_KEY = "haritaro_welcome_guide_dismissed";

export default function HomeWelcomeGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // 初回訪問時のみ表示
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F5] to-[#EAE3D4] dark:from-[#17222C] dark:via-[#131B23] dark:to-[#0F161C] border border-[#E3DAC6] dark:border-[#22303D] p-4 sm:p-6 shadow-sm mb-6 transition-all duration-300">
      {/* 閉じるボタン */}
      <button
        onClick={handleDismiss}
        aria-label="案内を閉じる"
        className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-[#737C77] hover:text-[#232826] dark:text-[#8899A6] dark:hover:text-[#FAF8F5] hover:bg-[#EAE3D4]/60 dark:hover:bg-[#1E2B36] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* バナーヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1E3D34] text-[#FAF8F5] dark:bg-[#74BA9E] dark:text-[#0D1512]">
          <Sparkles className="w-3 h-3 text-[#E6C387] dark:text-[#0D1512]" />
          はじめての方へ
        </span>
        <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
          はり太郎の東洋医学・3大活用ナビ
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床と国家試験を網羅する、まったく新しい東洋医学プラットフォーム
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed">
            単なるツボ辞書ではありません。理論（全81講義）から臨床（弁証推論・配穴）、国試対策までがシームレスに連動しています。
          </p>
        </div>

        {/* 3大機能ハイライト */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <Link
            href="/tsubo"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#1A2530]/80 border border-[#E8E1D1] dark:border-[#263747] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
          >
            <span className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#1C332A] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors flex items-center gap-1">
                <span>361穴・解剖断面辞典</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5 line-clamp-2">
                WHO標準取穴・深部解剖構造・刺鍼深度・気胸リスクを完全網羅。
              </p>
            </div>
          </Link>

          <Link
            href="/simulator"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#1A2530]/80 border border-[#E8E1D1] dark:border-[#263747] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
          >
            <span className="w-8 h-8 rounded-lg bg-[#F5EFE6] dark:bg-[#32281D] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors flex items-center gap-1">
                <span>3段階 弁証シミュレーター</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5 line-clamp-2">
                八綱・気血水・臓腑から最適な配穴をリアルタイム自動推論。
              </p>
            </div>
          </Link>

          <Link
            href="/kokushi"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-[#1A2530]/80 border border-[#E8E1D1] dark:border-[#263747] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
          >
            <span className="w-8 h-8 rounded-lg bg-[#EEF2F6] dark:bg-[#1E2C3B] text-[#2C5282] dark:text-[#90CDF4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#2C5282] dark:group-hover:text-[#90CDF4] transition-colors flex items-center gap-1">
                <span>国試対策＆忘却曲線演習</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5 line-clamp-2">
                日替わり忘却曲線復習・状況設定症例・要穴マスター特訓。
              </p>
            </div>
          </Link>
        </div>

        {/* フッター：PWA（ホーム画面追加）案内 ＆ 次回から非表示ボタン */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#E3DAC6]/60 dark:border-[#22303D] text-xs">
          <div className="flex items-center gap-1.5 text-[#59615D] dark:text-[#A0B0BC]">
            <Smartphone className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
            <span>
              <strong className="font-semibold text-[#232826] dark:text-[#FAF8F5]">ホーム画面に追加</strong>（PWA）すると、アプリ感覚でオフラインでも高速起動できます。
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={handleDismiss}
              className="text-[11px] text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5] underline underline-offset-2 transition-colors"
            >
              了解・次回から非表示
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
