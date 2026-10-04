'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CLINICAL_SIGNS, CLINICAL_PATTERNS, CLINICAL_COMPLAINTS, compareClinicalPattern, type ClinicalSignId } from '@/data/clinicalWorkflow';
import { ACUPOINTS_MASTER } from '@/data/tsubo/acupointsMaster';
import { clearClinicalEncounter, clinicalEncounterDraft, emptyClinicalEncounter, readClinicalEncounter, writeClinicalEncounter, type ClinicalEncounter } from '@/utils/clinicalEncounter';
import { saveDraftPatientNote } from '@/utils/draftNote';
import ClinicalEvidenceKey from './ClinicalEvidenceKey';

const STEPS = ['主訴・安全確認', '四診所見', '候補・治法', '配穴の理由', '記録・再評価'];
const FIELD = 'w-full min-h-11 rounded-lg border border-[#C8D4CD] bg-white px-3 py-2 text-base text-[#232826] dark:border-[#496153] dark:bg-[#121B22] dark:text-[#FAF8F5]';
const BUTTON = 'inline-flex min-h-11 items-center justify-center rounded-lg border border-[#B9CDC0] px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-[#496153]';
const PRIMARY = `${BUTTON} bg-[#1E3D34] text-white hover:bg-[#2B5A46] dark:bg-[#9CCDB8] dark:text-[#11291F]`;
const BOX = 'rounded-xl border border-[#D6DED7] bg-white p-4 sm:p-5 dark:border-[#34483C] dark:bg-[#17212A]';
function labels(ids: ClinicalSignId[]) { return ids.map(id => CLINICAL_SIGNS.find(sign => sign.id === id)?.label).join('、') || '該当なし'; }

