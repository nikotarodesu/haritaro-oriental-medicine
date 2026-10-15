import { permanentRedirect } from "next/navigation";
import { getLearningFocus } from "@/data/learningFocus";
import { validReviewSessionId } from "@/utils/reviewSession";

/** Preserve bookmarks while retiring the exam-preparation landing page. */
export default async function RetiredExamPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const previous = await searchParams;
  const query = new URLSearchParams();
  if (typeof previous.focus === "string" && getLearningFocus(previous.focus)) query.set("focus", previous.focus);
  if (validReviewSessionId(previous.resumeReview)) query.set("resumeReview", previous.resumeReview);
  const suffix = query.size ? `?${query}` : "";
  permanentRedirect(`/learn/review${suffix}`);
}
