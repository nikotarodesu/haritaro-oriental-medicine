import { getAcupointByCode } from "@/data/tsubo";
import { comparisonSize, type NearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import NearbyComparisonArtwork from "./NearbyComparisonArtwork";
import NearbyComparisonControls from "./NearbyComparisonControls";

export default function NearbyPointComparison({ comparison, code }: { comparison: NearbyComparison; code: string }) {
  const points = comparison.points.flatMap(position => {
    const point = getAcupointByCode(position.code);
    return point ? [{ ...position, name: point.name }] : [];
  });
  if (points.length < 2) return null;

  return (
    <details className="atlas-disclosure atlas-nearby" data-nearby-comparison={comparison.id}>
      <summary>近くのツボを図で比べる<span>{comparison.region}</span></summary>
      <div id="acupoint-nearby" className="atlas-target atlas-comparison-content">
        <NearbyComparisonControls key={code} {...comparisonSize} label={comparison.figureLabel} points={points} initialCode={code}>
          <NearbyComparisonArtwork id={comparison.id} />
        </NearbyComparisonControls>
      </div>
    </details>
  );
}
