import Link from 'next/link';

export default function QuestionEvidence({ lectureId, revision, sources = [] }: {
  lectureId: string; revision: string; sources?: { title: string; url: string }[];
}) {
  return (
    <details className="mt-3 text-xs leading-relaxed text-[#59615D] dark:text-[#A0B0BC]">
      <summary className="cursor-pointer font-semibold">問題の出典・改訂情報</summary>
      <div className="mt-2 space-y-1">
        <p>種別：本サイトのオリジナル学習問題。公式国家試験の原文ではありません。</p>
        <p>学習上の参照：<Link className="underline" href={`/curriculum/${lectureId}`}>関連講義</Link></p>
        {sources.map(source => <p key={source.url}><a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></p>)}
        <p>内容識別：{revision}。設問・選択肢・正答・解説の変更時に更新します。</p>
        <p>伝統医学上の分類と現代医学の診断は区別して学びます。参照先は問題の論点を確認する資料です。</p>
      </div>
    </details>
  );
}
