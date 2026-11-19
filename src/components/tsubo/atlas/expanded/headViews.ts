import { profileLandmarks } from "@/data/tsubo/atlas/expanded/head";
import { feature as f, type View } from "./views";

const { earApex, posteriorEarRootX, mastoidCentre, mastoidTip, templeEdge } = profileLandmarks;
const faceOutline = "M105 22Q177 22 183 88Q187 108 183 130Q187 169 165 204Q143 233 106 249Q67 235 42 208Q21 179 24 134Q21 96 30 65Q50 24 105 22Z";
const profileOutline = "M152 37Q184 55 187 92Q192 130 177 152Q164 171 170 227L115 232Q112 220 102 206Q93 214 75 218Q58 215 58 201L57 190Q48 187 54 176L48 172Q47 166 57 159L45 154Q39 149 45 143L64 116Q64 79 90 51Q114 22 152 37Z";
const upperEar = `M128 112Q135 108 ${earApex.join(" ")}Q151 108 155 117`;
const earOutline = `${upperEar}Q161 134 147 153Q143 169 133 170Q123 169 124 159L121 151Q117 147 123 144L124 130Q120 120 128 112Z`;
const scalpOutline = "M106 25C155 25 187 64 192 125Q198 174 168 222Q145 255 106 265Q66 255 44 222Q15 174 20 125C23 64 57 25 106 25Z";
const trapezius = "M128 124Q126 180 172 235M83 125Q80 178 42 233";
const sideNeckOutline = "M130 28Q152 22 171 44Q182 61 182 81Q177 109 176 131Q175 173 186 204L199 225Q202 242 193 259H33Q23 252 30 236Q51 217 64 196Q72 176 72 161L63 135Q55 115 57 102L50 89Q43 85 47 75L55 63Q56 46 71 38Q92 23 130 28Z";

