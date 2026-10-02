'use client';

import { trackEvent } from '@/utils/analytics';
import { useState } from 'react';
import Link from 'next/link';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { LEARNING_QUESTIONS, LearningQuestion } from '@/data/learningQuestionBank';
import { localStudyDate, shuffledIndices } from '@/utils/learningReview';
import QuestionEvidence from './QuestionEvidence';
import { recordAnswerInStore } from '@/data/tsubo/studyStorage';
import type { StudySkillType } from '@/data/tsubo/types';

export default function LearningReviewPanel() {
  const { quizResults, saveQuizResult, lastVisitedLectureId, revisedQuestionCount, isMounted } = useCurriculumProgress();
  const [queue, setQueue] = useState<LearningQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionSeed, setSessionSeed] = useState('review');
  const today = localStudyDate();
  const acupointQuestions: LearningQuestion[] = Object.values(quizResults).filter(r => r.kind === 'acupoint').map(r => ({
    id: r.questionId, question: r.questionText, options: r.options, correctIndex: r.correctAnswerIndex,
    explanation: r.explanation, lectureId: r.lectureId, lectureTitle: r.lectureTitle,
    chapterId: r.chapterId, chapterTitle: r.chapterTitle, kind: 'acupoint',
    href: r.practiceHref || '/tsubo/practice', revision: r.revision || '',
  }));
  const bank = [...LEARNING_QUESTIONS, ...acupointQuestions];
  const due = bank.filter(q => quizResults[q.id]?.nextReviewDate && quizResults[q.id].nextReviewDate! <= today)
    .sort((a, b) => (quizResults[a.id].nextReviewDate || '').localeCompare(quizResults[b.id].nextReviewDate || ''));
  const weak = bank.filter(q => quizResults[q.id] && !quizResults[q.id].isCorrect);
  const unlearned = LEARNING_QUESTIONS.filter(q => !quizResults[q.id]);
  const q = queue[index];
  const start = (questions: LearningQuestion[]) => {
    if (!questions.length) return;
    trackEvent('review_start', { placement: 'learning_review', total: questions.length });
    setSessionCorrect(0);
    setQueue(questions); setIndex(0); setChoice(null); setSubmitted(false); setSessionSeed(String(Date.now()));
  };
  const answer = () => {
    if (!q || choice === null || submitted) return;
    saveQuizResult({ questionId: q.id, lectureId: q.lectureId, lectureTitle: q.lectureTitle,
      chapterId: q.chapterId, chapterTitle: q.chapterTitle, questionText: q.question,
      userAnswerIndex: choice, correctAnswerIndex: q.correctIndex, isCorrect: choice === q.correctIndex,
      options: [...q.options], explanation: q.explanation, answeredAt: new Date().toISOString(),
      revision: q.revision, kind: q.kind, practiceHref: q.href });
    if (q.kind === 'acupoint') {
      const [, code, skill] = q.id.split('-');
      recordAnswerInStore({ id: q.id, acupointCode: code, skill: skill as StudySkillType,
        prompt: q.question, options: q.options.map((text, i) => ({ id: String(i), text })),
        correctOptionId: String(q.correctIndex), explanation: q.explanation,
        meridianName: '', locationReference: '' }, String(choice), choice === q.correctIndex, today);
    }
    if (choice === q.correctIndex) setSessionCorrect(count => count + 1);
    setSubmitted(true);
  };
  const similar = q && LEARNING_QUESTIONS.find(other => other.id !== q.id && other.lectureId === q.lectureId);
  return (
    <section id="learning-review" className="scroll-mt-24 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-4 sm:p-6 space-y-4 print:hidden">
      <h2 className="font-serif text-lg font-bold text-[#1E3D34] dark:text-[#83BEA8]">今日の学習</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <button type="button" disabled={!isMounted} onClick={() => start(due.length ? due.slice(0, 10) : unlearned.slice(0, 3))} className="min-h-11 rounded-xl bg-[#1E3D34] text-white p-3 text-left disabled:opacity-50">今日の復習：{isMounted ? due.length : '…'}問<br /><span className="text-xs">{due.length ? '予定日が来た問題を確認' : '未回答の問題から始める'}</span></button>
        <Link href={lastVisitedLectureId ? `/curriculum/${lastVisitedLectureId}` : '/curriculum/lecture-yinyang-1'} className="rounded-xl bg-white dark:bg-[#17212A] p-3 text-[#1E3D34] dark:text-[#83BEA8]">前回の続き<br /><span className="text-xs">講義を読み、理解度を確認</span></Link>
        <button type="button" disabled={!isMounted || !weak.length} onClick={() => start(weak)} className="rounded-xl bg-white dark:bg-[#17212A] p-3 text-left text-[#1E3D34] dark:text-[#83BEA8] disabled:opacity-50">苦手分野：{isMounted ? weak.length : '…'}問<br /><span className="text-xs">講義・国試演習・経穴を横断</span></button>
      </div>
      <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">正解を別の日に確認できた回数に応じ、1・3・7・14・30日後に復習します。同日の再挑戦は練習として記録し、復習間隔を延ばしません。学習履歴はこのブラウザに保存されます。</p>
      {isMounted && revisedQuestionCount > 0 && <p className="text-xs font-semibold text-[#B86924] dark:text-[#E6C387]">{revisedQuestionCount}問に旧形式・改訂前の回答があります。旧回答を採点に使わず、再確認の対象にしています。</p>}
      <Link href="/simulator#case-training" className="inline-block text-sm font-semibold underline text-[#1E3D34] dark:text-[#83BEA8]">症例で判断の根拠を練習する →</Link>
      {queue.length > 0 && !q && <p role="status" className="text-sm font-bold">今回の復習が完了しました。次の予定日にもう一度確認しましょう。</p>}
      {q && <div className="rounded-xl bg-white dark:bg-[#17212A] p-4 space-y-3 text-sm text-[#232826] dark:text-[#FAF8F5]">
        <p className="text-xs">{index + 1} / {queue.length} ｜ {q.chapterTitle}</p>
        <h3 className="font-bold whitespace-pre-line">{q.question}</h3>
        <div className="space-y-2">{shuffledIndices(q.options.length, `${sessionSeed}-${q.id}`).map((original, display) => <button key={original} type="button" disabled={submitted} aria-pressed={choice === original} onClick={() => setChoice(original)} className={`block w-full rounded-lg border p-3 text-left ${choice === original ? 'border-[#1E3D34] bg-[#EBF3EF] dark:bg-[#182823]' : 'border-[#E8E1D1] dark:border-[#263542]'}`}>
          {display + 1}. {q.options[original]}
        </button>)}</div>
        {!submitted ? <button type="button" onClick={answer} disabled={choice === null} className="rounded-lg bg-[#1E3D34] text-white px-4 py-2 disabled:opacity-40">回答を確定</button> : <div className="space-y-3">
          <p role="status" className="font-bold">{choice === q.correctIndex ? '正解です。' : '解説で確認しましょう。'} 正解：{q.options[q.correctIndex]}</p>
          <p className="whitespace-pre-line leading-relaxed">{q.explanation}</p>
          <p className="text-xs">次回復習：{quizResults[q.id]?.nextReviewDate}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="underline" href={`/curriculum/${q.lectureId}?review=${encodeURIComponent(q.id)}`}>要点と関連講義を読む</Link>
            {similar && <button type="button" className="underline" onClick={() => start([similar])}>同じテーマの類題で確認</button>}
            <Link className="underline" href="/simulator#case-training">症例演習へ</Link>
          </div>
          <button type="button" onClick={() => { if (index + 1 === queue.length) trackEvent('review_complete', { placement: 'learning_review', score: sessionCorrect, total: queue.length }); setIndex(index + 1); setChoice(null); setSubmitted(false); }} className="rounded-lg bg-[#1E3D34] text-white px-4 py-2">{index + 1 < queue.length ? '次の問題へ' : '復習を完了する'}</button>
          <QuestionEvidence lectureId={q.lectureId} revision={q.revision} />
        </div>}
      </div>}
    </section>
  );
}
