"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  BookOpen, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  FileText, 
  Target, 
  Award, 
  Zap, 
  Compass, 
  ChevronRight,
  Flame,
  Check,
  Printer
} from "lucide-react";
import { useCurriculumProgress, QuizResultRecord } from "@/contexts/CurriculumProgressContext";
import { CURRICULUM_QUIZZES, QuizQuestionItem, LessonQuizGroup } from "@/data/curriculumQuizzes";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { KOKUSHI_PAST_EXAMS, KokushiPastExamQuestion } from "@/data/kokushiPastExams";

// 国試ターゲット日（第34回 鍼灸師国家試験 想定：2027年2月28日）
const TARGET_EXAM_DATE = new Date("2027-02-28T09:00:00+09:00");

export default function KokushiDashboard() {
  const searchParams = useSearchParams();
  const targetExamId = searchParams.get("examId");

  const { 
    isMounted, 
    quizResults, 
    saveQuizResult, 
    getIncorrectQuestions, 
    totalCompleted, 
    totalPublished 
  } = useCurriculumProgress();

  // 国試カウントダウン（日数）
  const daysUntilExam = useMemo(() => {
    const now = new Date();
    const diffTime = TARGET_EXAM_DATE.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  // 今日の日付文字列（YYYY-MM-DD）
  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  // 全クイズ平坦化リスト
  const allQuestionsWithMeta = useMemo(() => {
    const list: { group: LessonQuizGroup; question: QuizQuestionItem }[] = [];
    Object.values(CURRICULUM_QUIZZES).forEach((grp) => {
      grp.questions.forEach((q) => {
        list.push({ group: grp, question: q });
      });
    });
    return list;
  }, []);

  // 忘却曲線アルゴリズムに基づく「今日復習すべき3問」
  const dailyQuestions = useMemo(() => {
    if (allQuestionsWithMeta.length === 0) return [];

    const incorrectList = Object.values(quizResults).filter((r) => !r.isCorrect);
    const selected: { group: LessonQuizGroup; question: QuizQuestionItem; reason: string }[] = [];

    // 1. 直近で間違えた問題から優先選出（最大2問）
    for (const inc of incorrectList) {
      const found = allQuestionsWithMeta.find((item) => item.question.id === inc.questionId);
      if (found && !selected.some((s) => s.question.id === found.question.id)) {
        selected.push({ ...found, reason: "過去の間違え復習" });
        if (selected.length >= 2) break;
      }
    }

    // 2. 残りは日付シードによる日替わり出題（全243問から均等にローテーション）
    let dateHash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      dateHash = (dateHash * 31 + todayStr.charCodeAt(i)) % allQuestionsWithMeta.length;
    }

    for (let offset = 0; offset < allQuestionsWithMeta.length && selected.length < 3; offset++) {
      const idx = (dateHash + offset * 17) % allQuestionsWithMeta.length;
      const candidate = allQuestionsWithMeta[idx];
      if (!selected.some((s) => s.question.id === candidate.question.id)) {
        selected.push({ ...candidate, reason: "本日の忘却曲線レコメンド" });
      }
    }

    return selected;
  }, [allQuestionsWithMeta, quizResults, todayStr]);

  // デイリークイズの回答状態
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [isWeakPointsOnly, setIsWeakPointsOnly] = useState<boolean>(false);

  // 表示する問題リスト（通常忘却曲線3問 or 苦手問題全件）
  const displayedDailyQuestions = useMemo(() => {
    if (isWeakPointsOnly) {
      const incList = getIncorrectQuestions();
      const list = incList
        .map((inc) => {
          const found = allQuestionsWithMeta.find((item) => item.question.id === inc.questionId);
          return found ? { ...found, reason: "弱点克服・再挑戦" } : null;
        })
        .filter(Boolean) as { group: LessonQuizGroup; question: QuizQuestionItem; reason: string }[];
      return list.length > 0 ? list : dailyQuestions;
    }
    return dailyQuestions;
  }, [isWeakPointsOnly, getIncorrectQuestions, allQuestionsWithMeta, dailyQuestions]);

  // 本試験過去問アーカイブのステート
  const [pastSubjectFilter, setPastSubjectFilter] = useState<"all" | "東洋医学概論" | "経絡経穴概論" | "東洋医学臨床論">("all");
  const [pastExamYearFilter, setPastExamYearFilter] = useState<"all" | 33 | 32 | 31 | 30>("all");
  const [pastExamAnswers, setPastExamAnswers] = useState<Record<string, number>>({});
  const [pastExamSubmitted, setPastExamSubmitted] = useState<Record<string, boolean>>({});

  // 外部・検索モーダルからの直通リンク（?examId=xxx）検知時に自動スクロール
  useEffect(() => {
    if (!targetExamId) return;
    setPastSubjectFilter("all");
    setPastExamYearFilter("all");
    const timer = setTimeout(() => {
      const el = document.getElementById(`kokushi-exam-${targetExamId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-[#1E3D34]", "dark:ring-[#74BA9E]");
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-[#1E3D34]", "dark:ring-[#74BA9E]");
        }, 3000);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [targetExamId]);

  const handleSelectPastOption = (qId: string, optIdx: number) => {
    if (pastExamSubmitted[qId]) return;
    setPastExamAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitPastAnswer = (qId: string) => {
    setPastExamSubmitted((prev) => ({ ...prev, [qId]: true }));
  };

  // フィルタリングされた過去問リスト（科目 ＆ 回次）
  const filteredPastExams = useMemo(() => {
    return KOKUSHI_PAST_EXAMS.filter((q) => {
      const matchSubject = pastSubjectFilter === "all" || q.subject === pastSubjectFilter;
      const matchYear = pastExamYearFilter === "all" || q.examNumber === pastExamYearFilter;
      return matchSubject && matchYear;
    });
  }, [pastSubjectFilter, pastExamYearFilter]);

  const handleSelectOption = (questionId: string, optIdx: number) => {
    if (submitted[questionId]) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optIdx }));
  };

  const handleSubmitAnswer = (item: { group: LessonQuizGroup; question: QuizQuestionItem }) => {
    const selected = userAnswers[item.question.id];
    if (selected === undefined) return;

    const isCorrect = selected === item.question.correctIndex;
    setSubmitted((prev) => ({ ...prev, [item.question.id]: true }));

    // 進捗コンテキストへ保存
    saveQuizResult({
      questionId: item.question.id,
      lectureId: item.group.lectureId,
      chapterId: item.group.chapterId,
      chapterTitle: item.group.chapterTitle,
      lectureTitle: item.group.lectureTitle,
      questionText: item.question.question,
      userAnswerIndex: selected,
      correctAnswerIndex: item.question.correctIndex,
      isCorrect,
      explanation: item.question.explanation,
      options: item.question.options,
      answeredAt: new Date().toISOString(),
    });
  };

  // 分野別カリキュラムの進捗・出題頻度
  const categoryStats = useMemo(() => {
    const categories = [
      {
        id: "yinyang-wuxing",
        title: "陰陽五行論・基本人体観",
        subtitle: "第1〜2講（全14講義）",
        targetLectureId: "lecture-yinyang-1",
        importance: "必須・毎年出題",
        badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
        description: "動的平衡、相生・相克、五行色体表、五臓の生理作用と配当関係。",
      },
      {
        id: "qixueshui",
        title: "気血津液・病理動態",
        subtitle: "第3講（全7講義）",
        targetLectureId: "lecture-qiblood-1",
        importance: "最頻出・臨床直結",
        badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
        description: "気虚・気滞・気逆、血虚・瘀血、津液不足・痰湿の成因と弁証所見。",
      },
      {
        id: "zangfu",
        title: "蔵象学説・臓腑弁証",
        subtitle: "第4講（全10講義）",
        targetLectureId: "lecture-lifedynamics-6",
        importance: "状況設定問題の核心",
        badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
        description: "五臓六腑の主宰機能、臓腑相関（木乗土、心腎不交等）、実証と虚証の鑑別。",
      },
      {
        id: "byoin",
        title: "病因病機・外感内傷",
        subtitle: "第5講（全7講義）",
        targetLectureId: "lecture-pathomechanism-1",
        importance: "鑑別の基礎",
        badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
        description: "六淫（風寒暑湿燥火）、七情内傷、飲食労倦、痰飲・瘀血の二次的病因。",
      },
      {
        id: "shishin",
        title: "四診・弁証論治",
        subtitle: "第6講（全8講義）",
        targetLectureId: "lecture-diagnosis-1",
        importance: "毎年連問出題",
        badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
        description: "望舌（舌色・苔・形態）、問診（寒熱・疼痛・便通）、切診（脈診・腹診）。",
      },
      {
        id: "keiraku-acupoints",
        title: "十四経脈・要穴・配穴法",
        subtitle: "第7講（全8講義）",
        targetLectureId: "lecture-treatment-1",
        importance: "配点最大・暗記必須",
        badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
        description: "五行穴（井滎兪経合）、原絡郄、兪募穴、八会穴、四総穴、八脈交会穴。",
      },
    ];

    return categories.map((cat) => {
      // 当該カテゴリの受講進捗を算出
      return {
        ...cat,
      };
    });
  }, []);

  const incorrectQuestions = getIncorrectQuestions();

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 印刷専用A4シートタイトルヘッダー */}
      <div className="hidden print:block mb-6 border-b-2 border-[#1E3D34] pb-3 text-black">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold font-serif">はり師・きゅう師 国家試験対策 暗記チェックシート</h1>
            <p className="text-xs text-slate-600 mt-1">はり太郎の東洋医学（haritaro.jp）｜ 東洋医学概論・経絡経穴概論 最重要精選演習セレクション</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span>印刷日: {todayStr}</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. ヒーローセクション ＆ 国試カウントダウン                    */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3D34] via-[#162E27] to-[#0E1F1A] text-[#FAF8F5] p-6 sm:p-10 shadow-xl border border-[#2D5A4D] print:hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/10 text-[#E6C387]">
                <GraduationCap className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E6C387]/20 text-[#E6C387] border border-[#E6C387]/30">
                国家試験対策特設ハブ
              </span>
            </div>

            {/* カウントダウンタイマー */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-xs">
              <Calendar className="w-4 h-4 text-[#E6C387]" />
              <span className="text-xs text-[#E6EFEA]">第34回 鍼灸国試まで</span>
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#E6C387] px-1">
                {daysUntilExam}
              </span>
              <span className="text-xs text-[#E6EFEA]">日</span>
            </div>
          </div>

          <div className="max-w-2xl space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight text-[#FAF8F5]">
              東洋医学・経絡経穴で<br className="hidden sm:inline" />満点を掴み取る最短ルート
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E0D9] leading-relaxed">
              単なる過去問の丸暗記ではなく、「全81講義の理論 ⇄ 全361穴の辞典 ⇄ 20症例の臨床推論」を自在に往復。忘却曲線に基づく復習エンジンで、本番まで知識を強固に定着させます。
            </p>
          </div>

          {/* 学習進捗ステータス */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#D1E0D9]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#74BA9E]" />
              <span>全81レッスン中 <strong>{totalCompleted}</strong> 完了</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#E6C387]" />
              <span>クイズ解答履歴: <strong>{Object.keys(quizResults).length}</strong> / 243問</span>
            </div>
            {incorrectQuestions.length > 0 && (
              <div className="flex items-center gap-1.5 text-rose-300">
                <AlertCircle className="w-4 h-4" />
                <span>要復習問題: <strong>{incorrectQuestions.length}</strong> 問</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. 本日の忘却曲線デイリー復習（毎日3問）                      */}
      {/* ============================================================ */}
      <section className="bg-white dark:bg-[#17212A] rounded-3xl border-2 border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
              <Zap className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {isWeakPointsOnly
                    ? `弱点克服・間違えた問題特訓（${displayedDailyQuestions.length}問）`
                    : "本日の忘却曲線デイリー特訓（3問）"}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#83BEA8]">
                  {isWeakPointsOnly ? "苦手集中" : "毎日自動更新"}
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                {isWeakPointsOnly
                  ? "過去に間違えた問題を集中的に再挑戦し、弱点を完全に克服します。"
                  : "過去の誤答履歴や学習間隔から、今日復習すべき最も効果的な問題を厳選抽出しています。"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {incorrectQuestions.length > 0 && (
              <button
                type="button"
                onClick={() => setIsWeakPointsOnly(!isWeakPointsOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isWeakPointsOnly
                    ? "bg-[#B86924] text-white border-[#B86924]"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#B86924] dark:text-[#E6C387] border-[#B86924]/40 hover:bg-[#FCF4EB]"
                }`}
              >
                {isWeakPointsOnly ? "デイリー3問に戻る" : `🔥 間違えた問題のみ解く（${incorrectQuestions.length}問）`}
              </button>
            )}
            <span className="font-mono text-xs text-[#737C77] dark:text-[#8899A6]">
              {todayStr}
            </span>
          </div>
        </div>

        {/* 出題リスト */}
        <div className="space-y-6">
          {displayedDailyQuestions.map((item, qIdx) => {
            const isSub = submitted[item.question.id];
            const userChoice = userAnswers[item.question.id];
            const isCorrect = userChoice === item.question.correctIndex;
            const topic = item.question.question.match(/【([^】]+)】/)?.[1] || "";

            return (
              <div
                key={item.question.id}
                className="p-5 sm:p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#263542] bg-[#FAF8F5] dark:bg-[#121920] space-y-4 transition-all"
              >
                {/* 問題ヘッダー */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-white font-mono text-xs font-bold">
                      {qIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                      {item.group.chapterTitle}
                    </span>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                      ｜{item.group.lectureTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white dark:bg-[#1A2530] text-[#B86924] dark:text-[#E6C387] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    {item.reason}
                  </span>
                </div>

                {/* 問題文 */}
                <p className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                  {item.question.question}
                </p>

                {/* 3択選択肢 */}
                <div className="space-y-2 pt-1">
                  {item.question.options.map((opt, optIdx) => {
                    let optStyle = "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#263542] hover:border-[#1E3D34] text-[#232826] dark:text-[#FAF8F5]";
                    
                    if (isSub) {
                      if (optIdx === item.question.correctIndex) {
                        optStyle = "bg-emerald-50 dark:bg-[#162721] border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold";
                      } else if (userChoice === optIdx) {
                        optStyle = "bg-rose-50 dark:bg-[#281315] border-rose-500 text-rose-950 dark:text-rose-200";
                      } else {
                        optStyle = "opacity-50 border-gray-200 dark:border-gray-800 text-gray-500";
                      }
                    } else if (userChoice === optIdx) {
                      optStyle = "bg-[#EBF3EF] dark:bg-[#1A2E26] border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] font-bold shadow-xs";
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(item.question.id, optIdx)}
                        disabled={isSub}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${optStyle}`}
                      >
                        <span className="font-mono font-bold text-xs shrink-0 mt-0.5">
                          {["A", "B", "C"][optIdx]}.
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {isSub && optIdx === item.question.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 回答ボタン（未提出時） */}
                {!isSub ? (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => handleSubmitAnswer(item)}
                      disabled={userChoice === undefined}
                      className="px-5 py-2 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold hover:bg-[#162E27] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                    >
                      回答を確定する
                    </button>
                  </div>
                ) : (
                  /* 解説 ＆ 講義復習ジャンプ（提出後） */
                  <div className={`p-4 rounded-xl space-y-3 animate-fadeIn text-xs sm:text-sm ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-[#142820] border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                      : "bg-rose-50 dark:bg-[#281517] border border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-100"
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>正解です！素晴らしい着眼点です。</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                          <span>不正解です。解説を読んで要点を確認しましょう。</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed pl-7">{item.question.explanation}</p>

                    <div className="pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50 flex flex-wrap items-center justify-between gap-2 pl-7">
                      <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                        関連テーマ: 『{topic || item.group.lectureTitle}』
                      </span>
                      <Link
                        href={`/curriculum?lecture=${item.group.lectureId}&focus=${encodeURIComponent(topic)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-xs group"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>講義本文の該当箇所で復習する</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. 出題形式別 3大集中特訓モード                                */}
      {/* ============================================================ */}
      <section className="space-y-5 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B86924] dark:text-[#E6C387]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              出題形式別 3大集中特訓モード
            </h2>
          </div>
          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
            目的に応じて選べる直結演習
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* モードA: 状況設定問題 */}
          <Link
            href="/cases"
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#17212A] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3EF] text-[#1E3D34] dark:bg-[#182823] dark:text-[#74BA9E]">
                  配点大・全20症例
                </span>
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                状況設定問題・症例突破
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                四診データから主病態（八綱・臓腑）を導き、適正な治法と主穴・配穴を決定する長文連問トレーニング。
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <span>症例演習一覧へ進む</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* モードB: 要穴・骨度法マスター */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#17212A] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
                  <Compass className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FCF4EB] text-[#B86924] dark:bg-[#2A2016] dark:text-[#E6C387]">
                  暗記必須・361穴
                </span>
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                要穴・取穴・骨度法マスター
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                五行穴（井滎兪経合）、原絡郄、兪募穴、四総穴の暗記と、WHO標準解剖取穴・骨度法寸数の完全マスター。
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-col gap-2">
              <Link
                href="/tsubo"
                className="flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:underline"
              >
                <span>経穴辞典・骨度法へ進む</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tsubo/practice"
                className="flex items-center justify-between text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                <span>⚡ 経穴フラッシュ一問一答演習</span>
                <Zap className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* モードC: 禁忌・安全管理 */}
          <Link
            href="/practice/haiketsu"
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#17212A] border-2 border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-rose-600 dark:hover:border-rose-400 hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  失点厳禁・安全
                </span>
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                禁忌・過誤防止セーフティ
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                妊婦禁忌穴（合谷・三陰交等）、気胸リスク穴（胸背部直刺深度）、延髄危険穴の刺鍼基準を網羅チェック。
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
              <span>配穴・禁忌チェックへ進む</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. 本試験過去問アーカイブ特訓（第30回〜第33回 実問4択）         */}
      {/* ============================================================ */}
      <section className="bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387]">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                  国試対策演習アーカイブ（精選4択）
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3D34] text-white">
                  実戦4択
                </span>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                東洋医学概論・経絡経穴概論・臨床論の頻出重要テーマを徹底攻略する精選演習問題集。
              </p>
            </div>
          </div>

          {/* コントロール（印刷ボタン・科目・回次フィルター） */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 print:hidden self-start lg:self-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0"
              title="A4暗記チェックシートとして印刷"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>A4印刷</span>
            </button>

            {/* 科目フィルター */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E8E1D1] dark:border-[#263542]">
              {(["all", "東洋医学概論", "経絡経穴概論", "東洋医学臨床論"] as const).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setPastSubjectFilter(sub)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    pastSubjectFilter === sub
                      ? "bg-[#1E3D34] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#8899A6] hover:text-[#1E3D34]"
                  }`}
                >
                  {sub === "all" ? "全科目" : sub}
                </button>
              ))}
            </div>

            {/* 回次フィルター */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#10161C] border border-[#E8E1D1] dark:border-[#263542]">
              {(["all", 33, 32, 31, 30] as const).map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setPastExamYearFilter(yr)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    pastExamYearFilter === yr
                      ? "bg-[#B86924] text-white shadow-xs"
                      : "text-[#59615D] dark:text-[#8899A6] hover:text-[#B86924]"
                  }`}
                >
                  {yr === "all" ? "全回次" : `第${yr}回`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 過去問カード一覧 */}
        <div className="space-y-6">
          {filteredPastExams.map((item) => {
            const userChoice = pastExamAnswers[item.id];
            const isSub = pastExamSubmitted[item.id];
            const isCorrect = userChoice === item.correctIndex;

            return (
              <div
                key={item.id}
                id={`kokushi-exam-${item.id}`}
                className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-4 scroll-mt-24 transition-all print:break-inside-avoid print:bg-white print:border-slate-300 print:p-4 print:space-y-2.5"
              >
                {/* メタ情報バッジ */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.examNumber ? (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#1E3D34] text-white print:border print:border-slate-400 print:text-black print:bg-transparent">
                        第{item.examNumber}回
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#B86924] text-white print:border print:border-slate-400 print:text-black print:bg-transparent">
                        精選予想
                      </span>
                    )}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#1E2B37] text-[#1E3D34] dark:text-[#74BA9E] border border-[#E8E1D1] dark:border-[#2D3E50] print:border-slate-300 print:text-black">
                      {item.subject}
                    </span>
                    <span className="text-xs text-[#59615D] dark:text-[#8899A6] print:text-slate-600">
                      {item.questionNumber}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#B86924] dark:text-[#E6C387] print:text-slate-600">
                    領域: {item.category}
                  </span>
                </div>

                {/* 問題本文 */}
                <p className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] leading-relaxed print:text-black">
                  {item.question}
                </p>

                {/* 4択選択肢ボタン */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 print:grid-cols-2 print:gap-1.5">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    let optStyle = "bg-white dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34]";

                    if (isSelected) {
                      optStyle = "bg-[#EBF3EF] dark:bg-[#182823] border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#FAF8F5] font-bold";
                    }

                    if (isSub) {
                      if (optIdx === item.correctIndex) {
                        optStyle = "bg-emerald-50 dark:bg-[#142820] border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrect) {
                        optStyle = "bg-rose-50 dark:bg-[#281517] border-rose-500 text-rose-900 dark:text-rose-200";
                      } else {
                        optStyle = "opacity-50 bg-white dark:bg-[#17212A] border-[#E8E1D1] dark:border-[#263542]";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectPastOption(item.id, optIdx)}
                        disabled={isSub}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-all print:border-slate-300 print:p-2 print:bg-white print:text-black ${optStyle}`}
                      >
                        <span className="font-mono font-bold text-xs shrink-0 mt-0.5">
                          {optIdx + 1}.
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {isSub && optIdx === item.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 print:hidden" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 確定ボタン（画面用） */}
                {!isSub ? (
                  <div className="flex justify-end pt-1 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleSubmitPastAnswer(item.id)}
                      disabled={userChoice === undefined}
                      className="px-5 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                    >
                      正誤を判定する
                    </button>
                  </div>
                ) : (
                  /* 画面用：解説・要点・講義リンク */
                  <div className={`p-4 rounded-xl space-y-3 text-xs sm:text-sm print:hidden ${
                    isCorrect
                      ? "bg-emerald-50 dark:bg-[#142820] border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                      : "bg-rose-50 dark:bg-[#281517] border border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-100"
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>正解（{item.correctIndex + 1}番）です！</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-rose-600" />
                          <span>不正解です（正解は {item.correctIndex + 1}番）。</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed pl-7 whitespace-pre-line">{item.explanation}</p>

                    {item.keyPoints && item.keyPoints.length > 0 && (
                      <div className="pl-7 pt-1">
                        <span className="font-bold text-[11px] text-[#B86924] dark:text-[#E6C387] block mb-1">
                          📌 暗記のキーポイント:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
                          {item.keyPoints.map((kp, kpIdx) => (
                            <li key={kpIdx}>{kp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.relatedLectureId && (
                      <div className="pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50 flex flex-wrap items-center justify-between gap-2 pl-7">
                        <span className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                          関連講義: 『{item.relatedLectureTitle || "カリキュラム"}』
                        </span>
                        <Link
                          href={`/curriculum?lecture=${item.relatedLectureId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shadow-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>この分野の講義テキストへ</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* 印刷専用：正解・解説・暗記キーポイント（A4紙面用） */}
                <div className="hidden print:block pt-2 border-t border-slate-300 text-xs space-y-1 text-black">
                  <div className="font-bold text-slate-900">
                    【正解】 {item.correctIndex + 1}. {item.options[item.correctIndex]}
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    {item.explanation}
                  </p>
                  {item.keyPoints && item.keyPoints.length > 0 && (
                    <div className="text-[10px] text-slate-800 font-semibold bg-slate-100 p-1 rounded">
                      <span>暗記要点: </span>
                      <span>{item.keyPoints.join(" / ")}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. 分野別・弱点克服カリキュラム                                */}
      {/* ============================================================ */}
      <section className="bg-white dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6 print:hidden">
        <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                単元別・弱点克服カリキュラム
              </h2>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                苦手な分野をクリックして、全81講義の体系テキストへ直接復習に飛べます。
              </p>
            </div>
          </div>
          <Link
            href="/curriculum"
            className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
          >
            <span>全カリキュラム ➜</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryStats.map((cat) => (
            <Link
              key={cat.id}
              href={`/curriculum?lecture=${cat.targetLectureId}`}
              className="p-4 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#121920] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                    {cat.importance}
                  </span>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    {cat.subtitle}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EAE3D4] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                <span>この分野の講義テキストを復習する</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. 間違えた問題・マイクリップ帳（ストック復習）                */}
      {/* ============================================================ */}
      {incorrectQuestions.length > 0 && (
        <section className="bg-gradient-to-br from-rose-50/50 via-[#FAF8F5] to-rose-50/30 dark:from-[#241315]/40 dark:via-[#17212A] dark:to-[#201012]/30 rounded-3xl border-2 border-rose-200 dark:border-rose-900/50 p-5 sm:p-8 space-y-5 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/60 dark:border-rose-900/60 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg font-bold text-rose-950 dark:text-rose-100">
                  間違えた問題ストック（{incorrectQuestions.length}問）
                </h2>
                <p className="text-xs text-rose-800/80 dark:text-rose-300/80">
                  過去に不正解だった問題をもう一度解き直して完全克服しましょう。
                </p>
              </div>
            </div>
            <Link
              href="/notes"
              className="text-xs font-bold text-rose-700 dark:text-rose-300 hover:underline flex items-center gap-1"
            >
              <span>マイノートで全体管理 ➜</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {incorrectQuestions.slice(0, 4).map((item) => {
              const topic = (item.questionText || "").match(/【([^】]+)】/)?.[1] || "";
              return (
                <div
                  key={item.questionId}
                  className="bg-white dark:bg-[#151C24] p-4 rounded-2xl border border-rose-100 dark:border-rose-950/70 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      {item.lectureTitle}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#232826] dark:text-[#FAF8F5] line-clamp-2 leading-relaxed">
                      {item.questionText}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-rose-50 dark:border-rose-950/50 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      正解: {item.options[item.correctAnswerIndex]}
                    </span>
                    <Link
                      href={`/curriculum?lecture=${item.lectureId}&focus=${encodeURIComponent(topic)}`}
                      className="font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-0.5"
                    >
                      <span>復習 ➜</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
