import type { RegionalSectionGroup, RegionalStructure } from "./types";

const limbBones = "https://openstax.org/books/anatomy-and-physiology/pages/8-2-bones-of-the-upper-limb";
const limbMuscles = "https://openstax.org/books/anatomy-and-physiology/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs";
const forearmImages = "https://pmc.ncbi.nlm.nih.gov/articles/PMC6704193/";
const fingerImages = "https://pmc.ncbi.nlm.nih.gov/articles/PMC11558498/";
const wristImages = "https://pmc.ncbi.nlm.nih.gov/articles/PMC4579750/";

const armAxes = { horizontal: ["外側", "体の中心側"], vertical: ["前側", "後ろ側"] } as const;
const palmAxes = { horizontal: ["親指側", "小指側"], vertical: ["手のひら側", "手の甲側"] } as const;
const dorsalAxes = { horizontal: ["親指側", "小指側"], vertical: ["手の甲側", "手のひら側"] } as const;
const forearmOutline = "M49 123C53 81 110 52 188 46C272 35 374 53 431 82C482 107 462 159 419 188C369 223 273 232 190 221C116 213 46 176 49 123Z";
const handOutline = "M34 147C35 105 58 77 100 66C156 51 228 60 281 54C353 46 428 55 463 88C487 111 473 162 437 180C348 222 173 224 89 198C53 187 31 173 34 147Z";

function oval(name: string, kind: RegionalStructure["kind"], description: string, cx: number, cy: number, rx: number, ry: number): RegionalStructure {
  return { name, kind, description, shape: { cx, cy, rx, ry }, badge: [cx, cy] };
}

