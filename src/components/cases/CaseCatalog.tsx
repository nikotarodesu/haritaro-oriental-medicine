"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, Suspense, type ReactNode } from "react";

type CatalogEntry = { caseNumber: number; card: ReactNode };

const symptomGroups: readonly { id: string; label: string; caseNumbers: readonly number[] }[] = [
  { id: "headache", label: "頭痛・めまい", caseNumbers: [1, 9, 12] },
  { id: "fatigue", label: "疲れ・だるさ", caseNumbers: [2, 12] },
  { id: "digestion", label: "胃腸", caseNumbers: [2, 6, 7, 15] },
  { id: "movement", label: "首・肩・腰・ひざ", caseNumbers: [8, 11, 14, 18] },
  { id: "sleep", label: "睡眠", caseNumbers: [4, 5] },
  { id: "temperature", label: "冷え・ほてり", caseNumbers: [3, 4, 8] },
  { id: "breathing", label: "のど・咳・呼吸", caseNumbers: [10, 17, 19] },
];

const filters = [
  { id: "all", label: "すべて" },
  ...symptomGroups,
  { id: "other", label: "ほかの症状" },
];
const groupedCaseNumbers = new Set(symptomGroups.flatMap(group => group.caseNumbers));

function CaseGrid({ entries }: { entries: readonly CatalogEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ caseNumber, card }) => <Fragment key={caseNumber}>{card}</Fragment>)}
    </div>
  );
}

function FilteredCatalog({ entries }: { entries: readonly CatalogEntry[] }) {
  const symptom = useSearchParams().get("symptom");
  const selectedFilter = filters.find(({ id }) => id === symptom)?.id ?? "all";
  const group = symptomGroups.find(({ id }) => id === selectedFilter);
  let visibleEntries = entries;
  if (group) visibleEntries = entries.filter(({ caseNumber }) => group.caseNumbers.includes(caseNumber));
  if (selectedFilter === "other") visibleEntries = entries.filter(({ caseNumber }) => !groupedCaseNumbers.has(caseNumber));

  function selectFilter(id: string) {
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("symptom");
    else url.searchParams.set("symptom", id);
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="space-y-4">
      <fieldset className="space-y-2 print:hidden">
        <legend className="text-sm font-semibold text-ink">症状で絞り込む</legend>
        <div className="flex flex-wrap gap-2">
          {filters.map(({ id, label }) => (
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
      <CaseGrid entries={visibleEntries} />
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
