import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FlaskConical, MapPin, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import AuthorSupervisorCard from '@/components/common/AuthorSupervisorCard';
import SymptomPerspective from '@/components/symptoms/SymptomPerspective';
import SymptomResearchReferences from '@/components/symptoms/SymptomResearchReferences';
import SymptomIcon from '@/components/symptoms/SymptomIcon';
import { AtlasStudyCard } from '@/components/tsubo/AcupointResearch';
import { PUBLIC_SYMPTOM_CONTENT } from '@/data/publicSymptoms';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE, SYMPTOM_SAFETY_GUIDANCE } from '@/data/symptomData';
import { getAcupointByCode } from '@/data/tsubo';
import { getSymptomStudies } from '@/data/tsubo/atlas/evidence';
import { ARTICLES } from '@/data/articleData';
import { CLINICAL_CASES } from '@/data/clinicalCasesData';
import { getPublicLectureArticle } from '@/data/publicLectures';
import { pageSocialMetadata } from '@/config/seo';
import { ACUPUNCTURE_GUIDE } from '@/config/acupunctureLearning';
import { getSymptomGuide, getSymptomGuideJsonLd, getSymptomGuideRevision, getSymptomGuideSources, getSymptomRelatedPapers, SYMPTOM_LEARNING_RESOURCES, symptomGuideDescription, symptomGuidePath, symptomGuideTitle } from '@/utils/symptomGuides';

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

const sectionClass = 'atlas-guide-section atlas-target';
const linkClass = 'atlas-source-link';

