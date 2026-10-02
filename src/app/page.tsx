import Link from "next/link";
import Image from "next/image";
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
import { ARTICLES } from "@/data/articleData";
import { TOOL_CATALOG } from "@/config/toolCatalog";
import { SITE_UPDATES } from "@/config/contentUpdates";
import HomeHeroDualEntry from "@/components/home/HomeHeroDualEntry";
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
              東洋医学の「わかる」を、<br />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                臨床の「考えられる」へ。
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              基礎学習から弁証・配穴、日々の振り返りまで。学生の学びと臨床家の実践をひとつの場所で自然につなぎます。
            </p>

            <nav aria-label="目的から選ぶ" className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/learn" className="flex items-center justify-center gap-2 rounded-xl bg-[#1E3D34] text-white px-3 py-3.5 text-sm font-bold hover:bg-[#2B5A46] focus-visible:outline-2 focus-visible:outline-offset-4"><GraduationCap className="w-5 h-5" />基礎から学ぶ</Link>
              <Link href="/clinical" className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E] px-3 py-3 text-sm font-bold hover:bg-[#EBF3EF] dark:hover:bg-[#182823] focus-visible:outline-2 focus-visible:outline-offset-4"><Stethoscope className="w-5 h-5" />臨床で使う</Link>
            </nav>
            {/* クイック経穴・症状検索バー */}
            <HomeHeroQuickSearch />
          </div>

          <div className="max-w-5xl mx-auto"><HomeLearningProgressCard /></div>
          <details className="max-w-5xl mx-auto rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4"><summary className="min-h-11 flex items-center cursor-pointer font-bold text-[#1E3D34] dark:text-[#74BA9E]">目的別の使い方を詳しく見る</summary><HomeHeroDualEntry /></details>

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
                href="/curriculum"
                className="p-3 rounded-2xl bg-white/90 dark:bg-[#17212A]/90 shadow-2xs hover:shadow-xs hover:bg-[#FAF8F5] dark:hover:bg-[#1D2A36] flex flex-col items-center gap-1.5 text-center transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] truncate max-w-full">
                  カリキュラム
                </span>
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">全81講義・基礎</span>
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
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">{TOOL_CATALOG.kokushi.short}</span>
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
                <span className="hidden sm:block text-[11px] text-[#737C77] dark:text-[#8899A6]">{TOOL_CATALOG.simulator.short}</span>
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

      {/* 4. 学びから実践へのつながりを示す具体例（思考プロセス図） */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>Continuous Learning Loop</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
            学びと実践が循環する、ひとつの思考ループ
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            基礎理論を学ぶだけで終わらせず、臨床推論・処方設計・カルテ蓄積を行い、臨床の気づきから再び基礎理論へ立ち戻る。学生と臨床家の双方が高め合える思考サイクルです。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#E8E1D1] dark:border-[#243545] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] transition-all">
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

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#E8E1D1] dark:border-[#243545] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all">
            <span className="font-mono text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1 rounded-md">
              STEP 2
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              所見から弁証を推論する
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {TOOL_CATALOG.simulator.description}
            </p>
            <div className="pt-1">
              <Link href="/simulator" className="text-xs sm:text-sm font-bold text-[#1E3D34] dark:text-[#74BA9E] hover:underline inline-flex items-center gap-1">
                <span>シミュレーターへ</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#E8E1D1] dark:border-[#243545] hover:border-[#B86924] dark:hover:border-[#E6C387] transition-all">
            <span className="font-mono text-xs font-bold text-[#B86924] dark:text-[#E6C387] bg-[#FCF4EB] dark:bg-[#2A2016] px-2.5 py-1 rounded-md">
              STEP 3
            </span>
            <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] pt-1">
              本治・標治の配穴を設計
            </h3>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
              {TOOL_CATALOG.haiketsu.description}
            </p>
            <div className="pt-1">
              <Link href="/practice/haiketsu" className="text-xs sm:text-sm font-bold text-[#B86924] dark:text-[#E6C387] hover:underline inline-flex items-center gap-1">
                <span>配穴設計へ</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-[#17212A]/95 p-5 rounded-2xl shadow-2xs hover:shadow-xs space-y-3 relative border border-[#E8E1D1] dark:border-[#243545] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] transition-all">
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

        {/* STEP 4から再びSTEP 1へ戻る循環ループ案内 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF8F5] via-[#EBF3EF] to-[#FAF8F5] dark:from-[#17212A] dark:via-[#13221C] dark:to-[#17212A] border border-[#C5DED4] dark:border-[#2A5243] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1E3D34] text-white flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] block text-xs sm:text-sm">
                臨床の振り返りから、再び基礎理論（STEP 1）へ
              </span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] mt-0.5">
                臨床で壁に当たった時こそ、陰陽五行・気血水・臓腑経絡の原本に立ち戻る。この往復運動こそが、暗記を「使える臨床知」へと昇華させます。
              </p>
            </div>
          </div>
          <Link
            href="/curriculum"
            className="px-4 py-2 rounded-xl bg-[#1E3D34] hover:bg-[#2B5A46] text-white font-bold transition-all shrink-0 self-end sm:self-auto inline-flex items-center gap-1.5 shadow-2xs"
          >
            <span>全81講義の理論へ立ち戻る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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

            <div className="space-y-1">{SITE_UPDATES.map(update => <Link key={update.label} href={update.href} className="block rounded-xl p-3 hover:bg-white dark:hover:bg-[#121920]">
              <div className="flex items-center justify-between gap-2 text-xs text-[#737C77] dark:text-[#8899A6]"><time dateTime={update.date}>{update.date.replaceAll('-', '.')}</time><span>{update.label}</span></div>
              <p className="mt-1 text-sm font-semibold text-[#232826] dark:text-[#FAF8F5]">{update.text}</p>
            </Link>)}</div>
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

            <div className="space-y-1">
              <Link
                href="/articles/science-of-yinyang-gogyo"
                className="block p-3 rounded-xl hover:bg-white/90 dark:hover:bg-[#121920]/80 transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
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
                className="block p-3 rounded-xl hover:bg-white/90 dark:hover:bg-[#121920]/80 transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A1D12] text-[#B86924] dark:text-[#E6C387]">
                    {ARTICLES.find(article => article.id === "science-of-qi-blood-fluid")?.category}
                  </span>
                  <span>読了目安 約18分</span>
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors line-clamp-1">
                  気血津液の生体工学：エネルギー代謝と体液循環
                </h3>
              </Link>

              <Link
                href="/library"
                className="block p-3 rounded-xl hover:bg-white/90 dark:hover:bg-[#121920]/80 transition-all group"
              >
                <div className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6] mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAEFF5] dark:bg-[#152331] text-[#1E2D3D] dark:text-[#7BAAD8]">
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
              <Image
                src="/icon.png"
                alt="運営者 はり太郎"
                width={64}
                height={64}
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
