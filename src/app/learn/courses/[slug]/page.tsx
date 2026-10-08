import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { getLearningCourse, LEARNING_COURSES } from '@/data/learningCourses';
import LearningCourseProgress from '@/components/learning/LearningCourseProgress';
import LearningCourseJourney from '@/components/learning/LearningCourseJourney';
import LearningCourseLink from '@/components/learning/LearningCourseLink';
import CourseMiniCase from '@/components/learning/CourseMiniCase';
import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return LEARNING_COURSES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getLearningCourse(slug);
  if (!course) return { title: '学習コースが見つかりません', robots: { index: false } };
  const title = `${course.title}｜${course.steps.length}ステップの学習コース`;
  const path = `/learn/courses/${course.slug}`;
  return { title, description: course.description, alternates: { canonical: `https://www.haritaro.jp${path}` }, ...pageSocialMetadata(`${title} | ${SITE_NAME}`, course.description, path) };
}

export default async function LearningCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getLearningCourse(slug);
  if (!course) notFound();
  const prerequisite = course.prerequisiteSlug ? getLearningCourse(course.prerequisiteSlug) : undefined;
  const nextCourse = course.nextCourseSlug ? getLearningCourse(course.nextCourseSlug) : undefined;
  const chapter = CURRICULUM_CHAPTERS_META.find(item => item.seriesId === course.seriesId);
  const pageUrl = `https://www.haritaro.jp/learn/courses/${course.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': ['WebPage', 'LearningResource'], '@id': `${pageUrl}#webpage`, url: pageUrl, name: course.title, description: course.description, inLanguage: 'ja', learningResourceType: 'Learning path', teaches: course.goals, hasPart: course.steps.map((step) => ({ '@type': 'LearningResource', name: step.title, url: `https://www.haritaro.jp/curriculum/${step.lectureId}` })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.haritaro.jp/' }, { '@type': 'ListItem', position: 2, name: '学ぶ', item: 'https://www.haritaro.jp/learn' }, { '@type': 'ListItem', position: 3, name: '学習コース', item: 'https://www.haritaro.jp/learn/courses' }, { '@type': 'ListItem', position: 4, name: course.title, item: pageUrl }] },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="パンくず"><Link href="/learn/courses" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />学習コース一覧へ</Link></nav>
      <header className="space-y-4">
        <p className="text-sm font-semibold tracking-wider text-[#184F49] dark:text-[#9CCBBC]">{course.eyebrow} · {course.steps.length}ステップ</p>
        <h1 className="font-serif text-3xl font-bold leading-relaxed sm:text-4xl">{course.title}</h1>
        <p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{course.description}</p>
        <p className="text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">こんな方に：{course.audience}</p>
      </header>
      <section aria-labelledby="course-goals-heading" className="rounded-2xl bg-[#F6F4EE] p-5 sm:p-6 dark:bg-[#1E2B36]"><h2 id="course-goals-heading" className="font-serif text-xl font-bold">このコースの到達目標</h2><ul className="mt-4 space-y-3">{course.goals.map((goal) => <li key={goal} className="flex items-start gap-3 text-base leading-relaxed"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#184F49] dark:text-[#9CCBBC]" /><span>{goal}</span></li>)}</ul>{prerequisite && <p className="mt-5 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">一つ前の段階は、<Link href={`/learn/courses/${prerequisite.slug}`} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">{prerequisite.title}</Link>です。必要な用語を振り返ってから進めます。</p>}<Link href={`#course-mini-case-${course.seriesId}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">先に短い例で考えてみる →</Link></section>
      <LearningCourseJourney />
      <LearningCourseProgress course={course} />
      <CourseMiniCase seriesId={course.seriesId} />
      {course.reading.length > 0 && <section aria-labelledby="course-reading-heading" className="space-y-4"><h2 id="course-reading-heading" className="font-serif text-2xl font-bold">図解で振り返る</h2><div className="grid gap-3">{course.reading.map((item) => <LearningCourseLink key={item.href} href={item.href} courseId={course.slug} placement="course_reading" className="flex min-h-11 items-center justify-between gap-4 rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-5 hover:border-[#184F49] focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-[#2A3B4A] dark:bg-[#17212A] dark:hover:border-[#9CCBBC]"><span className="min-w-0"><span className="block text-lg font-bold text-[#184F49] dark:text-[#9CCBBC]">{item.title}</span><span className="mt-2 block text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{item.description}</span></span><ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#184F49] dark:text-[#9CCBBC]" /></LearningCourseLink>)}</div></section>}
      {chapter && <aside className="space-y-3 rounded-2xl border border-[#D9E3DD] p-5 dark:border-[#2A3B4A]"><h2 className="text-lg font-bold">{course.steps.length === chapter.plannedLessons ? 'この章を振り返る' : 'この章を詳しく学ぶ'}</h2><p className="text-base leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{course.steps.length === chapter.plannedLessons ? `このコースは章の全${chapter.plannedLessons}講を扱います。章の目次から各講義を振り返れます。` : `このコースは全${chapter.plannedLessons}講のうち${course.steps.length}講です。詳しい各論や総合演習は章の順番で続けて学べます。`}受講記録は共通で、コースと章の進捗はそれぞれ表示します。</p><Link href={`/curriculum#chapter-${chapter.id}`} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">{chapter.title}の全講義を見る →</Link></aside>}
      <nav aria-label="次に学ぶテーマ" className="flex flex-wrap items-center gap-3 border-t border-[#D9E3DD] pt-6 dark:border-[#2A3B4A]">{nextCourse && <LearningCourseLink href={`/learn/courses/${nextCourse.slug}`} courseId={course.slug} placement="course_next" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#184F49] px-4 py-3 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 dark:bg-[#285F54]">次のテーマ：{nextCourse.title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></LearningCourseLink>}<Link href="/learn/courses" className="inline-flex min-h-11 items-center px-3 text-base font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">ほかのコースを見る</Link></nav>
    </div>
  );
}
