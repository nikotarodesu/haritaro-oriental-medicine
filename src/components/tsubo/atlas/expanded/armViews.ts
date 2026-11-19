import { posteriorShoulder } from "@/data/tsubo/atlas/expanded/arms";
import { feature as f, type View } from "./views";

const { axillaryFold, scapulaRidge, scapulaTip, neckBase, acromion } = posteriorShoulder;
const forearm = "M66 27Q110 15 158 27Q164 58 151 91Q155 123 149 168L145 230Q143 246 151 272L76 272Q87 246 79 224L69 178Q63 132 70 96Q50 58 66 27Z";
const upperArm = "M93 28Q108 13 140 27Q163 44 162 74Q162 91 147 104Q150 141 143 171Q146 204 152 237Q151 252 138 274H82Q72 254 75 236Q81 201 77 174Q72 139 77 107Q70 77 75 51Q79 36 93 28Z";
const biceps = "M122 82Q144 134 136 176Q132 202 116 226Q99 198 106 159Q103 110 122 82Z";
const bentElbow = "M78 25Q106 17 143 31Q141 57 145 91Q156 120 166 145Q174 171 152 193L97 251L61 214Q91 176 100 156Q107 137 93 118Q72 89 78 25Z";
const olecranon = "M109 171Q135 146 156 145Q166 153 150 170L114 193";
const hand = "M75 271Q78 235 61 201Q54 184 42 172L20 146Q10 128 22 119Q31 113 43 127L55 141L57 54Q57 40 68 38Q81 37 81 55L82 102L88 27Q89 13 101 13Q113 13 115 29L116 102L122 43Q125 29 135 31Q149 32 147 48L143 111L154 80Q158 66 170 70Q181 74 178 88L177 146Q183 176 167 206Q150 232 144 271Z";
const rays = {
  thumbRay: f("親指につながる骨", 34, 170, "M77 224Q64 187 52 170 M43 158L34 147 M30 140L24 131"),
  indexRay: f("人差し指につながる骨", 72, 181, "M91 223Q75 175 69 137 M68 124L68 95 M68 86V72 M68 63V50"),
  middleRay: f("中指につながる骨", 109, 201, "M104 226L103 129 M103 115V80 M102 71V54 M101 44V23"),
  ringRay: f("薬指につながる骨", 129, 184, "M117 227L129 132 M131 120L134 93 M135 84L136 66 M136 56L137 43"),
  littleRay: f("小指につながる骨", 155, 191, "M131 227Q155 189 165 151 M166 141L166 122 M167 113L168 101 M168 94L169 82"),
};

const forearmBones = {
  radius: f("親指側の骨（橈骨）", 87, 178, "M81 70Q79 112 84 154L91 219Q93 236 88 243"),
  ulna: f("小指側の骨（尺骨）", 123, 158, "M142 61Q140 117 139 151L140 236"),
};

