import Link from "next/link";
import { BookOpen, FlaskConical, GitMerge } from "lucide-react";
import { getAcupointByCode } from "@/data/tsubo";
import { getAcupointStudies, getClassicalCombinations, type AtlasStudy } from "@/data/tsubo/atlas/evidence";
import type { AcupointDetail } from "@/data/tsubo/types";

function PointLinks({ codes, currentCode }: { codes: readonly string[]; currentCode?: string }) {
  return (
    <ul className="atlas-research-points">
      {codes.map(code => {
        const point = getAcupointByCode(code);
        if (!point) return null;
        const label = <>{point.name} <span>{point.code}</span></>;
        return <li key={code}>{code === currentCode ? <strong>{label}</strong> : <Link href={`/tsubo/${code}`} prefetch={false}>{label}</Link>}</li>;
      })}
    </ul>
  );
}

export function AtlasStudyCard({ study, currentCode }: { study: AtlasStudy; currentCode?: string }) {
  const label = currentCode && study.comparisonPoints?.includes(currentCode) ? "比較に用いられたツボ"
    : study.kind === "point" ? "一つのツボに着目した研究" : "組み合わせを用いた研究";

  return (
    <article className="atlas-study-card atlas-target" id={study.id}>
      <p className="atlas-study-kind"><FlaskConical size={16} aria-hidden="true" />{label}</p>
      <h3>{study.topic}</h3>
      <p>{study.result}</p>
      <p className="atlas-study-limit">{study.limits}</p>
      {study.kind === "combination" && <PointLinks codes={study.points} currentCode={currentCode} />}
      <details className="atlas-disclosure">
        <summary>研究の対象・出典</summary>
        <div className="atlas-study-details">
          <p>{study.design}</p>
          {study.otherPoints && <p>{study.otherPoints}</p>}
          <ul className="atlas-source-links" aria-label="研究の出典">
            {study.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}
          </ul>
        </div>
      </details>
    </article>
  );
}

export default function AcupointResearch({ point }: { point: AcupointDetail }) {
  const studies = getAcupointStudies(point.codeLower);
  const combinations = getClassicalCombinations(point.codeLower);
  const background = point.codeLower === "li4" || point.codeLower === "st36" ? point.researchEvidence : undefined;

  return (
    <section id="acupoint-research" className="atlas-evidence atlas-target" aria-labelledby="acupoint-research-title">
      <h2 id="acupoint-research-title" className="atlas-section-title">効果と組み合わせ</h2>
      {studies.length ? (
        <div className="atlas-study-list">{studies.map(study => <AtlasStudyCard key={study.id} study={study} currentCode={point.codeLower} />)}</div>
      ) : (
        <p className="atlas-evidence-empty">{point.name}を対象とした臨床研究の解説は準備中です。<a href="#acupoint-traditional" className="atlas-source-link">伝統的な使われ方</a>を読めます。</p>
      )}
      {combinations.length > 0 && (
        <div className="atlas-classical-combinations">
          <h3><GitMerge size={17} aria-hidden="true" />古典にみる組み合わせ</h3>
          {combinations.map(combination => (
            <div key={combination.points.join("-")} className="atlas-classical-combination">
              <PointLinks codes={combination.points} currentCode={point.codeLower} />
              <p>{combination.explanation}</p>
              <a className="atlas-source-link" href={combination.source.url}>{combination.source.label}</a>
            </div>
          ))}
        </div>
      )}
      {background && (
        <details className="atlas-disclosure atlas-background-research">
          <summary>{point.codeLower === "li4" ? "補足研究・健常者の脳画像" : "補足研究・マウスでの基礎研究"}</summary>
          <div className="atlas-study-details">
            <p>{background.findings}</p>
            <p>{background.limitations}</p>
            <ul className="atlas-source-links" aria-label="補足研究の出典">
              {background.sources.map(({ title, year, pmid }) => (
                <li key={title}>{pmid ? <a href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}>{title}（{year}）</a> : <>{title}（{year}）</>}</li>
              ))}
            </ul>
          </div>
        </details>
      )}
      <Link href="/editorial-policy" className="atlas-source-link atlas-evidence-policy"><BookOpen size={15} aria-hidden="true" />研究の掲載・監修について</Link>
    </section>
  );
}
