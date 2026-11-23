import type { ReactNode } from "react";

export default function AtlasLocationFigures({ primary, notes, children }: {
  primary: ReactNode;
  notes?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className={notes ? "atlas-location-layout" : undefined}>
        <div id="acupoint-diagram" className="atlas-target atlas-location-figure">{primary}</div>
        {notes && <div className="atlas-location-notes">{notes}</div>}
      </div>
      <details className="atlas-disclosure atlas-location-more">
        <summary>全身での位置と経絡の並び順</summary>
        <div className="atlas-diagrams">{children}</div>
      </details>
    </>
  );
}
