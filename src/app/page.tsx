import Link from "next/link";
import { 
  HeartPulse, 
  Compass, 
  Stethoscope, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Sun,
  Flame,
  Layers,
  Award,
  GraduationCap
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { ARTICLES } from "@/data/articleData";

export default function HomePage() {
  const featuredTsubos = TSUBOS.slice(0, 4);
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-14 sm:space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-10 sm:pt-16 pb-14 sm:pb-20 transition-colors duration-300">
        {/* 和風アクセント背景装飾 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              からだの声が、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                腑に落ちる。
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#E6C387]/30 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
              基礎理論から臨床実践までを体系化する東洋医学ポータル。<br className="hidden sm:inline" />
              日々の未病セルフケアから専門学習まで、直感的に探求できます。
            </p>

            {/* 二大エントランス（一般向け / 専門家・学生向け） */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
              {/* 1. 一般の方向け */}
              <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#D5CCBC] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] text-[11px] font-bold tracking-wider">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>一般の方向け</span>
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">セルフケア・体質改善</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] mb-1.5 group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    日常の不調を、自分で整える
                  </h3>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-4">
                    頭痛や首肩こり、不眠、冷えなどの未病を、ツボ押しと食養生で軽やかに改善へ。
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex gap-2">
                  <Link
                    href="/symptoms"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>症状から探す</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/diagnosis"
                    className="py-2 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1A2530] text-xs font-semibold text-center transition-colors"
                  >
                    体質診断
                  </Link>
                </div>
              </div>

              {/* 2. 専門家・学生向け */}
              <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border border-[#D5CCBC] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#4E8C76] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-[11px] font-bold tracking-wider">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>専門家・学生向け</span>
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">体系学習・臨床・研究</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] mb-1.5 group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    体系理論と臨床の極意を学ぶ
                  </h3>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-4">
                    東洋医学の基礎理論から経穴・配穴論、最新の神経生理学まで本質から体系的に修得。
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex gap-2">
                  <Link
                    href="/curriculum"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#1E2D3D] dark:bg-[#375573] text-[#FAF8F5] hover:bg-[#16212D] dark:hover:bg-[#2D455D] text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>学習カリキュラム</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/tsubo"
                    className="py-2 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1A2530] text-xs font-semibold text-center transition-colors flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>ツボ辞典</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* クイックアクセス・ダッシュボード */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Link
                href="/symptoms"
                className="bg-[#FFFFFF]/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-xl p-3.5 text-center hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">お悩み・症状別</div>
                <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5">頭痛・肩こり・不眠</div>
              </Link>

              <Link
                href="/diagnosis"
                className="bg-[#FFFFFF]/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-xl p-3.5 text-center hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#A83629] dark:text-[#C47A72] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">気血水 体質診断</div>
                <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5">約2分でタイプ判定</div>
              </Link>

              <Link
                href="/curriculum"
                className="bg-[#FFFFFF]/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-xl p-3.5 text-center hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">学習カリキュラム</div>
                <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5">全4ステージ講義</div>
              </Link>

              <Link
                href="/tsubo"
                className="bg-[#FFFFFF]/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-xl p-3.5 text-center hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">経穴辞典（361穴）</div>
                <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5">十四経脈・骨度法</div>
              </Link>

              <Link
                href="/articles"
                className="col-span-2 sm:col-span-1 bg-[#FFFFFF]/80 dark:bg-[#17212A]/80 border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-xl p-3.5 text-center hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">臨床知見・論文</div>
                <div className="text-[10px] text-[#737C77] dark:text-[#8899A6] mt-0.5">配穴と最新科学</div>
              </Link>
            </div>
          </div>

          {/* 季節の養生ウィジェット（すっきりと整理） */}
          <div className="mt-8 max-w-4xl mx-auto bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-5 sm:p-6 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#EFE9DD] dark:border-[#22303D] pb-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#B86924] dark:text-[#E6C387]">二十四節気・今月の養生</span>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#232826] dark:text-[#FAF8F5]">
                    春（発陳）── 「肝」を健やかに、気の上昇と自律神経を整える
                  </h3>
                </div>
              </div>
              <Link href="/articles" className="text-xs font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1 shrink-0">
                <span>コラムを読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-0.5">🌿 食養生</span>
                <span className="text-[#59615D] dark:text-[#A0B0BC]">菜の花や春菊など「苦味と香り」で熱を逃がす</span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-0.5">🚶 生活習慣</span>
                <span className="text-[#59615D] dark:text-[#A0B0BC]">朝の深呼吸とゆったり散歩で伸びやかに気を巡らせる</span>
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-0.5">🎯 おすすめツボ</span>
                <span className="text-[#59615D] dark:text-[#A0B0BC]">足の甲の「<Link href="/tsubo" className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold underline">太衝</Link>」を息を吐きながら指圧</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 気血水セルフ診断 CTAバナー（文章量を削り直感的に） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E3D34] to-[#152C25] dark:from-[#1A382F] dark:to-[#0E1A16] rounded-3xl p-6 sm:p-10 text-[#FAF8F5] relative overflow-hidden shadow-lg border border-[#2B594C]/40">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <span className="font-serif text-[200px] font-bold">氣</span>
          </div>

          <div className="max-w-xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EF]/20 text-[#E6C387] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>体質セルフチェック</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif font-bold tracking-tight">
              あなたの体質はどのタイプ？<br />
              「気・血・水」セルフ診断
            </h2>

            <p className="text-xs sm:text-sm text-[#D3DFDA] leading-relaxed">
              簡単な設問に答えるだけで、気虚・気滞・瘀血などの傾きと、すぐにできる改善法がわかります。
            </p>

            <div className="pt-2">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E6C387] text-[#1E3D34] hover:bg-[#DFC07D] font-bold text-xs sm:text-sm shadow-md transition-all group"
              >
                <span>無料で体質診断を始める（約2分）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 代表的な経穴（ツボ）ピックアップ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">Acupoints</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              知っておきたい基本の要穴
            </h2>
          </div>
          <Link href="/tsubo" className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1">
            <span>全361穴の経穴辞典へ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredTsubos.map((tsubo) => (
            <div
              key={tsubo.id}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-5 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                    {tsubo.code}
                  </span>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">{tsubo.meridianShort}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-1.5">
                  <h3 className="font-serif text-xl font-bold text-[#232826] dark:text-[#FAF8F5]">{tsubo.name}</h3>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{tsubo.kana}</span>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 mb-3">
                  {tsubo.locationSimple}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tsubo.indications.slice(0, 3).map((ind, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] italic line-clamp-1">
                  💡 {tsubo.clinicalNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 臨床知見・論文抄読ピックアップ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">Articles</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              臨床知見・学術論文抄読
            </h2>
          </div>
          <Link href="/articles" className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1">
            <span>すべての知見記事を読む</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles`}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 hover:border-[#1E3D34] dark:hover:border-[#4E8C76] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#1E3D34] dark:text-[#83BEA8] font-medium text-[11px]">
                    {article.category}
                  </span>
                  <span>約 {article.readTime}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2 mb-3">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                <span className="text-[#737C77] dark:text-[#8899A6] text-[11px]">{article.publishedAt}</span>
                <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs">
                  <span>詳しく読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. 東洋医学の3つの根幹（要点を簡潔に） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">Fundamentals</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              東洋医学を貫く3つの根幹
            </h2>
            <p className="mt-1 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              人体を有機的な小宇宙として全体で捉える思考法
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center space-y-2 p-2">
              <div className="w-12 h-12 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">気・血・水の調和</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                生命エネルギー「気」、栄養を運ぶ「血」、潤す「水」の円滑な巡りが健康の源です。
              </p>
            </div>

            <div className="text-center space-y-2 p-2">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">陰陽五行のバランス</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                木・火・土・金・水。相互に支え合い抑制し合う関係性を整え、心身の中庸を保ちます。
              </p>
            </div>

            <div className="text-center space-y-2 p-2">
              <div className="w-12 h-12 rounded-xl bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#232826] dark:text-[#FAF8F5]">未病を治す予防医学</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                本格的な病に至る前のかすかな歪み（未病）を察知し、日々の養生で未然に防ぎます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
