"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CASE_COURSE_COMPARISON_ANCHOR, isReadingFromCaseCourse } from "@/utils/caseStudyNavigation";

export default function CaseCourseLectureContext() {
  const params = useSearchParams();
  if (!isReadingFromCaseCourse(params)) return null;

  return (
    <div className="mt-3 rounded-lg border border-frame bg-panel-selected px-3 pt-2 text-sm print:hidden">
      <p>首の痛みの比較演習と同じように、この節では洗濯物を干す場面で経過を比べます。</p>
      <Link href={`/cases#${CASE_COURSE_COMPARISON_ANCHOR}`} className="ui-text-link inline-flex min-h-11 items-center">
        首の比較演習に戻る
      </Link>
    </div>
  );
}
