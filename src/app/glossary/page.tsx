import type { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { pageSocialMetadata } from '@/config/seo';
import GlossaryIndex from '@/components/GlossaryIndex';

export const metadata: Metadata = { title: '東洋医学の用語集｜読み方・要点・関連講義', description: '陰陽・五行・気血水・四診などの専門用語を、読み方と要点、詳しい説明、関連講義から学べる用語集。', ...pageSocialMetadata('東洋医学の用語集｜読み方・要点・関連講義', '陰陽・五行・気血水・四診などの専門用語を、読み方と要点、詳しい説明、関連講義から学べる用語集。', '/glossary'), alternates: { canonical: '/glossary' } };
export default function GlossaryPage() {
  const terms = Object.values(GLOSSARY_TERMS).sort((a, b) => a.reading.localeCompare(b.reading, 'ja'));
  return <div className="glossary-page mx-auto max-w-5xl space-y-6 px-4 py-8 sm:py-12 text-[#232826] dark:text-[#FAF8F5]">
    <h1 className="font-serif text-3xl font-bold">東洋医学の用語集</h1>
    <p className="text-base leading-[1.75]">読み方や分野から用語を探せます。短い定義を読み、必要に応じて詳しい説明と関連講義を開いてください。伝統的な分類と現代医学の診断名は区別して学びます。</p>
    <GlossaryIndex terms={terms} />
  </div>;
}
