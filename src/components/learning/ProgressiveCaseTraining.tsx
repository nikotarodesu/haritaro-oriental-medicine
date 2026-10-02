'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';
import { PROGRESSIVE_CASES } from '@/data/progressiveCases';
import { shuffledIndices } from '@/utils/learningReview';
import { CASE_REASONING_RUBRICS } from '@/data/caseReasoningRubrics';
import { gradeCaseReasoning } from '@/utils/caseReasoningScore';
import { questionRevision } from '@/utils/learningReview';
import { useLearningSync } from '@/contexts/LearningSyncContext';

export default function ProgressiveCaseTraining() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reasonAnswers, setReasonAnswers] = useState<Record<number, string[]>>({});
  const [reasons, setReasons] = useState<string[]>([]);
  const { setEntry, values } = useLearningSync();
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState('case-training');
  const started = useRef(false);
  useEffect(() => {
    const restoreCase = () => {
      const id = new URLSearchParams(window.location.search).get('case');
      const selected = PROGRESSIVE_CASES.findIndex(item => item.id === id);
      if (selected >= 0) { setCaseIndex(selected); setAnswers({}); setReasonAnswers({}); setReasons([]); setStepIndex(0); setChoice(null); setChecked(false); started.current = false; }
    };
    const timer = setTimeout(restoreCase, 0);
    window.addEventListener('popstate', restoreCase);
    return () => { clearTimeout(timer); window.removeEventListener('popstate', restoreCase); };
  }, []);
  const current = PROGRESSIVE_CASES[caseIndex];
  const step = current.steps[stepIndex];
  const rubric = CASE_REASONING_RUBRICS[current.id];
  const grades = current.steps.map((s, i) => gradeCaseReasoning(s.options[answers[i]]?.points || 0, rubric[i], reasonAnswers[i] || []));
  const score = grades.reduce((total, grade) => total + grade.total, 0);
  const stageGrade = step && choice !== null ? gradeCaseReasoning(step.options[choice].points, rubric[stepIndex], reasons) : null;
  const revision = questionRevision(current.id, current.steps.map((s, i) => JSON.stringify([s, rubric[i]])), 0, 'reasoning-v1');
  const previous = values['case:' + current.id] as { score?: number; revision?: string } | undefined;
  const reset = (next: number) => { started.current = false; setCaseIndex(next); setAnswers({}); setReasonAnswers({}); setReasons([]); setStepIndex(0); setChoice(null); setChecked(false); setSeed(prev => `${prev}-retry`); };
  return (
    <section id="case-training" className="scroll-mt-24 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-4 text-[#232826] dark:text-[#FAF8F5]">
      <h2 className="font-serif text-xl font-bold">段階的な症例演習</h2>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">判断だけでなく、その理由も選びます。各段階は判断0〜2点、根拠0〜4点。支持する理由の選択に加点し、不適切な理由の選択を減点します。安全上の見落としは総得点と別に表示します。</p>
      {previous?.revision === revision && <p className="text-xs">前回の学習記録：{previous.score} / {current.steps.length * 6} 点</p>}
      <div className="flex flex-wrap gap-2">{PROGRESSIVE_CASES.map((c, i) => <button key={c.id} type="button" aria-pressed={caseIndex === i} onClick={() => reset(i)} className={`min-h-11 rounded-lg border p-2 text-sm ${i === caseIndex ? 'bg-[#1E3D34] text-white border-[#1E3D34]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{c.title}</button>)}</div>
      <p className="rounded-xl bg-[#FAF8F5] dark:bg-[#121920] p-4 text-sm leading-relaxed">{current.presentation}</p>
      {current.steps.slice(0, stepIndex).map((s, i) => <p key={i} className="border-l-2 border-[#C5DED4] pl-3 text-sm leading-relaxed">追加情報：{s.reveal}</p>)}
      {step ? <div className="space-y-3">
        <p className="text-xs">ステップ {stepIndex + 1} / {current.steps.length} ｜ {step.domain}</p>
        <h3 className="text-base font-bold">{step.question}</h3>
        <div className="space-y-2">{shuffledIndices(step.options.length, `${seed}-${current.id}-${stepIndex}`).map((original, display) => <button key={original} type="button" disabled={checked} aria-pressed={choice === original} onClick={() => { if (!started.current) { trackEvent('case_training_start', { placement: 'case_training', total: current.steps.length }); started.current = true; } setChoice(original); }} className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed ${choice === original ? 'border-[#1E3D34] bg-[#EBF3EF] dark:bg-[#182823]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{display + 1}. {step.options[original].text}</button>)}</div>
        <fieldset disabled={checked} className="space-y-2"><legend className="font-bold text-sm mb-2">この判断で採用する理由（複数選択）</legend>{shuffledIndices(rubric[stepIndex].length, `${seed}-reasons-${current.id}-${stepIndex}`).map(index => { const reason = rubric[stepIndex][index]; return <label key={reason.id} className="flex items-start gap-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 text-sm"><input type="checkbox" checked={reasons.includes(reason.id)} onChange={event => setReasons(previous => event.target.checked ? [...previous, reason.id] : previous.filter(id => id !== reason.id))} className="mt-1 size-4 shrink-0"/><span>{reason.text}</span></label>; })}</fieldset>
        {!checked ? <button type="button" disabled={choice === null || !reasons.length} onClick={() => { if (choice !== null && !checked) { trackEvent('case_stage_complete', { placement: 'case_training', total: stepIndex + 1 }); setAnswers(prev => ({ ...prev, [stepIndex]: choice })); setReasonAnswers(prev => ({ ...prev, [stepIndex]: reasons })); setChecked(true); } }} className="rounded-lg bg-[#1E3D34] px-4 py-2 text-white text-sm disabled:opacity-40">判断・根拠と解説を確認</button> : <div className="rounded-xl bg-[#EBF3EF] dark:bg-[#182823] p-4 space-y-3 text-sm" aria-live="polite">
          <p className="font-bold">{step.options[choice!].points === 2 ? 'この症例で優先したい判断です。' : step.options[choice!].points === 1 ? '追加確認が必要な判断です。' : '判断の根拠を見直しましょう。'}</p>
          <p>{step.options[choice!].feedback}</p>
          <p className="font-bold">判断 {stageGrade?.decisionPoints} / 2 ／ 根拠 {stageGrade?.reasoningPoints} / 4</p>
          {stageGrade?.safetyReviewRequired && <p role="alert" className="font-bold text-red-700 dark:text-red-300">安全上の判断・根拠を優先して復習してください。総得点でこの見落としを相殺しません。</p>}
          <ul className="space-y-2">{rubric[stepIndex].map(reason => <li key={reason.id}><strong>{reason.supports ? (reasons.includes(reason.id) ? '採用した支持理由' : '不足した支持理由') : (reasons.includes(reason.id) ? '採用した不適切な理由' : '採用しなかった不適切な理由')}：</strong>{reason.text}<br/>{reason.feedback}</li>)}</ul>
          {step.options[choice!].points !== 2 && <p>優先する選択：{step.options.find(opt => opt.points === 2)?.text}</p>}
          <p>追加情報：{step.reveal}</p>
          <button type="button" onClick={() => { if (stepIndex + 1 === current.steps.length) { trackEvent('case_training_complete', { placement: 'case_training', score, total: current.steps.length * 6 }); const result = { caseId: current.id, score, revision, answers, reasonAnswers, safetyReviewRequired: grades.some(grade => grade.safetyReviewRequired), answeredAt: new Date().toISOString() }; setEntry('case:' + current.id, result); setEntry('case:attempt-' + crypto.randomUUID(), result); } setStepIndex(stepIndex + 1); setChoice(null); setReasons([]); setChecked(false); }} className="rounded-lg bg-[#1E3D34] px-4 py-2 text-white">{stepIndex + 1 < current.steps.length ? 'この情報を使って次の判断へ' : '振り返りへ'}</button>
        </div>}
      </div> : <div className="space-y-3" aria-live="polite">
        <h3 className="font-bold">振り返り：{score} / {current.steps.length * 6} 点</h3>
        {grades.some(grade => grade.safetyReviewRequired) && <p role="alert" className="font-bold text-red-700 dark:text-red-300">安全上の判断・根拠に復習が必要です。</p>}
        <ul className="space-y-2 text-sm">{current.steps.map((s, i) => <li key={s.domain}><strong>{s.domain}：判断 {grades[i].decisionPoints} / 2 ・根拠 {grades[i].reasoningPoints} / 4</strong> — {s.options[answers[i]]?.feedback}{grades[i].missing.length > 0 && <p>補う理由：{grades[i].missing.map(reason => reason.text).join(' ／ ')}</p>}{grades[i].errors.length > 0 && <p>見直す理由：{grades[i].errors.map(reason => reason.text).join(' ／ ')}</p>}</li>)}</ul>
        <p className="text-xs">点数はこの症例での学習上の目安です。実際の患者の診断精度や臨床能力を測定した値ではありません。</p>
        <div className="flex flex-wrap gap-3 text-sm"><button type="button" className="underline" onClick={() => reset(caseIndex)}>もう一度練習</button><Link className="underline" href={`/curriculum/${current.lectureId}`}>関連講義へ</Link><Link className="underline" href="/kokushi#learning-review">復習・類題へ</Link></div>
      </div>}
      <details className="text-xs leading-relaxed"><summary className="cursor-pointer">症例の出典・学習上の前提</summary><p className="mt-2">本サイトの架空症例・オリジナル演習です。伝統的な分類と現代医学の診断を区別します。安全判断や研究の限界は次の資料を参照しています。改訂日：2026年10月2日。</p>{current.sources.map(s => <a key={s.url} className="block underline mt-1" href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>)}</details>
    </section>
  );
}
