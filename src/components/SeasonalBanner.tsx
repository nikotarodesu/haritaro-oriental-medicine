"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Utensils, 
  HeartPulse, 
  Sparkles,
  ArrowRight, 
  Sprout, 
  Sun, 
  Compass, 
  Wind, 
  Snowflake 
} from "lucide-react";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import ClipButton from "@/components/ClipButton";
import GogyoBadge from "@/components/GogyoBadge";

export default function SeasonalBanner() {
  const { 
    currentSeason, 
    todayTerm, 
    currentDateFormatted 
  } = useSeasonalTheme();

  // 季節アイコン選択
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
        return <Wind className={className} />;
    }
  };

  // キャッチコピーの分解（見出しと補足文）
  const { leadPhrase, bodyPhrase } = useMemo(() => {
    const phrase = todayTerm.catchphrase;
    const match = phrase.match(/^(今の季節は【.*?】です。)(.*)$/);
    if (match) {
      return { leadPhrase: match[1], bodyPhrase: match[2].trim() };
    }
    return { leadPhrase: phrase, bodyPhrase: "" };
  }, [todayTerm.catchphrase]);

  return (
    <div 
      className="relative overflow-hidden rounded-3xl border bg-white/95 dark:bg-[#152028]/95 backdrop-blur-md shadow-sm transition-all duration-500 max-w-5xl mx-auto text-left"
      style={{ borderColor: currentSeason.borderHex }}
    >
      {/* 季節アクセントライン（上部カラーバー） */}
      <div 
        className="h-1.5 w-full transition-colors duration-500"
        style={{ backgroundColor: currentSeason.accentHex }}
      />

      <div className="p-5 sm:p-7 lg:p-8 space-y-6">
        
        {/* 1. 最上部ヘッダー帯：天人相応・日付・二十四節気・五季・アクション */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F0EAE1] dark:border-[#22303D] pb-4">
          
          {/* 左側：メタデータバッジ群 */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 天人相応バッジ */}
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs transition-colors duration-500"
              style={{ backgroundColor: currentSeason.primaryHex }}
            >
              {renderSeasonIcon(currentSeason.iconType, "w-3.5 h-3.5")}
              <span>天人相応</span>
            </span>

            {/* 日付バッジ */}
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4D331F]">
              <Calendar className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />
              <span>本日：{currentDateFormatted || "2026年9月10日"}</span>
            </span>

            {/* 二十四節気バッジ */}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]">
              二十四節気：<strong>{todayTerm.name}</strong>
              <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] ml-1">
                ({todayTerm.kana})
              </span>
            </span>

            {/* 五季バッジ（五行CUDカラー連動） */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5]">
                五季：{currentSeason.fiveSeason}（{currentSeason.organ}系）
              </span>
              <GogyoBadge target={currentSeason.element} size="sm" showColorName />
            </div>

            {/* 気の運行 */}
            <span className="text-xs text-[#59615D] dark:text-[#96A6B2] hidden sm:inline ml-1">
              気の運行：<strong className="text-[#232826] dark:text-[#FAF8F5] font-semibold">{currentSeason.qiMotion}</strong>
            </span>
          </div>

          {/* 右側：養生論リンク */}
          <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A]"
            >
              <span>季節の養生論</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. メインメッセージ（季節の宣言 ＆ 気の運行） */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
            <span className="text-[#1E3D34] dark:text-[#74BA9E] mr-1">
              {leadPhrase}
            </span>
            {bodyPhrase && (
              <span className="block sm:inline font-normal text-[#404743] dark:text-[#C5D2DB] text-base sm:text-lg">
                {bodyPhrase}
              </span>
            )}
          </h3>

          <p className="font-serif text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed italic bg-[#FAF8F5]/80 dark:bg-[#121920]/80 p-3 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
            <span className="not-italic font-bold text-[10px] px-1.5 py-0.5 rounded bg-[#E6C387] text-[#1E3D34] mr-2">
              古典の教え
            </span>
            {todayTerm.classicQuote}
          </p>
        </div>

        {/* 3. 三大養生処方箋（旬の食養生・生活習慣・おすすめツボ） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          
          {/* ① 旬の食養生 */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                <div className="w-6 h-6 rounded-lg bg-[#FCF4EB] dark:bg-[#2C1E14] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <span>旬の食養生</span>
              </div>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {todayTerm.dietAdvice}
              </p>
            </div>
            <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1">
              胃腸と内臓を養う旬の食材
            </span>
          </div>

          {/* ② 生活習慣・心の養生 */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                <div className="w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <span>生活習慣・心の養生</span>
              </div>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {todayTerm.lifestyleAdvice}
              </p>
            </div>
            <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1">
              自然のリズムに合わせた行動
            </span>
          </div>

          {/* ③ 季節の特効ツボ（マイカルテ保存ボタン付き） */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-4 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <div className="w-6 h-6 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                  </div>
                  <span>季節の養生ツボ：<strong>{todayTerm.tsuboName}</strong></span>
                </div>

                <ClipButton
                  item={{
                    id: `seasonal-tsubo-${todayTerm.tsuboId || todayTerm.tsuboName}`,
                    type: "tsubo",
                    title: `【${currentSeason.name}の養生ツボ】${todayTerm.tsuboName}`,
                    subTitle: `二十四節気「${todayTerm.name}」| ${currentSeason.fiveSeason}`,
                    points: [todayTerm.tsuboName],
                    elements: [currentSeason.element as any],
                    indications: ["季節の養生", "自律神経調整", "免疫維持"],
                    summary: todayTerm.tsuboTip,
                  }}
                  variant="badge"
                  size="sm"
                />
              </div>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {todayTerm.tsuboTip}
              </p>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-[#737C77] dark:text-[#8899A6]">
              <span>ワンクリックでマイカルテに保存</span>
              <Link 
                href="/tsubo" 
                className="text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline flex items-center gap-0.5"
              >
                <span>ツボ辞典を見る</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
