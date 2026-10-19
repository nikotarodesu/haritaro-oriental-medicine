'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import PageIntro from '@/components/design/PageIntro';
import { ShieldCheck, ClipboardList, GitCompare, MapPin, NotebookPen, RotateCcw, CheckCircle2, CircleDashed, GitFork, Search } from 'lucide-react';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';
import { CLINICAL_SIGNS, CLINICAL_PATTERNS, CLINICAL_PATTERN_CATEGORIES, CLINICAL_PRINCIPLES, CLINICAL_COMPLAINTS, compareClinicalPattern, type ClinicalSignId } from '@/data/clinicalWorkflow';
import { ACUPOINTS_MASTER } from '@/data/tsubo/acupointsMaster';
import { clearClinicalEncounter, clinicalCandidateNames, clinicalEncounterFingerprint, clinicalEncounterSaveState, clinicalEncounterNote, emptyClinicalEncounter, readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter } from '@/utils/clinicalEncounter';
import ClinicalEvidenceKey from './ClinicalEvidenceKey';
import ClinicalCandidatePicker from './ClinicalCandidatePicker';
import ClinicalCandidateDifferential from './ClinicalCandidateDifferential';
import { appendClinicalPrinciple, hasClinicalPrinciple } from '@/utils/clinicalTreatment';
import { EXAMINATION_GROUPS, EXAMINATION_FIELDS, EXAMINATION_TEXT_FIELDS, examinationValue, examinationSummary, examinationIssues, resolvedExaminationObservations } from '@/data/clinicalExamination';
import { EXAMINATION_ASSOCIATIONS, examinationFinding, comparisonContext, type ComparisonFindingId } from '@/data/clinicalExaminationComparison';
import { clinicalCandidateEvidence } from '@/utils/clinicalCandidateNarrowing';
import { clinicalExaminationPatch, clinicalFindingEdit, canUndoClinicalFindingEdit, undoClinicalFindingEdit, type ClinicalFindingEdit, type ClinicalFindingState } from '@/utils/clinicalFindingChanges';

type PrincipleChange = { owner: string; before: string; after: string; term: string; undone?: boolean };

const STEPS = ['主訴・安全確認', '四診所見', '候補・治法', '配穴の理由', '記録・再評価'];
const STEP_ICONS = [ShieldCheck, ClipboardList, GitCompare, MapPin, NotebookPen];
const COMPARISON_FIELDS = [
  { key: 'supported', title: '支持する所見', icon: CheckCircle2 },
  { key: 'missing', title: '支持所見：確認してなし', icon: CircleDashed },
  { key: 'conflicting', title: '合いにくい所見', icon: GitFork },
  { key: 'unknown', title: '追加確認する所見', icon: Search },
] as const;
const FIELD = 'w-full min-h-11 rounded-lg border border-[#C8D4CD] bg-white px-3 py-2 text-base text-[#232826] dark:border-[#496153] dark:bg-[#121B22] dark:text-[#FAF8F5]';
const BUTTON = 'inline-flex min-h-11 items-center justify-center rounded-lg border border-[#B9CDC0] px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#496153]';
const PRIMARY = `${BUTTON} bg-[#1E3D34] text-white hover:bg-[#2B5A46] dark:bg-[#9CCDB8] dark:text-[#11291F]`;
const BOX = 'rounded-xl border border-[#D6DED7] bg-white p-4 sm:p-5 dark:border-[#34483C] dark:bg-[#17212A]';
function labels(ids: ComparisonFindingId[]) { return ids.map(id => examinationFinding(id)?.label || CLINICAL_SIGNS.find(sign => sign.id === id)?.label).join('、') || '該当なし'; }
const STRUCTURED_SIGNS: readonly ClinicalSignId[] = ['weakPulse', 'rapidPulse', 'paleTongue', 'redTongue', 'greasyCoat', 'fixedPain'];

