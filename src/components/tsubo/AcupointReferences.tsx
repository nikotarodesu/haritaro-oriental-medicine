import type { ReactNode } from "react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import HashTargetDetails from "@/components/common/HashTargetDetails";
import type { AcupointDetail } from "@/data/tsubo/types";
import type { AcupointAtlasArticle } from "@/data/tsubo/atlas/types";
import { AcupointReadingLinks } from "./AcupointArticleLinks";

export default function AcupointReferences({ point, editorialLinks, sources, sourceNote }: {
  point: AcupointDetail;
  editorialLinks?: AcupointAtlasArticle["symptomLinks"];
  sources: AcupointAtlasArticle["sources"];
  sourceNote?: ReactNode;
}) {
  return (
    <div className="atlas-reference-list">
      <AcupointReadingLinks code={point.codeLower} editorialLinks={editorialLinks} />
      <HashTargetDetails className="atlas-disclosure atlas-reference-row" summary="出典・執筆者">
        <section id="acupoint-sources" className="atlas-reference-content atlas-target" aria-label="出典と執筆者">
          {sourceNote}
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
            {sources.map(({ name, url, scope }) => (
              <li key={url}>{scope}{" "}<a href={url} className="atlas-source-link">{name}</a></li>
            ))}
          </ul>
          <AuthorSupervisorCard pointLocationChecked />
        </section>
      </HashTargetDetails>
    </div>
  );
}
