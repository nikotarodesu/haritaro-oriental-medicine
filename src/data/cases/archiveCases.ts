import { AUTONOMIC_SLEEP_CASES } from "./autonomicSleepCases";
import { HIP_GLUTEAL_CASES } from "./hipGlutealCases";
import { KNEE_CLINICAL_CASES } from "./kneeCases";

export interface ArchiveClinicalCase {
  id: string;
  title: string;
  location: string;
  category: string;
  patient: {
    gender: "男性" | "女性" | "不明";
    ageGroup: string;
  };
  duration: string;
  frequency?: string;
  visits: number | string;
  symptoms: string;
  treatmentAndCourse: string;
  usedAcupoints: string[];
  summary: string;
  tags: string[];
}

// 原資料の症例アーカイブ。出典・公開同意・結果の記録は未確認。
// 公開画面・検索は PUBLIC_ARCHIVE_CASES を使用する。
export const ALL_ARCHIVE_CASES: ArchiveClinicalCase[] = [
  ...AUTONOMIC_SLEEP_CASES,
  ...HIP_GLUTEAL_CASES,
  ...KNEE_CLINICAL_CASES,
];

export const ARCHIVE_CASES_NOTICE = "症例アーカイブは、出典URL・公開同意・経過記録の確認が完了するまで掲載を保留しています。単一症例の改善経過だけでは施術の効果や安全性は確定できません。学習用の架空症例演習は引き続き利用できます。";

export const PUBLIC_ARCHIVE_CASES: ArchiveClinicalCase[] = [];
