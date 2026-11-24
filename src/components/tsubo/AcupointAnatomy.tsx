import HashTargetDetails from "@/components/common/HashTargetDetails";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getSharedAnatomyLandmarks } from "@/data/tsubo/atlas/sharedAnatomyLandmarks";
import type { AcupointDetail } from "@/data/tsubo/types";
import CrossSectionViewer from "./CrossSectionViewer";

const anatomyPreviews: Readonly<Partial<Record<string, string>>> = {
  li4: "手の甲の中手骨と、骨の間にある筋肉の位置関係を図で見られます。",
  pc6: "手のひら側の前腕で、目印になる二本の腱と周りの組織を図で見られます。",
  st36: "すねの骨と、その外側にある前脛骨筋の位置関係を図で見られます。",
};

export default function AcupointAnatomy({ point, paragraphs = [] }: {
  point: AcupointDetail;
  paragraphs?: readonly string[];
}) {
  if (!point.crossSection) return null;
  const model = getPublicCrossSectionModel(point.crossSection);
  const preview = anatomyPreviews[point.codeLower];

  return (
    <section id="acupoint-anatomy" className="atlas-target" aria-labelledby="acupoint-anatomy-title">
      <h2 id="acupoint-anatomy-title" className="atlas-section-title">詳しい解剖と位置</h2>
      {preview && <p className="mb-3">{preview}</p>}
      <HashTargetDetails className="atlas-disclosure atlas-anatomy-details" summary="断面図を開く">
        <div id="acupoint-anatomy-diagram" className="atlas-target space-y-3 pb-3">
          <CrossSectionViewer model={model} pointName={point.name} pointCode={point.code} individualModel sharedLandmarks={getSharedAnatomyLandmarks(point.codeLower)} />
          {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </HashTargetDetails>
    </section>
  );
}
