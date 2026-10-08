"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { CURRICULUM_CHAPTERS_META, CURRICULUM_TOTAL_LESSONS } from "@/data/curriculumOutline";

interface Props {
  onNextLecture?: () => void;
}

export default function PracticeGrandMasterMap({ onNextLecture }: Props) {
  const [selectedSeries, setSelectedSeries] = useState(CURRICULUM_CHAPTERS_META.at(-1)?.seriesId);
  const current = CURRICULUM_CHAPTERS_META.find((chapter) => chapter.seriesId === selectedSeries) ?? CURRICULUM_CHAPTERS_META[0];
  if (!current) return null;

  return (
    <figure className="my-8 rounded-3xl border border-[#E5DEC9] bg-white p-6 text-[#232826] shadow-sm dark:border-[#2A3B4A] dark:bg-[#17212A] dark:text-[#FAF8F5] sm:p-8">
      <figcaption className="space-y-2 border-b border-[#E5DEC9] pb-4 dark:border-[#2A3B4A]">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#184F49] dark:text-[#9CCBBC]"><BookOpen className="h-4 w-4" aria-hidden="true" />体系学習の振り返り</span>
        <span className="block font-serif text-xl font-bold">全{CURRICULUM_CHAPTERS_META.length}章のつながりを確かめる</span>
      </figcaption>
      <p className="my-5 text-base leading-relaxed">概論から基本用語、正常な働き、伝統的な解釈、架空の症例まで、全{CURRICULUM_TOTAL_LESSONS}講で扱う内容を一覧できます。各章を選び、学んだ内容を自分の言葉で説明できるか振り返りましょう。</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4" aria-label="振り返る章を選ぶ">
        {CURRICULUM_CHAPTERS_META.map((chapter) => {
          const isSelected = chapter.seriesId === current.seriesId;
          return (
            <button key={chapter.id} type="button" onClick={() => setSelectedSeries(chapter.seriesId)} aria-pressed={isSelected} aria-controls="curriculum-reflection-detail" className={`min-h-11 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 ${isSelected ? "border-[#184F49] bg-[#184F49] text-white" : "border-[#E5DEC9] bg-[#FAF8F5] hover:bg-[#F2ECE0] dark:border-[#2A3B4A] dark:bg-[#121920] dark:hover:bg-[#22303D]"}`}>
              <span className="block text-xs">第{chapter.chapterNumber}章・{chapter.plannedLessons}講</span>
              <span className="mt-1 block text-sm font-semibold">{chapter.shortTitle}</span>
            </button>
          );
        })}
      </div>

      <div id="curriculum-reflection-detail" className="mt-5 space-y-3 rounded-xl border border-[#E5DEC9] bg-[#FAF8F5] p-5 dark:border-[#2A3B4A] dark:bg-[#121920]" aria-live="polite" aria-atomic="true">
        <h4 className="text-lg font-bold">{current.title}</h4>
        <p className="font-semibold">{current.lead}</p>
        <p className="text-base leading-relaxed">{current.description}</p>
        <p className="text-sm leading-relaxed">説明できることと、もう一度確認したい用語や判断の理由を一つずつ挙げてみてください。</p>
        <Link href={`/curriculum#chapter-${current.id}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#184F49] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-[#9CCBBC]"><RotateCcw className="h-4 w-4" aria-hidden="true" />この章の講義を確認する</Link>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl bg-[#1E3D34] p-5 text-white">
        <h4 className="font-serif text-lg font-bold">学んだ内容を振り返る</h4>
        <p className="text-base leading-relaxed">受講した講義、確認問題、短い例を見直し、理解が曖昧なところへ戻ります。この図を開いたことやWeb教材の受講完了は、実際の診療能力や資格の認定を意味しません。</p>
        <Link href="/learn/review" className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">確認問題を復習する<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        {onNextLecture && <button type="button" onClick={onNextLecture} className="flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">次の講義へ進む<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>}
      </div>
    </figure>
  );
}
