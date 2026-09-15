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
  Network, 
  GitBranch, 
  ShieldCheck, 
  Flame
} from "lucide-react";
import { TSUBOS } from "@/data/tsuboData";
import { ARTICLES } from "@/data/articleData";
import SeasonalBanner from "@/components/SeasonalBanner";

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
    flowTo: "多臓器ネットワークへ展開する「五行論」へ",
    terms: ["陰陽互根", "消長転化", "陰虚陽亢", "動的平衡"],
    acupoints: "関元・百会",
    lectureId: "lecture-1-yinyang"
  },
  {
    number: 2,
    id: "lecture-2-wuxing",
    title: "五行論",
    phase: "基礎理論",
    tagColor: "bg-[#2D5A46] dark:bg-[#3E7A60] text-[#FAF8F5]",
    subtitle: "多臓器相互作用と波及のネットワーク地図",
    purpose: "木火土金水の生剋乗侮から多臓器連鎖病理を読み解く思考力を身につける",
    flowTo: "五臓を巡る生体エネルギー実体「気血水」へ",
    terms: ["相生相剋", "木乗土（肝気犯胃）", "情志相勝", "五労五悪"],
    acupoints: "太衝・足三里",
    lectureId: "lecture-2-wuxing"
  },
  {
    number: 3,
    id: "lecture-3-qiblood",
    title: "気血水理論",
    phase: "基礎理論",
    tagColor: "bg-[#B86924] dark:bg-[#9C5417] text-[#FAF8F5]",
    subtitle: "生体を駆動する三層実体と代謝動態モデル",
    purpose: "エネルギーと栄養・水液の代謝循環、虚損・鬱滞の破綻ドミノを解明する",
    flowTo: "多層バリアと循環構造を統合する「生命機能論」へ",
    terms: ["気虚・気滞", "血虚・瘀血", "水滞・痰飲", "ドミノ破綻"],
    acupoints: "気海・三陰交",
    lectureId: "lecture-3-qiblood"
  },
  {
    number: 4,
    id: "lecture-4-lifedynamics",
    title: "生命機能論",
    phase: "基礎理論",
    tagColor: "bg-[#1E2D3D] dark:bg-[#344D66] text-[#FAF8F5]",
    subtitle: "表裏・営衛・三焦の人体動態システム論",
    purpose: "固定した解剖部位ではなく、機能層（防御・代謝・生殖）として人体を捉える",
    flowTo: "正常な生体システムが崩壊するメカニズム「病機論」へ",
    terms: ["衛気営血", "三焦気化", "表裏相応", "昇降出入"],
    acupoints: "合谷・中脘",
    lectureId: "lecture-4-lifedynamics"
  },
  {
    number: 5,
    id: "lecture-5-pathomechanism",
    title: "病機論",
    phase: "病機",
    tagColor: "bg-[#A83629] dark:bg-[#85271D] text-[#FAF8F5]",
    subtitle: "歪みの発生と病理ドミノの破綻モデル",
    purpose: "邪気侵入と正気衰弱が引き起こす病理タイムラインと氷山モデルを解読する",
    flowTo: "潜在する病機を体表サインから捉える「診断論」へ",
    terms: ["邪正盛衰", "内生五邪", "氷山モデル", "絡脈瘀阻"],
    acupoints: "風池・行間",
    lectureId: "lecture-5-pathomechanism"
  },
  {
    number: 6,
    id: "lecture-6-diagnosis",
    title: "診断論",
    phase: "診断",
    tagColor: "bg-[#4A3B69] dark:bg-[#5C4B7F] text-[#FAF8F5]",
    subtitle: "四診情報を立体的に束ねる弁証アルゴリズム",
    purpose: "望聞問切の断片から、八綱・気血水・臓腑経絡を導き「一文の証」を確定する",
    flowTo: "確定した証に対して介入ルールを決定する「治法論」へ",
    terms: ["四診合参", "八綱弁証", "舌苔脈状", "臓腑弁証"],
    acupoints: "寸口脈・腹診穴",
    lectureId: "lecture-6-diagnosis"
  },
  {
    number: 7,
    id: "lecture-7-treatment",
    title: "治法論",
    phase: "治法",
    tagColor: "bg-[#285A52] dark:bg-[#3B7A70] text-[#FAF8F5]",
    subtitle: "介入ベクトル・標本緩急・刺激設計の工学",
    purpose: "補瀉・清熱・温裏・理気など、生体を中庸へ導く治療戦略ルールを立案する",
    flowTo: "治法を具現化するツボの組み合わせと手技「実践論」へ",
    terms: ["治則治法", "本治標治", "補虚瀉実", "開闔補瀉"],
    acupoints: "主穴・配穴論",
    lectureId: "lecture-7-treatment"
  },
  {
    number: 8,
    id: "lecture-8-practice",
    title: "実践論",
    phase: "実践",
    tagColor: "bg-[#1E2D3D] dark:bg-[#2A3E54] text-[#FAF8F5]",
    subtitle: "自己修正ループと最小介入の臨床プロトコル",
    purpose: "最少のツボで最大の生体反応を引き出し、臨床結果から自己修正する",
    flowTo: "実際の患者ケースで推論を検証する「症例演習・シミュレーター」へ",
    terms: ["最小構成配穴", "得気制御", "過剰刺激防止", "閉ループ制御"],
    acupoints: "太衝×陽陵泉",
    lectureId: "lecture-8-practice"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight leading-[1.25]">
              東洋医学を、<br className="hidden sm:inline" />
              <span className="text-[#1E3D34] dark:text-[#74BA9E] relative">
                暗記ではなく構造から学ぶ。
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#E6C387]/35 dark:bg-[#E6C387]/20 -z-10" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A534F] dark:text-[#A8B8C4] leading-relaxed max-w-2xl mx-auto">
              haritaro.jpは、東洋医学を単なる知識の丸暗記ではなく、人体の構造と思考体系として修得するための体系学習＆臨床推論プラットフォームです。
              基礎理論から病機・診断・治法、そして臨床弁証シミュレーターまでを一貫したフローで統合します。
            </p>

            {/* 主要CTAボタン */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/curriculum"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] dark:hover:bg-[#225345] text-[#FAF8F5] font-bold text-sm shadow-md hover:shadow-lg transition-all group"
              >
                <GraduationCap className="w-4 h-4 text-[#E6C387]" />
                <span>東洋医学を学ぶ（8大体系へ）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#17212A] border-2 border-[#1E3D34]/30 dark:border-[#2A3B4A] hover:border-[#B86924] dark:hover:border-[#E6C387] text-[#232826] dark:text-[#FAF8F5] font-bold text-sm shadow-xs hover:shadow-sm transition-all group"
              >
                <Layers className="w-4 h-4 text-[#B86924] dark:text-[#E6C387]" />
                <span>臨床弁証シミュレーターを試す</span>
              </Link>
            </div>
          </div>

          {/* サイトを支える「3つの柱」ヘッダー */}
          <div className="pt-8 sm:pt-12 text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] border border-[#1E3D34]/20 dark:border-[#83BEA8]/30 text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
              <span>当サイトを支える「3つの柱」</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
              「学ぶ・調べる・考える」を、ひとつに。
            </h2>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-2xl mx-auto">
              体系的な知識の修得（学ぶ）、361穴と論文の探求（調べる）、そして臨床推論の体得（考える）。<br className="hidden sm:inline" />
              3つの柱を有機的に行き来することで、実践に直結する生きた臨床力を身につけます。
            </p>
          </div>

          {/* 3大メイン導線ダッシュボード（3つの柱カード） */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* 第1の柱: 学ぶ (LEARN) */}
            <Link
              href="/curriculum"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E3D34]/30 dark:border-[#2A4B3E] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* 柱ヘッダーバッジ */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] dark:border-[#22303D]">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] border border-[#1E3D34]/20 dark:border-[#83BEA8]/30">
                    <span className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                    <span className="text-xs font-bold text-[#1E3D34] dark:text-[#83BEA8] tracking-wider">
                      第1の柱
                    </span>
                  </div>
                  <span className="text-xs font-mono font-extrabold tracking-widest px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#1E3D34] dark:text-[#74BA9E]">
                    LEARN
                  </span>
                </div>

                {/* 強調アクションフレーズ ＆ タイトル */}
                <div>
                  <div className="inline-flex items-center gap-2 text-[#1E3D34] dark:text-[#74BA9E] mb-1.5">
                    <GraduationCap className="w-5 h-5 shrink-0 text-[#1E3D34] dark:text-[#74BA9E]" />
                    <span className="text-lg sm:text-xl font-bold font-serif underline decoration-[#E6C387] decoration-2 underline-offset-4">
                      体系的に学ぶ
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    東洋医学8大体系
                  </h3>
                  <p className="text-xs font-semibold text-[#1E3D34] dark:text-[#83BEA8] mt-1.5">
                    暗記を排し、人体の動態システムを本質から理解する
                  </p>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  陰陽・五行・気血水・生命機能から病機・診断・治法・実践まで。多臓器連鎖と機能層の視点で人体の動態モデルを修得。
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">基礎理論</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">病機論</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">四診弁証</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">臨床実践</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                <span>全8講の体系カリキュラムへ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 第2の柱: 調べる (SEARCH) */}
            <Link
              href="/tsubo"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#1E2D3D]/30 dark:border-[#2A3E52] hover:border-[#1E2D3D] dark:hover:border-[#7BAAD8] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* 柱ヘッダーバッジ */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] dark:border-[#22303D]">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EAEFF5] dark:bg-[#15222E] border border-[#1E2D3D]/20 dark:border-[#7BAAD8]/30">
                    <span className="w-2 h-2 rounded-full bg-[#1E2D3D] dark:bg-[#7BAAD8]" />
                    <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] tracking-wider">
                      第2の柱
                    </span>
                  </div>
                  <span className="text-xs font-mono font-extrabold tracking-widest px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#1E2D3D] dark:text-[#7BAAD8]">
                    SEARCH
                  </span>
                </div>

                {/* 強調アクションフレーズ ＆ タイトル */}
                <div>
                  <div className="inline-flex items-center gap-2 text-[#1E2D3D] dark:text-[#7BAAD8] mb-1.5">
                    <Compass className="w-5 h-5 shrink-0 text-[#1E2D3D] dark:text-[#7BAAD8]" />
                    <span className="text-lg sm:text-xl font-bold font-serif underline decoration-[#7BAAD8] decoration-2 underline-offset-4">
                      根拠を調べる
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E2D3D] dark:group-hover:text-[#7BAAD8] transition-colors">
                    経穴辞典 ＆ 学術リファレンス
                  </h3>
                  <p className="text-xs font-semibold text-[#1E2D3D] dark:text-[#7BAAD8] mt-1.5">
                    361穴と最新論文から、再現性ある臨床根拠を掴む
                  </p>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  全361穴の経穴辞典、十四経脈、骨度法、学術論文抄読、東西統合比較。病機や臓腑と相互接続された知識グラフ。
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">全361穴</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">骨度法・解剖</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">学術論文</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">東西医学比較</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8]">
                <span>経穴辞典・論文リファレンスへ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 第3の柱: 考える (THINK) */}
            <Link
              href="/simulator"
              className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl border-2 border-[#B86924]/40 dark:border-[#4D331F] hover:border-[#B86924] dark:hover:border-[#E6C387] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* 柱ヘッダーバッジ */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] dark:border-[#22303D]">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FCF4EB] dark:bg-[#2A2117] border border-[#B86924]/20 dark:border-[#E6C387]/30">
                    <span className="w-2 h-2 rounded-full bg-[#B86924] dark:bg-[#E6C387]" />
                    <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] tracking-wider">
                      第3の柱
                    </span>
                  </div>
                  <span className="text-xs font-mono font-extrabold tracking-widest px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#B86924] dark:text-[#E6C387]">
                    THINK
                  </span>
                </div>

                {/* 強調アクションフレーズ ＆ タイトル */}
                <div>
                  <div className="inline-flex items-center gap-2 text-[#B86924] dark:text-[#E6C387] mb-1.5">
                    <Layers className="w-5 h-5 shrink-0 text-[#B86924] dark:text-[#E6C387]" />
                    <span className="text-lg sm:text-xl font-bold font-serif underline decoration-[#E6C387] decoration-2 underline-offset-4">
                      推論を考える
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#B86924] dark:group-hover:text-[#E6C387] transition-colors">
                    臨床推論 ＆ 弁証演習
                  </h3>
                  <p className="text-xs font-semibold text-[#B86924] dark:text-[#E6C387] mt-1.5">
                    四診から一文の証・最小配穴へ至る思考プロセスを鍛える
                  </p>
                </div>

                <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  八綱 ➜ 気血水 ➜ 臓腑 ➜ 証 ➜ 配穴検討 ➜ 刺激量制御。なぜその診断・処方になったのかの思考過程を反復演習。
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">八綱・臓腑弁証</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">配穴最適化</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">刺激量計算</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#263542] text-[#404743] dark:text-[#C5D2DB]">症例演習</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                <span>弁証シミュレーターを起動</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. サイトの背骨：東洋医学8大体系 ロードマップ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold">
            <GitBranch className="w-3.5 h-3.5" />
            <span>サイトの根幹・学習の背骨</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            東洋医学8大体系
          </h2>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
            単なる記事の羅列ではなく、臨床推論へ直結する一貫した思考プロセスとして体系化されています。
          </p>

          {/* 学習経路フロー（基礎理論 ➜ 病機 ➜ 診断 ➜ 治法 ➜ 実践 ➜ 症例） */}
          <div className="pt-4 overflow-x-auto pb-2">
            <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-[#FFFFFF] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] shadow-xs text-xs font-bold min-w-max">
              <span className="px-3 py-1.5 rounded-xl bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                ① 基礎理論
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
              <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] text-[#A83629] dark:text-[#C47A72]">
                ② 病機論
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
              <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] text-[#4A3B69] dark:text-[#9A84BC]">
                ③ 診断論
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
              <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] text-[#285A52] dark:text-[#74BA9E]">
                ④ 治法論
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
              <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] text-[#1E2D3D] dark:text-[#7BAAD8]">
                ⑤ 実践論
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
              <span className="px-3 py-1.5 rounded-xl bg-[#FCF4EB] dark:bg-[#2A2117] text-[#B86924] dark:text-[#E6C387]">
                ⑥ 症例演習
              </span>
            </div>
          </div>
        </div>

        {/* 8大体系カード一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EIGHT_SYSTEMS.map((system) => (
            <div
              key={system.number}
              className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] dark:hover:border-[#74BA9E] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${system.tagColor}`}>
                    体系 0{system.number}
                  </span>
                  <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6]">
                    {system.phase}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#1E3D34] dark:text-[#74BA9E] mt-0.5">
                    {system.subtitle}
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] space-y-1">
                    <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6] block">
                      獲得する思考力・目的
                    </span>
                    <p className="text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                      {system.purpose}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                    <span className="font-bold text-[#737C77] dark:text-[#8899A6]">連動先：</span>
                    {system.flowTo}
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

              <div className="pt-4 mt-4 border-t border-[#F2ECE0] dark:border-[#22303D] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#737C77] dark:text-[#8899A6]">
                  関連要穴: <strong className="text-[#232826] dark:text-[#FAF8F5]">{system.acupoints}</strong>
                </span>
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#1E3D34] text-[#1E3D34] dark:text-[#74BA9E] font-bold text-xs sm:text-sm transition-all"
          >
            <span>8大体系カリキュラムの全体構成・講義一覧を見る</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. 【考える】臨床推論・臨床弁証シミュレーター特設 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E2D3D] via-[#16222E] to-[#0E1720] dark:from-[#141E28] dark:via-[#0F161E] dark:to-[#080D12] rounded-3xl p-6 sm:p-10 lg:p-12 text-[#FAF8F5] relative overflow-hidden shadow-xl border border-[#2B4055] dark:border-[#223344]">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#74BA9E]/15 blur-3xl pointer-events-none" />
          <div className="absolute right-10 bottom-6 opacity-10 pointer-events-none hidden lg:block select-none">
            <span className="font-serif text-[180px] font-bold">辨證</span>
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3EF]/15 border border-[#74BA9E]/30 text-[#E6C387] text-xs font-semibold tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#E6C387]" />
              <span>臨床推論トレーニング</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E6C387] text-[#1E3D34]">
                中核コンテンツ
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-snug">
                臨床弁証シミュレーター
              </h2>
              <p className="text-xs sm:text-sm text-[#C5D3DF] leading-relaxed">
                単に答え（病名やツボ）を出すツールではありません。
                「なぜその証になったのか」「なぜそのツボを組み合わせるのか」という
                <strong className="text-[#E6C387]">臨床推論の思考プロセス</strong>を追体験・体得するための学習エンジンです。
              </p>
            </div>

            {/* 臨床推論ステップ図 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 space-y-3">
              <span className="text-xs font-bold text-[#E6C387] block uppercase tracking-wider">
                推論の基本アルゴリズム
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 1</span>
                  <span className="font-bold">八綱</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">表裏・寒熱・虚実</span>
                </div>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 2</span>
                  <span className="font-bold">気血水</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">運動動態・偏り</span>
                </div>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 3</span>
                  <span className="font-bold">臓腑経絡</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">局在病位の特定</span>
                </div>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#E6C387] block">STEP 4</span>
                  <span className="font-bold text-[#E6C387]">一文の証</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">病態の本質言語化</span>
                </div>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-[10px] text-[#A0B0BC] block">STEP 5</span>
                  <span className="font-bold">治則・治法</span>
                  <span className="text-[9px] text-[#C5D3DF] block mt-0.5">介入戦略ルール</span>
                </div>
                <div className="p-2 rounded-xl bg-[#E6C387] text-[#1E2D3D]">
                  <span className="text-[10px] font-bold block opacity-80">STEP 6</span>
                  <span className="font-bold">最小配穴</span>
                  <span className="text-[9px] block mt-0.5">太衝＋陽陵泉 等</span>
                </div>
              </div>
            </div>

            {/* シミュレーター内の4大推論ツール */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <Link
                href="/simulator?tab=diagnosis"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Layers className="w-4 h-4 text-[#E6C387]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-xs text-white">八綱・臓腑 弁証判定</h4>
                <p className="text-[11px] text-[#A0B0BC] mt-0.5">3段階フィルターで一文の証を自動導出</p>
              </Link>

              <Link
                href="/simulator?tab=haiketsu"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Compass className="w-4 h-4 text-[#74BA9E]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-xs text-white">配穴最適化エンジン</h4>
                <p className="text-[11px] text-[#A0B0BC] mt-0.5">主穴×配穴の相乗効果と臨床根拠を提示</p>
              </Link>

              <Link
                href="/simulator?tab=case"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Stethoscope className="w-4 h-4 text-[#E6C387]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-xs text-white">症例問題・推論演習</h4>
                <p className="text-[11px] text-[#A0B0BC] mt-0.5">四診の所見から鑑別ステップを回答</p>
              </Link>

              <Link
                href="/simulator?tab=depth"
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Activity className="w-4 h-4 text-[#74BA9E]" />
                  <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-xs text-white">経気深度・刺激量制御</h4>
                <p className="text-[11px] text-[#A0B0BC] mt-0.5">病位深浅・刺鍼深度・過剰刺激の防止</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 【調べる】知識グラフと経穴辞典・学術論文 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 知識グラフ思想の可視化バナー */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E8E1D1] dark:border-[#22303D] pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8]">
                <Network className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                  相互接続された「知識グラフ」
                </h3>
                <span className="text-[11px] text-[#59615D] dark:text-[#A0B0BC]">
                  経穴・経絡・臓腑・病機・診断・治法・症例が有機的に連動
                </span>
              </div>
            </div>
            <span className="text-xs text-[#737C77] dark:text-[#8899A6] hidden md:inline">
              独立したデータではなく、思考のネットワークとして探索可能
            </span>
          </div>

          {/* 太衝を例にした知識グラフの流れ */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E] text-[11px]">
              例：経穴「太衝（LR3）」を起点とした情報横断
            </span>
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#FFFFFF] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] min-w-max">
                <span className="px-2.5 py-1 rounded bg-[#EBF3EF] dark:bg-[#182823] font-bold text-[#1E3D34] dark:text-[#83BEA8]">
                  太衝（経穴）
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] dark:bg-[#17212A] text-[#404743] dark:text-[#C5D2DB]">
                  足厥陰肝経（経絡）
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] dark:bg-[#17212A] text-[#404743] dark:text-[#C5D2DB]">
                  肝（臓腑・蔵血と疏泄）
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] dark:bg-[#17212A] text-[#A83629] dark:text-[#C47A72]">
                  肝気鬱結・気滞（病機）
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
                <span className="px-2.5 py-1 rounded bg-[#FAF8F5] dark:bg-[#17212A] text-[#285A52] dark:text-[#74BA9E]">
                  疏肝理気（治法）
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A0B0BC]" />
                <span className="px-2.5 py-1 rounded bg-[#FCF4EB] dark:bg-[#2A2117] font-bold text-[#B86924] dark:text-[#E6C387]">
                  太衝×陽陵泉（相乗配穴）
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 要穴ピックアップ */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
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
              <span>全361穴の経穴辞典へ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredTsubos.map((tsubo) => (
              <div
                key={tsubo.id}
                className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all flex flex-col justify-between"
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
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#404743] dark:text-[#C5D2DB]"
                      >
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
        </div>

        {/* 臨床知見・論文抄読ピックアップ */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/articles?article=${article.id}`}
                className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 hover:border-[#1E3D34] dark:hover:border-[#74BA9E] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#737C77] dark:text-[#8899A6] mb-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] text-[#1E3D34] dark:text-[#83BEA8] font-medium text-[11px]">
                      {article.category}
                    </span>
                    <span>約 {article.readTime}</span>
                  </div>

                  <h3 className="font-sans text-base font-bold text-[#232826] dark:text-[#FAF8F5] group-hover:text-[#1E3D34] dark:group-hover:text-[#74BA9E] transition-colors leading-snug tracking-normal mb-1.5">
                    {article.title}
                  </h3>

                  {article.subtitle && (
                    <p className="text-xs text-[#737C77] dark:text-[#8899A6] font-medium leading-relaxed line-clamp-1 mb-2">
                      {article.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] leading-relaxed line-clamp-2 mb-3">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F2ECE0] dark:border-[#22303D] text-xs">
                  <span className="text-[#737C77] dark:text-[#8899A6] text-[11px]">執筆・監修：はり太郎</span>
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

      {/* 5. 東洋医学と現代医学の扱い（信頼性と3層基準の明示） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border-2 border-[#1E3D34]/20 dark:border-[#2A3B4A] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F0EAE1] dark:border-[#22303D] pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>学術的信頼性とエビデンス管理</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                東洋医学と現代医学の3層分離基準
              </h2>
            </div>
            <p className="text-xs text-[#59615D] dark:text-[#A0B0BC] max-w-md">
              伝統概念（気・血・水）と現代医科学（自律神経・炎症・間質）を安易に同一視せず、以下の3層を明確に区別して記載しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] space-y-2">
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                層1：古典・伝統医学の理論
              </span>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                「東洋医学ではこのように説明する」<br />
                黄帝内経・傷寒論などの原典体系および歴代の臨床知見をそのまま忠実に整理。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] space-y-2">
              <span className="text-xs font-bold text-[#1E2D3D] dark:text-[#7BAAD8] block">
                層2：現代医学による説明
              </span>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                「現代医学ではこの現象をこのように説明できる」<br />
                体性内臓反射、軸索反射、神経ペプチド放出など査読論文に基づく生理学的機序。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#22303D] space-y-2">
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387] block">
                層3：統合的な仮説
              </span>
              <p className="text-xs text-[#404743] dark:text-[#C5D2DB] leading-relaxed">
                「両者を接続すると、このように考えることもできる」<br />
                未解明部分を明記し、仮説・類似性・確立知見のステータスを厳格に分けて提示。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 東洋医学を知る入口（入門・セルフケア・日常の応用） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-t border-[#E8E1D1] dark:border-[#22303D] pt-12 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#737C77] dark:text-[#8899A6] tracking-widest uppercase">
                Gateway to Practice
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] mt-0.5">
                東洋医学を知る入口（入門・セルフケア）
              </h2>
            </div>
            <p className="text-xs text-[#737C77] dark:text-[#8899A6]">
              初学者や一般の方、患者への養生指導にそのまま活用できる直感的ツール群
            </p>
          </div>
        </div>

        {/* 天人相応・二十四節気バナー */}
        <SeasonalBanner />

        {/* 気血水セルフ診断 CTAバナー */}
        <div className="bg-gradient-to-br from-[#1E3D34] to-[#152C25] dark:from-[#1A382F] dark:to-[#0E1A16] rounded-3xl p-6 sm:p-10 text-[#FAF8F5] relative overflow-hidden shadow-lg border border-[#2B594C]/40">
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

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E6C387] text-[#1E3D34] hover:bg-[#DFC07D] font-bold text-xs sm:text-sm shadow-md transition-all group"
              >
                <span>体質診断を始める（約2分）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/diagnosis?tab=gorou"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Activity className="w-4 h-4 text-[#E6C387]" />
                <span>五労チェッカー</span>
              </Link>
              <Link
                href="/symptoms"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-[#C5D3DF] hover:text-white text-xs sm:text-sm transition-all"
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
