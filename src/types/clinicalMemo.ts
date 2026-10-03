// マイノート（配穴ストック・患者臨床ノート）の型定義および名配穴プリセット

export type ClinicalMemoType = "pair" | "tsubo" | "diagnosis" | "custom";

export interface ClinicalMemoItem {
  id: string;
  type: ClinicalMemoType;
  title: string;
  subTitle?: string;
  points: string[];
  elements: ("木" | "火" | "土" | "金" | "水")[];
  indications: string[];
  summary: string;
  mechanism?: string;
  caution?: string;
  personalNotes?: string;
  createdAt: number;
  updatedAt: number;
}

// 伝統的な配穴意図を比較する学習プリセット。配穴単独の臨床効果を保証しない。
export const CLASSIC_CLINICAL_PAIRS: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">[] = [
  {
    id: "pair-taishou-yanglingquan",
    type: "pair",
    title: "太衝 ＋ 陽陵泉",
    subTitle: "疏肝解鬱・筋会の組み合わせ",
    points: ["太衝 (LR3)", "陽陵泉 (GB34)"],
    elements: ["木"],
    indications: ["ストレス性側頭痛", "首肩背部こり", "眼精疲労", "自律神経失調", "イライラ・胸脇苦満"],
    summary: "伝統的な肝・胆の表裏関係と、太衝の原穴・陽陵泉の筋会という分類を組み合わせて学ぶ配穴例です。頭痛や筋緊張への特効を示すものではありません。",
    mechanism: "伝統理論では太衝を疏肝、陽陵泉を筋に関連づけて説明します。肝・胆の伝統概念は、現代解剖学の臓器や筋膜の働きと同一ではありません。"
  },
  {
    id: "pair-gokoku-taishou",
    type: "pair",
    title: "合谷 ＋ 太衝（開四関）",
    subTitle: "開四関・気血の伝統的な配穴意図",
    points: ["合谷 (LI4)", "太衝 (LR3)"],
    elements: ["金", "木"],
    indications: ["激しい頭痛", "頑固な不定愁訴", "気滞血瘀", "不眠・不安", "顔面部疾患"],
    summary: "左右の合谷と太衝を組み合わせる『四関』の学習例。気血の巡りを扱う伝統的な配穴意図として理解し、あらゆる病気に有効という意味には用いません。",
    mechanism: "手と足、陽経と陰経の組み合わせを伝統理論で整理します。気滞や血瘀の分類だけで自律神経の状態は判定できず、神経機能をリセットする効果も断定できません。"
  },
  {
    id: "pair-ashisanri-chukan-tensu",
    type: "pair",
    title: "足三里 ＋ 中脘 ＋ 天枢",
    subTitle: "健脾補気・後天之本運化処方",
    points: ["足三里 (ST36)", "中脘 (CV12)", "天枢 (ST25)"],
    elements: ["土"],
    indications: ["慢性胃もたれ", "食欲不振", "下痢・便秘", "逆流性食道炎", "慢性疲労・気虚"],
    summary: "飲食と脾胃の『運化』を関連づける伝統的な配穴例。腹部の募穴と下肢の合穴の分類を学びます。胃腸疾患の根本治療や必須の処方を意味しません。",
    mechanism: "中脘（胃募穴・腑会）、足三里（胃合穴）、天枢（大腸募穴）を伝統的な中焦・脾胃の考え方で整理します。これは消化吸収機能の改善を実証した説明ではありません。"
  },
  {
    id: "pair-sanyinkou-kangen",
    type: "pair",
    title: "三陰交 ＋ 関元",
    subTitle: "調経益気・下焦温補処方",
    points: ["三陰交 (SP6)", "関元 (CV4)"],
    elements: ["土", "水"],
    indications: ["生理痛・月経不順", "下半身の冷え・むくみ", "更年期障害", "妊活・婦人科疾患", "気血不足"],
    summary: "三陰交の三陰経の交会と、関元の下焦・元気に関する伝統的な配穴意図を比較する例。月経症状や不妊への効果は、この組み合わせだけでは判断できません。",
    mechanism: "伝統的な『調経』『温補』は配穴意図を表す語です。骨盤内の血流を改善する機序や妊娠率の向上を、この説明から導くことはできません。",
    caution: "妊娠中・妊娠の可能性がある場合は産科の担当者へ相談してください。異常な出血や強い腹痛では医療機関での評価を優先します。"
  },
  {
    id: "pair-naikan-kouson",
    type: "pair",
    title: "内関 ＋ 公孫",
    subTitle: "八脈交会穴・心胸胃気機調律",
    points: ["内関 (PC6)", "公孫 (SP4)"],
    elements: ["火", "土"],
    indications: ["吐き気・つわり", "胃痛・胸焼け", "動悸・パニック感", "乗り物酔い", "胸腹部膨満感"],
    summary: "内関（陰維脈）と公孫（衝脈）を組み合わせる八脈交会穴の学習例。古典の『心・胸・胃』との関連と、現代医学の疾患や治療効果は区別します。",
    mechanism: "伝統的には胃気の上逆などと関連づけます。内関への刺激を調べた研究結果を、この二穴の相乗効果や迷走神経反射の抑制の証明として扱うことはできません。",
    caution: "急な強い胸痛や呼吸困難は救急要請を優先してください。"
  },
  {
    id: "pair-shinmon-taikei",
    type: "pair",
    title: "神門 ＋ 太谿",
    subTitle: "滋陰降火・心腎相交処方",
    points: ["神門 (HT7)", "太谿 (KI3)"],
    elements: ["火", "水"],
    indications: ["不眠（中途覚醒）", "焦燥感・不安", "寝汗・ほてり", "動悸", "神経衰弱"],
    summary: "心・腎の関係を『水火既済』『心腎相交』で説明する伝統的な配穴例です。不眠や不安の原因をこの分類だけで診断することはできません。",
    mechanism: "神門（心原穴）と太谿（腎原穴）を心神・腎陰に関連づけて学びます。伝統的な心火・腎水は、脳の興奮や腎臓の機能を直接測る指標ではありません。"
  },
  {
    id: "pair-fuuchi-hyakue-taishou",
    type: "pair",
    title: "風池 ＋ 百会 ＋ 太衝",
    subTitle: "平肝熄風・清頭降気処方",
    points: ["風池 (GB20)", "百会 (GV20)", "太衝 (LR3)"],
    elements: ["木", "火"],
    indications: ["拍動性片頭痛", "高血圧傾向", "めまい・耳鳴り", "のぼせ・目の充血", "怒りによる血圧急上昇"],
    summary: "頭部の症状を『肝陽』『内風』などに関連づける伝統的な配穴例。内風は血圧上昇と同義ではなく、この配穴による降圧を保証しません。",
    mechanism: "風池・百会・太衝を伝統的な『清頭』『平肝』の意図で整理します。頭部の血液を足へ移動させるという生理学的な機序の説明ではありません。",
    caution: "突然の激しい頭痛、片側の脱力、話しにくさがある場合は救急要請を優先してください。"
  },
  {
    id: "pair-rekketu-shoukai",
    type: "pair",
    title: "列缺 ＋ 照海",
    subTitle: "八脈交会穴・通宣宣肺・利咽止咳",
    points: ["列缺 (LU7)", "照海 (KI6)"],
    elements: ["金", "水"],
    indications: ["慢性の咳・痰", "のどの痛み・乾燥感", "声がれ", "胸の息苦しさ", "梅核気（喉の異物感）"],
    summary: "列缺（任脈）と照海（陰蹻脈）を組み合わせる八脈交会穴の学習例。咽喉・胸部との伝統的な関連を扱います。気道を開く効果を実証した説明ではありません。",
    mechanism: "肺・腎の関係や『宣肺』『利咽』などの伝統的な配穴意図を比較します。呼吸器のバリア機能や咳中枢への作用をこの分類から断定できません。",
    caution: "息苦しさが急に生じたり悪化したりした場合は、配穴を試すより医療機関での評価を優先してください。"
  }
];

