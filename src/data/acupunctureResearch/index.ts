import { BACK_PAIN_RESEARCH } from "./backPain";
import { AROMATASE_INHIBITOR_JOINT_PAIN_RESEARCH } from "./aromataseInhibitorJointPain";
import { ANTICOAGULANTS_AND_BLEEDING_RESEARCH } from "./anticoagulantsAndBleeding";
import { KNEE_OSTEOARTHRITIS_RESEARCH } from "./kneeOsteoarthritis";
import { MIGRAINE_RESEARCH } from "./migraine";
import { MOXIBUSTION_KNEE_PAIN_RESEARCH } from "./moxibustionKneePain";
import { PATTERN_AGREEMENT_RESEARCH } from "./patternAgreement";
import { POSTOPERATIVE_NAUSEA_RESEARCH } from "./postoperativeNausea";
import { RADIATION_DRY_MOUTH_RESEARCH } from "./radiationDryMouth";
import { SAFETY_RESEARCH } from "./safety";
import { URINARY_INCONTINENCE_RESEARCH } from "./urinaryIncontinence";
import type { AcupunctureResearchArticle } from "./types";

export const ACUPUNCTURE_RESEARCH_TOPICS = [
  {
    id: "research-pain",
    title: "痛み・頭痛",
    entries: [
      { article: BACK_PAIN_RESEARCH, summary: "腰や脚の痛みの点数と、日常動作の変化を調べた試験。" },
      { article: KNEE_OSTEOARTHRITIS_RESEARCH, summary: "膝の痛み・動作を測った試験と、英国・シンガポールの指針。" },
      { article: MOXIBUSTION_KNEE_PAIN_RESEARCH, summary: "膝の痛みの変化と、やけどを数えた方法。" },
      { article: MIGRAINE_RESEARCH, summary: "片頭痛があった日数と発作の回数を、比較相手ごとに確認。" },
    ],
  },
  {
    id: "research-treatment",
    title: "手術・がん治療に伴う症状",
    entries: [
      { article: POSTOPERATIVE_NAUSEA_RESEARCH, summary: "内関を刺激した群と比較群で、術後の吐き気や嘔吐を調べた試験。" },
      { article: AROMATASE_INHIBITOR_JOINT_PAIN_RESEARCH, summary: "乳がん治療薬の使用中に起きた関節痛を、6週と52週で評価。" },
      { article: RADIATION_DRY_MOUTH_RESEARCH, summary: "放射線治療中の予防と、治療後に残る口の乾きを調べた試験。" },
    ],
  },
  {
    id: "research-urinary-symptoms",
    title: "尿もれ",
    entries: [
      { article: URINARY_INCONTINENCE_RESEARCH, summary: "漏れた量、日誌に記録した回数、使ったパッドの枚数を比較。" },
    ],
  },
  {
    id: "research-safety",
    title: "施術の安全性",
    entries: [
      { article: SAFETY_RESEARCH, summary: "施術の回数で割る調査と、受けた人の数で割る調査を比較。" },
      { article: ANTICOAGULANTS_AND_BLEEDING_RESEARCH, summary: "抗凝固薬を使う人の出血を、保険記録と病院での観察から確認。" },
    ],
  },
  {
    id: "research-patterns",
    title: "東洋医学の見立て",
    entries: [
      { article: PATTERN_AGREEMENT_RESEARCH, summary: "同じ人を診た評価者の見立てが、どこまで一致したか。" },
    ],
  },
] as const;

export const ACUPUNCTURE_RESEARCH_ARTICLES: readonly AcupunctureResearchArticle[] = ACUPUNCTURE_RESEARCH_TOPICS.flatMap(topic =>
  topic.entries.map(({ article }) => article),
);
