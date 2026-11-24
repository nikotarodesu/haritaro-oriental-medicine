import type { ReactNode } from "react";
import type { AcupointMaster } from "@/data/tsubo/types";
import type { AcupointAtlasArticle, AtlasCloseUpProps, AtlasMarker, AtlasRegion } from "@/data/tsubo/atlas/types";
import { getAnnotatedCloseUp } from "@/data/tsubo/atlas/closeUpMeasurements";
import { expandedLandmarkIds, expandedLandmarkLabels } from "@/data/tsubo/atlas/landmarkLabels";
import { legLandmarks } from "@/data/tsubo/atlas/legLandmarks";
import { regionalLandmarkLabels, regionalLandmarkView } from "@/data/tsubo/atlas/regionalLandmarkLabels";
import { whoLocations } from "@/data/tsubo/atlas/whoLocations";
import CloseUpMeasurementArrows, { CloseUpMeasurementKey } from "./CloseUpMeasurementArrows";
import FootDorsumRegion from "./FootDorsumRegion";
import FootLandmarkRegion from "./FootLandmarkRegion";
import DigitRegion from "./DigitRegion";
import LowerLegRegion, { LowerLegArtwork } from "./LowerLegRegion";
import LegLandmarkRegion from "./LegLandmarkRegion";
import LandmarkCloseUp from "./LandmarkCloseUp";
import VolarForearmRegion from "./VolarForearmRegion";
import ExpandedLandmarkRegion, { expandedViews } from "./expanded/ExpandedLandmarkRegion";
import ZoomableAtlasDiagram from "./ZoomableAtlasDiagram";
import AtlasLocationFigures from "./AtlasLocationFigures";
import type { BodyArea } from "./expanded/views";

const figureClass = "atlas-figure";

const regions = {
  knee: { BodyHighlight: <path d="M82 194v10m36-10v10" />, CloseUp: LegLandmarkRegion },
  calf: { BodyHighlight: <path d="M81 207l4 33m34-33-4 33" />, CloseUp: LegLandmarkRegion },
  sole: { BodyHighlight: <path d="M73 261h16m22 0h16" />, CloseUp: LegLandmarkRegion },
  dorsalFoot: { BodyHighlight: <path d="M83 252l5 5m29-5-5 5" />, CloseUp: FootLandmarkRegion },
  ankle: { BodyHighlight: <path d="M82 245h10m16 0h10" />, CloseUp: FootLandmarkRegion },
  finger: { BodyHighlight: <path d="M27 164l6 6 5-5m124 0 5 5 6-6" />, CloseUp: DigitRegion },
  toe: { BodyHighlight: <path d="M74 260h14m24 0h14" />, CloseUp: DigitRegion },
  volarForearm: { BodyHighlight: <path d="M43 119L32 145m125-26 11 26" />, CloseUp: VolarForearmRegion },
  volarWrist: { BodyHighlight: <path d="M34 148l6 3m120 0 6-3" />, CloseUp: VolarForearmRegion },
  anterolateralLowerLeg: { BodyHighlight: <path d="M81 202l4 38m34-38-4 38" />, CloseUp: LowerLegRegion },
  footDorsum: { BodyHighlight: <path d="M90 253l1 6m19-6-1 6" />, CloseUp: FootDorsumRegion },
  expanded: { BodyHighlight: null, CloseUp: ExpandedLandmarkRegion },
} satisfies Record<AtlasRegion, { BodyHighlight: ReactNode; CloseUp: (props: AtlasCloseUpProps) => ReactNode }>;

const bodyAreas: Record<BodyArea | "occiput" | "neckBase", string> = {
  head: "M92 29q8-10 16 0m-16 7q8 9 16 0",
  occiput: "M93 42h14",
  neck: "M94 52h12",
  neckBase: "M96 55h8",
  shoulder: "M65 72l9-4m52 0 9 4",
  upperArm: "M62 80l-9 28m85-28 9 28",
  elbow: "M50 114l-3 5m103-5 3 5",
  forearm: "M44 122l-10 24m122-24 10 24",
  hand: "M30 153l3 12m137-12-3 12",
  chest: "M85 75q15 10 30 0m-29 8q14 8 28 0",
  abdomen: "M88 99q12 6 24 0m-23 9q11 6 22 0",
  flank: "M80 83l-1 29m41-29 1 29",
  pelvis: "M84 128l15 10 17-10",
  back: "M86 72l1 30m27-30-1 30",
  lumbar: "M87 114q13 5 26 0m-24 10q11 6 22 0",
  thigh: "M85 150l2 33m28-33-2 33",
};

