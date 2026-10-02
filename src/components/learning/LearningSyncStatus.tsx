'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
export default function LearningSyncStatus() {
  const { user } = useAuth();
  const { ready, status, lastSyncedAt, retry, canImportGuest, importGuest } = useLearningSync();
  const labels = { local: 'この端末に保存', syncing: '学習履歴を同期中', synced: '学習履歴をクラウドへ反映済み', offline: '端末に保存・クラウド同期は未完了', setup: '端末に保存・クラウド同期の設定待ち', memory: '端末への保存に失敗・この画面内で保持' };
  return <aside className="rounded-xl border border-[#D8CFC0] dark:border-[#384C5E] p-4 text-sm space-y-2">
    <p role="status" className="font-bold">{ready ? labels[status] : '学習履歴を確認中'}</p>
    {status === 'memory' && <p role="alert" className="text-xs">ブラウザの保存許可・空き容量を確認してください。保存や同期が完了するまで、画面を閉じると記録が失われる場合があります。</p>}
    <p className="text-xs leading-relaxed">{user ? '同じGoogleアカウントのスマホ・PCで進捗と復習履歴を共有します。通信が戻った際や画面へ戻った際に再確認します。' : 'ログインすると、同じGoogleアカウントのスマホ・PCで進捗と復習履歴を共有できます。'}</p>
    {lastSyncedAt && <p className="text-xs">最終同期確認：{new Date(lastSyncedAt).toLocaleString('ja-JP')}</p>}
    <div className="flex flex-wrap gap-3">
      {user ? <button type="button" disabled={!ready || status === 'syncing'} onClick={retry} className="min-h-11 underline disabled:opacity-50">学習履歴を再同期</button> : <Link href="/auth/login?returnTo=%2Fkokushi%23learning-review" className="min-h-11 inline-flex items-center underline">Googleでログイン</Link>}
      {canImportGuest && <button type="button" disabled={!ready} onClick={importGuest} className="min-h-11 underline">この端末のログイン前の履歴を引き継ぐ</button>}
    </div>
  </aside>;
}
