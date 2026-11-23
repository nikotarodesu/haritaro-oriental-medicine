import { BACK_PAIN_RESEARCH } from "./backPain";
import { POSTOPERATIVE_NAUSEA_RESEARCH } from "./postoperativeNausea";
import { SAFETY_RESEARCH } from "./safety";

export const ACUPUNCTURE_RESEARCH_ARTICLES = [
  BACK_PAIN_RESEARCH,
  POSTOPERATIVE_NAUSEA_RESEARCH,
  SAFETY_RESEARCH,
] as const;
