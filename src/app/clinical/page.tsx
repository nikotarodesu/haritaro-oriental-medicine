import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown, GraduationCap, Heart } from 'lucide-react';
import { CLINICAL_PRACTICE_ITEMS, type NavItemDefinition } from '@/config/navigationItems';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { SUBSCRIPTION_CONFIG } from '@/config/subscription';
import ClinicalDashboard from '@/components/clinical/ClinicalDashboard';

const title = '鍼灸師の臨床ホーム｜主訴・四診・候補比較・再評価';
const description = '主訴別ガイド、所見の整理、候補の比較、配穴の理由と経過の記録。鍼灸師が確認した情報と自分の判断を分けて残すためのツールです。';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: 'https://www.haritaro.jp/clinical' },
  ...pageSocialMetadata(`${title} | ${SITE_NAME}`, description, '/clinical'),
};

function ToolLinks({ items }: { items: readonly NavItemDefinition[] }) {
  return <ul className="clinical-tool-grid">{items.map(({ icon: Icon, ...tool }) => <li key={tool.href}>
    <Link href={tool.href} className="clinical-tool-card">
      <span className="clinical-tool-icon"><Icon aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><span className="block font-semibold">{tool.label}</span><span className="mt-1 block text-sm ui-muted">{tool.description}</span></span>
      <ArrowRight aria-hidden="true" className="clinical-card-arrow" />
    </Link>
  </li>)}</ul>;
}
const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';

export default function ClinicalLandingPage() {
  const { limits } = SUBSCRIPTION_CONFIG;
  return (
    <div className="clinical-page clinical-page--focused">
      <ClinicalDashboard />
      <details id="tools" className="clinical-practice-disclosure">
        <summary><span><strong>練習する</strong><small>架空症例・弁証・配穴の教材</small></span><ChevronDown aria-hidden="true" /></summary>
        <div className="clinical-practice-content">
          <ToolLinks items={CLINICAL_PRACTICE_ITEMS} />
          <p className="clinical-tool-note">架空症例と教材例で考え方を確かめる演習です。結果だけで診断・施術方針は決まりません。</p>
        </div>
      </details>
      <section aria-labelledby="clinical-help-heading" className="clinical-help">
        <h2 id="clinical-help-heading">利用・保存について</h2>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>登録なしで使える範囲と、記録の保存先</summary>
          <div className="space-y-3 pb-4 text-sm leading-relaxed ui-muted">
            <p>主訴別ガイド、臨床記録、対面問診、弁証の練習、4穴までの配穴の練習は登録不要です。臨床ノートは無料{limits.freePatientNoteMax}件、配穴集は無料{limits.freeMemoMax}件まで保存できます。</p>
            <p>未ログイン時の記録は、このブラウザに保存されます。ログイン中の記録は、自分のアカウントと同期します。未ログイン時の記録を移す場合は、マイノートのバックアップ・取り込みを使ってください。氏名・電話番号・住所は入力せず、患者番号などの記号を使ってください。自由記述にも本人を特定できる情報を含めないでください。</p>
            <Link href="/privacy" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>記録と個人情報の取り扱い</Link>
          </div>
        </details>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>有料プラン・申し込みの受付状況</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">保存件数などの利用範囲と新規申し込みの受付状況は、<Link href="/pricing" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>料金ページ</Link>で確認できます。既存の契約はマイページから管理できます。</p>
        </details>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>教材の出典・確認範囲</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">教材は新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、中医基礎理論などを参照しています。全件の医学記述の照合・専門家監修は未完了です。伝統理論の分類と医学的な評価を区別して利用してください。</p>
          <Link href="/editorial-policy" className={`mb-3 inline-flex min-h-11 items-center underline ${focusClass}`}>出典と確認範囲</Link>
        </details>
      </section>
      <nav aria-label="関連する案内" className="clinical-related-links"><Link href="/learn"><GraduationCap aria-hidden="true" />学生向けの学習案内</Link><Link href="/symptoms"><Heart aria-hidden="true" />患者さん向けセルフケア</Link></nav>
    </div>
  );
}
