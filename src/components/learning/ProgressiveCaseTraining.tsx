'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';
import { PROGRESSIVE_CASES, type CaseStep } from '@/data/progressiveCases';
import { shuffledIndices } from '@/utils/learningReview';
import { CASE_REASONING_RUBRICS, type ReasonOption } from '@/data/caseReasoningRubrics';
import { gradeCaseReasoning } from '@/utils/caseReasoningScore';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { getCaseLearningNeeds, getCaseRevision, getCaseStageFocusIds, readCaseLearningRecords, type CaseLearningRecord } from '@/utils/learningFocus';
import { getLearningFocus, learningFocusLectureHref } from '@/data/learningFocus';
import { buildLearningReflectionHref } from '@/utils/learningReflection';

function CaseThinkingPanel({ step, stageIndex, before, choice, reasons, rubric, previous }: {
  step: CaseStep; stageIndex: number; before: string; choice: number; reasons: string[]; rubric: ReasonOption[]; previous: CaseLearningRecord | null;
}) {
  const grade = gradeCaseReasoning(step.options[choice].points, rubric, reasons);
  const priorChoice = previous?.answers[stageIndex];
  const priorGrade = previous && priorChoice !== undefined ? gradeCaseReasoning(step.options[priorChoice].points, rubric, previous.reasonAnswers[stageIndex]) : null;
  return <section aria-label="教材からたどる考え方" className="rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-4 dark:border-[#2A3B4A] dark:bg-[#121920]">
    <h4 className="font-serif text-lg font-bold">教材からたどる考え方</h4>
    <p className="mt-2 text-xs leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">この架空症例の情報と解説をたどります。著者の実臨床記録や、臨床能力の評価として示すものではありません。</p>
    <div className="mx-auto mt-4 max-w-lg" aria-hidden="true">
      <svg viewBox="0 0 300 40" className="h-10 w-full fill-none stroke-[#184F49] dark:stroke-[#9CCBBC]"><circle cx="50" cy="20" r="14" /><circle cx="150" cy="20" r="14" /><circle cx="250" cy="20" r="14" /><path d="M70 20h58m-6-5 6 5-6 5m48-5h58m-6-5 6 5-6 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div className="grid grid-cols-3 gap-2 text-center text-sm font-semibold"><span>情報を確かめる</span><span>理由を比べる</span><span>追加後を考える</span></div>
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <details open={stageIndex < 2} className="rounded-xl bg-white p-3 dark:bg-[#17212A]"><summary className="flex min-h-11 cursor-pointer items-center font-bold text-[#184F49] dark:text-[#9CCBBC]">判断の前に示された情報</summary><p className="mt-2 text-sm leading-relaxed">{before}</p></details>
      <div className="rounded-xl bg-[#EBF3EF] p-3 dark:bg-[#182823]"><p className="font-bold text-[#184F49] dark:text-[#9CCBBC]">回答後に加わった情報</p><p className="mt-2 text-sm leading-relaxed">{step.reveal}</p></div>
    </div>
    <div className="mt-4 space-y-3 text-sm leading-relaxed">
      <div><p className="font-semibold">今回選んだ判断</p><p>{step.options[choice].text}</p><p className="mt-1 text-[#59615D] dark:text-[#B7C5CF]">教材の解説：{step.options[choice].feedback}</p></div>
      <div><p className="font-semibold">今回選んだ理由</p><ul className="mt-1 space-y-1">{rubric.filter(reason => reasons.includes(reason.id)).map(reason => <li key={reason.id}>・{reason.text}</li>)}</ul></div>
      <p className="rounded-lg border-l-2 border-[#C5DED4] bg-white p-3 dark:border-[#83BEA8] dark:bg-[#17212A]">追加情報を踏まえ、次の段階で何を確認するか考えます。最後の段階では、今回の判断と未確認事項を振り返ります。</p>
    </div>
    {previous && priorGrade && priorChoice !== undefined && <details className="mt-4 rounded-xl border border-[#D9E3DD] p-3 text-sm dark:border-[#2A3B4A]">
      <summary className="flex min-h-11 cursor-pointer items-center font-bold">前回の判断・理由と比べる</summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-2"><div><p className="font-bold">前回：判断 {priorGrade.decisionPoints}/2・根拠 {priorGrade.reasoningPoints}/4</p><p className="mt-2 leading-relaxed">{step.options[priorChoice].text}</p><ul className="mt-2 space-y-1">{rubric.filter(reason => previous.reasonAnswers[stageIndex].includes(reason.id)).map(reason => <li key={reason.id}>・{reason.text}</li>)}</ul></div><div><p className="font-bold">今回：判断 {grade.decisionPoints}/2・根拠 {grade.reasoningPoints}/4</p><p className="mt-2 leading-relaxed">{step.options[choice].text}</p><p className="mt-2">前回の不足した理由：{priorGrade.missing.length ? priorGrade.missing.map(reason => reason.text).join(' ／ ') : 'なし'}</p><p className="mt-2">前回の見直したい理由：{priorGrade.errors.length ? priorGrade.errors.map(reason => reason.text).join(' ／ ') : 'なし'}</p></div></div>
      <p className="mt-3 text-xs text-[#59615D] dark:text-[#B7C5CF]">同じ教材の再挑戦です。点数の差だけから、実際の診断精度や別症例への理解を判断しません。</p>
    </details>}
  </section>;
}

