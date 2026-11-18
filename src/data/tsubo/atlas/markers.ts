import type { AtlasMarker } from "./types";

// ST35 and ST41 anchor the 16 proportional units on the shin template.
export const shinEndpoints = { knee: { x: 116, y: 88 }, ankle: { x: 124, y: 248 } };

// Coordinates use the 340×300 viewBox of the corresponding regional template.
export const ATLAS_POINT_MARKERS: Readonly<Partial<Record<string, AtlasMarker>>> = {
  pc5: { x: 120, y: 175, boneCun: 3 },
  pc6: { x: 120, y: 191, boneCun: 2 }, // Between the two tendons, 2/12 of the forearm above the wrist crease.
  pc7: { x: 120, y: 224 },
  st36: lowerLegMarker(3),
  st37: lowerLegMarker(6),
  st38: lowerLegMarker(8),
  st39: lowerLegMarker(9),
  lr3: { x: 119, y: 175 }, // Toward the toes from the junction of the first two metatarsal bases.
};

function lowerLegMarker(boneCun: number): AtlasMarker {
  const { knee, ankle } = shinEndpoints;
  const fraction = boneCun / 16;
  return { x: knee.x + (ankle.x - knee.x) * fraction, y: knee.y + (ankle.y - knee.y) * fraction, boneCun };
}
