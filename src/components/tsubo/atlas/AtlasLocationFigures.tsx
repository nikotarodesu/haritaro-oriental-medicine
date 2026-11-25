import HashTargetDetails from "@/components/common/HashTargetDetails";
import type { ReactNode } from "react";

export default function AtlasLocationFigures({ primary, notes, finding = [], children }: {
  primary: ReactNode;
  notes?: ReactNode;
  finding?: readonly string[];
  children: ReactNode;
}) {
  return (
    <div className="atlas-location-layout">
      <div id="acupoint-diagram" className="atlas-target atlas-location-figure">
        {primary}
      </div>
      <div className="atlas-location-notes">
        {finding.length > 0 && (
          <details className="atlas-disclosure atlas-location-finding">
            <summary>ツボを探すときの補足</summary>
            <div className="space-y-2 pb-3">
              {finding.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        )}
        <HashTargetDetails className="atlas-disclosure atlas-location-more" summary="WHOの位置基準・全身図">
          <div className="atlas-location-reference">
            {notes}
            <div className="atlas-diagrams">{children}</div>
          </div>
        </HashTargetDetails>
      </div>
    </div>
  );
}
