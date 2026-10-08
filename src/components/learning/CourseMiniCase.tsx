import Link from 'next/link';
import { COURSE_MINI_CASES } from '@/data/courseMiniCases';
import { getLearningCourseForSeries } from '@/data/learningCourses';
import { createCourseLectureHref } from '@/utils/courseJourney';

export default function CourseMiniCase({ seriesId, headingLevel = 2 }: { seriesId: string; headingLevel?: 2 | 3 }) {
  const example = COURSE_MINI_CASES[seriesId];
  const course = getLearningCourseForSeries(seriesId);
  if (!example || !course) return null;
  const anchor = `course-mini-case-${seriesId}`;
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const ExampleHeading = headingLevel === 3 ? 'h4' : 'h3';
  const theoryHref = `${createCourseLectureHref(course.slug, example.lectureId)}&miniCase=${encodeURIComponent(seriesId)}`;
  const laterStage = ['pathomechanism', 'diagnosis', 'treatment', 'practice'].includes(seriesId);
  return (
    <section id={anchor} aria-labelledby={`${anchor}-title`} className="scroll-mt-28 space-y-4 rounded-2xl border border-[#D9E3DD] bg-[#F6F4EE] p-5 text-[#232826] dark:border-[#2A3B4A] dark:bg-[#1E2B36] dark:text-[#FAF8F5] sm:p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]">この段階の練習：{example.stage}</p>
        <Heading id={`${anchor}-title`} className="font-serif text-xl font-bold">短い例で、一つだけ考える</Heading>
        <ExampleHeading className="text-base font-bold">{example.title}</ExampleHeading>
      </div>
      <p className="text-base leading-relaxed">{example.presentation}</p>
      <p className="text-base font-semibold leading-relaxed">{example.question}</p>
      <details className="rounded-xl border border-[#C5DED4] bg-white p-4 dark:border-[#34483C] dark:bg-[#17212A]">
        <summary className="min-h-11 cursor-pointer content-center font-semibold text-[#184F49] focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">解答例を読む</summary>
        <p className="mt-3 text-base leading-relaxed">{example.answer}</p>
        <p className="mt-3 text-sm leading-relaxed">読み直した後：{example.reconsider}</p>
      </details>
      <p className="text-sm leading-relaxed">先に自分の言葉で考え、解答例と比べます。必要な理論を読んだら、講義の「短い例に戻る」から同じ問いを見直せます。この練習に採点や回答の保存はありません。</p>
      <Link href={theoryHref} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">{example.lectureLabel} →</Link>
      {laterStage && <p className="text-sm leading-relaxed">章の全講義で基礎を確かめたら、<Link href="/simulator#case-training" className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">追加情報で判断を更新する6段階症例演習</Link>へ進めます。各段階の判断と理由を比較します。</p>}
    </section>
  );
}
