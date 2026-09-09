"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  HeartPulse, 
  Stethoscope, 
  Menu, 
  X, 
  Compass, 
  GraduationCap, 
  BookOpen, 
  ChevronDown,
  ArrowRight
} from "lucide-react";
import YinYangSwitch from "./YinYangSwitch";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"general" | "expert" | null>(null);

  const generalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const expertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (type: "general" | "expert") => {
    if (type === "general") {
      if (generalTimeoutRef.current) clearTimeout(generalTimeoutRef.current);
      setOpenDropdown("general");
    } else {
      if (expertTimeoutRef.current) clearTimeout(expertTimeoutRef.current);
      setOpenDropdown("expert");
    }
  };

  const handleMouseLeave = (type: "general" | "expert") => {
    if (type === "general") {
      generalTimeoutRef.current = setTimeout(() => {
        setOpenDropdown((prev) => (prev === "general" ? null : prev));
      }, 150);
    } else {
      expertTimeoutRef.current = setTimeout(() => {
        setOpenDropdown((prev) => (prev === "expert" ? null : prev));
      }, 150);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴエリア */}
          <Link href="/" className="flex items-center group min-w-0 pr-2">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors truncate">
              はり太郎の東洋医学
            </span>
          </Link>

          {/* デスクトップ ナビゲーション（2大集約メニュー） */}
          <nav className="hidden md:flex items-center gap-3">
            {/* 1. 一般・セルフケア ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("general")}
              onMouseLeave={() => handleMouseLeave("general")}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "general" ? null : "general")}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  openDropdown === "general"
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>一般・セルフケア</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "general" ? "rotate-180" : ""}`} />
              </button>

              {/* ドロップダウンメニュー */}
              {openDropdown === "general" && (
                <div className="absolute top-full left-0 mt-1 w-64 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <Link
                    href="/symptoms"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] block">
                        症状・お悩み別ガイド
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        頭痛・肩こり・不眠のセルフケア
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/diagnosis"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FDEDEC] dark:bg-[#2C1816] text-[#A83629] dark:text-[#E06A5D] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] block">
                        気血水 体質セルフ診断
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        12問でわかる心身のバランス
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. 専門家・学生向け ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("expert")}
              onMouseLeave={() => handleMouseLeave("expert")}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "expert" ? null : "expert")}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  openDropdown === "expert"
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#65D4B2]" />
                <span>専門家・学生向け</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "expert" ? "rotate-180" : ""}`} />
              </button>

              {/* ドロップダウンメニュー */}
              {openDropdown === "expert" && (
                <div className="absolute top-full left-0 mt-1 w-72 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <Link
                    href="/curriculum"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] block">
                          体系学習カリキュラム
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          新設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        陰陽・五行・気血水から臨床まで
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/tsubo"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#3CD0A0] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E1D1] dark:border-[#263542]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] block">
                        十四経脈・経穴辞典
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        全361穴・骨度法取穴・要穴
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/articles"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] block">
                        臨床知見・学術論文抄読
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        配穴の極意と現代医科学
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 陰陽太極図 テーマ切り替えスイッチ */}
            <div className="ml-2 mr-1">
              <YinYangSwitch />
            </div>

            {/* サイト理念 */}
            <Link
              href="/about"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] shadow-sm transition-all"
            >
              サイト理念
            </Link>
          </nav>

          {/* モバイルヘッダー右側（陰陽スイッチ & メニューボタン） */}
          <div className="flex items-center gap-2 md:hidden">
            <YinYangSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#404743] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#131A21] px-4 pt-4 pb-7 space-y-5 shadow-lg">
          {/* 一般向けセクション */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387] px-3">
              一般・セルフケア
            </span>
            <Link
              href="/symptoms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>お悩み・症状別ガイド</span>
            </Link>
            <Link
              href="/diagnosis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Stethoscope className="w-4 h-4 text-[#A83629] dark:text-[#E06A5D]" />
              <span>気血水 体質セルフ診断</span>
            </Link>
          </div>

          {/* 専門家・学生向けセクション */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#65D4B2] px-3">
              専門家・学生向け
            </span>
            <Link
              href="/curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#65D4B2] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>体系学習カリキュラム</span>
            </Link>
            <Link
              href="/tsubo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
              <span>十四経脈・経穴辞典（361穴）</span>
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D] dark:text-[#6FA0D6]" />
              <span>臨床知見・学術論文抄読</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]"
            >
              はり太郎の理念・サイトについて
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
