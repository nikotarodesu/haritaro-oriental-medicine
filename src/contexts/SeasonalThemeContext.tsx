"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getSeasonalAdvice, SolarTermInfo, DoyoPeriodInfo } from "@/data/solarTermsData";

export type SeasonKey = "spring" | "summer" | "doyo" | "autumn" | "winter";

export interface SeasonThemeMeta {
  key: SeasonKey;
  name: string;
  fiveSeason: string;
  element: string;
  organ: string;
  qiMotion: string;
  colorName: string;
  primaryHex: string;
  accentHex: string;
  borderHex: string;
  lightBgHex: string;
  darkBgHex: string;
  quote: string;
  voiceAdvice: string;
  iconType: "sprout" | "sun" | "compass" | "wind" | "snowflake";
}

export const SEASON_THEMES: Record<SeasonKey, SeasonThemeMeta> = {
  spring: {
    key: "spring",
    name: "春",
    fiveSeason: "春（木）",
    element: "木",
    organ: "肝・胆",
    qiMotion: "昇発（上・外へ芽吹く）",
    colorName: "新緑・萌黄",
    primaryHex: "#1E3D34",
    accentHex: "#10B981",
    borderHex: "#C5DED4",
    lightBgHex: "#EBF3EF",
    darkBgHex: "#14231E",
    quote: "『素問・四気調神大論』「春三月、此謂発陳。天地倶生、万物以栄。」",
    voiceAdvice: "冬の縮こまりを解き放ち、草木が芽吹くように気をのびやかに巡らせる季節。怒りを鎮め、朝の散歩で肝の気の巡りを助けましょう。",
    iconType: "sprout"
  },
  summer: {
    key: "summer",
    name: "夏",
    fiveSeason: "夏（火）",
    element: "火",
    organ: "心・小腸",
    qiMotion: "長養（外へ咲き誇り発散する）",
    colorName: "茜・真紅・太陽熱",
    primaryHex: "#A83629",
    accentHex: "#F97316",
    borderHex: "#F3C1BB",
    lightBgHex: "#FEF2F2",
    darkBgHex: "#251514",
    quote: "『素問・四気調神大論』「夏三月、此謂蕃秀。天地気交、万物華実。」",
    voiceAdvice: "万物が咲き誇り陽気が満ちる季節。心に鬱屈を残さず、心地よく汗を発散させて心火を清め、夏バテと動悸を防ぎましょう。",
    iconType: "sun"
  },
  doyo: {
    key: "doyo",
    name: "土用",
    fiveSeason: "土用（土）",
    element: "土",
    organ: "脾・胃",
    qiMotion: "化育（万物を育み中央で中継する）",
    colorName: "琥珀・黄土・山吹",
    primaryHex: "#B86924",
    accentHex: "#F59E0B",
    borderHex: "#F3E1CB",
    lightBgHex: "#FCF4EB",
    darkBgHex: "#2A1F16",
    quote: "『素問』「脾者土也、治中央、常以四時長四臓、各十八日寄治。」",
    voiceAdvice: "季節の変わり目、万物を中央で受け止め育む時。湿邪から胃腸（脾胃）を守り、冷飲食を慎んで気血を生み出す消化力を養いましょう。",
    iconType: "compass"
  },
  autumn: {
    key: "autumn",
    name: "秋",
    fiveSeason: "秋（金）",
    element: "金",
    organ: "肺・大腸",
    qiMotion: "収斂（内へ下へと引き締め収める）",
    colorName: "白銀・清白・薄墨",
    primaryHex: "#334155",
    accentHex: "#94A3B8",
    borderHex: "#CBD5E1",
    lightBgHex: "#F1F5F9",
    darkBgHex: "#17212A",
    quote: "『素問・四気調神大論』「秋三月、此謂容平。天気以急、地気以明。」",
    voiceAdvice: "実りと収穫の時。草木が葉を落とすように、気を静かに内へ下へと収める季節。皮膚と喉を潤し、悲しみの情を避けて安寧を保ちましょう。",
    iconType: "wind"
  },
  winter: {
    key: "winter",
    name: "冬",
    fiveSeason: "冬（水）",
    element: "水",
    organ: "腎・膀胱",
    qiMotion: "閉蔵（深く潜んで生命力を封じ蓄える）",
    colorName: "玄・深藍・氷雪",
    primaryHex: "#1E2D3D",
    accentHex: "#38BDF8",
    borderHex: "#B9D2E8",
    lightBgHex: "#EDF3F8",
    darkBgHex: "#121C26",
    quote: "『素問・四気調神大論』「冬三月、此謂閉蔵。水氷地坼、無擾乎陽。」",
    voiceAdvice: "天地の陽気が地に深く潜る蓄えの季節。早寝遅起きで陽気を漏らさず、激しい発汗を避け、腰と足元を温めて腎精を守りましょう。",
    iconType: "snowflake"
  }
};

interface SeasonalThemeContextType {
  currentSeason: SeasonThemeMeta;
  todayTerm: SolarTermInfo;
  isDoyoToday: boolean;
  todayDoyoInfo?: DoyoPeriodInfo;
  currentDateFormatted: string;
  isLive: boolean; // プレビュー中か本日自動判定中か
  previewSeasonKey: SeasonKey | null;
  setPreviewSeason: (key: SeasonKey | null) => void;
  resetToLiveToday: () => void;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextType | undefined>(undefined);

function mapFiveSeasonToKey(fiveSeasonStr: string, isDoyo: boolean): SeasonKey {
  if (isDoyo) return "doyo";
  if (fiveSeasonStr.includes("春")) return "spring";
  if (fiveSeasonStr.includes("夏")) return "summer";
  if (fiveSeasonStr.includes("土")) return "doyo";
  if (fiveSeasonStr.includes("秋")) return "autumn";
  if (fiveSeasonStr.includes("冬")) return "winter";
  return "spring";
}

export function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
  const [previewKey, setPreviewKey] = useState<SeasonKey | null>(null);

  // 本日判定データ
  const todayData = useMemo(() => {
    return getSeasonalAdvice();
  }, []);

  const liveSeasonKey = useMemo(() => {
    return mapFiveSeasonToKey(todayData.term.fiveSeason, todayData.isDoyo);
  }, [todayData]);

  const activeSeasonKey = previewKey || liveSeasonKey;
  const currentSeason = SEASON_THEMES[activeSeasonKey];

  // CSS変数をhtml要素に反映
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-season", activeSeasonKey);
    root.style.setProperty("--season-primary", currentSeason.primaryHex);
    root.style.setProperty("--season-accent", currentSeason.accentHex);
    root.style.setProperty("--season-border", currentSeason.borderHex);
    root.style.setProperty("--season-light-bg", currentSeason.lightBgHex);
    root.style.setProperty("--season-dark-bg", currentSeason.darkBgHex);
  }, [activeSeasonKey, currentSeason]);

  const value: SeasonalThemeContextType = {
    currentSeason,
    todayTerm: todayData.term,
    isDoyoToday: todayData.isDoyo,
    todayDoyoInfo: todayData.doyoInfo,
    currentDateFormatted: todayData.currentDateFormatted,
    isLive: previewKey === null,
    previewSeasonKey: previewKey,
    setPreviewSeason: (key) => setPreviewKey(key),
    resetToLiveToday: () => setPreviewKey(null)
  };

  return (
    <SeasonalThemeContext.Provider value={value}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export function useSeasonalTheme() {
  const context = useContext(SeasonalThemeContext);
  if (!context) {
    throw new Error("useSeasonalTheme must be used within a SeasonalThemeProvider");
  }
  return context;
}
