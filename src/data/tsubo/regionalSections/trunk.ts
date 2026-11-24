import type { RegionalSectionGroup } from "./types";

const thoracicCage = {
  title: "OpenStax — The Thoracic Cage",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-4-the-thoracic-cage",
  scope: "胸骨・肋骨・肋軟骨の並びを参照しました。",
};
const pectoralGirdle = {
  title: "OpenStax — The Pectoral Girdle",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/8-1-the-pectoral-girdle",
  scope: "鎖骨、肩甲棘、烏口突起、肩甲骨の縁を参照しました。",
};
const pectoralMuscles = {
  title: "OpenStax — Muscles of the Pectoral Girdle and Upper Limbs",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs",
  scope: "胸と肩甲骨を覆う筋の大まかな配置を参照しました。",
};
const thoraxAndAbdomen = {
  title: "OpenStax — Axial Muscles of the Abdominal Wall, and Thorax",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-4-axial-muscles-of-the-abdominal-wall-and-thorax",
  scope: "肋間筋・腹壁の筋と、正中にある白線を参照しました。",
};
const rectusStudy = {
  title: "Shanthiら — 腹横筋と腹直筋鞘の解剖研究（2024年）",
  url: "https://synapse.koreamed.org/upload/synapsexml/1049acb/pdf/acb-57-3-363.pdf",
  scope: "腹直筋と周囲の筋膜の関係が、へそを含む高さによって変わることを確認しました。図ではその境界の高さを指定していません。",
};
const pelvicGirdle = {
  title: "OpenStax — The Pelvic Girdle and Pelvis",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis",
  scope: "腸骨の前面の出っ張り、恥骨結合、仙骨と尾骨を参照しました。",
};
const pelvicFloorStudy = {
  title: "Pelvic Floor and Anal Canal — 献体断層画像とMRIからの三次元解剖研究",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4086924/",
  scope: "恥骨・尾骨と骨盤底の間の位置関係を参照しました。個別の形や大きさは省略しています。",
};
const vertebrae = {
  title: "OpenStax — The Vertebral Column",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
  scope: "胸椎・腰椎の棘突起と椎体、仙骨・尾骨の違いを参照しました。",
};
const backMuscles = {
  title: "OpenStax — Axial Muscles of the Head, Neck, and Back",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
  scope: "脊柱起立筋と、椎骨に近い深層の背筋の位置を参照しました。",
};
const thoracicMri = {
  title: "胸椎後面の筋を比較した縦断MRI研究",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9427759/",
  scope: "胸椎の後ろ・外側にある背筋の領域を参照しました。各経穴に対応する断面や個人の厚さは示していません。",
};
const lumbarMri = {
  title: "健康な人の腰部の背筋を評価したMRI研究",
  url: "https://pubmed.ncbi.nlm.nih.gov/39144006/",
  scope: "腰椎周囲での多裂筋と脊柱起立筋の位置関係を参照しました。",
};
const sacralForaminaStudy = {
  title: "後仙骨孔の形や並びを調べた骨標本の研究",
  url: "https://repository.up.ac.za/server/api/core/bitstreams/58259991-0ae8-4675-867a-1b7225bdd4ad/content",
  scope: "仙骨の背面に開く孔と、その数や形の個人差を参照しました。",
};
const hipMuscles = {
  title: "OpenStax — Appendicular Muscles of the Pelvic Girdle and Lower Limbs",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs",
  scope: "大殿筋と中殿筋が骨盤の後面や側面を覆う関係を参照しました。",
};

const anterior = { horizontal: ["体の右側", "体の左側"], vertical: ["体の前", "体の奥"] } as const;
const posterior = { horizontal: ["体の右側", "体の左側"], vertical: ["体の奥", "体の後ろ"] } as const;
const midline = { horizontal: ["体の前", "体の後ろ"], vertical: ["頭側", "足側"] } as const;

