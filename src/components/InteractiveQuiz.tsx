'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { LessonQuizGroup, QuizQuestionItem, getQuizSectionTitle } from '@/data/curriculumQuizzes';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Trophy,
  BookOpen,
  ArrowUp,
  ArrowRight,
  Shuffle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { questionRevision, shuffledIndices } from '@/utils/learningReview';
import QuestionEvidence from '@/components/learning/QuestionEvidence';
import Link from 'next/link';
import { getLearningCourse } from '@/data/learningCourses';
import { getCourseNextAction, type CourseJourney } from '@/utils/courseJourney';

interface InteractiveQuizProps {
  quiz: LessonQuizGroup;
  nextLecture?: {
    id: string;
    title: string;
  } | null;
  courseJourney?: CourseJourney | null;
}

// 選択肢のシャッフル関数 (Fisher-Yates)
const generateShuffleMap = (questions: QuizQuestionItem[]): Record<string, number[]> => {
  const map: Record<string, number[]> = {};
  questions.forEach((q) => {
    const arr = q.options.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    map[q.id] = arr;
  });
  return map;
};

// Web Audio API による合格・満点ファンファーレトーン
const playCelebrationFanfare = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (ド・ミ・ソ・高ド)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + idx * 0.09;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch {
    // サウンド非対応環境や自動再生制限時のサイレントフォールバック
  }
};

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz, nextLecture, courseJourney }) => {
  const router = useRouter();
  const {
    quizResults,
    saveQuizResult,
    clearQuizResult,
    setLectureCompleted,
    completedLectures,
  } = useCurriculumProgress();

  // 各問題に対するユーザーの選択状態 (questionId -> optionIndex)
  const selectedAnswers = useMemo(() => Object.fromEntries(quiz.questions.flatMap(q => quizResults[q.id] ? [[q.id, quizResults[q.id].userAnswerIndex]] : [])), [quiz.questions, quizResults]);

  // 選択肢シャッフル設定 & 各設問の表示インデックス配列 (questionId -> [orig0, orig1, orig2])
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(true);
  const [shuffleMap, setShuffleMap] = useState<Record<string, number[]>>(() => Object.fromEntries(quiz.questions.map(q => [q.id, shuffledIndices(q.options.length, q.id)])));

  // サウンド効果の有効・無効（初期値: ON）
  const [soundEnabled, setSoundEnabled] = useState(true);

  // パーフェクト達成時の祝賀演出（紙吹雪）フラグ
  const [showConfetti, setShowConfetti] = useState(false);

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

  // 不正解数
  const missedCount = quiz.questions.filter((q) => {
    const chosen = selectedAnswers[q.id];
    return chosen !== undefined && chosen !== q.correctIndex;
  }).length;

  // 正答率（パーセント）
  const accuracyRate =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // 合格判定（設定された合格ライン以上、または2問以上正解）
  const isPassed = correctCount >= (quiz.passingScore || 2);
  const isPerfect = correctCount === totalQuestions && totalQuestions > 0;
  const isAllAnswered = answeredCount === totalQuestions;
  const activeCourseJourney = courseJourney?.lectureId === quiz.lectureId ? courseJourney : null;
  const courseNextAction = activeCourseJourney ? getCourseNextAction(activeCourseJourney, completedLectures) : null;
  const nextCourse = activeCourseJourney?.course.nextCourseSlug ? getLearningCourse(activeCourseJourney.course.nextCourseSlug) : undefined;

  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measuredAttempt = useRef({ lectureId: quiz.lectureId, started: false, answered: new Set<string>() });
  useEffect(() => () => { if (celebrationTimer.current) clearTimeout(celebrationTimer.current); }, []);

  // 選択肢をクリックしたときの処理
  const handleSelectOption = useCallback(
    (question: QuizQuestionItem, optionIndex: number) => {
      // 既に回答済みの場合は変更不可
      if (selectedAnswers[question.id] !== undefined) return;
      if (measuredAttempt.current.lectureId !== quiz.lectureId) {
        measuredAttempt.current = { lectureId: quiz.lectureId, started: false, answered: new Set<string>() };
      }
      if (measuredAttempt.current.answered.has(question.id)) return;
      measuredAttempt.current.answered.add(question.id);
      if (!measuredAttempt.current.started) {
        measuredAttempt.current.started = true;
        trackEvent('quiz_start', { tool_id: 'curriculum_quiz', lecture_id: quiz.lectureId, total: quiz.questions.length });
      }

      // Contextに結果を保存（復習用）
      const isCorrect = optionIndex === question.correctIndex;
      trackEvent('quiz_answer', { tool_id: 'curriculum_quiz', lecture_id: quiz.lectureId, passed: isCorrect });
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
      const nextAnswers = { ...selectedAnswers, [question.id]: optionIndex };
      if (quiz.questions.every(q => nextAnswers[q.id] !== undefined)) {
        const score = quiz.questions.filter(q => nextAnswers[q.id] === q.correctIndex).length;
        const passed = score >= quiz.passingScore;
        if (passed) setLectureCompleted(quiz.lectureId, true);
        trackEvent('quiz_complete', { tool_id: 'curriculum_quiz', lecture_id: quiz.lectureId, passed, score, total: quiz.questions.length });
        if (score === quiz.questions.length) {
          setShowConfetti(true);
          if (soundEnabled) playCelebrationFanfare();
          if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
          celebrationTimer.current = setTimeout(() => setShowConfetti(false), 4500);
        }
      }
    },
    [selectedAnswers, quiz, saveQuizResult, setLectureCompleted, soundEnabled]
  );

  // 選択肢シャッフルの切り替え
  const toggleShuffle = () => {
    if (!isShuffleEnabled) {
      setShuffleMap(generateShuffleMap(quiz.questions));
      setIsShuffleEnabled(true);
    } else {
      setIsShuffleEnabled(false);
    }
  };

  // もう一度挑戦する（全問リセット）
  const handleRetryAll = useCallback(() => {
    measuredAttempt.current = { lectureId: quiz.lectureId, started: false, answered: new Set<string>() };
    quiz.questions.forEach((q) => {
      clearQuizResult(q.id);
    });
    if (isShuffleEnabled) {
      setShuffleMap(generateShuffleMap(quiz.questions));
    }
    const container = document.getElementById('interactive-quiz-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [quiz.lectureId, quiz.questions, clearQuizResult, isShuffleEnabled]);

  // 間違えた問題だけ再挑戦（不正解のみリセット）
  const handleRetryMissed = useCallback(() => {
    measuredAttempt.current = { lectureId: quiz.lectureId, started: false, answered: new Set<string>() };
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex) clearQuizResult(q.id);
    });
    if (isShuffleEnabled) {
      setShuffleMap(generateShuffleMap(quiz.questions));
    }
    // 最初の不正解だった設問へスクロール
    setTimeout(() => {
      const firstMissed = quiz.questions.find(
        (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex
      );
      if (firstMissed) {
        const target = document.getElementById(`quiz-card-${firstMissed.id}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 150);
  }, [quiz.lectureId, quiz.questions, selectedAnswers, clearQuizResult, isShuffleEnabled]);

  // 次の講義へ進む
  const handleGoToNextLecture = useCallback(() => {
    if (courseNextAction) {
      trackEvent('context_link_click', { placement: courseNextAction.kind === 'complete' ? 'course_complete_return' : 'course_continue', course_id: activeCourseJourney?.course.slug, lecture_id: courseNextAction.lectureId });
      router.push(courseNextAction.href);
    } else if (nextLecture) {
      router.push(`/curriculum/${nextLecture.id}`);
    }
  }, [courseNextAction, activeCourseJourney?.course.slug, nextLecture, router]);

  // キーボードショートカット (1, 2, 3 / A, B, C / Enter / R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // フォーム入力中はスキップ
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.isContentEditable;
      if (isInput) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // 1. 全問回答済みの場合のショートカット
      if (isAllAnswered) {
        if (e.key === 'Enter' && isPassed && (courseNextAction || nextLecture)) {
          e.preventDefault();
          handleGoToNextLecture();
          return;
        }
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          if (missedCount > 0) {
            handleRetryMissed();
          } else {
            handleRetryAll();
          }
          return;
        }
      }

      // 2. 未回答問題に対するショートカット (1/2/3 または a/b/c)
      const key = e.key.toLowerCase();
      let chosenDisplayIdx = -1;
      if (key === '1' || key === 'a') chosenDisplayIdx = 0;
      else if (key === '2' || key === 'b') chosenDisplayIdx = 1;
      else if (key === '3' || key === 'c') chosenDisplayIdx = 2;

      if (chosenDisplayIdx !== -1) {
        // 最初の未回答設問を取得
        const firstUnanswered = quiz.questions.find(
          (q) => selectedAnswers[q.id] === undefined
        );
        if (firstUnanswered) {
          e.preventDefault();
          const displayOrder =
            isShuffleEnabled && shuffleMap[firstUnanswered.id]
              ? shuffleMap[firstUnanswered.id]
              : [0, 1, 2];
          const originalIndex = displayOrder[chosenDisplayIdx];
          if (originalIndex !== undefined) {
            handleSelectOption(firstUnanswered, originalIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isAllAnswered,
    isPassed,
    nextLecture,
    courseNextAction,
    missedCount,
    quiz.questions,
    selectedAnswers,
    isShuffleEnabled,
    shuffleMap,
    handleSelectOption,
    handleRetryMissed,
    handleRetryAll,
    handleGoToNextLecture,
  ]);

  // 現在回答すべき「先頭の未回答設問」のIDを特定（アクティブ表示用）
  const activeQuestionId = quiz.questions.find(
    (q) => selectedAnswers[q.id] === undefined
  )?.id;

  return (
    <div
      id="interactive-quiz-container"
      className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 relative scroll-mt-20"
    >
      {/* パーフェクト達成時の祝賀紙吹雪アニメーション */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          aria-hidden="true"
        >
          <style>{`
            @keyframes quiz-confetti-fall {
              0% { transform: translateY(-30px) rotate(0deg); opacity: 1; }
              80% { opacity: 0.9; }
              100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
            }
            .animate-quiz-confetti {
              animation-name: quiz-confetti-fall;
              animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
              animation-fill-mode: forwards;
            }
          `}</style>
          {Array.from({ length: 36 }).map((_, i) => {
            const left = (i * 2.8 + ((i * 17) % 30) / 10) % 100;
            const delay = (i % 7) * 0.12;
            const duration = 2.2 + (i % 5) * 0.35;
            const colors = [
              '#10B981',
              '#3B82F6',
              '#F59E0B',
              '#EC4899',
              '#8B5CF6',
              '#14B8A6',
              '#F97316',
            ];
            const bg = colors[i % colors.length];
            const width = 8 + (i % 4) * 2;
            const height = 12 + (i % 3) * 3;
            return (
              <span
                key={i}
                className="absolute animate-quiz-confetti rounded-xs shadow-xs"
                style={{
                  left: `${left}%`,
                  top: '-25px',
                  width: `${width}px`,
                  height: `${height}px`,
                  backgroundColor: bg,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  transform: `rotate(${i * 20}deg)`,
                }}
              />
            );
          })}
        </div>
      )}

      <div
        className={`bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900 border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-all ${
          isPerfect
            ? 'border-amber-300 dark:border-amber-700/60 ring-2 ring-amber-400/20'
            : 'border-emerald-100 dark:border-emerald-900/50'
        }`}
      >
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-100/80 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200">
                <HelpCircle className="w-3.5 h-3.5" />
                理解度チェック（全{totalQuestions}問・3択）
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                合格基準: {quiz.passingScore || 2}問以上正解でクリア
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>レッスン理解度チェック</span>
              {isPerfect && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 animate-pulse">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  PERFECT
                </span>
              )}
            </h3>
          </div>

          {/* 右上コントローラー（シャッフル切替・サウンド切替・ステータス） */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 選択肢シャッフルトグル */}
            <button
              type="button"
              onClick={toggleShuffle}
              title={isShuffleEnabled ? 'シャッフル解除（元の順序へ）' : '選択肢をシャッフル出題（位置暗記を防止）'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isShuffleEnabled
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffleEnabled ? 'animate-spin-once' : ''}`} />
              <span>シャッフル{isShuffleEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* サウンド切替 */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? '祝賀サウンドをミュート' : '祝賀サウンドを有効化'}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label={soundEnabled ? 'サウンドON' : 'サウンドOFF'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* 全問回答時のバッジ */}
            {isAllAnswered && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                  isPerfect
                    ? 'bg-amber-500 text-white animate-bounce'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {isPerfect ? (
                  <>
                    <Trophy className="w-3.5 h-3.5" />
                    パーフェクト（3/3）
                  </>
                ) : isPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    レッスンクリア！
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    あと{quiz.passingScore || 2 - correctCount}問で合格
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {/* キーボードショートカット案内チップ（未回答がある場合） */}
        {!isAllAnswered && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              キーボードでも素早く回答できます:
            </span>
            <span className="font-mono flex min-w-0 flex-wrap items-center gap-1 text-slate-700 dark:text-slate-300">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">1</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">2</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">3</kbd>
              <span className="text-slate-400">または</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">A</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">B</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-[10px]">C</kbd>
            </span>
          </div>
        )}

        {/* 3問の問題リスト */}
        <div className="space-y-8">
          {quiz.questions.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const isAnswered = chosen !== undefined;
            const isCorrect = isAnswered && chosen === q.correctIndex;
            const isActive = q.id === activeQuestionId;

            // 表示する選択肢の順番（シャッフルON時はマッピングを使用）
            const displayOrder =
              isShuffleEnabled && shuffleMap[q.id]
                ? shuffleMap[q.id]
                : q.options.map((_, i) => i);

            return (
              <div
                key={q.id}
                id={`quiz-card-${q.id}`}
                className={`bg-white/80 dark:bg-slate-800/70 border rounded-2xl p-5 sm:p-6 transition-all ${
                  isActive
                    ? 'ring-2 ring-emerald-500/40 border-emerald-300 dark:border-emerald-700 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                {/* 設問番号 & 正否バッジ */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      第 {qIndex + 1} 問
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        回答中
                      </span>
                    )}
                  </div>

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
                  {displayOrder.map((origIndex, displayIdx) => {
                    const optionText = q.options[origIndex];
                    const isOptionChosen = chosen === origIndex;
                    const isOptionCorrectAnswer = q.correctIndex === origIndex;

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
                        key={`${origIndex}-${displayIdx}`}
                        type="button"
                        onClick={() => handleSelectOption(q, origIndex)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 text-sm sm:text-base ${btnStyles} ${
                          !isAnswered ? 'cursor-pointer hover:shadow-xs' : 'cursor-default'
                        }`}
                      >
                        {/* 選択肢記号 (A/B/C) */}
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
                          {['A', 'B', 'C'][displayIdx]}
                        </span>

                        {/* 本文 */}
                        <span className="flex-1 leading-snug">{optionText}</span>

                        {/* キーボードショートカット記号の控えめな案内（アクティブ問題かつ未回答時） */}
                        {isActive && !isAnswered && (
                          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600">
                            {displayIdx + 1}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 回答後のワンポイント解説 */}
                {isAnswered && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-3.5 text-xs sm:text-sm space-y-2.5">
                    <div>
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-1">
                        <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        解説のポイント:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                      <QuestionEvidence lectureId={quiz.lectureId} revision={questionRevision(q.question, q.options, q.correctIndex, q.explanation)} />
                      <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">次回復習：{quizResults[q.id]?.nextReviewDate || '翌日'}。<Link className="underline" href="/kokushi#learning-review">復習と類題へ</Link> ／ <Link className="underline" href="/simulator#case-training">症例で確認</Link></p>
                    </div>

                    {/* 講義の該当箇所へスクロールして復習するボタン */}
                    {(() => {
                      const topic = getQuizSectionTitle(q);
                      return (
                        <div className="pt-2 border-t border-emerald-200/50 dark:border-emerald-800/40 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                const elements = Array.from(
                                  document.querySelectorAll('#lecture-content h2, #lecture-content h3, #lecture-content p, #lecture-content strong')
                                );
                                const target = elements.find(
                                  (el) => topic && el.textContent?.includes(topic)
                                );
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  target.classList.add(
                                    'ring-4',
                                    'ring-amber-400',
                                    'bg-amber-100/90',
                                    'dark:bg-amber-950/90',
                                    'rounded-lg',
                                    'transition-all'
                                  );
                                  setTimeout(() => {
                                    target.classList.remove(
                                      'ring-4',
                                      'ring-amber-400',
                                      'bg-amber-100/90',
                                      'dark:bg-amber-950/90'
                                    );
                                  }, 3000);
                                } else {
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>「{topic || 'このテーマ'}」を講義本文で読み直す</span>
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      );
                    })()}
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
              className={`rounded-2xl p-6 sm:p-7 text-center space-y-5 ${
                isPassed
                  ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-300 dark:border-emerald-700 shadow-sm'
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
                    {isPerfect ? (
                      <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    )}
                    <span>
                      {isPerfect
                        ? '今回は全問正解です。次の復習日にも確認しましょう。'
                        : 'おめでとうございます！レッスンクリア！'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-700/80 dark:text-emerald-300/80">
                    {courseNextAction?.kind === 'complete' ? 'このコースのすべての講義を受講しました。振り返りと次のテーマへ進めます。' : 'このレッスンの受講完了が自動記録されました。次のステップへ進みましょう！'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-rose-800 dark:text-rose-200">
                    <span>あと{Math.max(0, (quiz.passingScore || 2) - correctCount)}問正解で合格ラインです！</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-700/80 dark:text-rose-300/80">
                    各問題の解説を振り返り、間違えた問題を再挑戦してみましょう。
                  </p>
                </div>
              )}

              {/* アクションボタン群 */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {/* 1. 次の講義へ進むボタン（合格時） */}
                {isPassed && courseNextAction && <>
                  <button type="button" onClick={handleGoToNextLecture} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-5 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">
                    <span>{courseNextAction.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </button>
                  {courseNextAction.kind === 'complete' && nextCourse && <Link href={`/learn/courses/${nextCourse.slug}`} onClick={() => trackEvent('context_link_click', { placement: 'course_next', course_id: activeCourseJourney?.course.slug })} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#C5DED4] px-4 py-3 text-base font-semibold text-[#184F49] focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-[#2A5243] dark:text-[#9CCBBC]">次のテーマ：{nextCourse.title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>}
                  {nextLecture && <Link href={`/curriculum/${nextLecture.id}`} className="inline-flex min-h-11 items-center px-3 text-sm font-semibold underline underline-offset-4">全講義の次のレッスンへ</Link>}
                </>}
                {isPassed && !activeCourseJourney && nextLecture && (
                  <button
                    type="button"
                    onClick={handleGoToNextLecture}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <span>次のレッスンへ進む</span>
                    <span className="max-w-[200px] truncate text-emerald-100 font-normal hidden sm:inline">
                      ({nextLecture.title})
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-white/20 rounded font-mono">
                      Enter
                    </kbd>
                  </button>
                )}

                {/* 2. カリキュラム完走（最終レッスンの場合） */}
                {isPassed && !activeCourseJourney && !nextLecture && (
                  <button
                    type="button"
                    onClick={() => router.push('/curriculum')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md transition-all cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>カリキュラム一覧へ</span>
                  </button>
                )}

                {/* 3. 間違えた問題だけ再挑戦ボタン（不正解が1問以上ある場合） */}
                {missedCount > 0 && (
                  <button
                    type="button"
                    onClick={handleRetryMissed}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200/80 dark:hover:bg-emerald-800/80 transition-all cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                    <span>間違えた問題（{missedCount}問）だけ再挑戦</span>
                    <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-white/60 dark:bg-slate-800/60 rounded font-mono">
                      R
                    </kbd>
                  </button>
                )}

                {/* 4. もう一度挑戦する（全問リセット） */}
                <button
                  type="button"
                  onClick={handleRetryAll}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>{missedCount > 0 ? '全問最初からやり直す' : 'もう一度挑戦する'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
