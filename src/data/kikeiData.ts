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
  pairName: string;
  pairTargetArea: string; // 例: 胃・心・胸
  nature: string; // 本質・統括機能
  pathway: string[]; // 流注・走行ルート
  indications: string[]; // 主治病証
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
    pairName: "後渓 - 申脈ペア",
    pairTargetArea: "目内眥・頚・項・耳・肩背・腰背部",
    nature: "「陽脈の海」と呼ばれ、全身のすべての陽経を統括・調整する。脊柱の正中を上行し、脳・骨髄・腎に深く連なる。",
    pathway: [
      "小腹（骨盤腔内・胞中）に起こり、会陰部に下る。",
      "長強（尾骨端）より脊柱の内側を貫き、背部正中を上行する。",
      "風府より脳内に入り、頭頂部（百会）に上る。",
      "前頭部・鼻柱・水溝（人中）を経て、上唇の齦交に至る。"
    ],
    indications: [
      "脊柱の強直・背部痛・腰痛・坐骨神経痛",
      "頭痛・めまい・頸部こり・後頭部痛",
      "精神不安・てんかん・意識障害・自律神経失調",
      "小児のひきつけ・発熱性痙攣",
      "陽気虚衰による悪寒・冷え・精力減退"
    ],
    clinicalTips: "督脈の病変には通督脈穴の後渓を用い、申脈を配穴することで脊柱・項背部の筋緊張を急速に緩和させます。百会や大椎との併用で陽気の昇発・自律神経調整に卓効があります。",
    classicQuote: {
      book: "難経",
      chapter: "第二十八難",
      text: "督脈者，起於下極之腧，並於脊裏，上至風府，入屬於腦。",
      translation: "督脈は、下極（会陰・長強）の穴より起こり、脊柱の内側を並び上り、風府に至って脳に所属する。"
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
      name: "列欠",
      meridian: "手太陰肺経",
      code: "LU7"
    },
    couplePoint: {
      name: "照海",
      meridian: "足少陰腎経",
      code: "KI6"
    },
    pairName: "列欠 - 照海ペア",
    pairTargetArea: "肺系・咽喉・胸部・呼吸器・生殖器",
    nature: "「陰脈の海」と呼ばれ、全身のすべての陰経（足の三陰経・手の三陰経）を統括する。気血・精・津液を滋養し、妊娠・胎児の育成（任は妊に通ず）を司る。",
    pathway: [
      "小腹（骨盤腔内・胞中）に起こり、会陰に出る。",
      "恥骨結合上縁（曲骨）を経て、腹部・前胸部正中を上行する。",
      "喉頭（天突・廉泉）を経て、下唇の中央（承漿）に至る。",
      "口唇を巡り、面部を通って目頭の下（承泣）に至る。"
    ],
    indications: [
      "月経不順・無月経・不妊症・帯下異常・更年期障害",
      "下腹部痛・冷え・便秘・尿閉・遺尿・前立腺肥大",
      "胃痛・悪心・嘔吐・食欲不振（中脘など）",
      "気管支喘息・咳・息切れ・咽喉腫痛（胸中壇中・天突）",
      "陰虚内熱・のぼせ・動悸・精神不安"
    ],
    clinicalTips: "任脈は気血・津液の根本であり、列欠（通任脈）と照海（通陰蹻脈）の組み合わせは、喉の乾燥や慢性の咳、喉のつかえ感（梅核気）、婦人科系疾患に絶大な効果を発揮します。中脘・気海・関元への施灸との併用が著効です。",
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
    pairName: "公孫 - 内関ペア",
    pairTargetArea: "心・胸・胃・腹部・消化器全般",
    nature: "「十二経の海」「血海」と称され、全身の経絡の気血の調節弁として機能する。衝とは「要衝・突き上げる」の意で、気が上衝する逆気病変に最も深く関与する。",
    pathway: [
      "小腹（胞中）より起こり、会陰に出る。",
      "一部は気街（大腿部動脈部）より足少陰腎経と並んで腹部を上行し、胸中に散じる。",
      "もう一系統は咽喉に上り、鼻腔（口唇・顔面）に至る。",
      "下行する枝は、大腿内側から足の内果を経て、足の母指に達する。"
    ],
    indications: [
      "気の突き上げ（逆気・上気・動悸・パニック様症状）",
      "激しい腹痛・胃痙攣・胸やけ・呑酸・悪心・胃下垂",
      "過敏性腸症候群（下痢と便秘の繰り返し）",
      "月経痛・崩漏（不正性器出血）・無月経",
      "胸内苦悶感・狭心症様胸痛・呼吸促迫"
    ],
    clinicalTips: "公孫（通衝脈）と内関（通陰維脈）のペアは八脈交会穴の中で最も使用頻度が高く、「胃・心・胸」のすべての逆気・自律神経緊張に即効性があります。過敏性腸症候群や胃痛・パニック発作の第一選択です。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "衝脈為病，逆気而裏急。",
      translation: "衝脈が病むと、気配が激しく上衝（逆気）し、下腹部が急迫して痛む。"
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
    pairName: "足臨泣 - 外関ペア",
    pairTargetArea: "目外眥・耳後・頚・肩・側頭部・側腹部",
    nature: "経絡の中で唯一横方向に巡る。帯（ベルト）のように腰部を一周し、縦に走るすべての経脈を束ね、緩みすぎないように保持・統制する。",
    pathway: [
      "第十一肋骨先端（章門）の下より起こり、季肋部を斜めに下る。",
      "帯脈穴・五枢・維道を経て、腰腹部を水平に一周取り巻く。"
    ],
    indications: [
      "帯脈の弛緩による帯下異常（おりもの・帯下の過多）",
      "腰椎骨盤の不安定感（「水の中に座っているような腰の重だるさ」）",
      "下肢の脱力・運動麻痺・冷え",
      "月経不順・子宮脱・内臓下垂",
      "片頭痛・耳鳴り・側腹部痛・肋間神経痛"
    ],
    clinicalTips: "足臨泣（通帯脈）と外関（通陽維脈）を併用することで、少陽経の熱を清解しつつ帯脈を引き締め、頑固な片頭痛や帯下・骨盤痛・側頭部痛を改善します。",
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
    pairName: "申脈 - 後渓ペア",
    pairTargetArea: "目内眥・側頭・背腰部・外果部",
    nature: "蹻は「敏捷・足の軽やかさ」を意味する。下肢外側の運動・陽気の亢進を司り、身体の起立や覚醒状態を維持する。",
    pathway: [
      "足外果の下（申脈）に起こり、外果後縁を上る。",
      "腓骨後縁を経て、大腿外側を巡り、脇肋部・肩外側（肩髃）に上る。",
      "頚部・口角・目内眥（睛明）に至り、督脈・足太陽経と合流する。"
    ],
    indications: [
      "下肢外側の筋痙攣・強直（内反足・外側が突っ張る歩行困難）",
      "不眠症・目が冴えて眠れない（陽気亢進・開目）",
      "日中のてんかん発作・日中の意識もうろう",
      "背腰部の激痛・坐骨神経痛",
      "目内眥の痛み・赤目・眼精疲労"
    ],
    clinicalTips: "申脈（通陽蹻脈）は陽気の巡りを助け、後渓と組むことで下肢外側の引き攣れや睡眠リズム障害（特に「夜になっても目が冴えて眠れない」興奮状態）を沈静化します。",
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
      name: "列欠",
      meridian: "手太陰肺経",
      code: "LU7"
    },
    pairName: "照海 - 列欠ペア",
    pairTargetArea: "肺系・咽喉・胸部・内果部",
    nature: "下肢内側の運動・陰気を司り、身体の静けさ・睡眠・休息への移行を維持する。",
    pathway: [
      "足内果の下（照海）に起こり、内果上方（交信）を上る。",
      "大腿内側を直行して前陰（生殖器）に入り、腹部を上行する。",
      "胸部から鎖骨上窩・喉頭を巡り、目内眥（睛明）に至り陽蹻脈と交わる。"
    ],
    indications: [
      "下肢内側の筋痙攣・引きつれ（外反足・内側が突っ張る）",
      "過剰な傾眠・日中に強烈な眠気に襲われる（嗜眠・閉目）",
      "夜間のてんかん発作・夜間の下腹部痛",
      "下腹部痛・疝気・月経困難",
      "咽喉の乾燥・声がれ・慢性の空咳"
    ],
    clinicalTips: "照海（通陰蹻脈）は腎陰を補い、陰蹻の走行を潤します。列欠と併用することで、過眠症や夜間痛、喉の激しい乾燥を伴う慢性陰虚に素晴らしい効果をもたらします。",
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
    pairName: "外関 - 足臨泣ペア",
    pairTargetArea: "目外眥・耳・肩・頚・体表部全般",
    nature: "維は「つなぐ・維絡」の意。全身のすべての陽経を連絡・結合し、外表（衛気・皮膚・筋肉）の守りと協調を維持する。",
    pathway: [
      "足の諸陽経の会合（金門）に起こり、外果を上る。",
      "下肢外側（陽交）を経て、側腹部・脇肋部を上行する。",
      "肩部（肩井）・後頚部を経て、前額部・頭頂・風池に集まる。"
    ],
    indications: [
      "悪寒発熱の往来（少陽病・マラリア様の寒熱交代）",
      "体表の風邪症状・急性の悪寒・無汗・全身の筋肉痛",
      "片頭痛・側頭部頭痛・頚項部のこり・肩甲骨周囲炎",
      "耳鳴り・難聴・めまい・乗り物酔い",
      "自律神経の急激なアンバランス（冷えのぼせ）"
    ],
    clinicalTips: "外関（通陽維脈）は外邪を解表する要穴であり、足臨泣と組むことで体表の邪を速やかに追い払い、往来寒熱や側頭部の激痛を鎮めます。",
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
    pairName: "内関 - 公孫ペア",
    pairTargetArea: "心・胸・胃・腹部・精神神経系",
    nature: "全身のすべての陰経を連絡・結合し、体内（臓腑・精神・血脈・心神）の調和と安定を統括する。",
    pathway: [
      "足の諸陰経の交会（築賓）に起こる。",
      "大腿内側を上行し、腹部（府舎・大横・腹哀）を経て胸部（期門）に至る。",
      "咽喉を挟んで上行し、任脈（天突・廉泉）に合流する。"
    ],
    indications: [
      "心痛・胸痛・胸内苦悶・心悸亢進・狭心症様症状",
      "重度の精神不安・抑うつ・不眠・感情の不安定・悲哀感",
      "胃痛・悪心・吐き気・つわり・逆流性食道炎",
      "胸脇部の張り・詰まり感",
      "甲状腺腫大・頚部のしこり・喉の異物感"
    ],
    clinicalTips: "内関（通陰維脈）は心神安寧の特効穴です。公孫と組むことで「心・胸・胃」のすべての気滞・瘀血・情志異常（ストレス性の胃痛や胸痛）を速やかに緩解させます。",
    classicQuote: {
      book: "難経",
      chapter: "第二十九難",
      text: "陰維為病，苦心痛。",
      translation: "陰維脈が病むと、心（胸部・胃・精神）が激しく痛み苦しむ。"
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
  indications: string[];
  clinicalSignificance: string;
}