const occipitalPoints = new Set(["bl9", "gb19", "gv17"]);
const bodyMapOverrides = {
  occiput: { area: "occiput", label: "後頭部" },
  neckBase: { area: "neckBase", label: "首の付け根" },
} as const;

export function PointAtlasThumbnail({ point, illustration, marker }: {
  point: AcupointMaster;
  illustration: AcupointAtlasArticle["illustration"];
  marker: AtlasMarker;
}) {
  const { CloseUp } = regions[illustration.region];
  const { marker: position } = getAnnotatedCloseUp(point.codeLower, marker, illustration.region);

  return (
    <svg viewBox="0 0 340 300" role="img" aria-label={`${point.name}の位置。 ${whoLocations[point.codeLower]}`}>
      {illustration.region === "anterolateralLowerLeg" ? <LowerLegArtwork /> :
        <CloseUp marker={position} label={point.name} labelled measured />}
      <circle data-point-marker="" cx={position.x} cy={position.y} r="8" fill="#7F3520" stroke="#FFF9F0" strokeWidth="3" />
    </svg>
  );
}

export default function PointAtlasDiagrams({ point, meridianPoints, illustration, marker, children }: {
  point: AcupointMaster;
  meridianPoints: readonly AcupointMaster[];
  illustration: AcupointAtlasArticle["illustration"];
  marker: AtlasMarker;
  children?: ReactNode;
}) {
  const { BodyHighlight, CloseUp } = regions[illustration.region];
  const { marker: closeUpMarker, measurements } = getAnnotatedCloseUp(point.codeLower, marker, illustration.region);
  const measured = measurements.length > 0;
  const expandedPoint = closeUpMarker.expanded;
  const expandedView = expandedPoint && expandedViews[expandedPoint.view];
  const labelled = !measured;
  const landmarkView = labelled && (expandedView ? { caption: expandedView.name, left: 0 } : regionalLandmarkView(point.codeLower, closeUpMarker));
  const landmarks = labelled && (expandedPoint && expandedView ? expandedLandmarkLabels(expandedPoint, point.codeLower, expandedView.features) : regionalLandmarkLabels(point.codeLower, closeUpMarker));
  const bodyMap = point.codeLower === "gv14" ? bodyMapOverrides.neckBase
    : occipitalPoints.has(point.codeLower) ? bodyMapOverrides.occiput : undefined;
  const bodyArea = bodyMap?.area ?? expandedView?.area;
  const bodyLabel = bodyMap?.label ?? illustration.bodyLabel;
  const back = expandedView?.direction === "back" || Boolean(marker.legCode && legLandmarks[marker.legCode].view === "posterior");
  const bodyDirection = back ? "背面" : "正面";
  const landmarkNames = closeUpMarker.expanded?.landmarks.map((id) => expandedView?.features[id].name.replace("／", "")).join("、");
  const closeUpAlt = expandedView
    ? `${expandedView.name}。 ${illustration.closeUpAlt} 目印は${landmarkNames}です。`
    : illustration.closeUpAlt;
  const measureAlt = measurements.map(({ measure, originLabel, level, alternative, condition }) =>
    `${alternative ? "代替位置。 " : condition ? condition + "。 " : ""}${level ? level + "の高さで、" : ""}${originLabel}から${measure.direction}${measure.token}。`
  ).join(" ");
  const nearby = meridianPoints.filter(({ meridianOrder }) =>
    meridianOrder >= illustration.meridianStart && meridianOrder <= illustration.meridianEnd
  );
  const lineLength = 300;
  const step = lineLength / Math.max(nearby.length - 1, 1);
  const pointLabel = `${point.name} ${point.code}`;
  const diagramLabel = `${point.name}の場所と目印`;

  return (
    <AtlasLocationFigures notes={children} primary={
      <figure className={`${figureClass} ${measured ? "atlas-figure--measured" : "atlas-figure--labelled"}`}>
        <ZoomableAtlasDiagram label={diagramLabel}>
          {landmarks && landmarkView ? (
            <LandmarkCloseUp marker={closeUpMarker} pointLabel={pointLabel} landmarks={landmarks} left={landmarkView.left}
              numbered={point.codeLower === "pc7" || point.codeLower === "lr3"}
              description={`${pointLabel}。 ${landmarkView.caption}。 ${whoLocations[point.codeLower]}`}>
              <CloseUp marker={closeUpMarker} label={pointLabel} labelled landmarkIds={expandedPoint && expandedLandmarkIds(expandedPoint, point.codeLower)} />
            </LandmarkCloseUp>
          ) : (
            <svg viewBox="0 0 340 300" role="img" aria-label={`${closeUpAlt} ${measureAlt}`} className="mx-auto block w-full max-w-[340px]">
              <CloseUp marker={closeUpMarker} label={pointLabel} measured />
              <CloseUpMeasurementArrows measurements={measurements} />
              <circle data-point-marker="" cx={closeUpMarker.x} cy={closeUpMarker.y} r="5" fill="#7F3520" stroke="#FFF9F0" strokeWidth="2" />
            </svg>
          )}
        </ZoomableAtlasDiagram>
        <figcaption>
          {(landmarkView || expandedView) && <span className="block text-sm font-semibold">{landmarkView ? landmarkView.caption : expandedView?.name}{" "}</span>}
          {(measured || illustration.closeUpCaption !== diagramLabel) && illustration.closeUpCaption}
          {measured && <>
            <p className="atlas-dimension-guide">白丸が起点、矢印が測る方向です。{measurements.some(({ alternative }) => alternative) && "ひし形は代替位置です。"}</p>
            <CloseUpMeasurementKey measurements={measurements} />
          </>}
        </figcaption>
      </figure>
    }>

      <figure className={`${figureClass} atlas-figure--overview`}>
        <svg viewBox="0 0 200 272" role="img" aria-label={`全身${bodyDirection}のシルエット。${bodyLabel}をオレンジで示しています。`} className="mx-auto block max-h-64 w-full">
          <circle cx="100" cy="32" r="19" fill="#D8D5C9" />
          <g fill="#D8D5C9" stroke="#857E70" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M85 53h30l27 16 11 39 17 40-16 8-23-38-8-21 3 49-3 50-5 57h-16l-2-97-5 97H79l-5-57-3-50 4-49-8 21-23 38-16-8 17-40 11-39z" />
            <path d="M29 144l16 8-5 16-7 7-10-7 1-11zM155 152l16-8 5 13 1 11-10 7-7-7zM79 247h16l-1 15H70q-1-7 9-15Zm23 0h16q11 8 10 15h-25Z" />
          </g>
          {back && <path d="M100 58v83m-19-66 9 11m29-11-9 11" fill="none" stroke="#857E70" strokeWidth="1.5" />}
          <g fill="none" stroke="#9E4B20" strokeWidth="8" strokeLinecap="round">
            {bodyArea ? <path d={bodyAreas[bodyArea]} /> : BodyHighlight}
          </g>
        </svg>
        <figcaption>全身{bodyDirection} · {bodyLabel}</figcaption>
      </figure>

      <figure className={`${figureClass} atlas-figure--meridian`}>
        <ZoomableAtlasDiagram label={`${point.meridian}の並び順`}>
          <svg viewBox="0 0 360 108" role="img" aria-label={`${point.meridian}。 ${nearby.map((entry) => `${entry.code} ${entry.name}`).join("、")}の順で、${point.name}を強調しています。`} className="mx-auto block w-full max-w-md">
            <path d="M30 44H330" stroke="#A69B87" strokeWidth="2" />
            {nearby.map((entry, index) => {
              const isCurrent = entry.code === point.code;
              return (
                <g key={entry.code} transform={`translate(${30 + step * index} 44)`}>
                  <circle r={isCurrent ? 10 : 5} fill={isCurrent ? "#9E4B20" : "#F9F5ED"} stroke={isCurrent ? "#7F3520" : "#82725B"} strokeWidth="2" />
                  <text textAnchor="middle" y="30" fontSize="13" fill="#332D25" fontWeight={isCurrent ? "bold" : "normal"}>{entry.name}</text>
                  <text textAnchor="middle" y="48" fontSize="11" fill="#524637">{entry.code}</text>
                </g>
              );
            })}
          </svg>
        </ZoomableAtlasDiagram>
        <figcaption>
          {point.meridian}の順序 · {illustration.meridianCaption}
        </figcaption>
      </figure>
    </AtlasLocationFigures>
  );
}
