"use client";

import { createContext, Fragment, useContext, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight, GitCompare, Search } from "lucide-react";
import { normalizeSearchText } from "@/utils/search";
import { comparisonSelectionHref } from "@/app/tsubo/compare/selection";
import styles from "./FeaturedAcupointPairs.module.css";

type DirectoryEntry = {
  anchor: string;
  name: string;
  codes: readonly string[];
  searchText: string;
  card: ReactNode;
};

export type AcupointPairDirectorySection = {
  id: string;
  label: string;
  entries: readonly DirectoryEntry[];
};

const PairDirectoryContext = createContext(false);
const queryKey = "haritaro-atlas-pair-filter";

function subscribeToHistory(listener: () => void) {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
}

function restoreQuery() {
  const historyValue = window.history.state?.[queryKey];
  if (typeof historyValue === "string") return historyValue;
  if (new URLSearchParams(window.location.search).get("return") !== "1") return "";
  try {
    return window.sessionStorage.getItem(queryKey) ?? "";
  } catch {
    return "";
  }
}

export function PairComparisonLink({ pairId, codes, label }: {
  pairId: string;
  codes: readonly string[];
  label: string;
}) {
  const inDirectory = useContext(PairDirectoryContext);
  const origin = inDirectory ? { pairId } : undefined;
  return (
    <a className={styles.compare} href={comparisonSelectionHref(codes, origin)} aria-label={label} data-analytics-action="atlas_compare">
      <GitCompare size={17} aria-hidden="true" />
      位置を並べて見る
    </a>
  );
}

export default function AcupointPairDirectory({ sections }: {
  sections: readonly AcupointPairDirectorySection[];
}) {
  const restoredQuery = useSyncExternalStore(subscribeToHistory, restoreQuery, () => "");
  const [draft, setDraft] = useState<string | null>(null);
  const query = draft ?? restoredQuery;
  const searchInput = useRef<HTMLInputElement>(null);
  function updateQuery(value: string) {
    setDraft(value);
    const url = new URL(window.location.href);
    url.searchParams.delete("return");
    if (url.hash.startsWith("#featured-acupoint-pair-")) url.hash = "";
    try {
      window.history.replaceState({ ...window.history.state, [queryKey]: value }, "", url);
    } catch {
      // The current filter still works if the browser blocks History API writes.
    }
    try {
      if (value) window.sessionStorage.setItem(queryKey, value);
      else window.sessionStorage.removeItem(queryKey);
    } catch {
      // Filtering and browser back remain available through the history entry.
    }
  }
  const terms = normalizeSearchText(query).split(/[\s+,、・]+/u).filter(Boolean);
  const filteredSections = sections.map(section => ({
    ...section,
    entries: section.entries.filter(entry => terms.every(term =>
      /^[a-z]{2}\d{1,2}$/u.test(term) ? entry.codes.includes(term) : entry.searchText.includes(term),
    )),
  })).filter(section => section.entries.length > 0);
  const count = filteredSections.reduce((total, section) => total + section.entries.length, 0);

  return (
    <PairDirectoryContext.Provider value>
      <div className={styles.filter} role="search" aria-label="配穴一覧の絞り込み">
        <label htmlFor="acupoint-pair-query">ツボ名・症状で絞り込む</label>
        <div className={styles.filterControls}>
          <div>
            <Search size={18} aria-hidden="true" />
            <input
              id="acupoint-pair-query"
              ref={searchInput}
              type="search"
              value={query}
              onChange={event => updateQuery(event.target.value)}
              placeholder="例：四関穴、腰痛、ST36"
              autoComplete="off"
              maxLength={100}
            />
          </div>
          {query && (
            <button type="button" onClick={() => {
              updateQuery("");
              searchInput.current?.focus();
            }}>絞り込みを解除</button>
          )}
        </div>
        <p role="status">{terms.length ? `該当：${count}組` : `全${count}組`}</p>
      </div>

      {count > 0 && (
        <details className={`${styles.directoryIndex} atlas-disclosure`}>
          <summary>組み合わせの索引</summary>
          <nav className={styles.directory} aria-label="組み合わせの索引">
            {filteredSections.map(({ id, label, entries }) => (
              <div key={id}>
                <a href={`#${id}`} className={styles.groupLink}>{label}<ArrowRight size={16} aria-hidden="true" /></a>
                <ul role="list">
                  {entries.map(entry => <li key={entry.anchor}><a href={`#${entry.anchor}`}>{entry.name}</a></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </details>
      )}

      {filteredSections.map(({ id, label, entries }) => (
        <section key={id} aria-labelledby={id}>
          <h2 id={id} className="atlas-section-title atlas-target">{label}</h2>
          <div className={styles.cards}>
            {entries.map(entry => <Fragment key={entry.anchor}>{entry.card}</Fragment>)}
          </div>
        </section>
      ))}
    </PairDirectoryContext.Provider>
  );
}
