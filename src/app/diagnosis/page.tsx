import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import DiagnosisClient from "@/components/diagnosis/DiagnosisClient";
import { getArticlePreviews } from "@/data/articleData";

const RELATED_ARTICLE_IDS = ["science-of-pulse-diagnosis", "science-of-abdominal-diagnosis", "science-of-tongue-diagnosis"];

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const isGorou =
    params.tab === "gorou" ||
    params.tab === "workstyle" ||
    params.tab === "checker";

  if (isGorou) {
    const title = "五労チェッカー（久視・久臥・久坐・久立・久行）｜東洋医学セルフチェック";
    const description =
      "『素問』宣明五気篇の五労（久視・久臥・久坐・久立・久行）を参考に、作業や生活動作の偏りを振り返る学習用チェック。臓器の異常や病気を判定する検査ではありません。";
    const url = "https://www.haritaro.jp/diagnosis?tab=gorou";

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

  const title = "気血水 体質セルフ診断（無料12問）｜東洋医学のタイプ判定＆おすすめツボ・養生法";
  const description =
    "12問の問診に答えるだけで気虚・気滞・血虚・瘀血・水滞・陽虚の6タイプを自動判定。東洋医学・鍼灸の視点からあなたの体質傾向、現れやすいサイン、おすすめの食材・特効ツボ・生活指導・A4印刷シートを無料で提供します。臨床対面問診モード・五労チェッカーも併載。";
  const url = "https://www.haritaro.jp/diagnosis";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
      title: "気血水 体質セルフ診断（無料12問）｜東洋医学のタイプ判定＆おすすめツボ・養生法 | はり太郎",
      description,
      url,
    },
  };
}

export default async function DiagnosisPage({ searchParams }: Props) {
  const params = await searchParams;
  const isGorou =
    params.tab === "gorou" ||
    params.tab === "workstyle" ||
    params.tab === "checker";
  const isClinical = params.tab === "clinical";

  let initialTab: "self" | "clinical" | "gorou" = "self";
  if (isGorou) initialTab = "gorou";
  else if (isClinical) initialTab = "clinical";

  const pageTitle = isGorou
    ? "五労チェッカー（久視・久臥・久坐・久立・久行）｜東洋医学セルフチェック"
    : "気血水 体質セルフ診断（無料12問）｜東洋医学のタイプ判定＆おすすめツボ・養生法";
  const pageUrl = isGorou
    ? "https://www.haritaro.jp/diagnosis?tab=gorou"
    : "https://www.haritaro.jp/diagnosis";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "MedicalWebPage"],
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: isGorou
          ? "五労の伝統的分類を参考に生活動作の偏りを振り返る学習用チェック。臓器や病気を判定する検査ではありません。"
          : "12問の問診に答えるだけで気虚・気滞・血虚・瘀血・水滞・陽虚の6タイプを判定する東洋医学セルフ診断および対面問診ツール。",
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
            item: pageUrl,
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
      <DiagnosisClient initialTab={initialTab} relatedArticles={getArticlePreviews(RELATED_ARTICLE_IDS)} />
    </>
  );
}
