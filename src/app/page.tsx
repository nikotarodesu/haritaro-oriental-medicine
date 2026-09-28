import Link from "next/link";
import { 
  GraduationCap, 
  Compass, 
  Stethoscope, 
  FileText,
  ArrowRight, 
  Sparkles, 
  Bell,
  Activity,
  CheckCircle2,
  Printer,
  History,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  SlidersHorizontal,
  Layers,
  Award,
  GitCompare,
  Library,
  RotateCcw
} from "lucide-react";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import EightSystemsRoadmap from "@/components/EightSystemsRoadmap";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. ヒーロー ＋ 2大入口（学生・学習者 ／ 鍼灸師・臨床家） */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-8 sm:pt-12 pb-10 sm:pb-14 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6 sm:space-y-8">
          {/* ヒーローメインコピー */}
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* 対象者バッジ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸学生と臨床家のための、東洋医学の学習・実践サイト</span>
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

          {/* 2大ペルソナ別入口カード（PC: 横2列、スマホ: 縦2枚） */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* 1. 学生・学習者の方へ */}
            <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs font-bold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>学生・学習者の方へ</span>
                  </div>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">基礎学習・国試対策</span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                  基礎を体系的に学び、国試に備える
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽五行から始まる全81講義カリキュラム、要穴・骨度寸法の集中特訓、忘却曲線デイリー復習、国試精選演習。
                </p>
              </div>

              {/* 2つの直行リンク */}
              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Link
                  href="/curriculum"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] transition-all group/sub"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>基礎から学ぶ</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/sub:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/kokushi"
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#B86924] dark:hover:border-[#E6C387] text-xs font-bold text-[#B86924] dark:text-[#E6C387] transition-all group/sub"
                >
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>国試に備える</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/sub:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 2. 鍼灸師・臨床家の方へ */}
            <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/25 dark:border-[#74BA9E]/30 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>鍼灸師・臨床家の方へ</span>
                  </div>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">鑑別推論・処方設計・カルテ</span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                  臨床推論を深め、カルテ・配穴を記録する
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  八綱・気血水・臓腑の弁証推論、2案鑑別、本治標治の配穴設計、そして患者用養生シート印刷に対応した臨床ノート。
                </p>
              </div>

              {/* 3つの直行リンク */}
              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Link
                  href="/diagnosis"
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all group/sub"
                >
                  <span>状態を整理</span>
                  <ArrowRight className="w-3 h-3 group-hover/sub:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="#clinical-tools"
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all group/sub"
                >
                  <span>弁証・配穴</span>
                  <ArrowRight className="w-3 h-3 group-hover/sub:translate-x-0.5 transition-transform" />
                </a>

                <Link
                  href="/notes"
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] transition-all group/sub"
                >
                  <span>記録する</span>
                  <ArrowRight className="w-3 h-3 group-hover/sub:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 続きから使う（再訪者向け：実際の学習・操作履歴がある場合のみ表示） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeLearningProgressCard />
      </section>

      {/* 3. 臨床で活用する（臨床主要4ツール ＋ 臨床ノート見本・活用法） */}
      <section id="clinical-tools" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* セクションヘッダー */}
        <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床で活用する主要4ツール
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            状態の整理から、弁証・配穴の推論、日々の臨床ノートへの蓄積まで。
          </p>
        </div>

        {/* 臨床主要4ツールのカード（PC: 4列、タブレット: 2列、スマホ: 1列） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* ツール1: 気血水体質チェック */}
          <Link
            href="/diagnosis"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Sparkles className="w-3 h-3" />
                  <span>状態を整理</span>
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">12問点検</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                気血水チェック
              </h3>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                気虚・気滞・血虚・瘀血・水滞の偏りを即座に数値化。推奨経穴と生活指標を提示。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <span>体質をチェックする</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール2: 五労チェッカー */}
          <Link
            href="/diagnosis?tab=gorou"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387]">
                  <Activity className="w-3 h-3" />
                  <span>生活負担点検</span>
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">五臓の疲弊度</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                五労チェッカー
              </h3>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                久視・久坐・久立など生活動作の偏りから五臓の負担度を算出し、日常の改善点を整理。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>五労をチェックする</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール3: 弁証シミュレーター ＆ 2案比較 */}
          <Link
            href="/simulator"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E]">
                  <Layers className="w-3 h-3" />
                  <span>弁証推論</span>
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">八綱・気血・臓腑</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                弁証シミュレーター
              </h3>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                症状・所見から証名を導出。2つの仮説を左右並列で鑑別比較する「2案比較」にも対応。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <span>弁証を導出する</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* ツール4: 配穴設計 */}
          <Link
            href="/practice/haiketsu"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-[#FCF4EB] dark:bg-[#2A1E14] text-[#B86924] dark:text-[#E6C387]">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>配穴を組み立てる</span>
                </span>
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">本治・標治設計</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                配穴設計
              </h3>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                本治穴・標治穴のバランスを検証。選定根拠と配穴意図を整理し、臨床ノートへ直接下書き保存。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>配穴を設計する</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 臨床ノートへの橋渡し（見本・活用法・印刷） */}
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
                  弁証や配穴、施術後の変化を臨床ノートにまとめ、次回の振り返りに。患者さんに渡す養生シートも印刷できます。
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
                <span>※お使いの端末（ブラウザ）に安全保存。無料ログインでクラウド自動同期にも対応。直接の個人識別情報は保持しない設計です。</span>
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
      </section>

      {/* 4. 基礎から学ぶ（学習カリキュラム・復習・国試演習・経穴） */}
      <section id="learning-contents" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* セクションヘッダー */}
        <div className="space-y-2 border-b border-[#E8E1D1] dark:border-[#22303D] pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Learning & Examination</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            基礎から、体系的に学ぶ。
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            全81講義の体系的理論、要穴・骨度法特訓、そして忘却曲線に基づく日々の復習。
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
                東洋医学 基礎学習カリキュラム（全81講義）
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
                <span>第1章 陰陽論から学ぶ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/curriculum"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline px-3 py-2 text-center"
              >
                <span>全8章カリキュラム目次へ →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 補助カード4枚（PC: 4列、タブレット: 2列、スマホ: 1列） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 補助1: 経穴辞典 */}
          <Link
            href="/tsubo"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#1E2D3D] dark:text-[#7BAAD8]">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">調べる</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors">
                経穴辞典
              </h4>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                十四経脈・361穴および奇穴を網羅。WHO標準取穴法、解剖学的深度、主治を素早く確認。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
              <span>経穴辞典を開く</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 補助2: 今日の復習（忘却曲線） */}
          <Link
            href="/review"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387]">
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">定着演習</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                今日の復習
              </h4>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                エビングハウスの忘却曲線に基づき、学んだ講義の知識を日替わりで自動出題。長期記憶へ定着。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>今日の復習を解く</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 補助3: 国試対策ハブ */}
          <Link
            href="/kokushi"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387]">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">国家試験</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                国試精選演習
              </h4>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                東洋医学臨床論・概論の頻出論点演習。要穴・骨度寸法の集中特訓と講義連携解説。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              <span>国試ハブを開く</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 補助4: 臨床症例演習 */}
          <Link
            href="/cases"
            className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#285A52] dark:hover:border-[#6EC5B8] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[#285A52] dark:text-[#6EC5B8]">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold font-serif">症例演習</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#285A52] dark:group-hover:text-[#6EC5B8] transition-colors">
                臨床症例演習
              </h4>

              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                模擬患者の主訴・四診所見から、弁証推論と配穴選定のステップを実践形式で演習。
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#285A52] dark:text-[#6EC5B8]">
              <span>症例演習を解く</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 8章ロードマップ（全体像） */}
        <EightSystemsRoadmap />
      </section>

      {/* 5. 学術資料・文献アーカイブ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              <Library className="w-4 h-4" />
              <span>古典・学術エビデンス</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">
              文献・古典条文・運動器実例アーカイブ
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              『素問』『霊枢』『難経』の古典条文から、現代の臨床RCT論文、運動器疾患の治療実例までを横断検索・閲覧できます。
            </p>
          </div>
          <Link
            href="/library"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#121920] border border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] font-bold text-xs sm:text-sm hover:bg-[#EBF3EF] dark:hover:bg-[#182823] transition-colors"
          >
            <span>文献・実例を開く</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. 更新情報・読みもの */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 更新情報 */}
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
                  <span className="font-mono">2026.09.28</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    改善反映
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  下部メニューカスタマイズ機能・導線整理を反映
                </p>
              </Link>

              <Link
                href="/kokushi"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.28</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    国試演習
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  国試精選演習の出典表示是正・講義リンク照合
                </p>
              </Link>

              <Link
                href="/curriculum"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.25</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    カリキュラム
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  全81レッスンの学習ゴール・目次構成を整理
                </p>
              </Link>
            </div>
          </div>

          {/* おすすめ記事 */}
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
            {/* 運営者情報 */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <img
                src="/icon.png"
                alt="運営者 はり太郎"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-xs border border-[#D5CCBC] dark:border-[#2A3B4A] shrink-0"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
                  Operator
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  運営者：はり太郎（鍼灸師／鍼灸院院長）
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

      {/* 8. 学生・学習者向け案内（Prime Student） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrimeStudentCard variant="banner" />
      </section>
    </div>
  );
}
