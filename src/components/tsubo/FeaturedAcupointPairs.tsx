import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import { getAcupointByCode } from "@/data/tsubo";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { ACUPOINT_PAIRS_PATH, FEATURED_ACUPOINT_PAIRS_ANCHOR, featuredPairAnchor, featuredPairPreview, getFeaturedPairs, type FeaturedPair } from "@/data/tsubo/atlas/featuredPairs";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import type { AcupointMaster } from "@/data/tsubo/types";
import { normalizeSearchText } from "@/utils/search";
import AcupointPairDirectory, { PairComparisonLink } from "./AcupointPairDirectory";
import HeguHandDiagram from "./atlas/HeguHandDiagram";
import { PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import styles from "./FeaturedAcupointPairs.module.css";

const evidenceGroups = [
  { id: "clinical-studies", label: "臨床試験で使われた組み合わせ", shortLabel: "臨床試験", countUnit: "組", kind: "research" },
  { id: "practice-records", label: "診療録で確認できた組み合わせ", shortLabel: "診療録", countUnit: "組", kind: "observational" },
  { id: "classical-texts", label: "古典に出てくる組み合わせ", shortLabel: "古典", countUnit: "組", kind: "classic" },
  { id: "similar-names", label: "名前が似ているツボ", shortLabel: "似た名前", countUnit: "件", kind: "name" },
] as const;
const evidenceLabel = {
  name: "名前と位置の違い",
  classic: "古典での使われ方",
  research: "調べたこと",
  observational: "診療録での使用例",
};

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

export function PairCard({ pair, compact = false, initiallyOpen, children }: {
  pair: FeaturedPair;
  compact?: boolean;
  initiallyOpen?: boolean;
  children?: ReactNode;
}) {
  const [firstId, secondId] = pair.pointIds;
  const first = getAcupointByCode(firstId);
  const second = getAcupointByCode(secondId);
  if (!first || !second) return null;
  const hasClassic = pair.details.some(detail => detail.label.includes("古典"));
  const hasStudy = pair.details.some(detail => !detail.label.includes("古典"));
  const detailsLabel = hasClassic && hasStudy ? "古典の記述・研究の詳細と出典"
    : hasClassic ? "古典の記述と出典"
    : pair.kind === "observational" ? "診療録の詳細と出典"
    : "研究の詳細と出典";
  const resultLabel = pair.kind === "observational" ? "記録から分かる範囲"
    : pair.kind === "research" ? "結果"
    : hasStudy ? "研究の概要" : "資料から分かる範囲";

  const content = (
    <>
      <div className={styles.points}>
        <PairPointLink point={first} />
        <PairPointLink point={second} />
      </div>
      <PairComparisonLink pairId={pair.id} codes={pair.pointIds} label={`${first.name}と${second.name}の位置を並べて見る`} />
      {pair.evidenceHighlights && <p>{pair.summary}</p>}
      <dl className={styles.takeaways}>
        {pair.evidenceHighlights ? (
          pair.evidenceHighlights.map(({ label, text }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{text}</dd>
            </div>
          ))
        ) : (
          <>
            <div>
              <dt>{evidenceLabel[pair.kind]}</dt>
              <dd>{pair.summary}</dd>
            </div>
            {pair.evidenceSummary && (
              <div>
                <dt>{resultLabel}</dt>
                <dd>{pair.evidenceSummary}</dd>
              </div>
            )}
          </>
        )}
        {pair.limits && (
          <div className={styles.limits}>
            <dt>この結果の範囲</dt>
            <dd>{pair.limits}</dd>
          </div>
        )}
      </dl>
      {pair.details.length > 0 && (
        <details className={`${styles.details} atlas-disclosure`}>
          <summary>{detailsLabel}</summary>
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
      {children}
    </>
  );
  if (compact) {
    return (
      <HashTargetDetails id={featuredPairAnchor(pair.id)} className={`atlas-disclosure atlas-target ${styles.pointRow}`}
        open={initiallyOpen} summary={<h3>{pair.name}</h3>}>
        <div className={styles.rowBody}>{content}</div>
      </HashTargetDetails>
    );
  }
  return (
    <article className={`${styles.card}${pair.evidenceHighlights ? ` ${styles.featuredCard}` : ""} atlas-target`} id={featuredPairAnchor(pair.id)} tabIndex={-1}>
      <h3>{pair.name}</h3>
      {content}
    </article>
  );
}

export default function FeaturedAcupointPairs({ directory = false }: {
  directory?: boolean;
}) {
  const pairs = directory ? getFeaturedPairs() : featuredPairPreview;
  if (!pairs.length) return null;

  if (directory) {
    const sections = evidenceGroups.map(({ id, label, shortLabel, countUnit, kind }) => ({
      id,
      label,
      shortLabel,
      countUnit,
      entries: pairs.filter(pair => pair.kind === kind).map(pair => ({
        anchor: featuredPairAnchor(pair.id),
        name: pair.name,
        codes: pair.pointIds,
        searchText: normalizeSearchText([
          pair.name, pair.summary, pair.evidenceSummary, pair.limits, ...(pair.evidenceHighlights ?? []).map(({ text }) => text),
          ...pair.pointIds.map(code => getAcupointByCode(code)?.kana),
        ].join(" ")),
        card: <PairCard pair={pair} />,
      })),
    }));
    return (
      <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className={`${styles.groups} ${styles.directoryPage} atlas-target`}>
        <AcupointPairDirectory sections={sections} />
      </div>
    );
  }

  const sections = [
    { id: `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-combinations`, label: "ツボの組み合わせ", pairs: pairs.filter(pair => pair.kind !== "name") },
    { id: `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-names`, label: "名前が似ているツボ", pairs: pairs.filter(pair => pair.kind === "name") },
  ].filter(section => section.pairs.length > 0);
  return (
    <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className="atlas-target">
      <div className={styles.groups}>
        <a href={ACUPOINT_PAIRS_PATH} className={`atlas-text-action ${styles.directoryLink}`}>ツボの組み合わせを見る<ArrowRight size={16} aria-hidden="true" /></a>
        {sections.map(({ id, label, pairs }) => (
          <section key={id} id={id} className="atlas-target" aria-label={label}>
            <h2 className="atlas-section-title">{label}</h2>
            <div className={styles.cards}>
              {pairs.map(pair => <PairCard key={pair.id} pair={pair} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
