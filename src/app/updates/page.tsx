import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_UPDATES } from '@/config/contentUpdates';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import PageIntro from '@/components/design/PageIntro';
import { ArrowUpRight } from 'lucide-react';

const title = '更新情報';
const description = 'はり太郎のサービス変更と教材改訂のお知らせです。';
const path = '/updates';
export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  ...pageSocialMetadata(`${title}｜${SITE_NAME}`, description, path),
};

export default function UpdatesPage() {
  return <div className="page-layout page-layout--reading space-y-6">
    <Link href="/" className="ui-text-link">トップへ</Link>
    <PageIntro eyebrow="サイトからのお知らせ" title="更新情報" description="機能改善・教材改訂の履歴です。気になる更新から、詳しい内容へ進めます。" art="reading" compact />
    <section id="membership-ended" className="page-link-card page-link-card--stack scroll-mt-28">
      <h2 className="text-lg font-semibold">会員登録・ログイン・有料プランの終了</h2>
      <p className="page-muted leading-relaxed">会員登録とログイン、有料プランの提供は終了しました。ツボ図鑑、東洋医学の読み物、臨床演習は登録せずに利用できます。</p>
      <Link href="/" className="ui-text-link">3つのシリーズを見る</Link>
    </section>
    <section id="notes-ended" className="page-link-card page-link-card--stack scroll-mt-28">
      <h2 className="text-lg font-semibold">マイノートの提供終了</h2>
      <p className="page-muted leading-relaxed">臨床ノートや配穴ストックの保存機能は終了しました。これまでの保存データについては、お問い合わせフォームからご連絡ください。フォームに患者の氏名や連絡先などを入力しないでください。</p>
      <Link href="/contact" className="ui-text-link">お問い合わせ</Link>
    </section>
    <p className="page-muted text-sm">教材ごとの確認範囲は各ページの出典表示をご確認ください。</p>
    <ul className="space-y-4">{SITE_UPDATES.map(update => <li key={update.label}><Link href={update.href} className="page-link-card page-link-card--stack">
      <time dateTime={update.date} className="page-muted text-sm">{update.date.replaceAll('-', '.')}</time>
      <h2 className="flex items-start justify-between gap-4 text-lg font-semibold">{update.label}<ArrowUpRight size={20} className="shrink-0 text-[var(--accent-readable)]" aria-hidden="true" /></h2><p className="page-muted leading-relaxed">{update.text}</p>
    </Link></li>)}</ul>
  </div>;
}
