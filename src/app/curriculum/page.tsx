"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CURRICULUM_DATA, 
  Lecture, 
  PLANNED_UNPUBLISHED_LESSONS, 
  CURRICULUM_CHAPTERS_META,
  getCurriculumStats 
} from "@/data/curriculumData";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import { resolveArticleReferences } from "@/utils/referenceResolver";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { CURRICULUM_QUIZZES } from "@/data/curriculumQuizzes";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import { LearningMap } from "@/components/LearningMap";
import { IncorrectQuestionsModal } from "@/components/IncorrectQuestionsModal";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Award,
  Lock,
  Layers,
  Compass,
  Droplets,
  Activity,
  Flame,
  Search,
  Target,
  PlayCircle,
  RotateCcw,
  AlertCircle,
  Map,
  Check,
  ChevronDown,
  ChevronUp,
  HeartPulse
} from "lucide-react";

interface ChapterDef {
  chapterNumber: number;
  id: string; // learning map anchor
  seriesId: string;
  title: string;
  shortTitle?: string;
  lead: string;
  description: string;
  plannedLessons: number;
  icon: typeof Flame;
  progressKey: string;
}

const CHAPTER_DEFINITIONS: ChapterDef[] = [
  {
    chapterNumber: 1,
    id: "yin-yang",
    seriesId: "yinyang",
    title: "第1章 陰陽論",
    shortTitle: "陰陽論",
    lead: "生命ダイナミズムを読み解く「最小単位」の思考OS",
    description: "神秘思想を脱却し、「何と比べてどの性質か」「どう関係し、どう変化するか」「身体のどこに偏りがあるか」を1レッスンずつ確実に深掘りして修得する集中講義です。",
    plannedLessons: 8,
    icon: Flame,
    progressKey: "yin-yang",
  },
  {
    chapterNumber: 2,
    id: "five-elements",
    seriesId: "wuxing",
    title: "第2章 五行論",
    shortTitle: "五行論",
    lead: "循環と多臓器ネットワークを解き明かす「動態システム」の地図",
    description: "木・火・土・金・水の性質から相生・相剋、五臓・身体対応、感情・精神（五神五志）、自然環境、多臓器連動、そして臨床意思決定アルゴリズムまでを学習します。",
    plannedLessons: 12,
    icon: Compass,
    progressKey: "wuxing",
  },
  {
    chapterNumber: 3,
    id: "qi-blood-water",
    seriesId: "qiblood",
    title: "第3章 気血水理論",
    shortTitle: "気血水理論",
    lead: "エネルギー・物質・体液循環の動態と病態メカニズム",
    description: "「機能（気）」「物質（血）」「水分代謝（水）」を共通のフレームワークで徹底比較。各要素の正常作用・生成運行から病態分類、気血水相互連動、臨床推論演習までを学習します。",
    plannedLessons: 12,
    icon: Droplets,
    progressKey: "qiblood",
  },
  {
    chapterNumber: 4,
    id: "vital-function",
    seriesId: "lifedynamics",
    title: "第4章 生命機能論",
    shortTitle: "生命機能論",
    lead: "表裏・営衛・三焦の生体ダイナミクスと臓腑ネットワーク",
    description: "固定した解剖部位ではなく、防御・代謝・生殖といった機能層と外界適応力学から人体を捉える全12レッスンです。",
    plannedLessons: 12,
    icon: HeartPulse,
    progressKey: "lifedynamics",
  },
  {
    chapterNumber: 5,
    id: "pathology",
    seriesId: "pathomechanism",
    title: "第5章 病機論",
    shortTitle: "病機論",
    lead: "歪みの発生と病理ドミノ破綻モデル",
    description: "邪気侵入と正気衰弱が引き起こす病理タイムラインと氷山モデルを解読し、病因から発症・進行までの連鎖を解明する全12レッスンです。",
    plannedLessons: 12,
    icon: AlertCircle,
    progressKey: "pathomechanism",
  },
  {
    chapterNumber: 6,
    id: "diagnosis",
    seriesId: "diagnosis",
    title: "第6章 臨床診断論",
    shortTitle: "臨床診断論",
    lead: "四診情報を客観化する臨床推論アルゴリズム",
    description: "安全確認（レッドフラッグ）から望聞問切の客観化、八綱・気血水・臓腑経絡への論理的導出までを習得する全12レッスンです。",
    plannedLessons: 12,
    icon: Search,
    progressKey: "diagnosis",
  },
  {
    chapterNumber: 7,
    id: "treatment",
    seriesId: "treatment",
    title: "第7章 治法論",
    shortTitle: "治法論",
    lead: "介入ベクトル・刺激量・治療計画の臨床工学",
    description: "補瀉寒熱・本標優先・臓腑経絡配穴から刺激量設計、治療計画書までを一貫して体系化する全12レッスンです。",
    plannedLessons: 12,
    icon: Target,
    progressKey: "treatment",
  },
  {
    chapterNumber: 8,
    id: "practice",
    seriesId: "practice",
    title: "第8章 臨床実践論",
    shortTitle: "臨床実践論",
    lead: "臨床運用の完全プロトコルと自己修正ループ",
    description: "初診トリアージから弁証、日常語での説明合意、反応評価、治療計画の自己修正までを動的ループとして運用する全12レッスンです。",
    plannedLessons: 12,
    icon: Award,
    progressKey: "practice",
  },
];

