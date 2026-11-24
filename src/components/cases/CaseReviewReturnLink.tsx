"use client";

import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ContentNavigationLink from "@/components/learning/ContentNavigationLink";
import { caseReviewReturnHref } from "@/utils/caseStudyNavigation";

export default function CaseReviewReturnLink({ publicCaseIds }: { publicCaseIds: readonly string[] }) {
  const params = useSearchParams();
  const href = params ? caseReviewReturnHref(params, publicCaseIds) : undefined;
  if (!href) return null;

  return (
    <ContentNavigationLink href={href} scroll={false} placement="reading_unit_case_return" className="page-secondary-action mb-3 print:hidden">
      <ArrowLeft size={16} aria-hidden="true" />症例の振り返りに戻る
    </ContentNavigationLink>
  );
}
