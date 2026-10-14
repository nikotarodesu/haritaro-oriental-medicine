import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { MeridianRelation } from '@/utils/tsuboRelations';

export default function MeridianRelationsDiagram({ meridian, relations }: { meridian: string; relations: MeridianRelation[] }) {
  if (!relations.length) return null;
  return <section className="meridian-relations" aria-labelledby="meridian-relations-heading">
    <h2 id="meridian-relations-heading" className="font-serif text-xl font-semibold">経脈の関係</h2>
    <p className="meridian-relations-note">伝統医学における経脈の分類</p>
    <div className="meridian-relations-current"><span>この経穴の経脈</span><strong>{meridian}</strong></div>
    <svg aria-hidden="true" focusable="false" viewBox="0 0 600 64" preserveAspectRatio="none" className="meridian-relations-branches">
      {relations.map((relation, index) => {
        const x = (index + 0.5) * (600 / relations.length);
        return <g key={relation.pairedMeridianId} className={relation.relationType === '同名経' ? 'meridian-branch-same' : 'meridian-branch-pair'}>
          <path d={`M300 0 V16 Q300 28 ${x > 300 ? 312 : x < 300 ? 288 : 300} 28 H${x} V56`} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={relation.relationType === '同名経' ? '5 5' : undefined} vectorEffect="non-scaling-stroke" />
          <circle cx={x} cy="58" r="4" fill="currentColor" />
        </g>;
      })}
    </svg>
    <div className={`meridian-relations-grid${relations.length === 1 ? ' meridian-relations-grid--single' : ''}`}>
      {relations.map(relation => <article key={relation.pairedMeridianId} className={`meridian-relation-card${relation.relationType === '同名経' ? ' meridian-relation-card--same' : ''}`}>
        <p className="meridian-relation-kind"><span aria-hidden="true" />{relation.relationType}</p>
        <Link href={`/tsubo?meridian=${encodeURIComponent(relation.pairedShort)}`} className="meridian-relation-link"><h3>{relation.pairedName}</h3><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
        <details className="meridian-relation-explanation"><summary>関係の説明を読む</summary><p>{relation.explanation}</p></details>
        <div className="meridian-relation-points"><span>代表要穴</span>{relation.keyPoints.map(point => <Link key={point.code} href={`/tsubo/${point.code}`}>{point.name}<span>（{point.code.toUpperCase()}）</span></Link>)}</div>
      </article>)}
    </div>
  </section>;
}