export const armViews = {
  upperArm: {
    name: "二の腕の前・肩は上", direction: "front", area: "upperArm", outline: upperArm,
    details: ["M79 75Q110 64 142 91", "M85 235Q112 247 145 235", "M113 91L119 217"],
    features: {
      axillary: f("わきの前のしわ", 154, 75, "M134 78Q149 78 148 101", "guide"),
      biceps: f("力こぶの筋肉", 123, 158, biceps, "soft"),
      bicepsHeads: f("力こぶを作る／2つの筋の境", 109, 140, `${biceps} M122 84Q127 117 122 150L116 183`, "soft"),
      axillaryArtery: f("わきを通る動脈", 156, 118, "M152 66Q155 82 149 93Q141 109 138 132", "soft"),
      upperBone: f("上腕の骨", 94, 71, "M109 54Q116 44 129 53L120 215Q128 226 127 237H101Q99 227 107 214Z"),
      elbow: f("ひじのしわ", 130, 251, "M81 237Q111 247 145 237", "guide"),
      deltoid: f("肩を覆う筋肉", 98, 95, "M86 43Q122 22 149 56Q143 89 110 120Q90 117 86 43Z", "soft"),
    },
  },
  armBack: {
    name: "二の腕の後ろ", direction: "back", area: "upperArm", outline: upperArm,
    details: ["M86 65Q117 37 151 70", "M85 235Q116 250 145 235"],
    features: {
      elbowTip: f("ひじの尖った骨", 132, 238, "M100 242Q118 219 136 242L129 252Q118 246 107 252Z"),
      upperBackBone: f("上腕の骨", 112, 170, "M116 58Q131 53 130 69L124 214Q136 224 130 234H102Q98 226 109 211Z"),
      acromion: f("肩の外端（肩峰）", 136, 53, "M97 50Q124 43 154 59L148 70Q123 57 97 63Z"),
      deltoidBack: f("肩の丸い筋肉", 105, 91, "M87 58Q124 34 151 66Q143 97 120 110Q102 108 87 86Z", "soft"),
    },
  },
  elbowSide: {
    name: "ひじの外側・肩は上", direction: "side", area: "elbow", outline: bentElbow,
    details: ["M91 111Q120 111 145 97", "M113 166Q137 180 155 157"],
    features: {
      elbowBump: f("ひじの外側の骨", 131, 122, "M112 104Q137 98 142 125Q139 143 124 135Z"),
      humerusRidge: f("上腕の骨の稜", 101, 78, "M106 34Q113 67 127 113"),
      elbowTip: f("ひじの尖った骨", 156, 154, olecranon),
    },
  },
  elbowInside: {
    name: "ひじの内側・肩は上", direction: "back", area: "elbow", outline: bentElbow,
    details: ["M101 42Q113 76 121 107", "M112 183L85 224"],
    features: {
      medialEpicondyle: f("ひじの内側の骨", 120, 119, "M107 119Q117 111 132 116Q146 127 138 139Q127 141 112 133Z"),
      elbowTip: f("ひじの後ろの尖った骨", 156, 156, olecranon),
    },
  },
  forearmPalm: {
    name: "手のひら側の前腕", direction: "front", area: "forearm", outline: forearm,
    details: ["M64 58Q111 66 151 58", "M82 238Q113 246 144 238"],
    features: {
      ...forearmBones,
      elbowCrease: f("ひじのしわ", 115, 42, "M62 58Q108 62 155 58", "guide"),
      bicepsTendon: f("力こぶからの腱", 107, 85, "M102 26Q110 55 103 97", "soft"),
      wristCrease: f("手首のしわ", 112, 254, "M77 238Q111 241 148 238", "guide"),
      thumbTendons: f("親指につながる腱", 73, 202, "M89 159Q84 205 73 231M98 163Q96 214 84 243", "soft"),
      carpus: f("親指側の手首の骨", 100, 263, "M84 241L95 244L99 255L89 257Z"),
      innerElbow: f("ひじの内側の骨", 149, 77, "M144 42Q154 42 159 63Q155 72 145 66Z"),
      ulnarTendon: f("小指側を走る腱", 155, 206, "M145 102Q150 185 149 250", "soft"),
      outerElbow: f("ひじの外側の骨", 61, 78, "M62 52Q68 45 74 53L73 64Q64 72 62 52Z"),
    },
  },
  forearmBack: {
    name: "手の甲側の前腕", direction: "back", area: "forearm", outline: forearm,
    details: ["M65 58Q111 62 151 58", "M77 238Q113 244 145 238", "M108 108Q105 179 109 254M119 111Q116 178 120 254"],
    features: {
      ...forearmBones,
      wristBack: f("甲側の手首のしわ", 116, 255, "M77 238Q111 241 148 238", "guide"),
      elbowBack: f("ひじの高さ", 117, 43, "M65 58H153", "guide"),
      forearmBones: f("前腕の2本の骨／橈骨と尺骨", 161, 151, `${forearmBones.radius.path} ${forearmBones.ulna.path}`),
      olecranonBack: f("ひじの後ろの尖った骨", 101, 42, "M97 71Q99 59 112 58Q124 57 129 68Q131 75 124 79L109 77Z"),
    },
  },
  shoulderSide: {
    name: "肩の横・前は左", direction: "side", area: "shoulder", outline: "M74 32Q97 14 124 36Q140 46 172 64Q191 77 183 116Q178 141 177 164Q171 211 163 256H108Q104 222 93 187Q81 145 57 131Q34 108 45 78Q52 47 74 32Z",
    details: ["M62 118Q114 86 164 116", "M74 103Q80 164 113 193"],
    features: {
      acromionSide: f("肩の外の骨（肩峰）", 155, 103, "M103 109Q123 90 153 106L162 115L151 123Q127 111 108 121Z"),
      upperHead: f("上腕の骨のふくらみ", 161, 151, "M115 145Q126 121 144 133Q158 142 154 171L148 250H123L126 170Q112 161 115 145Z"),
      collarSide: f("鎖骨", 92, 70, "M60 77Q99 63 131 87"),
      shoulderSpine: f("肩甲骨を横切る骨", 148, 77, "M126 89Q151 93 172 63"),
    },
  },
  shoulderBack: {
    name: "右肩を背中側から", direction: "back", area: "shoulder", outline: "M30 20Q65 24 89 24Q108 52 135 50Q155 46 180 64Q202 83 197 131Q189 174 184 202L187 257H143Q141 227 130 212Q107 232 27 229L19 69Z",
    details: ["M32 57Q65 68 99 57", "M35 202Q78 203 110 182"],
    features: {
      axillaryBack: f("わきの後ろのしわ", 140, 211, `M${axillaryFold.x} ${axillaryFold.y}Q148 190 134 212`, "guide"),
      posteriorDeltoid: f("肩を覆う／三角筋の後縁", 193, 112, "M183 83Q174 106 181 147Q177 172 183 203", "soft"),
      shoulderBlade: f("肩甲骨", 135, 181, `M146 85Q158 89 182 102Q176 139 169 167Q153 192 ${scapulaTip.x} ${scapulaTip.y}L124 169L126 109Z`),
      shoulderSpine: f("肩甲骨の横の隆起", 171, 117, `M${scapulaRidge.inner.x} ${scapulaRidge.inner.y}L${scapulaRidge.outer.x} ${scapulaRidge.outer.y}`),
      upperSpine: f("首のつけ根の背骨", 98, 82, `M${neckBase.x} 48v148M${neckBase.x - 7} ${neckBase.y}h15m-15 19h15m-15 20h15m-15 20h15`, "guide"),
      acromionBack: f("肩の外端（肩峰）", 184, 76, `M166 66Q183 68 ${acromion.x} ${acromion.y}L174 95`),
    },
  },
  palm: {
    name: "左手の手のひら", direction: "front", area: "hand", outline: hand,
    details: ["M56 177Q91 180 87 221", "M82 147Q128 153 164 156", "M90 224Q105 185 149 178", "M77 250Q110 257 150 248"],
    features: { ...rays, palmEdge: f("手のひらの親指側", 38, 195, "M43 170L66 203L76 231", "guide") },
  },
  handBack: {
    name: "右手の甲", direction: "back", area: "hand", outline: hand,
    details: ["M76 247Q112 251 149 246", "M61 128Q80 135 92 129M145 151Q165 147 176 150"],
    features: {
      ...rays,
      indexJoint: f("人差し指の関節", 81, 127, "M61 130Q69 121 80 129"),
      littleJoint: f("小指の付け根の関節", 157, 151, "M151 155Q163 142 175 153"),
      thumbTendonsBack: f("親指につながる腱", 65, 210, "M64 226Q51 184 36 151M84 224Q77 182 49 152", "soft"),
      radialWrist: f("親指側の手首の骨", 85, 253, "M76 245L91 244L96 255L83 262Z"),
      ulnarWrist: f("小指側の手首の骨", 161, 252, "M137 239L150 236L151 252L140 260Z"),
      wristBack: f("手首の横じわ", 112, 263, "M77 246Q110 250 149 246", "guide"),
      handTendons: f("指を伸ばす腱", 109, 219, "M107 264L103 134M114 261L130 140", "soft"),
    },
  },
} satisfies Record<string, View>;
