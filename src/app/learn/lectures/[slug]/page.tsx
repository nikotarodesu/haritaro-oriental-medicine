import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowDown, ArrowRight, ChevronDown, ListChecks } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import ContentEndAd from "@/components/ads/ContentEndAd";
import CaseCourseLectureContext from "@/components/cases/CaseCourseLectureContext";
import CaseReviewReturnLink from "@/components/cases/CaseReviewReturnLink";
import PublicLecturePosition from "@/components/curriculum/PublicLecturePosition";
import PublicLectureSections, { PublicLectureLinks } from "@/components/curriculum/PublicLectureSections";
import ReadingUnitCheck from "@/components/curriculum/ReadingUnitCheck";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import ReadingContents from "@/components/reading/ReadingContents";
import ReadingSequence from "@/components/reading/ReadingSequence";
import { pageSocialMetadata, SITE_AUTHOR, SITE_ORIGIN } from "@/config/seo";
import { PAGE_REVISIONS } from "@/config/contentUpdates";
import { SERIES } from "@/config/series";
import { PUBLIC_CASE_STUDY_IDS } from "@/data/cases/caseStudyCatalog";
import { ATLAS_STUDY_ROUTES, atlasStudyExercise, KNEE_ATLAS_STUDY_ROUTE, KNEE_STUDY_LECTURE_ID, KNEE_STUDY_SECTION } from "@/data/tsubo/atlas/studyRoutes";
import { CURRICULUM_QUIZZES } from "@/data/curriculumQuizzes";
import { getPublicLectureArticle } from "@/data/publicLectures";
import { approvedIntroId, approvedIntroReferences } from "@/data/publicLectures/approvedIntro";
import { getPublicLectureDiagram } from "@/data/publicLectures/diagrams";
import { getLectureIndexGroups, getReadingUnit, READING_LECTURES_REVISED_AT, readingUnits } from "@/data/publicLectures/readingUnits";
import { getReadingUnitQuestions } from "@/data/publicLectures/readingUnitQuestions";
import { getPublicLectureReferences, publishedLectureRecords } from "@/data/publicLectures/resources";
import { readingUnitRevisions } from "@/data/publicLectures/revisions";
import { reviseLectureSections } from "@/data/publicLectures/revisions/types";
import { originalLectureHref } from "@/utils/curriculumLegacyPaths";
import { CASE_COURSE_REVIEW_LECTURE_ID, CASE_COURSE_REVIEW_SECTION, CASE_REVIEW_LECTURE_ID } from "@/utils/caseStudyNavigation";
import styles from "./lecture-reading.module.css";

const practiceByUnit: Readonly<Partial<Record<string, { href: string; label: string }>>> = {
  "meridians-and-points": {
    href: "/tsubo#nearby-comparisons", label: "近いツボの位置を図で見比べる",
  },
  "qi-blood-and-patterns": {
    href: "/cases/case-02-fatigue-spleen-deficiency", label: "疲労の模擬症例で所見を読む",
  },
  "assessment-basics": {
    href: "/cases/case-01-headache-liver-fire", label: "頭痛の模擬症例で四診と根拠を確かめる",
  },
  "principles-and-goals": {
    href: "/practice/haiketsu", label: "配穴の練習でツボを選んだ理由を書く",
  },
};

const lectureIndexHref = "/learn#learn-courses-heading";

interface Props {
  params: Promise<{ slug: string }>;
}

interface LectureCitation {
  name: string;
  url?: string;
  scopes: Set<string>;
}

function sourceName(name: string) {
  return name.toLowerCase().replace(/（\d{4}年）$/, "");
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
  const social = pageSocialMetadata(title, unit.description, unit.href);
  return {
    title: { absolute: title },
    description: unit.description,
    alternates: { canonical: unit.href },
    ...social,
    openGraph: { ...social.openGraph, type: "article", locale: "ja_JP" },
  };
}

