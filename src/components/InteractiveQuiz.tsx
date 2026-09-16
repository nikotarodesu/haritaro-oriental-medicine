'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/data/curriculumQuizzes';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';

interface InteractiveQuizProps {
  quiz: QuizQuestion;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz }) => {
  const { quizResults, saveQuizResult, clearQuizResult, isMounted } = useCurriculumProgress();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const existingResult = isMounted ? quizResults[quiz.id] : undefined;

  const handleSelect = (index: number) => {
    if (existingResult) return; // 既に回答済みの場合は変更不可
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === quiz.correctIndex;
    saveQuizResult({
      questionId: quiz.id,
      lectureId: quiz.lectureId,
      chapterId: quiz.chapterId,
      chapterTitle: quiz.chapterTitle,
      lectureTitle: quiz.lectureTitle,
      questionText: quiz.question,
      userAnswerIndex: selectedOption,
      correctAnswerIndex: quiz.correctIndex,
      isCorrect,
      explanation: quiz.explanation,
      options: quiz.options,
      answeredAt: new Date().toISOString(),
    });
  };

  const handleRetry = () => {
    setSelectedOption(null);
    clearQuizResult(quiz.id);
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-900/90 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
        {/* クイズヘッダー */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              演習
            </span>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg flex items-center gap-1.5">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              レッスン理解度チェック
            </h4>
          </div>
          {existingResult && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                existingResult.isCorrect
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
              }`}
            >
              {existingResult.isCorrect ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  正解（記録済）
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  要復習（記録済）
                </>
              )}
            </span>
          )}
        </div>

        {/* 問題文 */}
        <p className="text-slate-900 dark:text-slate-100 font-medium text-base sm:text-lg mb-5 leading-relaxed">
          {quiz.question}
        </p>

        {/* 選択肢リスト */}
        <div className="space-y-2.5 mb-6">
          {quiz.options.map((opt, idx) => {
            const isChosen = existingResult
              ? existingResult.userAnswerIndex === idx
              : selectedOption === idx;
            const isAnswer = existingResult && existingResult.correctAnswerIndex === idx;
            const isUserWrong =
              existingResult && !existingResult.isCorrect && existingResult.userAnswerIndex === idx;

            let cardStyles =
              'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 hover:border-emerald-400 hover:bg-emerald-50/20';

            if (existingResult) {
              if (isAnswer) {
                cardStyles =
                  'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/60 font-semibold text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30';
              } else if (isUserWrong) {
                cardStyles =
                  'border-rose-400 bg-rose-50/90 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 line-through opacity-80';
              } else {
                cardStyles =
                  'border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 opacity-60';
              }
            } else if (isChosen) {
              cardStyles =
                'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/50 font-medium text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={!!existingResult}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 text-sm sm:text-base ${cardStyles}`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isAnswer
                      ? 'bg-emerald-600 text-white'
                      : isUserWrong
                      ? 'bg-rose-500 text-white'
                      : isChosen
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* 解答アクション または 解説表示 */}
        {!existingResult ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md ${
                selectedOption !== null
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 active:scale-95 cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              回答を決定する
            </button>
          </div>
        ) : (
          <div className="bg-white/95 dark:bg-slate-900/90 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                解説・ポイント
              </span>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                もう一度解く
              </button>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {quiz.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
