"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sun, 
  Calendar, 
  Utensils, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  RotateCcw,
  BookOpen,
  Compass
} from "lucide-react";
import { 
  getSeasonalAdvice, 
  SOLAR_TERMS, 
  DOYO_PERIODS, 
  SolarTermInfo, 
  DoyoPeriodInfo 
} from "@/data/solarTermsData";

export default function SeasonalBanner() {
  const [mounted, setMounted] = useState(false);
  const [previewTermId, setPreviewTermId] = useState<string | null>(null);
  const [previewDoyoKey, setPreviewDoyoKey] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 現在日付の養生データ
  const todayAdvice = useMemo(() => {
    return getSeasonalAdvice();
  }, []);

  // プレビュー中のデータ（選択されている場合はプレビューを優先表示）
  const currentDisplay = useMemo(() => {
    if (previewDoyoKey && DOYO_PERIODS[previewDoyoKey]) {
      const doyo = DOYO_PERIODS[previewDoyoKey];
      return {
        isCustomPreview: true,
        titleBadge: `プレビュー：${doyo.seasonName}`,
        termName: doyo.seasonName,
        kana: "土用（季節の変わり目）",
        periodStr: doyo.monthRange,
        fiveSeason: doyo.fiveSeason,
        organ: doyo.organ,
        catchphrase: doyo.catchphrase,
        classicQuote: doyo.classicQuote,
        dietAdvice: doyo.dietAdvice,
        lifestyleAdvice: doyo.lifestyleAdvice,
        tsuboName: doyo.tsuboName,
        tsuboId: doyo.tsuboId,
        tsuboTip: doyo.tsuboTip,
        isDoyo: true
      };
    }

    if (previewTermId) {
      const term = SOLAR_TERMS.find(t => t.id === previewTermId) || todayAdvice.term;
      return {
        isCustomPreview: true,
        titleBadge: `プレビュー：二十四節気「${term.name}」`,
        termName: term.name,
        kana: term.kana,
        periodStr: term.periodStr,
        fiveSeason: term.fiveSeason,
        organ: term.organ,
        catchphrase: term.catchphrase,
        classicQuote: term.classicQuote,
        dietAdvice: term.dietAdvice,
        lifestyleAdvice: term.lifestyleAdvice,
        tsuboName: term.tsuboName,
        tsuboId: term.tsuboId,
        tsuboTip: term.tsuboTip,
        isDoyo: false
      };
    }

    // 本日の自動判定データ
    if (todayAdvice.isDoyo && todayAdvice.doyoInfo) {
      const doyo = todayAdvice.doyoInfo;
      return {
        isCustomPreview: false,
        titleBadge: `本日：${todayAdvice.currentDateFormatted}`,
        termName: `${todayAdvice.term.name}（${doyo.seasonName}期間中）`,
        kana: todayAdvice.term.kana,
        periodStr: doyo.monthRange,
        fiveSeason: doyo.fiveSeason,
        organ: doyo.organ,
        catchphrase: doyo.catchphrase,
        classicQuote: doyo.classicQuote,
        dietAdvice: doyo.dietAdvice,
        lifestyleAdvice: doyo.lifestyleAdvice,
        tsuboName: doyo.tsuboName,
        tsuboId: doyo.tsuboId,
        tsuboTip: doyo.tsuboTip,
        isDoyo: true
      };
    }

    const term = todayAdvice.term;
    return {
      isCustomPreview: false,
      titleBadge: `本日：${todayAdvice.currentDateFormatted}`,
      termName: term.name,
      kana: term.kana,
      periodStr: term.periodStr,
      fiveSeason: term.fiveSeason,
      organ: term.organ,
      catchphrase: term.catchphrase,
      classicQuote: term.classicQuote,
      dietAdvice: term.dietAdvice,
      lifestyleAdvice: term.lifestyleAdvice,
      tsuboName: term.tsuboName,
      tsuboId: term.tsuboId,
      tsuboTip: term.tsuboTip,
      isDoyo: false
    };
  }, [previewTermId, previewDoyoKey, todayAdvice]);

  const handleResetToToday = () => {
    setPreviewTermId(null);
    setPreviewDoyoKey(null);
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-5 sm:p-7 shadow-sm transition-colors relative overflow-hidden">
      {/* 和紙風テクスチャと装飾アクセント */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#FCF4EB]/50 dark:bg-[#E6C387]/5 blur-2xl pointer-events-none" />

      {/* ヘッダーエリア：日付 ＆ 節気・五季バッジ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EFE9DD] dark:border-[#22303D] pb-4 mb-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-xs">
            <Sun className="w-5 h-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              {/* 日付またはプレビュー表示 */}
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{mounted ? currentDisplay.titleBadge : "日付を判定中..."}</span>
              </span>

              {/* 二十四節気バッジ */}
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#263542] text-[#1E3D34] dark:text-[#74BA9E]">
                二十四節気：{currentDisplay.termName}
                <span className="text-[9px] text-[#737C77] dark:text-[#8899A6] ml-1">
                  ({currentDisplay.kana})
                </span>
              </span>

              {/* 五季・臓腑バッジ */}
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                currentDisplay.isDoyo
                  ? "bg-[#FCF4EB] dark:bg-[#2F2417] text-[#B86924] dark:text-[#E6C387] border border-[#F3E1CB] dark:border-[#4D3A25]"
                  : "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]"
              }`}>
                五季：{currentDisplay.fiveSeason}（{currentDisplay.organ}系）
              </span>
            </div>

            <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] leading-snug">
              {currentDisplay.catchphrase}
            </h3>
          </div>
        </div>

        {/* コラムへのリンク */}
        <Link 
          href="/articles" 
          className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0 self-end sm:self-center"
        >
          <span>季節の養生論</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 古典引用バナー */}
      <div className="mb-4 px-3.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[11px] text-[#59615D] dark:text-[#A0B0BC] italic flex items-center gap-2">
        <span className="text-[10px] font-bold not-italic px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34] shrink-0">
          古典の教え
        </span>
        <span className="line-clamp-1">{currentDisplay.classicQuote}</span>
      </div>

      {/* 3大養生処方箋カード（食養生・生活習慣・おすすめツボ） */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* 1. 食養生 */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#E6EFEA]">
            <Utensils className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>🌿 旬の食養生</span>
          </div>
          <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {currentDisplay.dietAdvice}
          </p>
        </div>

        {/* 2. 生活習慣・心の養生 */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#E6EFEA]">
            <HeartPulse className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>🚶 生活・心の養生</span>
          </div>
          <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {currentDisplay.lifestyleAdvice}
          </p>
        </div>

        {/* 3. おすすめツボ */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D] space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#E6EFEA]">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>🎯 本日の養生ツボ</span>
            </div>
            <Link
              href="/tsubo"
              className="text-[10px] text-[#1E3D34] dark:text-[#74BA9E] hover:underline font-bold"
            >
              「{currentDisplay.tsuboName}」
            </Link>
          </div>
          <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            {currentDisplay.tsuboTip}
          </p>
        </div>
      </div>

      {/* フッター：二十四節気・土用セレクター（通年プレビュー切替） */}
      <div className="mt-4 pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[#737C77] dark:text-[#8899A6] shrink-0 font-medium">
            季節の養生を調べる：
          </span>
          <select
            value={previewDoyoKey ? `doyo_${previewDoyoKey}` : previewTermId || todayAdvice.term.id}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith("doyo_")) {
                setPreviewDoyoKey(val.replace("doyo_", ""));
                setPreviewTermId(null);
              } else {
                setPreviewTermId(val);
                setPreviewDoyoKey(null);
              }
            }}
            className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] w-full sm:w-auto"
          >
            <optgroup label="春夏秋冬の二十四節気">
              {SOLAR_TERMS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}（{t.periodStr}） - {t.fiveSeason}
                </option>
              ))}
            </optgroup>
            <optgroup label="土用（季節の変わり目・脾胃ケア）">
              <option value="doyo_spring">春土用（4月17日〜5月4日頃）</option>
              <option value="doyo_summer">夏土用（7月19日〜8月6日頃）</option>
              <option value="doyo_autumn">秋土用（10月20日〜11月6日頃）</option>
              <option value="doyo_winter">冬土用（1月17日〜2月3日頃）</option>
            </optgroup>
          </select>
        </div>

        {/* 本日に戻すボタン */}
        {currentDisplay.isCustomPreview && (
          <button
            onClick={handleResetToToday}
            className="px-2.5 py-1 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold text-[10px] hover:bg-[#D5E6DE] transition-colors flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>本日の養生に戻す</span>
          </button>
        )}
      </div>
    </div>
  );
}
