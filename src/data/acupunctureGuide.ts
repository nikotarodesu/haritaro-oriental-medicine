import { WHO_ATLAS_PDF } from "./tsubo/atlas/whoAtlasPages";

export const ACUPUNCTURE_GUIDE_SOURCES = [
  {
    id: "japan",
    title: "厚生労働省の審議会資料『あん摩マッサージ指圧師・はり師・きゅう師について』",
    href: "https://www.mhlw.go.jp/content/11601000/000858705.pdf#page=2",
    scope: "p.2–5。免許の名称、はりの接触・刺入による刺激、きゅうの温熱刺激を確認。",
  },
  {
    id: "seirin-insert",
    title: "PMDA掲載「セイリン鍼」電子添文（2026年5月・第13版）",
    href: "https://www.pmda.go.jp/PmdaSearch/kikiDetail/ResultDataSetPDF/380043_15500BZZ00805000_1_01_13",
    scope: "各部の名称、ステンレス鋼の鍼体、3番の線径0.20 mm、滅菌済み単回使用。",
  },
  {
    id: "seirin-j-type",
    title: "セイリン公式「J-Type」製品資料（英語）",
    href: "https://www.global.seirin.jp/english/j_type.html",
    scope: "線径0.20 mmに対応する青い鍼柄、鍼体の長さ30・40・50・60 mm、鍼管付きの個包装。",
  },
  {
    id: "seirin-sun",
    title: "セイリン公式のJタイプ国内規格表記",
    href: "https://www.seirin.jp/news/s-0kokmll",
    scope: "掲載されたJタイプの規格名で、40 mmを「寸3」と表記。",
  },
  {
    id: "moxa-pedestal",
    title: "せんねん灸「台座灸せんねん灸の誕生」「台座の穴のひみつ」",
    href: "https://www.sennenq.co.jp/off50th/",
    scope: "和紙で巻いたもぐさ、紙パルプの台座、中央の通気孔。オフシリーズの製品例に「ソフトきゅう 竹生島」を掲載。",
  },
  {
    id: "moxa-instructions",
    title: "せんねん灸オフ ご使用説明書",
    href: "https://www.sennenq.co.jp/common/pdf/standard.pdf",
    scope: "もぐさと台座の名称、熱の感じ方の個人差、煙が見えなくなった後も続く温熱、水疱ややけど。",
  },
  {
    id: "moxa-burns",
    title: "国民生活センター「台座灸でやけど」（2017年）",
    href: "https://www.kokusen.go.jp/pdf/n-20170511_2.pdf",
    scope: "台座灸によるやけどの相談を受けた構造と温度の調査。",
  },
  {
    id: "who-practice",
    title: "WHO benchmarks for the practice of acupuncture（2021年）",
    href: "https://www.who.int/publications/i/item/978-92-4-001688-0",
    scope: "施術前の評価、説明・同意、衛生管理、安全に施術を行うための基準。",
  },
  {
    id: "safety",
    title: "全日本鍼灸学会『鍼灸安全対策ガイドライン』2025年版",
    href: "https://safety.jsam.jp/img/file1.pdf",
    scope: "改訂第2版。感染対策、鍼や灸の有害事象、施術前後の確認事項。",
  },
  {
    id: "who-points",
    title: "WHO Standard Acupuncture Point Locations in the Western Pacific Region",
    href: WHO_ATLAS_PDF,
    scope: "経穴の位置と名称、体の目印や寸を使った表記。",
  },
  {
    id: "insurance",
    title: "厚生労働省 東海北陸厚生局「あはき療養費について」",
    href: "https://kouseikyoku.mhlw.go.jp/tokaihokuriku/newpage_00084.html",
    scope: "対象となる疾患の考え方と、保険医の同意書。",
  },
  {
    id: "tissue",
    title: "Langevinら「人の鍼刺激に対する力学的な反応」（2001年）",
    href: "https://pubmed.ncbi.nlm.nih.gov/11717207/",
    scope: "60人を対象に、鍼を抜くのに必要な力を測定した研究。",
  },
  {
    id: "brain",
    title: "Harrisら「鍼と偽鍼のμオピオイド受容体への影響」（2009年）",
    href: "https://pubmed.ncbi.nlm.nih.gov/19501658/",
    scope: "線維筋痛症の人を対象に、痛みの調節に関わる受容体の指標をPET画像で比較。",
  },
  {
    id: "factorial",
    title: "Kahanら「要因を組み合わせるランダム化比較試験の報告指針」（2023年）",
    href: "https://pubmed.ncbi.nlm.nih.gov/38051324/",
    scope: "CONSORT拡張版。比較する群、相互作用の推定とその精度をどう報告するか。",
  },
] as const;

