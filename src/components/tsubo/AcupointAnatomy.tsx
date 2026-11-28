import { getPublicCrossSectionModel } from "@/data/medicalSafety";
import { getSharedAnatomyLandmarks } from "@/data/tsubo/atlas/sharedAnatomyLandmarks";
import type { AcupointDetail } from "@/data/tsubo/types";
import CrossSectionViewer from "./CrossSectionViewer";
import { AcupointAnatomyDetails } from "./AcupointTopics";

export default function AcupointAnatomy({ point }: { point: AcupointDetail }) {
  if (!point.crossSection) return null;
  const model = getPublicCrossSectionModel(point.crossSection);

  return (
    <AcupointAnatomyDetails key={point.code} kind="individual">
      <CrossSectionViewer model={model} pointName={point.name} pointCode={point.code} individualModel sharedLandmarks={getSharedAnatomyLandmarks(point.codeLower)} />
    </AcupointAnatomyDetails>
  );
}
