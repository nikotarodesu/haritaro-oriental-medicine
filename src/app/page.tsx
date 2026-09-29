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
import PrimeStudentCard from "@/components/PrimeStudentCard";
import HomeHeroQuickSearch from "@/components/home/HomeHeroQuickSearch";
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

          {/* 2大入口カード（PC: 横並び、スマホ: 縦並び） */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* 入口1: 学び（学生・学び直したい方へ） */}
            <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] text-xs font-bold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>学生・学び直したい方へ</span>
                  </div>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">基礎から学ぶ</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                  基礎を体系的に学び、国試に備える
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽五行から始まる全81講義カリキュラム、要穴・骨度寸法の集中特訓、忘却曲線デイリー復習、国試精選演習。
                </p>
              </div>

              {/* 案内ハブへの主ボタン ＆ 副リンク */}
              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2.5">
                <Link
                  href="/learn"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E2D3D] dark:bg-[#7BAAD8] text-white dark:text-[#121920] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                >
                  <span>学びの総合案内を開く</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/curriculum"
                    className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E2D3D] text-[#1E2D3D] dark:text-[#7BAAD8] font-semibold text-center truncate transition-colors"
                  >
                    カリキュラム全8章
                  </Link>
                  <Link
                    href="/kokushi"
                    className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#B86924] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
                  >
                    国試演習ハブ
                  </Link>
                </div>
              </div>
            </div>

            {/* 入口2: 実践（鍼灸師の方へ） */}
            <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/25 dark:border-[#74BA9E]/30 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>鍼灸師の方へ</span>
                  </div>
                  <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">臨床で活かす</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                  弁証と配穴を整理し、臨床に残す
                </h2>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  八綱・気血水・臓腑の弁証推論、本治標治の配穴設計、施術直後の変化や次回課題を蓄積する臨床ノート。
                </p>
              </div>

              {/* 臨床LPへの主ボタン ＆ 副リンク */}
              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] space-y-2.5">
                <Link
                  href="/clinical"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E3D34] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#2B5A46] transition-colors"
                >
                  <span>臨床ツールの使い方・案内を見る</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/simulator"
                    className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] font-semibold text-center truncate transition-colors"
                  >
                    弁証推論・2案比較
                  </Link>
                  <Link
                    href="/practice/haiketsu"
                    className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] hover:border-[#B86924] text-[#B86924] dark:text-[#E6C387] font-semibold text-center truncate transition-colors"
                  >
                    配穴設計ツール
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3. よく使う機能への短いリンク群 */}
          <div className="pt-2 max-w-5xl mx-auto">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] uppercase tracking-wider">
                よく使う機能へ直接アクセス
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              <Link
                href="/tsubo"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                  経穴辞典
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">全361穴・解剖</span>
              </Link>

              <Link
                href="/simulator"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                  弁証推論
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">主証＋兼証推論</span>
              </Link>

              <Link
                href="/practice/haiketsu"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#B86924] dark:hover:border-[#E6C387] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387]">
                  配穴設計
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">本治・標治バランス</span>
              </Link>

              <Link
                href="/kokushi"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#B86924] dark:hover:border-[#E6C387] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2016] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387]">
                  国試演習
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">過去問・特訓ドリル</span>
              </Link>

              <Link
                href="/review"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8]">
                  今日の復習
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">忘却曲線定着</span>
              </Link>

              <Link
                href="/notes"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#17212A]/80 border border-[#E8E1D1] dark:border-[#263542] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E]">
                  マイノート
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">臨床ノート・配穴</span>
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
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider">
            Learning to Practice
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            学びと実践がつながる、ひとつの思考フロー
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC]">
            基礎理論を学ぶだけで終わらせず、臨床推論、処方設計、振り返りまでを一貫して深められます。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 relative">
            <span className="font-mono text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] bg-[#EAEFF5] dark:bg-[#152331] px-2 py-0.5 rounded">
              STEP 1
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              理論を構造で理解する
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              気血水・陰陽五行・臓腑経絡の動態モデルを全81講義カリキュラムで学びます。
            </p>
            <div className="pt-2">
              <Link href="/curriculum" className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] hover:underline">
                カリキュラムへ →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 relative">
            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2 py-0.5 rounded">
              STEP 2
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              所見から弁証を推論する
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              症状・四診所見から証名を導出。主証70%＋兼証30%の複合推論や2案比較で鑑別します。
            </p>
            <div className="pt-2">
              <Link href="/simulator" className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline">
                シミュレーターへ →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 relative">
            <span className="font-mono text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A2016] px-2 py-0.5 rounded">
              STEP 3
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              本治・標治の配穴を設計
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              選定した経穴のバランスを点検。解剖学的安全深度を確認しながら処方を決定します。
            </p>
            <div className="pt-2">
              <Link href="/practice/haiketsu" className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] hover:underline">
                配穴設計へ →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#17212A] p-5 rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2.5 relative">
            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2 py-0.5 rounded">
              STEP 4
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              臨床ノートに記録・振り返り
            </h3>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              結果を下書き保存。施術直後の変化を添えて蓄積し、患者用養生シートを印刷します。
            </p>
            <div className="pt-2">
              <Link href="/notes" className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline">
                臨床ノートへ →
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

      {/* 7. 学生向け案内（Prime Student） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrimeStudentCard variant="banner" />
      </section>
    </div>
  );
}
