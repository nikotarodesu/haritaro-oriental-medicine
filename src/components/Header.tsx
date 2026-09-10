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
  ArrowRight,
  Layers,
  Scissors,
  Waves,
  Activity,
  Sprout,
  Sun,
  Wind,
  Snowflake,
  RotateCcw,
  Sparkles,
  Palette,
  Bookmark
} from "lucide-react";
import YinYangSwitch from "./YinYangSwitch";
import { useSeasonalTheme, SEASON_THEMES, SeasonKey } from "@/contexts/SeasonalThemeContext";
import GogyoColorPaletteGuide from "./GogyoColorPaletteGuide";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"general" | "expert" | null>(null);
  const [seasonPopoverOpen, setSeasonPopoverOpen] = useState(false);
  const [gogyoPaletteOpen, setGogyoPaletteOpen] = useState(false);

  const { clipCount, openDrawer } = useClinicalMemo();

  const { 
    currentSeason, 
    todayTerm, 
    isDoyoToday, 
    isLive, 
    setPreviewSeason, 
    resetToLiveToday 
  } = useSeasonalTheme();

  const seasonPopoverRef = useRef<HTMLDivElement | null>(null);

  // ポップオーバー外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (seasonPopoverRef.current && !seasonPopoverRef.current.contains(event.target as Node)) {
        setSeasonPopoverOpen(false);
      }
    }
    if (seasonPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [seasonPopoverOpen]);

  const renderSeasonIcon = (type: string, className = "w-3.5 h-3.5") => {
    switch (type) {
      case "sprout":
        return <Sprout className={className} />;
      case "sun":
        return <Sun className={className} />;
      case "compass":
        return <Compass className={className} />;
      case "wind":
        return <Wind className={className} />;
      case "snowflake":
        return <Snowflake className={className} />;
      default:
        return <Sprout className={className} />;
    }
  };

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
    <header 
      className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-all duration-500"
      style={{ borderTop: `2.5px solid ${currentSeason.accentHex}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴエリア ＆ 天人相応・動的季節バッジ */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <Link href="/" className="flex items-center group min-w-0">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors truncate">
                はり太郎の東洋医学
              </span>
            </Link>

            {/* 天人相応 季節動的バッジ（クリックで五季セレクターが開く） */}
            <div className="relative" ref={seasonPopoverRef}>
              <button
                type="button"
                onClick={() => setSeasonPopoverOpen(!seasonPopoverOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all border shadow-sm shrink-0"
                style={{
                  backgroundColor: currentSeason.lightBgHex,
                  color: currentSeason.primaryHex,
                  borderColor: currentSeason.borderHex
                }}
                title="天人相応：現在の五季と気の運行（クリックで五季を体験）"
              >
                {renderSeasonIcon(currentSeason.iconType, "w-3.5 h-3.5")}
                <span className="font-serif font-bold">{currentSeason.name}・{todayTerm.name}</span>
                <span className="text-[10px] opacity-75 hidden xl:inline">
                  （{currentSeason.qiMotion.split("（")[0]}）
                </span>
                {!isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C387] animate-pulse" />
                )}
              </button>

              {/* 季節セレクター ポップオーバー */}
              {seasonPopoverOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-3.5 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border-2 shadow-2xl z-50 animate-fadeIn space-y-2.5"
                  style={{ borderColor: currentSeason.accentHex }}
                >
                  <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-2">
                    <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                      <span>天人相応 五季切り替え</span>
                    </span>
                    {!isLive && (
                      <button
                        onClick={resetToLiveToday}
                        className="text-[10px] font-bold text-[#B86924] dark:text-[#E6C387] hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>本日（自動）に戻す</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] leading-snug">
                    季節をクリックすると、サイトのアクセントカラーと気の運行が連動して切り替わります。
                  </p>

                  <div className="grid grid-cols-1 gap-1.5">
                    {(["spring", "summer", "doyo", "autumn", "winter"] as SeasonKey[]).map((key) => {
                      const s = SEASON_THEMES[key];
                      const isSelected = currentSeason.key === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setPreviewSeason(key);
                            setSeasonPopoverOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                            isSelected
                              ? "bg-white dark:bg-[#1A2530] font-bold shadow-sm border"
                              : "hover:bg-white/80 dark:hover:bg-[#1A2530]"
                          }`}
                          style={{ borderColor: isSelected ? s.accentHex : "transparent" }}
                        >
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs"
                              style={{ backgroundColor: s.primaryHex }}
                            >
                              {renderSeasonIcon(s.iconType, "w-3 h-3")}
                            </span>
                            <div className="text-left">
                              <span className="font-serif font-bold text-[#232826] dark:text-[#FAF8F5] block">
                                {s.name}（{s.element}・{s.organ}）
                              </span>
                              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">
                                {s.qiMotion}
                              </span>
                            </div>
                          </div>
                          <span 
                            className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                            style={{ backgroundColor: s.lightBgHex, color: s.primaryHex }}
                          >
                            {s.colorName}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
                    <button
                      type="button"
                      onClick={() => {
                        setSeasonPopoverOpen(false);
                        setGogyoPaletteOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-[#1A2530] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] transition-colors shadow-2xs"
                    >
                      <Palette className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                      <span>五行カラー早見表（木火土金水）</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

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
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
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
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
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
                    <div className="w-8 h-8 rounded-lg bg-[#FDEDEC] dark:bg-[#231816] text-[#A83629] dark:text-[#C47A72] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        気血水 体質セルフ診断
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        12問でわかる心身のバランス
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/diagnosis?tab=gorou"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          五労（職業病）チェッカー
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          新設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        久視・久坐・久立の五臓疲弊＆中庸
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
                    ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                    : "text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#83BEA8]" />
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
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
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
                    href="/simulator"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          臨床弁証シミュレーター
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                          新設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        八綱➜気血水➜臓腑➜一文の証＆最小ツボ
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/simulator?tab=haiketsu"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FDEDEC] dark:bg-[#251514] text-[#A83629] dark:text-[#C47A72] flex items-center justify-center shrink-0 mt-0.5">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          配穴「最小構成」シミュレーター
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C47A72] text-white">
                          新設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        相殺効果防止・役割タグ・削ぎ落とし
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/simulator?tab=keiki"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5">
                      <Waves className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          経気深度シミュレーター
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#74BA9E] text-[#121920]">
                          新設
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        五輸穴の水流モデル＆病態深浅連動
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/simulator?tab=matrix"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#251A14] text-[#C45A4A] dark:text-[#F87171] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                          東西医学 相補マトリクス
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C45A4A] text-white">
                          新機能
                        </span>
                      </div>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        西洋（陽：除外診断）× 東洋（陰：気機昇降）
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/tsubo"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFFFFF] dark:hover:bg-[#121920] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2530] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8E1D1] dark:border-[#263542]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
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
                      <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                        臨床知見・学術論文抄読
                      </span>
                      <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                        配穴の極意と現代医科学
                      </span>
                    </div>
                  </Link>

                  {/* 五行カラー早見表 */}
                  <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        setGogyoPaletteOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                          <Palette className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] block">
                            五行カラー早見表
                          </span>
                          <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block leading-tight">
                            木:翠・火:朱・土:琥珀・金:白銀・水:藍
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                        CUD
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* マイカルテ・マイ要穴集 クリップボタン */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F] hover:bg-[#FBE8D6] dark:hover:bg-[#3B291B] transition-all text-xs font-bold shadow-2xs group"
              title="マイカルテ・マイ要穴集（保存したツボ・配穴・診断メモ）を開く"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>マイカルテ</span>
              {clipCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#B86924] text-white">
                  {clipCount}
                </span>
              )}
            </button>

            {/* 陰陽太極図 テーマ切り替えスイッチ */}
            <div className="ml-1 mr-1">
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

          {/* モバイルヘッダー右側（マイカルテ ＆ 季節アイコン ＆ 陰陽スイッチ & メニューボタン） */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={openDrawer}
              className="relative p-1.5 rounded-full border border-[#F3DEC5] dark:border-[#4D331F] bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center"
              title="マイカルテ・マイ要穴集"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              {clipCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold bg-[#B86924] text-white flex items-center justify-center">
                  {clipCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSeasonPopoverOpen(!seasonPopoverOpen)}
              className="p-1.5 rounded-full border shadow-sm flex items-center justify-center"
              style={{
                backgroundColor: currentSeason.lightBgHex,
                color: currentSeason.primaryHex,
                borderColor: currentSeason.borderHex
              }}
              title="天人相応：季節の気の運行"
            >
              {renderSeasonIcon(currentSeason.iconType, "w-4 h-4")}
            </button>
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
          {/* 天人相応 モバイル用季節ステータスカード */}
          <div 
            className="p-3.5 rounded-2xl border space-y-2"
            style={{ 
              backgroundColor: currentSeason.lightBgHex,
              borderColor: currentSeason.borderHex
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: currentSeason.primaryHex }}>
                {renderSeasonIcon(currentSeason.iconType, "w-4 h-4")}
                <span className="font-serif">天人相応：{currentSeason.fiveSeason}・{todayTerm.name}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/80 dark:bg-black/40 text-[#232826] dark:text-[#FAF8F5]">
                {currentSeason.qiMotion.split("（")[0]}
              </span>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-snug">
              {currentSeason.voiceAdvice}
            </p>
          </div>

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
              <Stethoscope className="w-4 h-4 text-[#A83629] dark:text-[#C47A72]" />
              <span>気血水 体質セルフ診断</span>
            </Link>
            <Link
              href="/diagnosis?tab=gorou"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>五労（職業病）チェッカー</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                新設
              </span>
            </Link>
          </div>

          {/* 専門家・学生向けセクション */}
          <div className="space-y-1 pt-2 border-t border-[#E8E1D1] dark:border-[#22303D]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3D34] dark:text-[#83BEA8] px-3">
              専門家・学生向け
            </span>
            <Link
              href="/curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>体系学習カリキュラム</span>
            </Link>
            <Link
              href="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:bg-[#FCF4EB] dark:hover:bg-[#2A2117]"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>臨床弁証シミュレーター</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                新設
              </span>
            </Link>
            <Link
              href="/simulator?tab=haiketsu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#A83629] dark:text-[#C47A72] hover:bg-[#FDEDEC] dark:hover:bg-[#251514]"
            >
              <div className="flex items-center gap-3">
                <Scissors className="w-4 h-4" />
                <span>配穴「最小構成」シミュレーター</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C47A72] text-white">
                新設
              </span>
            </Link>
            <Link
              href="/simulator?tab=keiki"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#EBF3EF] dark:hover:bg-[#182823]"
            >
              <div className="flex items-center gap-3">
                <Waves className="w-4 h-4" />
                <span>経気深度シミュレーター</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#74BA9E] text-[#121920]">
                新設
              </span>
            </Link>
            <Link
              href="/simulator?tab=matrix"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#C45A4A] dark:text-[#F87171] hover:bg-[#FCF4EB] dark:hover:bg-[#251A14]"
            >
              <div className="flex items-center gap-3">
                <Stethoscope className="w-4 h-4" />
                <span>東西医学 相補マトリクス</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C45A4A] text-white">
                新機能
              </span>
            </Link>
            <Link
              href="/tsubo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
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

            {/* モバイル用 マイカルテ・マイ要穴集ボタン */}
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
                <span>マイカルテ・マイ要穴集</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B86924] text-white">
                {clipCount}件
              </span>
            </button>

            {/* モバイル用 五行カラー早見表ボタン */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setGogyoPaletteOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] hover:opacity-90 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>五行カラー早見表（CUD）</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                木火土金水
              </span>
            </button>
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

      {/* 五行カラーユニバーサルデザイン早見表 モーダル */}
      {gogyoPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <GogyoColorPaletteGuide isModal onClose={() => setGogyoPaletteOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
