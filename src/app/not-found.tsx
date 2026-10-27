'use client';

import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';
import PageIntro from '@/components/design/PageIntro';
import { PageSymbol, type PageArtKind } from '@/components/design/PageArtwork';

const destinations: { href: string; title: string; description: string; art: PageArtKind }[] = [
  { href: '/tsubo', title: '経穴を調べる', description: '全361穴の位置と学習用の解説', art: 'points' },
  { href: '/curriculum', title: '講義で学ぶ', description: '陰陽五行・気血水・臓腑の基礎から', art: 'study' },
  { href: '/diagnosis', title: '体質の傾向を振り返る', description: '気血水の学習用セルフチェック', art: 'care' },
  { href: '/simulator', title: '所見から考える', description: '弁証候補とその理由を比較', art: 'practice' },
];

export default function NotFound() {
  return (
    <div className="page-layout page-layout--reading space-y-8">
      <PageIntro eyebrow="404 ／ ページが見つかりません" title="お探しのページが見つかりませんでした" description="URLが変更されたか、現在利用できない可能性があります。検索や下の入口からお探しください。" art="reading" compact>
        <div className="page-actions">
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('haritaro:open-search'))} aria-haspopup="dialog" className="page-primary-action"><Search size={18} aria-hidden="true" />サイト内を検索</button>
          <Link href="/" className="page-secondary-action"><Home size={18} aria-hidden="true" />ホームへ戻る</Link>
        </div>
      </PageIntro>
      <section aria-labelledby="not-found-destinations">
        <h2 id="not-found-destinations" className="page-section-heading">目的から探す</h2>
        <div className="page-link-grid">
          {destinations.map(item => <Link key={item.href} href={item.href} className="page-link-card">
            <span className="page-link-icon"><PageSymbol kind={item.art} /></span>
            <div className="flex-1"><h3>{item.title}</h3><p>{item.description}</p></div>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>)}
        </div>
      </section>
    </div>
  );
}
