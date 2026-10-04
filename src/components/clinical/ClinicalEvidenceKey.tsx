import Link from 'next/link';
import { CLINICAL_INFORMATION_SCOPE, CLINICAL_SOURCES } from '@/data/clinicalWorkflow';

export default function ClinicalEvidenceKey({ sourceKeys = ['terminology'] }: { sourceKeys?: (keyof typeof CLINICAL_SOURCES)[] }) {
  return <aside className="rounded-xl border border-[#D6DED7] bg-[#F6F8F3] p-4 text-sm leading-relaxed dark:border-[#34483C] dark:bg-[#182823]" aria-label="情報の区分と参照範囲">
    <p className="font-bold">情報の区分と確認範囲</p>
    <p className="mt-2">{CLINICAL_INFORMATION_SCOPE}</p>
    <dl className="mt-3 grid gap-2 sm:grid-cols-3">
      <div><dt className="font-semibold">伝統理論・学習モデル</dt><dd>証・治法・配穴例。個別の治療効果を保証しません。</dd></div>
      <div><dt className="font-semibold">現代医学の資料</dt><dd>受診目安や原因評価。引用の目的と範囲を示します。</dd></div>
      <div><dt className="font-semibold">理解を助ける比喩</dt><dd>身体の生理機構と同一とは扱いません。</dd></div>
    </dl>
    <ul className="mt-3 space-y-2">{sourceKeys.map(key => { const source = CLINICAL_SOURCES[key]; return <li key={key}><a className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a><p>{source.scope}</p></li>; })}</ul>
    <p className="mt-3">教材の整理日：2026-10-04。新しい照合モデルの臨床的妥当性・専門家監修は未確認です。<Link className="underline underline-offset-4" href="/editorial-policy">編集方針</Link></p>
  </aside>;
}
