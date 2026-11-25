import { ArrowRight, GitCompare } from "lucide-react";
import Link from "next/link";
import { getAcupointByCode } from "@/data/tsubo";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { FEATURED_ACUPOINT_PAIRS_ANCHOR, getFeaturedPairs, type FeaturedPair } from "@/data/tsubo/atlas/featuredPairs";
import { atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import type { AcupointMaster } from "@/data/tsubo/types";
import HeguHandDiagram from "./atlas/HeguHandDiagram";
import { PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import styles from "./FeaturedAcupointPairs.module.css";

function PairPointLink({ point }: { point: AcupointMaster }) {
  const marker = ATLAS_POINT_MARKERS[point.codeLower];
  const illustration = ATLAS_ARTICLES[point.codeLower]?.illustration;

  return (
    <Link className={styles.point} href={`/tsubo/${point.codeLower}#acupoint-location`} prefetch={false}>
      <span className={`${styles.figure} atlas-figure`} aria-hidden="true">
        {point.code === "LI4" ? <HeguHandDiagram thumbnail /> : marker && illustration && (
          <PointAtlasThumbnail point={point} illustration={illustration} marker={marker} />
        )}
      </span>
      <span className={styles.pointLabel}>
        <strong>{point.name}</strong>
        <span>{point.code}</span>
        <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}

function PairCard({ pair }: { pair: FeaturedPair }) {
  const [firstId, secondId] = pair.pointIds;
  const first = getAcupointByCode(firstId);
  const second = getAcupointByCode(secondId);
  if (!first || !second) return null;

  return (
    <article className={`${styles.card} atlas-target`} id={`featured-acupoint-pair-${pair.id}`}>
      <h3>{pair.name}</h3>
      <div className={styles.points}>
        <PairPointLink point={first} />
        <PairPointLink point={second} />
      </div>
      <p className={styles.summary}>{pair.summary}</p>
      <Link
        className={styles.compare}
        href={atlasLearningPairHref(pair.pointIds)}
        prefetch={false}
        aria-label={`${first.name}と${second.name}の位置を並べて見る`}
        data-analytics-action="atlas_compare"
      >
        <GitCompare size={17} aria-hidden="true" />
        位置を並べて見る
      </Link>
      {pair.details.length > 0 && (
        <details className={`${styles.details} atlas-disclosure`}>
          <summary>古典・研究の詳細と出典</summary>
          <dl className={styles.evidence}>
            {pair.details.map(({ label, text, sources }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <p>{text}</p>
                  {sources.length > 0 && (
                    <ul className={styles.sources}>
                      {sources.map(source => (
                        <li key={source.url}>
                          <a href={source.url} data-analytics-action="atlas_source">{source.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </article>
  );
}

export default function FeaturedAcupointPairs({ pointCode }: { pointCode?: string }) {
  const pairs = getFeaturedPairs(pointCode);
  if (!pairs.length) return null;

  const combinations = pairs.filter(pair => pair.kind !== "name");
  const names = pairs.filter(pair => pair.kind === "name");
  const combinationsHeading = `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-combinations`;
  const namesHeading = `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-names`;

  return (
    <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className={`${styles.groups} atlas-target`}>
      {combinations.length > 0 && (
        <section aria-labelledby={combinationsHeading}>
          <h2 id={combinationsHeading} className="atlas-section-title">ツボの組み合わせ</h2>
          <div className={styles.cards}>
            {combinations.map(pair => <PairCard key={pair.id} pair={pair} />)}
          </div>
        </section>
      )}
      {names.length > 0 && (
        <section aria-labelledby={namesHeading}>
          <h2 id={namesHeading} className="atlas-section-title">名前が似ているツボ</h2>
          <div className={styles.cards}>
            {names.map(pair => <PairCard key={pair.id} pair={pair} />)}
          </div>
        </section>
      )}
    </div>
  );
}