export default function ProgressiveCaseTraining() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [reasonAnswers, setReasonAnswers] = useState<Record<number, string[]>>({});
  const [reasons, setReasons] = useState<string[]>([]);
  const { setEntry, values, ready } = useLearningSync();
  const [attemptActive, setAttemptActive] = useState(false);
  const [baseline, setBaseline] = useState<CaseLearningRecord | null>(null);
  const [finishedRecord, setFinishedRecord] = useState<CaseLearningRecord | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [seed, setSeed] = useState('case-training');
  const started = useRef(false);
  useEffect(() => {
    const restoreCase = () => {
      const id = new URLSearchParams(window.location.search).get('case');
      const selected = PROGRESSIVE_CASES.findIndex(item => item.id === id);
      if (selected >= 0) { setCaseIndex(selected); setAnswers({}); setReasonAnswers({}); setReasons([]); setStepIndex(0); setChoice(null); setChecked(false); setAttemptActive(false); setBaseline(null); setFinishedRecord(null); started.current = false; }
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
  const revision = getCaseRevision(current.id)!;
  const latestRecord = ready ? readCaseLearningRecords(values, current.id).at(-1) || null : null;
  const previous = attemptActive ? baseline : latestRecord;
  const focusIds = step && choice !== null ? getCaseStageFocusIds(current.id, stepIndex, step.options[choice].points, reasons) : [];
  const completedNeeds = finishedRecord ? getCaseLearningNeeds({ ['case:' + current.id]: finishedRecord }) : [];
  const reset = (next: number) => { started.current = false; setCaseIndex(next); setAnswers({}); setReasonAnswers({}); setReasons([]); setStepIndex(0); setChoice(null); setChecked(false); setAttemptActive(false); setBaseline(null); setFinishedRecord(null); setSeed(prev => `${prev}-retry`); };
  return (
    <section id="case-training" className="scroll-mt-24 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-4 text-[#232826] dark:text-[#FAF8F5]">
      <h2 className="font-serif text-xl font-bold">段階的な症例演習</h2>
      <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">判断だけでなく、その理由も選びます。各段階は判断0〜2点、根拠0〜4点。支持する理由の選択に加点し、不適切な理由の選択を減点します。安全上の見落としは総得点と別に表示します。</p>
      {previous && <p className="text-sm">前回の学習記録：{previous.score} / {current.steps.length * 6} 点 <time dateTime={previous.answeredAt} className="ml-2 text-xs">{new Date(previous.answeredAt).toLocaleDateString('ja-JP')}</time></p>}
      {previous && getCaseLearningNeeds({ ['case:' + current.id]: previous }).length > 0 && <details className="rounded-xl bg-[#F6F4EE] p-3 text-sm dark:bg-[#1E2B36]"><summary className="flex min-h-11 cursor-pointer items-center font-bold">前回、確認し直したい観点</summary><ul className="mt-2 space-y-2">{getCaseLearningNeeds({ ['case:' + current.id]: previous }).map(need => <li key={need.focusId}><Link href={need.href} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC]">{need.title} →</Link><p className="leading-relaxed">{need.reason}</p></li>)}</ul></details>}
      <div className="flex flex-wrap gap-2">{PROGRESSIVE_CASES.map((c, i) => <button key={c.id} type="button" aria-pressed={caseIndex === i} onClick={() => reset(i)} className={`min-h-11 rounded-lg border p-2 text-sm ${i === caseIndex ? 'bg-[#1E3D34] text-white border-[#1E3D34]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{c.title}</button>)}</div>
      <p className="rounded-xl bg-[#FAF8F5] dark:bg-[#121920] p-4 text-sm leading-relaxed">{current.presentation}</p>
      {current.steps.slice(0, stepIndex).map((s, i) => <p key={i} className="border-l-2 border-[#C5DED4] pl-3 text-sm leading-relaxed">追加情報：{s.reveal}</p>)}
      {step ? <div className="space-y-3">
        <p className="text-xs">ステップ {stepIndex + 1} / {current.steps.length} ｜ {step.domain}</p>
        <h3 className="text-base font-bold">{step.question}</h3>
        <div className="space-y-2">{shuffledIndices(step.options.length, `${seed}-${current.id}-${stepIndex}`).map((original, display) => <button key={original} type="button" disabled={!ready || checked} aria-pressed={choice === original} onClick={() => { if (!started.current) { setBaseline(latestRecord); setAttemptActive(true); trackEvent('case_training_start', { placement: 'case_training', total: current.steps.length }); started.current = true; } setChoice(original); }} className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed disabled:opacity-60 ${choice === original ? 'border-[#1E3D34] bg-[#EBF3EF] dark:bg-[#182823]' : 'border-[#E5DEC9] dark:border-[#2A3B4A]'}`}>{display + 1}. {step.options[original].text}</button>)}</div>
        <fieldset disabled={checked} className="space-y-2"><legend className="font-bold text-sm mb-2">この判断で採用する理由（複数選択）</legend>{shuffledIndices(rubric[stepIndex].length, `${seed}-reasons-${current.id}-${stepIndex}`).map(index => { const reason = rubric[stepIndex][index]; return <label key={reason.id} className="flex items-start gap-3 rounded-lg border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 text-sm"><input type="checkbox" checked={reasons.includes(reason.id)} onChange={event => setReasons(previous => event.target.checked ? [...previous, reason.id] : previous.filter(id => id !== reason.id))} className="mt-1 size-4 shrink-0"/><span>{reason.text}</span></label>; })}</fieldset>
        {!checked ? <button type="button" disabled={choice === null || !reasons.length} onClick={() => { if (choice !== null && !checked) { trackEvent('case_stage_complete', { placement: 'case_training', total: stepIndex + 1 }); setAnswers(prev => ({ ...prev, [stepIndex]: choice })); setReasonAnswers(prev => ({ ...prev, [stepIndex]: reasons })); setChecked(true); } }} className="rounded-lg bg-[#1E3D34] px-4 py-2 text-white text-sm disabled:opacity-40">判断・根拠と解説を確認</button> : <div className="rounded-xl bg-[#EBF3EF] dark:bg-[#182823] p-4 space-y-3 text-sm" aria-live="polite">
          <p className="font-bold">{step.options[choice!].points === 2 ? 'この症例で優先したい判断です。' : step.options[choice!].points === 1 ? '追加確認が必要な判断です。' : '判断の根拠を見直しましょう。'}</p>
          <CaseThinkingPanel step={step} stageIndex={stepIndex} before={[current.presentation, ...current.steps.slice(0, stepIndex).map(stage => stage.reveal)].join(' ')} choice={choice!} reasons={reasons} rubric={rubric[stepIndex]} previous={previous} />
          <p className="font-bold">判断 {stageGrade?.decisionPoints} / 2 ／ 根拠 {stageGrade?.reasoningPoints} / 4</p>
          {stageGrade?.safetyReviewRequired && <p role="alert" className="font-bold text-red-700 dark:text-red-300">安全上の判断・根拠を優先して復習してください。総得点でこの見落としを相殺しません。</p>}
          <details className="rounded-xl border border-[#D9E3DD] p-3 dark:border-[#2A3B4A]"><summary className="flex min-h-11 cursor-pointer items-center font-semibold">理由ごとの解説を読む</summary><ul className="mt-3 space-y-3">{rubric[stepIndex].map(reason => <li key={reason.id}><strong>{reason.supports ? (reasons.includes(reason.id) ? '採用した支持理由' : '不足した支持理由') : (reasons.includes(reason.id) ? '採用した不適切な理由' : '採用しなかった不適切な理由')}：</strong>{reason.text}<br/>{reason.feedback}</li>)}</ul></details>
          {step.options[choice!].points !== 2 && <p>優先する選択：{step.options.find(opt => opt.points === 2)?.text}</p>}
          {focusIds.length > 0 && <div className="rounded-xl bg-white p-3 dark:bg-[#17212A]"><p className="font-bold">この段階から、読み直す観点</p><ul className="mt-2 space-y-2">{focusIds.map(id => { const focus = getLearningFocus(id)!; return <li key={id}><Link href={learningFocusLectureHref(focus)} onClick={() => trackEvent('context_link_click', { placement: 'case_stage_focus', lecture_id: focus.lectureId })} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC]">{focus.title} →</Link><p className="text-sm leading-relaxed">{focus.check}</p></li>; })}</ul></div>}
          <button type="button" disabled={!ready} onClick={() => { if (stepIndex + 1 === current.steps.length) { trackEvent('case_training_complete', { placement: 'case_training', score, total: current.steps.length * 6 }); const result: CaseLearningRecord = { caseId: current.id, score, revision, answers, reasonAnswers, safetyReviewRequired: grades.some(grade => grade.safetyReviewRequired), answeredAt: new Date().toISOString() }; setFinishedRecord(result); setEntry('case:' + current.id, result); setEntry('case:attempt-' + crypto.randomUUID(), result); } setStepIndex(stepIndex + 1); setChoice(null); setReasons([]); setChecked(false); }} className="min-h-11 rounded-lg bg-[#1E3D34] px-4 py-2 text-white disabled:opacity-60">{stepIndex + 1 < current.steps.length ? 'この情報を使って次の判断へ' : '振り返りへ'}</button>
        </div>}
      </div> : <div className="space-y-3" aria-live="polite">
        <h3 className="font-bold">振り返り：{score} / {current.steps.length * 6} 点</h3>
        {previous && <p className="text-sm">前回 {previous.score}点 → 今回 {score}点。同じ症例の学習記録として比較しています。</p>}
        {previous && <details className="rounded-xl border border-[#D9E3DD] p-3 text-sm dark:border-[#2A3B4A]"><summary className="flex min-h-11 cursor-pointer items-center font-bold">各段階の判断・理由を前回と比べる</summary><ol className="mt-3 space-y-3">{current.steps.map((stage, i) => {
          const priorGrade = gradeCaseReasoning(stage.options[previous.answers[i]].points, rubric[i], previous.reasonAnswers[i]);
          const chosenReasons = rubric[i].filter(reason => reasonAnswers[i]?.includes(reason.id));
          return <li key={stage.domain} className="rounded-xl bg-[#F6F4EE] p-3 dark:bg-[#1E2B36]"><h4 className="font-bold">{i + 1}. {stage.domain}</h4><p className="mt-2">判断：前回 {priorGrade.decisionPoints}/2 → 今回 {grades[i].decisionPoints}/2<br />根拠：前回 {priorGrade.reasoningPoints}/4 → 今回 {grades[i].reasoningPoints}/4</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><div><p className="font-semibold">前回の判断・理由</p><p className="mt-1 leading-relaxed">{stage.options[previous.answers[i]].text}</p><ul className="mt-2 space-y-1">{rubric[i].filter(reason => previous.reasonAnswers[i].includes(reason.id)).map(reason => <li key={reason.id}>・{reason.text}</li>)}</ul></div><div><p className="font-semibold">今回の判断・理由</p><p className="mt-1 leading-relaxed">{stage.options[answers[i]].text}</p><ul className="mt-2 space-y-1">{chosenReasons.map(reason => <li key={reason.id}>・{reason.text}</li>)}</ul></div></div></li>;
        })}</ol></details>}
        {grades.some(grade => grade.safetyReviewRequired) && <p role="alert" className="font-bold text-red-700 dark:text-red-300">安全上の判断・根拠に復習が必要です。</p>}
        <ul className="space-y-2 text-sm">{current.steps.map((s, i) => <li key={s.domain}><strong>{s.domain}：判断 {grades[i].decisionPoints} / 2 ・根拠 {grades[i].reasoningPoints} / 4</strong> — {s.options[answers[i]]?.feedback}{grades[i].missing.length > 0 && <p>補う理由：{grades[i].missing.map(reason => reason.text).join(' ／ ')}</p>}{grades[i].errors.length > 0 && <p>見直す理由：{grades[i].errors.map(reason => reason.text).join(' ／ ')}</p>}</li>)}</ul>
        <p className="text-xs">点数はこの症例での学習上の目安です。実際の患者の診断精度や臨床能力を測定した値ではありません。</p>
        {completedNeeds.length > 0 && <section className="rounded-xl bg-[#F6F4EE] p-4 dark:bg-[#1E2B36]"><h4 className="font-bold">次に確かめたいこと</h4><ul className="mt-3 space-y-3">{completedNeeds.map(need => <li key={need.focusId}><p className="font-semibold">{need.title}</p><p className="mt-1 text-sm leading-relaxed">{need.reason}</p><Link href={need.href} onClick={() => trackEvent('context_link_click', { placement: 'case_focus_review', item_type: 'review' })} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC]">解説と関連する既存問題へ →</Link></li>)}</ul></section>}
        <Link href={buildLearningReflectionHref({ type: 'case', id: current.id })} className="inline-flex min-h-11 items-center rounded-xl bg-[#184F49] px-4 py-2 font-semibold text-white dark:bg-[#285F54]">判断の理由を学習ノートに残す →</Link>
        <div className="flex flex-wrap gap-3 text-sm"><button type="button" className="underline" onClick={() => reset(caseIndex)}>もう一度練習</button><Link className="underline" href={`/curriculum/${current.lectureId}`}>関連講義へ</Link><Link className="underline" href="/kokushi#learning-review">復習・類題へ</Link></div>
      </div>}
      <details className="text-xs leading-relaxed"><summary className="cursor-pointer">症例の出典・学習上の前提</summary><p className="mt-2">本サイトの架空症例・オリジナル演習です。伝統的な分類と現代医学の診断を区別します。安全判断や研究の限界は次の資料を参照しています。改訂日：2026年10月2日。</p>{current.sources.map(s => <a key={s.url} className="block underline mt-1" href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>)}</details>
    </section>
  );
}
