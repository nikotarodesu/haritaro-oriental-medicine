import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MedicalSafetyNotice from '@/components/MedicalSafetyNotice';
import AuthorSupervisorCard from '@/components/common/AuthorSupervisorCard';
import SymptomPerspective from '@/components/symptoms/SymptomPerspective';
import SymptomResearchReferences from '@/components/symptoms/SymptomResearchReferences';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE, SYMPTOM_SAFETY_GUIDANCE } from '@/data/symptomData';
import { ACUPOINTS_MASTER } from '@/data/tsubo/acupointsMaster';
import { ARTICLES } from '@/data/articleData';
import { CURRICULUM_DATA } from '@/data/curriculumData';
import { CLINICAL_CASES } from '@/data/clinicalCasesData';
import { pageSocialMetadata } from '@/config/seo';
import { getSymptomGuide, getSymptomGuideJsonLd, getSymptomGuideSources, getSymptomRelatedPapers, SYMPTOM_GUIDES_REVISED_AT, SYMPTOM_LEARNING_RESOURCES, symptomGuideDescription, symptomGuidePath, symptomGuideTitle } from '@/utils/symptomGuides';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return SYMPTOMS.map(guide => ({ slug: guide.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSymptomGuide(slug);
  if (!guide) notFound();
  const title = symptomGuideTitle(guide);
  const description = symptomGuideDescription(guide);
  return { title, description, alternates: { canonical: symptomGuidePath(guide) }, ...pageSocialMetadata(title, description, symptomGuidePath(guide)) };
}

const sectionClass = 'scroll-mt-28 space-y-4 rounded-2xl border border-[#D6DED7] bg-white p-5 dark:border-[#34483C] dark:bg-[#17212A] sm:p-7';
const linkClass = 'inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#9CCDB8]';

export default async function SymptomGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSymptomGuide(slug);
  if (!guide) notFound();
  const safety = SYMPTOM_SAFETY_GUIDANCE[guide.id];
  const sources = getSymptomGuideSources(guide);
  const acupoints = guide.recommendedTsuboIds.flatMap(code => {
    const point = ACUPOINTS_MASTER.find(candidate => candidate.codeLower === code);
    return point ? [point] : [];
  });
  const resources = SYMPTOM_LEARNING_RESOURCES[guide.id];
  const lecture = CURRICULUM_DATA.flatMap(stage => stage.lectures).find(item => item.id === resources?.lectureId);
  const article = ARTICLES.find(item => item.id === resources?.articleId);
  const clinicalCase = CLINICAL_CASES.find(item => item.id === resources?.caseId);
  const papers = getSymptomRelatedPapers(guide);
  const relatedGuides = SYMPTOMS.filter(item => item.id !== guide.id && item.category === guide.category);
  const sections = [{ id: 'safety', label: '受診の目安' }, { id: 'traditional', label: '伝統医学での分類' }, { id: 'acupoints', label: '関連経穴' }, { id: 'daily-life', label: '日常の工夫' }, { id: 'sources', label: '出典・研究資料' }, { id: 'learning', label: '次に学ぶ' }];

  return (
    <div className="reading-page mx-auto max-w-4xl space-y-7 px-4 py-8 text-base leading-relaxed text-[#232826] dark:text-[#FAF8F5] sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomGuideJsonLd(guide)).replace(/</g, '\\u003c') }} />
      <nav aria-label="パンくず" className="flex flex-wrap items-center gap-2 text-sm"><Link href="/" className={linkClass}>ホーム</Link><span aria-hidden="true">/</span><Link href="/symptoms" className={linkClass}>症状別ガイド</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
      <header className="space-y-4">
        <p className="text-sm font-semibold text-[#1E3D34] dark:text-[#9CCDB8]">{guide.category} ／ 症状別の学習ガイド</p>
        <h1 className="font-serif text-3xl font-bold leading-snug sm:text-4xl">{guide.title}</h1>
        <p className="text-lg leading-relaxed">{guide.summary}</p>
        <p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">更新：<time dateTime={SYMPTOM_GUIDES_REVISED_AT}>{SYMPTOM_GUIDES_REVISED_AT}</time> ／ <Link href="/editorial-policy" className="underline">専門家監修は未完了</Link></p>
        <p className="leading-relaxed">{SYMPTOM_GUIDANCE_SCOPE}</p>
      </header>
      <section id="safety" className="scroll-mt-28 space-y-3" aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="font-serif text-2xl font-bold">先に確認する：受診の目安</h2>
        {safety && <MedicalSafetyNotice title="受診を優先する症状" message={safety.message} />}
        <a href="#sources" className={linkClass}>この受診案内の出典を確認する ↓</a>
      </section>
      <nav aria-label="ガイドの目次" className="flex flex-wrap gap-x-5 gap-y-2 rounded-2xl bg-[#EBF3EF] p-4 dark:bg-[#182823]">{sections.map(section => <a key={section.id} href={`#${section.id}`} className={linkClass}>{section.label}</a>)}</nav>
      <section id="traditional" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">東洋医学では、どう整理する？</h2>
        <p>{guide.orientalMechanism}</p>
        <p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">ここでの分類は伝統理論の学習用です。症状に分類名を当てはめても、医学的な原因の確認や疾患の除外にはなりません。</p>
        {resources?.perspectiveCaseId && <SymptomPerspective caseId={resources.perspectiveCaseId} />}
      </section>
      <section id="acupoints" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">関連する経穴の位置を学ぶ</h2>
        <p className="text-sm">下の経穴は伝統医学を学ぶための関連例です。この組み合わせの治療効果や、個人に適した施術を示すものではありません。自己刺鍼・自己灸を始めるための手順には使わないでください。</p>
        <ul className="grid gap-3 sm:grid-cols-2">{acupoints.map(point => <li key={point.codeLower} className="space-y-2 rounded-xl bg-[#FAF8F5] p-4 dark:bg-[#10171F]"><h3 className="font-serif text-xl font-bold">{point.name} <span className="font-sans text-sm font-normal">{point.kana} ／ {point.code}</span></h3><p className="text-sm">{point.locationSimple}</p><Link href={`/tsubo/${point.codeLower}`} className={linkClass}>{point.name}の位置・伝統的な主治・注意事項 →</Link></li>)}</ul>
      </section>
      <section id="daily-life" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">日常生活で確認すること</h2>
        <div className="space-y-2"><h3 className="text-lg font-bold">食事・飲み物</h3><p>{guide.lifestyleAdvice.diet}</p></div>
        <div className="space-y-2"><h3 className="text-lg font-bold">休息・生活習慣・症状の記録</h3><p>{guide.lifestyleAdvice.habit}</p></div>
      </section>
      <section id="sources" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">出典と、確認できる範囲</h2>
        <p className="text-sm">受診の目安と鍼灸の一般的な安全性を確認する資料です。経穴例の効果や、伝統的な分類と病名の対応を証明する出典としては扱いません。</p>
        <ul className="space-y-4">{sources.map(source => <li key={source.url} className="space-y-1"><p className="text-sm font-semibold">{source.scope}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{source.title} ↗</a><p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">確認する箇所：{source.section}</p></li>)}</ul>
        <SymptomResearchReferences papers={papers} />
      </section>
      <section id="learning" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">考え方を、もう少し学ぶ</h2>
        <ul className="space-y-3">
          {lecture && <li><Link href={`/curriculum/${lecture.id}`} className={linkClass}>関連講義：{lecture.title} →</Link></li>}
          {article && <li><Link href={`/articles/${article.id}`} className={linkClass}>関連コラム：{article.title} →</Link></li>}
          {clinicalCase && <li><Link href={`/cases/${clinicalCase.id}`} className={linkClass}>架空症例で考える：{clinicalCase.title} →</Link><p className="text-sm">症例の答えを自分の症状の診断や施術の指示に置き換えないでください。</p></li>}
          <li><Link href="/diagnosis" className={linkClass}>気血水の傾向を振り返る学習用チェック →</Link><p className="text-sm">回答から傾向を整理するツールです。症状の原因や病名を判定する検査ではありません。</p></li>
        </ul>
        {relatedGuides.length > 0 && <div className="space-y-2 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]"><h3 className="text-lg font-bold">同じ分野のガイド</h3><ul className="space-y-1">{relatedGuides.map(item => <li key={item.id}><Link href={symptomGuidePath(item)} className={linkClass}>{item.title} →</Link></li>)}</ul></div>}
        <Link href="/symptoms" className={linkClass}>すべての症状別ガイドへ戻る →</Link>
      </section>
      <AuthorSupervisorCard topic={guide.title} />
      <Link href={`/contact?source=${encodeURIComponent(symptomGuidePath(guide))}`} className={linkClass}>このガイドの記述・出典について連絡する →</Link>
    </div>
  );
}
