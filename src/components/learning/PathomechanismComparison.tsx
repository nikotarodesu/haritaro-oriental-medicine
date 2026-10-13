import Link from 'next/link';
import { createCourseLectureHref } from '@/utils/courseJourney';

// Reuses the existing four-layer example in lecture-pathomechanism-1.
const rows = [
  { term: '症状・所見', question: '何が報告され、観察されたか', example: '夕食後の張りとげっぷは本人の報告。診察所見は未確認。', limit: '記載のない舌・脈などを補わない。' },
  { term: '病因', question: '発症・悪化に何が関わったと考えるか', example: '残業や食事の変化を背景の候補として確認する。', limit: '残業が原因だったとは確定しない。' },
  { term: '病機', question: 'どの働きがどう失調したと考えるか', example: '肝の疏泄と胃の下降の関係などを、伝統的な仮説として検討する。', limit: '胃の運動や神経活動を測定した結果とは区別する。' },
  { term: '証', question: '現時点の情報をどうまとめるか', example: '肝気犯胃などの分類が候補になるか、追加情報で比較する。', limit: '一つの候補や医学的な病名を確定しない。' },
];

export default function PathomechanismComparison() {
  return (
    <section id="concept-comparison" aria-labelledby="concept-comparison-title" className="scroll-mt-28 space-y-4 rounded-2xl border border-[#D9E3DD] bg-[#FCFAF6] p-5 dark:border-[#2A3B4A] dark:bg-[#17212A] sm:p-6">
      <h2 id="concept-comparison-title" className="font-serif text-xl font-bold">病因・病機・症状・証を、同じ例で比べる</h2>
      <p className="leading-relaxed">架空例：Aさんは「先週から残業が増え、夕食後にみぞおちが張って、げっぷが出る」と話しました。痛みの強さ、服薬、診察・検査結果はまだ記載されていません。</p>
      <p className="text-sm leading-relaxed ui-muted">まず、本人が話した症状や経過を整理します。そのうえで、病因（発症・悪化に関わった可能性のある背景）、病機（働きの変化を説明する仮説）、証（現時点での分類）を区別して考えます。</p>
      <div role="table" aria-label="同じ架空例による四つの概念の比較" className="grid gap-3">
        {rows.map(row => <div role="row" key={row.term} className="grid gap-2 rounded-xl border border-[#D9E3DD] p-4 dark:border-[#2A3B4A] sm:grid-cols-[6rem_1fr]">
          <div role="rowheader" className="font-bold text-[#184F49] dark:text-[#9CCBBC]">{row.term}</div>
          <div role="cell" className="space-y-2 leading-relaxed"><p className="font-semibold">問い：{row.question}</p><p>この例：{row.example}</p><p className="text-sm ui-muted">判断の限界：{row.limit}</p></div>
        </div>)}
      </div>
      <details className="rounded-xl border border-[#D9E3DD] p-4 dark:border-[#2A3B4A]">
        <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">「残業が原因で肝気犯胃だ」とまとめてよい？</summary>
        <p className="mt-3 leading-relaxed">この記録だけでは決められません。残業の増加と症状は本人の報告ですが、原因や証は仮説です。食事内容・時刻、服薬、他の症状、発症前後の経過などを確認し、別の説明とも比べます。</p>
      </details>
      <Link href={createCourseLectureHref('pathomechanism-foundations', 'lecture-pathomechanism-1')} className="inline-flex min-h-11 items-center font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]">病機論の第1講で、根拠と未確認事項を確かめる →</Link>
    </section>
  );
}
