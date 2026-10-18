'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ClipboardPenLine, FileClock, GitCompareArrows, History, Plus, ScanLine, ShieldCheck } from 'lucide-react';
import { ALL_NAV_ITEMS } from '@/config/navigationItems';
import { CLINICAL_COMPLAINTS } from '@/data/clinicalWorkflow';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { clinicalFollowup, emptyClinicalEncounter, readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter } from '@/utils/clinicalEncounter';
import type { PatientNoteItem } from '@/types/clinicalMemo';
import { ClinicalComplaintIcon, ClinicalHeroArtwork } from './ClinicalArtwork';

export default function ClinicalDashboard() {
  const { patientNotes, clinicalStorageOwner = 'guest' } = useClinicalMemo();
  const [loadedOwner, setLoadedOwner] = useState<string | null>(null);
  const router = useRouter();
  const [draft, setDraft] = useState<ClinicalEncounter | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recentPatientIds = new Set<string>();
  const recent = [...patientNotes]
    .sort((a, b) => b.visitDate.localeCompare(a.visitDate) || b.updatedAt - a.updatedAt)
    .filter(note => {
      const id = note.patientIdentifier.trim();
      if (recentPatientIds.has(id)) return false;
      recentPatientIds.add(id);
      return true;
    }).slice(0, 3);

  useEffect(() => {
    if (!clinicalStorageOwner) return;
    const refresh = () => {
      const stored = readClinicalEncounter();
      setDraft(stored.encounter);
      setError(stored.error);
      setDraftChecked(true);
      setLoadedOwner(clinicalStorageOwner);
    };
    const timer = setTimeout(refresh, 0);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [clinicalStorageOwner]);

  const startNew = () => {
    const stored = readClinicalEncounter();
    if (stored.error) { setError(stored.error + ' 下書きを確認してから新しい記録を始めてください。'); return; }
    if (stored.encounter && !window.confirm('作業中の下書きを置き換えて、新しい記録を始めますか？保存済みの臨床ノートは残ります。')) return;
    if (!writeClinicalEncounter(emptyClinicalEncounter())) { setError('新しい下書きを保存できませんでした。現在の記録はそのままです。'); return; }
    router.push('/clinical/workspace');
  };
  const followup = (note: PatientNoteItem) => {
    const stored = readClinicalEncounter();
    if (stored.error) { setError(stored.error + ' 下書きを確認してから次回の記録を始めてください。'); return; }
    const message = note.patientIdentifier + 'の前回記録から、新しい来院記録を始めます。' + (stored.encounter ? '作業中の下書きを置き換えますか？' : '前回の申し送りを引き継いで進みますか？');
    if (!window.confirm(message)) return;
    if (!writeClinicalEncounter(clinicalFollowup(note))) { setError('下書きを保存できませんでした。ブラウザの保存設定を確認してください。'); return; }
    router.push('/clinical/workspace');
  };

  const ownerMatches = Boolean(clinicalStorageOwner && loadedOwner === clinicalStorageOwner);
  return <section className="clinical-dashboard" aria-label="鍼灸師の臨床ホーム">
    <div className="clinical-hero">
      <div className="clinical-hero-copy">
        <p className="clinical-kicker">鍼灸師の臨床ホーム</p>
        <h1>所見を整理し、<br />考えた理由を残す。</h1>
        <p className="clinical-hero-description">主訴・四診の所見から、候補の比較と経過の記録へ。</p>
      </div>
      <ClinicalHeroArtwork />
    </div>

    <section className="clinical-record-start" aria-labelledby="clinical-record-heading">
      <div className="clinical-section-heading"><h2 id="clinical-record-heading">記録する</h2></div>
      <nav aria-label="記録を始める・再開する" className="clinical-record-actions">
        {ownerMatches && draft && <Link href="/clinical/workspace" className="clinical-record-action" data-primary="true">
          <FileClock aria-hidden="true" /><span><strong>下書きを再開する</strong><small>{draft.patientIdentifier || '匿名ID未入力'} · {draft.chiefComplaint || '主訴未入力'}</small></span><ArrowRight aria-hidden="true" />
        </Link>}
        <button type="button" onClick={startNew} disabled={!draftChecked || !ownerMatches} className="clinical-record-action" data-primary={!draft || !ownerMatches}>
          <Plus aria-hidden="true" /><span><strong>新しい記録を始める</strong><small>{draftChecked && ownerMatches ? '主訴・安全確認から入力する' : '下書きを確認しています…'}</small></span><ArrowRight aria-hidden="true" />
        </button>
        {ownerMatches && recent.length > 0 && <a href="#clinical-recent-records" className="clinical-record-action">
          <History aria-hidden="true" /><span><strong>前回の記録から始める</strong><small>申し送りを引き継いで次回の記録へ</small></span><ArrowRight aria-hidden="true" />
        </a>}
      </nav>
      <p className="clinical-record-hint"><ClipboardPenLine aria-hidden="true" />{ALL_NAV_ITEMS.workspace.label}。入力した下書きと保存済みのノートは別に残ります。</p>
    </section>
    {ownerMatches && error && <p role="alert" className="clinical-start-error">{error}</p>}

    {ownerMatches && recent.length > 0 && <section id="clinical-recent-records" className="clinical-section clinical-recent-section" aria-labelledby="clinical-recent-heading">
      <div className="clinical-section-heading"><h2 id="clinical-recent-heading">前回から次回へ</h2><Link href="/notes">マイノートですべて見る →</Link></div>
      <div className="clinical-recent-grid">{recent.map(note => <button key={note.id} type="button" onClick={() => followup(note)} className="clinical-recent-card">
        <History aria-hidden="true" /><span><span className="block font-semibold">{note.patientIdentifier} · {note.visitDate}</span><span className="mt-1 block text-sm ui-muted">{note.chiefComplaint}</span></span><ArrowRight aria-hidden="true" className="clinical-card-arrow" />
      </button>)}</div>
    </section>}

    <section id="chief-complaints" className="clinical-section" aria-labelledby="clinical-lookup-heading">
      <div className="clinical-section-heading"><h2 id="clinical-lookup-heading">調べる</h2><span>主訴から確認したい項目を開く</span></div>
      <div className="clinical-complaint-grid">{CLINICAL_COMPLAINTS.map(item => <Link key={item.slug} className="clinical-complaint-card" href={'/clinical/symptoms/' + item.slug}>
        <ClinicalComplaintIcon kind={item.slug} /><span>{item.title}</span><ArrowRight aria-hidden="true" className="clinical-card-arrow" />
      </Link>)}</div>
      <nav aria-label="経穴・安全確認を調べる" className="clinical-quick-actions clinical-lookup-actions">
        <Link href="/tsubo" className="clinical-quick-action"><ScanLine aria-hidden="true" /><span>{ALL_NAV_ITEMS.tsubo.label}<small>位置・注意事項</small></span><ArrowRight aria-hidden="true" className="clinical-action-arrow" /></Link>
        <Link href="/tsubo/compare" className="clinical-quick-action"><GitCompareArrows aria-hidden="true" /><span>{ALL_NAV_ITEMS.tsubo_compare.label}<small>位置・特徴の違い</small></span><ArrowRight aria-hidden="true" className="clinical-action-arrow" /></Link>
        <Link href="/safety" className="clinical-quick-action"><ShieldCheck aria-hidden="true" /><span>受診・安全確認<small>施術より先に確認すること</small></span><ArrowRight aria-hidden="true" className="clinical-action-arrow" /></Link>
      </nav>
    </section>
  </section>;
}
