'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

interface SystemStep {
  number: string;
  numInt: number;
  title: string;
  phase: string;
  keyword: string;
  lectureId: string;
  tagColor: string;
}

const SYSTEMS: SystemStep[] = [
  {
    number: "01",
    numInt: 1,
    title: "第1章 陰陽論",
    phase: "基礎理論",
    keyword: "変化と循環の力学モデル",
    lectureId: "lecture-yinyang-1",
    tagColor: "bg-[#1E3D34]/10 text-[#1E3D34] dark:bg-[#74BA9E]/15 dark:text-[#74BA9E] border-[#1E3D34]/20 dark:border-[#74BA9E]/30",
  },
  {
    number: "02",
    numInt: 2,
    title: "第2章 五行論",
    phase: "基礎理論",
    keyword: "多臓器連動と生剋乗侮",
    lectureId: "lecture-wuxing-1",
    tagColor: "bg-[#2D5A46]/10 text-[#2D5A46] dark:bg-[#83BEA8]/15 dark:text-[#83BEA8] border-[#2D5A46]/20 dark:border-[#83BEA8]/30",
  },
  {
    number: "03",
    numInt: 3,
    title: "第3章 気血水理論",
    phase: "基礎理論",
    keyword: "三層実体と代謝循環",
    lectureId: "lecture-qiblood-1",
    tagColor: "bg-[#B86924]/10 text-[#B86924] dark:bg-[#E6C387]/15 dark:text-[#E6C387] border-[#B86924]/20 dark:border-[#E6C387]/30",
  },
  {
    number: "04",
    numInt: 4,
    title: "第4章 生命機能論",
    phase: "基礎理論",
    keyword: "臓腑機能層とネットワーク",
    lectureId: "lecture-lifedynamics-1",
    tagColor: "bg-[#1E2D3D]/10 text-[#1E2D3D] dark:bg-[#7BAAD8]/15 dark:text-[#7BAAD8] border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30",
  },
  {
    number: "05",
    numInt: 5,
    title: "第5章 病機論",
    phase: "病機",
    keyword: "邪正盛衰と病理連鎖",
    lectureId: "lecture-pathomechanism-1",
    tagColor: "bg-[#A83629]/10 text-[#A83629] dark:bg-[#F08C80]/15 dark:text-[#F08C80] border-[#A83629]/20 dark:border-[#F08C80]/30",
  },
  {
    number: "06",
    numInt: 6,
    title: "第6章 臨床診断論",
    phase: "診断",
    keyword: "四診客観化と弁証導出",
    lectureId: "lecture-diagnosis-1",
    tagColor: "bg-[#4A3B69]/10 text-[#4A3B69] dark:bg-[#BCA8E6]/15 dark:text-[#BCA8E6] border-[#4A3B69]/20 dark:border-[#BCA8E6]/30",
  },
  {
    number: "07",
    numInt: 7,
    title: "第7章 治法論",
    phase: "治法",
    keyword: "本標・補瀉と配穴設計",
    lectureId: "lecture-treatment-1",
    tagColor: "bg-[#285A52]/10 text-[#285A52] dark:bg-[#6EC5B8]/15 dark:text-[#6EC5B8] border-[#285A52]/20 dark:border-[#6EC5B8]/30",
  },
  {
    number: "08",
    numInt: 8,
    title: "第8章 臨床実践論",
    phase: "実践",
    keyword: "臨床意思決定と動的評価",
    lectureId: "lecture-practice-1",
    tagColor: "bg-[#1E2D3D]/10 text-[#1E2D3D] dark:bg-[#88A9C3]/15 dark:text-[#88A9C3] border-[#1E2D3D]/20 dark:border-[#88A9C3]/30",
  }
];

export default function EightSystemsRoadmap() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-2xs space-y-4">
        {/* セクションヘッダー（3.5項 見出し文言） */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE7D8] dark:border-[#22303D] pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1E3D34]/10 dark:bg-[#74BA9E]/15 text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/20 dark:border-[#74BA9E]/30">
                <BookOpen className="w-3.5 h-3.5" />
                体系カリキュラム
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                東洋医学を、基礎から順番に。
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC]">
              基礎理論から病態、診断、治法、臨床実践へ。一貫した思考プロセスを順に学びます。
            </p>
          </div>

          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline shrink-0 group self-start sm:self-auto"
          >
            <span>カリキュラムで全章を見る</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 8章の全体像一覧（PC: 4列×2段 / スマホ: 2列×4段、横スワイプ不要） */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {SYSTEMS.map((sys) => (
            <Link
              key={sys.number}
              href={`/curriculum?lecture=${sys.lectureId}`}
              className="flex flex-col justify-between p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-xs transition-all group min-h-[105px]"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${sys.tagColor}`}>
                    {sys.number}
                  </span>
                  <span className="text-[10px] font-medium text-[#737C77] dark:text-[#8899A6]">
                    {sys.phase}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {sys.title}
                </h3>

                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-tight line-clamp-1">
                  {sys.keyword}
                </p>
              </div>

              <div className="pt-2 mt-1.5 border-t border-[#F2ECE0]/80 dark:border-[#22303D]/80 flex items-center justify-between text-[11px] text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                <span>この章を始める</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
