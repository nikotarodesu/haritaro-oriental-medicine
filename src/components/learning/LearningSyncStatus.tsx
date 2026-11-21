'use client';

import { useLearningSync } from '@/contexts/LearningSyncContext';

export default function LearningSyncStatus({ compact = false }: { compact?: boolean }) {
  const { ready, status } = useLearningSync();
  return (
    <aside className={compact ? 'learning-sync-compact' : 'rounded-xl border border-[#D8CFC0] p-4 text-sm dark:border-[#384C5E]'}>
      <p role="status" className="font-bold">{ready ? status === 'local' ? '学習履歴はこのブラウザーに保存されます。' : '学習履歴を端末に保存できません。' : 'このブラウザーの学習記録を読み込んでいます。'}</p>
      {status === 'memory' && <p className="text-xs">この画面を閉じると入力内容が消えます。ブラウザーの保存設定と空き容量をご確認ください。</p>}
    </aside>
  );
}
