"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, AlertTriangle, Flame, ShieldAlert, Activity, Heart, Droplets, Zap, CheckCircle2 } from "lucide-react";
import QiBloodLearningScope from './QiBloodLearningScope';

type DominoRoute = "stress" | "fatigue";

export default function QiBloodDominoProcess() {
  const [activeRoute, setActiveRoute] = useState<DominoRoute>("stress");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const stressSteps = [
    {
      step: 1,
      title: "精神ストレス",
      badge: "観察の入口",
      target: "情志と症状の関連を記録",
      color: "#1E3D34",
      bgClass: "bg-[#E0F2F1] text-[#00695C] dark:bg-[#004D40]/30 dark:text-[#80CBC4] border-[#80CBC4]/30",
      accentBorder: "border-[#00897B]",
      icon: AlertTriangle,
      tag: "情志の変化を観察",
      desc: "緊張・怒りなどと、身体の訴えが変化する時期を記録する学習例です。伝統理論では情志と肝の疏泄を関連づけますが、ストレスだけで症状の原因を確定しません。",
      clinicalSign: "ため息が増える、気分の波、胃の不快感、首肩のこわばり",
      assessment: "この分類から自律神経の状態やホルモン値を推定せず、必要な医学的評価を別に確認します。",
    },
    {
      step: 2,
      title: "気滞（きたい）",
      badge: "比較する候補①",
      target: "伝統的な気の巡りの分類",
      color: "#FFA000",
      bgClass: "bg-[#FFF8E1] text-[#E65100] dark:bg-[#FFA000]/20 dark:text-[#FFE082] border-[#FFE082]/40",
      accentBorder: "border-[#FFA000]",
      icon: Zap,
      tag: "気の停滞",
      desc: "張り、つかえ感、情志による変動などを「気滞」と関連づけて整理します。気の流れや身体の内圧を測定した説明ではありません。",
      clinicalSign: "胸脇部や腹部の張り、喉のつかえ感（梅核気）、イライラ、月経前のPMS",
      assessment: "喉・胸部・腹部の症状の原因を、この分類だけで説明したり病気を除外したりしません。",
    },
    {
      step: 3,
      title: "瘀血（おけつ）",
      badge: "比較する候補②",
      target: "伝統的な血の巡りの分類",
      color: "#D32F2F",
      bgClass: "bg-[#FFEBEE] text-[#C62828] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A] border-[#FFCDD2]/40",
      accentBorder: "border-[#D32F2F]",
      icon: Heart,
      tag: "血の鬱滞",
      desc: "固定痛や暗い舌色などを「瘀血」と関連づけて整理する学習例です。気滞との併存を考えることはありますが、必ずこの順に進む病気の経路ではありません。",
      clinicalSign: "針で刺すような固定痛、舌裏の静脈怒張・暗紫舌、顔のくすみ・目の下のクマ",
      assessment: "瘀血は、血栓・微小循環障害・血液粘稠度の検査結果と同じ意味ではありません。",
    },
    {
      step: 4,
      title: "水滞・痰湿（たんしつ）",
      badge: "比較する候補③",
      target: "伝統的な潤いと停滞の分類",
      color: "#0288D1",
      bgClass: "bg-[#E1F5FE] text-[#0277BD] dark:bg-[#0288D1]/20 dark:text-[#81D4FA] border-[#B3E5FC]/40",
      accentBorder: "border-[#0288D1]",
      icon: Droplets,
      tag: "水滞・痰湿の候補",
      desc: "重だるさやむくみなどの所見を、水滞・痰湿の候補として比較します。体内の沈殿物や老廃物を検出したという説明ではありません。",
      clinicalSign: "頭が重い（濡れタオルを巻かれたよう）、下肢の重度なむくみ、めまい、関節重痛",
      assessment: "むくみや疲労の医学的な原因は別に評価し、動脈硬化などの病名と同一視しません。",
    },
  ];

  const fatigueSteps = [
    {
      step: 1,
      title: "過労・胃腸虚弱",
      badge: "観察の入口",
      target: "生活・食事と症状の経過",
      color: "#59615D",
      bgClass: "bg-[#F5F5F5] text-[#424242] dark:bg-[#2A3B4A]/40 dark:text-[#E0E0E0] border-[#E0E0E0]/30",
      accentBorder: "border-[#757575]",
      icon: AlertTriangle,
      tag: "後天の精（補給）不足",
      desc: "活動・休息・食事と症状の経過を記録する学習例です。伝統理論上の脾胃という分類を、消化器の病気や吸収障害の診断と同じ意味では使いません。",
      clinicalSign: "食欲不振、胃もたれ、手足がだるい、朝から起き上がれない",
      assessment: "食欲低下・体重変化・疲労などの医学的な原因を、この図から推定しません。",
    },
    {
      step: 2,
      title: "気虚（ききょ）",
      badge: "比較する候補①",
      target: "伝統的な気の不足の分類",
      color: "#FFA000",
      bgClass: "bg-[#FFF8E1] text-[#E65100] dark:bg-[#FFA000]/20 dark:text-[#FFE082] border-[#FFE082]/40",
      accentBorder: "border-[#FFA000]",
      icon: Zap,
      tag: "気の不足",
      desc: "疲労、声の弱さなどの所見を気虚と関連づけて比較します。「バッテリー」は比喩で、細胞内のエネルギー量や免疫機能を測定したことを意味しません。",
      clinicalSign: "全身倦怠、話す声に力がない、風邪を引きやすい、食後の強い眠気・泥状便",
      assessment: "疲労や息切れなどを気虚だけで説明せず、持続する症状や悪化の医学的評価を優先します。",
    },
    {
      step: 3,
      title: "血虚（けっきょ）",
      badge: "比較する候補②",
      target: "伝統的な血の不足の分類",
      color: "#D32F2F",
      bgClass: "bg-[#FFEBEE] text-[#C62828] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A] border-[#FFCDD2]/40",
      accentBorder: "border-[#D32F2F]",
      icon: Heart,
      tag: "血の不足",
      desc: "顔色、乾燥、めまいなどの所見を血虚の候補として比較します。気虚との併存を学びますが、造血が停止したことや脳の栄養不足を示すものではありません。",
      clinicalSign: "顔色が蒼白・土色、立ちくらみ・めまい、爪の割れ・筋の痙攣（こむら返り）、不眠・不安",
      assessment: "血虚は貧血・鉄欠乏の診断と同じではなく、薬や食事制限の選択には使いません。",
    },
    {
      step: 4,
      title: "陰虚（いんきょ）",
      badge: "比較する候補③",
      target: "伝統的な潤いの不足の分類",
      color: "#7B1FA2",
      bgClass: "bg-[#F3E5F5] text-[#6A1B9A] dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8] border-[#E1BEE7]/40",
      accentBorder: "border-[#7B1FA2]",
      icon: Flame,
      tag: "潤いの不足という分類",
      desc: "乾燥、寝汗、ほてりなどを陰虚と関連づけて比較します。「冷却水」は記憶のための比喩で、身体が空焚きになったり組織が焦げたりするという機序ではありません。",
      clinicalSign: "夕方の微熱・手足のほてり、激しい寝汗（盗汗）、喉や皮膚の強い乾燥、不眠悪化",
      assessment: "発熱・寝汗・乾燥などの原因を別に評価し、陰虚から慢性炎症やホルモン異常を確定しません。",
    },
  ];

  const currentSteps = activeRoute === "stress" ? stressSteps : fatigueSteps;
  const currentStep = currentSteps[activeStepIndex];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説③：気血水の候補と関係を比較する学習図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            情志・疲労に関する所見から、複数の伝統分類を比較する
          </h4>
        </div>

        {/* ルート選択タブ */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1.5 rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => {
              setActiveRoute("stress");
              setActiveStepIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeRoute === "stress"
                ? "bg-[#00897B] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            ① 情志・張りの比較
          </button>
          <button
            onClick={() => {
              setActiveRoute("fatigue");
              setActiveStepIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeRoute === "fatigue"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            ② 疲労・不足の比較
          </button>
        </div>
      </div>

      {/* サマリーバー */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
            {activeRoute === "stress" ? "【情志・張りに関する比較例】" : "【疲労・不足に関する比較例】"}
            {activeRoute === "stress"
              ? "気滞・瘀血・水滞・痰湿を比較"
              : "気虚・血虚・陰虚を比較"}
          </span>
          <span className="text-[#59615D] dark:text-[#96A6B2]">
            ステップをタップして詳細を確認
          </span>
        </div>
        <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
          {activeRoute === "stress"
            ? "情志による変化、張り、固定痛、重だるさなどの支持・反証を分けて確認します。表示順は病気の進行段階ではありません。"
            : "疲労、乾燥、めまい、ほてりなどから候補を比較します。必ず気虚から血虚・陰虚へ進むという意味ではありません。"}
        </p>
      </div>

      {/* ドミノ倒しステップ・タイムライン（4段階） */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative mb-6">
        {currentSteps.map((s, idx) => {
          const isSelected = activeStepIndex === idx;
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`cursor-pointer rounded-2xl p-4 transition-all relative border-2 text-left flex flex-col justify-between ${
                isSelected
                  ? `bg-white dark:bg-[#17212A] ${s.accentBorder} shadow-md scale-[1.02]`
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-80 hover:opacity-100"
              }`}
            >
              {/* ドミノ上部バッジ */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${s.bgClass}`}>
                  {s.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#8C9691] dark:text-[#64748B]">
                  0{s.step}
                </span>
              </div>

              {/* アイコン & タイトル */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    {s.title}
                  </h5>
                </div>
                <p className="text-[11px] font-medium text-[#59615D] dark:text-[#96A6B2] line-clamp-1 mt-0.5">
                  {s.target}
                </p>
              </div>

              {/* 下部タグ */}
              <div className="mt-3 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#737C77] dark:text-[#94A3B8]">
                  {s.tag}
                </span>
                {isSelected && (
                  <span className="flex h-2 w-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                )}
              </div>

              {/* 次への矢印（デスクトップ時、最後のステップ以外） */}
              {idx < 3 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs items-center justify-center text-[#59615D] dark:text-[#96A6B2]">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 選択されたステップの詳細ブレイクダウン */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-[#EAE4D5] dark:border-[#2A3B4A] pb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: currentStep.color }}
            />
            <span className="text-xs font-bold font-mono text-[#59615D] dark:text-[#96A6B2]">
              STEP {currentStep.step} / 4
            </span>
            <span className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              {currentStep.title}：{currentStep.target}
            </span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${currentStep.bgClass}`}>
            {currentStep.tag}
          </span>
        </div>

        <p className="text-sm text-[#232826] dark:text-[#D1D5DB] leading-relaxed mb-5">
          {currentStep.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 臨床サイン */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-1.5 font-bold text-[#D32F2F] dark:text-[#EF5350] mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>伝統的に関連づける所見の例</span>
            </div>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed font-medium">
              {currentStep.clinicalSign}
            </p>
          </div>

          {/* 現代医学との符合 */}
          <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              <Activity className="w-4 h-4" />
              <span>医学的評価との区別</span>
            </div>
            <p className="text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed font-medium">
              {currentStep.assessment}
            </p>
          </div>
        </div>

        {/* 臨床的教訓メッセージ */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FFF9C4]/40 dark:bg-[#FFA000]/10 border border-[#FFE082]/60 dark:border-[#FFA000]/20 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#FFA000] shrink-0 mt-0.5" />
          <p className="text-xs text-[#5D4037] dark:text-[#FFE082] leading-relaxed font-medium">
            <span className="font-bold">候補を比較する観点：</span>
            複数の所見と経過を照合し、反証や未確認の情報も残します。
            {activeRoute === "stress"
              ? "情志との関連だけで原因を決めず、痛みやむくみの医学的評価を別に確認します。"
              : "疲労などを伝統分類だけで説明せず、この図から治療や薬の変更を決めません。"}
          </p>
        </div>
      </div>
      <QiBloodLearningScope />
    </figure>
  );
}
