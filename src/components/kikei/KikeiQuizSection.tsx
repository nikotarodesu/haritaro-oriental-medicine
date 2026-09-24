"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Award, ArrowRight } from "lucide-react";
import { KikeiVessel } from "@/data/kikeiData";

interface Props {
  vessel: KikeiVessel;
}

// 配列シャッフル関数（Fisher-Yates）
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function KikeiQuizSection({ vessel }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [quizSeed, setQuizSeed] = useState(0);

  // 脈に応じた臨床演習問題（quizSeedまたはvesselが変わった時のみシャッフル）
  const questions = useMemo(() => {
    return [
      {
        id: "q1",
        question: `【通穴の特定】${vessel.name}に通ずる八脈交会穴（主穴）として正しい経穴はどれか？`,
        options: shuffleArray([
          { text: `${vessel.masterPoint.name}（${vessel.masterPoint.meridian}）`, isCorrect: true },
          { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: false },
          { text: "合谷（手陽明大腸経）", isCorrect: false },
          { text: "太衝（足厥陰肝経）", isCorrect: false },
        ]),
        explanation: `${vessel.name}の八脈交会穴（主穴）は「${vessel.masterPoint.name}（${vessel.masterPoint.code}）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。`,
      },
      {
        id: "q2",
        question: `【配穴ペアの特定】${vessel.name}の通穴（${vessel.masterPoint.name}）と対をなす交会配穴（${vessel.pairName}）はどれか？`,
        options: shuffleArray([
          { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: true },
          { text: "足三里（足陽明胃経）", isCorrect: false },
          { text: "三陰交（足太陰脾経）", isCorrect: false },
          { text: "風池（足少陽胆経）", isCorrect: false },
        ]),
        explanation: `${vessel.name}は「${vessel.pairName}」を構成し、主に【${vessel.pairTargetArea}】の病態に即効性を示します。主穴と相補的に作用します。`,
      },
      {
        id: "q3",
        question: `【主治病証の鑑別】${vessel.name}の臨床適応・主治病証として最も特徴的なものはどれか？`,
        options: shuffleArray([
          { text: vessel.indications[0] || "特有の主治病証", isCorrect: true },
          { text: "外感風寒による初期の一過性表寒証のみ", isCorrect: false },
          { text: "特記すべき適応病証はなく、診断用のみ", isCorrect: false },
        ]),
        explanation: `${vessel.name}の主治には「${vessel.indications.slice(0, 2).join("・")}」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。`,
      },
    ];
  }, [vessel, quizSeed]);

  const currentQ = questions[currentIdx];
  const isSelectedCorrect = selectedOpt !== null ? currentQ.options[selectedOpt]?.isCorrect : false;
  const correctOption = currentQ.options.find(o => o.isCorrect);

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
    setQuizSeed(prev => prev + 1);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B86924]" />
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
            {vessel.name} 八脈交会穴 臨床演習チェック
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]">
          全 {questions.length} 問
        </span>
      </div>

      {!isFinished ? (
        <div className="space-y-4 pt-1">
          {/* 進捗と現在スコア */}
          <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              設問 {currentIdx + 1} / {questions.length}
            </span>
            <span className="font-medium">
              現在正答数: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{score}</strong> / {currentIdx + (showAnswer ? 1 : 0)} 問
            </span>
          </div>

          {/* 問題文 */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9]/80 dark:border-[#2A3B4A]/80">
            <p className="font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* 選択肢一覧 */}
          <div className="space-y-2.5 pt-1">
            {currentQ.options.map((opt, idx) => {
              const isChosen = selectedOpt === idx;
              let btnStyle = "bg-white dark:bg-[#141C24] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[#232826] dark:text-[#FAF8F5]";

              if (showAnswer) {
                if (opt.isCorrect) {
                  // 正解選択肢
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold shadow-xs ring-2 ring-emerald-500/20";
                } else if (isChosen) {
                  // 自分が選んだ不正解
                  btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-500/20";
                } else {
                  // 選ばれていない不正解
                  btnStyle = "bg-gray-50/50 dark:bg-[#121920]/40 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={showAnswer}
                  className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-3 ${btnStyle} ${
                    !showAnswer ? "cursor-pointer hover:shadow-xs" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        showAnswer && opt.isCorrect
                          ? "bg-emerald-600 text-white"
                          : showAnswer && isChosen && !opt.isCorrect
                          ? "bg-rose-600 text-white"
                          : "bg-[#EAE4D5] dark:bg-[#22303D] text-[#59615D] dark:text-[#A8B8C4]"
                      }`}
                    >
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </div>

                  {/* 正誤判定アイコン & バッジ */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {showAnswer && opt.isCorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>正解</span>
                      </span>
                    )}
                    {showAnswer && isChosen && !opt.isCorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        <span>あなたの回答</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 回答後の判定アラート & 臨床解説 */}
          {showAnswer && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 animate-fadeIn ${
                isSelectedCorrect
                  ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60"
                  : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700/60"
              }`}
            >
              {/* 正誤判定の明瞭なヘッダー */}
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isSelectedCorrect
                    ? "border-emerald-200 dark:border-emerald-800/60"
                    : "border-rose-200 dark:border-rose-800/60"
                }`}
              >
                {isSelectedCorrect ? (
                  <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-100 font-bold text-sm sm:text-base">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="leading-tight">正解！見事です</div>
                      <div className="text-[11px] font-normal text-emerald-700 dark:text-emerald-300">
                        正しい経穴と理論を選択できました
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-rose-900 dark:text-rose-100 font-bold text-sm sm:text-base">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="leading-tight">不正解… もう一度確認しましょう</div>
                      <div className="text-[11px] font-normal text-rose-700 dark:text-rose-300">
                        正解は「<strong className="underline underline-offset-2">{correctOption?.text}</strong>」です
                      </div>
                    </div>
                  </div>
                )}

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                    isSelectedCorrect
                      ? "bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100"
                      : "bg-rose-200/80 dark:bg-rose-900/80 text-rose-900 dark:text-rose-100"
                  }`}
                >
                  {isSelectedCorrect ? "+1 正解" : "不正解"}
                </span>
              </div>

              {/* 臨床ポイント・解説文 */}
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="font-bold flex items-center gap-1.5 text-[#232826] dark:text-[#FAF8F5]">
                  <Award className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                  <span>臨床ポイントの解説</span>
                </div>
                <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed pl-5 sm:pl-6">
                  {currentQ.explanation}
                </p>
              </div>

              {/* 次へ進むアクション */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {currentIdx + 1 < questions.length ? "次の問題へ進む" : "演習結果を確認する"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 全問終了後の結果画面 */
        <div className="text-center py-6 sm:py-8 space-y-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-xs ${
              score === questions.length
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A1E14] dark:text-[#E6C387]"
            }`}
          >
            <Award className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              {score === questions.length ? "全問正解！完璧にマスターしました！" : "演習完了！"}
            </h4>
            <div className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              正答率: {score} / {questions.length} 問正解 ({Math.round((score / questions.length) * 100)}%)
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#96A6B2] max-w-md mx-auto pt-1">
              {score === questions.length
                ? `${vessel.name}の流注・八脈交会穴の配穴理論を完全に理解できています。実際の臨床弁証でも自信を持って活用できます。`
                : `${vessel.name}の要点をもう一度復習して、全問正解を目指しましょう。`}
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>もう一度挑戦する（問題を再シャッフル）</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
