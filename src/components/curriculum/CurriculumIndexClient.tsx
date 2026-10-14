"use client";

import PageIntro from "@/components/design/PageIntro";
import ChapterEmblem from "@/components/graphics/ChapterEmblem";
import ArticleCover from "@/components/articles/ArticleCover";
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
    <div className="curriculum-index page-layout space-y-8 sm:space-y-10">
      <PageIntro compact eyebrow={`東洋医学 ${catalog.chapters.length}章・${plannedCount}講`} title="体系学習カリキュラム" description="概論から臨床の基礎まで。続きから学ぶか、読みたい章を選びましょう。" art="study" />

      {/* 最上部「最初のレッスンを始める / 続きから学ぶ」ダッシュボード & 全体進捗 */}
      <section className="curriculum-resume" aria-label="学習を始める・再開する">
        <div className="curriculum-resume-main">
          {/* 再開 / 開始カード */}
          <div className="curriculum-resume-copy">
            <ChapterEmblem seriesId={resumeLecture?.seriesId} className="curriculum-resume-emblem" />
            <p className="curriculum-resume-kicker">{totalCompleted === 0 ? "受講の開始" : "学習を再開する"}</p>

            {resumeLecture ? (
              <div className="curriculum-resume-lesson">
                <p className="curriculum-resume-series">{resumeLecture.seriesTitle || "基幹講義"}</p>
                <h2 className="curriculum-resume-title">
                  {resumeLecture.title}
                </h2>
                <p className="curriculum-resume-summary">
                  {resumeLecture.whatYouWillLearn?.canDo || resumeLecture.summary}
                </p>
              </div>
            ) : (
              <h2 className="curriculum-resume-title">
                全{plannedCount}講の学習へようこそ！
              </h2>
            )}

            <div className="curriculum-resume-actions">
              {resumeLecture && (
                <Link
                  href={`/curriculum/${resumeLecture.id}`}
                  className="page-primary-action"
                >
                  <PlayCircle aria-hidden="true" className="w-5 h-5" />
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
                <span className="curriculum-resume-duration">
                  <Clock aria-hidden="true" className="w-4 h-4" />
                  <span>所要時間: 約 {resumeLecture.duration}</span>
                </span>
              )}
            </div>
          </div>

          {/* 全体進捗バー & クイックアクション */}
          <div className="curriculum-progress-summary">
            <div>
              <div className="curriculum-progress-label">
                <span>学習の進み具合</span>
                <span className="curriculum-progress-count">
                  {isMounted ? `${totalCompleted} / ${totalPublished || publishedCount}` : `0 / ${totalPublished || publishedCount}`} 講完了
                </span>
              </div>
              <progress className="site-progress curriculum-overall-progress" value={isMounted ? totalPercentage : 0} max={100} aria-label="公開講義の受講進捗" />
              <div className="curriculum-progress-caption">
                <span>{isMounted ? totalPercentage : 0}%</span>
              </div>
            </div>

            {/* アクションボタン群 */}
            <div className="curriculum-support-actions">
              <button
                type="button"
                onClick={() => setShowIncorrectModal(true)}
                className="curriculum-support-action"
              >
                <span className="flex items-center gap-1.5">
                  <AlertCircle aria-hidden="true" className="w-4 h-4" />
                  <span>間違えた問題の復習</span>
                </span>
                <span className="curriculum-review-count">
                  {incorrectQuestions.length}問
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowLearningMap((prev) => !prev)}
                className="curriculum-support-action"
                aria-expanded={showLearningMap}
              >
                <span className="flex items-center gap-1.5">
                  <Map aria-hidden="true" className="w-4 h-4" />
                  <span>{showLearningMap ? "学習マップを閉じる" : `全${catalog.chapters.length}章の学習マップを表示`}</span>
                </span>
                {showLearningMap ? <ChevronUp aria-hidden="true" className="w-4 h-4" /> : <ChevronDown aria-hidden="true" className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="学ぶ場所を選ぶ" className="curriculum-entry-links"><a href="#curriculum-chapters"><GraduationCap aria-hidden="true" className="h-5 w-5" />章から選ぶ<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><Link href="/learn/courses">3〜5講の基礎コース<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></nav>

      {/* 章構成から導く学習マップ */}
      {showLearningMap && (
        <LearningMap chapters={catalog.chapters} onSelectChapter={handleSelectChapterFromMap} />
      )}
      <LearningReviewPanel compact />

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
      <div id="curriculum-chapters" className="scroll-mt-28 flex flex-wrap gap-3 items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
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

          return (
            <section
              key={chapter.chapterNumber}
              id={`chapter-${chapter.id}`}
              className="curriculum-chapter scroll-mt-28"
            >
              {/* 章ヘッダー */}
              <button
                type="button"
                onClick={() => toggleChapter(chapter.chapterNumber)}
                className="curriculum-chapter-toggle"
                aria-expanded={isExpanded}
                aria-controls={`chapter-content-${chapter.id}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <ChapterEmblem seriesId={chapter.seriesId} className="curriculum-chapter-emblem" />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="curriculum-chapter-number">
                        第{chapter.chapterNumber}章
                      </span>
                      <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                        {publishedCount === chapter.plannedLessons
                          ? `全${chapter.plannedLessons}レッスン公開中`
                          : `公開中 ${publishedCount} / 全${chapter.plannedLessons}レッスン予定`}
                      </span>
                      {chapterProgress.percentage === 100 && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <Check aria-hidden="true" className="w-3 h-3" />
                          修了
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                      {chapter.shortTitle} ― {chapter.lead}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
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

                  <p className="text-base font-semibold">目標：{chapter.goal}</p>
                  <Link href={`/learn/courses/${chapter.courseSlug}`} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">基礎コースへ →</Link>
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
                                  disabled={!isMounted}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isMounted) toggleLectureCompleted(lec.id);
                                  }}
                                  title={!isMounted ? "進捗を確認中…" : isLecCompleted ? "受講完了（クリックで解除）" : "受講済みにする"}
                                  aria-label={`${lec.title}：${!isMounted ? "進捗を確認中" : isLecCompleted ? "受講済みを解除" : "受講済みにする"}`}
                                  aria-pressed={isLecCompleted}
                                  className={`min-h-11 min-w-11 p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-60 flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                                    isLecCompleted
                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                                      : "text-slate-300 dark:text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                                  }`}
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  {!isMounted && <span className="text-xs">確認中</span>}
                                </button>
                              </div>
                            </div>

                            {/* レッスン名 */}
                            <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed">
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
      <section className="curriculum-related-articles space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              理解を深める記事
            </h2>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>解説記事の一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="curriculum-related-grid">
          {relatedArticles.map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="curriculum-related-link group"
            >
              <ArticleCover articleId={article.id} className="curriculum-article-thumbnail" />
              <div className="space-y-2">
                <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                  {article.title}
                </h3>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">約{article.readTime}</span>
              </div>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#1E3D34] dark:text-[#74BA9E]" />
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
