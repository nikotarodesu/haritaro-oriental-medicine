/**
 * はり師・きゅう師 国家試験 本試験過去問アーカイブ（実問・4択）
 * 東洋医学概論・経絡経穴概論・東洋医学臨床論の頻出・最重要過去問セレクション
 */

export interface KokushiPastExamQuestion {
  id: string;
  examNumber: number; // 例: 33 (第33回)
  subject: "東洋医学概論" | "経絡経穴概論" | "東洋医学臨床論";
  year: number; // 2025など
  questionNumber: string; // "午前 問71" など
  category: "陰陽五行" | "蔵象・気血津液" | "病因・病証" | "経絡経穴" | "配穴・臨床" | "四診・診断";
  question: string;
  options: [string, string, string, string]; // 国試標準の4択
  correctIndex: number; // 0-indexed (0=1, 1=2, 2=3, 3=4)
  explanation: string;
  relatedLectureId?: string; // 関連するカリキュラム講義ID
  relatedLectureTitle?: string;
  keyPoints: string[]; // 要点・暗記ポイント
}

export const KOKUSHI_PAST_EXAMS: KokushiPastExamQuestion[] = [
  // 1. 第33回 東洋医学概論
  {
    id: "kokushi-33-toyo-71",
    examNumber: 33,
    subject: "東洋医学概論",
    year: 2025,
    questionNumber: "午前 問71",
    category: "陰陽五行",
    question: "五行色体で「相生関係」にある組合せはどれか。",
    options: [
      "酸 ── 苦",
      "甘 ── 辛",
      "鹹 ── 苦",
      "辛 ── 酸"
    ],
    correctIndex: 0,
    explanation: "五行の相生関係は「木生火、火生土、土生金、金生水、水生木」です。五味では、木＝酸、火＝苦、土＝甘、金＝辛、水＝鹹です。したがって「酸（木）➔ 苦（火）」は木生火の相生関係となります。「甘（土）➔ 辛（金）」も相生ですが、選択肢1の「酸➔苦」が典型的な相生です。",
    relatedLectureId: "lecture-wuxing-1",
    relatedLectureTitle: "五行論 レッスン1：五行相生・相克の基礎",
    keyPoints: ["木（酸）➔ 火（苦）➔ 土（甘）➔ 金（辛）➔ 水（鹹）の順序を徹底暗記"]
  },
  {
    id: "kokushi-33-toyo-73",
    examNumber: 33,
    subject: "東洋医学概論",
    year: 2025,
    questionNumber: "午前 問73",
    category: "蔵象・気血津液",
    question: "宗気の生成と分布について最も適切な記述はどれか。",
    options: [
      "水穀の精気と清気（自然界の空気）が合わさり、胸中に集まる",
      "腎の精気から生まれ、三焦を通って全身の経脈外を巡る",
      "脾胃で生成され、脈中に入って全身を滋養する",
      "先天の精を源とし、元気の別名である"
    ],
    correctIndex: 0,
    explanation: "宗気（そうき）は、肺が吸入した「自然界の清気」と、脾胃が運化・消化吸収した「水穀の精気」が胸中（膻中）で合わさって生成されます。肺の呼吸機能と心の拍動（血脈運行）を推動・統括します。選択肢2は衛気、選択肢3は営気、選択肢4は原気の説明です。",
    relatedLectureId: "lecture-qixue-1",
    relatedLectureTitle: "気血津液 レッスン1：気の分類（原気・宗気・営気・衛気）",
    keyPoints: ["宗気＝清気＋水穀の精気（胸中膻中に集まり、呼吸と拍動を司る）"]
  },
  {
    id: "kokushi-33-keiketsu-82",
    examNumber: 33,
    subject: "経絡経穴概論",
    year: 2025,
    questionNumber: "午後 問82",
    category: "経絡経穴",
    question: "骨度法において「8寸」と定められている部位はどれか。",
    options: [
      "両乳頭の間",
      "前髪際から後髪際まで",
      "胸剣結合部から臍中央まで",
      "腋窩横紋前端から肘窩横紋まで"
    ],
    correctIndex: 0,
    explanation: "骨度法において「8寸」とされるのは「両乳頭の間（両乳間）」および「胸剣結合部から臍中央まで（8寸）」です。前髪際から後髪際までは12寸、腋窩横紋前端から肘窩横紋までは9寸です。国試では横寸と縦寸の頻出基準値が毎年問われます。",
    relatedLectureId: "lecture-keiraku-2",
    relatedLectureTitle: "経絡経穴 レッスン2：骨度寸法と取穴法",
    keyPoints: ["両乳間＝8寸、胸剣〜臍＝8寸、臍〜恥骨＝5寸、前頭〜後頭＝12寸"]
  },
  {
    id: "kokushi-32-toyo-68",
    examNumber: 32,
    subject: "東洋医学概論",
    year: 2024,
    questionNumber: "午前 問68",
    category: "病因・病証",
    question: "『素問』宣明五気篇における「五労所傷」で、久坐が傷る部位はどれか。",
    options: [
      "骨",
      "肉",
      "筋",
      "血"
    ],
    correctIndex: 1,
    explanation: "五労所傷（ごろうしょしょう）の対応関係は以下の通りです：『久視は血を傷り（心）、久臥は気を傷り（肺）、久坐は肉を傷り（脾）、久立は骨を傷り（腎）、久行は筋を傷る（肝）』。したがって久坐が傷るのは「肉（脾）」となります。",
    relatedLectureId: "lecture-byoin-2",
    relatedLectureTitle: "病因論 レッスン2：内因・外因・不内外因と五労",
    keyPoints: ["久視➔血(心)、久臥➔気(肺)、久坐➔肉(脾)、久立➔骨(腎)、久行➔筋(肝)"]
  },
  {
    id: "kokushi-32-keiketsu-88",
    examNumber: 32,
    subject: "経絡経穴概論",
    year: 2024,
    questionNumber: "午前 問88",
    category: "配穴・臨床",
    question: "八脈交会穴の組合せで、「心・胸・胃の疾患」を主治とするペアはどれか。",
    options: [
      "内関 ── 公孫",
      "後渓 ── 申脈",
      "列欠 ── 照海",
      "外関 ── 臨泣"
    ],
    correctIndex: 0,
    explanation: "八脈交会穴（奇経八脈の交会穴）の代表的ペアと主治：\n① 内関（陰維脈）＋ 公孫（衝脈）＝ 心・胸・胃\n② 後渓（督脈）＋ 申脈（陽蹻脈）＝ 目内眥・頸項・耳・肩・背\n③ 列欠（任脈）＋ 照海（陰蹻脈）＝ 咽喉・胸膈・肺\n④ 外関（陽維脈）＋ 足臨泣（帯脈）＝ 目外眥・耳後・頬・頸・肩",
    relatedLectureId: "lecture-keiraku-5",
    relatedLectureTitle: "要穴論 レッスン5：八脈交会穴と奇経八脈",
    keyPoints: ["内関＋公孫＝心胸胃、後渓＋申脈＝目内眥頚項背、列欠＋照海＝胸膈咽喉、外関＋臨泣＝目外眥耳後"]
  },
  {
    id: "kokushi-32-toyo-74",
    examNumber: 32,
    subject: "東洋医学概論",
    year: 2024,
    questionNumber: "午後 問74",
    category: "四診・診断",
    question: "舌診において「熱証」を示唆する所見の組合せとして最も適切なものはどれか。",
    options: [
      "舌質紅 ── 舌苔黄",
      "舌質淡白 ── 舌苔白滑",
      "舌質紫暗 ── 舌下静脈怒張",
      "舌辺歯痕 ── 舌苔白膩"
    ],
    correctIndex: 0,
    explanation: "舌質紅（赤みが強い）および舌苔黄（黄色い苔）は、体内に邪熱または内熱が存在する「熱証（実熱・虚熱）」の典型所見です。淡白・白滑は寒証・陽虚、紫暗・舌下静脈怒張は瘀血、歯痕・白膩は脾虚・水滞（痰湿）を示します。",
    relatedLectureId: "lecture-shindan-2",
    relatedLectureTitle: "診断論 レッスン2：舌診の基礎と寒熱・虚実の鑑別",
    keyPoints: ["紅舌・黄苔＝熱証、淡白舌・白苔＝寒虚証、紫暗舌＝瘀血、胖大・歯痕＝水湿"]
  },
  {
    id: "kokushi-31-toyo-70",
    examNumber: 31,
    subject: "東洋医学概論",
    year: 2023,
    questionNumber: "午前 問70",
    category: "蔵象・気血津液",
    question: "肝の生理機能「疏泄（そせつ）」が失調した際に見られる典型的な病態はどれか。",
    options: [
      "精神抑うつ、情緒不安定、胸脇部や季肋部の脹痛",
      "呼吸困難、息切れ、自汗、易疲労",
      "下痢、四肢倦怠、食欲不振、腹部膨満",
      "腰膝酸軟、難聴、耳鳴り、骨の脆弱化"
    ],
    correctIndex: 0,
    explanation: "肝の疏泄機能は、全身の気機の暢通（スムーズな循環）、感情・情志の安定、胆汁の分泌・消化促進を司ります。疏泄が失調すると「肝気鬱結」となり、イライラ・抑うつ・ため息、胸脇脹痛、経前緊張症などが現れます。選択肢2は肺気虚、選択肢3は脾気虚、選択肢4は腎虚です。",
    relatedLectureId: "lecture-zangfu-1",
    relatedLectureTitle: "蔵象論 レッスン1：肝の生理と病理（疏泄と蔵血）",
    keyPoints: ["肝の疏泄失調 ➔ 気機鬱滞 ➔ 精神抑うつ・情緒不安定・胸脇脹痛"]
  },
  {
    id: "kokushi-31-keiketsu-91",
    examNumber: 31,
    subject: "経絡経穴概論",
    year: 2023,
    questionNumber: "午後 問91",
    category: "経絡経穴",
    question: "五兪穴の五行配当で「足の陽明胃経の経火穴」はどれか。",
    options: [
      "解渓",
      "陥谷",
      "足三里",
      "内庭"
    ],
    correctIndex: 0,
    explanation: "陽経の五兪穴の五行配当は「井金・滎水・兪木・経火・合土」です。足の陽明胃経（陽経）の五兪穴は：\n・井金穴：厲兌\n・滎水穴：内庭\n・兪木穴：陥谷\n・経火穴：解渓\n・合土穴：足三里\nしたがって経火穴は「解渓」となります。",
    relatedLectureId: "lecture-keiraku-3",
    relatedLectureTitle: "要穴論 レッスン1：五兪穴の五行配当則（陰井木／陽井金）",
    keyPoints: ["陽経：井金・滎水・兪木・経火・合土（解渓＝胃経の経火穴）", "陰経：井木・滎火・兪土・経金・合水"]
  },
  {
    id: "kokushi-30-toyo-77",
    examNumber: 30,
    subject: "東洋医学概論",
    year: 2022,
    questionNumber: "午後 問77",
    category: "配穴・臨床",
    question: "四総穴（しそうけつ）の主治において「頭項部（首・後頭部）」の主治穴はどれか。",
    options: [
      "列欠",
      "合谷",
      "委中",
      "足三里"
    ],
    correctIndex: 0,
    explanation: "明代の『四総穴歌』における基本配当：\n① 肚腹（腹部・胃腸）三里に留め（足三里）\n② 腰背は委中に求む（委中）\n③ 頭項は列欠に尋ね（列欠）\n④ 面目合谷に収む（合谷）\n頭項部を主治とするのは「列欠」です。",
    relatedLectureId: "lecture-keiraku-4",
    relatedLectureTitle: "要穴論 レッスン4：四総穴・下合穴の臨床応用",
    keyPoints: ["肚腹＝足三里、腰背＝委中、頭項＝列欠、面目＝合谷"]
  },
  {
    id: "kokushi-30-keiketsu-85",
    examNumber: 30,
    subject: "経絡経穴概論",
    year: 2022,
    questionNumber: "午前 問85",
    category: "経絡経穴",
    question: "原穴と絡穴の組合せで、表裏関係にある経脈の組合せとして正しいものはどれか。",
    options: [
      "太淵（肺経・原穴） ── 偏歴（大腸経・絡穴）",
      "合谷（大腸経・原穴） ── 通里（心経・絡穴）",
      "太白（脾経・原穴） ── 光明（胆経・絡穴）",
      "太衝（肝経・原穴） ── 支正（小腸経・絡穴）"
    ],
    correctIndex: 0,
    explanation: "原絡配穴法（主客配穴法）は、病経の原穴（主）と、その表裏経の絡穴（客）を組み合わせる治療法です。\n肺経（表裏は大腸経）の原穴は「太淵」、大腸経の絡穴は「偏歴」であり、正しい表裏組合せです。大腸経の表裏は肺経（列欠）、脾経の表裏は胃経（豊隆）、肝経の表裏は胆経（光明）です。",
    relatedLectureId: "lecture-keiraku-4",
    relatedLectureTitle: "要穴論 レッスン2：原穴・絡穴の原絡配穴（主客配穴）",
    keyPoints: ["原絡配穴：病経の「原穴」＋ 表裏経の「絡穴」をペアリング"]
  }
];
