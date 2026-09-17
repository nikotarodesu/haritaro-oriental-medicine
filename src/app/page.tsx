import Link from "next/link";
import { 
  GraduationCap, 
  Compass, 
  Layers, 
  BookOpen, 
  HeartPulse, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Flame
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { ARTICLES } from "@/data/articleData";
import SeasonalBanner from "@/components/SeasonalBanner";
import HomeLearningProgressCard from "@/components/HomeLearningProgressCard";

// 東洋医学8大体系データ
const EIGHT_SYSTEMS = [
  {
    number: 1,
    id: "lecture-1-yinyang",
    title: "陰陽論",
    phase: "基礎理論",
    tagColor: "bg-[#1E3D34] dark:bg-[#2B6958] text-[#FAF8F5]",
    subtitle: "動的平衡と状態遷移の「最小単位OS」",
    purpose: "固定的な二元論を脱却し、変化・循環・消長転化の力学モデルを習得する",
    terms: ["陰陽互根", "消長転化", "陰虚陽亢", "動的平衡"],
    lectureId: "lecture-yinyang-1"
  },
  {
    number: 2,
    id: "lecture-2-wuxing",
    title: "五行論",
    phase: "基礎理論",
    tagColor: "bg-[#2D5A46] dark:bg-[#3E7A60] text-[#FAF8F5]",
    subtitle: "多臓器相互作用と波及のネットワーク地図",
    purpose: "木火土金水の生剋乗侮から多臓器連鎖病理を読み解く思考力を身につける",
    terms: ["相生相剋", "木乗土（肝気犯胃）", "情志相勝", "五労五悪"],
    lectureId: "lecture-wuxing-1"
  },
  {
    number: 3,
    id: "lecture-3-qiblood",
    title: "気血水理論",
    phase: "基礎理論",
    tagColor: "bg-[#B86924] dark:bg-[#9C5417] text-[#FAF8F5]",
    subtitle: "生体を駆動する三層実体と代謝動態モデル",
    purpose: "エネルギーと栄養・水液の代謝循環、虚損・鬱滞の破綻ドミノを解明する",
    terms: ["気虚・気滞", "血虚・瘀血", "水滞・痰飲", "ドミノ破綻"],
    lectureId: "lecture-qiblood-1"
  },
  {
    number: 4,
    id: "lecture-4-lifedynamics",
    title: "生命機能論",
    phase: "基礎理論",
    tagColor: "bg-[#1E2D3D] dark:bg-[#344D66] text-[#FAF8F5]",
    subtitle: "表裏・営衛・三焦の人体動態システム論",
    purpose: "固定した解剖部位ではなく、機能層（防御・代謝・生殖）として人体を捉える",
    terms: ["衛気営血", "三焦気化", "表裏相応", "昇降出入"],
    lectureId: "lecture-lifedynamics-1"
  },
  {
    number: 5,
    id: "lecture-5-pathomechanism",
    title: "病機論",
    phase: "病機",
    tagColor: "bg-[#A83629] dark:bg-[#85271D] text-[#FAF8F5]",
    subtitle: "歪みの発生と病理ドミノの破綻モデル",
    purpose: "邪気侵入と正気衰弱が引き起こす病理タイムラインと氷山モデルを解読する",
    terms: ["邪正盛衰", "内生五邪", "氷山モデル", "絡脈瘀阻"],
    lectureId: "lecture-pathomechanism-1"
  },
  {
    number: 6,
    id: "lecture-diagnosis-1",
    title: "診断論",
    phase: "診断",
    tagColor: "bg-[#4A3B69] dark:bg-[#5C4B7F] text-[#FAF8F5]",
    subtitle: "四診情報を立体的に束ねる臨床推論アルゴリズム",
    purpose: "安全確認・四診の客観化から八綱・気血水・臓腑経絡を導き、検証可能な診断記録を統合する",
    terms: ["安全確認", "四診合参", "八綱座標", "自己修正"],
    lectureId: "lecture-diagnosis-1"
  },
  {
    number: 7,
    id: "lecture-treatment-1",
    title: "治法論",
    phase: "治法",
    tagColor: "bg-[#285A52] dark:bg-[#3B7A70] text-[#FAF8F5]",
    subtitle: "介入ベクトル・刺激量設計・治療計画書の臨床工学",
    purpose: "補瀉寒熱・本標優先・臓腑経絡配穴から刺激量6大検討項目、客観的評価と治療計画書7項目までを体系化する",
    terms: ["治則治法", "本治標治", "刺激量設計", "治療計画書7項目"],
    lectureId: "lecture-treatment-1"
  },
  {
    number: 8,
    id: "lecture-practice-1",
    title: "実践論",
    phase: "実践",
    tagColor: "bg-[#1E2D3D] dark:bg-[#2A3E54] text-[#FAF8F5]",
    subtitle: "臨床運用の完全プロトコルと自己修正アルゴリズム",
    purpose: "初診トリアージから弁証、二層目標、日常語での説明合意、反応評価、次回計画修正、治療終了（卒業）までを一連の動的ループとして運用する",
    terms: ["初動トリアージ", "動的推論ループ", "説明合意記録", "治療終了（卒業）"],
    lectureId: "lecture-practice-1"
  }
];

export default function HomePage() {
  const featuredTsubos = TSUBOS.slice(0, 4);
  const featuredArticles = ARTICLES.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. ファーストビュー（学習環境メインヒーロー） */}
      <section className="relative overflow-hidden washi-pattern border-b border-[#E8E1D1] dark:border-[#22303D] pt-10 sm:pt-16 pb-16 sm:pb-24 transition-colors duration-300">
        <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#EBF3EF]/60 dark:bg-[#1E3D34]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#FCF4EB]/60 dark:bg-[#B86924]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative space-y-8 sm:space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-5 sm:space-y-6">
            {/* 対象者バッジ（強調＆洗練化） */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#C5DED4] dark:border-[#2A5243] text-[#1E3D34] dark:text-[#83BEA8] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>鍼灸師・臨床家・東洋医学を志す学生のための学習プラットフォーム</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学を、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                構造から学ぶ
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              丸暗記を脱却し、人体の構造と思考体系から本質を修得。<br className="hidden sm:inline" />
              基礎理論から病機・診断・治法、臨床弁証推論までを一貫して統合します。
            </p>

            {/* 主要CTAボタン */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] dark:hover:bg-[#225345] text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all group"
              >
                <GraduationCap className="w-4 h-4 text-[#E6C387]" />
                <span>東洋医学を体系的に学ぶ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#17212A] border-2 border-[#1E3D34]/30 dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] text-[#232826] dark:text-[#FAF8F5] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all group"
              >
                <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床弁証シミュレーターを試す</span>
              </Link>
            </div>
          </div>

          {/* 学習進捗・続きから再開カード */}
          <div className="max-w-6xl mx-auto pt-2">
            <HomeLearningProgressCard />
          </div>

          {/* 3大メイン導線ダッシュボード（学ぶ・調べる・考える） */}
          <div className="pt-2 sm:pt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 max-w-6xl mx-auto">
            {/* 1. 学ぶ (LEARN) */}
            <Link
              href="/curriculum"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/20 dark:border-[#74BA9E]/25 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E]">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      体系的に学ぶ
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#EBF3EF] dark:bg-transparent text-[#1E3D34] dark:text-[#74BA9E]">
                    LEARN
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                  東洋医学8大体系
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽・五行・気血水から病機・診断・治法・実践まで。暗記を排し、人体の動態システムとして本質から修得。
                </p>
              </div>

              <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span>全8講の体系カリキュラムへ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. 調べる (SEARCH) */}
            <Link
              href="/tsubo"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/20 dark:border-[#7BAAD8]/25 hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#1E2D3D] dark:text-[#7BAAD8]">
                    <Compass className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      経穴を調べる
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#EAEFF5] dark:bg-transparent text-[#1E2D3D] dark:text-[#7BAAD8]">
                    SEARCH
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors">
                  十四経脈・経穴辞典
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  正経十二経と任脈・督脈の全361穴を網羅。正確な取穴部位、解剖学的指標、骨度法、主治効能から臨床配穴まで即座に検索。
                </p>
              </div>

              <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span>十四経脈・経穴辞典へ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. 考える (THINK) */}
            <Link
              href="/simulator"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#B86924]/20 dark:border-[#E6C387]/25 hover:border-[#B86924] dark:hover:border-[#E6C387] p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[#B86924] dark:text-[#E6C387]">
                    <Layers className="w-5 h-5 shrink-0" />
                    <span className="text-base sm:text-lg font-bold font-serif">
                      推論を考える
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#FCF4EB] dark:bg-transparent text-[#B86924] dark:text-[#E6C387]">
                    THINK
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                  臨床弁証シミュレーター
                </h3>

                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  八綱 ➜ 気血水 ➜ 臓腑 ➜ 証 ➜ 配穴検討 ➜ 刺激量制御。なぜその診断・処方になったのかの思考過程を反復演習。
                </p>
              </div>

              <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                <span>弁証シミュレーターを起動</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. サイトの背骨：東洋医学8大体系 ロードマップ */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            東洋医学8大体系
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            単なる記事の羅列ではなく、臨床推論へ直結する一貫した思考プロセスとして体系化されています。
          </p>
        </div>

        {/* 8大体系カード一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {EIGHT_SYSTEMS.map((system) => (
            <div
              key={system.number}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${system.tagColor}`}>
                    体系 0{system.number}
                  </span>
                  <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6]">
                    {system.phase}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#1E3D34] dark:text-[#74BA9E] mt-0.5">
                    {system.subtitle}
                  </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2 text-xs">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-1">
                    <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] block">
                      獲得する思考力・目的
                    </span>
                    <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed text-[11px] sm:text-xs">
                      {system.purpose}
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap gap-1">
                  {system.terms.map((term, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-[#EBF3EF]/70 dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-end text-xs">
                <Link
                  href={`/curriculum?lecture=${system.lectureId}`}
                  className="font-bold text-[#1E3D34] dark:text-[#74BA9E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>講義を読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] font-bold text-xs sm:text-sm transition-all"
          >
            <span>8大体系カリキュラムの全体構成・講義一覧を見る</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. 【考える】臨床推論・臨床弁証シミュレーター特設 */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E2D3D] via-[#16222E] to-[#0E1720] dark:from-[#141E28] dark:via-[#0F161E] dark:to-[#080D12] rounded-2xl sm:rounded-3xl p-3.5 sm:p-10 lg:p-12 text-[#FAF8F5] relative overflow-hidden shadow-xl border border-[#2B4055] dark:border-[#223344]">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#74BA9E]/15 blur-3xl pointer-events-none" />
          <div className="absolute right-10 bottom-6 opacity-10 pointer-events-none hidden lg:block select-none">
            <span className="font-serif text-[180px] font-bold">辨證</span>
          </div>

          <div className="max-w-3xl relative z-10 space-y-5 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-snug">
                臨床弁証シミュレーター
              </h2>
              <p className="text-xs sm:text-sm text-[#C5D3DF] leading-relaxed">
                単に答え（病名やツボ）を出すツールではありません。
                「なぜその証になったのか」「なぜそのツボを組み合わせるのか」という
                <strong className="text-[#E6C387]">臨床推論の思考プロセス</strong>を追体験・体得するための学習エンジンです。
              </p>
            </div>

            {/* 臨床推論ステップ図 */}
            <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 space-y-2.5 sm:space-y-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#E6C387] block uppercase tracking-wider">
                推論の基本アルゴリズム
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 sm:gap-2 text-center text-xs">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 1</span>
                  <span className="font-bold text-[11px] sm:text-xs">八綱</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">表裏・寒熱・虚実</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 2</span>
                  <span className="font-bold text-[11px] sm:text-xs">気血水</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">運動動態・偏り</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 3</span>
                  <span className="font-bold text-[11px] sm:text-xs">臓腑経絡</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">局在病位の特定</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#E6C387] block">STEP 4</span>
                  <span className="font-bold text-[#E6C387] text-[11px] sm:text-xs">一文の証</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">病態の本質言語化</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 5</span>
                  <span className="font-bold text-[11px] sm:text-xs">治則・治法</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">介入戦略ルール</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#E6C387] text-[#1E2D3D]">
                  <span className="text-[10px] font-bold block opacity-80">STEP 6</span>
                  <span className="font-bold text-[11px] sm:text-xs">最小配穴</span>
                  <span className="text-[9px] block mt-0.5">太衝＋陽陵泉 等</span>
                </div>
              </div>
            </div>

            {/* シミュレーターの3大コア機能プレビュー */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-[#E6C387]">
                  <Layers className="w-4 h-4" />
                  <h4 className="font-bold text-xs text-white">① 3軸連動の病態判定</h4>
                </div>
                <p className="text-[11px] text-[#A0B0BC] leading-relaxed">
                  八綱（深浅・勢い）× 気血水（運動動態）× 臓腑経絡（局在病位）の3層から立体的に病態を特定します。
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-[#74BA9E]">
                  <Compass className="w-4 h-4" />
                  <h4 className="font-bold text-xs text-white">② 一文の証を自動導出</h4>
                </div>
                <p className="text-[11px] text-[#A0B0BC] leading-relaxed">
                  選択した病態の組み合わせから、確定診断となる「証名」と詳細な病理メカニズム・舌脈所見を即座に算出します。
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-[#E6C387]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-bold text-xs text-white">③ 最小構成の特効ペアツボ</h4>
                </div>
                <p className="text-[11px] text-[#A0B0BC] leading-relaxed">
                  多穴刺鍼を排し、主穴（標治）× 配穴（本治）の相乗効果を発揮する最適なツボ処方と臨床根拠を提示します。
                </p>
              </div>
            </div>

            {/* シミュレーター起動CTA */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E6C387] text-[#1E2D3D] hover:bg-[#DFC07D] font-bold text-sm shadow-md transition-all group"
              >
                <Layers className="w-4 h-4 text-[#1E2D3D]" />
                <span>臨床弁証シミュレーターを起動する</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs text-[#A0B0BC]">
                八綱・気血水・臓腑経絡の動的推論をブラウザ上で即座に体験できます
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 【調べる】経穴辞典・学術論文 */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* 要穴ピックアップ */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">
                Acupoints
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                知っておくべき基本の要穴
              </h2>
            </div>
            <Link
              href="/tsubo"
              className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
            >
              <span>十四経脈・経穴辞典（全361穴）へ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredTsubos.map((tsubo) => (
              <Link
                key={tsubo.id}
                href={`/tsubo/${tsubo.code.toLowerCase()}`}
                className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-5 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                      {tsubo.code}
                    </span>
                    <span className="text-xs text-[#737C77] dark:text-[#8899A6]">{tsubo.meridianShort}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                      {tsubo.name}
                    </h3>
                    <span className="text-xs text-[#59615D] dark:text-[#96A6B2]">{tsubo.kana}</span>
                  </div>

                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] line-clamp-2 mb-2.5 sm:mb-3">
                    {tsubo.locationSimple}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2.5 sm:mb-3">
                    {tsubo.indications.slice(0, 3).map((ind, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB]"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-2.5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between">
                  <p className="text-[11px] text-[#737C77] dark:text-[#8899A6] italic line-clamp-1">
                    💡 {tsubo.clinicalNote}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1E3D34] dark:text-[#74BA9E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 臨床知見・論文抄読ピックアップ */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] tracking-widest uppercase">
                Articles & Papers
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                臨床知見・学術論文抄読
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-xs sm:text-sm font-semibold text-[#1E3D34] dark:text-[#74BA9E] hover:underline flex items-center gap-1"
            >
              <span>すべての論文・知見を読む</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
            {featuredArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/articles?article=${article.id}`}
                className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-3.5 sm:p-5 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-2 sm:mb-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#1E3D34] dark:text-[#83BEA8] font-medium text-[10px] sm:text-[11px]">
                      {article.category}
                    </span>
                    <span className="text-[11px]">約 {article.readTime}</span>
                  </div>

                  <h3 className="font-sans text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug tracking-normal mb-1 sm:mb-1.5">
                    {article.title}
                  </h3>

                  {article.subtitle && (
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6] font-medium leading-relaxed line-clamp-1 mb-1.5 sm:mb-2">
                      {article.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2 mb-2.5 sm:mb-3">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                  <span className="text-[#737C77] dark:text-[#8899A6] text-[10px] sm:text-[11px]">執筆・監修：はり太郎</span>
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs">
                    <span>詳しく読む</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 東洋医学を知る入口（入門・セルフケア・日常の応用） */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-8 sm:pt-12 space-y-3">
          <div>
            <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] tracking-widest uppercase">
              Gateway to Practice
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
              東洋医学を知る入口（入門・セルフケア）
            </h2>
          </div>
        </div>

        {/* 天人相応・二十四節気バナー */}
        <SeasonalBanner />

        {/* 気血水セルフ診断 CTAバナー */}
        <div className="bg-gradient-to-br from-[#1E3D34] to-[#152C25] dark:from-[#1A382F] dark:to-[#0E1A16] rounded-2xl sm:rounded-3xl p-4 sm:p-10 text-[#FAF8F5] relative overflow-hidden shadow-lg border border-[#2B594C]/40">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <span className="font-serif text-[200px] font-bold">氣</span>
          </div>

          <div className="max-w-xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EF]/20 text-[#E6C387] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>体質セルフチェック</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-serif font-bold tracking-tight">
              あなたの体質はどのタイプ？<br />
              「気・血・水」セルフ診断
            </h3>

            <p className="text-xs sm:text-sm text-[#D3DFDA] leading-relaxed">
              簡単な設問に答えるだけで、気虚・気滞・瘀血などの傾きと、すぐにできる食養生・生活改善法がわかります。
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#E6C387] text-[#1E3D34] hover:bg-[#DFC07D] font-bold text-xs sm:text-sm shadow-md transition-all group"
              >
                <span>体質診断を始める（約2分）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/diagnosis?tab=gorou"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Activity className="w-4 h-4 text-[#E6C387]" />
                <span>五労チェッカー</span>
              </Link>
              <Link
                href="/symptoms"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-[#C5D3DF] hover:text-white text-xs sm:text-sm transition-all"
              >
                <HeartPulse className="w-4 h-4" />
                <span>症状別セルフケア</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
