'use client';

import Link from 'next/link';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ClinicalSaveNotice() {
  const { lastToast, dismissToast } = useClinicalMemo();
  const { isPremium } = useAuth();
  if (!lastToast || lastToast.type !== 'warning') return null;
  const atLimit = lastToast.message.includes('上限');
  return <aside role="status" aria-live="polite" className="fixed bottom-24 left-4 right-4 z-[130] mx-auto max-w-lg rounded-xl border border-amber-500 bg-white p-4 shadow-lg dark:bg-[#17212A] print:hidden">
    <p className="text-sm leading-relaxed">{lastToast.message}</p>
    <div className="mt-2 flex flex-wrap gap-3">
      {atLimit && !isPremium && <Link href="/pricing" className="ui-text-link" onClick={dismissToast}>保存件数を増やす料金プラン →</Link>}
      {atLimit && <Link href="/notes" className="ui-text-link" onClick={dismissToast}>保存済みの記録を確認</Link>}
      <button type="button" className="min-h-11 px-2 text-sm underline" onClick={dismissToast}>閉じる</button>
    </div>
  </aside>;
}
