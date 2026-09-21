"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Sparkles, RefreshCw, Award } from "lucide-react";
import { KikeiVessel } from "@/data/kikeiData";

interface Props {
  vessel: KikeiVessel;
}

export default function KikeiQuizSection({ vessel }: Props) {
  // 脈に応じた臨床演習問題
  const questions = [
    {
      id: "q1",
      question: `【通穴の特定】${vessel.name}に通ずる八脈交会穴（主穴）として正しい経穴はどれか？`,
      options: [
        { text: `${vessel.masterPoint.name}（${vessel.masterPoint.meridian}）`, isCorrect: true },
        { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: false },
        { text: "合谷（手陽明大腸経）", isCorrect: false },
        { text: "太衝（足厥陰肝経）", isCorrect: false },
      ].sort(() => 0.5 - Math.random()),
      explanation: `正解です。${vessel.name}の八脈交会穴（主穴）は${vessel.masterPoint.name}（${vessel.masterPoint.code}）です。`,
    },
    {
      id: "q2",
      question: `【配穴ペアの特定】${vessel.name}の通穴（${vessel.masterPoint.name}）と対をなす交会配穴（${vessel.pairName}）はどれか？`,
      options: [
        { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: true },
        { text: "足三里（足陽明胃経）", isCorrect: false },
        { text: "三陰交（足太陰脾経）", isCorrect: false },
        { text: "風池（足少陽胆経）", isCorrect: false },
      ].sort(() => 0.5 - Math.random()),
      explanation: `正解です。${vessel.name}は「${vessel.pairName}」を構成し、主に【${vessel.pairTargetArea}】の病態に即効性を示します。`,
    },
    {
      id: "q3",
      question: `【主治病証の鑑別】${vessel.name}の臨床適応・主治病証として最も特徴的なものはどれか？`,
      options: [
        { text: vessel.indications[0] || "特有の主治病証", isCorrect: true },
        { text: "外感風寒による初期の一過性表寒証のみ", isCorrect: false },
        { text: "特記すべき適応病証はなく、診断用のみ", isCorrect: false },
      ].sort(() => 0.5 - Math.random()),
      explanation: `正解です。${vessel.name}の主治には「${vessel.indications.slice(0, 2).join("・")}」などがあり、頑固な慢性病や気血の偏在調整に多用されます。`,
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOpt(idx);
    setShowAnswer(true);
    if (currentQ.options[idx].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B86924]" />
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            {vessel.name} 八脈交会穴 臨床演習チェック
          </h3>
        </div>
        <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
          全 {questions.length} 問
        </span>
      </div>

      {!isFinished ? (
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
            <span>設問 {currentIdx + 1} / {questions.length}</span>
            <span>正答数: {score}問</span>
          </div>

          <p className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
            {currentQ.question}
          </p>

          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt, idx) => {
              const isChosen = selectedOpt === idx;
              let btnStyle = "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-[#232826] dark:text-[#FAF8F5]";
              if (showAnswer) {
                if (opt.isCorrect) {
                  btnStyle = "bg-green-50 dark:bg-green-950/40 border-green-500 text-green-800 dark:text-green-300 font-bold";
                } else if (isChosen) {
                  btnStyle = "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-800 dark:text-red-300";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={showAnswer}
                  className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {showAnswer && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  )}
                  {showAnswer && isChosen && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#131B22] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 animate-fadeIn text-xs">
              <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white text-xs font-bold transition-colors"
                >
                  {currentIdx + 1 < questions.length ? "次の問題へ" : "結果を確認する"}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3EF] text-[#1E3D34] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
              演習完了！ {score} / {questions.length} 問正解
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              {vessel.name}の流注・八脈交会穴の配穴理論を正しく確認できました。
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#151D25] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#EBE4D5] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>もう一度挑戦する</span>
          </button>
        </div>
      )}
    </div>
  );
}
