import HashTargetDetails from "@/components/common/HashTargetDetails";
import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getSharedAnatomyLandmarks } from "@/data/tsubo/atlas/sharedAnatomyLandmarks";
import { whoLocations } from "@/data/tsubo/atlas/whoLocations";
import { getWhoMeasurements } from "@/data/tsubo/atlas/whoMeasurements";
import type { AcupointDetail } from "@/data/tsubo/types";
import CrossSectionViewer from "./CrossSectionViewer";
import WhoMeasurementFigures from "./WhoMeasurementFigures";

const anatomyPreviews: Readonly<Partial<Record<string, string>>> = {
  li4: "手の甲の中手骨と、骨の間にある筋肉の位置関係を図で見られます。",
  pc4: "手首とひじのしわの間を12等分し、手首側から5つ分の高さに郄門があります。",
  pc5: "間使は手首のしわからひじへ3寸。内関より1寸、ひじ寄りです。",
  pc6: "手のひら側の前腕で、目印になる二本の腱と周りの組織を図で見られます。",
  st36: "すねの骨と、その外側にある前脛骨筋の位置関係を図で見られます。",
  li11: "曲池は、尺沢とひじの外側にある骨の出っ張りの中ほどです。",
  lu5: "尺沢は、ひじの前のしわで、上腕二頭筋の腱より親指側にあります。",
  pc3: "曲沢は、ひじの前のしわで、上腕二頭筋の腱より小指側にあります。",
};

export default function AcupointAnatomy({ point, paragraphs = [] }: {
  point: AcupointDetail;
  paragraphs?: readonly string[];
}) {
  if (!point.crossSection) return null;
  const model = getPublicCrossSectionModel(point.crossSection);
  const preview = anatomyPreviews[point.codeLower];
  const forearmHeight = ["pc4", "pc5", "pc6"].includes(point.codeLower)
    ? getWhoMeasurements(point.codeLower, whoLocations[point.codeLower])
    : [];

  return (
    <section id="acupoint-anatomy" data-anatomy-kind="individual" className="atlas-target" aria-labelledby="acupoint-anatomy-title">
      <h2 id="acupoint-anatomy-title" className="atlas-section-title">詳しい解剖と位置</h2>
      {preview && <p className="mb-3">{preview}</p>}
      <HashTargetDetails key={point.code} analytics={{ kind: "individual" }} className="atlas-disclosure atlas-anatomy-details" summary="断面図を開く">
        <div id="acupoint-anatomy-diagram" className="atlas-target space-y-3 pb-3">
          <WhoMeasurementFigures measures={forearmHeight} pointName={point.name} />
          <CrossSectionViewer model={model} pointName={point.name} pointCode={point.code} individualModel sharedLandmarks={getSharedAnatomyLandmarks(point.codeLower)} />
          {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </HashTargetDetails>
    </section>
  );
}
