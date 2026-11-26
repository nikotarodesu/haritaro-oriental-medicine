import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3, GitCompareArrows, GraduationCap, Heart, Info, MessageCircle, ShieldCheck, Stethoscope } from 'lucide-react';
import { PAGE_REVISIONS } from '@/config/contentUpdates';
import { ALL_NAV_ITEMS } from '@/config/navigationItems';
import { KNEE_RESEARCH_HREF, PATTERN_AGREEMENT_HREF } from '@/config/acupunctureLearning';
import { pageSocialMetadata, SITE_ORIGIN } from '@/config/seo';
import { CASE_STUDY_DESCRIPTORS } from '@/data/cases/caseStudyCatalog';
import CaseStudyResume from '@/components/cases/CaseStudyResume';
import { CASE_REASONING_ANCHOR } from '@/utils/caseStudyNavigation';
import { ClinicalCheckArtwork } from '@/components/clinical/ClinicalArtwork';
import ClinicalDashboard from '@/components/clinical/ClinicalDashboard';
import styles from '@/components/clinical/ClinicalPractice.module.css';
import LearningCredits from '@/components/common/LearningCredits';
import PublicLectureIndex from '@/components/curriculum/PublicLectureIndex';

const path = '/clinical';
const url = SITE_ORIGIN + path;
const revisedAt = PAGE_REVISIONS[path];
const title = '鍼灸の症例演習・配穴演習・見立ての練習｜はり太郎の臨床演習';
const description = '架空の症例で、本人が話したことと四診の所見を読み、見立てや配穴を考えます。五労チェッカーと気血水の体質チェックも使えます。';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  ...pageSocialMetadata(title, description, path),
};

const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';
const checks = [
  {
    kind: 'gorou',
    href: ALL_NAV_ITEMS.gorou.href,
    label: '五労チェッカー',
    description: '長く続けがちな動作を選び、休憩や体の動かし方の例を読みます。',
  },
  {
    kind: 'constitution',
    href: ALL_NAV_ITEMS.diagnosis.href,
    label: '気血水の体質チェック（学習用）',
    description: '12問の回答から、気虚・気滞・血虚などの伝統的な分類を学びます。',
  },
] as const;

const exercises = [
  { ...ALL_NAV_ITEMS.cases, label: '模擬症例を一覧で見る', description: `${CASE_STUDY_DESCRIPTORS.length}例から、訴えや難易度を見て選べます。` },
  { ...ALL_NAV_ITEMS.simulator, label: '弁証（所見から見立てる）', description: '3つの模擬症例を6段階で検討します。条件を変え、見立てを見直します。' },
  { ...ALL_NAV_ITEMS.haiketsu, label: '配穴を練習する', description: 'ツボを組み合わせ、選んだ理由を書きます。' },
];

const casePreview = [
  { label: '本人の訴え', text: '「こめかみがズキズキする」', icon: MessageCircle },
  { label: '症状の経過', text: '1か月前から繰り返し、仕事が忙しい日に強くなる。', icon: Clock3 },
  { label: '四診の所見', text: '目が充血し、脈は張りがあって速い。', icon: Stethoscope },
] as const;

const headacheCourseStages = [
  { href: '/curriculum/lecture-practice-2', label: '相談と安全確認' },
  { href: '/curriculum/lecture-practice-4', label: '問診と弁証' },
  { href: '/curriculum/lecture-practice-6', label: '目標と施術計画' },
  { href: '/curriculum/lecture-practice-8', label: '説明・同意と記録' },
  { href: '/curriculum/lecture-practice-9', label: '施術直後の反応' },
  { href: '/curriculum/lecture-practice-10', label: '7日後の再評価' },
];

const researchExercises = [
  { href: PATTERN_AGREEMENT_HREF, label: '同じ症例で弁証が分かれる理由を考える', icon: GitCompareArrows },
  { href: KNEE_RESEARCH_HREF, label: '膝の痛みを比べた試験を読む', icon: BookOpen },
  { href: '/curriculum/lecture-treatment-9#lecture-section-4', label: '施術後の胸痛・息苦しさに対応する', icon: ShieldCheck },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': url + '#webpage',
  url,
  name: title,
  description,
  inLanguage: 'ja',
  dateModified: revisedAt,
  isPartOf: { '@id': SITE_ORIGIN + '/#website' },
  publisher: { '@id': SITE_ORIGIN + '/#organization' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [...exercises, ...checks].map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.label, url: SITE_ORIGIN + item.href,
    })),
  },
};

