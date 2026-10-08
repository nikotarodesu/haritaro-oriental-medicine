/**
 * はり師・きゅう師 国家試験 対策問題アーカイブ（4択）
 * 東洋医学概論・経絡経穴概論・東洋医学臨床論の頻出・最重要問題セレクション
 * ※公式過去問とオリジナル予想精選問題を明確に区分して収録
 */

export interface KokushiPastExamQuestion {
  id: string;
  examNumber?: number; // 例: 33 (第33回) ※公式過去問の場合のみ付与
  subject: "東洋医学概論" | "経絡経穴概論" | "東洋医学臨床論";
  year?: number; // 2025など
  questionType: "official_past_exam" | "modified_past_exam" | "original_practice";
  questionNumber: string; // 表示用見出し（例: "精選演習 第1問" または "午後 問71"）
  category: "陰陽五行" | "蔵象・気血津液" | "病因・病証" | "経絡経穴" | "配穴・臨床" | "四診・診断";
  question: string;
  options: [string, string, string, string]; // 国試標準の4択
  correctIndex: number; // 0-indexed (0=1, 1=2, 2=3, 3=4)
  explanation: string;
  relatedLectureId?: string; // 関連するカリキュラム講義ID（実在するID）
  relatedLectureTitle?: string;
  keyPoints: string[]; // 要点・暗記ポイント
}