// 臨床ノート（患者症例・臨床記録メモ）の型定義
export interface PatientNoteItem {
  id: string;               // 一意のID (例: "pn_1711345678")
  patientIdentifier: string;// 患者識別（カルテNo.やイニシャル 例: "PT-042", "K.S様" ※個人情報保護のため氏名は非保持）
  gender?: "男性" | "女性" | "その他" | "未回答";
  ageGroup?: string;        // 年代（例: "30代", "50代"）
  visitDate: string;        // 来院日・記録日 (YYYY-MM-DD)
  chiefComplaint: string;   // 主訴・お悩み（例: "慢性の後頭部痛と不眠、眼精疲労"）
  constitution?: string;    // 気血水・体質見立て（気虚、気滞、血虚、瘀血、水滞、陽虚など）
  syndrome?: string;        // 弁証・病態仮説（例: "肝気鬱結・心腎不交"）
  selectedPoints: string[]; // 採用配穴・ツボ（施術用 例: ["太衝", "陽陵泉", "神門"]）
  selfCarePoints?: string[];// 患者セルフケア用ツボ（養生シート用・任意 最大3穴 例: ["太衝", "三陰交"]）
  treatmentPlan?: string;   // 施術方針・手技メモ（刺鍼法、置針時間、施灸壮数など）
  patientReaction?: string; // 施術直後の反応・変化（例: "首の回旋可動域改善、頭の重さが半減"）
  nextAction?: string;      // 次回への申し送り・養生セルフケア指導メモ（例: "就寝前の足湯指導、次回7日後"）
  createdAt: number;
  updatedAt: number;
}

