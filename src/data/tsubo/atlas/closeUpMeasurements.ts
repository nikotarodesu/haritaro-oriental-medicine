import { digitGeometry } from "./digits";
import { forearmWristCreaseY, posteriorShoulder } from "./expanded/arms";
import { posteriorThigh } from "./expanded/back";
import { faceLandmarks } from "./expanded/head";
import { flankLandmarks } from "./expanded/trunk";
import type { ExpandedView } from "./expanded/types";
import { footLandmarks, medialFootLandmarks } from "./footLandmarks";
import { lateralAnkleY, legLandmarks, medialAnkleY, outerShinAnkle, poplitealY, posteriorAnkleY, shinEndpoints, tiaokouReference, type LegView } from "./legLandmarks";
import type { AtlasMarker, AtlasRegion } from "./types";
import { whoLocationNotes, whoLocations } from "./whoLocations";
import { getWhoMeasurements, type WhoMeasurement } from "./whoMeasurements";

type Position = readonly [x: number, y: number];
type AxisRail = { axis: "vertical" | "horizontal"; lane: number; labelSide?: "before" | "after" };
type Rail = AxisRail | { axis: "parallel"; shift: Position };
type Placement = {
  origin: Position;
  destination?: Position;
  rail?: Rail;
  label?: Position;
};

export type CloseUpMeasurement = {
  measure: WhoMeasurement;
  origin: Position;
  destination: Position;
  rail?: Rail;
  label?: Position;
  alternative?: boolean;
  condition?: string;
  level?: string;
  originLabel: string;
};

const centerX = 106;
const navel: Position = [centerX, 144];
const rearHairY = 242;
const jawAngle: Position = [116, 190];

// These three projections need to show a direction that the regular close-up hides.
const measurementViews = {
  st6: { view: "profile", x: 102, y: 177, landmarks: ["jawSide", "masseter"] },
  st8: { view: "scalp", x: 173, y: 73.5, landmarks: ["frontHair", "headMid"] },
  gv24: { view: "face", x: 105, y: 34, landmarks: ["foreheadHair", "brow"] },
} as const;

const midlines: Partial<Record<ExpandedView, string>> = {
  chest: "胸の中央線",
  abdomen: "お腹の中央線",
  groin: "下腹部の中央線",
  back: "背骨の中央線",
  sacrum: "背骨の中央線",
  shoulderBack: "背骨の中央線",
  neck: "首の前の中央線",
  nape: "後頭部の中央線",
  scalp: "頭の中央線",
};

const namedOrigins: Readonly<Record<string, string>> = {
  "犢鼻（ST35）": "ひざ外下の犢鼻（ST35）",
  "陰陵泉（SP9）": "ひざ内下の陰陵泉（SP9）",
  "曲池（LI11）": "ひじ外側の曲池（LI11）",
  "崑崙（BL60）": "外くるぶしの後ろの崑崙（BL60）",
  "風府（GV16）": "うなじの風府（GV16）",
};

function vertical(origin: Position, lane: number, destination?: Position, labelSide?: AxisRail["labelSide"]): Placement {
  return { origin, destination, rail: { axis: "vertical", lane, labelSide } };
}

function horizontal(origin: Position, lane: number, destination?: Position): Placement {
  return { origin, destination, rail: { axis: "horizontal", lane } };
}

const fromMidline = ({ y }: AtlasMarker) => horizontal([centerX, y], y - 14);
const xy = ({ x, y }: { x: number; y: number }): Position => [x, y];

type Place = (marker: AtlasMarker, measure: WhoMeasurement, code: string) => Placement | undefined;