export const trunkSections: readonly RegionalSectionGroup[] = [
  {
    codes: "lu1 lu2 st13 ki27",
    section: {
      name: "鎖骨の下と胸の上部",
      plane: "鎖骨の周りを縦に切り、胸の前後を横から見た模式図",
      axes: midline,
      outline: "M71 56Q101 39 145 47Q169 36 210 36Q331 26 431 59L444 206Q318 228 262 217Q175 201 95 234Q63 193 60 128Q58 84 71 56Z",
      structures: [
        {
          name: "鎖骨", kind: "bone", badge: [165, 70],
          shape: { d: "M139 60Q165 48 193 56Q210 67 199 81Q189 94 168 91Q144 93 132 80Q122 66 139 60Z" },
          description: "胸の上で胸骨から肩甲骨へ向かって横に伸びる骨です。図ではその長い骨を横切った形を示します。",
        },
        {
          name: "大胸筋", kind: "muscle", badge: [115, 153],
          shape: { d: "M119 91Q140 92 166 97Q163 120 144 138Q127 168 138 207L102 218Q74 155 90 119Q101 98 119 91Z" },
          description: "胸の前面を覆う筋です。一部が鎖骨につながり、肋骨より体の前側を通ります。",
        },
        {
          name: "第1肋骨", kind: "bone", badge: [264, 139],
          shape: { d: "M206 122Q243 106 291 123Q316 132 314 149Q301 173 277 164Q243 153 211 152Q193 137 206 122Z" },
          description: "鎖骨より奥にある一番上の肋骨です。この図は鎖骨との大まかな並びを示しています。",
        },
      ],
      sources: [thoracicCage, pectoralGirdle, pectoralMuscles],
    },
  },
  {
    codes: "st14 st15 st16 st17 st18 sp17 sp18 sp19 sp20 ki22 ki23 ki24 ki25 ki26 pc1",
    section: {
      name: "胸の前面と肋間",
      plane: "胸壁の一部を縦に切り、隣り合う肋骨を横切る模式図",
      axes: { horizontal: ["胸の表面側", "胸の内側"], vertical: ["頭側", "足側"] },
      outline: "M61 32Q94 47 119 39Q172 25 228 35Q325 40 440 31L446 238Q342 227 243 241Q133 229 53 239Q70 173 58 136Q47 89 61 32Z",
      structures: [
        {
          name: "大胸筋", kind: "muscle", badge: [113, 121],
          shape: { d: "M80 43Q115 35 155 47Q146 100 154 134Q161 185 149 223Q110 223 81 214Q91 167 81 132Q69 86 80 43Z" },
          description: "胸の前の筋で、肋骨の手前を覆います。位置によって胸壁を覆う部分は変わります。",
        },
        {
          name: "肋骨", kind: "bone", badge: [239, 68],
          shape: { d: "M197 58C218 43 253 45 278 59Q299 75 279 90Q250 106 214 93Q185 83 197 58ZM198 181C220 164 260 165 281 182Q299 198 280 215Q249 227 214 216Q183 206 198 181Z" },
          description: "弓状に胸を囲う骨です。図では上下に隣り合う二本を切った形を示します。",
        },
        {
          name: "肋間筋", kind: "muscle", badge: [253, 133],
          shape: { d: "M197 88Q236 112 282 91Q279 129 287 176Q247 154 201 175Q208 140 197 88Z" },
          description: "上下の肋骨のすき間にある筋です。体表でいう肋間は、その隣り合う骨の間にあたります。",
        },
        {
          name: "壁側胸膜", kind: "space", badge: [348, 135],
          shape: { d: "M329 43Q343 57 341 112Q338 168 351 221L366 219Q353 177 356 116Q360 74 347 43Z" },
          description: "胸壁の内側を裏打ちする膜です。見分けやすいように厚みを強調した線で示します。",
        },
      ],
      sources: [thoracicCage, thoraxAndAbdomen, {
        title: "米国外科学会 — 胸壁の解剖",
        url: "https://www.facs.org/media/qdgliayt/2025_tr_bestpracticesguidelines_chest-wall.pdf",
        scope: "胸壁の筋、肋骨と胸膜の配置を参照しました。図では臓器の境界や個人の厚みを扱いません。",
      }],
    },
  },
  {
    codes: "sp21 gb22 gb23 gb24 lr14",
    section: {
      name: "胸の側面と下部",
      plane: "胸の側壁の一部を切り、上下の肋骨とそのすき間を見た模式図",
      axes: { horizontal: ["胸の外側", "胸の内側"], vertical: ["頭側", "足側"] },
      outline: "M58 32Q113 58 181 41Q307 21 433 43Q447 117 444 224Q362 247 268 231Q186 214 64 238Q45 162 54 118Q62 72 58 32Z",
      structures: [
        {
          name: "前鋸筋", kind: "muscle", badge: [121, 120],
          shape: { d: "M70 53Q104 35 144 53L183 69L153 94L184 127L152 146L183 182Q156 195 139 215Q108 220 71 210Q63 147 70 53Z" },
          description: "肋骨の外側に付く筋です。胸の側面から背中へ回り、肩甲骨につながります。",
        },
        {
          name: "肋骨", kind: "bone", badge: [229, 72],
          shape: { d: "M176 65Q204 41 257 56Q296 66 297 88Q296 105 254 101Q208 98 179 87ZM173 177Q204 155 255 167Q289 172 295 192Q300 208 262 215Q215 218 177 196Z" },
          description: "胸の外側を弓状に囲います。下の肋骨のつながり方は、上の肋骨とは異なります。",
        },
        {
          name: "肋間筋", kind: "muscle", badge: [239, 137],
          shape: { d: "M181 90Q225 110 286 105Q271 137 286 178Q232 154 181 177Q193 127 181 90Z" },
          description: "上下の肋骨の間を埋める筋です。図では側胸部の肋間をひとまとめに示しています。",
        },
        {
          name: "壁側胸膜", kind: "space", badge: [334, 136],
          shape: { d: "M319 44Q329 76 324 112Q318 170 342 222L357 220Q334 176 339 115Q343 74 333 44Z" },
          description: "胸壁の内面を覆う膜です。下縁の形は呼吸や体勢に伴い変わるため、この図では局所の並びだけを扱います。",
        },
      ],
      sources: [thoracicCage, thoraxAndAbdomen, pectoralMuscles],
    },
  },
  {
    codes: "cv16 cv17 cv18 cv19 cv20 cv21",
    section: {
      name: "胸骨の正中",
      plane: "胸の真ん中を縦に切って、横から見た模式図",
      axes: midline,
      outline: "M80 33Q125 53 141 52Q168 44 192 49L412 38Q427 109 410 235L172 225Q152 217 128 230Q107 242 81 230Q77 189 85 131Q93 72 80 33Z",
      structures: [
        {
          name: "胸骨柄", kind: "bone", badge: [147, 75],
          shape: { d: "M131 49Q156 39 170 63Q170 83 167 105L132 108Q123 80 131 49Z" },
          description: "胸骨の上部です。上の縁の中央にあるくぼみと、下で胸骨体につながる境が目印になります。",
        },
        {
          name: "胸骨体", kind: "bone", badge: [149, 150],
          shape: { d: "M132 115L167 112Q178 134 171 161L166 188L141 189Q131 157 132 115Z" },
          description: "胸の正中に縦に伸びる胸骨の中央部です。左右には近くの肋軟骨が並びます。",
        },
        {
          name: "剣状突起", kind: "bone", badge: [155, 206],
          shape: { d: "M142 192L166 192Q166 218 155 223Q149 219 142 192Z" },
          description: "胸骨の下端に続く小さな部分です。長さや曲がり方には個人差があります。",
        },
      ],
      sources: [thoracicCage],
    },
  },
  {
    codes: "st19 st20 st21 st22 st23 st24 ki17 ki18 ki19 ki20 ki21 cv9 cv10 cv11 cv12 cv13 cv14 cv15",
    section: {
      name: "上腹部の前壁",
      plane: "へそより上の腹壁を横に切った模式図",
      axes: anterior,
      outline: "M50 176Q65 103 128 68Q181 43 250 53Q319 43 372 68Q437 103 451 176L399 219Q334 157 250 163Q166 157 101 219Z",
      structures: [
        {
          name: "腹直筋鞘", kind: "tendon", badge: [307, 78],
          shape: { d: "M112 115Q124 80 168 73Q203 65 239 74L240 129Q211 129 187 142Q146 152 119 139ZM388 115Q376 80 332 73Q297 65 261 74L260 129Q289 129 313 142Q354 152 381 139Z" },
          description: "腹直筋を包む膜状の組織です。腹壁の外側にある筋から続き、中央の白線で左右が合流します。",
        },
        {
          name: "腹直筋", kind: "muscle", badge: [177, 106],
          shape: { d: "M128 115Q138 91 172 88Q206 81 229 88L230 117Q202 119 182 131Q150 141 130 127ZM372 115Q362 91 328 88Q294 81 271 88L270 117Q298 119 318 131Q350 141 370 127Z" },
          description: "白線をはさんで左右にある縦長の筋です。上では胸骨や肋軟骨付近につながります。",
        },
        {
          name: "白線", kind: "tendon", badge: [250, 103],
          shape: { d: "M241 65Q250 60 259 65L260 134Q250 137 240 134Z" },
          description: "左右の腹直筋鞘が合わさる腹部の正中です。体表図で基準にする腹の正中線と同じ向きに走ります。",
        },
      ],
      sources: [thoraxAndAbdomen, rectusStudy],
    },
  },
  {
    codes: "st25 ki16 cv8",
    section: {
      name: "へその高さの腹壁",
      plane: "へそのくぼみを含む高さで腹壁を横に切った模式図",
      axes: anterior,
      outline: "M45 179Q62 104 127 59Q176 31 222 48Q238 50 246 72Q250 78 254 72Q262 50 278 48Q324 31 373 59Q438 104 455 179L408 220Q335 165 250 164Q165 165 92 220Z",
      structures: [
        {
          name: "へそのくぼみ", kind: "space", badge: [250, 56],
          shape: { d: "M226 43Q240 55 250 72Q260 55 274 43Q258 35 250 45Q242 35 226 43Z" },
          description: "体表に見えるへその中央のくぼみです。腹の高さを示す目印になり、形は人によって異なります。",
        },
        {
          name: "腹直筋", kind: "muscle", badge: [171, 108],
          shape: { d: "M101 124Q121 91 160 82Q198 74 229 84L231 116Q199 115 176 131Q132 153 111 142ZM399 124Q379 91 340 82Q302 74 271 84L269 116Q301 115 324 131Q368 153 389 142Z" },
          description: "へその左右にある腹壁の筋です。正中には筋の間をつなぐ白線があります。",
        },
        {
          name: "白線", kind: "tendon", badge: [250, 121],
          shape: { d: "M239 86L250 77L261 86L264 146Q250 151 236 146Z" },
          description: "へそを通る正中の線維組織です。左右の腹直筋を包む膜がここでつながります。",
        },
      ],
      sources: [thoraxAndAbdomen, rectusStudy],
    },
  },
  {
    codes: "st26 st27 st28 st29 ki12 ki13 ki14 ki15 cv3 cv4 cv5 cv6 cv7",
    section: {
      name: "下腹部の前壁",
      plane: "へそより下の腹壁を横に切った模式図",
      axes: anterior,
      outline: "M48 157Q76 77 146 56Q198 43 250 55Q302 43 354 56Q424 77 452 157L414 211Q326 165 250 170Q174 165 86 211Z",
      structures: [
        {
          name: "腹直筋鞘の前側", kind: "tendon", badge: [170, 78],
          shape: { d: "M106 108Q131 72 178 69Q219 67 250 77Q281 67 322 69Q369 72 394 108L381 123Q352 91 314 88Q283 87 250 97Q217 87 186 88Q148 91 119 123Z" },
          description: "腹直筋の前を覆う膜状の組織です。下腹部では腹直筋の後ろの覆い方が高さによって変わります。",
        },
        {
          name: "腹直筋", kind: "muscle", badge: [308, 120],
          shape: { d: "M129 119Q155 97 187 97Q215 97 235 105L232 135Q200 131 173 145Q142 162 129 142ZM371 119Q345 97 313 97Q285 97 265 105L268 135Q300 131 327 145Q358 162 371 142Z" },
          description: "下腹部でも左右一対で、下は恥骨側につながります。位置図では左右を分ける腹の正中線が目印です。",
        },
        {
          name: "白線", kind: "tendon", badge: [250, 119],
          shape: { d: "M239 96Q250 90 261 96L263 141L237 141Z" },
          description: "左右の腹壁の膜が合わさった組織で、下は恥骨の方向に続きます。",
        },
      ],
      sources: [thoraxAndAbdomen, rectusStudy],
    },
  },
  {
    codes: "sp13 sp14 sp15 sp16 gb25 gb26 lr13",
    section: {
      name: "わき腹の筋の重なり",
      plane: "体の側面の腹壁を横に切った模式図",
      axes: { horizontal: ["体の前寄り", "体の背中寄り"], vertical: ["体表側", "お腹の内側"] },
      outline: "M52 90Q106 50 194 38Q274 27 364 51Q412 64 451 99L432 213Q342 171 250 175Q138 181 72 225Z",
      structures: [
        {
          name: "外腹斜筋", kind: "muscle", badge: [155, 78],
          shape: { d: "M65 101Q124 68 203 58Q278 45 380 77Q407 87 438 111L431 138Q360 88 282 81Q157 81 72 132Z" },
          description: "わき腹を覆う三層の筋のうち、体表に近い層です。肋骨から始まる部分があります。",
        },
        {
          name: "内腹斜筋", kind: "muscle", badge: [247, 99],
          shape: { d: "M72 132Q157 81 282 81Q360 88 431 138L424 161Q357 119 278 108Q167 108 78 157Z" },
          description: "外腹斜筋の内側にある筋です。上は下部の肋骨へ、下は骨盤側につながります。",
        },
        {
          name: "腹横筋", kind: "muscle", badge: [325, 133],
          shape: { d: "M78 157Q167 108 278 108Q357 119 424 161L416 186Q357 151 283 136Q165 132 85 181Z" },
          description: "三層のうち最も内側の筋です。図に示すのは腹壁で、腹の中の臓器の位置は別に変わります。",
        },
      ],
      sources: [thoraxAndAbdomen, thoracicCage],
    },
  },
  {
    codes: "st30 sp12 lr12 gb27 gb28",
    section: {
      name: "脚の付け根と骨盤の前縁",
      plane: "骨盤前縁と鼠径靱帯に沿って斜めに切った模式図",
      axes: { horizontal: ["体の中央側", "体の外側"], vertical: ["頭側", "足側"] },
      outline: "M59 51Q144 38 244 49Q369 32 443 68Q453 145 420 221Q361 232 302 211Q226 193 178 229L77 239Q52 187 59 51Z",
      structures: [
        {
          name: "上前腸骨棘", kind: "bone", badge: [389, 88],
          shape: { d: "M361 41Q414 39 434 73Q437 103 408 135Q391 150 362 135Q390 113 381 97Q365 108 344 95Q366 80 361 41Z" },
          description: "骨盤前面の外側で、腸骨の縁が前に出たところです。",
        },
        {
          name: "恥骨", kind: "bone", badge: [103, 155],
          shape: { d: "M88 105Q112 94 128 121L152 171L128 194Q97 200 85 179Q79 155 88 105Z" },
          description: "骨盤の前側で、体の正中寄りにある骨です。左右の恥骨が前で合わさる位置は恥骨結合です。",
        },
        {
          name: "鼠径靱帯", kind: "tendon", badge: [238, 127],
          shape: { d: "M124 140Q236 111 368 83L378 97Q236 127 130 156Z" },
          description: "脚の付け根を斜めに横切り、上前腸骨棘から恥骨の小さな隆起につながる帯状の組織です。",
        },
      ],
      sources: [pelvicGirdle, thoraxAndAbdomen],
    },
  },
  {
    codes: "ki11 cv2",
    section: {
      name: "恥骨結合と下腹部の境",
      plane: "骨盤前面の正中付近を横に切った模式図",
      axes: anterior,
      outline: "M54 127Q85 72 141 47Q199 25 250 49Q301 25 359 47Q415 72 446 127Q443 195 401 226Q324 238 250 223Q176 238 99 226Q57 195 54 127Z",
      structures: [
        {
          name: "腹直筋の下端", kind: "muscle", badge: [167, 87],
          shape: { d: "M100 105Q120 60 166 57Q201 54 224 81L214 103Q162 95 125 122ZM400 105Q380 60 334 57Q299 54 276 81L286 103Q338 95 375 122Z" },
          description: "左右の腹直筋は下腹部の前を走り、恥骨の上側につながります。",
        },
        {
          name: "恥骨", kind: "bone", badge: [187, 159],
          shape: { d: "M109 167Q134 126 180 123Q209 117 236 133L238 170Q200 199 147 202Q119 197 109 167ZM391 167Q366 126 320 123Q291 117 264 133L262 170Q300 199 353 202Q381 197 391 167Z" },
          description: "左右の骨盤を前でつなぐ部分をつくる骨です。下腹部との境を読む手掛かりになります。",
        },
        {
          name: "恥骨結合", kind: "cartilage", badge: [250, 151],
          shape: { d: "M236 130Q250 123 264 130L262 171Q250 179 238 171Z" },
          description: "左右の恥骨が正中で合わさる部分です。曲骨はこの上縁を位置の目印にします。",
        },
      ],
      sources: [pelvicGirdle, thoraxAndAbdomen],
    },
  },
  {
    codes: "si11 si13",
    section: {
      name: "肩甲骨の背面",
      plane: "肩甲骨の棘の近くを横切り、骨と背面の筋を見た模式図",
      axes: { horizontal: ["背中の正中側", "肩側"], vertical: ["体の奥", "背中側"] },
      outline: "M51 113Q110 78 177 57Q288 24 365 60Q433 83 449 136Q438 190 409 229Q311 212 261 231Q166 227 88 197Q49 170 51 113Z",
      structures: [
        {
          name: "肩甲骨", kind: "bone", badge: [196, 99],
          shape: { d: "M95 126Q135 103 182 93Q249 80 301 82Q344 81 388 98L403 118Q365 113 339 107Q308 100 271 100Q210 95 164 112Q127 125 98 141Z" },
          description: "背中の上部にある平たい骨です。ここでは体の奥と背中側を分ける薄い板として示します。",
        },
        {
          name: "肩甲棘", kind: "bone", badge: [329, 131],
          shape: { d: "M284 99L323 100Q330 123 356 151L346 169Q307 152 292 127Z" },
          description: "肩甲骨の後面を横に走る出っ張りです。背面にある二つのくぼみを分けます。",
        },
        {
          name: "棘下筋", kind: "muscle", badge: [201, 164],
          shape: { d: "M114 148Q175 116 223 119Q256 110 283 118Q309 151 331 173Q302 193 247 194Q178 196 127 173Z" },
          description: "肩甲棘の下の広いくぼみを覆う筋です。肩甲骨の向きは腕を動かすと変わります。",
        },
      ],
      sources: [pectoralGirdle, pectoralMuscles],
    },
  },
  {
    codes: "si14 bl11 bl12 bl13 bl14 bl15 bl16 bl17 bl18 bl19 bl20 bl21 bl41 bl42 bl43 bl44 bl45 bl46 bl47 bl48 bl49 bl50",
    section: {
      name: "胸椎の左右と背中の筋",
      plane: "胸椎の周りを横に切り、背中側に注目した模式図",
      axes: posterior,
      outline: "M45 134Q87 84 199 65Q250 54 301 65Q413 84 455 134Q468 200 416 224Q324 244 250 240Q176 244 84 224Q32 200 45 134Z",
      structures: [
        {
          name: "肋骨の背中側", kind: "bone", badge: [113, 125],
          shape: { d: "M64 144Q93 113 144 111L208 116L211 132Q131 119 76 162ZM436 144Q407 113 356 111L292 116L289 132Q369 119 424 162Z" },
          description: "肋骨は胸椎とつながり、背骨の左右から胸壁へ回ります。図では背中側の一部を示します。",
        },
        {
          name: "胸椎", kind: "bone", badge: [250, 116],
          shape: { d: "M219 88Q250 68 281 88L291 115L282 137L294 152L275 159L263 186L257 201L243 201L237 186L225 159L206 152L218 137L209 115Z" },
          description: "肋骨がつながる高さの背骨です。後ろに出る部分を棘突起と呼びます。",
        },
        {
          name: "胸部の脊柱起立筋", kind: "muscle", badge: [327, 187],
          shape: { d: "M82 182Q111 152 169 151Q211 153 229 191Q209 220 182 221Q120 230 88 206ZM418 182Q389 152 331 151Q289 153 271 191Q291 220 318 221Q380 230 412 206Z" },
          description: "背骨の左右を縦に走る筋のまとまりです。ここでは胸椎との大まかな位置関係を示します。",
        },
      ],
      sources: [vertebrae, thoracicMri, backMuscles],
    },
  },
  {
    codes: "gv6 gv7 gv8 gv9 gv10 gv11 gv12 gv13",
    section: {
      name: "胸の高さの背骨と棘突起",
      plane: "胸椎の後ろを含む縦の断面を横から見た模式図",
      axes: midline,
      outline: "M83 35Q189 22 268 34Q362 34 417 49Q427 146 413 239Q326 223 249 241L83 237Q65 137 83 35Z",
      structures: [
        {
          name: "胸椎の椎体", kind: "bone", badge: [171, 144],
          shape: { d: "M128 49Q170 42 208 49L213 94Q165 105 129 94ZM128 114Q174 104 212 113L215 160Q168 168 128 159ZM128 181Q172 170 215 177L218 221Q169 228 129 218Z" },
          description: "背骨の前寄りの丸みを帯びた部分です。上下の椎体は、その間の椎間板を介して重なります。",
        },
        {
          name: "椎間板", kind: "cartilage", badge: [172, 174],
          shape: { d: "M128 97Q178 102 213 96L212 110Q173 110 128 113ZM128 162Q175 166 215 162L216 175Q176 174 128 180Z" },
          description: "椎体と椎体の間にある弾力のある組織です。背中の体表で数える棘突起とは、体の前後で離れています。",
        },
        {
          name: "胸椎の棘突起", kind: "bone", badge: [342, 142],
          shape: { d: "M254 62Q301 50 337 77L387 117L364 124Q321 97 278 90L255 91ZM254 124Q301 112 335 132L384 174L357 182Q313 152 269 153L255 153ZM259 183Q301 175 330 193L379 222L353 234Q307 210 260 211Z" },
          description: "背骨の後ろへ張り出す骨の部分です。胸椎では下へ傾くものがあり、傾きは高さで変わります。",
        },
      ],
      sources: [vertebrae],
    },
  },
  {
    codes: "bl22 bl23 bl24 bl25 bl26 bl51 bl52",
    section: {
      name: "腰椎の左右と腰の筋",
      plane: "腰椎の周囲を横に切り、背中側に注目した模式図",
      axes: posterior,
      outline: "M49 113Q106 60 214 51Q250 45 286 51Q394 60 451 113Q465 168 438 210Q364 253 250 240Q136 253 62 210Q35 168 49 113Z",
      structures: [
        {
          name: "腰椎", kind: "bone", badge: [250, 95],
          shape: { d: "M211 72Q250 57 289 72Q315 90 306 113L293 135L340 148L333 164L282 157L269 171L264 202L236 202L231 171L218 157L167 164L160 148L207 135L194 113Q185 90 211 72Z" },
          description: "肋骨の下と仙骨の間にある背骨です。左右と背中側に骨の出っ張りがあります。",
        },
        {
          name: "多裂筋", kind: "muscle", badge: [217, 203],
          shape: { d: "M193 169Q211 158 228 175Q234 194 240 210Q227 228 204 218Q182 207 193 169ZM307 169Q289 158 272 175Q266 194 260 210Q273 228 296 218Q318 207 307 169Z" },
          description: "椎骨の左右近くを覆う深い筋です。棘突起の近くにあり、外側には脊柱起立筋が並びます。",
        },
        {
          name: "腰部の脊柱起立筋", kind: "muscle", badge: [355, 195],
          shape: { d: "M60 184Q84 154 137 157Q176 158 187 184Q195 208 173 224Q129 235 88 220Q57 209 60 184ZM440 184Q416 154 363 157Q324 158 313 184Q305 208 327 224Q371 235 412 220Q443 209 440 184Z" },
          description: "多裂筋より外側の腰背部に広がる筋のまとまりです。図は背骨の左右での並びを示しています。",
        },
      ],
      sources: [vertebrae, backMuscles, lumbarMri],
    },
  },
  {
    codes: "gv3 gv4 gv5",
    section: {
      name: "腰の背骨と棘突起",
      plane: "腰椎の正中付近を縦に切って横から見た模式図",
      axes: midline,
      outline: "M73 42Q167 28 237 44Q317 60 407 38Q423 131 418 223Q315 244 238 224Q152 199 81 227Q63 152 73 42Z",
      structures: [
        {
          name: "腰椎の椎体", kind: "bone", badge: [171, 132],
          shape: { d: "M127 49Q175 48 221 61L217 99Q173 91 125 91ZM124 111Q170 106 216 116L214 152Q168 142 124 149ZM126 168Q172 160 216 172L216 211Q170 197 126 209Z" },
          description: "腰椎を前寄りで支える、幅のある骨の部分です。上下の椎体の間に椎間板があります。",
        },
        {
          name: "椎間板", kind: "cartilage", badge: [169, 156],
          shape: { d: "M125 93Q170 93 217 101L216 114Q169 105 124 109ZM125 151Q170 144 215 154L215 170Q174 157 125 166Z" },
          description: "椎体の間の板状の組織です。腰の前後の曲がり方と関係し、棘突起からは体の前側にあります。",
        },
        {
          name: "腰椎の棘突起", kind: "bone", badge: [344, 136],
          shape: { d: "M253 67Q305 60 357 65L386 78L384 92Q327 93 261 98ZM249 119Q309 112 365 116L389 130L388 145Q323 151 254 149ZM255 174Q312 169 365 174L387 189L381 206Q315 210 256 204Z" },
          description: "腰椎の後ろへ張り出す部分です。腰の正中の位置を調べるときは、上下の棘突起の並びを見ます。",
        },
      ],
      sources: [vertebrae],
    },
  },
  {
    codes: "bl27 bl28 bl29 bl30 bl31 bl32 bl33 bl34",
    section: {
      name: "仙骨背面と後仙骨孔",
      plane: "仙骨の背面に開く孔の高さを横切る模式図",
      axes: posterior,
      outline: "M55 117Q124 77 207 70Q250 61 293 70Q376 77 445 117Q469 174 417 218Q325 246 250 229Q175 246 83 218Q31 174 55 117Z",
      structures: [
        {
          name: "仙骨", kind: "bone", badge: [250, 111],
          shape: { d: "M94 136Q161 90 233 85Q250 80 267 85Q339 90 406 136Q393 183 349 193Q287 204 250 187Q213 204 151 193Q107 183 94 136Z" },
          description: "腰椎の下にあり、左右の骨盤の間にはさまる骨です。背面には、左右それぞれにいくつかの孔が縦に並びます。",
        },
        {
          name: "後仙骨孔", kind: "space", badge: [196, 169],
          shape: { d: "M175 166Q181 150 198 151Q214 151 217 164Q218 177 200 181Q182 184 175 166ZM325 166Q319 150 302 151Q286 151 283 164Q282 177 300 181Q318 184 325 166Z" },
          description: "仙骨の背面に開く孔です。図が示すのは一つの高さで、どの孔かは体表図で上下の並びを確認できます。",
        },
        {
          name: "正中仙骨稜", kind: "bone", badge: [250, 176],
          shape: { d: "M233 148L250 136L267 148L263 183L250 199L237 183Z" },
          description: "仙骨の背面の正中を縦に走る骨の隆起です。後仙骨孔はその左右にあります。",
        },
      ],
      sources: [vertebrae, sacralForaminaStudy],
    },
  },
  {
    codes: "gv2",
    section: {
      name: "仙骨裂孔と尾骨",
      plane: "仙骨の下端付近を縦に切り、横から見た模式図",
      axes: midline,
      outline: "M71 31Q182 27 280 37Q357 54 409 86Q420 166 395 231Q311 251 240 228Q149 220 96 231Q68 167 71 31Z",
      structures: [
        {
          name: "仙骨", kind: "bone", badge: [225, 94],
          shape: { d: "M163 46Q201 34 232 58Q269 87 293 135L309 165L276 177Q248 149 224 127Q184 102 163 46Z" },
          description: "腰椎から尾骨へ続く骨です。下端に近づくにつれて、全体が細くなります。",
        },
        {
          name: "仙骨裂孔", kind: "space", badge: [317, 142],
          shape: { d: "M303 119Q317 126 331 153L333 171L315 167L301 141Z" },
          description: "仙骨の下端に近い背面側の開口です。形・広さ・高さには個人差があります。",
        },
        {
          name: "尾骨", kind: "bone", badge: [291, 201],
          shape: { d: "M277 175L306 170Q310 191 301 204Q296 217 278 224Q274 217 283 202Z" },
          description: "仙骨のすぐ下に続く小さな骨です。仙骨の背面と尾骨の先の違いが、体表図を読む手掛かりになります。",
        },
      ],
      sources: [vertebrae, sacralForaminaStudy],
    },
  },
  {
    codes: "bl53 bl54",
    section: {
      name: "骨盤の後ろとお尻の筋",
      plane: "仙骨に近いお尻の部分を横に切った模式図",
      axes: posterior,
      outline: "M51 122Q132 77 232 71Q250 65 268 71Q368 77 449 122Q461 176 414 229Q333 247 250 216Q167 247 86 229Q39 176 51 122Z",
      structures: [
        {
          name: "仙骨", kind: "bone", badge: [250, 116],
          shape: { d: "M214 86Q250 70 286 86L298 138L275 168L250 174L225 168L202 138Z" },
          description: "お尻の上の正中にある骨です。左右の腸骨との間に仙腸関節があります。",
        },
        {
          name: "腸骨", kind: "bone", badge: [150, 121],
          shape: { d: "M64 126Q112 96 188 92L205 131Q158 131 84 167ZM436 126Q388 96 312 92L295 131Q342 131 416 167Z" },
          description: "骨盤の左右をつくる骨です。仙骨の外側に連なり、お尻の筋が付く場所があります。",
        },
        {
          name: "大殿筋", kind: "muscle", badge: [346, 187],
          shape: { d: "M68 174Q140 135 208 142L226 175L244 206Q185 237 105 219Q78 212 68 174ZM432 174Q360 135 292 142L274 175L256 206Q315 237 395 219Q422 212 432 174Z" },
          description: "お尻の輪郭をつくる大きな筋で、仙骨や腸骨の後ろ側を覆います。",
        },
      ],
      sources: [pelvicGirdle, hipMuscles],
    },
  },
  {
    codes: "bl35 gv1 cv1",
    section: {
      name: "尾骨と骨盤底",
      plane: "骨盤の底の中央付近を縦に切って横から見た模式図",
      axes: midline,
      outline: "M63 48Q152 26 235 33Q341 32 415 59L439 136Q413 191 352 222Q294 239 225 229Q155 245 92 215Q54 143 63 48Z",
      structures: [
        {
          name: "恥骨結合", kind: "cartilage", badge: [115, 137],
          shape: { d: "M105 101Q123 102 131 117L131 153Q121 172 101 159L96 128Q94 111 105 101Z" },
          description: "骨盤の前側にある左右の恥骨の継ぎ目です。尾骨は、その反対側にあります。",
        },
        {
          name: "仙骨と尾骨", kind: "bone", badge: [364, 133],
          shape: { d: "M365 48Q388 67 382 98Q394 135 370 162L352 177Q347 182 338 175Q354 158 348 137Q355 113 347 99Q352 73 340 63Z" },
          description: "骨盤の後ろを支える骨です。仙骨の下に続く小さな尾骨は、会陰の後ろ側の目印になります。",
        },
        {
          name: "骨盤底", kind: "muscle", badge: [234, 186],
          shape: { d: "M124 161Q161 170 206 171Q233 166 248 174Q278 179 338 167L343 182Q279 202 250 189Q228 192 212 186Q163 190 125 177Z" },
          description: "骨盤の底を支える筋のまとまりです。会陰はその下方に広がり、体表図では尾骨や肛門が目印になります。",
        },
      ],
      sources: [pelvicGirdle, pelvicFloorStudy],
    },
  },
];
