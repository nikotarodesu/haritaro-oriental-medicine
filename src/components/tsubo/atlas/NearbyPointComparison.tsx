import Link from "next/link";
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
        {comparison.id === "shin" && (
          <p>
            ひざ下の外側のくぼみ<Link href="/tsubo/st35#acupoint-location" prefetch={false} className="atlas-source-link">（犢鼻・ST35）</Link>と
            足首の前の中央<Link href="/tsubo/st41#acupoint-location" prefetch={false} className="atlas-source-link">（解谿・ST41）</Link>を結ぶ線を16等分します。
            ひざ側から何寸下にあるかで、3穴を見分けられます。
          </p>
        )}
        <NearbyComparisonControls key={code} {...(comparison.size ?? comparisonSize)} label={comparison.figureLabel} points={points} initialCode={code}>
          <NearbyComparisonArtwork id={comparison.id} />
        </NearbyComparisonControls>
      </div>
    </details>
  );
}
