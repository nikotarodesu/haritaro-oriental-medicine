import type { Metadata } from 'next';
import Link from 'next/link';
import SymptomsIndexClient from '@/components/symptoms/SymptomsIndexClient';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE } from '@/data/symptomData';
import { pageSocialMetadata, SITE_NAME } from '@/config/seo';
import { getSymptomsIndexJsonLd, symptomGuideSummary } from '@/utils/symptomGuides';

const title = "症状別ガイド｜受診の目安と症状の記録例｜" + SITE_NAME;
const description = `頭痛、不眠、腰痛など${SYMPTOMS.length}の症状別ガイド。受診の目安と、いつから・どこが・どんなときにつらいかを伝える記録例を掲載しています。`;

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
          <nav aria-label="パンくず" className="atlas-breadcrumb"><Link href="/">ホーム</Link><span aria-hidden="true">/</span><span aria-current="page">症状別ガイド</span></nav>
          <h1>一般向けの症状別ガイド</h1>
          <p>頭が痛い、眠れない、ひざが痛い。気になる症状から、受診の目安と記録の例を探せます。</p>
        </div>
        <Link href="/safety" className="symptoms-safety-link ui-text-link"><ShieldCheck size={19} aria-hidden="true" />受診の目安と鍼灸の安全性<ArrowRight size={16} aria-hidden="true" /></Link>
      </header>
      <SymptomsIndexClient guides={guides} />
      <nav aria-label="受診と学習の案内" className="atlas-directory-actions">
        <Link href="/tsubo#tsubo-search" className="ui-text-link inline-flex min-h-11 items-center">ツボ図鑑で名前や場所を調べる</Link>
        <Link href="/clinical#chief-complaints" className="ui-text-link inline-flex min-h-11 items-center">症状別の臨床演習ガイド（鍼灸学生・鍼灸師向け）</Link>
      </nav>
      <details className="atlas-disclosure atlas-guide-scope">
        <summary>このガイドで確認できること</summary>
        <p>{SYMPTOM_GUIDANCE_SCOPE}</p>
      </details>
    </div>
  );
}
