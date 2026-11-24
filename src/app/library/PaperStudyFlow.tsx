import { ArrowDown, ClipboardList, Users } from "lucide-react";
import type { PaperStudyDesign } from "@/data/references/paperStudyDesigns";

export default function PaperStudyFlow({ paperId, design }: { paperId: string; design: PaperStudyDesign }) {
  const titleId = `paper-${paperId}-flow-title`;
  const groupLabelId = `paper-${paperId}-flow-groups`;

  return (
    <figure className="library-study-flow" aria-labelledby={titleId} data-study-flow={paperId}>
      <figcaption id={titleId}>試験の組み立て</figcaption>
      <div className="library-flow-box">
        <span className="library-flow-label"><Users size={16} aria-hidden="true" />誰が参加したか</span>
        <p>{design.population}</p>
      </div>
      <div className="library-flow-branches">
        <p id={groupLabelId}>何と比べたか <span>割り付け時の人数</span></p>
        <ul role="list" aria-labelledby={groupLabelId} data-groups={design.groups.length}>
          {design.groups.map(({ label, participants }) => (
            <li key={label}><span>{label}</span><strong>{participants}<span>人</span></strong></li>
          ))}
        </ul>
      </div>
      {design.sharedCare && <p className="library-flow-note">{design.sharedCare}</p>}
      <ArrowDown className="library-flow-arrow" size={18} aria-hidden="true" />
      <div className="library-flow-box">
        <span className="library-flow-label"><ClipboardList size={16} aria-hidden="true" />何を測ったか</span>
        <p>{design.measurement}</p>
        <p className="library-flow-note">{design.timing}</p>
      </div>
      {design.followUp && <p className="library-flow-note">{design.followUp}</p>}
    </figure>
  );
}
