// 奇経八脈（全8脈）データ定義・八脈交会穴
export interface KikeiVessel {
  slug: string;
  name: string;
  kanji: string;
  reading: string;
  category: "陽奇経" | "陰奇経";
  masterPoint: {
    name: string;
    meridian: string;
    code: string;
  };
  couplePoint: {
    name: string;
    meridian: string;
    code: string;
  };
  pairTargetArea: string; // 例: 胃・心・胸
  nature: string; // 本質・統括機能
  pathway: string[]; // 流注・走行ルート
  studyAnswer: string; // 古典の記述を問うクイズの答え
  clinicalTips: string; // 臨床要点・配穴の勘所
  classicQuote: {
    book: string;
    chapter: string;
    text: string;
    translation: string;
  };
  pointsCount?: number; // 固有穴数（督脈28穴、任脈24穴、他は交会穴のみ）
  pointsList?: string[]; // 主な通過穴
}

export const KIKEI_VESSELS: KikeiVessel[] = [
  {
    slug: "toku",
    name: "督脈",
    kanji: "督脈",
    reading: "とくみゃく",
    category: "陽奇経",
    masterPoint: {
      name: "後渓",
      meridian: "手太陽小腸経",
      code: "SI3"
    },
    couplePoint: {
      name: "申脈",
      meridian: "足太陽膀胱経",
      code: "BL62"
    },
    pairTargetArea: "目頭・首の後ろ・耳・肩・背中・腰",
    nature: "督脈は背中の中央を上り、頭から上唇へ向かうとされます。伝統医学では、手足の陽経をまとめる役割から「陽脈の海」と呼びます。",
    pathway: [
      "小腹（骨盤腔内・胞中）に起こり、会陰部に下る。",
      "尾骨の先の長強から、背骨の内側に沿って上る。",
      "風府より脳内に入り、頭頂部（百会）に上る。",
      "額、鼻、鼻の下の水溝（人中）を通り、上唇の内側にある齦交に至る。"
    ],
    studyAnswer: "背骨の内側を上り、風府を経て脳に入る",
    clinicalTips: "後渓と申脈は、古典で首・背中・腰の症状と関連づけられます。慢性の痛みに対する鍼の研究では、痛みや体の動きなどを評価しています。この二穴の組み合わせで同じ結果になるかは、別の検討が必要です。",
    classicQuote: {
      book: "難経",
      chapter: "第二十八難",
      text: "督脈者，起於下極之腧，並於脊裏，上至風府，入屬於腦。",
      translation: "督脈は「下極之腧」に始まり、脊柱の内側に沿って上行し、風府に至り、脳に入ると記されています。「下極之腧」の具体的な部位の解釈は、原典の版と注釈を確認する必要があります。"
    },
    pointsCount: 28,
    pointsList: ["長強", "腰兪", "命門", "身柱", "神道", "至陽", "筋縮", "大椎", "風府", "百会", "神庭", "水溝", "齦交"]
  },
  {
    slug: "nin",
    name: "任脈",
    kanji: "任脈",
    reading: "にんみゃく",
    category: "陰奇経",
    masterPoint: {
      name: "列缺",
      meridian: "手太陰肺経",
      code: "LU7"
    },
    couplePoint: {
      name: "照海",
      meridian: "足少陰腎経",
      code: "KI6"
    },
    pairTargetArea: "のど・胸・生殖器",
    nature: "任脈は下腹部から胸の中央を通り、顔へ向かうとされます。「陰脈の海」とも呼ばれ、伝統医学では手足の陰経や妊娠と結びつけてきました。",
    pathway: [
      "下腹部の深いところ（胞中）から会陰に出る。",
      "恥骨の上縁にある曲骨を通り、おなかと胸の中央を上る。",
      "喉頭（天突・廉泉）を経て、下唇の中央（承漿）に至る。",
      "口唇を巡り、面部を通って目頭の下（承泣）に至る。"
    ],
    studyAnswer: "下腹部から上り、のど・あご・顔を経て目に至る",
    clinicalTips: "列缺と照海は、古典でのどや胸の不調などと関連づけられます。この組み合わせの効果を確かめるには、症状や病気を定めた比較試験が必要です。",
    classicQuote: {
      book: "素問",
      chapter: "骨空論篇",
      text: "任脈者，起於中極之下，以上毛際，循腹裏，上關元，至咽喉，上頤，循面，入目。",
      translation: "任脈は中極の下（会陰）より起こり、陰毛の際を上り、腹の中を巡って関元に上り、咽喉に至り、顎・頬を巡って目に入る。"
    },
    pointsCount: 24,
    pointsList: ["会陰", "曲骨", "中極", "関元", "気海", "神闕", "中脘", "膻中", "天突", "廉泉", "承漿"]
  },
  {
    slug: "sho",
    name: "衝脈",
    kanji: "衝脈",
    reading: "しょうみゃく",
    category: "陰奇経",
    masterPoint: {
      name: "公孫",
      meridian: "足太陰脾経",
      code: "SP4"
    },
    couplePoint: {
      name: "内関",
      meridian: "手厥陰心包経",
      code: "PC6"
    },
    pairTargetArea: "心・胸・胃",
    nature: "衝脈には、おなかを上る枝と、脚の内側を足へ下る枝があります。古典では「十二経の海」「血海」と呼び、気血の動きと結びつけています。",
    pathway: [
      "小腹（胞中）より起こり、会陰に出る。",
      "脚の付け根の気街から上る枝は、足少陰腎経に沿っておなかを上り、胸に広がる。",
      "もう一系統は咽喉に上り、顔に至る。",
      "下行する枝は、大腿の内側から内くるぶしを経て、母趾（足の親指）に達する。"
    ],
    studyAnswer: "気が上方へ逆行するという「逆気」が記される",
    clinicalTips: "公孫と内関は、古典で胃・胸の不調と関連づけられます。2025年のCochraneレビューが調べたのは、手術後の吐き気や嘔吐を予防するための内関への刺激です。公孫を組み合わせた場合の効果は、このレビューの対象外です。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "衝脈為病，逆気而裏急。",
      translation: "衝脈の病証は「逆気而裏急」と記されています。「逆気」は気が上方へ逆行するという伝統理論の表現です。「裏急」の部位や症状の詳しい解釈は原典・注釈の確認が必要で、現代のパニック発作や腸疾患と同一の診断ではありません。"
    },
    pointsCount: 0,
    pointsList: ["気街", "幽門", "通谷", "陰都", "石関", "商曲", "中注", "四満", "気穴", "大赫", "横骨"]
  },
  {
    slug: "tai",
    name: "帯脈",
    kanji: "帯脈",
    reading: "たいみゃく",
    category: "陽奇経",
    masterPoint: {
      name: "足臨泣",
      meridian: "足少陽胆経",
      code: "GB41"
    },
    couplePoint: {
      name: "外関",
      meridian: "手少陽三焦経",
      code: "TE5"
    },
    pairTargetArea: "目尻・耳の後ろ・首・肩・頭の横・脇腹",
    nature: "帯脈は腰の周りを横に一周する道筋です。伝統医学では、縦に走る経脈を帯のように束ねると考えます。",
    pathway: [
      "第11肋骨の先にある章門の下から、脇腹を斜めに下る。",
      "帯脈穴、五枢、維道を通り、腰の周りを横に一周する。"
    ],
    studyAnswer: "お腹が張り、腰が水の中に座っているように重く感じられる",
    clinicalTips: "足臨泣と外関は、伝統医学で頭の横や脇腹の症状と関連づけられます。慢性の頭痛を対象にした鍼の研究からは、この二穴だけを組み合わせたときの効果は分かりません。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "帯脈為病，腹満，腰溶溶若坐水中。",
      translation: "帯脈が病むと、腹部が張り、腰が溶けるようにだるく、まるで冷水の中に腰掛けているように冷えて重くなる。"
    },
    pointsCount: 0,
    pointsList: ["帯脈", "五枢", "維道"]
  },
  {
    slug: "yokyo",
    name: "陽蹻脈",
    kanji: "陽蹻脈",
    reading: "ようきょうみゃく",
    category: "陽奇経",
    masterPoint: {
      name: "申脈",
      meridian: "足太陽膀胱経",
      code: "BL62"
    },
    couplePoint: {
      name: "後渓",
      meridian: "手太陽小腸経",
      code: "SI3"
    },
    pairTargetArea: "目頭・頭の横・背中・腰・外くるぶし",
    nature: "陽蹻脈は外くるぶしから脚の外側を上り、肩を経て目頭へ向かいます。伝統医学では、脚の外側の張りや目を開く動作と結びつけています。",
    pathway: [
      "外くるぶしの下（申脈）に起こり、外くるぶしの後ろを上る。",
      "すねの外側の骨（腓骨）の後ろを通り、太ももの外側から脇腹、肩の外側（肩髃）へ上る。",
      "首・口角・目頭（睛明）に至り、督脈・足太陽経と合流する。"
    ],
    studyAnswer: "脚の外側が引きつれ、内側がゆるむと記される",
    clinicalTips: "申脈と後渓を組み合わせます。陽蹻脈は伝統医学で脚の外側の引きつれや、目が冴える状態に関連づけられます。睡眠への効果は、睡眠時間などを測る試験で確かめる必要があります。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "陽蹻為病，陰緩而陽急。",
      translation: "陽蹻脈が病むと、下肢の内側（陰）が弛緩し、外側（陽）が緊張して引きつれる。"
    },
    pointsCount: 0,
    pointsList: ["申脈", "僕参", "跗陽", "居髎", "臑兪", "肩髃", "巨骨", "地倉", "承泣", "睛明"]
  },
  {
    slug: "inkyo",
    name: "陰蹻脈",
    kanji: "陰蹻脈",
    reading: "いんきょうみゃく",
    category: "陰奇経",
    masterPoint: {
      name: "照海",
      meridian: "足少陰腎経",
      code: "KI6"
    },
    couplePoint: {
      name: "列缺",
      meridian: "手太陰肺経",
      code: "LU7"
    },
    pairTargetArea: "のど・胸・内くるぶし",
    nature: "陰蹻脈は内くるぶしから脚の内側を上り、目頭で陽蹻脈と交わります。伝統医学では、脚の内側の張りや目を閉じる動作と結びつけています。",
    pathway: [
      "内くるぶしの下にある照海から、その上の交信へ向かう。",
      "大腿内側を直行して前陰（生殖器）に入り、腹部を上行する。",
      "胸から鎖骨の上のくぼみとのどを経て、目頭の睛明で陽蹻脈と交わる。"
    ],
    studyAnswer: "脚の内側が引きつれ、外側がゆるむと記される",
    clinicalTips: "照海と列缺を組み合わせます。陰蹻脈は伝統医学で脚の内側の引きつれに関連づけられます。この組み合わせがのどの症状や日中の眠気に与える影響は、古典の記述からは分かりません。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "陰蹻為病，陽緩而陰急。",
      translation: "陰蹻脈が病むと、下肢の外側（陽）が弛緩し、内側（陰）が過度に緊張して引きつれる。"
    },
    pointsCount: 0,
    pointsList: ["照海", "交信", "睛明"]
  },
  {
    slug: "yoi",
    name: "陽維脈",
    kanji: "陽維脈",
    reading: "よういみゃく",
    category: "陽奇経",
    masterPoint: {
      name: "外関",
      meridian: "手少陽三焦経",
      code: "TE5"
    },
    couplePoint: {
      name: "足臨泣",
      meridian: "足少陽胆経",
      code: "GB41"
    },
    pairTargetArea: "目尻・耳・肩・首・体表部全般",
    nature: "「維」には、つなぐという意味があります。陽維脈は脚の外側から肩・頭へ向かい、伝統医学では陽経同士をつなぐと考えます。",
    pathway: [
      "足の諸陽経の会合（金門）に起こり、外くるぶしから上る。",
      "脚の外側の陽交を通り、脇腹を上る。",
      "肩部（肩井）・首の後ろを経て、前額部・頭頂・風池に集まる。"
    ],
    studyAnswer: "寒さや熱に苦しむ状態と関連づけられる",
    clinicalTips: "外関と足臨泣は、伝統医学で悪寒と熱感が交互に現れる状態や、頭の横の症状と関連づけられます。こうした記述は、感染症の研究結果とは区別して読みます。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "陽維為病，苦寒熱。",
      translation: "陽維脈が病むと、悪寒と発熱が交互に生じて激しく苦しむ。"
    },
    pointsCount: 0,
    pointsList: ["金門", "陽交", "臑兪", "天髎", "肩井", "頭維", "本神", "陽白", "風池"]
  },
  {
    slug: "ini",
    name: "陰維脈",
    kanji: "陰維脈",
    reading: "いんいみゃく",
    category: "陰奇経",
    masterPoint: {
      name: "内関",
      meridian: "手厥陰心包経",
      code: "PC6"
    },
    couplePoint: {
      name: "公孫",
      meridian: "足太陰脾経",
      code: "SP4"
    },
    pairTargetArea: "心・胸・胃",
    nature: "陰維脈は脚の内側からおなかと胸を通り、のどで任脈と合流するとされます。伝統医学で陰経同士をつなぐとされる脈です。",
    pathway: [
      "足の諸陰経の交会（築賓）に起こる。",
      "太ももの内側を上り、おなかの府舎・大横・腹哀を通って、胸の期門に至る。",
      "咽喉を挟んで上行し、任脈（天突・廉泉）に合流する。"
    ],
    studyAnswer: "「心痛」に苦しむと記される",
    clinicalTips: "内関と公孫は、伝統医学で心・胸・胃の病証と関連づけられます。内関への刺激を調べた手術後の吐き気・嘔吐の研究は、この組み合わせを評価していません。胸の痛みがある場合は医療機関に相談してください。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "陰維為病，苦心痛。",
      translation: "陰維脈の病証は「苦心痛」と記されています。この「心痛」を胸部・胃・精神のすべての痛みと一括して訳すことは避け、意味の範囲は原典・注釈を確認して学びます。現代の心疾患の診断名とは区別します。"
    },
    pointsCount: 0,
    pointsList: ["築賓", "府舎", "大横", "腹哀", "期門", "天突", "廉泉"]
  }
];