export default function ClinicalWorkspace() {
  const { patientNotes = [], saveWorkspaceNote, syncStatus, triggerSync, isReady = true, clinicalStorageOwner = 'guest' } = useClinicalMemo();
  const [loadedOwner, setLoadedOwner] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [lastSaved, setLastSaved] = useState('');
  const saveBusy = useRef(false);
  useEffect(() => { saveBusy.current = false; }, [lastSaved]);
  const snapshot = clinicalEncounterFingerprint;
  const [encounter, setEncounter] = useState<ClinicalEncounter>(emptyClinicalEncounter);
  const encounterRef = useRef(encounter);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pointQuery, setPointQuery] = useState('');
  const [principleChange, setPrincipleChange] = useState<PrincipleChange | null>(null);
  const [comparisonFocus, setComparisonFocus] = useState<string[] | null>(null);
  const [findingSession, setFindingSession] = useState(0);
  const findingSessionGuard = useRef(0);
  const findingChangeSerial = useRef(0);
  const ownerGuard = useRef(clinicalStorageOwner);
  useEffect(() => { ownerGuard.current = clinicalStorageOwner; }, [clinicalStorageOwner]);
  useEffect(() => {
    if (!clinicalStorageOwner) return;
    const timer = setTimeout(() => {
      const stored = readClinicalEncounter();
      const initial = stored.encounter || emptyClinicalEncounter();
      const complaint = CLINICAL_COMPLAINTS.find(item => item.slug === new URLSearchParams(window.location.search).get('complaint'));
      // A guide never replaces an encounter already in progress.
      if (complaint && !initial.patientIdentifier && !initial.chiefComplaint && Object.keys(initial.observations).length === 0) { initial.complaintSlug = complaint.slug; initial.chiefComplaint = complaint.title; }
      encounterRef.current = initial;
      setEncounter(initial); setError(stored.error); setSaved(Boolean(stored.encounter)); setReady(true); setLoadedOwner(clinicalStorageOwner); setReviewing(false); setLastSaved(initial.savedFingerprint || ''); setPrincipleChange(null); setComparisonFocus(null);
      findingChangeSerial.current = initial.findingHistory?.at(-1)?.id || 0;
      findingSessionGuard.current++; setFindingSession(findingSessionGuard.current);
    }, 0);
    return () => clearTimeout(timer);
  }, [clinicalStorageOwner]);
  // Persist in the input event, before a link click or reload can unmount the form.
  const update = (patch: Partial<ClinicalEncounter>) => {
    const next = { ...encounterRef.current, ...patch };
    encounterRef.current = next;
    setEncounter(next);
    const ok = writeClinicalEncounter(next);
    setSaved(ok);
    setError(ok ? null : '下書きを保存できませんでした。この画面を離れる前にブラウザの保存設定を確認してください。');
  };
  const complaint = CLINICAL_COMPLAINTS.find(item => item.slug === encounter.complaintSlug);
  const observations = useMemo(() => resolvedExaminationObservations(encounter.observations, encounter.examination), [encounter.observations, encounter.examination]);
  const updateExamination = (id: string, value: string) => {
    update(clinicalExaminationPatch(encounterRef.current, id, value));
  };
  const findingEdits = loadedOwner === clinicalStorageOwner ? encounter.findingHistory || [] : [];
  const latestFindingEdit = findingEdits.at(-1);
  const undoFindingAvailable = Boolean(latestFindingEdit && canUndoClinicalFindingEdit(encounter, latestFindingEdit));
  const recordFindingEdit = (target: { kind: 'observation' | 'examination'; id: string }, after: ClinicalFindingState) => {
    if (!clinicalStorageOwner || loadedOwner !== clinicalStorageOwner || ownerGuard.current !== clinicalStorageOwner || findingSessionGuard.current !== findingSession) return;
    const edit = clinicalFindingEdit(encounterRef.current, after, target, findingChangeSerial.current + 1);
    if (!edit) return;
    findingChangeSerial.current = edit.id;
    update({ ...after, findingHistory: [...(encounterRef.current.findingHistory || []), edit].slice(-20) });
  };
  const undoFindingEdit = () => {
    if (!latestFindingEdit || clinicalStorageOwner !== ownerGuard.current || loadedOwner !== clinicalStorageOwner || findingSessionGuard.current !== findingSession || findingChangeSerial.current !== latestFindingEdit.id) return;
    const restored = undoClinicalFindingEdit(encounterRef.current, latestFindingEdit);
    if (!restored) return;
    findingChangeSerial.current++;
    update({ ...restored, findingHistory: encounterRef.current.findingHistory?.map(edit => edit.id === latestFindingEdit.id ? { ...edit, undone: true } : edit) });
  };
  const findingEditRow = (edit: ClinicalFindingEdit) => <li key={edit.id} className="clinical-finding-change-entry">
    <p><strong>{edit.label}</strong>{edit.undone && <span>取り消し済み</span>}</p>
    <dl>{edit.items.map(item => <div key={item.label}><dt>{item.label}{item.linked && <small>連動</small>}</dt><dd><span>{item.before}</span><span aria-label="から">→</span><strong>{item.after}</strong></dd></div>)}</dl>
  </li>;
  const candidateNames = clinicalCandidateNames(encounter);
  const comparisonSigns = CLINICAL_SIGNS.filter(sign => !STRUCTURED_SIGNS.includes(sign.id));
  const observationTotal = comparisonSigns.length + EXAMINATION_FIELDS.length;
  const observationConfirmed = comparisonSigns.filter(sign => observations[sign.id] && observations[sign.id] !== 'unknown').length + EXAMINATION_FIELDS.filter(field => {
    const value = examinationValue(field.id, encounter.examination, observations);
    return value && value !== '判断困難';
  }).length;
  const savedNoteMissing = Boolean(isReady && encounter.savedNoteId && !patientNotes.some(note => note.id === encounter.savedNoteId));
  const saveState = encounter.savedNoteId && !isReady ? 'checking' : savedNoteMissing ? 'missing' : clinicalEncounterSaveState(encounter);
  const unchangedSaved = !savedNoteMissing && saveState !== 'checking' && lastSaved === snapshot(encounter);
  const comparisons = useMemo(() => CLINICAL_PATTERNS.map(pattern => ({ pattern, ...compareClinicalPattern(pattern, encounter.observations, encounter.examination || {}) })), [encounter.observations, encounter.examination]);
  const candidateOptions = CLINICAL_PATTERN_CATEGORIES.flatMap(category => comparisons.filter(result => result.pattern.category === category)).map(({ pattern, supported, missing, unknown, conflicting }) => ({
    id: pattern.id, name: pattern.name, category: pattern.category, summary: pattern.summary, aliases: pattern.aliases,
    ...clinicalCandidateEvidence({ supported, missing, unknown, conflicting }),
    ...(supported.length + missing.length + unknown.length ? { supportCount: supported.length, unknownCount: unknown.length } : {}),
    ...(pattern.conflicts.length || EXAMINATION_ASSOCIATIONS[pattern.id]?.conflicts?.length ? { conflictCount: conflicting.length } : {}),
  }));
  const selectedComparisons = encounter.candidateIds.flatMap(id => comparisons.filter(result => result.pattern.id === id));
  const selectedPrinciples = [...new Set(selectedComparisons.flatMap(({ pattern }) => pattern.principle.split('・')))];
  const pointResults = useMemo(() => {
    const query = pointQuery.trim().toLowerCase();
    return ACUPOINTS_MASTER.filter(point => !query || [point.code, point.name, point.kana, point.romaji].some(text => text?.toLowerCase().includes(query)));
  }, [pointQuery]);
  const focusHeading = (id: string) => {
    requestAnimationFrame(() => {
      const heading = document.getElementById(id);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
  };
  const proceed = (step: number, focus = true) => {
    if (step === 3 && encounter.safety !== 'reviewed') { setError('配穴の検討前に安全確認を記録してください。医療評価を優先する場合は、記録・再評価へ進めます。'); return; }
    setReviewing(false);
    update({ step });
    if (focus) focusHeading('clinical-workspace-step-heading');
  };
  const showReview = () => {
    if (encounter.step !== 4) update({ step: 4 });
    setReviewing(true);
    focusHeading('clinical-workspace-review-heading');
  };
  const activePrincipleChange = principleChange && principleChange.owner === clinicalStorageOwner &&
    encounter.principle === (principleChange.undone ? principleChange.before : principleChange.after) ? principleChange : null;
  const addPrinciple = (term: string) => {
    if (!clinicalStorageOwner || ownerGuard.current !== clinicalStorageOwner || loadedOwner !== clinicalStorageOwner) return;
    const next = appendClinicalPrinciple(encounter.principle, term);
    if (next === encounter.principle) return;
    setPrincipleChange({ owner: clinicalStorageOwner, before: encounter.principle, after: next, term });
    update({ principle: next });
  };
  const undoPrinciple = () => {
    if (!activePrincipleChange || activePrincipleChange.undone || ownerGuard.current !== activePrincipleChange.owner) return;
    update({ principle: activePrincipleChange.before });
    setPrincipleChange({ ...activePrincipleChange, undone: true });
  };
  const principleButton = (term: string, key = term) => {
    const added = hasClinicalPrinciple(encounter.principle, term);
    const limitReached = !added && appendClinicalPrinciple(encounter.principle, term) === encounter.principle;
    return <button type="button" key={key} disabled={added || limitReached} aria-label={added ? `${term}：追加済み` : limitReached ? `${term}：文字数上限のため追加できません` : `${term}を治法に追加`} onClick={() => addPrinciple(term)}>{term}<span aria-hidden={added || limitReached ? undefined : true}>{added ? '追加済み' : limitReached ? '上限' : '＋'}</span></button>;
  };
  const handoff = (asNew = false) => {
    if (saveBusy.current || !asNew && unchangedSaved) return;
    if (savedNoteMissing && !asNew) { setError('元の保存済み記録が見つかりません。入力を保持したまま、新しい臨床ノートとして保存できます。'); return; }
    if (asNew && (!savedNoteMissing || !window.confirm('元の保存済み記録が見つかりません。この入力内容を新しい臨床ノートとして保存しますか？削除済みの記録は復元しません。'))) return;
    if (!encounter.patientIdentifier.trim() || !encounter.chiefComplaint.trim()) { setError('匿名IDと主訴を入力してください。'); return; }
    if (!encounter.visitDate) { setError('記録日を入力してください。'); return; }
    if (encounter.safety === 'unknown') { setError('安全確認の状態を記録してください。未確認なら、確認してから保存してください。'); return; }
    if (!writeClinicalEncounter(encounter)) { setError('下書きを保存できないため、この画面で入力を保持しています。'); return; }
    saveBusy.current = true;
    const names = encounter.points.map(point => ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code);
    const result = saveWorkspaceNote(clinicalEncounterNote(encounter, names), asNew ? undefined : encounter.savedNoteId);
    if (!result.ok) { setError(result.error); saveBusy.current = false; return; }
    const next = { ...encounter, savedNoteId: result.id, savedFingerprint: snapshot(encounter), savedAt: Date.now() };
    encounterRef.current = next; setEncounter(next); setLastSaved(snapshot(next)); setError(null);
    if (!writeClinicalEncounter(next)) setError('記録は保存しましたが、下書きの更新に失敗しました。保存済みの臨床ノートを確認してください。');
  };
  const addPoint = (code: string) => {
    if (encounter.points.length >= 12 || encounter.points.some(point => point.code === code)) return;
    update({ points: [...encounter.points, { code, role: 'other', reason: '', alternative: '' }] });
  };
  const revisitSign = (id: ComparisonFindingId) => {
    proceed(1, false);
    requestAnimationFrame(() => {
      const finding = examinationFinding(id);
      const field = finding?.requires && examinationValue(finding.field, encounter.examination, observations) && !examinationValue(finding.requires.field, encounter.examination, observations) ? finding.requires.field : finding?.field;
      const tongueField = id === 'fixedPain' ? (!examinationValue('painLocation', encounter.examination, observations) ? 'painLocation' : 'painQuality') : id === 'paleTongue' || id === 'redTongue' ? 'tongueColor' : id === 'greasyCoat' ? 'coatTexture' : undefined;
      const input = document.getElementById(field || tongueField ? 'clinical-exam-' + (field || tongueField) : 'clinical-sign-' + id);
      const group = input?.closest('details');
      if (group) group.open = true;
      input?.focus(); input?.scrollIntoView({ block: 'center', behavior: 'auto' });
    });
  };
  const revisitExaminationDetails = () => {
    proceed(1, false);
    focusHeading('clinical-examination-memo');
  };
  const reset = () => {
    if (!window.confirm('このタブの作業中の下書きを消して、新しい記録を始めますか？保存済みノートは残ります。')) return;
    if (!clearClinicalEncounter()) { setError('下書きを消去できませんでした。'); return; }
    const fresh = emptyClinicalEncounter(); encounterRef.current = fresh;
    setEncounter(fresh); setError(null); setSaved(false); setPointQuery(''); setReviewing(false); setLastSaved(''); setPrincipleChange(null); setComparisonFocus(null);
    findingChangeSerial.current = 0;
    findingSessionGuard.current++; setFindingSession(findingSessionGuard.current);
  };
  if (!ready || loadedOwner !== clinicalStorageOwner) return <p role="status" className="p-6">下書きを確認しています…</p>;
  return <div className="page-layout clinical-workspace space-y-5">
    <Link href="/clinical" className="inline-flex min-h-11 items-center text-sm underline">← 臨床ホーム</Link>
    <PageIntro compact eyebrow="確認した事実と、見立てを分ける" title="臨床記録" description="主訴・安全確認から、配穴の理由、再評価までを5つの手順で整理します。">
      <p className="mt-3 text-sm leading-relaxed">氏名・連絡先など、個人を特定する情報は入力しないでください。</p>
      <div className="page-actions"><button className="page-secondary-action" onClick={reset}><RotateCcw aria-hidden="true" className="h-4 w-4" />新しい記録を始める</button></div>
    </PageIntro>
    <p role="status" className="text-sm">{saveState === 'checking' ? '保存先の記録を確認しています。入力はこのタブに保持しています。' : saveState === 'missing' ? '元の保存済み記録が見つかりません。入力はこのタブに保持しています。' : saveState === 'saved' ? `臨床ノートに保存済み${encounter.savedAt ? '（' + new Date(encounter.savedAt).toLocaleString('ja-JP') + '）' : ''}。` : saveState === 'changed' ? '保存後に変更があります。変更はまだ臨床ノートへ保存していません。' : saveState === 'unverified' ? '保存済み記録を再編集中です。内容を確認して更新してください。' : saved ? 'このタブに下書き保存済み。タブを閉じる前に臨床ノートへ保存してください。' : '入力するとこのタブに下書きを保存します。'}</p>
    {encounter.previousSummary && <details className={BOX}><summary className="min-h-11 cursor-pointer font-semibold">前回からの申し送り</summary><p className="mt-2 whitespace-pre-wrap text-sm">{encounter.previousSummary}</p></details>}
    <nav aria-label="臨床記録の手順" className="clinical-step-nav">{STEPS.map((label,index) => { const StepIcon = STEP_ICONS[index]; return <button key={label} onClick={() => proceed(index)} aria-current={encounter.step === index ? 'step' : undefined} className={`${BUTTON} gap-2 justify-start text-left ${encounter.step === index ? 'bg-[#1E3D34] text-white dark:bg-[#9CCDB8] dark:text-[#11291F]' : ''}`}><StepIcon aria-hidden="true" className="h-5 w-5 shrink-0" /><span><span className="mr-1 opacity-75">{index + 1}.</span>{label}</span></button>; })}</nav>
    {error && <p role="alert" className="rounded-lg border border-[#C06844] bg-[#FFF2EB] p-3 text-sm text-[#843C24] dark:bg-[#35221C] dark:text-[#FFD1BB]">{error}</p>}
    {syncStatus === 'offline' && <div className="text-sm"><p role="alert">アカウントへの同期は完了していません。入力とこのブラウザの記録は保持しています。</p><button type="button" className={BUTTON} onClick={() => { void triggerSync(); }}>同期を再試行する</button></div>}
    <div className="clinical-workspace-layout">
    <section className={`${BOX} clinical-workspace-main space-y-5`} aria-label={reviewing ? '記録の最終確認' : STEPS[encounter.step]}>
      {reviewing ? <>
        <div className="clinical-review-heading"><div><p className="clinical-kicker">保存前の確認</p><h2 id="clinical-workspace-review-heading" tabIndex={-1} className="text-xl font-bold">記録を確認して保存</h2></div><button className={BUTTON} onClick={() => proceed(encounter.step)}>入力に戻る</button></div>
        {([
          { step: 0, title: '主訴・安全確認', text: `${encounter.patientIdentifier || '匿名ID未入力'} · ${encounter.visitDate}\n${encounter.chiefComplaint || '主訴未入力'}\n${encounter.safety === 'reviewed' ? '確認した範囲で該当兆候なし' : encounter.safety === 'refer' ? '医療評価を優先・配穴保留' : '安全確認は未確認'}\n${encounter.safetyMemo}` },
          { step: 1, title: '四診所見', text: CLINICAL_SIGNS.filter(sign => observations[sign.id] && observations[sign.id] !== 'unknown').map(sign => sign.label + '：' + (observations[sign.id] === 'present' ? 'あり' : 'なし')).join('、') + '\n' + examinationSummary(encounter.examination, observations) + '\n' + encounter.examinationMemo + (encounter.interviewMemo ? '\n対面問診：\n' + encounter.interviewMemo : '') },
          { step: 2, title: '候補・治法', text: candidateNames.join('／') + '\n' + encounter.rationale + '\n治法：' + encounter.principle },
          { step: 3, title: '配穴の理由', text: encounter.safety === 'reviewed' ? encounter.points.map(point => (ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code) + '：' + (point.reason || '理由未記入') + '\n変更条件：' + (point.alternative || '未記入')).join('\n\n') : '配穴は保留して保存します。' },
          { step: 4, title: '記録・再評価', text: [encounter.metric && '指標：' + encounter.metric, '施術前：' + (encounter.before || '未評価') + '／直後：' + (encounter.after || '未評価'), encounter.functionMemo, encounter.plan, encounter.reaction, encounter.revision, encounter.nextAction].filter(Boolean).join('\n') },
        ]).map(item => <section className="clinical-review-section" key={item.step}><div><h3>{item.title}</h3><button onClick={() => proceed(item.step)} className={BUTTON}>{item.title}を修正</button></div><p className="whitespace-pre-wrap leading-relaxed">{item.text.trim() || '未記入・保留'}</p></section>)}
        <p className="text-sm">{savedNoteMissing ? '元の保存済み記録が見つかりません。入力内容を確認して、新しい記録として保存できます。' : encounter.savedNoteId ? 'この作業から保存した記録を更新します。' : '臨床ノートに新しい記録として保存します。'}</p>
        {savedNoteMissing ? <button className={PRIMARY} disabled={!isReady || syncStatus === 'syncing'} onClick={() => handoff(true)}>新しい臨床ノートとして保存</button> : <button className={PRIMARY} disabled={!isReady || unchangedSaved || syncStatus === 'syncing'} onClick={() => handoff()}>{unchangedSaved ? '保存済み' : encounter.savedNoteId ? 'この記録を更新する' : '臨床ノートに保存する'}</button>}
        {lastSaved && !savedNoteMissing && <div role="status" className="clinical-save-feedback"><p>{unchangedSaved ? 'このブラウザに記録を保存しました。' : '保存後に変更があります。確認して更新してください。'}{syncStatus === 'syncing' ? 'アカウントへの同期中です。' : syncStatus === 'offline' ? 'アカウントへの同期は完了していません。' : syncStatus === 'synced' ? 'アカウントへの同期も完了しています。' : ''}</p><Link href="/notes#clinical-timeline" className={BUTTON}>保存済みの臨床ノートを開く</Link></div>}
      </> : <>

      <h2 id="clinical-workspace-step-heading" tabIndex={-1} className="text-xl font-bold">{STEPS[encounter.step]}</h2>
      {encounter.step === 0 && <>
        <div className="grid gap-4 sm:grid-cols-2"><label>匿名ID<input className={FIELD} maxLength={80} value={encounter.patientIdentifier} onChange={event => update({ patientIdentifier: event.target.value })} placeholder="例：PT-042" autoComplete="off" /></label><label>記録日<input className={FIELD} type="date" value={encounter.visitDate} onChange={event => update({ visitDate: event.target.value })} /></label></div>
        <label className="block">主訴<input className={FIELD} maxLength={500} value={encounter.chiefComplaint} onChange={event => update({ chiefComplaint: event.target.value })} placeholder="例：首の回旋時の痛みと睡眠の支障" /></label>
        <label className="block">主訴別の確認ガイド<select aria-label="主訴別の確認ガイド" className={FIELD} value={encounter.complaintSlug} onChange={event => update({ complaintSlug: event.target.value })}><option value="">選ばずに進む</option>{CLINICAL_COMPLAINTS.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
        {complaint && <div className="space-y-2"><p className="font-semibold">まず確認したいこと</p><ul className="list-disc space-y-2 pl-5">{complaint.questions.map(question => <li key={question}>{question}</li>)}</ul><Link href={`/clinical/symptoms/${complaint.slug}`} className={`${BUTTON} mt-2`}>主訴別ガイドを開く</Link></div>}
        <details className="clinical-safety-disclosure rounded-lg bg-[#FCF4EB] px-4 text-sm leading-relaxed dark:bg-[#2A2016]">
          <summary className="min-h-11 cursor-pointer py-3 font-bold">施術より医療評価を優先する所見の確認<span className="block text-xs font-normal">危険兆候の例・受診の目安を開く</span></summary>
          <p className="mt-2">突然の激しい頭痛、神経症状、腰痛に伴う排尿・排便や会陰部感覚の変化などは医療評価を優先します。緊急時は日本では119へ。ここにない危険兆候もあります。</p><Link href="/safety" className="inline-flex min-h-11 items-center underline">受診・安全確認の詳細</Link>
        </details>
        <label className="block">安全確認の状態<select aria-label="安全確認の状態" className={FIELD} value={encounter.safety} onChange={event => update({ safety: event.target.value as ClinicalEncounter['safety'] })}><option value="unknown">未確認</option><option value="reviewed">確認した範囲で該当兆候なし（疾患の除外ではない）</option><option value="refer">該当・疑いあり：施術を保留し医療評価を優先</option></select></label>
        <label className="block">確認した項目・受診状況<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.safetyMemo} onChange={event => update({ safetyMemo: event.target.value })} /></label>
      </>}
      {encounter.step === 1 && <>
        <p className="text-sm">「なし」は確認して認めなかった場合に選びます。観察していない項目は「未確認」のまま残します。</p>
        {examinationIssues(encounter.examination).map(issue => <p role="alert" className="clinical-examination-hint" key={issue}>{issue}</p>)}
        {EXAMINATION_GROUPS.map(group => {
          const signs = comparisonSigns.filter(sign => sign.group === group);
          const fields = EXAMINATION_FIELDS.filter(field => field.group === group);
          const filled = fields.filter(field => { const value = examinationValue(field.id, encounter.examination, observations); return value && value !== '判断困難'; }).length + signs.filter(sign => observations[sign.id] && observations[sign.id] !== 'unknown').length;
          const summary = [...fields.flatMap(field => { const value = examinationValue(field.id, encounter.examination, observations); return value ? [`${field.label}：${value}`] : []; }), ...signs.flatMap(sign => { const status = observations[sign.id]; return status && status !== 'unknown' ? [`${sign.label}：${status === 'present' ? 'あり' : 'なし'}`] : []; }), ...EXAMINATION_TEXT_FIELDS.filter(field => field.group === group).flatMap(field => encounter.examination?.[field.id]?.trim() ? [`${field.label}：入力あり`] : [])];
          return <details key={group} id={`clinical-examination-${group}`} className="clinical-observation-group">
            <summary><span>{group}</span><span>{filled} / {fields.length + signs.length}項目確認</span><small className="clinical-examination-preview">{summary.length ? summary.slice(0, 3).join(' ／ ') + (summary.length > 3 ? ` ／ ほか${summary.length - 3}項目` : '') : '未確認・未入力'}</small></summary>
            <fieldset><legend className="sr-only">{group}の所見</legend>
              {group === '望診' && <p className="clinical-examination-hint">舌体と舌苔を分け、歯痕・裂紋などは個別に選べます。照明、直前の飲食、舌磨きの有無を補足に記録してください。「苔を認めない」を選ぶと苔の他の項目もそろいます。</p>}
              {group === '切診' && <p className="clinical-examination-hint">速さ・強さ・深さは別々に選びます。選択した所見は候補比較にも反映します。脈拍数から脈状や見立てを自動判定しません。</p>}
              <div className="clinical-examination-fields grid gap-3 sm:grid-cols-2">{fields.map(field => <Fragment key={field.id}>{(['tongueColor', 'coatColor', 'pulseSpeed', 'tenderness'].includes(field.id)) && <h3 className="clinical-examination-subheading sm:col-span-2">{field.id === 'tongueColor' ? '舌体の観察' : field.id === 'coatColor' ? '舌苔の観察' : field.id === 'pulseSpeed' ? '脈診' : '腹診・筋・皮膚などの触診'}</h3>}<label className="clinical-examination-field"><span className="font-semibold">{field.label}</span>
                <select id={field.id === 'pulseSpeed' ? 'clinical-sign-rapidPulse' : field.id === 'pulseStrength' ? 'clinical-sign-weakPulse' : `clinical-exam-${field.id}`} aria-label={field.label} className={`${FIELD} mt-2`} value={examinationValue(field.id, encounter.examination, observations)} onChange={event => updateExamination(field.id, event.target.value)}><option value="">未確認</option>{field.options.map(option => <option key={option} value={option}>{option}</option>)}</select>
              </label></Fragment>)}</div>
              {EXAMINATION_TEXT_FIELDS.filter(field => field.group === group).map(field => <label className="clinical-examination-text" key={field.id}>{field.label}{field.id === 'pulseRate'
                ? <input className={`${FIELD} mt-2`} maxLength={3} inputMode="numeric" value={encounter.examination?.[field.id] || ''} onChange={event => {
                  const value = event.target.value;
                  if (value === '' || /^[1-9]\d{0,2}$/.test(value)) updateExamination(field.id, value);
                }} placeholder="測定していなければ空欄" />
                : <textarea className={`${FIELD} mt-2`} rows={2} maxLength={field.maxLength} value={encounter.examination?.[field.id] || ''} onChange={event => updateExamination(field.id, event.target.value)} placeholder={field.id === 'pulseConditions' ? '例：安静座位・右橈骨動脈・60秒計測。運動、服薬、発熱など' : field.id === 'palpationSite' ? '例：右僧帽筋上部・浅部の圧で本人の痛みが再現' : '選択肢にない所見、複数の所見、確認した条件など'} />}</label>)}
              <div className="grid gap-3 sm:grid-cols-2">{signs.map(sign => <label className="clinical-examination-field" key={sign.id}><span className="font-semibold">{sign.label}</span><select id={`clinical-sign-${sign.id}`} aria-label={`${sign.label}の確認状態`} className={`${FIELD} mt-2`} value={observations[sign.id] || 'unknown'} onChange={event => update({ observations: { ...encounter.observations, [sign.id]: event.target.value } })}><option value="unknown">未確認</option><option value="present">あり</option><option value="absent">なし</option></select><span className="mt-2 block leading-relaxed">{sign.question}</span></label>)}</div>
            </fieldset>
          </details>;
        })}
        {encounter.interviewMemo && <label className="block">対面問診から引き継いだ記録<textarea maxLength={20000} className={FIELD} rows={5} value={encounter.interviewMemo} onChange={event => update({ interviewMemo: event.target.value })} /></label>}
        <label className="block">腹部・経穴反応・舌脈の補足、その他の所見<textarea id="clinical-examination-memo" maxLength={20000} className={FIELD} rows={4} value={encounter.examinationMemo} onChange={event => update({ examinationMemo: event.target.value })} placeholder="観察条件、本人の訴え、観察した事実を記録" /></label>
      </>}
      {encounter.step === 2 && <>
        <p className="clinical-candidate-intro">候補を探して選び、所見を比較し、検討する治法を記録します。所見の照合は入力項目に限られ、件数は診断の順位を示しません。</p>
        <details className="clinical-comparison-inputs"><summary>今回の四診入力・比較に反映する内容を確認</summary><p className="whitespace-pre-wrap">{examinationSummary(encounter.examination, observations) || '詳細所見は未確認です。'}</p><p>関連づけを設定した所見は支持・合いにくい所見に反映し、ほかの入力は各候補の追加評価欄に表示します。未確認・判断困難・自由記述から支持を推測しません。</p></details>
        <section className="clinical-candidate-stage" aria-labelledby="clinical-catalog-heading">
          <div className="clinical-candidate-section-heading"><h3 id="clinical-catalog-heading">1. 候補を選ぶ</h3><span>{CLINICAL_PATTERNS.length}候補</span></div>
          <ClinicalCandidatePicker patterns={candidateOptions} selectedIds={encounter.candidateIds} onChange={candidateIds => update({ candidateIds })} evidenceFiltering evidenceBlockedReason={encounter.safety === 'reviewed' ? undefined : encounter.safety === 'refer' ? '医療評価を優先する記録です。所見による絞り込みは保留し、安全確認と受診状況を先に確認してください。' : '所見による絞り込みの前に、この来院の安全確認を記録してください。'} onReviewSafety={() => proceed(0)} />
          <details className="clinical-custom-candidate">
            <summary>一覧にない候補を記録{encounter.customCandidates?.trim() && <span>入力あり</span>}</summary>
            <label>その他の候補・併存して考える見立て<textarea className={FIELD} rows={3} maxLength={2000} value={encounter.customCandidates || ''} onChange={event => update({ customCandidates: event.target.value })} placeholder="一覧にない候補や、併存を検討する見立てを記録" /></label>
            <p>自由入力した候補も、確認画面と臨床ノートに残ります。</p>
          </details>
          <nav className="clinical-candidate-jumps" aria-label="候補・治法の入力箇所へ移動">
            {encounter.candidateIds.length >= 2 && <a href="#clinical-differential-heading">候補同士の違い・追加確認を見る ↓</a>}
            {encounter.candidateIds.length > 0 && <a href="#clinical-compare-heading">選んだ候補を比較（{encounter.candidateIds.length}件） ↓</a>}
            <a href="#clinical-finding-changes-heading">所見の修正履歴へ ↓</a>
            <a href="#clinical-principle-heading">治法の入力へ ↓</a>
          </nav>
        </section>

        <section className="clinical-candidate-stage" aria-labelledby="clinical-compare-heading">
          <div className="clinical-candidate-section-heading"><h3 id="clinical-compare-heading" tabIndex={-1}>2. 選んだ候補を比較する</h3><span>{encounter.candidateIds.length}件選択</span></div>
          {encounter.candidateIds.length > 0 && <p className="clinical-candidate-intro">候補名を押すと所見と追加確認を開けます。複数の候補を同時に開いて比較できます。</p>}
          {encounter.candidateIds.length === 0 && <p className="clinical-candidate-empty">候補を選ぶと、支持する所見・合いにくい所見・未確認の所見を並べて確認できます。</p>}
          {encounter.safety !== 'reviewed' && <p className="clinical-candidate-safety">安全確認が未完了、または医療評価を優先する状態です。配穴の検討は保留します。</p>}
          <ClinicalCandidateDifferential patterns={selectedComparisons.map(result => result.pattern)} observations={encounter.observations} examination={encounter.examination} focusIds={comparisonFocus} onFocusChange={setComparisonFocus} onRecordDetails={revisitExaminationDetails} onObservationChange={(id, status) => recordFindingEdit({ kind: 'observation', id }, { observations: { ...encounterRef.current.observations, [id]: status }, examination: encounterRef.current.examination })} onExaminationChange={(id, value) => recordFindingEdit({ kind: 'examination', id }, clinicalExaminationPatch(encounterRef.current, id, value))} />
          <section className="clinical-finding-change-history" aria-labelledby="clinical-finding-changes-heading">
            <h4 id="clinical-finding-changes-heading" tabIndex={-1}>比較画面で変更した所見</h4>
            {findingEdits.length === 0 ? <p>所見を修正すると、変更前と変更後をここに表示します。</p> : <>
              <p>この下書きの変更を直近20件表示します。履歴も下書きと一緒にこのタブへ保存され、再読み込み後も直前の修正1件を戻せます。</p>
              <div className="clinical-finding-change-latest"><p role="status">{latestFindingEdit?.undone ? '直前の修正を戻しました。' : `直前の修正：${latestFindingEdit?.label}`}</p>{latestFindingEdit && !latestFindingEdit.undone && <button type="button" className={BUTTON} disabled={!undoFindingAvailable} onClick={undoFindingEdit}>直前の修正を戻す</button>}</div>
              {latestFindingEdit && !latestFindingEdit.undone && !undoFindingAvailable && <p>対象の所見がその後に変更されたため、この修正は戻せません。</p>}
              <ol>{findingEdits.slice(-3).reverse().map(findingEditRow)}</ol>
              {findingEdits.length > 3 && <details><summary>それ以前の修正を見る（{findingEdits.length - 3}件）</summary><ol>{findingEdits.slice(0, -3).reverse().map(findingEditRow)}</ol></details>}
            </>}
          </section>
          <div className="clinical-comparison-board">
            {selectedComparisons.map(result => <article key={result.pattern.id} className="clinical-comparison-row" data-selected="true">
              <details className="clinical-comparison-disclosure">
              <summary className="clinical-comparison-summary"><span className="clinical-candidate-comparison-title"><span>{result.pattern.category}</span><strong className="clinical-comparison-name">{result.pattern.name}</strong></span><span className="clinical-comparison-overview">{result.supported.length + result.missing.length + result.unknown.length > 0 ? `支持 ${result.supported.length}件 · 未確認 ${result.unknown.length}件${result.conflicting.length ? ` · 合いにくい ${result.conflicting.length}件` : ''}` : '現在の項目では照合不可'}</span></summary>
              <div className="clinical-comparison-body">
              {result.supported.length + result.missing.length + result.unknown.length + result.conflicting.length > 0 ? <dl className="clinical-comparison-fields">{COMPARISON_FIELDS.map(({ key, title, icon: Icon }) => <div key={key} className="clinical-comparison-cell" data-kind={key}><dt><Icon aria-hidden="true" />{title}</dt><dd>{key === 'conflicting' && !result.pattern.conflicts.length && !EXAMINATION_ASSOCIATIONS[result.pattern.id]?.conflicts?.length ? 'この候補には照合項目を設定していません' : key === 'unknown' && result.unknown.length ? result.unknown.map(id => <button type="button" key={id} className="clinical-missing-sign" onClick={() => revisitSign(id)}>{labels([id])}を確認</button>) : labels(result[key])}</dd></div>)}</dl> : <p className="clinical-candidate-empty">この候補は現在の入力項目では照合できません。下の追加確認をもとに、所見や検討理由を記録してください。</p>}
              <div className="clinical-comparison-context"><p>{result.pattern.distinguish}</p>{comparisonContext(result.pattern, encounter.examination, observations).length > 0 && <details className="clinical-neutral-findings"><summary>追加評価に使う入力済み所見（自動で支持・否定しない）</summary><ul>{comparisonContext(result.pattern, encounter.examination, observations).map(item => <li key={item}>{item}</li>)}</ul></details>}{result.pattern.additionalChecks?.length ? <div className="clinical-additional-checks"><p>入力項目のほかに確認したいこと</p><ul>{result.pattern.additionalChecks.map(item => <li key={item}>{item}</li>)}</ul></div> : null}<p>治法の参考：{result.pattern.principle}</p><Link href={`/curriculum/${result.pattern.lectureId}`}>関連する理論を読む →</Link></div>
              </div>
              </details>
            </article>)}
          </div>
          <label className="block clinical-rationale-label">候補の採用・保留理由と矛盾する所見<textarea maxLength={20000} rows={4} className={FIELD} value={encounter.rationale} onChange={event => update({ rationale: event.target.value })} placeholder="採用する理由、決めきれない点、次に確かめることを記録" /></label>
        </section>

        <section className="clinical-candidate-stage clinical-principle-stage" aria-labelledby="clinical-principle-heading">
          <div className="clinical-candidate-section-heading"><h3 id="clinical-principle-heading" tabIndex={-1}>3. 治法を組み立てる</h3></div>
          <p className="clinical-principle-help">ボタンで入力欄へ追加できます。追加した語句は、自分の言葉で編集できます。候補を変更しても、入力した治法は保持します。</p>
          <label className="block">今回検討する治法<textarea className={FIELD} rows={4} maxLength={20000} value={encounter.principle} onChange={event => { setPrincipleChange(null); update({ principle: event.target.value }); }} placeholder="候補や不足所見を踏まえ、検討する治法を記録" /></label>
          <div className="clinical-principle-feedback" role="status" aria-live="polite" aria-atomic="true">{activePrincipleChange && <><p>{activePrincipleChange.undone ? `「${activePrincipleChange.term}」の追加を戻しました。` : `入力欄へ「${activePrincipleChange.term}」を追加しました。`}</p>{!activePrincipleChange.undone && <button type="button" onClick={undoPrinciple}>直前の追加を戻す</button>}</>}</div>
          {encounter.candidateIds.length > 0 && <div className="clinical-principle-suggestions"><p>選んだ候補の参考から追加</p><div>{selectedPrinciples.map(principle => principleButton(principle))}</div></div>}
          <details className="clinical-principle-catalog"><summary>基本の治法から追加<span>{CLINICAL_PRINCIPLES.length}項目</span></summary><div>{[...new Set(CLINICAL_PRINCIPLES.map(item => item.group))].map(group => <fieldset key={group}><legend>{group}</legend><div>{CLINICAL_PRINCIPLES.filter(item => item.group === group).map(item => principleButton(item.label, item.id))}</div></fieldset>)}</div></details>

        </section>
      </>}
      {encounter.step === 3 && (encounter.safety !== 'reviewed' ? <p>配穴を保留しています。主訴・安全確認に戻るか、記録・再評価へ進んでください。</p> : <>
        <p className="text-sm">穴数や役割だけでは処方の適否を判断できません。各穴を採用する理由と変更条件を残します。取穴・注意事項は経穴辞典で確認してください。</p>
        {CLINICAL_PATTERNS.filter(pattern => encounter.candidateIds.includes(pattern.id) && pattern.points.length > 0).map(pattern => <div key={pattern.id} className="rounded-lg bg-[#F6F8F3] p-3 dark:bg-[#182823]"><h3 className="font-bold">{pattern.name}：配穴の学習例</h3><ul className="mt-2 space-y-2 text-sm">{pattern.points.map(point => <li key={point.code}><Link className="inline-flex min-h-11 items-center font-semibold underline" href={`/tsubo/${point.code.toLowerCase()}`}>{ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code}（{point.code}）の位置・注意</Link><p>{point.purpose}。採用条件：{point.condition}</p></li>)}</ul></div>)}
        <div className="clinical-point-search"><label className="block">経穴名・コードで探して追加<input className={FIELD} value={pointQuery} onChange={event => setPointQuery(event.target.value)} placeholder="例：足三里、ST36" /></label><p className="text-sm">選択中 {encounter.points.length} / 12穴</p><ul className="clinical-point-results">{pointQuery.trim() ? pointResults.slice(0, 12).map(point => <li key={point.code}><button type="button" className={BUTTON} disabled={encounter.points.some(item => item.code === point.code) || encounter.points.length >= 12} onClick={() => addPoint(point.code)}>{point.name}（{point.code}）{encounter.points.some(item => item.code === point.code) ? '追加済み' : '＋追加'}</button></li>) : <li className="text-sm ui-muted">名前やコードを入力すると候補が表示されます。</li>}</ul>{pointQuery.trim() && pointResults.length === 0 && <p role="status">該当する経穴がありません。</p>}</div>
        {encounter.points.length === 0 && <p className="text-sm">配穴は未選定です。必要なら保留のまま記録できます。</p>}
        {encounter.points.map((point,index) => <div className="space-y-3 rounded-xl border border-[#D6DED7] p-4 dark:border-[#34483C]" key={point.code}><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">{ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code}（{point.code}）</h3><button className={BUTTON} onClick={() => update({ points: encounter.points.filter(item => item.code !== point.code) })}>外す</button></div><label className="block">今回の役割<select aria-label="今回の役割" className={FIELD} value={point.role} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, role: event.target.value as typeof point.role } : item) })}><option value="other">保留・その他</option><option value="root">本治として検討</option><option value="branch">標治として検討</option></select></label><label className="block">この経穴を選ぶ理由<textarea maxLength={20000} className={FIELD} rows={2} value={point.reason} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, reason: event.target.value } : item) })} /></label><label className="block">代替案・変更する条件<input className={FIELD} value={point.alternative} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, alternative: event.target.value } : item) })} /></label><Link href={`/tsubo/${point.code.toLowerCase()}`} className={BUTTON}>位置・注意事項を確認</Link></div>)}
        <Link href="/practice/haiketsu" className={BUTTON}>既存の配穴構成ツールでも確認する →</Link>
      </>)}
      {encounter.step === 4 && <>
        <p className="text-sm">主訴の程度と生活動作を、次回来院時も同じ指標で確認します。直後の変化だけで効果を確定せず、有害な反応や受診結果も残します。</p>
        <label className="block">比較する指標<input className={FIELD} maxLength={120} value={encounter.metric} onChange={event => update({ metric: event.target.value })} placeholder="例：首の右回旋時の痛みNRS（0＝痛みなし、10＝想像できる最大の痛み）" /></label>
        <p className="text-sm leading-relaxed">痛みを0〜10で記録する場合は、0を「痛みなし」、10を「想像できる最大の痛み」と定義し、同じ動作・測定条件で比較します。仕事や睡眠への支障は、下の生活動作・機能の欄に分けて記録してください。<a href="https://pubmed.ncbi.nlm.nih.gov/21760827/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">痛みNRSの使用例（原論文）</a></p>
        <div className="grid gap-3 sm:grid-cols-2"><label>施術前の程度（0〜10。同じ指標・両端の定義で比較）<input type="number" min="0" max="10" step="1" className={FIELD} value={encounter.before} onChange={event => { if (event.target.value === '' || (/^\d+$/.test(event.target.value) && Number(event.target.value) <= 10)) update({ before: event.target.value }); }} /></label><label>施術直後の程度（未評価なら空欄）<input type="number" min="0" max="10" step="1" className={FIELD} value={encounter.after} onChange={event => { if (event.target.value === '' || (/^\d+$/.test(event.target.value) && Number(event.target.value) <= 10)) update({ after: event.target.value }); }} /></label></div>
        <label className="block">生活動作・機能の指標<textarea maxLength={20000} className={FIELD} rows={2} value={encounter.functionMemo} onChange={event => update({ functionMemo: event.target.value })} placeholder="例：振り向く動作、睡眠、仕事への影響" /></label>
        <label className="block">施術計画・実施した内容<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.plan} onChange={event => update({ plan: event.target.value })} /></label>
        <label className="block">施術直後の反応・有害な反応<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.reaction} onChange={event => update({ reaction: event.target.value })} /></label>
        <label className="block">見立ての修正・改善が乏しい場合の検討<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.revision} onChange={event => update({ revision: event.target.value })} /></label>
        <label className="block">次回確認すること・生活の助言・受診結果<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.nextAction} onChange={event => update({ nextAction: event.target.value })} /></label>
        <button className={PRIMARY} onClick={showReview}>記録を確認して保存へ →</button>
      </>}
      <div className="clinical-workspace-actions flex flex-wrap justify-between gap-3 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]">{encounter.step > 0 ? <button className={BUTTON} onClick={() => proceed(encounter.step - 1)}>← 前に戻る</button> : <span />}{encounter.step < 4 && <button className={PRIMARY} onClick={() => proceed(encounter.step === 2 && encounter.safety !== 'reviewed' ? 4 : encounter.step + 1)}>次へ →</button>}</div>
      </>}
    </section>
    <aside className="clinical-workspace-summary" aria-label="作業中の記録の要約"><p className="clinical-kicker">作業中の記録</p><h2>{encounter.patientIdentifier || '匿名ID未入力'}</h2><p>{encounter.chiefComplaint || '主訴未入力'}</p><dl><div><dt>現在の手順</dt><dd>{STEPS[encounter.step]}</dd></div><div><dt>所見の確認</dt><dd>{observationConfirmed} / {observationTotal}項目</dd></div><div><dt>比較する候補</dt><dd>{candidateNames.join('／') || '未選択'}</dd></div><div><dt>配穴</dt><dd>{encounter.safety === 'reviewed' ? encounter.points.map(point => ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code).join('・') || '未選定' : '安全確認・医療評価を優先'}</dd></div><div><dt>記録の状態</dt><dd>{saveState === 'checking' ? '保存先を確認中' : saveState === 'missing' ? '元の記録なし・下書き保持' : saveState === 'saved' ? '臨床ノートに保存済み' : saveState === 'changed' ? '保存後の変更あり' : saveState === 'unverified' ? '保存済み記録を再編集中' : '臨床ノートへ未保存'}</dd></div><div><dt>保存先</dt><dd>{syncStatus === 'offline' ? 'このブラウザに保存／同期は未完了' : syncStatus === 'syncing' ? 'アカウントの記録を同期中' : syncStatus === 'synced' ? 'このブラウザと自分のアカウント' : 'このブラウザ'}</dd></div></dl><button className={BUTTON} onClick={showReview}>入力内容を確認</button></aside>
    </div>
    <ClinicalEvidenceKey sourceKeys={['terminology','classification','tongue','deficiency','headache','back']} revisedAt="2026-10-19" />
  </div>;
}
