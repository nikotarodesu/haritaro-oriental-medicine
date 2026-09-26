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
  SlidersHorizontal,
  Crown,
  User as UserIcon,
  Sparkles,
  FileText,
  RotateCcw
} from "lucide-react";
import YinYangSwitch from "./YinYangSwitch";
import FontSizeControl from "./FontSizeControl";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"learn" | "search" | "think" | "intro" | "settings" | null>(null);

  const { clipCount } = useClinicalMemo();
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

          {/* デスクトップ ナビゲーション（4.1項：学ぶ・調べる・演習する・マイノート・セルフケア） */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* 1. 学ぶ（直接カリキュラムへ） */}
            <Link
              href="/curriculum"
              className="px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#83BEA8]" />
              <span>学ぶ</span>
            </Link>

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
                    <span className="text-xs font-bold tracking-wider text-[#1E3D34] dark:text-[#74BA9E] uppercase">
                      調べる
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
                        経穴辞典
                      </span>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        十四経脈・骨度法・解剖取穴・主治
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
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        経穴比較
                      </span>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        2〜3穴の解剖・要穴・主治を横並び比較
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
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        奇経八脈
                      </span>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        任脈・督脈と八脈交会穴理論
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
                        コラム・文献
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        神経生理学・配穴機序・古典解説
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. 演習する ドロップダウン */}
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
                <span>演習する</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "think" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "think" && (
                <div className="absolute top-full left-0 mt-1 w-84 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 border-[#B86924]/30 dark:border-[#4D331F] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-xs font-bold tracking-wider text-[#B86924] dark:text-[#E6C387] uppercase">
                      演習する
                    </span>
                  </div>

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
                          症例演習
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          3例無料
                        </span>
                      </div>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        四診所見から八綱・弁証・配穴を考える練習
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/simulator"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                        弁証シミュレーター
                      </span>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        条件を選び、弁証と配穴の考え方を確認
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
                          配穴練習
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#1E3D34] text-white">
                          見本あり
                        </span>
                      </div>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        経穴を組み合わせ、選んだ理由を整理
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/tsubo/practice"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] block">
                        経穴の復習
                      </span>
                      <span className="text-xs text-[#59615D] dark:text-[#8899A6] block leading-tight mt-0.5">
                        小テストと間隔反復で取穴と効能を定着
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. マイノート（直接移動・通常リンク） */}
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

            {/* 5. セルフケア ドロップダウン（補助項目） */}
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
                <span>セルフケア</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === "intro" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "intro" && (
                <div className="absolute top-full right-0 mt-1 w-72 p-2 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xl z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 border-b border-[#E8E1D1] dark:border-[#263542]">
                    <span className="text-[10px] font-bold tracking-wider text-[#737C77] dark:text-[#8899A6] uppercase">
                      日常のセルフケア
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
                        気血水 体質チェック
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        体質傾向と養生のヒント（約2分）
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
                        症状別セルフケア
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        頭痛・肩こり・不眠のツボ押しガイド
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
                        五労チェッカー
                      </span>
                      <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                        日常生活の使いすぎによる疲労点検
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* デスクトップ右側：プレミアム料金 ＆ ログイン ＆ 表示設定 */}
          <div className="hidden lg:flex items-center gap-2">
            {/* プレミアム・料金への明確な入口 */}
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FCF4EB] dark:bg-[#251A10] border border-[#F3DEC5] dark:border-[#4A321E] text-[#B86924] dark:text-[#E6C387] hover:bg-[#FBEAD7] transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>プレミアム・料金</span>
            </Link>

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

          {/* モバイルヘッダー右側（4.2項：サイト名、マイノートへの短い入口、メニューボタン） */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <Link
              href="/notes"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#F3DEC5] dark:border-[#4D331F] bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] text-xs font-bold shrink-0"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-[#404743] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors shrink-0"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー（4.2項：最上部に4つの主目的、表示設定） */}
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

          {/* 1. 学ぶ */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#83BEA8] px-2">
              学ぶ
            </span>
            <Link
              href="/curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>東洋医学を学ぶ（全81レッスン）</span>
            </Link>
          </div>

          {/* 2. 調べる */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#74BA9E] px-2">
              調べる
            </span>
            <Link
              href="/tsubo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>経穴辞典（全361穴）</span>
            </Link>
            <Link
              href="/tsubo/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>経穴比較</span>
            </Link>
            <Link
              href="/kikei"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>奇経八脈</span>
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D] dark:text-[#6FA0D6]" />
              <span>コラム・文献</span>
            </Link>
          </div>

          {/* 3. 演習する */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387] px-2">
              演習する
            </span>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>症例演習</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
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
                <span>弁証シミュレーター</span>
              </div>
            </Link>
            <Link
              href="/practice/haiketsu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>配穴練習</span>
              </div>
            </Link>
            <Link
              href="/tsubo/practice"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>経穴の復習</span>
              </div>
            </Link>
          </div>

          {/* 4. 記録する（マイノート） */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#285A52] dark:text-[#6EC5B8] px-2">
              記録する
            </span>
            <Link
              href="/notes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#285A52] dark:text-[#6EC5B8] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>マイノート（臨床録・配穴集）</span>
              </div>
              {clipCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B86924] text-white">
                  {clipCount}件
                </span>
              )}
            </Link>
          </div>

          {/* 5. セルフケア */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737C77] dark:text-[#8899A6] px-2">
              セルフケア
            </span>
            <Link
              href="/diagnosis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Stethoscope className="w-4 h-4 text-[#A83629] dark:text-[#C47A72]" />
              <span>気血水 体質チェック（約2分）</span>
            </Link>
            <Link
              href="/symptoms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>症状別セルフケア</span>
            </Link>
            <Link
              href="/diagnosis?tab=gorou"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>五労チェッカー</span>
            </Link>
          </div>

          {/* アカウント ＆ 料金・案内 */}
          <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold bg-[#FCF4EB] dark:bg-[#2A2016] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387]"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span>プレミアム・料金プラン</span>
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
                サイト理念
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
    </header>
  );
}
