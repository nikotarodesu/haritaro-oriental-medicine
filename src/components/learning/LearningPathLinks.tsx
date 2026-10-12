'use client';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';

export default function LearningPathLinks({ lectureId, caseId, lectureTitle, caseTitle }: { lectureId: string; caseId: string; lectureTitle?: string; caseTitle?: string }) {
  const links = [
    { href: `/curriculum/${lectureId}`, label: '1. 講義で確認する', description: lectureTitle, destination: 'lecture' },
    { href: `/curriculum/${lectureId}#interactive-quiz-container`, label: '2. 確認クイズを解く', description: 'この講義の理解を問題で確かめる', destination: 'quiz' },
    { href: `/simulator?case=${caseId}#case-training`, label: '3. 症例で理由を考える', description: caseTitle, destination: 'case' },
  ];
  return <nav aria-label="この記事から進む学習" className="grid gap-4 sm:grid-cols-3 text-base">{links.map(link => <div key={link.destination} className="min-w-0 space-y-2">
    {link.description && <p className="text-base leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">{link.description}</p>}
    <Link href={link.href} onClick={() => trackEvent('context_link_click', { placement: 'article_learning', lecture_id: lectureId, item_type: link.destination })} className={`flex min-h-11 items-center rounded-xl p-3 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 ${link.destination === 'lecture' ? 'bg-[#1E3D34] text-white' : 'border border-[#C5DED4] text-[#1E3D34] underline underline-offset-4 dark:border-[#2A5243] dark:text-[#83BEA8]'}`}>{link.label} →</Link>
  </div>)}</nav>;
}
