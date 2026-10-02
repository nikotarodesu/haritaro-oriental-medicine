'use client';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';

export default function LearningPathLinks({ lectureId, caseId }: { lectureId: string; caseId: string }) {
  const links = [
    { href: `/curriculum/${lectureId}`, label: '1. 関連講義を読む', destination: 'lecture' },
    { href: `/curriculum/${lectureId}#interactive-quiz-container`, label: '2. 確認クイズを解く', destination: 'quiz' },
    { href: `/simulator?case=${caseId}#case-training`, label: '3. 症例で判断を練習', destination: 'case' },
  ];
  return <nav aria-label="この記事から進む学習" className="grid gap-2 sm:grid-cols-3 text-sm">{links.map(link => <Link key={link.destination} href={link.href} onClick={() => trackEvent('context_link_click', { placement: 'article_learning', lecture_id: lectureId, item_type: link.destination })} className="flex min-h-11 items-center rounded-xl bg-[#1E3D34] p-3 font-bold text-white">{link.label} →</Link>)}</nav>;
}
