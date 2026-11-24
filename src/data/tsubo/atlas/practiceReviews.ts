import { atlasLearningPairHref, type ATLAS_LEARNING_PAIRS } from "./learningPairs";
import type { NearbyComparison } from "./nearbyComparisons";
import { questionRevision } from "@/utils/learningReview";
import { practiceReviewAnchor, type PracticeReviewQuestion } from "@/utils/practiceReview";

export function atlasPairPracticeReview(pair: (typeof ATLAS_LEARNING_PAIRS)[number]): PracticeReviewQuestion {
  const { codes, question } = pair;
  const id = `atlas-pair-${codes.join("-").toLowerCase()}`;
  return {
    id,
    kind: "atlas",
    title: "経穴比較",
    prompt: question.prompt,
    href: `${atlasLearningPairHref(codes)}#${practiceReviewAnchor(id)}`,
    revision: questionRevision(question.prompt, codes, codes.indexOf(question.answerCode), question.explanation),
  };
}

export function nearbyPracticeReview(comparison: NearbyComparison): PracticeReviewQuestion {
  const { id: comparisonId, region, points, question } = comparison;
  const id = `atlas-nearby-${comparisonId}`;
  const codes = points.map(point => point.code);
  return {
    id,
    kind: "atlas",
    title: region,
    prompt: question.prompt,
    href: `/tsubo/${codes[0]}#${practiceReviewAnchor(id)}`,
    revision: questionRevision(question.prompt, codes, codes.indexOf(question.answerCode), question.explanation),
  };
}
