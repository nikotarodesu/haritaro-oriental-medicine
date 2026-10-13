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
      explanation: "伝統医学では肺と大腸を表裏の関係に分類し、肺の宣発・粛降と大腸の伝化を関連づけます。「皮毛を養う」も伝統理論の表現で、呼吸器と腸の機能をこの経脈関係だけで説明するものではありません。",
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
      explanation: "手の太陰肺経と足の太陰脾経は、同じ「太陰」に分類されます。伝統理論では、脾が運化する飲食由来の精微と肺が取り入れる清気を、宗気の生成と関連づけます。これらの気は、酸素量や栄養素の測定値とは区別します。",
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
      explanation: "伝統医学では大腸と肺を表裏の関係に分類し、肺気の粛降と大腸の伝化を関連づけます。経脈の分類であり、肺から腸へ直接作用する解剖学的な経路や、便通改善の機序が実証されたという意味ではありません。",
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
      explanation: "手の陽明大腸経と足の陽明胃経は、同じ「陽明」に分類されます。伝統的な「多気多血」は気血の多い経脈という分類で、消化器の病証や熱の病証と関連づけて学びます。血流量、消化吸収量、全身の熱代謝を測定した説明ではありません。",
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
      explanation: "伝統医学では胃と脾を表裏の関係に分類します。胃の受納・降と脾の運化・昇を関連づけ、飲食物から気血を養う「後天の本」として学びます。臓器としての胃・脾臓の生理機能とは区別します。",
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
      explanation: "手の陽明大腸経と足の陽明胃経は、同じ「陽明」に分類されます。伝統的には胃腸や頭・顔面の熱の病証と関連づけます。「気機の調整」「清熱」は伝統的な治法で、胃腸や皮膚の疾患への効果は別に評価します。",
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
      explanation: "脾と胃は、伝統理論で表裏の関係にあるとされます。受納や運化の不調、水湿の停滞を考える際に、両経脈の配穴を関連づけて学びます。",
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
      explanation: "手の太陰肺経と足の太陰脾経は、同じ「太陰」に分類されます。伝統的には、脾が運化した精微と肺の宣発を関連づけます。精微や宣発は伝統医学の用語で、現代の栄養素の輸送や肺循環と同じ意味ではありません。",
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
      explanation: "伝統医学では心と小腸を表裏の関係に分類し、「心火が小腸に移る」という病証を、赤い尿や排尿時の不快感などと関連づけます。心臓から小腸へ熱が移動する生理学的な現象を示す説明ではありません。",
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
      explanation: "手の少陰心経と足の少陰腎経は、同じ「少陰」に分類されます。心火と腎水の調和を「心腎相交」として学びます。心火・腎水は伝統理論の概念で、心臓と腎臓の血行動態や検査値をそのまま表すものではありません。",
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
      explanation: "伝統医学では小腸と心を表裏の関係に分類し、小腸経の頸・肩・腕部の流注や、心の神志の病証を関連づけます。この分類だけで筋骨格症状や精神症状への治療効果は判断できません。",
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
      explanation: "手の太陽小腸経と足の太陽膀胱経は、同じ「太陽」に分類される経脈です。伝統的には、背部や後頭部の病証、体表を守る衛気、外感風寒との関係で学びます。",
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
      explanation: "伝統医学では膀胱と腎を表裏の関係に分類し、気化、開闔、下焦の水液に関連づけます。伝統理論の分類で、現代の腎機能、尿量、電解質の調節を経脈の関係だけで説明するものではありません。",
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
      explanation: "手の太陽小腸経と足の太陽膀胱経は、同じ「太陽」に分類されます。伝統的には、頸・背・腰部の病証を考える際の遠隔配穴と関連づけます。急性腰痛の原因や、この経脈の組み合わせの効果を確定する説明ではありません。",
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
      explanation: "伝統医学では腎と膀胱を表裏の関係に分類し、腎精や膀胱経の背部兪穴との関係を学びます。腎精・陽気は伝統理論の概念で、腎機能やホルモンの変化を実証した機序ではありません。",
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
      explanation: "手の少陰心経と足の少陰腎経は、同じ「少陰」に分類される経脈です。心腎不交という伝統的な証や、不眠・不安・動悸・健忘との関連から、配穴を学びます。",
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
      explanation: "伝統医学では心包と三焦を表裏の関係に分類し、心胸部の気滞や熱の病証、気化・水液との関係を学びます。三焦を独立した解剖学的器官としたり、心包経の作用を心膜の機能と同一視したりするものではありません。",
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
      explanation: "手の厥陰心包経と足の厥陰肝経は、同じ「厥陰」に分類される経脈です。肝の蔵血・疏泄と心包の働きとの関係を、伝統理論として学びます。自律神経の働きと同じ意味ではありません。",
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
      explanation: "伝統医学では三焦と心包を表裏の関係に分類し、胸脇苦満や熱の病証との関連を学びます。気滞や情志の病証を、自律神経失調症の診断や治療効果と同じ意味で用いません。",
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
      explanation: "手の少陽三焦経と足の少陽胆経は、同じ「少陽」に分類されます。流注上の側頭部・耳周囲・肩外側・側胸部や、半表半裏という伝統的な病証との関連を学びます。分類だけで清熱の臨床効果を判断するものではありません。",
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
      explanation: "伝統医学では胆と肝を表裏の関係に分類し、それぞれを「中正の官」「将軍の官」とたとえて、決断や情志と関連づけます。胆汁の生理学的な分泌・排泄や、精神機能をこの分類だけで説明するものではありません。",
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
      explanation: "手の少陽三焦経と足の少陽胆経は、同じ「少陽」に分類されます。伝統的には側頭・側頸部の病証を学びます。頭痛、めまい、耳鳴り、肩の痛みには異なる原因があり、すべてを実熱と診断したり、この分類から効果を保証したりはできません。",
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
      explanation: "伝統医学では肝と胆を表裏の関係に分類し、疏泄の不調、胸脇部の張り、情志や月経の病証と関連づけます。現代の肝胆道疾患や月経異常の原因・治療適応を、経脈の分類だけで判断するものではありません。",
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
      explanation: "手の厥陰心包経と足の厥陰肝経は、同じ「厥陰」に分類される経脈です。内関と太衝の組み合わせは、胸のつかえ、動悸、胃痛、不眠などとの関連で学ぶ配穴例です。症状の原因や治療効果を示すものではありません。",
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
      explanation: "伝統医学では督脈を「陽脈の海」、任脈を「陰脈の海」と呼び、背部と体の前側の正中を走る経脈として学びます。小周天や陰陽軸は伝統理論の説明で、独立した解剖構造や生理学的な循環路を指すものではありません。",
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
      explanation: "任脈は体の前側、督脈は後ろ側の正中を走るとされます。伝統理論では、それぞれ陰経・陽経との関係を学びます。",
      keyPoints: [
        { name: "百会", code: "gv20" },
        { name: "大椎", code: "gv14" },
      ],
    },
  ],
};
