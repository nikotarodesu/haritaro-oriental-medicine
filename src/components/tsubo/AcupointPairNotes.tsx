import Link from "next/link";
import { getAcupointByCode } from "@/data/tsubo";
import { getAcupointStudies, getClassicalCombinations } from "@/data/tsubo/atlas/evidence";
import { ACUPOINT_PAIRS_PATH, FEATURED_ACUPOINT_PAIRS_ANCHOR, getFeaturedPairs } from "@/data/tsubo/atlas/featuredPairs";
import type { AcupointMaster } from "@/data/tsubo/types";
import { PairCard } from "./FeaturedAcupointPairs";
import styles from "./FeaturedAcupointPairs.module.css";

function combinationStudies(code: string) {
  return getAcupointStudies(code).filter(study =>
    study.kind === "combination" && study.points.length > 1 && study.points.includes(code),
  );
}

export function hasPointPairs({ codeLower: code }: AcupointMaster) {
  return getFeaturedPairs(code).some(pair => pair.kind !== "name")
    || getClassicalCombinations(code).length > 0
    || combinationStudies(code).length > 0;
}

export function AcupointNameComparison({ point }: { point: AcupointMaster }) {
  const entries = getFeaturedPairs(point.codeLower).filter(pair => pair.kind === "name");
  if (!entries.length) return null;
  return (
    <div id={hasPointPairs(point) ? undefined : FEATURED_ACUPOINT_PAIRS_ANCHOR} className="atlas-target">
      <h3 id={`${FEATURED_ACUPOINT_PAIRS_ANCHOR}-names`} className="atlas-section-title atlas-target">名前が似ているツボ</h3>
      {entries.map(pair => <PairCard key={pair.id} pair={pair} compact />)}
    </div>
  );
}

type ClassicalCombination = ReturnType<typeof getClassicalCombinations>[number];

function ClassicalRecord({ entry }: { entry: ClassicalCombination }) {
  return (
    <div className={styles.record}>
      <p>{entry.explanation}</p>
      <a href={entry.source.url} className="atlas-source-link">{entry.source.label}</a>
    </div>
  );
}

export function AcupointPairNotes({ point }: { point: AcupointMaster }) {
  const code = point.codeLower;
  const featured = getFeaturedPairs(code).filter(pair => pair.kind !== "name");
  const classical = getClassicalCombinations(code);
  const studies = combinationStudies(code);
  const match = (entry: ClassicalCombination, ids: readonly string[]) =>
    entry.points.length === ids.length && ids.every(id => entry.points.includes(id));
  const classicalOnly = classical.filter(entry => !featured.some(pair => match(entry, pair.pointIds)));

  return (
    <div id={FEATURED_ACUPOINT_PAIRS_ANCHOR} className={`${styles.notes} atlas-target`}>
      {featured.length > 0 && (
        <div id={`${FEATURED_ACUPOINT_PAIRS_ANCHOR}-combinations`} className="atlas-target">
          {featured.map(pair => (
            <PairCard key={pair.id} pair={pair} compact initiallyOpen>
              {classical.filter(entry => match(entry, pair.pointIds)).map(entry => <ClassicalRecord key={entry.source.url} entry={entry} />)}
            </PairCard>
          ))}
        </div>
      )}
      {classicalOnly.length > 0 && (
        <div>
          <h3 className="atlas-section-title">古典に書かれた組み合わせ</h3>
          {classicalOnly.map(entry => (
            <div key={entry.points.join("-")} className={styles.classicalRow}>
              <ul className="atlas-research-points" aria-label="組み合わせに含まれるツボ">
                {entry.points.map(id => {
                  const item = getAcupointByCode(id);
                  if (!item) return null;
                  return <li key={id}>{id === code ? <strong>{item.name} {item.code}</strong> : <Link href={`/tsubo/${id}`} prefetch={false}>{item.name} {item.code}</Link>}</li>;
                })}
              </ul>
              <ClassicalRecord entry={entry} />
            </div>
          ))}
        </div>
      )}
      {studies.length > 0 && (
        <details className={`atlas-disclosure ${styles.pointRow}`} open>
          <summary>複数のツボを扱った研究（{studies.length}件）</summary>
          <ul className={styles.studyRows}>
            {studies.map(study => (
              <li key={study.id}>
                <a href={`#${study.id}`}>
                  <strong>{study.topic}</strong>
                  <span>{study.points.map(id => getAcupointByCode(id)?.name ?? id).join("・")}</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
      <Link href={ACUPOINT_PAIRS_PATH} className="atlas-text-action">組み合わせの一覧を見る</Link>
    </div>
  );
}
