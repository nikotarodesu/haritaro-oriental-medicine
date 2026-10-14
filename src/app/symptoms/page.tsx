import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalSafetyNotice from '@/components/MedicalSafetyNotice';
import SymptomsIndexClient from '@/components/symptoms/SymptomsIndexClient';
import PageIntro from '@/components/design/PageIntro';
import { ArrowDown, Stethoscope } from 'lucide-react';
import { SYMPTOMS, SYMPTOM_GUIDANCE_SCOPE } from '@/data/symptomData';
import { pageSocialMetadata } from '@/config/seo';
import { getSymptomsIndexJsonLd } from '@/utils/symptomGuides';

const title = '症状別ガイド｜受診の目安・日常の工夫・東洋医学の学習';
const description = '頭痛・首肩こり、不眠、胃腸の不調など12の症状別に、受診の目安、日常の工夫、伝統医学の分類と経穴例を学びます。症状の原因や病名を診断するガイドではありません。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/symptoms' },
  ...pageSocialMetadata(title, description, '/symptoms'),
};

export default function SymptomsPage() {
  const guides = SYMPTOMS.map(({ id, title, summary, category }) => ({ id, title, summary, category }));
  return (
    <div className="reading-page page-layout space-y-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomsIndexJsonLd(title, description)).replace(/</g, '\\u003c') }} />
      <PageIntro eyebrow="受診の目安・日常の工夫" title="症状別ガイド" description="気になる症状から、受診の目安と日常生活で確認することを調べます。" art="care">
        <div className="page-actions">
          <a href="#symptom-guides" className="page-primary-action">症状から選ぶ<ArrowDown size={18} aria-hidden="true" /></a>
          <Link href="/clinical#chief-complaints" className="page-secondary-action"><Stethoscope size={18} aria-hidden="true" />鍼灸師向けの主訴別ガイド</Link>
        </div>
      </PageIntro>
      <MedicalSafetyNotice title="このガイドで確認できること" message={SYMPTOM_GUIDANCE_SCOPE} />
      <SymptomsIndexClient guides={guides} />
    </div>
  );
}
