// 臨床メモ・マイカルテの型定義および名配穴プリセット

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
