'use client';

import React, { useState } from 'react';
import { useCurriculumProgress, QuizResultRecord } from '@/contexts/CurriculumProgressContext';
import {
  X,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  ExternalLink,
} from 'lucide-react';

interface IncorrectQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLecture?: (lectureId: string, chapterId: string) => void;
}

export const IncorrectQuestionsModal: React.FC<IncorrectQuestionsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLecture,
}) => {
  const { getIncorrectQuestions, saveQuizResult } = useCurriculumProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [retestedResults, setRetestedResults] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const incorrectList = getIncorrectQuestions();

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleRetestSubmit = (item: QuizResultRecord) => {
    const chosenIndex = selectedAnswers[item.questionId];
    if (chosenIndex === undefined) return;

    const isNowCorrect = chosenIndex === item.correctAnswerIndex;
    setRetestedResults((prev) => ({
      ...prev,
      [item.questionId]: isNowCorrect,
    }));

    if (isNowCorrect) {
      // 正解したらContextの記録を正解に更新（間違えたリストから克服・除外される）
      saveQuizResult({
        ...item,
        userAnswerIndex: chosenIndex,
        isCorrect: true,
        answeredAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* モーダルヘッダー */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                間違えた問題の集中復習
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                要復習の問題をもう一度解き直して、弱点を克服しましょう（残り: {incorrectList.length}問）
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* モーダル本体（スクロール領域） */}
        <div className="p-6 overflow-y-auto space-y-6">
          {incorrectList.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                復習が必要な問題はありません！
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                回答したすべての確認問題で正解を達成しています。新しい講義に進んで学びを深めましょう。
              </p>
            </div>
          ) : (
            incorrectList.map((item, idx) => {
              const currentChoice = selectedAnswers[item.questionId];
              const retested = retestedResults[item.questionId];

              return (
                <div
                  key={item.questionId}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 transition-all shadow-sm"
                >
                  {/* 所属講義タグとジャンプ */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {item.chapterTitle}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {item.lectureTitle}
                      </span>
                    </div>
                    {onNavigateToLecture && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigateToLecture(item.lectureId, item.chapterId);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                      >
                        <span>該当レッスンへ</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* 問題文 */}
                  <p className="font-bold text-slate-900 dark:text-white text-base mb-4 leading-relaxed">
                    <span className="text-rose-500 mr-2">Q{idx + 1}.</span>
                    {item.questionText}
                  </p>

                  {/* 選択肢 */}
                  <div className="space-y-2 mb-4">
                    {item.options.map((opt, optIdx) => {
                      const isSelected = currentChoice === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelect(item.questionId, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-medium ring-2 ring-emerald-500/20'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {optIdx + 1}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 再判定アクション */}
                  <div className="flex items-center justify-between pt-2">
                    {retested === false ? (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        惜しい！もう一度解説を読んで考えてみよう。
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        正しいと思う選択肢を選んで判定してください
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRetestSubmit(item)}
                      disabled={currentChoice === undefined}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                        currentChoice !== undefined
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      回答して判定する
                    </button>
                  </div>

                  {/* 解説アコーディオン/表示 */}
                  <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      解説とヒント
                    </div>
                    {item.explanation}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* フッター */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            全問克服すると間違えた問題リストは自動的にクリアされます
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
