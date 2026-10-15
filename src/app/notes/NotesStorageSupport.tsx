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
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NotesStorageSupport({ syncStatus, isAuthenticated, isPremium, patientNoteCount, fileInputRef, onDownloadCsv, onDownloadBackup, onImport, onFileUpload }: Props) {
  const labels = { local: "この端末に保存", syncing: "クラウドと同期中…", synced: "クラウドへ同期済み", offline: "クラウドへの同期は未完了" };
  return <section aria-label="記録の保存状態とバックアップ" className="notes-storage-support">
    <p role="status" className="notes-storage-status" data-attention={syncStatus === "offline"}>{syncStatus === "offline" ? <AlertCircle aria-hidden="true" /> : <Cloud aria-hidden="true" />}<span>{labels[syncStatus]}</span></p>
    {syncStatus === "offline" && <p role="alert" className="notes-storage-warning">クラウドへの同期が完了していません。端末の記録を確認し、必要に応じて「ファイルに保存」でバックアップしてください。</p>}
    <p className="notes-privacy-reminder">患者番号や記号で記録してください。氏名・連絡先など、本人を特定できる情報は自由記述にも入力しないでください。</p>
    <details className="notes-storage-details">
      <summary>保存・同期・バックアップ</summary>
      <div className="notes-storage-body">
        <p>{isAuthenticated ? "同じアカウントでログインすると、PC・スマホ間で記録を共有できます。同期状態は上の表示で確認してください。" : "未ログインの記録は、このブラウザ内に保存されます。無料ログインすると、同じアカウントのPC・スマホ間で記録を共有できます。"}</p>
        <div className="notes-storage-links">{!isAuthenticated && <Link href="/auth/login?returnTo=/notes">ログインしてクラウド同期する →</Link>}{isAuthenticated && !isPremium && <Link href="/pricing">保存枠の料金を見る →</Link>}</div>
        <p>{patientNoteCount >= 3 ? `臨床ノートが${patientNoteCount}件あります。` : ""}ブラウザの保存データの消去や端末の故障に備え、定期的にバックアップしてください。CSVは表計算用、ファイル保存は読込に使えるJSON形式です。</p>
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
