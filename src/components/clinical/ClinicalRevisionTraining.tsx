'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CLINICAL_REVISION_CASES } from '@/data/clinicalLearning';
import ClinicalEvidenceKey from './ClinicalEvidenceKey';

export default function ClinicalRevisionTraining() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const current = CLINICAL_REVISION_CASES[index];
  return <section id="revision-training" className="scroll-mt-28 space-y-4 rounded-xl border border-[#D0DED3] p-4 text-[#232826] dark:border-[#34483C] dark:text-[#FAF8F5] sm:p-5">
    <h2 className="text-xl font-bold">混在する所見・見立ての修正を練習</h2><p className="text-sm">3つの架空例で、不一致・持続する変化・再来時の安全確認を検討します。</p><label className="block">演習を選ぶ<select aria-label="演習を選ぶ" value={index} onChange={event => { setIndex(Number(event.target.value)); setAnswer(null); }} className="mt-1 min-h-11 w-full rounded-lg border border-[#C8D4CD] bg-white px-3 py-2 dark:border-[#496153] dark:bg-[#17212A]">{CLINICAL_REVISION_CASES.map((item,i) => <option key={item.id} value={i}>{item.title}</option>)}</select></label>
    <p className="leading-relaxed">{current.presentation}</p><fieldset className="space-y-3"><legend className="mb-3 font-semibold">{current.question}</legend>{current.choices.map((choice,i) => <label key={choice.text} className="flex min-h-11 items-start gap-3 rounded-lg border border-[#C8D4CD] p-3 leading-relaxed dark:border-[#496153]"><input type="radio" className="mt-1 h-5 w-5 shrink-0" name="revision-choice" value={i} checked={answer === i} onChange={() => setAnswer(i)} /><span>{choice.text}</span></label>)}</fieldset>
    {answer !== null && <div role="status" className="space-y-3 rounded-lg bg-[#F6F8F3] p-4 dark:bg-[#182823]"><p className="font-bold">{current.choices[answer].appropriate ? '確認したい考え方です。' : '確認し直したい点があります。'}</p><p>{current.choices[answer].feedback}</p><p>記録すること：{current.review}</p><div className="flex flex-wrap gap-3 text-sm"><Link className="inline-flex min-h-11 items-center underline" href={`/curriculum/${current.lectureId}`}>講義へ戻る</Link><Link className="inline-flex min-h-11 items-center underline" href={`/clinical/symptoms/${current.complaintSlug}`}>主訴別の確認ガイドへ</Link><Link className="inline-flex min-h-11 items-center underline" href="/notes?tab=learning">考えた理由を学習ノートに残す</Link></div></div>}
    <details><summary className="min-h-11 cursor-pointer text-sm font-semibold">情報の区分・安全確認の参照資料</summary><ClinicalEvidenceKey sourceKeys={['back','terminology']} /></details>
  </section>;
}
