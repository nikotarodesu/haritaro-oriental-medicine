"use client";

import React from "react";
import { GraduationCap, BookOpen, ExternalLink, CheckCircle2, Sparkles, Clock, Truck } from "lucide-react";
import { PRIME_STUDENT_URL } from "@/utils/amazonAssociate";

interface PrimeStudentCardProps {
  variant?: "card" | "banner";
  className?: string;
}

export default function PrimeStudentCard({
  variant = "card",
  className = "",
}: PrimeStudentCardProps) {
  if (variant === "banner") {
    return (
      <aside
        aria-label="学生向けAmazon Prime Student案内"
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F4EEE2] dark:from-[#17212A] dark:via-[#131A21] dark:to-[#18232F] p-5 sm:p-8 shadow-xs hover:shadow-md transition-all ${className}`}
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#B86924]/10 dark:bg-[#E6C387]/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#1E3D34]/10 dark:bg-[#74BA9E]/10 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#B86924] text-white text-[10px] font-bold tracking-wider">
                PR
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4EB] dark:bg-[#2A1D12] border border-[#F3DEC5] dark:border-[#4D331F] text-[#B86924] dark:text-[#E6C387] text-xs font-bold tracking-wide">
                <GraduationCap className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>鍼灸・東洋医学を学ぶ学生限定支援</span>
              </div>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-snug">
              専門書・教科書を揃えるなら
              <span className="text-[#B86924] dark:text-[#E6C387] ml-1">Prime Student</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed">
              『東洋医学概論』や解剖学など高額な専門書・国試過去問も、本3冊同時購入で<strong className="text-[#B86924] dark:text-[#E6C387] font-semibold">最大10%ポイント還元</strong>。通常30日の無料体験が学生ならなんと<strong className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold">【6ヶ月間無料】</strong>で試せます。
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>6ヶ月無料体験</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>書籍最大10%還元</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>月額300円(半額)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>お急ぎ便無料</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2">
            <a
              href={PRIME_STUDENT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B86924] to-[#9C5417] hover:from-[#A25A1C] hover:to-[#884711] text-[#FAF8F5] font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>Prime Student を6ヶ月無料で試す</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-[#737C77] dark:text-[#8899A6] text-center lg:text-right">
              ※いつでも解約可能・無料期間終了後も月額300円
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EAE3D3] dark:border-[#22303D] text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6] flex flex-wrap items-center justify-between gap-2">
          <span>※対象：大学・大学院・短期大学・専門学校・高等専門学校の学生（学生証・学籍番号等が必要です）</span>
          <span>※当サイトはAmazonアソシエイト・プログラムの参加者です（PR / 広告）</span>
        </div>
      </aside>
    );
  }

  // デフォルト: card バリアント（記事末尾・ライブラリ・サイドバー等に最適）
  return (
    <aside
      aria-label="学生向けAmazon Prime Student案内"
      className={`relative overflow-hidden rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#161F28] p-4 sm:p-6 shadow-2xs transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE3D3] dark:border-[#22303D] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 border border-[#F3DEC5] dark:border-[#4D331F]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#B86924] text-white tracking-wider">
                PR
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] border border-[#C5DED4] dark:border-[#2A5243]">
                学生限定支援
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                教科書・専門書を揃える鍼灸・医学生へ
              </h4>
            </div>
            <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] mt-0.5">
              Amazon Prime Student（6ヶ月無料体験 ＆ 書籍まとめ買い最大10%ポイント還元）
            </p>
          </div>
        </div>

        <a
          href={PRIME_STUDENT_URL}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#B86924] hover:bg-[#9C5417] dark:bg-[#C8752D] dark:hover:bg-[#B86924] text-[#FAF8F5] text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all shrink-0"
        >
          <span>6ヶ月無料で試す</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="pt-3.5 space-y-2.5">
        <p className="text-xs sm:text-sm text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed">
          『東洋医学概論』や『経絡経穴概論』、国家試験過去問集など高額になりがちな専門書も、本3冊同時購入で<strong className="text-[#B86924] dark:text-[#E6C387] font-semibold">最大10%還元</strong>。通常30日の無料体験が学生なら<strong className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold">6ヶ月間無料</strong>で利用できます。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
            <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
            <span>6ヶ月間無料体験</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
            <BookOpen className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387] shrink-0" />
            <span>本3冊で最大10%還元</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
            <span>通常プライムの半額</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#333835] dark:text-[#C5D2DB]">
            <Truck className="w-3.5 h-3.5 text-[#59615D] dark:text-[#A0B0BC] shrink-0" />
            <span>お急ぎ便・日時指定無料</span>
          </div>
        </div>

        <div className="pt-2 text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6] flex flex-wrap items-center justify-between gap-1 border-t border-[#EAE3D3]/60 dark:border-[#22303D]">
          <span>※大学・短大・専門学校生対象。無料期間中いつでも解約可能（終了後月額300円）</span>
          <span>※当サイトはAmazonアソシエイト・プログラムの参加者です（PR / 広告）</span>
        </div>
      </div>
    </aside>
  );
}
