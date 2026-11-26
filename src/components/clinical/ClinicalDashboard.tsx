import Link from 'next/link';
import { ArrowRight, GitCompareArrows, ScanLine, ShieldCheck } from 'lucide-react';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { ClinicalComplaintIcon } from './ClinicalArtwork';

export default function ClinicalDashboard() {
  return (
    <section id="chief-complaints" tabIndex={-1} className="clinical-section" aria-labelledby="clinical-lookup-heading">
      <div className="clinical-section-heading">
        <h2 id="clinical-lookup-heading">症状別の臨床演習ガイド</h2>
        <p className="text-sm ui-muted">鍼灸学生・鍼灸師向けに、症状ごとの問診と、次回に確かめる項目をまとめています。</p>
      </div>
      <div className="clinical-complaint-grid">
        {CLINICAL_COMPLAINTS.map(item => (
          <Link key={item.slug} className="clinical-complaint-card" href={'/clinical/symptoms/' + item.slug}>
            <ClinicalComplaintIcon kind={item.slug} />
            <span>{item.title}の問診・再評価</span>
            <ArrowRight aria-hidden="true" className="clinical-card-arrow" />
          </Link>
        ))}
      </div>
      <nav aria-label="経穴・安全確認を調べる" className="clinical-reference-links">
        <Link href="/tsubo"><ScanLine aria-hidden="true" />ツボ図鑑<ArrowRight aria-hidden="true" /></Link>
        <Link href="/tsubo/compare"><GitCompareArrows aria-hidden="true" />ツボを比べる<ArrowRight aria-hidden="true" /></Link>
        <Link href="/safety"><ShieldCheck aria-hidden="true" />受診の目安と鍼灸の安全性<ArrowRight aria-hidden="true" /></Link>
      </nav>
    </section>
  );
}
