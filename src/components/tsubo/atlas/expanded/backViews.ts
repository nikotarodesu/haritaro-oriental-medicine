import { posteriorThigh, sacralLandmarks } from "@/data/tsubo/atlas/expanded/back";
import { feature as f, type View } from "./views";

const upperBack = "M88 18H124Q127 32 145 33L181 36Q198 39 203 60Q204 86 194 108Q182 138 187 169L186 221Q188 237 177 257Q145 269 106 266Q67 269 35 257Q24 237 26 221L25 169Q30 138 18 108Q8 86 9 60Q14 39 31 36L67 33Q85 32 88 18Z";
const lowerBack = "M31 23Q63 34 106 30Q149 34 181 23Q182 67 190 104L201 154Q210 187 196 222Q178 257 163 276H124L106 254L88 276H49Q34 257 16 222Q2 187 11 154L22 104Q30 67 31 23Z";
const { glutealMidpoint, poplitealCreaseY, lateralTendonX } = posteriorThigh;
const { midlineX, foramina, hiatus, posteriorIliacSpine, trochanter } = sacralLandmarks;

const thoracicLevels = Array.from({ length: 12 }, (_, index) => {
  const number = index + 1;
  const y = 37 + number * 16;
  return [`thoracic${number}`, f(`第${number}胸椎の突起／その下端`, 119, y - 8,
    `M99 ${y - 12}Q106 ${y - 17} 113 ${y - 12}L109 ${y - 4}L106 ${y}L103 ${y - 4}Z`)] as const;
});
const lumbarLevels = Array.from({ length: 5 }, (_, index) => {
  const number = index + 1;
  const y = 24 + number * 19;
  return [`lumbar${number}`, f(`第${number}腰椎の突起の下端`, 120, y - 8,
    `M97 ${y - 14}Q106 ${y - 18} 115 ${y - 14}L111 ${y - 6}L106 ${y}L101 ${y - 6}Z`)] as const;
});
const sacralOpenings = foramina.map(({ x, y }, index) => {
  const hole = (center: number) =>
    `M${center} ${y - 4}a3 4 0 1 0 0 8a3 4 0 1 0 0 -8Z`;
  const opposite = 2 * midlineX - x;
  return [`hole${index + 1}`, f(`仙骨の孔／上から${index + 1}番目`, opposite - 16, y,
    `${hole(x)} ${hole(opposite)}`)] as const;
});

export const backViews = {
  back: {
    name: "背中・首の付け根は上", area: "back", direction: "back", outline: upperBack,
    details: ["M26 58Q50 47 75 56L82 114L69 153Q38 139 30 104Z", "M186 58Q162 47 137 56L130 114L143 153Q174 139 182 104Z",
      "M31 80Q56 71 78 79M181 80Q156 71 134 79", "M76 176Q88 202 82 244M136 176Q124 202 130 244"],
    features: {
      backMid: f("背骨の中央線", 88, 48, "M106 23V251", "guide"),
      cervico: f("第7頸椎の突起の下端", 120, 24, "M98 27Q106 19 114 27L109 33L106 37L103 33Z"),
      ...Object.fromEntries(thoracicLevels),
    },
  },
  sacrum: {
    name: "腰とお尻を後ろから", area: "lumbar", direction: "back", outline: lowerBack,
    details: ["M92 121Q106 116 120 121L148 136L139 169L119 218H93L73 169L64 136Z",
      "M22 104Q51 105 79 122L69 144Q45 128 18 137M190 104Q161 105 133 122L143 144Q167 128 194 137",
      "M24 238Q63 255 99 247M113 247Q149 255 188 238"],
    features: {
      pelvicMid: f("背骨の中央線", 87, 46, "M106 29V244", "guide"),
      coccyx: f("尾骨の先端", 94, 238, "M101 217L106 235L111 220"),
      sacralNotch: f("仙骨の下部の開き", 92, 191, `M98 ${hiatus.y - 6}L${hiatus.x} ${hiatus.y}L114 ${hiatus.y - 6}`),
      posteriorIliacSpine: f("腰骨の後ろの／骨の出っ張り", 149, 148,
        `M145 151Q142 160 ${posteriorIliacSpine.x} ${posteriorIliacSpine.y}L137 172`),
      trochanterBack: f("太ももの外の骨の突起", 180, 213, `M172 258L178 239L${trochanter.x} ${trochanter.y}Q188 216 179 216L168 228L158 258`),
      ...Object.fromEntries(lumbarLevels),
      ...Object.fromEntries(sacralOpenings),
    },
  },
  thighBack: {
    name: "太ももの裏・お尻は上", area: "thigh", direction: "back",
    outline: "M54 33Q87 11 136 27Q163 36 174 64Q184 100 168 140L156 188Q154 215 160 236L148 270H77L73 234Q78 216 69 185Q59 142 48 103Q38 64 54 33Z",
    details: ["M93 159Q109 176 112 215"],
    features: {
      gluteFold: f("お尻の下のしわ", 72, 52, `M${glutealMidpoint.x - 59} ${glutealMidpoint.y - 7}Q${glutealMidpoint.x} ${glutealMidpoint.y + 7} ${glutealMidpoint.x + 59} ${glutealMidpoint.y - 7}`, "guide"),
      hamstrings: f("太ももの裏の筋肉", 128, 129, "M71 74Q88 106 95 151L97 204M151 73Q135 108 129 153L125 204", "soft"),
      thighKneeCrease: f("ひざ裏の横じわ", 87, 243, `M78 ${poplitealCreaseY}H158`, "guide"),
      outerHamstring: f("ひざ裏の外側の腱", 149, 200, `M143 160Q149 181 ${lateralTendonX} 218V${poplitealCreaseY + 8}`, "soft"),
    },
  },
} satisfies Record<string, View>;
