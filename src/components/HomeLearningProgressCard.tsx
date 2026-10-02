'use client';
import Link from 'next/link';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { CURRICULUM_DATA } from '@/data/curriculumData';
import { localStudyDate } from '@/utils/learningReview';
import { trackEvent } from '@/utils/analytics';
import { useRecentTools } from '@/components/home/RecentTools';

const LECTURES = CURRICULUM_DATA.flatMap(chapter => chapter.lectures);
const IDS = LECTURES.map(lecture => lecture.id);
export default function HomeLearningProgressCard() {
  const { isMounted, totalCompleted, totalPercentage, lastVisitedLectureId, quizResults, getNextResumeLectureId } = useCurriculumProgress();
  const recentTools = useRecentTools();
  const started = isMounted && Boolean(lastVisitedLectureId || totalCompleted || Object.keys(quizResults).length);
  const resume = LECTURES.find(lecture => lecture.id === getNextResumeLectureId(IDS)) || LECTURES[0];
  const due = Object.values(quizResults).filter(result => result.nextReviewDate && result.nextReviewDate <= localStudyDate()).length;
  const weak = Object.values(quizResults).filter(result => !result.isCorrect).length;
  return (
    <section aria-label="あなたの学習と最近のツール" className="rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] bg-[#EBF3EF] dark:bg-[#182823] p-4 sm:p-6 text-[#1E3D34] dark:text-[#83BEA8] space-y-3">
      <h2 className="font-serif text-lg font-bold">{started ? '今日の学習を再開する' : 'はじめてなら、最初の10分から'}</h2>
      <p className="text-sm leading-relaxed">{started ? totalCompleted + ' / ' + LECTURES.length + '講義完了（' + totalPercentage + '％）。前回の続き、または復習から進めましょう。' : '陰陽の基本を読み、確認クイズで理解を確かめます。学習履歴はこのブラウザに保存されます。'}</p>
      <div className="grid gap-2 sm:grid-cols-3 text-sm">
        <Link onClick={() => trackEvent('context_link_click', { placement: 'learning_start', lecture_id: resume.id })} href={'/curriculum/' + resume.id} className="min-h-11 rounded-xl bg-[#1E3D34] p-3 text-white font-bold">{started ? '前回の続き' : '第1講を始める'} →<span className="block mt-1 text-xs font-normal">{resume.title}</span></Link>
        <Link onClick={() => trackEvent('context_link_click', { placement: 'learning_review' })} href="/kokushi#learning-review" className="min-h-11 rounded-xl bg-white dark:bg-[#17212A] p-3 font-bold">今日の復習：{isMounted ? due : '…'}問<span className="block mt-1 text-xs font-normal">苦手分野 {isMounted ? weak : '…'}問も確認</span></Link>
        <Link href="/simulator#case-training" className="min-h-11 rounded-xl bg-white dark:bg-[#17212A] p-3 font-bold">症例で判断を練習<span className="block mt-1 text-xs font-normal">追加質問・安全判断・判断根拠</span></Link>
      </div>
      {recentTools.length > 0 && <nav aria-label="最近使ったツール" className="flex flex-wrap items-center gap-2 text-xs"><span>最近使ったツール：</span>{recentTools.map(tool => <Link key={tool.href} href={tool.href} className="inline-flex min-h-11 items-center rounded-lg border border-[#C5DED4] dark:border-[#2A5243] px-3 underline">{tool.title}</Link>)}</nav>}
    </section>
  );
}
