import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { LEARNING_COURSES } from '@/data/learningCourses';
import { getCurriculumIndexCatalog } from '@/data/curriculumIndexCatalog';
import { CURRICULUM_TOTAL_CHAPTERS, CURRICULUM_TOTAL_LESSONS, FIRST_CURRICULUM_LECTURE_ID } from '@/data/curriculumOutline';
import HomeLearningProgressCard from '@/components/HomeLearningProgressCard';
import { LearningMap } from '@/components/LearningMap';
import LearningCourseCards from '@/components/learning/LearningCourseCards';
import LearningCourseJourney from '@/components/learning/LearningCourseJourney';
import LearningDiscovery from '@/components/learning/LearningDiscovery';
import CourseMiniCase from '@/components/learning/CourseMiniCase';
import ContentNavigationLink from '@/components/learning/ContentNavigationLink';
import PrimeStudentCard from '@/components/PrimeStudentCard';

const pageTitle = '東洋医学を概論から学ぶ｜初学者・鍼灸学生';
const pageDescription = `概論から陰陽・気血津液・臓腑・経絡へ。全${CURRICULUM_TOTAL_CHAPTERS}章${CURRICULUM_TOTAL_LESSONS}講と${LEARNING_COURSES.length}の短い基礎コースで、観察・理論・短い例の振り返りを通じて臨床の基礎を学びます。`;
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
        <h1 className="font-serif text-3xl font-bold leading-relaxed sm:text-4xl">まず、東洋医学の全体像を知る。</h1>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">何を学び、何のために使うのか。4つの概論から始め、基本用語、身体の働き、関係モデル、臨床の基礎へ進みます。短い例では、観察したこととまだ分からないことを分ける練習から始めます。</p>
        <div className="flex flex-wrap gap-3"><ContentNavigationLink href="/learn/courses/oriental-medicine-introduction" placement="learn_intro_start" className={`inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 font-bold text-white dark:bg-[#285F54] ${focusClass}`}>4講の概論から始める<ArrowRight aria-hidden="true" className="h-4 w-4" /></ContentNavigationLink><Link href={`/curriculum/${FIRST_CURRICULUM_LECTURE_ID}`} className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>概論の第1講を開く</Link></div>
      </header>
      <HomeLearningProgressCard />

      <section aria-labelledby="learn-routes-heading" className="space-y-5">
        <h2 id="learn-routes-heading" className="font-serif text-2xl font-bold">短く見渡す、詳しく学ぶ。</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-5 dark:border-[#2A5243] dark:bg-[#182823]"><h3 className="text-xl font-bold">3〜5講の基礎コース</h3><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">各章の入口になる講義を選び、全体像をつかみます。概論から順に進め、短い例で一つずつ考えます。</p><Link href="/learn/courses" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>全{LEARNING_COURSES.length}コースを見る →</Link></div>
          <div className="space-y-3 rounded-2xl border border-[#D9E3DD] p-5 dark:border-[#2A3B4A]"><h3 className="text-xl font-bold">全{catalog.chapters.length}章の体系学習</h3><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">全{catalog.lectures.length}講を章の順番で詳しく学びます。基礎コースで省いた各論や総合演習も扱い、後半の症例演習につなげます。</p><Link href="/curriculum" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>全講義の目次を見る →</Link></div>
        </div>
        <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">どちらも同じ講義を使い、受講記録は共通です。短いコースの完了と、章の全講義の完了は別々に確認できます。</p>
      </section>
      <LearningCourseJourney />
      <section aria-labelledby="learn-courses-heading" className="space-y-5"><h2 id="learn-courses-heading" className="font-serif text-2xl font-bold">最初の4コース</h2><LearningCourseCards courses={LEARNING_COURSES.slice(0, 4)} placement="learn_course_select" /><ContentNavigationLink href="/learn/courses" placement="learn_courses" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>この後の学習順を見る →</ContentNavigationLink></section>
      <CourseMiniCase seriesId="intro" />

      <section aria-labelledby="learn-review-scope" className="space-y-3 rounded-2xl border border-[#C5DED4] bg-[#EBF3EF] p-5 dark:border-[#2A5243] dark:bg-[#182823]"><h2 id="learn-review-scope" className="text-lg font-bold">教材の用途と確認範囲</h2><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">伝統理論と医学的な評価を区別して学びます。全教材の医学記述の照合・専門家監修は未完了です。未確認の刺鍼深度・角度・針路などの個別手順は掲載を保留しています。Web学習の受講完了は、実際の施術能力の認定を意味しません。</p><Link href="/editorial-policy" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>出典と確認範囲を見る →</Link></section>

      <LearningMap chapters={catalog.chapters} />
      <LearningDiscovery />
      <section aria-labelledby="learn-practice-heading" className="space-y-4"><h2 id="learn-practice-heading" className="font-serif text-2xl font-bold">学んだことを確かめる</h2><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">各講義の確認クイズと復習で用語を確かめます。病機・診断以降では、章の学習を踏まえ、追加情報で判断を更新する症例演習へ進みます。</p><nav aria-label="学習内容を確かめる" className="flex flex-wrap gap-3">{[{ href: '/kokushi#learning-review', label: '今日の復習' }, { href: '/kokushi', label: '国試演習' }, { href: '/tsubo/practice', label: '経穴の基本演習' }, { href: '/simulator#case-training', label: '後半の6段階症例演習' }, { href: '/notes?tab=learning', label: '学習の振り返り' }].map(link => <Link key={link.href} href={link.href} className={`inline-flex min-h-11 items-center rounded-xl border border-[#D9E3DD] px-4 font-semibold text-[#184F49] dark:border-[#2A3B4A] dark:text-[#9CCBBC] ${focusClass}`}>{link.label}</Link>)}</nav></section>
      <PrimeStudentCard variant="banner" />
    </div>
  );
}
