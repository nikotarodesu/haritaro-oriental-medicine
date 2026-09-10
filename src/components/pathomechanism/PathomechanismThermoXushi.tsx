"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Snowflake, AlertOctagon, ArrowDown, Activity } from "lucide-react";

export default function PathomechanismThermoXushi() {
  const [highlightZone, setHighlightZone] = useState<"upper" | "lower" | "all">("all");

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：現代人の典型「上実下虚」サーモグラフィモデル</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            頭は過熱し足元は凍結する ── デスクワーク社会が生んだ「気機昇降の遮断」
          </h4>
        </div>

        {/* ゾーン切り替え */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setHighlightZone("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              highlightZone === "all" ? "bg-[#1E3D34] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            全身比較
          </button>
          <button
            onClick={() => setHighlightZone("upper")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              highlightZone === "upper" ? "bg-[#D32F2F] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            上実（過熱）
          </button>
          <button
            onClick={() => setHighlightZone("lower")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              highlightZone === "lower" ? "bg-[#0288D1] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            下虚（冷却）
          </button>
        </div>
      </div>

      {/* サーモグラフィビジュアルと分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* 左側：サーモグラフィ人体模式図 */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[260px] aspect-[1/1.3] flex items-center justify-center">
            <svg viewBox="0 0 240 320" className="w-full h-full">
              <defs>
                {/* 過熱サーモグラデーション */}
                <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D50000" />
                  <stop offset="60%" stopColor="#FF6D00" />
                  <stop offset="100%" stopColor="#FFD600" />
                </linearGradient>
                {/* 冷却サーモグラデーション */}
                <linearGradient id="coolGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00B0FF" />
                  <stop offset="60%" stopColor="#2979FF" />
                  <stop offset="100%" stopColor="#304FFE" />
                </linearGradient>
              </defs>

              {/* 上半身（過熱サーモゾーン） */}
              <rect
                x="35"
                y="15"
                width="170"
                height="135"
                rx="20"
                fill="url(#heatGrad)"
                opacity={highlightZone === "lower" ? 0.25 : 0.9}
                className="transition-opacity"
              />
              <circle cx="120" cy="50" r="26" fill="#D50000" />
              <text x="120" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                頭部過熱
              </text>
              <text x="120" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                ▲ 交感神経・脳血流過剰（38.5℃相当）
              </text>

              {/* 遮断ブロック帯（横隔膜・みぞおち） */}
              <rect x="25" y="152" width="190" height="20" rx="6" fill="#263238" />
              <text x="120" y="165" textAnchor="middle" fill="#ECEFF1" fontSize="8" fontWeight="bold">
                ⚡ 気機昇降の遮断ブロック（中焦痞塞）
              </text>

              {/* 下半身（冷却サーモゾーン） */}
              <rect
                x="35"
                y="175"
                width="170"
                height="135"
                rx="20"
                fill="url(#coolGrad)"
                opacity={highlightZone === "upper" ? 0.25 : 0.85}
                className="transition-opacity"
              />
              <path d="M 85 200 L 75 295 M 155 200 L 165 295" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
              <text x="120" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                下半身冷え
              </text>
              <text x="120" y="275" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                ▼ 末梢循環・腎陽脱力（35.0℃相当）
              </text>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
            現代人の典型：上焦が灼熱し、下焦が凍りつく「熱の二極化」
          </span>
        </div>

        {/* 右側：メカニズムと治療原則 */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* 上実ゾーン詳細 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-2 font-bold text-xs text-[#D32F2F] dark:text-[#EF5350] mb-1.5">
              <Flame className="w-4 h-4" />
              <span>上実（じょうじつ）：過熱のメカニズム</span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              PC画面の注視・情報過多・マルチタスクにより脳の神経細胞が連続発火。陽気（熱）が頭部・胸部に引っ張り上げられ、首や肩の僧帽筋が痙攣収縮して血管を圧迫。熱が逃げ場を失います。
            </p>
          </div>

          {/* 下虚ゾーン詳細 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0288D1] dark:text-[#81D4FA] mb-1.5">
              <Snowflake className="w-4 h-4" />
              <span>下虚（げきょ）：凍結のメカニズム</span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              長時間の座位により下半身の骨格筋ポンプが休止。本来下半身を温めるべき「腎陽」の火種が中焦の詰まりで遮断され、足先や生殖器・大腸が深部から冷え切ります。
            </p>
          </div>

          {/* 臨床的介入シークエンス */}
          <div className="p-3.5 rounded-xl bg-[#FFF8E1] dark:bg-[#FFA000]/15 border border-[#FFE082]/60 text-xs space-y-1.5 text-[#5D4037] dark:text-[#FFE082]">
            <div className="font-bold flex items-center gap-1.5">
              <ArrowDown className="w-3.5 h-3.5 text-[#E65100]" />
              <span>臨床の鉄則：補う前に「気の交通整理（疏通・降気）」</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              冷えているからといって高麗人参や温熱薬をやみくもに投入すると、上半身の熱（上実）に火に油を注ぎ、頭痛や不眠を激化させます。
              まず<strong>「内関・太衝・足三里」</strong>で頭の熱を下へ引き下ろし（降気）、詰まった中焦の踏切を開通させてから下半身を温めるのがプロの治療手順です。
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
