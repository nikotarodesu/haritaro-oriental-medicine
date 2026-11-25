import type { ReactNode } from "react";
import { BookOpen, ChevronRight, FlaskConical } from "lucide-react";
import { ATLAS_STUDIES, getAcupointStudies, getStudyScopeLabel } from "@/data/tsubo/atlas/evidence";
import { TRADITIONAL_POINT_USES } from "@/data/tsubo/atlas/traditionalUses";

const extraStudyIds: Readonly<Partial<Record<string, readonly string[]>>> = {
  "ex-hn3": ["chronic-insomnia", "seasonal-allergic-rhinitis"],
  "ex-hn5": ["migraine-manual-acupuncture"],
};
const studyPreviewCount = 2;

export function AcupointTraditionalUses({ code }: { code: string }) {
  const traditional = TRADITIONAL_POINT_USES[code];
  if (!traditional) return null;

  return (
    <section id="acupoint-traditional" className="atlas-target atlas-use-card atlas-traditional-use" data-use-kind="traditional" aria-labelledby="atlas-traditional-title">
      <h2 id="atlas-traditional-title" className="atlas-section-title"><BookOpen size={19} aria-hidden="true" />伝統的な使われ方</h2>
      <p className="atlas-use-status">伝統医学の資料で、このツボと結びつけてきた症状や部位です。</p>
      <ul className="atlas-use-topics">
        {traditional.labels.map(label => <li key={label}>{label}</li>)}
      </ul>
      <a className="atlas-text-action atlas-use-source" href={traditional.source.url}>{traditional.source.label}</a>
    </section>
  );
}

export default function AcupointUses({ code, context, links }: {
  code: string;
  context?: { title: string; paragraphs: readonly string[] };
  links?: ReactNode;
}) {
  const extraIds = extraStudyIds[code];
  const studies = extraIds
    ? ATLAS_STUDIES.filter(study => extraIds.includes(study.id))
    : getAcupointStudies(code);

  return (
    <section id={TRADITIONAL_POINT_USES[code] ? "acupoint-study-overview" : "acupoint-traditional"} className="atlas-target atlas-point-uses" aria-labelledby="atlas-use-research-title">
      <div className="atlas-use-card" data-use-kind="research">
        <h2 id="atlas-use-research-title" className="atlas-section-title"><FlaskConical size={19} aria-hidden="true" />研究で調べたこと</h2>
        {studies.length > 0 ? (
          <ul className="atlas-use-studies">
            {studies.slice(0, studyPreviewCount).map(study => (
              <li key={study.id}>
                <a href={extraIds ? `/tsubo/${study.points[0]}#${study.id}` : `#${study.id}`}>
                  <span><small>{getStudyScopeLabel(study, code)}</small><strong>{study.topic}</strong></span>
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="atlas-use-status">人を対象とした研究は掲載していません。</p>
        )}
        {!extraIds && studies.length > 0 && (
          <a className="atlas-text-action atlas-use-source" href="#acupoint-research">掲載研究をすべて見る（{studies.length}件）</a>
        )}
        {studies.some(study => study.kind === "combination") && (
          <p className="atlas-use-status">複数のツボを使った試験の結果は、比較された組み合わせと施術条件の範囲で読みます。</p>
        )}
      </div>
      {context && (
        <details className="atlas-disclosure atlas-use-context">
          <summary>{context.title}</summary>
          <div className="space-y-2 pb-3">
            {context.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </details>
      )}
      {links && (
        <details className="atlas-disclosure atlas-use-context">
          <summary>症状ガイドと学習リンク</summary>
          {links}
        </details>
      )}
    </section>
  );
}
