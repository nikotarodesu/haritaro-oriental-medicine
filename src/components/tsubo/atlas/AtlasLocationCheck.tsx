"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLearningSync } from "@/contexts/LearningSyncContext";
import type { AtlasLocationQuestion } from "@/data/tsubo/atlas/types";
import { trackEvent } from "@/utils/analytics";
import { PRACTICE_REVIEW_HREF, practiceReviewAnchor, recordPracticeReviewAnswer, type PracticeReviewQuestion } from "@/utils/practiceReview";

export default function AtlasLocationCheck({ question, reviewQuestion, options, placement }: {
  question: AtlasLocationQuestion;
  reviewQuestion: PracticeReviewQuestion;
  options: readonly { code: string; name: string }[];
  placement: "nearby_diagram" | "atlas_comparison";
}) {
  const { ready } = useLearningSync();
  const [answer, setAnswer] = useState<{ code: string; retry: boolean } | null>(null);
  const selected = answer?.code ?? null;
  const started = useRef(false);
  const anchor = practiceReviewAnchor(reviewQuestion.id);

  function choose(code: string) {
    if (!ready || selected === code) return;
    setAnswer({ code, retry: answer?.retry || window.location.hash === `#${anchor}` });
    recordPracticeReviewAnswer(reviewQuestion, code === question.answerCode);
    if (!started.current) {
      started.current = true;
      trackEvent("atlas_location_check_start", { placement });
    }
  }

  return (
    <fieldset id={anchor} tabIndex={-1} className="atlas-target min-w-0 space-y-2 rounded-xl border border-frame bg-panel px-3 pb-3 print:hidden">
      <legend className="px-1 text-sm font-semibold text-accent">位置を1問で確認</legend>
      <p className="text-sm font-semibold leading-relaxed">{question.prompt}</p>
      <a href="#tsubo-compare-result-title" className="ui-text-link inline-flex min-h-11 items-center">比較図を見返す</a>
      <div className="flex flex-wrap gap-2">
        {options.map(({ code, name }) => (
          <button
            key={code}
            type="button"
            disabled={!ready}
            aria-pressed={selected === code}
            className="min-h-11 rounded-lg border border-frame bg-panel px-3 py-2 text-sm font-semibold hover:border-accent aria-pressed:border-accent aria-pressed:bg-panel-selected"
            onClick={() => choose(code)}
          >
            {name}
          </button>
        ))}
      </div>
      <p role="status" className="text-sm leading-relaxed text-accent">
        {selected === null ? null : selected === question.answerCode
          ? `正解。${question.explanation}`
          : "もう一度、位置の目印を確かめてみましょう。"}
      </p>
      {answer && (answer.retry || answer.code !== question.answerCode) && (
        <Link href={PRACTICE_REVIEW_HREF} className="ui-text-link inline-flex min-h-11 items-center">
          {answer.retry ? "復習一覧に戻る" : "図と症例の復習を開く"}
        </Link>
      )}
    </fieldset>
  );
}