export const upperLimbSections: readonly RegionalSectionGroup[] = [
  {
    codes: "ht1",
    section: {
      name: "わきの前壁と後壁",
      plane: "右のわきの上部を横に切った代表図",
      axes: armAxes,
      outline: "M40 110C58 69 101 52 164 56C208 61 244 84 281 78C341 69 382 44 429 65C473 85 478 164 439 193C398 223 328 182 282 191C207 205 177 224 102 206C47 193 18 153 40 110Z",
      structures: [
        { name: "大胸筋", kind: "muscle", description: "わきの前のしわを作る筋の一つです。胸から上腕へ続きます。", shape: { d: "M197 82C264 89 311 71 401 72C425 74 431 102 408 115C330 127 265 120 218 108Z" }, badge: [341, 97] },
        { name: "広背筋", kind: "muscle", description: "大円筋とともに、わきの後ろのしわを作ります。", shape: { d: "M189 179C249 198 301 172 349 163C394 155 440 179 418 195C364 199 323 177 270 193C236 203 204 201 189 179Z" }, badge: [331, 175] },
        oval("上腕骨", "bone", "わきの外側にある上腕の骨です。", 129, 130, 45, 40),
      ],
      sources: [{ title: "OpenStax 上肢と肩帯の筋", url: limbMuscles, scope: "胸と背中の筋が上腕へ続く関係と、わきの前後の壁を理解するための資料です。" }],
    },
  },
  {
    codes: "lu3 lu4 li13 ht2 pc2 te11 te12",
    section: {
      name: "上腕の前後の筋",
      plane: "右上腕を横に切った代表図",
      axes: armAxes,
      outline: "M72 132C71 81 121 44 186 43C287 33 395 55 425 103C457 154 417 203 346 219C262 237 143 224 96 188C81 175 74 155 72 132Z",
      structures: [
        { name: "上腕二頭筋", kind: "muscle", description: "上腕の前側の筋です。ひじを曲げる働きがあります。", shape: { d: "M126 99C142 70 208 56 271 57C320 57 352 69 373 95C352 119 310 115 280 103C252 88 206 96 184 116C160 122 138 116 126 99Z" }, badge: [245, 73] },
        oval("上腕骨", "bone", "上腕の中心を通る一本の骨です。", 249, 134, 32, 30),
        { name: "上腕三頭筋", kind: "muscle", description: "上腕の後ろ側に広がり、ひじの後ろへ続く筋です。", shape: { d: "M133 159C151 137 184 125 208 126C202 158 220 179 250 179C281 179 298 157 292 131C331 124 374 137 396 160C408 180 374 202 339 209C260 225 174 212 143 188C132 180 129 168 133 159Z" }, badge: [271, 199] },
      ],
      sources: [{ title: "ユタ大学医学部 上肢の解剖実習資料", url: "https://anatomy.med.utah.edu/diganat/SOM/unit_4/lec/Dry_Lab_UE_08_F.pdf", scope: "上腕骨を挟んだ前側と後ろ側の筋の代表配置を参照しています。" }],
    },
  },
  {
    codes: "li14 te13",
    section: {
      name: "肩から上腕へ続く三角筋",
      plane: "右上腕の肩寄りを横に切った代表図",
      axes: armAxes,
      outline: "M59 141C63 84 110 49 176 40C248 30 357 47 410 84C450 111 439 166 405 200C370 237 280 232 225 220C141 219 57 199 59 141Z",
      structures: [
        { name: "三角筋", kind: "muscle", description: "肩の外側を包む筋です。上腕骨の外側へ向かって細くなります。", shape: { d: "M84 150C69 114 100 65 157 56C195 48 225 58 245 78C210 83 170 106 163 144C158 173 175 200 195 211C134 214 91 185 84 150Z" }, badge: [117, 133] },
        oval("上腕骨", "bone", "三角筋が外側を覆う、上腕の骨です。", 227, 138, 44, 39),
        oval("上腕二頭筋", "muscle", "三角筋より体の中心側で、上腕の前に続く筋です。", 315, 84, 51, 25),
      ],
      sources: [{ title: "OpenStax 上肢と肩帯の筋", url: limbMuscles, scope: "三角筋の広がりと上腕骨への付着、二頭筋が前側を通ることを参照しています。" }],
    },
  },
  {
    codes: "lu5 li11 li12 ht3 pc3",
    section: {
      name: "ひじの外側上顆と内側上顆",
      plane: "ひじを前から見た前額断の代表図",
      axes: { horizontal: ["親指側", "小指側"], vertical: ["肩側", "手首側"] },
      outline: "M100 32C162 28 201 38 248 39C310 38 369 28 409 45C430 64 423 108 432 145C441 181 419 221 387 236C329 248 256 232 199 242C142 252 97 241 77 220C60 199 69 170 71 143C73 113 66 55 100 32Z",
      structures: [
        { name: "上腕骨", kind: "bone", description: "ひじの上側の骨。下端には外側と内側の出っ張りがあります。", shape: { d: "M209 42L290 42C288 82 322 108 351 112C378 115 384 142 356 152C327 161 297 142 257 147C208 153 177 161 140 148C110 137 123 115 154 111C186 107 213 77 209 42Z" }, badge: [249, 101] },
        { name: "橈骨", kind: "bone", description: "親指側を走る前腕の骨。ひじでは上腕骨の外側寄りと関節を作ります。", shape: { d: "M131 169C149 158 183 160 203 170L194 188L177 234L149 235L153 193C132 192 124 180 131 169Z" }, badge: [160, 175] },
        { name: "尺骨", kind: "bone", description: "小指側を走り、ひじでは上腕骨と組み合う骨です。", shape: { d: "M260 167C289 151 335 157 357 171C349 187 323 187 319 207L303 233L272 233L283 199C282 185 250 188 260 167Z" }, badge: [310, 175] },
      ],
      sources: [{ title: "OpenStax 上肢の骨とひじの関節", url: limbBones, scope: "上腕骨の内側・外側上顆と、橈骨・尺骨との関節を参照しています。" }],
    },
  },
  {
    codes: "si8 te10",
    section: {
      name: "ひじの後ろと肘頭",
      plane: "横から見た、ひじ内側寄りの縦断模式図",
      axes: { horizontal: ["ひじの前", "ひじの後ろ"], vertical: ["肩側", "手首側"] },
      outline: "M115 38C184 21 295 27 346 57C393 85 405 134 381 163C347 201 293 203 261 226C215 250 128 233 104 200C73 158 66 65 115 38Z",
      structures: [
        { name: "上腕骨", kind: "bone", description: "上腕の骨です。ひじの下側で尺骨と接します。", shape: { d: "M149 42H218L223 91C232 119 226 147 193 152C158 156 143 141 148 112Z" }, badge: [187, 103] },
        { name: "尺骨の肘頭", kind: "bone", description: "ひじの後ろで触れる骨の出っ張りです。尺骨の上端にあたります。", shape: { d: "M261 143C241 130 220 127 213 145C206 161 228 172 222 182L178 226L250 227L291 177C301 162 283 144 261 143Z" }, badge: [261, 157] },
        { name: "上腕三頭筋の腱", kind: "tendon", description: "上腕後面から続き、肘頭に付着します。", shape: { d: "M280 56L301 59C307 87 299 124 278 150L257 142C275 118 283 90 280 56Z" }, badge: [289, 109] },
      ],
      sources: [
        { title: "OpenStax 上肢の骨とひじの関節", url: limbBones, scope: "肘頭が尺骨の上端にあたる点を参照しています。" },
        { title: "OpenStax 上肢と肩帯の筋", url: limbMuscles, scope: "上腕三頭筋の停止部を参照しています。" },
      ],
    },
  },
  {
    codes: "lu6 pc4 pc5 pc6",
    section: {
      name: "手のひら側の前腕",
      plane: "右前腕中央付近を横に切った代表図",
      axes: palmAxes,
      outline: forearmOutline,
      structures: [
        { name: "前腕の屈筋群", kind: "muscle", description: "前腕の手のひら側を通る筋のまとまりです。手首や指を曲げる筋が含まれます。", shape: { d: "M90 112C137 44 288 47 391 81C420 92 430 118 407 132C354 117 307 103 245 106C174 113 126 132 90 112Z" }, badge: [249, 79] },
        oval("橈骨", "bone", "前腕を構成する骨のうち、親指側にあります。", 160, 144, 36, 27),
        oval("尺骨", "bone", "もう一方の骨で、小指側を走ります。", 346, 143, 28, 25),
      ],
      sources: [{ title: "前腕前面の超音波・MRI解剖", url: forearmImages, scope: "前腕の断面画像で確認できる橈骨・尺骨と屈筋群の並びを参照しています。" }],
    },
  },
  {
    codes: "li6 li7 li8 li9 li10 si6 si7 te5 te6 te7 te8 te9",
    section: {
      name: "手の甲側の前腕",
      plane: "右前腕を手の甲側を上にして示す横断模式図",
      axes: dorsalAxes,
      outline: "M52 134C52 89 90 62 147 54C214 38 292 38 357 54C420 68 455 90 455 136C455 185 409 206 349 216C281 229 193 221 133 211C81 202 47 174 52 134Z",
      structures: [
        { name: "前腕の伸筋群", kind: "muscle", description: "前腕の手の甲側にある筋のまとまりです。手首や指を伸ばす筋が含まれます。", shape: { d: "M78 120C92 78 165 52 230 53C305 49 387 67 427 104C410 136 357 122 306 118C252 107 187 104 144 122C115 136 93 128 78 120Z" }, badge: [251, 78] },
        oval("橈骨", "bone", "親指側にある前腕の骨です。", 155, 152, 36, 27),
        oval("尺骨", "bone", "小指側にある前腕の骨です。骨の端は手首やひじの近くの目印にもなります。", 352, 146, 28, 25),
      ],
      sources: [{ title: "前腕の骨と伸筋群の横断画像", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6837798/", scope: "図1の前腕断面を参照し、骨と手の甲側の筋群をまとめて表示しています。" }],
    },
  },
  {
    codes: "lu7 lu8 lu9 li5",
    section: {
      name: "親指側の手首と二本の腱",
      plane: "橈骨の手首寄りを横に切った代表図",
      axes: dorsalAxes,
      outline: "M70 133C65 92 114 63 166 58C261 44 368 64 416 87C462 110 444 162 404 190C342 228 221 217 157 210C110 205 77 178 70 133Z",
      structures: [
        oval("橈骨の手首側", "bone", "親指側の前腕の骨が、手首に向かって広くなります。", 204, 139, 75, 46),
        oval("長母指外転筋の腱", "tendon", "手首の親指側を通って、親指につながる骨の根元へ続きます。", 130, 88, 18, 14),
        oval("短母指伸筋の腱", "tendon", "長母指外転筋の腱に並び、親指へ向かいます。", 173, 77, 15, 13),
        oval("尺骨の手首側", "bone", "前腕のもう一方の骨で、小指側にあります。", 343, 136, 41, 33),
      ],
      sources: [{ title: "手首背側の超音波解剖", url: wristImages, scope: "橈骨の親指側に並ぶ長母指外転筋腱と短母指伸筋腱を参照しています。" }],
    },
  },
  {
    codes: "ht4 ht5 ht6 ht7 pc7",
    section: {
      name: "手のひら側の手首の腱",
      plane: "右前腕の手首に近い部分を横に切った代表図",
      axes: palmAxes,
      outline: "M54 114C80 70 148 54 207 55C281 53 384 62 430 95C466 122 454 172 411 193C354 224 256 215 199 213C122 213 72 192 57 163C48 149 45 129 54 114Z",
      structures: [
        oval("橈側手根屈筋の腱", "tendon", "手のひら側を走る腱のうち、親指寄りにあります。", 154, 89, 23, 15),
        oval("長掌筋の腱", "tendon", "手首の中央寄りを通る腱です。この腱がない人もいます。", 238, 79, 19, 12),
        oval("尺側手根屈筋の腱", "tendon", "小指側を走り、手首の豆状骨へ続く腱です。", 366, 106, 27, 17),
        oval("橈骨", "bone", "親指側に位置する前腕の骨です。", 153, 155, 53, 30),
      ],
      sources: [
        { title: "前腕前面の超音波・MRI解剖", url: forearmImages, scope: "前腕の手首寄りで目印になる腱の並びを参照しています。" },
        { title: "長掌筋の個人差を調べた解剖研究", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4378718/", scope: "長掌筋がない場合や形が異なる場合について参照しています。" },
      ],
    },
  },
  {
    codes: "si4 si5 te4",
    section: {
      name: "手首の手根骨と伸筋腱",
      plane: "右手首の手根骨の近位列を横に切った代表図",
      axes: dorsalAxes,
      outline: "M43 137C43 98 84 73 130 63C204 46 300 51 371 66C424 77 462 116 457 151C444 204 380 216 309 218C232 221 162 216 101 196C68 186 43 162 43 137Z",
      structures: [
        oval("舟状骨", "bone", "手根骨の近位列のうち、親指側にある骨です。", 141, 139, 39, 31),
        oval("月状骨", "bone", "舟状骨と三角骨の間にある骨です。", 245, 145, 42, 34),
        oval("三角骨", "bone", "手根骨の近位列の小指側にあります。", 355, 140, 36, 29),
        oval("総指伸筋の腱", "tendon", "指を伸ばす筋から続き、複数の腱が手首の手の甲側を通ります。", 252, 85, 40, 14),
      ],
      sources: [
        { title: "OpenStax 上肢の骨", url: limbBones, scope: "近位手根列の骨と向きを参照しています。" },
        { title: "手首背側の超音波解剖", url: wristImages, scope: "手根骨の手の甲側を通る伸筋腱の配置を参照しています。" },
      ],
    },
  },
  {
    codes: "lu10 li3 li4 ht8 si3 pc8 te3",
    section: {
      name: "手のひらを支える中手骨",
      plane: "右手の中手骨の並びを横に切った代表図",
      axes: dorsalAxes,
      outline: handOutline,
      structures: [
        { name: "中手骨", kind: "bone", description: "指の付け根と手首の間に一本ずつ並ぶ骨です。横に切った図では骨の断面が並びます。", shape: { d: "M79 119a18 22 0 1 0 36 0a18 22 0 1 0-36 0M153 130a19 24 0 1 0 38 0a19 24 0 1 0-38 0M229 127a21 24 0 1 0 42 0a21 24 0 1 0-42 0M309 131a19 23 0 1 0 38 0a19 23 0 1 0-38 0M383 137a18 22 0 1 0 36 0a18 22 0 1 0-36 0" }, badge: [249, 127] },
        oval("骨間筋", "muscle", "中手骨どうしの間にあり、指を開いたり閉じたりする動きに関わります。", 208, 123, 15, 27),
        { name: "指を曲げる腱", kind: "tendon", description: "前腕から手へ続き、指を曲げる腱です。手のひら側に並びます。", shape: { d: "M160 174a15 10 0 1 0 30 0a15 10 0 1 0-30 0M236 174a15 10 0 1 0 30 0a15 10 0 1 0-30 0M310 174a15 10 0 1 0 30 0a15 10 0 1 0-30 0M384 174a15 10 0 1 0 30 0a15 10 0 1 0-30 0" }, badge: [251, 174] },
      ],
      sources: [
        { title: "OpenStax 上肢の骨", url: limbBones, scope: "中手骨の本数と手の骨格の向きを参照しています。親指の中手骨の見え方は断面の位置で変わります。" },
        { title: "OpenStax 上肢と肩帯の筋", url: limbMuscles, scope: "中手骨間の筋と前腕から指へ続く腱を参照しています。" },
      ],
    },
  },
  {
    codes: "li2 si2 te2",
    section: {
      name: "指の付け根の骨と腱",
      plane: "指の付け根付近を一本分、横に切った代表図",
      axes: { horizontal: ["指の片側", "反対側"], vertical: ["手の甲側", "手のひら側"] },
      outline: "M109 124C109 68 180 46 250 44C321 44 390 67 393 124C395 186 322 215 251 217C172 220 110 183 109 124Z",
      structures: [
        oval("基節骨", "bone", "指の付け根から最初の関節までにある指の骨です。", 250, 123, 58, 42),
        oval("指を伸ばす腱", "tendon", "手の甲側から指に続き、指を伸ばす動きに関わります。", 250, 68, 33, 11),
        oval("指を曲げる腱", "tendon", "指の手のひら側を通ります。", 250, 181, 42, 14),
      ],
      sources: [{ title: "指の骨と腱の超音波解剖", url: fingerImages, scope: "指の背側の伸筋腱、掌側の屈筋腱と指の骨の並びを参照しています。" }],
    },
  },
  {
    codes: "lu11 li1 ht9 si1 pc9 te1",
    section: {
      name: "指先の爪と末節骨",
      plane: "爪がある高さで指先を横に切った代表図",
      axes: { horizontal: ["爪の片側", "反対側"], vertical: ["爪側", "指の腹側"] },
      outline: "M109 118C110 83 142 64 180 57C226 46 285 47 328 58C373 69 393 93 394 128C396 180 336 211 254 215C170 218 106 178 109 118Z",
      structures: [
        { name: "爪", kind: "surface", description: "指先の甲側を覆う硬い板です。爪の角は体表の位置を読むときの目印になります。", shape: { d: "M145 83C172 42 325 42 355 83L338 88C310 58 190 58 162 88Z" }, badge: [251, 59] },
        oval("末節骨", "bone", "指先にある骨です。", 252, 112, 54, 26),
        oval("指の腹の組織", "softTissue", "爪と反対側にある柔らかい部分です。", 253, 172, 89, 23),
      ],
      sources: [{ title: "指と爪の超音波解剖", url: fingerImages, scope: "爪の下にある末節骨と、指の腹側との位置関係を参照しています。" }],
    },
  },
];
