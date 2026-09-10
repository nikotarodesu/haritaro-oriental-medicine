"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Activity, Info, RefreshCw, Zap, ShieldAlert } from "lucide-react";

export type WuxingElementKey = "wood" | "fire" | "earth" | "metal" | "water";

interface WuxingData {
  key: WuxingElementKey;
  name: string;
  kanji: string;
  colorName: string;
  lightColor: string;
  darkColor: string;
  accentBgLight: string;
  accentBgDark: string;
  // 色体表
  zang: string; // 五臓
  fu: string; // 五腑
  emotion: string; // 五志
  taste: string; // 五味
  sense: string; // 五官
  tissue: string; // 五体
  season: string; // 季節
  nature: string; // 特性
  modernAnalogy: string; // 現代医学・情報モデルでの解釈
  clinicalNote: string; // 臨床での現れ方
  // 関係性
  generates: WuxingElementKey; // 我生（子を生む）
  generatedBy: WuxingElementKey; // 生我（母より生ず）
  controls: WuxingElementKey; // 我剋（制約する相手）
  controlledBy: WuxingElementKey; // 剋我（制約される相手）
  insults: WuxingElementKey; // 相侮（逆克する相手）
}

export const WUXING_ELEMENTS: Record<WuxingElementKey, WuxingData> = {
  wood: {
    key: "wood",
    name: "木",
    kanji: "木",
    colorName: "青磁・碧緑",
    lightColor: "#1E3D34",
    darkColor: "#74BA9E",
    accentBgLight: "#EBF3EF",
    accentBgDark: "#182823",
    zang: "肝（かん）",
    fu: "胆（たん）",
    emotion: "怒（怒り・イライラ・決断）",
    taste: "酸（すっぱい・収斂）",
    sense: "目（視覚・涙）",
    tissue: "筋（腱・筋緊張・自律神経）",
    season: "春（発芽・伸長・陽気の上昇）",
    nature: "曲直（枝葉が柔軟に伸びやかに広がる特性）",
    modernAnalogy: "中枢神経系の自律神経調整能、血管平滑筋のトーン、肝臓の代謝・解毒機能",
    clinicalNote: "ストレスや抑うつで『気滞』が起こると肝が昂ぶり（肝気鬱結）、頭痛・眼精疲労・月経不順・怒りっぽさが現れます。",
    generates: "fire",
    generatedBy: "water",
    controls: "earth",
    controlledBy: "metal",
    insults: "metal"
  },
  fire: {
    key: "fire",
    name: "火",
    kanji: "火",
    colorName: "朱・茜色",
    lightColor: "#A83629",
    darkColor: "#C47A72",
    accentBgLight: "#FDEDEC",
    accentBgDark: "#231816",
    zang: "心（しん）",
    fu: "小腸（しょうちょう）",
    emotion: "喜（喜び・興奮・過度な歓喜）",
    taste: "苦（にがい・清熱・瀉火）",
    sense: "舌（味覚・言語・顔色）",
    tissue: "脈（心血管系・血流循環）",
    season: "夏（繁茂・熱気・活動の極み）",
    nature: "炎上（熱が上方へ燃え上がる特性）",
    modernAnalogy: "心臓の拍出動態、大脳皮質・精神意識活動（神明）、体温産生",
    clinicalNote: "過労や精神緊張で『心火』が燃え盛ると、不眠・動悸・舌先の赤み・焦燥感・多夢が現れます。",
    generates: "earth",
    generatedBy: "wood",
    controls: "metal",
    controlledBy: "water",
    insults: "water"
  },
  earth: {
    key: "earth",
    name: "土",
    kanji: "土",
    colorName: "琥珀・黄土",
    lightColor: "#B86924",
    darkColor: "#E6C387",
    accentBgLight: "#FCF4EB",
    accentBgDark: "#2A2117",
    zang: "脾（ひ）",
    fu: "胃（い）",
    emotion: "思（思慮・思い悩み・反芻思考）",
    taste: "甘（あまい・滋養・緩和）",
    sense: "口（味覚・口唇・涎）",
    tissue: "肉（骨格筋・体幹・四肢の筋肉）",
    season: "土用・長夏（季節の変わり目・湿気）",
    nature: "稼穡（種をまき収穫する・万物を育む母体）",
    modernAnalogy: "消化吸収系、消化管ホルモン、腸内細菌叢、ミトコンドリアエネルギー産生",
    clinicalNote: "冷えや飲食不摂生、思い悩みすぎで『脾気虚』になると、食欲不振・胃もたれ・全身倦怠感・むくみが生じます。",
    generates: "metal",
    generatedBy: "fire",
    controls: "water",
    controlledBy: "wood",
    insults: "wood"
  },
  metal: {
    key: "metal",
    name: "金",
    kanji: "金",
    colorName: "白銀・藍鉄",
    lightColor: "#3F5668",
    darkColor: "#A0B0BC",
    accentBgLight: "#F0F4F8",
    accentBgDark: "#1C2630",
    zang: "肺（はい）",
    fu: "大腸（だいちょう）",
    emotion: "憂・悲（悲しみ・憂い・喪失感）",
    taste: "辛（からい・発散・行気）",
    sense: "鼻（嗅覚・呼吸・鼻水）",
    tissue: "皮毛（皮膚バリア・汗腺・体毛）",
    season: "秋（収斂・乾燥・気候の沈静）",
    nature: "従革（変革・粛降・不要なものを削ぎ落とす）",
    modernAnalogy: "呼吸器換気機能、皮膚粘膜バリア（自然免疫・IgA）、水分排泄コントロール",
    clinicalNote: "乾燥や悲嘆で『肺気』が損なわれると、咳・息切れ・皮膚の乾燥・便秘・風邪のひきやすさが現れます。",
    generates: "water",
    generatedBy: "earth",
    controls: "wood",
    controlledBy: "fire",
    insults: "fire"
  },
  water: {
    key: "water",
    name: "水",
    kanji: "水",
    colorName: "藍黒・玄色",
    lightColor: "#1E2D3D",
    darkColor: "#7BAAD8",
    accentBgLight: "#EDF3F8",
    accentBgDark: "#172330",
    zang: "腎（じん）",
    fu: "膀胱（ぼうこう）",
    emotion: "恐・驚（恐怖・驚き・不安）",
    taste: "鹹（しおからい・軟堅）",
    sense: "耳・二陰（聴覚・生殖器・排泄孔）",
    tissue: "骨・髄（骨格・歯・脳・脊髄）",
    season: "冬（閉蔵・潜伏・生命力の蓄積）",
    nature: "潤下（下方へ潤し流れる・冷やす特性）",
    modernAnalogy: "副腎皮質・髄質機能（HPA軸）、体液電解質調整（腎機能）、生殖内分泌系、遺伝情報",
    clinicalNote: "加齢や過労で『腎精』が衰えると、腰痛・耳鳴り・難聴・骨粗鬆症・極度の冷えや頻尿が生じます。",
    generates: "wood",
    generatedBy: "metal",
    controls: "fire",
    controlledBy: "earth",
    insults: "earth"
  }
};

