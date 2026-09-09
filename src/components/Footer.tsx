import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F2EDE4] dark:bg-[#131A21] border-t border-[#E3DBCB] dark:border-[#22303D] text-[#59615D] dark:text-[#96A6B2] text-sm mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* サイト概要 */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] flex items-center justify-center font-serif font-bold text-lg">
                針
              </div>
              <span className="font-serif text-lg font-bold text-[#232826] dark:text-[#E6EFEA] tracking-wide">
                はり太郎の東洋医学
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
              数千年の臨床観察に裏打ちされた東洋医学の智慧を、最新の現代科学と解剖生理学の視点から体系化。「日本最高峰のわかりやすさと学術的深さ」を追求するポータルサイトです。
            </p>
          </div>

          {/* 一般向けガイド */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm tracking-wider mb-4 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5 flex items-center gap-1.5">
              <span>一般向けセルフケア</span>
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/symptoms" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors flex items-center gap-1">
                  <span>頭痛・首肩こり改善</span>
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors flex items-center gap-1">
                  <span>不眠・ストレス緩和</span>
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors flex items-center gap-1">
                  <span>胃腸虚弱・冷え性対策</span>
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] font-medium text-[#1E3D34] dark:text-[#E6C387] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#B86924] dark:text-[#E6C387]" />
                  <span>気血水 体質セルフ診断</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 専門家・学生向け */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm tracking-wider mb-4 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5">
              専門家・学生向け
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors">
                  十四経脈 経穴（ツボ）データベース
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors">
                  臨床知見・配穴の極意
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors">
                  最新神経科学・論文抄読
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0] transition-colors">
                  古典文献（黄帝内経・傷寒論）考証
                </Link>
              </li>
            </ul>
          </div>

          {/* サイトポリシー・運営情報 */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm tracking-wider mb-4 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5">
              案内・免責
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-[#737C77] dark:text-[#8899A6]">
                <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0] shrink-0 mt-0.5" />
                <p className="leading-normal">
                  当サイトの情報は健康増進と伝統医学の学術的理解を目的としており、医師による診断・治療に代わるものではありません。重篤な症状がある場合は速やかに医療機関を受診してください。
                </p>
              </div>
              <div>
                <Link href="/about" className="text-[#1E3D34] dark:text-[#3CD0A0] font-medium hover:underline inline-flex items-center gap-1">
                  <span>サイト理念・はり太郎について</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E3DBCB] dark:border-[#22303D] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737C77] dark:text-[#8899A6]">
          <p>© {new Date().getFullYear()} はり太郎の東洋医学. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0]">プライバシーポリシー</Link>
            <Link href="/about" className="hover:text-[#1E3D34] dark:hover:text-[#3CD0A0]">お問い合わせ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
