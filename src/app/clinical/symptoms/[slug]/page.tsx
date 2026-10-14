import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CLINICAL_COMPLAINTS, CLINICAL_PATTERNS } from '@/data/clinicalWorkflow';
import ClinicalEvidenceKey from '@/components/clinical/ClinicalEvidenceKey';
import PageIntro from '@/components/design/PageIntro';
import { ArrowLeft, ArrowRight, ClipboardList, GitCompareArrows, NotebookPen, RefreshCw } from 'lucide-react';

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
  return <article className="page-layout page-layout--reading space-y-7">
    <Link className="inline-flex min-h-11 items-center gap-2 text-sm page-muted" href="/clinical"><ArrowLeft aria-hidden="true" className="h-4 w-4" />臨床ホーム</Link>
    <PageIntro compact art="care" eyebrow="主訴別確認ガイド" title={item.title} description={item.summary}>
      <div className="page-actions"><Link className="page-primary-action" href={`/clinical/workspace?complaint=${item.slug}`}><NotebookPen aria-hidden="true" />この主訴から所見を整理する<ArrowRight aria-hidden="true" /></Link></div>
      <details className="page-help"><summary>下書きから再開する場合</summary><p className="text-sm leading-relaxed">作業中の下書きがある場合はその続きが開きます。新規作成は作業画面の「新しい記録を始める」から選べます。</p></details>
    </PageIntro>
    <nav aria-label="ガイドの項目" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {([{ href: '#questions', label: '確認する', Icon: ClipboardList }, { href: '#patterns', label: '比較する', Icon: GitCompareArrows }, { href: '#record', label: '理由を残す', Icon: NotebookPen }, { href: '#review', label: '再評価する', Icon: RefreshCw }]).map(({ href, label, Icon }, index) => <a href={href} key={href} className="page-link-card page-link-card--stack !gap-2 !p-4"><Icon aria-hidden="true" /><span className="text-sm font-semibold"><span className="mr-2 page-muted">0{index + 1}</span>{label}</span></a>)}
    </nav>
    <section id="questions" className="page-section space-y-3"><h2 className="page-section-heading">1. まず確認すること</h2><ul className="list-disc space-y-3 pl-5">{item.questions.map(question => <li key={question}>{question}</li>)}</ul><p className="text-sm leading-relaxed">危険兆候、既往、服薬、受診状況を確認してから伝統医学の所見を検討します。緊急性が疑われる場合は施術を保留して医療評価を優先します。<Link href="/safety" className="underline">受診・安全確認の詳細</Link></p></section>
    <section id="patterns" className="page-section space-y-3"><h2 className="page-section-heading">2. 比較の練習に使う候補</h2><p className="text-sm">この主訴だけで候補が決まるわけではありません。下の候補は限定した学習例です。支持・不一致・未確認を照合して検討します。</p><div className="page-link-grid">{item.patternIds.map(id => { const pattern = CLINICAL_PATTERNS.find(candidate => candidate.id === id)!; return <section className="page-link-card page-link-card--stack !gap-2" key={id}><h3>{pattern.name}</h3><p>{pattern.distinguish}</p><p>治法の学習例：{pattern.principle}</p><Link className="inline-flex min-h-11 items-center gap-2 text-sm underline" href={`/curriculum/${pattern.lectureId}`}>背景の理論を学ぶ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>; })}</div></section>
    <section id="record" className="page-section space-y-3"><h2 className="page-section-heading">3. 配穴の理由を残す</h2><p className="leading-relaxed">採用する治法、各穴の役割、確認した所見、代替案を記録します。経穴の位置・注意事項は辞典で照合し、所見のない項目を推測で埋めません。</p><Link className="page-secondary-action" href="/tsubo">経穴辞典へ<ArrowRight aria-hidden="true" /></Link></section>
    <section id="review" className="page-section space-y-3"><h2 className="page-section-heading">4. 同じ指標で再評価する</h2><ul className="list-disc space-y-2 pl-5">{item.review.map(review => <li key={review}>{review}</li>)}</ul><p>直後と次回来院時を分けて記録し、改善が乏しい場合は所見・見立て・計画を再検討します。</p><Link className="page-secondary-action" href={`/curriculum/${item.lectureId}`}>四診・臨床推論の講義へ<ArrowRight aria-hidden="true" /></Link></section>
    <ClinicalEvidenceKey sourceKeys={item.sourceKeys} />
  </article>;
}