export const KOKUSHI_PAST_EXAMS: KokushiPastExamQuestion[] = [
  {
    "id": "kokushi-33-toyo-71",
    "subject": "東洋医学概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 陰陽五行編",
    "category": "陰陽五行",
    "question": "五行色体で「相生関係」にある組合せはどれか。",
    "options": [
      "酸 ── 苦",
      "甘 ── 酸",
      "鹹 ── 苦",
      "辛 ── 酸"
    ],
    "correctIndex": 0,
    "explanation": "相生は木→火→土→金→水→木の順です。五味は木＝酸、火＝苦、土＝甘、金＝辛、水＝鹹。「酸→苦」は木生火です。「甘→酸」は土→木、「鹹→苦」は水→火、「辛→酸」は金→木で、相生の順にはなりません。",
    "relatedLectureId": "lecture-wuxing-1",
    "relatedLectureTitle": "五行論 レッスン1：五行論とは何か",
    "keyPoints": [
      "木（酸）➔ 火（苦）➔ 土（甘）➔ 金（辛）➔ 水（鹹）の順序を徹底暗記"
    ]
  },
  {
    "id": "kokushi-33-toyo-73",
    "subject": "東洋医学概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 気血津液編",
    "category": "蔵象・気血津液",
    "question": "宗気の生成と分布について最も適切な記述はどれか。",
    "options": [
      "先天の精を源とし、元気の別名である",
      "水穀の精気と清気（自然界の空気）が合わさり、胸中に集まる",
      "腎の精気から生まれ、三焦を通って全身の経脈外を巡る",
      "脾胃で生成され、脈中に入って全身を滋養する"
    ],
    "correctIndex": 1,
    "explanation": "宗気は清気と水穀の精気が合わさり胸中に集まるとされ、呼吸や血脈の運行に関わる伝統的な概念です。「腎の精気から生まれ、経脈外を巡る」は原気と衛気の説明を混ぜた誤りです。脈中を巡って滋養するのは営気、先天の精を源とするのは原気です。現代医学の物質・器官と同一視しません。",
    "relatedLectureId": "lecture-qiblood-1",
    "relatedLectureTitle": "気血水理論 レッスン1：気血水の全体像と「気」の伝統的分類",
    "keyPoints": [
      "宗気＝清気＋水穀の精気（胸中膻中に集まり、呼吸と拍動を司る）"
    ]
  },
  {
    "id": "kokushi-33-keiketsu-82",
    "subject": "経絡経穴概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 骨度寸法編",
    "category": "経絡経穴",
    "question": "骨度法において「8寸」と定められている部位はどれか。",
    "options": [
      "臍中央から恥骨結合上縁まで",
      "腋窩横紋前端から肘窩横紋まで",
      "両乳頭の間",
      "前髪際から後髪際まで"
    ],
    "correctIndex": 2,
    "explanation": "両乳頭間は8寸です。前髪際から後髪際までは12寸、臍中央から恥骨結合上縁までは5寸、腋窩横紋前端から肘窩横紋までは9寸です。胸剣結合部から臍中央までも8寸ですが、この設問の選択肢には含めていません。骨度分寸は身体の区間を比例配分する位置決めの基準で、刺鍼深度の一律の基準ではありません。",
    "relatedLectureId": "lecture-treatment-8",
    "relatedLectureTitle": "治療原則 レッスン8：経絡・経穴を選択する",
    "keyPoints": [
      "両乳間＝8寸、胸剣〜臍＝8寸、臍〜恥骨＝5寸、前頭〜後頭＝12寸"
    ]
  },
  {
    "id": "kokushi-32-toyo-68",
    "subject": "東洋医学概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 病因論編",
    "category": "病因・病証",
    "question": "『素問』宣明五気篇における「五労所傷」で、久坐が傷る部位はどれか。",
    "options": [
      "筋",
      "血",
      "骨",
      "肉"
    ],
    "correctIndex": 3,
    "explanation": "五労所傷（ごろうしょしょう）の対応関係は以下の通りです：『久視は血を傷り（心）、久臥は気を傷り（肺）、久坐は肉を傷り（脾）、久立は骨を傷り（腎）、久行は筋を傷る（肝）』。したがって久坐が傷るのは「肉（脾）」となります。",
    "relatedLectureId": "lecture-pathomechanism-8",
    "relatedLectureTitle": "病因病理 レッスン8：情志・飲食・労倦から病態を考える",
    "keyPoints": [
      "久視➔血(心)、久臥➔気(肺)、久坐➔肉(脾)、久立➔骨(腎)、久行➔筋(肝)"
    ]
  },
  {
    "id": "kokushi-32-keiketsu-88",
    "subject": "経絡経穴概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 要穴・八脈交会穴編",
    "category": "配穴・臨床",
    "question": "八脈交会穴の組合せで、「心・胸・胃の疾患」を主治とするペアはどれか。",
    "options": [
      "内関 ── 公孫",
      "後渓 ── 申脈",
      "列欠 ── 照海",
      "外関 ── 臨泣"
    ],
    "correctIndex": 0,
    "explanation": "八脈交会穴（奇経八脈の交会穴）の代表的ペアと主治：\n① 内関（陰維脈）＋ 公孫（衝脈）＝ 心・胸・胃\n② 後渓（督脈）＋ 申脈（陽蹻脈）＝ 目内眥・頸項・耳・肩・背\n③ 列欠（任脈）＋ 照海（陰蹻脈）＝ 咽喉・胸膈・肺\n④ 外関（陽維脈）＋ 足臨泣（帯脈）＝ 目外眥・耳後・頬・頸・肩",
    "relatedLectureId": "lecture-treatment-8",
    "relatedLectureTitle": "治療原則 レッスン8：経絡・経穴を選択する",
    "keyPoints": [
      "内関＋公孫＝心胸胃、後渓＋申脈＝目内眥頚項背、列欠＋照海＝胸膈咽喉、外関＋臨泣＝目外眥耳後"
    ]
  },
  {
    "id": "kokushi-32-toyo-74",
    "subject": "東洋医学概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 舌診鑑別編",
    "category": "四診・診断",
    "question": "舌診において「熱証」を示唆する所見の組合せとして最も適切なものはどれか。",
    "options": [
      "舌辺歯痕 ── 舌苔白膩",
      "舌質紅 ── 舌苔黄",
      "舌質淡白 ── 舌苔白滑",
      "舌質紫暗 ── 舌下静脈怒張"
    ],
    "correctIndex": 1,
    "explanation": "伝統的な舌診では、紅舌・黄苔は熱の所見として整理します。黄苔があるだけで実熱と虚熱を確定できず、陰虚では苔の減少や剥離なども検討します。淡白舌・白滑苔は寒・虚を、紫暗舌などは瘀血を、歯痕・膩苔などは脾の機能低下や湿を考える材料です。舌診だけで判断せず、問診・脈・他の所見と照合します。",
    "relatedLectureId": "lecture-diagnosis-5",
    "relatedLectureTitle": "診断論 レッスン5：望診・聞診で観察する",
    "keyPoints": [
      "紅舌・黄苔＝熱証、淡白舌・白苔＝寒虚証、紫暗舌＝瘀血、胖大・歯痕＝水湿"
    ]
  },
  {
    "id": "kokushi-31-toyo-70",
    "subject": "東洋医学概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 蔵象論編",
    "category": "蔵象・気血津液",
    "question": "肝の生理機能「疏泄（そせつ）」が失調した際に見られる典型的な病態はどれか。",
    "options": [
      "下痢、四肢倦怠、食欲不振、腹部膨満",
      "腰膝酸軟、難聴、耳鳴り、骨の脆弱化",
      "精神抑うつ、情緒不安定、胸脇部や季肋部の脹痛",
      "呼吸困難、息切れ、自汗、易疲労"
    ],
    "correctIndex": 2,
    "explanation": "肝の疏泄機能は、全身の気機の暢通（スムーズな循環）、感情・情志の安定、胆汁の分泌・消化促進を司ります。疏泄が失調すると「肝気鬱結」となり、イライラ・抑うつ・ため息、胸脇脹痛、経前緊張症などが現れます。呼吸・息切れ・自汗の組合せは肺気虚、下痢・食欲不振の組合せは脾気虚、腰膝酸軟などの組合せは腎虚を検討する所見です。",
    "relatedLectureId": "lecture-lifedynamics-6",
    "relatedLectureTitle": "生命動態 レッスン6：臓腑の表裏関係を理解する",
    "keyPoints": [
      "肝の疏泄失調 ➔ 気機鬱滞 ➔ 精神抑うつ・情緒不安定・胸脇脹痛"
    ]
  },
  {
    "id": "kokushi-31-keiketsu-91",
    "subject": "経絡経穴概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 五兪穴五行配当編",
    "category": "経絡経穴",
    "question": "五兪穴の五行配当で「足の陽明胃経の経火穴」はどれか。",
    "options": [
      "陥谷",
      "足三里",
      "内庭",
      "解渓"
    ],
    "correctIndex": 3,
    "explanation": "陽経の五兪穴の五行配当は「井金・滎水・兪木・経火・合土」です。足の陽明胃経（陽経）の五兪穴は：\n・井金穴：厲兌\n・滎水穴：内庭\n・兪木穴：陥谷\n・経火穴：解渓\n・合土穴：足三里\nしたがって経火穴は「解渓」となります。",
    "relatedLectureId": "lecture-treatment-8",
    "relatedLectureTitle": "治療原則 レッスン8：経絡・経穴を選択する",
    "keyPoints": [
      "陽経：井金・滎水・兪木・経火・合土（解渓＝胃経の経火穴）",
      "陰経：井木・滎火・兪土・経金・合水"
    ]
  },
  {
    "id": "kokushi-30-toyo-77",
    "subject": "東洋医学臨床論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 四総穴臨床応用編",
    "category": "配穴・臨床",
    "question": "四総穴（しそうけつ）の主治において「頭項部（首・後頭部）」の主治穴はどれか。",
    "options": [
      "列欠",
      "合谷",
      "委中",
      "足三里"
    ],
    "correctIndex": 0,
    "explanation": "明代の『四総穴歌』における基本配当：\n① 肚腹（腹部・胃腸）三里に留め（足三里）\n② 腰背は委中に求む（委中）\n③ 頭項は列欠に尋ね（列欠）\n④ 面目合谷に収む（合谷）\n頭項部を主治とするのは「列欠」です。",
    "relatedLectureId": "lecture-treatment-8",
    "relatedLectureTitle": "治療原則 レッスン8：経絡・経穴を選択する",
    "keyPoints": [
      "肚腹＝足三里、腰背＝委中、頭項＝列欠、面目＝合谷"
    ]
  },
  {
    "id": "kokushi-30-keiketsu-85",
    "subject": "経絡経穴概論",
    "questionType": "original_practice",
    "questionNumber": "精選演習 原穴・絡穴編",
    "category": "経絡経穴",
    "question": "原穴と絡穴の組合せで、表裏関係にある経脈の組合せとして正しいものはどれか。",
    "options": [
      "太衝（肝経・原穴） ── 支正（小腸経・絡穴）",
      "太淵（肺経・原穴） ── 偏歴（大腸経・絡穴）",
      "合谷（大腸経・原穴） ── 通里（心経・絡穴）",
      "太白（脾経・原穴） ── 光明（胆経・絡穴）"
    ],
    "correctIndex": 1,
    "explanation": "原絡配穴法（主客配穴法）は、病経の原穴（主）と、その表裏経の絡穴（客）を組み合わせる治療法です。\n肺経（表裏は大腸経）の原穴は「太淵」、大腸経の絡穴は「偏歴」であり、正しい表裏組合せです。大腸経の表裏は肺経（列欠）、脾経の表裏は胃経（豊隆）、肝経の表裏は胆経（光明）です。",
    "relatedLectureId": "lecture-treatment-8",
    "relatedLectureTitle": "治療原則 レッスン8：経絡・経穴を選択する",
    "keyPoints": [
      "原絡配穴：病経の「原穴」＋ 表裏経の「絡穴」をペアリング"
    ]
  }
];
