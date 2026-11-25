import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_UPDATES } from '@/config/contentUpdates';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import PageIntro from '@/components/design/PageIntro';
import { ArrowUpRight } from 'lucide-react';

const title = seriesPageTitle('更新情報', "reading");
const description = 'はり太郎のサービス変更と教材改訂のお知らせです。';
const path = '/updates';
export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  ...pageSocialMetadata(title, description, path),
};

export default function UpdatesPage() {
  return <div className="page-layout page-layout--reading space-y-6">
    <Link href="/" className="ui-text-link">トップへ</Link>
    <PageIntro title="更新情報" description="サービス変更と教材改訂の履歴です。各更新の関連ページも開けます。" art="reading" compact />
    <section id="membership-ended" className="page-link-card page-link-card--stack scroll-mt-28">
      <h2 className="text-lg font-semibold">会員登録・ログイン・有料プランの終了</h2>
      <p className="page-muted leading-relaxed">会員登録、ログイン、有料プランは2026年11月18日に終了しました。ツボ図鑑、東洋医学の講義、臨床演習は登録なしで利用できます。</p>
      <Link href="/" className="ui-text-link">図鑑・講義・演習の入口へ</Link>
    </section>
    <section id="notes-ended" className="page-link-card page-link-card--stack scroll-mt-28">
      <h2 className="text-lg font-semibold">マイノートの提供終了</h2>
      <p className="page-muted leading-relaxed">臨床ノートや配穴ストックの保存機能は終了しました。旧マイノートのデータの取り扱いは、お問い合わせフォームからご相談ください。端末内とクラウドのどちらに保存していたか、分かる範囲でお知らせください。</p>
      <Link href="/contact?topic=legacy-notes" className="ui-text-link">旧マイノートの保存データについて問い合わせる</Link>
    </section>
    <p className="page-muted text-sm">教材ごとの確認範囲は各ページの出典表示をご確認ください。</p>
    <p className="page-muted text-sm">2026年11月18日のサービス終了より前の履歴には、会員サービスを提供していた当時の更新も含まれます。</p>
    <ul className="space-y-4">{SITE_UPDATES.map(update => <li key={update.label} className="page-link-card page-link-card--stack">
      <time dateTime={update.date} className="page-muted text-sm">{update.date.replaceAll('-', '.')}</time>
      <h2 className="text-lg font-semibold">{update.label}</h2>
      <p className="page-muted leading-relaxed">{update.text}</p>
      {update.links ? <div className="flex flex-wrap gap-x-4 gap-y-2">{update.links.map(({ href, label }) => (
        <Link className="ui-text-link" key={href} href={href}>{label}</Link>
      ))}</div> : update.href && <Link href={update.href} className="ui-text-link inline-flex items-center gap-1.5" aria-label={`「${update.label}」の関連ページを開く`}>関連ページを開く<ArrowUpRight size={16} aria-hidden="true" /></Link>}
    </li>)}</ul>
  </div>;
}
