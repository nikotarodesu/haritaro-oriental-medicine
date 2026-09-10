"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Activity, Flame, Droplets, Leaf, Shield, Mountain } from "lucide-react";

export default function WuxingDifferentiationModel() {
  const [activeElement, setActiveElement] = useState<string>("all");

  const phases = [
    {
      id: "wood",
      name: "木（もく）",
      phase: "少陽（しょうよう）",
      season: "春",
      vector: "上方・四方へ伸展・成長",
      color: "#2E7D32",
      bgLight: "bg-[#EBF5EE] border-[#C8E6C9] text-[#2E7D32]",
      darkBg: "dark:bg-[#15281B] dark:border-[#274D32] dark:text-[#81C784]",
      icon: <Leaf className="w-4 h-4 text-[#2E7D32]" />,
      desc: "種から芽が力強く突き破り、ぐんぐん枝葉を伸ばす「誕生と伸長」のベクトル。"
    },
    {
      id: "fire",
      name: "火（か）",
      phase: "太陽（たいよう）",
      season: "夏",
      vector: "炎上・拡散・激しい熱変化",
      color: "#C62828",
      bgLight: "bg-[#FDECEC] border-[#FFCDD2] text-[#C62828]",
      darkBg: "dark:bg-[#2B1516] dark:border-[#532426] dark:text-[#EF5350]",
      icon: <Flame className="w-4 h-4 text-[#C62828]" />,
      desc: "陽気が極限に達し、炎のように天へ昇り全方位へ熱と光を放つ「活動の極盛」フェーズ。"
    },
    {
      id: "earth",
      name: "土（ど）",
      phase: "中和（ちゅうわ）",
      season: "土用（季節の転換点）",
      vector: "安定・受容・変換・生化",
      color: "#F57F17",
      bgLight: "bg-[#FFF9E6] border-[#FFE082] text-[#B86924]",
      darkBg: "dark:bg-[#291F11] dark:border-[#523E1D] dark:text-[#FFB74D]",
      icon: <Mountain className="w-4 h-4 text-[#F57F17]" />,
      desc: "四方と四季の真ん中に鎮座し、万物を受け入れて栄養を醸成し橋渡しする「中庸の母体」。"
    },
    {
      id: "metal",
      name: "金（ごん）",
      phase: "少陰（しょういん）",
      season: "秋",
      vector: "収斂・沈降・清潔・選別",
      color: "#78909C",
      bgLight: "bg-[#F0F4F8] border-[#CFD8DC] text-[#455A64]",
      darkBg: "dark:bg-[#1A2329] dark:border-[#37474F] dark:text-[#B0BEC5]",
      icon: <Shield className="w-4 h-4 text-[#78909C]" />,
      desc: "熱気を削ぎ落とし、不要なものを切り捨てて実りを深層へ凝縮する「引き締めと粛降」。"
    },
    {
      id: "water",
      name: "水（すい）",
      phase: "太陰（たいいん）",
      season: "冬",
      vector: "寒冷・下降・滋潤・深層蓄積",
      color: "#1A237E",
      bgLight: "bg-[#E8EAF6] border-[#C5CAE9] text-[#1A237E]",
      darkBg: "dark:bg-[#13172C] dark:border-[#283593] dark:text-[#9FA8DA]",
      icon: <Droplets className="w-4 h-4 text-[#1A237E]" />,
      desc: "陰気が極まり、低きへと静かに流れ、生命の種子（精）を凍土の底に温存する「完全な休息」。"
    }
  ];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden relative">
      {/* 背景光 */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#EBF5EE] dark:bg-[#2E7D32]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#E8EAF6] dark:bg-[#1A237E]/20 blur-3xl pointer-events-none" />

      {/* ヘッダー */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：陰陽から五行への展開概念図（Differentiation Model）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            陰陽の二極から「5つの運動フェーズ」への分化
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          五行は物質ではなく「エネルギーの運動方向」
        </span>
      </div>

      {/* メイングラフィック：分化モーフィング */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8">
        {/* 左側：SVG概念図 */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 340 340" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="yangGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C62828" />
                  <stop offset="100%" stopColor="#F57F17" />
                </linearGradient>
                <linearGradient id="yinGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1A237E" />
                  <stop offset="100%" stopColor="#78909C" />
                </linearGradient>
              </defs>

              {/* 外周円環軌道 */}
              <circle cx="170" cy="170" r="130" fill="none" stroke="#E5DEC9" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#2A3B4A]" />

              {/* 中心：太極（陰陽の源泉） */}
              <g transform="translate(170, 170)">
                <circle cx="0" cy="0" r="28" fill="url(#yinGrad2)" opacity="0.9" />
                <path d="M 0 -28 A 28 28 0 0 1 0 28 A 14 14 0 0 1 0 0 A 14 14 0 0 0 0 -28 Z" fill="url(#yangGrad2)" />
                <circle cx="0" cy="-14" r="3.5" fill="url(#yinGrad2)" />
                <circle cx="0" cy="14" r="3.5" fill="url(#yangGrad2)" />
                <text x="0" y="38" textAnchor="middle" fill="#59615D" fontSize="9" fontWeight="bold">太極（根源）</text>
              </g>

              {/* 放射状のエネルギー分化ライン */}
              {/* 木（左） */}
              <line x1="145" y1="160" x2="60" y2="150" stroke="#2E7D32" strokeWidth="2" strokeDasharray="3 2" />
              {/* 火（上） */}
              <line x1="170" y1="140" x2="170" y2="55" stroke="#C62828" strokeWidth="2" strokeDasharray="3 2" />
              {/* 土（右中） */}
              <line x1="195" y1="175" x2="270" y2="170" stroke="#F57F17" strokeWidth="2" strokeDasharray="3 2" />
              {/* 金（右下） */}
              <line x1="185" y1="190" x2="245" y2="265" stroke="#78909C" strokeWidth="2" strokeDasharray="3 2" />
              {/* 水（左下） */}
              <line x1="155" y1="190" x2="95" y2="265" stroke="#1A237E" strokeWidth="2" strokeDasharray="3 2" />

              {/* 五行の5ノード */}
              {/* 火：上（夏・太陽） */}
              <g transform="translate(170, 45)" className="cursor-pointer" onClick={() => setActiveElement("fire")}>
                <circle cx="0" cy="0" r="24" fill="#C62828" />
                <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">火</text>
                <text x="0" y="-30" textAnchor="middle" fill="#C62828" fontSize="10" fontWeight="bold">太陽（夏）</text>
              </g>

              {/* 土：中央右（中和・土用） */}
              <g transform="translate(285, 160)" className="cursor-pointer" onClick={() => setActiveElement("earth")}>
                <circle cx="0" cy="0" r="24" fill="#F57F17" />
                <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">土</text>
                <text x="0" y="36" textAnchor="middle" fill="#F57F17" fontSize="10" fontWeight="bold">中和（土用）</text>
              </g>

              {/* 金：右下（秋・少陰） */}
              <g transform="translate(250, 275)" className="cursor-pointer" onClick={() => setActiveElement("metal")}>
                <circle cx="0" cy="0" r="24" fill="#78909C" />
                <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">金</text>
                <text x="0" y="36" textAnchor="middle" fill="#78909C" fontSize="10" fontWeight="bold">少陰（秋）</text>
              </g>

              {/* 水：左下（冬・太陰） */}
              <g transform="translate(90, 275)" className="cursor-pointer" onClick={() => setActiveElement("water")}>
                <circle cx="0" cy="0" r="24" fill="#1A237E" />
                <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">水</text>
                <text x="0" y="36" textAnchor="middle" fill="#1A237E" fontSize="10" fontWeight="bold">太陰（冬）</text>
              </g>

              {/* 木：左（春・少陽） */}
              <g transform="translate(50, 145)" className="cursor-pointer" onClick={() => setActiveElement("wood")}>
                <circle cx="0" cy="0" r="24" fill="#2E7D32" />
                <text x="0" y="4" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">木</text>
                <text x="0" y="-30" textAnchor="middle" fill="#2E7D32" fontSize="10" fontWeight="bold">少陽（春）</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 右側：5行の運動ベクトル一覧カード */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="p-3 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] mb-3">
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              古代中国の五行（ごぎょう）の「行」は、**歩く・めぐる・運動する**という意味です。金属や木材という静的な物質ではなく、<strong>宇宙と人体のエネルギーが経巡る「5つの相（フェーズ）」</strong>を表しています。
            </p>
          </div>

          <div className="space-y-2">
            {phases.map((p) => {
              const isSelected = activeElement === p.id || activeElement === "all";
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveElement(activeElement === p.id ? "all" : p.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeElement === p.id
                      ? "ring-2 ring-offset-1 bg-white dark:bg-[#1C2834] shadow-sm"
                      : "bg-white/80 dark:bg-[#17212A] hover:bg-white"
                  } border-[#E8E1D1] dark:border-[#22303D]`}
                  style={{
                    borderColor: activeElement === p.id ? p.color : undefined
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920]">
                        {p.icon}
                      </span>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                        {p.name}
                      </h5>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.bgLight} ${p.darkBg}`}>
                        {p.phase}（{p.season}）
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#737C77] dark:text-[#96A6B2]">
                      {p.vector}
                    </span>
                  </div>
                  {(activeElement === p.id || activeElement === "all") && (
                    <p className="mt-1.5 text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed pl-7">
                      {p.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </figure>
  );
}
