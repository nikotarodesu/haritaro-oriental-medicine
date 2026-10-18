"use client";

import { useState, useEffect, useRef, Suspense, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Lecture } from "@/data/curriculumData";
import ChapterEmblem from "@/components/graphics/ChapterEmblem";
import ArticleCover from "@/components/articles/ArticleCover";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import InlineTextRenderer from "@/components/InlineTextRenderer";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import type { ResolvedReference } from "@/types/references";
import type { ChapterAssessmentData } from "@/data/curriculumAssessments";
import ChapterAssessment from "@/components/curriculum/ChapterAssessment";
import { PAGE_REVISIONS } from "@/config/contentUpdates";
import type { LearningQuestion } from "@/data/learningQuestionBank";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import type { LessonQuizGroup } from "@/data/curriculumQuizTypes";
import { getCurriculumReadingInserts, CURRICULUM_READING_QUESTIONS } from "@/data/curriculumReadingGuides";
import { getLearningCoursesForLecture } from "@/data/learningCourses";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import type { ReadingLink } from "@/types/reading";
import ReviewQuestionCard from "@/components/learning/ReviewQuestionCard";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import { 
  BookOpen,
  ListChecks,
  Network,
  Bookmark,
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Check,
  X,
  FileText,
  GraduationCap,
  Activity,
} from "lucide-react";
import { saveDraftPatientNote } from "@/utils/draftNote";
import { trackEvent } from "@/utils/analytics";
import FontSizeControl from "@/components/FontSizeControl";
import { CourseJourneyResolver } from "@/components/learning/LearningCourseLink";
import { createCourseLectureHref, getCourseNextAction, type CourseJourney } from "@/utils/courseJourney";
import { buildLearningReflectionHref } from "@/utils/learningReflection";
import ClinicalLectureApplication from "@/components/clinical/ClinicalLectureApplication";
import { getLectureShortcut } from "@/utils/lectureKeyboardNavigation";
import { revealLectureSection } from "@/utils/lectureAnchors";

