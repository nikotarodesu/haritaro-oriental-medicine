"use client";

import React, { useState } from "react";
import { Sparkles, Filter, Scan, Compass, Activity, FileText, CheckCircle2 } from "lucide-react";

export default function DiagnosisFunnelModel() {
  const [activeLevel, setActiveLevel] = useState<number>(1);

  const levels = [
    {
      level: 1,
      title: "Level 1（入口）：生体データの網羅的収集",
      method: "四診法（望診・聞診・問診・切診）",
      badge: "非構造化データ取得",
      color: "#546E7A",
      bgClass: "bg-[#ECEFF1] text-[#37474F] border-[#B0BEC5] dark:bg-[#263238]/30 dark:text-[#CFD8DC]",
      input: "患者の主訴、顔色、声のトーン、体臭、舌の形状・苔、脈の深さ・速さ、腹壁の硬結・圧痛。",
      process: "五感を研ぎ澄まし、ノイズを恐れず客観的な生体サインを収集する。まだ病名やツボは考えない。",
      output: "数十項目に及ぶ「事実データ（ファクト）」のリスト。",
      icon: Scan,
    },
    {
      level: 2,
      title: "Level 2（座標固定）：4次元フィルタリング",
      method: "八綱弁証（表裏・寒熱・虚実・陰陽）",
      badge: "大局的座標の決定",
      color: "#0288D1",
      bgClass: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC] dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
      input: "四診で集めたファクトを「病位の深さ（表裏）」「エネルギーの性質（寒熱）」「生体反応の強度（虚実）」に仕分け。",
      process: "「裏・虚・寒」のように3次元空間に座標を打ち、全体を陰陽で統括する。治療の大枠（補法か瀉法か）をここで固定。",
      output: "「裏証・虚寒・陰証」といったブレない基本座標。",
      icon: Compass,
    },
    {
      level: 3,
      title: "Level 3（機能特定）：破綻システムの同定",
      method: "気血水動態分析 ➜ 臓腑弁証",
      badge: "メカニズムの特定",
      color: "#FFA000",
      bgClass: "bg-[#FFF8E1] text-[#E65100] border-[#FFE082] dark:bg-[#FFA000]/20 dark:text-[#FFE082]",
      input: "八綱の座標をもとに、「どの流体実体（気・血・水）が」「どの臓腑ネットワーク（肝・心・脾・肺・腎）で」破綻しているかを解析。",
      process: "症状のドミノ倒しストーリーを逆算。「脾の気虚（本）」によって水分代謝が落ち、「肝の気滞（標）」が生じている関係性を解明。",
      output: "「本（根本原因）：脾気虚」「標（表面症状）：肝気鬱結」という二重構造の特定。",
      icon: Activity,
    },
    {
      level: 4,
      title: "Level 4（出口）：一文の「証」と介入指令",
      method: "証の確定 ＆ 本治・標治の優先宣言",
      badge: "治療指令書の確定",
      color: "#D32F2F",
      bgClass: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
      input: "すべてを統合し、曖昧さのない一文の「証（しょう）」として宣言。",
      process: "「主証：脾気虚、標証：肝気滞 ➜ 治則：健脾益気を主とし、疏肝理気を兼ねる」。これに基づいて配穴・手技を決定。",
      output: "迷いのない治療プロトコル（例：足三里・中脘＋太衝）。",
      icon: FileText,
    },
  ];

  const current = levels.find((l) => l.level === activeLevel)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：診断の思考アルゴリズム・漏斗（ファンネル）モデル</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            膨大な生体情報から一文の「証」へ ── 4段階の絞り込みアルゴリズム
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          レベルをクリックして思考プロセスを展開
        </span>
      </div>

      {/* メインレイアウト：漏斗SVG ＆ 解説カード */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 mb-6">
        {/* 左側：漏斗ファンネルSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-[1/1.2]">
            <svg viewBox="0 0 260 300" className="w-full h-full">
              {/* Level 1: 幅広トップ */}
              <polygon
                points="10,20 250,20 215,80 45,80"
                fill={activeLevel === 1 ? "#546E7A" : "#ECEFF1"}
                stroke="#546E7A"
                strokeWidth={activeLevel === 1 ? "3" : "1.5"}
                className="cursor-pointer transition-colors dark:fill-[#263238] dark:stroke-[#90A4AE]"
                onClick={() => setActiveLevel(1)}
              />
              <text x="130" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeLevel === 1 ? "#FFFFFF" : "#37474F"} className="dark:fill-[#ECEFF1]">
                Level 1: 四診情報（望聞問切）
              </text>

              {/* Level 2: 中上段 */}
              <polygon
                points="45,85 215,85 185,150 75,150"
                fill={activeLevel === 2 ? "#0288D1" : "#E1F5FE"}
                stroke="#0288D1"
                strokeWidth={activeLevel === 2 ? "3" : "1.5"}
                className="cursor-pointer transition-colors dark:fill-[#01579B] dark:stroke-[#81D4FA]"
                onClick={() => setActiveLevel(2)}
              />
              <text x="130" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeLevel === 2 ? "#FFFFFF" : "#0277BD"} className="dark:fill-[#E1F5FE]">
                Level 2: 八綱弁証（座標固定）
              </text>

              {/* Level 3: 中下段 */}
              <polygon
                points="75,155 185,155 160,225 100,225"
                fill={activeLevel === 3 ? "#FFA000" : "#FFF8E1"}
                stroke="#FFA000"
                strokeWidth={activeLevel === 3 ? "3" : "1.5"}
                className="cursor-pointer transition-colors dark:fill-[#B86924] dark:stroke-[#FFE082]"
                onClick={() => setActiveLevel(3)}
              />
              <text x="130" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeLevel === 3 ? "#FFFFFF" : "#E65100"} className="dark:fill-[#FFF8E1]">
                Level 3: 気血水・臓腑特定
              </text>

              {/* Level 4: 漏斗の出口パイプ */}
              <rect
                x="100"
                y="230"
                width="60"
                height="55"
                rx="6"
                fill={activeLevel === 4 ? "#D32F2F" : "#FFEBEE"}
                stroke="#D32F2F"
                strokeWidth={activeLevel === 4 ? "3" : "1.5"}
                className="cursor-pointer transition-colors dark:fill-[#B71C1C] dark:stroke-[#FFCDD2]"
                onClick={() => setActiveLevel(4)}
              />
              <text x="130" y="255" textAnchor="middle" fontSize="10" fontWeight="bold" fill={activeLevel === 4 ? "#FFFFFF" : "#C62828"} className="dark:fill-[#FFFFFF]">
                Level 4
              </text>
              <text x="130" y="270" textAnchor="middle" fontSize="9" fill={activeLevel === 4 ? "#FFFFFF" : "#C62828"} className="dark:fill-[#FFFFFF]">
                確定証
              </text>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-1 text-center">
            上から下へ情報がろ過され、一文の治療指令書へと収束する
          </span>
        </div>

        {/* 右側：選択されたレベルの詳細カード */}
        <div className="lg:col-span-7 space-y-3">
          {levels.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
            const Icon = lvl.icon;
            return (
              <div
                key={lvl.level}
                onClick={() => setActiveLevel(lvl.level)}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                  isSelected
                    ? "bg-white dark:bg-[#17212A] shadow-md scale-[1.01]"
                    : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
                }`}
                style={{
                  borderColor: isSelected ? lvl.color : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: lvl.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {lvl.title}
                    </h5>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${lvl.bgClass}`}>
                    {lvl.badge}
                  </span>
                </div>

                <div className="text-[11px] font-medium text-[#1E3D34] dark:text-[#74BA9E] mb-1">
                  手法：{lvl.method}
                </div>

                {isSelected && (
                  <div className="space-y-1.5 text-xs pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                    <div className="text-[#59615D] dark:text-[#CBD5E1]">
                      <strong>入力：</strong>{lvl.input}
                    </div>
                    <div className="text-[#59615D] dark:text-[#CBD5E1]">
                      <strong>処理：</strong>{lvl.process}
                    </div>
                    <div className="text-[#232826] dark:text-[#FAF8F5] font-bold">
                      <strong>到達出力：</strong>{lvl.output}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
