import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { LEARNING_COURSES } from '@/data/learningCourses';
import LearningCourseCards from '@/components/learning/LearningCourseCards';
import LearningCourseJourney from '@/components/learning/LearningCourseJourney';

const title = '概論から始める基礎コース｜東洋医学の学習順';
const description = `概論、陰陽、気血津液、臓腑、経絡から臨床の基礎まで。${LEARNING_COURSES.length}の3〜5講コースで理論と短い例を往復し、全講義を学ぶ目次や復習へ進めます。`;
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
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="パンくず"><Link href="/learn" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />学ぶトップへ</Link></nav>
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold tracking-wider text-[#184F49] dark:text-[#9CCBBC]">概論から、段階を追って</p>
        <h1 className="font-serif text-3xl font-bold leading-relaxed sm:text-4xl">東洋医学の基礎を、一歩ずつ。</h1>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">初めての方は4講の概論から。各章の入口になる3〜5講を選んだコースで、用語と全体像をつかみます。短い例では、初めは観察した事実と不明点を分け、後半に仮説や評価を考えます。</p>
        <Link href="/learn/courses/oriental-medicine-introduction" className="inline-flex min-h-11 items-center rounded-xl bg-[#184F49] px-4 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">最初の概論コースを見る →</Link>
      </header>
      <LearningCourseJourney />
      <section aria-labelledby="course-list-heading" className="space-y-4"><h2 id="course-list-heading" className="font-serif text-2xl font-bold">全{LEARNING_COURSES.length}コースの学習順</h2><LearningCourseCards courses={LEARNING_COURSES} /></section>
      <aside className="rounded-2xl border border-[#D9E3DD] p-5 dark:border-[#2A3B4A]"><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">詳しい各論や総合演習は、カリキュラムの全講義で学べます。コースと章で同じ受講記録を使いますが、短いコースの完了は章の全講義の完了とは異なります。教材の出典と確認範囲は編集方針で案内しています。</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-2"><Link href="/curriculum" className="inline-flex min-h-11 items-center text-base font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">全講義を見る →</Link><Link href="/editorial-policy" className="inline-flex min-h-11 items-center text-base font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">教材の確認範囲を見る →</Link></div></aside>
    </div>
  );
}
