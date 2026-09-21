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
              東洋医学8大体系（公開71レッスン / 全92予定）
            </span>
            {isStarted && (
              <span className="text-xs font-bold text-emerald-300">
                受講中
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {isStarted
              ? `続きから再開：${resumeLecture ? resumeLecture.title : '陰陽論 レッスン1'}`
              : 'まずはここから：第1章 陰陽論 レッスン1'}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 line-clamp-1 max-w-2xl">
            {isStarted && resumeLecture
              ? resumeLecture.summary
              : '陰陽の基本的な性質、比較の基準、身近な例から人体の動的な状態を捉える基礎を学びます。'}
          </p>

          {/* 進捗表示（受講中のみプログレスバーを強調、未受講時は案内表示） */}
          {isStarted ? (
            <div className="flex items-center gap-3 pt-1 max-w-md">
              <div className="flex-1 h-2 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-700/40">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${isMounted ? totalPercentage : 0}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-200">
                {isMounted ? `${totalCompleted}/${allLectures.length}レッスン完了 (${totalPercentage}%)` : '受講中'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-200/90 font-medium">
              <span>所要時間: 約10分</span>
              <span>•</span>
              <span>公開中71レッスン（全92レッスン予定）</span>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/curriculum${resumeLecture ? `?lecture=${resumeLecture.id}` : ''}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#142B24] font-bold text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 shadow-md transition-all group"
          >
            <PlayCircle className="w-4 h-4 text-emerald-700" />
            <span>{isStarted ? '続きから学ぶ' : '最初のレッスンを始める'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
