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
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：陰陽太極図とダイナミック循環</span>
          </span>
          <h4 className="font-serif font-bold text-base sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            生命の動的平衡 ── 循環し続ける「健康」の姿
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#96A6B2] self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] animate-spin" style={{ animationDuration: "12s" }} />
          <span>時計回りの連続循環</span>
        </div>
      </div>

      {/* ビジュアル本体 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-3 sm:p-6 md:p-8">
        {/* 左側：回転する太極図と循環矢印SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
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
              className="w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl transition-transform duration-700 hover:scale-105 animate-spin"
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

            {/* 上下の属性ラベル（固定表示） */}
            <div className="absolute top-0 px-2.5 py-0.5 rounded-full bg-[#C45A4A] text-white text-[10px] font-bold shadow-sm">
              極陽（正午・盛夏）
            </div>
            <div className="absolute bottom-0 px-2.5 py-0.5 rounded-full bg-[#1E3A5F] text-white text-[10px] font-bold shadow-sm">
              極陰（真夜中・真冬）
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[#737C77] dark:text-[#8A9AA7] text-center">
            ※ 太極図内部の「眼（魚眼）」は、極限の中にも相手の種子が宿る〈陰陽互根・転化〉を象徴
          </p>
        </div>

        {/* 右側：キャッチコピーとダイナミクス解説 */}
        <div className="lg:col-span-6 space-y-4">
          {/* キャッチコピーバナー */}
          <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFFFF] dark:bg-[#1A2530] border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/40 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>陰陽論が描く「健康」の真の定義</span>
            </div>
            <p className="font-serif text-base sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
              「止まらず、偏らず、<br className="hidden sm:inline" />
              行き来できている状態 ＝ <span className="text-[#1E3D34] dark:text-[#74BA9E] underline decoration-[#E6C387] decoration-2">健康</span>」
            </p>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              陰陽論は、白と黒を切り離す「二元論」ではありません。
              昼が来れば活動し（陽）、夜が来れば深く眠る（陰）。熱くなれば汗で冷やし、冷えれば代謝で温める。
              この<strong>滑らかな往復運動が滞りなく回転し続けている動的平衡</strong>こそが、東洋医学の考える真の治癒力です。
            </p>
          </div>

          {/* 対比ミニカード */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#251815] border border-[#F3E1CB] dark:border-[#522923]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C45A4A] dark:text-[#F87171] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C45A4A]" />
                <span>陽の相</span>
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#D1A39D] leading-tight">
                活動・温熱・光・昼・覚醒・交感神経・機能亢進
              </p>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#EBF1F6] dark:bg-[#13202C] border border-[#D5E1EC] dark:border-[#22394E]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] dark:text-[#60A5FA] mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A5F]" />
                <span>陰の相</span>
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#9FB7CE] leading-tight">
                静止・寒涼・闇・夜・睡眠・副交感神経・構造維持
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
