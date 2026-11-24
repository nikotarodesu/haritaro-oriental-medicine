import Link from "next/link";
import { DETAILED_ACUPOINTS, getAcupointByCode } from "@/data/tsubo";
import { comparisonSize, type NearbyComparison } from "@/data/tsubo/atlas/nearbyComparisons";
import { nearbyPracticeReview } from "@/data/tsubo/atlas/practiceReviews";
import { getRegionalSection } from "@/data/tsubo/regionalSections";
import NearbyComparisonArtwork from "./NearbyComparisonArtwork";
import NearbyComparisonControls from "./NearbyComparisonControls";

export default function NearbyPointComparison({ comparison, code, anchorId, initiallyOpen }: {
  comparison: NearbyComparison;
  code: string;
  anchorId: string;
  initiallyOpen?: boolean;
}) {
  const points = comparison.points.flatMap(position => {
    const point = getAcupointByCode(position.code);
    if (!point) return [];
    const anatomyHref = DETAILED_ACUPOINTS[point.codeLower]?.crossSection || getRegionalSection(point.codeLower)
      ? `/tsubo/${point.codeLower}#acupoint-anatomy-diagram` : undefined;
    return [{ ...position, name: point.name, anatomyHref }];
  });
  if (points.length < 2) return null;
  const { id, region, heading, figureLabel, quizFigureLabel, question } = comparison;

  return (
    <NearbyComparisonControls
      key={code}
      {...(comparison.size ?? comparisonSize)}
      comparison={{ id, region, heading, figureLabel, quizFigureLabel, question }}
      reviewQuestion={nearbyPracticeReview(comparison)}
      points={points}
      initialCode={code}
      anchorId={anchorId}
      initiallyOpen={initiallyOpen}
      introduction={<>
        {comparison.introduction && <p>{comparison.introduction}</p>}
        {id === "shin" && (
          <p>
            ひざ下の外側のくぼみ<Link href="/tsubo/st35#acupoint-location" prefetch={false} className="atlas-source-link">（犢鼻・ST35）</Link>と
            足首の前の中央<Link href="/tsubo/st41#acupoint-location" prefetch={false} className="atlas-source-link">（解谿・ST41）</Link>を結ぶ線を16等分します。
            ひざ側から何寸下にあるかで、3穴を見分けられます。
          </p>
        )}
        {id === "forearm" && (
          <p>手のひら側の手首とひじのしわの間を12等分します。二本の腱を目印に、手首からひじへ何寸進むかで3穴を見分けます。</p>
        )}
      </>}
      relatedReading={id === "shoulder" && (
        <p>
          肩の上にある<Link href="/tsubo/gb21#acupoint-location" prefetch={false} className="atlas-source-link">肩井（GB21）</Link>は、首の付け根と肩先を結ぶ線の中ほどです。
        </p>
      )}
    >
      <NearbyComparisonArtwork id={id} />
    </NearbyComparisonControls>
  );
}
