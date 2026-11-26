import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, BookOpen, ClipboardList, FlaskConical, MapPin, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import AuthorSupervisorCard from '@/components/common/AuthorSupervisorCard';
import ContentEndAd from '@/components/ads/ContentEndAd';
import BackPainAreaComparison from '@/components/symptoms/BackPainAreaComparison';
import SymptomPerspective from '@/components/symptoms/SymptomPerspective';
import SymptomResearchReferences from '@/components/symptoms/SymptomResearchReferences';
import SymptomIcon from '@/components/symptoms/SymptomIcon';
import SymptomRecordingFigure from '@/components/symptoms/SymptomRecordingFigure';
import { AtlasStudyCard } from '@/components/tsubo/AcupointResearch';
import { PUBLIC_SYMPTOM_CONTENT } from '@/data/publicSymptoms';
import { SYMPTOM_RECORDING_EXAMPLES } from '@/data/symptomRecordingExamples';
import { SYMPTOM_RESEARCH_NOTES } from '@/data/symptomResearchNotes';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE, SYMPTOM_SAFETY_GUIDANCE } from '@/data/symptomData';
import { getAcupointByCode } from '@/data/tsubo';
import { getSymptomStudies } from '@/data/tsubo/atlas/evidence';
import { ARTICLES } from '@/data/articleData';
import { CLINICAL_CASES } from '@/data/clinicalCasesData';
import { getPublicLectureArticle } from '@/data/publicLectures';
import { pageSocialMetadata } from '@/config/seo';
import { ACUPUNCTURE_GUIDE, MOXIBUSTION_KNEE_RESEARCH_HREF, SYMPTOM_RESEARCH_LINKS } from '@/config/acupunctureLearning';
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
  const researchNote = SYMPTOM_RESEARCH_NOTES[guide.id];
  const researchLink = SYMPTOM_RESEARCH_LINKS[guide.id];
  const hasResearch = pointStudies.length > 0 || !!researchNote || !!researchLink;
  const recordingExample = SYMPTOM_RECORDING_EXAMPLES[guide.id];
  const relatedGuides = SYMPTOMS.filter(item => item.id !== guide.id && item.category === guide.category);
  const sections = [
    { id: 'daily-life', label: '日常の工夫' },
    { id: 'traditional', label: '東洋医学で学ぶ例' },
    { id: 'acupoints', label: '教材に出てくるツボ' },
    ...(hasResearch ? [{ id: 'guide-studies', label: 'ツボを使った研究' }] : []),
    { id: 'learning', label: '関連記事・教材' },
    { id: 'sources', label: '出典と確認範囲' },
  ];

  return (
    <article className="page-layout atlas-page atlas-guide symptoms-guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomGuideJsonLd(guide)).replace(/</g, '\\u003c') }} />
      <header className="atlas-guide-heading">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb"><Link href="/tsubo">ツボ図鑑</Link><span aria-hidden="true">/</span><Link href="/symptoms">一般向けの症状別ガイド</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
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
      <nav aria-labelledby="symptoms-contents-heading" className="symptoms-contents">
        <h2 id="symptoms-contents-heading">目次</h2>
        <ul className="atlas-section-nav">
          <li className="symptoms-contents-primary"><a href="#recording"><ClipboardList size={17} aria-hidden="true" /><span>受診時に伝えることへ</span><ArrowDown size={14} aria-hidden="true" /></a></li>
          {sections.map(({ id, label }) => <li key={id}><a href={`#${id}`}>{label}<ArrowDown size={14} aria-hidden="true" /></a></li>)}
        </ul>
      </nav>
      <section id="recording" tabIndex={-1} className={sectionClass} aria-labelledby="symptom-recording-heading">
        <h2 id="symptom-recording-heading" className="atlas-section-title">受診時に伝えること</h2>
        {slug === 'lower-back-pain-sciatica' ? <BackPainAreaComparison /> : recordingExample && (
          <SymptomRecordingFigure diagram={recordingExample} />
        )}
        <div className="atlas-observations">
          <h3><ClipboardList size={20} aria-hidden="true" />書いておくと伝えやすいこと</h3>
          <ul>{content.observations.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section id="daily-life" className={sectionClass}>
        <h2 className="atlas-section-title">日常の工夫</h2>
        <div className="symptoms-daily-grid">
          {content.dailyLife.map(({ title, body }) => (
            <div key={title} className="symptoms-daily-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="traditional" className={sectionClass}>
        <h2 className="atlas-section-title">東洋医学で学ぶ例</h2>
        {content.traditional.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {resources?.perspectiveCaseId && <SymptomPerspective caseId={resources.perspectiveCaseId} />}
      </section>
      <section id="acupoints" className="atlas-guide-points atlas-target" aria-labelledby="guide-points-heading">
        <div className="atlas-guide-points-heading">
          <h2 id="guide-points-heading" className="atlas-section-title">教材に出てくるツボ</h2>
          <p>図鑑で位置と安全上の注意を確認できます。</p>
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
          {hasResearch && <a href="#guide-studies" className="atlas-text-action"><FlaskConical size={16} aria-hidden="true" />関連する研究を読む</a>}
          <Link href={ACUPUNCTURE_GUIDE.href} className="atlas-text-action"><BookOpen size={16} aria-hidden="true" />{ACUPUNCTURE_GUIDE.label}</Link>
        </div>
        {pointStudies.some(study => study.id === 'functional-constipation') && (
          <p className="text-sm atlas-muted">
            <a href="#functional-constipation" className={linkClass}>慢性便秘の試験</a>で使われた
            <Link href="/tsubo/sp14#acupoint-location" prefetch={false} className={linkClass}>腹結の位置図</Link>
            と
            <Link href="/tsubo/st37#acupoint-nearby" prefetch={false} className={linkClass}>上巨虚と近くのツボの比較図</Link>
            を図鑑で確認できます。
          </p>
        )}
      </section>
      {hasResearch && <section id="guide-studies" className={sectionClass}>
        <h2 className="atlas-section-title">ツボを使った研究</h2>
        {researchNote && <article className="atlas-study-card">
          <h3>{researchNote.title}</h3>
          <p>{researchNote.body}</p>
          <ul className="atlas-source-links" aria-label="解説の出典">
            {researchNote.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}
          </ul>
        </article>}
        {pointStudies.length > 0 && <div className="atlas-study-list">{pointStudies.map(study => <AtlasStudyCard key={study.id} study={study} />)}</div>}
        {researchLink && (
          <p><Link href={researchLink.href} className={linkClass}>{researchLink.label}</Link></p>
        )}
        {slug === 'knee-joint-pain' && (
          <p><Link href={MOXIBUSTION_KNEE_RESEARCH_HREF} className={linkClass}>膝のお灸で、痛みとやけどをどう調べたか</Link></p>
        )}
      </section>}
      <section id="learning" className={sectionClass}>
        <h2 className="atlas-section-title">関連記事・教材</h2>
        <ul className="symptoms-reading-list">
          {lectureId && lecture && <li><Link href={`/curriculum/${lectureId}`} className={linkClass}>{lecture.title}</Link></li>}
          {article && <li><Link href={`/articles/${article.id}`} className={linkClass}>{article.title}</Link></li>}
          {clinicalCase && <li><Link href={`/cases/${clinicalCase.id}`} className={linkClass}>{clinicalCase.title}（架空症例）</Link><p className="text-sm">症例の答えを自分の症状の診断や施術の指示に置き換えないでください。</p></li>}
          {resources?.clinicalSlug && <li><Link href={`/clinical/symptoms/${resources.clinicalSlug}`} className={linkClass}>{guide.title}の問診・再評価を学ぶ（鍼灸学生・鍼灸師向け）</Link></li>}
          <li><Link href="/diagnosis" className={linkClass}>気血水の体質チェック（学習用）</Link><p className="text-sm">12の質問で、気虚・気滞など東洋医学の分類を学べます。病気の診断や施術の判断には使えません。</p></li>
        </ul>
        {relatedGuides.length > 0 && <div className="space-y-2 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]"><h3 className="text-lg font-bold">同じ分野のガイド</h3><ul className="space-y-1">{relatedGuides.map(item => <li key={item.id}><Link href={symptomGuidePath(item)} className={linkClass}>{item.title}</Link></li>)}</ul></div>}
        <Link href="/symptoms" className={linkClass}>一般向けの症状別ガイド一覧へ</Link>
      </section>
      <section id="sources" className={sectionClass}>
        <h2 className="atlas-section-title">出典と確認範囲</h2>
        <p className="text-sm">受診の目安や日常の工夫を調べた資料です。鍼灸の研究を読むときは、どんな症状の人を集め、何と比べ、何を測ったかを確かめてください。</p>
        <ul className="symptoms-source-list">{sources.map(source => <li key={source.url}><p className="symptoms-source-scope">{source.scope}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{source.title} ↗</a><p className="symptoms-source-context">{source.section}</p></li>)}</ul>
        <SymptomResearchReferences papers={papers} />
      </section>
      <details className="atlas-disclosure atlas-guide-scope">
        <summary>このガイドで確認できること</summary>
        <p>{SYMPTOM_GUIDANCE_SCOPE}</p>
        <p><time dateTime={revision}>{revision}</time> 更新</p>
      </details>
      <AuthorSupervisorCard />
      <Link href={`/contact?source=${encodeURIComponent(symptomGuidePath(guide))}`} className={linkClass}>内容の誤りや出典について連絡する</Link>
      <ContentEndAd key={slug} />
    </article>
  );
}
