import Link from 'next/link';
import { CLINICAL_INFORMATION_SCOPE, CLINICAL_SOURCES } from '@/data/clinicalWorkflow';

export default function ClinicalEvidenceKey({ sourceKeys = ['terminology'] }: { sourceKeys?: (keyof typeof CLINICAL_SOURCES)[] }) {
  return <aside className="clinical-evidence" aria-label="出典と確認範囲">
    <p>伝統医学の分類・配穴例は学習用で、個別の診断や治療効果を示すものではありません。</p>
    <details>
      <summary>出典と確認範囲</summary>
      <div className="clinical-evidence-body">
        <p>{CLINICAL_INFORMATION_SCOPE}</p>
        <dl className="grid gap-3 sm:grid-cols-3">
          <div><dt className="font-semibold">伝統理論・学習モデル</dt><dd>証・治法・配穴例。個別の治療効果を保証しません。</dd></div>
          <div><dt className="font-semibold">現代医学の資料</dt><dd>受診目安や原因評価。引用の目的と範囲を示します。</dd></div>
          <div><dt className="font-semibold">理解を助ける比喩</dt><dd>身体の生理機構と同一とは扱いません。</dd></div>
        </dl>
        <ul className="space-y-2">{sourceKeys.map(key => { const source = CLINICAL_SOURCES[key]; return <li key={key}><a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a><p>{source.scope}</p></li>; })}</ul>
        <p>教材の整理日：2026-10-04。新しい照合モデルの臨床的妥当性・専門家監修は未確認です。<Link className="inline-flex min-h-11 items-center underline underline-offset-4" href="/editorial-policy">編集方針</Link></p>
      </div>
    </details>
  </aside>;
}
