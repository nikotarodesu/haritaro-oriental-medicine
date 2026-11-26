import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CLINICAL_COMPLAINTS, CLINICAL_PATTERNS } from '@/data/clinicalWorkflow';
import ClinicalEvidenceKey from '@/components/clinical/ClinicalEvidenceKey';
import InlineConceptFigure from '@/components/reading/InlineConceptFigure';
import PageIntro from '@/components/design/PageIntro';
import ContentEndAd from '@/components/ads/ContentEndAd';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import { PATTERN_AGREEMENT_HREF, SYMPTOM_RESEARCH_LINKS } from '@/config/acupunctureLearning';
import { readingPartHref } from '@/data/publicLectures/readingUnitCatalog';
import { SYMPTOM_LEARNING_RESOURCES } from '@/utils/symptomGuides';
import { ArrowLeft, ArrowRight, ClipboardList, GitCompareArrows, NotebookPen, RefreshCw } from 'lucide-react';

export function generateStaticParams() { return CLINICAL_COMPLAINTS.map(item => ({ slug: item.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  if (!item) return { title: '主訴別ガイドが見つかりません' };
  const path = `/clinical/symptoms/${slug}`;
  const title = seriesPageTitle(`${item.title}の問診・再評価｜臨床演習ガイド`, "practice");
  const description = `鍼灸師・学習者向けの臨床演習ガイドです。${item.summary} 問診、配穴の理由、次回に確かめる項目をまとめています。`;
  return { title, description, alternates: { canonical: path }, ...pageSocialMetadata(title, description, path) };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = CLINICAL_COMPLAINTS.find(complaint => complaint.slug === slug);
  if (!item) notFound();
  const researchLink = slug === 'back' ? SYMPTOM_RESEARCH_LINKS['lower-back-pain-sciatica']
    : slug === 'headache' ? SYMPTOM_RESEARCH_LINKS['headache-stiff-neck'] : undefined;
  const publicGuide = Object.entries(SYMPTOM_LEARNING_RESOURCES).find(([, guide]) => guide.clinicalSlug === slug);
  return <article className="page-layout page-layout--reading space-y-7">
    <Link className="inline-flex min-h-11 items-center gap-2 text-sm page-muted" href="/clinical"><ArrowLeft aria-hidden="true" className="h-4 w-4" />臨床演習に戻る</Link>
    <PageIntro compact art="care" eyebrow="鍼灸学生・鍼灸師向けの臨床演習ガイド" title={`${item.title}の問診・再評価`} description={item.summary} />
    <p><Link href={publicGuide ? `/symptoms/${publicGuide[0]}#safety` : '/symptoms'} className="ui-text-link inline-flex min-h-11 items-center">
      {publicGuide ? 'この症状の受診の目安を読む（一般向け）' : '症状から受診の目安を探す（一般向け）'}
    </Link></p>
    <nav aria-label="ガイドの項目" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {([{ href: '#questions', label: '問診の項目', Icon: ClipboardList }, { href: '#patterns', label: '候補を比べる', Icon: GitCompareArrows }, { href: '#record', label: '配穴の理由', Icon: NotebookPen }, { href: '#review', label: '次回の確認', Icon: RefreshCw }]).map(({ href, label, Icon }, index) => <a href={href} key={href} className="page-link-card page-link-card--stack !gap-2 !p-4"><Icon aria-hidden="true" /><span className="text-sm font-semibold"><span className="mr-2 page-muted">0{index + 1}</span>{label}</span></a>)}
    </nav>
    <section id="questions" className="page-section space-y-3"><h2 className="page-section-heading">1. 問診で聞くこと</h2><ul className="list-disc space-y-3 pl-5">{item.questions.map(question => <li key={question}>{question}</li>)}</ul><p className="text-sm leading-relaxed">受診を急ぐ症状があるときは、施術より先に医療機関での評価を優先します。以前の病気、服薬、受診の結果も確認します。</p><Link href="/safety" className="ui-text-link">受診の目安を読む</Link></section>
    <section id="patterns" className="page-section space-y-3"><h2 className="page-section-heading">2. 伝統医学の候補を比べる</h2><p className="text-sm">東洋医学では、症状や診察で分かったことから考える体の状態を「証」と呼びます。候補ごとに、当てはまること、食い違うこと、まだ確かめていないことを書きます。</p><div className="page-link-grid">{item.patternIds.map(id => { const pattern = CLINICAL_PATTERNS.find(candidate => candidate.id === id)!; return <section className="page-link-card page-link-card--stack !gap-2" key={id}><h3>{pattern.name}</h3><p>{item.patternExamples?.[id] ?? pattern.distinguish}</p><p>施術の考え方（治法）の例 {pattern.principle}</p><Link className="inline-flex min-h-11 items-center gap-2 text-sm underline" href={readingPartHref(pattern.lectureId)}>この証が出てくる講義へ<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>; })}</div></section>
    <section id="record" className="page-section space-y-3"><h2 className="page-section-heading">3. ツボを組み合わせる理由を残す</h2><p className="leading-relaxed">{item.recordPrompt}</p><Link className="page-secondary-action" href="/tsubo">候補にしたツボの位置と分類を調べる<ArrowRight aria-hidden="true" /></Link></section>
    <section id="review" className="page-section space-y-3">
      <h2 className="page-section-heading">4. 次回の問診で比べること</h2>
      <InlineConceptFigure figure={{ ...item.review, id: `review-${slug}`, layout: item.review.graphic === 'timeline' ? 'steps' : 'compare' }} />
      <p>症状が元に戻ったときや新しい症状が出たときは、いつ、何をしていたかを聞き直します。</p>
      <Link className="page-secondary-action" href={readingPartHref(item.lectureId)}>この症状に関係する四診の講義へ<ArrowRight aria-hidden="true" /></Link>
    </section>
    <ClinicalEvidenceKey sourceKeys={item.sourceKeys} />
    {researchLink && <p><Link href={researchLink.href} className="ui-text-link">{researchLink.label}</Link></p>}
    {slug === 'back' && <p><Link href={PATTERN_AGREEMENT_HREF} className="ui-text-link">腰痛の所見から、二人の見立てを比べる</Link></p>}
    <ContentEndAd key={slug} />
  </article>;
}
