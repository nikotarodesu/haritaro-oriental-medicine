import type { Metadata } from 'next';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import PageIntro from '@/components/design/PageIntro';
import GlossaryIndex from '@/components/GlossaryIndex';
import { getReadingUnitForLecture, readingPartHref } from '@/data/publicLectures/readingUnitCatalog';

const title = seriesPageTitle("東洋医学の用語集｜読み方・要点・関連講義", "reading");

const description = '陰陽・五行・気虚・四診など、東洋医学の用語を漢字や読み方から調べられます。用語の意味と関連講義を掲載しています。';

export const metadata: Metadata = { title, description, ...pageSocialMetadata(title, description, '/glossary'), alternates: { canonical: '/glossary' } };
export default function GlossaryPage() {
  const terms = Object.values(GLOSSARY_TERMS)
    .sort((a, b) => a.reading.localeCompare(b.reading, 'ja'))
    .map(term => {
      if (!term.relatedLectureId) return term;
      const part = getReadingUnitForLecture(term.relatedLectureId)?.parts.find(part => part.lectureId === term.relatedLectureId);
      return {
        ...term,
        relatedLectureHref: readingPartHref(term.relatedLectureId),
        relatedLectureTitle: part ? `講義「${part.label}」を読む` : term.relatedLectureTitle,
      };
    });
  return <div className="glossary-page page-layout space-y-6 text-[#232826] dark:text-[#FAF8F5]">
    <PageIntro title="東洋医学の用語集" description={`陰陽・気虚・四診など${terms.length}語を掲載しています。「気虚」や「ききょ」のように、漢字や読み方で探せます。`} art="reading" compact />
    <GlossaryIndex terms={terms} />
  </div>;
}
