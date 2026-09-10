"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import CurriculumDiagram from "@/components/CurriculumDiagram";
import EastWestTermSwitch from "@/components/EastWestTermSwitch";
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

  // URLクエリ（?lecture=xxx）による講義直接オープン
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const lectureId = params.get("lecture");
      if (lectureId) {
        for (const stage of CURRICULUM_DATA) {
          const found = stage.lectures.find((l) => l.id === lectureId);
          if (found) {
            setActiveLecture(found);
            break;
          }
        }
      }
    }
  }, []);

  // 次の講義へ進むハンドラ
  const handleNextLecture = () => {
    if (!activeLecture) return;
    for (const stage of CURRICULUM_DATA) {
      const nextLec = stage.lectures.find((l) => l.lectureNumber === activeLecture.lectureNumber + 1);
      if (nextLec) {
        setActiveLecture(nextLec);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    setActiveLecture(null);
  };

  // 講義詳細ビュー（読書モード）
  if (activeLecture) {
    // 次の講義があるか確認
    let nextLectureItem: Lecture | null = null;
    for (const stage of CURRICULUM_DATA) {
      const found = stage.lectures.find((l) => l.lectureNumber === activeLecture.lectureNumber + 1);
      if (found) {
        nextLectureItem = found;
        break;
      }
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        {/* 読書進捗バー */}
        <ReadingProgressBar />

        {/* ナビゲーションバー */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setActiveLecture(null);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", "/curriculum");
              }
            }}
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

        {/* 全8大カリキュラム 常駐進捗インジケーター */}
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F2ECE0] dark:border-[#22303D] text-[11px]">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              東洋医学 体系学習カリキュラム 進捗インジケーター
            </span>
            <span className="font-mono text-[#8C9691] dark:text-[#64748B]">
              第 {activeLecture.lectureNumber} / 8 講
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center text-[10px]">
            {[
              { num: 1, label: "① 陰陽", id: "lecture-1" },
              { num: 2, label: "② 五行", id: "lecture-2" },
              { num: 3, label: "③ 気血水", id: "lecture-3" },
              { num: 4, label: "④ 生命機能", id: "lecture-4" },
              { num: 5, label: "⑤ 病機", id: "lecture-5" },
              { num: 6, label: "⑥ 診断", id: "lecture-6-diagnosis" },
              { num: 7, label: "⑦ 治法", id: "lecture-7-treatment" },
              { num: 8, label: "⑧ 実践", id: "lecture-8-practice" },
            ].map((item) => {
              const isActive = item.num === activeLecture.lectureNumber;
              const isPast = item.num < activeLecture.lectureNumber;
              return (
                <button
                  key={item.num}
                  onClick={() => {
                    for (const stg of CURRICULUM_DATA) {
                      const found = stg.lectures.find((l) => l.lectureNumber === item.num);
                      if (found) {
                        setActiveLecture(found);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        if (typeof window !== "undefined") {
                          window.history.replaceState(null, "", `/curriculum?lecture=${found.id}`);
                        }
                        break;
                      }
                    }
                  }}
                  className={`py-1.5 px-1 rounded-lg font-bold transition-all truncate ${
                    isActive
                      ? "bg-[#1E3D34] text-white shadow-xs scale-[1.03]"
                      : isPast
                      ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#D9EADB]"
                      : "bg-[#FAF8F5] dark:bg-[#121920] text-[#8C9691] dark:text-[#64748B] hover:text-[#232826]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
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
              <span>本講義で押さえるべき重要要点</span>
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
              const trimmed = block.trim();

              // ダイアグラム・図解ブロック（:::diagram <id> または [DIAGRAM:<id>]）
              if (trimmed.startsWith(":::diagram ") || trimmed.startsWith("[DIAGRAM:")) {
                const diagramId = trimmed
                  .replace(":::diagram ", "")
                  .replace("[DIAGRAM:", "")
                  .replace("]", "")
                  .trim();
                return <CurriculumDiagram key={index} id={diagramId} onNextLecture={handleNextLecture} />;
              }

              // 東西医学 相補スイッチ（:::eastwest term="..." または :::east-west term="..."）
              if (trimmed.startsWith(":::eastwest") || trimmed.startsWith(":::east-west")) {
                const termMatch = trimmed.match(/term=["']([^"']+)["']/);
                const termIdMatch = trimmed.match(/termId=["']([^"']+)["']/);
                const term = termMatch ? termMatch[1] : (termIdMatch ? termIdMatch[1] : "肝気犯胃");
                return <EastWestTermSwitch key={index} termId={term} />;
              }

              // 画像（![alt](src)）
              const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
              if (imgMatch) {
                const alt = imgMatch[1];
                const src = imgMatch[2];
                return (
                  <figure key={index} className="my-8 text-center bg-[#FAF8F5] dark:bg-[#121920] p-4 sm:p-6 rounded-2xl border border-[#E8E1D1] dark:border-[#22303D]">
                    <img src={src} alt={alt} className="max-w-full mx-auto rounded-xl shadow-sm" />
                    {alt && <figcaption className="mt-3 text-xs text-[#59615D] dark:text-[#A0B0BC] font-medium">【図】{alt}</figcaption>}
                  </figure>
                );
              }

              // 見出し h2
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    id={`curriculum-heading-${index}`}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#E8E1D1] dark:border-[#22303D] pb-2 mt-8 scroll-mt-36"
                  >
                    <GlossaryRenderer text={trimmed.replace("## ", "")} />
                  </h2>
                );
              }

              // 見出し h3
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    id={`curriculum-heading-${index}`}
                    className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-6 scroll-mt-36"
                  >
                    <GlossaryRenderer text={trimmed.replace("### ", "")} />
                  </h3>
                );
              }

              // 引用
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="bg-[#EBF3EF] dark:bg-[#162A24] border-l-4 border-[#1E3D34] dark:border-[#4E8C76] p-4 rounded-r-xl text-xs sm:text-sm italic text-[#232826] dark:text-[#E6EFEA]"
                  >
                    <GlossaryRenderer text={trimmed.replace(/^>\s*/gm, "")} />
                  </blockquote>
                );
              }

              // 水平線
              if (trimmed === "---") {
                return <hr key={index} className="border-[#E8E1D1] dark:border-[#22303D] my-8" />;
              }

              // 表（Markdown Table）
              if (trimmed.includes("|") && trimmed.includes("---")) {
                const lines = trimmed.split("\n").filter((l) => l.includes("|"));
                if (lines.length >= 2) {
                  const headerLine = lines[0];
                  const dataLines = lines.slice(2);
                  const headers = headerLine
                    .split("|")
                    .map((s) => s.trim())
                    .filter((_, i, arr) => i !== 0 && i !== arr.length - 1);

                  return (
                    <div key={index} className="overflow-x-auto my-6 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-sm">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-bold border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
                          <tr>
                            {headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-serif">
                                <GlossaryRenderer text={h} />
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5DEC9]/60 dark:divide-[#2A3B4A]/60 bg-[#FFFFFF] dark:bg-[#17212A]">
                          {dataLines.map((rowLine, rIdx) => {
                            const cells = rowLine
                              .split("|")
                              .map((s) => s.trim())
                              .filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
                            return (
                              <tr key={rIdx} className="hover:bg-[#FAF8F5] dark:hover:bg-[#1C2834] transition-colors">
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 text-[#333835] dark:text-[#C5D2DB] leading-relaxed">
                                    <GlossaryRenderer text={cell} />
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              // リスト（箇条書き・番号付き）
              const lines = trimmed.split("\n");
              const isAllListItems = lines.length > 0 && lines.every((l) => /^[-*]\s+|\d+\.\s+/.test(l.trim()));
              if (isAllListItems) {
                const isOrdered = /^\d+\.\s+/.test(lines[0].trim());
                const ListTag = isOrdered ? "ol" : "ul";
                return (
                  <ListTag
                    key={index}
                    className={`space-y-2 my-4 pl-5 ${isOrdered ? "list-decimal" : "list-disc"} text-xs sm:text-sm text-[#333835] dark:text-[#C5D2DB]`}
                  >
                    {lines.map((l, lIdx) => {
                      const itemText = l.trim().replace(/^[-*]\s+|\d+\.\s+/, "");
                      return (
                        <li key={lIdx} className="leading-relaxed">
                          <GlossaryRenderer text={itemText} />
                        </li>
                      );
                    })}
                  </ListTag>
                );
              }

              // 通常の段落
              return (
                <p key={index} className="leading-relaxed whitespace-pre-line text-[#333835] dark:text-[#C5D2DB]">
                  <GlossaryRenderer text={trimmed.replace(/^#{1,6}\s+/gm, "").replace(/^-\s+/gm, "・ ")} />
                </p>
              );
            })}
          </div>

          {/* 講義受講修了フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              第 {activeLecture.lectureNumber} 講 受講完了
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveLecture(null);
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", "/curriculum");
                  }
                }}
                className="px-4 py-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-xs font-semibold transition-all"
              >
                シラバス一覧
              </button>

              {nextLectureItem && (
                <button
                  onClick={handleNextLecture}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>次の講義へ進む（第 {nextLectureItem.lectureNumber} 講）</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
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
