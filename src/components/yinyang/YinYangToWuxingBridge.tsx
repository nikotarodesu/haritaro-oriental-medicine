"use client";

import React from "react";
import { Sparkles, ArrowRight, Compass, Network } from "lucide-react";

interface Props {
  onNextLecture?: () => void;
}

export default function YinYangToWuxingBridge({ onNextLecture }: Props) {
  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-tl from-[#EBF3EF] to-transparent dark:from-[#1E3D34]/20 rounded-full blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑨：陰陽から五行への展開概念図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            二値モデルから五相ネットワークへ ── 五行論への架け橋
          </h4>
        </div>
      </div>

      {/* メイングラフィック：陰陽から五行への分化 */}
      <div className="relative z-10 bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
                <text x="0" y="52" textAnchor="middle" fill="#59615D" fontSize="10" fontWeight="bold">
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
                <circle cx="-42" cy="-14" r="14" fill="#2E7D32" />
                <text x="-42" y="-10" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">木</text>
                <text x="-42" y="-32" textAnchor="middle" fill="#2E7D32" fontSize="8" fontWeight="bold">少陽</text>

                {/* 火（太陽）：赤 */}
                <circle cx="0" cy="-45" r="14" fill="#C45A4A" />
                <text x="0" y="-41" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">火</text>
                <text x="0" y="-63" textAnchor="middle" fill="#C45A4A" fontSize="8" fontWeight="bold">太陽</text>

                {/* 土（中和）：黄 */}
                <circle cx="42" cy="-14" r="14" fill="#B86924" />
                <text x="42" y="-10" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">土</text>
                <text x="42" y="-32" textAnchor="middle" fill="#B86924" fontSize="8" fontWeight="bold">中和</text>

                {/* 金（少陰）：白・銀 */}
                <circle cx="26" cy="40" r="14" fill="#64748B" />
                <text x="26" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">金</text>
                <text x="26" y="62" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="bold">少陰</text>

                {/* 水（太陰）：藍 */}
                <circle cx="-26" cy="40" r="14" fill="#1E3A5F" />
                <text x="-26" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">水</text>
                <text x="-26" y="62" textAnchor="middle" fill="#1E3A5F" fontSize="8" fontWeight="bold">太陰</text>
              </g>
            </svg>
          </div>

          {/* 右側：解説と格言 */}
          <div className="lg:col-span-6 space-y-4">
            <blockquote className="p-4 rounded-xl bg-white dark:bg-[#1A2530] border-l-4 border-[#B86924] dark:border-[#E6C387] text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] italic leading-relaxed shadow-xs">
              「陰陽論が治療の**『ベクトル（方向性）』**を決める大まかな地図なら、五行論はその中を詳細に歩くための**『拡大地図（ターゲットと臓器連鎖）』**である。」
            </blockquote>

            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              陰陽論で「熱か寒か」「虚か実か」という大局的な傾きを掴んだ後、
              「どの臓器が火を噴き、どの臓器が衰弱しているのか」「臓器同士がどのように悪循環のバトンを渡しているのか」を解明するのが次章**「五行論」**の役割です。
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#1E3D34] dark:text-[#74BA9E] block mb-0.5">陰陽論の役割</strong>
                <span>二値化（興奮/抑制・熱/寒）による迅速な方針決定</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A]">
                <strong className="text-[#B86924] dark:text-[#E6C387] block mb-0.5">五行論の役割</strong>
                <span>多臓器ネットワーク（相生・相剋）の連鎖解析</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 次の講義へのクリック誘導エリア */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1E3D34] to-[#152C25] text-white shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#E6C387] font-semibold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5" />
            <span>Next Lecture ── 第2講</span>
          </div>
          <h5 className="font-serif font-bold text-base sm:text-lg">
            第2講：五行論 ― 複雑適応系の五相循環動態
          </h5>
          <p className="text-xs text-[#D3DFDA]">
            木・火・土・金・水。臓腑間ネットワークとフィードバック制御を完全マスター
          </p>
        </div>

        {onNextLecture ? (
          <button
            onClick={onNextLecture}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
          >
            <span>次へ進む：② 五行論</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <a
            href="/curriculum?lecture=lecture-2-wuxing"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
          >
            <span>次へ進む：② 五行論</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </figure>
  );
}
