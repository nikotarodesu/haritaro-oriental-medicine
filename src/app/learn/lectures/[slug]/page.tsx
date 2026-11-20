import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Network } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import PublicLecturePosition from "@/components/curriculum/PublicLecturePosition";
import PublicLectureSections, { PublicLectureLinks } from "@/components/curriculum/PublicLectureSections";
import ReadingContents from "@/components/reading/ReadingContents";
import ReadingSequence from "@/components/reading/ReadingSequence";
import { pageSocialMetadata } from "@/config/seo";
import { SERIES } from "@/config/series";
import { getChapterAssessment } from "@/data/curriculumAssessments";
import { CURRICULUM_QUIZZES } from "@/data/curriculumQuizzes";
import { getPublicLectureArticle } from "@/data/publicLectures";
import { approvedIntroId } from "@/data/publicLectures/approvedIntro";
import { getLectureIndexGroups, getReadingUnit, readingUnits } from "@/data/publicLectures/readingUnits";
import { getPublicLectureReferences, publishedLectureRecords } from "@/data/publicLectures/resources";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return readingUnits.map(({ slug }) => ({ slug }));
}

async function findUnit(params: Props["params"]) {
  const unit = getReadingUnit((await params).slug);
  if (!unit) notFound();
  return unit;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unit = await findUnit(params);
  const title = `${unit.title}｜${SERIES.reading.name}`;
  return {
    title: { absolute: title },
    description: unit.description,
    alternates: { canonical: unit.href },
    ...pageSocialMetadata(title, unit.description, unit.href),
  };
}

export default async function ReadingLecturePage({ params }: Props) {
  const unit = await findUnit(params);
  const index = readingUnits.indexOf(unit);
  const chapter = getLectureIndexGroups("reading").find(group => group.id === unit.chapter);
  const firstPart = unit.parts[0];
  const resources = unit.parts.flatMap(part => {
    const record = publishedLectureRecords.get(part.lectureId);
    const hasSources = part.lectureId === approvedIntroId || Boolean(record && getPublicLectureReferences(record).length);
    const hasQuiz = Boolean(CURRICULUM_QUIZZES[part.lectureId] || getChapterAssessment(part.lectureId));
    return hasQuiz || hasSources ? [{ ...part, hasQuiz, hasSources }] : [];
  });

  return (
    <article className="reader-article reader-article--lecture" data-reading-unit={unit.slug}>
      <PublicLecturePosition lectureId={firstPart.lectureId} trackPart />
      <header className="reader-header">
        <Link href="/learn#learn-courses-heading" className="reader-back"><ArrowLeft aria-hidden="true" />講義の目次</Link>
        <p className="lecture-reading-position">
          <span>{chapter?.label}</span>
          <span>第{index + 1}講 ／ 全{readingUnits.length}講</span>
        </p>
        <h1 className="reader-title">{unit.title}</h1>
        <p className="reader-lead">{unit.description}</p>
      </header>

      <div className="lecture-unit-example">
        <strong>身近な例</strong>
        <p>{unit.example}</p>
      </div>

      <nav className="reader-navigation" aria-label="講義内を移動">
        <a href="#lecture-content" className="page-primary-action"><BookOpen aria-hidden="true" />本文へ</a>
        <a href={`#${firstPart.anchor}-diagram`} className="page-secondary-action"><Network aria-hidden="true" />図解へ</a>
        {resources.length > 0 && <a href="#lecture-resources" className="page-secondary-action">確認問題と出典</a>}
      </nav>
      <ReadingContents label="講義の目次" headings={unit.parts.map(part => ({ id: part.anchor, label: part.label }))} />

      <div id="lecture-content" tabIndex={-1} className="reader-content">
        {unit.parts.map(part => {
          const article = getPublicLectureArticle(part.lectureId);
          if (!article) notFound();
          return (
            <section key={part.lectureId} id={part.anchor} tabIndex={-1} className="lecture-unit-part" data-lecture-part={part.lectureId} aria-labelledby={`${part.anchor}-heading`}>
              <h2 id={`${part.anchor}-heading`} className="reader-section-title">{part.label}</h2>
              <p className="lecture-unit-part-lead">{article.lead}</p>
              <PublicLectureSections lectureId={part.lectureId} sections={article.sections} partAnchor={part.anchor} unitHref={unit.href} />
              {article.links?.length ? <PublicLectureLinks links={article.links} unitHref={unit.href} /> : null}
            </section>
          );
        })}
      </div>

      <ReadingSequence
        label="講義"
        previous={readingUnits[index - 1]}
        next={readingUnits[index + 1]}
        index={{ href: "/learn#learn-courses-heading", title: "講義の目次" }}
      />

      {resources.length > 0 && (
        <details id="lecture-resources" className="page-help">
          <summary>確認問題と出典</summary>
          <ul className="lecture-unit-resources">
            {resources.map(({ lectureId, label, hasQuiz, hasSources }) => (
              <li key={lectureId}>
                <strong>{label}</strong>
                <div className="lecture-resource-links">
                  {hasQuiz && <Link href={`/curriculum/${lectureId}#lecture-supplements`} prefetch={false} className="ui-text-link">確認問題を解く</Link>}
                  {hasSources && <Link href={`/curriculum/${lectureId}#article-references-section`} prefetch={false} className="ui-text-link">出典を見る</Link>}
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}
      <AuthorSupervisorCard topic={unit.title} />
    </article>
  );
}