export default async function SymptomGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSymptomGuide(slug);
  const content = PUBLIC_SYMPTOM_CONTENT[slug];
  if (!guide || !content) notFound();
  const safety = SYMPTOM_SAFETY_GUIDANCE[guide.id];
  const revision = getSymptomGuideRevision(guide);
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
  const pointStudies = getSymptomStudies(guide.id);
  const relatedGuides = SYMPTOMS.filter(item => item.id !== guide.id && item.category === guide.category);
  const sections = [
    { id: 'daily-life', label: '日常の工夫' },
    { id: 'traditional', label: '東洋医学の見方' },
    { id: 'learning', label: '関連記事・教材' },
    { id: 'sources', label: '出典・研究資料' },
  ];

  return (
    <article className="page-layout atlas-page atlas-guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomGuideJsonLd(guide)).replace(/</g, '\\u003c') }} />
      <header className="atlas-guide-heading">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb"><Link href="/tsubo">ツボ図鑑</Link><span aria-hidden="true">/</span><Link href="/symptoms">症状別ガイド</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.category}</span></nav>
          <h1>{guide.title}</h1>
          <p>{content.summary}</p>
        </div>
        <span className="atlas-guide-icon atlas-guide-icon--heading"><SymptomIcon id={guide.id} className="h-10 w-10" /></span>
      </header>
      <section id="safety" className="atlas-safety atlas-target" aria-labelledby="safety-heading">
        <h2 id="safety-heading"><ShieldCheck size={18} aria-hidden="true" />受診の目安</h2>
        {safety && <p>{safety.message}</p>}
        {content.safetyNote && <p>{content.safetyNote}</p>}
      </section>
      <section id="acupoints" className="atlas-guide-points atlas-target" aria-labelledby="guide-points-heading">
        <div className="atlas-guide-points-heading">
          <h2 id="guide-points-heading" className="atlas-section-title">関連するツボ</h2>
          <p className="atlas-muted">伝統医学で参照されるツボの例です。</p>
        </div>
        <ul className="atlas-related-points">{acupoints.map(point => (
          <li key={point.codeLower}>
            <Link href={`/tsubo/${point.codeLower}`} className="atlas-related-point">
              <span className="atlas-related-pin"><MapPin size={20} strokeWidth={1.65} aria-hidden="true" /></span>
              <div>
                <h3>{point.name} <span>{point.kana}</span></h3>
                <p>{point.locationSimple}</p>
              </div>
              <span className="atlas-code">{point.code}</span>
            </Link>
          </li>
        ))}</ul>
        <div className="atlas-directory-actions">
          {pointStudies.length > 0 && <a href="#guide-studies" className="atlas-text-action"><FlaskConical size={16} aria-hidden="true" />関連する研究を読む</a>}
          <Link href={ACUPUNCTURE_GUIDE.href} className="atlas-text-action"><BookOpen size={16} aria-hidden="true" />はり・お灸・ツボ押しの違い</Link>
        </div>
      </section>
      <nav aria-label="ガイドの目次" className="atlas-section-nav">{sections.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <section id="daily-life" className={sectionClass}>
        <h2 className="atlas-section-title">日常の工夫</h2>
        {content.dailyLife.map(({ title, body }) => (
          <div key={title} className="space-y-2">
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{body}</p>
          </div>
        ))}
        <div className="atlas-observations">
          <h3 className="text-lg font-bold">受診時に伝えること</h3>
          <ul className="list-disc space-y-1 pl-5">{content.observations.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section id="traditional" className={sectionClass}>
        <h2 className="atlas-section-title">東洋医学の見方</h2>
        {content.traditional.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {resources?.perspectiveCaseId && <SymptomPerspective caseId={resources.perspectiveCaseId} />}
      </section>
      {pointStudies.length > 0 && <section id="guide-studies" className={sectionClass}>
        <h2 className="atlas-section-title">ツボを使った研究</h2>
        <div className="atlas-study-list">{pointStudies.map(study => <AtlasStudyCard key={study.id} study={study} />)}</div>
      </section>}
      <section id="learning" className={sectionClass}>
        <h2 className="atlas-section-title">関連記事・教材</h2>
        <ul className="space-y-3">
          {lectureId && lecture && <li><Link href={`/curriculum/${lectureId}`} className={linkClass}>{lecture.title}</Link></li>}
          {article && <li><Link href={`/articles/${article.id}`} className={linkClass}>{article.title}</Link></li>}
          {clinicalCase && <li><Link href={`/cases/${clinicalCase.id}`} className={linkClass}>{clinicalCase.title}（架空症例）</Link><p className="text-sm">症例の答えを自分の症状の診断や施術の指示に置き換えないでください。</p></li>}
          <li><Link href="/diagnosis" className={linkClass}>気血水の傾向を振り返る学習用チェック</Link><p className="text-sm">回答から傾向を整理するツールです。症状の原因や病名を判定する検査ではありません。</p></li>
        </ul>
        {relatedGuides.length > 0 && <div className="space-y-2 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]"><h3 className="text-lg font-bold">同じ分野のガイド</h3><ul className="space-y-1">{relatedGuides.map(item => <li key={item.id}><Link href={symptomGuidePath(item)} className={linkClass}>{item.title}</Link></li>)}</ul></div>}
        <Link href="/symptoms" className={linkClass}>症状別ガイドの一覧へ</Link>
      </section>
      <section id="sources" className={sectionClass}>
        <h2 className="atlas-section-title">出典と確認範囲</h2>
        <p className="text-sm">受診の目安、日常の工夫、鍼灸の一般的な安全性について、参照した資料と該当箇所を示します。経穴の研究は、対象になった人や評価した内容と合わせて読みます。</p>
        <ul className="space-y-4">{sources.map(source => <li key={source.url} className="space-y-1"><p className="text-sm font-semibold">{source.scope}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{source.title} ↗</a><p className="text-sm text-[#59615D] dark:text-[#AFBDC8]">{source.section}</p></li>)}</ul>
        <SymptomResearchReferences papers={papers} />
      </section>
      <details className="atlas-disclosure atlas-guide-scope">
        <summary>このガイドで確認できること</summary>
        <p>{SYMPTOM_GUIDANCE_SCOPE}</p>
        <p><time dateTime={revision}>{revision}</time> 更新 · <Link href="/editorial-policy" className={linkClass}>専門家監修は未完了</Link></p>
      </details>
      <AuthorSupervisorCard topic={guide.title} />
      <Link href={`/contact?source=${encodeURIComponent(symptomGuidePath(guide))}`} className={linkClass}>このガイドの記述・出典について連絡する</Link>
    </article>
  );
}
