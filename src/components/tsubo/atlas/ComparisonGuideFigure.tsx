import { getAcupointByCode } from "@/data/tsubo";
import { ATLAS_POINT_MARKERS } from "@/data/tsubo/atlas/markers";
import { comparisonSize, NEARBY_COMPARISONS } from "@/data/tsubo/atlas/nearbyComparisons";
import type { AtlasComparisonGuide } from "@/data/tsubo/atlas/nearbyComparisonGuides";
import NearbyComparisonArtwork from "./NearbyComparisonArtwork";
import styles from "./ComparisonGuideFigure.module.css";

export function ComparisonGuideFigure({ guide }: { guide: AtlasComparisonGuide }) {
  const comparison = NEARBY_COMPARISONS.find(({ id }) => id === guide.id);
  if (!comparison) return null;

  const points = comparison.points.flatMap(position => {
    const point = getAcupointByCode(position.code);
    return point ? [{ ...position, name: point.name, distance: ATLAS_POINT_MARKERS[position.code]?.boneCun }] : [];
  });
  const distances = points.flatMap(({ name, distance }) => distance == null ? [] : [`${name}${distance}寸`]);
  const { width, height } = comparison.size ?? comparisonSize;
  const description = guide.id === "elbow"
    ? `${comparison.figureLabel}曲池は外側の骨と尺沢の中間です。`
    : `${comparison.figureLabel}${distances.length ? `目印から${distances.join("、")}です。` : ""}`;

  return (
    <figure className={styles.figure}>
      <div className="atlas-comparison-figure">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={description} data-atlas-comparison-figure={comparison.id}>
          <NearbyComparisonArtwork id={comparison.id} showElbowBoneLabel />
          {points.map(({ code, position: [x, y], leader: [endX], button: [labelX, labelY], name, distance }) => {
            const hasDistance = distance != null;
            const labelWidth = hasDistance ? 86 : 60;
            const labelHeight = 28;
            const center = labelX + labelWidth / 2;
            const connectorX = endX < x ? labelX + labelWidth : labelX;

            return (
              <g key={code} className="atlas-comparison-marker" data-selected="true" data-comparison-point={code}>
                <path d={`M${x} ${y}L${connectorX} ${labelY}`} />
                <circle cx={x} cy={y} r="4.5" />
                <rect className={styles.labelBox} x={labelX} y={labelY - labelHeight / 2} width={labelWidth} height={labelHeight} rx="6" />
                <text className={styles.label} x={center} y={labelY + 5} textAnchor="middle">
                  <tspan>{name}</tspan>
                  {hasDistance && <tspan dx="5" className={styles.distance}>{`${distance}寸`}</tspan>}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>{guide.caption}</figcaption>
    </figure>
  );
}
