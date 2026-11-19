import { onView } from "./types";

const thoracic = [
  ["bl11", 1, 1.5], ["bl12", 2, 1.5], ["bl13", 3, 1.5], ["bl14", 4, 1.5],
  ["bl15", 5, 1.5], ["bl16", 6, 1.5], ["bl17", 7, 1.5], ["bl18", 9, 1.5],
  ["bl19", 10, 1.5], ["bl20", 11, 1.5], ["bl21", 12, 1.5],
  ["bl41", 2, 3], ["bl42", 3, 3], ["bl43", 4, 3], ["bl44", 5, 3], ["bl45", 6, 3],
  ["bl46", 7, 3], ["bl47", 9, 3], ["bl48", 10, 3], ["bl49", 11, 3], ["bl50", 12, 3],
  ["gv6", 11, 0], ["gv7", 10, 0], ["gv8", 9, 0], ["gv9", 7, 0], ["gv10", 6, 0],
  ["gv11", 5, 0], ["gv12", 3, 0], ["gv13", 1, 0],
] as const;
const lumbar = [
  ["bl22", 1, 1.5], ["bl23", 2, 1.5], ["bl24", 3, 1.5], ["bl25", 4, 1.5], ["bl26", 5, 1.5],
  ["bl51", 1, 3], ["bl52", 2, 3], ["gv3", 4, 0], ["gv4", 2, 0], ["gv5", 1, 0],
] as const;
const sacralRows = [
  ["bl27", 1, 1.5], ["bl28", 2, 1.5], ["bl29", 3, 1.5], ["bl30", 4, 1.5], ["bl53", 2, 3], ["bl54", 4, 3],
] as const;
const sacralHoles = [["bl31", 1], ["bl32", 2], ["bl33", 3], ["bl34", 4]] as const;
const sacralHoleY = (level: number) => 128 + level * 18;
export const sacralLandmarks = {
  hiatus: { x: 106, y: sacralHoleY(4) },
  trochanter: { x: 194, y: 206 },
} as const;
const { hiatus, trochanter } = sacralLandmarks;

export const posteriorThigh = {
  glutealMidpoint: { x: 110, y: 62 },
  poplitealCreaseY: 230,
  lateralTendonX: 152,
} as const;
const { glutealMidpoint, poplitealCreaseY, lateralTendonX } = posteriorThigh;
// WHO's gluteal fold to popliteal crease span is 14 B-cun.
const thighCun = (poplitealCreaseY - glutealMidpoint.y) / 14;

function vertebraLocation(level: number, offset: number, part: "胸椎" | "腰椎") {
  const anchor = `第${level}${part}の突起の下`;
  const levelText = offset ? `${anchor}端と同じ高さで、背骨の中央線から横へ${offset}寸` : `背骨の中央線で、${anchor}のくぼみ`;
  const sibling = offset === 1.5 ? "同じ高さの中央線と、中央から3寸離れた列の間です。"
    : offset === 3 ? "同じ高さでも、中央から1.5寸の列より外側です。" : "横にずれると、背骨の左右にある点の列になります。";
  const start = part === "腰椎" ? "背中から腰に下りたところ" : "首の付け根より下の背中";
  const guide = `${start}で、図の縦に並ぶ背骨から第${level}${part}の高さを確認します。${offset ? "骨の突起の下端と同じ高さを保って真横に視線を移します。" : "図の中央線上で、骨の突起のすぐ下の間を見ます。"}${sibling}自分で背骨の段を強く押して数える必要はありません。`;
  return { levelText, guide };
}

