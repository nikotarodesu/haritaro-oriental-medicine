"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle2, XCircle, Sparkles, RefreshCw, Award, ArrowRight } from "lucide-react";
import { KikeiVessel } from "@/data/kikeiData";
import { shuffledIndices } from "@/utils/learningReview";

interface Props {
  vessel: KikeiVessel;
  standalone?: boolean;
}

// 初回はサーバー・ブラウザで同じ並びにし、再挑戦時だけ種を進める。
function shuffleArray<T>(array: T[], seed: string): T[] {
  return shuffledIndices(array.length, seed).map(index => array[index]);
}

function focusHeading(node: HTMLElement | null) {
  node?.focus();
}

export default function KikeiQuizSection({ vessel, standalone = false }: Props) {
  const Title = standalone ? "h1" : "h2";
  const FeedbackHeading = standalone ? "h2" : "h3";
  const readingHref = standalone ? "/kikei/" + vessel.slug : "";
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
        question: `八脈交会穴のうち、${vessel.name}と結びつけて覚えるツボ（通穴）はどれですか？`,
        options: shuffleArray([
          { text: `${vessel.masterPoint.name}（${vessel.masterPoint.meridian}）`, isCorrect: true },
          { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: false },
          { text: "合谷（手陽明大腸経）", isCorrect: false },
          { text: "太衝（足厥陰肝経）", isCorrect: false },
        ], `${vessel.slug}:${quizSeed}:q1`),
        explanation: `${vessel.name}に対応する八脈交会穴は「${vessel.masterPoint.name}（${vessel.masterPoint.code}）」です。`,
      },
      {
        id: "q2",
        question: `${vessel.name}に対応する通穴と組み合わせるツボはどれですか？`,
        options: shuffleArray([
          { text: `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`, isCorrect: true },
          { text: "足三里（足陽明胃経）", isCorrect: false },
          { text: "三陰交（足太陰脾経）", isCorrect: false },
          { text: "風池（足少陽胆経）", isCorrect: false },
        ], `${vessel.slug}:${quizSeed}:q2`),
        explanation: `「${vessel.masterPoint.name}」と組み合わせるのは「${vessel.couplePoint.name}」です。古典では${vessel.pairTargetArea}と関連づけています。`,
      },
      {
        id: "q3",
        question: `『${vessel.classicQuote.book}』では、${vessel.name}をどう説明していますか？`,
        options: shuffleArray([
          { text: vessel.studyAnswer, isCorrect: true },
          { text: "手の指先だけを巡る", isCorrect: false },
          { text: "左右の手首を直接結ぶ", isCorrect: false },
        ], `${vessel.slug}:${quizSeed}:q3`),
        explanation: vessel.classicQuote.translation,
      },
    ];
  }, [vessel, quizSeed]);

  const currentQ = questions[currentIdx];
  const isSelectedCorrect = selectedOpt !== null ? currentQ.options[selectedOpt]?.isCorrect : false;

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
    <div id="kikei-quiz" className="scroll-mt-28 kikei-quiz bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B86924]" />
          <Title className={"font-serif font-bold " + (standalone ? "text-2xl sm:text-3xl" : "text-base sm:text-lg")}>
            {vessel.name}の確認問題
          </Title>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-4 pt-1">
          {/* 進捗と現在スコア */}
          <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              第{currentIdx + 1}問 ／ 全{questions.length}問
            </span>
            <span className="font-medium">
              {currentIdx + Number(showAnswer) > 0 && <>{currentIdx + Number(showAnswer)}問中{score}問正解</>}
            </span>
          </div>

          {/* 問題文 */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9]/80 dark:border-[#2A3B4A]/80">
            <p key={quizSeed + "-" + currentIdx} tabIndex={-1} ref={currentIdx > 0 || quizSeed > 0 ? focusHeading : undefined} className="scroll-mt-28 quiz-result font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
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
                  btnStyle = "bg-gray-50/50 dark:bg-[#121920]/40 border-gray-200 dark:border-gray-800 text-slate-700 dark:text-slate-300";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  disabled={showAnswer}
                  className={`quiz-option min-h-11 focus-visible:outline-2 focus-visible:outline-offset-4 w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-3 ${btnStyle} ${
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
              className={`review-explanation p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 animate-fadeIn ${
                isSelectedCorrect
                  ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60"
                  : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700/60"
              }`}
            >
              <FeedbackHeading ref={focusHeading} tabIndex={-1} className="quiz-explanation-title scroll-mt-28 text-base font-bold">
                {isSelectedCorrect ? "正解です" : "不正解です"}
              </FeedbackHeading>
              <p className="quiz-explanation-body text-sm leading-relaxed">{currentQ.explanation}</p>
              <a className="inline-flex min-h-11 items-center text-sm font-semibold text-accent underline underline-offset-4" href={readingHref + (currentIdx === 2 ? "#kikei-classic" : "#kikei-meeting-points")}>
                {currentIdx === 2 ? "古典の原文と訳を読む" : "八脈交会穴の組み合わせを見る"}
              </a>

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
            <FeedbackHeading tabIndex={-1} ref={focusHeading} className="scroll-mt-28 font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              {questions.length}問中{score}問正解
            </FeedbackHeading>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B6958] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>選択肢を並べ替えてもう一度解く</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
