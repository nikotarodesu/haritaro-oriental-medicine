'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CLINICAL_REVISION_CASES } from '@/data/clinicalLearning';
import ClinicalEvidenceKey from './ClinicalEvidenceKey';

export default function ClinicalRevisionTraining() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const current = CLINICAL_REVISION_CASES[index];
  const selectedChoice = answer === null ? undefined : current.choices[answer];

  return (
    <section id="revision-training" className="scroll-mt-28 space-y-4 rounded-xl border border-frame bg-panel p-4 sm:p-5">
      <h2 className="text-xl font-bold">症状や経過が変わったときの見立て</h2>
      <p className="leading-relaxed">三つの架空症例から選び、分かっていることを見比べて、次に何を確かめるか考えます。</p>
      <label className="block">
        演習を選ぶ
        <select value={index} onChange={event => { setIndex(Number(event.target.value)); setAnswer(null); }} className="mt-1 min-h-11 w-full rounded-lg border border-field bg-page px-3 py-2">
          {CLINICAL_REVISION_CASES.map((item, index) => <option key={item.id} value={index}>{item.title}</option>)}
        </select>
      </label>

      <figure className="clinical-revision-figure">
        <figcaption className="font-bold">模擬症例で分かっていること</figcaption>
        {current.id === 'no-lasting-change' ? (
          <div className="clinical-revision-scores">
            <p className="text-sm text-muted">首の痛み（0〜10）</p>
            <dl>
              {current.observations.map(({ label, score }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd><span className="clinical-revision-track" aria-hidden="true"><span style={{ width: `${score * 10}%` }} /></span><strong>{score}</strong></dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <dl className="clinical-role-groups">
            {current.observations.map(({ label, text }, index) => (
              <div key={label} data-role={index === 0 ? 'root' : 'branch'}>
                <dt className="clinical-role-heading">{label}</dt>
                <dd className="leading-relaxed">{text}</dd>
              </div>
            ))}
          </dl>
        )}
        {current.note && <p className="text-sm leading-relaxed text-muted">{current.note}</p>}
      </figure>

      <fieldset className="space-y-3">
        <legend className="mb-3 font-semibold">{current.question}</legend>
        {current.choices.map((choice, index) => (
          <label key={choice.text} className="flex min-h-11 items-start gap-3 rounded-lg border border-field p-3 leading-relaxed has-checked:border-accent has-checked:bg-panel-selected">
            <input type="radio" className="mt-1 h-5 w-5 shrink-0 accent-accent" name="revision-choice" value={index} checked={answer === index} onChange={() => setAnswer(index)} />
            <span>{choice.text}</span>
          </label>
        ))}
      </fieldset>
      {selectedChoice && (
        <div className="space-y-3 rounded-lg bg-panel-selected p-4">
          <div role="status" className="space-y-3">
            <p className="font-bold">{selectedChoice.appropriate ? 'この症例で優先すること' : 'この選択肢で見落としやすいこと'}</p>
            <p>{selectedChoice.feedback}</p>
            <dl><dt className="font-semibold">記録に残すこと</dt><dd>{current.review}</dd></dl>
          </div>
          <div className="flex flex-wrap gap-x-4 text-sm">
            <Link className="inline-flex min-h-11 items-center underline" href={`/curriculum/${current.lectureId}`}>講義へ戻る</Link>
            <Link className="inline-flex min-h-11 items-center underline" href={`/clinical/symptoms/${current.complaintSlug}`}>主訴別の確認ガイドへ</Link>
          </div>
        </div>
      )}
      <details>
        <summary className="min-h-11 cursor-pointer text-sm font-semibold">安全確認などの参照資料</summary>
        <ClinicalEvidenceKey sourceKeys={['back', 'terminology']} />
      </details>
    </section>
  );
}
