"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Sparkles, Crown, X, Award, Layers } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { user, setDemoRole } = useAuth();
  const clickTimestampsRef = useRef<number[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "admin_on" | "admin_off" } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSecretClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const recentClicks = [...clickTimestampsRef.current, now].filter((t) => now - t <= 5000);
    clickTimestampsRef.current = recentClicks;

    if (recentClicks.length >= 10) {
      clickTimestampsRef.current = [];
      if (user?.role === "admin") {
        setDemoRole("free");
        setToast({
          message: "管理者モードを解除しました（通常・無料会員モードへ移行）",
          type: "admin_off",
        });
      } else {
        setDemoRole("admin");
        setToast({
          message: "管理者モードに切り替えました。プレミアム限定機能・全症例・シミュレーターを解放しました！",
          type: "admin_on",
        });
      }
    }
  }, [user?.role, setDemoRole]);

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
                  配穴設計オプティマイザー
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
                  臨床症例演習（全20症例）
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
                  マイカルテ（配穴・養生シート）
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
                  <p className="text-[11px] sm:text-xs">
                    当サイトの情報は健康増進と伝統医学の学術的理解を目的としており、医師による診断・治療に代わるものではありません。
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
            <button
              type="button"
              onClick={handleSecretClick}
              className="cursor-pointer select-none inline-flex items-center justify-center p-1 -m-1 font-inherit text-inherit hover:text-[#1E3D34] dark:hover:text-[#74BA9E] active:scale-90 transition-transform focus:outline-hidden"
              title="©"
              aria-label="管理者モード切り替え"
            >
              ©
            </button>
            <span>{new Date().getFullYear()} はり太郎の東洋医学. All rights reserved.</span>
            {user?.role === "admin" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1E3D34] dark:bg-[#2B6958] text-[#E6C387] animate-fadeIn">
                <Crown className="w-3 h-3 text-[#E6C387]" />
                <span>管理者モード稼働中</span>
              </span>
            )}
          </p>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <Link href="/terms" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">利用規約</Link>
            <Link href="/tokushoho" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">特定商取引法に基づく表記</Link>
            <Link href="/privacy" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">プライバシーポリシー</Link>
            <Link href="/contact" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">お問い合わせ</Link>
          </div>
        </div>
      </div>

      {/* 管理者モード切り替え通知トースト */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[9999] max-w-sm flex items-start gap-3 p-4 rounded-2xl bg-[#1E3D34] dark:bg-[#1A2530] text-white shadow-2xl border border-[#C5DED4]/40 animate-fadeIn"
        >
          <div className="w-8 h-8 rounded-xl bg-[#E6C387] text-[#1E3D34] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            {toast.type === "admin_on" ? (
              <Crown className="w-5 h-5 fill-current" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <p className="font-bold text-sm text-[#FAF8F5]">
              {toast.type === "admin_on" ? "管理者モード有効化" : "管理者モード解除"}
            </p>
            <p className="text-[#D3DFD9] mt-1 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="通知を閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
    </footer>
  );
}
