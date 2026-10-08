'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CURRICULUM_CHAPTERS_META } from '@/data/curriculumOutline';

interface SystemStep {
  number: string;
  numInt: number;
  title: string;
  phase: string;
  keyword: string;
  lectureId: string;
  tagColor: string;
}

const SYSTEMS: SystemStep[] = CURRICULUM_CHAPTERS_META.map(chapter => ({
  number: String(chapter.chapterNumber).padStart(2, '0'),
  numInt: chapter.chapterNumber,
  title: chapter.title,
  phase: chapter.stageId === 'stage-0' ? '導入' : chapter.stageId === 'stage-1' ? '身体の基本' : chapter.stageId === 'stage-2' ? '病態と診察・治療' : '統合',
  keyword: chapter.lead,
  lectureId: chapter.lectureIds[0],
  tagColor: 'bg-[#1E3D34]/10 text-[#1E3D34] dark:bg-[#74BA9E]/15 dark:text-[#74BA9E] border-[#1E3D34]/20 dark:border-[#74BA9E]/30',
}));

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
              概論で全体像をつかみ、身体の基本から病態・診察・治療・統合症例へ進みます。
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

        {/* 章構成の一覧（小さな画面でも横スクロールを使わない） */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {SYSTEMS.map((sys) => (
            <Link
              key={sys.number}
              href={`/curriculum/${sys.lectureId}`}
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

                <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
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
