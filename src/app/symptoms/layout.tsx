import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import React from "react";
import { SYMPTOMS } from "@/data/symptomData";

export const metadata: Metadata = {
  title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア",
  description:
    "頭・首・肩の凝り、自律神経・不眠、胃腸疲労、女性特有の不調など、お悩み別の原因弁証と効果的なツボ・セルフケア配穴ガイド。東洋医学と現代医学の統合的アプローチで解説。",
  alternates: {
    canonical: "/symptoms",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
      siteName: SITE_NAME,
    title: "お悩み・症状別ツボ検索ガイド｜頭痛・肩こり・不眠・胃腸の東洋医学ケア",
    description: "症状別の原因弁証と効果的なツボ・セルフケア配穴ガイド。統合的アプローチで解説。",
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
        description: "お悩み別の原因弁証と効果的なツボ・セルフケア配穴ガイド。東洋医学と現代医学の統合的アプローチで解説。",
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