// 五角形のノード座標（中心 260, 190、半径 130）
// 木(左上), 火(上), 土(右上), 金(右下), 水(左下)
const NODE_COORDS: Record<WuxingElementKey, { x: number; y: number; label: string }> = {
  wood: { x: 136, y: 150, label: "木" },
  fire: { x: 260, y: 60, label: "火" },
  earth: { x: 384, y: 150, label: "土" },
  metal: { x: 337, y: 295, label: "金" },
  water: { x: 183, y: 295, label: "水" }
};

type ViewMode = "all" | "sheng" | "ke" | "wu";

export default function WuxingDynamicChart() {
  const [selectedKey, setSelectedKey] = useState<WuxingElementKey>("wood");
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  const selected = WUXING_ELEMENTS[selectedKey];

  // 相生ペアリスト（順序付き: 木->火->土->金->水->木）
  const SHENG_PAIRS: [WuxingElementKey, WuxingElementKey][] = [
    ["wood", "fire"],
    ["fire", "earth"],
    ["earth", "metal"],
    ["metal", "water"],
    ["water", "wood"]
  ];

  // 相剋ペアリスト（星型: 木->土->水->火->金->木）
  const KE_PAIRS: [WuxingElementKey, WuxingElementKey][] = [
    ["wood", "earth"],
    ["earth", "water"],
    ["water", "fire"],
    ["fire", "metal"],
    ["metal", "wood"]
  ];

  return (
    <div className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors">
      {/* コンポーネントヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
            <span>五行論ダイナミック・インタラクティブチャート</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            五行相関動態と生克乗侮（複雑適応ネットワーク）
          </h3>
        </div>

        {/* 表示モード切り替えタブ */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#22303D] text-xs">
          <button
            onClick={() => setViewMode("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "all"
                ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-white"
            }`}
          >
            総合動態
          </button>
          <button
            onClick={() => setViewMode("sheng")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "sheng"
                ? "bg-[#1E3D34] dark:bg-[#2B6958] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-white"
            }`}
          >
            相生（促進・母子）
          </button>
          <button
            onClick={() => setViewMode("ke")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "ke"
                ? "bg-[#B86924] dark:bg-[#C98A44] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-white"
            }`}
          >
            相剋（抑制・制御）
          </button>
          <button
            onClick={() => setViewMode("wu")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "wu"
                ? "bg-[#A83629] dark:bg-[#B8675E] text-white shadow-sm"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-white"
            }`}
          >
            相侮（逆相剋・病態）
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* 左側：SVG インタラクティブチャート（5カラム） */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-[520/400] select-none">
            <svg
              viewBox="0 0 520 400"
              className="w-full h-full overflow-visible drop-shadow-sm"
            >
              <defs>
                {/* 矢印マーカー（通常相生：緑系） */}
                <marker
                  id="arrow-sheng-normal"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#8899A6" opacity="0.6" />
                </marker>
                {/* 矢印マーカー（アクティブ相生：鮮やか緑） */}
                <marker
                  id="arrow-sheng-active"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4E8C76" />
                </marker>
                {/* 矢印マーカー（通常相剋：琥珀系） */}
                <marker
                  id="arrow-ke-normal"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#8899A6" opacity="0.4" />
                </marker>
                {/* 矢印マーカー（アクティブ相剋：黄金） */}
                <marker
                  id="arrow-ke-active"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86924" />
                </marker>
                {/* 矢印マーカー（相侮：茜色・警告） */}
                <marker
                  id="arrow-wu-active"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C47A72" />
                </marker>

                {/* 選択ノードのパルスグロー */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 外周円：相生ライン（円環パス） */}
              <circle
                cx="260"
                cy="190"
                r="135"
                fill="none"
                stroke="#E5DEC9"
                strokeWidth="1"
                className="dark:stroke-[#2A3B4A]"
                strokeDasharray="4 4"
              />

              {/* 1. 相生（外周矢印） */}
              {SHENG_PAIRS.map(([from, to], i) => {
                const p1 = NODE_COORDS[from];
                const p2 = NODE_COORDS[to];
                const isSelectedFrom = selectedKey === from;
                const isSelectedTo = selectedKey === to;
                const isActive = (isSelectedFrom || isSelectedTo) && (viewMode === "all" || viewMode === "sheng");
                const isDimmed = viewMode === "ke" || viewMode === "wu";

                // 円弧補間
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                // 中心(260, 190)から外向きにカーブ
                const dx = midX - 260;
                const dy = midY - 190;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const bulge = 25;
                const cx = midX + (dx / dist) * bulge;
                const cy = midY + (dy / dist) * bulge;

                return (
                  <g key={`sheng-${i}`}>
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke={isActive ? "#4E8C76" : "#A0B0BC"}
                      strokeWidth={isActive ? "3.5" : "1.5"}
                      strokeDasharray={isActive ? "6 3" : undefined}
                      opacity={isDimmed ? 0.15 : isActive ? 1 : 0.4}
                      markerEnd={isActive ? "url(#arrow-sheng-active)" : "url(#arrow-sheng-normal)"}
                      className={isActive ? "animate-pulse" : "transition-all"}
                    />
                  </g>
                );
              })}

              {/* 2. 相剋（内側星型矢印） */}
              {KE_PAIRS.map(([from, to], i) => {
                const p1 = NODE_COORDS[from];
                const p2 = NODE_COORDS[to];
                const isSelectedFrom = selectedKey === from;
                const isSelectedTo = selectedKey === to;
                const isActive = (isSelectedFrom || isSelectedTo) && (viewMode === "all" || viewMode === "ke");
                const isDimmed = viewMode === "sheng" || viewMode === "wu";

                return (
                  <g key={`ke-${i}`}>
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={isActive ? "#B86924" : "#8899A6"}
                      strokeWidth={isActive ? "3" : "1.2"}
                      opacity={isDimmed ? 0.15 : isActive ? 1 : 0.35}
                      markerEnd={isActive ? "url(#arrow-ke-active)" : "url(#arrow-ke-normal)"}
                      className={isActive ? "animate-pulse" : "transition-all"}
                    />
                  </g>
                );
              })}

              {/* 3. 相侮（選択要素が相侮を起こす逆ベクトル矢印） */}
              {viewMode === "wu" && (
                (() => {
                  const targetKey = selected.insults;
                  const from = NODE_COORDS[selectedKey];
                  const to = NODE_COORDS[targetKey];
                  return (
                    <g key="wu-active">
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="#C47A72"
                        strokeWidth="3.5"
                        strokeDasharray="4 2"
                        markerEnd="url(#arrow-wu-active)"
                        className="animate-pulse"
                      />
                    </g>
                  );
                })()
              )}

              {/* 五行ノード（木・火・土・金・水） */}
              {(Object.keys(NODE_COORDS) as WuxingElementKey[]).map((key) => {
                const node = NODE_COORDS[key];
                const data = WUXING_ELEMENTS[key];
                const isSelected = selectedKey === key;
                const isMother = selected.generatedBy === key;
                const isChild = selected.generates === key;
                const isOvercomee = selected.controls === key;
                const isOvercomer = selected.controlledBy === key;

                return (
                  <g
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className="cursor-pointer group"
                  >
                    {/* 外周ハイライトリング */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="34"
                        fill="none"
                        stroke={data.darkColor}
                        strokeWidth="3"
                        strokeDasharray="5 3"
                        className="animate-spin"
                        style={{ animationDuration: "12s" }}
                      />
                    )}

                    {/* ノード本体円 */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="26"
                      fill={isSelected ? (key === "wood" ? "#1E3D34" : key === "fire" ? "#A83629" : key === "earth" ? "#B86924" : key === "metal" ? "#3F5668" : "#1E2D3D") : "#FAF8F5"}
                      stroke={isSelected ? data.darkColor : "#D5CCBC"}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="dark:stroke-[#3A4B5A] group-hover:scale-105 transition-transform"
                    />

                    {/* 漢字 */}
                    <text
                      x={node.x}
                      y={node.y + 7}
                      textAnchor="middle"
                      className={`font-serif text-lg font-bold pointer-events-none transition-colors ${
                        isSelected
                          ? "fill-white"
                          : "fill-[#232826] dark:fill-[#FAF8F5] group-hover:fill-[#1E3D34] dark:group-hover:fill-[#74BA9E]"
                      }`}
                    >
                      {data.kanji}
                    </text>

                    {/* ノード下部/上部ラベル（臓腑名） */}
                    <text
                      x={node.x}
                      y={node.y > 190 ? node.y + 44 : node.y - 34}
                      textAnchor="middle"
                      className="text-[11px] font-bold fill-[#59615D] dark:fill-[#C5D2DB] pointer-events-none"
                    >
                      {data.zang.split("（")[0]}・{data.fu.split("（")[0]}
                    </text>

                    {/* 選択要素に対する役割バッジ */}
                    {isSelected && (
                      <text
                        x={node.x}
                        y={node.y > 190 ? node.y + 57 : node.y - 47}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-[#B86924] dark:fill-[#E6C387] pointer-events-none"
                      >
                        ● 選択中
                      </text>
                    )}
                    {!isSelected && isMother && (viewMode === "all" || viewMode === "sheng") && (
                      <text
                        x={node.x}
                        y={node.y > 190 ? node.y + 57 : node.y - 47}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-[#4E8C76] pointer-events-none"
                      >
                        ↑ 生我（母）
                      </text>
                    )}
                    {!isSelected && isChild && (viewMode === "all" || viewMode === "sheng") && (
                      <text
                        x={node.x}
                        y={node.y > 190 ? node.y + 57 : node.y - 47}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-[#4E8C76] pointer-events-none"
                      >
                        ↓ 我生（子）
                      </text>
                    )}
                    {!isSelected && isOvercomee && (viewMode === "all" || viewMode === "ke") && (
                      <text
                        x={node.x}
                        y={node.y > 190 ? node.y + 57 : node.y - 47}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-[#B86924] pointer-events-none"
                      >
                        × 我剋（所勝）
                      </text>
                    )}
                    {!isSelected && isOvercomer && (viewMode === "all" || viewMode === "ke") && (
                      <text
                        x={node.x}
                        y={node.y > 190 ? node.y + 57 : node.y - 47}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-[#B86924] pointer-events-none"
                      >
                        × 剋我（所不勝）
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center mt-3">
            ※ 上の要素（木・火・土・金・水）をタップすると、生剋関係と五行色体表が連動して切り替わります。
          </p>
        </div>

        {/* 右側：選択要素の連動詳細パネル（6カラム） */}
        <div className="lg:col-span-6 space-y-5 bg-[#FAF8F5] dark:bg-[#121920] p-6 sm:p-7 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
          {/* 選択要素のヘッダー */}
          <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3.5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl text-white font-serif font-bold text-xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: selected.lightColor }}
              >
                {selected.kanji}
              </div>
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  【{selected.name}】の特性と生体配当
                </h4>
                <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
                  象徴：{selected.nature} / 伝統色：{selected.colorName}
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-bold">
              {selected.season}
            </span>
          </div>

          {/* 生克ダイナミクス関係性バッジ */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#59615D] dark:text-[#96A6B2] block">
              【{selected.name}】を軸とするネットワーク動態:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4E8C76]" />
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">生我（母）:</span>
                <span>{WUXING_ELEMENTS[selected.generatedBy].name}（{WUXING_ELEMENTS[selected.generatedBy].zang.split("（")[0]}）</span>
              </div>
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4E8C76]" />
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">我生（子）:</span>
                <span>{WUXING_ELEMENTS[selected.generates].name}（{WUXING_ELEMENTS[selected.generates].zang.split("（")[0]}）</span>
              </div>
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B86924]" />
                <span className="font-bold text-[#B86924] dark:text-[#E6C387]">剋我（所不勝）:</span>
                <span>{WUXING_ELEMENTS[selected.controlledBy].name}（{WUXING_ELEMENTS[selected.controlledBy].zang.split("（")[0]}）</span>
              </div>
              <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B86924]" />
                <span className="font-bold text-[#B86924] dark:text-[#E6C387]">我剋（所勝）:</span>
                <span>{WUXING_ELEMENTS[selected.controls].name}（{WUXING_ELEMENTS[selected.controls].zang.split("（")[0]}）</span>
              </div>
            </div>

            {viewMode === "wu" && (
              <div className="bg-[#FDEDEC] dark:bg-[#231816] p-3 rounded-xl border border-[#FADBD8] dark:border-[#3D2220] text-xs text-[#A83629] dark:text-[#C47A72] flex items-start gap-2 mt-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>相侮（逆克・反逆の病態）：</strong>
                  <p className="mt-0.5 text-[11px] leading-relaxed">
                    【{selected.name}】が過剰（実）になると、本来自分を制約するはずの【{WUXING_ELEMENTS[selected.insults].name}】を逆に侮って病態を引き起こします（例：木侮金＝肝火が強すぎて肺気を侵し咳や息切れを生む）。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 五行色体表グリッド（臓腑・感情・味・官・体） */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">五臓・五腑</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.zang} / {selected.fu}
              </strong>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">五志（感情・心理）</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.emotion}
              </strong>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">五味（味覚・薬膳）</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.taste}
              </strong>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">五官（感覚器）</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.sense}
              </strong>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">五体（組織・支配領域）</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.tissue}
              </strong>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">季節・気候</span>
              <strong className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5] block mt-0.5">
                {selected.season}
              </strong>
            </div>
          </div>

          {/* 現代医学的解釈と臨床への応用 */}
          <div className="space-y-2 pt-1 text-xs">
            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
              <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>現代科学・システム医学でのアナロジー</span>
              </span>
              <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {selected.modernAnalogy}
              </p>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1">
              <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床知見・病態の現れ方</span>
              </span>
              <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {selected.clinicalNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