function lectureFragmentTarget(fragment: string): HTMLElement | null {
  try { return fragment ? document.getElementById(decodeURIComponent(fragment.replace(/^#/, ''))) : null; }
  catch { return null; }
}

interface Props {
  lecture: Lecture;
  lectureNavigation: ReadonlyArray<Pick<Lecture, "id" | "title" | "seriesId" | "lessonNumber" | "lectureNumber" | "duration" | "isPublished">>;
  relatedReadingLinks?: ReadingLink[];
  quiz: LessonQuizGroup;
  resolvedReferences: ResolvedReference[];
  reviewQuestions: LearningQuestion[];
  chapterAssessment: ChapterAssessmentData | null;
  conceptArt?: { afterHeading: string; node: ReactNode } | null;
}

export default function CurriculumLectureReader({ lecture, lectureNavigation, relatedReadingLinks = [], quiz, resolvedReferences, reviewQuestions, chapterAssessment, conceptArt = null }: Props) {
  const articleTopRef = useRef<HTMLDivElement | null>(null);
  const [focusBanner, setFocusBanner] = useState<string | null>(null);
  const [noteSaveError, setNoteSaveError] = useState<{ lectureId: string; message: string } | null>(null);
  const [resolvedCourse, setResolvedCourse] = useState<{ lectureId: string; journey: CourseJourney | null } | null>(null);
  const courseJourney = resolvedCourse?.lectureId === lecture.id ? resolvedCourse.journey : null;
  const isClinicalStage = lecture.stageId === "stage-2" || lecture.stageId === "stage-3";

  const {
    isMounted,
    completedLectures,
    toggleLectureCompleted,
    recordVisitedLecture,
  } = useCurriculumProgress();
  const courseNextAction = courseJourney ? getCourseNextAction(courseJourney, completedLectures) : null;

  const allLectures = lectureNavigation;

  const handleSaveToNote = () => {
    const sectionName = lecture.seriesTitle || lecture.stageTitle;
    const saved = saveDraftPatientNote({
      sourceTool: "カリキュラム講義",
      chiefComplaint: `講義記録: ${lecture.title}`,
      constitution: sectionName,
      treatmentPlan: `【受講講義】${lecture.title}（${sectionName}）\n\n【講義要約】\n${lecture.summary}\n\n【臨床への応用メモ・臨床所見】\n`,
    });
    if (!saved) {
      setNoteSaveError({ lectureId: lecture.id, message: '臨床ノートへの引き継ぎを保存できませんでした。この画面を保持しています。ブラウザの保存設定を確認して、もう一度お試しください。' });
      return;
    }
    setNoteSaveError(null);
    trackEvent("curriculum_save_to_note", { lecture_id: lecture.id });
    router.push("/notes");
  };

  // 閲覧履歴を記録
  useEffect(() => {
    if (lecture?.id) {
      recordVisitedLecture(lecture.id);
    }
  }, [lecture?.id, recordVisitedLecture]);

  // レッスン変更時のスクロールトップ & ?focus= による該当セクションジャンプ
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const focusParam = params.get("focus");
      const reviewParam = params.get("review");

      if (reviewParam) {
        const timer = setTimeout(() => {
          setFocusBanner(null);
          articleTopRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
        }, 0);
        return () => clearTimeout(timer);
      }

      if (focusParam) {
        const timer = setTimeout(() => {
          setFocusBanner(`「${focusParam}」に関連する箇所を確認します。`);
          const elements = Array.from(articleTopRef.current?.querySelectorAll("#lecture-content h2, #lecture-content h3, #lecture-content h4, #lecture-content p, #lecture-content strong") || []);
          const target = elements.find((el) => el.textContent?.includes(focusParam));
          if (target) {
            revealLectureSection(target as HTMLElement);
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.add("ring-4", "ring-amber-400", "bg-amber-100/90", "dark:bg-amber-950/90", "rounded-xl", "p-2", "transition-all");
            setTimeout(() => {
              target.classList.remove("ring-4", "ring-amber-400", "bg-amber-100/90", "dark:bg-amber-950/90");
            }, 4000);
          } else {
            setFocusBanner(`「${focusParam}」の見出しは見つかりませんでした。講義全体と理解度チェックで確認してください。`);
          }
        }, 400);
        return () => clearTimeout(timer);
      } else {
        const fragment = window.location.hash.slice(1);
        const target = lectureFragmentTarget(fragment);
        if (target && articleTopRef.current?.contains(target)) {
          revealLectureSection(target);
          target.scrollIntoView({ behavior: "instant", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (articleTopRef.current) {
          articleTopRef.current.scrollIntoView({ behavior: "instant", block: "start" });
        }
      }
    }
  }, [lecture?.id]);

  useEffect(() => {
    const revealHashTarget = () => {
      const target = lectureFragmentTarget(window.location.hash);
      if (!target || !articleTopRef.current?.contains(target)) return;
      revealLectureSection(target);
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    window.addEventListener('hashchange', revealHashTarget);
    return () => window.removeEventListener('hashchange', revealHashTarget);
  }, []);

  const router = useRouter();

  // 現在の講義の位置と前後ナビゲーション
  const currentIndex = allLectures.findIndex((l) => l.id === lecture.id);
  const prevLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex >= 0 && currentIndex < allLectures.length - 1
      ? allLectures[currentIndex + 1]
      : null;
  const previousHref = courseJourney
    ? courseJourney.previousStep ? createCourseLectureHref(courseJourney.course.slug, courseJourney.previousStep.lectureId) : null
    : prevLecture ? `/curriculum/${prevLecture.id}` : null;
  const nextHref = courseNextAction?.href || (nextLecture ? `/curriculum/${nextLecture.id}` : null);
  const allLecturesPreviousHref = prevLecture ? `/curriculum/${prevLecture.id}` : null;
  const allLecturesNextHref = nextLecture ? `/curriculum/${nextLecture.id}` : null;
  const continuationHref = nextHref || "/curriculum";

  // 講義移動は修飾キーなしの [ / ] のみ。ブラウザ履歴の操作は上書きしない。
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveTarget = Boolean(target?.isContentEditable || target?.closest?.('input, textarea, select, button, a, summary, [contenteditable], [role="dialog"]'));
      const direction = getLectureShortcut(e, interactiveTarget);
      if (direction === "previous" && previousHref) {
        e.preventDefault();
        router.push(previousHref);
      } else if (direction === "next" && nextHref) {
        e.preventDefault();
        router.push(nextHref);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previousHref, nextHref, router]);

  // 同シリーズのレッスン一覧
  const activeSeriesLessons = allLectures.filter(
    (l) => l.seriesId === lecture.seriesId
  );
  const isCompleted = isMounted && !!completedLectures[lecture.id];

  const readingInserts = getCurriculumReadingInserts(lecture.id);
  const lectureHeadings = parseMarkdownBlocks(lecture.contentMarkdown).flatMap((block, index) =>
    block.type === "h2" ? [{ label: block.content, id: `curriculum-heading-${index}` }] : [],
  );
  const readingQuestions = (CURRICULUM_READING_QUESTIONS[lecture.id] ?? []).flatMap((item) => {
    const heading = lectureHeadings.find((candidate) => candidate.label === item.heading);
    return heading ? [{ question: item.question, id: heading.id }] : [];
  });
  const learningCourses = getLearningCoursesForLecture(lecture.id);
  const lessonTitle = lecture.title.match(/^(.+?)\s+レッスン\d+[：:]\s*(.+)$/);
  const displayLectureTitle = lessonTitle?.[2] || lecture.title;
  const articleReadingLinks = relatedReadingLinks.slice(0, 2);
  const relatedFigureReading: ReadingLink | undefined = articleReadingLinks[0] ?? (
    lecture.id === "lecture-yinyang-8" && nextLecture
      ? {
          href: `/curriculum/${nextLecture.id}`,
          title: nextLecture.title,
          description: "陰陽の学習を終えたら、五行の分類と関係へ進みます。",
          meta: `次の講義 · 約${nextLecture.duration}`,
        }
      : undefined
  );

  return (
    <div ref={articleTopRef} className="reading-page page-layout page-layout--reading space-y-5 sm:space-y-6">
      {/* 読書進捗バー */}
      <ReadingProgressBar bodySelector="#lecture-content [data-reading-body]" />

      <Suspense fallback={null}>
        <ReviewQuestionCard lectureId={lecture.id} questions={reviewQuestions} />
      </Suspense>

      {/* 復習ジャンプ通知バナー */}
      {focusBanner && (
        <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex flex-wrap items-center justify-between gap-2 gap-3 text-sm text-amber-950 dark:text-amber-200 shadow-2xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>【復習モード】{focusBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setFocusBanner(null)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 shrink-0 cursor-pointer"
            aria-label="通知を閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 最上部ナビゲーション */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/curriculum"
          className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>カリキュラム一覧へ戻る</span>
        </Link>

        <FontSizeControl variant="compact" />
      </div>

      <Suspense fallback={null}><CourseJourneyResolver lectureId={lecture.id} onResolve={setResolvedCourse} /></Suspense>

      {/* 講義テキスト本体 */}
      <article className="lecture-article bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] px-3.5 py-6 sm:p-10 shadow-xs space-y-6 transition-colors" onClickCapture={event => {
        const href = (event.target as HTMLElement).closest?.('a[href^="#"]')?.getAttribute('href');
        const target = href ? lectureFragmentTarget(href) : null;
        if (target && articleTopRef.current?.contains(target)) revealLectureSection(target);
      }}>
        {/* 講義ヘッダー */}
        <div className="lecture-header border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 space-y-3">
          <div className="curriculum-lecture-heading">
            <ChapterEmblem seriesId={lecture.seriesId} className="curriculum-lecture-emblem" />
            <div className="curriculum-lecture-heading-copy">
              {lecture.seriesTitle && lecture.lessonNumber && <p className="lecture-kicker">{lecture.seriesTitle} · レッスン{lecture.lessonNumber}</p>}
              <h1 className="lecture-title text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
                {(displayLectureTitle.match(/[^・、]+[・、]?/g) || [displayLectureTitle]).map((phrase, index) => <span key={index} className="lecture-title-phrase">{phrase}</span>)}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-bold">
                {lecture.stageTitle}
              </span>
              {lecture.seriesTitle && lecture.lessonNumber ? (
                null
              ) : (
                <span className="text-sm text-[#59615D] dark:text-[#AFBDC8]">
                  第 {lecture.lectureNumber} 講
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[#59615D] dark:text-[#AFBDC8]"><Clock aria-hidden="true" className="h-4 w-4" />読了目安：約{lecture.duration}</span>
              {isCompleted && <span className="text-emerald-800 dark:text-emerald-300">受講済み</span>}
            </div>

          </div>

        </div>

        <nav aria-label="講義内の移動" className="page-actions">
          <a href="#lecture-content" aria-label="講義本文を読む" className="page-primary-action"><BookOpen aria-hidden="true" className="h-4 w-4" />本文</a>
          {readingInserts[0] && <a href={`#reading-figure-${readingInserts[0].figure.id}`} className="page-secondary-action"><Network aria-hidden="true" className="h-4 w-4" />図で整理</a>}
          {quiz && <a href="#lecture-quiz" aria-label="理解度チェックのクイズへ" className="page-secondary-action"><ListChecks aria-hidden="true" className="h-4 w-4" />クイズ</a>}
          {resolvedReferences.length > 0 && <a href="#article-references-section" aria-label="出典と確認範囲へ" className="ui-text-link text-sm"><Bookmark aria-hidden="true" className="h-4 w-4" />出典</a>}
          {chapterAssessment && <a href="#chapter-assessment" className="page-secondary-action"><GraduationCap aria-hidden="true" className="h-4 w-4" />章末演習</a>}
        </nav>

        <details className="group rounded-xl border border-[#E5DEC9] px-4 py-2 dark:border-[#2A3B4A]">
          <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-base font-bold text-[#1E3D34] dark:text-[#83BEA8]"><span aria-hidden="true" className="group-open:hidden">＋</span><span aria-hidden="true" className="hidden group-open:inline">−</span>概要・目次</summary>
          <div className="space-y-5 pb-3 pt-2">
            {lecture.subtitle && <p className="text-base font-semibold leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{lecture.subtitle}</p>}
            <p className="text-base leading-[1.75] text-[#404743] dark:text-[#C5D2DB]">{lecture.summary}</p>
            <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">編集：<Link href="/about" className="underline underline-offset-4">はり太郎</Link> · 更新：<time dateTime={PAGE_REVISIONS[`/curriculum/${lecture.id}`]}>{PAGE_REVISIONS[`/curriculum/${lecture.id}`]}</time></p>
        {readingQuestions.length > 0 && (
          <section aria-labelledby="lecture-reading-questions-title" className="space-y-3 rounded-2xl border border-[#D6E3DA] bg-[#F6F9F4] p-4 sm:p-5 dark:border-[#304A3E] dark:bg-[#172A22]">
            <h2 id="lecture-reading-questions-title" className="text-base font-bold text-[#1E3D34] dark:text-[#D9EDE0]">知りたいことから読む</h2>
            <nav aria-label="疑問から講義の解説へ">
              <ul className="divide-y divide-[#D6E3DA] dark:divide-[#304A3E]">
                {readingQuestions.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="group flex min-h-11 items-center justify-between gap-3 rounded-lg py-3 text-base font-medium leading-relaxed text-[#244B3C] focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#D9EDE0]">
                      <span className="group-hover:underline underline-offset-4">{item.question}</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        )}

        {lectureHeadings.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#1E3D34] dark:text-[#83BEA8]">講義の目次</h2>
            <nav aria-label="講義の目次" className="mt-2">
              <ol className="space-y-1">
                {lectureHeadings.map((heading) => (
                  <li key={heading.id}><a href={`#${heading.id}`} className="inline-flex min-h-11 items-center rounded-lg py-2 text-base leading-relaxed text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#83BEA8]">{heading.label}</a></li>
                ))}
              </ol>
            </nav>
          </section>
        )}

        <section className="space-y-3 border-t border-[#E5DEC9] pt-4 dark:border-[#2A3B4A]">
          <h2 className="text-base font-bold text-[#1E3D34] dark:text-[#83BEA8]">学習の目標と要点</h2>
          <p className="text-base leading-relaxed text-[#404743] dark:text-[#C5D2DB]">{lecture.whatYouWillLearn.topics}</p>
          <p className="text-base leading-relaxed text-[#232826] dark:text-[#FAF8F5]"><strong className="font-semibold">目標：</strong>{lecture.whatYouWillLearn.canDo}</p>

          {/* 重要ポイント */}
          {lecture.keyPoints && lecture.keyPoints.length > 0 && (
            <div className="pt-2 border-t border-[#EBE4D5] dark:border-[#22303D] space-y-1">
              <ul className="space-y-1 text-base text-[#404743] dark:text-[#C5D2DB]">
                {lecture.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✓</span>
                    <span><InlineTextRenderer text={point} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

          </div>
        </details>

        {/* 本文（MarkdownBody） */}
        <div id="lecture-content" className="scroll-mt-28">
        {lecture.seriesId === 'lifedynamics' && <aside aria-label="生命機能論の読み方" className="rounded-xl border border-[#C5DED4] bg-[#EBF3EF] p-4 dark:border-[#2A5243] dark:bg-[#182823]">
          <h2 className="text-lg font-bold">まず押さえる内容</h2>
          <p className="mt-2 leading-relaxed">要点と基本の節を読み、概念の役割を自分の言葉で説明しましょう。「詳しく学ぶ」「研究との接点」は、基礎を押さえてから開いて読めます。判断の注意点は先に確認します。</p>
        </aside>}
        <MarkdownBody
          contentMarkdown={lecture.contentMarkdown}
          collapseAdvanced={lecture.seriesId === "lifedynamics"}
          idPrefix="curriculum-heading"
          resolvedReferences={resolvedReferences}
          readingInserts={readingInserts}
          conceptArt={conceptArt}
          relatedReading={relatedFigureReading}
        />
        </div>

        {/* レッスン理解度チェック（クイズ演習） */}
        {quiz && (
          <section id="lecture-quiz" aria-label="理解度チェック" className="scroll-mt-28">
          <InteractiveQuiz
            quiz={quiz}
            courseJourney={courseJourney}
            nextLecture={
              nextLecture
                ? {
                    id: nextLecture.id,
                    title: nextLecture.title,
                  }
                : null
            }
          />
          </section>
        )}

        {/* 講義受講修了フッター */}
        <div className="curriculum-lecture-completion border-t border-[#F2ECE0] dark:border-[#22303D] pt-6">
          <div className="curriculum-lecture-primary-actions">
            <button
              type="button"
              disabled={!isMounted}
              aria-pressed={isCompleted}
              onClick={() => { if (isMounted) toggleLectureCompleted(lecture.id); }}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer disabled:cursor-wait disabled:opacity-60 shadow-xs ${
                isCompleted
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-white" : "text-slate-400"}`} />
              <span>
                {!isMounted ? "進捗を確認中…" : isCompleted ? "受講完了（解除する）" : "受講済みにする"}
              </span>
            </button>
            {courseJourney && courseNextAction && <Link href={courseNextAction.href}
              onClick={() => trackEvent("context_link_click", { placement: courseNextAction.kind === 'complete' ? 'course_complete_return' : 'course_continue', course_id: courseJourney.course.slug, lecture_id: courseNextAction.lectureId })}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">
              <span>{courseNextAction.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>}
            {!courseJourney && (nextLecture ? (
              <Link
                href={`/curriculum/${nextLecture.id}`}
                className="curriculum-next-lecture curriculum-next-lecture--primary min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="次のレッスンへ（ショートカット: ] キー）"
              >
                <ChapterEmblem seriesId={nextLecture.seriesId} className="curriculum-adjacent-emblem" />
                <span>次のレッスン</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/curriculum"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#9E571B] text-white text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>全講義の一覧へ</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            ))}
          </div>

          <nav aria-label="全講義の移動" className="curriculum-lecture-secondary-nav">
            {prevLecture && allLecturesPreviousHref && allLecturesPreviousHref !== continuationHref && <Link
              href={allLecturesPreviousHref}
              title={courseJourney ? undefined : "前のレッスンへ（ショートカット: [ キー）"}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <ChapterEmblem seriesId={prevLecture.seriesId} className="curriculum-adjacent-emblem" />
              <span>{courseJourney ? '全講義の前のレッスン' : '前のレッスン'}</span>
            </Link>}
            {continuationHref !== "/curriculum" && <Link href="/curriculum">一覧に戻る</Link>}
            {courseJourney && nextLecture && allLecturesNextHref && allLecturesNextHref !== continuationHref && <Link href={allLecturesNextHref}>
              <span>全講義の次のレッスン</span>
              <ChapterEmblem seriesId={nextLecture.seriesId} className="curriculum-adjacent-emblem" />
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>}
          </nav>
        </div>

        <details id="lecture-supplements" className="curriculum-lecture-support">
          <summary>補足・関連資料・学習の進捗</summary>
          <div className="space-y-6 py-4">
        {chapterAssessment && <ChapterAssessment assessment={chapterAssessment} />}

        {(isClinicalStage || ['intro', 'zangfu', 'meridians'].includes(lecture.seriesId ?? '')) && <ClinicalLectureApplication lectureId={lecture.id} takeaway={lecture.whatYouWillLearn.canDo} foundation={!isClinicalStage} />}

        <section aria-labelledby="lecture-course-progress-heading" className="space-y-4">
          <h2 id="lecture-course-progress-heading" className="text-lg font-bold">この章の講義・コースの進捗</h2>
          <div className="space-y-4">
      {courseJourney && <section aria-label="学習中のコース" className="rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-4 text-[#184F49] dark:border-[#2A5243] dark:bg-[#182823] dark:text-[#9CCBBC]">
        <p className="text-sm font-semibold">{courseJourney.course.title} · ステップ {courseJourney.stepIndex + 1} / {courseJourney.course.steps.length}</p>
        <Link href={`/learn/courses/${courseJourney.course.slug}#course-next`} className="mt-2 inline-flex min-h-11 items-center gap-2 text-base font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft aria-hidden="true" className="h-4 w-4" />コースの進捗・到達目標へ</Link>
        {courseJourney.miniCaseId && <Link href={`/learn/courses/${courseJourney.course.slug}#course-mini-case-${courseJourney.miniCaseId}`} className="ml-4 mt-2 inline-flex min-h-11 items-center gap-2 text-base font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft aria-hidden="true" className="h-4 w-4" />短い例に戻る</Link>}
      </section>}
      {!courseJourney && learningCourses.length > 0 && (
        <nav aria-label="この講義を含む学習コース" className="flex flex-wrap gap-2">
          {learningCourses.map((course) => (
            <Link key={course.slug} href={createCourseLectureHref(course.slug, lecture.id)}
              onClick={() => trackEvent("context_link_click", { placement: "lecture_course_return", course_id: course.slug, lecture_id: lecture.id })}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D5E4DB] bg-white px-3.5 py-2 text-sm font-semibold leading-relaxed text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A5243] dark:bg-[#17212A] dark:text-[#83BEA8] dark:hover:bg-[#182823]">
              <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>「{course.title}」のコースで学ぶ</span>
            </Link>
          ))}
        </nav>
      )}

      {/* シリーズ進捗インジケーター */}
      {activeSeriesLessons.length > 1 && (
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-4 shadow-2xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F2ECE0] dark:border-[#22303D] text-sm">
            <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Layers className="w-4 h-4" />
              <span>{lecture.seriesTitle || "講義"} シリーズ進捗</span>
            </div>
            <span className="font-mono text-sm text-[#59615D] dark:text-[#AFBDC8]">
              レッスン {lecture.lessonNumber || lecture.lectureNumber} / {activeSeriesLessons.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-sm">
            {activeSeriesLessons.map((lec) => {
              const isActive = lec.id === lecture.id;
              const isLecCompleted = isMounted && !!completedLectures[lec.id];
              return (
                <Link
                  key={lec.id}
                  href={`/curriculum/${lec.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-h-11 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                </Link>
              );
            })}
          </div>
        </div>
      )}

          </div>
        </section>

        {articleReadingLinks.length > 0 && (
          <nav aria-label="この講義に関連する記事" className="border-t border-[#E5DEC9] dark:border-[#2A3B4A] pt-5">
            <p className="text-base font-semibold text-[#1E3D34] dark:text-[#83BEA8]">関連する記事</p>
            <div className="mt-2 divide-y divide-[#E5DEC9] dark:divide-[#2A3B4A]">
              {articleReadingLinks.map((reading) => (
                <Link
                  key={reading.href}
                  href={reading.href}
                  className="curriculum-related-link group focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#83BEA8]"
                >
                  {/^\/articles\/[^/?#]+(?:[?#].*)?$/.test(reading.href) && <ArticleCover articleId={reading.href.split(/[?#]/)[0].slice('/articles/'.length)} className="curriculum-article-thumbnail" />}
                  <div className="min-w-0">
                    <div className="text-base font-semibold leading-relaxed text-[#1E3D34] dark:text-[#83BEA8]">
                    <span className="group-hover:underline underline-offset-4">{reading.title}</span>
                    </div>
                    {reading.meta && <span className="mt-1 block text-sm text-[#59615D] dark:text-[#A0B0BC]">{reading.meta}</span>}
                  </div>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* 国家試験出題チェックポイント（あん摩・はり師・きゅう師） */}
        {lecture.nationalExamPoints && lecture.nationalExamPoints.length > 0 && (
          <div className="bg-[#FAF8F5] dark:bg-[#152029] rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 p-4 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DEC9] dark:border-[#223342] pb-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <GraduationCap className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <span>講義の確認ポイント</span>
              </div>
            </div>
            <ul className="space-y-2 text-base text-[#333835] dark:text-[#C5D2DB]">
              {lecture.nationalExamPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 現代医学・生理学との統合考察（EBM / Integrative Medicine） */}
        {lecture.integrativeMedicine && (
          <div className="bg-[#FFFFFF] dark:bg-[#121920] rounded-2xl border border-[#D5E4DB] dark:border-[#243F36] p-4 sm:p-6 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EBE0] dark:border-[#20302B] pb-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Activity className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>現代医学との比較・説明の範囲</span>
              </div>
              <span className="text-sm text-[#59615D] dark:text-[#AFBDC8]">
                伝統分類と研究を区別
              </span>
            </div>
            <div className="space-y-1.5">
              <span className="text-sm font-bold text-[#B86924] dark:text-[#E6C387] block">
                【比較する観点】：{lecture.integrativeMedicine.focus}
              </span>
              <p className="text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {lecture.integrativeMedicine.explanation}
              </p>
            </div>
          </div>
        )}

          </div>
        </details>

        {/* 参考文献・学術エビデンス */}
        <ArticleReferences references={resolvedReferences} scopeNote={lecture.evidenceScope} />
        <Link href={buildLearningReflectionHref({ type: 'lecture', id: lecture.id })} onClick={() => trackEvent('context_link_click', { placement: 'lecture_reflection', lecture_id: lecture.id, item_type: 'learning_note' })} className="curriculum-reflection-link"><FileText aria-hidden="true" className="h-4 w-4" />学習の振り返りを書く<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>

        {/* 既習の段階に合わせて、復習と症例演習を案内する。 */}
        <details className="curriculum-lecture-support">
          <summary>復習・関連ツール</summary>
          <div className="pt-3">
        {!isClinicalStage ? (
          <section aria-label="基礎を振り返る" className="rounded-2xl border border-[#C5DED4] bg-[#FAF8F5] p-4 sm:p-5 dark:border-[#2A5243] dark:bg-[#17212A]">
            <h2 className="text-lg font-bold text-[#1E3D34] dark:text-[#74BA9E]">学んだ用語を、短い例でもう一度確かめる</h2>
            <p className="mt-2 text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">用語の意味を自分の言葉で説明し、事実と解釈を分けてみましょう。詳しい病態や治療方針は、後の章で学びます。</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#74BA9E]">学習ガイドを見る</Link>
              <Link href="/glossary" className="inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#74BA9E]">用語辞典で振り返る</Link>
              {courseJourney && <Link href={`/learn/courses/${courseJourney.course.slug}#course-mini-case-${courseJourney.course.seriesId}`} className="inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#74BA9E]">このコースの短い例で考える</Link>}
            </div>
          </section>
        ) : <div className="bg-gradient-to-r from-[#FAF8F5] to-[#EBF3EF] dark:from-[#17212A] dark:to-[#13221C] rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              架空例で、情報整理と判断の根拠を練習する
            </span>
            <span className="text-sm text-[#59615D] dark:text-[#AFBDC8]">
              後半の学習を振り返る
            </span>
          </div>

          <p className="text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            講義で学んだ概念を使って、教材の所見・解釈・不足情報を分けてみましょう。追加情報によって仮説を見直す練習につなげます。
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <Link
              href="/diagnosis"
              className="min-h-11 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#C5DED4] dark:border-[#2A5243] hover:border-[#1E3D34] text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>気血水体質チェックで点検</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/simulator#case-training"
              className="min-h-11 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#F2D7B3] dark:border-[#4D331F] hover:border-[#B86924] text-sm font-bold text-[#B86924] dark:text-[#E6C387] transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>6段階の症例演習で振り返る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/practice/haiketsu"
              className="min-h-11 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-sm font-bold text-[#59615D] dark:text-[#A0B0BC] transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>配穴設計ツール</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleSaveToNote}
              className="min-h-11 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#1E3D34]/40 dark:border-[#74BA9E]/40 hover:border-[#1E3D34] text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>この講義を臨床ノートに記録</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {noteSaveError?.lectureId === lecture.id && <p role="alert" className="w-full text-sm leading-relaxed">{noteSaveError.message}</p>}
          </div>
        </div>}
          </div>
        </details>

      </article>
    </div>
  );
}
