import type { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { pageSocialMetadata } from '@/config/seo';
import PageIntro from '@/components/design/PageIntro';
import GlossaryIndex from '@/components/GlossaryIndex';

export const metadata: Metadata = { title: '東洋医学の用語集｜読み方・要点・関連講義', description: '陰陽・五行・気血水・四診などの専門用語を、読み方と要点、詳しい説明、関連講義から学べる用語集。', ...pageSocialMetadata('東洋医学の用語集｜読み方・要点・関連講義', '陰陽・五行・気血水・四診などの専門用語を、読み方と要点、詳しい説明、関連講義から学べる用語集。', '/glossary'), alternates: { canonical: '/glossary' } };
export default function GlossaryPage() {
  const terms = Object.values(GLOSSARY_TERMS).sort((a, b) => a.reading.localeCompare(b.reading, 'ja'));
  return <div className="glossary-page page-layout space-y-6 text-[#232826] dark:text-[#FAF8F5]">
    <PageIntro eyebrow={`${terms.length}語の小さな辞典`} title="東洋医学の用語集" description="言葉の意味を、ひとつずつ。用語・読み方・分野から探せます。" art="reading" compact />
    <GlossaryIndex terms={terms} />
  </div>;
}
