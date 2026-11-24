import type { LandmarkPosition } from "./landmarkLabels";

const circledNumbers = { 1: "①", 2: "②", 3: "③" } as const;
type LandmarkNumber = keyof typeof circledNumbers;

export interface SharedAnatomyLandmark {
  number: LandmarkNumber;
  name: string;
  layerId: string;
  elementId: string;
  sectionBadge: LandmarkPosition;
  leaderTo?: LandmarkPosition;
}

export const elbowSurfaceLandmarks = {
  bicepsTendon: { number: 1, name: "上腕二頭筋の腱" },
  lateralEpicondyle: { number: 2, name: "上腕骨の外側上顆" },
} as const;

const elbowLandmarks = [
  { ...elbowSurfaceLandmarks.bicepsTendon, layerId: "elbow-biceps-tendon", elementId: "elbow-biceps-tendon-section", sectionBadge: [250, 111] },
  { ...elbowSurfaceLandmarks.lateralEpicondyle, layerId: "elbow-lateral-epicondyle", elementId: "elbow-lateral-epicondyle-bone", sectionBadge: [119, 151] },
] as const satisfies readonly SharedAnatomyLandmark[];

export const sharedAnatomyLandmarks = {
  li4: {
    indexBone: { number: 1, name: "人差し指の中手骨", layerId: "second-metacarpal-bone", elementId: "li4-second-metacarpal-cortex", sectionBadge: [375, 132] },
    thumbBone: { number: 2, name: "親指の中手骨", layerId: "first-metacarpal-bone", elementId: "li4-first-metacarpal-cortex", sectionBadge: [122, 137] },
  },
  pc6: {
    palmarisLongus: { number: 1, name: "長掌筋の腱", layerId: "palmaris-longus-tendon", elementId: "pc6-pl-tendon", sectionBadge: [311, 64], leaderTo: [292, 86] },
    flexorCarpiRadialis: { number: 2, name: "橈側手根屈筋の腱", layerId: "flexor-carpi-radialis-tendon", elementId: "pc6-fcr-tendon", sectionBadge: [179, 65], leaderTo: [198, 88] },
  },
  st36: {
    tibia: { number: 2, name: "脛骨", layerId: "tibia-anterior-border", elementId: "st36-tibia-bone", sectionBadge: [145, 132] },
    tibialisAnterior: { number: 3, name: "前脛骨筋", layerId: "tibialis-anterior", elementId: "st36-ta-muscle", sectionBadge: [228, 103] },
  },
} as const satisfies Readonly<Record<string, Readonly<Record<string, SharedAnatomyLandmark>>>>;

export function getSharedAnatomyLandmarks(code: string): readonly SharedAnatomyLandmark[] {
  switch (code) {
    case "li4": return Object.values(sharedAnatomyLandmarks.li4);
    case "pc6": return Object.values(sharedAnatomyLandmarks.pc6);
    case "st36": return Object.values(sharedAnatomyLandmarks.st36);
    case "li11":
    case "lu5":
    case "pc3": return elbowLandmarks;
    default: return [];
  }
}

export function circledLandmarkNumber(number: LandmarkNumber): string {
  return circledNumbers[number];
}
