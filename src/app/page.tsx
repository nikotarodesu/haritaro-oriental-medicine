import Link from "next/link";
import { 
  GraduationCap, 
  Compass, 
  Stethoscope, 
  FileText,
  ArrowRight, 
  Sparkles, 
  Bell,
  HeartPulse,
  Activity,
  CheckCircle2,
  Printer,
  History,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  SlidersHorizontal,
  Layers,
  ArrowDown
} from "lucide-react";
import SeasonalBanner from "@/components/SeasonalBanner";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import EightSystemsRoadmap from "@/components/EightSystemsRoadmap";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 2. ヒーロー ＋ 2つの入口 */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-8 sm:pt-12 pb-10 sm:pb-14 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6 sm:space-y-8">
          {/* ヒーローメインコピー */}
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* 対象者バッジ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸師・鍼灸学生のための学習と臨床活用サイト</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学が、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                つながる。
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              基礎を学ぶ。弁証・配穴を考える。日々の臨床を記録する。
            </p>
          </div>

          {/* 2つの入口カード（PC: 横2列、スマホ: 縦2枚） */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* 臨床の入口 */}
            <a
              href="#clinical-tools"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/25 dark:border-[#74BA9E]/30 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>鍼灸師・臨床家の方へ</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  臨床で活用したい
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  状態を整理し、弁証・配穴を考え、臨床ノートに残す。
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span className="flex items-center gap-1.5">
                  <span>臨床で使うツールを見る</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6] font-normal">
                  体質・五労・弁証・配穴
                </span>
              </div>
            </a>

            {/* 学習の入口 */}
            <a
              href="#learning-contents"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/25 dark:border-[#7BAAD8]/30 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>鍼灸学生・学び直したい方へ</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors leading-snug">
                  基礎から学びたい
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽・五行から順番に学び、問題や症例で理解を確かめる。
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs sm:text-sm font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span className="flex items-center gap-1.5">
                  <span>学習コンテンツを見る</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6] font-normal">
                  カリキュラム・辞典・問題・症例
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. 続きから使う（再訪者向け：実際の履歴がある場合だけ小さく表示） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeLearningProgressCard />
      </section>

      {/* 4. 臨床で活用する（アンカー: #clinical-tools） */}
      <section id="clinical-tools" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* セクションヘッダー */}
        <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床で活用する
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            状態の整理から、弁証・配穴の検討、記録まで。
          </p>
        </div>

        {/* 4ツールのカード（PC: 2列×2行、スマホ: 1列） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* ツール1: 気血水体質チェック */}
          <Link
            href="/diagnosis"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Sparkles className="w-3 h-3" />
                  <span>状態を整理する</span>
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">12問チェック</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                気血水体質チェック
              </h3>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                気・血・水の視点から、体調を振り返るきっかけに。気虚・気滞・血虚・瘀血・水滞の傾向と推奨経穴を確認できます。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <span>気血水をチェックする</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール2: 五労チェッカー */}
          <Link
            href="/diagnosis?tab=gorou"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387]">
                  <Activity className="w-3 h-3" />
                  <span>生活を振り返る</span>
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">五臓の疲弊度</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                五労チェッカー
              </h3>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                日々の過ごし方や負担を、五労の視点から振り返る。久視・久坐・久立などの偏った姿勢から五臓疲労と中庸アクションを点検。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>五労をチェックする</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール3: 臨床弁証シミュレーター */}
          <Link
            href="/simulator"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Layers className="w-3 h-3" />
                  <span>弁証を考える</span>
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">八綱・気血水・臓腑</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                臨床弁証シミュレーター
              </h3>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                症状や所見を整理し、弁証を検討する補助に。八綱・気血水・臓腑経絡の連動から一文の証名と最小構成のペアツボを推論。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <span>弁証を考える</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール4: 配穴設計 */}
          <Link
            href="/practice/haiketsu"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387]">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>配穴を組み立てる</span>
                </span>
                <span className="text-xs text-[#737C77] dark:text-[#8899A6]">基本32穴演習</span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                配穴設計
              </h3>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                治療方針に沿って、配穴を検討する。基本32穴から本治穴・標治穴を選定し、選定意図を整理して臨床推論力を高めます。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>配穴を考える</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 4.2 臨床ノートへの橋渡し（マイノート紹介） */}
        <div className="bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* 左側：説明・3つの価値・ボタン */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E3D34]/10 dark:bg-[#74BA9E]/15 text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/20 dark:border-[#74BA9E]/30">
                <FileText className="w-3.5 h-3.5" />
                <span>マイノート｜臨床ノート</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-snug">
                  考えたことを、次の臨床に残す。
                </h3>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  弁証や配穴、施術後の変化を臨床ノートにまとめ、次回の振り返りに。患者さんに渡す養生シートも作成できます。
                </p>
              </div>

              {/* 3つの主要価値 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>記録する</span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    弁証・配穴・直後の変化をワンストップで蓄積。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                    <History className="w-4 h-4 shrink-0" />
                    <span>振り返る</span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    患者番号・主訴・使用経穴から瞬時に検索・比較。
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#285A52] dark:text-[#6EC5B8]">
                    <Printer className="w-4 h-4 shrink-0" />
                    <span>渡す</span>
                  </div>
                  <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                    患者用A4養生シートをワンクリックで印刷・共有。
                  </p>
                </div>
              </div>

              {/* 無料枠とプレミアム案内 */}
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC]">
                無料で臨床ノート3件・配穴20件まで保存可能。続けて蓄積したい方にはプレミアム（500件）を用意しています。
              </p>

              {/* アクションボタン */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/notes"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>臨床ノートを試す</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline px-3 py-2"
                >
                  <span>プレミアムの内容を見る</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 保存先に関する注記 */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#737C77] dark:text-[#8899A6] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>※お使いの端末（ブラウザ）に安全保存。無料ログインでクラウド自動同期にも対応。実名は非保持の完全匿名設計です。</span>
              </div>
            </div>

            {/* 右側：完成見本プレビュー（架空のサンプル） */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] px-1">
                <span className="font-semibold">臨床ノート完成イメージ</span>
                <span>※架空の記入例</span>
              </div>

              <div className="bg-white dark:bg-[#121920] rounded-2xl border border-[#EDE7D8] dark:border-[#22303D] p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#F2ECE0] dark:border-[#22303D] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2 py-0.5 rounded">
                      PT-012
                    </span>
                    <span className="text-xs font-semibold text-[#232826] dark:text-[#FAF8F5]">
                      デスクワークによる頭痛・眼精疲労
                    </span>
                  </div>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">2026.03.20</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#17212A] border border-[#F2ECE0] dark:border-[#22303D]">
                    <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">弁証</span>
                    <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">肝陽上亢・気機不暢</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#17212A] border border-[#F2ECE0] dark:border-[#22303D]">
                    <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block">体質見立て</span>
                    <span className="font-bold text-[#B86924] dark:text-[#E6C387]">気滞・肝鬱化火</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#59615D] dark:text-[#A0B0BC]">採用配穴</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["太衝", "陽陵泉", "風池", "百会"].map((pt) => (
                      <span
                        key={pt}
                        className="px-2 py-0.5 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold border border-[#C5DED4] dark:border-[#2A5243]"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-[#59615D] dark:text-[#A0B0BC]">施術後の変化</span>
                  <p className="text-[#4A534F] dark:text-[#A8B8C4] text-xs leading-relaxed bg-[#FAF8F5] dark:bg-[#17212A] p-2.5 rounded-lg border border-[#F2ECE0] dark:border-[#22303D]">
                    施術直後より後頭部の締め付け感が消失。目の開けやすさを自覚。次回は睡眠リズムの改善を確認予定。
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] text-[#737C77] dark:text-[#8899A6]">
                  <span className="flex items-center gap-1 text-[#285A52] dark:text-[#6EC5B8] font-bold">
                    <Printer className="w-3.5 h-3.5" />
                    <span>A4養生シート印刷対応</span>
                  </span>
                  <Link href="/notes" className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline">
                    見本を開いて試す →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 臨床セクション末尾の回遊リンク */}
        <div className="text-right pt-1">
          <a
            href="#learning-contents"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1E2D3D] dark:text-[#7BAAD8] hover:underline"
          >
            <span>基礎を学び直したい方へ（学習カリキュラムへ）</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 5. 基礎から学ぶ（アンカー: #learning-contents） */}
      <section id="learning-contents" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* セクションヘッダー */}
        <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Learning Contents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            基礎から、順番に学ぶ。
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            理論を学び、調べ、問題や症例で理解を確かめる。
          </p>
        </div>

        {/* 主役：学習カリキュラム（大型カード） */}
        <div className="bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border-2 border-[#1E3D34]/30 dark:border-[#74BA9E]/30 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
                <span>初めての方は、陰陽論から</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
                東洋医学 基礎学習カリキュラム
              </h3>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                陰陽論・五行論から、気血水・蔵象学説・経絡経穴、そして病因病機・弁証論治まで。丸暗記ではなく、身体の動態システムとして東洋医学を体系的に身につける全8章の本格カリキュラムです。
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] font-bold text-sm shadow-md transition-all whitespace-nowrap"
              >
                <span>基礎から学び始める</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/curriculum?chapter=1"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline px-3 py-2 text-center"
              >
                <span>第1章 陰陽論を開く →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 補助カード3枚（PC: 3列、スマホ: 1列） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* 補助1: 経穴を調べる */}
          <Link
            href="/tsubo"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#1E2D3D] dark:text-[#7BAAD8]">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">調べる</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors">
                経穴・用語を調べる
              </h4>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                十四経脈・361穴および奇穴を網羅。部位・経脈・主治からすばやく検索・確認できます。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
              <span>経穴辞典を開く</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 補助2: 問題で確かめる */}
          <Link
            href="/curriculum"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387]">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">確かめる</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                問題で確かめる
              </h4>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                各レッスンの末尾に理解度チェッククイズを設置。学んだ知識の定着度を即座に確認できます。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>クイズに挑戦する</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 補助3: 症例で考える */}
          <Link
            href="/cases"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#285A52] dark:hover:border-[#6EC5B8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#285A52] dark:text-[#6EC5B8]">
                <Stethoscope className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">演習する</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#285A52] dark:group-hover:text-[#6EC5B8] transition-colors">
                症例で考える
              </h4>

              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                模擬患者の四診所見を読み解き、弁証から配穴選定までの臨床推論ステップを実践練習。
              </p>
            </div>

            <div className="pt-3.5 mt-3.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#285A52] dark:text-[#6EC5B8]">
              <span>症例演習を始める</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 8章ロードマップ（全体像） */}
        <EightSystemsRoadmap />

        {/* 学習セクション末尾の回遊リンク */}
        <div className="text-right pt-1">
          <a
            href="#clinical-tools"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
          >
            <span>臨床での活用も見てみる（臨床ツールへ）</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 6. 更新情報・おすすめ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 更新情報（最大3行、日付・内容・遷移先） */}
          <div className="lg:col-span-5 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  更新情報
                </h2>
              </div>
              <span className="text-xs text-[#737C77] dark:text-[#8899A6]">改訂履歴</span>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/tsubo"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.25</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    経穴辞典
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  詳細32穴の精密解剖図・取穴・刺鍼深度を検証
                </p>
              </Link>

              <Link
                href="/curriculum"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.20</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    カリキュラム
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  全81レッスンの学習ゴール・目次構成を整理
                </p>
              </Link>

              <Link
                href="/cases"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.15</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    症例演習
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  臨床推論ステップ演習（全20症例・無料体験3症例）
                </p>
              </Link>
            </div>
          </div>

          {/* おすすめ記事（最大3件） */}
          <div className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  東洋医学を深める読みもの
                </h2>
              </div>
              <Link
                href="/articles"
                className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
              >
                記事一覧へ →
              </Link>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/articles/science-of-yinyang-gogyo"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    古典深読み
                  </span>
                  <span>読了目安 約22分</span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  陰陽五行の科学：動的平衡とシステム制御理論
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-1 mt-0.5">
                  二値モデルと五大機能ネットワークによるホメオスタシス理解
                </p>
              </Link>

              <Link
                href="/articles/science-of-qi-blood-fluid"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    基礎理論
                  </span>
                  <span>読了目安 約18分</span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  気血津液の生体工学：エネルギー代謝と体液循環
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-1 mt-0.5">
                  三層実体の協調メカニズムと虚損・鬱滞の破綻モデル
                </p>
              </Link>

              <Link
                href="/articles/science-of-oriental-medicine-history"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    医学史
                  </span>
                  <span>読了目安 約20分</span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  東洋医学と現代科学の歴史：経験知から検証可能な体系へ
                </h3>
                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-1 mt-0.5">
                  古代の身体観から近代の生理学・システム医学への接続
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 運営者・編集方針 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-start">
            {/* 運営者情報（2〜3行＋詳しい紹介へのリンク） */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                Operator
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                運営者：はり太郎（鍼灸師）
              </h3>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                人体の構造と思考体系を初学者から臨床家まで直感的に学べる場を目指して制作しています。用語の丸暗記を脱却し、臨床で使える思考力を育てます。
              </p>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1"
                >
                  <span>運営者の詳しいプロフィール・制作理念を見る</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 編集方針・エビデンス要約 */}
            <div className="space-y-2 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D]">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] uppercase tracking-wider">
                Evidence & Policy
              </span>
              <h4 className="font-serif text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                情報公開方針とエビデンス
              </h4>
              <p className="text-[11px] sm:text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                WHO標準経穴部位、新版東洋医学概論・経絡経穴概論、中医基礎理論、および国内外の学術論文を参照して制作しています。
              </p>
              <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] pt-1 border-t border-[#E8E1D1] dark:border-[#22303D]">
                ※本サイトは学習・臨床推論の支援を目的としており、個別診断や医療行為を代替するものではありません。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 補助情報・セルフケア・PR広告 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] tracking-wider uppercase">
              Self Care
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              日常のセルフケア・体質チェック
            </h2>
          </div>
          <Link
            href="/diagnosis"
            className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
          >
            <span>体質チェックへ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 二十四節気バナー */}
        <SeasonalBanner />

        {/* 3つのセルフケアリンク */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/diagnosis"
            className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <Sparkles className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
              <h3 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                気血水 体質チェック
              </h3>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気虚・気滞・瘀血などの体質傾向と養生のヒントを確認。
            </p>
          </Link>

          <Link
            href="/diagnosis?tab=gorou"
            className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <h3 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                五労チェッカー
              </h3>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              久視・久坐など、生活習慣による五臓の疲労を点検。
            </p>
          </Link>

          <Link
            href="/symptoms"
            className="p-3.5 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] transition-all group space-y-1"
          >
            <div className="flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
              <HeartPulse className="w-4 h-4 text-[#A83629] dark:text-[#E6C387]" />
              <h3 className="font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                症状別セルフケア
              </h3>
            </div>
            <p className="text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              肩こり・頭痛・冷えなど、不調へのツボ押しガイド。
            </p>
          </Link>
        </div>

        {/* ページ最下部：PR広告（主要導線の邪魔にならない位置） */}
        <div className="pt-4">
          <PrimeStudentCard variant="banner" />
        </div>
      </section>
    </div>
  );
}
