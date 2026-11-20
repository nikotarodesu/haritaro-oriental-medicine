import Link from "next/link";

export default function LearningCredits({ revisedAt }: { revisedAt: string }) {
  return (
    <aside aria-label="教材の編集と更新" className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-divider pt-4 text-base leading-relaxed text-muted">
      <span>編集・運営 <Link href="/about#about-operator" className="font-semibold text-accent underline underline-offset-4">はり太郎（鍼灸師）</Link></span>
      <span>ページ更新 <time dateTime={revisedAt}>{revisedAt}</time></span>
      <Link href="/editorial-policy" className="text-accent underline underline-offset-4">出典の確認方針</Link>
    </aside>
  );
}
