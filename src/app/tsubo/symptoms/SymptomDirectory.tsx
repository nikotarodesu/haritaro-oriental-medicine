"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { findSymptomsInDirectory, groupSymptomDirectory, type SymptomDirectoryEntry } from "./directoryEntries";
import styles from "./symptom-atlas.module.css";

function SymptomLinks({ entries, label }: { entries: readonly SymptomDirectoryEntry[]; label: string }) {
  return (
    <ul className={styles.index} aria-label={label} role="list">
      {entries.map(({ label, href, count }) => (
        <li key={href}>
          <Link href={href} prefetch={false}>
            <span>{label}</span><small>{count}穴</small><ChevronRight size={16} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SymptomDirectory({ entries }: { entries: readonly SymptomDirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;
  const groups = useMemo(() => groupSymptomDirectory(entries), [entries]);
  const matches = hasQuery ? findSymptomsInDirectory(entries, query) : [];

  return (
    <>
      <div role="search" aria-label="ツボ図鑑の症状を検索">
        <label className={styles.filter}>
          症状名で絞り込む
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例　頭痛、食欲不振" />
        </label>
        <p role="status" className={styles.filterStatus}>
          {hasQuery && (matches.length > 0 ? `${matches.length}件` : "該当する症状がありません。")}
        </p>
      </div>
      {hasQuery && matches.length > 0 && <SymptomLinks entries={matches} label="検索結果" />}
      <div hidden={hasQuery}>
        {groups.map(({ label, entries }) => (
          <details key={label} className={`atlas-disclosure ${styles.group}`}>
            <summary>{label}<small>{entries.length}件</small></summary>
            <SymptomLinks entries={entries} label={label} />
          </details>
        ))}
      </div>
    </>
  );
}
