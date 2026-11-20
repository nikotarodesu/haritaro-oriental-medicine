import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Heart } from 'lucide-react';
import { PAGE_REVISIONS } from '@/config/contentUpdates';
import { ALL_NAV_ITEMS } from '@/config/navigationItems';
import { pageSocialMetadata, SITE_ORIGIN } from '@/config/seo';
import { ClinicalCheckArtwork, ClinicalHeroArtwork } from '@/components/clinical/ClinicalArtwork';
import ClinicalDashboard from '@/components/clinical/ClinicalDashboard';
import ClinicalPatternExercise from '@/components/clinical/ClinicalPatternExercise';
import styles from '@/components/clinical/ClinicalPractice.module.css';
import LearningCredits from '@/components/common/LearningCredits';
import PublicLectureIndex from '@/components/curriculum/PublicLectureIndex';

const path = '/clinical';
const url = SITE_ORIGIN + path;
const revisedAt = PAGE_REVISIONS[path];
const title = '鍼灸の症例演習・配穴演習・見立ての練習｜はり太郎の臨床演習';
const description = '五労チェッカーは、座る・立つなど長く続ける動作を振り返る教材です。気血水は12問で学び、模擬症例では所見から見立てや配穴を考えます。';
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
    description: '見る、横になる、座る、立つ、歩く。長く続けることが多い動作を選ぶと、休憩や動き方の例が読めます。',
  },
  {
    kind: 'constitution',
    href: ALL_NAV_ITEMS.diagnosis.href,
    label: '気血水 体質セルフチェック',
    description: '12問の答えを振り返り、気虚・気滞・血虚などの伝統的な分類を学びます。',
  },
] as const;

const exercises = [
  { ...ALL_NAV_ITEMS.cases, label: '症例演習', description: '主訴・経過・四診を読み、見立ての根拠を答える' },
  { ...ALL_NAV_ITEMS.simulator, label: '見立ての練習', description: '所見が候補の証とどこで合い、どこで食い違うか比べる' },
  { ...ALL_NAV_ITEMS.haiketsu, label: '配穴演習', description: 'ツボを組み合わせ、選んだ理由を書く' },
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
    itemListElement: [...checks, ...exercises].map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.label, url: SITE_ORIGIN + item.href,
    })),
  },
};

export default function ClinicalLandingPage() {
  return (
    <div className="clinical-page clinical-page--focused">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className={styles.hero}>
        <div>
          <h1 id="clinical-series-heading">はり太郎の臨床演習</h1>
          <p>座る・立つなどの習慣や体調をチェックできます。模擬症例では、所見を読んで見立てと配穴を考えます。</p>
        </div>
        <ClinicalHeroArtwork className={styles.heroArtwork} />
      </header>

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
        <p className={styles.checkNote}>チェック結果は東洋医学を学ぶための目安です。実際の診断や施術の判断には使えません。</p>
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
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClinicalPatternExercise />

      <section className={styles.reading} aria-labelledby="practice-reading">
        <h2 id="practice-reading" className={styles.sectionTitle}>問診・四診・配穴の講義</h2>
        <PublicLectureIndex series="practice" />
      </section>
      <ClinicalDashboard />
      <section aria-labelledby="clinical-help-heading" className="clinical-help">
        <h2 id="clinical-help-heading">利用・保存について</h2>
        <details className="rounded-xl border border-frame bg-panel px-4">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>下書きの保存先と入力できる情報</summary>
          <div className="space-y-3 pb-4 text-sm leading-relaxed ui-muted">
            <p>作業中の下書きは、このブラウザのタブに一時保存されます。氏名・電話番号・住所は入力せず、患者番号などの記号を使ってください。自由記述にも本人を特定できる情報を含めないでください。</p>
            <Link href="/privacy" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>記録と個人情報の取り扱い</Link>
          </div>
        </details>
        <details className="rounded-xl border border-frame bg-panel px-4">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>教材の出典・確認範囲</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">教材は新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、中医基礎理論などを参照しています。全件の医学記述の照合・専門家監修は未完了です。伝統理論の分類と医学的な評価を区別して利用してください。</p>
        </details>
      </section>
      <LearningCredits revisedAt={revisedAt} />
      <nav aria-label="関連する案内" className="clinical-related-links"><Link href="/learn"><GraduationCap aria-hidden="true" />はり太郎の東洋医学</Link><Link href="/symptoms"><Heart aria-hidden="true" />ツボ図鑑の症状ガイド</Link></nav>
    </div>
  );
}
