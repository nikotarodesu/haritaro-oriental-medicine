"use client";

import LearningReviewPanel from "@/components/learning/LearningReviewPanel";
import CourseMiniCase from "@/components/learning/CourseMiniCase";
import LearningSyncStatus from "@/components/learning/LearningSyncStatus";
import type { ArticlePreview } from "@/data/articleData";
import type { CurriculumIndexCatalog } from "@/types/curriculumIndexCatalog";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { LearningMap } from "@/components/LearningMap";
import { IncorrectQuestionsModal } from "@/components/IncorrectQuestionsModal";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Lock,
  PlayCircle,
  AlertCircle,
  Map,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CurriculumIndexClient({ catalog, relatedArticles }: {
  catalog: CurriculumIndexCatalog;
  relatedArticles: ArticlePreview[];
}) {
  const router = useRouter();
  const [showLearningMap, setShowLearningMap] = useState<boolean>(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState<boolean>(false);
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({ 1: true });

  const {
    isMounted,
    completedLectures,
    toggleLectureCompleted,
    totalCompleted,
    totalPercentage,
    totalPublished,
    totalPlanned,
    getNextResumeLectureId,
    getIncorrectQuestions,
    resetAllProgress,
  } = useCurriculumProgress();

  const allLectures = catalog.lectures;
  const publishedCount = allLectures.filter(lecture => lecture.isPublished !== false).length;
  const plannedCount = catalog.chapters.reduce((sum, chapter) => sum + chapter.plannedLessons, 0);

  const resumeLectureId = isMounted
    ? getNextResumeLectureId(allLectures.map((l) => l.id))
    : allLectures[0]?.id;
  const resumeLecture = allLectures.find((l) => l.id === resumeLectureId) || allLectures[0];
  const incorrectQuestions = isMounted ? getIncorrectQuestions() : [];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const openTarget = () => {
      const hashChapter = catalog.chapters.find(chapter => window.location.hash === `#chapter-${chapter.id}`);
      const def = hashChapter || (isMounted ? catalog.chapters.find(chapter => chapter.seriesId === resumeLecture?.seriesId) : undefined);
      if (!def) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setExpandedChapters(previous => ({ ...previous, [def.chapterNumber]: true })), 0);
    };
    openTarget();
    window.addEventListener('hashchange', openTarget);
    return () => { if (timer) clearTimeout(timer); window.removeEventListener('hashchange', openTarget); };
  }, [isMounted, resumeLecture?.seriesId, catalog.chapters]);

  const toggleChapter = (chapterNum: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterNum]: !prev[chapterNum],
    }));
  };

  const areAllExpanded = catalog.chapters.every((c) => expandedChapters[c.chapterNumber]);

  const toggleAllChapters = () => {
    if (areAllExpanded) {
      setExpandedChapters({});
    } else {
      const all: Record<number, boolean> = {};
      catalog.chapters.forEach((c) => {
        all[c.chapterNumber] = true;
      });
      setExpandedChapters(all);
    }
  };

  const handleSelectChapterFromMap = (chapterId: string) => {
    const target = catalog.chapters.find((c) => c.id === chapterId);
    if (target) {
      setExpandedChapters((prev) => ({ ...prev, [target.chapterNumber]: true }));
      const el = document.getElementById(`chapter-${target.id}`);
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "instant" : "smooth", block: "start" });
        el.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-10">
      {/* ページ見出し */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-6 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-semibold tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>東洋医学{catalog.chapters.length}章カリキュラム</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          体系学習カリキュラム
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          概論から陰陽・気血津液・臓腑へ。関係モデル、病機、情報整理、治療方針、経過の振り返りを全{plannedCount}講で学びます。
        </p>
        <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">各章を詳しく学ぶ目次です。短く全体像をつかむには、<Link href="/learn/courses" className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">3〜5講の基礎コース</Link>から始められます。講義の受講記録は共通です。</p>
      </div>

      {/* 最上部「最初のレッスンを始める / 続きから学ぶ」ダッシュボード & 全体進捗 */}
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
                全{plannedCount}講の学習へようこそ！
              </h3>
            )}

            <div className="pt-1 flex flex-wrap items-center gap-3">
              {resumeLecture && (
                <Link
                  href={`/curriculum/${resumeLecture.id}`}
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
                </Link>
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
                  {isMounted ? `${totalCompleted} / ${totalPublished || publishedCount}` : `0 / ${totalPublished || publishedCount}`} 講完了
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-emerald-950/60 overflow-hidden border border-emerald-700/40">
                <div
                  className="h-full bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${isMounted ? totalPercentage : 0}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-emerald-200">
                <span>全{totalPlanned || plannedCount}レッスン（公開中）</span>
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
                  <span>{showLearningMap ? "学習マップを閉じる" : `全${catalog.chapters.length}章の学習マップを表示`}</span>
                </span>
                <span className="text-[10px]">{showLearningMap ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 章構成から導く学習マップ */}
      {showLearningMap && (
        <LearningMap chapters={catalog.chapters} onSelectChapter={handleSelectChapterFromMap} />
      )}
      <LearningReviewPanel />

      {/* 間違えた問題の復習モーダル */}
      <IncorrectQuestionsModal
        isOpen={showIncorrectModal}
        onClose={() => setShowIncorrectModal(false)}
        onNavigateToLecture={(lectureId) => {
          setShowIncorrectModal(false);
          router.push(`/curriculum/${lectureId}`);
        }}
      />

      {/* 補助操作：すべて展開 / すべて折りたたむ */}
      <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
          カリキュラム目次（全{catalog.chapters.length}章）
        </h2>
        <button
          type="button"
          onClick={toggleAllChapters}
          className="min-h-[40px] px-3.5 py-1.5 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] bg-white dark:bg-[#17212A] transition-colors cursor-pointer"
        >
          {areAllExpanded ? "すべて折りたたむ" : "すべて展開する"}
        </button>
      </div>

      {/* 章構成に沿った目次と各レッスンカード */}
      <div className="space-y-4 sm:space-y-6">
        {catalog.chapters.map((chapter) => {
          const isExpanded = !!expandedChapters[chapter.chapterNumber];
          const chapterLectures = allLectures.filter((l) => l.seriesId === chapter.seriesId);
          const publishedCount = chapterLectures.filter((l) => l.isPublished !== false).length;
          const chapterProgress = isMounted
            ? { completedCount: chapter.lectureIds.filter(id => completedLectures[id]).length, percentage: publishedCount ? Math.round(chapter.lectureIds.filter(id => completedLectures[id]).length / publishedCount * 100) : 0 }
            : { completedCount: 0, percentage: 0 };
          const Icon = GraduationCap;

          return (
            <section
              key={chapter.chapterNumber}
              id={`chapter-${chapter.id}`}
              className="scroll-mt-28 bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-2xs overflow-hidden transition-all"
            >
              {/* 章ヘッダー */}
              <button
                type="button"
                onClick={() => toggleChapter(chapter.chapterNumber)}
                className="w-full text-left p-4 sm:p-5 hover:bg-[#FAF8F5] dark:hover:bg-[#141E28] transition-colors flex items-center justify-between gap-3 cursor-pointer select-none"
                aria-expanded={isExpanded}
                aria-controls={`chapter-content-${chapter.id}`}
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
                  {isMounted && chapterProgress.percentage === 100 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] border border-[#B86924]/30 font-bold text-xs shadow-2xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>章修了</span>
                    </span>
                  )}

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

              {/* 章詳細展開 */}
              {isExpanded && (
                <div id={`chapter-content-${chapter.id}`} className="p-4 sm:p-6 border-t border-[#F2ECE0] dark:border-[#22303D] bg-[#FCFBF8] dark:bg-[#121920]/60 space-y-4">
                  <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    {chapter.description}
                  </p>

                  <p className="text-base font-semibold">この段階の目標：{chapter.goal}</p>
                  <Link href={`/learn/courses/${chapter.courseSlug}`} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">この章の短い基礎コースへ →</Link>
                  {/* レッスン一覧グリッド */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {chapterLectures.map((lec) => {
                      const isLecCompleted = isMounted && !!completedLectures[lec.id];
                      return (
                        <div
                          key={lec.id}
                          className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between group cursor-pointer block ${
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
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleLectureCompleted(lec.id);
                                  }}
                                  title={isLecCompleted ? "受講完了（クリックで解除）" : "受講済みにする"}
                                  aria-label={`${lec.title}：${isLecCompleted ? "受講済みを解除" : "受講済みにする"}`}
                                  aria-pressed={isLecCompleted}
                                  className={`min-h-11 min-w-11 p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 ${
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
                              <Link href={`/curriculum/${lec.id}`} className="focus-visible:outline-2 focus-visible:outline-offset-4">{lec.title}</Link>
                            </h4>

                            {/* 概要 */}
                            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-1">
                              {lec.whatYouWillLearn?.canDo || lec.whatYouWillLearn?.topics || lec.subtitle}
                            </p>
                          </div>

                          {/* カード下部リンク */}
                          <div className="pt-2.5 mt-2.5 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                            <Link href={`/curriculum/${lec.id}`} className="min-h-11 text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-4">
                              <span>講義を読む</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
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

                    {/* 準備中レッスン */}
                    {catalog.plannedLessons[chapter.seriesId]?.map((plan) => (
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
                  <CourseMiniCase seriesId={chapter.seriesId} headingLevel={3} />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* 伝統医学と研究の関連解説 */}
      <section className="bg-gradient-to-r from-[#EBF3EF]/60 via-[#FAF8F5] to-[#FCF4EB]/60 dark:from-[#172621]/60 dark:via-[#17212A] dark:to-[#221F1A]/60 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-10 space-y-4 sm:space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>伝統的な分類と、研究で分かる範囲を学ぶ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              学びを深める：伝統医学と現代研究の解説
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed max-w-2xl">
              陰陽五行・気血津液の伝統的な考え方、鍼灸・漢方の研究、医学的な評価の違いを整理します。研究の対象・比較条件・限界を確認しながら読み進めます。
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>解説記事の一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedArticles.map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-end text-xs">
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約{article.readTime}</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                  {article.title}
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                <span>記事全文を読む</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 受講履歴・進捗データ管理 */}
      <div className="pt-4 pb-2 text-center text-xs text-slate-400 dark:text-slate-600 flex flex-wrap items-center justify-center gap-3">
        <LearningSyncStatus returnTo="/curriculum" />
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
