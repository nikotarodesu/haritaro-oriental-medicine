'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface SystemStep {
  number: string;
  numInt: number;
  title: string;
  phase: '基礎理論' | '病機' | '診断' | '治法' | '実践';
  keyword: string;
  purpose: string;
  lectureId: string;
  tagColor: string;
  dotColor: string;
}

const SYSTEMS: SystemStep[] = [
  {
    number: "01",
    numInt: 1,
    title: "陰陽論",
    phase: "基礎理論",
    keyword: "変化・消長の力学",
    purpose: "固定的な二元論を脱却し、変化・循環・消長転化の力学モデルを習得する",
    lectureId: "lecture-yinyang-1",
    tagColor: "bg-[#1E3D34]/10 text-[#1E3D34] dark:bg-[#74BA9E]/15 dark:text-[#74BA9E] border-[#1E3D34]/20 dark:border-[#74BA9E]/30",
    dotColor: "bg-[#1E3D34] dark:bg-[#74BA9E]"
  },
  {
    number: "02",
    numInt: 2,
    title: "五行論",
    phase: "基礎理論",
    keyword: "生剋と多臓器連鎖",
    purpose: "木火土金水の生剋乗侮から多臓器連鎖病理を読み解く思考力を身につける",
    lectureId: "lecture-wuxing-1",
    tagColor: "bg-[#2D5A46]/10 text-[#2D5A46] dark:bg-[#83BEA8]/15 dark:text-[#83BEA8] border-[#2D5A46]/20 dark:border-[#83BEA8]/30",
    dotColor: "bg-[#2D5A46] dark:bg-[#83BEA8]"
  },
  {
    number: "03",
    numInt: 3,
    title: "気血水理論",
    phase: "基礎理論",
    keyword: "代謝と破綻ドミノ",
    purpose: "エネルギーと栄養・水液の代謝循環、虚損・鬱滞の破綻ドミノを解明する",
    lectureId: "lecture-qiblood-1",
    tagColor: "bg-[#B86924]/10 text-[#B86924] dark:bg-[#E6C387]/15 dark:text-[#E6C387] border-[#B86924]/20 dark:border-[#E6C387]/30",
    dotColor: "bg-[#B86924] dark:bg-[#E6C387]"
  },
  {
    number: "04",
    numInt: 4,
    title: "生命機能論",
    phase: "基礎理論",
    keyword: "機能層と連関",
    purpose: "固定した解剖部位ではなく、機能層（防御・代謝・生殖）として人体を捉える",
    lectureId: "lecture-lifedynamics-1",
    tagColor: "bg-[#1E2D3D]/10 text-[#1E2D3D] dark:bg-[#7BAAD8]/15 dark:text-[#7BAAD8] border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30",
    dotColor: "bg-[#1E2D3D] dark:bg-[#7BAAD8]"
  },
  {
    number: "05",
    numInt: 5,
    title: "病機論",
    phase: "病機",
    keyword: "邪正盛衰タイムライン",
    purpose: "邪気侵入と正気衰弱が引き起こす病理タイムラインと氷山モデルを解読する",
    lectureId: "lecture-pathomechanism-1",
    tagColor: "bg-[#A83629]/10 text-[#A83629] dark:bg-[#F08C80]/15 dark:text-[#F08C80] border-[#A83629]/20 dark:border-[#F08C80]/30",
    dotColor: "bg-[#A83629] dark:bg-[#F08C80]"
  },
  {
    number: "06",
    numInt: 6,
    title: "診断論",
    phase: "診断",
    keyword: "四診客観化・弁証",
    purpose: "安全確認・四診の客観化から八綱・気血水・臓腑経絡を導き、検証可能な診断記録を統合する",
    lectureId: "lecture-diagnosis-1",
    tagColor: "bg-[#4A3B69]/10 text-[#4A3B69] dark:bg-[#BCA8E6]/15 dark:text-[#BCA8E6] border-[#4A3B69]/20 dark:border-[#BCA8E6]/30",
    dotColor: "bg-[#4A3B69] dark:bg-[#BCA8E6]"
  },
  {
    number: "07",
    numInt: 7,
    title: "治法論",
    phase: "治法",
    keyword: "本標・補瀉と配穴",
    purpose: "補瀉寒熱・本標優先・臓腑経絡配穴から刺激量設計、治療計画書までを体系化する",
    lectureId: "lecture-treatment-1",
    tagColor: "bg-[#285A52]/10 text-[#285A52] dark:bg-[#6EC5B8]/15 dark:text-[#6EC5B8] border-[#285A52]/20 dark:border-[#6EC5B8]/30",
    dotColor: "bg-[#285A52] dark:bg-[#6EC5B8]"
  },
  {
    number: "08",
    numInt: 8,
    title: "実践論",
    phase: "実践",
    keyword: "臨床トリアージと評価",
    purpose: "初診トリアージから弁証、日常語での説明合意、反応評価、治療終了までを動的ループとして運用する",
    lectureId: "lecture-practice-1",
    tagColor: "bg-[#1E2D3D]/10 text-[#1E2D3D] dark:bg-[#88A9C3]/15 dark:text-[#88A9C3] border-[#1E2D3D]/20 dark:border-[#88A9C3]/30",
    dotColor: "bg-[#1E2D3D] dark:bg-[#88A9C3]"
  }
];

