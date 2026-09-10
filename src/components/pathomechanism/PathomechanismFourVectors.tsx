"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

type VectorType = "excess-up" | "lack-down" | "excess-out" | "lack-in";

interface VectorData {
  id: VectorType;
  name: string;
  kana: string;
  vectorLabel: string;
  arrowDir: "up" | "down" | "out" | "in";
  color: string;
  bgLight: string;
  darkBg: string;
  mechanism: string;
  symptoms: string[];
  clinicalPrescription: string;
  keyAcupoints: string[];
}

const VECTORS: VectorData[] = [
  {
    id: "excess-up",
    name: "昇の過剰（気逆・上衝）",
    kana: "きぎゃく・じょうしょう",
    vectorLabel: "上向きの暴走（突き上げるエネルギー）",
    arrowDir: "up",
    color: "#D32F2F",
    bgLight: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]",
    darkBg: "dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
    mechanism: "肝気や胃気が本来下降すべきルートを外れ、頭部や胸郭へ激しく突き上げる病理。交感神経の過剰暴走に相当。",
    symptoms: ["激しい偏頭痛・頭重感", "顔面紅潮・目の充血・のぼせ", "悪心・嘔吐・激しいしゃっくり", "突発的なイライラ・怒り・動悸"],
    clinicalPrescription: "降気・鎮肝熄風（四逆散、半夏厚朴湯、旋覆代赭湯）",
    keyAcupoints: ["太衝（たいしょう）", "内関（ないかん）", "百会（ひゃくえ）"],
  },
  {
    id: "lack-down",
    name: "降の不足（通降不全・気滞）",
    kana: "つうこうふぜん・きたい",
    vectorLabel: "下向きの閉塞（降りるべきものが詰まる）",
    arrowDir: "down",
    color: "#E65100",
    bgLight: "bg-[#FFF3E0] text-[#BF360C] border-[#FFCC80]",
    darkBg: "dark:bg-[#E65100]/20 dark:text-[#FFB74D]",
    mechanism: "胃の降濁や肺の粛降が停止し、中焦から下焦へ飲食物や老廃物が降りていかない病理。胃腸蠕動麻痺や便秘の根本原因。",
    symptoms: ["食後の強い胃もたれ・心下痞硬", "激しい腹部膨満感・ガス溜まり", "頑固な弛緩性便秘", "ゲップ・胃酸逆流（呑酸）"],
    clinicalPrescription: "通降胃腸・理気行滞（大柴胡湯、調胃承気湯、六君子湯）",
    keyAcupoints: ["中脘（ちゅうかん）", "天枢（てんすう）", "足三里（あしさんり）"],
  },
  {
    id: "excess-out",
    name: "出の過剰（漏脱・気脱）",
    kana: "ろうだつ・きだつ",
    vectorLabel: "外向きの漏れ（防御壁の底抜け）",
    arrowDir: "out",
    color: "#0288D1",
    bgLight: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC]",
    darkBg: "dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
    mechanism: "気の「固摂作用（体液を留める力）」が衰え、エネルギーや水分が体外へ無秩序にダダ漏れする病理。バッテリーの液漏れ。",
    symptoms: ["自汗（動かなくても汗が吹き出る）", "慢性の泥状便・水様下痢", "不正性器出血・月経過多", "頻尿・失禁・夢精・遺精"],
    clinicalPrescription: "固表止汗・益気固脱（玉屏風散、補中益気湯、当帰六黄湯）",
    keyAcupoints: ["復溜（ふくりゅう）", "関元（かんげん）", "気海（きかい）"],
  },
  {
    id: "lack-in",
    name: "入の不足（収蔵不全・気虚）",
    kana: "しゅうぞうふぜん・ききょ",
    vectorLabel: "内向きの拒絶（深部へ充電できない）",
    arrowDir: "in",
    color: "#7B1FA2",
    bgLight: "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]",
    darkBg: "dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8]",
    mechanism: "呼吸や飲食物からの精気を腎・骨髄という深層バンクに納める力（腎の納気・封蔵）が失われ、常にエネルギーが表面で浮遊して枯渇する病理。",
    symptoms: ["浅い呼吸・吸気困難（息が深く吸えない）", "夜間に眠れず頭が冴える（浮陽）", "慢性疲労・朝起き上がれない", "耳鳴り・難聴・足腰の脱力"],
    clinicalPrescription: "補腎納気・滋陰潜陽（八味地黄丸、六味丸、参茸固本丸）",
    keyAcupoints: ["太渓（たいけい）", "照海（しょうかい）", "命門（めいもん）"],
  },
];

