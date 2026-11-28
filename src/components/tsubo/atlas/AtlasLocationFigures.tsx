import type { ReactNode } from "react";

export function AtlasLocationFigure({ children }: { children: ReactNode }) {
  return <div id="acupoint-diagram" className="atlas-target atlas-location-figure">{children}</div>;
}

export function AtlasLocationSupplement({ notes, finding = [], children }: {
  notes?: ReactNode;
  finding?: readonly string[];
  children: ReactNode;
}) {
  return (
    <div className="atlas-location-reference">
      {finding.length > 0 && (
        <div className="atlas-location-expert">
          <h3>ツボを探すときの補足</h3>
          <div className="space-y-2">
            {finding.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      )}
      {notes}
      <div className="atlas-diagrams">{children}</div>
    </div>
  );
}
