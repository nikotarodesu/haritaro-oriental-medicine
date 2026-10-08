"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Stethoscope, BookOpen } from "lucide-react";
import QiBloodLearningScope from "./QiBloodLearningScope";

interface FlowCase {
  id: string;
  category: "気虚" | "気滞" | "血虚" | "瘀血" | "痰湿";
  attributeColor: string;
  symptomTitle: string;
  step1: {
    label: "伝統分類の候補";
    result: string;
    sub: string;
  };
  step2: {
    label: "随伴情報と不足情報";
    symptoms: string;
    targetOrgan: string;
    organKana: string;
  };
  step3: {
    label: "治則の意味を学ぶ";
    principle: string;
    method: "補法（伝統的な分類）" | "通法・瀉法（伝統的な分類）" | "化湿（伝統的な分類）";
  };
  step4: {
    label: "関連用語の学習例";
    acupoints: string[];
    herbalFormula: string;
    rationale: string;
  };
}

const FLOW_CASES: FlowCase[] = [
  {
    id: "case-1",
    category: "気虚",
    attributeColor: "#FFA000",
    symptomTitle: "「疲れやすく、食後に眠気を感じる」学習ケース",
    step1: {
      label: "伝統分類の候補",
      result: "気虚（ききょ）などを比較",
      sub: "働きの不足という伝統的な見方",
    },
    step2: {
      label: "随伴情報と不足情報",
      symptoms: "眠気・軟便・だるさの経過は？ 睡眠・食事・医療評価の情報は十分か？",
      targetOrgan: "脾気虚（ひききょ）を候補として比較",
      organKana: "ひききょ",
    },
    step3: {
      label: "治則の意味を学ぶ",
      principle: "健脾益気（けんぴえっき）",
      method: "補法（伝統的な分類）",
    },
    step4: {
      label: "関連用語の学習例",
      acupoints: ["足三里（あしさんり）", "中脘（ちゅうかん）", "脾兪（ひゆ）"],
      herbalFormula: "補中益気湯（ほちゅうえっきとう）、六君子湯",
      rationale: "気虚や脾気虚の用語を候補として比べる例です。疲労の経過や睡眠、食事など、確認できていない情報を残します。",
    },
  },
  {
    id: "case-2",
    category: "気滞",
    attributeColor: "#00897B",
    symptomTitle: "「張りや喉の違和感、気分の変化がある」学習ケース",
    step1: {
      label: "伝統分類の候補",
      result: "気滞（きたい）などを比較",
      sub: "巡りの停滞という伝統的な見方",
    },
    step2: {
      label: "随伴情報と不足情報",
      symptoms: "張り・気分の変化・喉の違和感の時間や程度は？ 他の説明を検討したか？",
      targetOrgan: "肝気鬱結（かんきうっけつ）を候補として比較",
      organKana: "かんきうっけつ",
    },
    step3: {
      label: "治則の意味を学ぶ",
      principle: "疏肝理気（そかんりき）",
      method: "通法・瀉法（伝統的な分類）",
    },
    step4: {
      label: "関連用語の学習例",
      acupoints: ["太衝（たいしょう）", "膻中（だんちゅう）", "内関（ないかん）"],
      herbalFormula: "四逆散（しぎゃくさん）、半夏厚朴湯、加味逍遙散",
      rationale: "張りや気分の変化だけで、肝気鬱結や自律神経の状態は確定できません。観察した事実と、伝統分類による解釈を分ける例です。",
    },
  },
  {
    id: "case-3",
    category: "血虚",
    attributeColor: "#D32F2F",
    symptomTitle: "「動悸・眠りの浅さ・不安感が気になる」学習ケース",
    step1: {
      label: "伝統分類の候補",
      result: "血虚（けっきょ）などを比較",
      sub: "養う働きの不足という伝統的な見方",
    },
    step2: {
      label: "随伴情報と不足情報",
      symptoms: "動悸や睡眠の変化の経過は？ 生活・服薬・医療評価の情報は十分か？",
      targetOrgan: "心血虚（しんけっきょ）を候補として比較",
      organKana: "しんけっきょ",
    },
    step3: {
      label: "治則の意味を学ぶ",
      principle: "養心補血・安神（あんしん）",
      method: "補法（伝統的な分類）",
    },
    step4: {
      label: "関連用語の学習例",
      acupoints: ["神門（しんもん）", "三陰交（さんいんこう）", "心兪（しんゆ）"],
      herbalFormula: "帰脾湯（きひとう）、酸棗仁湯（さんそうにんとう）",
      rationale: "血虚・心血虚は、貧血や不安の病名を判定する語ではありません。症状の経過と未確認の情報を整理し、伝統的な説明の範囲を確かめます。",
    },
  },
  {
    id: "case-4",
    category: "瘀血",
    attributeColor: "#880E4F",
    symptomTitle: "「月経時の痛みや血塊が気になる」学習ケース",
    step1: {
      label: "伝統分類の候補",
      result: "瘀血（おけつ）などを比較",
      sub: "血の巡りの停滞という伝統的な見方",
    },
    step2: {
      label: "随伴情報と不足情報",
      symptoms: "痛みや月経の経過は？ 医療評価・他の説明・変化を確認できているか？",
      targetOrgan: "胞宮瘀血（ほうきゅうおけつ）を候補として比較",
      organKana: "ほうきゅうおけつ",
    },
    step3: {
      label: "治則の意味を学ぶ",
      principle: "活血化瘀（かっけつかお）",
      method: "通法・瀉法（伝統的な分類）",
    },
    step4: {
      label: "関連用語の学習例",
      acupoints: ["血海（けっかい）", "合谷（ごうこく）", "次髎（じりょう）"],
      herbalFormula: "桂枝茯苓丸（けいしぶくりょうがん）、当帰芍薬散",
      rationale: "瘀血は血栓や微小循環障害を示す検査結果ではありません。痛みと月経の経過を整理し、観察と解釈を分ける学習例です。",
    },
  },
];

