'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter, type ClinicalPointPlan } from '@/utils/clinicalEncounter';

export default function ClinicalToolBridge({ selectedCodes, editableCodes, onRestore }: { selectedCodes?: string[]; editableCodes?: string[]; onRestore?: (codes: string[]) => void }) {
  const [encounter, setEncounter] = useState<ClinicalEncounter | null>(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => { const stored = readClinicalEncounter(); setEncounter(stored.encounter); if (stored.encounter && onRestore) onRestore(stored.encounter.points.map(point => point.code)); }, 0);
    return () => clearTimeout(timer);
  }, [onRestore]);
  const importPoints = () => {
    if (!encounter || !selectedCodes) return;
    const stored = readClinicalEncounter().encounter;
    if (!stored) { setMessage('下書きが見つかりません。作業画面で確認してください。'); return; }
    if (stored.safety !== 'reviewed') { setMessage('安全確認が未完了、または医療評価を優先するため、配穴の転記を保留します。'); return; }
    const points: ClinicalPointPlan[] = selectedCodes.map(code => stored.points.find(point => point.code === code) || { code, role: 'other', reason: '', alternative: '' });
    // The 32-point exercise must not discard points selected in the full dictionary.
    if (editableCodes) points.push(...stored.points.filter(point => !editableCodes.includes(point.code)));
    if (points.length > 12) { setMessage('作業画面の経穴は12穴までです。作業画面で構成を確認してください。'); return; }
    if (!writeClinicalEncounter({ ...stored, points, step: 3 })) { setMessage('転記を保存できませんでした。'); return; }
    setMessage('作業中の下書きに配穴を転記しました。作業画面で採用理由を確認してください。');
  };
  return <aside className="mx-auto my-4 max-w-6xl space-y-2 rounded-xl border border-[#C9D8CE] bg-[#F6F8F3] p-4 text-sm text-[#232826] dark:border-[#3B5747] dark:bg-[#182823] dark:text-[#FAF8F5]" aria-label="臨床記録への移動">
    {encounter ? <p>作業中：{encounter.patientIdentifier || '匿名ID未入力'} · {encounter.chiefComplaint || '主訴未入力'}。所見と見立ては作業画面に保持されています。</p> : <p>主訴・所見・配穴の理由を一つの流れで記録できます。</p>}
    <div className="flex flex-wrap gap-3">{encounter && selectedCodes && <button className="min-h-11 rounded-lg border border-[#B9CDC0] px-3 py-2 font-semibold dark:border-[#496153]" onClick={importPoints}>選択中の配穴を作業中の記録に転記</button>}<Link href="/clinical/workspace" className="inline-flex min-h-11 items-center font-semibold underline">{encounter ? '所見・記録の作業画面へ戻る' : '所見から記録までを始める'} →</Link></div>
    {message && <p role="status">{message}</p>}
  </aside>;
}
