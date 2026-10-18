"use client";

import type { ChangeEvent, RefObject } from "react";
import Link from "next/link";
import { AlertCircle, Cloud, Download, FileText, Upload } from "lucide-react";
import type { SyncStatus } from "@/contexts/ClinicalMemoContext";

interface Props {
  syncStatus: SyncStatus;
  isAuthenticated: boolean;
  isPremium: boolean;
  patientNoteCount: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onDownloadCsv: () => void;
  onDownloadBackup: () => void;
  onImport: () => void;
  onRetry?: () => void;
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NotesStorageSupport({ syncStatus, isAuthenticated, isPremium, patientNoteCount, fileInputRef, onDownloadCsv, onDownloadBackup, onImport, onFileUpload, onRetry }: Props) {
  const labels = { local: "この端末に保存", syncing: "クラウドと同期中…", synced: "クラウドへ同期済み", offline: "クラウドへの同期は未完了" };
  return <section aria-label="記録の保存状態とバックアップ" className="notes-storage-support">
    <p role="status" className="notes-storage-status" data-attention={syncStatus === "offline"}>{syncStatus === "offline" ? <AlertCircle aria-hidden="true" /> : <Cloud aria-hidden="true" />}<span>{labels[syncStatus]}</span></p>
    {syncStatus === "offline" && <p role="alert" className="notes-storage-warning">クラウドへの同期が完了していません。端末の記録を確認し、必要に応じて「ファイルに保存」でバックアップしてください。</p>}
    {syncStatus === "offline" && isAuthenticated && onRetry && <button type="button" className="page-secondary-action" onClick={onRetry}>アカウントの同期を再試行する</button>}
    <p className="notes-privacy-reminder">患者番号や記号を使い、自由記述にも本人を特定できる情報は入力しないでください。</p>
    <details className="notes-storage-details">
      <summary>保存・同期・バックアップ</summary>
      <p className="mt-3 text-sm leading-relaxed">ログイン前の記録は未ログイン時のブラウザ保存に残り、アカウントへ自動移動しません。移す場合は未ログイン時にバックアップを書き出し、ログイン後に読み込んでください。</p>
      <div className="notes-storage-body">
        <p>{isAuthenticated ? "同じアカウントでログインすると、PC・スマホ間で記録を共有できます。同期状態は上の表示で確認してください。" : "未ログインの記録は、このブラウザ内に保存されます。無料ログインすると、同じアカウントのPC・スマホ間で記録を共有できます。"}</p>
        <div className="notes-storage-links">{!isAuthenticated && <Link href="/auth/login?returnTo=/notes">ログインしてクラウド同期する →</Link>}{isAuthenticated && !isPremium && <Link href="/pricing">保存枠の料金を見る →</Link>}</div>
        <p>{patientNoteCount >= 3 ? `臨床ノートが${patientNoteCount}件あります。` : ""}ブラウザの保存データの消去や端末の故障に備え、定期的にバックアップしてください。CSVは表計算用、ファイル保存は読込に使えるJSON形式です。</p>
        <p>アカウントに同期した記録は、そのアカウントで閲覧・編集できます。<Link className="notes-storage-privacy-link" href="/privacy">個人情報の取り扱い</Link></p>
        <div className="notes-file-actions">
          <button type="button" onClick={onDownloadCsv} title="Excelや表計算ソフトで開けるCSVファイルを出力"><FileText aria-hidden="true" /><span>CSV出力</span></button>
          <button type="button" onClick={onDownloadBackup} title="手元にファイルとしてJSONバックアップ保存"><Download aria-hidden="true" /><span>ファイルに保存</span></button>
          <button type="button" onClick={onImport} title="ファイルからバックアップを読み込む"><Upload aria-hidden="true" /><span>読込</span></button>
          <input type="file" ref={fileInputRef} onChange={onFileUpload} accept=".json" className="hidden" />
        </div>
      </div>
    </details>
  </section>;
}
