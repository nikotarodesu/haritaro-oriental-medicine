'use client';

import React, { useState, useEffect } from 'react';
import { LessonQuizGroup, QuizQuestionItem } from '@/data/curriculumQuizzes';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Trophy
} from 'lucide-react';

interface InteractiveQuizProps {
  quiz: LessonQuizGroup;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz }) => {
  const {
    quizResults,
    saveQuizResult,
    clearQuizResult,
    setLectureCompleted,
    isMounted
  } = useCurriculumProgress();

  // 各問題に対するユーザーの選択状態 (questionId -> optionIndex)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  // 既存の回答記録をマウント時に同期
  useEffect(() => {
    if (!isMounted) return;
    const initialAnswers: Record<string, number> = {};
    quiz.questions.forEach((q) => {
      const record = quizResults[q.id];
      if (record !== undefined) {
        initialAnswers[q.id] = record.userAnswerIndex;
      }
    });
    setSelectedAnswers(initialAnswers);
  }, [isMounted, quiz.lectureId, quiz.questions, quizResults]);

  // 全問題数
  const totalQuestions = quiz.questions.length;

  // 回答済みの問題数
  const answeredCount = quiz.questions.filter(
    (q) => selectedAnswers[q.id] !== undefined
  ).length;

  // 正解数
  const correctCount = quiz.questions.filter((q) => {
    const chosen = selectedAnswers[q.id];
    return chosen !== undefined && chosen === q.correctIndex;
  }).length;

  // 正答率（パーセント）
  const accuracyRate =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // 合格判定（設定された合格ライン以上、または2問以上正解）
  const isPassed = correctCount >= (quiz.passingScore || 2);
  const isPerfect = correctCount === totalQuestions && totalQuestions > 0;
  const isAllAnswered = answeredCount === totalQuestions;

  // ユーザーがクイズを解いて全問回答＆合格した「その瞬間」のみ自動完了にする（初期ロード時や手動解除時は再発火させない）
  const hasAutoCompletedRef = React.useRef(false);
  const prevAnsweredCountRef = React.useRef(answeredCount);

  useEffect(() => {
    if (!isMounted) return;
    // 回答数が増加して全問回答に達し、かつ合格した場合の瞬間のみ実行
    if (prevAnsweredCountRef.current < totalQuestions && isAllAnswered && isPassed && !hasAutoCompletedRef.current) {
      hasAutoCompletedRef.current = true;
      setLectureCompleted(quiz.lectureId, true);
    }
    prevAnsweredCountRef.current = answeredCount;
  }, [isMounted, answeredCount, totalQuestions, isAllAnswered, isPassed, quiz.lectureId, setLectureCompleted]);

  // 選択肢をクリックしたときの処理
  const handleSelectOption = (question: QuizQuestionItem, optionIndex: number) => {
    // 既に回答済みの場合は変更不可（リトライボタンでやり直す）
    if (selectedAnswers[question.id] !== undefined) return;

    // 状態を更新
    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex,
    }));

    // Contextに結果を保存（間違えた問題の復習用）
    const isCorrect = optionIndex === question.correctIndex;
    saveQuizResult({
      questionId: question.id,
      lectureId: quiz.lectureId,
      chapterId: quiz.chapterId,
      chapterTitle: quiz.chapterTitle,
      lectureTitle: quiz.lectureTitle,
      questionText: question.question,
      userAnswerIndex: optionIndex,
      correctAnswerIndex: question.correctIndex,
      isCorrect,
      explanation: question.explanation,
      options: [...question.options],
      answeredAt: new Date().toISOString(),
    });
  };

  // もう一度挑戦する（全問リセット）
  const handleRetryAll = () => {
    hasAutoCompletedRef.current = false;
    setSelectedAnswers({});
    quiz.questions.forEach((q) => {
      clearQuizResult(q.id);
    });
  };

  return (
    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-100/80 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200">
                <HelpCircle className="w-3.5 h-3.5" />
                理解度チェック（全{totalQuestions}問・3択）
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                合格基準: {quiz.passingScore || 2}問以上正解でクリア
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              レッスン理解度チェック
            </h3>
          </div>

          {/* 右上ステータス */}
          {isAllAnswered && (
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                  isPerfect
                    ? 'bg-amber-500 text-white'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {isPerfect ? (
                  <>
                    <Trophy className="w-3.5 h-3.5" />
                    パーフェクト達成（3/3）
                  </>
                ) : isPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    レッスンクリア！
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    あと1問で合格
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* 3問の問題リスト */}
        <div className="space-y-8">
          {quiz.questions.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const isAnswered = chosen !== undefined;
            const isCorrect = isAnswered && chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-5 sm:p-6 transition-all"
              >
                {/* 設問番号 & 正否バッジ */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    第 {qIndex + 1} 問
                  </span>

                  {isAnswered && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          正解
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          不正解
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* 問題文 */}
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
                  {q.question}
                </h4>

                {/* 3択の選択肢 */}
                <div className="space-y-2.5">
                  {q.options.map((optionText, optIndex) => {
                    const isOptionChosen = chosen === optIndex;
                    const isOptionCorrectAnswer = q.correctIndex === optIndex;

                    let btnStyles =
                      'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-800 dark:text-slate-200';

                    if (isAnswered) {
                      if (isOptionCorrectAnswer) {
                        btnStyles =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-semibold text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                      } else if (isOptionChosen && !isCorrect) {
                        btnStyles =
                          'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 opacity-80';
                      } else {
                        btnStyles =
                          'border-slate-200/50 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/20 text-slate-400 dark:text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => handleSelectOption(q, optIndex)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 text-sm sm:text-base ${btnStyles} ${
                          !isAnswered ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isAnswered && isOptionCorrectAnswer
                              ? 'bg-emerald-600 text-white'
                              : isAnswered && isOptionChosen && !isCorrect
                              ? 'bg-rose-500 text-white'
                              : isOptionChosen
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {['A', 'B', 'C'][optIndex]}
                        </span>
                        <span className="flex-1 leading-snug">{optionText}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 回答後のワンポイント解説 */}
                {isAnswered && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-3.5 text-xs sm:text-sm">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-1">
                      <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      解説のポイント:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 総合スコア・正答率・クリア判定エリア */}
        {isAllAnswered && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-emerald-200 dark:border-slate-700">
            <div
              className={`rounded-2xl p-6 sm:p-7 text-center space-y-4 ${
                isPassed
                  ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {/* 正答率 & スコア */}
              <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  正答率
                </span>
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono ${
                    isPassed
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {accuracyRate}%
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  （{totalQuestions}問中 {correctCount}問正解）
                </span>
              </div>

              {/* メッセージ */}
              {isPassed ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-200">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>
                      {isPerfect
                        ? '全問正解！完璧にマスターしました！'
                        : 'おめでとうございます！レッスンクリア！'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-700/80 dark:text-emerald-300/80">
                    このレッスンの受講完了が自動記録されました。次のレッスンへ進みましょう！
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-rose-800 dark:text-rose-200">
                    <span>あと1問正解で合格ラインです！</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-700/80 dark:text-rose-300/80">
                    解説を振り返って、もう一度挑戦してみましょう。
                  </p>
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRetryAll}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  もう一度挑戦する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
