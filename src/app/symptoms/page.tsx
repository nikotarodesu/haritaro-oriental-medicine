import type { Metadata } from 'next';
import Link from 'next/link';
import SymptomsIndexClient from '@/components/symptoms/SymptomsIndexClient';
import AtlasOverviewArt from '@/components/tsubo/AtlasOverviewArt';
import { MapPin } from 'lucide-react';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE } from '@/data/symptomData';
import { pageSocialMetadata } from '@/config/seo';
import { getSymptomsIndexJsonLd, symptomGuideSummary } from '@/utils/symptomGuides';

const title = '症状別ガイド｜受診の目安・日常の工夫・東洋医学の学習';
const description = '頭痛・首肩こり、不眠、胃腸の不調など12の症状別に、受診の目安、日常の工夫、伝統医学の分類と経穴例を学びます。症状の原因や病名を診断するガイドではありません。';

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
    <div className="page-layout atlas-page atlas-directory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomsIndexJsonLd(title, description)).replace(/</g, '\\u003c') }} />
      <header className="atlas-directory-header">
        <div>
          <nav aria-label="パンくず" className="atlas-breadcrumb"><Link href="/tsubo">はり太郎のツボ図鑑</Link><span aria-hidden="true">/</span><span aria-current="page">症状別ガイド</span></nav>
          <h1>症状から探す</h1>
          <p>頭痛や腰痛などのガイドを開くと、受診を考える目安、症状の記録例、東洋医学で関連づけられるツボを読めます。</p>
          <Link href="/tsubo" className="atlas-text-action"><MapPin size={17} aria-hidden="true" />ツボの名前から探す</Link>
        </div>
        <AtlasOverviewArt />
      </header>
      <SymptomsIndexClient guides={guides} />
      <details className="atlas-disclosure atlas-guide-scope">
        <summary>このガイドで確認できること</summary>
        <p>{SYMPTOM_GUIDANCE_SCOPE}</p>
      </details>
    </div>
  );
}
