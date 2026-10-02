import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";

interface Props {
  className?: string;
  topic?: string;
}

export default function AuthorSupervisorCard({ className = "", topic }: Props) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center font-serif text-lg font-bold shrink-0 border-2 border-[#C5DED4] dark:border-[#2A5243]">
            はり
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                はり太郎
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                国家資格保有・鍼灸師
              </span>
            </div>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6] mt-0.5">
              鍼灸院院長 ／ 東洋医学臨床・教育研究家
            </p>
          </div>
        </div>

        <Link
          href="/about"
          className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1 group"
        >
          <span>執筆方針・経歴詳細</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="space-y-2 text-xs text-[#59615D] dark:text-[#C5D2DB] leading-relaxed">
        <p>
          {topic ? "「" + topic + "」の学習用解説です。" : "東洋医学の学習・臨床推論を支援する解説です。"}
          古典に基づく伝統理論、研究で得られた知見、理解を助ける比喩は根拠の種類が異なります。参考文献と研究の対象・限界を確認してください。教材の記述だけで個人の診断や施術の安全性を判断せず、必要に応じて医療機関へ相談してください。
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
          <span className="inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            はり師・きゅう師 国家資格
          </span>
          <span className="inline-flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            臨床歴10年以上・日々の問診と配穴を実践
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E2D3D] dark:text-[#7BAAD8]" />
            出典と適用範囲を確認しながら学ぶ
          </span>
        </div>
      </div>
    </div>
  );
}
