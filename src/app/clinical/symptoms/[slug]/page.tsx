import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CLINICAL_COMPLAINTS, CLINICAL_PATTERNS } from '@/data/clinicalWorkflow';
import ClinicalEvidenceKey from '@/components/clinical/ClinicalEvidenceKey';
import PageIntro from '@/components/design/PageIntro';
import ContentEndAd from '@/components/ads/ContentEndAd';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import { PATTERN_AGREEMENT_HREF, SYMPTOM_RESEARCH_LINKS } from '@/config/acupunctureLearning';
import { ArrowLeft, ArrowRight, ClipboardList, GitCompareArrows, NotebookPen, RefreshCw } from 'lucide-react';

export function generateStaticParams() { return CLINICAL_COMPLAINTS.map(item => ({ slug: item.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  if (!item) return { title: '主訴別ガイドが見つかりません' };
  const path = `/clinical/symptoms/${slug}`;
  const title = seriesPageTitle(`${item.title}｜鍼灸師向けの問診・配穴ガイド`, "practice");
  const description = `${item.summary} 問診で聞くこと、配穴の理由、次回に確かめる項目をまとめています。`;
  return { title, description, alternates: { canonical: path }, ...pageSocialMetadata(title, description, path) };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  if (!item) notFound();
  const researchLink = slug === 'back' ? SYMPTOM_RESEARCH_LINKS['lower-back-pain-sciatica']
    : slug === 'headache' ? SYMPTOM_RESEARCH_LINKS['headache-stiff-neck'] : undefined;
  return <article className="page-layout page-layout--reading space-y-7">
    <Link className="inline-flex min-h-11 items-center gap-2 text-sm page-muted" href="/clinical"><ArrowLeft aria-hidden="true" className="h-4 w-4" />臨床演習に戻る</Link>
    <PageIntro compact art="care" eyebrow="主訴別確認ガイド" title={item.title} description={item.summary} />
    <nav aria-label="ガイドの項目" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {([{ href: '#questions', label: '問診の項目', Icon: ClipboardList }, { href: '#patterns', label: '候補を比べる', Icon: GitCompareArrows }, { href: '#record', label: '配穴の理由', Icon: NotebookPen }, { href: '#review', label: '次回の確認', Icon: RefreshCw }]).map(({ href, label, Icon }, index) => <a href={href} key={href} className="page-link-card page-link-card--stack !gap-2 !p-4"><Icon aria-hidden="true" /><span className="text-sm font-semibold"><span className="mr-2 page-muted">0{index + 1}</span>{label}</span></a>)}
    </nav>
    <section id="questions" className="page-section space-y-3"><h2 className="page-section-heading">1. 問診で聞くこと</h2><ul className="list-disc space-y-3 pl-5">{item.questions.map(question => <li key={question}>{question}</li>)}</ul><p className="text-sm leading-relaxed">受診を急ぐ症状がないかを先に聞きます。以前の病気、使っている薬、受診した結果も確認します。急ぐ症状があれば、施術より先にすぐに医療機関を受診します。<Link href="/safety" className="underline">受診の目安を読む</Link></p></section>
    <section id="patterns" className="page-section space-y-3"><h2 className="page-section-heading">2. 伝統医学の候補を比べる</h2><p className="text-sm">一つの主訴から証を決めず、候補ごとに合う所見、合わない所見、まだ聞いていないことを書きます。下に比べ方の例を載せています。</p><div className="page-link-grid">{item.patternIds.map(id => { const pattern = CLINICAL_PATTERNS.find(candidate => candidate.id === id)!; return <section className="page-link-card page-link-card--stack !gap-2" key={id}><h3>{pattern.name}</h3><p>{item.patternExamples?.[id] ?? pattern.distinguish}</p><p>治法の例 {pattern.principle}</p><Link className="inline-flex min-h-11 items-center gap-2 text-sm underline" href={`/curriculum/${pattern.lectureId}`}>この証が出てくる講義へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>; })}</div></section>
    <section id="record" className="page-section space-y-3"><h2 className="page-section-heading">3. 配穴の理由を残す</h2><p className="leading-relaxed">選んだ治法と、どの所見を受けてどのツボを選んだかを書きます。ほかの候補や、まだ調べていない所見も残します。ツボの位置と注意事項は図鑑で確認できます。</p><Link className="page-secondary-action" href="/tsubo">ツボ図鑑を開く<ArrowRight aria-hidden="true" /></Link></section>
    <section id="review" className="page-section space-y-3"><h2 className="page-section-heading">4. 直後と次回で同じ項目を比べる</h2><ul className="list-disc space-y-2 pl-5">{item.review.map(review => <li key={review}>{review}</li>)}</ul><p>その場で何が変わり、帰宅後もその変化が続いたかを書きます。元に戻ったときや新しい症状が出たときは、聞き取った情報から見直します。</p><Link className="page-secondary-action" href={`/curriculum/${item.lectureId}`}>この症状に関係する四診の講義へ<ArrowRight aria-hidden="true" /></Link></section>
    <ClinicalEvidenceKey sourceKeys={item.sourceKeys} />
    {researchLink && <p><Link href={researchLink.href} className="ui-text-link">{researchLink.label}</Link></p>}
    {slug === 'back' && <p><Link href={PATTERN_AGREEMENT_HREF} className="ui-text-link">腰痛の所見から、二人の見立てを比べる</Link></p>}
    <ContentEndAd key={slug} />
  </article>;
}
