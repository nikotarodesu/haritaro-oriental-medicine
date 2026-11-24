import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { readingPartHref } from "@/data/publicLectures/readingUnitCatalog";
import { KEY_POINT_TYPES_GUIDE } from "@/data/tsubo/keyPointTypes";
import { caseQuestionAnchor } from "@/utils/caseStudyNavigation";

type AtlasStudyRoute = {
  codes: readonly string[];
  readingHref: string;
  readingLabel: string;
  caseId: string;
  stepTitle: string;
  exerciseLabel: string;
};

export const ATLAS_STUDY_ROUTES: readonly AtlasStudyRoute[] = [
  {
    codes: ["PC6", "SP4"],
    readingHref: `${KEY_POINT_TYPES_GUIDE}#eight-confluent`,
    readingLabel: "八脈交会穴を読む",
    caseId: "case-06-gerd-liver-stomach",
    stepTitle: "公孫・内関の組み合わせと姿勢の確認",
    exerciseLabel: "内関と公孫の設問を解く",
  },
  {
    codes: ["LI4"],
    readingHref: readingPartHref("lecture-meridians-1"),
    readingLabel: "合谷を経絡図で読む",
    caseId: "case-11-cervicobrachial-syndrome",
    stepTitle: "首から親指へ広がる範囲を図で見る",
    exerciseLabel: "親指側の経絡を症例で考える",
  },
  {
    codes: ["ST36", "SP6"],
    readingHref: readingPartHref("lecture-zangfu-3"),
    readingLabel: "脾と胃の働きを読む",
    caseId: "case-07-ibs-liver-spleen",
    stepTitle: "肝と脾の両方を考える配穴例",
    exerciseLabel: "足三里と三陰交の設問を解く",
  },
];

export function atlasStudyExercise(route: AtlasStudyRoute) {
  const clinicalCase = CLINICAL_CASES.find(item => item.id === route.caseId);
  const question = clinicalCase?.reasoningSteps.find(step => step.stepTitle === route.stepTitle);
  if (!question) return undefined;

  return { href: `/cases/${route.caseId}#${caseQuestionAnchor(question.stepNumber)}`, label: route.exerciseLabel };
}
