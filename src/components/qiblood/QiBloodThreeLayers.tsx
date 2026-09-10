"use client";

import React from "react";
import { Sparkles, Layers, Cpu, Compass, Activity, Zap, Droplets, Heart } from "lucide-react";

export default function QiBloodThreeLayers() {
  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FFF8E1] dark:bg-[#FFA000]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#E1F5FE] dark:bg-[#0288D1]/15 blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：東洋医学の三層レイヤー構造図（Three-Tier Architecture）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽（OS） ➜ 五行（地図） ➜ 気血水（実体）の多層アーキテクチャ
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          生命を駆動する3つの階層
        </span>
      </div>

      {/* 3層レイヤースタックビジュアル */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* 左側：3層立体モデルSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-[4/5] flex items-center justify-center">
            <svg viewBox="0 0 240 280" className="w-full h-full drop-shadow-sm">
              {/* レイヤー3（最上層）：気血水（流体・ソフトウェア） */}
              <g transform="translate(20, 20)">
                <polygon points="100,10 190,50 100,90 10,50" fill="#FFF9C4" stroke="#FFA000" strokeWidth="2.5" className="dark:fill-[#332505] dark:stroke-[#FFB300]" />
                <polygon points="10,50 100,90 100,100 10,60" fill="#FFA000" opacity="0.8" />
                <polygon points="190,50 100,90 100,100 190,60" fill="#FF8F00" opacity="0.9" />
                <text x="100" y="55" textAnchor="middle" fill="#B86924" fontSize="12" fontWeight="bold" className="dark:fill-[#FFE082]">
                  ★ 気・血・水（実体）
                </text>
                <text x="100" y="70" textAnchor="middle" fill="#737C77" fontSize="9">
                  流れるエネルギー・流体
                </text>
              </g>

              {/* レイヤー2（中間層）：五行（回路地図・ハードウェア） */}
              <g transform="translate(20, 95)">
                <polygon points="100,10 190,50 100,90 10,50" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2.5" className="dark:fill-[#122816] dark:stroke-[#81C784]" />
                <polygon points="10,50 100,90 100,100 10,60" fill="#2E7D32" opacity="0.8" />
                <polygon points="190,50 100,90 100,100 190,60" fill="#1B5E20" opacity="0.9" />
                <text x="100" y="55" textAnchor="middle" fill="#2E7D32" fontSize="12" fontWeight="bold" className="dark:fill-[#A5D6A7]">
                  ◆ 五行論（ネットワーク）
                </text>
                <text x="100" y="70" textAnchor="middle" fill="#737C77" fontSize="9">
                  五臓六腑の回路地図
                </text>
              </g>

              {/* レイヤー1（最下層）：陰陽（根本原理・OS） */}
              <g transform="translate(20, 170)">
                <polygon points="100,10 190,50 100,90 10,50" fill="#EDE7F6" stroke="#1E3D34" strokeWidth="2.5" className="dark:fill-[#1A2530] dark:stroke-[#74BA9E]" />
                <polygon points="10,50 100,90 100,100 10,60" fill="#1E3D34" opacity="0.8" />
                <polygon points="190,50 100,90 100,100 190,60" fill="#0E1D19" opacity="0.9" />
                <text x="100" y="55" textAnchor="middle" fill="#1E3D34" fontSize="12" fontWeight="bold" className="dark:fill-[#83BEA8]">
                  ● 陰陽論（根本原理）
                </text>
                <text x="100" y="70" textAnchor="middle" fill="#737C77" fontSize="9">
                  動的平衡・二値化OS
                </text>
              </g>

              {/* 階層をつなぐ縦の光の軸 */}
              <line x1="120" y1="30" x2="120" y2="240" stroke="#B86924" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* 右側：3層アーキテクチャの解説 */}
        <div className="lg:col-span-7 space-y-3">
          {/* 最上層：気血水 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#FFA000] shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#B86924] dark:text-[#FFA000] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FFA000]" />
                <span>最上層：気・血・水（流体・実体・ソフトウェア）</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF8E1] dark:bg-[#3E2703] text-[#B86924] font-bold">
                日々の動的変動
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              身体の中をリアルタイムに流れるエネルギー（気）と液体（血・水）。疲労、睡眠不足、ストレスによって刻一刻と増減・滞留する「最も即応性の高い実体」です。
            </p>
          </div>

          {/* 中間層：五行 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#2E7D32] shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#2E7D32] dark:text-[#81C784] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#2E7D32]" />
                <span>中間層：五行論（臓腑回路・ハードウェア）</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF5EE] dark:bg-[#15281B] text-[#2E7D32] font-bold">
                構造と多臓器連関
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気血水が巡るための拠点（肝・心・脾・肺・腎）と通路（経絡）。相生・相剋のフィードバックループにより、局所の破綻を全体で補完・調整する「多臓器ネットワーク」です。
            </p>
          </div>

          {/* 最下層：陰陽 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#1E3D34] shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>最下層：陰陽論（根本原理・オペレーティングシステム）</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] font-bold">
                動的平衡の土台
              </span>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              「熱と寒」「動と静」「活動と休息」のバランスを評価する思考の基底OS。生命現象のすべての増減と極限反転を規定する根本ルールです。
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
