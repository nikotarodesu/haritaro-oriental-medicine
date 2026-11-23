import { headViews } from "@/components/tsubo/atlas/expanded/headViews";
import { faceLandmarks } from "@/data/tsubo/atlas/expanded/head";
import type { ExtraPoint } from "@/data/tsubo/extraPoints";
import styles from "./extra-points.module.css";

type Position = readonly [number, number];

const browEnds = [[91, 82], faceLandmarks.innerBrow] as const;
const browMidpoint = [
  (browEnds[0][0] + browEnds[1][0]) / 2,
  (browEnds[0][1] + browEnds[1][1]) / 2,
] as const;
const templeLandmarks = [[101, 115], [99, 129]] as const;
const templePoint = [120, 122] as const;

function LocationMarks({ landmarks, point }: { landmarks: readonly Position[]; point: Position }) {
  return (
    <>
      {landmarks.map(([x, y]) => (
        <circle key={`${x}-${y}`} data-extra-point-landmark="" className={styles.landmarkMark} cx={x} cy={y} r="2.8" />
      ))}
      <circle className={styles.pointHalo} cx={point[0]} cy={point[1]} r="7.7" />
      <circle data-extra-point-marker="" className={styles.pointMark} cx={point[0]} cy={point[1]} r="4.2" />
    </>
  );
}

export default function ExtraPointDiagram({ point, decorative = false }: { point: ExtraPoint; decorative?: boolean }) {
  const frontal = point.slug === "yintang";
  const view = frontal ? headViews.face : headViews.profile;
  return (
    <svg
      className={styles.diagram}
      viewBox="16 15 180 242"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : point.figureDescription}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <path d={view.outline} className={styles.faceOutline} />
      <g className={styles.faceDetails}>
        {view.details.map(path => <path key={path} d={path} />)}
        {frontal ? (
          <>
            <path d={headViews.face.features.brow.path} />
            <path d={headViews.face.features.innerEye.path} />
            <path d="M74 96v5m64-5v5" />
          </>
        ) : (
          <>
            <path d="M68 129Q84 121 99 129Q85 136 68 129Z" />
            <path d="M79 126v5" />
          </>
        )}
      </g>
      {frontal ? (
        <>
          <path className={styles.guideLine} d="M91 82L115 83" />
          <LocationMarks landmarks={browEnds} point={browMidpoint} />
        </>
      ) : (
        <>
          <path className={styles.guideLine} d="M101 115L99 129M100 122H120" />
          <LocationMarks landmarks={templeLandmarks} point={templePoint} />
        </>
      )}
    </svg>
  );
}
