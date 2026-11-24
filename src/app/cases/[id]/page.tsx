import { pageSocialMetadata, SITE_ORIGIN } from "@/config/seo";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import CaseStudyViewer from "@/components/cases/CaseStudyViewer";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { SERIES } from "@/config/series";
import { KNEE_RESEARCH_HREF, MIGRAINE_RESEARCH_HREF } from "@/config/acupunctureLearning";
import { readingPartHref } from "@/data/publicLectures/readingUnits";
import { getAcupointByCode } from "@/data/tsubo";
import { atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";
import { NEARBY_COMPARISON_LINKS } from "@/data/tsubo/atlas/nearbyComparisonLinks";
import { CASE_REVIEW_LECTURE_ID, caseReviewLectureHref } from "@/utils/caseStudyNavigation";
import { getSymptomGuide, SYMPTOM_LEARNING_RESOURCES, symptomGuidePath } from "@/utils/symptomGuides";

interface Props {
  params: Promise<{ id: string }>;
}

const caseResearchExercises: Readonly<Partial<Record<string, { topic: string; href: string; question: string; answer: string }>>> = {
  "case-14-knee-osteoarthritis": {
    topic: "変形性膝関節症の比較試験",
    href: KNEE_RESEARCH_HREF,
    question: "この人の「立ち上がりと階段で痛い」という訴えを、次回はどう確かめますか？",
    answer: "立ち上がるときや階段を下りるときの痛みと、動作をどこまでできたかを、前回と同じような条件で聞きます。膝の試験で測った痛みや動きやすさの改善は、軟骨や腫れの変化とは別の指標です。",
  },
  "case-01-headache-liver-fire": {
    topic: "片頭痛の予防の比較試験",
    href: MIGRAINE_RESEARCH_HREF,
    question: "強い頭痛と目の充血があるこの人に、片頭痛の予防試験の結果は当てはまりますか？",
    answer: "まず強い頭痛と充血の原因を医療機関で確認する場面です。研究では、片頭痛と診断された人を対象に予防の変化を調べました。診断後に経過を記録するときは、頭痛があった日数、発作の回数、薬を使った日を分けます。",
  },
};

export async function generateStaticParams() {
  return CLINICAL_CASES.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const clinicalCase = CLINICAL_CASES.find((c) => c.id === id);

  if (!clinicalCase) {
    return {
      title: "症例が見つかりません",
      description: "指定された症例演習データは存在しないか、移動した可能性があります。",
    };
  }

  const title = `${clinicalCase.title}｜はり太郎の臨床演習`;
  const description = `架空の症例で、四診の所見から弁証・治法・配穴を練習します。${clinicalCase.subTitle}`;
  const path = `/cases/${clinicalCase.id}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...pageSocialMetadata(title, description, path),
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const clinicalCase = CLINICAL_CASES.find((c) => c.id === id);

  if (!clinicalCase) {
    notFound();
  }
  const path = `/cases/${clinicalCase.id}`;
  const url = SITE_ORIGIN + path;
  const relatedSlug = Object.keys(SYMPTOM_LEARNING_RESOURCES).find(slug => SYMPTOM_LEARNING_RESOURCES[slug].caseId === id);
  const relatedGuide = relatedSlug ? getSymptomGuide(relatedSlug) : undefined;
  const researchExercise = caseResearchExercises[id];
  const readingHref = caseReviewLectureHref(readingPartHref(CASE_REVIEW_LECTURE_ID), clinicalCase.id);
  const primaryCodes = new Set(clinicalCase.correctDiagnosis.primaryPoints.flatMap(point => {
    const code = point.match(/\(([A-Z]+\d+)\)/i)?.[1].toLowerCase();
    return code ? [code] : [];
  }));
  const [firstPoint, secondPoint] = [...primaryCodes].flatMap(code => {
    const point = getAcupointByCode(code);
    return point ? [point] : [];
  });
  const comparison = firstPoint && secondPoint ? {
    href: NEARBY_COMPARISON_LINKS.find(group => group.codes.includes(firstPoint.codeLower) && group.codes.includes(secondPoint.codeLower))?.href
      ?? atlasLearningPairHref([firstPoint.code, secondPoint.code]),
    label: `${firstPoint.name}・${secondPoint.name}の位置を比べる`,
  } : undefined;
  const resourceJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "LearningResource"],
    "@id": url,
    url,
    name: clinicalCase.title,
    description: clinicalCase.subTitle,
    inLanguage: "ja",
    learningResourceType: "模擬症例演習",
    isPartOf: { "@type": "CollectionPage", "@id": SITE_ORIGIN + "/cases" },
  };

  return (
    <div className="page-layout page-layout--reading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd).replace(/</g, "\\u003c") }} />
      <PageBreadcrumb items={[
        { href: SERIES.practice.href, name: SERIES.practice.shortName },
        { href: "/cases", name: "症例演習" },
        { href: path, name: clinicalCase.title },
      ]} />
      <CaseStudyViewer clinicalCase={clinicalCase} reviewResources={{ readingHref, comparison }} />
      {researchExercise && (
        <section className="page-help mt-6 space-y-3" aria-labelledby="case-research-exercise">
          <h2 id="case-research-exercise" className="page-section-heading">研究と症例を読み比べる</h2>
          <p>{researchExercise.question}</p>
          <details className="atlas-disclosure">
            <summary>考え方の例を読む</summary>
            <p className="leading-relaxed">{researchExercise.answer}</p>
          </details>
          <p><Link href={researchExercise.href} className="ui-text-link">{researchExercise.topic}を読む</Link></p>
        </section>
      )}
      {relatedGuide && <nav aria-label="症例に関連するガイド" className="reader-navigation">
        <Link href={symptomGuidePath(relatedGuide)} className="page-secondary-action">{relatedGuide.title}の症状ガイドを読む</Link>
      </nav>}
    </div>
  );
}
