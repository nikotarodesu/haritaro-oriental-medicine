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

// 臨床で多用される代表的な「名配穴（重要ツボの黄金ペア・トリオ）」
export const CLASSIC_CLINICAL_PAIRS: Omit<ClinicalMemoItem, "createdAt" | "updatedAt">[] = [
  {
    id: "pair-taishou-yanglingquan",
    type: "pair",
    title: "太衝 ＋ 陽陵泉",
    subTitle: "疏肝解鬱・筋膜経筋調律",
    points: ["太衝 (LR3)", "陽陵泉 (GB34)"],
    elements: ["木"],
    indications: ["ストレス性側頭痛", "首肩背部こり", "眼精疲労", "自律神経失調", "イライラ・胸脇苦満"],
    summary: "肝（気・血）と胆（決断・筋膜）を同時に調える木行の表裏同治処方。デスクワークやストレス過多による側頭痛・筋緊張の特効配穴。",
    mechanism: "太衝（肝原穴）で鬱結した肝気を降気・疏通させ、陽陵泉（胆合穴・筋会）で全身の筋膜緊張と攣縮を弛緩。「気の滞り」と「筋肉のこわばり」を同時に解きほぐします。"
  },
  {
    id: "pair-gokoku-taishou",
    type: "pair",
    title: "合谷 ＋ 太衝（開四関）",
    subTitle: "全身気血開通・自律神経リセット",
    points: ["合谷 (LI4)", "太衝 (LR3)"],
    elements: ["金", "木"],
    indications: ["激しい頭痛", "頑固な不定愁訴", "気滞血瘀", "不眠・不安", "顔面部疾患"],
    summary: "手の合谷（陽明・気）と足の太衝（厥陰・血）を同時に刺す東洋医学随一の開通処方。『四関を開けば百病通ず』と称されます。",
    mechanism: "陰陽・上下・気血の交差配穴。合谷が上行する熱を鎮め顔面を開通させ、太衝が逆上した気を下引。自律神経の極度な興奮や滞流をリセットします。"
  },
  {
    id: "pair-ashisanri-chukan-tensu",
    type: "pair",
    title: "足三里 ＋ 中脘 ＋ 天枢",
    subTitle: "健脾補気・後天之本運化処方",
    points: ["足三里 (ST36)", "中脘 (CV12)", "天枢 (ST25)"],
    elements: ["土"],
    indications: ["慢性胃もたれ", "食欲不振", "下痢・便秘", "逆流性食道炎", "慢性疲労・気虚"],
    summary: "脾胃（消化吸収の中枢）を底上げし、飲食物から『後天の気』を生成する基礎処方。胃下垂や胃腸虚弱の根本治療に必須。",
    mechanism: "中脘（胃募穴・腑会）で中焦の気機を整え、足三里（胃合穴）で降濁を促し、天枢（大腸募穴）で腸管の昇降を調和させます。"
  },
  {
    id: "pair-sanyinkou-kangen",
    type: "pair",
    title: "三陰交 ＋ 関元",
    subTitle: "調経益気・下焦温補処方",
    points: ["三陰交 (SP6)", "関元 (CV4)"],
    elements: ["土", "水"],
    indications: ["生理痛・月経不順", "下半身の冷え・むくみ", "更年期障害", "妊活・婦人科疾患", "気血不足"],
    summary: "下腹部の丹田（元気の源）を温補し、肝・脾・腎の三陰経をまとめて調整する女性医学の至宝配穴。",
    mechanism: "関元（丹田・小腸募穴）が元気の根源を補強し、三陰交が血を養い瘀血を排泄。骨盤内の血行不全と冷えを根底から解消します。"
  },
  {
    id: "pair-naikan-kouson",
    type: "pair",
    title: "内関 ＋ 公孫",
    subTitle: "八脈交会穴・心胸胃気機調律",
    points: ["内関 (PC6)", "公孫 (SP4)"],
    elements: ["火", "土"],
    indications: ["吐き気・つわり", "胃痛・胸焼け", "動悸・パニック感", "乗り物酔い", "胸腹部膨満感"],
    summary: "陰維脈（内関）と衝脈（公孫）を通じる八脈交会配穴。『心・胸・胃』の逆流や自律神経発作を鎮める即効処方。",
    mechanism: "迷走神経反射を強力に抑制。上逆する胃気を引き下ろすと同時に、心包経の働きにより心拍と精神緊張を平穏に導きます。"
  },
  {
    id: "pair-shinmon-taikei",
    type: "pair",
    title: "神門 ＋ 太谿",
    subTitle: "滋陰降火・心腎相交処方",
    points: ["神門 (HT7)", "太谿 (KI3)"],
    elements: ["火", "水"],
    indications: ["不眠（中途覚醒）", "焦燥感・不安", "寝汗・ほてり", "動悸", "神経衰弱"],
    summary: "上で過熱した心火（精神の昂ぶり）を冷まし、下で消耗した腎水（潤い・精）を補う『水火既済（心腎相交）』の名処方。",
    mechanism: "神門（心原穴）で心神を安寧にし、太谿（腎原穴）で腎陰を補充。陰虚火旺による脳の興奮状態を根本から沈静化させます。"
  },
  {
    id: "pair-fuuchi-hyakue-taishou",
    type: "pair",
    title: "風池 ＋ 百会 ＋ 太衝",
    subTitle: "平肝熄風・清頭降気処方",
    points: ["風池 (GB20)", "百会 (GV20)", "太衝 (LR3)"],
    elements: ["木", "火"],
    indications: ["拍動性片頭痛", "高血圧傾向", "めまい・耳鳴り", "のぼせ・目の充血", "怒りによる血圧急上昇"],
    summary: "頭部に吹き荒れる『内風（過剰な興奮・血圧上昇）』を沈静化し、頭部鬱血を足元へ引き下ろす降圧・清頭処方。",
    mechanism: "太衝で肝火を下に引き下げ、風池で後頭動脈・椎骨動脈周囲の筋緊張を解放、百会で過剰な陽気を頭頂から散らします。"
  },
  {
    id: "pair-rekketu-shoukai",
    type: "pair",
    title: "列缺 ＋ 照海",
    subTitle: "八脈交会穴・通宣宣肺・利咽止咳",
    points: ["列缺 (LU7)", "照海 (KI6)"],
    elements: ["金", "水"],
    indications: ["慢性の咳・痰", "のどの痛み・乾燥感", "声がれ", "胸の息苦しさ", "梅核気（喉の異物感）"],
    summary: "任脈（列缺）と陰蹻脈（照海）に通じる八脈交会配穴。咽喉・胸部・肺の呼吸器バリアを潤し、気道を開通させます。",
    mechanism: "金生水（肺と腎の相生関係）を活性化。肺の乾燥と宣発不全を潤し、喉の炎症と咳中枢の過敏を鎮静化させます。"
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
  selectedPoints: string[]; // 採用配穴・ツボ（例: ["太衝", "陽陵泉", "神門"]）
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
    treatmentPlan: "中脘・足三里に補法。関元に温筒灸3壮施灸。",
    patientReaction: "お腹が鳴り始め、全身がじんわり温まる感覚。呼吸が深くなったと発言。",
    nextAction: "冷飲食の禁止（常温または白湯推奨）。次回10日後。",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  }
];

