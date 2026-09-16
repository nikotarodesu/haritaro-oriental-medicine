'use client';

import React from 'react';
import Link from 'next/link';
import { useCurriculumProgress } from '@/contexts/CurriculumProgressContext';
import { PlayCircle, CheckCircle2, AlertCircle, Compass, ArrowRight } from 'lucide-react';
import { CURRICULUM_DATA } from '@/data/curriculumData';

export default function HomeLearningProgressCard() {
  const {
    isMounted,
    totalCompleted,
    totalPercentage,
    completedLectures,
    getNextResumeLectureId,
    getIncorrectQuestions,
  } = useCurriculumProgress();

  const allLectures = CURRICULUM_DATA.flatMap((s) => s.lectures);
  const allIds = allLectures.map((l) => l.id);

  const resumeId = isMounted ? getNextResumeLectureId(allIds) : allIds[0];
  const resumeLecture = allLectures.find((l) => l.id === resumeId) || allLectures[0];
  const incorrectCount = isMounted ? getIncorrectQuestions().length : 0;
  const isStarted = isMounted && totalCompleted > 0;

  return (
    <div className="bg-gradient-to-br from-[#1E3D34] via-[#24493E] to-[#142B24] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-emerald-600/30 relative overflow-hidden">
      {/* 背景のやわらかなグロー */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
              <Compass className="w-3.5 h-3.5" />
              東洋医学全8大体系（全92講）
            </span>
            {isStarted && (
              <span className="text-xs font-bold text-emerald-300">
                受講中
              </span>
            )}
            {incorrectCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/90 text-white">
                <AlertCircle className="w-3 h-3" />
                復習 {incorrectCount}問
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {isStarted
              ? `続きから再開：${resumeLecture ? resumeLecture.title : '第1章 陰陽とは何か'}`
              : '基礎から臨床までを体系化する92レッスン'}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 line-clamp-1 max-w-2xl">
            {resumeLecture
              ? resumeLecture.summary
              : '陰陽・五行・気血水から病機・診断・治法・実践まで、動態システムとして本質から修得します。'}
          </p>

          {/* 進捗バー */}
          <div className="flex items-center gap-3 pt-1 max-w-md">
            <div className="flex-1 h-2 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/40">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${isMounted ? totalPercentage : 0}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-200">
              {isMounted ? `${totalCompleted}/92講 (${totalPercentage}%)` : '0/92講 (0%)'}
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/curriculum${resumeLecture ? `?lecture=${resumeLecture.id}` : ''}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#142B24] font-bold text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 shadow-md transition-all group"
          >
            <PlayCircle className="w-4 h-4 text-emerald-700" />
            <span>{isStarted ? '続きから学ぶ' : '学習をスタートする'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
