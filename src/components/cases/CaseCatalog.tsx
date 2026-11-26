"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import type { CasePatientProfile, ClinicalCase } from "@/types/clinicalCase";
import { CASE_CATALOG_FILTERS, caseCatalogFilter, caseHrefWithSymptom, filterCaseCatalog } from "@/utils/caseStudyNavigation";

type CatalogEntry = Pick<ClinicalCase, "id" | "caseNumber" | "title" | "difficulty">
  & Pick<CasePatientProfile, "age" | "gender" | "chiefComplaint">;

function CaseGrid({ entries, symptom = null }: { entries: readonly CatalogEntry[]; symptom?: string | null }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ id, caseNumber, title, difficulty, age, gender, chiefComplaint }) => (
        <Link
          key={id}
          className="page-link-card page-link-card--stack clinical-case-catalog-card"
          href={caseHrefWithSymptom(`/cases/${id}`, symptom)}
          aria-labelledby={`${id}-title`}
        >
          <div className="flex w-full items-start justify-between gap-2">
            <h3 id={`${id}-title`} className="text-lg font-bold leading-snug text-ink">{title}</h3>
            <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
          </div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="font-semibold">難易度 {difficulty}</span>
            <span className="whitespace-nowrap">症例 {String(caseNumber).padStart(2, "0")}</span>
            <span>{age}・{gender}</span>
          </p>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">「{chiefComplaint}」</p>
        </Link>
      ))}
    </div>
  );
}

function FilteredCatalog({ entries }: { entries: readonly CatalogEntry[] }) {
  const symptom = useSearchParams().get("symptom");
  const selectedFilter = caseCatalogFilter(symptom);
  const visibleEntries = filterCaseCatalog(entries, selectedFilter);

  function selectFilter(id: string) {
    if (id === selectedFilter) return;
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("symptom");
    else url.searchParams.set("symptom", id);
    window.history.pushState(null, "", url);
  }

  return (
    <div className="space-y-4">
      <fieldset className="space-y-2 print:hidden">
        <legend className="text-sm font-semibold text-ink">症状で絞り込む</legend>
        <div className="flex flex-wrap gap-2">
          {CASE_CATALOG_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={selectedFilter === id}
              onClick={() => selectFilter(id)}
              className="min-h-11 rounded-full border border-field bg-page px-3 py-1.5 text-sm font-semibold text-ink hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-accent aria-pressed:bg-panel-selected aria-pressed:text-accent"
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <p role="status" className="text-sm text-muted">{visibleEntries.length}件の症例</p>
      <CaseGrid entries={visibleEntries} symptom={selectedFilter} />
    </div>
  );
}

export default function CaseCatalog({ entries }: { entries: readonly CatalogEntry[] }) {
  return (
    <Suspense fallback={<CaseGrid entries={entries} />}>
      <FilteredCatalog entries={entries} />
    </Suspense>
  );
}