export const headViews = {
  face: {
    name: "顔の正面", direction: "front", area: "head", outline: faceOutline,
    details: [
      "M32 86Q39 49 66 42Q101 57 143 41Q164 47 178 78",
      "M59 100q16-12 30 0q-14 7-30 0M115 100q18-12 37 0q-20 8-37 0",
      "M103 113Q101 134 95 148Q104 155 119 150M94 169Q104 161 116 169",
      "M80 186Q94 177 106 184Q121 176 132 186Q108 200 80 186",
      "M91 204Q106 211 120 204",
    ],
    features: {
      orbit: f("目を囲む骨", 170, 119, "M115 90Q137 80 155 91Q163 103 151 119Q135 125 118 115Z"),
      pupil: f("瞳の中心の線", 148, 48, "M138 63V165", "guide"),
      cheek: f("頬骨", 173, 149, "M144 120Q157 118 166 129L154 139"),
      infraorbitalForamen: f("目を囲む骨の下の孔", 165, 147, "M138 127a6 6 0 1 0 0 12a6 6 0 1 0 0 -12"),
      nose: f("小鼻と鼻先", 82, 150, "M93 142Q87 151 96 156M117 142Q130 150 121 156M95 150Q105 145 118 151", "soft"),
      mouth: f("口元", 68, 188, "M78 185Q94 179 105 185Q119 179 135 188Q111 200 78 185", "soft"),
      jaw: f("下あごの骨", 152, 223, "M159 171L166 200Q147 227 105 238Q64 226 44 200L50 173"),
      brow: f("眉", 82, 70, "M59 83Q76 74 91 82M115 83Q135 75 160 83", "soft"),
      temple: f("こめかみ", 172, 79, "M164 89Q174 101 171 114", "soft"),
      fold: f("小鼻から口元の溝", 148, 173, "M129 153Q141 168 137 188", "guide"),
      faceMid: f("顔の中央線", 105, 50, "M105 57V228", "guide"),
    },
  },
  profile: {
    name: "頭の横・正面は左", direction: "side", area: "head", outline: profileOutline,
    details: ["M68 119Q86 109 101 115", "M66 172Q77 173 84 175", earOutline],
    features: {
      jawSide: f("下あごの骨・関節", 91, 229, "M117 142Q124 164 116 190Q100 209 72 208"),
      masseter: f("かむ筋肉の縁", 114, 184, "M100 148Q127 158 116 196L92 203", "soft"),
      arch: f("頬骨の弓", 81, 120, "M81 129Q102 132 122 128"),
      templeHair: f("額・こめかみの／生え際", 72, 76, `M82 64Q78 82 97 91L${templeEdge.join(" ")}`, "guide"),
      ear: f("耳の輪郭", 145, 137, earOutline, "soft"),
      tragus: f("耳の入口の突起", 96, 155, "M124 139Q115 148 124 153", "soft"),
      mastoid: f("耳の後ろの骨", 192, 172, `M153 135Q166 144 ${mastoidCentre.join(" ")}Q156 167 ${mastoidTip.join(" ")}`),
      earTop: f("耳の頂点", 159, 94, upperEar, "soft"),
      earRoot: f("耳の付け根の後縁", 167, 112, `M${posteriorEarRootX} 109Q155 132 143 159`, "soft"),
      temporalLine: f("頭の横の生え際", 173, 87, `M${templeEdge.join(" ")}Q135 86 ${posteriorEarRootX} 101Q167 114 172 127Q172 155 162 175L167 203`, "guide"),
      temporalArtery: f("こめかみを通る動脈", 94, 99, "M104 123Q109 110 105 100Q104 89 111 80", "soft"),
    },
  },
  scalp: {
    name: "頭を上から・額は上", direction: "top", area: "head", outline: scalpOutline,
    details: ["M41 66Q105 56 171 66", "M38 231Q106 258 173 231", "M25 132Q11 138 23 164M187 132Q202 137 188 164"],
    features: {
      frontHair: f("前の生え際", 75, 56, "M42 66Q105 60 171 66", "guide"),
      forehead: f("額の骨", 128, 39, "M75 45Q103 32 137 45"),
      headMid: f("頭の中央線", 85, 119, "M106 62V247", "guide"),
      pupilLine: f("瞳の真上の列", 150, 142, "M142 65V165", "guide"),
      backHair: f("後ろの生え際", 82, 244, "M55 232Q104 252 155 232", "guide"),
    },
  },
  nape: {
    name: "後頭部とうなじ", direction: "back", area: "neck", outline: "M106 24Q163 23 174 76Q182 103 163 125Q151 146 156 186Q166 203 198 235L198 267H14V235Q49 208 56 186Q65 150 49 123Q31 99 39 76Q48 24 106 24Z",
    details: ["M43 104Q106 118 169 104", "M83 146Q70 182 43 222M129 146Q143 182 169 222"],
    features: {
      occiput: f("後頭部の骨", 82, 99, "M54 99Q82 92 106 103Q129 90 156 99"),
      napeMid: f("うなじの中央線", 96, 175, "M106 77V244", "guide"),
      cervical: f("第2頸椎の突起の上縁", 122, 176, "M99 158H113Q113 168 106 170Q101 168 99 158Z"),
      trapezius: f("背中から首に続く筋", 144, 183, trapezius, "soft"),
      neckMuscles: f("耳の下と背中から／首へ続く2つの筋", 174, 154, `${trapezius} M166 109Q155 123 158 150L169 182M46 109Q57 123 54 150L43 182`, "soft"),
    },
  },
  neck: {
    name: "首の前・あごは上", direction: "front", area: "neck", outline: "M46 26Q77 36 100 54Q129 37 155 26Q174 52 173 89Q166 133 174 176Q180 196 201 220L201 267H16V222Q51 197 58 174Q63 139 52 107Q39 67 46 26Z",
    details: ["M47 66Q79 103 100 103Q136 103 167 69", "M20 237Q65 212 100 226Q144 213 201 237"],
    features: {
      voice: f("のどぼとけ", 86, 135, "M92 133L100 138L109 132L105 148H96Z", "soft"),
      scm: f("耳の下から／鎖骨への筋肉", 164, 176, "M163 81Q146 109 147 136Q133 185 117 215M157 83Q122 134 118 167Q110 195 106 217M144 179L143 215", "soft"),
      lowerVoice: f("輪状の軟骨", 86, 162, "M94 158H107Q110 164 106 166H94Z", "soft"),
      collar: f("鎖骨", 138, 238, "M102 219Q133 209 183 224M98 219Q65 207 21 224"),
      neckMid: f("首の中央線", 87, 186, "M100 94V226", "guide"),
      jawNeck: f("下あごの角", 161, 77, "M165 77Q157 99 100 106Q67 103 46 77"),
      hyoid: f("舌を支える骨", 80, 110, "M89 117Q99 123 113 117"),
    },
  },
  neckSide: {
    name: "首を横から・前は左", direction: "side", area: "neck", outline: sideNeckOutline,
    details: ["M147 58q13-7 15 5q0 13-13 14", "M77 138H156M77 160H144", "M90 222Q58 217 37 244", "M166 89Q165 179 185 225"],
    features: {
      jawNeck: f("下あごの角", 92, 110, "M57 73Q73 85 110 94L118 77"),
      voice: f("のどぼとけの上縁", 79, 132, "M74 138H97L92 148H79Z", "soft"),
      lowerVoice: f("のどの輪状軟骨", 78, 180, "M74 158H94Q100 163 91 167H76Z", "soft"),
      scm: f("耳の下から／鎖骨への筋肉", 149, 190, "M147 66Q133 106 106 159Q95 199 90 223L102 229Q116 187 124 160Q149 116 156 66Z", "soft"),
    },
  },
  mouth: {
    name: "上唇の内側の模式図", direction: "front", area: "head", outline: "M36 105Q57 66 106 60Q154 64 178 105Q187 136 170 170Q139 208 106 211Q72 207 42 171Q22 139 36 105Z",
    details: ["M48 121Q106 96 167 120M44 154Q105 177 171 154"],
    features: {
      lipFold: f("上唇の裏のひだ", 86, 94, "M106 78Q100 99 106 121", "soft"),
      gum: f("上の歯ぐき", 141, 139, "M52 142Q106 114 162 142", "soft"),
    },
  },
} satisfies Record<string, View>;
