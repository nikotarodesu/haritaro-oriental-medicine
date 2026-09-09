import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, BookOpen, Compass, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* ページ見出し */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] border border-[#C5DED4] text-[#1E3D34] text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#B86924]" />
          <span>サイトの志と運営方針</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#232826] tracking-tight">
          「はり太郎の東洋医学」について
        </h1>
        <p className="text-base sm:text-lg text-[#59615D] max-w-2xl mx-auto leading-relaxed">
          日本最高峰の東洋医学ポータルを目指して ── 伝統の知恵と現代科学の融合。
        </p>
      </div>

      {/* メイン理念 */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DEC9] p-8 sm:p-12 shadow-sm space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#1E3D34] border-b border-[#F2ECE0] pb-3">
            サイト創設の志
          </h2>
          <p className="text-sm sm:text-base text-[#333835] leading-relaxed">
            東洋医学は数千年の歴史の中で、膨大な人体観察と臨床の積み重ねから生み出された「生命の智慧」です。しかし現代において、東洋医学は二つの極端な壁にぶつかっていました。
          </p>
          <p className="text-sm sm:text-base text-[#333835] leading-relaxed">
            一つは、一般の方にとって**「難解な漢字や専門用語が多くて、どう自分に役立てればいいかわからない」**という壁。もう一つは、**「非科学的な迷信と誤解され、本来の奥深い体系性が正当に評価されない」**という壁です。
          </p>
          <p className="text-sm sm:text-base text-[#333835] leading-relaxed">
            「はり太郎の東洋医学」は、この壁を取り払うために誕生しました。これまで長年にわたり臨床現場で培い、書き溜めてきた臨床録、古典文献の考証、そして最新の神経科学・医学論文の知見をすべて統合し、**「日本で最もわかりやすく、かつ最も信頼できる東洋医学の拠点」**を築くことが私たちの使命です。
          </p>
        </div>

        {/* 3つの編集方針 */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-serif font-bold text-[#232826]">
            当サイトが貫く3つの基準
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D1] space-y-2">
              <span className="font-bold text-[#1E3D34] block text-base">01. 徹底した可読性</span>
              <p className="text-[#59615D] leading-relaxed">
                難解な陰陽五行や臓腑弁証を、日々の食事や生活習慣、わかりやすい図解と言葉に翻訳します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D1] space-y-2">
              <span className="font-bold text-[#1E3D34] block text-base">02. 臨床と科学の二重奏</span>
              <p className="text-[#59615D] leading-relaxed">
                古典の精神を尊重しながらも、現代の生理学・神経伝達物質・fMRI等のエビデンスを交えて解説します。
              </p>
            </div>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E1D1] space-y-2">
              <span className="font-bold text-[#1E3D34] block text-base">03. 誠実な医療倫理</span>
              <p className="text-[#59615D] leading-relaxed">
                東洋医学の万能視や過信を戒め、現代医学との適切な協調・受診推奨（トリアージ）を明記します。
              </p>
            </div>
          </div>
        </div>

        {/* 医療上の免責事項 */}
        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E1D1] space-y-3 text-xs text-[#59615D]">
          <div className="flex items-center gap-2 font-bold text-[#232826] text-sm">
            <ShieldCheck className="w-5 h-5 text-[#1E3D34]" />
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
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E3D34] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] text-center"
          >
            症状別セルフケアを見る
          </Link>
          <Link
            href="/tsubo"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFFFFF] border border-[#D5CCBC] text-[#232826] text-xs font-semibold hover:bg-[#FAF8F5] text-center"
          >
            経穴データベースを調べる
          </Link>
        </div>
      </div>
    </div>
  );
}
