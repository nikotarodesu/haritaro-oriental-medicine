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

// 運動器・自律神経・局所実例アーカイブ（全32症例）
export const ALL_ARCHIVE_CASES: ArchiveClinicalCase[] = [
  ...AUTONOMIC_SLEEP_CASES,
  ...HIP_GLUTEAL_CASES,
  ...KNEE_CLINICAL_CASES,
];
