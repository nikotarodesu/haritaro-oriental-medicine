import Link from "next/link";
import { ACUPUNCTURE_TRIAL_COMPARISON_HREF } from "@/config/acupunctureLearning";
import { BookOpen, FlaskConical, GitMerge } from "lucide-react";
import { getAcupointByCode } from "@/data/tsubo";
import { getAcupointStudies, getClassicalCombinations, getStudyPointRole } from "@/data/tsubo/atlas/evidence";
import { ATLAS_LITERATURE_SEARCH_COUNTS, ATLAS_LITERATURE_SEARCH_DATE } from "@/data/tsubo/atlas/literatureSearch";
import type { AtlasStudy } from "@/data/tsubo/atlas/types";
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
  const role = currentCode ? getStudyPointRole(study, currentCode) : undefined;
  const label = role === "comparison" ? "比較群で使われたツボ"
    : role === "additional" ? "条件に応じて追加されたツボ"
      : study.kind === "point" ? "ツボ一つを調べた研究" : "複数のツボを使った研究";

  return (
    <article className="atlas-study-card atlas-target" id={study.id}>
      <p className="atlas-study-kind"><FlaskConical size={16} aria-hidden="true" />{label}</p>
      <h3>{study.topic}</h3>
      <p>{study.result}</p>
      <p className="atlas-study-limit">{study.limits}</p>
      {(study.kind === "combination" || role === "comparison") && <PointLinks codes={study.points} currentCode={currentCode} />}
      <details className="atlas-disclosure">
        <summary>誰を対象に何を比べたか・論文を読む</summary>
        <div className="atlas-study-details">
          <p>{study.design}</p>
          {study.otherPoints && <p>{study.otherPoints}</p>}
          {study.comparisonPoints?.length ? (
            <div>
              <p>比較群で使われたツボ</p>
              <PointLinks codes={study.comparisonPoints} currentCode={currentCode} />
            </div>
          ) : null}
          {study.additionalPointGroups?.map(group => (
            <div key={group.label}>
              <p>{group.label}</p>
              <PointLinks codes={group.points} currentCode={currentCode} />
            </div>
          ))}
          <ul className="atlas-source-links" aria-label="研究の出典">
            {study.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}
          </ul>
        </div>
      </details>
    </article>
  );
}

export default function AcupointResearch({ point, traditionalTitle = "伝統的な使われ方" }: { point: AcupointDetail; traditionalTitle?: string }) {
  const studies = getAcupointStudies(point.codeLower);
  const combinations = getClassicalCombinations(point.codeLower);
  const background = point.codeLower === "li4" || point.codeLower === "st36" ? point.researchEvidence : undefined;
  const searched = Object.hasOwn(ATLAS_LITERATURE_SEARCH_COUNTS, point.codeLower);

  return (
    <section id="acupoint-research" className="atlas-evidence atlas-target" aria-labelledby="acupoint-research-title">
      <h2 id="acupoint-research-title" className="atlas-section-title">研究と古典の配穴</h2>
      {studies.some(study => study.kind === "combination") && (
        <p className="atlas-evidence-empty">複数のツボを一緒に使った試験の結果は、組み合わせ全体についてのものです。</p>
      )}
      {studies.length ? (
        <div className="atlas-study-list">{studies.map(study => <AtlasStudyCard key={study.id} study={study} currentCode={point.codeLower} />)}</div>
      ) : (
        <p className="atlas-evidence-empty">人を対象とした比較試験は、このページでは紹介していません。<a href="#acupoint-traditional" className="atlas-source-link">{traditionalTitle}</a>も読めます。</p>
      )}
      {searched && (
        <p className="atlas-evidence-empty">
          <time dateTime={ATLAS_LITERATURE_SEARCH_DATE}>{ATLAS_LITERATURE_SEARCH_DATE}</time> 文献検索 · <Link href="/tsubo#atlas-research-search" className="atlas-source-link">検索の対象と方法</Link>
        </p>
      )}
      <p className="atlas-evidence-empty">
        <Link href={ACUPUNCTURE_TRIAL_COMPARISON_HREF} className="atlas-source-link">ツボ一つを調べた試験と、複数を組み合わせた試験の違い</Link>
      </p>
      {combinations.length > 0 && (
        <div className="atlas-classical-combinations">
          <h3><GitMerge size={17} aria-hidden="true" />古典に書かれた組み合わせ</h3>
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
