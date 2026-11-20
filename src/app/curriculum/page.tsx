import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PublicLectureIndex from "@/components/curriculum/PublicLectureIndex";
import PageIntro from "@/components/design/PageIntro";
import { pageSocialMetadata } from "@/config/seo";
import { getPublicLectureArticle } from "@/data/publicLectures";
import { getLectureIndexGroups } from "@/data/publicLectures/readingUnits";
import { resolveLegacyLectureId } from "@/utils/curriculumLegacyPaths";

const origin = "https://www.haritaro.jp";
const items = getLectureIndexGroups().flatMap(group => group.entries);
const title = `東洋医学・経絡・鍼灸演習の全${items.length}本の目次`;
const description = "陰陽・気血水・経絡、症状の経過や所見の整理、架空症例の演習をテーマから選べます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/curriculum" },
  ...pageSocialMetadata(title, description, "/curriculum"),
};

export default async function CurriculumPage({ searchParams }: { searchParams: Promise<{ lecture?: string | string[]; focus?: string | string[] }> }) {
  const { lecture, focus } = await searchParams;
  if (typeof lecture === "string" && lecture) {
    const id = resolveLegacyLectureId(lecture);
    if (!getPublicLectureArticle(id)) notFound();
    const query = typeof focus === "string" && focus ? `?${new URLSearchParams({ focus })}` : "";
    permanentRedirect(`/curriculum/${id}${query}`);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: origin + "/curriculum",
    description,
    inLanguage: "ja",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.title, url: origin + item.href,
      })),
    },
  };

  return (
    <div className="page-layout space-y-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PageIntro title="東洋医学の読み物・鍼灸演習の目次" description={description} art="study" />
      <div id="curriculum-chapters" className="scroll-mt-28"><PublicLectureIndex /></div>
    </div>
  );
}
