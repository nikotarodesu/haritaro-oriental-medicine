import { CLINICAL_CASES } from "@/data/clinicalCasesData";
import { ATLAS_LEARNING_PAIRS } from "@/data/tsubo/atlas/learningPairs";
import { NEARBY_COMPARISONS } from "@/data/tsubo/atlas/nearbyComparisons";
import { atlasPairPracticeReview, nearbyPracticeReview } from "@/data/tsubo/atlas/practiceReviews";
import { casePracticeReviewQuestion } from "@/utils/casePracticeReview";

export const PRACTICE_REVIEW_QUESTIONS = [
  ...ATLAS_LEARNING_PAIRS.map(atlasPairPracticeReview),
  ...NEARBY_COMPARISONS.map(nearbyPracticeReview),
  ...CLINICAL_CASES.flatMap(item => item.reasoningSteps.map(step => casePracticeReviewQuestion(item, step))),
];
