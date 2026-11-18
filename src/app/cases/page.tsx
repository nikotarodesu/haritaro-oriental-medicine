import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { PageSymbol } from "@/components/design/PageArtwork";
import { AlertCircle, ArrowRight } from "lucide-react";
import { CLINICAL_CASES } from "@/data/clinicalCasesData";

export default function CasesIndexPage() {
  const totalCaseCount = CLINICAL_CASES.length;
  const firstCase = CLINICAL_CASES[0];
  return (
    <div className="page-layout clinical-case-catalog space-y-8 sm:space-y-10">
      {/* パンくずリスト */}
      <nav aria-label="パンくず" className="flex items-center gap-2 text-sm text-[#737C77] dark:text-[#8899A6]">
        <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E]">ホーム</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-[#232826] dark:text-[#FAF8F5] font-semibold">症例を選ぶ</span>
      </nav>

      <PageIntro eyebrow={`全${totalCaseCount}症例・所見から考える練習`} title="症例を選ぶ" description="模擬症例を読み、弁証・治法・配穴の理由を考えます。解答例と比べて、判断の根拠を振り返りましょう。" art="practice">
        <div className="page-actions">
          {firstCase && <Link href={`/cases/${firstCase.id}`} className="page-primary-action">最初の症例から始める<ArrowRight size={18} aria-hidden="true" /></Link>}
          <a href="#case-catalog" className="page-secondary-action">症例を選ぶ</a>
        </div>
      </PageIntro>

      {/* 症例一覧グリッド */}
      <div id="case-catalog" className="scroll-mt-28 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#737C77] dark:text-[#8899A6] px-1">
          <h2 className="font-bold text-lg text-[#232826] dark:text-[#FAF8F5]">
            全{totalCaseCount}症例一覧
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINICAL_CASES.map((c) => (
            <Link
              key={c.id}
              className="page-link-card page-link-card--stack group justify-between"
              href={`/cases/${c.id}`}
            >
              <div className="space-y-3">
                {/* ヘッダーバッジ */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#737C77] dark:text-[#8899A6]">
                      症例 {c.caseNumber < 10 ? `0${c.caseNumber}` : c.caseNumber}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      c.difficulty === "初級" 
                        ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300"
                        : c.difficulty === "中級"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                </div>

                <div className="flex items-center gap-3">
                  <span className="page-link-icon"><PageSymbol kind="practice" /></span>
                  <span className="text-sm font-semibold text-[#B86924] dark:text-[#E6C387]">{c.category}</span>
                </div>

                {/* タイトル */}
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {c.title}
                </h3>

                {/* 主訴プレビュー */}
                <p className="text-sm text-[#59615D] dark:text-[#96A6B2] line-clamp-2 leading-relaxed">
                  「{c.patient.chiefComplaint}」
                </p>
              </div>

              {/* フッター情報 ＆ 導線CTA */}
              <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-[#737C77] dark:text-[#8899A6]">
                  {c.patient.age}・{c.patient.gender}
                </span>
                
                <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  演習を始める <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 症例演習に関する留意事項・免責 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#152028] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-start gap-3 text-xs text-[#59615D] dark:text-[#96A6B2]">
          <AlertCircle className="w-4 h-4 text-[#B86924] dark:text-[#E6C387] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#232826] dark:text-[#FAF8F5]">
              【症例演習に関する留意事項・免責】
            </p>
            <p className="leading-relaxed">
              掲載されている症例データおよび解説は、東洋医学・鍼灸理論の臨床推論トレーニングを目的として構成された教育用の模擬症例（フィクション）です。特定の患者の個人情報や実際のカルテ記録等とは一切関係ありません。また、実際の患者に対する治療・施術方針の決定にあたっては、担当する医療従事者や医師の診断・指導に従ってください。
            </p>
          </div>
        </div>
      </div>

      <div id="revision-training" className="clinical-case-revision-link">
        <p>追加情報で判断を見直す練習もできます。</p>
        <Link href="/simulator#revision-training" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">見立て修正の演習へ<ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <nav aria-label="関連する演習" className="flex flex-wrap gap-x-6 gap-y-1">
        <Link href="/simulator" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">弁証の練習へ</Link>
        <Link href="/practice/haiketsu" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">配穴の練習へ</Link>
      </nav>
    </div>
  );
}
