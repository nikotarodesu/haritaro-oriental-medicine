"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function YinYangSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "yin";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 group select-none shrink-0
        bg-[#FAF8F5] border-[#D8CFC0] hover:border-[#1E3D34] hover:bg-[#F2EDE4]
        dark:bg-[#1A2530] dark:border-[#2D3E50] dark:hover:border-[#3A7565] dark:hover:bg-[#202E3C]"
      aria-label={`テーマを切り替える（現在: ${isDark ? "陰・ダークモード" : "陽・ライトモード"}）`}
      title={`陰陽切り替え（現在: ${isDark ? "陰（藍鉄・漆黒）" : "陽（和紙・生成り）"}）`}
    >
      {/* 太極図 SVG アイコン */}
      <div
        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform duration-500 ease-in-out drop-shadow-sm ${
          isDark ? "rotate-180" : "rotate-0"
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 背景の円（外枠） */}
          <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#232826" strokeWidth="3" />
          {/* 陰の黒い半身（S字カーブ） */}
          <path
            d="M 50,2 A 48,48 0 0,1 50,98 A 24,24 0 0,1 50,50 A 24,24 0 0,0 50,2"
            fill="#1E2D3D"
          />
          {/* 陽の魚眼（黒の中の白点） */}
          <circle cx="50" cy="26" r="7" fill="#FFFFFF" />
          {/* 陰の魚眼（白の中の黒点） */}
          <circle cx="50" cy="74" r="7" fill="#1E2D3D" />
        </svg>
      </div>

      {/* 陰陽テキストラベル */}
      <span className="text-xs font-serif font-bold tracking-wider sm:tracking-widest text-[#232826] dark:text-[#E6EFEA] flex items-center gap-1">
        <span>{isDark ? "陰" : "陽"}</span>
        <span className="hidden sm:inline text-[10px] font-sans font-normal text-[#59615D] dark:text-[#96A6B2]">
          {isDark ? "Dark" : "Light"}
        </span>
      </span>
    </button>
  );
}
