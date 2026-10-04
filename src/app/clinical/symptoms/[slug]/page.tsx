import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CLINICAL_COMPLAINTS, CLINICAL_PATTERNS } from '@/data/clinicalWorkflow';
import ClinicalEvidenceKey from '@/components/clinical/ClinicalEvidenceKey';

export function generateStaticParams() { return CLINICAL_COMPLAINTS.map(item => ({ slug: item.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  return item ? { title: `${item.title}｜鍼灸師の主訴別確認ガイド`, description: `${item.summary} 問診、所見の比較、配穴の検討理由、再評価へ進む専門家向けガイド。`, alternates: { canonical: `/clinical/symptoms/${slug}` } } : { title: '主訴別ガイドが見つかりません' };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  if (!item) notFound();
  return <article className="mx-auto max-w-5xl space-y-7 px-4 py-8 text-[#232826] dark:text-[#FAF8F5] sm:py-12">
    <Link className="inline-flex min-h-11 items-center underline" href="/clinical">← 臨床ホーム</Link><header className="space-y-3"><p className="text-sm font-semibold">鍼灸師向け・主訴別確認ガイド</p><h1 className="font-serif text-3xl font-bold">{item.title}</h1><p className="leading-relaxed">{item.summary}</p><Link className="inline-flex min-h-11 items-center rounded-xl bg-[#1E3D34] px-5 py-3 font-bold text-white dark:bg-[#9CCDB8] dark:text-[#11291F]" href={`/clinical/workspace?complaint=${item.slug}`}>この主訴から所見を整理する →</Link><p className="text-sm">作業中の下書きがある場合はその続きが開きます。新規作成は作業画面の「新しい記録を始める」から選べます。</p></header>
    <section className="space-y-3"><h2 className="text-xl font-bold">1. まず確認すること</h2><ul className="list-disc space-y-3 pl-5">{item.questions.map(question => <li key={question}>{question}</li>)}</ul><p className="text-sm leading-relaxed">危険兆候、既往、服薬、受診状況を確認してから伝統医学の所見を検討します。緊急性が疑われる場合は施術を保留して医療評価を優先します。<Link href="/safety" className="underline">受診・安全確認の詳細</Link></p></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">2. 比較の練習に使う候補</h2><p className="text-sm">この主訴だけで候補が決まるわけではありません。下の候補は限定した学習例です。支持・不一致・未確認を照合して検討します。</p><div className="grid gap-3 sm:grid-cols-2">{item.patternIds.map(id => { const pattern = CLINICAL_PATTERNS.find(candidate => candidate.id === id)!; return <section className="space-y-2 rounded-xl border border-[#D6DED7] p-4 dark:border-[#34483C]" key={id}><h3 className="font-bold">{pattern.name}</h3><p className="text-sm leading-relaxed">{pattern.distinguish}</p><p className="text-sm">治法の学習例：{pattern.principle}</p><Link className="inline-flex min-h-11 items-center text-sm underline" href={`/curriculum/${pattern.lectureId}`}>背景の理論を学ぶ →</Link></section>; })}</div></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">3. 配穴の理由を残す</h2><p className="leading-relaxed">採用する治法、各穴の役割、確認した所見、代替案を記録します。経穴の位置・注意事項は辞典で照合し、所見のない項目を推測で埋めません。</p><Link className="inline-flex min-h-11 items-center underline" href="/tsubo">経穴辞典へ →</Link></section>
    <section className="space-y-3"><h2 className="text-xl font-bold">4. 同じ指標で再評価する</h2><ul className="list-disc space-y-2 pl-5">{item.review.map(review => <li key={review}>{review}</li>)}</ul><p>直後と次回来院時を分けて記録し、改善が乏しい場合は所見・見立て・計画を再検討します。</p><Link className="inline-flex min-h-11 items-center underline" href={`/curriculum/${item.lectureId}`}>四診・臨床推論の講義へ →</Link></section>
    <ClinicalEvidenceKey sourceKeys={item.sourceKeys} />
  </article>;
}
