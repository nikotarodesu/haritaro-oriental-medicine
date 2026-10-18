"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { useClinicalMemo } from "@/contexts/ClinicalMemoContext";
import { useModalDialog } from "@/hooks/useModalDialog";

const savedTime = new Intl.DateTimeFormat("ja-JP", {
  month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo",
});

function recordTime(record: { updatedAt: number; createdAt: number }) {
  if (Number.isFinite(record.updatedAt) && record.updatedAt > 0 && record.updatedAt <= 8.64e15) return record.updatedAt;
  return Number.isFinite(record.createdAt) && record.createdAt > 0 && record.createdAt <= 8.64e15 ? record.createdAt : 0;
}

/** A read-only shortcut. All record management stays in the notebook. */
export default function MyClinicalRecordDrawer() {
  const { memos, patientNotes, isDrawerOpen, closeDrawer, isReady, clinicalStorageOwner, syncStatus } = useClinicalMemo();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef({ pathname, owner: clinicalStorageOwner });
  useModalDialog(isDrawerOpen, drawerRef, closeDrawer);

  useEffect(() => {
    const previous = locationRef.current;
    if (previous.pathname !== pathname || previous.owner !== clinicalStorageOwner) closeDrawer();
    locationRef.current = { pathname, owner: clinicalStorageOwner };
  }, [pathname, clinicalStorageOwner, closeDrawer]);

  const canShowRecords = isReady && clinicalStorageOwner !== null;
  const recentRecords = useMemo(() => {
    if (!canShowRecords) return [];
    return [
      ...memos.map(memo => ({ key: `stock:${memo.id}`, title: memo.title, detail: "配穴ストック", timestamp: recordTime(memo) })),
      ...patientNotes.map(note => ({ key: `note:${note.id}`, title: note.chiefComplaint, detail: `臨床ノート · ${note.patientIdentifier}`, timestamp: recordTime(note) })),
    ].sort((a, b) => b.timestamp - a.timestamp || a.key.localeCompare(b.key)).slice(0, 5);
  }, [memos, patientNotes, canShowRecords]);

  if (!isDrawerOpen) return null;

  return (
    <div className="site-overlay saved-quickview-overlay">
      <div className="saved-quickview-backdrop" aria-hidden="true" onClick={closeDrawer} />
      <div ref={drawerRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="saved-quickview-title" className="saved-quickview-panel">
        <header className="saved-quickview-header">
          <h2 id="saved-quickview-title">最近保存した記録</h2>
          <button type="button" onClick={closeDrawer} className="saved-quickview-close" aria-label="保存一覧を閉じる" data-modal-autofocus>
            <X aria-hidden="true" size={20} />
          </button>
        </header>
        <div className="saved-quickview-content">
          {!canShowRecords ? (
            <p role={syncStatus === "offline" ? "alert" : "status"} className="saved-quickview-empty">
              {syncStatus === "offline" ? "記録を読み込めませんでした。マイノートから再試行してください。" : "保存先を確認しています…"}
            </p>
          ) : recentRecords.length === 0 ? (
            <p className="saved-quickview-empty">保存した記録はまだありません。</p>
          ) : (
            <ol className="saved-quickview-list" aria-label="最近更新した5件までの記録">
              {recentRecords.map(record => (
                <li key={record.key} className="saved-quickview-record">
                  <p className="saved-quickview-meta">
                    <span>{record.detail}</span>
                    {record.timestamp > 0 && <time dateTime={new Date(record.timestamp).toISOString()}>{savedTime.format(record.timestamp)}</time>}
                  </p>
                  <h3>{record.title}</h3>
                </li>
              ))}
            </ol>
          )}
        </div>
        <footer className="saved-quickview-footer">
          <Link href="/notes" onClick={closeDrawer} className="saved-quickview-open">
            <span>マイノートを開く</span><ArrowRight aria-hidden="true" size={18} />
          </Link>
        </footer>
      </div>
    </div>
  );
}
