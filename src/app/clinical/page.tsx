import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

const tools = [
  { href: '/diagnosis', title: '気血水チェック', description: '回答から伝統分類の傾向を振り返る学習用チェック。' },
  { href: '/diagnosis?tab=gorou', title: '五労チェック', description: '見る・臥す・座る・立つ・歩く活動の偏りを振り返る。' },
  { href: '/simulator', title: '弁証候補を比較する', description: '所見と、候補を支持する情報・合わない情報を比べる。' },
  { href: '/practice/haiketsu', title: '配穴の構成を考える', description: '教材上の経穴分類を確認し、選んだ理由を記録する。' },
];
const focusClass = 'focus-visible:outline-2 focus-visible:outline-offset-4';

export default function ClinicalLandingPage() {
  const { limits } = SUBSCRIPTION_CONFIG;
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ClinicalDashboard />
      <section id="tools" aria-labelledby="clinical-tools-heading" className="scroll-mt-28 space-y-4">
        <h2 id="clinical-tools-heading" className="font-serif text-2xl font-bold">所見と考え方を確認するツール</h2>
        <p className="text-sm leading-relaxed ui-muted">いずれも学習と記録の支援を目的としています。結果だけで診断・施術方針を決めることはできません。</p>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {tools.map(tool => <li key={tool.href} className="border-b border-[#D9E3DD] dark:border-[#2A3B4A]">
            <Link href={tool.href} className={`flex min-h-20 items-center gap-4 rounded-lg px-1 py-4 hover:bg-[#EBF3EF] dark:hover:bg-[#182823] ${focusClass}`}>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-[#184F49] dark:text-[#9CCBBC]">{tool.title}</span><span className="mt-1 block text-sm leading-relaxed ui-muted">{tool.description}</span></span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </li>)}
        </ul>
      </section>
      <section aria-labelledby="clinical-help-heading" className="space-y-3">
        <h2 id="clinical-help-heading" className="text-xl font-bold">保存・利用範囲について</h2>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>登録なしで使える範囲と、記録の保存先</summary>
          <div className="space-y-3 pb-4 text-sm leading-relaxed ui-muted">
            <p>主訴別ガイド、臨床ワークスペース、各チェック、弁証シミュレーター、4穴までの配穴構成演習は登録不要です。臨床ノートは無料{limits.freePatientNoteMax}件、配穴集は無料{limits.freeMemoMax}件まで保存できます。</p>
            <p>未ログイン時の記録は、このブラウザに保存されます。ログインすると自分のアカウントへの同期に対応します。氏名・電話番号・住所は入力せず、患者番号などの記号を使ってください。自由記述にも本人を特定できる情報を含めないでください。</p>
            <Link href="/privacy" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>記録と個人情報の取り扱い</Link>
          </div>
        </details>
        <details className="rounded-xl border border-[#D9E3DD] px-4 dark:border-[#2A3B4A]">
          <summary className={`min-h-11 cursor-pointer py-3 font-semibold ${focusClass}`}>有料プラン・申し込みの受付状況</summary>
          <p className="pb-4 text-sm leading-relaxed ui-muted">保存件数などの利用範囲と新規申し込みの受付状況は、<Link href="/pricing" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>料金ページ</Link>で確認できます。既存の契約はマイページから管理できます。</p>
        </details>
      </section>
      <aside className="space-y-2 border-t border-[#D9E3DD] pt-5 text-sm leading-relaxed ui-muted dark:border-[#2A3B4A]">
        <p>教材は新版東洋医学概論・経絡経穴概論、WHO標準経穴部位、中医基礎理論などを参照しています。全件の医学記述の照合・専門家監修は未完了です。伝統理論の分類と医学的な評価を区別して利用してください。</p>
        <div className="flex flex-wrap gap-x-6"><Link href="/editorial-policy" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>出典と確認範囲</Link><Link href="/safety" className={`inline-flex min-h-11 items-center underline ${focusClass}`}>受診・安全確認</Link></div>
      </aside>
    </div>
  );
}
