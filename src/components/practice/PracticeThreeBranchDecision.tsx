"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitBranch,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Sliders,
} from "lucide-react";

interface DecisionTreeItem {
  id: string;
  title: string;
  state: string;
  theme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
  clinicalInterpretation: string;
  actionProtocol: string;
  nextPrescription: string;
}

const TREE_ITEMS: DecisionTreeItem[] = [
  {
    id: "effective",
    title: "ルート①：有効（症状軽快・脈腹改善）",
    state: "仮説と生体応答が完全整合",
    theme: {
      bg: "bg-[#E8F5E9] dark:bg-[#132A1C]",
      border: "border-[#2E7D32] dark:border-[#74BA9E]",
      text: "text-[#1E3D34] dark:text-[#74BA9E]",
      badge: "bg-[#2E7D32] text-white",
    },
    clinicalInterpretation: "選択した経絡・配穴・補瀉手技が、患者の生命システムの動的平衡とピタリと一致した状態。",
    actionProtocol: "欲張って余計なツボを追加しない。気至（得気）を確認した瞬間に抜鍼し、刺激量を最小限に留める。",
    nextPrescription: "現在の治則・配穴を維持。自己回復力が高まっているため、次回は置鍼時間を短縮するか細鍼へ移行。",
  },
  {
    id: "weak",
    title: "ルート②：反応薄（変化なし・持続しない）",
    state: "大枠は合っているが入力閾値に未達",
    theme: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      badge: "bg-[#FFA000] text-white",
    },
    clinicalInterpretation: "ツボの選定自体は間違っていないが、深さ・太さ・置鍼時間・施灸熱量などの「刺激総量」が生体の反応閾値に達していない。",
    actionProtocol: "安易にツボをあれこれ変えず、同一配穴のまま「刺入深度を3mm深める」「置鍼時間を5分延ばす」「透熱灸を3壮追加する」などドーゼを増量。",
    nextPrescription: "それでも反応が薄い場合のみ、ペアとなる表裏経（例：太陰経 ➜ 陽明経）へバイパスを切り替える。",
  },
  {
    id: "reset",
    title: "ルート③：悪化・不変の膠着",
    state: "弁証の根本的誤判定または過誤",
    theme: {
      bg: "bg-[#FFEBEE] dark:bg-[#2D1618]",
      border: "border-[#D32F2F] dark:border-[#EF5350]",
      text: "text-[#D32F2F] dark:text-[#EF5350]",
      badge: "bg-[#D32F2F] text-white",
    },
    clinicalInterpretation: "虚実の取り違え（実証に補法、虚証に強瀉法）、または寒熱の誤診（真寒仮熱への冷やし）。システムに逆行する介入を加えた状態。",
    actionProtocol: "小手先の微修正を諦め、自分のプライドを捨てて最初の問診（第1章の漏斗）から全面的にリセットする。",
    nextPrescription: "主訴の質感翻訳を再点検し、八綱座標（表裏・寒熱・虚実）をゼロから再構築して全く新しい治則を宣言する。",
  },
];

export default function PracticeThreeBranchDecision() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("effective");
  const current = TREE_ITEMS.find((item) => item.id === selectedRouteId) || TREE_ITEMS[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑦：三分岐フィードバックの意思決定ツリー（3-Way Decision Tree）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            施術結果に応じた3つの分岐ルートと動的自己修正
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#59615D] dark:text-[#96A6B2]">
          <GitBranch className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>DECISION LOGIC</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        術後の生体応答は「有効」「反応薄」「悪化」の3つに集約されます。
        優秀な施術者は、うまくいった時もいかなかった時も、あらかじめ定義された意思決定ツリーに従って論理的に次の一手を打ちます。
      </p>

      {/* 3つの分岐ボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {TREE_ITEMS.map((item) => {
          const isSelected = item.id === selectedRouteId;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedRouteId(item.id)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? `${item.theme.bg} ${item.theme.border} border-2 shadow-sm scale-[1.02]`
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-75 hover:opacity-100"
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.theme.badge}`}>
                {item.title.split("：")[0]}
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mt-2">
                {item.title.split("：")[1]}
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#CBD5E1] mt-1">
                {item.state}
              </p>
            </button>
          );
        })}
      </div>

      {/* 選択した分岐の意思決定詳細カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 space-y-4">
        <div className="pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
            {current.title}
          </h5>
          <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] mt-1 leading-relaxed">
            {current.clinicalInterpretation}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              【現場での即時アクション（Immediate Action）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {current.actionProtocol}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[10px] font-mono font-bold text-[#B86924] dark:text-[#E6C387] block">
              【次回の処方更新プラン（Next Prescription）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {current.nextPrescription}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
