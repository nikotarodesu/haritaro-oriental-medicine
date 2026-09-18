"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Brain, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Flame, 
  Trophy, 
  ArrowRight, 
  ChevronRight, 
  Crown, 
  Lock, 
  Bookmark, 
  BookOpen, 
  BarChart3, 
  Filter, 
  Calendar,
  Layers,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import AuthModal from "@/components/auth/AuthModal";
import { CURRICULUM_QUIZZES, QuizQuestionItem, LessonQuizGroup } from "@/data/curriculumQuizzes";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";

// 復習履歴の型定義
interface ReviewLogItem {
  questionId: string;
  lectureId: string;
  chapterTitle: string;
  lastReviewedAt: string; // ISO string
  correctCount: number;
  wrongCount: number;
  intervalDays: number; // 忘却曲線インターバル (1, 3, 7, 14, 30日)
  nextReviewAt: string; // ISO string
}

// 8大体系カテゴリ
const CATEGORIES = [
  { id: "all", name: "全体系ランダム", icon: "🌐" },
  { id: "yinyang", name: "陰陽論", icon: "☯️" },
  { id: "gogyo", name: "五行論", icon: "⭐" },
  { id: "zofu", name: "蔵象論", icon: "🫀" },
  { id: "kiketsu", name: "気血津液", icon: "💧" },
  { id: "keiraku", name: "経絡経穴", icon: "⚡" },
  { id: "byoin", name: "病因病機", icon: "🌪️" },
  { id: "shindan", name: "四診八綱", icon: "🔍" },
  { id: "haiketsu", name: "配穴方剤", icon: "🌿" },
];

