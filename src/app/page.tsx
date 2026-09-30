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
  RotateCcw,
  Library,
  MapPin
} from "lucide-react";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";
import HomeHeroQuickSearch from "@/components/home/HomeHeroQuickSearch";
import HomeWelcomeGuide from "@/components/home/HomeWelcomeGuide";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";

export default function HomePage() {
  const { limits } = SUBSCRIPTION_CONFIG;

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. ヒーロー ＋ 2大主入口（学び ／ 実践） */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-8 sm:pt-12 pb-10 sm:pb-14 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6 sm:space-y-8">
          {/* ヒーローメインコピー */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸学生・鍼灸師のための東洋医学 学習・実践サイト</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学の「わかる」を、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                臨床の「考えられる」へ。
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-xs sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              基礎学習から弁証・配穴、日々の振り返りまで。学生の学びと臨床家の実践をひとつの場所で自然につなぎます。
            </p>

            {/* クイック経穴・症状検索バー */}
            <HomeHeroQuickSearch />
          </div>

          {/* 初見ユーザー向け30秒ウェルカムガイド（LocalStorage保存で次回非表示） */}
          <div className="max-w-5xl mx-auto">
            <HomeWelcomeGuide />
          </div>

          {/* 2大入口カード（PC: 横並び、スマホ: 縦並び。枠線の圧迫を減らし、箇条書きで即座に読める構成へ） */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* 入口1: 学び（学生・学び直したい方へ） */}
            <div className="bg-white/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#D5DFE8] dark:border-[#243545] p-5 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>学生・学び直したい方へ</span>
                  </div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">基礎から学ぶ</span>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                    基礎を体系的に学び、国試に備える
                  </h2>
                </div>

                {/* 流し見（スキャン）できる箇条書き構成 */}
                <ul className="space-y-2 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">全81講義カリキュラム:</strong> 陰陽五行・気血水・臓腑経絡を網羅</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">要穴・骨度寸法ドリル:</strong> 14経脈の取穴をクイズで定着</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E2D3D] dark:text-[#7BAAD8] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">忘却曲線＆国試精選演習:</strong> 日替わり復習で本番得点力を強化</span>
                  </li>
                </ul>
              </div>

              {/* 案内ハブへの主ボタン ＆ 副リンク */}
              <div className="pt-5 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-3">
                <Link
                  href="/learn"
                  className="w-full py-3 px-4 rounded-xl bg-[#1E2D3D] hover:bg-[#152331] dark:bg-[#7BAAD8] dark:hover:bg-[#90BDF0] text-white dark:text-[#121920] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>学びの総合案内を開く</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/curriculum"
                    className="py-2 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EAEFF5] dark:hover:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] font-semibold text-center truncate transition-colors"
                  >
                    カリキュラム全8章
                  </Link>
                  <Link
                    href="/kokushi"
                    className="py-2 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#FCF4EB] dark:hover:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
                  >
                    国試演習ハブ
                  </Link>
                </div>
              </div>
            </div>

            {/* 入口2: 実践（鍼灸師の方へ） */}
            <div className="bg-white/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#CCE2D8] dark:border-[#224035] p-5 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                    <Stethoscope className="w-4 h-4" />
                    <span>鍼灸師の方へ</span>
                  </div>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">臨床で活かす</span>
                </div>

                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                    調べる・問診する・臨床に残す
                  </h2>
                </div>

                {/* 流し見（スキャン）できる箇条書き構成 */}
                <ul className="space-y-2 text-xs sm:text-sm text-[#404743] dark:text-[#C5D2DB]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">対面問診＆患者説明:</strong> 愁訴・体質所見から病態を即座に整理</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">3段階 弁証推論:</strong> 八綱・気血水・臓腑から本治標治を設計</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                    <span><strong className="text-[#232826] dark:text-[#FAF8F5]">臨床カルテ蓄積:</strong> 施術後の変化を記録・A4養生シート印刷</span>
                  </li>
                </ul>
              </div>

              {/* 臨床LPへの主ボタン ＆ 副リンク */}
              <div className="pt-5 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-3">
                <Link
                  href="/clinical"
                  className="w-full py-3 px-4 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>臨床ツールの使い方・案内を見る</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <Link
                    href="/diagnosis?tab=clinical"
                    className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-semibold text-center truncate transition-colors"
                  >
                    対面問診
                  </Link>
                  <Link
                    href="/simulator"
                    className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#EBF3EF] dark:hover:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] font-semibold text-center truncate transition-colors"
                  >
                    弁証推論
                  </Link>
                  <Link
                    href="/notes"
                    className="py-2 px-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] hover:bg-[#FCF4EB] dark:hover:bg-[#281E15] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
                  >
                    臨床ノート
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3. よく使う機能へのダイレクトアクセス（視覚ノイズを抑えたミニマルタイル） */}
          <div className="pt-3 max-w-5xl mx-auto">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-[#59615D] dark:text-[#A8B8C4] tracking-wide">
                よく使う機能へ直接アクセス
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              <Link
                href="/tsubo"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate max-w-full">
                  経穴辞典
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">全361穴・解剖</span>
              </Link>

              <Link
                href="/simulator"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate max-w-full">
                  弁証推論
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">主証＋兼証推論</span>
              </Link>

              <Link
                href="/practice/haiketsu"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] truncate max-w-full">
                  配穴設計
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">本治・標治</span>
              </Link>

              <Link
                href="/kokushi"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] truncate max-w-full">
                  国試演習
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">過去問・演習</span>
              </Link>

              <Link
                href="/tsubo/practice"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EBF3EF] dark:bg-[#1C332A] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate max-w-full">
                  経穴ドリル
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">14経脈特訓</span>
              </Link>

              <Link
                href="/notes"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] truncate max-w-full">
                  マイノート
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">臨床・配穴</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 継続利用者の「続きから」（履歴がある時のみ表示される安全コンポーネント） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeLearningProgressCard />
      </section>

      {/* 4. 学びから実践へのつながりを示す具体例（思考プロセス図） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            Learning to Practice
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            学びと実践がつながる、ひとつの思考フロー
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            基礎理論を学ぶだけで終わらせず、臨床推論、処方設計、カルテ蓄積までを一貫して深められます。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#EBE3D3] dark:border-[#263747] transition-all">
            <span className="font-mono text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] bg-[#EAEFF5] dark:bg-[#152331] px-2.5 py-1 rounded-md">
              STEP 1
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              理論を構造で理解する
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気血水・陰陽五行・臓腑経絡の動態モデルを全81講義カリキュラムで体系的に習得。
            </p>
            <div className="pt-1">
              <Link href="/curriculum" className="text-xs sm:text-sm font-bold text-[#1E2D3D] dark:text-[#7BAAD8] hover:underline inline-flex items-center gap-1">
                <span>カリキュラムへ</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#DCEBE2] dark:border-[#203D32] transition-all">
            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1 rounded-md">
              STEP 2
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              所見から弁証を推論する
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              四診所見から証名を導出。主証70%＋兼証30%の複合推論や2案比較で鑑別。
            </p>
            <div className="pt-1">
              <Link href="/simulator" className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1">
                <span>シミュレーターへ</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#F5E6D3] dark:border-[#3D2C1C] transition-all">
            <span className="font-mono text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A2016] px-2.5 py-1 rounded-md">
              STEP 3
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              本治・標治の配穴を設計
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              選定した経穴のバランスを点検。解剖学的安全深度・禁忌を確認しながら処方を決定。
            </p>
            <div className="pt-1">
              <Link href="/practice/haiketsu" className="text-xs sm:text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:underline inline-flex items-center gap-1">
                <span>配穴設計へ</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#DCEBE2] dark:border-[#203D32] transition-all">
            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1 rounded-md">
              STEP 4
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              臨床ノートに記録・振り返り
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              結果を下書き保存。施術直後の変化を添えて蓄積し、患者用A4養生シートを印刷。
            </p>
            <div className="pt-1">
              <Link href="/notes" className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1">
                <span>臨床ノートへ</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 更新情報・文献・読みもの */}
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
                href="/clinical"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.29</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    臨床LP
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  鍼灸師向け臨床ツール案内ページ（/clinical）を開設
                </p>
              </Link>

              <Link
                href="/learn"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.29</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    学び案内
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  基礎学習・国試・復習の総合案内ハブ（/learn）を開設
                </p>
              </Link>

              <Link
                href="/tsubo"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="font-mono">2026.09.28</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    経穴断面図
                  </span>
                </div>
                <p className="font-semibold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  井穴・指端部の局所解剖断面モデルを拡充
                </p>
              </Link>
            </div>
          </div>

          {/* おすすめ記事 ＆ 文献 */}
          <div className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  東洋医学を深める読みもの・文献
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/library"
                  className="text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:underline"
                >
                  古典条文
                </Link>
                <Link
                  href="/articles"
                  className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline"
                >
                  記事一覧 →
                </Link>
              </div>
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
              </Link>

              <Link
                href="/library"
                className="block p-3 rounded-xl bg-white dark:bg-[#121920] border border-[#EDE7D8] dark:border-[#22303D] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    文献アーカイブ
                  </span>
                  <span>古典・論文</span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  『素問』『霊枢』古典条文・RCT論文・運動器実例
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 運営者・編集方針案内 */}
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
    </div>
  );
}