export default function PathomechanismFourVectors() {
  const [selectedVector, setSelectedVector] = useState<VectorType>("excess-up");
  const current = VECTORS.find((v) => v.id === selectedVector)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：気機の昇降出入・四方向ベクトル破綻図（Four Vector Pathodynamics）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            昇・降・出・入の偏位 ── あらゆる病理のプロトタイプとなる4大ベクトル崩壊
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          ベクトルを選択して詳細を展開
        </span>
      </div>

      {/* 4つのベクトルカードセレクター */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {VECTORS.map((v) => {
          const isSelected = selectedVector === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelectedVector(v.id)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#121920] shadow-sm border-2 ring-1 scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? v.color : undefined,
              }}
            >
              <div className="text-[10px] font-bold mb-1" style={{ color: v.color }}>
                {v.vectorLabel.split("（")[0]}
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5]">
                {v.name.split("（")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* メインビュー：4方向ダイアグラムSVG ＆ 詳細解説 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7">
        {/* 左側：四方向ベクトルSVG */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-square">
            <svg viewBox="0 0 280 280" className="w-full h-full">
              {/* 中心円（中焦・気機のハブ） */}
              <circle cx="140" cy="140" r="36" fill="#FFF8E1" stroke="#FFA000" strokeWidth="2.5" className="dark:fill-[#33220A]" />
              <text x="140" y="138" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B86924" className="dark:fill-[#FFE082]">
                中焦（脾胃）
              </text>
              <text x="140" y="152" textAnchor="middle" fontSize="9" fill="#737C77">
                気機の回転軸
              </text>

              {/* 上向き矢印（昇の過剰） */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedVector("excess-up")}
                opacity={selectedVector === "excess-up" ? 1 : 0.4}
              >
                <path d="M 140 100 L 140 30" stroke="#D32F2F" strokeWidth={selectedVector === "excess-up" ? "6" : "3"} strokeLinecap="round" />
                <polygon points="140,15 130,35 150,35" fill="#D32F2F" />
                <text x="140" y="10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#D32F2F">
                  ▲ 昇の過剰（気逆）
                </text>
              </g>

              {/* 下向き矢印（降の不足） */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedVector("lack-down")}
                opacity={selectedVector === "lack-down" ? 1 : 0.4}
              >
                <path d="M 140 180 L 140 240" stroke="#E65100" strokeWidth={selectedVector === "lack-down" ? "6" : "3"} strokeDasharray="4 2" strokeLinecap="round" />
                <polygon points="140,255 130,235 150,235" fill="#E65100" />
                <text x="140" y="272" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E65100">
                  ▼ 降の不足（便秘・胃滞）
                </text>
              </g>

              {/* 外向き矢印（出の過剰） */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedVector("excess-out")}
                opacity={selectedVector === "excess-out" ? 1 : 0.4}
              >
                <path d="M 180 140 L 240 140" stroke="#0288D1" strokeWidth={selectedVector === "excess-out" ? "6" : "3"} strokeLinecap="round" />
                <polygon points="255,140 235,130 235,150" fill="#0288D1" />
                <text x="235" y="165" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0288D1">
                  ▶ 出の過剰（漏脱）
                </text>
              </g>

              {/* 内向き矢印（入の不足） */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedVector("lack-in")}
                opacity={selectedVector === "lack-in" ? 1 : 0.4}
              >
                <path d="M 40 140 L 95 140" stroke="#7B1FA2" strokeWidth={selectedVector === "lack-in" ? "6" : "3"} strokeDasharray="4 2" strokeLinecap="round" />
                <polygon points="102,140 85,130 85,150" fill="#7B1FA2" />
                <text x="45" y="165" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7B1FA2">
                  ◀ 入の不足（非充電）
                </text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-2 text-center">
            4方向の矢印をクリックして病態を切り替え
          </span>
        </div>

        {/* 右側：選択されたベクトルの詳細カード */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: current.color }} />
                {current.name}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${current.bgLight} ${current.darkBg}`}>
                {current.vectorLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#D1D5DB] leading-relaxed">
              {current.mechanism}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* 典型症状 */}
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <span className="font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                現れる自覚症状・サイン：
              </span>
              <ul className="space-y-1 text-[#3E4541] dark:text-[#CBD5E1]">
                {current.symptoms.map((s, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 治療・処方とツボ */}
            <div className="bg-white dark:bg-[#17212A] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
              <div>
                <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                  治療方針・代表処方：
                </span>
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  {current.clinicalPrescription}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <span className="text-[#8C9691] dark:text-[#64748B] block text-[10px]">
                  ベクトル是正のツボ：
                </span>
                <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {current.keyAcupoints.join("、")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
