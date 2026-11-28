import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AtlasDictionaryReturnLink from "@/components/tsubo/AtlasDictionaryReturnLink";
import { ComparisonGuideFigure } from "@/components/tsubo/atlas/ComparisonGuideFigure";
import { SERIES } from "@/config/series";
import { pageSocialMetadata, seriesPageTitle, SITE_AUTHOR, SITE_ORIGIN } from "@/config/seo";
import { getAcupointByCode } from "@/data/tsubo";
import { NEARBY_COMPARISONS } from "@/data/tsubo/atlas/nearbyComparisons";
import { ATLAS_COMPARISON_GUIDES, ATLAS_COMPARISON_GUIDES_REVISED_AT } from "@/data/tsubo/atlas/nearbyComparisonGuides";
import { WHO_ATLAS_PDF, whoAtlasPages } from "@/data/tsubo/atlas/whoAtlasPages";
import { comparisonSelectionHref } from "../selection";
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

  const points = comparison.points.flatMap(({ code }) => {
    const point = getAcupointByCode(code);
    return point ? [{ code, name: point.name, codeLabel: point.code }] : [];
  });
  const pointNotes: Readonly<Partial<Record<string, string>>> | undefined = guide.pointNotes;
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
        author: SITE_AUTHOR,
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
      </header>

      <ComparisonGuideFigure guide={guide} />

      <section aria-labelledby="compared-points">
        <h2 id="compared-points" className="atlas-section-title">詳しい位置図</h2>
        <ul className={styles.points} role="list">
          {points.map(({ code, codeLabel, name }) => (
            <li key={code}>
              <Link href={`/tsubo/${code}#acupoint-location`} className={styles.pointLink} prefetch={false}>
                <span><strong>{name}</strong><small>{codeLabel}</small></span><ArrowRight size={16} aria-hidden="true" />
              </Link>
              {pointNotes?.[code] && <p>{pointNotes[code]}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.landmarks} aria-labelledby="comparison-landmarks">
        <h2 id="comparison-landmarks" className="atlas-section-title">{guide.landmarkHeading}</h2>
        <p>{guide.landmark}</p>
        {guide.note && <p>{guide.note}</p>}
        {(guide.id === "forearm" || guide.id === "shin") && <Link href="/tsubo/basics/bone-cun#bone-cun-table" className="atlas-text-action">寸の測り方を見る</Link>}
      </section>

      <nav className={styles.related} aria-labelledby="comparison-related">
        <h2 id="comparison-related" className="atlas-section-title">続けて比べる</h2>
        <ul role="list">
          <li><Link href={comparisonSelectionHref(points.map(({ code }) => code))} className="atlas-text-action" prefetch={false}>この3穴の注意点・経絡を比べる</Link></li>
          {ATLAS_COMPARISON_GUIDES.filter(({ id }) => id !== guide.id).map(({ href, title }) => (
            <li key={href}><Link href={href} className="atlas-text-action" prefetch={false}>{title}</Link></li>
          ))}
        </ul>
      </nav>

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
