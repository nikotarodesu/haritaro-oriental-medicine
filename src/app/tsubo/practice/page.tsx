"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  getAllAcupoints, 
  AcupointMaster, 
  MERIDIANS,
  StudySession, 
  QuizQuestion, 
  StudySkillType,
  loadStudyData,
  saveStudyData,
  loadActiveSession,
  saveActiveSession,
  recordAnswerInStore,
  recordSelfEvaluationInStore,
  toggleFlagForReview,
  getStudySummary,
  getDueReviewRecords,
  exportStudyDataJson,
  importStudyDataJson,
  resetAllStudyData,
  COURSE_UNITS,
  generateQuestionsForPoints,
  getTodayString,
  addDays
} from "@/data/tsubo";
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Eye, 
  EyeOff, 
  Bookmark,
  Shuffle,
  Target,
  Flame,
  Calendar,
  Check,
  ChevronRight,
  Settings,
  Download,
  Upload,
  AlertTriangle,
  Play,
  Layers,
  Award,
  X
} from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-16 text-center text-xs text-[#737C77]">学習システムを読み込み中...</div>}>
      <PracticePageContent />
    </Suspense>
  );
}

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allPoints = useMemo(() => getAllAcupoints(), []);
  const { memos } = useClinicalMemo();

  // 今日の日付（現地時間基準）
  const todayStr = useMemo(() => getTodayString(), []);

  // 学習サマリー＆アクティブセッション
  const [summary, setSummary] = useState(() => getStudySummary(todayStr));
  const [activeSession, setActiveSession] = useState<StudySession | null>(() => loadActiveSession());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<{ message: string; success: boolean } | null>(null);

  // 回答ステート（1問ずつモード用一時選択）
  const [tempSelectedOption, setTempSelectedOption] = useState<string | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // 更新サマリーの同期
  const refreshSummary = () => {
    setSummary(getStudySummary(todayStr));
  };

  // URLパラメータ（?course=meridian_li などの直接開始）
  useEffect(() => {
    const courseParam = searchParams.get("course");
    if (courseParam && !activeSession) {
      startCourseSession(courseParam);
    }
  }, [searchParams]);

  // キーボードショートカット（1問ずつモード用：1〜4で選択、Enterで確定）
  useEffect(() => {
    if (!activeSession || activeSession.mode !== "one_by_one" || activeSession.isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const q = activeSession.questions[activeSession.currentIndex];
      if (!q) return;

      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        if (q.options[idx]) {
          setTempSelectedOption(q.options[idx].id);
        }
      } else if (e.key === "Enter") {
        if (!isAnswerConfirmed && tempSelectedOption) {
          handleConfirmOneAnswer();
        } else if (isAnswerConfirmed) {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSession, tempSelectedOption, isAnswerConfirmed]);

  // ==================== セッション開始ハンドラー ====================

  const startNewSession = (
    courseId: string,
    courseTitle: string,
    questions: QuizQuestion[],
    mode: "batch" | "one_by_one" | "self_check" = "batch"
  ) => {
    if (questions.length === 0) {
      alert("出題可能な経穴がありません。出題範囲を変更してください。");
      return;
    }

    const session: StudySession = {
      sessionId: `session_${Date.now()}`,
      courseId,
      courseTitle,
      mode,
      questions,
      currentIndex: 0,
      answers: {},
      selfEvaluations: {},
      isCompleted: false,
      startedAt: Date.now(),
    };

    setActiveSession(session);
    saveActiveSession(session);
    setTempSelectedOption(null);
    setIsAnswerConfirmed(false);
    setIsCardFlipped(false);
  };

  // 14経脈小単位ユニットの開始
  const startUnitSession = (unit: typeof COURSE_UNITS[0], mode: "batch" | "one_by_one" = "batch") => {
    const targetPoints = allPoints.filter((p) => unit.targetPointCodes.includes(p.code));
    const questions = generateQuestionsForPoints(targetPoints, "location_to_name");
    startNewSession(unit.id, `${unit.courseTitle} - ${unit.unitTitle}`, questions, mode);
  };

  // 今日の復習セッションの開始
  const startReviewSession = () => {
    const due = getDueReviewRecords(todayStr);
    if (due.length === 0) {
      alert("本日復習予定の経穴はありません。経脈別コースで新しい経穴を学びましょう！");
      return;
    }

    const targetPoints = allPoints.filter((p) => due.some((d) => d.acupointCode === p.code));
    // 復習は最大15問
    const questions = generateQuestionsForPoints(targetPoints, "location_to_name", 15);
    startNewSession("due_review", `今日の復習（${questions.length}問）`, questions, "batch");
  };

  // 経絡全体または特定コースの開始
  const startCourseSession = (courseId: string) => {
    if (courseId.startsWith("meridian_")) {
      const merPrefix = courseId.replace("meridian_", "").toUpperCase();
      const targetPoints = allPoints.filter((p) => p.meridianId.toUpperCase().includes(merPrefix) || p.code.startsWith(merPrefix));
      const questions = generateQuestionsForPoints(targetPoints, "location_to_name", 10);
      startNewSession(courseId, `十四経脈学習`, questions, "batch");
    } else if (courseId === "saved") {
      const savedCodes = memos.filter((m) => m.type === "tsubo").map((m) => m.id.replace("tsubo-", "").toUpperCase());
      const targetPoints = allPoints.filter((p) => savedCodes.includes(p.code));
      const questions = generateQuestionsForPoints(targetPoints, "location_to_name");
      startNewSession("saved", `保存したマイカルテ経穴（${questions.length}問）`, questions, "batch");
    } else if (courseId === "five_shu") {
      const targetPoints = allPoints.filter((p) => p.categories.some((c) => c.includes("穴") && (c.includes("井") || c.includes("滎") || c.includes("輸") || c.includes("経") || c.includes("合"))));
      const questions = generateQuestionsForPoints(targetPoints, "category_of_point", 10);
      startNewSession("five_shu", "五兪穴（井滎輸経合）特訓", questions, "batch");
    }
  };

  // ==================== 回答操作（1問ずつモード） ====================

  const handleConfirmOneAnswer = () => {
    if (!activeSession || !tempSelectedOption) return;
    const currentQ = activeSession.questions[activeSession.currentIndex];
    if (!currentQ) return;

    const isCorrect = tempSelectedOption === currentQ.correctOptionId;

    // 回答をストアへ永続化（日次実績・定着段階・復習予定を更新）
    recordAnswerInStore(currentQ, tempSelectedOption, isCorrect, todayStr);

    const updatedAnswers = {
      ...activeSession.answers,
      [currentQ.id]: {
        selectedOptionId: tempSelectedOption,
        isCorrect,
        confirmedAt: Date.now(),
      },
    };

    const updatedSession = {
      ...activeSession,
      answers: updatedAnswers,
    };

    setActiveSession(updatedSession);
    saveActiveSession(updatedSession);
    setIsAnswerConfirmed(true);
    refreshSummary();
  };

  const handleNextQuestion = () => {
    if (!activeSession) return;
    const nextIdx = activeSession.currentIndex + 1;

    if (nextIdx >= activeSession.questions.length) {
      // 終了
      const completedSession: StudySession = {
        ...activeSession,
        isCompleted: true,
        completedAt: Date.now(),
      };
      setActiveSession(completedSession);
      saveActiveSession(completedSession);
    } else {
      setActiveSession({
        ...activeSession,
        currentIndex: nextIdx,
      });
      saveActiveSession({
        ...activeSession,
        currentIndex: nextIdx,
      });
      setTempSelectedOption(null);
      setIsAnswerConfirmed(false);
      setIsCardFlipped(false);
    }
  };

  const handlePrevQuestion = () => {
    if (!activeSession || activeSession.currentIndex <= 0) return;
    const prevIdx = activeSession.currentIndex - 1;
    setActiveSession({
      ...activeSession,
      currentIndex: prevIdx,
    });
    saveActiveSession({
      ...activeSession,
      currentIndex: prevIdx,
    });
    setTempSelectedOption(null);
    setIsAnswerConfirmed(false);
    setIsCardFlipped(false);
  };

  // ==================== 回答操作（まとめ表示モード） ====================

  const handleSelectBatchOption = (questionId: string, optionId: string) => {
    if (!activeSession || activeSession.isCompleted) return;
    const q = activeSession.questions.find((x) => x.id === questionId);
    if (!q) return;

    const isCorrect = optionId === q.correctOptionId;
    const updatedAnswers = {
      ...activeSession.answers,
      [questionId]: {
        selectedOptionId: optionId,
        isCorrect,
        confirmedAt: Date.now(),
      },
    };

    const updatedSession = {
      ...activeSession,
      answers: updatedAnswers,
    };

    setActiveSession(updatedSession);
    saveActiveSession(updatedSession);
  };

  // 一括採点
  const handleSubmitBatch = () => {
    if (!activeSession) return;
    const answeredCount = Object.keys(activeSession.answers).length;
    const totalCount = activeSession.questions.length;

    if (answeredCount < totalCount) {
      if (!confirm(`未回答の問題が ${totalCount - answeredCount} 問あります。採点して終了しますか？`)) {
        return;
      }
    }

    // すべての回答をストアへ反映
    for (const q of activeSession.questions) {
      const ans = activeSession.answers[q.id];
      if (ans) {
        recordAnswerInStore(q, ans.selectedOptionId, ans.isCorrect, todayStr);
      }
    }

    const completedSession: StudySession = {
      ...activeSession,
      isCompleted: true,
      completedAt: Date.now(),
    };

    setActiveSession(completedSession);
    saveActiveSession(completedSession);
    refreshSummary();
  };

  // ==================== 自己確認カード操作 ====================

  const handleSelfEvaluation = (evaluation: "remembered" | "needsReview") => {
    if (!activeSession) return;
    const currentQ = activeSession.questions[activeSession.currentIndex];
    if (!currentQ) return;

    recordSelfEvaluationInStore(currentQ, evaluation, todayStr);

    const updatedSelf = {
      ...activeSession.selfEvaluations,
      [currentQ.id]: evaluation,
    };

    const nextIdx = activeSession.currentIndex + 1;
    if (nextIdx >= activeSession.questions.length) {
      const completedSession: StudySession = {
        ...activeSession,
        selfEvaluations: updatedSelf,
        isCompleted: true,
        completedAt: Date.now(),
      };
      setActiveSession(completedSession);
      saveActiveSession(completedSession);
    } else {
      const nextSession: StudySession = {
        ...activeSession,
        currentIndex: nextIdx,
        selfEvaluations: updatedSelf,
      };
      setActiveSession(nextSession);
      saveActiveSession(nextSession);
      setIsCardFlipped(false);
    }
    refreshSummary();
  };

  // セッション終了してホームへ戻る
  const handleExitSession = () => {
    saveActiveSession(null);
    setActiveSession(null);
    refreshSummary();
  };

  // ==================== レンダリング：アクティブセッション中 ====================

  if (activeSession) {
    const totalQ = activeSession.questions.length;
    const currentQ = activeSession.questions[activeSession.currentIndex];
    const answeredCount = Object.keys(activeSession.answers).length;

    // 終了画面
    if (activeSession.isCompleted) {
      const correctAnswers = Object.values(activeSession.answers).filter((a) => a.isCorrect).length;
      const scorePercent = totalQ > 0 ? Math.round((correctAnswers / totalQ) * 100) : 0;
      const missedQuestions = activeSession.questions.filter((q) => {
        const a = activeSession.answers[q.id];
        return !a || !a.isCorrect;
      });

      return (
        <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                レッスン完了！
              </h2>
              <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6]">
                {activeSession.courseTitle}
              </p>
            </div>

            {/* スコアカード */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#22303D]">
              <div>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block">正解数</span>
                <strong className="text-xl sm:text-2xl font-mono text-[#1E3D34] dark:text-[#74BA9E] font-bold">
                  {correctAnswers} <span className="text-xs font-normal">/ {totalQ}</span>
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block">正答率</span>
                <strong className="text-xl sm:text-2xl font-mono text-[#B86924] dark:text-[#E6C387] font-bold">
                  {scorePercent}%
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] block">定着予定</span>
                <strong className="text-xs sm:text-sm font-sans text-[#232826] dark:text-[#FAF8F5] font-bold block pt-1">
                  1〜3日後
                </strong>
              </div>
            </div>

            {/* 間違えた問題の復習リスト */}
            {missedQuestions.length > 0 ? (
              <div className="text-left space-y-3 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <span className="font-bold text-xs text-[#DC2626] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>要復習・間違えた問題（{missedQuestions.length}問）</span>
                </span>
                <div className="space-y-2">
                  {missedQuestions.map((mq) => (
                    <div
                      key={mq.id}
                      className="p-3.5 rounded-xl bg-[#FDEDEC] dark:bg-[#2A1715] border border-[#FADBD8] dark:border-[#3D2220] text-xs space-y-1"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <strong className="font-mono text-[#A83629] dark:text-[#C47A72]">
                          正解：{mq.options.find((o) => o.id === mq.correctOptionId)?.text}
                        </strong>
                        <Link
                          href={`/tsubo/${mq.acupointCode.toLowerCase()}`}
                          target="_blank"
                          className="text-[11px] text-[#1E3D34] dark:text-[#74BA9E] underline font-bold"
                        >
                          詳細解説 ➜
                        </Link>
                      </div>
                      <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                        {mq.locationReference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-[#EBF3EF] text-[#1E3D34] font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>全問正解！素晴らしい理解度です。次回の復習予定日に再度確認しましょう。</span>
              </div>
            )}

            {/* アクション */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleExitSession}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#1E3D34] text-white font-bold text-xs sm:text-sm hover:bg-[#162E27] transition-all shadow-md"
              >
                学習ホームに戻る
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 10問まとめ表示モード
    if (activeSession.mode === "batch") {
      return (
        <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
          {/* セッションヘッダー */}
          <div className="bg-white dark:bg-[#17212A] p-4 sm:p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs flex items-center justify-between gap-3 sticky top-4 z-20 backdrop-blur-md bg-white/90">
            <div>
              <span className="text-[10px] text-[#B86924] font-bold block uppercase tracking-wider">
                まとめ表示モード
              </span>
              <h2 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                {activeSession.courseTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#737C77] font-mono">
                回答済: <strong className="text-[#1E3D34] dark:text-[#74BA9E] text-sm">{answeredCount}</strong> / {totalQ}
              </span>
              <button
                type="button"
                onClick={handleSubmitBatch}
                className="px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>採点して終了</span>
              </button>
              <button
                type="button"
                onClick={handleExitSession}
                className="p-2 rounded-xl text-[#737C77] hover:bg-gray-100 dark:hover:bg-gray-800"
                title="セッションを中断して保存"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 問題一覧 */}
          <div className="space-y-5">
            {activeSession.questions.map((q, idx) => {
              const selectedAns = activeSession.answers[q.id];

              return (
                <div
                  key={q.id}
                  id={`q-item-${idx}`}
                  className={`bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 p-5 sm:p-6 shadow-xs transition-all ${
                    selectedAns ? "border-[#1E3D34]/40" : "border-[#E5DEC9] dark:border-[#2A3B4A]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#737C77] mb-2 border-b border-[#F2ECE0] dark:border-[#22303D] pb-2">
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                      第 {idx + 1} 問 / {totalQ}
                    </span>
                    <span className="text-[11px]">{q.meridianName}</span>
                  </div>

                  {/* 問題文 */}
                  <div className="py-2 space-y-2">
                    <p className="text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] font-medium leading-relaxed whitespace-pre-line">
                      {q.prompt}
                    </p>
                  </div>

                  {/* 4択選択肢 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = selectedAns?.selectedOptionId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectBatchOption(q.id, opt.id)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-xs font-bold"
                              : "bg-[#FAF8F5] dark:bg-[#10171F] text-[#333835] dark:text-[#C5D2DB] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]"
                          }`}
                        >
                          <div>
                            <span className="block">{opt.text}</span>
                            {opt.subtext && (
                              <span className={`text-[10px] ${isSelected ? "text-[#E6C387]" : "text-[#737C77]"}`}>
                                {opt.subtext}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 下部一括採点バー */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] flex items-center justify-between">
            <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
              全 {totalQ} 問中 {answeredCount} 問回答済み
            </span>
            <button
              type="button"
              onClick={handleSubmitBatch}
              className="px-6 py-2.5 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>採点して結果を見る</span>
            </button>
          </div>
        </div>
      );
    }

    // 1問ずつ表示モード
    if (activeSession.mode === "one_by_one") {
      const selectedAns = activeSession.answers[currentQ.id];
      const isCurrentAnswered = isAnswerConfirmed || !!selectedAns;
      const isCorrect = isCurrentAnswered && (tempSelectedOption === currentQ.correctOptionId || selectedAns?.isCorrect);

      return (
        <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-6">
          {/* 上部進捗ヘッダー */}
          <div className="flex items-center justify-between text-xs text-[#737C77]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                第 {activeSession.currentIndex + 1} 問 / {totalQ}
              </span>
              <span className="text-[11px]">（回答済: {answeredCount}問）</span>
            </div>
            <button
              type="button"
              onClick={handleExitSession}
              className="hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>中断して保存</span>
            </button>
          </div>

          {/* 1問カード */}
          <div className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                {currentQ.meridianName}
              </span>
              <p className="text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] font-medium leading-relaxed whitespace-pre-line">
                {currentQ.prompt}
              </p>
            </div>

            {/* 選択肢 */}
            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = tempSelectedOption === opt.id || selectedAns?.selectedOptionId === opt.id;
                const isCorrectOption = opt.id === currentQ.correctOptionId;

                let btnClass = "bg-[#FAF8F5] dark:bg-[#10171F] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]";
                if (isCurrentAnswered) {
                  if (isCorrectOption) {
                    btnClass = "bg-[#EBF3EF] border-[#1E3D34] text-[#1E3D34] font-bold ring-1 ring-[#1E3D34]";
                  } else if (isSelected) {
                    btnClass = "bg-[#FDEDEC] border-[#E53E3E] text-[#DC2626]";
                  } else {
                    btnClass = "opacity-40 bg-[#FAF8F5]";
                  }
                } else if (isSelected) {
                  btnClass = "bg-[#1E3D34] text-white border-[#1E3D34] font-bold shadow-xs";
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isCurrentAnswered}
                    onClick={() => setTempSelectedOption(opt.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 border border-current text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span>{opt.text}</span>
                        {opt.subtext && <span className="text-xs text-[#737C77] ml-2">{opt.subtext}</span>}
                      </div>
                    </div>
                    {isCurrentAnswered && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-[#1E3D34]" />}
                    {isCurrentAnswered && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-[#DC2626]" />}
                  </button>
                );
              })}
            </div>

            {/* 回答後の解説エリア */}
            {isCurrentAnswered && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-150 ${
                isCorrect
                  ? "bg-[#EBF3EF] dark:bg-[#162A24] border-[#C5DED4] text-[#1E3D34] dark:text-[#74BA9E]"
                  : "bg-[#FDEDEC] dark:bg-[#2A1715] border-[#FADBD8] text-[#A83629] dark:text-[#C47A72]"
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{isCorrect ? "正解！" : "不正解"}</span>
                </div>
                <p className="text-xs text-[#232826] dark:text-[#FAF8F5] leading-relaxed whitespace-pre-line">
                  {currentQ.explanation}
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <Link
                    href={`/tsubo/${currentQ.acupointCode.toLowerCase()}`}
                    target="_blank"
                    className="underline font-bold text-[11px]"
                  >
                    個別詳細ページで構造と取穴法を確認 ➜
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFlagForReview(currentQ.acupointCode, currentQ.skill)}
                    className="text-[11px] hover:underline flex items-center gap-1"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>要復習に追加</span>
                  </button>
                </div>
              </div>
            )}

            {/* ナビゲーション操作ボタン */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={activeSession.currentIndex <= 0}
                onClick={handlePrevQuestion}
                className="px-4 py-2 rounded-xl border border-[#D8CFC0] disabled:opacity-30 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>前の問題</span>
              </button>

              {!isCurrentAnswered ? (
                <button
                  type="button"
                  disabled={!tempSelectedOption}
                  onClick={handleConfirmOneAnswer}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3D34] text-white disabled:opacity-40 text-xs font-bold hover:bg-[#162E27] transition-all shadow-xs"
                >
                  回答を確定
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-xs flex items-center gap-1"
                >
                  <span>{activeSession.currentIndex + 1 >= totalQ ? "結果を見る" : "次の問題"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  // ==================== レンダリング：学習ホーム（Duolingo風） ====================

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            経穴辞典
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">経穴学習・復習ホーム</span>
        </nav>

        {/* ヘッダー ＆ 学習設定ボタン */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] text-xs font-bold tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Acupoint Spaced Repetition Learning</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              経穴を学ぶ・復習する
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl">
              短時間の小テストと間隔反復（1日・3日・7日・14日・30日）で、経穴の部位・要穴・経脈を確実に定着させます。
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-2xl border border-[#D8CFC0] dark:border-[#2A3B4A] hover:bg-[#FAF8F5] text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Settings className="w-4 h-4 text-[#737C77]" />
            <span>学習設定・データ管理</span>
          </button>
        </div>

        {/* 7.1 最初に見せる情報：ダッシュボードカード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* 今日の目標＆回答数 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#17212A] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-[#737C77]">
              <span className="font-bold flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E]">
                <Target className="w-4 h-4" />
                <span>今日の目標</span>
              </span>
              {summary.streakDays > 0 && (
                <span className="flex items-center gap-0.5 text-[#B86924] font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{summary.streakDays}日連続</span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {summary.todayAnswered} <span className="text-xs text-[#737C77] font-normal">/ {summary.todayGoal} 問</span>
                </span>
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  {summary.progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#FAF8F5] dark:bg-[#10171F] overflow-hidden border border-[#E0D8C8]">
                <div
                  className="h-full bg-[#1E3D34] dark:bg-[#2B6958] rounded-full transition-all duration-300"
                  style={{ width: `${summary.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 今日の復習待ち件数 */}
          <div className={`p-5 rounded-3xl border-2 shadow-xs space-y-3 ${
            summary.dueReviewCount > 0
              ? "bg-[#FCF4EB] dark:bg-[#281E15] border-[#B86924]/40"
              : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A]"
          }`}>
            <div className="flex items-center justify-between text-xs text-[#737C77]">
              <span className="font-bold flex items-center gap-1 text-[#B86924] dark:text-[#E6C387]">
                <Calendar className="w-4 h-4" />
                <span>今日の復習</span>
              </span>
              <span className="text-[10px]">間隔反復</span>
            </div>

            <div>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#B86924] dark:text-[#E6C387]">
                {summary.dueReviewCount} <span className="text-xs text-[#737C77] font-normal">件待ち</span>
              </span>
              <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-1">
                {summary.dueReviewCount > 0 ? "復習期日を迎えた経穴があります" : "今日の復習はすべて完了！"}
              </p>
            </div>
          </div>

          {/* 全体の記録 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#17212A] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-[#737C77]">
              <span className="font-bold flex items-center gap-1 text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-4 h-4" />
                <span>全体の習得状況</span>
              </span>
              <span className="text-[10px]">361穴中</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-[#59615D] dark:text-[#A0B0BC]">取り組んだ経穴：</span>
                <strong className="font-mono text-sm">{summary.totalPracticedPoints} 穴</strong>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-[#59615D] dark:text-[#A0B0BC]">定着の目安達成：</span>
                <strong className="font-mono text-sm text-[#1E3D34] dark:text-[#74BA9E]">{summary.totalMasteredPoints} 穴</strong>
              </div>
            </div>
          </div>
        </div>

        {/* メインアクションCTA（優先順位：復習 ➜ 再開 ➜ 今日の10問） */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E3D34] to-[#162A24] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E6C387] uppercase tracking-wider block">
              おすすめの次のアクション
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              {summary.dueReviewCount > 0
                ? `今日の復習に取り組む（${summary.dueReviewCount}件）`
                : "十四経脈の小テストを始める"}
            </h2>
            <p className="text-xs text-white/80 max-w-md">
              {summary.dueReviewCount > 0
                ? "過去に学んだ経穴の間隔復習期日です。想起することで記憶を強固にします。"
                : "手の太陰肺経など、5〜10穴の小ユニットから手軽にスタートできます。"}
            </p>
          </div>

          {summary.dueReviewCount > 0 ? (
            <button
              type="button"
              onClick={startReviewSession}
              className="px-7 py-3.5 rounded-2xl bg-[#E6C387] text-[#1E3D34] font-bold text-sm hover:bg-[#F2DEB0] transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>復習を始める（10問）</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startUnitSession(COURSE_UNITS[0], "batch")}
              className="px-7 py-3.5 rounded-2xl bg-[#E6C387] text-[#1E3D34] font-bold text-sm hover:bg-[#F2DEB0] transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>肺経基礎から始める（6問）</span>
            </button>
          )}
        </div>

        {/* 7.2 十四経脈別コース（小単位ユニット） */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                十四経脈別コース（5〜10穴の小単位）
              </h3>
              <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
                学校の授業や試験範囲に合わせて、好きな経脈から自由に学べます
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {COURSE_UNITS.map((unit) => (
              <div
                key={unit.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#737C77] mb-1">
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">{unit.courseTitle}</span>
                    <span className="font-mono">{unit.targetPointCodes.length} 穴</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {unit.unitTitle}
                  </h4>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <button
                    type="button"
                    onClick={() => startUnitSession(unit, "batch")}
                    className="flex-1 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all flex items-center justify-center gap-1"
                  >
                    <span>まとめ出題</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => startUnitSession(unit, "one_by_one")}
                    className="flex-1 py-2 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] text-xs font-semibold hover:bg-[#FAF8F5] transition-all"
                  >
                    <span>1問ずつ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 補助コース：要穴別・保存穴 */}
        <div className="space-y-4 pt-4 border-t border-[#F2ECE0] dark:border-[#22303D]">
          <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
            テーマ別・特別コース
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => startCourseSession("five_shu")}
              className="p-4 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-left transition-all space-y-1"
            >
              <strong className="text-xs font-bold text-[#B86924] block">五兪穴特訓</strong>
              <p className="text-[11px] text-[#737C77]">井・滎・輸・経・合穴の分類暗記</p>
            </button>

            <button
              type="button"
              onClick={() => startCourseSession("saved")}
              className="p-4 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-left transition-all space-y-1"
            >
              <strong className="text-xs font-bold text-[#1E3D34] block">マイカルテ保存穴</strong>
              <p className="text-[11px] text-[#737C77]">保存中の経穴のみを集中テスト</p>
            </button>

            <button
              type="button"
              onClick={startReviewSession}
              className="p-4 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] text-left transition-all space-y-1"
            >
              <strong className="text-xs font-bold text-[#B86924] block">要復習・苦手特訓</strong>
              <p className="text-[11px] text-[#737C77]">間違えた経穴・フラグ穴の集中復習</p>
            </button>
          </div>
        </div>

      </div>

      {/* 設定＆データ管理モーダル */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
              <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                学習設定・データ管理
              </h3>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 text-[#737C77] hover:text-[#232826] dark:text-[#8899A6] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 目標設定 */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                1日の目標回答数
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      const data = loadStudyData();
                      data.settings.dailyGoal = goal;
                      saveStudyData(data);
                      refreshSummary();
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      summary.todayGoal === goal
                        ? "bg-[#1E3D34] text-white border-[#1E3D34] dark:bg-[#2B6958] dark:border-[#2B6958] shadow-xs"
                        : "bg-[#FAF8F5] dark:bg-[#10171F] text-[#333835] dark:text-[#C5D2DB] border-[#D8CFC0] dark:border-[#2A3B4A] hover:bg-[#EBF3EF] dark:hover:bg-[#182823]"
                    }`}
                  >
                    {goal} 問
                  </button>
                ))}
              </div>
            </div>

            {/* データエクスポート・インポート */}
            <div className="space-y-2 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block">
                学習記録のバックアップ
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const json = exportStudyDataJson();
                    const blob = new Blob([json], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `haritaro_study_backup_${todayStr}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="p-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#10171F] text-[#232826] dark:text-[#FAF8F5] hover:bg-white dark:hover:bg-[#182823] font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-4 h-4 text-[#737C77] dark:text-[#8899A6]" />
                  <span>記録を保存</span>
                </button>

                <label className="p-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#10171F] text-[#232826] dark:text-[#FAF8F5] hover:bg-white dark:hover:bg-[#182823] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                  <Upload className="w-4 h-4 text-[#737C77] dark:text-[#8899A6]" />
                  <span>記録を復元</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        const res = importStudyDataJson(content, "merge");
                        setImportStatus(res);
                        refreshSummary();
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>

              {importStatus && (
                <div className={`p-2.5 rounded-xl text-[11px] ${importStatus.success ? "bg-[#EBF3EF] dark:bg-[#162A24] text-[#1E3D34] dark:text-[#74BA9E] border border-[#C5DED4] dark:border-[#2A5243]" : "bg-[#FDEDEC] dark:bg-[#2A1715] text-[#DC2626] border border-[#FADBD8] dark:border-[#3D2220]"}`}>
                  {importStatus.message}
                </div>
              )}
            </div>

            {/* 初期化 */}
            <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
              <button
                type="button"
                onClick={() => {
                  if (confirm("学習記録をすべて消去しますか？（マイカルテ保存は消去されません）")) {
                    resetAllStudyData();
                    refreshSummary();
                    setActiveSession(null);
                    setIsSettingsOpen(false);
                  }
                }}
                className="text-xs text-[#DC2626] hover:underline font-medium"
              >
                学習記録を初期化する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
