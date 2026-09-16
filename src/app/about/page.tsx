import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-8 sm:space-y-12">
      {/* ページ見出し */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>サイトの志と運営方針</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          「はり太郎の東洋医学」について
        </h1>
        <p className="text-sm sm:text-lg text-[#59615D] dark:text-[#A0B0BC] max-w-2xl mx-auto leading-relaxed">
          基礎理論から臨床実践までを体系化する東洋医学ポータル。
        </p>
      </div>

      {/* メイン理念 */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-12 shadow-sm space-y-6 sm:space-y-8 transition-colors">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            サイト創設の志
          </h2>
          <p className="text-xs sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            東洋医学は数千年の歴史の中で、膨大な人体観察と臨床の積み重ねから生み出された「生命の智慧」です。しかし現代において、東洋医学は二つの極端な壁にぶつかっていました。
          </p>
          <p className="text-xs sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            一つは、一般の方にとって「難解な漢字や専門用語が多くて、どう自分に役立てればいいかわからない」という壁。もう一つは、「非科学的な迷信と誤解され、本来の奥深い体系性が正当に評価されない」という壁です。
          </p>
          <p className="text-xs sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            「はり太郎の東洋医学」は、この壁を取り払うために誕生しました。これまで長年にわたり臨床現場で培い、書き溜めてきた臨床録、古典文献の考証、そして最新の神経科学・医学論文の知見をすべて統合し、「基礎理論から臨床実践までを体系化し、わかりやすくかつ確かな臨床根拠に根ざした東洋医学の拠点」を築くことが私たちの使命です。
          </p>
        </div>

        {/* 3つの編集方針 */}
        <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            当サイトが貫く3つの基準
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">01. 徹底した可読性</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                難解な陰陽五行や臓腑弁証を、日々の食事や生活習慣、わかりやすい図解と言葉に翻訳します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">02. 臨床と科学の二重奏</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                古典の精神を尊重しながらも、現代の生理学・神経伝達物質・fMRI等のエビデンスを交えて解説します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-1.5 sm:space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-sm sm:text-base">03. 誠実な医療倫理</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                東洋医学の万能視や過信を戒め、現代医学との適切な協調・受診推奨（トリアージ）を明記します。
              </p>
            </div>
          </div>
        </div>

        {/* 医療上の免責事項 */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2 sm:space-y-3 text-xs text-[#59615D] dark:text-[#A0B0BC]">
          <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5] text-xs sm:text-sm">
            <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>医療情報に関する免責事項</span>
          </div>
          <p className="leading-relaxed">
            当サイトに掲載されているツボ、食養生、体質診断などの情報は、日常の健康維持および東洋医学の学術的理解を深めることを目的として提供されています。これらは医師や鍼灸師による個別の診断・治療に代わるものではありません。
          </p>
          <p className="leading-relaxed">
            激しい痛み、意識障害、急激な体調の悪化、妊娠中の重篤な症状などがある場合は、自己判断によるツボ刺激を行わず、速やかに専門の医療機関を受診してください。
          </p>
        </div>

        {/* 執筆・監修者：はり太郎について */}
        <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-[#F2ECE0] dark:border-[#22303D]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              執筆・監修者について
            </h2>
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl sm:rounded-3xl border border-[#E8E1D1] dark:border-[#22303D] p-3.5 sm:p-8 space-y-4 sm:space-y-6">
            {/* プロフィールヘッダー */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-[#E8E1D1] dark:border-[#263542] pb-6">
              <img
                src="/icon.png"
                alt="はり太郎"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm border border-[#D5CCBC] dark:border-[#2A3B4A] shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">
                    はり太郎
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-bold">
                    鍼灸師／鍼灸院院長
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#B86924] dark:text-[#E6C387]">
                  身体ケア・臨床領域10年以上（鍼灸師約9年）｜ 2017年免許取得 ｜ 2023年開院・現役臨床
                </p>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed pt-1">
                  鍼灸師として臨床に携わりながら、東洋医学の理論・診断・治療体系を整理し、haritaro.jpで公開しています。
                  鍼灸専門学校を卒業後、鍼灸接骨院、リラクゼーション、デイサービスなど、身体や健康に関わる複数の現場を経験。現在は鍼灸院を開業し、一人院長として日々患者と向き合いながら臨床を行っています。
                </p>
              </div>
            </div>

            {/* 臨床思考と執筆姿勢 */}
            <div className="space-y-3">
              <h4 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                情報の捉え方：暗記ではなく「臨床の思考体系」として
              </h4>
              <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                東洋医学には、陰陽・五行・気血津液・臓腑・経絡・病機・弁証など、多数の概念があります。しかし、それぞれを個別に暗記するだけでは、実際の診断や治療の中でどのようにつながっているのかが見えにくくなります。
              </p>
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2 sm:space-y-2.5">
                <p className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  haritaro.jpの核：「身体を観察し、病態を推論し、治療方針を組み立てるための思考体系」
                </p>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  臨床では、単に「症状のある場所に鍼をする」「症状とツボを対応させる」という考え方ではなく、
                  <strong className="text-[#232826] dark:text-[#FAF8F5]">【観察 ➜ 仮説 ➜ 治療 ➜ 再評価】</strong>
                  という過程を重視しています。「どこが痛いか」だけでなく、以下を観察し必要に応じて治療方針を修正します。
                </p>
                <ul className="text-xs text-[#404743] dark:text-[#C5D2DB] space-y-1 list-disc list-inside">
                  <li>どのような条件で症状が変化するのか</li>
                  <li>身体のどこに機能的な偏りがあるのか</li>
                  <li>局所症状と全身状態にどのような関係があるのか</li>
                  <li>治療によって何が変化したのか</li>
                  <li>最初に立てた仮説は妥当だったのか</li>
                </ul>
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] pt-1">
                  haritaro.jpで東洋医学を扱う際にも、この臨床的な考え方を基本としています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 人体統一理論への導線 */}
        <div className="bg-[#EBF3EF] dark:bg-[#162822] p-3.5 sm:p-6 rounded-2xl border border-[#C5DED4] dark:border-[#2A5243] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              当サイトの理論的支柱：人体統一理論
            </span>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
              【東西医学の統合と人体統一理論】二つの人体モデルの架橋
            </h4>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl">
              「分析」の現代医学と「統合」の東洋医学。同一の複雑適応系を異なる抽象化レベルで記述した補完モデルとして、17層構造の中で再定義する総括論文を公開しています。
            </p>
          </div>
          <Link
            href="/articles?article=east-west-integrative-unified-theory"
            className="px-5 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#74BA9E] hover:bg-[#162E27] text-white dark:text-[#121920] text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>総括論文を読む</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 導線 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/curriculum"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] text-center"
          >
            東洋医学8大体系を学ぶ
          </Link>
          <Link
            href="/tsubo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#D5CCBC] dark:border-[#2A3B4A] text-[#232826] dark:text-[#E6EFEA] text-xs font-semibold hover:bg-[#FAF8F5] dark:hover:bg-[#1E2B36] text-center"
          >
            経穴データベースを調べる
          </Link>
        </div>
      </div>
    </div>
  );
}
