import Link from "next/link";
import { ACUPUNCTURE_TRIAL_COMPARISON_HREF, RADIATION_DRY_MOUTH_RESEARCH_HREF, SYMPTOM_RESEARCH_LINKS, URINARY_INCONTINENCE_RESEARCH_HREF, acupunctureResearchHref } from "@/config/acupunctureLearning";
import { BookOpen, FlaskConical, GitMerge } from "lucide-react";
import { getAcupointByCode } from "@/data/tsubo";
import { EXTRA_POINTS } from "@/data/tsubo/extraPoints";
import { getAcupointStudies, getClassicalCombinations, getStudyPointRole } from "@/data/tsubo/atlas/evidence";
import { ATLAS_LITERATURE_SEARCH_COUNTS, ATLAS_LITERATURE_SEARCH_DATE } from "@/data/tsubo/atlas/literatureSearch";
import type { AtlasStudy } from "@/data/tsubo/atlas/types";
import type { AcupointDetail } from "@/data/tsubo/types";
import AtlasStudyDisclosure from "./AtlasStudyDisclosure";

const urinaryResearch = { href: URINARY_INCONTINENCE_RESEARCH_HREF, label: "尿もれの量と回数をどう測ったかを読む" };
const extraPointLinks = new Map(EXTRA_POINTS.map(point => [`${point.name}（${point.code}）`, point.href]));
const studyReadingLinks: Readonly<Partial<Record<string, { href: string; label: string }>>> = {
  "radiation-induced-dry-mouth": { href: RADIATION_DRY_MOUTH_RESEARCH_HREF, label: "放射線治療中の予防と治療後の研究を読み比べる" },
  "stress-urinary-incontinence": urinaryResearch,
  "overactive-bladder-voiding-diary": urinaryResearch,
  "postprostatectomy-pad-use": { href: `${URINARY_INCONTINENCE_RESEARCH_HREF}#after-prostatectomy`, label: "手術後の回復をパッドの枚数で調べた試験を読む" },
};

