"use client";

import { Fragment, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";
import { normalizeSearchText } from "@/utils/search";
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

export default function AcupointPairDirectory({ sections }: {
  sections: readonly AcupointPairDirectorySection[];
}) {
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const terms = normalizeSearchText(query).split(/[\s+,、・]+/u).filter(Boolean);
  const filteredSections = sections.map(section => ({
    ...section,
    entries: section.entries.filter(entry => terms.every(term =>
      /^[a-z]{2}\d{1,2}$/u.test(term) ? entry.codes.includes(term) : entry.searchText.includes(term),
    )),
  })).filter(section => section.entries.length > 0);
  const count = filteredSections.reduce((total, section) => total + section.entries.length, 0);

  return (
    <>
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
              onChange={event => setQuery(event.target.value)}
              placeholder="例：足三里、腰痛、ST36"
              autoComplete="off"
            />
          </div>
          {query && (
            <button type="button" onClick={() => {
              setQuery("");
              searchInput.current?.focus();
            }}>クリア</button>
          )}
        </div>
        <p role="status">{terms.length ? `${count}組が見つかりました` : `全${count}組`}</p>
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
    </>
  );
}
