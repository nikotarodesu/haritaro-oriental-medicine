'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { NotebookPen, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter, type ClinicalPointPlan } from '@/utils/clinicalEncounter';

export default function ClinicalToolBridge({ selectedCodes, editableCodes, onRestore }: { selectedCodes?: string[]; editableCodes?: string[]; onRestore?: (codes: string[]) => void }) {
  const router = useRouter();
  const { clinicalStorageOwner = 'guest' } = useClinicalMemo();
  const [loadedOwner, setLoadedOwner] = useState<string | null>(null);
  const [encounter, setEncounter] = useState<ClinicalEncounter | null>(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!clinicalStorageOwner) return;
    const timer = setTimeout(() => { const stored = readClinicalEncounter(); setEncounter(stored.encounter); setLoadedOwner(clinicalStorageOwner); setMessage(''); if (stored.encounter && onRestore) onRestore(stored.encounter.points.map(point => point.code)); }, 0);
    return () => clearTimeout(timer);
  }, [onRestore, clinicalStorageOwner]);
  const importPoints = () => {
    if (!clinicalStorageOwner || loadedOwner !== clinicalStorageOwner || !encounter || !selectedCodes) return;
    const stored = readClinicalEncounter().encounter;
    if (!stored) { setMessage('下書きが見つかりません。作業画面で確認してください。'); return; }
    if (stored.safety !== 'reviewed') { setMessage('安全確認が未完了、または医療評価を優先するため、配穴の転記を保留します。'); return; }
    const points: ClinicalPointPlan[] = selectedCodes.map(code => stored.points.find(point => point.code === code) || { code, role: 'other', reason: '', alternative: '' });
    // The 32-point exercise must not discard points selected in the full dictionary.
    if (editableCodes) points.push(...stored.points.filter(point => !editableCodes.includes(point.code)));
    if (points.length > 12) { setMessage('作業画面の経穴は12穴までです。作業画面で構成を確認してください。'); return; }
    if (!writeClinicalEncounter({ ...stored, points, step: 3 })) { setMessage('転記を保存できませんでした。'); return; }
    router.push('/clinical/workspace');
  };
  if (!clinicalStorageOwner || loadedOwner !== clinicalStorageOwner || !encounter) return null;
  return <aside className="clinical-tool-bridge" aria-label="作業中の記録">
    <div className="clinical-tool-bridge__context">
      <NotebookPen aria-hidden="true" className="h-5 w-5 shrink-0" />
      <div><p className="clinical-tool-bridge__label">作業中の記録</p>
        <p>{(encounter.patientIdentifier || '匿名ID未入力') + ' · ' + (encounter.chiefComplaint || '主訴未入力')}</p>
      </div>
    </div>
    <div className="clinical-tool-bridge__actions">
      {selectedCodes ? <button type="button" className="page-primary-action" onClick={importPoints}>この構成を反映して記録へ戻る<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></button> :
        <Link href="/clinical/workspace" className="page-secondary-action">記録へ戻る<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>}
      {selectedCodes && <Link href="/clinical/workspace" className="clinical-tool-bridge__back">反映せずに戻る</Link>}
    </div>
    {message && <p role="status" className="clinical-tool-bridge__message">{message}</p>}
  </aside>;
}
