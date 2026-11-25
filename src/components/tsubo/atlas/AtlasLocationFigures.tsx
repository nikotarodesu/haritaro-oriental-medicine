import type { ReactNode } from "react";

export default function AtlasLocationFigures({ pointName, primary, notes, finding = [], children }: {
  pointName: string;
  primary: ReactNode;
  notes?: ReactNode;
  finding?: readonly string[];
  children: ReactNode;
}) {
  const hasFinding = finding.length > 0;
  return (
    <>
      <div className={notes || hasFinding ? "atlas-location-layout" : undefined}>
        <div id="acupoint-diagram" className="atlas-target atlas-location-figure">
          {primary}
          <p className="atlas-location-key">丸印が{pointName}</p>
        </div>
        {(notes || hasFinding) && (
          <div className="atlas-location-notes">
            {notes}
            {hasFinding && (
              <details className="atlas-disclosure atlas-location-finding">
                <summary>ツボを探すときの補足</summary>
                <div className="space-y-2 pb-3">
                  {finding.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
      <details className="atlas-disclosure atlas-location-more">
        <summary>全身での位置と経絡の並び順</summary>
        <div className="atlas-diagrams">{children}</div>
      </details>
    </>
  );
}
