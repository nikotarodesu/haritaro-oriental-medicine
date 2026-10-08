import Link from 'next/link';
import type { PaperReference } from '@/data/references/papersData';

const linkClass = 'inline-flex min-h-11 items-center font-semibold text-[#1E3D34] underline underline-offset-4 dark:text-[#9CCDB8]';

export default function SymptomResearchReferences({ papers }: { papers: PaperReference[] }) {
  return (
    <div className="space-y-3 border-t border-[#D6DED7] pt-5 dark:border-[#34483C]">
      <h3 className="text-xl font-bold">関連する研究資料</h3>
      {papers.length > 0 ? (
        <>
          <p className="text-sm">書誌を照合した関連分野の論文です。研究の病名・対象・介入はこのガイドの症状や経穴例と一致するとは限りません。特定の経穴組み合わせの効果や、セルフケアへの適用を保証しません。</p>
          <ul className="space-y-5">
            {papers.map(paper => {
              const interpretationChecked = paper.claimsStatus === 'source-checked' && Boolean(paper.sourceLocator && paper.verificationScope);
              const sourceUrl = paper.sourceUrl || (paper.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/` : paper.doi ? `https://doi.org/${paper.doi}` : undefined);
              return (
                <li key={paper.id} className="space-y-2 rounded-xl bg-[#FAF8F5] p-4 dark:bg-[#10171F]">
                  <h4 className="text-lg font-semibold leading-relaxed"><Link href={`/library#paper-${paper.id}`} className={linkClass}>{paper.title}</Link></h4>
                  <p className="text-sm">{paper.journal}（{paper.year}）</p>
                  <p className="text-sm">書誌の照合：一致を確認{paper.sourceCheckedAt && <>（<time dateTime={paper.sourceCheckedAt}>{paper.sourceCheckedAt}</time>）</>}</p>
                  {interpretationChecked ? (
                    <>
                      <p className="text-sm font-semibold">研究内容：{paper.verificationScope === 'abstract' ? '抄録を照合' : '本文の一部を照合'}{paper.claimsCheckedAt && <>（<time dateTime={paper.claimsCheckedAt}>{paper.claimsCheckedAt}</time>）</>}</p>
                      <p className="text-sm">確認した範囲：{paper.sourceLocator}</p>
                      <details className="space-y-2">
                        <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold">研究の対象・説明・適用の限界を読む</summary>
                        <p className="text-sm">対象：{paper.targetCondition}</p>
                        <p className="text-sm">{paper.abstract}</p>
                        <ul className="list-disc space-y-2 pl-5 text-sm">{paper.clinicalTakeaways.map(limitation => <li key={limitation}>{limitation}</li>)}</ul>
                      </details>
                    </>
                  ) : <p className="text-sm">研究結果の解釈・適用範囲は確認中です。結果や施術条件の要約は掲載を保留しています。</p>}
                  <p className="text-sm">専門家による監修・承認は未完了です。</p>
                  {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>照合先の原典を読む ↗</a>}
                </li>
              );
            })}
          </ul>
        </>
      ) : <p className="text-sm">このガイドの経穴例に直接対応する研究結果の要約は掲載していません。一般的な研究資料は文献一覧から確認できます。</p>}
      <Link href="/library" className={linkClass}>照合した研究資料の一覧へ →</Link>
    </div>
  );
}
