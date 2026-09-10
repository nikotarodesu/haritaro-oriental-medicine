"use client";

import React, { useState } from "react";
import { Sparkles, Sun, Moon, ArrowDown, ArrowUp, RefreshCw, Shield, Heart, Zap, Layers } from "lucide-react";

type ViewMode = "both" | "ying" | "wei" | "sanjiao";

export default function LifeDynamicsYingweiSanjiao() {
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [isNight, setIsNight] = useState<boolean>(false);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：営衛二重循環＆三焦リレー模式図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            内を養う「営気」と外を守る「衛気」── 三焦空間を貫く生体ハイウェイ
          </h4>
        </div>

        {/* コントロール群 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 昼夜トグル */}
          <button
            onClick={() => setIsNight(!isNight)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isNight
                ? "bg-[#283593] text-white border-[#3949AB]"
                : "bg-[#FFF8E1] text-[#E65100] border-[#FFE082] dark:bg-[#FFA000]/20 dark:text-[#FFE082]"
            }`}
          >
            {isNight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{isNight ? "夜間モード（衛気体内潜入）" : "昼間モード（衛気体表展開）"}</span>
          </button>

          {/* ビューモードタブ */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
            <button
              onClick={() => setViewMode("both")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === "both" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              統合
            </button>
            <button
              onClick={() => setViewMode("ying")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === "ying" ? "bg-[#0288D1] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              営気（内）
            </button>
            <button
              onClick={() => setViewMode("wei")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === "wei" ? "bg-[#D32F2F] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              衛気（外）
            </button>
            <button
              onClick={() => setViewMode("sanjiao")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === "sanjiao" ? "bg-[#FFA000] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
              }`}
            >
              三焦空間
            </button>
          </div>
        </div>
      </div>

      {/* メインダイアグラム（人体模式図 ＆ 三焦3分割） */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 mb-6">
        {/* 左側：人体三焦模式図SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] aspect-[1/1.2]">
            <svg viewBox="0 0 320 380" className="w-full h-full">
              <defs>
                {/* 営気グラデーション（青） */}
                <linearGradient id="yingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0288D1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#01579B" stopOpacity="0.9" />
                </linearGradient>
                {/* 衛気グラデーション（赤/オレンジ） */}
                <linearGradient id="weiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF7043" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D32F2F" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* 外枠バウンダリ（人体シルエット輪郭） */}
              <path
                d="M 160 20 C 180 20 195 35 195 55 C 195 72 185 85 170 90 C 210 100 240 120 250 160 C 260 200 250 250 245 350 L 195 350 L 180 260 L 160 270 L 140 260 L 125 350 L 75 350 C 70 250 60 200 70 160 C 80 120 110 100 150 90 C 135 85 125 72 125 55 C 125 35 140 20 160 20 Z"
                fill="none"
                stroke="#C5D1C9"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="dark:stroke-[#2A3B4A]"
              />

              {/* 上焦エリア（y: 80〜160） */}
              <rect
                x="60"
                y="85"
                width="200"
                height="80"
                rx="12"
                fill="#FFEBEE"
                opacity={viewMode === "sanjiao" || viewMode === "both" ? 0.45 : 0.15}
                className="dark:fill-[#D32F2F]/20"
              />
              <text x="70" y="105" fontSize="11" fontWeight="bold" fill="#C62828" className="dark:fill-[#EF9A9A]">
                【上焦】霧露の如し（心・肺）
              </text>
              <text x="70" y="120" fontSize="9" fill="#737C77">
                衛気を体表へ拡散散布
              </text>

              {/* 中焦エリア（y: 170〜235） */}
              <rect
                x="60"
                y="170"
                width="200"
                height="65"
                rx="12"
                fill="#FFF8E1"
                opacity={viewMode === "sanjiao" || viewMode === "both" ? 0.55 : 0.15}
                className="dark:fill-[#FFA000]/20"
              />
              <text x="70" y="190" fontSize="11" fontWeight="bold" fill="#E65100" className="dark:fill-[#FFE082]">
                【中焦】沢の如し（脾・胃）
              </text>
              <text x="70" y="205" fontSize="9" fill="#737C77">
                飲食物から営気を生成（後天の本）
              </text>

              {/* 下焦エリア（y: 240〜315） */}
              <rect
                x="60"
                y="240"
                width="200"
                height="75"
                rx="12"
                fill="#E1F5FE"
                opacity={viewMode === "sanjiao" || viewMode === "both" ? 0.45 : 0.15}
                className="dark:fill-[#0288D1]/20"
              />
              <text x="70" y="260" fontSize="11" fontWeight="bold" fill="#0277BD" className="dark:fill-[#81D4FA]">
                【下焦】瀆の如し（腎・膀胱・大小腸）
              </text>
              <text x="70" y="275" fontSize="9" fill="#737C77">
                清濁分離・不要物の排泄と精の貯蔵
              </text>

              {/* 営気の流れ（青ライン：脈中・体内深くを循環） */}
              {(viewMode === "both" || viewMode === "ying") && (
                <g>
                  {/* 中焦からの発生円 */}
                  <circle cx="160" cy="195" r="8" fill="#0288D1" className="animate-pulse" />
                  <path
                    d="M 160 195 C 140 180 140 130 160 120 C 180 110 185 140 160 170 C 145 190 145 250 160 270 C 175 290 170 240 160 195"
                    fill="none"
                    stroke="#0288D1"
                    strokeWidth="3.5"
                    strokeDasharray="6 3"
                    className="dark:stroke-[#29B6F6]"
                  />
                  <text x="160" y="145" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#01579B" className="dark:fill-[#81D4FA]">
                    営気（脈中巡行・1日50周）
                  </text>
                </g>
              )}

              {/* 衛気の流れ（赤ライン：体表または夜間体内） */}
              {(viewMode === "both" || viewMode === "wei") && (
                <g>
                  {isNight ? (
                    // 夜間：衛気が五臓（体内深部）へ入る
                    <g>
                      <path
                        d="M 160 120 C 120 150 120 250 160 280 C 200 250 200 150 160 120"
                        fill="none"
                        stroke="#7B1FA2"
                        strokeWidth="3.5"
                        className="dark:stroke-[#BA68C8]"
                      />
                      <circle cx="160" cy="200" r="28" fill="#7B1FA2" opacity="0.15" />
                      <text x="160" y="340" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7B1FA2" className="dark:fill-[#CE93D8]">
                        夜：体内五臓を巡り深部を修復（25周）
                      </text>
                    </g>
                  ) : (
                    // 昼間：衛気が体表（外郭）をガード
                    <g>
                      <path
                        d="M 160 35 C 190 35 225 110 235 170 C 245 230 235 320 220 340 M 160 35 C 130 35 95 110 85 170 C 75 230 85 320 100 340"
                        fill="none"
                        stroke="#D32F2F"
                        strokeWidth="3.5"
                        strokeDasharray="5 3"
                        className="dark:stroke-[#EF5350]"
                      />
                      <text x="160" y="340" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#C62828" className="dark:fill-[#EF9A9A]">
                        昼：体表を覆い外邪を防御（25周）
                      </text>
                    </g>
                  )}
                </g>
              )}
            </svg>
          </div>
          <div className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-1 text-center">
            {isNight
              ? "🌙 夜間：衛気が体内に潜入して五臓を休養・修復。体表バリアが薄くなるため「寝冷え」しやすい。"
              : "☀️ 昼間：衛気が上焦から体表へ散布され、皮膚・毛穴を緊縮してウイルスや寒さから防衛。"}
          </div>
        </div>

        {/* 右側：営気・衛気・三焦の機能対比カード */}
        <div className="lg:col-span-6 space-y-3.5">
          {/* 営気 vs 衛気 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#0288D1] dark:text-[#4FC3F7] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                営気（えいき / 陰）：内を養う栄養源
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E1F5FE] dark:bg-[#0288D1]/20 text-[#0277BD] dark:text-[#81D4FA] font-bold">
                脈中巡行・50周/日
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              中焦（脾胃）で飲食物から精微が抽出され、血液の一部となって脈中を走行。24時間休まず臓腑・骨肉を滋養し「内側の秩序」を保つ。
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#D32F2F] dark:text-[#EF5350] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                衛気（えき / 陽）：外を守る防衛バリア
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFEBEE] dark:bg-[#D32F2F]/20 text-[#C62828] dark:text-[#EF9A9A] font-bold">
                脈外散布・昼夜交替
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              上焦（肺心）から体表へ散布。昼は体表を25周して毛穴の開閉や体温維持・抗菌バリアを担い、夜は体内（五臓）を25周して臓器をクリーニングする。
            </p>
          </div>

          {/* 三焦空間リレー */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              三焦（さんしょう）の空間リレー機能
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#FFEBEE] dark:bg-[#D32F2F]/20 text-[#C62828] dark:text-[#EF9A9A] font-bold text-[10px]">
                  上焦
                </span>
                <span className="text-[#59615D] dark:text-[#96A6B2]">
                  <strong className="text-[#232826] dark:text-[#FAF8F5]">「霧露の如し」</strong>（心・肺）：気の宣発と通降。衛気と水分を全身へ均一に散布するスプリンクラー。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#FFF8E1] dark:bg-[#FFA000]/20 text-[#E65100] dark:text-[#FFE082] font-bold text-[10px]">
                  中焦
                </span>
                <span className="text-[#59615D] dark:text-[#96A6B2]">
                  <strong className="text-[#232826] dark:text-[#FAF8F5]">「沢の如し」</strong>（脾・胃）：消化発酵（腐熟）と精微抽出。営気と血を生み出す変換工場（後天の本）。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#E1F5FE] dark:bg-[#0288D1]/20 text-[#0277BD] dark:text-[#81D4FA] font-bold text-[10px]">
                  下焦
                </span>
                <span className="text-[#59615D] dark:text-[#96A6B2]">
                  <strong className="text-[#232826] dark:text-[#FAF8F5]">「瀆（どぶ）の如し」</strong>（腎・膀胱・大小腸）：清濁分離。不要な水分と宿便を排出し、根源の精を貯蔵する。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
