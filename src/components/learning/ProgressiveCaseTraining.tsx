'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PROGRESSIVE_CASES } from '@/data/progressiveCases';
import { shuffledIndices } from '@/utils/learningReview';

export default function ProgressiveCaseTraining() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState('case-training');
  const current = PROGRESSIVE_CASES[caseIndex];
  const step = current.steps[stepIndex];
  const score = current.steps.reduce((total, s, i) => total + (s.options[answers[i]]?.points || 0), 0);
  const reset = (next: number) => { setCaseIndex(next); setAnswers({}); setStepIndex(0); setChoice(null); setChecked(false); setSeed(prev => `${prev}-retry`); };
  return (
    <section id="case-training" className="scroll-mt-24 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-4 text-[#232826] dark:text-[#FAF8F5]">
      <h2 className="font-serif text-xl font-bold">段階的な症例演習</h2>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">追加質問、安全判断、候補の比較、判断根拠、治則、再評価を練習します。各設問はこの症例設定に対する学習上の評価です。</p>
      <div className="flex flex-wrap gap-2">{PROGRESSIVE_CASES.map((c, i) => <button key={c.id} type="button" aria-pressed={caseIndex === i} onClick={() => reset(i)} className={`rounded-lg border p-2 text-sm ${i === caseIndex ? 'bg-[#1E3D34] text-white border-[#1E3D34]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{c.title}</button>)}</div>
      <p className="rounded-xl bg-[#FAF8F5] dark:bg-[#121920] p-4 text-sm leading-relaxed">{current.presentation}</p>
      {current.steps.slice(0, stepIndex).map((s, i) => <p key={i} className="border-l-2 border-[#C5DED4] pl-3 text-sm leading-relaxed">追加情報：{s.reveal}</p>)}
      {step ? <div className="space-y-3">
        <p className="text-xs">ステップ {stepIndex + 1} / {current.steps.length} ｜ {step.domain}</p>
        <h3 className="text-base font-bold">{step.question}</h3>
        <div className="space-y-2">{shuffledIndices(step.options.length, `${seed}-${current.id}-${stepIndex}`).map((original, display) => <button key={original} type="button" disabled={checked} aria-pressed={choice === original} onClick={() => setChoice(original)} className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed ${choice === original ? 'border-[#1E3D34] bg-[#EBF3EF] dark:bg-[#182823]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{display + 1}. {step.options[original].text}</button>)}</div>
        {!checked ? <button type="button" disabled={choice === null} onClick={() => { if (choice !== null) { setAnswers(prev => ({ ...prev, [stepIndex]: choice })); setChecked(true); } }} className="rounded-lg bg-[#1E3D34] px-4 py-2 text-white text-sm disabled:opacity-40">判断と解説を確認</button> : <div className="rounded-xl bg-[#EBF3EF] dark:bg-[#182823] p-4 space-y-3 text-sm" aria-live="polite">
          <p className="font-bold">{step.options[choice!].points === 2 ? 'この症例で優先したい判断です。' : step.options[choice!].points === 1 ? '追加確認が必要な判断です。' : '判断の根拠を見直しましょう。'}</p>
          <p>{step.options[choice!].feedback}</p>
          {step.options[choice!].points !== 2 && <p>優先する選択：{step.options.find(opt => opt.points === 2)?.text}</p>}
          <p>追加情報：{step.reveal}</p>
          <button type="button" onClick={() => { setStepIndex(stepIndex + 1); setChoice(null); setChecked(false); }} className="rounded-lg bg-[#1E3D34] px-4 py-2 text-white">{stepIndex + 1 < current.steps.length ? 'この情報を使って次の判断へ' : '振り返りへ'}</button>
        </div>}
      </div> : <div className="space-y-3" aria-live="polite">
        <h3 className="font-bold">振り返り：{score} / {current.steps.length * 2} 点</h3>
        <ul className="space-y-2 text-sm">{current.steps.map((s, i) => <li key={s.domain}><strong>{s.domain}：{s.options[answers[i]]?.points || 0} / 2</strong> — {s.options[answers[i]]?.feedback}</li>)}</ul>
        <p className="text-xs">点数はこの症例での学習上の目安です。実際の患者の診断精度や臨床能力を測定した値ではありません。</p>
        <div className="flex flex-wrap gap-3 text-sm"><button type="button" className="underline" onClick={() => reset(caseIndex)}>もう一度練習</button><Link className="underline" href={`/curriculum/${current.lectureId}`}>関連講義へ</Link><Link className="underline" href="/kokushi#learning-review">復習・類題へ</Link></div>
      </div>}
      <details className="text-xs leading-relaxed"><summary className="cursor-pointer">症例の出典・学習上の前提</summary><p className="mt-2">本サイトの架空症例・オリジナル演習です。伝統的な分類と現代医学の診断を区別します。安全判断や研究の限界は次の資料を参照しています。改訂日：2026年10月2日。</p>{current.sources.map(s => <a key={s.url} className="block underline mt-1" href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>)}</details>
    </section>
  );
}
