import { ChevronRight, FlaskConical } from "lucide-react";
import { ATLAS_STUDIES, getAtlasStudyPoint, getStudyScopeLabel } from "@/data/tsubo/atlas/evidence";
import { TRADITIONAL_POINT_USES } from "@/data/tsubo/atlas/traditionalUses";

const extraStudyIds: Readonly<Partial<Record<string, readonly string[]>>> = {
  "ex-hn3": ["chronic-insomnia", "seasonal-allergic-rhinitis"],
  "ex-hn5": ["migraine-manual-acupuncture"],
};

export function AcupointTraditionalUses({ code }: { code: string }) {
  const traditional = TRADITIONAL_POINT_USES[code];
  if (!traditional) return null;

  return (
    <section id="acupoint-traditional" className="atlas-target atlas-use-card atlas-traditional-use" data-use-kind="traditional" aria-labelledby="atlas-traditional-title">
      <h3 id="atlas-traditional-title" className="atlas-section-title">伝統資料に記された症状</h3>
      <p className="atlas-use-topics">{traditional.labels.join("、")}</p>
      <a className="atlas-text-action atlas-use-source" href={traditional.source.url}>{traditional.source.label}</a>
    </section>
  );
}

export default function AcupointUses({ code }: { code: string }) {
  const extraIds = extraStudyIds[code] ?? [];
  const studies = ATLAS_STUDIES.filter(study => extraIds.includes(study.id));

  return (
    <section id={TRADITIONAL_POINT_USES[code] ? "acupoint-study-overview" : "acupoint-traditional"} className="atlas-target atlas-point-uses" aria-labelledby="atlas-use-research-title">
      <div className="atlas-use-card" data-use-kind="research">
        <h3 id="atlas-use-research-title" className="atlas-section-title"><FlaskConical size={19} aria-hidden="true" />研究で調べたこと</h3>
        {studies.length > 0 ? (
          <ul className="atlas-use-studies">
            {studies.map(study => (
              <li key={study.id}>
                <a href={`/tsubo/${getAtlasStudyPoint(study)}#${study.id}`}>
                  <span><small>{getStudyScopeLabel(study, code)}</small><strong>{study.topic}</strong></span>
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="atlas-use-status">人を対象とした研究は掲載していません。</p>
        )}
        {studies.some(study => study.kind === "combination") && (
          <p className="atlas-use-status">複数のツボを使った試験の結果は、比較された組み合わせと施術条件の範囲で読みます。</p>
        )}
      </div>
    </section>
  );
}
