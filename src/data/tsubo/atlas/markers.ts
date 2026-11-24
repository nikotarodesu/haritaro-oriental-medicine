import type { AtlasMarker } from "./types";
import { digitGeometry, digitLandmarks } from "./digits";
import { expandedPoints } from "./expanded/profiles";
import { footLandmarks, type FootCode } from "./footLandmarks";
import { legLandmarks, shinEndpoints, type LegCode } from "./legLandmarks";

export { shinEndpoints } from "./legLandmarks";

export const volarForearmGeometry = { x: 120, wristY: 224, elbowY: 32, units: 12 } as const;

// Coordinates use the 340×300 viewBox of the corresponding regional template.
export const ATLAS_POINT_MARKERS: Readonly<Partial<Record<string, AtlasMarker>>> = {
  ...Object.fromEntries(Object.entries(expandedPoints).map(([code, expanded]) => [
    code, { x: expanded.x, y: expanded.y, expanded },
  ])),
  ...Object.fromEntries((Object.keys(legLandmarks) as LegCode[]).map(legCode => {
    const { x, y } = legLandmarks[legCode];
    return [legCode, { x, y, legCode }];
  })),
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
  lr3: { x: 120, y: 175 }, // Toward the toes from the junction of the first two metatarsal bases.
};

function forearmMarker(boneCun: number): AtlasMarker {
  const { x, wristY, elbowY, units } = volarForearmGeometry;
  return { x, y: wristY - (wristY - elbowY) * boneCun / units, boneCun };
}

function lowerLegMarker(boneCun: number): AtlasMarker {
  const { knee, ankle } = shinEndpoints;
  const fraction = boneCun / 16;
  return { x: knee.x + (ankle.x - knee.x) * fraction, y: knee.y + (ankle.y - knee.y) * fraction, boneCun };
}