const expandedPlacements: Partial<Record<ExpandedView, Place>> = {
  chest: (marker, _measure, code) => code === "cv21" ? vertical([centerX, 43], 65) : fromMidline(marker),
  abdomen: (marker, measure, code) => {
    if (measure.direction === "横へ") return {
      ...fromMidline(marker),
      label: measure.amount === .5 ? [145, marker.y - 25] : undefined,
    };
    if (code === "gb28") return { origin: [174, 204], rail: { axis: "parallel", shift: [13, -23] }, label: [163, 171] };
    if (code === "cv15") return vertical([centerX, 32], 49);
    return vertical(navel, 65, code === "gb27" ? undefined : [centerX, marker.y]);
  },
  back: fromMidline,
  sacrum: fromMidline,
  groin: fromMidline,
  neck: ({ y }) => horizontal([100, y], y - 16),
  nape: (marker, _measure, code) => code === "gv15" ? vertical([centerX, 123], 58, undefined, "after") : fromMidline(marker),
  shoulderBack: (marker, _measure, code) => code === "si9"
    ? vertical(xy(posteriorShoulder.axillaryFold), 151)
    : horizontal([posteriorShoulder.neckBase.x, marker.y], marker.y - 14),
  upperArm: (marker, measure) => {
    const start: Position = measure.start === "脇の前のしわ" ? [145, 84]
      : [measure.start === "曲池（LI11）" ? 82 : marker.x, 238];
    return vertical(start, 56);
  },
  forearmPalm: ({ x }) => vertical([x, forearmWristCreaseY], 54),
  forearmBack: ({ x }, measure) => {
    const start: Position = measure.start === "手首のしわ" ? [x, forearmWristCreaseY]
      : [measure.start === "ひじの出っ張り" ? 112 : x, 58];
    return vertical(start, 53);
  },
  armBack: (_marker, measure) => vertical(measure.start === "肩峰角" ? [150, 57] : [119, 232], 55),
  flank: ({ y }) => horizontal([flankLandmarks.midaxillaryX, y], y - 17),
  thighFront: (marker, measure, code) => {
    if (measure.start === "気衝（ST30）") return vertical([151, 51], 176, undefined, "before");
    return vertical([code === "lr9" ? 132 : 88, 231], code === "lr9" ? 173 : 52);
  },
  thighSide: ({ x }) => vertical([x, 245], 53),
  thighBack: ({ x }, _measure, code) => code === "bl37"
    ? vertical(xy(posteriorThigh.glutealMidpoint), 54)
    : vertical([x, posteriorThigh.poplitealCreaseY], 181),
  face: (marker, measure, code) => {
    switch (code) {
      case "li19": return horizontal([105, marker.y], 165);
      case "st4": return horizontal(faceLandmarks.mouthCorner, 214);
      case "bl1": return { origin: faceLandmarks.innerCanthus, rail: { axis: "parallel", shift: [-21, -14] }, label: [75, 103] };
      case "gb1": return { ...horizontal(faceLandmarks.outerCanthus, 128), label: [150, 141] };
      case "gb14": return vertical([138, 79], 182);
      case "gv24": return measure.start === "額の生え際"
        ? vertical([105, 41], 65)
        : vertical([105, 83], 164);
    }
  },
  profile: ({ x }, _measure, code) => {
    if (code === "st6") return { origin: jawAngle, rail: { axis: "parallel", shift: [-18, 10] }, label: [50, 174] };
    return vertical([x, code === "gb8" ? 96 : 101], 109);
  },
  scalp: (marker, measure) => {
    if (measure.start === "正中線") return fromMidline(marker);
    if (measure.start === "額の角の生え際") return vertical([173, 66], 190, undefined, "after");
    if (measure.start === "後ろの生え際") return vertical([centerX, rearHairY], 64);
    if (measure.start === "前後の生え際の中点") return vertical([centerX, 153], 153, undefined, "after");
    return vertical([marker.x, 64], 62);
  },
};

