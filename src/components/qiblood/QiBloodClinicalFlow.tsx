"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, Stethoscope, Compass, Zap, Heart, Droplets, BookOpen } from "lucide-react";

interface FlowCase {
  id: string;
  category: "気虚" | "気滞" | "血虚" | "瘀血" | "痰湿";
  attributeColor: string;
  symptomTitle: string;
  step1: {
    label: "気血水の判定";
    result: string;
    sub: string;
  };
  step2: {
    label: "随伴症状から臓腑を同定";
    symptoms: string;
    targetOrgan: string;
    organKana: string;
  };
  step3: {
    label: "治療方針（治則・治法）";
    principle: string;
    method: "補法（エネルギー補填）" | "通法・瀉法（渋滞解消）" | "化湿（ゴミ掃除）";
  };
  step4: {
    label: "代表ツボ・処方例";
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
    symptomTitle: "「だるくて動けない・食後に猛烈に眠い」ケース",
    step1: {
      label: "気血水の判定",
      result: "気虚（ききょ）",
      sub: "生命力・推進力のバッテリー切れ",
    },
    step2: {
      label: "随伴症状から臓腑を同定",
      symptoms: "食後強い眠気、軟便・泥状便、手足がだるい",
      targetOrgan: "脾気虚（ひききょ）",
      organKana: "ひききょ",
    },
    step3: {
      label: "治療方針（治則・治法）",
      principle: "健脾益気（けんぴえっき）",
      method: "補法（エネルギー補填）",
    },
    step4: {
      label: "代表ツボ・処方例",
      acupoints: ["足三里（あしさんり）", "中脘（ちゅうかん）", "脾兪（ひゆ）"],
      herbalFormula: "補中益気湯（ほちゅうえっきとう）、六君子湯",
      rationale: "脾胃の消化吸収エンジンを底上げし、飲食物からの気血産生を再起動する。",
    },
  },
  {
    id: "case-2",
    category: "気滞",
    attributeColor: "#00897B",
    symptomTitle: "「胸や脇が張り、怒りっぽく喉がつまる」ケース",
    step1: {
      label: "気血水の判定",
      result: "気滞（きたい）",
      sub: "自律神経の過緊張・気の流通障害",
    },
    step2: {
      label: "随伴症状から臓腑を同定",
      symptoms: "胸脇苦満、イライラ・怒り、喉の異物感（梅核気）",
      targetOrgan: "肝気鬱結（かんきうっけつ）",
      organKana: "かんきうっけつ",
    },
    step3: {
      label: "治療方針（治則・治法）",
      principle: "疏肝理気（そかんりき）",
      method: "通法・瀉法（渋滞解消）",
    },
    step4: {
      label: "代表ツボ・処方例",
      acupoints: ["太衝（たいしょう）", "壇中（だんちゅう）", "内関（ないかん）"],
      herbalFormula: "四逆散（しぎゃくさん）、半夏厚朴湯、加味逍遙散",
      rationale: "肝の緊張を緩めて気の巡りを解放し、自律神経の渋滞を解除する。",
    },
  },
  {
    id: "case-3",
    category: "血虚",
    attributeColor: "#D32F2F",
    symptomTitle: "「動悸がして眠れない・不安で夢を多く見る」ケース",
    step1: {
      label: "気血水の判定",
      result: "血虚（けっきょ）",
      sub: "精神を養う燃料（血）の枯渇",
    },
    step2: {
      label: "随伴症状から臓腑を同定",
      symptoms: "動悸、不眠・多夢、健忘、不安感、顔色不良",
      targetOrgan: "心血虚（しんけっきょ）",
      organKana: "しんけっきょ",
    },
    step3: {
      label: "治療方針（治則・治法）",
      principle: "養心補血・安神（あんしん）",
      method: "補法（エネルギー補填）",
    },
    step4: {
      label: "代表ツボ・処方例",
      acupoints: ["神門（しんもん）", "三陰交（さんいんこう）", "心兪（しんゆ）"],
      herbalFormula: "帰脾湯（きひとう）、酸棗仁湯（さんそうにんとう）",
      rationale: "精神の拠点である「心」に血を満たし、脳の興奮と不安を鎮静させる。",
    },
  },
  {
    id: "case-4",
    category: "瘀血",
    attributeColor: "#880E4F",
    symptomTitle: "「生理痛が刺すように重く、血塊が出る」ケース",
    step1: {
      label: "気血水の判定",
      result: "瘀血（おけつ）",
      sub: "骨盤内・微小毛細血管のうっ滞",
    },
    step2: {
      label: "随伴症状から臓腑を同定",
      symptoms: "下腹部の針刺痛、暗紫色の血塊、唇の色が悪い",
      targetOrgan: "胞宮瘀血（ほうきゅうおけつ）",
      organKana: "ほうきゅうおけつ",
    },
    step3: {
      label: "治療方針（治則・治法）",
      principle: "活血化瘀（かっけつかお）",
      method: "通法・瀉法（渋滞解消）",
    },
    step4: {
      label: "代表ツボ・処方例",
      acupoints: ["血海（けっかい）", "合谷（ごうこく）", "次髎（じりょう）"],
      herbalFormula: "桂枝茯苓丸（けいしぶくりょうがん）、当帰芍薬散",
      rationale: "局所の血塊を融解し、骨盤内の微小循環を再疎通させて痛みを根絶する。",
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
            <span>画像解説⑤：気血水 ➜ 臓腑 ➜ 治則の臨床推論フローチャート</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            全身の実体から「標的臓腑」を絞り込み、治療のベクトルを決定する
          </h4>
        </div>
        <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">
          症例を選んで推論プロセスを確認
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
                  {fc.category}パターン
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
            臨床推論の4ステップ：{currentCase.symptomTitle}
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* STEP 1: 気血水の失調 */}
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

          {/* STEP 2: 標的臓腑の特定 */}
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
              根拠：{currentCase.step2.symptoms}
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

          {/* STEP 4: ツボ・処方 */}
          <div className="bg-white dark:bg-[#17212A] rounded-xl p-4 border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <div className="text-[10px] font-mono font-bold text-[#8C9691] dark:text-[#64748B] mb-1">
              STEP 04
            </div>
            <div className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2">
              {currentCase.step4.label}
            </div>
            <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] mb-1">
              {currentCase.step4.herbalFormula}
            </div>
            <div className="text-[11px] text-[#59615D] dark:text-[#96A6B2]">
              ツボ：{currentCase.step4.acupoints.join("、")}
            </div>
          </div>
        </div>

        {/* 臨床メカニズム補足 */}
        <div className="mt-4 p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
          <p className="text-xs text-[#3E4541] dark:text-[#CBD5E1] leading-relaxed">
            <span className="font-bold">推論のポイント：</span>
            {currentCase.step4.rationale}
            東洋医学の診断は、「全身の気血水の状態（マクロ）」を把握してから「どの臓腑が主座か（ミクロ）」を絞り込むため、症状の根本原因を撃ち抜くことができます。
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
            気血水がどのように体内を循環し、昼夜のリズム（営衛の交代）や全身の水分代謝ハイウェイ（三焦水道）を駆動しているのか、動態システムの深奥を学びます。
          </p>
        </div>

        <button
          onClick={onNextLecture}
          className="shrink-0 px-5 py-3 rounded-xl bg-[#FFA000] hover:bg-[#FF8F00] text-[#1E3D34] font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:translate-x-0.5"
        >
          <span>第4講へ進む</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </figure>
  );
}
