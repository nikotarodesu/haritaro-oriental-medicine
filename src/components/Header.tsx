"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Sparkles, HeartPulse, Stethoscope, Menu, X, Compass } from "lucide-react";
import YinYangSwitch from "./YinYangSwitch";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#10161C]/95 backdrop-blur-md border-b border-[#E8E1D1] dark:border-[#22303D] transition-colors duration-300">
      {/* サイト上部アナウンスバー */}
      <div className="bg-[#1E3D34] dark:bg-[#162A24] text-[#EBF3EF] text-xs py-1.5 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E6C387]" />
        <span>伝統の知恵と現代科学の融合 ── はり太郎の東洋医学 ポータル</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴエリア */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#1E3D34] dark:bg-[#2B6958] flex items-center justify-center text-[#FAF8F5] shadow-sm group-hover:bg-[#162E27] transition-colors">
              <span className="font-serif text-2xl font-bold tracking-tighter">針</span>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#232826] dark:text-[#E6EFEA] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors">
                はり太郎の東洋医学
              </div>
              <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] tracking-widest -mt-0.5">
                日本最高峰の東洋医学ポータル
              </p>
            </div>
          </Link>

          {/* デスクトップ ナビゲーション */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/symptoms"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-all flex items-center gap-1.5"
            >
              <HeartPulse className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>お悩み・症状別</span>
            </Link>

            <Link
              href="/tsubo"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
              <span>経穴・ツボ辞典</span>
            </Link>

            <Link
              href="/diagnosis"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4 text-[#A83629] dark:text-[#E06A5D]" />
              <span>気血水 体質診断</span>
            </Link>

            <Link
              href="/articles"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#FAF8F5] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D] dark:text-[#6FA0D6]" />
              <span>知見・論文抄読</span>
            </Link>

            {/* 陰陽太極図 テーマ切り替えスイッチ */}
            <div className="ml-1 mr-1">
              <YinYangSwitch />
            </div>

            <Link
              href="/about"
              className="ml-1 px-4 py-2 rounded-full text-xs font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] shadow-sm transition-all"
            >
              サイト理念
            </Link>
          </nav>

          {/* モバイルヘッダー右側（陰陽スイッチ & メニューボタン） */}
          <div className="flex items-center gap-2 md:hidden">
            <YinYangSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#404743] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936] transition-colors"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#131A21] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            href="/symptoms"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
          >
            <HeartPulse className="w-5 h-5 text-[#B86924] dark:text-[#E6C387]" />
            <span>お悩み・症状別ガイド</span>
          </Link>
          <Link
            href="/tsubo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
          >
            <Compass className="w-5 h-5 text-[#1E3D34] dark:text-[#3CD0A0]" />
            <span>経穴・ツボ辞典（361穴）</span>
          </Link>
          <Link
            href="/diagnosis"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
          >
            <Stethoscope className="w-5 h-5 text-[#A83629] dark:text-[#E06A5D]" />
            <span>気血水 体質セルフ診断</span>
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1B2936]"
          >
            <BookOpen className="w-5 h-5 text-[#1E2D3D] dark:text-[#6FA0D6]" />
            <span>知見・臨床録・論文抄読</span>
          </Link>
          <div className="pt-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]"
            >
              はり太郎の理念・サイトについて
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