export default function EightSystemsRoadmap() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="bg-[#FAF8F5] dark:bg-[#15202B] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-2xs space-y-4">
        {/* セクションヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE7D8] dark:border-[#22303D] pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1E3D34]/10 dark:bg-[#74BA9E]/15 text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/20 dark:border-[#74BA9E]/30">
                <Layers className="w-3.5 h-3.5" />
                思考ロードマップ
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                東洋医学8大体系の全体像
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC]">
              基礎理論から病態・診断・治法・実践まで、臨床思考が一本の線でつながる全81レッスン
            </p>
          </div>

          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline shrink-0 group self-start sm:self-auto"
          >
            <span>カリキュラム（全81講）を開く</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* フェーズ進行バー（PC/大画面用SVG連動ガイド） */}
        <div className="hidden lg:grid grid-cols-8 gap-2 text-[11px] font-bold">
          <div className="col-span-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1E3D34]/5 dark:bg-[#74BA9E]/10 text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/15 dark:border-[#74BA9E]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
            <span>STEP 1: 基礎理論（陰陽・五行・気血水・生命機能）</span>
          </div>
          <div className="col-span-1 flex items-center justify-center gap-1 px-1 py-1 rounded bg-[#A83629]/5 dark:bg-[#F08C80]/10 text-[#A83629] dark:text-[#F08C80] border border-[#A83629]/15 dark:border-[#F08C80]/20">
            <span>STEP 2: 病機</span>
          </div>
          <div className="col-span-1 flex items-center justify-center gap-1 px-1 py-1 rounded bg-[#4A3B69]/5 dark:bg-[#BCA8E6]/10 text-[#4A3B69] dark:text-[#BCA8E6] border border-[#4A3B69]/15 dark:border-[#BCA8E6]/20">
            <span>STEP 3: 診断</span>
          </div>
          <div className="col-span-1 flex items-center justify-center gap-1 px-1 py-1 rounded bg-[#285A52]/5 dark:bg-[#6EC5B8]/10 text-[#285A52] dark:text-[#6EC5B8] border border-[#285A52]/15 dark:border-[#6EC5B8]/20">
            <span>STEP 4: 治法</span>
          </div>
          <div className="col-span-1 flex items-center justify-center gap-1 px-1 py-1 rounded bg-[#1E2D3D]/5 dark:bg-[#88A9C3]/10 text-[#1E2D3D] dark:text-[#88A9C3] border border-[#1E2D3D]/15 dark:border-[#88A9C3]/20">
            <span>STEP 5: 実践</span>
          </div>
        </div>

        {/* 8ステップ ロードマップ本体（モバイル：横スワイプ / PC：8分割グリッド） */}
        <div className="relative">
          {/* スマホ用スワイプガイド */}
          <div className="flex lg:hidden items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6] pb-1.5 px-0.5">
            <span>横にスワイプして全8章を閲覧</span>
            <span className="flex items-center gap-1 font-semibold text-[#1E3D34] dark:text-[#74BA9E]">
              スクロール ➔
            </span>
          </div>

          <div className="flex lg:grid lg:grid-cols-8 gap-2 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory -mx-1 px-1">
            {SYSTEMS.map((sys, idx) => (
              <div key={sys.number} className="relative flex shrink-0 w-[145px] sm:w-[160px] lg:w-auto snap-start">
                <Link
                  href={`/curriculum?lecture=${sys.lectureId}`}
                  className="w-full flex flex-col justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-sm transition-all group"
                >
                  <div className="space-y-1.5">
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

                    <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-tight line-clamp-2">
                      {sys.keyword}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#F2ECE0]/80 dark:border-[#22303D]/80 flex items-center justify-between text-[11px] text-[#1E3D34] dark:text-[#74BA9E] font-medium">
                    <span>講義一覧</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 詳細の開閉トグル（必要な人だけ開ける） */}
        <div className="pt-2 border-t border-[#EDE7D8] dark:border-[#22303D]/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] font-medium cursor-pointer transition-colors"
          >
            <span>{isExpanded ? "各章の習得目的を折りたたむ" : "各章の習得目的を詳しく見る"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
            全8体系・81レッスン
          </span>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {SYSTEMS.map((sys) => (
              <div
                key={`detail-${sys.number}`}
                className="p-2.5 rounded-lg bg-white/70 dark:bg-[#121920]/70 border border-[#EDE7D8] dark:border-[#22303D] text-xs space-y-1"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#232826] dark:text-[#FAF8F5]">
                  <span className={`w-2 h-2 rounded-full ${sys.dotColor}`} />
                  <span>第{sys.numInt}章 {sys.title}</span>
                </div>
                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  {sys.purpose}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
