'use client';

import React, { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCurriculumProgress, type QuizResultRecord } from '@/contexts/CurriculumProgressContext';
import { useModalDialog } from '@/hooks/useModalDialog';
import { X, AlertCircle, CheckCircle2, RotateCcw, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface IncorrectQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLecture?: (lectureId: string, chapterId: string) => void;
}

export const IncorrectQuestionsModal: React.FC<IncorrectQuestionsModalProps> = ({ isOpen, ...props }) => {
  const { user } = useAuth();
  const { isMounted } = useCurriculumProgress();
  // Closing or changing accounts discards only this temporary practice view.
  if (!isOpen || !isMounted) return null;
  return <IncorrectQuestionsWorkspace key={user?.id || 'guest'} {...props} />;
};

function IncorrectQuestionsWorkspace({ onClose, onNavigateToLecture }: Omit<IncorrectQuestionsModalProps, 'isOpen'>) {
  const { getIncorrectQuestions, saveQuizResult, quizResults } = useCurriculumProgress();
  // Keep this set visible after grading so a correct answer does not remove its
  // feedback before the learner has read it. The next opening uses current results.
  const [questions] = useState(() => getIncorrectQuestions().filter(question => question.kind !== 'exam'));
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [retestedResults, setRetestedResults] = useState<Record<string, boolean>>({});
  const submitted = useRef(new Set<string>());
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const descriptionId = useId();
  useModalDialog(true, dialogRef, onClose);
  const remaining = questions.filter(question => retestedResults[question.questionId] !== true).length;

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted.current.has(questionId)) return;
    setSelectedAnswers(previous => ({ ...previous, [questionId]: optionIndex }));
  };
  const handleRetestSubmit = (item: QuizResultRecord) => {
    const chosenIndex = selectedAnswers[item.questionId];
    if (chosenIndex === undefined || submitted.current.has(item.questionId)) return;
    submitted.current.add(item.questionId);
    const isCorrect = chosenIndex === item.correctAnswerIndex;
    setRetestedResults(previous => ({ ...previous, [item.questionId]: isCorrect }));
    // Every attempt follows the same validation, immutable history and scheduling
    // path. Preserve this record's source, revision and practice destination.
    saveQuizResult({ ...item, userAnswerIndex: chosenIndex, isCorrect, answeredAt: new Date().toISOString() });
  };
  const retry = (questionId: string) => {
    submitted.current.delete(questionId);
    setSelectedAnswers(previous => Object.fromEntries(Object.entries(previous).filter(([id]) => id !== questionId)));
    setRetestedResults(previous => Object.fromEntries(Object.entries(previous).filter(([id]) => id !== questionId)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={headingId} aria-describedby={descriptionId} tabIndex={-1}
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-800/50 sm:px-6">
          <div>
            <h2 id={headingId} className="text-lg font-bold text-slate-900 dark:text-white">間違えた問題の集中復習</h2>
            <p id={descriptionId} className="mt-1 text-sm text-slate-600 dark:text-slate-300">今回のセット：{questions.length}問 ／ 正解を確認する問題：{remaining}問</p>
          </div>
          <button type="button" onClick={onClose} aria-label="復習を閉じる" className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-slate-300 dark:hover:bg-slate-700"><X aria-hidden="true" className="h-6 w-6" /></button>
        </div>

        <div className="space-y-6 overflow-y-auto p-4 sm:p-6">
          {questions.length === 0 ? (
            <div className="py-8 text-center">
              <Sparkles aria-hidden="true" className="mx-auto mb-4 h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">直近の回答が不正解だった問題はありません</h3>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">予定日が来た問題は「今日の復習」から確認できます。</p>
              <Link href="/learn/review#learning-review" onClick={onClose} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#83BEA8]">今日の復習へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          ) : questions.map((item, index) => {
            const choice = selectedAnswers[item.questionId];
            const result = retestedResults[item.questionId];
            const answered = result !== undefined;
            const readingHref = item.kind === 'acupoint' ? item.practiceHref || '/tsubo/practice'
              : `/curriculum/${item.lectureId}?review=${encodeURIComponent(item.questionId)}#review-question-card`;
            return (
              <section key={item.questionId} aria-labelledby={`${headingId}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60 sm:p-5">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{item.chapterTitle} ／ {item.lectureTitle}</p>
                <h3 id={`${headingId}-${index}`} className="mt-3 whitespace-pre-line text-base font-bold leading-relaxed text-slate-900 dark:text-white">第{index + 1}問　{item.questionText}</h3>
                <div className="mt-4 space-y-2">
                  {item.options.map((option, optionIndex) => (
                    <button key={optionIndex} type="button" disabled={answered} aria-pressed={choice === optionIndex}
                      onClick={() => handleSelect(item.questionId, optionIndex)}
                      className={`block min-h-11 w-full rounded-xl border p-3 text-left text-base leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-4 ${choice === optionIndex ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100' : 'border-slate-300 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200'}`}>
                      {optionIndex + 1}. {option}
                      {answered && (optionIndex === item.correctAnswerIndex || choice === optionIndex) && <strong className="mt-1 block">{optionIndex === item.correctAnswerIndex ? '正解' : '選んだ回答（不正解）'}</strong>}
                    </button>
                  ))}
                </div>
                {!answered ? <button type="button" onClick={() => handleRetestSubmit(item)} disabled={choice === undefined}
                  className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#1E3D34] px-4 py-2 text-base font-bold text-white disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4">回答して判定する</button> : (
                  <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-base leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    <p role="status" className="flex items-center gap-2 font-bold">{result ? <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" /> : <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />}{result ? '正解です。解説で考え方を確認しましょう。' : '不正解です。解説を読み、選んだ理由を振り返りましょう。'}</p>
                    <h4 className="quiz-explanation-title font-bold">解説</h4>
                    <p className="quiz-explanation-body whitespace-pre-line">{item.explanation}</p>
                    {quizResults[item.questionId]?.nextReviewDate && <p className="text-sm">次回復習：{quizResults[item.questionId].nextReviewDate}</p>}
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {!result && <button type="button" onClick={() => retry(item.questionId)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#83BEA8]"><RotateCcw aria-hidden="true" className="h-4 w-4" />もう一度考える</button>}
                      <Link href={readingHref} onClick={onClose} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#83BEA8]"><BookOpen aria-hidden="true" className="h-4 w-4" />{item.kind === 'acupoint' ? '経穴演習で確認する' : '講義で復習する'}</Link>
                      {onNavigateToLecture && <button type="button" onClick={() => { onClose(); onNavigateToLecture(item.lectureId, item.chapterId); }} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">講義の冒頭へ</button>}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6">
          <p className="text-sm text-slate-600 dark:text-slate-300">正誤とも回答履歴に保存します。正解した問題も、閉じるまで解説を読めます。</p>
          <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center rounded-xl bg-slate-200 px-5 py-2 text-base font-bold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-slate-700 dark:text-slate-100">閉じる</button>
        </div>
      </div>
    </div>
  );
}
