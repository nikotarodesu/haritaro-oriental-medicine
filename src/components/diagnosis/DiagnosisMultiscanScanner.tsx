"use client";

import React, { useState } from "react";
import { Sparkles, Scan, Eye, Ear, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

export default function DiagnosisMultiscanScanner() {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const layers = [
    {
      layer: 1,
      name: "Layer 1：全体像（神気の有無・形気の一致）",
      target: "体格・姿勢・生命の輝き（有神 vs 失神）",
      checkPoints: [
        "目力：瞳に輝きと落ち着きがあるか（有神＝予後良好、失神＝深部消耗）",
        "肉体と気迫の一致：恰幅が良いのに動作が緩慢（形盛気虚）、痩せ型なのに眼光鋭い（陰虚火旺）",
        "起居の動作：椅子に座るときの脱力感、呼吸の深浅",
      ],
      desc: "細部を見る前に、生体全体のバッテリー残量と中枢の覚醒度を無意識レベルでスキャンする最広角レンズ。",
      color: "#1E3D34",
    },
    {
      layer: 2,
      name: "Layer 2：五色（顔色・皮膚トーンのスキャン）",
      target: "青・赤・黄・白・黒の五色鑑別",
      checkPoints: [
        "青（肝）：気滞・疼痛・驚風（青筋が立つ・顔色が青黒い）",
        "赤（心）：熱証・炎症（顔面紅潮・頬の毛細血管拡張）",
        "黄（脾）：湿証・脾虚（黄色くツヤがない・土色・黄疸）",
        "白（肺）：虚証・寒証・血虚（蒼白・ツヤのない紙のような白）",
        "黒（腎）：腎虚・瘀血・重篤（目の下のクマ・皮膚の黒ずみ）",
      ],
      desc: "毛細血管の血流とヘモグロビン量、メラニン沈着から五臓の代謝バランスを色彩情報として読み取る。",
      color: "#B86924",
    },
    {
      layer: 3,
      name: "Layer 3：動態と音（聴覚・運動機能スキャン）",
      target: "声の張りとトーン・呼吸音・歩行リズム",
      checkPoints: [
        "声のボリューム：話す声が太く大きい（実証） vs 消え入りそうで小さい（気虚）",
        "呼吸音：喘鳴や荒い呼吸（実熱） vs 弱々しく浅い呼吸（肺腎気虚）",
        "歩行と足取り：ドスドスと重い足音（湿・重濁） vs すり足・ふらつき（腎虚・脱力）",
      ],
      desc: "聞診（聴覚）を連動させ、気機の推動力と三焦の開通度を力学的・音響学的に判定する。",
      color: "#0288D1",
    },
    {
      layer: 4,
      name: "Layer 4：局所（舌診・目・爪・唇のミクロ所見）",
      target: "舌質・舌苔・粘膜の直接観察",
      checkPoints: [
        "舌質の色：淡白（気血虚）／ 淡紅（正常）／ 紅・絳（熱証）／ 暗紫（瘀血）",
        "舌苔の厚さと色：白苔（寒・表）／ 黄苔（熱・裏）／ 膩苔（粘り・痰湿）／ 剥落苔（胃陰枯渇）",
        "舌下静脈：怒張・黒ずみ（胸腹部・骨盤内の高度瘀血）",
      ],
      desc: "消化管粘膜の露出部である「舌」は、内臓の寒熱虚実を最も嘘偽りなく投影する液晶ディスプレイ。",
      color: "#D32F2F",
    },
  ];

  const current = layers.find((l) => l.layer === activeLayer)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：望診・聞診の多層スキャナー図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            感覚のノイズを排し、全体から局所へ ── 4層のスキャンフィルター処理
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          レイヤーを選んでスキャン項目を確認
        </span>
      </div>

      {/* レイヤーセレクター（4段階） */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {layers.map((l) => {
          const isSelected = activeLayer === l.layer;
          return (
            <button
              key={l.layer}
              onClick={() => setActiveLayer(l.layer)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#121920] shadow-sm border-2 ring-1 scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? l.color : undefined,
              }}
            >
              <div className="text-[10px] font-bold text-[#8C9691] dark:text-[#64748B] mb-0.5">
                FILTER 0{l.layer}
              </div>
              <div className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                {l.name.split("（")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたレイヤーの詳細 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE4D5] dark:border-[#22303D] pb-3">
          <div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              スキャン対象：{current.target}
            </span>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              {current.name}
            </h5>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A]" style={{ color: current.color }}>
            深度ステップ 0{current.layer} / 04
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#D1D5DB] leading-relaxed">
          {current.desc}
        </p>

        {/* チェックポイント */}
        <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="font-bold text-xs text-[#1E3D34] dark:text-[#74BA9E] block mb-2 flex items-center gap-1.5">
            <Scan className="w-3.5 h-3.5" />
            スキャン時の具体的チェック項目：
          </span>
          <ul className="space-y-1.5 text-xs text-[#3E4541] dark:text-[#CBD5E1]">
            {current.checkPoints.map((cp, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] mt-1.5 shrink-0" />
                <span>{cp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 色脈一致と「矛盾抽出」ハイライトBOX */}
      <div className="bg-[#FFEBEE] dark:bg-[#D32F2F]/15 border-2 border-[#D32F2F] rounded-2xl p-5 text-xs">
        <div className="flex items-center gap-2 font-bold text-sm text-[#C62828] dark:text-[#EF5350] mb-2">
          <ShieldAlert className="w-5 h-5 text-[#D32F2F] shrink-0" />
          <span>臨床の核心：「色脈一致」よりも「不一致（矛盾）」を見逃すな！</span>
        </div>
        <p className="text-[#5D4037] dark:text-[#FFCDD2] leading-relaxed mb-3">
          望診や聞診で最も価値が高いのは、直感と検査結果が一致することではなく、<strong>「所見同士の矛盾（不一致）」</strong>に気づくことです。
        </p>
        <div className="p-3 bg-white dark:bg-[#17212A] rounded-xl border border-[#FFCDD2] dark:border-[#D32F2F]/40 space-y-1 text-[#232826] dark:text-[#FAF8F5]">
          <div className="font-bold text-[#D32F2F]">
            ⚠️ 【真寒仮熱（しんかんかねつ）の罠】：
          </div>
          <p className="leading-relaxed text-[11px] text-[#59615D] dark:text-[#CBD5E1]">
            「顔色が赤く、熱っぽい（熱・実に見える）」のに、「声が消え入りそうで、脈が沈んで微弱（寒・虚）」な場合。これは体内に熱があるのではなく、<strong>最深部の腎陽が消えかけ、最後の陽気が頭頂へ逃げ出している（浮陽）重篤な虚寒状態</strong>です。冷やす薬を出すと命取りになります。
          </p>
        </div>
      </div>
    </figure>
  );
}
