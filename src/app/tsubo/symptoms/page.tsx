import type { Metadata } from "next";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { TRADITIONAL_SYMPTOMS, TSUBO_SYMPTOM_INDEX_PATH } from "@/data/tsubo/atlas/traditionalSymptomIndex";
import SymptomDirectory from "./SymptomDirectory";
import styles from "./symptom-atlas.module.css";

const heading = "症状からツボを探す";
const title = seriesPageTitle(heading, "dictionary");
const description = "伝統資料に記載された症状から、ツボの名前と位置、記載の出典を調べられます。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: TSUBO_SYMPTOM_INDEX_PATH },
  ...pageSocialMetadata(title, description, TSUBO_SYMPTOM_INDEX_PATH),
};

export default function TsuboSymptomIndexPage() {
  return (
    <article className={`page-layout atlas-page ${styles.page}`}>
      <PageBreadcrumb items={[
        { href: "/tsubo", name: "ツボ図鑑" },
        { href: TSUBO_SYMPTOM_INDEX_PATH, name: heading },
      ]} />
      <header className={styles.heading}>
        <h1>{heading}</h1>
        <p>{description}</p>
      </header>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionPageJsonLd(
        TSUBO_SYMPTOM_INDEX_PATH, heading, description, "伝統資料に記載された症状",
        TRADITIONAL_SYMPTOMS.map(({ href, label }) => ({ href, name: label })),
      ) }} />
      <SymptomDirectory entries={TRADITIONAL_SYMPTOMS.map(({ label, href, points }) => ({ label, href, count: points.length }))} />
    </article>
  );
}
