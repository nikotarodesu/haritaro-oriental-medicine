import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalSafetyNotice from '@/components/MedicalSafetyNotice';
import SymptomsIndexClient from '@/components/symptoms/SymptomsIndexClient';
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
    <main className="reading-page mx-auto max-w-6xl space-y-7 px-4 py-8 text-[#232826] dark:text-[#FAF8F5] sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSymptomsIndexJsonLd(title, description)).replace(/</g, '\\u003c') }} />
      <header className="max-w-3xl space-y-3">
        <p className="text-sm font-semibold text-[#1E3D34] dark:text-[#9CCDB8]">受診の目安と、伝統医学の考え方を学ぶ</p>
        <h1 className="font-serif text-3xl font-bold leading-snug sm:text-4xl">症状別ガイド</h1>
        <p className="text-base leading-relaxed">気になる症状から、受診を優先する目安、日常生活の工夫、東洋医学での分類とその限界を確認できます。詳しい説明と出典は、それぞれのガイドにまとめています。</p>
      </header>
      <MedicalSafetyNotice title="このガイドで確認できること" message={SYMPTOM_GUIDANCE_SCOPE} />
      <Link href="/clinical#chief-complaints" className="inline-flex min-h-11 items-center rounded-xl border border-[#D6DED7] px-4 py-2 font-semibold text-[#1E3D34] underline underline-offset-4 dark:border-[#34483C] dark:text-[#9CCDB8]">鍼灸師の方：主訴別の問診・所見比較ガイドへ →</Link>
      <SymptomsIndexClient guides={guides} />
    </main>
  );
}
