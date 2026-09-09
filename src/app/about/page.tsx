import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* ページ見出し */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#65D4B2] text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
          <span>サイトの志と運営方針</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          「はり太郎の東洋医学」について
        </h1>
        <p className="text-base sm:text-lg text-[#59615D] dark:text-[#A0B0BC] max-w-2xl mx-auto leading-relaxed">
          日本最高峰の東洋医学ポータルを目指して ── 伝統の知恵と現代科学の融合。
        </p>
      </div>

      {/* メイン理念 */}
      <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 sm:p-12 shadow-sm space-y-8 transition-colors">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#1E3D34] dark:text-[#3CD0A0] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            サイト創設の志
          </h2>
          <p className="text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            東洋医学は数千年の歴史の中で、膨大な人体観察と臨床の積み重ねから生み出された「生命の智慧」です。しかし現代において、東洋医学は二つの極端な壁にぶつかっていました。
          </p>
          <p className="text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            一つは、一般の方にとって**「難解な漢字や専門用語が多くて、どう自分に役立てればいいかわからない」**という壁。もう一つは、**「非科学的な迷信と誤解され、本来の奥深い体系性が正当に評価されない」**という壁です。
          </p>
          <p className="text-sm sm:text-base text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
            「はり太郎の東洋医学」は、この壁を取り払うために誕生しました。これまで長年にわたり臨床現場で培い、書き溜めてきた臨床録、古典文献の考証、そして最新の神経科学・医学論文の知見をすべて統合し、**「日本で最もわかりやすく、かつ最も信頼できる東洋医学の拠点」**を築くことが私たちの使命です。
          </p>
        </div>

        {/* 3つの編集方針 */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            当サイトが貫く3つの基準
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#3CD0A0] block text-base">01. 徹底した可読性</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                難解な陰陽五行や臓腑弁証を、日々の食事や生活習慣、わかりやすい図解と言葉に翻訳します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#3CD0A0] block text-base">02. 臨床と科学の二重奏</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                古典の精神を尊重しながらも、現代の生理学・神経伝達物質・fMRI等のエビデンスを交えて解説します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] dark:bg-[#121920] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-[#1E3D34] dark:text-[#3CD0A0] block text-base">03. 誠実な医療倫理</span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                東洋医学の万能視や過信を戒め、現代医学との適切な協調・受診推奨（トリアージ）を明記します。
              </p>
            </div>
          </div>
        </div>

        {/* 医療上の免責事項 */}
        <div className="bg-[#FAF8F5] dark:bg-[#121920] p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] space-y-3 text-xs text-[#59615D] dark:text-[#A0B0BC]">
          <div className="flex items-center gap-2 font-bold text-[#232826] dark:text-[#FAF8F5] text-sm">
            <ShieldCheck className="w-5 h-5 text-[#1E3D34] dark:text-[#3CD0A0]" />
            <span>医療情報に関する免責事項</span>
          </div>
          <p className="leading-relaxed">
            当サイトに掲載されているツボ、食養生、体質診断などの情報は、日常の健康維持および東洋医学の学術的理解を深めることを目的として提供されています。これらは医師や鍼灸師による個別の診断・治療に代わるものではありません。
          </p>
          <p className="leading-relaxed">
            激しい痛み、意識障害、急激な体調の悪化、妊娠中の重篤な症状などがある場合は、自己判断によるツボ刺激を行わず、速やかに専門の医療機関を受診してください。
          </p>
        </div>

        {/* 導線 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/symptoms"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] text-center"
          >
            症状別セルフケアを見る
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
