"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Award, Layers, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-[#F2EDE4] dark:bg-[#131A21] border-t border-[#E3DBCB] dark:border-[#22303D] text-[#59615D] dark:text-[#96A6B2] text-sm mt-auto transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          {/* サイト概要 */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-bold text-[#232826] dark:text-[#E6EFEA] tracking-wide hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                はり太郎の東洋医学
              </span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-[#59615D] dark:text-[#96A6B2]">
              臨床観察に裏打ちされた東洋医学の智慧を体系化。「基礎理論から臨床実践までを体系化する東洋医学ポータル」として、わかりやすさと学術的根拠を追求しています。
            </p>
          </div>

          {/* 臨床実践ツール */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm sm:text-base tracking-wider mb-3.5 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5 flex items-center gap-1.5">
              <span>臨床実践ツール</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  経穴辞典（全361穴・骨度法）
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>臨床弁証シミュレーター</span>
                </Link>
              </li>
              <li>
                <Link href="/practice/haiketsu" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  配穴設計
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  臨床症例演習（全20症例）
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
                  マイノート（臨床ノート・配穴集）
                </Link>
              </li>
              <li>
                <Link href="/tsubo/compare" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors text-xs text-[#737C77] dark:text-[#8899A6]">
                  経穴比較・鑑別 ➜
                </Link>
              </li>
            </ul>
          </div>

          {/* 学ぶ・国試対策 */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm sm:text-base tracking-wider mb-3.5 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5 flex items-center gap-1.5">
              <span>学ぶ・国試対策</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/curriculum" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors font-medium">
                  東洋医学カリキュラム（全81講義）
                </Link>
              </li>
              <li>
                <Link href="/kokushi" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1 font-semibold text-[#B86924] dark:text-[#E6C387]">
                  <Award className="w-3.5 h-3.5" />
                  <span>国家試験対策特設ハブ</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-[#E6C387]/30 font-bold">特設</span>
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  古典条文・医学論文ライブラリ
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  学術コラム・文献解説
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                  <span>気血水体質チェック・五労</span>
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors text-xs text-[#737C77] dark:text-[#8899A6]">
                  症状別セルフケアガイド ➜
                </Link>
              </li>
            </ul>
          </div>

          {/* 案内・免責事項 */}
          <div>
            <h3 className="font-serif font-semibold text-[#232826] dark:text-[#E6EFEA] text-sm sm:text-base tracking-wider mb-3.5 border-b border-[#D8CFC0] dark:border-[#2A3B4A] pb-1.5">
              案内・免責
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-[#737C77] dark:text-[#8899A6]">
                <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <div className="space-y-1 leading-normal">
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    当サイトで提供する情報は東洋医学の学術的理解および臨床思考補助を目的としており、医師法第17条に定める診断・治療等の医療行為ではありません。急変時や特定の疾病については医師等の専門医療機関を受診してください。
                  </p>
                  <p className="text-[10px] text-[#88928D] dark:text-[#6E7D8A]">
                    ※当サイトはAmazonアソシエイト・プログラムの参加者であり、適格販売により収入を得ています。
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 pt-1">
                <div>
                  <Link href="/about" className="text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline inline-flex items-center gap-1 text-xs">
                    <span>サイト理念・はり太郎について</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:underline inline-flex items-center gap-1 text-xs">
                    <span>お問い合わせ</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 最下部コピーライトと各種規約・法定リンク（重複を解消） */}
        <div className="border-t border-[#E3DBCB] dark:border-[#22303D] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737C77] dark:text-[#8899A6]">
          <p className="flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} はり太郎の東洋医学. All rights reserved.</span>
          </p>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <Link href="/terms" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">利用規約</Link>
            <Link href="/tokushoho" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">特定商取引法に基づく表記</Link>
            <Link href="/privacy" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">プライバシーポリシー</Link>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">llms.txt</a>
            <Link href="/contact" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">お問い合わせ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
