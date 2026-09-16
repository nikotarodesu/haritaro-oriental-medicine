"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, Lecture } from "@/data/curriculumData";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlossaryRenderer from "@/components/GlossaryRenderer";
import MarkdownBody from "@/components/MarkdownBody";
import ArticleReferences from "@/components/ArticleReferences";
import { resolveArticleReferences } from "@/utils/referenceResolver";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Award,
  Lock,
  Layers,
  Compass
} from "lucide-react";

export default function CurriculumPage() {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);

  // 全講義をフラットに並べた配列（順序保証）
  const allLectures = CURRICULUM_DATA.flatMap((s) => s.lectures);

  // URLクエリ（?lecture=xxx）による講義直接オープン（後方互換対応）
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const lectureId = params.get("lecture");
      if (lectureId) {
        // 後方互換：旧ID対応
        let resolvedId = lectureId;
        if (lectureId === "lecture-1" || lectureId === "lecture-1-yinyang") {
          resolvedId = "lecture-yinyang-1";
        } else if (lectureId === "lecture-2" || lectureId === "lecture-2-wuxing") {
          resolvedId = "lecture-wuxing-1";
        }
        const found = allLectures.find((l) => l.id === resolvedId);
        if (found) {
          setActiveLecture(found);
        }
      }
    }
  }, [allLectures]);

  // 現在の講義の位置と前後ナビゲーション
  const currentIndex = activeLecture
    ? allLectures.findIndex((l) => l.id === activeLecture.id)
    : -1;
  const prevLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex >= 0 && currentIndex < allLectures.length - 1
      ? allLectures[currentIndex + 1]
      : null;

  // 講義選択・遷移ハンドラ
  const handleSelectLecture = (lecture: Lecture) => {
    setActiveLecture(lecture);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/curriculum?lecture=${lecture.id}`);
    }
  };

  // 講義詳細ビュー（読書モード）
  if (activeLecture) {
    // 講義内の専門用語の初出管理（各単語の初回のみワンクリック解説を有効化）
    const seenTerms = new Set<string>();

    // 参考文献・学術引用の解決（講義定義＋本文中インライン引用タグ）
    const resolvedReferences = resolveArticleReferences(
      activeLecture.references,
      activeLecture.contentMarkdown
    );

    // シリーズ別のレッスン一覧
    const isYinYang = activeLecture.seriesId === "yinyang";
    const isWuxing = activeLecture.seriesId === "wuxing";
    const yinyangLessons = allLectures.filter((l) => l.seriesId === "yinyang");
    const wuxingLessons = allLectures.filter((l) => l.seriesId === "wuxing");

    return (
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-16 space-y-6 sm:space-y-8">
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline bg-[#EBF3EF] dark:bg-[#182823] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>カリキュラム一覧へ戻る</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#59615D] dark:text-[#96A6B2]">
            <Clock className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E]" />
            <span>受講時間: 約 {activeLecture.duration}</span>
          </div>
        </div>

        {/* 進捗インジケーター */}
        {isYinYang ? (
          /* 陰陽論 全8レッスン 専用進捗インジケーター */
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-2.5 sm:p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE0] dark:border-[#22303D] text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Layers className="w-3.5 h-3.5" />
                <span>陰陽論 集中カリキュラム 進捗</span>
              </div>
              <span className="font-mono text-[#8C9691] dark:text-[#64748B]">
                レッスン {activeLecture.lessonNumber || 1} / 8
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center text-[10px]">
              {yinyangLessons.map((lec) => {
                const isActive = lec.id === activeLecture.id;
                const isPast = (lec.lessonNumber || 0) < (activeLecture.lessonNumber || 0);
                const shortLabel = [
                  "① 基礎",
                  "② 比較",
                  "③ 関係",
                  "④ 変化",
                  "⑤ 身体",
                  "⑥ 偏り",
                  "⑦ 所見",
                  "⑧ 演習"
                ][(lec.lessonNumber || 1) - 1];

                return (
                  <button
                    key={lec.id}
                    onClick={() => handleSelectLecture(lec)}
                    className={`py-1.5 px-1 rounded-lg font-bold transition-all truncate cursor-pointer ${
                      isActive
                        ? "bg-[#1E3D34] text-white shadow-xs scale-[1.03]"
                        : isPast
                        ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#D9EADB]"
                        : "bg-[#FAF8F5] dark:bg-[#121920] text-[#8C9691] dark:text-[#64748B] hover:text-[#232826]"
                    }`}
                    title={lec.title}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        ) : isWuxing ? (
          /* 五行論 全12レッスン 専用進捗インジケーター */
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-2.5 sm:p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE0] dark:border-[#22303D] text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <Compass className="w-3.5 h-3.5" />
                <span>五行論 集中カリキュラム 進捗</span>
              </div>
              <span className="font-mono text-[#8C9691] dark:text-[#64748B]">
                レッスン {activeLecture.lessonNumber || 1} / 12
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 text-center text-[10px]">
              {wuxingLessons.map((lec) => {
                const isActive = lec.id === activeLecture.id;
                const isPast = (lec.lessonNumber || 0) < (activeLecture.lessonNumber || 0);
                const shortLabel = [
                  "① 概要",
                  "② 性質",
                  "③ 相生",
                  "④ 相剋",
                  "⑤ 乱れ",
                  "⑥ 五臓",
                  "⑦ 身体",
                  "⑧ 精神",
                  "⑨ 生活",
                  "⑩ 連動",
                  "⑪ 判断",
                  "⑫ 演習"
                ][(lec.lessonNumber || 1) - 1];

                return (
                  <button
                    key={lec.id}
                    onClick={() => handleSelectLecture(lec)}
                    className={`py-1.5 px-1 rounded-lg font-bold transition-all truncate cursor-pointer ${
                      isActive
                        ? "bg-[#1E3D34] text-white shadow-xs scale-[1.03]"
                        : isPast
                        ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] hover:bg-[#D9EADB]"
                        : "bg-[#FAF8F5] dark:bg-[#121920] text-[#8C9691] dark:text-[#64748B] hover:text-[#232826]"
                    }`}
                    title={lec.title}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 全8大体系 常駐進捗インジケーター */
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-2.5 sm:p-4 shadow-2xs">
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
                { num: 1, label: "① 陰陽", targetId: "lecture-yinyang-1" },
                { num: 2, label: "② 五行", targetId: "lecture-wuxing-1" },
                { num: 3, label: "③ 気血水", targetId: "lecture-3-qiblood" },
                { num: 4, label: "④ 生命機能", targetId: "lecture-4-lifedynamics" },
                { num: 5, label: "⑤ 病機", targetId: "lecture-5-pathomechanism" },
                { num: 6, label: "⑥ 診断", targetId: "lecture-6-diagnosis" },
                { num: 7, label: "⑦ 治法", targetId: "lecture-7-treatment" },
                { num: 8, label: "⑧ 実践", targetId: "lecture-8-practice" },
              ].map((item) => {
                const isActive = item.num === activeLecture.lectureNumber;
                const isPast = item.num < activeLecture.lectureNumber;
                return (
                  <button
                    key={item.num}
                    onClick={() => {
                      const found = allLectures.find((l) => l.id === item.targetId);
                      if (found) handleSelectLecture(found);
                    }}
                    className={`py-1.5 px-1 rounded-lg font-bold transition-all truncate cursor-pointer ${
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
        )}

        {/* 講義テキスト本体 */}
        <article className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] px-3.5 py-6 sm:p-12 shadow-sm space-y-6 sm:space-y-8 transition-colors">
          {/* ヘッダー */}
          <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-5 sm:pb-6 space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold">
                {activeLecture.stageTitle}
              </span>
              {activeLecture.seriesTitle && activeLecture.lessonNumber ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#B86924] dark:text-[#E6C387] text-xs font-bold">
                  {activeLecture.seriesTitle} レッスン {activeLecture.lessonNumber}
                </span>
              ) : (
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
                  第 {activeLecture.lectureNumber} 講
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] leading-tight">
              {activeLecture.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC]">
              {activeLecture.subtitle}
            </p>
          </div>

          {/* ★ この記事で学べること（導入ハイライトセクション） */}
          {activeLecture.whatYouWillLearn && (
            <div className="bg-[#EBF3EF]/70 dark:bg-[#182823]/70 border border-[#B8D8C9] dark:border-[#2A5243] rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                  <span>この記事で学べること（学習のゴール）</span>
                </div>
                {activeLecture.seriesTitle && activeLecture.lessonNumber && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E3D34] text-white">
                    {activeLecture.seriesTitle} 第{activeLecture.lessonNumber}章 / 全{isYinYang ? 8 : 12}章
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* 学ぶ内容 */}
                <div className="bg-white/90 dark:bg-[#121D19]/90 rounded-xl p-3.5 border border-[#D5E6DE] dark:border-[#233D32] space-y-1">
                  <div className="text-[11px] font-bold text-[#1E3D34] dark:text-[#83BEA8] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>学ぶ内容</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB] leading-relaxed font-medium">
                    {activeLecture.whatYouWillLearn.topics}
                  </p>
                </div>

                {/* 学習後にできること */}
                <div className="bg-white/90 dark:bg-[#121D19]/90 rounded-xl p-3.5 border border-[#D5E6DE] dark:border-[#233D32] space-y-1">
                  <div className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                    <span>学習後にできること</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] leading-relaxed">
                    {activeLecture.whatYouWillLearn.canDo}
                  </p>
                </div>
              </div>

              {/* 習得目標箇条書き */}
              {activeLecture.whatYouWillLearn.goals && activeLecture.whatYouWillLearn.goals.length > 0 && (
                <div className="pt-2 border-t border-[#D5E6DE]/80 dark:border-[#233D32]/80">
                  <div className="text-[11px] font-semibold text-[#59615D] dark:text-[#96A6B2] mb-1.5">
                    具体的な習得チェックリスト:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#404743] dark:text-[#C5D2DB]">
                    {activeLecture.whatYouWillLearn.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 講義の重要要点ボックス */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 sm:p-6 rounded-2xl border-l-4 border-[#1E3D34] dark:border-[#4E8C76] space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <span>本レッスンの重要ポイント</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
              {activeLecture.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-bold shrink-0">✓</span>
                  <span><GlossaryRenderer text={point} seenTerms={seenTerms} /></span>
                </li>
              ))}
            </ul>
          </div>

          {/* 講義要約 */}
          <div className="bg-[#FCF4EB]/70 dark:bg-[#231A12]/80 p-3 sm:p-5 rounded-2xl border border-[#F3E1CB] dark:border-[#423321] text-xs sm:text-sm text-[#404743] dark:text-[#D1C6BA] leading-relaxed">
            <strong className="block font-serif text-sm font-bold text-[#B86924] dark:text-[#E6C387] mb-1">
              【レッスンの狙いと本質】
            </strong>
            <GlossaryRenderer text={activeLecture.summary} seenTerms={seenTerms} />
          </div>

          {/* 本文（MarkdownBodyで専門用語辞書・図解・東西切替・リスト・参考文献バッジを統一描画） */}
          <MarkdownBody
            contentMarkdown={activeLecture.contentMarkdown}
            seenTerms={seenTerms}
            onNextLecture={nextLecture ? () => handleSelectLecture(nextLecture) : undefined}
            idPrefix="curriculum-heading"
            resolvedReferences={resolvedReferences}
          />

          {/* 参考文献・学術エビデンス */}
          <ArticleReferences references={resolvedReferences} />

          {/* 講義受講修了フッター */}
          <div className="border-t border-[#F2ECE0] dark:border-[#22303D] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#59615D] dark:text-[#96A6B2]">
              {activeLecture.seriesTitle && activeLecture.lessonNumber ? (
                <span>{activeLecture.seriesTitle} レッスン {activeLecture.lessonNumber} 受講完了</span>
              ) : (
                <span>第 {activeLecture.lectureNumber} 講 受講完了</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* 前のレッスンへ */}
              {prevLecture && (
                <button
                  onClick={() => handleSelectLecture(prevLecture)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>前のレッスン</span>
                </button>
              )}

              <button
                onClick={() => {
                  setActiveLecture(null);
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", "/curriculum");
                  }
                }}
                className="px-4 py-2.5 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] text-[#59615D] dark:text-[#A0B0BC] hover:bg-[#FAF8F5] dark:hover:bg-[#1A2530] text-xs font-semibold transition-all cursor-pointer"
              >
                シラバス一覧
              </button>

              {/* 次のレッスンへ */}
              {nextLecture && (
                <button
                  onClick={() => handleSelectLecture(nextLecture)}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] text-xs font-semibold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>次のレッスンへ進む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // シリーズ別レッスン一覧（シラバス用）
  const yinyangLessons = allLectures.filter((l) => l.seriesId === "yinyang");
  const wuxingLessons = allLectures.filter((l) => l.seriesId === "wuxing");

  // カリキュラム一覧ビュー
  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 sm:space-y-14">
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
          現代科学・力学・情報モデルで「なぜそうなるのか」を腹落ちさせる体系講義。各記事ごとに「学ぶ内容」と「学習後にできること」を明快に定義し、臨床家として一生モノの思考OSを身につけます。
        </p>
      </div>

      {/* ★ メイン特集①：陰陽論 全8レッスン 集中カリキュラム */}
      <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 border-[#1E3D34]/20 dark:border-[#4E8C76]/30 p-3.5 sm:p-9 shadow-sm transition-colors space-y-6">
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>基幹カリキュラム 深掘りシリーズ①（全8レッスン）</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              陰陽論 ― 生命ダイナミズムを読み解く「最小単位」の思考OS
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1.5 leading-relaxed max-w-3xl">
              神秘思想を脱却し、「何と比べてどの性質か」「どう関係し、どう変化するか」「身体のどこに偏りがあるか」を1レッスンずつ確実に深掘りして修得する集中講義です。
            </p>
          </div>
          <button
            onClick={() => handleSelectLecture(yinyangLessons[0])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <span>第1章から受講を開始する</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 陰陽論 全8レッスン グリッドカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
          {yinyangLessons.map((lec) => (
            <div
              key={lec.id}
              onClick={() => handleSelectLecture(lec)}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    レッスン {lec.lessonNumber} / 8
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    <Clock className="w-3 h-3" />
                    <span>約 {lec.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {lec.title}
                </h3>

                {/* 学ぶ内容・学習後にできることのコンパクト表示 */}
                <div className="space-y-1.5 text-xs bg-white/70 dark:bg-[#1A2632]/60 p-2.5 rounded-lg border border-[#EDE7DC] dark:border-[#23303D]">
                  <div className="text-[#59615D] dark:text-[#A0B0BC]">
                    <strong className="text-[#1E3D34] dark:text-[#83BEA8] font-semibold">学ぶ内容:</strong>{" "}
                    {lec.whatYouWillLearn.topics}
                  </div>
                  <div className="text-[#232826] dark:text-[#FAF8F5]">
                    <strong className="text-[#B86924] dark:text-[#E6C387] font-semibold">できること:</strong>{" "}
                    {lec.whatYouWillLearn.canDo}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>レッスンを受講する</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                  演習・解説つき
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ★ メイン特集②：五行論 全12レッスン 集中カリキュラム */}
      <section className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 border-[#1E3D34]/20 dark:border-[#4E8C76]/30 p-3.5 sm:p-9 shadow-sm transition-colors space-y-6">
        <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>基幹カリキュラム 深掘りシリーズ②（全12レッスン）</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              五行論 ― 循環と多臓器ネットワークを解き明かす「動態システム」の地図
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1.5 leading-relaxed max-w-3xl">
              木・火・土・金・水の性質から相生・相剋、五臓・身体対応、感情・精神（五神五志）、自然環境、多臓器連動、そして臨床意思決定アルゴリズムまでを全12レッスンで完全網羅します。
            </p>
          </div>
          <button
            onClick={() => handleSelectLecture(wuxingLessons[0])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E3D34] text-white text-xs font-bold hover:bg-[#162E27] transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <span>第1章から受講を開始する</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 五行論 全12レッスン グリッドカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {wuxingLessons.map((lec) => (
            <div
              key={lec.id}
              onClick={() => handleSelectLecture(lec)}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    レッスン {lec.lessonNumber} / 12
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#737C77] dark:text-[#8899A6]">
                    <Clock className="w-3 h-3" />
                    <span>約 {lec.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  {lec.title}
                </h3>

                {/* 学ぶ内容・学習後にできることのコンパクト表示 */}
                <div className="space-y-1.5 text-xs bg-white/70 dark:bg-[#1A2632]/60 p-2.5 rounded-lg border border-[#EDE7DC] dark:border-[#23303D]">
                  <div className="text-[#59615D] dark:text-[#A0B0BC]">
                    <strong className="text-[#1E3D34] dark:text-[#83BEA8] font-semibold">学ぶ内容:</strong>{" "}
                    {lec.whatYouWillLearn.topics}
                  </div>
                  <div className="text-[#232826] dark:text-[#FAF8F5]">
                    <strong className="text-[#B86924] dark:text-[#E6C387] font-semibold">できること:</strong>{" "}
                    {lec.whatYouWillLearn.canDo}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>レッスンを受講する</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                  段階的演習つき
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 後続カリキュラム（気血水理論〜実践論） */}
      <div className="space-y-8 sm:space-y-12">
        {CURRICULUM_DATA.map((stage) => {
          // 陰陽論・五行論以外の講義を抽出
          const stageLectures = stage.lectures.filter(
            (l) => l.seriesId !== "yinyang" && l.seriesId !== "wuxing"
          );
          if (stageLectures.length === 0) return null;

          return (
            <div
              key={stage.id}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-9 shadow-sm transition-colors space-y-5 sm:space-y-6"
            >
              {/* セクションヘッダー */}
              <div className="border-b border-[#F2ECE0] dark:border-[#22303D] pb-3 sm:pb-4">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-widest">
                  {stage.subtitle}
                </span>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
                  {stage.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1.5 sm:mt-2 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* 講義カード一覧 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
                {stageLectures.map((lec) => (
                  <div
                    key={lec.id}
                    onClick={() => {
                      if (lec.isPublished) handleSelectLecture(lec);
                    }}
                    className={`p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                      lec.isPublished
                        ? "bg-[#FAF8F5] dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md cursor-pointer group"
                        : "bg-[#F9F7F3]/50 dark:bg-[#10161C]/50 border-dashed border-[#DDD6C5] dark:border-[#22303D] opacity-80 cursor-not-allowed"
                    }`}
                  >
                    <div>
                      {/* バッジと講義時間 */}
                      <div className="flex items-center justify-between text-xs mb-2.5 sm:mb-3">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] ${
                            lec.isPublished
                              ? "bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                              : "bg-[#EAE4D5] dark:bg-[#1E2B36] text-[#737C77] dark:text-[#8899A6]"
                          }`}
                        >
                          {lec.isPublished ? "開講中（受講可能）" : "順次開講"}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] sm:text-xs text-[#737C77] dark:text-[#8899A6]">
                          <Clock className="w-3 h-3" />
                          <span>約 {lec.duration}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug mb-1.5 sm:mb-2">
                        {lec.title}
                      </h3>
                      <p className="text-xs text-[#737C77] dark:text-[#8899A6] mb-2 sm:mb-3">
                        {lec.subtitle}
                      </p>

                      {lec.whatYouWillLearn && (
                        <div className="space-y-1 text-xs bg-white/70 dark:bg-[#1A2632]/60 p-2.5 rounded-lg border border-[#EDE7DC] dark:border-[#23303D] mb-3">
                          <div className="text-[#59615D] dark:text-[#A0B0BC]">
                            <strong className="text-[#1E3D34] dark:text-[#83BEA8] font-semibold">学ぶ内容:</strong>{" "}
                            {lec.whatYouWillLearn.topics}
                          </div>
                          <div className="text-[#232826] dark:text-[#FAF8F5]">
                            <strong className="text-[#B86924] dark:text-[#E6C387] font-semibold">できること:</strong>{" "}
                            {lec.whatYouWillLearn.canDo}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3 mb-3 sm:mb-4">
                        {lec.summary}
                      </p>
                    </div>

                    <div className="pt-2.5 sm:pt-3 border-t border-[#EDE7DC] dark:border-[#22303D] flex items-center justify-between text-xs">
                      {lec.isPublished ? (
                        <>
                          <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>講義を受講する</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-[#737C77] dark:text-[#8899A6]">
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
          );
        })}
      </div>

      {/* 学術深化・東洋医学自然科学講義録アーカイブ */}
      <section className="bg-gradient-to-r from-[#EBF3EF]/60 via-[#FAF8F5] to-[#FCF4EB]/60 dark:from-[#172621]/60 dark:via-[#17212A] dark:to-[#221F1A]/60 rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-10 space-y-4 sm:space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Advanced Academic Lectures & Natural Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              学術深化：東洋医学の自然科学的機序を深掘りする学術記事
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-1 leading-relaxed max-w-2xl">
              東洋医学の歴史的誕生（システム同定）から、陰陽五行（二値モデル・多要素制御）、気血津液（生体ダイナミクス・微小循環）まで、自然科学・複雑系科学の言葉で再定義した学術知見アーカイブです。
            </p>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>論文・学術アーカイブ一覧へ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 東洋医学史 */}
          <Link
            href="/articles?article=science-of-oriental-medicine-history"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 18分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【東洋医学史】ブラックボックス解析としての経験医学
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                『黄帝内経』のネットワーク階層構造、二千年におよぶ経験医学と科学的医学（RCT・EBM）の相違、日本漢方・管鍼法・腹診の適応進化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 陰陽五行 */}
          <Link
            href="/articles?article=science-of-yinyang-gogyo"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 22分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【陰陽五行の科学】二値モデルと五つの機能ネットワーク
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                二値分類と情報圧縮、陰陽四原則（拮抗制御・負のフィードバック・相転移）、寒熱表裏虚実の状態空間、相生・相剋・相乗・相侮の制御工学。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 気血津液 */}
          <Link
            href="/articles?article=science-of-qi-blood-fluid"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 20分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【気血津液の科学】人体のシステムダイナミクス
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                創発としての気、気の五大機能、気虚気滞気逆気陥、濡養と微小循環、体液コンパートメントとリンパ系、三位一体の共鳴ループ。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 鍼灸の科学 */}
          <Link
            href="/articles?article=science-of-acupuncture-neuroscience"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#8A948F] dark:text-[#6A7C8B]">約 25分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【鍼灸の科学】生体情報制御学としての鍼灸医学
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                メカノトランスダクション、細胞外ATP/アデノシン、ゲート制御とPAG-RVM下行性疼痛抑制、自律神経HRV、炎症反射、刺激パラメータ。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 漢方医学の科学 */}
          <Link
            href="/articles?article=science-of-kampo-network-pharmacology"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 20分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【漢方医学の科学】状態空間への多点介入
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                同病異治・異病同治、君臣佐使の制御工学（多入力MIMO）、証のベイズ推論モデル、ネットワーク薬理学、大建中湯・六君子湯のエビデンス。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* 東西医学の統合と人体統一理論 */}
          <Link
            href="/articles?article=east-west-integrative-unified-theory"
            className="bg-[#FFFFFF] dark:bg-[#1A2632] p-5 rounded-2xl border border-[#E8E1D1] dark:border-[#2D3E50] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-end text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">約 19分</span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-relaxed tracking-normal">
                【人体統一理論】東西二大モデルの統合
              </h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3">
                モデル依存実在論、17層構造における高次機能統合モデル、証・気・経絡のコンセンサス、閉ループ制御工学、データ医学・AIへの進化。
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
              <span>記事全文を読む</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
