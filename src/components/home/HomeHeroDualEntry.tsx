import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Both audiences remain visible; the primary links retain their existing destinations. */
export default function HomeHeroDualEntry() {
  return (
    <section aria-label="学生と鍼灸師の使い方" className="home-audience-grid">
      <article className="ui-card space-y-3">
        <h2 className="home-section-title">学生・学び直したい方へ</h2>
        <p className="ui-muted">基礎から順に学び、クイズと復習で理解を確かめます。</p>
        <p>講義を読む → 問題で確かめる → 苦手を復習する</p>
        <Link href="/learn" className="ui-text-link">学習の使い方<ArrowRight aria-hidden="true" /></Link>
      </article>
      <article className="ui-card space-y-3">
        <h2 className="home-section-title">鍼灸師の方へ</h2>
        <p className="ui-muted">経穴や用語を調べ、対面問診で所見を整理し、記録を振り返ります。</p>
        <p>調べる → 所見を整理する → 記録・再評価する</p>
        <Link href="/clinical" className="ui-text-link">臨床での使い方<ArrowRight aria-hidden="true" /></Link>
      </article>
    </section>
  );
}
