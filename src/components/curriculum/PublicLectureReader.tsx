import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Network } from "lucide-react";
import ArticleReferences from "@/components/ArticleReferences";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import { InteractiveQuiz } from "@/components/InteractiveQuiz";
import ReviewQuestionCard from "@/components/learning/ReviewQuestionCard";
import ReadingContents from "@/components/reading/ReadingContents";
import ChapterAssessment from "./ChapterAssessment";
import PublicLecturePosition from "./PublicLecturePosition";
import PublicLectureSections, { PublicLectureLinks } from "./PublicLectureSections";
import { SERIES } from "@/config/series";
import { getChapterAssessment } from "@/data/curriculumAssessments";
import { CURRICULUM_QUIZZES } from "@/data/curriculumQuizzes";
import { LEARNING_QUESTIONS } from "@/data/learningQuestionBank";
import { approvedIntroId, approvedIntroReferences } from "@/data/publicLectures/approvedIntro";
import { getPublicLectureDiagram } from "@/data/publicLectures/diagrams";
import type { PublicLectureSeries } from "@/data/publicLectures";
import { getReadingUnitForLecture, readingPartHref } from "@/data/publicLectures/readingUnits";
import type { PublicLectureArticle, PublicLectureLink } from "@/data/publicLectures/types";
import type { ResolvedReference } from "@/types/references";

const headingClass = "reader-section-title";
const linkClass = "ui-text-link";

export default function PublicLectureReader({ id, article, series, references, related }: {
  id: string;
  article: PublicLectureArticle;
  series: PublicLectureSeries;
  references: ResolvedReference[];
  related: PublicLectureLink[];
}) {
  const shelf = SERIES[series];
  const quiz = CURRICULUM_QUIZZES[id];
  const assessment = getChapterAssessment(id);
  const hasExercises = Boolean(quiz || assessment);
  const contents = article.sections.map((section, index) => ({ id: `lecture-section-${index + 1}`, label: section.heading }));
  const diagram = getPublicLectureDiagram(id);
  const unit = getReadingUnitForLecture(id);
  const authoredLinks = article.links ?? [];
  const links = [...authoredLinks, ...related.filter(link => !authoredLinks.some(authored => authored.href === link.href))];

  return (
    <article data-public-lecture={id} data-lecture-series={series} className="reader-article reader-article--lecture">
      <PublicLecturePosition lectureId={id} />
      <header className="reader-header">
        <Link href={shelf.href} className="reader-back"><ArrowLeft aria-hidden="true" />{shelf.name}</Link>
        <h1 className="reader-title">{article.title}</h1>
        <p className="reader-lead">{article.lead}</p>
        {unit && <Link href={readingPartHref(id)} className="ui-text-link">この節を含む講義を読む<ArrowRight aria-hidden="true" /></Link>}
      </header>
      <nav className="reader-navigation" aria-label="講義内を移動">
        <a href="#lecture-content" className="page-primary-action"><BookOpen aria-hidden="true" className="h-4 w-4" />本文へ</a>
        {diagram && <a href="#lecture-diagram" className="page-secondary-action"><Network aria-hidden="true" />図解へ</a>}
        {hasExercises && <a href="#lecture-supplements" className="page-secondary-action">確認問題へ</a>}
        {(id === approvedIntroId || references.length > 0) && <a href="#article-references-section" className="page-secondary-action">出典へ</a>}
      </nav>
      <ReadingContents label="講義の目次" headings={contents} />
      <Suspense fallback={null}>
        <ReviewQuestionCard lectureId={id} questions={LEARNING_QUESTIONS.filter(question => question.lectureId === id)} />
      </Suspense>
      <div id="lecture-content" tabIndex={-1} className="reader-content">
        <PublicLectureSections lectureId={id} sections={article.sections} />
      </div>
      {hasExercises && (
        <details id="lecture-supplements" className="page-help">
          <summary>確認問題・復習</summary>
          {quiz && <div id="lecture-quiz" className="scroll-mt-28"><InteractiveQuiz quiz={quiz} /></div>}
          {assessment && <ChapterAssessment assessment={assessment} />}
          <Link className="ui-text-link" href="/learn/review">復習問題の一覧</Link>
        </details>
      )}
      {links.length > 0 && (
        <nav aria-labelledby="lecture-related" className="space-y-2">
          <h2 id="lecture-related" className={headingClass}>あわせて読む</h2>
          <PublicLectureLinks links={links} />
        </nav>
      )}
      {id === approvedIntroId ? (
        <section id="article-references-section" className="scroll-mt-28 space-y-3">
          <h2 id="sources" className={headingClass}>参考文献</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
            {approvedIntroReferences.map(({ name, url, scope }) => (
              <li key={url}>{scope}。 <a href={url} className={linkClass}>{name}</a></li>
            ))}
          </ul>
        </section>
      ) : (
        <ArticleReferences
          references={references}
          scopeNote="用語の定義、学習例の背景、研究結果は、資料ごとの参照範囲を確認してください。"
        />
      )}
      <AuthorSupervisorCard topic={article.title} />
    </article>
  );
}
