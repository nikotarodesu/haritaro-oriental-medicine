import type { AtlasMarker } from "./types";

// Coordinates use the 340×300 viewBox of the corresponding regional template.
export const ATLAS_POINT_MARKERS: Readonly<Partial<Record<string, AtlasMarker>>> = {
  pc5: { x: 120, y: 175, boneCun: 3 },
  pc6: { x: 120, y: 191, boneCun: 2 }, // Between the two tendons, 2/12 of the forearm above the wrist crease.
  pc7: { x: 120, y: 224 },
  st36: { x: 117.5, y: 118, boneCun: 3 }, // 3/16 of the way from ST35 to ST41.
  lr3: { x: 119, y: 175 }, // Toward the toes from the junction of the first two metatarsal bases.
};
