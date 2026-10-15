import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, RotateCcw, MapPin, BookA, Layers } from 'lucide-react';
import PageIntro from '@/components/design/PageIntro';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { LEARNING_COURSES } from '@/data/learningCourses';
import { getCurriculumIndexCatalog } from '@/data/curriculumIndexCatalog';
import { CURRICULUM_TOTAL_CHAPTERS, CURRICULUM_TOTAL_LESSONS } from '@/data/curriculumOutline';
import HomeLearningProgressCard from '@/components/HomeLearningProgressCard';
import LearningCourseCards from '@/components/learning/LearningCourseCards';

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
    <div className="page-layout space-y-10">
      <PageIntro eyebrow="学習案内" title="東洋医学を、基礎から。" description="概論から、一講ずつ。読んで、クイズで確かめましょう。" art="study" />
      <HomeLearningProgressCard />

      <section aria-labelledby="learn-courses-heading" className="space-y-4">
        <h2 id="learn-courses-heading" className="font-serif text-2xl font-bold">全{LEARNING_COURSES.length}コースの学習順</h2>
        <p className="leading-relaxed ui-muted">各コースは、基本を扱う3〜5講と短い例の演習です。</p>
        <LearningCourseCards courses={LEARNING_COURSES} placement="learn_course_select" compact />
        <p className="text-sm leading-relaxed ui-muted">各論まで詳しく読む方は、<Link href="/curriculum" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>全{catalog.chapters.length}章・{catalog.lectures.length}講の目次</Link>へ。講義の受講記録は共通です。短いコースと章全体の完了は、それぞれ確認できます。</p>
      </section>

      <details className="page-help"><summary id="learn-review-scope">教材の用途と確認範囲</summary><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">伝統理論と医学的な評価を区別して学びます。全教材の医学記述の照合・専門家監修は未完了です。未確認の刺鍼深度・角度・針路などの個別手順は掲載を保留しています。Web学習の受講完了は、実際の施術能力の認定を意味しません。</p><Link href="/editorial-policy" className={`inline-flex min-h-11 items-center font-semibold text-[#184F49] underline dark:text-[#9CCBBC] ${focusClass}`}>出典と確認範囲を見る →</Link></details>

      <nav aria-label="復習と用語の確認" className="page-link-grid">{[{ href: '/learn/review#learning-review', label: '今日の復習', icon: RotateCcw }, { href: '/tsubo/practice', label: '経穴の基本演習', icon: MapPin }, { href: '/glossary', label: '用語集', icon: BookA }, { href: '/learn/courses/pathomechanism-foundations#concept-comparison', label: '病因・病機・症状・証を比べる', icon: Layers }].map(({ icon: Icon, ...link }) => <Link key={link.href} href={link.href} className="page-link-card flex items-center gap-3"><span className="page-link-icon"><Icon aria-hidden="true" className="h-5 w-5" /></span><span className="flex-1 font-semibold">{link.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}</nav>
    </div>
  );
}
