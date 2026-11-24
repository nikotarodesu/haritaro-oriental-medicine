import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import type { CaseReasoningStep } from "@/types/clinicalCase";
import { CASE_REVIEW_ANCHOR, caseQuestionAnchor } from "@/utils/caseStudyNavigation";

export type CaseStudyReviewResources = {
  readingHref: string;
  comparison?: { href: string; label: string };
};

export default function CaseStudyReview({ steps, answers, resources }: {
  steps: readonly CaseReasoningStep[];
  answers: Readonly<Record<number, string>>;
  resources: CaseStudyReviewResources;
}) {
  const missed = steps.filter(step =>
    step.options.some(option => option.id === answers[step.stepNumber] && !option.isCorrect),
  );

  function rememberReviewPosition() {
    const hash = `#${CASE_REVIEW_ANCHOR}`;
    if (window.location.hash !== hash) window.history.replaceState(window.history.state, "", hash);
  }

  return (
    <section id={CASE_REVIEW_ANCHOR} tabIndex={-1} aria-labelledby="case-practice-review-title" className="scroll-mt-28 space-y-3 rounded-xl border border-frame bg-panel-selected p-4 print:hidden">
      <h3 id="case-practice-review-title" className="text-base font-semibold">回答の根拠を振り返る</h3>
      {missed.length > 0 ? (
        <ul className="space-y-1">
          {missed.map(step => (
            <li key={step.stepNumber}>
              <a href={`#${caseQuestionAnchor(step.stepNumber)}`} className="ui-text-link inline-flex min-h-11 items-center">
                第{step.stepNumber}問 {step.stepTitle}の解説に戻る
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>全問、解答例と一致しました。</p>
      )}
      <nav aria-label="症例の復習に使う資料" className="flex flex-wrap gap-2">
        <ContentNavigationLink href={resources.readingHref} onNavigate={rememberReviewPosition} placement="case_review_reading" className="page-secondary-action">
          四診と弁証の講義を読み直す
        </ContentNavigationLink>
        {resources.comparison && (
          <ContentNavigationLink href={resources.comparison.href} placement="case_review_atlas" prefetch={false} className="page-secondary-action">
            {resources.comparison.label}
          </ContentNavigationLink>
        )}
      </nav>
    </section>
  );
}
