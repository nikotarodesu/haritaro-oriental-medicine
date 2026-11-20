import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import PublicLecturePosition from "@/components/curriculum/PublicLecturePosition";
import PublicLectureSections, { PublicLectureLinks } from "@/components/curriculum/PublicLectureSections";
import ReadingUnitCheck from "@/components/curriculum/ReadingUnitCheck";
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
import { readingUnitRevisions } from "@/data/publicLectures/revisions";
import { reviseLectureSections } from "@/data/publicLectures/revisions/types";

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
  const revision = readingUnitRevisions[unit.slug];
  if (!revision) notFound();
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
        <Link href="/learn#learn-courses-heading" className="reader-back"><ArrowLeft aria-hidden="true" />講義一覧</Link>
        <p className="lecture-reading-position">
          <span>{chapter?.label}</span>
          <span>第{index + 1}講 ／ 全{readingUnits.length}講</span>
        </p>
        <h1 className="reader-title">{unit.title}</h1>
        <p className="reader-lead">{unit.description}</p>
      </header>

      <ReadingContents label="講義の目次" headings={[
        ...unit.parts.map(part => ({ id: part.anchor, label: part.label })),
        { id: "lecture-review", label: "要点まとめと確認問題" },
      ]} />

      <div id="lecture-content" tabIndex={-1} className="reader-content">
        <p className="lecture-unit-example"><strong>身近な例</strong> {unit.example}</p>
        {unit.parts.map(part => {
          const article = getPublicLectureArticle(part.lectureId);
          if (!article) notFound();
          return (
            <section key={part.lectureId} id={part.anchor} tabIndex={-1} className="lecture-unit-part" data-lecture-part={part.lectureId} aria-labelledby={`${part.anchor}-heading`}>
              <h2 id={`${part.anchor}-heading`} className="reader-section-title">{part.label}</h2>
              <PublicLectureSections
                lectureId={part.lectureId}
                sections={reviseLectureSections(article.sections, revision.copy[part.lectureId])}
                partAnchor={part.anchor}
                unitHref={unit.href}
              />
              {article.links?.length ? <PublicLectureLinks links={article.links} unitHref={unit.href} /> : null}
            </section>
          );
        })}
      </div>

      <section id="lecture-review" tabIndex={-1} className="lecture-unit-review" aria-labelledby="lecture-takeaways">
        <h2 id="lecture-takeaways" className="reader-section-title">要点まとめ</h2>
        <ul className="lecture-takeaways">
          {revision.takeaways.map(takeaway => <li key={takeaway}>{takeaway}</li>)}
        </ul>
        <div className="lecture-check">
          <h3 className="lecture-unit-subtitle">確認問題</h3>
          <ReadingUnitCheck key={unit.slug} unitId={unit.slug} questions={revision.questions} />
        </div>
      </section>

      <ReadingSequence
        label="講義"
        previous={readingUnits[index - 1]}
        next={readingUnits[index + 1]}
        index={{ href: "/learn#learn-courses-heading", title: "講義の目次" }}
      />

      {resources.length > 0 && (
        <details id="lecture-resources" className="page-help">
          <summary>出典・さらに復習する</summary>
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
