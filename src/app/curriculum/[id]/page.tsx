import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PublicLectureReader from "@/components/curriculum/PublicLectureReader";
import { PAGE_REVISIONS } from "@/config/contentUpdates";
import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { SERIES } from "@/config/series";
import { getArticlePreviews } from "@/data/articleData";
import { CURRICULUM_DATA } from "@/data/curriculumData";
import { createCurriculumReadingLinks, getCurriculumRelatedArticleIds } from "@/data/curriculumReadingGuides";
import { getPublicLectureArticle, getPublicLectureSeries } from "@/data/publicLectures";
import { approvedIntroId, approvedIntroReferences } from "@/data/publicLectures/approvedIntro";
import { resolveLegacyLectureId } from "@/utils/curriculumLegacyPaths";
import { resolveArticleReferences } from "@/utils/referenceResolver";

const published = new Map(CURRICULUM_DATA.flatMap(stage => stage.lectures)
  .filter(lecture => lecture.isPublished)
  .map(lecture => [lecture.id, lecture]));

interface Props {
  params: Promise<{ id: string }>;
}

function findLecture(rawId: string) {
  const id = resolveLegacyLectureId(rawId);
  const original = published.get(id);
  const article = getPublicLectureArticle(id);
  if (!original || !article) notFound();
  return { id, original, article, series: getPublicLectureSeries(id) };
}

export function generateStaticParams() {
  return [...published.keys()].map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, article, series } = findLecture((await params).id);
  const title = `${article.title}｜${SERIES[series].name}`;
  const { description } = article;
  const url = `https://www.haritaro.jp/curriculum/${id}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { images: SHARED_OG_IMAGES, siteName: SITE_NAME, title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description, images: SHARED_OG_IMAGES.map(image => image.url) },
  };
}

export default async function CurriculumDetailPage({ params }: Props) {
  const { id: rawId } = await params;
  const { id, original, article, series } = findLecture(rawId);
  if (rawId !== id) permanentRedirect(`/curriculum/${id}`);

  const section = SERIES[series];
  const origin = "https://www.haritaro.jp";
  const path = `/curriculum/${id}`;
  const url = origin + path;
  const references = resolveArticleReferences(original.references, original.contentMarkdown)
    .map(reference => ({ ...reference, note: reference.claimsStatus === "source-checked" ? reference.note : undefined }));
  const citations = id === approvedIntroId
    ? approvedIntroReferences
    : references.filter(reference => reference.claimsStatus !== "do-not-use" && reference.bibliographyStatus !== "retracted")
      .map(reference => ({ name: reference.title, url: reference.url }));
  const related = createCurriculumReadingLinks(id, getArticlePreviews(getCurriculumRelatedArticleIds(id)))
    .map(link => ({ href: link.href, label: link.title }));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: article.title,
        description: article.description,
        dateModified: PAGE_REVISIONS[path],
        articleSection: section.shortName,
        author: { "@type": "Person", name: "はり太郎", url: origin + "/about" },
        citation: citations.map(({ name, url }) => ({ "@type": "CreativeWork", name, url })),
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: origin },
          { "@type": "ListItem", position: 2, name: section.name, item: origin + section.href },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PublicLectureReader id={id} article={article} series={series} references={references} related={related} />
    </>
  );
}
