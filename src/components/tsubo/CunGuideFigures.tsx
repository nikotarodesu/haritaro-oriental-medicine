import { CunRulerMarks } from "./CunRuler";

const bodyExamples = {
  forearm: {
    outline: "M25 9Q49 3 72 9L70 31Q68 58 64 91L67 102Q75 96 80 100Q83 103 78 109L68 123Q64 129 54 129H38Q31 129 30 122L33 99Q30 72 26 44Z",
    details: "M27 21Q49 26 71 21M33 105Q49 110 68 105M43 34q-1 33 4 64M55 35q2 29 1 62",
    from: [68, 105],
    to: [71, 21],
  },
  lowerLeg: {
    outline: "M39 9Q57 3 76 11L73 28Q77 51 69 72L63 92Q61 104 69 109L87 114Q94 119 89 124H42Q32 122 35 109L41 94Q44 83 34 60Q28 41 36 29Z",
    details: "M38 30q14-6 26 0M66 36Q60 56 52 84M36 108q25 5 32 0",
    from: [64, 105],
    to: [73, 21],
  },
  abdomen: {
    outline: "M18 8H82Q79 32 87 50Q95 76 87 92Q73 116 50 124Q28 116 13 92Q5 76 13 50Q21 32 18 8Z",
    details: "M50 19V101M20 73q15 13 30 28 15-15 30-28M46 103h8",
    from: [50, 21],
    to: [50, 105],
  },
} as const;

export function BoneCunExampleFigure({ area, span, amount }: {
  area: keyof typeof bodyExamples;
  span: number;
  amount: number;
}) {
  const { outline, details, from, to } = bodyExamples[area];
  const length = Math.abs(to[1] - from[1]);
  const rotation = to[1] > from[1] ? 90 : -90;

  return (
    <svg className="cun-body-figure" viewBox="0 0 143 136" aria-hidden="true" focusable="false">
      <path d={outline} className="cun-anatomy-outline" />
      <path d={details} className="cun-anatomy-detail" />
      <path d={`M${from.join(" ")}H112M${to.join(" ")}H112`} className="cun-anatomy-guide" />
      <circle cx={from[0]} cy={from[1]} r="3.5" className="cun-rail-marker" />
      <circle cx={to[0]} cy={to[1]} r="3" className="cun-anatomy-end" />
      <g transform={`translate(110 ${from[1]}) rotate(${rotation})`}>
        <CunRulerMarks length={length} span={span} amount={amount} />
      </g>
      <g className="cun-axis-label" fontSize="13" fontWeight="700">
        <text x="122" y={from[1] + 4}>0</text>
        <text x="122" y={to[1] + 4}>{span}</text>
      </g>
    </svg>
  );
}

const fingerExamples = {
  thumb: {
    outline: "M35 81L34 54Q31 44 33 35L35 19Q36 8 48 8Q59 8 61 20L63 37Q65 48 61 57L62 81Z",
    details: "M40 18Q48 14 56 18L57 31Q49 34 39 31ZM35 46Q49 50 62 46",
    from: [33, 46],
    to: [63, 46],
  },
  middle: {
    outline: "M20 83L15 72Q12 64 20 56L29 47L36 26Q42 12 55 11Q69 10 80 23Q86 31 83 40Q80 48 72 55L63 63Q57 65 49 63L43 72L44 83Z M42 47L49 30Q56 20 63 25Q72 28 72 36Q71 43 63 47L56 50Q50 47 42 47Z",
    details: "M35 29l12 5m19-18-5 11m1 22q3 2 5 9M20 56q10-5 22-9",
    from: [47, 34],
    to: [61, 27],
  },
  four: {
    outline: "M17 80L14 51L12 31Q12 25 17 24Q22 22 25 30L28 45L27 21Q27 14 34 13Q40 12 41 19L43 42L43 15Q43 7 51 7Q57 7 58 14L59 41L61 20Q62 14 69 15Q75 16 74 23L73 52L83 44Q90 40 93 46Q96 51 89 58L79 69L75 82Z",
    details: "M15 45l12 1m2-5 13 1m1-2 15 1m2 3h13M29 48l2 9m13-12v12m15-11-1 11",
    from: [14, 43],
    to: [74, 43],
  },
  width: {
    outline: "M30 81L32 23Q33 9 48 9Q62 9 64 22L66 81Z",
    details: "M38 18q10-4 20 0l1 16q-11 4-22 0ZM31 52q17 5 34 0",
    from: [32, 39],
    to: [64, 39],
  },
} as const;

export function FingerCunFigure({ kind }: { kind: keyof typeof fingerExamples }) {
  const { outline, details, from, to } = fingerExamples[kind];
  return (
    <svg className="cun-finger-figure" viewBox="0 0 104 88" aria-hidden="true" focusable="false">
      <path d={outline} className="cun-anatomy-outline" fillRule="evenodd" />
      <path d={details} className="cun-anatomy-detail" />
      <path d={`M${from.join(" ")}L${to.join(" ")}`} className="cun-rail-active" fill="none" strokeWidth="3" strokeLinecap="round" />
      <circle cx={from[0]} cy={from[1]} r="2.8" className="cun-rail-marker" />
      <circle cx={to[0]} cy={to[1]} r="2.8" className="cun-rail-marker" />
    </svg>
  );
}
