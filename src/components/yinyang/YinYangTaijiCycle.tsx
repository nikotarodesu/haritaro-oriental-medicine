"use client";

import React from "react";
import { Sparkles, Activity, RefreshCw } from "lucide-react";

export default function YinYangTaijiCycle() {
  return (
    <figure className="my-6 sm:my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-6 md:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#FCF4EB] dark:bg-[#C45A4A]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[#EBF3EF] dark:bg-[#1E3A5F]/20 blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 mb-4 sm:mb-6">
        <div>
          <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：陰陽太極図とダイナミック循環</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽の変化を表す太極図
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-sm text-[#59615D] dark:text-[#96A6B2] self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] animate-spin" style={{ animationDuration: "12s" }} />
          <span>時計回りの連続循環</span>
        </div>
      </div>

      {/* ビジュアル本体 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 md:p-8">
        {/* 左側：回転する太極図と循環矢印SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <p className="taiji-label mb-2 rounded-lg bg-[#A83629] px-2.5 py-1 text-sm font-semibold text-white">極陽（正午・盛夏）</p>
          <div className="taiji-orbit relative flex items-center justify-center">
            {/* 外周を回る循環軌道・矢印 */}
            <svg
              viewBox="0 0 300 300"
              className="absolute inset-0 w-full h-full animate-spin pointer-events-none"
              style={{ animationDuration: "40s" }}
            >
              <defs>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C45A4A" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#E6C387" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.8" />
                </linearGradient>
                <marker
                  id="arrow-yang"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#C45A4A" />
                </marker>
                <marker
                  id="arrow-yin"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E3A5F" />
                </marker>
              </defs>

              {/* 外周円 */}
              <circle
                cx="150"
                cy="150"
                r="135"
                fill="none"
                stroke="url(#orbitGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                opacity="0.7"
              />

              {/* 陽から陰への移行矢印（右半球） */}
              <path
                d="M 150 15 A 135 135 0 0 1 285 150"
                fill="none"
                stroke="#C45A4A"
                strokeWidth="3.5"
                markerEnd="url(#arrow-yang)"
              />

              {/* 陰から陽への移行矢印（左半球） */}
              <path
                d="M 150 285 A 135 135 0 0 1 15 150"
                fill="none"
                stroke="#1E3A5F"
                strokeWidth="3.5"
                markerEnd="url(#arrow-yin)"
              />
            </svg>

            {/* 中央の回転するグラデーション太極図 */}
            <div
              className="taiji-core rounded-full shadow-xl transition-transform duration-700 hover:scale-105 animate-spin"
              style={{ animationDuration: "25s" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                <defs>
                  {/* 陽のグラデーション（朱〜琥珀） */}
                  <linearGradient id="yangBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E26A5A" />
                    <stop offset="60%" stopColor="#C45A4A" />
                    <stop offset="100%" stopColor="#A83629" />
                  </linearGradient>
                  {/* 陰のグラデーション（藍〜深紺） */}
                  <linearGradient id="yinBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A5F" />
                    <stop offset="60%" stopColor="#152736" />
                    <stop offset="100%" stopColor="#0B1520" />
                  </linearGradient>
                </defs>

                {/* ベースの陰円（全体） */}
                <circle cx="100" cy="100" r="98" fill="url(#yinBodyGrad)" />

                {/* 陽の半円＋S字カーブ */}
                <path
                  d="M 100 2 
                     A 98 98 0 0 1 100 198 
                     A 49 49 0 0 1 100 100 
                     A 49 49 0 0 0 100 2 Z"
                  fill="url(#yangBodyGrad)"
                />

                {/* 陽中の陰眼（上の陽の中に黒い点） */}
                <circle cx="100" cy="51" r="14" fill="url(#yinBodyGrad)" />
                <circle cx="100" cy="51" r="4" fill="#FFFFFF" opacity="0.6" />

                {/* 陰中の陽眼（下の陰の中に白い点） */}
                <circle cx="100" cy="149" r="14" fill="url(#yangBodyGrad)" />
                <circle cx="100" cy="149" r="4" fill="#FFFFFF" opacity="0.9" />
              </svg>
            </div>

          </div>
          <p className="taiji-label mt-2 rounded-lg bg-[#1E3A5F] px-2.5 py-1 text-sm font-semibold text-white">極陰（真夜中・真冬）</p>

          <p className="mt-4 text-sm text-[#59615D] dark:text-[#8A9AA7] text-center">
            ※ 太極図内部の「眼（魚眼）」は、極限の中にも相手の種子が宿る〈陰陽互根・転化〉を象徴
          </p>
        </div>

        {/* 右側：キャッチコピーとダイナミクス解説 */}
        <div className="lg:col-span-6 space-y-4">
          {/* キャッチコピーバナー */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFFFF] dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>陰陽論で学ぶ調和のイメージ</span>
            </div>
            <p className="font-serif text-base sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
              「止まらず、偏らず、<br className="hidden sm:inline" />
              行き来できている状態 ＝ <span className="text-[#1E3D34] dark:text-[#74BA9E] underline decoration-[#E6C387] decoration-2">調和の比喩</span>」
            </p>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              陰陽論では、二つの側面の関係と変化を捉えます。
              昼の活動を陽、夜の休息を陰にたとえ、<strong>互いに移り変わる関係</strong>を図示しています。
              この回転は学習上の表現で、健康状態の測定や治癒力の証明を示すものではありません。
            </p>
          </div>

          {/* 対比ミニカード */}
          <div className="reading-comparison-grid grid gap-2 sm:gap-3 pt-1">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#251815] border border-[#F3E1CB] dark:border-[#522923]">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#C45A4A] dark:text-[#F87171] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C45A4A]" />
                <span>陽の相</span>
              </div>
              <p className="text-sm text-[#59615D] dark:text-[#D1A39D] leading-tight">
                活動・温熱・光・昼などを陽に分類する例
              </p>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#EBF1F6] dark:bg-[#13202C] border border-[#D5E1EC] dark:border-[#22394E]">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#1E3A5F] dark:text-[#60A5FA] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" />
                <span>陰の相</span>
              </div>
              <p className="text-sm text-[#59615D] dark:text-[#9FB7CE] leading-tight">
                静止・寒涼・闇・夜などを陰に分類する例
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="relative z-10 mt-4 text-sm leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
        伝統理論の関係を示す模式図です。陰陽を交感神経・副交感神経と固定対応させず、医学的な診断や治療効果とは区別します。
      </figcaption>
    </figure>
  );
}
