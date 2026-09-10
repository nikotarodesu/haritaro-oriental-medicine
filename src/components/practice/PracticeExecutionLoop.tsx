"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Search,
  Compass,
  FileText,
  Target,
  Zap,
  Activity,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

interface LoopPhase {
  id: string;
  stepNum: number;
  name: string;
  en: string;
  action: string;
  detail: string;
  feedbackRoute: string;
}

const EXECUTION_PHASES: LoopPhase[] = [
  {
    id: "case-reading",
    stepNum: 1,
    name: "症例読解",
    en: "Case Analysis",
    action: "患者の膨大な語りからノイズを削ぎ落とし、本虚標実の骨格を抽出",
    detail: "生気の一致確認、時間軸（急性/慢性）の整理、主訴の質感翻訳（重だるさ➜湿、刺痛➜瘀血など）。",
    feedbackRoute: "悪化・誤治が発生した際の最終帰還地点（問診の根本見直し）。",
  },
  {
    id: "diagnosis",
    stepNum: 2,
    name: "診断（三段階）",
    en: "3-Stage Diagnosis",
    action: "八綱（大枠） ➜ 気血水（機能） ➜ 臓腑経絡（場所）で確定証を宣言",
    detail: "四診データを三段階フィルターにかけ、「情志失調による肝気鬱結（少陽気逆・裏実証）」のように一文で確定。",
    feedbackRoute: "仮説が完全に外れていた場合、八綱座標から再設定するリセット地点。",
  },
  {
    id: "strategy",
    stepNum: 3,
    name: "治療設計",
    en: "Treatment Strategy",
    action: "治則を1つに絞り、変化量を限定したタイムラインを構築",
    detail: "本治と標治の時間配分（例：本7:標3）を決定。一度に全て治そうとせず、制御可能な変化量を設定。",
    feedbackRoute: "効果が不十分な場合、刺激量（ドーゼ）や本標比率を微調整。",
  },
  {
    id: "point-selection",
    stepNum: 4,
    name: "配穴設計",
    en: "Acupoint Formulation",
    action: "相殺効果を排除し、少数精鋭のツボを厳選するミニマリズム",
    detail: "多穴によるノイズを嫌い、主穴（本治）・客穴（標治）の最小構成で経絡の伝達効率を最大化。",
    feedbackRoute: "反応が鈍い場合、表裏経や遠隔経穴へのバイパス切り替えを検討。",
  },
  {
    id: "needle-operation",
    stepNum: 5,
    name: "刺鍼操作",
    en: "Needling & Feedback",
    action: "呼吸・迎随補瀉・気至（得気）の物理制御と即時抜鍼",
    detail: "魚が釣り針にかかるような気至（手応え）を察知した瞬間に操作を停止。刺激総量を厳格に管理。",
    feedbackRoute: "気至が得られない場合、深度・角度・呼吸同期をミリ単位で微修正。",
  },
  {
    id: "evaluation",
    stepNum: 6,
    name: "評価・再設計",
    en: "Evaluation & Recalibration",
    action: "脈診・腹診・自覚症状の即時判定から3分岐の次の一手を下す",
    detail: "改善（方針維持） / 反応薄（刺激量再考） / 悪化（診断へリセット）。動的ループを完結させる。",
    feedbackRoute: "結果をフィードバックし、次回の施術計画および治療プロトコルを動的に更新。",
  },
];

export default function PracticeExecutionLoop() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>("case-reading");
  const activePhase =
    EXECUTION_PHASES.find((p) => p.id === selectedPhaseId) || EXECUTION_PHASES[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：臨床アルゴリズムの動的ループ全体図（Closed-Loop Protocol）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            情報を構造に変換し、操作を自己修正ループへ落とし込む
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#59615D] dark:text-[#96A6B2]">
          <RefreshCw className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] animate-spin" style={{ animationDuration: "14s" }} />
          <span>CLOSED-LOOP ALGORITHM</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        鍼灸臨床とは、暗記したマニュアルの作業ではありません。
        <strong>「① 症例読解 ➜ ② 診断 ➜ ③ 治療設計 ➜ ④ 配穴 ➜ ⑤ 刺鍼操作 ➜ ⑥ 評価・再設計」</strong>という6段階の円環ループを淀みなく回し、
        生体からの応答に応じて<strong>「改善（微調整）」「不十分（刺激量再考）」「悪化（診断へリセット）」</strong>を瞬時に切り替える知的な自己修正システムです。
      </p>

      {/* 6段階の進行ステップバー */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {EXECUTION_PHASES.map((phase) => {
          const isSelected = phase.id === selectedPhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20 scale-[1.02]"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold opacity-75">
                    PHASE 0{phase.stepNum}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E6C387]" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">{phase.name}</div>
              </div>
              <span className="text-[10px] opacity-75 truncate mt-2">{phase.en}</span>
            </button>
          );
        })}
      </div>

      {/* 選択したフェーズの解説パネル */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              PHASE 0{activePhase.stepNum} DETAIL SPECIFICATION
            </span>
            <h5 className="font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              {activePhase.name}（{activePhase.en}）：{activePhase.action}
            </h5>
          </div>
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-3 py-1 rounded-full self-start sm:self-auto">
            プロトコル Step {activePhase.stepNum} / 6
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              臨床アクションの核心
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {activePhase.detail}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <strong className="text-[10px] font-mono font-bold text-[#B86924] dark:text-[#E6C387] block">
              フィードバック制御における役割
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {activePhase.feedbackRoute}
            </p>
          </div>
        </div>

        {/* 3分岐フィードバックの要約バー */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#1E3D34] dark:text-[#74BA9E] font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>改善 ➜ 方針維持・微調整</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387] font-bold">
            <Activity className="w-4 h-4" />
            <span>不十分 ➜ 刺激総量（ドーゼ）を再考</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D32F2F] dark:text-[#EF5350] font-bold">
            <RotateCcw className="w-4 h-4" />
            <span>悪化 ➜ 診断（八綱・問診）へ即時リセット</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
