import Link from 'next/link';
import { CLINICAL_INFORMATION_SCOPE, CLINICAL_SOURCES } from '@/data/clinicalWorkflow';

export default function ClinicalEvidenceKey({ sourceKeys = ['terminology'], revisedAt = '2026-10-04' }: { sourceKeys?: (keyof typeof CLINICAL_SOURCES)[]; revisedAt?: string }) {
  return <aside className="clinical-evidence" aria-label="出典と確認範囲">
    <p>証やツボの組み合わせは、見立てとその理由を比べるための例です。</p>
    <details>
      <summary>出典と確認範囲</summary>
      <div className="clinical-evidence-body">
        <p>{CLINICAL_INFORMATION_SCOPE}</p>
        <dl className="grid gap-3 sm:grid-cols-3">
          <div><dt className="font-semibold">伝統医学の資料</dt><dd>証やツボの名前、どんな所見と結びつけるかを調べます。</dd></div>
          <div><dt className="font-semibold">現代医学の資料</dt><dd>受診を急ぐ所見や、医療機関で調べることを確認します。</dd></div>
          <div><dt className="font-semibold">教材中のたとえ</dt><dd>言葉の意味を説明するために使います。体の中で何が起きたかは診察や研究で確かめます。</dd></div>
        </dl>
        <ul className="space-y-2">{sourceKeys.map(key => { const source = CLINICAL_SOURCES[key]; return <li key={key}><a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a><p>{source.scope}</p></li>; })}</ul>
        <p>資料を確認した日 {revisedAt}。症状の観察や伝統用語を学ぶための資料です。専門家による監修は完了していません。<Link className="inline-flex min-h-11 items-center underline underline-offset-4" href="/editorial-policy">編集方針</Link></p>
      </div>
    </details>
  </aside>;
}
