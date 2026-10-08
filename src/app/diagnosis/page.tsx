import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import DiagnosisClient from "@/components/diagnosis/DiagnosisClient";
import { getArticlePreviews } from "@/data/articleData";

const RELATED_ARTICLE_IDS = ["science-of-pulse-diagnosis", "science-of-abdominal-diagnosis", "science-of-tongue-diagnosis"];

const SELF_CHECK_TITLE = "気血水 体質セルフチェック（12問）｜伝統分類を学ぶ";
const SELF_CHECK_DESCRIPTION = "12問の回答をもとに、気虚・気滞・血虚・瘀血・水滞・陽虚の伝統的な分類を学ぶ無料セルフチェック。回答上の傾向と養生の学習資料を表示し、該当項目がなければ分類を保留します。病気や体質の確定、治療・ツボの効果判定には使えません。";
const CLINICAL_CHECK_TITLE = "気血水 対面問診メモ｜伝統分類の学習・記録補助";
const CLINICAL_CHECK_DESCRIPTION = "対面で聞き取った回答やメモを、気血水の伝統的な分類に沿って整理する記録補助ツール。回答だけで診断や施術方針を確定するものではなく、診察・医学的評価に基づく確認が必要です。";

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

  const isClinical = params.tab === "clinical";
  const title = isClinical ? CLINICAL_CHECK_TITLE : SELF_CHECK_TITLE;
  const description = isClinical ? CLINICAL_CHECK_DESCRIPTION : SELF_CHECK_DESCRIPTION;
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
      title,
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
    : isClinical ? CLINICAL_CHECK_TITLE : SELF_CHECK_TITLE;
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
          : isClinical ? CLINICAL_CHECK_DESCRIPTION : SELF_CHECK_DESCRIPTION,
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