// 初回利用時のサンプル臨床ノート
export const SAMPLE_PATIENT_NOTES: PatientNoteItem[] = [
  {
    id: "pn_sample_01",
    patientIdentifier: "PT-012 (K.T様)",
    gender: "女性",
    ageGroup: "30代",
    visitDate: "2026-03-24",
    chiefComplaint: "デスクワークによる激しい後頭部〜側頭部の頭痛。夕方になると目の奥が重く開きにくい。眠りが浅い。",
    constitution: "気滞・肝鬱化火",
    syndrome: "肝陽上亢・肝胆経気機不暢",
    selectedPoints: ["太衝", "陽陵泉", "風池", "百会"],
    selfCarePoints: ["太衝", "百会"],
    treatmentPlan: "太衝・風池に瀉法（置針15分）。陽陵泉に筋膜刺激。百会に軽微な雀啄。",
    patientReaction: "施術直後より頭部の熱感と締め付け感が消失。目の開けやすさを自覚。",
    nextAction: "就寝前のスマホ制限とホットアイマスク指導。次回は1週間後に経過確認。",
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "pn_sample_02",
    patientIdentifier: "PT-018 (M.S様)",
    gender: "男性",
    ageGroup: "40代",
    visitDate: "2026-03-25",
    chiefComplaint: "食後の胃もたれ・心窩部痞塞感。慢性疲労が抜けず、朝起きられない。軟便傾向。",
    constitution: "気虚・脾胃虚弱",
    syndrome: "脾失健運・中気下陥",
    selectedPoints: ["足三里", "中脘", "天枢"],
    selfCarePoints: ["足三里"],
    treatmentPlan: "中脘・足三里に補法。関元に温筒灸3壮施灸。",
    patientReaction: "お腹が鳴り始め、全身がじんわり温まる感覚。呼吸が深くなったと発言。",
    nextAction: "冷飲食の禁止（常温または白湯推奨）。次回10日後。",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  }
];

