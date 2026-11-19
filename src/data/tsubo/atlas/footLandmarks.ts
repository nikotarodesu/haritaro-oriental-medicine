export type FootView = "dorsal" | "medial" | "lateral";
export type FootBone = "ray1" | "ray2" | "ray3" | "ray4" | "ray5" | "malleolus" | "heel" | "navicular" | "cuboid" | "midfoot";

type FootLandmark = {
  view: FootView;
  x: number;
  y: number;
  bones: readonly FootBone[];
  pdfPage: number;
};

export const medialFootLandmarks = {
  malleolus: { x: 99, y: 107 },
  navicular: { x: 141, y: 147 },
} as const;

const { malleolus, navicular } = medialFootLandmarks;
const shangqiu = { x: (malleolus.x + navicular.x) / 2, y: (malleolus.y + navicular.y) / 2 };

// Coordinates are surface marks on the schematic, aligned to the bones and tendons in FootLandmarkRegion.
export const footLandmarks = {
  st41: { view: "dorsal", x: 129, y: 240, bones: ["malleolus"], pdfPage: 75 },
  st42: { view: "dorsal", x: 133, y: 201, bones: ["ray2", "midfoot"], pdfPage: 76 },
  st43: { view: "dorsal", x: 140, y: 126, bones: ["ray2", "ray3"], pdfPage: 76 },
  st44: { view: "dorsal", x: 140, y: 104, bones: ["ray2", "ray3"], pdfPage: 77 },
  lr2: { view: "dorsal", x: 99, y: 106, bones: ["ray1", "ray2"], pdfPage: 205 },
  gb41: { view: "dorsal", x: 169, y: 189, bones: ["ray4", "ray5"], pdfPage: 201 },
  gb42: { view: "dorsal", x: 181, y: 149, bones: ["ray4", "ray5"], pdfPage: 201 },
  gb43: { view: "dorsal", x: 195, y: 137, bones: ["ray4", "ray5"], pdfPage: 202 },
  lr4: { view: "medial", x: 116, y: 111, bones: ["malleolus"], pdfPage: 206 },
  sp2: { view: "medial", x: 256, y: 191, bones: ["ray1"], pdfPage: 79 },
  sp3: { view: "medial", x: 224, y: 186, bones: ["ray1"], pdfPage: 80 },
  sp4: { view: "medial", x: 167, y: 168, bones: ["ray1"], pdfPage: 80 },
  sp5: { view: "medial", ...shangqiu, bones: ["malleolus", "navicular"], pdfPage: 81 },
  ki2: { view: "medial", x: 141, y: 163, bones: ["navicular"], pdfPage: 145 },
  ki3: { view: "medial", x: 80, y: 116, bones: ["malleolus", "heel"], pdfPage: 146 },
  ki4: { view: "medial", x: 74, y: 149, bones: ["malleolus", "heel"], pdfPage: 146 },
  ki5: { view: "medial", x: 80, y: 161, bones: ["heel"], pdfPage: 147 },
  ki6: { view: "medial", x: 99, y: 152, bones: ["malleolus"], pdfPage: 147 },
  gb40: { view: "lateral", x: 126, y: 131, bones: ["malleolus"], pdfPage: 200 },
  bl60: { view: "lateral", x: 80, y: 116, bones: ["malleolus", "heel"], pdfPage: 138 },
  bl61: { view: "lateral", x: 78, y: 181, bones: ["heel"], pdfPage: 139 },
  bl62: { view: "lateral", x: 99, y: 142, bones: ["malleolus", "heel"], pdfPage: 139 },
  bl63: { view: "lateral", x: 142, y: 164, bones: ["cuboid", "ray5"], pdfPage: 140 },
  bl64: { view: "lateral", x: 172, y: 178, bones: ["ray5"], pdfPage: 140 },
  bl65: { view: "lateral", x: 224, y: 188, bones: ["ray5"], pdfPage: 141 },
  bl66: { view: "lateral", x: 256, y: 192, bones: ["ray5"], pdfPage: 141 },
} as const satisfies Record<string, FootLandmark>;

export type FootCode = keyof typeof footLandmarks;
export type FootPoint = (typeof footLandmarks)[FootCode];
