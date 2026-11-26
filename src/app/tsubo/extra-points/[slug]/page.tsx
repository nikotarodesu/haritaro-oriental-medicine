import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import PageBreadcrumb from "@/components/design/PageBreadcrumb";
import AcupointUses, { AcupointTraditionalUses } from "@/components/tsubo/AcupointUses";
import RegionalPointAnatomy from "@/components/tsubo/RegionalPointAnatomy";
import { pageSocialMetadata, seriesPageTitle, SITE_AUTHOR, SITE_ORIGIN } from "@/config/seo";
import { EXTRA_POINTS, EXTRA_POINTS_PATH, EXTRA_POINTS_REVISED_AT } from "@/data/tsubo/extraPoints";
import { getRegionalSection } from "@/data/tsubo/regionalSections";
import ExtraPointDiagram from "../ExtraPointDiagram";
import styles from "../extra-points.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EXTRA_POINTS.map(({ slug }) => ({ slug }));
}

async function pointFromParams(params: Props["params"]) {
  const { slug } = await params;
  const point = EXTRA_POINTS.find(entry => entry.slug === slug);
  if (!point) notFound();
  return point;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const point = await pointFromParams(params);
  const title = seriesPageTitle(`${point.name}（${point.kana}・${point.code}）の場所｜奇穴`, "dictionary");
  return {
    title: { absolute: title },
    description: point.description,
    ...pageSocialMetadata(title, point.description, point.href),
    alternates: { canonical: point.href },
  };
}

export default async function ExtraPointPage({ params }: Props) {
  const point = await pointFromParams(params);
  const anatomySection = getRegionalSection(point.code.toLowerCase());
  const [namingSource, positionSource] = point.sources;
  const url = SITE_ORIGIN + point.href;
  const schema = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "LearningResource"],
    "@id": url,
    url,
    name: `${point.name}（${point.code}）の場所`,
    description: point.description,
    inLanguage: "ja",
    learningResourceType: "奇穴の位置",
    dateModified: EXTRA_POINTS_REVISED_AT,
    isPartOf: { "@id": SITE_ORIGIN + EXTRA_POINTS_PATH },
    author: SITE_AUTHOR,
    citation: point.sources.map(source => source.href),
  };

  return (
    <article className={`page-layout atlas-page ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <PageBreadcrumb items={[
          { href: "/tsubo", name: "ツボ図鑑" },
          { href: EXTRA_POINTS_PATH, name: "奇穴の図鑑" },
          { href: point.href, name: point.name },
        ]} />
        <div className={styles.identity}>
          <h1>{point.name}<small>{point.kana}</small></h1>
          <span className={styles.code}>{point.code}</span>
        </div>
        <p>奇穴（きけつ）の図鑑 <span aria-hidden="true">·</span> {point.bodyPart} <span aria-hidden="true">·</span> 中国語の発音（ピンイン） <span lang="zh-Latn">{point.pinyin}</span></p>
        <p>
          {point.classification ?? `WHOの名称案では奇穴「${point.code}」と表記されています。`}{" "}
          <a href={namingSource.href} className="atlas-source-link">WHOの名称資料（PDF）</a>
          {point.classification && <>{" "}<a href={positionSource.href} className="atlas-source-link">中国国家規格（PDF）</a></>}
        </p>
        <nav className="atlas-section-nav" aria-label="このツボのページ内を移動">
          <a href="#acupoint-traditional">使われ方</a>
          <a href="#extra-point-location">場所</a>
          {anatomySection && <a href="#acupoint-anatomy">断面図</a>}
          <a href="#acupoint-study-overview">研究</a>
        </nav>
      </header>

      <AcupointTraditionalUses code={point.code.toLowerCase()} />

      <section id="extra-point-location" className="atlas-target" aria-labelledby="extra-point-location-heading">
        <h2 id="extra-point-location-heading" className={styles.sectionTitle}>{point.name}の位置</h2>
        <div className={styles.location}>
          <figure className={styles.figure}>
            <ExtraPointDiagram point={point} />
            <figcaption>{point.figureCaption}。位置関係を示す模式図です。</figcaption>
          </figure>
          <div className={styles.locationCopy}>
            <p className={styles.position}>{point.position}</p>
            <ul className={styles.key} aria-label="図の印">
              <li><span className={styles.keyWhite} aria-hidden="true" /><span>{point.landmark}（位置の目印）</span></li>
              <li><span className={styles.keyOrange} aria-hidden="true" /><span>{point.name}（{point.code}）</span></li>
            </ul>
            <p className="mt-3 text-sm">
              位置の出典 <a href={positionSource.href} className="atlas-source-link">{positionSource.title}（PDF）</a>
            </p>
          </div>
        </div>
      </section>

      {anatomySection && (
        <RegionalPointAnatomy
          code={point.code}
          name={point.name}
          section={anatomySection}
          locationHref="#extra-point-location"
          surface={<ExtraPointDiagram point={point} />}
        />
      )}

      <section className={styles.section} aria-labelledby="extra-point-nearby-heading">
        <h2 id="extra-point-nearby-heading" className={styles.sectionTitle}>近くにあるツボ</h2>
        <ul className={styles.nearby}>
          {point.nearby.map(nearby => (
            <li key={nearby.code}>
              <Link href={nearby.href}>
                <span><strong>{nearby.name} <span className={styles.nearbyCode}>{nearby.code}</span></strong><small>{nearby.distinction}</small></span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AcupointUses code={point.code.toLowerCase()} />

      <section id="extra-point-sources" className={`atlas-target ${styles.section}`} aria-labelledby="extra-point-sources-heading">
        <h2 id="extra-point-sources-heading" className={styles.sectionTitle}>出典と確認した範囲</h2>
        <ul className={styles.sources}>
          {point.sources.map(source => (
            <li key={source.href}>
              <a href={source.href}>{source.title}<ExternalLink size={15} aria-hidden="true" /></a>
              <p>{source.note} 照合日 <time dateTime={source.checkedAt}>{source.checkedAt}</time></p>
            </li>
          ))}
        </ul>
        <p className={styles.revision}>更新 <time dateTime={EXTRA_POINTS_REVISED_AT}>{EXTRA_POINTS_REVISED_AT}</time></p>
      </section>

      <AuthorSupervisorCard />
      <Link href={EXTRA_POINTS_PATH} className="atlas-text-action">奇穴の一覧へ<ArrowRight size={16} aria-hidden="true" /></Link>
    </article>
  );
}
