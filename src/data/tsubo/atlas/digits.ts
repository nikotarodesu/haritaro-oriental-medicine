export type DigitLandmark = {
  part: "hand" | "foot";
  number: 1 | 2 | 3 | 4 | 5;
  position: "firstSide" | "fifthSide" | "tip";
  pdfPage: number;
};

// Sides are anatomical: toward digit 1 or digit 5, independent of the reader's left/right.
// pdfPage is the one-based PDF page of the WHO Western Pacific standard.
export const digitLandmarks = {
  lu11: { part: "hand", number: 1, position: "firstSide", pdfPage: 40 },
  li1:  { part: "hand", number: 2, position: "firstSide", pdfPage: 43 },
  ht9:  { part: "hand", number: 5, position: "firstSide", pdfPage: 95 },
  si1:  { part: "hand", number: 5, position: "fifthSide", pdfPage: 97 },
  pc9:  { part: "hand", number: 3, position: "tip", pdfPage: 165 },
  te1:  { part: "hand", number: 4, position: "fifthSide", pdfPage: 167 },
  st45: { part: "foot", number: 2, position: "fifthSide", pdfPage: 77 },
  sp1:  { part: "foot", number: 1, position: "firstSide", pdfPage: 79 },
  lr1:  { part: "foot", number: 1, position: "fifthSide", pdfPage: 205 },
  gb44: { part: "foot", number: 4, position: "fifthSide", pdfPage: 202 },
  bl67: { part: "foot", number: 5, position: "fifthSide", pdfPage: 142 },
} as const satisfies Record<string, DigitLandmark>;

export type DigitCode = keyof typeof digitLandmarks;

// The right limb is drawn from above, with the tips facing up and digit 1 on the left.
export function digitGeometry(digit: DigitLandmark) {
  const wide = digit.number === 1;
  const halfWidth = wide ? 40 : digit.part === "foot" ? 28 : 31;
  const centre = 157;
  const tipY = digit.part === "hand" ? 62 : 86;
  const nailBase = tipY + (digit.part === "hand" ? 76 : wide ? 58 : 43);
  const nailHalf = halfWidth - 10;
  const left = centre - nailHalf;
  const right = centre + nailHalf;
  const x = digit.position === "tip" ? centre : digit.position === "firstSide" ? left : right;
  const y = digit.position === "tip" ? tipY : nailBase;
  return { centre, halfWidth, tipY, left, right, nailBase, x, y };
}
