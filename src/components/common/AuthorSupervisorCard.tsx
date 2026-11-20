import React from "react";
import { AUTHOR_OPENED_AT } from "@/config/author";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  className?: string;
  topic?: string;
  pointLocationChecked?: boolean;
  revisedAt?: string;
}

export default function AuthorSupervisorCard({ className = "", topic, pointLocationChecked, revisedAt }: Props) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-panel border border-frame space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-divider pb-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-panel-selected text-accent flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-frame">
            はり
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif font-bold text-base text-ink">
                はり太郎
              </span>
              <span className="text-sm text-muted">
                はり師・きゅう師（国家資格）
              </span>
            </div>
            <p className="text-sm text-muted mt-0.5">
              鍼灸院院長 ／ 東洋医学臨床・教育研究家
            </p>
            <p className="text-sm text-muted mt-0.5">2017年免許取得・{AUTHOR_OPENED_AT}開業</p>
            {revisedAt && <p className="text-sm text-muted mt-0.5">講義更新 <time dateTime={revisedAt}>{revisedAt}</time></p>}
          </div>
        </div>

        <Link
          href="/about"
          className="min-h-11 text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1"
        >
          <span>執筆者の経歴と編集方針</span>
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>

      <div className="space-y-2 text-sm text-muted leading-relaxed">
        <p>{pointLocationChecked ? "ツボの標準位置をWHO原本と照合しました。専門家による監修は進行中です。" : "原典との照合や専門家の監修は、教材ごとに進めています。"}<Link href="/editorial-policy" className="underline">出典の確認方針と監修状況を見る</Link></p>
        <p>
          {topic ? "「" + topic + "」の学習用解説です。" : "東洋医学の学習・臨床推論を支援する解説です。"}
          古典の記述、研究の結果、用語を説明するためのたとえは区別して掲載しています。研究を読むときは、誰を対象に何と比べたかを文献で確認してください。この教材だけで診断や施術の安全性を判断せず、体調については医療機関に相談してください。
        </p>
      </div>
    </div>
  );
}
