"use client";

import { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Award,
  Layers,
  Compass,
  Stethoscope,
  Activity,
  Lock
} from "lucide-react";

export default function CurriculumPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);

  // 講義詳細ビュー（読書モード）
  if (activeLecture) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* 読書進捗バー */}
        <ReadingProgressBar />

        {/* ナビゲーションバー */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveLecture(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>カリキュラム一覧へ戻る</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
            <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>講義時間: 約 {activeLecture.duration}</span>
          </div>
        </div>

        {/* 講義テキスト本体 */}
        <article className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-12 shadow-sm space-y-8 transition-colors">
          {/* ヘッダー */}
          <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold">
                {activeLecture.stageTitle}
              </span>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                第 {activeLecture.lectureNumber} 講
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
              {activeLecture.title}
            </h1>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC]">
              {activeLecture.subtitle}
            </p>
          </div>

          {/* 講義の重要要点ボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-6 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#4E8C76] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>本講義で押さえるべき重要要点（Core Essentials）</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
              {activeLecture.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0">✓</span>
                  <span><GlossaryRenderer text={point} /></span>
                </li>
              ))}
            </ul>
          </div>

          {/* 講義要約 */}
          <div className="bg-[#FCF4EB]/70 dark:bg-[#231A12]/80 p-5 rounded-2xl border border-[#F3E1CB] dark:border-[#423321] text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
            <strong className="block font-serif text-sm font-bold text-[#B86924] dark:text-[#E6C387] mb-1">
              【講義の狙いと本質】
            </strong>
            <GlossaryRenderer text={activeLecture.summary} />
          </div>

          {/* 本文（GlossaryRendererで専門用語ホバー辞書を自動適用） */}
          <div className="prose max-w-none text-[#232826] dark:text-[#D5E0DC] leading-relaxed space-y-6 text-sm sm:text-base">
            {activeLecture.contentMarkdown.split("\n\n").map((block, index) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#E8E1D1] dark:border-[#22303D] pb-2 mt-8"
                  >
                    <GlossaryRenderer text={block.replace("## ", "")} />
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-6"
                  >
                    <GlossaryRenderer text={block.replace("### ", "")} />
                  </h3>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="bg-[#EBF3EF] dark:bg-[#162A24] border-l-4 border-[#1E3D34] dark:border-[#4E8C76] p-4 rounded-r-xl text-xs sm:text-sm italic text-[#232826] dark:text-[#E6EFEA]"
                  >
                    <GlossaryRenderer text={block.replace("> ", "")} />
                  </blockquote>
                );
              }
              if (block.startsWith("---")) {
                return <hr key={index} className="border-[#E8E1D1] dark:border-[#22303D] my-8" />;
              }
              return (
                <p key={index} className="leading-relaxed whitespace-pre-line text-[#333835] dark:text-[#C5D2DB]">
                  <GlossaryRenderer text={block} />
                </p>
              );
            })}
          </div>

          {/* 講義受講修了フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              第 {activeLecture.lectureNumber} 講 受講完了
            </div>
            <button
              onClick={() => setActiveLecture(null)}
              className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all flex items-center gap-1.5"
            >
              <span>シラバス一覧へ戻る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>
      </div>
    );
  }

  // カリキュラム一覧ビュー
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* ページ見出し */}
      <div className="border-b border-[#E8E1D1] dark:border-[#22303D] pb-8 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-semibold tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>基礎から臨床実践までを体系化するアカデミー</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
          体系学習カリキュラム
        </h1>
        <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
          現代科学・力学・情報モデルで「なぜそうなるのか」を腹落ちさせる体系講義。臨床家として一生モノの思考OSを身につけます。
        </p>
      </div>

      {/* 分野別講義リスト */}
      <div className="space-y-12">
        {CURRICULUM_DATA.map((stage) => (
          <div
            key={stage.id}
            className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-9 shadow-sm transition-colors space-y-6"
          >
            {/* セクションヘッダー */}
            <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-widest">
                {stage.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                {stage.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-2 leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* 講義カード一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {stage.lectures.map((lec) => (
                <div
                  key={lec.id}
                  onClick={() => {
                    if (lec.isPublished) {
                      setActiveLecture(lec);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    lec.isPublished
                      ? "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md cursor-pointer group"
                      : "bg-[#F9F7F3]/50 dark:bg-[#10161C]/50 border-dashed border-[#DDD6C5] dark:border-[#22303D] opacity-80 cursor-not-allowed"
                  }`}
                >
                  <div>
                    {/* バッジと講義時間 */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          lec.isPublished
                            ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                            : "bg-[#EAE4D5] dark:bg-[#1E2B36] text-[#737C77] dark:text-[#8899A6]"
                        }`}
                      >
                        {lec.isPublished ? "開講中（受講可能）" : "順次開講"}
                      </span>
                      <span className="flex items-center gap-1 text-[#737C77] dark:text-[#8899A6]">
                        <Clock className="w-3 h-3" />
                        <span>約 {lec.duration}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug mb-2">
                      {lec.title}
                    </h3>
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6] mb-3">
                      {lec.subtitle}
                    </p>

                    <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3 mb-4">
                      {lec.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                    {lec.isPublished ? (
                      <>
                        <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>講義を受講する</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                          重要要点・本文収録
                        </span>
                      </>
                    ) : (
                      <span className="text-[#8A948F] dark:text-[#6A7C8B] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>準備中</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
