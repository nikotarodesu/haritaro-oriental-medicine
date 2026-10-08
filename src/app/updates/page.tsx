import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_UPDATES } from '@/config/contentUpdates';

export const metadata: Metadata = { title: '更新情報', description: 'はり太郎の東洋医学の機能改善・教材改訂の履歴です。', alternates: { canonical: '/updates' } };

export default function UpdatesPage() {
  return <div className="home-container py-8 sm:py-12 space-y-6">
    <Link href="/" className="ui-text-link">トップへ</Link>
    <h1 className="font-serif text-3xl font-semibold">更新情報</h1>
    <p className="ui-muted">機能改善・教材改訂の履歴です。教材ごとの確認範囲は各ページの出典表示をご確認ください。</p>
    <ul className="home-updates">{SITE_UPDATES.map(update => <li key={update.label}><Link href={update.href} className="focus-visible:outline-2 focus-visible:outline-offset-4">
      <time dateTime={update.date} className="ui-muted text-sm">{update.date.replaceAll('-', '.')}</time>
      <h2 className="text-lg font-semibold">{update.label}</h2><p className="ui-muted">{update.text}</p>
    </Link></li>)}</ul>
  </div>;
}
