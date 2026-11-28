import type { ReactNode } from "react";
import HashTargetDetails from "@/components/common/HashTargetDetails";

export default function AcupointIntroDetails({ summary, id, children }: {
  summary: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <HashTargetDetails id={id} className="atlas-disclosure atlas-reference-row atlas-target" summary={<h2 id={`${id}-heading`}>{summary}</h2>}>
      <div className="atlas-reference-content">{children}</div>
    </HashTargetDetails>
  );
}
