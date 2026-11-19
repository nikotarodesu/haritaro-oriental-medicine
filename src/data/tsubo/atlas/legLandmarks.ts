export type LegView = "knee" | "shinFront" | "medial" | "lateral" | "posterior" | "sole";
type Landmarks = { view: LegView; x: number; y: number; pdfPage: number; cun?: number };

// WHO's medial span uses 13 units from SP9 to the medial malleolus.
export const medialAnkleY = 237;
export const lateralAnkleY = 239;
export const poplitealY = 55;
export const posteriorAnkleY = 235;
export const posteriorKnee = { medialEnd: 78, lateralEnd: 164, lateralTendon: 154 } as const;
// ST35–ST41 defines 16 B-cun on the front shin schematic.
export const shinEndpoints = { knee: { x: 116, y: 88 }, ankle: { x: 124, y: 248 } };
export const outerShinAnkle = { x: 103, y: shinEndpoints.ankle.y };
const shinCun = (shinEndpoints.ankle.y - shinEndpoints.knee.y) / 16;
export const tiaokouReference = {
  x: (shinEndpoints.knee.x + shinEndpoints.ankle.x) / 2,
  y: shinEndpoints.knee.y + 8 * shinCun,
};
const kneeMidpoint = (posteriorKnee.medialEnd + posteriorKnee.lateralEnd) / 2;
const medial = (x: number, cun: number, pdfPage: number) =>
  ({ view: "medial", x, y: medialAnkleY - cun * 12, cun, pdfPage }) as const;
const lateral = (x: number, cun: number, pdfPage: number) =>
  ({ view: "lateral", x, y: lateralAnkleY - cun * 12, cun, pdfPage }) as const;
const calfStep = (posteriorAnkleY - poplitealY) / 16;
const calf = (x: number, cun: number, pdfPage: number) =>
  ({ view: "posterior", x, y: poplitealY + cun * calfStep, cun, pdfPage }) as const;
const aboveKunlun = (x: number, cun: number, pdfPage: number) =>
  ({ view: "posterior", x, y: posteriorAnkleY - cun * calfStep, cun, pdfPage }) as const;

export const soleEndpoints = { web: { x: 128, y: 69 }, heel: { x: 129, y: 260 } };

export const legLandmarks = {
  st34: { view: "knee", x: 126, y: 85, pdfPage: 72, cun: 2 },
  st35: { view: "knee", x: 119, y: 166, pdfPage: 72 },
  st40: { view: "shinFront", x: 107, y: outerShinAnkle.y - 8 * shinCun, pdfPage: 75, cun: 8 },
  sp6: medial(102, 3, 81),
  sp7: medial(105, 6, 82),
  sp8: { ...medial(102, 10, 82), cun: 3 },
  sp9: { view: "medial", x: 107, y: 81, pdfPage: 83 },
  sp10: { view: "knee", x: 164, y: 85, pdfPage: 83, cun: 2 },
  lr5: medial(117, 5, 207),
  lr6: medial(118, 7, 207),
  lr7: { view: "medial", x: 93, y: 81, pdfPage: 208 },
  lr8: { view: "posterior", x: posteriorKnee.medialEnd, y: poplitealY, pdfPage: 208 },
  ki1: { view: "sole", x: soleEndpoints.web.x + (soleEndpoints.heel.x - soleEndpoints.web.x) / 3,
    y: soleEndpoints.web.y + (soleEndpoints.heel.y - soleEndpoints.web.y) / 3, pdfPage: 145 },
  ki7: medial(94, 2, 148),
  ki8: medial(106, 2, 148),
  ki9: medial(94, 5, 149),
  ki10: { view: "posterior", x: 98, y: poplitealY, pdfPage: 149 },
  gb34: { view: "lateral", x: 139, y: 71, pdfPage: 197 },
  gb35: lateral(111, 7, 198),
  gb36: lateral(137, 7, 198),
  gb37: lateral(137, 5, 199),
  gb38: lateral(136, 4, 199),
  gb39: lateral(134, 3, 200),
  bl39: { view: "posterior", x: posteriorKnee.lateralTendon - 6, y: poplitealY, pdfPage: 128 },
  bl40: { view: "posterior", x: kneeMidpoint, y: poplitealY, pdfPage: 128 },
  bl55: calf(kneeMidpoint, 2, 136),
  bl56: calf(kneeMidpoint, 5, 136),
  bl57: { view: "posterior", x: kneeMidpoint, y: poplitealY + 8 * calfStep, pdfPage: 137 },
  bl58: aboveKunlun(135, 7, 137),
  bl59: aboveKunlun(136, 3, 138),
} as const satisfies Record<string, Landmarks>;

export type LegCode = keyof typeof legLandmarks;
