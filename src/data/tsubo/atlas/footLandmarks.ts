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

export const footSideOutline = "M68 51H113Q110 102 130 126Q152 143 197 162Q233 178 271 180Q299 178 308 194Q314 208 288 213Q259 217 226 213Q187 208 159 205Q142 204 126 212Q104 220 83 216Q53 212 55 190Q58 158 65 137Q71 107 68 51Z";
export const achillesSideOutline = "M67 73Q68 106 68 122Q65 150 76 176";

export const dorsalFootLandmarks = {
  secondMetatarsalBase: [133, 201],
  intermediateCuneiformFront: [132, 209],
  fourthMetatarsal: { base: [155, 210], control: [173, 170], head: [185, 123] },
  fifthMetatarsal: { base: [164, 217], control: [203, 184], head: [208, 146] },
  fifthExtensor: { middle: [160, 194], tip: [228, 108] },
} as const;

const { malleolus, navicular } = medialFootLandmarks;
const shangqiu = { x: (malleolus.x + navicular.x) / 2, y: (malleolus.y + navicular.y) / 2 };
const { secondMetatarsalBase, intermediateCuneiformFront } = dorsalFootLandmarks;
const secondTarsometatarsalJoint = {
  x: (secondMetatarsalBase[0] + intermediateCuneiformFront[0]) / 2,
  y: (secondMetatarsalBase[1] + intermediateCuneiformFront[1]) / 2,
};

// Coordinates are surface marks on the schematic, aligned to the bones and tendons in FootLandmarkRegion.
export const footLandmarks = {
  st41: { view: "dorsal", x: 129, y: 240, bones: ["malleolus"], pdfPage: 75 },
  st42: { view: "dorsal", ...secondTarsometatarsalJoint, bones: ["ray2", "midfoot"], pdfPage: 76 },
  st43: { view: "dorsal", x: 140, y: 126, bones: ["ray2", "ray3"], pdfPage: 76 },
  st44: { view: "dorsal", x: 140, y: 104, bones: ["ray2", "ray3"], pdfPage: 77 },
  lr2: { view: "dorsal", x: 99, y: 106, bones: ["ray1", "ray2"], pdfPage: 205 },
  gb41: { view: "dorsal", x: 176, y: 189, bones: ["ray4", "ray5"], pdfPage: 201 },
  gb42: { view: "dorsal", x: 193, y: 149, bones: ["ray4", "ray5"], pdfPage: 201 },
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
