'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ClipboardPenLine, FileClock, GitCompareArrows, Plus, ScanLine, ShieldCheck } from 'lucide-react';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { emptyClinicalEncounter, readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter } from '@/utils/clinicalEncounter';
import { ClinicalComplaintIcon, ClinicalHeroArtwork } from './ClinicalArtwork';

export default function ClinicalDashboard() {
  const router = useRouter();
  const [draft, setDraft] = useState<ClinicalEncounter | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      const stored = readClinicalEncounter('guest');
      setDraft(stored.encounter);
      setError(stored.error);
      setDraftChecked(true);
    };
    const timer = setTimeout(refresh, 0);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const startNew = () => {
    const stored = readClinicalEncounter('guest');
    if (stored.error) { setError(stored.error + ' 下書きを確認してから新しい記録を始めてください。'); return; }
    if (stored.encounter && !window.confirm('作業中の下書きを置き換えて、新しい記録を始めますか？')) return;
    if (!writeClinicalEncounter(emptyClinicalEncounter(), 'guest')) { setError('新しい下書きを保存できませんでした。現在の記録はそのままです。'); return; }
    router.push('/clinical/workspace');
  };
  return <section className="clinical-dashboard" aria-label="臨床記録と主訴別ガイド">
    <div className="clinical-hero">
      <div className="clinical-hero-copy">
        <h2 className="font-serif text-2xl font-semibold leading-relaxed sm:text-3xl">所見を整理し、考えた理由を残す</h2>
        <p className="clinical-hero-description">確認した所見と判断の理由を、作業中の下書きにまとめます。</p>
      </div>
      <ClinicalHeroArtwork />
    </div>

    <section className="clinical-record-start" aria-labelledby="clinical-record-heading">
      <div className="clinical-section-heading"><h2 id="clinical-record-heading">臨床記録</h2></div>
      <nav aria-label="記録を始める・再開する" className="clinical-record-actions">
        {draft && <Link href="/clinical/workspace" className="clinical-record-action" data-primary="true">
          <FileClock aria-hidden="true" /><span><strong>下書きを再開する</strong><small>{draft.patientIdentifier || '匿名ID未入力'} · {draft.chiefComplaint || '主訴未入力'}</small></span><ArrowRight aria-hidden="true" />
        </Link>}
        <button type="button" onClick={startNew} disabled={!draftChecked} className="clinical-record-action" data-primary={!draft}>
          <Plus aria-hidden="true" /><span><strong>新しい記録を始める</strong><small>{draftChecked ? '主訴・安全確認から入力する' : '下書きを確認しています…'}</small></span><ArrowRight aria-hidden="true" />
        </button>
      </nav>
      <nav className="clinical-record-links" aria-label="記録・問診・比較を開く">
        <Link href="/diagnosis?tab=clinical"><ClipboardPenLine aria-hidden="true" /><span>対面問診</span><ArrowRight aria-hidden="true" /></Link>
        <Link href="/tsubo/compare"><GitCompareArrows aria-hidden="true" /><span>経穴比較</span><ArrowRight aria-hidden="true" /></Link>
      </nav>
    </section>
    {error && <p role="alert" className="clinical-start-error">{error}</p>}

    <section id="chief-complaints" className="clinical-section" aria-labelledby="clinical-lookup-heading">
      <div className="clinical-section-heading"><h2 id="clinical-lookup-heading">主訴別ガイド</h2><span>確認したい主訴を選ぶ</span></div>
      <div className="clinical-complaint-grid">{CLINICAL_COMPLAINTS.map(item => <Link key={item.slug} className="clinical-complaint-card" href={'/clinical/symptoms/' + item.slug}>
        <ClinicalComplaintIcon kind={item.slug} /><span>{item.title}</span><ArrowRight aria-hidden="true" className="clinical-card-arrow" />
      </Link>)}</div>
      <nav aria-label="経穴・安全確認を調べる" className="clinical-reference-links">
        <Link href="/tsubo"><ScanLine aria-hidden="true" />経穴辞典<ArrowRight aria-hidden="true" /></Link>
        <Link href="/safety"><ShieldCheck aria-hidden="true" />受診・安全確認<ArrowRight aria-hidden="true" /></Link>
      </nav>
    </section>
  </section>;
}
