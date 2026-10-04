'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clinicalFollowup, clinicalTimeline, readClinicalMetric, writeClinicalEncounter } from '@/utils/clinicalEncounter';
import type { PatientNoteItem } from '@/types/clinicalMemo';

export default function ClinicalNoteTimeline({ notes }: { notes: PatientNoteItem[] }) {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const identifiers = useMemo(() => [...new Set(notes.map(note => note.patientIdentifier))].sort(), [notes]);
  const activeId = identifiers.includes(identifier) ? identifier : identifiers[0] || '';
  const timeline = clinicalTimeline(notes, activeId);
  const latest = timeline.at(-1);
  const continueVisit = () => {
    if (!latest) return;
    if (!window.confirm('前回の申し送りを引き継いで、新しい来院記録を始めますか？作業中の下書きがある場合は置き換えます。')) return;
    if (!writeClinicalEncounter(clinicalFollowup(latest))) { setError('下書きを保存できません。ブラウザの保存設定を確認してください。'); return; }
    router.push('/clinical/workspace');
  };
  return <section id="clinical-timeline" className="scroll-mt-28 space-y-4 rounded-xl border border-[#D6DED7] p-4 text-[#232826] dark:border-[#34483C] dark:text-[#FAF8F5] sm:p-5">
    <h2 className="text-xl font-bold">前回と今回の経過を比べる</h2><p className="text-sm leading-relaxed">同じ匿名IDの記録を来院順に表示します。数値は同じ指標・条件で記録した場合に比較してください。症状の変化は施術の効果を単独で証明するものではありません。</p>
    {identifiers.length === 0 ? <p className="text-sm">保存した記録がここに表示されます。</p> : <><div className="flex flex-wrap items-end gap-3"><label className="min-w-0 w-full sm:w-auto sm:flex-1">匿名ID<select aria-label="匿名ID" value={activeId} onChange={event => setIdentifier(event.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-[#C8D4CD] bg-white px-3 py-2 dark:border-[#496153] dark:bg-[#17212A]">{identifiers.map(id => <option key={id}>{id}</option>)}</select></label><button onClick={continueVisit} className="min-h-11 w-full rounded-lg bg-[#1E3D34] sm:w-auto px-4 py-2 font-semibold text-white dark:bg-[#9CCDB8] dark:text-[#11291F]">前回から新しい来院記録へ →</button></div>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="来院ごとの比較表"><table className="w-full min-w-[640px] border-collapse text-left text-sm"><caption className="sr-only">{activeId}の来院記録。異なる評価指標の数値を直接比較しないでください。</caption><thead><tr className="border-b border-[#D6DED7] dark:border-[#34483C]">{['来院日・主訴','指標／施術前→直後','見立て・配穴','反応・次回確認'].map(label => <th scope="col" key={label} className="p-3 align-top">{label}</th>)}</tr></thead><tbody>{timeline.map(note => { const metric = readClinicalMetric(note); return <tr key={note.id} className="border-b border-[#D6DED7] dark:border-[#34483C]"><th scope="row" className="p-3 align-top font-normal"><time>{note.visitDate}</time><p className="mt-1">{note.chiefComplaint}</p></th><td className="p-3 align-top">{metric.name || '指標未記入'}<p className="mt-1">{metric.before || '未評価'} → {metric.after || '未評価'}</p></td><td className="p-3 align-top">{note.syndrome || '見立て未記入'}<p className="mt-1">{note.selectedPoints.join('、') || '配穴なし・保留'}</p></td><td className="max-w-sm p-3 align-top"><p className="whitespace-pre-wrap">{note.patientReaction || '反応未記入'}</p><p className="mt-2 whitespace-pre-wrap">次回：{note.nextAction || '未記入'}</p><details className="mt-2"><summary className="min-h-11 cursor-pointer font-semibold">所見・見立ての修正を読む</summary><p className="mt-2 whitespace-pre-wrap">{note.treatmentPlan || '未記入'}</p></details></td></tr>; })}</tbody></table></div></>}
    {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
  </section>;
}
