"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Compass,
  Activity,
  Layers,
} from "lucide-react";

interface StepDetail {
  step: number;
  title: string;
  en: string;
  focus: string;
  reasoning: string;
  result: string;
}

const STEPS_DATA: StepDetail[] = [
  {
    step: 1,
    title: "八綱で枠を決める（大枠・座標の固定）",
    en: "Eight Principles Framing",
    focus: "病変の深さと生体反応の強度を2軸で切り分ける",
    reasoning: "半年以上続く経過 ➜ 「裏（慢性内傷）」／ 締め付けられる強い疼痛・弦脈・拒按 ➜ 「実（邪気停滞）」",
    result: "【裏実証（りじつしょう）】に座標固定。治療の大枠は「瀉法・通法」に決定。",
  },
  {
    step: 2,
    title: "気血水で機能異常を特定する（運動の解析）",
    en: "Qi-Blood-Fluid Dynamic Analysis",
    focus: "乱れている生命素材の運動方向を特定する",
    reasoning: "仕事のプレッシャー・ため息（気鬱の代償的解放反応）➜「気滞」／ こめかみへの突き上げる痛み・イライラ ➜「気逆」",
    result: "【気滞 兼 気逆】。血管や筋膜の内圧が異常に高まり上逆している。",
  },
  {
    step: 3,
    title: "臓腑・経絡へ落とし込む（場所の確定）",
    en: "Zang-Fu & Meridian Localization",
    focus: "どの拠点と通信インフラで破綻が起きているか",
    reasoning: "痛みの局在が「側頭部・こめかみ・耳周囲」➜【足少陽胆経】／ 情志の乱れ・疏泄機能の失調 ➜【足厥陰肝経】",
    result: "【肝胆の失調】。肝気の疏泄が滞り、ペアである胆経のルートに沿って熱気と圧力が突き上げている。",
  },
];

export default function PracticeThreeStepFilter() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：三段階フィルタリングの実演（3-Stage Filter Workflow）</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            40代女性・頭痛症例で実演するブレゼロの推論プロセス
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          八綱 ➜ 気血水 ➜ 臓腑経絡の演繹
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        「頭痛だからとりあえず頭に刺す」「肝のツボを刺す」といった直感的なショートカットは誤治の元凶です。
        以下の症例（40代女性：半年続く側頭部の締め付け痛・ため息・イライラ）をもとに、3段階のフィルターを通していかに一文の確定証へと収束するかを体験してください。
      </p>

      {/* ステップ進行セレクター */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
        {STEPS_DATA.map((s) => {
          const isSelected = s.step === currentStep;
          return (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                  : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold opacity-75">
                  STEP 0{s.step}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C387]" />}
              </div>
              <div className="text-xs font-bold line-clamp-1">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* 選択したステップの推論詳細カード */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
              STEP {currentStep} REASONING LOGIC
            </span>
            <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              {STEPS_DATA[currentStep - 1].title}
            </h5>
          </div>
          <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
            {STEPS_DATA[currentStep - 1].focus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
              【臨床データの分析】
            </strong>
            <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
              {STEPS_DATA[currentStep - 1].reasoning}
            </p>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <strong className="text-[10px] font-mono font-bold text-[#0288D1] dark:text-[#38BDF8] block">
              【導き出された判定結果】
            </strong>
            <p className="font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              {STEPS_DATA[currentStep - 1].result}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="text-xs text-[#59615D] dark:text-[#96A6B2] hover:underline"
            >
              ← 前のステップ
            </button>
          ) : <div />}
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2A5448] transition-all"
            >
              <span>次のステップへ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              全3ステップ完了 ✓
            </span>
          )}
        </div>
      </div>

      {/* 最終統合宣言カード */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] text-white space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#A5D6A7] tracking-wider uppercase">
          <FileCheck2 className="w-4 h-4" />
          <span>SYNTHESIZED DIAGNOSTIC STATEMENT（確定証の一文化宣言）</span>
        </div>
        <h5 className="font-serif text-base sm:text-lg font-bold text-white">
          「情志の失調による肝気鬱結が引き起こした、少陽経における気の上逆（裏実証）」
        </h5>
        <div className="pt-2 border-t border-[#A5D6A7]/30 text-xs text-[#E8F5E9] flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>決定治則：</strong> 疏肝理気・降気平肝（瀉法）
          </span>
          <span>
            <strong>主配穴：</strong> 太衝（肝経原穴・疏肝） ＋ 風池（胆経・降気解表）
          </span>
        </div>
      </div>
    </figure>
  );
}