export const ACUPUNCTURE_LOW_BACK_PAIN_STUDY = {
  id: "example-back-pain-point-selection",
  title: "腰痛で困ることは、どれくらい減った？",
  context: "腰痛が長く続く大人638人を、くじ引きのように4組に分けました。1組は、つまようじを皮膚に当てて鍼の施術をまねる方法（偽鍼・ぎしん）を受けました。",
  result: "普段の治療の組より、ほかの3組で点数が大きく下がりました。その3組の間では、はっきりした差は見つかりませんでした。",
  limit: "この研究で比べたのは施術全体です。ツボを一つ足したときの違いを知るには、ほかの条件をそろえ、足した組と足さなかった組を比べます。",
  source: "Cherkinらの腰痛の試験（2009年・英語）",
  href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2832641/",
  outcomes: [
    { label: "人に合わせた鍼", change: 4.4 },
    { label: "同じツボを使う鍼", change: 4.5 },
    { label: "鍼をまねた方法", change: 4.4 },
    { label: "普段の治療", change: 2.1 },
  ],
} as const;

export const ACUPUNCTURE_STUDY_EXAMPLES = [
  {
    id: "chronic-pain",
    title: "長引く痛みに鍼を使うと？",
    context: "長引く腰痛や頭痛、肩の痛み、膝などの関節の痛み（変形性関節症）を調べた39件の試験（20,827人）をまとめました。",
    result: "鍼を受けた人は、痛みや動きやすさが平均で改善しました。鍼をまねた方法との差は小さく、鍼を受けなかった人と比べると、差はより大きく出ました。",
    limit: "複数の症状を含む結果です。症状ごとの違いは、論文の表で確認できます。",
    numbers: "研究ごとに使う点数が違うため、点数のばらつき（標準偏差）を共通のものさしにしました。鍼をまねた方法との差は約0.2、鍼を受けなかった組との差は約0.5です。",
    source: "Vickersらがまとめた研究（2018年・英語）",
    href: "https://pubmed.ncbi.nlm.nih.gov/29198932/",
  },
  {
    id: "pc6",
    title: "手術後の吐き気は減る？",
    context: "手首の内関（ないかん・PC6）を鍼や圧迫バンドなどで刺激した77件の試験（9,847人）をまとめました。",
    result: "刺激や薬をまねた方法と比べ、内関への刺激だけの場合も、吐き気止めと組み合わせた場合も、手術後に吐き気を感じたり吐いたりする人が減る可能性がありました。",
    limit: "手術の種類や刺激の方法は試験ごとに違い、結果の確かさは全体として低いと評価されました。",
    source: "コクランの研究まとめ（2025年・日本語）",
    href: "https://www.cochrane.org/ja/evidence/CD003281_what-are-benefits-and-risks-different-wrist-pc6-acupoint-stimulation-techniques-preventing-nausea",
    pointHref: "/tsubo/pc6#acupoint-research",
    pointLabel: "図鑑で内関の研究を読む",
  },
  {
    id: "moxa-breech",
    title: "逆子のとき、お灸で向きは変わる？",
    context: "逆子の妊婦2,181人が参加した13件の試験をまとめました。足の至陰（しいん・BL67）へのお灸を調べた研究です。",
    result: "妊婦健診など普段のケアにお灸を加えると、出産時に頭が下を向いている赤ちゃんの割合は増えるとみられました。帝王切開の割合への影響は小さいとみられました。",
    limit: "望ましくない反応がどれくらい起こるかは、資料が少なく不明です。妊娠中に施術を考えるときは、担当の産科に相談してください。",
    source: "コクランの研究まとめ（2023年・日本語）",
    href: "https://www.cochrane.org/ja/evidence/CD003928_moxibustion-turning-baby-breech-position",
    pointHref: "/tsubo/bl67#acupoint-research",
    pointLabel: "図鑑で至陰の研究を読む",
  },
] as const;
