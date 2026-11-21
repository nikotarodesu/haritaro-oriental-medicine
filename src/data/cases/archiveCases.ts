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

export const ARCHIVE_CASES_NOTICE = "ここで読める症例演習は架空の教材です。本人の話や観察した内容を読み、どの情報をもとに見立てを考えるか練習できます。";

export const PUBLIC_ARCHIVE_CASES: ArchiveClinicalCase[] = [];
