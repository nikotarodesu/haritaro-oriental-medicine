/**
 * 臨床症例演習モードの型定義
 */

export type CaseDifficulty = "初級" | "中級" | "上級";

export type CaseCategory =
  | "自律神経・メンタル"
  | "消化器・脾胃"
  | "婦人科・女性医学"
  | "疼痛・運動器"
  | "呼吸器・感染後"
  | "皮膚・感覚器";

export interface CasePatientProfile {
  age: string;
  gender: "男性" | "女性";
  occupation: string;
  chiefComplaint: string; // 主訴
  historyOfPresentIllness: string; // 現病歴
  pastHistory: string[]; // 既往歴
  lifestyle: string; // 生活背景（睡眠・食事・ストレス・運動）
}

export interface CaseFourExaminations {
  inspection: string; // 望診（顔色・体型・姿勢）
  tongueDiagnosis: {
    body: string; // 舌質（淡紅、紅、淡白、紫など）
    coating: string; // 舌苔（薄白、黄膩、白滑、無苔など）
    shape: string; // 舌形（胖大、歯痕、点刺、裂紋など）
    sublingualVeins?: string; // 舌下静脈（怒張、正常など）
  };
  auscultationAndOlfaction: string; // 聞診（声のトーン、呼吸音、口臭・体臭）
  inquiry: {
    question: string;
    answer: string;
  }[]; // 問診の詳細Q&A
  palpation: {
    pulse: string; // 脈診（弦脈、細脈、滑脈、沈遅など）
    pulseDetail?: string; // 脈の臨床的意義
    abdomen: string; // 腹診（心下痞鞭、胸脇苦満、小腹急結、腹皮拘急など）
    acupointReaction?: string; // 経穴圧痛・虚実反応
  };
}

export interface CaseReasoningStep {
  stepNumber: number;
  stepTitle: string;
  question: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface ClinicalCase {
  id: string;
  caseNumber: number;
  title: string;
  subTitle: string;
  difficulty: CaseDifficulty;
  category: CaseCategory;
  isFreeTrial: boolean; // 無料体験可能かどうか（3例がtrue、17例がfalse）
  patient: CasePatientProfile;
  examinations: CaseFourExaminations;
  reasoningSteps: CaseReasoningStep[];
  correctDiagnosis: {
    hachiko: string; // 八綱弁証（例: 裏・熱・実）
    pattern: string; // 確定証名（例: 肝火上炎証）
    treatmentPrinciple: string; // 治法（例: 清肝瀉火・平肝熄風）
    primaryPoints: string[]; // 主穴（例: 行間、太衝、風池）
    secondaryPoints: string[]; // 配穴・佐使穴（例: 侠渓、太谿）
    formulaEquivalent?: string; // 参考漢方方剤（例: 竜胆瀉肝湯）
  };
  clinicalExplanation: {
    pathomechanism: string; // 病態機序の詳細解説
    differentialDiagnosis: string; // 鑑別診断（間違えやすい他証との対比）
    pointRationale: string; // なぜこの経穴なのか（作用機序）
    clinicalPitfall: string; // 臨床の落とし穴・注意点・禁忌
    classicCitation?: string; // 根拠となる古典条文（素問、霊枢、難経等）
  };
}