export default function CurriculumPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [showLearningMap, setShowLearningMap] = useState<boolean>(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState<boolean>(false);
  // 章アコーディオン開閉状態（デフォルトは第1章のみ開く）
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({ 1: true });

  const {
    isMounted,
    completedLectures,
    toggleLectureCompleted,
    setLectureCompleted,
    recordVisitedLecture,
    totalCompleted,
    totalPercentage,
    totalPublished,
    totalPlanned,
    getChapterProgress,
    getNextResumeLectureId,
    getIncorrectQuestions,
    resetAllProgress,
  } = useCurriculumProgress();

  // 全講義をフラットに並べた配列（順序保証）
  const allLectures = CURRICULUM_DATA.flatMap((s) => s.lectures);

  // 講義閲覧時に訪問記録を自動保存
  useEffect(() => {
    if (activeLecture) {
      recordVisitedLecture(activeLecture.id);
    }
  }, [activeLecture, recordVisitedLecture]);

  // 次に受講すべき講義
  const resumeLectureId = isMounted
    ? getNextResumeLectureId(allLectures.map((l) => l.id))
    : allLectures[0]?.id;
  const resumeLecture = allLectures.find((l) => l.id === resumeLectureId) || allLectures[0];
  const incorrectQuestions = isMounted ? getIncorrectQuestions() : [];

  // 受講中講義がある場合、その章をデフォルト展開
  useEffect(() => {
    if (isMounted && resumeLecture) {
      const def = CHAPTER_DEFINITIONS.find((c) => c.seriesId === resumeLecture.seriesId);
      if (def) {
        setExpandedChapters((prev) => ({ ...prev, [def.chapterNumber]: true }));
      }
    }
  }, [isMounted, resumeLecture]);

  // URLクエリ（?lecture=xxx）による講義直接オープン（後方互換対応）
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const lectureId = params.get("lecture");
      if (lectureId) {
        let resolvedId = lectureId;
        if (lectureId === "lecture-1" || lectureId === "lecture-1-yinyang") {
          resolvedId = "lecture-yinyang-1";
        } else if (lectureId === "lecture-2" || lectureId === "lecture-2-wuxing") {
          resolvedId = "lecture-wuxing-1";
        } else if (lectureId === "lecture-3" || lectureId === "lecture-3-qiblood") {
          resolvedId = "lecture-qiblood-1";
        } else if (lectureId === "lecture-4" || lectureId === "lecture-4-lifedynamics") {
          resolvedId = "lecture-lifedynamics-1";
        } else if (lectureId === "lecture-5" || lectureId === "lecture-5-pathomechanism") {
          resolvedId = "lecture-pathomechanism-1";
        } else if (lectureId === "lecture-6" || lectureId === "lecture-6-diagnosis") {
          resolvedId = "lecture-diagnosis-1";
        } else if (lectureId === "lecture-7" || lectureId === "lecture-7-treatment") {
          resolvedId = "lecture-treatment-1";
        } else if (lectureId === "lecture-8" || lectureId === "lecture-8-practice") {
          resolvedId = "lecture-practice-1";
        }
        const found = allLectures.find((l) => l.id === resolvedId);
        if (found) {
          setActiveLecture(found);
        }
      }
    }
  }, [allLectures]);

  // 現在の講義の位置と前後ナビゲーション
  const currentIndex = activeLecture
    ? allLectures.findIndex((l) => l.id === activeLecture.id)
    : -1;
  const prevLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex >= 0 && currentIndex < allLectures.length - 1
      ? allLectures[currentIndex + 1]
      : null;

  // 講義選択・遷移ハンドラ
  const handleSelectLecture = (lecture: Lecture) => {
    setActiveLecture(lecture);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/curriculum?lecture=${lecture.id}`);
    }
  };

  // アコーディオンの個別開閉
  const toggleChapter = (chapterNum: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterNum]: !prev[chapterNum],
    }));
  };

  // すべて展開 / すべて折りたたむ
  const areAllExpanded = CHAPTER_DEFINITIONS.every((c) => expandedChapters[c.chapterNumber]);
  const toggleAllChapters = () => {
    if (areAllExpanded) {
      setExpandedChapters({});
    } else {
      const all: Record<number, boolean> = {};
      CHAPTER_DEFINITIONS.forEach((c) => {
        all[c.chapterNumber] = true;
      });
      setExpandedChapters(all);
    }
  };

  // 学習マップからの章選択ハンドラ
  const handleSelectChapterFromMap = (chapterId: string) => {
    const def = CHAPTER_DEFINITIONS.find((c) => c.id === chapterId);
    if (def) {
      setExpandedChapters((prev) => ({ ...prev, [def.chapterNumber]: true }));
    }
    setTimeout(() => {
      const el = document.getElementById(`chapter-${chapterId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  // -------------------------------------------------------------
  // 1. 講義詳細ビュー（読書モード）
  // -------------------------------------------------------------
  if (activeLecture) {
    const seenTerms = new Set<string>();
    const resolvedReferences = resolveArticleReferences(
      activeLecture.references,
      activeLecture.contentMarkdown
    );

    // 同じシリーズに属するレッスン一覧
    const activeSeriesLessons = allLectures.filter(
      (l) => l.seriesId === activeLecture.seriesId
    );
    const isCompleted = isMounted && !!completedLectures[activeLecture.id];

    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-5 sm:space-y-6">
        {/* 読書進捗バー */}
        <ReadingProgressBar />

        {/* 最上部ナビゲーション */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              setActiveLecture(null);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", "/curriculum");
              }
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>カリキュラム一覧へ戻る</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/simulator"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F2D7B3] dark:border-[#4D331F] hover:bg-[#FBE9D5] px-3.5 py-2 rounded-xl transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>シミュレーターで試す</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#59615D] dark:text-[#96A6B2]">
              <Clock className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>約 {activeLecture.duration}</span>
            </div>
          </div>
        </div>

        {/* シリーズ進捗インジケーター（スリム化・タップ領域確保） */}
        {activeSeriesLessons.length > 1 && (
          <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE0] dark:border-[#22303D] text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-4 h-4" />
                <span>{activeLecture.seriesTitle || "講義"} シリーズ進捗</span>
              </div>
              <span className="font-mono text-xs text-[#737C77] dark:text-[#8899A6]">
                レッスン {activeLecture.lessonNumber || activeLecture.lectureNumber} / {activeSeriesLessons.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {activeSeriesLessons.map((lec) => {
                const isActive = lec.id === activeLecture.id;
                const isLecCompleted = isMounted && !!completedLectures[lec.id];
                return (
                  <button
                    key={lec.id}
                    onClick={() => handleSelectLecture(lec)}
                    className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? "bg-[#1E3D34] text-white shadow-xs"
                        : isLecCompleted
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#EBF3EF] border border-[#EDE7DC] dark:border-[#22303D]"
                    }`}
                    title={lec.title}
                  >
                    {isLecCompleted && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                    <span>{lec.lessonNumber ? `第${lec.lessonNumber}講` : lec.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 講義テキスト本体 */}
        <article className="bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] px-3.5 py-6 sm:p-10 shadow-xs space-y-6 transition-colors">
          {/* 講義ヘッダー（5-2: 上部は章名・レッスン番号・タイトル・読了時間・学習ステータスに集約） */}
          <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-bold">
                  {activeLecture.stageTitle}
                </span>
                {activeLecture.seriesTitle && activeLecture.lessonNumber ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#B86924] dark:text-[#E6C387] font-bold">
                    {activeLecture.seriesTitle} レッスン {activeLecture.lessonNumber}
                  </span>
                ) : (
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                    第 {activeLecture.lectureNumber} 講
                  </span>
                )}
                <span className="text-[#737C77] dark:text-[#8899A6]">
                  約 {activeLecture.duration}
                </span>
              </div>

              {/* 学習ステータス切替ボタン（44pxタップ領域） */}
              <button
                type="button"
                onClick={() => toggleLectureCompleted(activeLecture.id)}
                className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                    : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`} />
                <span>{isCompleted ? "受講完了（済）" : "受講済みにする"}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
              {activeLecture.title}
            </h1>
            {activeLecture.subtitle && (
              <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {activeLecture.subtitle}
              </p>
            )}
          </div>

          {/* 5-2: 学習ゴール枠（学ぶ内容・できること・重要要点を1つの枠に統合してスクロール量を大幅削減） */}
          <div className="bg-[#FAF8F5] dark:bg-[#141E28] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#EBE4D5] dark:border-[#22303D] pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <h2 className="font-serif text-sm sm:text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  本レッスンの学習ゴール ＆ 重要要点
                </h2>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                学習の狙い
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white/80 dark:bg-[#1A2632]/80 p-3 rounded-xl border border-[#EDE7DC] dark:border-[#243444] space-y-1">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8] block">主な学習内容</span>
                <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                  {activeLecture.whatYouWillLearn.topics}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-[#1A2632]/80 p-3 rounded-xl border border-[#EDE7DC] dark:border-[#243444] space-y-1">
                <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">習得ゴール（できるようになること）</span>
                <p className="text-xs sm:text-sm font-semibold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                  {activeLecture.whatYouWillLearn.canDo}
                </p>
              </div>
            </div>

            {/* 重要ポイント（最大3点） */}
            {activeLecture.keyPoints && activeLecture.keyPoints.length > 0 && (
              <div className="pt-2 border-t border-[#EBE4D5] dark:border-[#22303D] space-y-1">
                <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] block">
                  押さえるべき重要要点
                </span>
                <ul className="space-y-1 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
                  {activeLecture.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✓</span>
                      <span><GlossaryRenderer text={point} seenTerms={seenTerms} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 本文（MarkdownBody） */}
          <MarkdownBody
            contentMarkdown={activeLecture.contentMarkdown}
            seenTerms={seenTerms}
            onNextLecture={nextLecture ? () => handleSelectLecture(nextLecture) : undefined}
            idPrefix="curriculum-heading"
            resolvedReferences={resolvedReferences}
          />

          {/* レッスン理解度チェック（クイズ演習） */}
          {CURRICULUM_QUIZZES[activeLecture.id] && (
            <InteractiveQuiz quiz={CURRICULUM_QUIZZES[activeLecture.id]} />
          )}

          {/* 次章・次レッスンへの進行バナー（クイズの直後に配置） */}
          {nextLecture && (
            <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1E3D34] to-[#152C25] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#E6C387] font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {activeLecture.seriesId !== nextLecture.seriesId ? "Next Chapter ── 次の章へステップアップ" : "Next Lesson ── 次のレッスンへ"}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base sm:text-lg">
                  {nextLecture.seriesTitle ? `${nextLecture.seriesTitle}：` : ""}{nextLecture.title}
                </h4>
                {nextLecture.subtitle && (
                  <p className="text-xs text-[#D3DFDA] line-clamp-1">
                    {nextLecture.subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isCompleted) {
                    toggleLectureCompleted(activeLecture.id);
                  }
                  handleSelectLecture(nextLecture);
                }}
                className="shrink-0 px-6 py-3 rounded-xl bg-[#E6C387] hover:bg-[#DFC07D] text-[#1E3D34] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{activeLecture.seriesId !== nextLecture.seriesId ? "次章へ進む" : "次のレッスンへ進む"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* 参考文献・学術エビデンス */}
          <ArticleReferences references={resolvedReferences} />

          {/* 講義受講修了フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleLectureCompleted(activeLecture.id)}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  isCompleted
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-white" : "text-slate-400"}`} />
                <span>
                  {isCompleted ? "受講完了（解除する）" : "受講済みにする"}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {prevLecture && (
                <button
                  type="button"
                  onClick={() => handleSelectLecture(prevLecture)}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>前のレッスン</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setActiveLecture(null);
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", "/curriculum");
                  }
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                一覧に戻る
              </button>

              {nextLecture && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isCompleted) {
                      toggleLectureCompleted(activeLecture.id);
                    }
                    handleSelectLecture(nextLecture);
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs sm:text-sm font-bold hover:bg-[#162E27] transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>{isCompleted ? "次のレッスンへ進む" : "受講完了にして次へ進む"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. カリキュラム一覧ビュー（5-3: 8章アコーディオン ＆ 5-4: スリムカード）
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-10">
      {/* ページ見出し */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-6 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-semibold tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>東洋医学8大体系カリキュラム</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          体系学習カリキュラム
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          陰陽・五行・気血水から病機・診断・治法・実践まで全71レッスン。暗記を排し、動的な病態を捉える思考の土台を築きます。
        </p>
      </div>

      {/* 5-3: 最上部に「最初のレッスンを始める / 続きから学ぶ」ダッシュボード & 全体進捗 */}
      <div className="bg-gradient-to-br from-[#1E3D34] via-[#162E27] to-[#12221D] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* 再開 / 開始カード */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold tracking-wider">
              <PlayCircle className="w-3.5 h-3.5 text-[#E6C387]" />
              <span>{totalCompleted === 0 ? "受講の開始" : "学習を再開する"}</span>
            </div>

            {resumeLecture ? (
              <div className="space-y-1">
                <div className="text-xs text-emerald-200/90 font-medium">
                  {resumeLecture.stageTitle} ➜ {resumeLecture.seriesTitle || "基幹講義"}
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1">
                  {resumeLecture.title}
                </h3>
                <p className="text-xs text-emerald-100/80 line-clamp-1 max-w-2xl">
                  {resumeLecture.whatYouWillLearn?.canDo || resumeLecture.summary}
                </p>
              </div>
            ) : (
              <h3 className="text-lg font-bold text-white">
                公開71レッスンの学習へようこそ！
              </h3>
            )}

            <div className="pt-1 flex flex-wrap items-center gap-3">
              {resumeLecture && (
                <button
                  type="button"
                  onClick={() => handleSelectLecture(resumeLecture)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6C387] text-[#1E3D34] font-bold text-xs sm:text-sm hover:bg-[#DFC07D] shadow-md transition-all cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#1E3D34]" />
                  <span>
                    {totalCompleted === 0
                      ? "最初のレッスンを始める"
                      : isMounted && completedLectures[resumeLecture.id]
                      ? "レッスンを復習する"
                      : "続きから学ぶ"}
                  </span>
                </button>
              )}

              {resumeLecture && (
                <span className="text-xs text-emerald-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>所要時間: 約 {resumeLecture.duration}</span>
                </span>
              )}
            </div>
          </div>

          {/* 全体進捗バー & クイックアクション */}
          <div className="lg:w-80 bg-black/25 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-emerald-200">
                <span>全体受講ステータス</span>
                <span className="font-mono text-sm text-white">
                  {isMounted ? `${totalCompleted} / ${totalPublished || 71}` : `0 / ${totalPublished || 71}`} 講完了
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-emerald-950/60 overflow-hidden border border-emerald-700/40">
                <div
                  className="h-full bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${isMounted ? totalPercentage : 0}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-emerald-200">
                <span>全{totalPlanned || 92}レッスン予定</span>
                <span className="font-bold">公開分進捗: {isMounted ? totalPercentage : 0}%</span>
              </div>
            </div>

            {/* アクションボタン群 */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowIncorrectModal(true)}
                className={`min-h-[40px] w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  incorrectQuestions.length > 0
                    ? "bg-rose-500 hover:bg-rose-400 text-white"
                    : "bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/15"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>間違えた問題の復習</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/20">
                  {incorrectQuestions.length}問
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowLearningMap((prev) => !prev)}
                className="min-h-[40px] w-full py-2 px-3 rounded-lg text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Map className="w-4 h-4" />
                  <span>{showLearningMap ? "学習マップを閉じる" : "全8大体系 学習マップを表示"}</span>
                </span>
                <span className="text-[10px]">{showLearningMap ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 全8大体系 学習マップ */}
      {showLearningMap && (
        <LearningMap onSelectChapter={handleSelectChapterFromMap} />
      )}

      {/* 間違えた問題の復習モーダル */}
      <IncorrectQuestionsModal
        isOpen={showIncorrectModal}
        onClose={() => setShowIncorrectModal(false)}
        onNavigateToLecture={(lectureId) => {
          const target = allLectures.find((l) => l.id === lectureId);
          if (target) handleSelectLecture(target);
        }}
      />

      {/* 補助操作：すべて展開 / すべて折りたたむ */}
      <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          カリキュラム目次（全8章）
        </h2>
        <button
          type="button"
          onClick={toggleAllChapters}
          className="min-h-[40px] px-3.5 py-1.5 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] bg-white dark:bg-[#17212A] transition-colors cursor-pointer"
        >
          {areAllExpanded ? "すべて折りたたむ" : "すべて展開する"}
        </button>
      </div>

      {/* 5-3: 8章アコーディオン一覧 ＆ 5-4: 各レッスンカードのスリム化 */}
      <div className="space-y-4 sm:space-y-6">
        {CHAPTER_DEFINITIONS.map((chapter) => {
          const isExpanded = !!expandedChapters[chapter.chapterNumber];
          const chapterLectures = allLectures.filter((l) => l.seriesId === chapter.seriesId);
          const publishedCount = chapterLectures.filter((l) => l.isPublished !== false).length;
          const chapterProgress = isMounted
            ? getChapterProgress(chapter.progressKey, publishedCount)
            : { completedCount: 0, percentage: 0 };
          const Icon = chapter.icon;

          return (
            <section
              key={chapter.chapterNumber}
              id={`chapter-${chapter.id}`}
              className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xs overflow-hidden transition-all"
            >
              {/* 章ヘッダー（クリックで展開・折りたたみ / 44px以上の押しやすさを確保） */}
              <button
                type="button"
                onClick={() => toggleChapter(chapter.chapterNumber)}
                className="w-full text-left p-4 sm:p-5 hover:bg-[#FAF8F5] dark:hover:bg-[#141E28] transition-colors flex items-center justify-between gap-3 cursor-pointer select-none"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#1E3D34] text-white">
                        第{chapter.chapterNumber}章
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {publishedCount === chapter.plannedLessons
                          ? `全${chapter.plannedLessons}レッスン公開中`
                          : `公開中 ${publishedCount} / 全${chapter.plannedLessons}レッスン予定`}
                      </span>
                      {chapterProgress.percentage === 100 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" />
                          修了
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] truncate">
                      {chapter.title} ― {chapter.lead}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* 進捗数値 */}
                  <div className="hidden sm:flex flex-col items-end text-xs">
                    <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                      {chapterProgress.completedCount} / {publishedCount} 講完了
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                      {chapterProgress.percentage}%
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] dark:bg-[#1A2632] flex items-center justify-center text-[#737C77] dark:text-[#8899A6]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* 章詳細展開（isExpanded時） */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#FCFBF8] dark:bg-[#121920]/60 space-y-4">
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    {chapter.description}
                  </p>

                  {/* 5-4: レッスン一覧グリッド（スリム表示） */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {chapterLectures.map((lec) => {
                      const isLecCompleted = isMounted && !!completedLectures[lec.id];
                      return (
                        <div
                          key={lec.id}
                          onClick={() => handleSelectLecture(lec)}
                          className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between group cursor-pointer ${
                            isLecCompleted
                              ? "bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-2xs"
                              : "bg-white dark:bg-[#17212A] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm"
                          }`}
                        >
                          <div className="space-y-2">
                            {/* レッスン番号 ＆ 読了時間 ＆ 受講完了チェック */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                                レッスン {lec.lessonNumber || 1} / {chapter.plannedLessons}
                              </span>

                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
                                  <Clock className="w-3 h-3" />
                                  <span>約 {lec.duration}</span>
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLectureCompleted(lec.id);
                                  }}
                                  title={isLecCompleted ? "受講完了（クリックで解除）" : "受講済みにする"}
                                  className={`min-h-[36px] min-w-[36px] p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                                    isLecCompleted
                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                                      : "text-slate-300 dark:text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                                  }`}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* レッスン名 */}
                            <h4 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug line-clamp-1">
                              {lec.title}
                            </h4>

                            {/* 5-4: 1行の概要（長い箇条書きは講義ページ内へ） */}
                            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-1">
                              {lec.whatYouWillLearn?.canDo || lec.whatYouWillLearn?.topics || lec.subtitle}
                            </p>
                          </div>

                          {/* カード下部リンク */}
                          <div className="pt-2.5 mt-2.5 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                            <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              <span>講義を読む</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                            {isLecCompleted ? (
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                <Check className="w-3 h-3" />
                                完了
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                                未受講
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* 準備中レッスン（該当シリーズにある場合） */}
                    {PLANNED_UNPUBLISHED_LESSONS[chapter.seriesId]?.map((plan) => (
                      <div
                        key={`plan-${chapter.seriesId}-${plan.lessonNumber}`}
                        className="p-3.5 rounded-xl border border-dashed border-[#D8CFC0] dark:border-[#2E3F50] bg-[#FAF8F5]/50 dark:bg-[#10171F]/40 flex flex-col justify-between opacity-75"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              レッスン {plan.lessonNumber} / {chapter.plannedLessons}
                            </span>
                            <span className="text-[10px] text-[#A67C52] dark:text-[#C49B71] font-semibold px-2 py-0.5 rounded bg-[#FAF2EB] dark:bg-[#251B12] border border-[#F3DEC5]">
                              準備中
                            </span>
                          </div>

                          <h4 className="font-serif text-sm font-bold text-[#737C77] dark:text-[#8899A6] line-clamp-1">
                            {plan.title}
                          </h4>

                          <p className="text-xs text-[#8C9691] dark:text-[#64748B] line-clamp-1">
                            {plan.subtitle}
                          </p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-dashed border-[#E5DEC9] dark:border-[#22303D] flex items-center justify-between text-xs text-[#8C9691]">
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-[#B86924]" />
                            <span>順次公開予定</span>
                          </span>
                          <Lock className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* 学術深化・東洋医学自然科学講義録アーカイブ */}
      <section className="bg-gradient-to-r from-[#EBF3EF]/60 via-[#FAF8F5] to-[#FCF4EB]/60 dark:from-[#172621]/60 dark:via-[#17212A] dark:to-[#221F1A]/60 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-10 space-y-4 sm:space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Advanced Academic Lectures & Natural Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              学術深化：東洋医学の自然科学的機序を深掘りする学術記事
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed max-w-2xl">
              東洋医学の歴史的誕生（システム同定）から、陰陽五行（二値モデル・多要素制御）、気血津液（生体ダイナミクス・微小循環）まで、自然科学・複雑系科学の言葉で再定義した学術知見アーカイブです。
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>論文・学術アーカイブ一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 東洋医学史 */}
          <Link
            href="/articles?article=science-of-oriental-medicine-history"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 18分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【東洋医学史】ブラックボックス解析としての経験医学
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                『黄帝内経』のネットワーク階層構造、二千年におよぶ経験医学と科学的医学（RCT・EBM）の相違、日本漢方・管鍼法・腹診の適応進化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 陰陽五行 */}
          <Link
            href="/articles?article=science-of-yinyang-gogyo"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 22分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【陰陽五行の科学】二値モデルと五つの機能ネットワーク
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                二値分類と情報圧縮、陰陽四原則（拮抗制御・負のフィードバック・相転移）、寒熱表裏虚実の状態空間、相生・相剋・相乗・相侮の制御工学。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 気血津液 */}
          <Link
            href="/articles?article=science-of-qi-blood-fluid"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 20分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【気血津液の科学】人体のシステムダイナミクス
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                創発としての気、気の五大機能、気虚気滞気逆気陥、濡養と微小循環、体液コンパートメントとリンパ系、三位一体の共鳴ループ。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 鍼灸の科学 */}
          <Link
            href="/articles?article=science-of-acupuncture-neuroscience"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B]">約 25分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【鍼灸の科学】生体情報制御学としての鍼灸医学
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                メカノトランスダクション、細胞外ATP/アデノシン、ゲート制御とPAG-RVM下行性疼痛抑制、自律神経HRV、炎症反射、刺激パラメータ。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 漢方医学の科学 */}
          <Link
            href="/articles?article=science-of-kampo-network-pharmacology"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 20分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【漢方医学の科学】状態空間への多点介入
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                同病異治・異病同治、君臣佐使の制御工学（多入力MIMO）、証のベイズ推論モデル、ネットワーク薬理学、大建中湯・六君子湯のエビデンス。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 東西医学の統合と人体統一理論 */}
          <Link
            href="/articles?article=east-west-integrative-unified-theory"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 19分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【人体統一理論】東西二大モデルの統合
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                モデル依存実在論、17層構造における高次機能統合モデル、証・気・経絡のコンセンサス、閉ループ制御工学、データ医学・AIへの進化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 受講履歴・進捗データ管理 */}
      <div className="pt-4 pb-2 text-center text-xs text-slate-400 dark:text-slate-600 flex flex-wrap items-center justify-center gap-3">
        <span>受講進捗および演習クイズ回答データはお使いの端末（localStorage）に自動保存されています。</span>
        <button
          type="button"
          onClick={resetAllProgress}
          className="text-slate-400 hover:text-rose-500 underline transition-colors cursor-pointer"
        >
          受講記録をリセット
        </button>
      </div>
    </div>
  );
}
