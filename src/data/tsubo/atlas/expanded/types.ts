export type ExpandedView =
  | "face" | "profile" | "scalp" | "nape" | "neck" | "neckSide" | "mouth"
  | "chest" | "abdomen" | "flank" | "groin" | "pelvis" | "hip"
  | "back" | "sacrum" | "shoulderBack" | "shoulderSide"
  | "upperArm" | "armBack" | "elbowSide" | "elbowInside" | "forearmPalm" | "forearmBack" | "palm" | "handBack"
  | "thighFront" | "thighSide" | "thighBack";

export interface ExpandedPoint {
  view: ExpandedView;
  x: number;
  y: number;
  landmarks: readonly string[];
  location: string;
  guide: string;
}

type PointRow = [
  code: string,
  x: number,
  y: number,
  landmarkIds: string,
  location: string,
  guide: string,
];

export function onView(view: ExpandedView, rows: readonly PointRow[]): Record<string, ExpandedPoint> {
  return Object.fromEntries(rows.map(([code, x, y, landmarkIds, location, guide]) =>
    [code, { view, x, y, landmarks: landmarkIds.split(" "), location, guide }],
  ));
}
