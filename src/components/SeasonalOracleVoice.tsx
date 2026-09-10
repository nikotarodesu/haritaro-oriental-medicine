"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sprout, 
  Sun, 
  Compass, 
  Wind, 
  Snowflake, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  SlidersHorizontal,
  X,
  Volume2
} from "lucide-react";
import { useSeasonalTheme, SeasonKey, SEASON_THEMES } from "@/contexts/SeasonalThemeContext";

export default function SeasonalOracleVoice() {
  const { 
    currentSeason, 
    todayTerm, 
    isDoyoToday, 
    todayDoyoInfo, 
    currentDateFormatted, 
    isLive, 
    setPreviewSeason, 
    resetToLiveToday 
  } = useSeasonalTheme();

  const [selectorOpen, setSelectorOpen] = useState(false);

  // 季節アイコン選択関数
  const renderSeasonIcon = (type: string, className = "w-4 h-4") => {
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

  const seasonKeys: SeasonKey[] = ["spring", "summer", "doyo", "autumn", "winter"];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-white/90 dark:bg-[#152028]/90 backdrop-blur-md shadow-sm transition-all duration-500">
      {/* 季節ごとの上部アクセントカラーバー */}
      <div 
        className="h-1.5 w-full transition-colors duration-500"
        style={{ backgroundColor: currentSeason.accentHex }}
      />

      <div className="p-5 sm:p-7 space-y-4">
        {/* ヘッダー帯 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm transition-colors duration-500"
              style={{ backgroundColor: currentSeason.primaryHex }}
            >
              {renderSeasonIcon(currentSeason.iconType, "w-3.5 h-3.5")}
              <span>天人相応：{currentSeason.fiveSeason}</span>
            </span>

            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] text-[#59615D] dark:text-[#96A6B2]">
              {isLive ? (
                <>本日：{todayTerm.name}{isDoyoToday ? "（土用期間）" : ""}</>
              ) : (
                <span className="text-[#B86924] dark:text-[#E6C387] font-bold">
                  プレビュー体験中
                </span>
              )}
            </span>

            <span className="text-xs text-[#737C77] dark:text-[#8899A6] hidden md:inline">
              気の運行：<strong className="text-[#232826] dark:text-[#FAF8F5] font-semibold">{currentSeason.qiMotion}</strong>
            </span>
          </div>

          {/* プレビュー切替操作ボタン */}
          <div className="flex items-center gap-2">
            {!isLive && (
              <button
                onClick={resetToLiveToday}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FCF4EB] dark:bg-[#251A14] text-[#B86924] dark:text-[#E6C387] hover:opacity-80 transition-opacity"
              >
                <RotateCcw className="w-3 h-3" />
                <span>本日（自動）に戻す</span>
              </button>
            )}

            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-[#59615D] dark:text-[#96A6B2] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>五季を切り替えて体感</span>
            </button>
          </div>
        </div>

        {/* 五季プレビュー切り替えセレクター（開閉式） */}
        {selectorOpen && (
          <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] animate-fadeIn space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#59615D] dark:text-[#96A6B2]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>五季（木・火・土・金・水）の気の巡りを手動で切り替える：</span>
              </span>
              <button onClick={() => setSelectorOpen(false)} className="hover:opacity-70">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {seasonKeys.map((key) => {
                const s = SEASON_THEMES[key];
                const isSelected = currentSeason.key === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setPreviewSeason(key);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? "bg-white dark:bg-[#1A2530] border-2 shadow-sm font-bold"
                        : "bg-white/60 dark:bg-[#1A2530]/60 border-[#E8E1D1] dark:border-[#22303D] hover:bg-white dark:hover:bg-[#1A2530]"
                    }`}
                    style={{ borderColor: isSelected ? s.accentHex : undefined }}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      {renderSeasonIcon(s.iconType, "w-3.5 h-3.5")}
                      <span className="font-serif">{s.name}（{s.element}）</span>
                    </div>
                    <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5 truncate">
                      {s.organ}
                    </div>
                    <div className="text-[9px] font-mono mt-1 px-1.5 py-0.2 rounded w-fit" style={{ backgroundColor: `${s.lightBgHex}` }}>
                      {s.colorName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 季節の語りかけメッセージ（メイン） */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Volume2 className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span className="tracking-wide">今、自然界と身体が呼応する気の運行：</span>
            </div>
            <p className="font-serif text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              「{currentSeason.voiceAdvice}」
            </p>
            <p className="text-xs italic text-[#59615D] dark:text-[#96A6B2] pt-1">
              {currentSeason.quote}
            </p>
          </div>

          {/* 右側：関連臓腑と特効ツボ */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#59615D] dark:text-[#96A6B2]">今季の主役臓腑</span>
              <strong className="font-serif text-[#232826] dark:text-[#FAF8F5]">{currentSeason.organ}</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#59615D] dark:text-[#96A6B2]">季節の養生ツボ</span>
              <strong className="font-serif text-[#1E3D34] dark:text-[#74BA9E]">{todayTerm.tsuboName}</strong>
            </div>
            <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] leading-snug pt-1 border-t border-[#E8E1D1] dark:border-[#22303D]">
              {todayTerm.tsuboTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
