import Link from 'next/link';
import { CLINICAL_LEARNING_GUIDES } from '@/data/clinicalLearning';

export default function ClinicalLectureApplication({ lectureId, takeaway }: { lectureId: string; takeaway: string }) {
  const series = lectureId.replace('lecture-', '').replace(/-\d+$/, '');
  const guide = CLINICAL_LEARNING_GUIDES[series];
  if (!guide) return null;
  return <section aria-label="この講義を実践につなぐ" className="space-y-3 rounded-xl border border-[#D0DED3] bg-[#F6F8F3] p-4 text-[#232826] dark:border-[#34483C] dark:bg-[#182823] dark:text-[#FAF8F5] sm:p-5">
    <h2 className="text-lg font-bold">この講義を実践につなぐ</h2><p className="text-sm leading-relaxed">講義で学ぶこと：{takeaway}</p><dl className="space-y-3 leading-relaxed"><div><dt className="font-semibold">使う場面</dt><dd>{guide.situation}</dd></div><div><dt className="font-semibold">確認・記録すること</dt><dd>{guide.check}</dd></div><div><dt className="font-semibold">間違えやすい判断</dt><dd>{guide.pitfall}</dd></div></dl>
    <div className="flex flex-wrap gap-3 text-sm"><Link className="inline-flex min-h-11 items-center font-semibold underline" href={`/clinical/symptoms/${guide.complaintSlug}`}>主訴別ガイドで使い方を確認 →</Link><Link className="inline-flex min-h-11 items-center font-semibold underline" href="/cases#revision-training">見立てを修正する症例演習 →</Link><Link className="inline-flex min-h-11 items-center font-semibold underline" href="/clinical/workspace">所見と判断の根拠を記録 →</Link></div>
    <p className="text-sm">シリーズの理論を記録へつなぐ学習案内です。個別の診断・施術指示ではありません。</p>
  </section>;
}
