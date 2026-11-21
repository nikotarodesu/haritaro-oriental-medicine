import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PAGE_REVISIONS } from "@/config/contentUpdates";
import { pageSocialMetadata, SITE_ORIGIN } from "@/config/seo";
import LearningCredits from "@/components/common/LearningCredits";
import DiagnosisClient from "@/components/diagnosis/DiagnosisClient";
import { getArticlePreviews } from "@/data/articleData";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";

const RELATED_ARTICLE_IDS = ["science-of-pulse-diagnosis", "science-of-abdominal-diagnosis", "science-of-tongue-diagnosis"];

const SELF_CHECK_TITLE = "気血水 体質チェック（12問）｜伝統分類を学ぶ";
const SELF_CHECK_DESCRIPTION = "12の質問を通して、気虚・気滞・血虚・瘀血・水滞・陽虚という6つの伝統的な分類を学ぶチェックです。当てはまる回答がなければ分類は表示されません。病気の診断には使えません。";
const GOROU_TITLE = "五労チェッカー（久視・久臥・久坐・久立・久行）｜東洋医学セルフチェック";
const GOROU_DESCRIPTION = "『素問』宣明五気篇の五労に照らして、長く続く生活動作と休憩の取り方を振り返る学習用チェック。臓器の異常や病気を判定する検査ではありません。";
const GOROU_TABS = ["gorou", "workstyle", "checker"];

interface Props {
  searchParams: Promise<{ tab?: string | string[] }>;
}

function getCheckPage(tab: string | string[] | undefined) {
  const mode = Array.isArray(tab) ? tab[0] : tab;
  const isGorou = GOROU_TABS.includes(mode ?? "");
  return {
    mode,
    isGorou,
    path: isGorou ? "/diagnosis?tab=gorou" : "/diagnosis",
    title: isGorou ? GOROU_TITLE : SELF_CHECK_TITLE,
    description: isGorou ? GOROU_DESCRIPTION : SELF_CHECK_DESCRIPTION,
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { title, description, path } = getCheckPage((await searchParams).tab);

  return {
    title,
    description,
    alternates: { canonical: SITE_ORIGIN + path },
    ...pageSocialMetadata(title, description, path),
  };
}

export default async function DiagnosisPage({ searchParams }: Props) {
  const { mode, isGorou, title, description, path } = getCheckPage((await searchParams).tab);
  // The public site currently offers two study tools. Keep old interview bookmarks recoverable.
  if (mode === "clinical") redirect("/diagnosis");

  const url = SITE_ORIGIN + path;
  const revisedAt = PAGE_REVISIONS[path];
  const breadcrumbId = url + "#breadcrumbs";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "LearningResource"],
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "ja",
        dateModified: revisedAt,
        learningResourceType: "学習用セルフチェック",
        isPartOf: { "@id": SITE_ORIGIN + "/#website" },
        publisher: { "@id": SITE_ORIGIN + "/#organization" },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: SITE_ORIGIN,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "臨床演習",
            item: SITE_ORIGIN + "/clinical",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: isGorou ? "五労チェッカー" : "気血水 体質チェック",
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DiagnosisClient
        initialTab={isGorou ? "gorou" : "self"}
        relatedArticles={getArticlePreviews(RELATED_ARTICLE_IDS)}
        studyLinks={getDiagnosisStudyLinks()}
      >
        <LearningCredits revisedAt={revisedAt} />
      </DiagnosisClient>
    </>
  );
}
