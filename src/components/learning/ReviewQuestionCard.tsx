'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LEARNING_QUESTION_MAP } from '@/data/learningQuestionBank';

export default function ReviewQuestionCard({ lectureId }: { lectureId: string }) {
  const params = useSearchParams();
  const id = params.get('review');
  const question = id ? LEARNING_QUESTION_MAP.get(id) : undefined;
  if (!question || question.lectureId !== lectureId) return null;
  return (
    <section className="rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 p-4 sm:p-6 space-y-3 text-sm text-[#232826] dark:text-[#FAF8F5]">
      <h2 className="font-bold">この問題の要点を復習</h2>
      <p className="font-semibold whitespace-pre-line">{question.question}</p>
      <p className="leading-relaxed whitespace-pre-line">{question.explanation}</p>
      <div className="flex flex-wrap gap-4 font-semibold">
        <a className="underline" href="#interactive-quiz-container">講義の類題で確認</a>
        <Link className="underline" href="/kokushi#learning-review">復習問題に戻る</Link>
        <Link className="underline" href="/simulator#case-training">症例で判断を練習</Link>
      </div>
      <p className="text-xs">以下の講義本文で背景と関連事項を確認できます。</p>
    </section>
  );
}