export default async function ReadingLecturePage({ params }: Props) {
  const unit = await findUnit(params);
  const revision = readingUnitRevisions[unit.slug];
  if (!revision) notFound();
  const questions = getReadingUnitQuestions(unit.slug);
  const practice = practiceByUnit[unit.slug];
  const revisedAt = PAGE_REVISIONS[unit.href] ?? READING_LECTURES_REVISED_AT;
  const index = readingUnits.indexOf(unit);
  const chapter = getLectureIndexGroups("reading").find(group => group.id === unit.chapter);
  const firstPart = unit.parts[0];
  const citations: LectureCitation[] = [];
  for (const part of unit.parts) {
    const record = publishedLectureRecords.get(part.lectureId);
    const references = record ? getPublicLectureReferences(record) : [];
    const publishedCitations = part.lectureId === approvedIntroId
      ? approvedIntroReferences
      : references
        .filter(reference => reference.bibliographyStatus === "matched" && reference.claimsStatus === "source-checked")
        .map(reference => ({ name: reference.title, url: reference.url, scope: reference.note }));
    for (const { name, url, scope } of publishedCitations) {
      const existing = citations.find(citation => (url && citation.url === url) || sourceName(citation.name) === sourceName(name));
      if (existing) {
        if (scope) existing.scopes.add(scope);
        existing.url ??= url;
      } else {
        citations.push({ name, url, scopes: new Set(scope ? [scope] : []) });
      }
    }
  }
  const canonical = SITE_ORIGIN + unit.href;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "LearningResource"],
        "@id": canonical,
        url: canonical,
        name: unit.title,
        description: unit.description,
        inLanguage: "ja",
        learningResourceType: "講義",
        isPartOf: { "@id": SITE_ORIGIN + SERIES.reading.href },
        mainEntity: { "@id": `${canonical}#article` },
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        mainEntityOfPage: canonical,
        headline: unit.title,
        description: unit.description,
        articleSection: chapter?.label,
        inLanguage: "ja",
        dateModified: revisedAt,
        author: SITE_AUTHOR,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        citation: citations.map(({ name, url }) => ({ "@type": "CreativeWork", name, url })),
      },
    ],
  };

  return (
    <article className="reader-article reader-article--lecture" data-reading-unit={unit.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PublicLecturePosition lectureId={firstPart.lectureId} trackPart />
      <header className={`reader-header ${styles.header}`}>
        <div className="lecture-unit-meta">
          <PageBreadcrumb items={[{ href: lectureIndexHref, name: "講義一覧" }, { href: unit.href, name: unit.title }]} hideCurrent />
          <p className="lecture-reading-position">
            <span>{chapter?.label}</span>
            <span>第{index + 1}講 ／ 全{readingUnits.length}講（{unit.parts.length}節）</span>
          </p>
        </div>
        <h1 className="reader-title">{unit.title}</h1>
        <div className="lecture-unit-opening">
          {unit.opening.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <div className={styles.readingTools}>
        <ReadingContents label="講義の目次" headings={unit.parts.map(part => {
          const diagram = getPublicLectureDiagram(part.lectureId);
          return {
            id: part.anchor,
            label: part.label,
            diagram: diagram ? { id: `${part.anchor}-diagram`, label: diagram.title } : undefined,
          };
        })} />
        <a href="#lecture-review" className={styles.reviewLink}>
          <ListChecks aria-hidden="true" /> 要点と確認問題 <ArrowDown aria-hidden="true" />
        </a>
      </div>

      <div id="lecture-content" tabIndex={-1} className="reader-content">
        {unit.parts.map(part => {
          const article = getPublicLectureArticle(part.lectureId);
          if (!article) notFound();
          const topic = ATLAS_STUDY_ROUTES.find(route => route.readingHref === `${unit.href}#${part.anchor}`);
          const exercise = topic && atlasStudyExercise(topic);
          const sections = reviseLectureSections(article.sections, revision.copy[part.lectureId]);
          if (part.lectureId === KNEE_STUDY_LECTURE_ID) {
            const kneeExercise = atlasStudyExercise(KNEE_ATLAS_STUDY_ROUTE);
            const section = sections[KNEE_STUDY_SECTION - 1];
            if (section && kneeExercise) {
              sections[KNEE_STUDY_SECTION - 1] = { ...section, links: [...(section.links ?? []), kneeExercise] };
            }
          }
          return (
            <section key={part.lectureId} id={part.anchor} tabIndex={-1} className="lecture-unit-part" data-lecture-part={part.lectureId} aria-labelledby={`${part.anchor}-heading`}>
              <h2 id={`${part.anchor}-heading`} className="reader-section-title">{part.label}</h2>
              {part.lectureId === CASE_REVIEW_LECTURE_ID && (
                <Suspense fallback={null}><CaseReviewReturnLink publicCaseIds={PUBLIC_CASE_STUDY_IDS} /></Suspense>
              )}
              {exercise && (
                <ContentNavigationLink href={exercise.href} placement="reading_unit_practice" className="page-secondary-action mb-3 print:hidden">
                  {exercise.label}<ArrowRight size={16} aria-hidden="true" />
                </ContentNavigationLink>
              )}
              <PublicLectureSections
                lectureId={part.lectureId}
                sections={sections}
                partAnchor={part.anchor}
                unitHref={unit.href}
                sectionPreface={part.lectureId === CASE_COURSE_REVIEW_LECTURE_ID ? {
                  sectionNumber: CASE_COURSE_REVIEW_SECTION,
                  content: <Suspense fallback={null}><CaseCourseLectureContext /></Suspense>,
                } : undefined}
              />
              {article.links?.length ? <PublicLectureLinks links={article.links} unitHref={unit.href} /> : null}
            </section>
          );
        })}
      </div>

      <div className="lecture-unit-end">
        <section id="lecture-review" tabIndex={-1} className={`lecture-unit-review ${styles.review}`} aria-labelledby="lecture-takeaways">
          <h2 id="lecture-takeaways" className="reader-section-title">要点まとめ</h2>
          <ul className="lecture-takeaways">
            {revision.takeaways.map(takeaway => <li key={takeaway}>{takeaway}</li>)}
          </ul>
          <details id="lecture-check" className="lecture-check" open>
            <summary>
              <span>確認問題</span>
              <span className="lecture-check-count">{questions.length}問</span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <p className="text-sm ui-muted">講義「{unit.title}」の確認問題です。答えを選ぶと解説が表示されます。</p>
            <ReadingUnitCheck key={unit.slug} unitId={unit.slug} questions={questions} />
          </details>
          <ContentNavigationLink href="/learn/review#learning-review" placement="reading_unit_review" className="ui-text-link inline-flex min-h-11 items-center">
            間違えた問題を復習する
          </ContentNavigationLink>
        </section>

        {practice && (
          <div className="print:hidden">
            <ContentNavigationLink
              href={practice.href}
              placement="reading_unit_practice"
              className="page-secondary-action"
            >
              {practice.label}
            </ContentNavigationLink>
          </div>
        )}

        <ReadingSequence
          label="講義"
          previous={readingUnits[index - 1]}
          next={readingUnits[index + 1]}
          index={{ href: lectureIndexHref, title: "講義一覧" }}
        />
      </div>

      {citations.length > 0 && (
        <details id="lecture-resources" className="page-help">
          <summary>参考資料</summary>
          <section className="lecture-citations" aria-labelledby="lecture-citations-heading">
            <h2 id="lecture-citations-heading" className="lecture-resources-heading">講義で参照した資料</h2>
            <ul className="lecture-unit-resources">
              {citations.map(({ name, url, scopes }) => (
                <li key={name}>
                  {url ? <a href={url} className="lecture-citation-link">{name}</a> : <strong>{name}</strong>}
                  {scopes.size > 0 && <p>{[...scopes].map(scope => scope.endsWith("。") ? scope : scope + "。").join("")}</p>}
                </li>
              ))}
            </ul>
          </section>
        </details>
      )}
      <details className="page-help print:hidden">
        <summary>節ごとの確認問題・資料</summary>
        <ul className="lecture-unit-resources">
          {unit.parts.map(({ lectureId, label }) => (
            <li key={lectureId}>
              <Link className="ui-text-link inline-flex min-h-11 items-center" href={originalLectureHref(lectureId, CURRICULUM_QUIZZES[lectureId] ? "lecture-supplements" : undefined)}>{label}</Link>
            </li>
          ))}
        </ul>
      </details>
      <AuthorSupervisorCard revisedAt={revisedAt} />
      <ContentEndAd key={unit.slug} />
    </article>
  );
}