// 八脈交会穴（4対）の一覧データ
export interface HachimyakuPair {
  id: string;
  name: string;
  master1: { vessel: string; point: string; meridian: string; code: string };
  master2: { vessel: string; point: string; meridian: string; code: string };
  targetArea: string;
  clinicalSignificance: string;
}

export const HACHIMYAKU_PAIRS: HachimyakuPair[] = [
  {
    id: "kouson-naikan",
    name: "公孫 × 内関 ペア",
    master1: { vessel: "衝脈", point: "公孫", meridian: "足太陰脾経", code: "SP4" },
    master2: { vessel: "陰維脈", point: "内関", meridian: "手厥陰心包経", code: "PC6" },
    targetArea: "胃・心・胸部",
    clinicalSignificance: "公孫は衝脈、内関は陰維脈に通じるとされ、胃・心・胸部の病証との関係を学ぶ配穴です。内関刺激の術後悪心・嘔吐の臨床研究は、他の経穴の併用試験を除外しており、この2穴の配穴や胃痛・パニック発作への効果を示しません。"
  },
  {
    id: "koukei-shinmyaku",
    name: "後渓 × 申脈 ペア",
    master1: { vessel: "督脈", point: "後渓", meridian: "手太陽小腸経", code: "SI3" },
    master2: { vessel: "陽蹻脈", point: "申脈", meridian: "足太陽膀胱経", code: "BL62" },
    targetArea: "目頭・首の後ろ・耳・肩・背中",
    clinicalSignificance: "後渓は督脈、申脈は陽蹻脈に通じるとされ、頸・背・腰部の病証に関連づける配穴です。鍼治療の慢性疼痛研究では痛みや身体機能を評価しますが、この配穴による姿勢矯正や自律神経の「リセット」は検証された評価項目ではありません。"
  },
  {
    id: "rinshyu-gaikan",
    name: "足臨泣 × 外関 ペア",
    master1: { vessel: "帯脈", point: "足臨泣", meridian: "足少陽胆経", code: "GB41" },
    master2: { vessel: "陽維脈", point: "外関", meridian: "手少陽三焦経", code: "TE5" },
    targetArea: "目尻・耳の後ろ・首・肩・側腹部",
    clinicalSignificance: "足臨泣は帯脈、外関は陽維脈に通じるとされ、側頭部や体の側面の病証を学ぶ配穴です。慢性頭痛への鍼治療研究を、この2穴の即効性やストレスによる痛みへの特異的効果にそのまま当てはめることはできません。"
  },
  {
    id: "rekkesu-shoukai",
    name: "列缺 × 照海 ペア",
    master1: { vessel: "任脈", point: "列缺", meridian: "手太陰肺経", code: "LU7" },
    master2: { vessel: "陰蹻脈", point: "照海", meridian: "足少陰腎経", code: "KI6" },
    targetArea: "のど・胸・骨盤",
    clinicalSignificance: "列缺は任脈、照海は陰蹻脈に通じるとされ、喉・胸部や婦人科の病証と関連づける配穴です。「肺と腎」「津液・陰液」は伝統医学の概念であり、呼吸器や泌尿器の炎症、体液量の変化を実証した機序ではありません。"
  }
];
