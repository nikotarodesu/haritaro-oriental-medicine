import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  className?: string;
  topic?: string;
}

export default function AuthorSupervisorCard({ className = "", topic }: Props) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-[#C5DED4] dark:border-[#2A5243]">
            はり
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                はり太郎
              </span>
              <span className="text-sm text-[#59615D] dark:text-[#AFBDC8]">
                はり師・きゅう師（国家資格）
              </span>
            </div>
            <p className="text-sm text-[#59615D] dark:text-[#AFBDC8] mt-0.5">
              鍼灸院院長 ／ 東洋医学臨床・教育研究家
            </p>
            <p className="text-sm text-[#59615D] dark:text-[#AFBDC8] mt-0.5">2017年免許取得・2023年開院</p>
          </div>
        </div>

        <Link
          href="/about"
          className="min-h-11 text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1"
        >
          <span>執筆方針・経歴詳細</span>
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>

      <div className="space-y-2 text-sm text-[#59615D] dark:text-[#C5D2DB] leading-relaxed">
        <p>全件の原典照合・専門家監修は進行中です。<Link href="/editorial-policy" className="underline">出典の確認方針と監修状況</Link>をご確認ください。</p>
        <p>
          {topic ? "「" + topic + "」の学習用解説です。" : "東洋医学の学習・臨床推論を支援する解説です。"}
          古典に基づく伝統理論、研究で得られた知見、理解を助ける比喩は根拠の種類が異なります。参考文献と研究の対象・限界を確認してください。教材の記述だけで個人の診断や施術の安全性を判断せず、必要に応じて医療機関へ相談してください。
        </p>
      </div>
    </div>
  );
}