function PointLinks({ codes, currentCode }: { codes: readonly string[]; currentCode?: string }) {
  if (!codes.length) return null;
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

function StudyPointNote({ text }: { text: string }) {
  return (
    <p>{text.split(/([\p{Script=Han}]{2}（EX-[A-Z]+\d+）)/gu).map((part, index) => {
      const href = extraPointLinks.get(part);
      return href ? <Link key={index} href={href} className="atlas-source-link">{part}</Link> : part;
    })}</p>
  );
}

export function AtlasStudyCard({ study, currentCode }: { study: AtlasStudy; currentCode?: string }) {
  const role = currentCode ? getStudyPointRole(study, currentCode) : undefined;
  const reading = studyReadingLinks[study.id];
  const describedGroup = currentCode && study.additionalPointGroups?.find(group => (group.candidate || group.shared) && group.points.includes(currentCode));
  const label = describedGroup ? describedGroup.label
    : role === "comparison" ? "比較群で使われたツボ"
    : role === "additional" ? "条件に応じて追加されたツボ"
      : study.kind === "point" ? "ツボ一つを調べた研究" : "複数のツボを使った研究";
  const showMainPoints = study.points.length > 0 && (study.kind === "combination" || role === "comparison");
  const mainPointsOnly = showMainPoints && !study.comparisonPoints?.length && !study.additionalPointGroups?.length && !study.otherPoints;
  const hasPointDetails = showMainPoints || study.comparisonPoints?.length || study.additionalPointGroups?.length || study.otherPoints;
  const detailsLabel = mainPointsOnly ? `研究方法・使用した経穴（${study.points.length}穴）`
    : hasPointDetails ? "研究方法・配穴の内訳" : "研究方法";

  return (
    <article className="atlas-study-card atlas-target" id={study.id}>
      <p className="atlas-study-kind"><FlaskConical size={16} aria-hidden="true" />{label}</p>
      <h3>{study.topic}</h3>
      <dl className="atlas-study-findings">
        <div><dt>結果</dt><dd>{study.result}</dd></div>
        <div className="atlas-study-limit"><dt>この研究の限界</dt><dd>{study.limits}</dd></div>
      </dl>
      <div className="atlas-study-sources">
        <p>出典</p>
        <ul className="atlas-source-links" aria-label="研究の出典">
          {study.sources.map(source => <li key={source.url}><a href={source.url} data-analytics-action="atlas_source">{source.label}</a></li>)}
        </ul>
      </div>
      {reading && <p><Link href={reading.href} className="atlas-source-link">{reading.label}</Link></p>}
      <details className="atlas-disclosure atlas-study-method">
        <summary>{detailsLabel}</summary>
        <div className="atlas-study-details">
          <p>{study.design}</p>
          {showMainPoints && (
            <div>
              <p className="atlas-study-points-label">介入群で使われたツボ</p>
              <PointLinks codes={study.points} currentCode={currentCode} />
            </div>
          )}
          {study.otherPoints && <StudyPointNote text={study.otherPoints} />}
          {study.comparisonPoints?.length ? (
            <div>
              <p className="atlas-study-points-label">比較群で使われたツボ</p>
              <PointLinks codes={study.comparisonPoints} currentCode={currentCode} />
            </div>
          ) : null}
          {study.additionalPointGroups?.map(group => (
            <div key={group.label}>
              <p className="atlas-study-points-label">{group.label}</p>
              <PointLinks codes={group.points} currentCode={currentCode} />
            </div>
          ))}
        </div>
      </details>
    </article>
  );
}

function AtlasStudyList({ studies, code }: { studies: readonly AtlasStudy[]; code: string }) {
  return (
    <div className="atlas-study-list">
      {studies.map(study => <AtlasStudyCard key={study.id} study={study} currentCode={code} />)}
    </div>
  );
}

export default function AcupointResearch({ point, traditionalTitle = "伝統的な使われ方" }: { point: AcupointDetail; traditionalTitle?: string }) {
  const studies = getAcupointStudies(point.codeLower);
  const firstStudies = studies.slice(0, 3);
  const remainingStudies = studies.slice(firstStudies.length);
  const researchLinks = [...new Set(studies.map(study => study.guide))].flatMap(guide => {
    const link = guide ? SYMPTOM_RESEARCH_LINKS[guide] : undefined;
    return link ? [link] : [];
  });
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
        <AtlasStudyList studies={firstStudies} code={point.codeLower} />
      ) : (
        <p className="atlas-evidence-empty">人を対象とした比較試験は、このページでは紹介していません。<a href="#acupoint-traditional" className="atlas-source-link">{traditionalTitle}</a>も読めます。</p>
      )}
      {remainingStudies.length > 0 && (
        <AtlasStudyDisclosure key={point.codeLower} count={remainingStudies.length}>
          <AtlasStudyList studies={remainingStudies} code={point.codeLower} />
        </AtlasStudyDisclosure>
      )}
      {point.codeLower === "pc6" && (
        <p className="atlas-evidence-empty">
          <Link href={acupunctureResearchHref("postoperative-nausea")} className="atlas-source-link">術後の吐き気と内関の試験を読み比べる</Link>
        </p>
      )}
      {researchLinks.length > 0 && (
        <ul className="atlas-evidence-empty space-y-2">
          {researchLinks.map(({ href, label }) => <li key={href}><Link href={href} className="atlas-source-link">{label}</Link></li>)}
        </ul>
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
                <li key={title}>{pmid ? <a href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`} data-analytics-action="atlas_source">{title}（{year}）</a> : <>{title}（{year}）</>}</li>
              ))}
            </ul>
          </div>
        </details>
      )}
      <Link href="/editorial-policy" className="atlas-source-link atlas-evidence-policy"><BookOpen size={15} aria-hidden="true" />研究の掲載・監修について</Link>
    </section>
  );
}
