import { ArrowRight, GitCompare } from "lucide-react";
import Link from "next/link";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import { getAcupointByCode } from "@/data/tsubo";
import { ATLAS_ARTICLES } from "@/data/tsubo/atlas/articles";
import { ACUPOINT_PAIRS_PATH, FEATURED_ACUPOINT_PAIRS_ANCHOR, featuredPairAnchor, featuredPairPreview, getFeaturedPairs, type FeaturedPair } from "@/data/tsubo/atlas/featuredPairs";
import { atlasLearningPairHref } from "@/data/tsubo/atlas/learningPairs";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import type { AcupointMaster } from "@/data/tsubo/types";
import { normalizeSearchText } from "@/utils/search";
import AcupointPairDirectory from "./AcupointPairDirectory";
import HeguHandDiagram from "./atlas/HeguHandDiagram";
import { PointAtlasThumbnail } from "./atlas/PointAtlasDiagrams";
import styles from "./FeaturedAcupointPairs.module.css";

const evidenceGroups = [
  { id: "clinical-studies", label: "臨床試験で使われた組み合わせ", kind: "research" },
  { id: "practice-records", label: "診療録で確認できた組み合わせ", kind: "observational" },
  { id: "classical-texts", label: "古典に出てくる組み合わせ", kind: "classic" },
  { id: "similar-names", label: "名前が似ているツボ", kind: "name" },
] as const;
const evidenceLabel = {
  name: "名前と使われ方",
  classic: "古典での使われ方",
  research: "試験で調べたこと",
  observational: "診療での使われ方",
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

function PairCard({ pair }: { pair: FeaturedPair }) {
  const [firstId, secondId] = pair.pointIds;
  const first = getAcupointByCode(firstId);
  const second = getAcupointByCode(secondId);
  if (!first || !second) return null;

  return (
    <article className={`${styles.card} atlas-target`} id={featuredPairAnchor(pair.id)}>
      <h3>{pair.name}</h3>
      <div className={styles.points}>
        <PairPointLink point={first} />
        <PairPointLink point={second} />
      </div>
      <dl className={styles.takeaways}>
        <div>
          <dt>{evidenceLabel[pair.kind]}</dt>
          <dd>{pair.summary}</dd>
        </div>
        <div>
          <dt>効果はどこまで分かる？</dt>
          <dd>{pair.evidenceSummary}</dd>
        </div>
      </dl>
      <a
        className={styles.compare}
        href={atlasLearningPairHref(pair.pointIds)}
        aria-label={`${first.name}と${second.name}の位置を並べて見る`}
        data-analytics-action="atlas_compare"
      >
        <GitCompare size={17} aria-hidden="true" />
        位置を並べて見る
      </a>
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

export default function FeaturedAcupointPairs({ pointCode, directory = false }: {
  pointCode?: string;
  directory?: boolean;
}) {
  const pairs = directory || pointCode ? getFeaturedPairs(pointCode) : featuredPairPreview;
  if (!pairs.length) return null;

  if (directory) {
    const sections = evidenceGroups.map(({ id, label, kind }) => ({
      id,
      label,
      entries: pairs.filter(pair => pair.kind === kind).map(pair => ({
        anchor: featuredPairAnchor(pair.id),
        name: pair.name,
        codes: pair.pointIds,
        searchText: normalizeSearchText([
          pair.name, pair.summary, pair.evidenceSummary,
          ...pair.pointIds.map(code => getAcupointByCode(code)?.kana),
        ].join(" ")),
        card: <PairCard pair={pair} />,
      })),
    }));
    return (
      <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className={`${styles.groups} atlas-target`}>
        <AcupointPairDirectory sections={sections} />
      </div>
    );
  }

  const sections = [
    { id: `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-combinations`, label: "ツボの組み合わせ", pairs: pairs.filter(pair => pair.kind !== "name") },
    { id: `${FEATURED_ACUPOINT_PAIRS_ANCHOR}-names`, label: "名前が似ているツボ", pairs: pairs.filter(pair => pair.kind === "name") },
  ].filter(section => section.pairs.length > 0);
  const Heading = pointCode ? "h3" : "h2";
  const directoryLink = (
    <a href={ACUPOINT_PAIRS_PATH} className={`atlas-text-action ${pointCode ? "" : styles.directoryLink}`}>
      すべての組み合わせを見る<ArrowRight size={16} aria-hidden="true" />
    </a>
  );
  const groups = (
    <div className={styles.groups}>
      {!pointCode && directoryLink}
      {sections.map(({ id, label, pairs }) => (
        <section key={id} id={id} className="atlas-target" aria-label={label}>
          {(!pointCode || sections.length > 1) && <Heading className="atlas-section-title">{label}</Heading>}
          <div className={styles.cards}>
            {pairs.map(pair => <PairCard key={pair.id} pair={pair} />)}
          </div>
        </section>
      ))}
      {pointCode && directoryLink}
    </div>
  );

  if (pointCode) {
    const title = sections.length === 1 ? sections[0].label : "ツボの組み合わせと似た名前";
    return (
      <HashTargetDetails
        id={FEATURED_ACUPOINT_PAIRS_ANCHOR}
        className="atlas-disclosure atlas-evidence-disclosure atlas-target"
        summary={<h2>{title}</h2>}
        open
      >
        {groups}
      </HashTargetDetails>
    );
  }

  return <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className="atlas-target">{groups}</div>;
}