export const HACHIMYAKU_PAIRS: HachimyakuPair[] = [
  {
    id: "kouson-naikan",
    name: "公孫 × 内関 ペア",
    master1: { vessel: "衝脈", point: "公孫", meridian: "足太陰脾経", code: "SP4" },
    master2: { vessel: "陰維脈", point: "内関", meridian: "手厥陰心包経", code: "PC6" },
    targetArea: "胃・心・胸部",
    indications: ["激しい胃痛・悪心・嘔吐", "逆流性食道炎・胃酸過多", "動悸・胸内苦悶・狭心症様発作", "過敏性腸症候群・下痢", "パニック発作・重度の精神不安"],
    clinicalSignificance: "八脈交会穴の中で最も臨床応用される黄金ペア。消化器の気逆と心神の不安を同時に整える。"
  },
  {
    id: "koukei-shinmyaku",
    name: "後渓 × 申脈 ペア",
    master1: { vessel: "督脈", point: "後渓", meridian: "手太陽小腸経", code: "SI3" },
    master2: { vessel: "陽蹻脈", point: "申脈", meridian: "足太陽膀胱経", code: "BL62" },
    targetArea: "目内眥・頚項・耳・肩背・脊柱部",
    indications: ["項部硬直・頑固な首こり", "急性腰痛（ギックリ腰）・脊柱管狭窄痛", "後頭部痛・目頭の充血", "日中の不眠・興奮状態", "外傷後のむち打ち症"],
    clinicalSignificance: "脊柱正中と身体後面の全陽気を統括。骨格・筋膜の強直を解き、姿勢と自律神経をリセットする。"
  },
  {
    id: "rinshyu-gaikan",
    name: "足臨泣 × 外関 ペア",
    master1: { vessel: "帯脈", point: "足臨泣", meridian: "足少陽胆経", code: "GB41" },
    master2: { vessel: "陽維脈", point: "外関", meridian: "手少陽三焦経", code: "TE5" },
    targetArea: "目外眥・耳後・頚・肩・側腹部",
    indications: ["片頭痛・側頭部痛・側頚部痛", "耳鳴り・突発性難聴・めまい", "肋間神経痛・胸脇苦満", "帯下過多・骨盤周囲の不安定感", "外邪による悪寒発熱"],
    clinicalSignificance: "側頭部から骨盤を包む少陽・帯脈系統を清熱。ストレスによる気滞や側面の痛みを即効で緩める。"
  },
  {
    id: "rekkesu-shoukai",
    name: "列欠 × 照海 ペア",
    master1: { vessel: "任脈", point: "列欠", meridian: "手太陰肺経", code: "LU7" },
    master2: { vessel: "陰蹻脈", point: "照海", meridian: "足少陰腎経", code: "KI6" },
    targetArea: "肺系・咽喉・胸膈・骨盤腔",
    indications: ["咽喉腫痛・慢性の空咳・喘息", "喉のつかえ感（ヒステリー球・梅核気）", "声がれ・嗄声・口渇", "月経痛・骨盤臓器下垂・頻尿", "過眠症・嗜眠傾向"],
    clinicalSignificance: "金（肺）水（腎）相生を促し、全身の津液・陰液を滋養。呼吸器の炎症と婦人科・泌尿器の虚熱を鎮める。"
  }
];
