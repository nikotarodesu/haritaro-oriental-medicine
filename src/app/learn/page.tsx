import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { LEARNING_COURSES } from '@/data/learningCourses';
import { getCurriculumIndexCatalog } from '@/data/curriculumIndexCatalog';
import { CURRICULUM_TOTAL_CHAPTERS, CURRICULUM_TOTAL_LESSONS, FIRST_CURRICULUM_LECTURE_ID } from '@/data/curriculumOutline';
import HomeLearningProgressCard from '@/components/HomeLearningProgressCard';
import ContentNavigationLink from '@/components/learning/ContentNavigationLink';
import { createCourseLectureHref } from '@/utils/courseJourney';
import { getCourseReadingMinutes } from '@/utils/courseReadingTime';

const pageTitle = '東洋医学を概論から学ぶ｜初学者・鍼灸学生';
const pageDescription = `概論から陰陽・気血津液・臓腑・経絡へ。全${CURRICULUM_TOTAL_CHAPTERS}章${CURRICULUM_TOTAL_LESSONS}講と${LEARNING_COURSES.length}の短い基礎コースで、用語の意味を学び、クイズや架空の相談記録で、所見と判断の理由を確かめます。`;
export const metadata: Metadata = {
  title: pageTitle, description: pageDescription,
  alternates: { canonical: 'https://www.haritaro.jp/learn' },
  ...pageSocialMetadata(`${pageTitle} | ${SITE_NAME}`, pageDescription, '/learn'),
};

const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';

export default function LearnGuidePage() {
  const catalog = getCurriculumIndexCatalog();
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-3xl space-y-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]"><GraduationCap aria-hidden="true" className="h-5 w-5" />初学者・鍼灸学生のための学習案内</p>
        <h1 className="font-serif text-3xl font-bold leading-relaxed sm:text-4xl">東洋医学は、どの順番で学ぶ？</h1>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">初めての方は、概論の第1講へ。用語の意味を読み、各講のクイズで確かめます。学習済みの方は、保存した続きから再開できます。</p>
        <ContentNavigationLink href={createCourseLectureHref(LEARNING_COURSES[0].slug, FIRST_CURRICULUM_LECTURE_ID)} placement="learn_intro_start" className={`inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 font-bold text-white dark:bg-[#285F54] ${focusClass}`}>初めての方：第1講から始める<ArrowRight aria-hidden="true" className="h-4 w-4" /></ContentNavigationLink>
      </header>
      <HomeLearningProgressCard />

      <section aria-labelledby="learn-courses-heading" className="space-y-4">
        <h2 id="learn-courses-heading" className="font-serif text-2xl font-bold">全{LEARNING_COURSES.length}コースの学習順</h2>
        <p className="leading-relaxed ui-muted">各コースは基本を扱う3〜5講と短い例の演習です。読む目安は講義の合計で、クイズ・演習の時間は含みません。</p>
        <ol className="divide-y divide-[#D9E3DD] border-y border-[#D9E3DD] dark:divide-[#2A3B4A] dark:border-[#2A3B4A]">
          {LEARNING_COURSES.map((course, index) => <li key={course.slug}>
            <ContentNavigationLink href={`/learn/courses/${course.slug}`} courseId={course.slug} placement="learn_course_select" className={`flex min-h-16 items-center gap-3 rounded-lg px-2 py-3 hover:bg-[#EBF3EF] dark:hover:bg-[#182823] ${focusClass}`}>
              <span aria-hidden="true" className="w-7 shrink-0 text-sm tabular-nums ui-muted">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-[#184F49] dark:text-[#9CCBBC]">{course.title}</span><span className="mt-1 block text-sm ui-muted">{course.steps.length}講 · 読む目安：約{getCourseReadingMinutes(course, catalog.lectures)}分</span></span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </ContentNavigationLink>
          </li>)}
        </ol>
        <p className="text-sm leading-relaxed ui-muted">各論まで詳しく読む方は、<Link href="/curriculum" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>全{catalog.chapters.length}章・{catalog.lectures.length}講の目次</Link>へ。講義の受講記録は共通です。短いコースと章全体の完了は、それぞれ確認できます。</p>
      </section>

      <section aria-labelledby="learn-review-scope" className="space-y-3 rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-5 dark:border-[#2A5243] dark:bg-[#182823]"><h2 id="learn-review-scope" className="text-lg font-bold">教材の用途と確認範囲</h2><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">伝統理論と医学的な評価を区別して学びます。全教材の医学記述の照合・専門家監修は未完了です。未確認の刺鍼深度・角度・針路などの個別手順は掲載を保留しています。Web学習の受講完了は、実際の施術能力の認定を意味しません。</p><Link href="/editorial-policy" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>出典と確認範囲を見る →</Link></section>

      <nav aria-label="復習と用語の確認" className="flex flex-wrap gap-x-6 gap-y-1">{[{ href: '/kokushi#learning-review', label: '今日の復習' }, { href: '/tsubo/practice', label: '経穴の基本演習' }, { href: '/glossary', label: '用語集' }, { href: '/learn/courses/pathomechanism-foundations#concept-comparison', label: '病因・病機・症状・証を比べる' }].map(link => <Link key={link.href} href={link.href} className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 dark:text-[#9CCBBC] ${focusClass}`}>{link.label}</Link>)}</nav>
    </div>
  );
}