const legPlacements: Partial<Record<LegView, Place>> = {
  knee: (_marker, _measure, code) => vertical([code === "sp10" ? 149 : 124, 125], code === "sp10" ? 183 : 56),
  shinFront: (_marker, measure) => measure.unit === "指幅"
    ? horizontal(xy(tiaokouReference), tiaokouReference.y - 25)
    : vertical(xy(outerShinAnkle), 48),
  medial: (_marker, _measure, code) => {
    if (code === "lr7") return horizontal(xy(legLandmarks.sp9), legLandmarks.sp9.y - 25);
    return vertical(code === "sp8" ? xy(legLandmarks.sp9) : [116, medialAnkleY], 54);
  },
  lateral: () => vertical([123, lateralAnkleY], 54),
  posterior: (marker, measure) => vertical(measure.start === "崑崙（BL60）"
    ? [141, posteriorAnkleY] : [marker.x, poplitealY], 48),
};

function placeMeasurement(marker: AtlasMarker, measure: WhoMeasurement, code: string, region: AtlasRegion): Placement | undefined {
  if (marker.expanded) return expandedPlacements[marker.expanded.view]?.(marker, measure, code);
  if (marker.legCode) return legPlacements[legLandmarks[marker.legCode].view]?.(marker, measure, code);
  if (marker.digit) {
    const { left, right, nailBase } = digitGeometry(marker.digit);
    const firstSide = marker.digit.position !== "fifthSide";
    const edge = firstSide ? left : right;
    // The printed point follows the side of the nail to the baseline. Show the
    // rounded corner above that intersection, including the alternate for PC9.
    const origin: Position = [edge + (firstSide ? 4 : -4), nailBase - 11];
    const destination: Position = [edge, nailBase];
    return { origin, destination, rail: { axis: "parallel", shift: [firstSide ? -19 : 19, 0] }, label: [firstSide ? 123 : 203, nailBase + (firstSide ? 31 : 55)] };
  }
  if (marker.footCode) return vertical(code === "ki5" ? xy(footLandmarks.ki3) : xy(medialFootLandmarks.malleolus), 47);
  if (region === "volarForearm") return vertical([marker.x, 224], 73);
  if (region === "anterolateralLowerLeg") return vertical(xy(shinEndpoints.knee), 47);
}

export function getAnnotatedCloseUp(code: string, marker: AtlasMarker, region: AtlasRegion) {
  const view = measurementViews[code as keyof typeof measurementViews];
  const expanded = marker.expanded;
  const drawingMarker: AtlasMarker = view && expanded
    ? { ...marker, x: view.x, y: view.y, expanded: { ...expanded, ...view, measurement: undefined } }
    : marker;
  const note = whoLocationNotes[code];
  const location = whoLocations[code] ?? "";
  const main = getWhoMeasurements(code, location);
  const notes = note ? getWhoMeasurements(code, note) : [];

  const measurements: CloseUpMeasurement[] = [...main, ...notes].flatMap((measure, index) => {
    const placement = placeMeasurement(drawingMarker, measure, code, region);
    if (!placement || !measure.start) return [];
    const midline = drawingMarker.expanded && midlines[drawingMarker.expanded.view];
    const copy = index < main.length ? location : note ?? "";
    const nailCorner = drawingMarker.digit && copy.match(/爪の([^。]+?)の角から/)?.[1].replace(/（[^）]*）/g, "");
    const originLabel = nailCorner ? `爪の${nailCorner}の角`
      : measure.start === "正中線" && midline ? midline : (namedOrigins[measure.start] ?? measure.start);
    return [{
      measure,
      originLabel,
      origin: placement.origin,
      destination: placement.destination ?? xy(drawingMarker),
      rail: placement.rail,
      label: placement.label,
      alternative: index >= main.length && Boolean(note?.includes("代替位置")),
      condition: code === "gv24" && index === 1 ? "生え際が分かりにくいとき" : undefined,
      level: measure.start?.endsWith("正中線")
        ? location.match(/第\d+(?:[頸胸腰]椎の棘突起の下縁|肋間|後仙骨孔)/)?.[0]
        : undefined,
    }];
  });
  return { marker: drawingMarker, measurements };
}
