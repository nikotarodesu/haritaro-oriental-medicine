'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { clinicalFollowup, writeClinicalEncounter } from '@/utils/clinicalEncounter';
import type { PatientNoteItem } from '@/types/clinicalMemo';

const FRAME = 'flex min-h-14 items-center justify-between gap-3 rounded-xl border border-[#C9D8CE] p-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#3B5747]';
const LINK = `${FRAME} bg-white dark:bg-[#17212A]`;
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
  return <section className="space-y-6 text-[#232826] dark:text-[#FAF8F5]" aria-label="鍼灸師の臨床ホーム">
    <div className="space-y-3"><p className="text-sm font-bold text-[#1E3D34] dark:text-[#9CCDB8]">鍼灸師の臨床ホーム</p><h1 className="font-serif text-3xl font-bold sm:text-4xl">所見を整理し、<br className="sm:hidden" />考えた理由を残す。</h1><p className="max-w-3xl leading-relaxed">主訴と四診から候補を比較し、治法・配穴の理由を記録。施術後と次回来院時の変化を、同じ指標で振り返れます。</p></div>
    <nav aria-label="臨床の目的から開く" className="grid gap-3 sm:grid-cols-2"><Link className={`${FRAME} bg-[#1E3D34] text-white dark:bg-[#9CCDB8] dark:text-[#11291F]`} href="/clinical/workspace">所見から記録まで・下書きを続ける <span aria-hidden="true">→</span></Link><a className={LINK} href="#chief-complaints">主訴から調べる <span aria-hidden="true">↓</span></a><Link className={LINK} href="/tsubo">経穴の位置・注意事項を確認 <span aria-hidden="true">→</span></Link><Link className={LINK} href="/notes#clinical-timeline">前回の記録・経過を開く <span aria-hidden="true">→</span></Link></nav>
    <section id="chief-complaints" className="scroll-mt-28 space-y-3"><h2 className="text-xl font-bold">主訴から調べる</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{CLINICAL_COMPLAINTS.map(item => <Link key={item.slug} className={LINK} href={`/clinical/symptoms/${item.slug}`}><span><span className="block font-bold">{item.title}</span><span className="mt-1 block text-sm font-normal leading-relaxed">{item.summary}</span></span><span aria-hidden="true">→</span></Link>)}</div></section>
    {recent.length > 0 && <section className="space-y-3"><h2 className="text-xl font-bold">最近の記録から次回を始める</h2><p className="text-sm">前回の申し送りを引き継ぎ、今回の所見は改めて確認します。</p><div className="grid gap-3 sm:grid-cols-3">{recent.map(note => <button key={note.id} onClick={() => followup(note)} className={`${LINK} text-left`}><span><span className="block">{note.patientIdentifier} · {note.visitDate}</span><span className="mt-1 block text-sm font-normal">{note.chiefComplaint}</span></span><span aria-hidden="true">→</span></button>)}</div></section>}
    {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
    <div className="flex flex-wrap gap-3 text-sm"><Link className="inline-flex min-h-11 items-center underline" href="/learn">学生向けの学習案内</Link><Link className="inline-flex min-h-11 items-center underline" href="/symptoms">患者さん向けセルフケア</Link><Link className="inline-flex min-h-11 items-center underline" href="/safety">受診・安全確認</Link></div>
  </section>;
}
