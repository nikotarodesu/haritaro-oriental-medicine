import { dorsalFootLandmarks, footLandmarks, medialFootLandmarks, type FootCode } from "./footLandmarks";
import type { LandmarkLabel } from "./landmarkLabels";
import { poplitealY, posteriorKnee, soleEndpoints } from "./legLandmarks";
import { sharedAnatomyLandmarks } from "./sharedAnatomyLandmarks";
import type { AtlasMarker } from "./types";

const { malleolus, navicular } = medialFootLandmarks;
const { secondMetatarsalBase, intermediateCuneiformFront, fifthExtensor, fourthMetatarsal, fifthMetatarsal } = dorsalFootLandmarks;

function label(name: string, x: number, y: number): LandmarkLabel {
  return { name, position: [x, y] };
}

const innerAnkle = label("内くるぶし", malleolus.x, malleolus.y);
const outerAnkle = label("外くるぶし", malleolus.x, malleolus.y);
const navicularBone = label("舟状骨の出っ張り", navicular.x, navicular.y);
const heelBone = label("かかとの骨（踵骨）", 85, 193);
const achilles = label("アキレス腱", 68, 119);
const bigToeJoint = label("親指の付け根の関節", 244, 182);
const littleToeJoint = label("小指の付け根の関節", 244, 183);
const fifthMetatarsalBase = label("第5中足骨の出っ張り", 158, 165);
const betweenKnee = label("ひざ裏の横じわ", 126, poplitealY);
const semitendinosus = label("半腱様筋の腱", 90, poplitealY);
const skinEdge = (x: number, y: number) => label("足の甲と足裏の境", x, y);

const footLabels: Readonly<Partial<Record<FootCode, readonly LandmarkLabel[]>>> = {
  st41: [label("長母趾伸筋腱", 118, 257), label("長趾伸筋腱", 139, 258),
    label("内くるぶし", 103, 239), label("外くるぶし", 161, 239)],
  st42: [label("第2中足骨の根元", ...secondMetatarsalBase), label("中間楔状骨", ...intermediateCuneiformFront),
    label("足の甲の動脈", 130, 228)],
  st43: [label("第2趾の付け根", 120, 100), label("第2中足骨", 124, 142), label("第3中足骨", 158, 151)],
  st44: [label("第2趾と第3趾のまた", 138, 97), label("第2趾の付け根", 120, 100), label("第3趾の付け根", 159, 104)],
  lr2: [label("親指と第2趾のまた", 100, 100), label("親指の付け根", 75, 101), label("第2趾の付け根", 120, 100)],
  gb41: [label("第4中足骨の根元", ...fourthMetatarsal.base), label("第5中足骨の根元", ...fifthMetatarsal.base),
    label("小指を伸ばす腱", ...fifthExtensor.middle)],
  gb42: [label("第4趾の付け根", 186, 118), label("第4中足骨", 176, 160), label("第5中足骨", 197, 180)],
  gb43: [label("第4趾と小指のまた", 199, 127), label("第4趾の付け根", 186, 118), label("小指の付け根", 210, 141)],
  lr4: [innerAnkle, label("前脛骨筋の腱", 125, 113)],
  sp2: [bigToeJoint, skinEdge(273, 193)],
  sp3: [bigToeJoint, skinEdge(199, 179)],
  sp4: [label("第1中足骨の根元", 155, 155), skinEdge(184, 174)],
  sp5: [innerAnkle, navicularBone],
  ki2: [navicularBone, skinEdge(159, 165)],
  ki3: [innerAnkle, achilles],
  ki4: [innerAnkle, label("アキレス腱の付着部", 76, 175), heelBone],
  gb40: [outerAnkle, label("長趾伸筋腱", 145, 144)],
  bl60: [outerAnkle, achilles],
  bl61: [heelBone, skinEdge(102, 184)],
  bl62: [label("外くるぶしの下縁", malleolus.x, 115), heelBone],
  bl63: [label("立方骨", 145, 151), fifthMetatarsalBase, outerAnkle],
  bl64: [fifthMetatarsalBase, skinEdge(192, 183)],
  bl65: [littleToeJoint, skinEdge(199, 185)],
  bl66: [littleToeJoint, skinEdge(277, 196)],
};

const regionalLabels: Readonly<Partial<Record<string, readonly LandmarkLabel[]>>> = {
  pc7: [label("長掌筋の腱", 128, 206), label("橈側手根屈筋腱", 111, 205), label("手首のしわ", 144, 223)],
  lr3: [label("第1中足骨", 99, 157), label("第2中足骨", 133, 159),
    label("中足骨の根元が接する所", 126, 200), label("足の甲の動脈", 126, 183)],
  st35: [label("ひざのお皿（膝蓋骨）", 136, 131), label("膝蓋靱帯", 138, 171)],
  lr8: [betweenKnee, semitendinosus, label("半膜様筋の腱", 104, poplitealY)],
  ki10: [betweenKnee, semitendinosus],
  bl39: [betweenKnee, label("大腿二頭筋の腱", posteriorKnee.lateralTendon, poplitealY)],
  bl40: [label("ひざ裏の横じわ", 151, poplitealY)],
  sp9: [label("脛骨（すねの骨）の内側", 120, 128), label("脛骨の丸い上端の下縁", 110, 90)],
  gb34: [label("腓骨頭（外側の骨）", 127, 62)],
  bl57: [label("ふくらはぎの腓腹筋", 143, 122), label("アキレス腱", 125, 190)],
  ki1: [label("第2趾と第3趾のまた", soleEndpoints.web.x, soleEndpoints.web.y),
    label("かかとの中央", soleEndpoints.heel.x, soleEndpoints.heel.y)],
};

const { indexBone, thumbBone } = sharedAnatomyLandmarks.li4;
export const heguLandmarkLabels = [
  { ...label(indexBone.name, 108, 201), number: indexBone.number },
  { ...label(thumbBone.name, 73, 194), number: thumbBone.number },
];

export function regionalLandmarkLabels(code: string, marker: AtlasMarker): readonly LandmarkLabel[] {
  const labels = marker.footCode ? footLabels[marker.footCode] : regionalLabels[code];
  if (!labels) throw new Error(`${code} is missing visual anchors`);
  return labels;
}

export function regionalLandmarkView(code: string, marker: AtlasMarker) {
  if (marker.footCode) {
    const { view } = footLandmarks[marker.footCode];
    if (view === "dorsal") return { caption: "右足の甲・つま先は上", left: 32 };
    const caption = view === "medial" ? "足の内側・つま先は右" : "足の外側・つま先は右";
    return { caption, left: marker.x > 200 ? 106 : 46 };
  }
  if (code === "lr3") return { caption: "右足の甲・つま先は上", left: 32 };
  if (code === "pc7") return { caption: "手首の手のひら側・親指は左", left: 0 };
  if (code === "st35") return { caption: "右ひざの前・外側は左", left: 0 };
  if (code === "ki1") return { caption: "足の裏・つま先は上", left: 0 };
  if (code === "sp9") return { caption: "脚の内側・かかとは左", left: 0 };
  if (code === "gb34") return { caption: "脚の外側・かかとは左", left: 0 };
  return { caption: "右脚を後ろから・外側は右", left: 0 };
}
