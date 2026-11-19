import type { Metadata } from 'next';
import Link from 'next/link';
import PageIntro from '@/components/design/PageIntro';
import { ShieldCheck, Layers, MapPin, Leaf, BookOpen, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import MedicalSafetyNotice from '@/components/MedicalSafetyNotice';
import AuthorSupervisorCard from '@/components/common/AuthorSupervisorCard';
import SymptomPerspective from '@/components/symptoms/SymptomPerspective';
import SymptomResearchReferences from '@/components/symptoms/SymptomResearchReferences';
import { PUBLIC_SYMPTOM_CONTENT } from '@/data/publicSymptoms';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE, SYMPTOM_SAFETY_GUIDANCE } from '@/data/symptomData';
import { getAcupointByCode } from '@/data/tsubo';
import { ARTICLES } from '@/data/articleData';
import { CLINICAL_CASES } from '@/data/clinicalCasesData';
import { getPublicLectureArticle } from '@/data/publicLectures';
import { pageSocialMetadata } from '@/config/seo';
import { getSymptomGuide, getSymptomGuideJsonLd, getSymptomGuideSources, getSymptomRelatedPapers, SYMPTOM_GUIDES_REVISED_AT, SYMPTOM_LEARNING_RESOURCES, symptomGuideDescription, symptomGuidePath, symptomGuideTitle } from '@/utils/symptomGuides';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return SYMPTOMS.map(guide => ({ slug: guide.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSymptomGuide(slug);
  const content = PUBLIC_SYMPTOM_CONTENT[slug];
  if (!guide || !content) notFound();
  const title = symptomGuideTitle(guide);
  const description = symptomGuideDescription(guide);
  return { title, description, alternates: { canonical: symptomGuidePath(guide) }, ...pageSocialMetadata(title, description, symptomGuidePath(guide)) };
}

const sectionClass = 'scroll-mt-28 space-y-4 rounded-2xl border border-[#D6DED7] bg-white p-5 dark:border-[#34483C] dark:bg-[#17212A] sm:p-7';
const linkClass = 'inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#9CCDB8]';

export default async function SymptomGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSymptomGuide(slug);
  const content = PUBLIC_SYMPTOM_CONTENT[slug];
  if (!guide || !content) notFound();
  const safety = SYMPTOM_SAFETY_GUIDANCE[guide.id];
  const sources = getSymptomGuideSources(guide);
  const acupoints = guide.recommendedTsuboIds.flatMap(code => {
    const point = getAcupointByCode(code);
    return point ? [point] : [];
  });
  const resources = SYMPTOM_LEARNING_RESOURCES[guide.id];
  const lectureId = resources?.lectureId;
  const lecture = lectureId ? getPublicLectureArticle(lectureId) : undefined;
  const article = ARTICLES.find(item => item.id === resources?.articleId);
  const clinicalCase = CLINICAL_CASES.find(item => item.id === resources?.caseId);
  const papers = getSymptomRelatedPapers(guide);
  const relatedGuides = SYMPTOMS.filter(item => item.id !== guide.id && item.category === guide.category);
  const sections = [
    { id: 'safety', label: '受診の目安', icon: ShieldCheck },
    { id: 'daily-life', label: '日常の工夫', icon: Leaf },
    { id: 'traditional', label: '東洋医学の見方', icon: Layers },
    { id: 'acupoints', label: '関連するツボ', icon: MapPin },
    { id: 'learning', label: '関連記事・教材', icon: ArrowRight },
    { id: 'sources', label: '出典・研究資料', icon: BookOpen },
  ];

  return (
    <div className="reading-page page-layout page-layout--reading space-y-7 text-base leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomGuideJsonLd(guide)).replace(/</g, '\\u003c') }} />
      <nav aria-label="パンくず" className="flex flex-wrap items-center gap-2 text-sm"><Link href="/" className={linkClass}>ホーム</Link><span aria-hidden="true">/</span><Link href="/symptoms" className={linkClass}>症状別ガイド</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
      <PageIntro eyebrow={`${guide.category} ／ 症状別ガイド`} title={guide.title} description={content.summary} art="care" compact>
        <p className="text-sm text-[#59615D] dark:text-[#AFBDC8]"><time dateTime={SYMPTOM_GUIDES_REVISED_AT}>{SYMPTOM_GUIDES_REVISED_AT}</time> 更新 ／ <Link href="/editorial-policy" className="underline">専門家監修は未完了</Link></p>
      </PageIntro>
      <section id="safety" className="scroll-mt-28 space-y-3" aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="font-serif text-2xl font-bold">先に確認する受診の目安</h2>
        {safety && <MedicalSafetyNotice title="受診を優先する症状" message={safety.message} />}
        {content.safetyNote && <p className="page-muted text-sm">{content.safetyNote}</p>}
        <a href="#sources" className={linkClass}>受診の目安の出典へ</a>
      </section>
      <p className="page-muted text-sm leading-relaxed">{SYMPTOM_GUIDANCE_SCOPE}</p>
      <nav aria-label="ガイドの目次" className="grid grid-cols-2 gap-2 sm:grid-cols-3">{sections.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`} className="page-secondary-action justify-start"><Icon size={18} aria-hidden="true" />{label}</a>)}</nav>
      <section id="daily-life" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">日常の工夫</h2>
        {content.dailyLife.map(({ title, body }) => (
          <div key={title} className="space-y-2">
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{body}</p>
          </div>
        ))}
        <div className="space-y-2 rounded-xl bg-[#FAF8F5] p-4 dark:bg-[#10171F]">
          <h3 className="text-lg font-bold">受診時に伝えること</h3>
          <ul className="list-disc space-y-1 pl-5">{content.observations.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section id="traditional" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">東洋医学では、どう整理する？</h2>
        {content.traditional.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {resources?.perspectiveCaseId && <SymptomPerspective caseId={resources.perspectiveCaseId} />}
      </section>
      <section id="acupoints" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">関連するツボの位置</h2>
        <p className="text-sm">経穴（ツボ）は伝統医学を学ぶための関連例です。図鑑で位置と注意事項を確認できます。自分で鍼を刺したり、お灸を始めたりするための手順には使わないでください。</p>
        <ul className="grid gap-3 sm:grid-cols-2">{acupoints.map(point => <li key={point.codeLower} className="space-y-2 rounded-xl bg-[#FAF8F5] p-4 dark:bg-[#10171F]"><h3 className="font-serif text-xl font-bold">{point.name} <span className="font-sans text-sm font-normal">{point.kana} ／ {point.code}</span></h3><p className="text-sm">{point.locationSimple}</p><Link href={`/tsubo/${point.codeLower}`} className={linkClass}>{point.name}の位置と注意事項を読む</Link></li>)}</ul>
      </section>
      <section id="learning" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">関連記事・教材</h2>
        <ul className="space-y-3">
          {lectureId && lecture && <li><Link href={`/curriculum/${lectureId}`} className={linkClass}>{lecture.title}</Link></li>}
          {article && <li><Link href={`/articles/${article.id}`} className={linkClass}>関連コラム：{article.title} →</Link></li>}
          {clinicalCase && <li><Link href={`/cases/${clinicalCase.id}`} className={linkClass}>架空症例で考える：{clinicalCase.title} →</Link><p className="text-sm">症例の答えを自分の症状の診断や施術の指示に置き換えないでください。</p></li>}
          <li><Link href="/diagnosis" className={linkClass}>気血水の傾向を振り返る学習用チェック →</Link><p className="text-sm">回答から傾向を整理するツールです。症状の原因や病名を判定する検査ではありません。</p></li>
        </ul>
        {relatedGuides.length > 0 && <div className="space-y-2 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]"><h3 className="text-lg font-bold">同じ分野のガイド</h3><ul className="space-y-1">{relatedGuides.map(item => <li key={item.id}><Link href={symptomGuidePath(item)} className={linkClass}>{item.title} →</Link></li>)}</ul></div>}
        <Link href="/symptoms" className={linkClass}>すべての症状別ガイドへ戻る →</Link>
      </section>
      <section id="sources" className={sectionClass}>
        <h2 className="font-serif text-2xl font-bold">出典と確認範囲</h2>
        <p className="text-sm">受診の目安、日常の工夫、鍼灸の一般的な安全性について、参照した資料と該当箇所を示します。経穴の研究は、対象になった人や評価した内容と合わせて読みます。</p>
        <ul className="space-y-4">{sources.map(source => <li key={source.url} className="space-y-1"><p className="text-sm font-semibold">{source.scope}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{source.title} ↗</a><p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">{source.section}</p></li>)}</ul>
        <SymptomResearchReferences papers={papers} />
      </section>
      <AuthorSupervisorCard topic={guide.title} />
      <Link href={`/contact?source=${encodeURIComponent(symptomGuidePath(guide))}`} className={linkClass}>このガイドの記述・出典について連絡する →</Link>
    </div>
  );
}
