"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Lecture } from "@/data/curriculumData";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import { resolveArticleReferences } from "@/utils/referenceResolver";
import { useCurriculumProgress } from "@/contexts/CurriculumProgressContext";
import { CURRICULUM_QUIZZES } from "@/data/curriculumQuizzes";
import { getCurriculumReadingInserts, CURRICULUM_READING_QUESTIONS } from "@/data/curriculumReadingGuides";
import { getLearningCoursesForLecture } from "@/data/learningCourses";
import { parseMarkdownBlocks } from "@/utils/markdownParser";
import type { ReadingLink } from "@/types/reading";
import ReviewQuestionCard from "@/components/learning/ReviewQuestionCard";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import { 
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

interface Props {
  lecture: Lecture;
  lectureNavigation: ReadonlyArray<Pick<Lecture, "id" | "title" | "seriesId" | "lessonNumber" | "lectureNumber" | "duration" | "isPublished">>;
  relatedReadingLinks?: ReadingLink[];
}

export default function CurriculumLectureReader({ lecture, lectureNavigation, relatedReadingLinks = [] }: Props) {
  const articleTopRef = useRef<HTMLDivElement | null>(null);
  const [focusBanner, setFocusBanner] = useState<string | null>(null);
  const [resolvedCourse, setResolvedCourse] = useState<{ lectureId: string; journey: CourseJourney | null } | null>(null);
  const courseJourney = resolvedCourse?.lectureId === lecture.id ? resolvedCourse.journey : null;

  const {
    isMounted,
    completedLectures,
    toggleLectureCompleted,
    recordVisitedLecture,
  } = useCurriculumProgress();
  const courseNextAction = courseJourney ? getCourseNextAction(courseJourney, completedLectures) : null;

  const allLectures = lectureNavigation;

  const handleSaveToNote = () => {
    trackEvent("curriculum_save_to_note", { lecture_id: lecture.id });
    const sectionName = lecture.seriesTitle || lecture.stageTitle;
    saveDraftPatientNote({
      sourceTool: "カリキュラム講義",
      chiefComplaint: `講義記録: ${lecture.title}`,
      constitution: sectionName,
      treatmentPlan: `【受講講義】${lecture.title}（${sectionName}）\n\n【講義要約】\n${lecture.summary}\n\n【臨床への応用メモ・臨床所見】\n`,
    });
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
        let target: HTMLElement | null = null;
        try { target = fragment ? document.getElementById(decodeURIComponent(fragment)) : null; } catch { /* Invalid fragments fall back to the lecture top. */ }
        if (target && articleTopRef.current?.contains(target)) {
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

  // キーボード前後送りショートカット（[ で前へ、] で次へ、Alt+← で前へ、Alt+→ で次へ）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // フォーム入力中はスキップ
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.isContentEditable;
      if (isInput) return;

      if ((e.key === "[" || (e.altKey && e.key === "ArrowLeft")) && previousHref) {
        e.preventDefault();
        router.push(previousHref);
      } else if ((e.key === "]" || (e.altKey && e.key === "ArrowRight")) && nextHref) {
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

  const keyPointsSeenTerms = new Set<string>();
  const bodySeenTerms = new Set<string>();
  const resolvedReferences = resolveArticleReferences(
    lecture.references,
    lecture.contentMarkdown
  );
  const readingInserts = getCurriculumReadingInserts(lecture.id);
  const lectureHeadings = parseMarkdownBlocks(lecture.contentMarkdown).flatMap((block, index) =>
    block.type === "h2" ? [{ label: block.content, id: `curriculum-heading-${index}` }] : [],
  );
  const readingQuestions = (CURRICULUM_READING_QUESTIONS[lecture.id] ?? []).flatMap((item) => {
    const heading = lectureHeadings.find((candidate) => candidate.label === item.heading);
    return heading ? [{ question: item.question, id: heading.id }] : [];
  });
  const learningCourses = getLearningCoursesForLecture(lecture.id);
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
    <div ref={articleTopRef} className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-5 sm:space-y-6">
      {/* 読書進捗バー */}
      <ReadingProgressBar bodySelector="#lecture-content [data-reading-body]" />

      <Suspense fallback={null}>
        <ReviewQuestionCard lectureId={lecture.id} />
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

        <div className="flex items-center gap-2 sm:gap-3">
          <FontSizeControl variant="compact" />

          <Link
            href="/simulator"
            className="min-h-11 inline-flex items-center gap-1.5 text-sm font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#F2D7B3] dark:border-[#4D331F] hover:bg-[#FBE9D5] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">シミュレーターで試す</span>
            <span className="sm:hidden">推論</span>
          </Link>

          <div className="flex items-center gap-1 text-sm text-[#59615D] dark:text-[#96A6B2]">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>約 {lecture.duration}</span>
          </div>
        </div>
      </div>

      <Suspense fallback={null}><CourseJourneyResolver lectureId={lecture.id} onResolve={setResolvedCourse} /></Suspense>
      {courseJourney && <section aria-label="学習中のコース" className="rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-4 text-[#184F49] dark:border-[#2A5243] dark:bg-[#182823] dark:text-[#9CCBBC]">
        <p className="text-sm font-semibold">{courseJourney.course.title} · ステップ {courseJourney.stepIndex + 1} / {courseJourney.course.steps.length}</p>
        <Link href={`/learn/courses/${courseJourney.course.slug}#course-next`} className="mt-2 inline-flex min-h-11 items-center gap-2 text-base font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft aria-hidden="true" className="h-4 w-4" />コースの進捗・到達目標へ</Link>
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
            <span className="font-mono text-sm text-[#737C77] dark:text-[#8899A6]">
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

      {/* 講義テキスト本体 */}
      <article className="bg-white dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] px-3.5 py-6 sm:p-10 shadow-xs space-y-6 transition-colors">
        {/* 講義ヘッダー */}
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] font-bold">
                {lecture.stageTitle}
              </span>
              {lecture.seriesTitle && lecture.lessonNumber ? (
                <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#B86924] dark:text-[#E6C387] font-bold">
                  {lecture.seriesTitle} レッスン {lecture.lessonNumber}
                </span>
              ) : (
                <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
                  第 {lecture.lectureNumber} 講
                </span>
              )}
              <span className="text-[#737C77] dark:text-[#8899A6]">
                約 {lecture.duration}
              </span>
            </div>

            {/* 学習ステータス切替ボタン */}
            <button
              type="button"
              onClick={() => toggleLectureCompleted(lecture.id)}
              className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
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
            {lecture.title}
          </h1>
          {lecture.subtitle && (
            <p className="text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {lecture.subtitle}
            </p>
          )}
        </div>

        <nav aria-label="講義内の移動" className="flex flex-wrap gap-2">
          <a href="#lecture-content" aria-label="講義本文を読む" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D5DED8] dark:border-[#2A3B4A] px-4 text-sm font-semibold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#83BEA8]">本文</a>
          {readingInserts[0] && <a href={`#reading-figure-${readingInserts[0].figure.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D5DED8] px-4 text-sm font-semibold text-[#1E3D34] hover:bg-[#EBF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#2A3B4A] dark:text-[#83BEA8] dark:hover:bg-[#182823]">図で整理</a>}
          {CURRICULUM_QUIZZES[lecture.id] && <a href="#lecture-quiz" aria-label="理解度チェックのクイズへ" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D5DED8] dark:border-[#2A3B4A] px-4 text-sm font-semibold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#83BEA8]">クイズ</a>}
          {resolvedReferences.length > 0 && <a href="#article-references-section" aria-label="出典と確認範囲へ" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#D5DED8] dark:border-[#2A3B4A] px-4 text-sm font-semibold text-[#1E3D34] dark:text-[#83BEA8] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#83BEA8]">出典</a>}
        </nav>

        {/* 学習ゴール枠 */}
        <div className="bg-[#FAF8F5] dark:bg-[#141E28] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EBE4D5] dark:border-[#22303D] pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <h2 className="font-serif text-sm sm:text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                本レッスンの学習ゴール ＆ 重要要点
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white/80 dark:bg-[#1A2632]/80 p-3 rounded-xl border border-[#EDE7DC] dark:border-[#243444] space-y-1">
              <span className="text-sm font-bold text-[#1E3D34] dark:text-[#83BEA8] block">主な学習内容</span>
              <p className="text-base text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                {lecture.whatYouWillLearn.topics}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-[#1A2632]/80 p-3 rounded-xl border border-[#EDE7DC] dark:border-[#243444] space-y-1">
              <span className="text-sm font-bold text-[#B86924] dark:text-[#E6C387] block">習得ゴール（できるようになること）</span>
              <p className="text-base font-semibold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                {lecture.whatYouWillLearn.canDo}
              </p>
            </div>
          </div>

          {/* 重要ポイント */}
          {lecture.keyPoints && lecture.keyPoints.length > 0 && (
            <div className="pt-2 border-t border-[#EBE4D5] dark:border-[#22303D] space-y-1">
              <ul className="space-y-1 text-base text-[#404743] dark:text-[#C5D2DB]">
                {lecture.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✓</span>
                    <span><GlossaryRenderer text={point} seenTerms={keyPointsSeenTerms} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ClinicalLectureApplication lectureId={lecture.id} takeaway={lecture.whatYouWillLearn.canDo} />
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
          <details className="rounded-xl bg-[#FAF8F5] px-4 py-2 dark:bg-[#121920]">
            <summary className="flex min-h-11 cursor-pointer items-center text-base font-bold text-[#1E3D34] dark:text-[#83BEA8]">講義の目次</summary>
            <nav aria-label="講義の目次" className="mt-2">
              <ol className="space-y-1">
                {lectureHeadings.map((heading) => (
                  <li key={heading.id}><a href={`#${heading.id}`} className="inline-flex min-h-11 items-center rounded-lg py-2 text-base leading-relaxed text-[#1E3D34] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-[#83BEA8]">{heading.label}</a></li>
                ))}
              </ol>
            </nav>
          </details>
        )}

        {/* 本文（MarkdownBody） */}
        <div id="lecture-content" className="scroll-mt-28">
        <MarkdownBody
          contentMarkdown={lecture.contentMarkdown}
          seenTerms={bodySeenTerms}
          idPrefix="curriculum-heading"
          resolvedReferences={resolvedReferences}
          readingInserts={readingInserts}
          relatedReading={relatedFigureReading}
        />
        </div>

        {articleReadingLinks.length > 0 && (
          <nav aria-label="この講義に関連する記事" className="border-t border-[#E5DEC9] dark:border-[#2A3B4A] pt-5">
            <p className="text-base font-semibold text-[#1E3D34] dark:text-[#83BEA8]">関連する記事で読み深める</p>
            <div className="mt-2 divide-y divide-[#E5DEC9] dark:divide-[#2A3B4A]">
              {articleReadingLinks.map((reading) => (
                <Link
                  key={reading.href}
                  href={reading.href}
                  className="group block min-h-11 rounded-lg py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3D34] dark:focus-visible:outline-[#83BEA8]"
                >
                  <div className="flex items-start justify-between gap-3 text-base font-semibold leading-relaxed text-[#1E3D34] dark:text-[#83BEA8]">
                    <span className="group-hover:underline underline-offset-4">{reading.title}</span>
                    <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                  </div>
                  <p className="mt-1 text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{reading.description}</p>
                  {reading.meta && <span className="mt-1 block text-sm text-[#59615D] dark:text-[#A0B0BC]">{reading.meta}</span>}
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
                <span>国家試験 出題チェックポイント（はり師・きゅう師・あはき）</span>
              </div>
              <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                過去問頻出論点
              </span>
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
              <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
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

        {/* レッスン理解度チェック（クイズ演習） */}
        {CURRICULUM_QUIZZES[lecture.id] && (
          <section id="lecture-quiz" aria-label="理解度チェック" className="scroll-mt-28">
          <InteractiveQuiz
            quiz={CURRICULUM_QUIZZES[lecture.id]}
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

        {/* 参考文献・学術エビデンス */}
        <ArticleReferences references={resolvedReferences} />
        <section aria-label="講義の学習振り返り" className="rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-4 sm:p-5 dark:border-[#2A5243] dark:bg-[#182823]">
          <h2 className="text-lg font-bold text-[#184F49] dark:text-[#9CCBBC]">学んだことを、自分の言葉で残す</h2>
          <p className="mt-2 text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">押さえた要点、まだ迷うこと、次に確認することを記録して、後から振り返れます。</p>
          <Link href={buildLearningReflectionHref({ type: 'lecture', id: lecture.id })} onClick={() => trackEvent('context_link_click', { placement: 'lecture_reflection', lecture_id: lecture.id, item_type: 'learning_note' })} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]"><FileText aria-hidden="true" className="h-4 w-4" />学習の振り返りを書く<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
        </section>

        {/* 学びと実践をつなぐ臨床ツール連携バナー */}
        <div className="bg-gradient-to-r from-[#FAF8F5] to-[#EBF3EF] dark:from-[#17212A] dark:to-[#13221C] rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              学んだ理論を臨床ツールで試す
            </span>
            <span className="text-sm text-[#737C77] dark:text-[#8899A6]">
              登録不要・即座に体験
            </span>
          </div>

          <p className="text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            講義で学んだ陰陽・気血水・病機の概念を、実際の所見整理や弁証推論ツールで検証してみましょう。
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
              href="/simulator"
              className="min-h-11 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121920] border border-[#F2D7B3] dark:border-[#4D331F] hover:border-[#B86924] text-sm font-bold text-[#B86924] dark:text-[#E6C387] transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>弁証シミュレーターで推論</span>
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
          </div>
        </div>

        {/* 講義受講修了フッター */}
        <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleLectureCompleted(lecture.id)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
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
            {courseJourney && courseNextAction && <Link href={courseNextAction.href}
              onClick={() => trackEvent("context_link_click", { placement: courseNextAction.kind === 'complete' ? 'course_complete_return' : 'course_continue', course_id: courseJourney.course.slug, lecture_id: courseNextAction.lectureId })}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">
              <span>{courseNextAction.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>}
            {prevLecture && (
              <Link
                href={`/curriculum/${prevLecture.id}`}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="前のレッスンへ（ショートカット: [ キー）"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{courseJourney ? '全講義の前のレッスン' : '前のレッスン'}</span>
                <kbd className={`${courseJourney ? 'hidden' : 'hidden sm:inline-block'} px-1.5 py-0.5 text-sm font-mono rounded bg-[#FAF8F5] dark:bg-[#202E3C] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#8899A6]`}>
                  [
                </kbd>
              </Link>
            )}

            <Link
              href="/curriculum"
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-sm font-semibold transition-all flex items-center cursor-pointer"
            >
              一覧に戻る
            </Link>

            {nextLecture ? (
              <Link
                href={`/curriculum/${nextLecture.id}`}
                className={courseJourney ? "min-h-11 rounded-xl border border-[#D9E3DD] px-4 py-3 text-sm font-semibold dark:border-[#2A3B4A]" : "min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"}
                title="次のレッスンへ（ショートカット: ] キー）"
              >
                <span>{courseJourney ? '全講義の次のレッスン' : '次のレッスン'}</span>
                <kbd className={`${courseJourney ? 'hidden' : 'hidden sm:inline-block'} px-1.5 py-0.5 text-sm font-mono rounded bg-white/20 text-white border border-white/30`}>
                  ]
                </kbd>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/curriculum"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#B86924] hover:bg-[#9E571B] text-white text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>全講義の一覧へ</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