export default function ClinicalLandingPage() {
  const firstCase = CASE_STUDY_DESCRIPTORS[0];
  const firstCaseHref = firstCase ? `/cases/${firstCase.id}` : undefined;
  return (
    <div className={`clinical-page clinical-page--focused ${styles.landing}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <div>
          <h1 id="clinical-series-heading">はり太郎の臨床演習</h1>
          <p>鍼灸学生・鍼灸師向けの教材です。初めての方は、短い頭痛の模擬症例を読み、最初の設問で考え方を確かめられます。</p>
          <CaseStudyResume studies={CASE_STUDY_DESCRIPTORS} className="mt-4" fallback={firstCaseHref && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 print:hidden">
              <Link href={firstCaseHref} className="page-primary-action">
                頭痛の模擬症例を読む<ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={`${firstCaseHref}#${CASE_REASONING_ANCHOR}`} scroll={false} className="ui-text-link inline-flex min-h-11 items-center">
                最初の設問へ
              </Link>
            </div>
          )} />
          <Link href="/symptoms" className="ui-text-link mt-2 inline-flex min-h-11 items-center text-sm">症状から受診の目安を探す（一般向け）</Link>
        </div>
        <figure className={styles.casePreview}>
          <figcaption>短い症例演習の例</figcaption>
          <dl>
            {casePreview.map(({ label, text, icon: Icon }) => (
              <div key={label}>
                <dt><span className={styles.casePreviewIcon} aria-hidden="true"><Icon /></span>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </figure>
      </header>

      <section id="headache-course" className={styles.caseCourse} aria-labelledby="headache-course-heading">
        <div className={styles.caseCourseIntro}>
          <div>
            <p className="text-sm font-semibold">連続演習</p>
            <h2 id="headache-course-heading" className={styles.sectionTitle}>相談から7日後まで追う：頭痛の架空症例</h2>
            <p>夕方の頭痛で仕事や家事に支障が出ている43歳の女性の事例です。6段階の記録を読み、痛みと普段の生活の変化を考えます。</p>
          </div>
          <Link href="/curriculum/lecture-practice-1" className="page-secondary-action">
            連続演習の進め方を読む<ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className={styles.caseCourseStages} role="list">
          {headacheCourseStages.map(({ href, label }, index) => (
            <li key={href}>
              <Link href={href} prefetch={false} className={styles.caseCourseStage}>
                <span className={styles.caseCourseNumber} aria-hidden="true">{index + 1}</span>
                <span>{label}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="tools" tabIndex={-1} className={styles.section} aria-labelledby="clinical-practice-heading">
        <h2 id="clinical-practice-heading" className={styles.sectionTitle}>症例・配穴の演習</h2>
        <ul className={styles.exerciseGrid}>
          {exercises.map(({ icon: Icon, ...tool }) => (
            <li key={tool.href}>
              <Link href={tool.href} className={styles.exerciseCard}>
                <span className={styles.exerciseIcon}><Icon aria-hidden="true" /></span>
                <div className={styles.cardCopy}>
                  <h3>{tool.label}</h3>
                  <p>{tool.description}</p>
                </div>
                <ArrowRight className={styles.cardArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="quick-checks" tabIndex={-1} className={styles.section} aria-labelledby="clinical-checks-heading">
        <h2 id="clinical-checks-heading" className={styles.sectionTitle}>生活・体調のチェック</h2>
        <p className={styles.checkNote}>
          <Info aria-hidden="true" />
          <span>チェック結果は東洋医学を学ぶための目安です。病気の診断や施術の判断には使えません。</span>
        </p>
        <ul className={styles.checkGrid}>
          {checks.map(check => (
            <li key={check.kind}>
              <Link href={check.href} className={styles.checkCard} data-kind={check.kind}>
                <div className={styles.cardCopy}>
                  <h3>{check.label}</h3>
                  <p>{check.description}</p>
                </div>
                <ClinicalCheckArtwork kind={check.kind} className={styles.checkArtwork} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClinicalDashboard />

      <div className={styles.studyGrid}>
        <section className={styles.reading} aria-labelledby="clinical-study-exercises">
          <h2 id="clinical-study-exercises" className={styles.sectionTitle}>研究を使った演習</h2>
          <ul className={styles.researchList}>
            {researchExercises.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={styles.researchLink}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.reading} aria-labelledby="practice-reading">
          <h2 id="practice-reading" className={styles.sectionTitle}>問診・四診・配穴の講義</h2>
          <PublicLectureIndex series="practice" />
        </section>
      </div>
      <section aria-labelledby="clinical-help-heading" className="clinical-help">
        <h2 id="clinical-help-heading">教材について</h2>
        <details className="rounded-xl border border-frame bg-panel px-4">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>教材の出典・確認範囲</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">教材は新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、中医基礎理論などを参照しています。資料ごとに、何を参照したかを示しています。伝統理論の分類と医学的な評価を区別して利用してください。</p>
        </details>
      </section>
      <LearningCredits revisedAt={revisedAt} />
      <nav aria-label="関連する案内" className="clinical-related-links"><Link href="/learn"><GraduationCap aria-hidden="true" />はり太郎の東洋医学</Link><Link href="/symptoms"><Heart aria-hidden="true" />一般向けの症状別ガイド</Link></nav>
    </div>
  );
}
