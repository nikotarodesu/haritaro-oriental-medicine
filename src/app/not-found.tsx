'use client';

import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';
import PageIntro from '@/components/design/PageIntro';
import { PageSymbol, type PageArtKind } from '@/components/design/PageArtwork';

const destinations: { href: string; title: string; description: string; art: PageArtKind }[] = [
  { href: '/tsubo', title: 'ツボを調べる', description: '361のツボの場所や目印が分かります。', art: 'points' },
  { href: '/curriculum', title: '講義で学ぶ', description: '陰陽五行・気血水・臓腑の基礎から', art: 'study' },
  { href: '/diagnosis', title: '気血水 体質チェック', description: '12問で東洋医学の分類を学べます。', art: 'care' },
  { href: '/simulator', title: '所見から考える', description: '症例の情報から、どんな見立てができるか考えます。', art: 'practice' },
];

export default function NotFound() {
  return (
    <div className="page-layout page-layout--reading space-y-8">
      <PageIntro title="ページが見つかりません" description="URLをご確認ください。ツボの名前や記事の題名が分かるときは、サイト内検索で探せます。" art="reading" compact>
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
