"use client";

import React, { useState } from "react";
import { Sparkles, Layers, Cpu, Compass, Activity, Zap, Shield, Heart, Eye } from "lucide-react";

export default function LifeDynamicsFourLayers() {
  const [selectedLayer, setSelectedLayer] = useState<number>(4);

  const layers = [
    {
      level: 4,
      name: "第4層：生命機能論（動態プロセス・システム統合）",
      subtitle: "営衛循環・三焦空間インフラ・天人相応・気機昇降出入",
      desc: "陰陽・五行・気血水がリアルタイムに結合し、昼夜の生体リズム、内外の防衛、季節への同調を駆動する生きた動態システム。",
      color: "#1E3D34",
      accent: "#74BA9E",
      bgClass: "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] border-[#74BA9E]/40",
      tag: "最上層：システム統括・動態制御",
      icon: Activity,
    },
    {
      level: 3,
      name: "第3層：気血水（流体実体・燃料と材料）",
      subtitle: "気（制御/ATP） ＋ 血（酸素/栄養） ＋ 水（組織液/間質）",
      desc: "回路の中を駆け巡る3つの物理的・エネルギー的実体。三位一体となって組織を滋養し、老廃物を回収する。",
      color: "#D32F2F",
      accent: "#EF5350",
      bgClass: "bg-[#FFEBEE] dark:bg-[#D32F2F]/20 text-[#C62828] dark:text-[#EF9A9A] border-[#FFCDD2]/40",
      tag: "実体層：エネルギーと流体",
      icon: Zap,
    },
    {
      level: 2,
      name: "第2層：五行論（ネットワーク地図・ハードウェア）",
      subtitle: "木・火・土・金・水の五臓六腑配線 ＆ 相生・相剋回路",
      desc: "身体の機能を5つのモジュールに分類し、器官同士がどのように情報をやり取りし、互いを助け制約するかを規定した構造地図。",
      color: "#2E7D32",
      accent: "#81C784",
      bgClass: "bg-[#E8F5E9] dark:bg-[#1B5E20]/20 text-[#2E7D32] dark:text-[#A5D6A7] border-[#C8E6C9]/40",
      tag: "構造層：臓腑ネットワーク回路",
      icon: Compass,
    },
    {
      level: 1,
      name: "第1層：陰陽論（OS・根底の運動法則）",
      subtitle: "動的平衡・二値状態・エントロピー制御・ホメオスタシス",
      desc: "宇宙と生命を貫く最も根源的な二元相補原理。自律神経の交感/副交感、活動/休息の波形リズムを司る生体OS。",
      color: "#B86924",
      accent: "#E6C387",
      bgClass: "bg-[#FFF8E1] dark:bg-[#FFA000]/15 text-[#B86924] dark:text-[#FFE082] border-[#FFE082]/40",
      tag: "原理層：根底の生体OS",
      icon: Cpu,
    },
  ];

  const current = layers.find((l) => l.level === selectedLayer)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景装飾 */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#EBF3EF] dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FFF8E1] dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：生命システムの四層統合アーキテクチャ図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽 ➜ 五行 ➜ 気血水 ➜ 生命機能論：多層スタックが描く生命の動態
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          各層をクリックして詳細を展開
        </span>
      </div>

      {/* メインレイアウト */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 左側：四層立体モデル（SVG） */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-center justify-center">
            <svg viewBox="0 0 260 320" className="w-full h-full drop-shadow-md">
              {/* レイヤー4（最上層）：生命機能論 */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayer(4)}
                transform="translate(10, 15)"
              >
                <polygon
                  points="120,10 225,55 120,100 15,55"
                  fill={selectedLayer === 4 ? "#1E3D34" : "#EBF3EF"}
                  stroke="#1E3D34"
                  strokeWidth={selectedLayer === 4 ? "3" : "1.5"}
                  className="transition-colors dark:fill-[#182823] dark:stroke-[#74BA9E]"
                />
                <polygon points="15,55 120,100 120,110 15,65" fill="#152B25" opacity="0.9" />
                <polygon points="225,55 120,100 120,110 225,65" fill="#0D1E19" opacity="0.95" />
                <text
                  x="120"
                  y="55"
                  textAnchor="middle"
                  fill={selectedLayer === 4 ? "#FFFFFF" : "#1E3D34"}
                  fontSize="12"
                  fontWeight="bold"
                  className="dark:fill-[#A5D6A7]"
                >
                  ★ 第4層：生命機能論
                </text>
                <text
                  x="120"
                  y="70"
                  textAnchor="middle"
                  fill={selectedLayer === 4 ? "#A5D6A7" : "#59615D"}
                  fontSize="9"
                  className="dark:fill-[#D1D5DB]"
                >
                  動態プロセス・システム統合
                </text>
              </g>

              {/* レイヤー3：気血水 */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayer(3)}
                transform="translate(10, 80)"
              >
                <polygon
                  points="120,10 225,55 120,100 15,55"
                  fill={selectedLayer === 3 ? "#D32F2F" : "#FFEBEE"}
                  stroke="#D32F2F"
                  strokeWidth={selectedLayer === 3 ? "3" : "1.5"}
                  className="transition-colors dark:fill-[#3E1616] dark:stroke-[#EF5350]"
                />
                <polygon points="15,55 120,100 120,110 15,65" fill="#B71C1C" opacity="0.8" />
                <polygon points="225,55 120,100 120,110 225,65" fill="#7F0000" opacity="0.9" />
                <text
                  x="120"
                  y="55"
                  textAnchor="middle"
                  fill={selectedLayer === 3 ? "#FFFFFF" : "#C62828"}
                  fontSize="12"
                  fontWeight="bold"
                  className="dark:fill-[#EF9A9A]"
                >
                  ◆ 第3層：気・血・水
                </text>
                <text
                  x="120"
                  y="70"
                  textAnchor="middle"
                  fill={selectedLayer === 3 ? "#FFCDD2" : "#59615D"}
                  fontSize="9"
                  className="dark:fill-[#D1D5DB]"
                >
                  体内を流れる材料と燃料
                </text>
              </g>

              {/* レイヤー2：五行論 */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayer(2)}
                transform="translate(10, 145)"
              >
                <polygon
                  points="120,10 225,55 120,100 15,55"
                  fill={selectedLayer === 2 ? "#2E7D32" : "#E8F5E9"}
                  stroke="#2E7D32"
                  strokeWidth={selectedLayer === 2 ? "3" : "1.5"}
                  className="transition-colors dark:fill-[#132A17] dark:stroke-[#81C784]"
                />
                <polygon points="15,55 120,100 120,110 15,65" fill="#1B5E20" opacity="0.8" />
                <polygon points="225,55 120,100 120,110 225,65" fill="#0D3B12" opacity="0.9" />
                <text
                  x="120"
                  y="55"
                  textAnchor="middle"
                  fill={selectedLayer === 2 ? "#FFFFFF" : "#2E7D32"}
                  fontSize="12"
                  fontWeight="bold"
                  className="dark:fill-[#A5D6A7]"
                >
                  ▲ 第2層：五行論
                </text>
                <text
                  x="120"
                  y="70"
                  textAnchor="middle"
                  fill={selectedLayer === 2 ? "#C8E6C9" : "#59615D"}
                  fontSize="9"
                  className="dark:fill-[#D1D5DB]"
                >
                  臓腑ネットワーク回路地図
                </text>
              </g>

              {/* レイヤー1（最下層）：陰陽論 */}
              <g
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => setSelectedLayer(1)}
                transform="translate(10, 210)"
              >
                <polygon
                  points="120,10 225,55 120,100 15,55"
                  fill={selectedLayer === 1 ? "#B86924" : "#FFF8E1"}
                  stroke="#B86924"
                  strokeWidth={selectedLayer === 1 ? "3" : "1.5"}
                  className="transition-colors dark:fill-[#33220A] dark:stroke-[#FFB300]"
                />
                <polygon points="15,55 120,100 120,110 15,65" fill="#8D4C13" opacity="0.8" />
                <polygon points="225,55 120,100 120,110 225,65" fill="#5D2E08" opacity="0.9" />
                <text
                  x="120"
                  y="55"
                  textAnchor="middle"
                  fill={selectedLayer === 1 ? "#FFFFFF" : "#B86924"}
                  fontSize="12"
                  fontWeight="bold"
                  className="dark:fill-[#FFE082]"
                >
                  ● 第1層：陰陽論
                </text>
                <text
                  x="120"
                  y="70"
                  textAnchor="middle"
                  fill={selectedLayer === 1 ? "#FFE082" : "#59615D"}
                  fontSize="9"
                  className="dark:fill-[#D1D5DB]"
                >
                  根底の生体OS・動的平衡
                </text>
              </g>
            </svg>
          </div>

          {/* ピルセレクター */}
          <div className="flex items-center gap-1 mt-3">
            {[4, 3, 2, 1].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLayer(lvl)}
                className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                  selectedLayer === lvl
                    ? "bg-[#1E3D34] text-white shadow-xs scale-110"
                    : "bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D]"
                }`}
              >
                L{lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 右側：選択されたレイヤーの解説カード */}
        <div className="lg:col-span-7 space-y-3">
          {layers.map((layer) => {
            const isSelected = selectedLayer === layer.level;
            const Icon = layer.icon;
            return (
              <div
                key={layer.level}
                onClick={() => setSelectedLayer(layer.level)}
                className={`cursor-pointer rounded-2xl p-4 transition-all border text-left ${
                  isSelected
                    ? `bg-[#FAF8F5] dark:bg-[#121920] border-2 shadow-sm scale-[1.01]`
                    : "bg-white dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#22303D] opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: isSelected ? layer.accent : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: layer.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {layer.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${layer.bgClass}`}>
                    {layer.tag}
                  </span>
                </div>

                <div className="text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] mb-1">
                  {layer.subtitle}
                </div>
                <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
