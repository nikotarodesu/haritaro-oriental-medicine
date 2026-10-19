'use client';

import { useState } from 'react';
import type { ClinicalObservations, ClinicalPattern, ClinicalSignId, ObservationStatus } from '@/data/clinicalWorkflow';
import { examinationIssues, type ClinicalExamination } from '@/data/clinicalExamination';
import type { ComparisonFindingId } from '@/data/clinicalExaminationComparison';
import { clinicalCandidateDifferential, type ClinicalCandidateDifferential as DifferentialResult, type DifferentialFinding } from '@/utils/clinicalCandidateDifferential';
import ClinicalFindingInput from './ClinicalFindingInput';

interface Props {
  patterns: readonly ClinicalPattern[];
  observations: ClinicalObservations;
  examination?: ClinicalExamination;
  focusIds: readonly string[] | null;
  onFocusChange: (ids: string[]) => void;
  onCheck: (id: ComparisonFindingId) => void;
  onRecordDetails: () => void;
  onObservationChange: (id: ClinicalSignId, status: ObservationStatus) => void;
  onExaminationChange: (id: string, value: string) => void;
}

function FindingRelations({ finding, patterns }: { finding: DifferentialFinding; patterns: readonly ClinicalPattern[] }) {
  return <dl className="clinical-differential-relations">{patterns.map(pattern => {
    const relation = finding.relations.find(item => item.patternId === pattern.id)?.relation || 'unmapped';
    const description = relation === 'unmapped' ? '照合設定なし'
      : finding.status === 'unknown' ? relation === 'support' ? 'ありなら支持' : 'ありなら合いにくい'
        : finding.status === 'absent' ? relation === 'support' ? '支持所見を認めない' : '合いにくい所見を認めない'
          : relation === 'support' ? '支持する' : '合いにくい';
    return <div key={pattern.id} data-relation={finding.status === 'present' ? relation : undefined}><dt>{pattern.name}</dt><dd>{description}</dd></div>;
  })}</dl>;
}

function DifferenceRows({ findings, patterns, onCheck }: { findings: readonly DifferentialFinding[]; patterns: readonly ClinicalPattern[]; onCheck: Props['onCheck'] }) {
  return findings.map(finding => <li key={finding.id} className="clinical-differential-finding">
    <div className="clinical-differential-finding-heading"><p><span>{finding.group}</span><strong>{finding.label}</strong><small>{finding.status === 'present' ? 'あり' : '確認してなし'}</small></p><button type="button" aria-label={`${finding.label}の入力を見直す`} onClick={() => onCheck(finding.id)}>入力を見直す</button></div>
    <FindingRelations finding={finding} patterns={patterns} />
  </li>);
}

type InlineInputProps = Pick<Props, 'observations' | 'examination' | 'onObservationChange' | 'onExaminationChange'>;
function NextCheckRows({ checks, patterns, onEdit, ...inputProps }: InlineInputProps & { checks: DifferentialResult['nextChecks']; patterns: readonly ClinicalPattern[]; onEdit: () => void }) {
  return checks.map(check => <li className="clinical-differential-question" key={check.key}>
    <div className="clinical-differential-finding-heading"><p><span>{check.group}</span><strong>{check.label}</strong></p><span className="clinical-inline-finding-status">{check.findings.some(finding => finding.status === 'unknown') ? '要確認' : '入力済み'}</span></div>
    <ClinicalFindingInput findingIds={check.findings.map(finding => finding.id)} {...inputProps} onObservationChange={(id, status) => { onEdit(); inputProps.onObservationChange(id, status); }} onExaminationChange={(id, value) => { onEdit(); inputProps.onExaminationChange(id, value); }} />
    {check.findings.map(finding => <div className="clinical-differential-question-finding" key={finding.id}><p>{finding.label}<span className="clinical-inline-finding-observed">{finding.status === 'present' ? 'あり' : finding.status === 'absent' ? '確認してなし' : '未確認・判断困難等'}</span></p><FindingRelations finding={finding} patterns={patterns} /></div>)}
  </li>);
}

