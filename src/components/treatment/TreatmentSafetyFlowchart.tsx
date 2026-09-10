"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitFork,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Stethoscope,
} from "lucide-react";

interface DecisionBranch {
  id: string;
  label: string;
  icon: any;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
  hypothesisState: string;
  immediateAction: string;
  nextStep: string;
  patientExplanation: string;
}

const DECISION_BRANCHES: DecisionBranch[] = [
  {
    id: "improved",
    label: "① 改善（Improved）",
    icon: CheckCircle2,
    themeColor: {
      bg: "bg-[#E8F5E9] dark:bg-[#132A1C]",
      border: "border-[#2E7D32] dark:border-[#74BA9E]",
      text: "text-[#1E3D34] dark:text-[#74BA9E]",
      badge: "bg-[#2E7D32] text-white",
    },
    hypothesisState: "【仮説完全一致】弁証・治則・配穴・ドーゼがすべて正確。",
    immediateAction:
      "余計な追加刺激を入れず、速やかに抜鍼・終了。脈診・腹診の改善所見（脈が緩む、腹壁緊張の融解）を患者と共有。",
    nextStep:
      "現在の治則ベクトルを維持。次回は同一プロトコルをベースとし、回復度合いに応じて刺激量を微量減算（自己回復力へ委ねる）。",
    patientExplanation:
      "「お身体の循環ルートが正しく再開しました。今夜は無理せず早めに就寝し、好転の波を定着させてください。」",
  },
  {
    id: "unchanged",
    label: "② 不変（Unchanged）",
    icon: HelpCircle,
    themeColor: {
      bg: "bg-[#FFF8E1] dark:bg-[#2D2415]",
      border: "border-[#FFA000] dark:border-[#FFB300]",
      text: "text-[#B86924] dark:text-[#FFB300]",
      badge: "bg-[#FFA000] text-white",
    },
    hypothesisState: "【刺激量不足 または 経絡ルートのわずかなズレ】大枠の弁証は合っているが、生体の閾値に達していない。",
    immediateAction:
      "直ちに全否定せず、①経穴のミリ単位の再取穴、②留鍼時間の延長（5〜10分追加）、③背部兪穴や温灸などの補助刺激を追加。",
    nextStep:
      "それでも変化がなければ、ペアとなる表裏経（例：太陰肺経 ➜ 陽明大腸経）へバイパスルートを切り替える。",
    patientExplanation:
      "「深部の頑固な冷えや緊張がブロックを作っています。少し刺激の伝え方を切り替えて、身体が反応するスイートスポットを捉えます。」",
  },
  {
    id: "worsened",
    label: "③ 悪化（Worsened）",
    icon: AlertTriangle,
    themeColor: {
      bg: "bg-[#FFEBEE] dark:bg-[#2D1618]",
      border: "border-[#D32F2F] dark:border-[#EF5350]",
      text: "text-[#D32F2F] dark:text-[#EF5350]",
      badge: "bg-[#D32F2F] text-white",
    },
    hypothesisState: "【虚実・寒熱の判定ミス または 重大ドーゼオーバー】実証に補法、または虚証に強瀉をかけた誤治の可能性大。",
    immediateAction:
      "直ちに全鍼を抜去。気逆・のぼせ・悪心があれば足底（湧泉・太衝）を軽微に按圧して気を降ろす。安静臥床を保つ。",
    nextStep:
      "プライドを捨て、最初の問診・八綱弁証へ即座にリセット。自分がどこで「真実仮虚」「真寒仮熱」を見誤ったかを厳密に再分析。",
    patientExplanation:
      "「刺激に対してお身体が一時的に過敏な反応を示しました。刺激を完全に抜き、横になって呼吸を整えましょう。」",
  },
];

export default function TreatmentSafetyFlowchart() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>("improved");
  const activeBranch =
    DECISION_BRANCHES.find((b) => b.id === selectedBranchId) || DECISION_BRANCHES[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑧：3分岐フィードバック ＆ 医療安全フローチャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            施術直後の生体応答から次の一手を下す意思決定アルゴリズム
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          改善・不変・悪化 ＆ 撤退基準
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        治療は刺して終わりではありません。抜鍼直後の<strong>「脈・腹・自覚症状のレスポンス（改善・不変・悪化）」</strong>を客観評価し、次の瞬間にどのような介入を下すかというフィードバック制御があって初めて医療安全と高い再現性が担保されます。
      </p>

      {/* 3分岐選択ボタン */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {DECISION_BRANCHES.map((b) => {
          const isSelected = b.id === selectedBranchId;
          const Icon = b.icon;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden flex items-center justify-between ${
                isSelected
                  ? `${b.themeColor.bg} ${b.themeColor.border} border-2 shadow-sm scale-[1.02]`
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-80 hover:opacity-100"
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.themeColor.badge}`}>
                  BRANCH
                </span>
                <div className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  {b.label}
                </div>
              </div>
              <Icon className={`w-5 h-5 ${b.themeColor.text}`} />
            </button>
          );
        })}
      </div>

      {/* 選択分岐の詳細意思決定パネル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4 mb-6">
        <div className="pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
            DIAGNOSTIC STATUS
          </span>
          <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] mt-0.5">
            {activeBranch.hypothesisState}
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              【現場での即時アクション（Immediate Response）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {activeBranch.immediateAction}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] block">
              【次の一手・戦略方針（Next Tactical Step）】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {activeBranch.nextStep}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs">
          <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] block mb-1">
            PATIENT COMMUNICATION（患者への説明）
          </span>
          <p className="text-[#232826] dark:text-[#FAF8F5] italic leading-relaxed">
            {activeBranch.patientExplanation}
          </p>
        </div>
      </div>

      {/* 撤退基準（レッドフラッグ・専門医紹介ルール） */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF3E0] dark:bg-[#2C1F15] border-2 border-[#D32F2F] dark:border-[#EF5350]">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#D32F2F] dark:text-[#EF5350] shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <strong className="text-sm font-bold text-[#D32F2F] dark:text-[#EF5350]">
                東洋医学の限界と絶対撤退基準（レッドフラッグ：即座に病医院・専門医へ紹介）
              </strong>
              <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                医療安全規定
              </span>
            </div>
            <ul className="space-y-1 text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-[#D32F2F] font-bold">1. 3〜5回の適切な介入で再現性ある好転が一切見られない：</span>
                <span>潜在的な器質的重篤疾患（腫瘍・内分泌異常・自己免疫疾患等）を疑い精密検査を推奨。</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#D32F2F] font-bold">2. 拍動を伴う腹部硬結・激しい安静時痛・夜間痛・体重減少：</span>
                <span>腹部大動脈瘤（AAA）、悪性腫瘍骨転移、感染性脊椎炎等を疑い直ちに紹介状を発行。</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#D32F2F] font-bold">3. 突然の激しい雷鳴頭痛・麻痺・構音障害・失神：</span>
                <span>くも膜下出血、脳梗塞、急性大動脈解離。迷わず救急搬送を手配する。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
}
