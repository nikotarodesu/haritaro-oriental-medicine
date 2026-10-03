import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";
import { SYMPTOMS } from "@/data/symptomData";

const pageDescription = "頭痛・肩こり・不眠・胃腸の不調など、症状別に受診の目安、日常生活の見直し、伝統的な経穴の位置と注意事項を確認するセルフケア学習ガイド。原因の診断や治療の代替にはなりません。";

export const metadata: Metadata = {
  title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア",
  description: pageDescription,
  alternates: {
    canonical: "/symptoms",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア",
    description: pageDescription,
    url: "https://www.haritaro.jp/symptoms",
  },
};

export default function SymptomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "MedicalWebPage"],
        "@id": "https://www.haritaro.jp/symptoms#webpage",
        url: "https://www.haritaro.jp/symptoms",
        name: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア",
        description: pageDescription,
        inLanguage: "ja",
        about: SYMPTOMS.slice(0, 10).map((s) => ({
          "@type": "MedicalCondition",
          name: s.title,
          description: s.summary,
          possibleTreatment: [
            {
              "@type": "MedicalTherapy",
              name: "鍼灸・ツボ指圧・温灸セルフケア",
            },
          ],
        })),
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
            name: "お悩み・症状別セルフケアガイド",
            item: "https://www.haritaro.jp/symptoms",
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
      {children}
    </>
  );
}
