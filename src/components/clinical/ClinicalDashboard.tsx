import Link from 'next/link';
import { ArrowRight, GitCompareArrows, ScanLine, ShieldCheck } from 'lucide-react';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { ClinicalComplaintIcon } from './ClinicalArtwork';

export default function ClinicalDashboard() {
  return (
    <section id="chief-complaints" tabIndex={-1} className="clinical-section" aria-labelledby="clinical-lookup-heading">
      <div className="clinical-section-heading">
        <h2 id="clinical-lookup-heading">主訴別ガイド</h2>
        <p className="text-sm ui-muted">主訴とは、本人が相談したい症状のことです。</p>
      </div>
      <div className="clinical-complaint-grid">
        {CLINICAL_COMPLAINTS.map(item => (
          <Link key={item.slug} className="clinical-complaint-card" href={'/clinical/symptoms/' + item.slug}>
            <ClinicalComplaintIcon kind={item.slug} />
            <span>{item.title}</span>
            <ArrowRight aria-hidden="true" className="clinical-card-arrow" />
          </Link>
        ))}
      </div>
      <nav aria-label="経穴・安全確認を調べる" className="clinical-reference-links">
        <Link href="/tsubo"><ScanLine aria-hidden="true" />経穴辞典<ArrowRight aria-hidden="true" /></Link>
        <Link href="/tsubo/compare"><GitCompareArrows aria-hidden="true" />経穴比較<ArrowRight aria-hidden="true" /></Link>
        <Link href="/safety"><ShieldCheck aria-hidden="true" />受診・安全確認<ArrowRight aria-hidden="true" /></Link>
      </nav>
    </section>
  );
}
