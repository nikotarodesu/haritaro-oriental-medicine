'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const EastWestIntegrativeSwitch = dynamic(() => import('@/components/EastWestIntegrativeSwitch'), { loading: () => <p className="py-4 text-sm" role="status">比較例を読み込んでいます…</p> });

const caseLabels: Readonly<Record<string, string>> = {
  'headache-migraine': '頭痛',
  'insomnia-autonomic': '不眠',
  'gerd-gastric': '胃の不調',
};

export default function SymptomPerspective({ caseId }: { caseId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#D6DED7] p-4 dark:border-[#34483C]">
      <button type="button" aria-expanded={open} aria-controls="symptom-perspective" onClick={() => setOpen(current => !current)} className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-semibold">
        <span>{caseLabels[caseId] ?? '症状'}を東洋医学と現代医学でどう見比べるか</span><span aria-hidden="true">{open ? '−' : '＋'}</span>
      </button>
      <div id="symptom-perspective" hidden={!open}>
        {open && <><p className="mb-4 text-sm leading-relaxed">伝統概念と現代医学を比べる学習用モデルです。両者の同一性や、症状の原因・治療効果を証明するものではありません。</p><EastWestIntegrativeSwitch initialCaseId={caseId} /></>}
      </div>
    </div>
  );
}
