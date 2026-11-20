import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DiagnosisClient from "@/components/diagnosis/DiagnosisClient";
import { getArticlePreviews } from "@/data/articleData";
import { getDiagnosisStudyLinks } from "@/utils/diagnosisStudyLinks";

const RELATED_ARTICLE_IDS = ["science-of-pulse-diagnosis", "science-of-abdominal-diagnosis", "science-of-tongue-diagnosis"];

const SELF_CHECK_TITLE = "気血水 体質セルフチェック（12問）｜伝統分類を学ぶ";
const SELF_CHECK_DESCRIPTION = "12問の回答をもとに、気虚・気滞・血虚・瘀血・水滞・陽虚の伝統的な分類を学ぶ無料セルフチェック。回答上の傾向と養生の学習資料を表示し、該当項目がなければ分類を保留します。病気や体質の確定、治療・ツボの効果判定には使えません。";
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
    title: isGorou ? GOROU_TITLE : SELF_CHECK_TITLE,
    description: isGorou ? GOROU_DESCRIPTION : SELF_CHECK_DESCRIPTION,
    url: isGorou ? "https://www.haritaro.jp/diagnosis?tab=gorou" : "https://www.haritaro.jp/diagnosis",
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { title, description, url } = getCheckPage((await searchParams).tab);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title,
      description,
      url,
    },
  };
}

export default async function DiagnosisPage({ searchParams }: Props) {
  const { mode, isGorou, title, description, url } = getCheckPage((await searchParams).tab);
  // The public site currently offers two study tools. Keep old interview bookmarks recoverable.
  if (mode === "clinical") redirect("/diagnosis");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "MedicalWebPage"],
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "ja",
        provider: {
          "@type": "Organization",
          name: "はり太郎の東洋医学",
          url: "https://www.haritaro.jp",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: "https://www.haritaro.jp",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isGorou ? "五労チェッカー" : "気血水体質チェック",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DiagnosisClient
        initialTab={isGorou ? "gorou" : "self"}
        relatedArticles={getArticlePreviews(RELATED_ARTICLE_IDS)}
        studyLinks={getDiagnosisStudyLinks()}
      />
    </>
  );
}
