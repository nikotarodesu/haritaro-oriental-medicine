import { pageSocialMetadata, SITE_ORIGIN } from "@/config/seo";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import CaseStudyViewer from "@/components/cases/CaseStudyViewer";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { SERIES } from "@/config/series";
import { getSymptomGuide, SYMPTOM_LEARNING_RESOURCES, symptomGuidePath } from "@/utils/symptomGuides";

interface Props {
  params: Promise<{ id: string }>;
}

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
      <CaseStudyViewer clinicalCase={clinicalCase} />
      {relatedGuide && <nav aria-label="症例に関連するガイド" className="reader-navigation">
        <Link href={symptomGuidePath(relatedGuide)} className="page-secondary-action">{relatedGuide.title}の症状ガイドを読む</Link>
      </nav>}
    </div>
  );
}
