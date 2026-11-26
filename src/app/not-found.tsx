import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import PlatformSearchForm from '@/components/search/PlatformSearchForm';
import PageIntro from '@/components/design/PageIntro';
import { PageSymbol, type PageArtKind } from '@/components/design/PageArtwork';

const destinations: { href: string; title: string; description: string; art: PageArtKind }[] = [
  { href: '/tsubo', title: 'ツボを調べる', description: '361のツボの場所や目印が分かります。', art: 'points' },
  { href: '/learn', title: '講義で学ぶ', description: '陰陽・気血・臓腑の講義を選べます。', art: 'study' },
  { href: '/symptoms', title: '症状別ガイドを読む', description: '頭痛や腰痛など、気になる症状から探せます。', art: 'care' },
  { href: '/cases', title: '模擬症例を選ぶ', description: '問診から経過まで、症例ごとにたどれます。', art: 'practice' },
];

export default function NotFound() {
  return (
    <div className="page-layout page-layout--reading space-y-8">
      <PageIntro title="ページが見つかりません" description="お探しのツボや記事は、名前から検索できます。" art="reading" compact>
        <PlatformSearchForm id="missing-page-search" label="ツボ・症状・記事を探す" />
        <div className="page-actions">
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
