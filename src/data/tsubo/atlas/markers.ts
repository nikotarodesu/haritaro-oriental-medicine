import type { AtlasMarker } from "./types";
import { digitGeometry, digitLandmarks } from "./digits";
import { footLandmarks, type FootCode } from "./footLandmarks";

// ST35 and ST41 anchor the 16 proportional units on the shin template.
export const shinEndpoints = { knee: { x: 116, y: 88 }, ankle: { x: 124, y: 248 } };

// Coordinates use the 340×300 viewBox of the corresponding regional template.
export const ATLAS_POINT_MARKERS: Readonly<Partial<Record<string, AtlasMarker>>> = {
  ...Object.fromEntries((Object.keys(footLandmarks) as FootCode[]).map(footCode => {
    const { x, y } = footLandmarks[footCode];
    return [footCode, { x, y, footCode }];
  })),
  ...Object.fromEntries(Object.entries(digitLandmarks).map(([code, digit]) => {
    const { x, y } = digitGeometry(digit);
    return [code, { x, y, digit }];
  })),
  pc4: forearmMarker(5),
  pc5: forearmMarker(3),
  pc6: forearmMarker(2),
  pc7: { x: 120, y: 224 },
  st36: lowerLegMarker(3),
  st37: lowerLegMarker(6),
  st38: lowerLegMarker(8),
  st39: lowerLegMarker(9),
  lr3: { x: 119, y: 175 }, // Toward the toes from the junction of the first two metatarsal bases.
};

function forearmMarker(boneCun: number): AtlasMarker {
  // Wrist crease at y=224; elbow crease at y=32, 12 proportional units apart.
  return { x: 120, y: 224 - 16 * boneCun, boneCun };
}

function lowerLegMarker(boneCun: number): AtlasMarker {
  const { knee, ankle } = shinEndpoints;
  const fraction = boneCun / 16;
  return { x: knee.x + (ankle.x - knee.x) * fraction, y: knee.y + (ankle.y - knee.y) * fraction, boneCun };
}
