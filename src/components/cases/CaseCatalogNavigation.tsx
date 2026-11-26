"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { caseCatalogFilter, caseHrefWithSymptom, nextCaseInCatalog, type CaseCatalogPosition } from "@/utils/caseStudyNavigation";

type Props = { caseId: string; caseOrder: readonly CaseCatalogPosition[] };

function CatalogLinks({ caseId, caseOrder, filter }: Props & { filter: string }) {
  const next = nextCaseInCatalog(caseOrder, caseId, filter);
  return (
    <>
      <Link href={caseHrefWithSymptom("/cases#case-catalog", filter)} className="ui-text-link inline-flex min-h-11 items-center text-sm font-semibold">
        症例一覧に戻る
      </Link>
      {next && (
        <Link href={caseHrefWithSymptom(`/cases/${next.id}`, filter)} className="page-primary-action group">
          <span>{filter === "all" ? "次の症例へ" : "同じ分類の次の症例へ"}（症例{next.caseNumber}）</span>
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
      )}
    </>
  );
}

function FilteredCatalogLinks(props: Props) {
  const filter = caseCatalogFilter(useSearchParams().get("symptom"));
  return <CatalogLinks {...props} filter={filter} />;
}

export default function CaseCatalogNavigation(props: Props) {
  return (
    <nav aria-label="ほかの症例へ" className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-divider pt-4">
      <Suspense fallback={<CatalogLinks {...props} filter="all" />}>
        <FilteredCatalogLinks {...props} />
      </Suspense>
    </nav>
  );
}
