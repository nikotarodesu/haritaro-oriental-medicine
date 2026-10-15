"use client";

import { ExternalLink } from "lucide-react";
import { PRIME_STUDENT_URL } from "@/utils/amazonAssociate";

interface PrimeStudentCardProps {
  variant?: "card" | "banner";
  className?: string;
}

export default function PrimeStudentCard({
  variant = "card",
  className = "",
}: PrimeStudentCardProps) {
  const Heading = variant === "banner" ? "h3" : "h4";

  return (
    <aside
      aria-label="広告：学生向けAmazon Prime Student案内"
      className={`rounded-2xl border border-[#E5DEC9] bg-[#FAF8F5] p-4 dark:border-[#2A3B4A] dark:bg-[#161F28] sm:p-5 ${className}`}
    >
      <div className={`flex flex-col gap-3 ${variant === "banner" ? "sm:flex-row sm:items-center sm:justify-between" : ""}`}>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC]">PR / 広告</span>
            <Heading className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">Amazon Prime Student</Heading>
          </div>
          <p className="text-sm leading-relaxed text-[#4A534F] dark:text-[#A8B8C4]">教科書・専門書を揃える学生向けサービスのご案内です。</p>
        </div>
        <a
          href={PRIME_STUDENT_URL}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="ui-text-link shrink-0 self-start text-sm sm:self-auto"
        >
          <span>Amazonで詳細・利用条件を確認</span>
          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
        </a>
      </div>
      <div className="mt-3 space-y-1 border-t border-[#EAE3D3] pt-3 text-sm leading-relaxed text-[#59615D] dark:border-[#22303D] dark:text-[#A0B0BC]">
        <p>大学・大学院・短期大学・専門学校・高等専門学校などの学生向けです。対象となる学校・年齢・学生資格の確認方法は、Amazonの案内をご確認ください。</p>
        <p>会費・無料体験・特典の適用条件、体験終了後の請求・解約条件は、申込前にリンク先でご確認ください。</p>
        <p>Amazonアソシエイトとして、適格販売により収入を得ています。</p>
      </div>
    </aside>
  );
}