interface Props {
  onNextLecture?: () => void;
}

export default function QiBloodClinicalFlow({ onNextLecture }: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-1");
  const currentCase = FLOW_CASES.find((c) => c.id === selectedCaseId)!;

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑤：気血水・臓腑・治則の用語を比較する学習フロー</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            所見と解釈を分け、候補と不足情報を整理する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          学習ケースを選んで、説明の範囲を確認
        </span>
      </div>

      {/* 症例セレクターピル */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {FLOW_CASES.map((fc) => {
          const isSelected = selectedCaseId === fc.id;
          return (
            <button
              key={fc.id}
              onClick={() => setSelectedCaseId(fc.id)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "bg-white dark:bg-[#121920] shadow-sm border-2 ring-1 ring-offset-1"
                  : "bg-[#FAF8F5] dark:bg-[#121920] border-[#E8E1D1] dark:border-[#22303D] opacity-80 hover:opacity-100"
              }`}
              style={{
                borderColor: isSelected ? fc.attributeColor : undefined,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: fc.attributeColor }}
                />
                <span className="text-xs font-bold" style={{ color: fc.attributeColor }}>
                  {fc.category}を比べる例
                </span>
              </div>
              <div className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                {fc.symptomTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* 臨床推論の多段階フロー（4ステップ展開） */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Stethoscope className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <h5 className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
            学習の4ステップ：{currentCase.symptomTitle}
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* STEP 1: 伝統分類の候補 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A] relative">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              STEP 01
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              {currentCase.step1.label}
            </div>
            <div
              className="text-base font-bold mb-1"
              style={{ color: currentCase.attributeColor }}
            >
              {currentCase.step1.result}
            </div>
            <div className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
              {currentCase.step1.sub}
            </div>
          </div>

          {/* STEP 2: 候補の比較と不足情報 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A] relative">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              STEP 02
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              {currentCase.step2.label}
            </div>
            <div className="text-base font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              【{currentCase.step2.targetOrgan}】
            </div>
            <div className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
              確認したい情報：{currentCase.step2.symptoms}
            </div>
          </div>

          {/* STEP 3: 治則・治法 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A] relative">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              STEP 03
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              {currentCase.step3.label}
            </div>
            <div className="text-base font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-1">
              {currentCase.step3.principle}
            </div>
            <div className="text-[11px] font-medium text-[#B86924] dark:text-[#E6C387]">
              分類：{currentCase.step3.method}
            </div>
          </div>

          {/* STEP 4: 用語の学習例 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              STEP 04
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              {currentCase.step4.label}
            </div>
            <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              方剤名の例：{currentCase.step4.herbalFormula}
            </div>
            <div className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
              経穴名の例：{currentCase.step4.acupoints.join("、")}
            </div>
          </div>
        </div>

        {/* 学習モデルの解釈範囲 */}
        <div className="mt-4 p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
          <p className="text-xs text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
            <span className="font-bold">解釈の限界：</span>
            {currentCase.step4.rationale}
            臓腑名は伝統的な機能分類を表し、解剖学的臓器の病名を確定するものではありません。方剤・経穴の例示から適応や効果を決めず、使用・施術の提案とも区別して学びます。
          </p>
        </div>
      </div>

      {/* 次の講義へのナビゲーションカード */}
      <div className="bg-gradient-to-r from-[#1E3D34] to-[#2E5A44] dark:from-[#122816] dark:to-[#1B4D3E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A5D6A7] font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>カリキュラムの次なるステージへ</span>
          </div>
          <h5 className="font-serif font-bold text-lg sm:text-xl text-white">
            体系学習カリキュラム④：生命機能論（営衛・三焦・気化システム）
          </h5>
          <p className="text-xs text-[#E8F5E9]/90 mt-1 max-w-xl leading-relaxed">
            営衛・三焦などの伝統的用語の役割を学び、現代医学の説明との違いを整理します。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>臓腑の基礎へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <QiBloodLearningScope />
    </figure>
  );
}
