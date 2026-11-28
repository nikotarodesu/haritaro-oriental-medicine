"use client";

import { createContext, Fragment, useCallback, useContext, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight, GitCompare, Search } from "lucide-react";
import { normalizeSearchText } from "@/utils/search";
import { setAnalyticsDisabled } from "@/utils/analytics";
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
  shortLabel: string;
  countUnit: "組" | "件";
  entries: readonly DirectoryEntry[];
};

const PairDirectoryContext = createContext(false);
const queryKey = "haritaro-atlas-pair-filter";
const maximumQueryLength = 100;

function restoreQuery() {
  const params = new URLSearchParams(window.location.search);
  const sharedQuery = params.get("q");
  if (sharedQuery !== null) return sharedQuery.slice(0, maximumQueryLength);
  const historyValue = window.history.state?.[queryKey];
  if (typeof historyValue === "string") return historyValue.slice(0, maximumQueryLength);
  if (params.get("return") !== "1") return "";
  try {
    return (window.sessionStorage.getItem(queryKey) ?? "").slice(0, maximumQueryLength);
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
  const [draft, setDraft] = useState<string | null>(null);
  const subscribeToHistory = useCallback((listener: () => void) => {
    const restore = () => {
      setDraft(null);
      listener();
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  const restoredQuery = useSyncExternalStore(subscribeToHistory, restoreQuery, () => "");
  const query = draft ?? restoredQuery;
  const searchInput = useRef<HTMLInputElement>(null);
  function updateQuery(value: string) {
    setDraft(value);
    const url = new URL(window.location.href);
    url.searchParams.delete("return");
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    if (url.hash.startsWith("#featured-acupoint-pair-") || sections.some(({ id }) => url.hash === `#${id}`)) url.hash = "";
    try {
      if (url.searchParams.has("q")) setAnalyticsDisabled(true);
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
              maxLength={maximumQueryLength}
            />
          </div>
          {query && (
            <button type="button" onClick={() => {
              updateQuery("");
              searchInput.current?.focus();
            }}>絞り込みを解除</button>
          )}
        </div>
        <p role="status">
          {count === 0 ? "該当 0件。ツボ名や経穴コード（LI4など）に変えてお試しください。"
            : terms.length > 0 ? `該当 ${count}件` : `全${count}件`}
        </p>
      </div>

      {count > 0 && (
        <div className={styles.navigation}>
          <nav aria-label="分類から探す">
            <ul className={styles.groupLinks} role="list">
              {filteredSections.map(({ id, label, shortLabel, countUnit, entries }) => (
                <li key={id}>
                  <a href={`#${id}`} className={styles.groupLink} aria-label={`${label} ${entries.length}${countUnit}`}>
                    <span>{shortLabel}</span>
                    <span className={styles.groupCount}>{entries.length}{countUnit}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <details className={`${styles.directoryIndex} atlas-disclosure`}>
            <summary>名前から探す索引</summary>
            <nav className={styles.directory} aria-label="名前から探す索引">
              {filteredSections.map(({ id, label, entries }) => (
                <div key={id}>
                  <p>{label}</p>
                  <ul role="list">
                    {entries.map(entry => <li key={entry.anchor}><a href={`#${entry.anchor}`}>{entry.name}</a></li>)}
                  </ul>
                </div>
              ))}
            </nav>
          </details>
        </div>
      )}

      {filteredSections.map(({ id, label, entries }) => (
        <section key={id} aria-labelledby={id}>
          <h2 id={id} className="atlas-section-title atlas-target" tabIndex={-1}>{label}</h2>
          <div className={styles.cards}>
            {entries.map(entry => <Fragment key={entry.anchor}>{entry.card}</Fragment>)}
          </div>
        </section>
      ))}
    </PairDirectoryContext.Provider>
  );
}
