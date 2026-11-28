import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";

export default function AcupointIntroDetails({ children }: { children: ReactNode }) {
  return (
    <HashTargetDetails
      id="acupoint-name"
      className="atlas-disclosure atlas-reference-row atlas-target atlas-intro-details"
      open
      summary={<h2 id="acupoint-name-heading">名前の由来</h2>}
    >
      <div className="atlas-reference-content">{children}</div>
    </HashTargetDetails>
  );
}
