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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F5F1E8] via-[#FAF8F5] to-[#EAE3D4] dark:from-[#17222C] dark:via-[#131B23] dark:to-[#0F161C] border border-[#E3DAC6]/70 dark:border-[#22303D] px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xs mb-5 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1E3D34] text-[#FAF8F5] dark:bg-[#74BA9E] dark:text-[#0D1512] shrink-0">
            <Sparkles className="w-3 h-3 text-[#E6C387] dark:text-[#0D1512]" />
            はじめての方へ
          </span>
          <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] truncate">
            理論・国試演習（全81講義）から臨床推論・患者カルテまでをひとつの場所で。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs">
          <Link
            href="/about"
            className="font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1"
          >
            <span>制作理念と使い方</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleDismiss}
            aria-label="案内を閉じる"
            className="p-1 rounded-lg text-[#737C77] hover:text-[#232826] dark:text-[#8899A6] dark:hover:text-[#FAF8F5] hover:bg-[#EAE3D4]/60 dark:hover:bg-[#1E2B36] transition-colors"
            title="次回から非表示"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
