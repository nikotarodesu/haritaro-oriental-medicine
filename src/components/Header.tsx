"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Sparkles, HeartPulse, Stethoscope, Menu, X, Compass } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D1]">
      {/* サイト上部アナウンスバー */}
      <div className="bg-[#1E3D34] text-[#EBF3EF] text-xs py-1.5 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E6C387]" />
        <span>伝統の知恵と現代科学の融合 ── はり太郎の東洋医学 ポータル</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ロゴエリア */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#1E3D34] flex items-center justify-center text-[#FAF8F5] shadow-sm group-hover:bg-[#162E27] transition-colors">
              <span className="font-serif text-2xl font-bold tracking-tighter">針</span>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#232826] group-hover:text-[#1E3D34] transition-colors">
                はり太郎の東洋医学
              </div>
              <p className="text-[11px] text-[#59615D] tracking-widest -mt-0.5">
                日本最高峰の東洋医学ポータル
              </p>
            </div>
          </Link>

          {/* デスクトップ ナビゲーション */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/symptoms"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] hover:text-[#1E3D34] hover:bg-[#EBF3EF] transition-all flex items-center gap-1.5"
            >
              <HeartPulse className="w-4 h-4 text-[#B86924]" />
              <span>お悩み・症状別</span>
            </Link>

            <Link
              href="/tsubo"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] hover:text-[#1E3D34] hover:bg-[#EBF3EF] transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#1E3D34]" />
              <span>経穴・ツボ辞典</span>
            </Link>

            <Link
              href="/diagnosis"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] hover:text-[#1E3D34] hover:bg-[#EBF3EF] transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4 text-[#A83629]" />
              <span>気血水 体質診断</span>
            </Link>

            <Link
              href="/articles"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#404743] hover:text-[#1E3D34] hover:bg-[#EBF3EF] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#1E2D3D]" />
              <span>知見・論文抄読</span>
            </Link>

            <Link
              href="/about"
              className="ml-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#1E3D34] text-[#FAF8F5] hover:bg-[#162E27] shadow-sm transition-all"
            >
              サイト理念
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#404743] hover:bg-[#EBF3EF] transition-colors"
              aria-label="メニューを開く"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルナビゲーション ドロワー */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E1D1] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            href="/symptoms"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] hover:bg-[#EBF3EF]"
          >
            <HeartPulse className="w-5 h-5 text-[#B86924]" />
            <span>お悩み・症状別ガイド</span>
          </Link>
          <Link
            href="/tsubo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] hover:bg-[#EBF3EF]"
          >
            <Compass className="w-5 h-5 text-[#1E3D34]" />
            <span>経穴・ツボ辞典（361穴）</span>
          </Link>
          <Link
            href="/diagnosis"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] hover:bg-[#EBF3EF]"
          >
            <Stethoscope className="w-5 h-5 text-[#A83629]" />
            <span>気血水 体質セルフ診断</span>
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-[#232826] hover:bg-[#EBF3EF]"
          >
            <BookOpen className="w-5 h-5 text-[#1E2D3D]" />
            <span>知見・臨床録・論文抄読</span>
          </Link>
          <div className="pt-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-[#1E3D34] text-[#FAF8F5]"
            >
              はり太郎の理念・サイトについて
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
