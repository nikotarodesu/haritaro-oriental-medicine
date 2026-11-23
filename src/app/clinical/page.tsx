import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, ClipboardList, GitCompareArrows, GraduationCap, Heart, Info, ShieldCheck } from 'lucide-react';
import { PAGE_REVISIONS } from '@/config/contentUpdates';
import { ALL_NAV_ITEMS } from '@/config/navigationItems';
import { KNEE_RESEARCH_HREF, PATTERN_AGREEMENT_HREF } from '@/config/acupunctureLearning';
import { pageSocialMetadata, SITE_ORIGIN } from '@/config/seo';
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
    label: '気血水 体質チェック',
    description: '12問の回答から、気虚・気滞・血虚などの伝統的な分類を学びます。',
  },
] as const;

const exercises = [
  { ...ALL_NAV_ITEMS.cases, label: '症例演習', description: '主訴・経過・四診を読み、見立ての根拠を答える' },
  { ...ALL_NAV_ITEMS.simulator, label: '見立ての練習', description: '所見と証の候補を比べ、合う点と食い違う点を考える' },
  { ...ALL_NAV_ITEMS.haiketsu, label: '配穴演習', description: 'ツボを組み合わせ、選んだ理由を書く' },
];

const casePreview = [
  { label: '主訴', text: 'こめかみがズキズキし、目が赤くなる' },
  { label: '経過', text: '1か月ほど前から繰り返す。仕事が立て込むと強まる' },
  { label: '四診の所見', text: '目の充血。脈は張りがあり速い' },
] as const;

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
  return (
    <div className={`clinical-page clinical-page--focused ${styles.landing}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <div>
          <h1 id="clinical-series-heading">はり太郎の臨床演習</h1>
          <p>架空の症例で、所見の読み取りとツボの組み合わせを練習します。</p>
        </div>
        <figure className={styles.casePreview}>
          <figcaption><ClipboardList aria-hidden="true" />模擬症例の見本</figcaption>
          <dl>
            {casePreview.map(({ label, text }) => (
              <div key={label}><dt>{label}</dt><dd>{text}</dd></div>
            ))}
          </dl>
        </figure>
      </header>

      <section id="tools" tabIndex={-1} className={styles.section} aria-labelledby="clinical-practice-heading">
        <h2 id="clinical-practice-heading" className={styles.sectionTitle}>症例・配穴の演習</h2>
        <ul className={styles.exerciseGrid}>
          {exercises.map(({ icon: Icon, ...tool }, index) => (
            <li key={tool.href}>
              <Link href={tool.href} className={index === 0 ? `${styles.exerciseCard} ${styles.primaryExercise}` : styles.exerciseCard}>
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
        <p className={styles.checkNote}>
          <Info aria-hidden="true" />
          <span>チェック結果は東洋医学を学ぶための目安です。実際の診断や施術の判断には使えません。</span>
        </p>
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
      <nav aria-label="関連する案内" className="clinical-related-links"><Link href="/learn"><GraduationCap aria-hidden="true" />はり太郎の東洋医学</Link><Link href="/symptoms"><Heart aria-hidden="true" />ツボ図鑑の症状ガイド</Link></nav>
    </div>
  );
}