export default function ClinicalWorkspace() {
  const router = useRouter();
  const [encounter, setEncounter] = useState<ClinicalEncounter>(emptyClinicalEncounter);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pointQuery, setPointQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState('');
  const [onlySelected, setOnlySelected] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = readClinicalEncounter();
      const initial = stored.encounter || emptyClinicalEncounter();
      const complaint = CLINICAL_COMPLAINTS.find(item => item.slug === new URLSearchParams(window.location.search).get('complaint'));
      // A guide never replaces an encounter already in progress.
      if (complaint && !initial.patientIdentifier && !initial.chiefComplaint && Object.keys(initial.observations).length === 0) { initial.complaintSlug = complaint.slug; initial.chiefComplaint = complaint.title; }
      setEncounter(initial); setError(stored.error); setSaved(Boolean(stored.encounter)); setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  // Persist in the input event, before a link click or reload can unmount the form.
  const update = (patch: Partial<ClinicalEncounter>) => {
    const next = { ...encounter, ...patch };
    setEncounter(next);
    const ok = writeClinicalEncounter(next);
    setSaved(ok);
    setError(ok ? null : '下書きを保存できませんでした。この画面を離れる前にブラウザの保存設定を確認してください。');
  };
  const complaint = CLINICAL_COMPLAINTS.find(item => item.slug === encounter.complaintSlug);
  const comparisons = useMemo(() => CLINICAL_PATTERNS.map(pattern => ({ pattern, ...compareClinicalPattern(pattern, encounter.observations) })), [encounter.observations]);
  const pointResults = useMemo(() => {
    const query = pointQuery.trim().toLowerCase();
    return ACUPOINTS_MASTER.filter(point => !query || [point.code, point.name, point.kana, point.romaji].some(text => text?.toLowerCase().includes(query)));
  }, [pointQuery]);
  const proceed = (step: number) => {
    if (step === 3 && encounter.safety !== 'reviewed') { setError('配穴の検討前に安全確認を記録してください。医療評価を優先する場合は、記録・再評価へ進めます。'); return; }
    update({ step });
  };
  const handoff = () => {
    if (!encounter.patientIdentifier.trim() || !encounter.chiefComplaint.trim()) { setError('匿名IDと主訴を入力してください。'); return; }
    if (!encounter.visitDate) { setError('記録日を入力してください。'); return; }
    if (encounter.safety === 'unknown') { setError('安全確認の状態を記録してください。未確認なら、確認してからノートに進めます。'); return; }
    const safeEncounter = encounter.safety === 'refer' ? { ...encounter, points: [], principle: '施術を保留し医療評価を優先', plan: `施術は保留。${encounter.plan}` } : encounter;
    if (!writeClinicalEncounter(encounter)) { setError('下書きを保存できないため、この画面で入力を保持しています。'); return; }
    const names = safeEncounter.points.map(point => ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code);
    if (!saveDraftPatientNote(clinicalEncounterDraft(safeEncounter, names))) { setError('ノートへの転記を保存できませんでした。この画面で入力を保持しています。'); return; }
    router.push('/notes');
  };
  const reset = () => {
    if (!window.confirm('このタブの作業中の下書きを消して、新しい記録を始めますか？保存済みノートは残ります。')) return;
    if (!clearClinicalEncounter()) { setError('下書きを消去できませんでした。'); return; }
    setEncounter(emptyClinicalEncounter()); setError(null); setSaved(false); setOnlySelected(false); setPointQuery(''); setSelectedCode('');
  };
  if (!ready) return <p role="status" className="p-6">下書きを確認しています…</p>;
  return <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 text-[#232826] dark:text-[#FAF8F5] sm:py-10">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><Link href="/clinical" className="inline-flex min-h-11 items-center text-sm underline">← 臨床ホーム</Link><h1 className="font-serif text-2xl font-bold sm:text-3xl">所見から記録まで</h1><p className="mt-2 text-sm leading-relaxed">確認した事実と見立てを分け、判断の根拠を残します。氏名・連絡先など、個人を特定する情報は入力しないでください。</p></div><button className={BUTTON} onClick={reset}>新しい記録を始める</button></div>
    <p role="status" className="text-sm">{saved ? 'このタブに下書き保存済み。ページを移動して戻っても続けられます。' : '入力するとこのタブに下書きを保存します。'} タブを閉じる前に臨床ノートへ保存してください。</p>
    {encounter.previousSummary && <details className={BOX}><summary className="min-h-11 cursor-pointer font-semibold">前回からの申し送り</summary><p className="mt-2 whitespace-pre-wrap text-sm">{encounter.previousSummary}</p></details>}
    <nav aria-label="臨床記録の手順" className="grid grid-cols-2 gap-2 sm:grid-cols-5">{STEPS.map((label,index) => <button key={label} onClick={() => proceed(index)} aria-current={encounter.step === index ? 'step' : undefined} className={`${BUTTON} text-left ${encounter.step === index ? 'bg-[#1E3D34] text-white dark:bg-[#9CCDB8] dark:text-[#11291F]' : ''}`}>{index + 1}. {label}</button>)}</nav>
    {error && <p role="alert" className="rounded-lg border border-[#C06844] bg-[#FFF2EB] p-3 text-sm text-[#843C24] dark:bg-[#35221C] dark:text-[#FFD1BB]">{error}</p>}
    <section className={`${BOX} space-y-5`} aria-label={STEPS[encounter.step]}>
      <h2 className="text-xl font-bold">{STEPS[encounter.step]}</h2>
      {encounter.step === 0 && <>
        <div className="grid gap-4 sm:grid-cols-2"><label>匿名ID<input className={FIELD} maxLength={80} value={encounter.patientIdentifier} onChange={event => update({ patientIdentifier: event.target.value })} placeholder="例：PT-042" autoComplete="off" /></label><label>記録日<input className={FIELD} type="date" value={encounter.visitDate} onChange={event => update({ visitDate: event.target.value })} /></label></div>
        <label className="block">主訴<input className={FIELD} maxLength={500} value={encounter.chiefComplaint} onChange={event => update({ chiefComplaint: event.target.value })} placeholder="例：首の回旋時の痛みと睡眠の支障" /></label>
        <label className="block">主訴別の確認ガイド<select aria-label="主訴別の確認ガイド" className={FIELD} value={encounter.complaintSlug} onChange={event => update({ complaintSlug: event.target.value })}><option value="">選ばずに進む</option>{CLINICAL_COMPLAINTS.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
        {complaint && <div className="space-y-2"><p className="font-semibold">まず確認したいこと</p><ul className="list-disc space-y-2 pl-5">{complaint.questions.map(question => <li key={question}>{question}</li>)}</ul><Link href={`/clinical/symptoms/${complaint.slug}`} className={`${BUTTON} mt-2`}>主訴別ガイドを開く</Link></div>}
        <div className="rounded-lg bg-[#FCF4EB] p-4 text-sm leading-relaxed dark:bg-[#2A2016]"><p className="font-bold">施術より医療評価を優先する所見の確認</p><p className="mt-2">突然の激しい頭痛、神経症状、腰痛に伴う排尿・排便や会陰部感覚の変化などは医療評価を優先します。緊急時は日本では119へ。ここにない危険兆候もあります。</p><Link href="/safety" className="inline-flex min-h-11 items-center underline">受診・安全確認の詳細</Link></div>
        <label className="block">安全確認の状態<select aria-label="安全確認の状態" className={FIELD} value={encounter.safety} onChange={event => update({ safety: event.target.value as ClinicalEncounter['safety'] })}><option value="unknown">未確認</option><option value="reviewed">確認した範囲で該当兆候なし（疾患の除外ではない）</option><option value="refer">該当・疑いあり：施術を保留し医療評価を優先</option></select></label>
        <label className="block">確認した項目・受診状況<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.safetyMemo} onChange={event => update({ safetyMemo: event.target.value })} /></label>
      </>}
      {encounter.step === 1 && <>
        <p className="text-sm">「なし」は確認して認めなかった場合に選びます。観察していない項目は「未確認」のまま残します。</p>
        {['問診','望診','聞診','切診'].map(group => <fieldset key={group} className="space-y-2"><legend className="mb-2 font-bold">{group}</legend><div className="grid gap-3 sm:grid-cols-2">{CLINICAL_SIGNS.filter(sign => sign.group === group).map(sign => <label className="rounded-lg bg-[#F6F8F3] p-3 text-sm dark:bg-[#182823]" key={sign.id}><span className="font-semibold">{sign.label}</span><select aria-label={`${sign.label}の確認状態`} className={`${FIELD} mt-2`} value={encounter.observations[sign.id] || 'unknown'} onChange={event => update({ observations: { ...encounter.observations, [sign.id]: event.target.value } })}><option value="unknown">未確認</option><option value="present">あり</option><option value="absent">なし</option></select><span className="mt-2 block leading-relaxed">{sign.question}</span></label>)}</div></fieldset>)}
        <label className="block">腹部・経穴反応・舌脈の補足、その他の所見<textarea maxLength={20000} className={FIELD} rows={4} value={encounter.examinationMemo} onChange={event => update({ examinationMemo: event.target.value })} placeholder="観察条件、本人の訴え、観察した事実を記録" /></label>
      </>}
      {encounter.step === 2 && <>
        <p className="text-sm leading-relaxed">伝統医学の限定した7モデルを同じ所見と照合します。並びは固定で、診断の順位ではありません。表示した材料を検討し、比較したい候補を選びます。</p>
        <label className="flex min-h-11 items-center gap-3 text-sm font-semibold"><input type="checkbox" className="h-5 w-5" checked={onlySelected} onChange={event => setOnlySelected(event.target.checked)} />選択した候補だけを並べて比較</label>
        {onlySelected && encounter.candidateIds.length === 0 && <p className="text-sm">比較する候補が未選択です。表示を戻して候補を選んでください。</p>}
        {encounter.safety !== 'reviewed' && <p className="font-semibold">安全確認が未完了、または医療評価を優先する状態です。配穴の検討は保留します。</p>}
        <div className="grid gap-3 lg:grid-cols-2">{comparisons.filter(result => !onlySelected || encounter.candidateIds.includes(result.pattern.id)).map(result => <article key={result.pattern.id} className="space-y-3 rounded-xl border border-[#D6DED7] p-4 dark:border-[#34483C]">
          <label className="flex min-h-11 items-center gap-3 font-bold"><input type="checkbox" checked={encounter.candidateIds.includes(result.pattern.id)} onChange={event => update({ candidateIds: event.target.checked ? [...encounter.candidateIds, result.pattern.id] : encounter.candidateIds.filter(id => id !== result.pattern.id) })} className="h-5 w-5" />{result.pattern.name}</label>
          <dl className="space-y-2 text-sm leading-relaxed"><div><dt className="font-semibold">支持材料</dt><dd>{labels(result.supported)}</dd></div><div><dt className="font-semibold">モデルの支持所見のうち認めなかったもの</dt><dd>{labels(result.missing)}</dd></div><div><dt className="font-semibold">単純なモデルと合いにくい材料</dt><dd>{labels(result.conflicting)}</dd></div><div><dt className="font-semibold">追加確認</dt><dd>{labels(result.unknown)}</dd></div></dl>
          <p className="text-sm leading-relaxed">{result.pattern.distinguish}</p><p className="text-sm">治法の学習例：{result.pattern.principle}</p>
          <Link href={`/curriculum/${result.pattern.lectureId}`} className="inline-flex min-h-11 items-center text-sm underline">理論に戻る →</Link>
        </article>)}</div>
        <label className="block">候補の採用・保留理由と矛盾する所見<textarea maxLength={20000} rows={4} className={FIELD} value={encounter.rationale} onChange={event => update({ rationale: event.target.value })} /></label>
        <label className="block">検討する治法<input className={FIELD} value={encounter.principle} onChange={event => update({ principle: event.target.value })} placeholder="候補や不足所見を踏まえ、自分の言葉で記入" /></label>
      </>}
      {encounter.step === 3 && (encounter.safety !== 'reviewed' ? <p>配穴を保留しています。主訴・安全確認に戻るか、記録・再評価へ進んでください。</p> : <>
        <p className="text-sm">穴数や役割だけでは処方の適否を判断できません。各穴を採用する理由と変更条件を残します。取穴・注意事項は経穴辞典で確認してください。</p>
        {CLINICAL_PATTERNS.filter(pattern => encounter.candidateIds.includes(pattern.id)).map(pattern => <div key={pattern.id} className="rounded-lg bg-[#F6F8F3] p-3 dark:bg-[#182823]"><h3 className="font-bold">{pattern.name}：配穴の学習例</h3><ul className="mt-2 space-y-2 text-sm">{pattern.points.map(point => <li key={point.code}><Link className="inline-flex min-h-11 items-center font-semibold underline" href={`/tsubo/${point.code.toLowerCase()}`}>{ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code}（{point.code}）の位置・注意</Link><p>{point.purpose}。採用条件：{point.condition}</p></li>)}</ul></div>)}
        <div className="grid gap-3 sm:grid-cols-2"><label>経穴名・コードで絞る<input className={FIELD} value={pointQuery} onChange={event => { setPointQuery(event.target.value); setSelectedCode(''); }} placeholder="例：足三里、ST36" /></label><label>経穴を選ぶ<select aria-label="経穴を選ぶ" className={FIELD} value={selectedCode} onChange={event => setSelectedCode(event.target.value)}><option value="">{pointResults.length ? `${pointResults.length}穴から選択` : '該当する経穴がありません'}</option>{pointResults.map(point => <option key={point.code} value={point.code}>{point.name}（{point.code}）</option>)}</select></label></div>
        <button className={BUTTON} disabled={!selectedCode || encounter.points.length >= 12} onClick={() => { if (encounter.points.some(point => point.code === selectedCode)) { setError('この経穴は追加済みです。'); return; } update({ points: [...encounter.points, { code: selectedCode, role: 'other', reason: '', alternative: '' }] }); setSelectedCode(''); }}>選んだ経穴を追加</button>
        {encounter.points.length === 0 && <p className="text-sm">配穴は未選定です。必要なら保留のまま記録できます。</p>}
        {encounter.points.map((point,index) => <div className="space-y-3 rounded-xl border border-[#D6DED7] p-4 dark:border-[#34483C]" key={point.code}><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">{ACUPOINTS_MASTER.find(item => item.code === point.code)?.name || point.code}（{point.code}）</h3><button className={BUTTON} onClick={() => update({ points: encounter.points.filter(item => item.code !== point.code) })}>外す</button></div><label className="block">今回の役割<select aria-label="今回の役割" className={FIELD} value={point.role} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, role: event.target.value as typeof point.role } : item) })}><option value="other">保留・その他</option><option value="root">本治として検討</option><option value="branch">標治として検討</option></select></label><label className="block">この経穴を選ぶ理由<textarea maxLength={20000} className={FIELD} rows={2} value={point.reason} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, reason: event.target.value } : item) })} /></label><label className="block">代替案・変更する条件<input className={FIELD} value={point.alternative} onChange={event => update({ points: encounter.points.map((item,i) => i === index ? { ...item, alternative: event.target.value } : item) })} /></label><Link href={`/tsubo/${point.code.toLowerCase()}`} className={BUTTON}>位置・注意事項を確認</Link></div>)}
        <Link href="/practice/haiketsu" className={BUTTON}>既存の配穴構成ツールでも確認する →</Link>
      </>)}
      {encounter.step === 4 && <>
        <p className="text-sm">主訴の程度と生活動作を、次回来院時も同じ指標で確認します。直後の変化だけで効果を確定せず、有害な反応や受診結果も残します。</p>
        <label className="block">比較する指標<input className={FIELD} maxLength={120} value={encounter.metric} onChange={event => update({ metric: event.target.value })} placeholder="例：首の右回旋時の痛み" /></label>
        <div className="grid gap-3 sm:grid-cols-2"><label>施術前の程度（0：支障なし〜10：最も強い）<input type="number" min="0" max="10" step="1" className={FIELD} value={encounter.before} onChange={event => { if (event.target.value === '' || (/^\d+$/.test(event.target.value) && Number(event.target.value) <= 10)) update({ before: event.target.value }); }} /></label><label>施術直後の程度（未評価なら空欄）<input type="number" min="0" max="10" step="1" className={FIELD} value={encounter.after} onChange={event => { if (event.target.value === '' || (/^\d+$/.test(event.target.value) && Number(event.target.value) <= 10)) update({ after: event.target.value }); }} /></label></div>
        <label className="block">生活動作・機能の指標<textarea maxLength={20000} className={FIELD} rows={2} value={encounter.functionMemo} onChange={event => update({ functionMemo: event.target.value })} placeholder="例：振り向く動作、睡眠、仕事への影響" /></label>
        <label className="block">施術計画・実施した内容<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.plan} onChange={event => update({ plan: event.target.value })} /></label>
        <label className="block">施術直後の反応・有害な反応<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.reaction} onChange={event => update({ reaction: event.target.value })} /></label>
        <label className="block">見立ての修正・改善が乏しい場合の検討<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.revision} onChange={event => update({ revision: event.target.value })} /></label>
        <label className="block">次回確認すること・生活の助言・受診結果<textarea maxLength={20000} className={FIELD} rows={3} value={encounter.nextAction} onChange={event => update({ nextAction: event.target.value })} /></label>
        <button className={PRIMARY} onClick={handoff}>臨床ノートへ転記して確認・保存 →</button>
      </>}
      <div className="flex flex-wrap justify-between gap-3 border-t border-[#D6DED7] pt-4 dark:border-[#34483C]">{encounter.step > 0 ? <button className={BUTTON} onClick={() => proceed(encounter.step - 1)}>← 前に戻る</button> : <span />}{encounter.step < 4 && <button className={PRIMARY} onClick={() => proceed(encounter.step === 2 && encounter.safety !== 'reviewed' ? 4 : encounter.step + 1)}>次へ →</button>}</div>
    </section>
    <ClinicalEvidenceKey sourceKeys={['terminology','headache','back']} />
  </div>;
}
