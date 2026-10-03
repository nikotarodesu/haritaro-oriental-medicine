"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

export default function YinYangToWuxingBridge({ onNextLecture }: Props) {
  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tl from-[#EBF3EF] to-transparent dark:from-[#1E3D34]/20 rounded-full blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑨：陰陽から五行への展開概念図</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽の二つの側面から五行の関係へ ── 学習の架け橋
          </h4>
        </div>
      </div>

      {/* メイングラフィック：陰陽から五行への分化 */}
      <div className="relative z-10 bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          {/* 左側：SVG概念図（陰陽太極から5つのノードへの展開） */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <svg viewBox="0 0 320 220" className="w-full max-w-[300px] h-auto mx-auto">
              <defs>
                <linearGradient id="bridgeYang" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C45A4A" />
                  <stop offset="100%" stopColor="#E26A5A" />
                </linearGradient>
                <linearGradient id="bridgeYin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A5F" />
                  <stop offset="100%" stopColor="#0B1520" />
                </linearGradient>
              </defs>

              {/* 左：陰陽の円（二極） */}
              <g transform="translate(60, 110)">
                <circle cx="0" cy="0" r="35" fill="url(#bridgeYin)" />
                <path d="M 0 -35 A 35 35 0 0 1 0 35 A 17.5 17.5 0 0 1 0 0 A 17.5 17.5 0 0 0 0 -35 Z" fill="url(#bridgeYang)" />
                <circle cx="0" cy="-17.5" r="5" fill="url(#bridgeYin)" />
                <circle cx="0" cy="17.5" r="5" fill="url(#bridgeYang)" />
                <text x="0" y="52" textAnchor="middle" fill="currentColor" className="text-[#59615D] dark:text-[#CFD8DC]" fontSize="10" fontWeight="bold">
                  陰陽（二極動態）
                </text>
              </g>

              {/* 中央：分化の矢印群 */}
              <path d="M 105 110 L 150 110" stroke="#1E3D34" strokeWidth="2.5" strokeDasharray="3 3" markerEnd="url(#arrow)" className="dark:stroke-[#74BA9E]" />
              <text x="127" y="100" textAnchor="middle" fill="#1E3D34" fontSize="9" fontWeight="bold" className="dark:fill-[#74BA9E]">
                分化・展開
              </text>

              {/* 右：五行の五角形ノード */}
              <g transform="translate(230, 110)">
                {/* 五角形の相生リング（薄い破線） */}
                <polygon points="0,-45 42,-14 26,40 -26,40 -42,-14" fill="none" stroke="#E5DEC9" strokeWidth="1.5" strokeDasharray="2 2" className="dark:stroke-[#2A3B4A]" />

                {/* 木（少陽）：緑 */}
                <circle cx="-42" cy="-14" r="14" fill="currentColor" className="text-[#2E7D32] dark:text-[#22C55E]" />
                <text x="-42" y="-10" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">木</text>
                <text x="-42" y="-32" textAnchor="middle" fill="currentColor" className="text-[#2E7D32] dark:text-[#86EFAC]" fontSize="8" fontWeight="bold">少陽</text>

                {/* 火（太陽）：赤 */}
                <circle cx="0" cy="-45" r="14" fill="currentColor" className="text-[#C45A4A] dark:text-[#EF4444]" />
                <text x="0" y="-41" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">火</text>
                <text x="0" y="-63" textAnchor="middle" fill="currentColor" className="text-[#C45A4A] dark:text-[#FCA5A5]" fontSize="8" fontWeight="bold">太陽</text>

                {/* 土（中和）：黄 */}
                <circle cx="42" cy="-14" r="14" fill="currentColor" className="text-[#B86924] dark:text-[#F59E0B]" />
                <text x="42" y="-10" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">土</text>
                <text x="42" y="-32" textAnchor="middle" fill="currentColor" className="text-[#B86924] dark:text-[#FCD34D]" fontSize="8" fontWeight="bold">中和</text>

                {/* 金（少陰）：白・銀 */}
                <circle cx="26" cy="40" r="14" fill="currentColor" className="text-[#64748B] dark:text-[#94A3B8]" />
                <text x="26" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">金</text>
                <text x="26" y="62" textAnchor="middle" fill="currentColor" className="text-[#475569] dark:text-[#CBD5E1]" fontSize="8" fontWeight="bold">少陰</text>

                {/* 水（太陰）：藍・青 */}
                <circle cx="-26" cy="40" r="14" fill="currentColor" className="text-[#1E40AF] dark:text-[#3B82F6]" />
                <text x="-26" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">水</text>
                <text x="-26" y="62" textAnchor="middle" fill="currentColor" className="text-[#1E40AF] dark:text-[#93C5FD]" fontSize="8" fontWeight="bold">太陰</text>
              </g>
            </svg>
          </div>

          {/* 右側：解説と格言 */}
          <div className="lg:col-span-6 space-y-4">
            <blockquote className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#B86924] dark:border-[#E6C387] text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] italic leading-relaxed shadow-xs">
              学習上の比喩：陰陽論が<strong>「二つの側面を捉える地図」</strong>なら、五行論は<strong>「五つの分類と関係を学ぶ地図」</strong>です。
            </blockquote>

            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              陰陽論で寒熱などの伝統的な分類を学んだ後、
              次章の<strong>「五行論」</strong>では木・火・土・金・水と相生・相剋の関係を整理します。
              五行の臓腑分類は、現代の臓器の病変や臓器間の病態を診断する仕組みとは区別します。
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">陰陽論の役割</strong>
                <span>寒熱などの相対的な分類と、その関係を捉える</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#B86924] dark:text-[#E6C387] block mb-0.5">五行論の役割</strong>
                <span>五つの伝統分類と相生・相剋の関係を学ぶ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="relative z-10 mt-4 text-[11px] leading-relaxed text-[#737C77] dark:text-[#96A6B2]">
        陰陽と五行の対応はこの図の教育上の整理です。臓器ネットワークの実証や治療方針の決定を示す図ではなく、引用原典の照合・監修が完了したことも意味しません。
      </figcaption>

    </figure>
  );
}