export default function ClinicalCandidateDifferential({ patterns, observations, examination, focusIds, onFocusChange, onCheck, onRecordDetails, onObservationChange, onExaminationChange }: Props) {
  const [inputSession, setInputSession] = useState<{ scope: string; retained: string[]; primary: string[] } | null>(null);
  const focused = patterns.filter(pattern => (focusIds || patterns.slice(0, 4).map(item => item.id)).includes(pattern.id)).slice(0, 4);
  const result = clinicalCandidateDifferential(focused, observations, examination);
  const scope = focused.map(pattern => pattern.id).join('|');
  const session = inputSession?.scope === scope ? inputSession : null;
  const pendingKeys = result.nextChecks.map(check => check.key);
  const currentFindings = new Map([...result.differences, ...result.nextChecks.flatMap(check => check.findings)].map(finding => [finding.id, finding]));
  const inlineChecks = clinicalCandidateDifferential(focused, {}, {}).nextChecks
    .filter(check => pendingKeys.includes(check.key) || session?.retained.includes(check.key))
    .map(check => ({ ...check, findings: check.findings.map(finding => currentFindings.get(finding.id) || finding) }));
  const primaryKeys = session?.primary || inlineChecks.slice(0, 6).map(check => check.key);
  const primaryChecks = inlineChecks.filter(check => primaryKeys.includes(check.key));
  const moreChecks = inlineChecks.filter(check => !primaryKeys.includes(check.key));
  const rememberInputs = () => {
    // Keep the form and its first-six boundary mounted while a selection changes other findings.
    setInputSession({ scope, retained: [...new Set([...(session?.retained || []), ...inlineChecks.map(check => check.key)])], primary: primaryKeys });
  };
  const inputProps = { observations, examination, onObservationChange, onExaminationChange, onEdit: rememberInputs };
  const confirmedInline = inlineChecks.filter(check => check.findings.every(finding => finding.status !== 'unknown')).length;
  const toggleFocus = (id: string, checked: boolean) => {
    const ids = focused.map(pattern => pattern.id);
    if (checked && ids.length < 4) onFocusChange([...ids, id]);
    if (!checked) onFocusChange(ids.filter(item => item !== id));
  };
  return <section className="clinical-differential" aria-labelledby="clinical-differential-heading">
    <h4 id="clinical-differential-heading" tabIndex={-1}>候補の違いと、次に確認する四診</h4>
    <p className="clinical-differential-help">選んだ候補を2〜4件並べ、共通点と違いを確認します。照合設定のない所見は、その候補の否定材料にはしません。</p>
    {patterns.length > 0 && <fieldset className="clinical-differential-focus"><legend>違いを見る候補（最大4件）</legend><div>{patterns.map(pattern => <label key={pattern.id}>
      <input type="checkbox" checked={focused.some(item => item.id === pattern.id)} disabled={focused.length >= 4 && !focused.some(item => item.id === pattern.id)} onChange={event => toggleFocus(pattern.id, event.target.checked)} />{pattern.name}
    </label>)}</div><p role="status">{focused.length}件を比較対象にしています{patterns.length > 4 ? '。入れ替えるときは、先に比較対象を1件外してください。候補の選択は保持されます。' : '。'}</p></fieldset>}
    {focused.length < 2 ? <p className="clinical-candidate-empty">{patterns.length < 2 ? <a href="#clinical-catalog-heading">上の一覧から候補を2件以上選んでください。</a> : '違いを見る候補を2件以上チェックしてください。'}</p> : <>
      {result.equivalentPairs.length > 0 && <div className="clinical-differential-limit">{result.equivalentPairs.map(pair => <p key={pair.ids.join('-')}>{pair.names.join('と')}は、現在の入力項目では見分けられません。下の「候補ごとの見分け方・追加確認」で部位や経過を確認してください。</p>)}</div>}
      <div className="clinical-differential-section"><h5>共通する支持所見</h5>{result.shared.length > 0 ? <ul className="clinical-differential-shared">{result.shared.map(finding => <li key={finding.id}><span>{finding.group}</span>{finding.label}</li>)}</ul> : <p className="clinical-differential-help">比較対象すべてを支持する、入力済みの共通所見はありません。</p>}</div>
      <div className="clinical-differential-section"><h5>入力済み所見で比べる違い <span>{result.differences.length}所見</span></h5><p className="clinical-differential-help">同じ所見に対する候補ごとの関連づけです。「確認してなし」も表示します。</p>
        {result.differences.length > 0 ? <><ul className="clinical-differential-list"><DifferenceRows findings={result.differences.slice(0, 6)} patterns={focused} onCheck={onCheck} /></ul>{result.differences.length > 6 && <details className="clinical-differential-more"><summary>ほかの違いを見る（{result.differences.length - 6}所見）</summary><ul className="clinical-differential-list"><DifferenceRows findings={result.differences.slice(6)} patterns={focused} onCheck={onCheck} /></ul></details>}</> : <p className="clinical-differential-help">現在の入力済み所見では違いが出ていません。</p>}
      </div>
      <div className="clinical-differential-section" aria-labelledby="clinical-inline-checks-heading"><h5 id="clinical-inline-checks-heading">さらに見分けるために確認する四診 <span>未確認等 {result.nextChecks.length}項目{confirmedInline > 0 ? ` · この画面で確認済み ${confirmedInline}項目` : ''}</span></h5><p className="clinical-differential-help">ここで入力すると四診の下書きに保存され、上の候補一覧・絞り込み・違いにすぐ反映されます。入力した欄はそのまま修正できます。確認順は診断の優先度を示しません。</p>
        {examinationIssues(examination).map(issue => <p role="alert" className="clinical-candidate-safety" key={issue}>{issue}</p>)}
        {inlineChecks.length > 0 ? <><ul className="clinical-differential-list"><NextCheckRows checks={primaryChecks} patterns={focused} {...inputProps} /></ul>{moreChecks.length > 0 && <details className="clinical-differential-more"><summary>ほかの追加確認を見る（{moreChecks.length}項目）</summary><ul className="clinical-differential-list"><NextCheckRows checks={moreChecks} patterns={focused} {...inputProps} /></ul></details>}</> : <p className="clinical-differential-help">現在の照合項目には、違いを見るための未確認項目が残っていません。部位・経過など、下の追加確認も使って検討してください。</p>}
      </div>
      <details className="clinical-differential-more clinical-differential-context" open={result.equivalentPairs.length > 0 ? true : undefined}><summary>候補ごとの見分け方・追加確認</summary><div>{focused.map(pattern => <article key={pattern.id}><h5>{pattern.name}</h5><p>{pattern.distinguish}</p>{pattern.additionalChecks?.length ? <ul>{pattern.additionalChecks.map(item => <li key={item}>{item}</li>)}</ul> : null}</article>)}<button type="button" onClick={onRecordDetails}>確認した部位・経過などを四診の補足に記録する →</button></div></details>
    </>}
  </section>;
}