export const backPoints = {
  ...onView("back", thoracic.map(([code, level, offset]) => {
    const { levelText, guide } = vertebraLocation(level, offset, "胸椎");
    return [code, 106 + offset * 19, 37 + level * 16, `backMid thoracic${level}`, levelText, guide];
  })),
  ...onView("sacrum", lumbar.map(([code, level, offset]) => {
    const { levelText, guide } = vertebraLocation(level, offset, "腰椎");
    return [code, 106 + offset * 19, 24 + level * 19, `pelvicMid lumbar${level}`, levelText, guide];
  })),
  ...onView("sacrum", sacralRows.map(([code, level, offset]) => [
    code, 106 + offset * 19, sacralHoleY(level), `pelvicMid hole${level}`,
    `仙骨の上から${level}番目の孔と同じ高さで、仙骨の中央から横へ${offset}寸`,
    `腰の下にある三角形の骨を仙骨といいます。図で左右一対の孔を上から数え、${level}番目と同じ高さに合わせます。丸印は孔そのものから横へ離れた位置です。孔を探して皮膚を押し込まないでください。`,
  ])),
  ...onView("sacrum", sacralHoles.map(([code, level]) => [
    code, 132 - (level - 1) * 4, sacralHoleY(level), `hole${level} pelvicMid`,
    `腰の下の仙骨にある、上から${level}番目の左右一対の孔の位置`,
    `図で腰のすぐ下にある仙骨の外形を先に見ます。中央線の両側に並ぶ四つの孔のうち、上から${level}番目が目印です。孔の高さでさらに横へ離れた膀胱経の点と見分けます。外から孔を押して確かめる必要はありません。`,
  ])),
  ...onView("back", [
    ["gv14", 106, 37, "backMid cervico", "首の一番下の第7頸椎の突起のすぐ下、背中の中央線上", "首の後ろから背中へ移る境の出っ張りを図で確認します。中央線上でその下を見ます。第1胸椎の下にある陶道より一段上です。"],
  ]),
  ...onView("sacrum", [
    ["bl35", 116, 235, "coccyx pelvicMid", "背骨のいちばん下の尾骨の先端と同じ高さで、中央から横へ0.5寸", "仙骨の下に続く小さな骨を図で確認します。骨の先端から少し横です。仙骨に並ぶ孔を目印にする点よりも下で、中央線の点でもありません。"],
    ["gb30", trochanter.x + (hiatus.x - trochanter.x) / 3, trochanter.y + (hiatus.y - trochanter.y) / 3,
      "sacralNotch trochanterBack", "太ももの外側の骨と仙骨下部の中央を結ぶ線で、外側から3分の1", "お尻を後ろから見た図で、太ももの外の骨の出っ張りと、仙骨の下部の中央を確認します。二点を結び、太ももの外側の骨から3分の1の位置です。",
      `M${hiatus.x} ${hiatus.y}L${trochanter.x} ${trochanter.y}`],
    ["gv2", hiatus.x, hiatus.y, "sacralNotch pelvicMid", "腰の下にある仙骨の下部の開きの位置で、背中の中央線上", "腰の中央を下へたどり、尾骨につながる手前の仙骨の下部を図で確認します。腰陽関よりずっと下で、左右にある仙骨の孔より中央です。"],
  ]),
  ...onView("pelvis", [
    ["gv1", 106, 217, "perineumBack tailTip", "尾骨の先端と肛門との間の中点", "体の後ろ側の基準を示す図で、背骨の最後にある尾骨の先端と肛門を確認します。外性器と肛門を基準にする会陰とは、肛門をはさんだ前後が違います。"],
  ]),
  ...onView("thighBack", [
    ["bl36", glutealMidpoint.x, glutealMidpoint.y, "gluteFold hamstrings", "お尻と太ももの裏がつながる横じわの真ん中", "お尻の下端で横に伸びるしわを図で見ます。しわの内側の端や外側の端ではなく途中の中央です。殷門はそこからひざへ下がります。"],
    ["bl37", glutealMidpoint.x, glutealMidpoint.y + 6 * thighCun, "gluteFold hamstrings", "お尻の下のしわから6寸下で、太ももの裏の二つの筋肉の間", "お尻の下のしわの中央を出発点に、ひざ裏までのおよそ中間より上を見ます。太ももの後ろの内寄りと外寄りの筋肉の間です。",
      `M${glutealMidpoint.x} ${glutealMidpoint.y}V${poplitealCreaseY}`],
    ["bl38", lateralTendonX - 4, poplitealCreaseY - thighCun, "thighKneeCrease outerHamstring", "ひざ裏のしわより1寸上で、外側のすじの少し中央寄り", "ひざの後ろのしわの外端に近い、太ももの後ろへ続くすじを確認します。しわと同じ高さの委陽から少し上へ移り、すじの中央寄りを見ます。",
      `M${lateralTendonX - 4} ${poplitealCreaseY}v${-thighCun}`],
  ]),
};
