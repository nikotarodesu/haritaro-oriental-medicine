import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { LEARNING_COURSES } from '@/data/learningCourses';
import LearningCourseCards from '@/components/learning/LearningCourseCards';
import LearningCourseJourney from '@/components/learning/LearningCourseJourney';

const title = '目的別の学習コース｜陰陽・五行・気血津液';
const description = '陰陽の基礎、五行の関係、気・血・津液を、3〜4講義のコースで順に学びます。受講進捗と確認クイズの回答履歴から、続きや苦手の解説へ進めます。';
const pageUrl = 'https://www.haritaro.jp/learn/courses';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  ...pageSocialMetadata(`${title} | ${SITE_NAME}`, description, '/learn/courses'),
};

export default function LearningCoursesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: 'ja', mainEntity: { '@type': 'ItemList', itemListElement: LEARNING_COURSES.map((course, index) => ({ '@type': 'ListItem', position: index + 1, name: course.title, url: `${pageUrl}/${course.slug}` })) } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.haritaro.jp/' }, { '@type': 'ListItem', position: 2, name: '学ぶ', item: 'https://www.haritaro.jp/learn' }, { '@type': 'ListItem', position: 3, name: '学習コース', item: pageUrl }] },
    ],
  };
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="パンくず"><Link href="/learn" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />学ぶトップへ</Link></nav>
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold tracking-wider text-[#184F49] dark:text-[#9CCBBC]">目的に合わせて、一歩ずつ</p>
        <h1 className="font-serif text-3xl font-bold leading-relaxed sm:text-4xl">いま学びたいことから始める。</h1>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">まずは3〜4講義をひと区切りに。陰陽、五行、気血津液からテーマを選び、講義と確認クイズで学びます。すでに受講した講義の記録も、そのまま進捗に反映されます。</p>
      </header>
      <LearningCourseJourney />
      <section aria-labelledby="course-list-heading" className="space-y-4"><h2 id="course-list-heading" className="font-serif text-2xl font-bold">3つの入門コース</h2><LearningCourseCards courses={LEARNING_COURSES} /></section>
      <aside className="rounded-2xl border border-[#D9E3DD] p-5 dark:border-[#2A3B4A]"><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">全体を順に学びたい方は、全8章のカリキュラムへ。教材の出典と確認範囲は、編集方針で案内しています。</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-2"><Link href="/curriculum" className="inline-flex min-h-11 items-center text-base font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">全講義を見る →</Link><Link href="/editorial-policy" className="inline-flex min-h-11 items-center text-base font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">教材の確認範囲を見る →</Link></div></aside>
    </main>
  );
}
