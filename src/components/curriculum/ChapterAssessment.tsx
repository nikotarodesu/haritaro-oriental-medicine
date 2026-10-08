'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ChapterAssessmentData } from '@/data/curriculumAssessments';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningSync } from '@/contexts/LearningSyncContext';
import { shuffledIndices } from '@/utils/learningReview';
import { buildLearningReflectionHref, createLearningReflection, reflectionKey, resolveLearningReflectionSource } from '@/utils/learningReflection';

export default function ChapterAssessment({ assessment }: { assessment: ChapterAssessmentData }) {
  const { user } = useAuth();
  return <AssessmentWorkspace key={`${assessment.id}:${user?.id ?? 'guest'}`} assessment={assessment} />;
}

function AssessmentWorkspace({ assessment }: { assessment: ChapterAssessmentData }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const { ready, setEntry, status } = useLearningSync();
  const allAnswered = assessment.questions.every(q => answers[q.id] !== undefined);
  const score = assessment.questions.filter(q => answers[q.id] === q.correctIndex).length;
  const save = () => {
    try {
      const source = resolveLearningReflectionSource('lecture', assessment.lectureId);
      const note = createLearningReflection({ title: `${assessment.title}：章末の振り返り`, keyPoints: '', uncertainty: '', nextCheck: '', reasoning }, source, crypto.randomUUID(), new Date().toISOString());
      setEntry(reflectionKey(note.id), note);
      setSaved(true);
      setMessage(status === 'memory' ? 'このセッションのノートに追加しました。端末への保存が利用できないため、ページを閉じる前に文章を控えてください。' : '振り返りノートに追加しました。保存・同期状況はノート画面で確認できます。');
    } catch (error) { setMessage(error instanceof Error ? error.message : '保存できませんでした。文章を控えてから再度お試しください。'); }
  };
  return <section id="chapter-assessment" aria-labelledby="chapter-assessment-title" className="scroll-mt-28 space-y-5 rounded-2xl border border-[#C5DED4] bg-[#F6F8F3] p-4 dark:border-[#2A5243] dark:bg-[#182823] sm:p-6">
    <h2 id="chapter-assessment-title" className="text-xl font-bold">章全体の理解を確かめる：9問と記述演習</h2>
    <p className="text-base leading-relaxed">{assessment.title}の複数の講義を組み合わせて振り返ります。選択問題は全問回答後に解説を表示します。回答と点数はこのページでの練習用で、受講記録や技能認定には反映されません。</p>
    {assessment.questions.map((q, qi) => <fieldset key={q.id} className="min-w-0 space-y-3 rounded-xl bg-white p-4 dark:bg-[#121920]">
      <legend className="px-1 font-semibold leading-relaxed">{qi + 1}. {q.question}</legend>
      {shuffledIndices(q.options.length, q.id).map((index) => <label key={index} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-[#D5DED8] p-3 dark:border-[#2A3B4A]">
        <input type="radio" name={q.id} checked={answers[q.id] === index} disabled={submitted} onChange={() => setAnswers(previous => ({ ...previous, [q.id]: index }))} className="mt-1 h-4 w-4 shrink-0" />
        <span className="text-base leading-relaxed">{q.options[index]}</span>
      </label>)}
      {submitted && <div className="space-y-2 border-t pt-3 text-base leading-relaxed"><p className="font-bold">{answers[q.id] === q.correctIndex ? '正解' : 'もう一度確認'}：{q.options[q.correctIndex]}</p><p>{q.explanation}</p><Link href={q.href} className="inline-flex min-h-11 items-center underline underline-offset-4">根拠になる講義へ戻る</Link></div>}
    </fieldset>)}
    {!submitted ? <div><button type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)} className="min-h-11 rounded-xl bg-[#184F49] px-4 py-3 font-bold text-white disabled:opacity-50">採点と解説を表示</button><p className="mt-2 text-sm">回答済み：{Object.keys(answers).length} / 9問</p></div> : <div className="space-y-2"><p role="status" className="font-bold">9問中{score}問正解。迷った理由を講義で確かめましょう。</p><button type="button" className="min-h-11 underline" onClick={() => { setAnswers({}); setSubmitted(false); }}>選択問題をもう一度解く</button></div>}
    <div className="space-y-3 border-t border-[#C5DED4] pt-5">
      <h3 className="text-lg font-bold">判断と理由を書く</h3><p className="whitespace-pre-line text-base leading-relaxed">{assessment.writing.prompt}</p>
      <label htmlFor={`${assessment.id}-reasoning`} className="block font-semibold">自分の判断・根拠・不足情報（1,000文字まで）</label>
      <textarea id={`${assessment.id}-reasoning`} value={reasoning} maxLength={1000} rows={6} onChange={e => { setReasoning(e.target.value); setSaved(false); setMessage(''); }} className="w-full rounded-xl border border-[#C5DED4] bg-white p-3 text-base dark:border-[#2A5243] dark:bg-[#121920]" />
      <p className="text-sm">この入力欄は自動保存されません。残したい文章は下のボタンでノートに保存してください。</p>
      <details><summary className="min-h-11 cursor-pointer py-2 font-semibold">解答例と振り返りの観点を見る</summary><p className="mt-2 whitespace-pre-line leading-relaxed">{assessment.writing.example}</p><ul className="mt-3 list-disc space-y-2 pl-5">{assessment.writing.criteria.map(c => <li key={c}>{c}</li>)}</ul><p className="mt-3 text-sm">記述は自分で比べる演習です。自動採点・専門家による評価は行いません。</p></details>
      <button type="button" disabled={!ready || !reasoning.trim() || saved} onClick={save} className="min-h-11 rounded-xl bg-[#184F49] px-4 py-3 font-bold text-white disabled:opacity-50">振り返りノートに保存</button>
      {message && <p role="status" className="text-base">{message}</p>}
      <Link href={buildLearningReflectionHref({ type: 'lecture', id: assessment.lectureId })} className="ml-3 inline-flex min-h-11 items-center underline">振り返りノートを開く</Link>
    </div>
  </section>;
}
