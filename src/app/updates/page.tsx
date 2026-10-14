import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_UPDATES } from '@/config/contentUpdates';
import PageIntro from '@/components/design/PageIntro';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: '更新情報', description: 'はり太郎の東洋医学の機能改善・教材改訂の履歴です。', alternates: { canonical: '/updates' } };

export default function UpdatesPage() {
  return <div className="page-layout page-layout--reading space-y-6">
    <Link href="/" className="ui-text-link">トップへ</Link>
    <PageIntro eyebrow="サイトからのお知らせ" title="更新情報" description="機能改善・教材改訂の履歴です。気になる更新から、詳しい内容へ進めます。" art="reading" compact />
    <p className="page-muted text-sm">教材ごとの確認範囲は各ページの出典表示をご確認ください。</p>
    <ul className="space-y-4">{SITE_UPDATES.map(update => <li key={update.label}><Link href={update.href} className="page-link-card page-link-card--stack">
      <time dateTime={update.date} className="page-muted text-sm">{update.date.replaceAll('-', '.')}</time>
      <h2 className="flex items-start justify-between gap-4 text-lg font-semibold">{update.label}<ArrowUpRight size={20} className="shrink-0 text-[var(--accent-readable)]" aria-hidden="true" /></h2><p className="page-muted leading-relaxed">{update.text}</p>
    </Link></li>)}</ul>
  </div>;
}
