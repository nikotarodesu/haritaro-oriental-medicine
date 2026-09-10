"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Filter,
  ArrowDown,
  CheckCircle2,
  Clock,
  Activity,
  Layers,
  FileText,
  Volume2,
} from "lucide-react";

interface FilterStep {
  id: number;
  name: string;
  en: string;
  question: string;
  noiseRemoved: string;
  coreExtracted: string;
}

const FILTER_STEPS: FilterStep[] = [
  {
    id: 1,
    name: "生気（神気）の一致確認",
    en: "Shen & Vitality Match",
    question: "体格・外見と、声の張り・目の輝き（神気）が一致しているか？",
    noiseRemoved: "「ガタイが良いから元気そう」「若者だから実証」という外見バイアス（思い込みノイズ）を排除。",
    coreExtracted: "外実内虚（見た目は屈強だが声がかすれ脈が弱い）などの潜在的虚証を見抜き、生命エネルギーのベースを確定。",
  },
  {
    id: 2,
    name: "時間軸（タイムライン）の整理",
    en: "Temporal Lineage",
    question: "その症状はいつから始まったか？（急性外感か慢性内傷か）",
    noiseRemoved: "「昨日から痛い肩」と「10年前からの冷え」が同列に語られる時間的混乱ノイズを分離。",
    coreExtracted: "「裏（慢性基盤）」の上に「表（急性の引き金）」が乗っている病態深度（Z軸）を固定。",
  },
  {
    id: 3,
    name: "標本（ひょうほん）の峻別",
    en: "Root vs Manifestation",
    question: "どれが根っこの病根（本）で、どれが枝葉の派生症状（標）か？",
    noiseRemoved: "多愁訴（頭痛、胃もたれ、不眠、イライラ）が全て独立した別の病気に見えるノイズを解体。",
    coreExtracted: "「胃腸虚弱（脾気虚＝本）」が原因で気が滞り、「側頭部痛・イライラ（肝気逆＝標）」が生じた主従関係を特定。",
  },
  {
    id: 4,
    name: "主訴の質感翻訳（デコード）",
    en: "Textural Translation",
    question: "患者の主観的表現は、東洋医学のどの素材の運動異常か？",
    noiseRemoved: "「ズキズキ」「重だるい」「ピリピリ」などの主観的な擬音語ノイズを客観病理へ変換。",
    coreExtracted: "「重だるい＝湿」「刺痛＝瘀血」「張痛＝気滞」「無力感＝気虚」へと完全に工学コード化。",
  },
];

export default function PracticeNoiseFilterFunnel() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeFilter = FILTER_STEPS.find((s) => s.id === activeStepId) || FILTER_STEPS[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説②：情報のフィルタリング漏斗</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            雑多な患者の訴えからノイズを削ぎ落とし「病態の骨格」を抽出する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          情報抽出の4原則
        </span>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        初診時の患者は、感情や思い込みが混ざった膨大なノイズ情報（あれも痛い、これも辛い）を語ります。
        問診のプロは、この言葉をそのまま受け取るのではなく、<strong>4層のフィルタリング漏斗（生気・時間軸・標本・質感）</strong>を通して余計なノイズを濾過し、治療の骨格となるコア構造（本虚標実）だけを抽出します。
      </p>

      {/* 漏斗グラフィックUI */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-7 space-y-6 mb-6">
        {/* 上部：入力ノイズ */}
        <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-dashed border-[#E5DEC9] dark:border-[#2A3B4A]">
          <span className="text-[10px] font-mono font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1">
            RAW INPUT DATA（患者が語る散らばった訴え・ノイズ過多）
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] text-[#59615D] dark:text-[#96A6B2]">
              「肩が重だるくて凝る」
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] text-[#59615D] dark:text-[#96A6B2]">
              「夕方になるとこめかみがズキズキ」
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] text-[#59615D] dark:text-[#96A6B2]">
              「仕事でイライラしてため息が出る」
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] text-[#59615D] dark:text-[#96A6B2]">
              「足先が氷のように冷える」
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] text-[#59615D] dark:text-[#96A6B2]">
              「昼食後に猛烈な眠気と胃もたれ」
            </span>
          </div>
        </div>

        {/* 4層フィルターのステップ選択 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FILTER_STEPS.map((step) => {
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm ring-2 ring-[#1E3D34]/20"
                    : "bg-white dark:bg-[#17212A] text-[#59615D] dark:text-[#96A6B2] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34]/50"
                }`}
              >
                <div className="text-[10px] font-mono opacity-75">FILTER 0{step.id}</div>
                <div className="text-xs font-bold mt-0.5 truncate">{step.name}</div>
              </button>
            );
          })}
        </div>

        {/* 選択したフィルターの詳細解説 */}
        <div className="bg-white dark:bg-[#17212A] rounded-xl p-5 border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#F2ECE0] dark:border-[#22303D]">
            <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
              フィルター 0{activeFilter.id}：{activeFilter.name}
            </span>
            <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              臨床での核心的な問い
            </span>
          </div>

          <p className="text-xs font-medium text-[#1E3D34] dark:text-[#74BA9E] italic">
            「{activeFilter.question}」
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[#FFEBEE] dark:bg-[#2D1618] border border-[#FFCDD2] dark:border-[#421A20]">
              <strong className="text-[10px] font-bold text-[#D32F2F] dark:text-[#EF5350] block mb-1">
                【削ぎ落とすノイズ】
              </strong>
              <p className="text-[#59615D] dark:text-[#E0D5C1] leading-relaxed">
                {activeFilter.noiseRemoved}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#E8F5E9] dark:bg-[#132A1C] border border-[#C8E6C9] dark:border-[#1D4A2B]">
              <strong className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block mb-1">
                【抽出される構造】
              </strong>
              <p className="text-[#59615D] dark:text-[#C8E6C9] leading-relaxed">
                {activeFilter.coreExtracted}
              </p>
            </div>
          </div>
        </div>

        {/* 下部：抽出されたコア情報 */}
        <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] rounded-xl p-4 text-white">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5D6A7] block mb-1">
            FILTERED CORE STRUCTURE（抽出された病態構造）
          </span>
          <div className="text-xs sm:text-sm font-bold leading-relaxed">
            「本：脾気虚弱（中焦消化不全・エネルギー枯渇）」 ➜ 「標：肝気鬱結 兼 胆経気逆（側頭痛・肩こり）」
          </div>
        </div>
      </div>
    </figure>
  );
}
