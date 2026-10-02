import React, { Suspense } from "react";
import Link from "next/link";
import { MERIDIANS, ALL_ACUPOINTS } from "@/data/tsubo";
import { Compass, BookOpen, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import TsuboInteractiveClient from "@/components/tsubo/TsuboInteractiveClient";

// 主要な代表経穴（初期HTMLでクローラーおよびJS無効環境にも確実に渡すリンク）
const FLAGSHIP_ACUPOINTS = [
  { code: "LI4", name: "合谷", meridian: "手の陽明大腸経", part: "手・腕" },
  { code: "ST36", name: "足三里", meridian: "足の陽明胃経", part: "下肢" },
  { code: "LR3", name: "太衝", meridian: "足の厥陰肝経", part: "足" },
  { code: "PC6", name: "内関", meridian: "手の厥陰心包経", part: "前腕" },
  { code: "SP6", name: "三陰交", meridian: "足の太陰脾経", part: "下肢" },
  { code: "GV20", name: "百会", meridian: "督脈", part: "頭頂部" },
  { code: "LU7", name: "列欠", meridian: "手の太陰肺経", part: "前腕" },
  { code: "KI1", name: "湧泉", meridian: "足の少陰腎経", part: "足底" },
  { code: "BL23", name: "腎兪", meridian: "足の太陽膀胱経", part: "腰部" },
  { code: "CV12", name: "中脘", meridian: "任脈", part: "上腹部" },
  { code: "GB20", name: "風池", meridian: "足の少陽胆経", part: "後頭部" },
  { code: "HT7", name: "神門", meridian: "手の少陰心経", part: "手首" },
];

export default function TsuboPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* 1. ページヘッダー（初期HTMLに出力される主コンテンツ・H1） */}
      <header className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold border border-[#C5DED4] dark:border-[#2A5243]">
          <Compass className="w-3.5 h-3.5" />
          <span>WHO標準361穴 データベース</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          経穴辞典
        </h1>
        <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          経穴の名前・読み方・経脈・部位から調べられる辞典。各経穴の場所や取穴の説明を図と文章で確認できます。
        </p>
      </header>

      {/* 2. 十四経脈テキスト索引 ＆ 主要経穴クイックアクセス（初期HTMLに含まれる静的リンク） */}
      <nav aria-label="経脈別テキスト索引" className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h2 className="font-serif text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              十四経脈テキスト索引
            </h2>
          </div>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">全14経脈・361穴</span>
        </div>

        {/* 14経脈リンク一覧 */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {MERIDIANS.map((meridian) => (
            <Link
              key={meridian.id}
              href={`/tsubo?meridian=${encodeURIComponent(meridian.shortName)}`}
              className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-xs text-[#333835] dark:text-[#C5D2DB] transition-colors"
            >
              {meridian.name}（{meridian.shortName}）
            </Link>
          ))}
        </div>

        {/* 主要代表経穴リンク */}
        <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2">
          <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block">
            よく調べられる主要経穴：
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {FLAGSHIP_ACUPOINTS.map((pt) => (
              <Link
                key={pt.code}
                href={`/tsubo/${pt.code.toLowerCase()}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#10171F] border border-[#E8E1D1] dark:border-[#2D3E50] text-[#1E3D34] dark:text-[#74BA9E] font-medium hover:bg-[#EBF3EF] transition-colors"
              >
                <span className="font-bold">{pt.name}</span>
                <span className="font-mono text-[10px] text-[#737C77]">({pt.code})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 全361経穴 完全インデックス（初期HTML出力保証・SEOクローラー網羅） */}
        <details className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] group">
          <summary className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline cursor-pointer flex items-center justify-between py-1 select-none">
            <span>十四経脈・全361経穴 完全一覧を開く（クリックで展開）</span>
            <span className="text-[11px] font-normal text-[#737C77] group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="pt-4 space-y-5">
            {MERIDIANS.map((m) => {
              const meridianPoints = ALL_ACUPOINTS.filter((p) => p.meridianId === m.id);
              return (
                <div key={m.id} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#232826] dark:text-[#FAF8F5]">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                      （{meridianPoints.length}穴）
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {meridianPoints.map((pt) => (
                      <Link
                        key={pt.code}
                        href={`/tsubo/${pt.code.toLowerCase()}`}
                        className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#10171F] border border-[#EAE3D2] dark:border-[#263748] text-[#404743] dark:text-[#C5D2DB] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] hover:border-[#1E3D34] transition-colors"
                        title={`${pt.name} (${pt.code}) - ${pt.indications.slice(0, 2).join('・')}`}
                      >
                        <span className="font-medium">{pt.name}</span>
                        <span className="font-mono text-[9px] text-[#8A9590] ml-0.5">{pt.code}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      </nav>

      {/* 3. インタラクティブ操作（人体図・検索・絞り込み・カード一覧） */}
      <Suspense
        fallback={
          <div className="min-h-[400px] py-16 text-center space-y-3">
            <div className="inline-block w-6 h-6 border-2 border-[#1E3D34] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#737C77]">経穴検索ツールを準備中...</p>
          </div>
        }
      >
        <TsuboInteractiveClient />
      </Suspense>

      {/* 4. 掲載範囲・資料基準・更新方針 */}
      <footer className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] p-4 sm:p-6 space-y-2.5 text-xs text-[#59615D] dark:text-[#A0B0BC]">
        <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
          <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
          <span>掲載範囲・資料基準と更新方針</span>
        </div>
        <p className="leading-relaxed">
          当辞典は、世界保健機関（WHO）標準経穴部位（2008年制定）および新版東洋医学概論・経絡経穴概論を基礎資料として制作しています。正経十二経脈および任脈・督脈の全361穴の基本情報を収録し、主要32穴については精密断面解剖図や取穴手順を順次検証・更新しています。
        </p>
        <p className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
          ※本辞典は学習および臨床推論の補助を目的としており、個別診断や医療行為を代替するものではありません。
        </p>
      </footer>
    </div>
  );
}
