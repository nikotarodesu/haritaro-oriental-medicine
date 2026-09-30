/**
 * 東洋医学の表裏経（陰陽ペア）・同名経（手足ペア）トピッククラスタ定義
 */

export interface MeridianRelation {
  pairedMeridianId: string;
  pairedName: string;
  pairedShort: string;
  relationType: "表裏経" | "同名経" | "陰陽対脈";
  explanation: string;
  keyPoints: { name: string; code: string }[];
}

export const MERIDIAN_RELATIONS: Record<string, MeridianRelation[]> = {
  lung: [
    {
      pairedMeridianId: "large-intestine",
      pairedName: "手の陽明大腸経",
      pairedShort: "大腸経",
      relationType: "表裏経",
      explanation: "肺（臓）と大腸（腑）は表裏をなし、呼吸と排泄、皮毛の滋養を連動して司ります。",
      keyPoints: [
        { name: "合谷", code: "li4" },
        { name: "曲池", code: "li11" },
      ],
    },
    {
      pairedMeridianId: "spleen",
      pairedName: "足の太陰脾経",
      pairedShort: "脾経",
      relationType: "同名経",
      explanation: "手足の太陰経ペア。後天の気（脾）と呼吸の清気（肺）が合わさり宗気・宗脈を生成します。",
      keyPoints: [
        { name: "太白", code: "sp3" },
        { name: "三陰交", code: "sp6" },
      ],
    },
  ],
  "large-intestine": [
    {
      pairedMeridianId: "lung",
      pairedName: "手の太陰肺経",
      pairedShort: "肺経",
      relationType: "表裏経",
      explanation: "大腸（腑）と肺（臓）は表裏をなし、肺気の粛降が大腸の伝導を助けます。",
      keyPoints: [
        { name: "列欠", code: "lu7" },
        { name: "太淵", code: "lu9" },
      ],
    },
    {
      pairedMeridianId: "stomach",
      pairedName: "足の陽明胃経",
      pairedShort: "胃経",
      relationType: "同名経",
      explanation: "手足の陽明経ペア。多気多血の陽明経として消化吸収と全身の熱代謝を担います。",
      keyPoints: [
        { name: "足三里", code: "st36" },
        { name: "天枢", code: "st25" },
      ],
    },
  ],
  stomach: [
    {
      pairedMeridianId: "spleen",
      pairedName: "足の太陰脾経",
      pairedShort: "脾経",
      relationType: "表裏経",
      explanation: "胃（受納・降を主る）と脾（運化・昇を主る）の表裏昇降で後天の本を維持します。",
      keyPoints: [
        { name: "太白", code: "sp3" },
        { name: "陰陵泉", code: "sp9" },
      ],
    },
    {
      pairedMeridianId: "large-intestine",
      pairedName: "手の陽明大腸経",
      pairedShort: "大腸経",
      relationType: "同名経",
      explanation: "手足の陽明経ペア。胃腸管全体の気機調整と面疔・頭顔面部の熱証を清解します。",
      keyPoints: [
        { name: "合谷", code: "li4" },
        { name: "手三里", code: "li10" },
      ],
    },
  ],
  spleen: [
    {
      pairedMeridianId: "stomach",
      pairedName: "足の陽明胃経",
      pairedShort: "胃経",
      relationType: "表裏経",
      explanation: "脾と胃は表裏をなし、納運失調や水湿停滞時に相互に連動治療します。",
      keyPoints: [
        { name: "足三里", code: "st36" },
        { name: "豊隆", code: "st40" },
      ],
    },
    {
      pairedMeridianId: "lung",
      pairedName: "手の太陰肺経",
      pairedShort: "肺経",
      relationType: "同名経",
      explanation: "手足の太陰経ペア。脾で運化された精微が肺に上注して全身に宣発されます。",
      keyPoints: [
        { name: "中府", code: "lu1" },
        { name: "太淵", code: "lu9" },
      ],
    },
  ],
  heart: [
    {
      pairedMeridianId: "small-intestine",
      pairedName: "手の太陽小腸経",
      pairedShort: "小腸経",
      relationType: "表裏経",
      explanation: "心（君主の官）と小腸（受盛の官）は表裏をなし、心火が小腸に移る病理（小便赤渋等）に連動します。",
      keyPoints: [
        { name: "後渓", code: "si3" },
        { name: "小海", code: "si8" },
      ],
    },
    {
      pairedMeridianId: "kidney",
      pairedName: "足の少陰腎経",
      pairedShort: "腎経",
      relationType: "同名経",
      explanation: "手足の少陰経ペア。心火と腎水が交わり互いに制約し合う「心腎相交」の根本軸です。",
      keyPoints: [
        { name: "湧泉", code: "ki1" },
        { name: "太渓", code: "ki3" },
      ],
    },
  ],
  "small-intestine": [
    {
      pairedMeridianId: "heart",
      pairedName: "手の少陰心経",
      pairedShort: "心経",
      relationType: "表裏経",
      explanation: "小腸と心は表裏。頚肩腕部から精神神志の安定までを連動して支えます。",
      keyPoints: [
        { name: "神門", code: "ht7" },
        { name: "少海", code: "ht3" },
      ],
    },
    {
      pairedMeridianId: "bladder",
      pairedName: "足の太陽膀胱経",
      pairedShort: "膀胱経",
      relationType: "同名経",
      explanation: "手足の太陽経ペア。背部・後頭部・項背部の体表防御（衛気）と外感風寒の侵入を防ぎます。",
      keyPoints: [
        { name: "崑崙", code: "bl60" },
        { name: "委中", code: "bl40" },
      ],
    },
  ],
  bladder: [
    {
      pairedMeridianId: "kidney",
      pairedName: "足の少陰腎経",
      pairedShort: "腎経",
      relationType: "表裏経",
      explanation: "膀胱（気化・排尿）と腎（開闔・水液代謝）は表裏をなし、下焦の水液調節を担います。",
      keyPoints: [
        { name: "太渓", code: "ki3" },
        { name: "復溜", code: "ki7" },
      ],
    },
    {
      pairedMeridianId: "small-intestine",
      pairedName: "手の太陽小腸経",
      pairedShort: "小腸経",
      relationType: "同名経",
      explanation: "手足の太陽経ペア。脊柱起立筋から肩甲間部、項背部痛や急性腰痛の遠隔配穴に用います。",
      keyPoints: [
        { name: "後渓", code: "si3" },
        { name: "天宗", code: "si11" },
      ],
    },
  ],
  kidney: [
    {
      pairedMeridianId: "bladder",
      pairedName: "足の太陽膀胱経",
      pairedShort: "膀胱経",
      relationType: "表裏経",
      explanation: "腎と膀胱は表裏。先天の本（腎精）と陽気発揚（膀胱経の背部兪穴）を連動させます。",
      keyPoints: [
        { name: "腎兪", code: "bl23" },
        { name: "申脈", code: "bl62" },
      ],
    },
    {
      pairedMeridianId: "heart",
      pairedName: "手の少陰心経",
      pairedShort: "心経",
      relationType: "同名経",
      explanation: "手足の少陰経ペア。不眠、不安、動悸、健忘など心腎不交の臨床処方に不可欠です。",
      keyPoints: [
        { name: "神門", code: "ht7" },
        { name: "通里", code: "ht5" },
      ],
    },
  ],
  pericardium: [
    {
      pairedMeridianId: "triple-energizer",
      pairedName: "手の少陽三焦経",
      pairedShort: "三焦経",
      relationType: "表裏経",
      explanation: "心包（心を包護・血脈）と三焦（気化の府・水液通路）は表裏。心胸部の気滞や熱証を調節します。",
      keyPoints: [
        { name: "外関", code: "te5" },
        { name: "中渚", code: "te3" },
      ],
    },
    {
      pairedMeridianId: "liver",
      pairedName: "足の厥陰肝経",
      pairedShort: "肝経",
      relationType: "同名経",
      explanation: "手足の厥陰経ペア。肝血の貯蔵と心包の脈管循環、自律神経（気機疏泄）の安定を担います。",
      keyPoints: [
        { name: "太衝", code: "lr3" },
        { name: "行間", code: "lr2" },
      ],
    },
  ],
  "triple-energizer": [
    {
      pairedMeridianId: "pericardium",
      pairedName: "手の厥陰心包経",
      pairedShort: "心包経",
      relationType: "表裏経",
      explanation: "三焦と心包は表裏。胸脇苦満、熱性疾患、ストレス性自律神経失調の要穴ペア。",
      keyPoints: [
        { name: "内関", code: "pc6" },
        { name: "大陵", code: "pc7" },
      ],
    },
    {
      pairedMeridianId: "gallbladder",
      pairedName: "足の少陽胆経",
      pairedShort: "胆経",
      relationType: "同名経",
      explanation: "手足の少陽経ペア。側頭部・耳周囲・肩外側・側胸部を網羅し、半表半裏証の清熱を担います。",
      keyPoints: [
        { name: "陽陵泉", code: "gb34" },
        { name: "風池", code: "gb20" },
      ],
    },
  ],
  gallbladder: [
    {
      pairedMeridianId: "liver",
      pairedName: "足の厥陰肝経",
      pairedShort: "肝経",
      relationType: "表裏経",
      explanation: "胆（中正の官・決断）と肝（将軍の官・謀慮）は表裏をなし、胆汁排泄と精神情志を司ります。",
      keyPoints: [
        { name: "太衝", code: "lr3" },
        { name: "期門", code: "lr14" },
      ],
    },
    {
      pairedMeridianId: "triple-energizer",
      pairedName: "手の少陽三焦経",
      pairedShort: "三焦経",
      relationType: "同名経",
      explanation: "手足の少陽経ペア。偏頭痛、めまい、耳鳴り、肩こりなど側頭・側頸部の実熱を疏通します。",
      keyPoints: [
        { name: "外関", code: "te5" },
        { name: "翳風", code: "te17" },
      ],
    },
  ],
  liver: [
    {
      pairedMeridianId: "gallbladder",
      pairedName: "足の少陽胆経",
      pairedShort: "胆経",
      relationType: "表裏経",
      explanation: "肝と胆は表裏。疏泄失調、胸脇部の張り、イライラ、月経不順の配穴に直結します。",
      keyPoints: [
        { name: "陽陵泉", code: "gb34" },
        { name: "丘墟", code: "gb40" },
      ],
    },
    {
      pairedMeridianId: "pericardium",
      pairedName: "手の厥陰心包経",
      pairedShort: "心包経",
      relationType: "同名経",
      explanation: "手足の厥陰経ペア。精神緊張による胸悶・動悸・胃痛・不眠の特効配穴（内関×太衝）。",
      keyPoints: [
        { name: "内関", code: "pc6" },
        { name: "労宮", code: "pc8" },
      ],
    },
  ],
  governor: [
    {
      pairedMeridianId: "conception",
      pairedName: "任脈",
      pairedShort: "任脈",
      relationType: "陰陽対脈",
      explanation: "督脈（全身の陽脈の総督）と任脈（全身の陰脈の総任）は、小周天を形成する人体の主幹陰陽軸です。",
      keyPoints: [
        { name: "中脘", code: "cv12" },
        { name: "気海", code: "cv6" },
      ],
    },
  ],
  conception: [
    {
      pairedMeridianId: "governor",
      pairedName: "督脈",
      pairedShort: "督脈",
      relationType: "陰陽対脈",
      explanation: "任脈（陰経の海）と督脈（陽経の海）は前後の正中を走り、身体の陰陽動的平衡を統率します。",
      keyPoints: [
        { name: "百会", code: "gv20" },
        { name: "大椎", code: "gv14" },
      ],
    },
  ],
};
