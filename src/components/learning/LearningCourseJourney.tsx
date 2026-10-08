import { BookOpen, Check, RotateCcw } from 'lucide-react';

export default function LearningCourseJourney() {
  const stages = [
    { title: '短い例で考える', description: '最初は事実と不明点を分ける', Icon: Check },
    { title: '必要な理論を読む', description: '講義・図解・クイズで確かめる', Icon: BookOpen },
    { title: '同じ例を見直す', description: '解答例と比べ、考えた理由を振り返る', Icon: RotateCcw },
  ];
  return (
    <ol aria-label="コースの学び方" className="grid gap-3 sm:grid-cols-3">
      {stages.map(({ title, description, Icon }, index) => (
        <li key={title} className="relative flex min-w-0 items-center gap-3 rounded-xl bg-[#F6F4EE] p-4 dark:bg-[#1E2B36]">
          <span aria-hidden="true" className="relative flex h-12 w-12 shrink-0 items-center justify-center text-[#184F49] dark:text-[#9CCBBC]">
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full fill-none stroke-current"><circle cx="24" cy="24" r="21" strokeWidth="1" /><path d="M24 3a21 21 0 0 1 21 21" strokeWidth="3" strokeLinecap="round" /></svg>
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0"><p className="text-base font-bold text-[#184F49] dark:text-[#9CCBBC]">{index + 1}. {title}</p><p className="mt-1 text-sm leading-relaxed text-[#59615D] dark:text-[#B7C5CF]">{description}</p></div>
        </li>
      ))}
    </ol>
  );
}
