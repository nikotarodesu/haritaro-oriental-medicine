"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
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
  SlidersHorizontal, 
  Crown, 
  User as UserIcon, 
  Sparkles, 
  FileText, 
  Search, 
  Award, 
} from "lucide-react";
import dynamic from "next/dynamic";
import YinYangSwitch from "./YinYangSwitch";
import FontSizeControl from "./FontSizeControl";
const GlobalSearchModal = dynamic(() => import("./search/GlobalSearchModal"), {
  ssr: false,
});
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"clinical" | "learn" | "search" | "settings" | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { clipCount } = useClinicalMemo();
  const { currentSeason } = useSeasonalTheme();
  const { user, isPremium } = useAuth();

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Cmd+K / Ctrl+K でグローバル検索を開く
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 入力要素にフォーカスがある時はスキップ
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "/" && !isInput && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    const handleCustomOpenSearch = () => {
      setIsSearchOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("haritaro:open-search", handleCustomOpenSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("haritaro:open-search", handleCustomOpenSearch);
    };
  }, [isSearchOpen]);

  const handleMouseEnter = (type: "clinical" | "learn" | "search" | "settings") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(type);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // ESCキーでメニューを閉じるアクセシビリティ対応
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        if (openDropdown) {
          setOpenDropdown(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, openDropdown]);

  return (
    <header 
      className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-500 print:hidden"
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

          {/* デスクトップ ナビゲーション（基本分類：臨床で使う・学ぶ・辞典・料金・マイノート） */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* 1. 学ぶ・国試（ドロップダウン） */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("learn")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href="/curriculum"
                  className={`px-3 py-2 rounded-l-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                    openDropdown === "learn"
                      ? "bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]"
                      : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E2D3D] dark:hover:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
                  <span>学ぶ・国試</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "learn" ? null : "learn")}
                  aria-expanded={openDropdown === "learn"}
                  aria-label="学ぶ・国試メニューの切り替え"
                  className={`p-2 rounded-r-xl text-sm transition-all ${
                    openDropdown === "learn"
                      ? "bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]"
                      : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E2D3D] dark:hover:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "learn" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {openDropdown === "learn" && (
                <div className="absolute top-full left-0 mt-1 w-80 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542] flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-[#1E2D3D] dark:text-[#7BAAD8] uppercase">
                      学ぶ・国試対策
                    </span>
                    <Link
                      href="/learn"
                      onClick={() => setOpenDropdown(null)}
                      className="text-[11px] text-[#1E2D3D] dark:text-[#7BAAD8] hover:underline font-semibold"
                    >
                      学びの総合案内 ➜
                    </Link>
                  </div>

                  <Link
                    href="/learn"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-[#EAEFF5]/60 dark:bg-[#152331]/60 hover:bg-[#EAEFF5] dark:hover:bg-[#152331] transition-colors group border border-[#1E2D3D]/10 dark:border-[#7BAAD8]/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1E2D3D] text-[#FAF8F5] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] block">
                          学びの総合案内
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#1E2D3D] text-white">
                          案内
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        初学者・国試・経穴・復習の4大開始点と学び方
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/curriculum"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] block">
                        東洋医学カリキュラム（全81講義）
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        陰陽五行・気血水から臓腑経絡・病機まで体系網羅
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/kokushi"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                          国家試験対策特設ハブ
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#E6C387]/30 text-[#B86924] dark:text-[#E6C387]">
                          特設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        忘却曲線デイリー復習・本試験過去問実問・3大特訓
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/library"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        古典条文・医学論文ライブラリ
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        『素問』『霊枢』『難経』条文検索と最新医学論文
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/articles"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#59615D] dark:text-[#A0B0BC] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E1D1] dark:border-[#263542]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        学術コラム・文献解説
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        自律神経・微小循環の現代科学的考察
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. 臨床ツール（ドロップダウン） */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("clinical")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href="/clinical"
                  className={`px-3 py-2 rounded-l-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                    openDropdown === "clinical"
                      ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
                      : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>臨床ツール</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "clinical" ? null : "clinical")}
                  aria-expanded={openDropdown === "clinical"}
                  aria-label="臨床ツールメニューの切り替え"
                  className={`p-2 rounded-r-xl text-sm transition-all ${
                    openDropdown === "clinical"
                      ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]"
                      : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "clinical" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {openDropdown === "clinical" && (
                <div className="absolute top-full left-0 mt-1 w-84 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542] flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-[#1E3D34] dark:text-[#74BA9E] uppercase">
                      臨床実践ツール
                    </span>
                    <Link
                      href="/clinical"
                      onClick={() => setOpenDropdown(null)}
                      className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-semibold"
                    >
                      鍼灸師・臨床案内 ➜
                    </Link>
                  </div>

                  <Link
                    href="/clinical"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-[#EBF3EF]/60 dark:bg-[#182823]/60 hover:bg-[#EBF3EF] dark:hover:bg-[#182823] transition-colors group border border-[#1E3D34]/10 dark:border-[#74BA9E]/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1E3D34] text-[#FAF8F5] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                          鍼灸師向け・臨床実践案内
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#1E3D34] text-white">
                          案内
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        弁証・配穴・臨床ノートの活用法と機能詳細
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/tsubo"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        経穴辞典（全361穴）
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        骨度法・解剖取穴・刺鍼深度・安全禁忌ガイド
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/simulator"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        臨床弁証シミュレーター
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        八綱・気血水・臓腑の3段階連動で一文の証を推論
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/practice/haiketsu"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                        配穴設計
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        原絡・兪募・八脈交会穴の処方解析＆禁忌アラート
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/cases"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          臨床症例演習（全20症例）
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          全例連動
                        </span>
                      </div>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        四診所見からシミュレーターで配穴を直接検証
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/diagnosis"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                        四診・気血水体質診断
                      </span>
                      <span className="text-[11px] text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        12問体質チェック＆現代人の五労チェッカー
                      </span>
                    </div>
                  </Link>

                  <div className="pt-1 border-t border-[#E8E1D1] dark:border-[#263542] flex items-center justify-between px-2 text-[11px]">
                    <Link
                      href="/tsubo/compare"
                      onClick={() => setOpenDropdown(null)}
                      className="text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] font-medium"
                    >
                      経穴比較 ➜
                    </Link>
                    <Link
                      href="/kikei"
                      onClick={() => setOpenDropdown(null)}
                      className="text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34] font-medium"
                    >
                      奇経八脈 ➜
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. マイカルテ・ノート（直接入口） */}
            <Link
              href="/notes"
              className="px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 text-[#285A52] dark:text-[#6EC5B8] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <FileText className="w-4 h-4" />
              <span>マイノート</span>
              {clipCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#B86924] text-white">
                  {clipCount}
                </span>
              )}
            </Link>

            {/* 4. 料金（直接料金ページへ） */}
            <Link
              href="/pricing"
              className="px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 text-[#404743] dark:text-[#C5D2DB] hover:text-[#B86924] dark:hover:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <Crown className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>料金</span>
            </Link>
          </nav>

          {/* デスクトップ右側：検索ボタン ＆ 会員マイページ ＆ 表示設定 */}
          <div className="hidden lg:flex items-center gap-2">
            {/* サイト全体横断検索（Cmd+K） */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFE9DD]/70 dark:bg-[#1A2530] hover:bg-[#E5DEC9] dark:hover:bg-[#202E3C] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] text-xs font-semibold transition-all shadow-2xs cursor-pointer select-none"
              title="全体横断検索（Ctrl+K / ⌘K）"
            >
              <Search className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span className="hidden xl:inline">検索...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono font-bold bg-white dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] rounded text-[#737C77] dark:text-[#8899A6]">
                ⌘K
              </kbd>
            </button>

            {/* 会員マイページ / ログインボタン */}
            {isPremium ? (
              <Link
                href="/account/subscription"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1E3D34] to-[#2B6958] text-white hover:opacity-90 transition-all text-xs font-bold shadow-xs"
                title={user?.role === "admin" ? "管理者マイページ" : "プレミアム会員マイページ"}
              >
                <Crown className="w-3.5 h-3.5 text-[#E6C387]" />
                <span>{user?.role === "admin" ? "管理者" : "マイページ"}</span>
              </Link>
            ) : user ? (
              <Link
                href="/account/subscription"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1A2530] border border-[#D8CFC0] dark:border-[#384C5E] text-[#232826] dark:text-[#FAF8F5] hover:border-[#1E3D34] transition-all text-xs font-bold shadow-2xs"
                title="マイページ・プラン管理"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                )}
                <span className="max-w-[80px] truncate">{user.name || "マイページ"}</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#D8CFC0] dark:border-[#384C5E] text-[#404743] dark:text-[#C5D2DB] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] hover:border-[#1E3D34] transition-all text-xs font-bold"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#737C77] dark:text-[#8899A6]" />
                <span>ログイン</span>
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
                aria-expanded={openDropdown === "settings"}
                aria-label="文字サイズと外観設定の切り替え"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
          </div>

          {/* モバイルヘッダー右側（検索、マイノートへの短い入口、メニューボタン） */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            {/* モバイル検索ボタン */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl text-[#404743] dark:text-[#C5D2DB] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors cursor-pointer shrink-0"
              aria-label="サイト内検索を開く"
              title="サイト内検索"
            >
              <Search className="w-5 h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
            </button>

            <Link
              href="/notes"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold shrink-0"
              title="マイノートを開く"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ノート</span>
              {clipCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#B86924] text-white">
                  {clipCount}
                </span>
              )}
            </Link>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-[#404743] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー（3大分類：臨床で使う・学ぶ/調べる・利用案内） */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#131A21] px-4 pt-4 pb-7 space-y-4 shadow-lg max-h-[85vh] overflow-y-auto">
          {/* 表示設定（文字サイズ・陰陽テーマ） */}
          <div className="p-3 bg-white dark:bg-[#1A2530] rounded-xl border border-[#EDE7D8] dark:border-[#22303D] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">表示設定</span>
              <YinYangSwitch />
            </div>
            <FontSizeControl variant="drawer" />
          </div>

          {/* 1. 臨床で使う */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E]">
                臨床で使う
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="/clinical"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-semibold"
                >
                  臨床案内 ➜
                </Link>
                <span className="text-[#C8C2B3] dark:text-[#384C5E]">|</span>
                <Link
                  href="/clinical"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] hover:underline"
                >
                  ツール一覧
                </Link>
              </div>
            </div>
            <Link
              href="/diagnosis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>気血水体質チェック</span>
            </Link>
            <Link
              href="/diagnosis?tab=gorou"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>五労チェッカー</span>
            </Link>
            <Link
              href="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>臨床弁証シミュレーター</span>
            </Link>
            <Link
              href="/practice/haiketsu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>配穴設計</span>
            </Link>
            <Link
              href="/notes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF]/60 dark:bg-[#182823]/60"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>マイノート（臨床ノート）</span>
              </div>
              {clipCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B86924] text-white">
                  {clipCount}件
                </span>
              )}
            </Link>
          </div>

          {/* 2. 学ぶ・調べる */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E2D3D] dark:text-[#7BAAD8]">
                学ぶ・調べる
              </span>
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] text-[#1E2D3D] dark:text-[#7BAAD8] hover:underline font-semibold"
              >
                学び総合案内 ➜
              </Link>
            </div>
            <Link
              href="/curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-[#1E2D3D] dark:text-[#7BAAD8] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>東洋医学カリキュラム</span>
            </Link>
            <Link
              href="/kokushi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2016]"
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>国家試験対策特設ハブ</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#E6C387]/30 text-[#B86924] dark:text-[#E6C387]">
                特設
              </span>
            </Link>
            <Link
              href="/tsubo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <Compass className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
              <span>経穴辞典（全361穴）</span>
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
                <span>症例演習</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                3例無料
              </span>
            </Link>
            <Link
              href="/kikei"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <Compass className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
              <span>奇経八脈</span>
            </Link>
            <Link
              href="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
              <span>古典・論文ライブラリ</span>
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EAEFF5] dark:hover:bg-[#152331]"
            >
              <FileText className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8]" />
              <span>コラム・文献解説</span>
            </Link>
          </div>

          {/* 3. 利用案内・料金 */}
          <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387]"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span>料金プラン（プレミアム）</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {isPremium ? (
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
            ) : user ? (
              <Link
                href="/account/subscription"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#1A2530] text-[#232826] dark:text-[#FAF8F5]"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>マイページ・プラン管理</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#737C77]" />
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold border border-[#D8CFC0] dark:border-[#384C5E] bg-white dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E]"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>会員ログイン / Google連携</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 rounded-xl text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]"
              >
                運営者情報
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 rounded-xl text-xs font-semibold border border-[#D8CFC0] dark:border-[#2A3B4A] text-[#404743] dark:text-[#C5D2DB]"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* サイト全体横断検索モーダル（Cmd+K / Ctrl+K - 検索起動時のみ動的ロード） */}
      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
}
