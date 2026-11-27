import type { Metadata } from "next";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import FeaturedAcupointPairs from "@/components/tsubo/FeaturedAcupointPairs";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { ACUPOINT_PAIRS_PATH, featuredPairAnchor, featuredPairs } from "@/data/tsubo/atlas/featuredPairs";
import styles from "@/components/tsubo/FeaturedAcupointPairs.module.css";

const title = "ツボの組み合わせ（配穴）";
const pageTitle = seriesPageTitle("ツボの組み合わせ（配穴）｜古典と臨床研究", "dictionary");
const description = "四関穴や八脈交会穴など、古典・診療録・臨床試験に登場するツボの組み合わせを図で比較。何に使われ、効果はどこまで分かっているかを原典と論文から読めます。";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description,
  ...pageSocialMetadata(pageTitle, description, ACUPOINT_PAIRS_PATH),
  alternates: { canonical: ACUPOINT_PAIRS_PATH },
};

export default function AcupointPairsPage() {
  const pairLinks = featuredPairs.map(({ id, name }) => ({
    href: `${ACUPOINT_PAIRS_PATH}#${featuredPairAnchor(id)}`,
    name,
  }));

  return (
    <div className="page-layout atlas-page atlas-directory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        ACUPOINT_PAIRS_PATH, title, description, title, pairLinks,
      ) }} />
      <header className={`atlas-directory-header atlas-directory-intro ${styles.directoryHeader}`}>
        <div>
          <PageBreadcrumb items={[{ href: "/tsubo", name: "はり太郎のツボ図鑑" }, { href: ACUPOINT_PAIRS_PATH, name: title }]} />
          <h1>{title}</h1>
          <p>図の丸印がツボの位置です。古典の記述や試験結果も読めます。試験によっては、掲載したツボと別のツボを一緒に使っています。</p>
        </div>
      </header>
      <FeaturedAcupointPairs directory />
    </div>
  );
}
