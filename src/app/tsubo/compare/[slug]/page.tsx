import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AtlasDictionaryReturnLink from "@/components/tsubo/AtlasDictionaryReturnLink";
import NearbyComparisonArtwork from "@/components/tsubo/atlas/NearbyComparisonArtwork";
import { SERIES } from "@/config/series";
import { pageSocialMetadata, seriesPageTitle, SITE_ORIGIN } from "@/config/seo";
import { getAcupointByCode } from "@/data/tsubo";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { comparisonSize, NEARBY_COMPARISONS } from "@/data/tsubo/atlas/nearbyComparisons";
import { ATLAS_COMPARISON_GUIDES, ATLAS_COMPARISON_GUIDES_REVISED_AT } from "@/data/tsubo/atlas/nearbyComparisonGuides";
import { WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import styles from "./comparison-guide.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ATLAS_COMPARISON_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = ATLAS_COMPARISON_GUIDES.find(entry => entry.slug === slug);
  if (!guide) return {};
  const title = seriesPageTitle(`${guide.title}｜ツボの位置を図で比較`, "dictionary");
  return {
    title,
    description: guide.description,
    alternates: { canonical: guide.href },
    ...pageSocialMetadata(title, guide.description, guide.href),
  };
}

export default async function ComparisonGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = ATLAS_COMPARISON_GUIDES.find(entry => entry.slug === slug);
  if (!guide) notFound();
  const comparison = NEARBY_COMPARISONS.find(entry => entry.id === guide.id);
  if (!comparison) notFound();

  const points = comparison.points.flatMap(position => {
    const point = getAcupointByCode(position.code);
    const distance = guide.id === "shin" ? ATLAS_POINT_MARKERS[position.code]?.boneCun : undefined;
    return point ? [{ ...position, name: point.name, codeLabel: point.code, distance }] : [];
  });
  const { width, height } = comparison.size ?? comparisonSize;
  const sourcePoints = [
    ...points,
    ...(comparison.referenceCodes ?? []).flatMap(code => {
      const point = getAcupointByCode(code);
      return point ? [{ code, name: point.name }] : [];
    }),
  ];
  const sources = [...new Set(sourcePoints.map(({ code }) => whoAtlasPages[code]))].map(page => ({
    url: `${WHO_ATLAS_PDF}#page=${page}`,
    name: `WHO標準経穴部位 p.${page - 9}（${sourcePoints.filter(({ code }) => whoAtlasPages[code] === page).map(({ name }) => name).join("・")}、PDF）`,
  }));
  const url = SITE_ORIGIN + guide.href;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: guide.title,
        description: guide.description,
        inLanguage: "ja",
        author: { "@type": "Person", name: "はり太郎", url: SITE_ORIGIN + "/about" },
        publisher: { "@id": SITE_ORIGIN + "/#organization" },
        dateModified: ATLAS_COMPARISON_GUIDES_REVISED_AT,
        citation: sources.map(source => ({ "@type": "CreativeWork", ...source })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SERIES.dictionary.name, item: SITE_ORIGIN + "/tsubo" },
          { "@type": "ListItem", position: 2, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className={`page-layout atlas-page ${styles.guide}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <nav className="atlas-breadcrumb" aria-label="パンくず">
          <AtlasDictionaryReturnLink>{SERIES.dictionary.name}</AtlasDictionaryReturnLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">ツボの比較</span>
        </nav>
        <h1>{guide.title}</h1>
        <p>{guide.summary}</p>
      </header>

      <figure className={styles.figure}>
        <div className="atlas-comparison-figure">
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={comparison.figureLabel} data-atlas-comparison-figure={comparison.id}>
            <NearbyComparisonArtwork id={comparison.id} />
            {points.map(({ code, position: [x, y], leader: [endX, endY], button: [labelX, labelY], name, distance }) => (
              <g key={code} className="atlas-comparison-marker" data-selected="true">
                <path d={`M${x} ${y}L${endX} ${endY}`} />
                <circle cx={x} cy={y} r="4.5" />
                <rect className={styles.labelBox} x={labelX} y={labelY - (distance ? 22 : 13)} width="60" height={distance ? 44 : 26} rx="6" />
                <text className={styles.label} x={labelX + 30} y={labelY + (distance ? -3 : 5)} textAnchor="middle">{name}</text>
                {distance != null && <text x={labelX + 30} y={labelY + 15} textAnchor="middle">{distance}寸</text>}
              </g>
            ))}
          </svg>
        </div>
        <figcaption>{guide.caption}</figcaption>
      </figure>

      <section aria-labelledby="compared-points">
        <h2 id="compared-points" className="atlas-section-title">ツボごとの位置</h2>
        <ul className={styles.points}>
          {points.map(({ code, codeLabel, name, difference }) => (
            <li key={code}>
              <Link href={`/tsubo/${code}#acupoint-location`} className={styles.pointLink} prefetch={false}>
                <strong>{name}</strong><span>{codeLabel}</span><ArrowRight size={16} aria-hidden="true" />
              </Link>
              <p>{difference}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.landmarks} aria-labelledby="comparison-landmarks">
        <h2 id="comparison-landmarks" className="atlas-section-title">{guide.landmarkHeading}</h2>
        <p>{guide.landmark}</p>
        <p>{guide.note}</p>
        {(guide.id === "forearm" || guide.id === "shin") && <Link href="/tsubo/basics/bone-cun#bone-cun-table" className="atlas-text-action">寸の測り方を見る</Link>}
      </section>

      <section className={styles.sources} aria-labelledby="comparison-sources">
        <h2 id="comparison-sources" className="atlas-section-title">位置の出典</h2>
        <ul>
          {sources.map(source => <li key={source.url}><a href={source.url} className="atlas-text-action">{source.name}</a></li>)}
        </ul>
        <p>図はWHOの位置基準をもとにした模式図です。</p>
      </section>
    </article>
  );
}
