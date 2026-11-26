import type { Metadata } from 'next';
import Link from 'next/link';
import SymptomsIndexClient from '@/components/symptoms/SymptomsIndexClient';
import AtlasOverviewArt from '@/components/tsubo/AtlasOverviewArt';
import { MapPin } from 'lucide-react';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE } from '@/data/symptomData';
import { pageSocialMetadata, seriesPageTitle } from '@/config/seo';
import { getSymptomsIndexJsonLd, symptomGuideSummary } from '@/utils/symptomGuides';

const title = seriesPageTitle('症状別ガイド｜受診の目安・日常の工夫・東洋医学の学習', "dictionary");
const description = `頭痛・首肩こり、不眠、胃腸の不調など${SYMPTOMS.length}の症状から、受診の目安や受診時に伝えることを探せます。症状の原因や病名を診断するガイドではありません。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/symptoms' },
  ...pageSocialMetadata(title, description, '/symptoms'),
};

export default function SymptomsPage() {
  const guides = SYMPTOMS.map(guide => ({
    id: guide.id,
    title: guide.title,
    summary: symptomGuideSummary(guide),
    category: guide.category,
  }));
  return (
    <div className="page-layout atlas-page atlas-directory symptoms-directory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomsIndexJsonLd(title, description)).replace(/</g, '\\u003c') }} />
      <header className="atlas-directory-header symptoms-directory-hero">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb"><Link href="/tsubo">はり太郎のツボ図鑑</Link><span aria-hidden="true">/</span><span aria-current="page">症状別ガイド</span></nav>
          <h1>一般向けの症状別ガイド</h1>
          <p>頭痛や腰痛など、気になる症状から、受診の目安と受診時に伝えることを探せます。</p>
          <Link href="/tsubo" className="atlas-text-action"><MapPin size={17} aria-hidden="true" />ツボの名前から探す</Link>
        </div>
        <AtlasOverviewArt />
      </header>
      <SymptomsIndexClient guides={guides} />
      <nav aria-label="受診と学習の案内" className="atlas-directory-actions">
        <Link href="/safety" className="ui-text-link inline-flex min-h-11 items-center">受診の目安と鍼灸の安全性</Link>
        <Link href="/clinical#chief-complaints" className="ui-text-link inline-flex min-h-11 items-center">症状別の臨床演習ガイド（鍼灸学生・鍼灸師向け）</Link>
      </nav>
      <details className="atlas-disclosure atlas-guide-scope">
        <summary>このガイドで確認できること</summary>
        <p>{SYMPTOM_GUIDANCE_SCOPE}</p>
      </details>
    </div>
  );
}
