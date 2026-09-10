"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, AlertTriangle, ArrowRight, ShieldCheck, Scale, Zap } from "lucide-react";

type RelationType = "sousei" | "soukoku" | "soujou" | "soubu" | "hiwa";

export default function WuxingFiveRelationsChart() {
  const [activeRelation, setActiveRelation] = useState<RelationType>("sousei");

  const relationDetails = {
    sousei: {
      name: "① 相生（そうせい）｜ 生成・促進サイクル",
      en: "Generating / Promoting (Mother-Child)",
      badgeColor: "bg-[#2E7D32] text-white",
      formula: "木 ➜ 火 ➜ 土 ➜ 金 ➜ 水 ➜ 木",
      clinicalRule: "「虚すれば其の母を補い、実すれば其の子を瀉す」",
      summary: "一方が他方を生み出し、エネルギーをバトンタッチして育てる促進の好循環。親が子に無償の愛と栄養を注ぐ『母子関係』です。",
      example: "木生火（肝が心を養う）、火生土（心が脾を温める）、土生金（脾が肺を潤す）、金生水（肺が腎を助ける）、水生木（腎が肝を潤す）。"
    },
    soukoku: {
      name: "② 相剋（そうこく）｜ 抑制・ブレーキ制御",
      en: "Controlling / Restricting (Grandparent-Grandchild)",
      badgeColor: "bg-[#C62828] text-white",
      formula: "木 ➜ 土 ➜ 水 ➜ 火 ➜ 金 ➜ 木",
      clinicalRule: "「所勝（剋す相手）と所不勝（剋される相手）の拮抗動態」",
      summary: "ある要素が特定の要素を制約・抑制し、システム全体の肥大化や暴走を未然に防ぐ負のフィードバック制御。ブレーキ役です。",
      example: "木剋土（肝気が脾胃の停滞を防ぐ）、土剋水（脾が水分の氾濫を防ぐ）、水剋火（腎水が心火の過熱を冷ます）、火剋金（心熱が肺金の硬直を和らげる）、金剋木（肺気が肝気の暴走を切り揃える）。"
    },
    soujou: {
      name: "③ 相乗（そうじょう）｜ 過剰抑制・蹂躙",
      en: "Over-acting (Excessive Restriction)",
      badgeColor: "bg-[#7C3AED] text-white",
      formula: "相剋関係が過熱し、相手を完膚なきまでに打ちのめす",
      clinicalRule: "「剋する側が強大化、または受ける側が衰弱して生じる病理」",
      summary: "相剋のブレーキが踏み込みすぎて破壊的になる状態。強いストレスで肝（木）が高ぶり、胃腸（土）を直接攻撃して激痛や嘔吐を起こす『肝気犯胃（木乗土）』が典型例。",
      example: "過度の精神的緊張や怒りで胃痛・下痢・消化停止が起こるのは、木（肝）が土（脾胃）を乗する代表的臨床病態です。"
    },
    soubu: {
      name: "④ 相侮（そうぶ）｜ 逆流・異常反発",
      en: "Counter-acting (Reverse Restriction / Rebellion)",
      badgeColor: "bg-[#F57F17] text-white",
      formula: "本来制約される側が強すぎて、逆に相手をやり込める",
      clinicalRule: "「侮（あなど）る：子の反乱・逆相剋」",
      summary: "被制約側が異常に強大化するか制約側が極度に弱まり、本来の力関係が逆転して逆流する病態。肺（金）が弱くて肝（木）を抑えられず、肝火が肺を逆襲して激しい空咳や喀血を起こす『木侮金』など。",
      example: "木火刑金（怒りで顔を真っ赤にして激しく咳き込む）、土侮木（湿邪で膨張した脾胃が肝の巡りを邪魔する）。"
    },
    hiwa: {
      name: "⑤ 比和（ひわ）｜ 同質共鳴・安定調和",
      en: "Harmonious Resonance (Same Nature)",
      badgeColor: "bg-[#1A237E] text-white",
      formula: "同質同士が溶け合い、1 + 1 = 2 の安定した力を発揮",
      clinicalRule: "「同気相求む：適度なら安定、過剰なら同種過多の偏り」",
      summary: "似た性質の要素同士が手を取り合い、調和を保つ関係。ただし同種の気が過剰になりすぎると（例：熱に熱が重なる）、かえって火盛・燥熱の偏りを招くため中庸が必要です。",
      example: "木と木、火と火の連動。春に肝の気を養う適度な木気の補充など。"
    }
  };

  const current = relationDetails[activeRelation];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：五行の5大相互関係ダイナミック相関チャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            生剋乗侮・比和 ── 生命ネットワークを自律制御する力学モデル
          </h4>
        </div>

        {/* 5関係切り替えタブ */}
        <div className="flex flex-wrap items-center gap-1 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs">
          <button
            onClick={() => setActiveRelation("sousei")}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeRelation === "sousei" ? "bg-[#2E7D32] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            相生（促進）
          </button>
          <button
            onClick={() => setActiveRelation("soukoku")}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeRelation === "soukoku" ? "bg-[#C62828] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            相剋（抑制）
          </button>
          <button
            onClick={() => setActiveRelation("soujou")}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeRelation === "soujou" ? "bg-[#7C3AED] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            相乗（過剰）
          </button>
          <button
            onClick={() => setActiveRelation("soubu")}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeRelation === "soubu" ? "bg-[#F57F17] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            相侮（逆流）
          </button>
          <button
            onClick={() => setActiveRelation("hiwa")}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeRelation === "hiwa" ? "bg-[#1A237E] text-white shadow-xs" : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            比和（調和）
          </button>
        </div>
      </div>

      {/* 相関チャートSVG ＋ 詳細パネル */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6 sm:p-8">
        {/* 左側：SVG五行相関ダイアグラム */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[320px] aspect-square">
            <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-sm">
              <defs>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#2E7D32" />
                </marker>
                <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#C62828" />
                </marker>
                <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#7C3AED" />
                </marker>
                <marker id="arrow-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#F57F17" />
                </marker>
              </defs>

              {/* 5つの座標点：火(160, 45)、土(265, 125)、金(225, 250)、水(95, 250)、木(55, 125) */}

              {/* ① 相生の外周円環矢印 */}
              <g opacity={activeRelation === "sousei" ? "1" : "0.2"} className="transition-opacity duration-300">
                {/* 木 -> 火 */}
                <path d="M 75 110 Q 100 65 135 50" fill="none" stroke="#2E7D32" strokeWidth={activeRelation === "sousei" ? "3.5" : "1.5"} markerEnd="url(#arrow-green)" />
                {/* 火 -> 土 */}
                <path d="M 185 50 Q 220 65 245 110" fill="none" stroke="#C62828" strokeWidth={activeRelation === "sousei" ? "3.5" : "1.5"} markerEnd="url(#arrow-green)" />
                {/* 土 -> 金 */}
                <path d="M 260 150 Q 260 205 235 230" fill="none" stroke="#F57F17" strokeWidth={activeRelation === "sousei" ? "3.5" : "1.5"} markerEnd="url(#arrow-green)" />
                {/* 金 -> 水 */}
                <path d="M 200 255 Q 160 270 120 255" fill="none" stroke="#78909C" strokeWidth={activeRelation === "sousei" ? "3.5" : "1.5"} markerEnd="url(#arrow-green)" />
                {/* 水 -> 木 */}
                <path d="M 85 230 Q 60 205 60 150" fill="none" stroke="#1A237E" strokeWidth={activeRelation === "sousei" ? "3.5" : "1.5"} markerEnd="url(#arrow-green)" />
              </g>

              {/* ② 相剋の内側星型矢印 */}
              <g opacity={activeRelation === "soukoku" ? "1" : "0.2"} className="transition-opacity duration-300">
                {/* 木 -> 土 */}
                <line x1="75" y1="130" x2="240" y2="130" stroke="#C62828" strokeWidth={activeRelation === "soukoku" ? "3" : "1.5"} markerEnd="url(#arrow-red)" />
                {/* 土 -> 水 */}
                <line x1="250" y1="145" x2="115" y2="240" stroke="#C62828" strokeWidth={activeRelation === "soukoku" ? "3" : "1.5"} markerEnd="url(#arrow-red)" />
                {/* 水 -> 火 */}
                <line x1="105" y1="230" x2="150" y2="68" stroke="#C62828" strokeWidth={activeRelation === "soukoku" ? "3" : "1.5"} markerEnd="url(#arrow-red)" />
                {/* 火 -> 金 */}
                <line x1="170" y1="68" x2="215" y2="230" stroke="#C62828" strokeWidth={activeRelation === "soukoku" ? "3" : "1.5"} markerEnd="url(#arrow-red)" />
                {/* 金 -> 木 */}
                <line x1="205" y1="240" x2="70" y2="145" stroke="#C62828" strokeWidth={activeRelation === "soukoku" ? "3" : "1.5"} markerEnd="url(#arrow-red)" />
              </g>

              {/* ③ 相乗：太い二重矢印（木乗土の強調例） */}
              {activeRelation === "soujou" && (
                <g>
                  <line x1="75" y1="125" x2="240" y2="125" stroke="#7C3AED" strokeWidth="5" markerEnd="url(#arrow-purple)" />
                  <line x1="75" y1="135" x2="240" y2="135" stroke="#7C3AED" strokeWidth="3" strokeDasharray="3 2" />
                  <text x="160" y="115" textAnchor="middle" fill="#7C3AED" fontSize="10" fontWeight="bold">相乗（過剰抑制）</text>
                </g>
              )}

              {/* ④ 相侮：逆向き破線矢印（土侮木・金侮火などの強調例） */}
              {activeRelation === "soubu" && (
                <g>
                  <line x1="240" y1="130" x2="75" y2="130" stroke="#F57F17" strokeWidth="3.5" strokeDasharray="5 3" markerEnd="url(#arrow-orange)" />
                  <text x="160" y="150" textAnchor="middle" fill="#F57F17" fontSize="10" fontWeight="bold">相侮（逆流・反乱）</text>
                </g>
              )}

              {/* ⑤ 比和：同心円 */}
              {activeRelation === "hiwa" && (
                <g>
                  <circle cx="160" cy="160" r="45" fill="none" stroke="#1A237E" strokeWidth="2.5" strokeDasharray="4 4" className="dark:stroke-[#9FA8DA]" />
                  <circle cx="160" cy="160" r="25" fill="#E8EAF6" opacity="0.6" className="dark:fill-[#283593]/40" />
                  <text x="160" y="164" textAnchor="middle" fill="#1A237E" fontSize="10" fontWeight="bold" className="dark:fill-[#9FA8DA]">同気共鳴</text>
                </g>
              )}

              {/* 5大ノード本体 */}
              {/* 火：上 */}
              <circle cx="160" cy="45" r="22" fill="#C62828" />
              <text x="160" y="50" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">火</text>

              {/* 土：右上 */}
              <circle cx="265" cy="125" r="22" fill="#F57F17" />
              <text x="265" y="130" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">土</text>

              {/* 金：右下 */}
              <circle cx="225" cy="250" r="22" fill="#78909C" />
              <text x="225" y="255" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">金</text>

              {/* 水：左下 */}
              <circle cx="95" cy="250" r="22" fill="#1A237E" />
              <text x="95" y="255" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">水</text>

              {/* 木：左上 */}
              <circle cx="55" cy="125" r="22" fill="#2E7D32" />
              <text x="55" y="130" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">木</text>
            </svg>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-2 text-center">
            外周の円環＝相生（生かす） ／ 内側の星型＝相剋（制する）
          </span>
        </div>

        {/* 右側：選択された関係の詳しい解説 */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${current.badgeColor}`}>
                {current.name.split("｜")[0]}
              </span>
            </div>
            <h5 className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
              {current.formula}
            </h5>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {current.summary}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#15202B] border-l-4 border-[#1E3D34] dark:border-[#74BA9E] text-xs space-y-1">
            <strong className="text-[#1E3D34] dark:text-[#74BA9E] block">
              【臨床処方の鉄則・法則】
            </strong>
            <p className="text-[#404743] dark:text-[#C5D2DB] font-mono text-[11px]">
              {current.clinicalRule}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A2530] border border-[#E8E1D1] dark:border-[#2A3B4A] text-xs space-y-1">
            <strong className="text-[#B86924] dark:text-[#E6C387] block">
              【具体的な身体の連動例】
            </strong>
            <p className="text-[#59615D] dark:text-[#96A6B2] text-[11px] leading-relaxed">
              {current.example}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
