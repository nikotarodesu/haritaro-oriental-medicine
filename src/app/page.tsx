import Link from "next/link";
import { 
  HeartPulse, 
  Compass, 
  Stethoscope, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sun,
  Flame,
  Droplets,
  Layers,
  Award,
  GraduationCap
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { SYMPTOMS } from "@/data/symptomData";
import { ARTICLES } from "@/data/articleData";

export default function HomePage() {
  const featuredTsubos = TSUBOS.slice(0, 4);
  const featuredSymptoms = SYMPTOMS.slice(0, 3);
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-12 sm:pt-20 pb-16 sm:pb-28 transition-colors duration-300">
        {/* 和風アクセント背景装飾 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#65D4B2] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>はり太郎の東洋医学 ── 膨大な知見を体系化した総合知の拠点</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              伝統の智慧を、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#3CD0A0] relative">
                最澄の知性
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#E6C387]/30 dark:bg-[#E6C387]/20 -z-10" />
              </span>
              で読み解く。
            </h1>

            <p className="text-base sm:text-lg text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
              数千年の臨床観察に裏打ちされた東洋医学の深淵と、現代神経科学の最新知見を架橋。「一般の方への圧倒的わかりやすさ」と「専門家が拠って立つ学術的厳密さ」の両立を目指した、日本最高峰のポータルサイトです。
            </p>

            {/* 二大エントランス（一般の方向け / 専門家・学生向け） */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto text-left">
              {/* 1. 一般の方向けカード */}
              <div className="bg-[#FFFFFF]/90 dark:bg-[#17212A]/90 backdrop-blur-sm rounded-2xl border-2 border-[#D5CCBC] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] text-[11px] font-bold tracking-wider">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>一般の方向け</span>
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">セルフケア・体質改善</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mb-2 group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors">
                    日常の不調を、自分で整える
                  </h3>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-4">
                    頭痛、肩こり、不眠、冷えなど。病院に行くほどではない未病の不調を、わかりやすいツボ押しや食養生で改善へ導きます。
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-wrap gap-2">
                  <Link
                    href="/symptoms"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5] hover:bg-[#162E27] dark:hover:bg-[#225345] text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>症状からツボを探す</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/diagnosis"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1A2530] text-xs font-semibold text-center transition-colors"
                  >
                    体質診断
                  </Link>
                </div>
              </div>

              {/* 2. 専門家・学生向けカード */}
              <div className="bg-[#FFFFFF]/90 dark:bg-[#17212A]/90 backdrop-blur-sm rounded-2xl border-2 border-[#D5CCBC] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2] text-[11px] font-bold tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>専門家・学生向け</span>
                    </span>
                    <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">体系学習・臨床・研究</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] mb-2 group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors">
                    伝統の体系理論と臨床の極意を学ぶ
                  </h3>
                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-4">
                    鍼灸学生の国試対策から、臨床の切れ味を高める骨度法・配穴論、最新の神経生理学論文まで、本質から体系的に修得します。
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] flex flex-wrap gap-2">
                  <Link
                    href="/curriculum"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1E2D3D] dark:bg-[#375573] text-[#FAF8F5] hover:bg-[#16212D] dark:hover:bg-[#2D455D] text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>体系学習カリキュラム</span>
                  </Link>
                  <Link
                    href="/tsubo"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#D5CCBC] dark:border-[#2D3E50] text-[#232826] dark:text-[#E6EFEA] hover:bg-[#EBF3EF] dark:hover:bg-[#1A2530] text-xs font-semibold text-center transition-colors flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>ツボ辞典</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 季節の養生ウィジェット（春の養生） */}
          <div className="mt-14 max-w-4xl mx-auto bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] rounded-2xl p-6 sm:p-7 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EFE9DD] dark:border-[#22303D] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B86924] dark:text-[#E6C387]">二十四節気・今月の養生</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2] font-medium">春（発陳）の季節</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                    春は「肝（かん）」を健やかに ── 気の上昇と自律神経の乱れを整える
                  </h3>
                </div>
              </div>
              <Link href="/articles" className="text-xs font-semibold text-[#1E3D34] dark:text-[#3CD0A0] hover:underline flex items-center gap-1 shrink-0">
                <span>養生コラムを読む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#59615D] dark:text-[#A0B0BC]">
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-1">🌿 食養生</span>
                菜の花、春菊、ふきのとうなど「苦味と香り」のある食材で上昇した熱を逃がす。
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-1">🚶 生活習慣</span>
                朝は髪をゆったりまとめ、無理のない深呼吸と軽い散歩で伸びやかに気を巡らせる。
              </div>
              <div className="bg-[#FAF8F5] dark:bg-[#121920] p-3.5 rounded-xl border border-[#EDE7DB] dark:border-[#22303D]">
                <span className="font-bold text-[#232826] dark:text-[#E6EFEA] block mb-1">🎯 推奨ツボ</span>
                足の甲にある「<Link href="/tsubo" className="text-[#1E3D34] dark:text-[#3CD0A0] font-semibold underline">太衝（たいしょう）</Link>」を息を吐きながら優しく指圧。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. サイトの二大アプローチ（両輪設計の解説） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            なぜ「はり太郎の東洋医学」なのか
          </h2>
          <p className="mt-2 text-sm text-[#59615D] dark:text-[#A0B0BC]">
            一般の方の「今すぐ治したい」と、専門家の「本質を極めたい」に、最高峰の解を提示します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左カラム：一般の方へ */}
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 relative overflow-hidden hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mb-6">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] tracking-wider uppercase">For Beginners & Patients</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1 mb-3">
              一般の方へ：日常の不調をセルフケア
            </h3>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-6">
              頭痛、肩こり、不眠、冷え、胃腸の弱りなど、病院に行くほどではない「未病（みびょう）」のサインを、誰でも迷わず見つけられる図解とツボ押しで改善へ導きます。
            </p>
            <ul className="space-y-2.5 text-xs text-[#404743] dark:text-[#C5D2DB] mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>専門用語を排した、写真・図解感覚のツボ位置ガイド</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>1分で自分のタイプがわかる「気血水 体質チェック」</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>スーパーで買える食材を使った「おうち食養生」</span>
              </li>
            </ul>
            <Link
              href="/symptoms"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#3CD0A0] group-hover:underline"
            >
              <span>症状別ガイドを見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 右カラム：専門家・学生向け */}
          <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 relative overflow-hidden hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2] flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#65D4B2] tracking-wider uppercase">For Practitioners & Students</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] mt-1 mb-3">
              専門家・学生向け：体系理論と臨床の深化
            </h3>
            <p className="text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed mb-6">
              鍼灸養成校の学生・国試受験生からプロの臨床家まで。単なる丸暗記ではなく「なぜ効くのか」を力学・神経生理学・古典文献から体系的に紐解きます。
            </p>
            <ul className="space-y-2.5 text-xs text-[#404743] dark:text-[#C5D2DB] mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>国試・定期試験対策に直結する「陰陽・五行・気血津液」の完全体系化</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>十四経脈・361穴の体系的データベース（骨度法・要穴・主治・禁忌）</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E3D34] dark:text-[#3CD0A0]" />
                <span>臨床経験に裏打ちされた「配穴・取穴のコツ」と最新医学論文抄読</span>
              </li>
            </ul>
            <Link
              href="/tsubo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3D34] dark:text-[#3CD0A0] group-hover:underline"
            >
              <span>経穴データベースへ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 気血水セルフ診断 CTAバナー */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E3D34] to-[#152C25] dark:from-[#1A382F] dark:to-[#0E1A16] rounded-3xl p-8 sm:p-12 text-[#FAF8F5] relative overflow-hidden shadow-xl border border-[#2B594C]/40">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <span className="font-serif text-[240px] font-bold">氣</span>
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF]/20 text-[#E6C387] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>インタラクティブ体質チェック</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              あなたの心身はどのタイプ？<br />
              「気・血・水」体質セルフ診断
            </h2>

            <p className="text-sm sm:text-base text-[#D3DFDA] leading-relaxed">
              東洋医学では、人の体は「気（エネルギー）」「血（血液・栄養）」「水（体液・潤い）」の調和で成り立っていると考えます。簡単な設問に答えるだけで、あなたの現在の傾き（気虚・気滞・瘀血など）と、今すぐ実践できる改善法がわかります。
            </p>

            <div className="pt-2">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E6C387] text-[#1E3D34] hover:bg-[#DFC07D] font-bold text-sm shadow-md transition-all group"
              >
                <span>無料で体質診断を始める（約2分）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 代表的な経穴（ツボ）ピックアップ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#3CD0A0] tracking-widest uppercase">Acupoints Library</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
              知っておきたい基本の要穴
            </h2>
          </div>
          <Link href="/tsubo" className="text-sm font-semibold text-[#1E3D34] dark:text-[#3CD0A0] hover:underline flex items-center gap-1">
            <span>ツボ辞典で全361穴を検索する</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTsubos.map((tsubo) => (
            <div
              key={tsubo.id}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2]">
                    {tsubo.code}
                  </span>
                  <span className="text-xs text-[#737C77] dark:text-[#8899A6]">{tsubo.meridianShort}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#232826] dark:text-[#FAF8F5]">{tsubo.name}</h3>
                  <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{tsubo.kana}</span>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 mb-3">
                  {tsubo.locationSimple}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tsubo.indications.slice(0, 3).map((ind, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2ECE0] dark:border-[#22303D]">
                <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] italic line-clamp-2">
                  💡 {tsubo.clinicalNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 知見・論文抄読ピックアップ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#3CD0A0] tracking-widest uppercase">Articles & Insights</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
              はり太郎の臨床知見・論文抄読
            </h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-[#1E3D34] dark:text-[#3CD0A0] hover:underline flex items-center gap-1">
            <span>すべての知見記事を読む</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles`}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 hover:border-[#1E3D34] dark:hover:border-[#3CD0A0] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#1E3D34] dark:text-[#65D4B2] font-medium">
                    {article.category}
                  </span>
                  <span>読了約 {article.readTime}</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#3CD0A0] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                <span className="text-[#737C77] dark:text-[#8899A6]">{article.publishedAt}</span>
                <span className="text-[#1E3D34] dark:text-[#3CD0A0] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>詳しく読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. 東洋医学の3大基本概念（初心者のためのやさしい手引き） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#1E3D34] dark:text-[#3CD0A0] tracking-widest uppercase">Fundamentals</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-1">
              東洋医学を貫く3つの根幹
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC]">
              人体をパーツではなく「有機的な小宇宙」として全体で捉える思考法です。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387] flex items-center justify-center mx-auto">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">気・血・水の三要素</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                生命エネルギーの「気」、全身を養う「血」、潤いと体液を司る「水」。この3つが過不足なく滞りなく巡ることで、真の健康が維持されます。
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#65D4B2] flex items-center justify-center mx-auto">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">陰陽五行説の調和</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                木・火・土・金・水。万物と人体は相互に助け合い（相生）、制約し合う（相克）関係にあります。一方の偏りを正し中庸を保つことが治療の目的です。
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EDF3F8] dark:bg-[#1A2837] text-[#1E2D3D] dark:text-[#6FA0D6] flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">「未病を治す」予防医学</h3>
              <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                病気になってから治すのではなく、発症する前の微細なアンバランス（未病）を察知して整える。これこそが東洋医学が人類に贈る最大の知恵です。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
