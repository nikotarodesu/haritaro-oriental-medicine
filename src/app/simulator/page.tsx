import { SHARED_OG_IMAGES, SITE_NAME } from "@/config/seo";
import { Metadata } from "next";
import Link from "next/link";
import SimulatorHub from "@/components/SimulatorHub";
import { getArticlePreviews } from "@/data/articleData";

export const metadata: Metadata = {
  title: "臨床弁証推論シミュレーター｜八綱・気血水・臓腑の連動分析",
  description:
    "学生向けの東洋医学学習ツール。3つの架空症例を6段階で検討し、追加問診、安全確認、弁証候補、配穴の根拠、再評価を練習。所見の矛盾や情報不足も確認できます。",
  alternates: {
    canonical: "https://www.haritaro.jp/simulator",
  },
  openGraph: {
      images: SHARED_OG_IMAGES,
    siteName: SITE_NAME,
    title: `臨床弁証推論シミュレーター｜八綱・気血水・臓腑の連動分析 | ${SITE_NAME}`,
    description:
      "3つの架空症例を6段階で検討。追加問診、安全確認、弁証候補、配穴の根拠、再評価を学ぶ学生向けのシミュレーターです。",
    url: "https://www.haritaro.jp/simulator",
  },
};

export default function SimulatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.haritaro.jp/simulator#app",
        url: "https://www.haritaro.jp/simulator",
        name: "東洋医学 臨床弁証推論シミュレーター",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        description: "架空症例の段階式演習と、四診所見に基づく伝統医学上の候補・矛盾・情報不足を整理する教育用ツール。実際の患者の診断や個別の治療指示には使用しません。",
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
            name: "臨床弁証シミュレーター",
            item: "https://www.haritaro.jp/simulator",
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-14 space-y-6 sm:space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
        <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
          ホーム
        </Link>
        <span>/</span>
        <span className="text-[#232826] dark:text-[#FAF8F5] font-semibold">
          臨床弁証シミュレーター
        </span>
      </nav>

      {/* シミュレーター統合ハブ */}
      <SimulatorHub relatedArticles={getArticlePreviews([
        "science-of-yinyang-gogyo",
        "science-of-kampo-network-pharmacology",
        "science-of-qi-blood-fluid",
      ])} />
    </div>
  );
}
