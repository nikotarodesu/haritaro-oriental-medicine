"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
  ChevronRight,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface LoopStep {
  id: string;
  stepNumber: number;
  name: string;
  en: string;
  action: string;
  clinicalDetail: string;
  indicators: string[];
  engineerPoint: string;
}

const LOOP_STEPS: LoopStep[] = [
  {
    id: "input",
    stepNumber: 1,
    name: "入力（Input）",
    en: "Acupoint Stimulation",
    action: "ツボへの物理刺激入力（刺鍼・施灸・手技）",
    clinicalDetail:
      "八綱弁証と治則に基づき、特定した経穴へミリ単位の正確さで刺入・施灸。深さ（天・人・地）、角度、補瀉手技（捻転・提挿・呼吸）を最適設定。",
    indicators: ["刺入深度・角度の選定", "補法（緩刺・時計回り）/ 瀉法（速刺・反時計回り）", "温熱刺激の熱量コントロール"],
    engineerPoint: "「ツボを刺す」のではなく「高感受性受容器へ特定のパラメータコードを入力する」行為。",
  },
  {
    id: "output",
    stepNumber: 2,
    name: "生体応答（Output）",
    en: "Biophysical Response",
    action: "局所および全身の生体反応（得気・気至）の発生",
    clinicalDetail:
      "鍼響（ずーんと響く感覚）、組織の把持感（鍼が吸い付く感覚）、局所の発赤（軸索反射・CGRP放出）、副交感神経反射（呼吸の深化・腸鳴）。",
    indicators: ["得気（De-Qi）：重・麻・脹・痛の質感", "気至（針先の引き込み感・沈着感）", "呼吸パターンの自然な深まり・筋弛緩"],
    engineerPoint: "刺激が受容され、生体システムが「再起動処理」を開始した物理的シグナル。",
  },
  {
    id: "eval",
    stepNumber: 3,
    name: "即時評価（Evaluation）",
    en: "Real-time Sensing",
    action: "脈診・腹診・局所硬結によるリアルタイム答え合わせ",
    clinicalDetail:
      "1本打つごとに脈状の変化（弦脈が緩脈へ、沈脈が浮上、細脈が充実）や、腹壁の硬結・圧痛（胸脇苦満・心下痞硬）の軟化を即座に再検。",
    indicators: ["六部定位脈診の左右・三部バランス", "腹壁緊張・圧痛のスコア変化", "皮膚温・末梢血流の上昇（温まり）"],
    engineerPoint: "「効いたはず」という思い込みを排除し、生体の客観的物理量でフィードバックを受信。",
  },
  {
    id: "adjust",
    stepNumber: 4,
    name: "動的再調整（Adjustment）",
    en: "System Calibration",
    action: "ミリ単位の微修正と次の一手の決定",
    clinicalDetail:
      "脈が緩めば「刺激適正」として保持。変化が薄ければ刺激量（ドーゼ）を追加。逆に過剰反応の兆候があれば即座に抜鍼または遠隔から瀉気。",
    indicators: ["留鍼時間の決定（1分〜15分）", "補助穴（佐使穴）の追加・微調整", "過剰刺激（ドーゼオーバー）の回避"],
    engineerPoint: "1回で100点満点を狙うのではなく、この高速ループの往復で最適解へと収束させる。",
  },
];

export default function TreatmentFeedbackLoop() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const activeStep = LOOP_STEPS[currentStepIndex];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説①：治療の動的制御ループ（Dynamic Feedback Cycle）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            診断の「静的スナップショット」から「リアルタイム動的制御」へ
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
          <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E] animate-pulse" />
          <span>CLOSED-LOOP MEDICINE</span>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        治療の本質は「診断書に書かれたツボを機械的に刺すこと」ではありません。
        <strong>「入力（刺激） ➜ 応答（気至） ➜ 評価（脈・腹） ➜ 再調整（微修正）」</strong>という動的ループを臨床現場でリアルタイムに回し、患者の生体システムと対話しながら最適バランスへ収束させる工学的プロセスです。
      </p>

      {/* 4ステップの円環・プログレスバー */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {LOOP_STEPS.map((s, idx) => {
          const isSelected = idx === currentStepIndex;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold opacity-75">
                  PHASE 0{s.stepNumber}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#E6C387] animate-ping" />
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">{s.name}</div>
              <div className="text-[10px] opacity-75 truncate">{s.en}</div>
            </button>
          );
        })}
      </div>

      {/* アクティブフェーズの詳細解説カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              CURRENT ACTIVE CONTROLLER [{activeStep.en.toUpperCase()}]
            </span>
            <h5 className="text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              {activeStep.name}：{activeStep.action}
            </h5>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1E3D34]/10 dark:bg-[#74BA9E]/20 text-[#1E3D34] dark:text-[#74BA9E] self-start sm:self-auto">
            Step {activeStep.stepNumber} / 4
          </span>
        </div>

        {/* 臨床詳細とエンジニアリング視点 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              CLINICAL PROTOCOL
            </span>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {activeStep.clinicalDetail}
            </p>
            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <span className="text-[10px] font-bold text-[#232826] dark:text-[#FAF8F5] block mb-1">
                重要チェック項目：
              </span>
              <ul className="space-y-1 text-[#59615D] dark:text-[#96A6B2]">
                {activeStep.indicators.map((ind, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B86924] dark:text-[#E6C387] block mb-2">
                SYSTEM DESIGN PERSPECTIVE
              </span>
              <div className="p-3 rounded-lg bg-[#FFF3E0] dark:bg-[#2C1F15] border border-[#FFE0B2] dark:border-[#3D2817]">
                <strong className="text-xs text-[#B86924] dark:text-[#E6C387] block mb-1">
                  生命システム制御の極意：
                </strong>
                <p className="text-xs text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
                  {activeStep.engineerPoint}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
              <span className="text-[11px] text-[#8C9691] dark:text-[#64748B]">
                次の制御フェーズへ
              </span>
              <button
                onClick={() => setCurrentStepIndex((currentStepIndex + 1) % 4)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1E3D34] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2A5448] transition-all"
              >
                <span>{currentStepIndex === 3 ? "ループを再起動" : "次へ進む"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
