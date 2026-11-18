import { digitGeometry } from "@/data/tsubo/atlas/digits";
import type { AtlasCloseUpProps } from "@/data/tsubo/atlas/types";

// Dorsal view of the right hand/foot. Each line follows one ray to its tip.
const hands = {
  outline: "M33 121l-3-20C24 91 14 85 9 73L2 51q-1-8 5-9 5-1 8 5l11 18-6-43q-1-8 5-9 6-1 7 6l6 33-2-44q0-7 6-7 6 0 6 7l4 42 3-37q1-7 6-6 6 0 5 8l-1 39 6-25q2-6 7-5 5 1 4 7l-5 43q-1 15-13 28l1 19Z",
  rays: ["M39 94L23 75 7 49", "M44 93L34 58 26 21", "M49 92L47 53 42 8", "M54 93L58 55 61 15", "M59 94L69 64 77 32"],
  badges: [[22, 73], [34, 58], [47, 53], [58, 55], [69, 64]],
};
const feet = {
  outline: "M34 121q2-20-6-32C17 73 6 52 7 35L6 20Q6 7 15 7q10-1 12 11l1 12 1-16q1-10 7-10 7 1 7 11l-1 15 5-12q2-7 8-5 5 2 3 10l-2 14 6-11q3-6 8-4 4 2 2 10l-3 12 6-7q4-5 8-2 4 3 0 11l-7 15q-13 29-13 58Z",
  rays: ["M42 91L26 55 15 18", "M48 92L39 53 36 14", "M53 95L50 60 54 23", "M58 99L61 65 68 30", "M62 102L69 73 79 42"],
  badges: [[26, 55], [39, 53], [50, 60], [61, 65], [69, 73]],
};

export default function DigitRegion({ marker, label }: AtlasCloseUpProps) {
  const digit = marker.digit;
  if (!digit) throw new Error("A digit illustration requires a digit landmark");
  const isHand = digit.part === "hand";
  const isTip = digit.position === "tip";
  const { outline, rays, badges } = isHand ? hands : feet;
  const [badgeX, badgeY] = badges[digit.number - 1];
  // Metacarpal/metatarsal followed by two phalanges in digit 1, three in the others.
  const firstRaySegments = isHand ? "40 8 26 8 18" : "53 8 17 8 14";
  const otherRaySegments = isHand ? "37 7 21 7 11 7 10" : "52 7 12 7 6 7 9";
  const { centre, halfWidth, tipY, left, right, nailBase } = digitGeometry(digit);
  const side = centre - halfWidth;
  const farSide = centre + halfWidth;
  const base = nailBase + (isHand ? 74 : 48);
  const names = isHand ? ["親指", "人差し指", "中指", "薬指", "小指"] : ["親指", "第2趾", "第3趾", "第4趾", "小指"];
  const digitName = names[digit.number - 1];

  return (
    <>
      <g fill="#51463B" fontSize="12">
        <text x="12" y="26">{isHand ? "右手の甲から" : "右足の甲から"}</text>
        <text x="131" y="26">{digitName}を拡大</text>
      </g>
      <g transform="translate(9 69)">
        <path d={outline} fill="#F4E8D8" stroke="#A08F80" strokeWidth="1.6" />
        {rays.map((d, index) => (
          <path key={d} d={d} fill="none" pathLength="100" strokeDasharray={index === 0 ? firstRaySegments : otherRaySegments}
            stroke={index + 1 === digit.number ? "#BB6534" : "#D2C4B3"} strokeWidth={index + 1 === digit.number ? 5.5 : 4} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <circle cx={badgeX} cy={badgeY} r="7" fill="#9E4B20" />
        <text x={badgeX} y={badgeY + 3.5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">1</text>
      </g>
      <g fontSize="12" fill="#7F3520" fontWeight="bold">
        <text x="12" y="216">① {digitName}の骨</text>
      </g>
      <path d={`M${side} ${base}Q${side + 3} ${nailBase + 17} ${side} ${tipY + 41}Q${side - 1} ${tipY} ${centre} ${tipY}Q${farSide + 1} ${tipY} ${farSide} ${tipY + 41}L${farSide} ${base}Q${centre} ${base + 7} ${side} ${base}Z`}
        fill="#F4E8D8" stroke="#9B8D7D" strokeWidth="2" />
      <path d={`M${left} ${tipY + 30} Q${left} ${tipY + 12} ${centre} ${tipY + 12} T${right} ${tipY + 30} V${nailBase - 12} Q${right} ${nailBase} ${centre} ${nailBase} T${left} ${nailBase - 12}Z`}
        fill="#FDF7EE" stroke="#AB8475" strokeWidth="2" />
      <path d={`M${side + 8} ${base - 17}q${halfWidth - 8} 7 ${2 * halfWidth - 16} 0`} fill="none" stroke="#C6B6A5" strokeWidth="1.5" />
      {!isTip && <g stroke="#817B68" strokeWidth="1.3" strokeDasharray="3 3">
        <path d={`M${marker.x} ${tipY + 28}V${nailBase + 17} M${side - 5} ${nailBase}H${farSide + 5}`} />
      </g>}
      <path d={`M${marker.x} ${marker.y}L217 ${isTip ? 58 : 101}h9`} fill="none" stroke="#884B34" strokeWidth="1.6" />
      <text x="229" y={isTip ? 62 : 105} fill="#74391F" fontSize="14" fontWeight="bold">{label}</text>
      <text x="224" y="153" fill="#51463B" fontSize="12">{isTip ? "中指の先の中央" : "爪の横の縁と"}</text>
      {!isTip && <text x="224" y="170" fill="#51463B" fontSize="12">根元の線の交点</text>}
      <g fill="#51463B" fontSize="13">
        <text x="14" y="260">← {digit.number === 1 ? "親指の外縁" : "親指側"}</text>
        <text x="218" y="260">{digit.number === 5 ? "小指の外縁" : "小指側"} →</text>
      </g>
    </>
  );
}
