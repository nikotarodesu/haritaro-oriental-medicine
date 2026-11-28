"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import styles from "./symptom-atlas.module.css";

type DirectoryEntry = { label: string; href: string; count: number };

export default function SymptomDirectory({ entries }: { entries: readonly DirectoryEntry[] }) {
  const [query, setQuery] = useState("");
  const term = query.normalize("NFKC").trim();
  const matches = term ? entries.filter(({ label }) => label.normalize("NFKC").includes(term)) : entries;

  return (
    <>
      <div role="search" aria-label="ツボ図鑑の症状を検索">
        <label className={styles.filter}>
          症状名で絞り込む
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例　頭痛" />
        </label>
        <p role="status" className={styles.filterStatus}>
          {term && (matches.length > 0 ? `${matches.length}件` : "該当する症状がありません。")}
        </p>
      </div>
      <ul className={styles.index} aria-label="伝統資料に記載された症状" role="list">
        {matches.map(({ label, href, count }) => (
          <li key={href}>
            <Link href={href} prefetch={false}>
              <span>{label}</span><small>{count}穴</small><ChevronRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
