import { SYMPTOMS } from "@/data/symptomData";
import { SymptomGuide } from "@/types/oriental";
import { CASE_SIMULATOR_PRESETS, CaseSimulatorPreset } from "@/data/cases/caseSimulatorMapping";

// ツボコード（codeLower）と SYMPTOMS の recommendedTsuboIds とのマッピング
const TSUBOD_ID_TO_CODE: Record<string, string> = {
  gokoku: "li4",
  hyakue: "gv20",
  taishou: "lr3",
  naikan: "pc6",
  yusen: "ki1",
  ashisanri: "st36",
  chukan: "cv12",
  sanyinkou: "sp6",
  jinyu: "bl23",
};

// 逆引きマッピング（codeLower -> recommendedTsuboId）
const CODE_TO_TSUBO_ID: Record<string, string> = Object.entries(TSUBOD_ID_TO_CODE).reduce(
  (acc, [id, code]) => {
    acc[code] = id;
    return acc;
  },
  {} as Record<string, string>
);

export interface RelatedCaseItem {
  id: string;
  title: string;
  pattern: string;
  explanation: string;
}

/**
 * 経穴に対応する症状ガイドを取得（特効穴マッチ ＋ 経脈・主治マッチ）
 */
export function getSymptomsForAcupoint(codeLower: string, tsuboName?: string): SymptomGuide[] {
  const matchedSymptoms: SymptomGuide[] = [];
  const targetId = CODE_TO_TSUBO_ID[codeLower];

  for (const symptom of SYMPTOMS) {
    // 1. 推奨ツボIDに直接合致する場合（特効穴）
    if (targetId && symptom.recommendedTsuboIds.includes(targetId)) {
      matchedSymptoms.push(symptom);
      continue;
    }

    // 2. 代表的な主要経穴の別名・補足マッチ
    if (
      (codeLower === "lu7" && symptom.id === "headache-stiff-neck") || // 列缺
      (codeLower === "gb20" && symptom.id === "headache-stiff-neck") || // 風池
      (codeLower === "ht7" && symptom.id === "stress-insomnia") || // 神門
      (codeLower === "sp9" && (symptom.id === "stomach-fatigue" || symptom.id === "menstrual-pain-chill")) || // 陰陵泉
      (codeLower === "cv4" && (symptom.id === "menstrual-pain-chill" || symptom.id === "chronic-fatigue-lethargy")) // 関元
    ) {
      matchedSymptoms.push(symptom);
    }
  }

  return matchedSymptoms;
}

/**
 * 経穴に対応する代表的な臨床症例を取得
 */
export function getCasesForAcupoint(codeLower: string): RelatedCaseItem[] {
  const results: RelatedCaseItem[] = [];

  // 代表的な症例連動マッピング
  const tsuboCaseMap: Record<string, string[]> = {
    // 太衝・行間・風池など（肝系・頭痛・ストレス）
    lr3: ["case-01-headache-liver-fire", "case-03-dysmenorrhea-cold-stasis"],
    lr2: ["case-01-headache-liver-fire"],
    gb20: ["case-01-headache-liver-fire"],
    li4: ["case-01-headache-liver-fire"],

    // 足三里・中脘・脾兪（脾胃・疲労・食欲不振）
    st36: ["case-02-fatigue-spleen-deficiency"],
    cv12: ["case-02-fatigue-spleen-deficiency"],
    bl20: ["case-02-fatigue-spleen-deficiency"],
    sp6: ["case-02-fatigue-spleen-deficiency", "case-03-dysmenorrhea-cold-stasis"],

    // 三陰交・血海・関元（婦人科・冷え・瘀血）
    sp10: ["case-03-dysmenorrhea-cold-stasis"],
    cv4: ["case-03-dysmenorrhea-cold-stasis"],
    cv6: ["case-03-dysmenorrhea-cold-stasis"],

    // 委中・腎兪・大腸兪（腰痛・寒湿・下肢痛）
    bl40: ["case-04-acute-lowback-pain-cold-dampness"],
    bl23: ["case-04-acute-lowback-pain-cold-dampness"],
    bl25: ["case-04-acute-lowback-pain-cold-dampness"],
  };

  const caseIds = tsuboCaseMap[codeLower] || [];

  for (const cid of caseIds) {
    const preset = CASE_SIMULATOR_PRESETS[cid];
    if (preset) {
      results.push({
        id: preset.caseId,
        title: preset.caseTitle,
        pattern: preset.pattern,
        explanation: preset.explanation,
      });
    }
  }

  return results;
}
