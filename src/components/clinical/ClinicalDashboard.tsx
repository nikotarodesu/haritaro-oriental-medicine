'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowDown, ArrowRight, ClipboardPenLine, History, ScanLine, Search, ShieldCheck } from 'lucide-react';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { clinicalFollowup, writeClinicalEncounter } from '@/utils/clinicalEncounter';
import type { PatientNoteItem } from '@/types/clinicalMemo';

export default function ClinicalDashboard() {
  const { patientNotes } = useClinicalMemo();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const recent = [...patientNotes].sort((a,b) => b.updatedAt - a.updatedAt).slice(0,3);
  const followup = (note: PatientNoteItem) => {
    if (!window.confirm(`${note.patientIdentifier}の前回記録から新しい来院記録を始めます。作業中の下書きがある場合は置き換えますか？`)) return;
    if (!writeClinicalEncounter(clinicalFollowup(note))) { setError('下書きを保存できませんでした。ブラウザの保存設定を確認してください。'); return; }
    router.push('/clinical/workspace');
  };
  return <section className="clinical-dashboard" aria-label="鍼灸師の臨床ホーム">
    <div className="clinical-dashboard-intro">
      <div className="clinical-hero-copy">
        <p className="clinical-kicker">鍼灸師の臨床ホーム</p>
        <h1>所見を整理し、<br />考えた理由を残す。</h1>
        <p className="clinical-hero-description">主訴・四診の所見から、候補の比較と経過の記録へ。</p>
        <Link className="clinical-primary-action" href="/clinical/workspace"><ClipboardPenLine aria-hidden="true" /><span>所見を整理・記録する</span><ArrowRight aria-hidden="true" /></Link>
        <p className="clinical-resume-hint">作業中の下書きも、ここから続けられます。</p>
      </div>
    </div>
    <nav aria-label="臨床の目的から開く" className="clinical-dashboard-nav">
      <a href="#chief-complaints"><Search aria-hidden="true" /><span>主訴ガイド</span><ArrowDown aria-hidden="true" /></a>
      <Link href="/tsubo"><ScanLine aria-hidden="true" /><span>経穴辞典<small>位置・注意事項</small></span><ArrowRight aria-hidden="true" /></Link>
      <Link href="/notes#clinical-timeline"><History aria-hidden="true" /><span>臨床記録<small>ノート・経過</small></span><ArrowRight aria-hidden="true" /></Link>
    </nav>
    <section id="chief-complaints" className="clinical-section">
      <div className="clinical-section-heading"><h2>主訴から調べる</h2></div>
      <ul className="clinical-complaint-list">{CLINICAL_COMPLAINTS.map(item => <li key={item.slug}><Link className="clinical-complaint-link" href={`/clinical/symptoms/${item.slug}`}><span>{item.title}</span><ArrowRight aria-hidden="true" /></Link></li>)}</ul>
      <Link href="/safety" className="clinical-safety-link"><ShieldCheck aria-hidden="true" /><span>受診・安全確認</span><ArrowRight aria-hidden="true" /></Link>
    </section>
    {recent.length > 0 && <section className="clinical-section"><div className="clinical-section-heading"><h2>前回の記録から次回を始める</h2></div><p className="text-sm ui-muted">前回の申し送りを引き継ぎ、今回の所見は改めて確認します。</p><div className="clinical-recent-grid">{recent.map(note => <button key={note.id} type="button" onClick={() => followup(note)} className="clinical-recent-card"><History aria-hidden="true" /><span><span className="block font-semibold">{note.patientIdentifier} · {note.visitDate}</span><span className="mt-1 block text-sm ui-muted">{note.chiefComplaint}</span></span><ArrowRight aria-hidden="true" className="clinical-card-arrow" /></button>)}</div></section>}
    {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
  </section>;
}
