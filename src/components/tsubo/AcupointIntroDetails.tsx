import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";

export default function AcupointIntroDetails({ children, notation }: { children: ReactNode; notation: ReactNode }) {
  return (
    <HashTargetDetails
      id="acupoint-name"
      className="atlas-disclosure atlas-reference-row atlas-target atlas-intro-details"
      open
      summary={<h2 id="acupoint-name-heading">名前の由来</h2>}
    >
      <div className="atlas-reference-content atlas-name-guide">
        {children}
        <details id="acupoint-name-notation" className="atlas-disclosure atlas-name-notation">
          <summary>表記と出典</summary>
          <div className="atlas-name-notation-content">{notation}</div>
        </details>
      </div>
    </HashTargetDetails>
  );
}
