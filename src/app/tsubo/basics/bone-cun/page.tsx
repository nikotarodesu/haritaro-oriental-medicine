import { Metadata } from "next";
import Link from "next/link";
import { Compass, Ruler, ArrowLeft, Layers, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "骨度法・取穴の基礎知識｜体表目印と同身寸の測り方 | はり太郎の経穴辞典",
  description:
    "東洋医学の取穴に欠かせない「骨度法（骨度折量寸法）」と「同身寸（指寸）」の基準表。前額部・胸腹部・背部・上肢・下肢の基準寸法と触診目印を徹底解説。",
  alternates: {
    canonical: "/tsubo/basics/bone-cun",
  },
};

export default function BoneCunPage() {
  const BONE_CUN_TABLE = [
    {
      region: "頭部",
      item: "前髪際 ↔ 後髪際",
      cun: "12寸",
      note: "髪際不明瞭な場合は眉間（印堂）〜後頭骨下端（大椎上）を18寸とし、印堂〜前髪際3寸、後髪際〜大椎3寸とする。",
    },
    {
      region: "頭部",
      item: "両額角髪際（頭維間）",
      cun: "9寸",
      note: "前頭部両側の額角間の横幅。",
    },
    {
      region: "胸腹部",
      item: "両乳頭間",
      cun: "8寸",
      note: "男性または平坦な胸郭における第4肋間鎖骨中線間の標準幅。",
    },
    {
      region: "胸腹部",
      item: "胸骨体下端（胸剣結合部） ↔ 臍中央",
      cun: "8寸",
      note: "中脘はちょうど中点（臍上4寸）に位置する。",
    },
    {
      region: "胸腹部",
      item: "臍中央 ↔ 恥骨結合上縁",
      cun: "5寸",
      note: "気海は臍下1.5寸、関元は臍下3寸、中極は臍下4寸。",
    },
    {
      region: "背部",
      item: "脊柱正中線 ↔ 肩甲骨内側縁",
      cun: "3寸",
      note: "背部第1行（兪穴）は1.5寸、第2行は3寸。",
    },
    {
      region: "上肢",
      item: "腋窩横紋前端 ↔ 肘窩横紋（尺沢・曲沢）",
      cun: "9寸",
      note: "上腕前面の縦幅寸法。",
    },
    {
      region: "上肢",
      item: "肘窩横紋 ↔ 手関節掌側横紋（大陵・太淵）",
      cun: "12寸",
      note: "前腕の標準縦幅。内関（手関節上2寸）、孔最（手関節上7寸）の計測基準。",
    },
    {
      region: "下肢",
      item: "恥骨結合上縁 ↔ 大腿骨内側顆上縁",
      cun: "18寸",
      note: "大腿内側の縦幅寸法。",
    },
    {
      region: "下肢",
      item: "大転子頂点 ↔ 膝窩中央（委中）",
      cun: "19寸",
      note: "大腿外側の縦幅寸法。",
    },
    {
      region: "下肢",
      item: "膝窩中央（委中） ↔ 外果尖",
      cun: "16寸",
      note: "下腿後外側の縦幅寸法。豊隆・条口（外果上8寸）の計測基準。",
    },
    {
      region: "下肢",
      item: "脛骨内側顆下縁（陰陵泉） ↔ 内果尖（太谿）",
      cun: "13寸",
      note: "下腿内側の縦幅寸法。三陰交（内果上3寸）、地機（内果上10寸）の計測基準。",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "骨度法・取穴の基礎知識｜体表目印と同身寸の測り方",
        "description":
          "東洋医学の取穴に欠かせない「骨度法（骨度折量寸法）」と「同身寸（指寸）」の基準表。前額部・胸腹部・背部・上肢・下肢の基準寸法と触診目印を徹底解説。",
        "url": "https://www.haritaro.jp/tsubo/basics/bone-cun",
        "author": {
          "@type": "Person",
          "name": "はり太郎",
        },
        "publisher": {
          "@type": "Organization",
          "name": "はり太郎の東洋医学",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.haritaro.jp/icon.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "ホーム",
            "item": "https://www.haritaro.jp",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "経穴辞典",
            "item": "https://www.haritaro.jp/tsubo",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "骨度法・取穴の基礎",
            "item": "https://www.haritaro.jp/tsubo/basics/bone-cun",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      {/* 構造化データ埋め込み */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-xs text-[#737C77] dark:text-[#8899A6]">
          <Link href="/" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/tsubo" className="hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors">
            経穴辞典
          </Link>
          <span>/</span>
          <span className="text-[#232826] dark:text-[#FAF8F5] font-bold">骨度法・取穴の基礎</span>
        </nav>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <Ruler className="w-3.5 h-3.5" />
            <span>Acupuncture Point Localization</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            骨度法・取穴の基礎（骨度折量寸と同身寸）
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            体格や骨格の個人差を超えて正確に経穴を特定するための比率測定法「骨度法」と、指の幅を用いた「同身寸」の基本をまとめました。
          </p>
        </div>

        {/* 同身寸の解説カード */}
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Compass className="w-5 h-5" />
            <h2>同身寸（指寸取穴法）の種類と目安</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-sm text-[#1E3D34] dark:text-[#74BA9E] block">
                1寸（母指寸）
              </span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                患者自身の親指（母指）の指節関節の横幅を「1寸」とする。四肢の短い距離の計測に用いる。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-sm text-[#B86924] dark:text-[#E6C387] block">
                1.5寸 / 2寸
              </span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                示指・中指の2本幅を「1.5寸」、示指・中指・薬指の3本幅を「2寸（内関の計測）」とする。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] space-y-2">
              <span className="font-bold text-sm text-[#1E2D3D] dark:text-[#7BAAD8] block">
                3寸（横指同身寸）
              </span>
              <p className="text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                示指・中指・薬指・小指の4本の第2関節幅を揃えた幅を「3寸」とする（足三里・三陰交の計測）。
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FCF4EB] dark:bg-[#281E15] border border-[#F3DEC5] dark:border-[#423321] text-xs text-[#8C4F1A] dark:text-[#E6C387] leading-relaxed">
            ⚠️ <strong>注意点：</strong>「指何本分」という同身寸はあくまでも目安であり、体格の肥痩や手足の比率によって骨度法とズレが生じることがあります。必ず触診による骨性目印・筋腱の陥凹部の触知と照合して決定してください。
          </div>
        </div>

        {/* 骨度折量寸法 表 */}
        <div className="bg-[#FFFFFF] dark:bg-[#17212A] rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-5 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#1E3D34] dark:text-[#74BA9E] border-b border-[#F2ECE0] dark:border-[#22303D] pb-3">
            <Ruler className="w-5 h-5" />
            <h2>骨度折量寸法 基準一覧表</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E1D1] dark:border-[#22303D] bg-[#FAF8F5] dark:bg-[#121920] text-[#1E3D34] dark:text-[#74BA9E]">
                  <th className="p-3 font-bold">部位</th>
                  <th className="p-3 font-bold">基準ランドマーク（起点 ↔ 終点）</th>
                  <th className="p-3 font-bold">折量寸法</th>
                  <th className="p-3 font-bold">代表的な関連経穴と備考</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0] dark:divide-[#22303D] text-[#333835] dark:text-[#C5D2DB]">
                {BONE_CUN_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5] dark:hover:bg-[#10171F]">
                    <td className="p-3 font-semibold text-[#1E3D34] dark:text-[#74BA9E] whitespace-nowrap">
                      {row.region}
                    </td>
                    <td className="p-3 font-medium whitespace-nowrap">{row.item}</td>
                    <td className="p-3 font-bold font-mono text-[#B86924] dark:text-[#E6C387] whitespace-nowrap">
                      {row.cun}
                    </td>
                    <td className="p-3 text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
