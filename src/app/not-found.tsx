import Link from "next/link";
import { 
  Compass, 
  BookOpen, 
  Stethoscope, 
  Layers, 
  Award, 
  Home, 
  ArrowRight,
  AlertCircle 
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fadeIn">
        {/* 404 バッジ */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#1A2530] border border-[#E5DEC9] dark:border-[#2D3E50] text-[#B86924] dark:text-[#E6C387] text-xs font-semibold shadow-2xs">
          <AlertCircle className="w-4 h-4" />
          <span>404 Page Not Found</span>
        </div>

        {/* メイン見出し */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            お探しのページが<br className="sm:hidden" />見つかりませんでした
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] max-w-md mx-auto leading-relaxed">
            指定されたURLは変更されたか、現在利用できない可能性があります。以下の主要ツールからお探しいただくか、ホームへお戻りください。
          </p>
        </div>

        {/* ホームに戻る主ボタン */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>はり太郎 ホームへ戻る</span>
          </Link>
        </div>

        {/* 主要機能への直通リンクカード群 */}
        <div className="pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-4">
          <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider block">
            よく使われる人気コンテンツ
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link
              href="/tsubo"
              className="p-3.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                    経穴辞典（全361穴）
                  </span>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                    標準取穴・解剖図・主治適応症
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/curriculum"
              className="p-3.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                    学習カリキュラム（全81講義）
                  </span>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                    陰陽五行・気血水・臓腑弁証
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/diagnosis"
              className="p-3.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] hover:border-[#B86924] dark:hover:border-[#E6C387] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block group-hover:text-[#B86924] dark:group-hover:text-[#E6C387]">
                    気血水 体質セルフ診断
                  </span>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                    12問で偏りチェック・養生法
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/simulator"
              className="p-3.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] bg-white dark:bg-[#17212A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-xs font-bold text-[#232826] dark:text-[#FAF8F5] block group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                    弁証推論シミュレーター
                  </span>
                  <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                    八綱・気血水・臓腑の連動配穴
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737C77] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
