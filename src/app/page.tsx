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
  BookOpen
} from "lucide-react";
import SeasonalBanner from "@/components/SeasonalBanner";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import PrimeStudentCard from "@/components/PrimeStudentCard";
import EightSystemsRoadmap from "@/components/EightSystemsRoadmap";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. ヒーロー（紹介と開始／再開） */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-6 sm:pt-10 pb-8 sm:pb-12 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative space-y-6 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* 対象者バッジ */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸学生・鍼灸師のための学習サイト</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学が、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                つながる。
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              陰陽・五行から、弁証・治療まで。<br className="hidden sm:inline" />
              学んだ知識を、考える力へ。
            </p>
          </div>

          {/* 1.1 学習進捗カード（初回は「最初のレッスン」、受講中は「続きから学ぶ」） */}
          <div className="max-w-4xl mx-auto">
            <HomeLearningProgressCard />
          </div>

          {/* 2. 目的から選ぶ4つの入口（PC: 4列、スマホ: 2列×2段） */}
          <div className="pt-2 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {/* 1. 学ぶ */}
            <Link
              href="/curriculum"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#74BA9E]/25 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[#1E3D34] dark:text-[#74BA9E]">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold font-serif">学ぶ</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug">
                  東洋医学を学ぶ
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽・五行から、弁証・治療まで順番に。
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span>カリキュラムを見る</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. 調べる */}
            <Link
              href="/tsubo"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/25 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[#1E2D3D] dark:text-[#7BAAD8]">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold font-serif">調べる</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors leading-snug">
                  経穴を調べる
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  名前・部位・経脈から、知りたい経穴へ。
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span>経穴辞典を開く</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. 演習する */}
            <Link
              href="/cases"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#B86924]/20 dark:border-[#E6C387]/25 hover:border-[#B86924] dark:hover:border-[#E6C387] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387]">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold font-serif">演習する</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors leading-snug">
                  症例で考える
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  所見を読み、弁証と配穴を考える練習。
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                <span>症例演習を始める</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. 記録する（マイノート） */}
            <Link
              href="/notes"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#285A52]/20 dark:border-[#6EC5B8]/25 hover:border-[#285A52] dark:hover:border-[#6EC5B8] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[#285A52] dark:text-[#6EC5B8]">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold font-serif">記録する</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#285A52] dark:group-hover:text-[#6EC5B8] transition-colors leading-snug">
                  臨床を記録する
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  弁証・配穴・施術後の変化をマイノートに。
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#285A52] dark:text-[#6EC5B8]">
                <span>マイノートを開く</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 臨床家向け：マイノート紹介ブロック */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* 左側：説明・3つの価値・ボタン */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E3D34]/10 dark:bg-[#74BA9E]/15 text-[#1E3D34] dark:text-[#74BA9E] border border-[#1E3D34]/20 dark:border-[#74BA9E]/30">
                <FileText className="w-3.5 h-3.5" />
                <span>臨床記録・振り返りツール</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-snug">
                  臨床の記録を、次の施術に生かす。
                </h2>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  弁証・配穴・施術後の変化をひとつに。振り返りにも、患者さんに渡す養生シートにも。
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
                無料で臨床ノート3件・配穴20件まで。続けて蓄積したい方にはプレミアム。
              </p>

              {/* アクションボタン */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/notes"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>マイノートを無料で試す</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline px-3 py-2"
                >
                  <span>プレミアムの料金を見る</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 保存先に関する注記 */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#737C77] dark:text-[#8899A6] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] shrink-0" />
                <span>※記録はこの端末・ブラウザに保存されます。自動同期には対応していません。</span>
              </div>
            </div>

            {/* 右側：完成見本プレビュー（架空のサンプル） */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] px-1">
                <span className="font-semibold">マイノート完成イメージ</span>
                <span>※架空のサンプル見本</span>
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

      {/* 4. 学習の全体像（8章ロードマップ） */}
      <EightSystemsRoadmap />

      {/* 5. 読みもの・更新情報 */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
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

      {/* 6. 運営者と情報の扱い */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
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

      {/* 7. 一般の方向けセルフケア（独立した小さなまとまり） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4">
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
      </section>

      {/* 8. 補助情報：学生向けサポート・PR広告（最下部へ移動） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2">
        <PrimeStudentCard variant="banner" />
      </section>
    </div>
  );
}
