"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { 
  HeartPulse, 
  Stethoscope, 
  Menu, 
  X, 
  Compass, 
  GraduationCap, 
  BookOpen, 
  ChevronDown,
  ArrowRight,
  Layers,
  Activity,
  Bookmark,
  SlidersHorizontal,
  Crown,
  User as UserIcon,
  Sparkles,
  FileText
} from "lucide-react";
import YinYangSwitch from "./YinYangSwitch";
import FontSizeControl from "./FontSizeControl";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"learn" | "search" | "think" | "intro" | "settings" | null>(null);

  const { clipCount, openDrawer } = useClinicalMemo();
  const { currentSeason } = useSeasonalTheme();
  const { user, isPremium } = useAuth();

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (type: "learn" | "search" | "think" | "intro" | "settings") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(type);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header 
      className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-500"
      style={{ borderTop: `2.5px solid ${currentSeason.accentHex}` }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴエリア */}
          <div className="flex items-center min-w-0 shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="font-serif text-[17px] sm:text-xl md:text-2xl font-bold tracking-normal sm:tracking-wide text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors whitespace-nowrap">
                はり太郎の東洋医学
              </span>
            </Link>
          </div>

          {/* デスクトップ ナビゲーション（学ぶ・調べる・考える 3大体系 ＋ 入門） */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* 1. 学ぶ ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("learn")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "learn" ? null : "learn")}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  openDropdown === "learn"
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#83BEA8]" />
                <span>学ぶ</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "learn" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "learn" && (
                <div className="absolute top-full left-0 mt-1 w-80 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-[10px] font-bold tracking-wider text-[#1E3D34] dark:text-[#83BEA8] uppercase">
                      体系学習カリキュラム
                    </span>
                  </div>
                  <Link
                    href="/curriculum"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        東洋医学8大体系
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        陰陽・五行・気血水から臨床実践論まで
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. 調べる ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("search")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "search" ? null : "search")}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  openDropdown === "search"
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>調べる</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "search" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "search" && (
                <div className="absolute top-full left-0 mt-1 w-80 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-[10px] font-bold tracking-wider text-[#1E3D34] dark:text-[#74BA9E] uppercase">
                      リファレンス・学術データベース
                    </span>
                  </div>

                  <Link
                    href="/tsubo"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E1D1] dark:border-[#263542]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        十四経脈・経穴辞典（全361穴）
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        十四経脈・骨度法・解剖取穴・主治・禁忌
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/articles"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        臨床知見・学術論文抄読
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        神経生理学・配穴機序・古典解説
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/curriculum"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        8体系カリキュラム（全体像）
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        基礎理論から診断・治法・実践まで全71講
                      </span>
                    </div>
                  </Link>
                  <Link
                    href="/kikei"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E1D1] dark:border-[#263542]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          奇経八脈（全8脈）・流注図
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                          PREMIUM
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        任督衝帯・陰陽蹻・陰陽維の流注SVG図と交会穴理論
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/tsubo/compare"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          経穴比較ツール（最大3穴）
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                          PREMIUM
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        2〜3穴の解剖・要穴・主治を横並び比較＆保存
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. 考える ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("think")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "think" ? null : "think")}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  openDropdown === "think"
                    ? "bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#B86924] dark:hover:text-[#FAF8F5] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
                }`}
              >
                <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>考える</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "think" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "think" && (
                <div className="absolute top-full left-0 mt-1 w-84 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#B86924]/30 dark:border-[#4D331F] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-[10px] font-bold tracking-wider text-[#B86924] dark:text-[#E6C387] uppercase">
                      臨床推論・アウトプット演習
                    </span>
                  </div>

                  <Link
                    href="/simulator"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                          臨床弁証シミュレーター
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          中核
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        八綱 ➜ 気血水 ➜ 臓腑 ➜ 一文の証 ➜ 特効ペアツボを即座に導出
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/cases"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                          臨床症例演習（全20症例）
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          3例無料
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        段階的問診・四診開示から弁証・治法・配穴を導く本格演習
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/practice/haiketsu"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                          配穴練習機能
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                          PREMIUM
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        選定理由を記録し教材名配穴と比較検証
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. 入門・セルフケア ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("intro")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "intro" ? null : "intro")}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                  openDropdown === "intro"
                    ? "bg-[#FAF8F5] dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC]"
                    : "text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530]"
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>入門・セルフケア</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === "intro" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "intro" && (
                <div className="absolute top-full right-0 mt-1 w-72 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-[10px] font-bold tracking-wider text-[#737C77] dark:text-[#8899A6] uppercase">
                      東洋医学を知る入口
                    </span>
                  </div>

                  <Link
                    href="/diagnosis"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FDEDEC] dark:bg-[#231816] text-[#A83629] dark:text-[#C47A72] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                        気血水 体質セルフ診断
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        12問でわかる心身のバランス（約2分）
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/symptoms"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <HeartPulse className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                        症状・お悩み別ガイド
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        頭痛・肩こり・不眠のセルフケアツボ
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/diagnosis?tab=gorou"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                        五労（職業病）チェッカー
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        デスクワーク・立ち仕事の五臓疲弊チェック
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* マイノート・クリップ引き出しトグル */}
            <button
              type="button"
              onClick={openDrawer}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#251A10] border border-[#F3DEC5] dark:border-[#4A321E] hover:bg-[#FBEAD7] transition-all shadow-2xs"
              title="マイカルテ（保存したツボ・配穴・臨床メモ）を開く"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>マイカルテ</span>
              {clipCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#B86924] text-white">
                  {clipCount}
                </span>
              )}
            </button>

            {/* プレミアム会員マイページ（加入者のみ表示） */}
            {isPremium && (
              <Link
                href="/account/subscription"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white hover:opacity-90 transition-all text-xs font-bold shadow-xs"
                title={user?.role === "admin" ? "管理者マイページ" : "プレミアム会員マイページ"}
              >
                <Crown className="w-3.5 h-3.5 text-[#E6C387]" />
                <span>{user?.role === "admin" ? "管理者モード" : "プレミアム"}</span>
              </Link>
            )}

            {/* 表示設定（文字サイズ・陰陽テーマ）集約ドロップダウン */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("settings")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "settings" ? null : "settings")}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  openDropdown === "settings"
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
                title="表示設定（文字サイズ・背景テーマ）"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>表示設定</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === "settings" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "settings" && (
                <div className="absolute top-full right-0 mt-1 w-64 p-3 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-3">
                  <div className="border-b border-[#E8E1D1] dark:border-[#263542] pb-2">
                    <span className="text-[10px] font-bold tracking-wider text-[#1E3D34] dark:text-[#83BEA8] uppercase">
                      文字サイズ・外観設定
                    </span>
                  </div>

                  {/* 文字サイズ設定 */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                      文字の大きさ
                    </span>
                    <FontSizeControl variant="segmented" />
                  </div>

                  {/* 陰陽テーマ切り替え */}
                  <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#263542] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                        陰陽テーマ
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                        白和紙（陽）/ 墨夜（陰）
                      </span>
                    </div>
                    <YinYangSwitch />
                  </div>
                </div>
              )}
            </div>

            {/* サイト理念 & お問い合わせ */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/about"
                className="px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] shadow-sm transition-all"
              >
                理念
              </Link>
              <Link
                href="/contact"
                className="px-2.5 py-1.5 rounded-full text-xs font-semibold border border-[#D8CFC0] dark:border-[#2D3E50] text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] transition-all"
              >
                お問い合わせ
              </Link>
            </div>
          </nav>

          {/* モバイルヘッダー右側（マイカルテ ＆ 文字サイズ & 陰陽スイッチ & メニューボタン） */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
            <button
              type="button"
              onClick={openDrawer}
              className="relative p-1.5 rounded-full border border-[#F3DEC5] dark:border-[#4D331F] bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0"
              title="マイカルテ"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              {clipCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold bg-[#B86924] text-white flex items-center justify-center">
                  {clipCount}
                </span>
              )}
            </button>
            <FontSizeControl variant="compact" />
            <YinYangSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-[#404743] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors shrink-0"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#131A21] px-4 pt-4 pb-7 space-y-5 shadow-lg max-h-[85vh] overflow-y-auto">
          {/* 文字サイズ変更 */}
          <FontSizeControl variant="drawer" />

          {/* 1. 学ぶセクション */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#83BEA8] px-3">
              学ぶ（体系カリキュラム）
            </span>
            <Link
              href="/curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>東洋医学8大体系</span>
            </Link>
          </div>

          {/* 2. 調べるセクション */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E] px-3">
              調べる（リファレンス）
            </span>
            <Link
              href="/tsubo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>十四経脈・経穴辞典（全361穴）</span>
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D] dark:text-[#6FA0D6]" />
              <span>臨床知見・学術論文抄読</span>
            </Link>
            <Link
              href="/kikei"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <div className="flex items-center gap-1.5">
                <span>奇経八脈（全8脈）・流注図</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">PREMIUM</span>
              </div>
            </Link>
            <Link
              href="/tsubo/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <div className="flex items-center gap-1.5">
                <span>経穴比較ツール（最大3穴）</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">PREMIUM</span>
              </div>
            </Link>
          </div>

          {/* 3. 考えるセクション */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387] px-3">
              考える（臨床推論演習）
            </span>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>臨床症例演習（全20症例）</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                3例無料
              </span>
            </Link>
            <Link
              href="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床弁証シミュレーター</span>
              </div>
            </Link>
            <Link
              href="/practice/haiketsu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>配穴練習機能</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                PREMIUM
              </span>
            </Link>
          </div>

          {/* 4. 入門・セルフケアセクション */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737C77] dark:text-[#8899A6] px-3">
              東洋医学を知る入口（入門・セルフケア）
            </span>
            <Link
              href="/diagnosis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Stethoscope className="w-4 h-4 text-[#A83629] dark:text-[#C47A72]" />
              <span>気血水 体質セルフ診断（約2分）</span>
            </Link>
            <Link
              href="/symptoms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>症状・お悩み別ガイド</span>
            </Link>
            <Link
              href="/diagnosis?tab=gorou"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>五労（職業病）チェッカー</span>
            </Link>
          </div>

          {/* プレミアム・マイカルテ ＆ 理念 */}
          <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            {isPremium && (
              <Link
                href="/account/subscription"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold shadow-xs bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#FAF8F5]" />
                  <span>{user?.role === "admin" ? "管理者マイページ" : "プレミアム会員 マイページ"}</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openDrawer();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2C1E14] border border-[#F3DEC5] dark:border-[#4D331F] hover:opacity-90 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 fill-current" />
                <span>マイカルテ</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B86924] text-white">
                {clipCount}件
              </span>
            </button>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]"
            >
              はり太郎の理念・サイトについて
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl text-xs font-semibold border border-[#D8CFC0] dark:border-[#2A3B4A] text-[#404743] dark:text-[#C5D2DB] hover:bg-[#FAF8F5] dark:hover:bg-[#121920]"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
