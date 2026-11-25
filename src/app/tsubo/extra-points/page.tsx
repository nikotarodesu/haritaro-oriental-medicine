import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import { collectionPageJsonLd, pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import { EXTRA_POINTS, EXTRA_POINTS_PATH } from "@/data/tsubo/extraPoints";
import { KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";
import ExtraPointDiagram from "./ExtraPointDiagram";
import styles from "./extra-points.module.css";

const title = "奇穴の図鑑";
const pageTitle = seriesPageTitle("奇穴の図鑑｜印堂・太陽の場所", "dictionary");
const description = "眉間の印堂（EX-HN3）と、こめかみの太陽（EX-HN5）。顔の図と目印から位置を確かめ、奇穴の名称とコードを調べられます。";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description,
  ...pageSocialMetadata(pageTitle, description, EXTRA_POINTS_PATH),
  alternates: { canonical: EXTRA_POINTS_PATH },
};

export default function ExtraPointsIndex() {
  const schema = collectionPageJsonLd(EXTRA_POINTS_PATH, title, description, "奇穴", EXTRA_POINTS);
  return (
    <div className={`page-layout atlas-page ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <header className={styles.header}>
        <PageBreadcrumb items={[{ href: "/tsubo", name: "はり太郎のツボ図鑑" }, { href: EXTRA_POINTS_PATH, name: title }]} />
        <h1>{title}</h1>
        <p>奇穴（きけつ）は、十四経脈に属する経穴とは別に名前と位置が伝えられてきたツボです。この図鑑では、WHO西太平洋地域の標準361経穴と分けて掲載しています。</p>
        <Link href={KEY_POINT_TYPES_GUIDE} className="atlas-text-action">標準経穴とツボの分類を読む<ArrowRight size={16} aria-hidden="true" /></Link>
      </header>
      <section aria-labelledby="extra-points-heading">
        <h2 id="extra-points-heading" className={styles.sectionTitle}>顔の奇穴</h2>
        <ul className={styles.cards}>
          {EXTRA_POINTS.map(point => (
            <li key={point.slug}>
              <Link href={point.href} className={styles.pointCard}>
                <div className={styles.thumbnail}><ExtraPointDiagram point={point} decorative /></div>
                <div className={styles.cardCopy}>
                  <span className={styles.code}>{point.code}</span>
                  <h3>{point.name}<small>{point.kana}</small></h3>
                  <p>{point.description}</p>
                  <ArrowRight className={styles.cardArrow} size={19} aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Link className="atlas-text-action" href="/tsubo">361経穴の図鑑へ<ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  );
}