export default function SmartReviewPage() {
  const { user, isPremium } = useAuth();
  const { addMemo } = useClinicalMemo();

  // モーダル
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalFeature, setAuthModalFeature] = useState("忘却曲線スマート復習");

  // モード選択: "speed" (5分スピード), "weak" (弱点集中), "category" (体系別), "cases" (症例復習)
  const [activeTab, setActiveTab] = useState<"speed" | "weak" | "category" | "cases">("speed");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // クイズ実行ステート
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Array<QuizQuestionItem & { chapterTitle: string; lectureTitle: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [memoSaved, setMemoSaved] = useState(false);

  // 復習履歴ステート (LocalStorage保存)
  const [reviewLogs, setReviewLogs] = useState<Record<string, ReviewLogItem>>({});
  const [todayCompletedCount, setTodayCompletedCount] = useState(0);

  // 初期ロード
  useEffect(() => {
    try {
      const saved = localStorage.getItem("haritaro_review_history_v1");
      if (saved) {
        setReviewLogs(JSON.parse(saved));
      }
      const todayKey = `haritaro_review_today_${new Date().toISOString().split("T")[0]}`;
      const count = parseInt(localStorage.getItem(todayKey) || "0", 10);
      setTodayCompletedCount(count);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 全クイズのフラット配列
  const allFlattenedQuestions = useMemo(() => {
    const list: Array<QuizQuestionItem & { chapterTitle: string; lectureTitle: string; chapterId: string; lectureId: string }> = [];
    Object.values(CURRICULUM_QUIZZES).forEach(group => {
      group.questions.forEach(q => {
        list.push({
          ...q,
          chapterTitle: group.chapterTitle,
          lectureTitle: group.lectureTitle,
          chapterId: group.chapterId,
          lectureId: group.lectureId
        });
      });
    });
    return list;
  }, []);

  // 忘却曲線に基づく「今日復習すべき問題」
  const dueQuestions = useMemo(() => {
    const now = new Date();
    return allFlattenedQuestions.filter(q => {
      const log = reviewLogs[q.id];
      if (!log) return false;
      return new Date(log.nextReviewAt) <= now;
    });
  }, [allFlattenedQuestions, reviewLogs]);

  // 間違えたことのある弱点問題
  const weakQuestions = useMemo(() => {
    return allFlattenedQuestions.filter(q => {
      const log = reviewLogs[q.id];
      return log && log.wrongCount > 0;
    });
  }, [allFlattenedQuestions, reviewLogs]);

  // クイズ開始処理
  const startQuiz = (mode: "speed" | "weak" | "category" | "cases") => {
    // 無料会員制限：1日1回（スピード復習5問）のみ無料、それ以上または他モードはプレミアム
    if (!isPremium && mode !== "speed" && todayCompletedCount >= 1) {
      setAuthModalFeature("無制限スマート復習・弱点特訓モード");
      setAuthModalOpen(true);
      return;
    }

    let pool: Array<QuizQuestionItem & { chapterTitle: string; lectureTitle: string }> = [];

    if (mode === "speed") {
      // 5分間スピード復習：忘却曲線の期日問題があればそれを優先、残りはランダム（5問）
      const prioritized = [...dueQuestions];
      const remaining = allFlattenedQuestions.filter(q => !prioritized.some(p => p.id === q.id));
      // シャッフル
      const shuffled = [...prioritized.sort(() => 0.5 - Math.random()), ...remaining.sort(() => 0.5 - Math.random())];
      pool = shuffled.slice(0, 5);
    } else if (mode === "weak") {
      // 弱点克服：間違えた問題から優先抽出
      if (weakQuestions.length > 0) {
        pool = [...weakQuestions].sort(() => 0.5 - Math.random()).slice(0, 8);
      } else {
        // まだ誤答がない場合は全問からランダム
        pool = [...allFlattenedQuestions].sort(() => 0.5 - Math.random()).slice(0, 8);
      }
    } else if (mode === "category") {
      // 体系別
      const filtered = selectedCategory === "all" 
        ? allFlattenedQuestions 
        : allFlattenedQuestions.filter(q => q.chapterId.includes(selectedCategory) || q.chapterTitle.includes(selectedCategory));
      pool = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 8);
    } else if (mode === "cases") {
      // 症例演習ベースの復習（症例の鑑別クイズ）
      // 症例からクイズを動的生成
      const caseQuizzes: Array<QuizQuestionItem & { chapterTitle: string; lectureTitle: string }> = CLINICAL_CASES.map(c => ({
        id: `case-rev-${c.id}`,
        chapterTitle: "臨床症例演習",
        lectureTitle: c.title,
        question: `【${c.patient.chiefComplaint}の臨床鑑別】主訴:「${c.patient.chiefComplaint}」(${c.patient.gender} ${c.patient.age})。確定証「${c.correctDiagnosis.pattern}」の選定根拠・主穴として最も適切なものは？`,
        options: [
          `${c.correctDiagnosis.pattern}（主穴: ${c.correctDiagnosis.primaryPoints.slice(0, 2).join("・")}）`,
          `気滞血瘀証（主穴: 血海・膈兪）- 病態を問わず一律瀉法`,
          `腎陰虚証（主穴: 太谿・照海）- 表証を無視して補腎のみ先行`
        ],
        correctIndex: 0,
        explanation: `${c.correctDiagnosis.pattern}の病態機序: ${c.clinicalExplanation.pathomechanism}。主治配穴は${c.correctDiagnosis.primaryPoints.join("、")}が最も有効です。`
      }));
      pool = [...caseQuizzes].sort(() => 0.5 - Math.random()).slice(0, isPremium ? 8 : 3);
    }

    if (pool.length === 0) {
      pool = [...allFlattenedQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    setQuizQuestions(pool);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setMemoSaved(false);
    setIsQuizActive(true);
  };

  // 回答選択
  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const currentQ = quizQuestions[currentIndex];
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // 忘却曲線ロジックの更新
    const existingLog = reviewLogs[currentQ.id];
    let interval = existingLog ? existingLog.intervalDays : 1;

    if (isCorrect) {
      // 正解したらインターバルを伸長 (1 -> 3 -> 7 -> 14 -> 30)
      if (interval === 1) interval = 3;
      else if (interval === 3) interval = 7;
      else if (interval === 7) interval = 14;
      else interval = 30;
    } else {
      // 間違えたらインターバルを1日にリセット
      interval = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);

    const updatedLog: ReviewLogItem = {
      questionId: currentQ.id,
      lectureId: (currentQ as any).lectureId || "curriculum",
      chapterTitle: currentQ.chapterTitle,
      lastReviewedAt: new Date().toISOString(),
      correctCount: (existingLog?.correctCount || 0) + (isCorrect ? 1 : 0),
      wrongCount: (existingLog?.wrongCount || 0) + (isCorrect ? 0 : 1),
      intervalDays: interval,
      nextReviewAt: nextDate.toISOString(),
    };

    const newLogs = { ...reviewLogs, [currentQ.id]: updatedLog };
    setReviewLogs(newLogs);
    try {
      localStorage.setItem("haritaro_review_history_v1", JSON.stringify(newLogs));
    } catch (e) {
      console.error(e);
    }
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setMemoSaved(false);
    } else {
      setQuizFinished(true);
      // 今日の復習カウント加算
      const newTodayCount = todayCompletedCount + 1;
      setTodayCompletedCount(newTodayCount);
      const todayKey = `haritaro_review_today_${new Date().toISOString().split("T")[0]}`;
      localStorage.setItem(todayKey, newTodayCount.toString());
    }
  };

  // マイカルテへ要点を保存
  const handleSaveToMemo = () => {
    const currentQ = quizQuestions[currentIndex];
    addMemo({
      id: `rev-${currentQ.id}`,
      type: "custom",
      title: `【復習要点】${currentQ.chapterTitle}`,
      subTitle: currentQ.lectureTitle,
      points: [],
      elements: ["木"],
      indications: [],
      summary: `${currentQ.question}\n正解の要点: ${currentQ.explanation}`,
      personalNotes: `復習テストにて確認 (${new Date().toLocaleDateString("ja-JP")})`
    });
    setMemoSaved(true);
  };

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#10161C] text-[#232826] dark:text-[#FAF8F5]">
      {/* ヒーローヘッダー */}
      <div className="bg-white dark:bg-[#17212A] border-b border-[#E5DEC9] dark:border-[#2A3B4A] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387] border border-[#F3DEC5] dark:border-[#4A321E]">
              <Brain className="w-3.5 h-3.5" />
              <span>記憶定着アルゴリズム搭載</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-medium border border-[#C5DED4] dark:border-[#2A5243]">
              全92講・276問・臨床20症例対応
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#232826] dark:text-[#FAF8F5]">
              忘却曲線スマート復習
            </h1>
            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#96A6B2] max-w-2xl leading-relaxed">
              エビングハウスの忘却曲線に基づき、人間の脳が忘れかける最適なタイミング（1日・3日・7日・30日）で自動出題。日々のわずか5分で、東洋医学の臨床知見を一生モノの長期記憶へ定着させます。
            </p>
          </div>

          {/* サマリーステータスバー */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                <Clock className="w-4 h-4 text-[#B86924]" />
                <span>今日の要復習</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-[#232826] dark:text-[#FAF8F5]">
                {dueQuestions.length} <span className="text-xs font-normal">問</span>
              </p>
            </div>

            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>克服対象の弱点</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-red-600 dark:text-red-400">
                {weakQuestions.length} <span className="text-xs font-normal">問</span>
              </p>
            </div>

            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>本日復習完了</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-[#232826] dark:text-[#FAF8F5]">
                {todayCompletedCount} <span className="text-xs font-normal">セット</span>
              </p>
            </div>

            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                <Crown className="w-4 h-4 text-[#E6C387]" />
                <span>復習権限</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#1E3D34] dark:text-[#74BA9E] mt-1">
                {isPremium ? "無制限マスター" : "無料お試し (1日1回)"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {!isQuizActive ? (
          /* モード選択カード群 */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* カード 1: 5分間スピード復習 */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#B86924] p-5 sm:p-6 shadow-sm space-y-4 hover:shadow-md transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#B86924] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  一番人気・毎日の習慣に
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    5分間スピード復習セット
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    脳科学のインターバルに基づいて、今日復習が必要な最重要5問を厳選抽出。通勤中や診療の合間にサクッと定着。
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    所要時間: 約3〜5分（全5問）
                  </span>
                  <button
                    onClick={() => startQuiz("speed")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <span>スピード復習を開始</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* カード 2: 弱点・誤答克服モード */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4 hover:border-red-500 transition-all relative">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                      弱点・誤答克服モード
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300">
                      弱点 {weakQuestions.length}問
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    過去に間違えた問題や正答率の低い講義のみを集中出題。つまずきやすい概念を徹底的にクリアして死角をなくします。
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    8問集中特訓
                  </span>
                  <button
                    onClick={() => startQuiz("weak")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <span>弱点克服を開始</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* カード 3: 8大体系別 集中特訓 */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4 hover:border-[#1E3D34] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    東洋医学8大体系 集中特訓
                  </h3>
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    陰陽論、五行論、蔵象論、気血津液など、特定のテーマに絞って集中的に知識の穴埋めを行います。
                  </p>
                </div>
                
                {/* 体系選択ピル */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedCategory === cat.id
                          ? "bg-[#1E3D34] text-white dark:bg-[#74BA9E] dark:text-[#10161C]"
                          : "bg-[#FAF8F5] dark:bg-[#1A2530] text-[#59615D] dark:text-[#96A6B2] border border-[#E5DEC9] dark:border-[#2A3B4A]"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    onClick={() => startQuiz("category")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#74BA9E] hover:opacity-90 text-white dark:text-[#10161C] text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <span>体系別特訓を開始</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* カード 4: 臨床症例カンファレンス復習 */}
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 shadow-sm space-y-4 hover:border-blue-500 transition-all relative">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                      臨床症例カンファレンス復習
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      全20症例
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                    症例演習で学んだ「自律神経失調」「慢性胃炎」「更年期障害」などの四診情報から、証名選定と主穴・配穴を即答する実践ドリル。
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    鑑別＆配穴即答特訓
                  </span>
                  <button
                    onClick={() => startQuiz("cases")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <span>症例復習を開始</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* 忘却曲線エビングハウスの仕組み解説 */}
            <div className="bg-[#FAF8F5] dark:bg-[#151D25] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#B86924]" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  エビングハウスの忘却曲線とスマート復習の仕組み
                </h4>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                人間は一度覚えた知識の約70%を24時間以内に忘れてしまいます。しかし、**「1日後」「3日後」「7日後」「30日後」**の忘却境界で適切な復習を繰り返すと、記憶の忘却率は劇的に低下し、永久的な知識として定着します。本システムは各問題の正誤履歴をもとに次の復習日を自動計算しています。
              </p>
            </div>
          </div>
        ) : (
          /* クイズ進行中画面 */
          <div className="max-w-2xl mx-auto space-y-6">
            {!quizFinished ? (
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6">
                {/* ヘッダー・進行度 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6]">
                    <span className="font-bold text-[#B86924] dark:text-[#E6C387]">
                      {currentQ.chapterTitle}
                    </span>
                    <span>
                      問題 {currentIndex + 1} / {quizQuestions.length}
                    </span>
                  </div>

                  {/* 進行度バー */}
                  <div className="w-full h-1.5 rounded-full bg-[#E5DEC9] dark:bg-[#2A3B4A] overflow-hidden">
                    <div 
                      className="h-full bg-[#B86924] transition-all duration-300"
                      style={{ width: `${Math.round(((currentIndex + 1) / quizQuestions.length) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 問題文 */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6]">
                    {currentQ.lectureTitle}
                  </span>
                  <h3 className="font-serif text-base sm:text-xl font-bold leading-relaxed text-[#232826] dark:text-[#FAF8F5]">
                    {currentQ.question}
                  </h3>
                </div>

                {/* 3択選択肢 */}
                <div className="space-y-3">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrectOption = optIdx === currentQ.correctIndex;
                    
                    let btnClass = "border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#131B22] text-[#232826] dark:text-[#FAF8F5] hover:border-[#B86924]";
                    if (isAnswered) {
                      if (isCorrectOption) {
                        btnClass = "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 font-bold";
                      } else if (isSelected) {
                        btnClass = "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300";
                      } else {
                        btnClass = "opacity-50 border-[#E5DEC9] dark:border-[#2A3B4A]";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-[#FAF8F5] dark:bg-[#1C2732] flex items-center justify-center font-bold shrink-0 text-xs text-[#59615D] dark:text-[#96A6B2]">
                          {optIdx === 0 ? "A" : optIdx === 1 ? "B" : "C"}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isAnswered && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 回答後：解説と次へボタン */}
                {isAnswered && (
                  <div className="space-y-4 pt-4 border-t border-[#E5DEC9] dark:border-[#2A3B4A] animate-fadeIn">
                    <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#131B22] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        {selectedOption === currentQ.correctIndex ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            正解！忘却曲線インターバルが更新されました
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            不正解。明日再度復習にピックアップされます
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2] leading-relaxed">
                        {currentQ.explanation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={handleSaveToMemo}
                        disabled={memoSaved}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#131B22] text-xs font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <Bookmark className={`w-4 h-4 ${memoSaved ? "fill-current text-[#B86924]" : ""}`} />
                        <span>{memoSaved ? "マイカルテに保存済" : "要点をマイカルテに保存"}</span>
                      </button>

                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                      >
                        <span>{currentIndex + 1 < quizQuestions.length ? "次の問題へ" : "結果を見る"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 結果サマリー */
              <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    復習セッション完了！
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737C77] dark:text-[#8899A6]">
                    お疲れ様でした。忘却曲線スケジュールが正常に更新されました。
                  </p>
                </div>

                <div className="inline-block bg-[#FAF8F5] dark:bg-[#131B22] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-5">
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6] block mb-1">あなたの正解スコア</span>
                  <span className="font-serif text-4xl font-bold text-[#B86924] dark:text-[#E6C387]">
                    {score} <span className="text-base font-normal text-[#737C77]">/ {quizQuestions.length} 問正解</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setIsQuizActive(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-white dark:bg-[#131B22] text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    復習メニューへ戻る
                  </button>
                  <button
                    onClick={() => startQuiz("speed")}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#9B551B] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>もう1セット挑戦する</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 認証・アップグレードモーダル */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authModalFeature}
        description="忘却曲線に基づいた無制限復習や全体系特訓モードはプレミアム会員限定機能です。"
      />
    </div>
  );
}
