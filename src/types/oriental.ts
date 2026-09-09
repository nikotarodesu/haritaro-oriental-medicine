export interface Tsubo {
  id: string;
  name: string;
  kana: string;
  romaji: string;
  code: string; // 例: LI4, ST36
  meridian: string; // 経絡名（例: 手の陽明大腸経）
  meridianShort: string; // 大腸経
  bodyPart: "頭部・顔面" | "首・肩" | "背中・腰" | "手・腕" | "足・脚" | "胸・腹";
  locationSimple: string; // 一般向けのわかりやすい場所
  locationDetail: string; // 専門家向けの解剖学的・骨度法取穴法
  indications: string[]; // 主治・効能
  category?: string[]; // 要穴（原穴、合穴、四総穴など）
  clinicalNote: string; // はり太郎の臨床知見・ワンポイント
  caution?: string; // 禁忌・注意（妊婦禁忌など）
}

export interface SymptomGuide {
  id: string;
  title: string;
  category: "頭・首・肩" | "メンタル・睡眠" | "消化器・お腹" | "女性特有" | "全身・疲労" | "冷え・むくみ";
  summary: string;
  orientalMechanism: string; // 東洋医学的なメカニズム（気血水の乱れなど）
  recommendedTsuboIds: string[]; // 関連するツボID
  lifestyleAdvice: {
    diet: string; // 食養生
    habit: string; // 生活習慣・ストレッチ
  };
}

export interface DiagnosisQuestion {
  id: number;
  text: string;
  type: "qi_deficiency" | "qi_stagnation" | "blood_deficiency" | "blood_stasis" | "water_retention" | "yang_deficiency";
}

export interface DiagnosisResultType {
  type: string;
  name: string;
  reading: string;
  summary: string;
  symptoms: string[];
  cause: string;
  advice: {
    food: string[];
    lifestyle: string;
    tsubo: string[];
  };
}

export interface Article {
  id: string;
  title: string;
  category: "一般向けセルフケア" | "臨床・実践知見" | "経穴・経絡学" | "論文・文献抄読" | "古典深読み";
  publishedAt: string;
  readTime: string;
  summary: string;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  contentMarkdown: string;
}
