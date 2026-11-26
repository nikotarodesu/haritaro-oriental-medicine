import { approvedIntro } from "./approvedIntro";

interface UnitDefinition {
  slug: string;
  chapter: string;
  title: string;
  description: string;
  opening: readonly [string, ...string[]];
  parts: readonly (readonly [lectureId: string, label: string])[];
}

const units: readonly UnitDefinition[] = [
  {
    slug: "getting-started", chapter: "intro", title: "東洋医学とは？",
    description: approvedIntro.description,
    opening: [approvedIntro.lead],
    parts: [["lecture-intro-1", "同じ「疲れる」を二つの医学で考える"], ["lecture-intro-2", "何に困り、どう変わってほしいか"]],
  },
  {
    slug: "reading-evidence", chapter: "intro", title: "用語集・研究・体調メモの読み方",
    description: "用語集で「気虚」の意味を調べ、膝の試験を棒グラフで読みます。体調メモでは、本人の話と聞き手の考えを書き分けます。",
    opening: [
      "「休んだら楽になった」というメモから分かるのは、その人がその日に感じた変化です。施術を受けた人と別の方法を試した人に違いがあったかは、論文でどんな人を対象に何を比べたかを確かめます。",
    ],
    parts: [["lecture-intro-3", "用語集を開くとき、論文を開くとき"], ["lecture-intro-4", "体調メモに何を書く？"]],
  },
  {
    slug: "yin-yang-basics", chapter: "yin-yang", title: "陰陽とは？ 比べ方と変わり方",
    description: "同じ40℃のお湯も、氷水と比べれば温かく、熱湯と比べれば冷たくなります。湯の温度や、ほてりと冷えが出る時間帯を図で比べます。",
    opening: [
      "陰陽の見方では、何と何を、どんな基準で比べるかを最初に決めます。身近な場面から、比べる基準や時間が変わると読み方がどう変わるかを見ます。",
    ],
    parts: [
      ["lecture-yinyang-1", "明るさで比べるか、動きで比べるか"],
      ["lecture-yinyang-2", "同じお湯が陽にも陰にもなる"],
      ["lecture-yinyang-3", "対立・制約・互根の違い"],
      ["lecture-yinyang-4", "少しずつ変わる、途中で切り替わる"],
      ["lecture-yinyang-5", "どの場所、どの働きを比べる？"],
      ["lecture-yinyang-6", "何が多く、何が足りない？"],
      ["lecture-yinyang-7", "本人の話と診察で見たこと"],
      ["lecture-yinyang-8", "顔のほてりと足の冷えが出る時間帯"],
    ],
  },
  {
    slug: "qi-blood-fluids", chapter: "qi-blood-water", title: "気・血・津液とは？",
    description: "気・血・津液（気血水）がそれぞれ何をするのか、動かす・養う・潤すという働きの違いと関係を図で説明します。",
    opening: [
      "東洋医学では、体を動かす、養う、潤すという働きを「気」「血」「津液」で説明します。この講義では、三つの役割を並べたあと、気と血がどう支え合うと考えるのかを図で見ます。",
    ],
    parts: [
      ["lecture-qiblood-1", "気は何をする？"],
      ["lecture-qiblood-2", "血が養うもの、潤すもの"],
      ["lecture-qiblood-3", "「津」と「液」はどう違う？"],
      ["lecture-qiblood-4", "気と血の関係、血と津液の由来"],
      ["lecture-qiblood-5", "散歩のあとに感じた温かさ"],
    ],
  },
  {
    slug: "zangfu-basics", chapter: "zangfu", title: "五臓と六腑は何をする？",
    description: "呼吸や朝ごはんを例に五臓・六腑の働きを読み、肺と大腸、肝と胆などを結ぶ表裏の六つの組を図で確かめます。",
    opening: [
      "朝ごはんを食べる場面で、東洋医学の「胃」と「脾」の働きを比べます。食べ物を受け取るのが胃、その食事から得たものを体に配る働きを担うのが脾です。",
    ],
    parts: [
      ["lecture-zangfu-1", "五臓と六腑の名前"],
      ["lecture-zangfu-2", "肺と心は何をする？"],
      ["lecture-zangfu-3", "朝ごはんを受け取る胃、変えて配る脾"],
      ["lecture-zangfu-4", "肝と腎が蓄えるもの"],
      ["lecture-zangfu-5", "臓と腑を組にする「表裏」"],
    ],
  },
  {
    slug: "body-functions", chapter: "vital-function", title: "宗気・営気・衛気の違い",
    description: "食事と呼吸から宗気が生まれるという説明を読み、体の内を養う営気と、体の表面を守る衛気を比べます。",
    opening: [
      "古典では、食事から得るものと、呼吸で取り込む気が合わさって、胸に集まる「宗気（そうき）」になると考えます。ここから、営気と衛気がそれぞれどこで何をすると説明されるかを読み分けます。",
    ],
    parts: [["lecture-lifedynamics-1", "食べる、歩く、休む"], ["lecture-lifedynamics-2", "成長の「精」と心の「神」"], ["lecture-lifedynamics-3", "食べものと呼吸から生まれる宗気"], ["lecture-lifedynamics-4", "内を養う営気、表を守る衛気"]],
  },
  {
    slug: "triple-burner-and-movement", chapter: "vital-function", title: "三焦と体の中を巡る津液",
    description: "汁物を飲む例で、三焦の上・中・下にどんな働きを当てるかを見ます。図では、気や津液が上がる、下がる、出入りするときの向きを確かめます。",
    opening: [
      "汁物を飲んだあと、取り込んだ水分を体に配り、不要なものを外に出します。東洋医学では、三焦（さんしょう）という言葉を使って、こうした働きを体の上・中・下に分けて説明します。",
    ],
    parts: [["lecture-lifedynamics-5", "三焦の上・中・下"], ["lecture-lifedynamics-6", "脾と胃で分けて考える"], ["lecture-lifedynamics-7", "上へ、下へ、外へ、内へ"], ["lecture-lifedynamics-11", "水分を変える、配る、調整する"], ["lecture-lifedynamics-12", "朝の一杯に戻って考える"]],
  },
  {
    slug: "daily-and-seasonal-changes", chapter: "vital-function", title: "昼と夜、季節と体調",
    description: "古典に出てくる昼夜や四季の説明を読みます。眠りや疲れの記録では、寝た時刻、夜に起きた回数、翌日に困ったことを例にします。",
    opening: [
      "寒い屋外で長く過ごした日と、夜中に何度も目が覚めた日は、同じ冬でも過ごし方が違います。「冬は疲れやすい」と感じたら、季節に加え、その日にいた場所や前夜の眠りも記録します。",
    ],
    parts: [["lecture-lifedynamics-8", "夜中に目が覚めた日の記録"], ["lecture-lifedynamics-9", "季節の名前と、その日の気温"], ["lecture-lifedynamics-10", "普段の買い物でも疲れる？"]],
  },
  {
    slug: "five-elements", chapter: "five-elements", title: "五行とは？ 矢印と表の読み方",
    description: "木から火へ向かう相生と、木から土へ向かう相剋。二本の矢印を比べ、次に五行の表で臓腑や季節がどの行に並ぶかを見ます。",
    opening: [
      "五行の図には、相手を支える「相生」と、相手の働きを抑える「相剋」の矢印があります。矢印の行き先を確かめてから、五臓や季節が表のどこに並ぶかを見ます。",
    ],
    parts: [
      ["lecture-wuxing-1", "五つの名前で何を表す？"],
      ["lecture-wuxing-2", "木は伸び、火は上る"],
      ["lecture-wuxing-3", "相生は支え、相剋は抑える"],
      ["lecture-wuxing-8", "同じ水でも母にも子にもなる"],
      ["lecture-wuxing-4", "五行表から五臓を探す"],
      ["lecture-wuxing-5", "口と唇は同じ行で、列が違う"],
      ["lecture-wuxing-6", "五神は心の働き、五志は感情"],
      ["lecture-wuxing-7", "季節と味を横に読む"],
    ],
  },
  {
    slug: "meridians-and-points", chapter: "meridians", title: "経絡・経脈・経穴の違い",
    description: "経絡図の道筋と、一つずつ名前が付いた経穴（ツボ）。合谷の番号LI4から、ツボ図鑑で場所を探す方法まで説明します。",
    opening: [
      "合谷（ごうこく）の番号はLI4です。路線図のように見ると、「LI」が路線にあたる大腸経、「4」がその道筋に並ぶツボの番号です。図で合谷の前後を見てから、ツボ図鑑で手のどこにあるかを確かめます。",
    ],
    parts: [["lecture-meridians-1", "道筋をたどり、一つのツボを探す"]],
  },
  {
    slug: "pathomechanism-basics", chapter: "pathology", title: "病因と病機はどう違う？",
    description: "雨にぬれて夜更かしした翌朝、だるさが出た例を読みます。不調に何が関わったと考えるかが病因、どんな変化が重なったと考えるかが病機です。",
    opening: [
      "帰り道で雨にぬれ、その晩は夜更かしした。翌朝は体がだるかった。ここまでが本人の話です。どの出来事が関わったと考えるかが「病因」、どんな変化を経てだるさが出たと考えるかが「病機」です。",
    ],
    parts: [["lecture-pathomechanism-1", "症状・病因・病機・証の違い"], ["lecture-pathomechanism-2", "出来事とだるさを順に並べる"], ["lecture-pathomechanism-7", "風や寒さを表す古典の言葉"], ["lecture-pathomechanism-8", "食事や休み方が変わった日"]],
  },
  {
    slug: "qi-blood-and-patterns", chapter: "pathology", title: "気・血・津液の不足と滞り",
    description: "疲れと張り、皮膚の乾きと同じ場所を刺すような痛みを比べます。気虚・気滞・血虚・瘀血の候補を考えるとき、どの所見を見るかを読みます。",
    opening: [
      "階段を上るとすぐ疲れる人と、緊張するとお腹が張る人がいます。東洋医学では、疲れや張りがいつ出て、何をすると変わるかを聞き、気の不足や滞りといった候補を考えます。",
    ],
    parts: [["lecture-pathomechanism-3", "気虚・気滞・気逆・気陥の違い"], ["lecture-pathomechanism-4", "口の乾きと水分の滞り"], ["lecture-pathomechanism-5", "血虚と瘀血はどう違う？"], ["lecture-pathomechanism-6", "寒熱と虚実を掛け合わせる"]],
  },
  {
    slug: "how-patterns-change", chapter: "pathology", title: "不調の経過から、次に何を聞く？",
    description: "食欲が落ちた後に寝つきが悪くなった例を使います。始まった順番と、片方が戻った後ももう片方が続いたかを聞き、見立てを比べます。",
    opening: [
      "食欲が落ちた数日後から、寝つきも悪くなったそうです。「食べられるようになった日の夜も、寝つきにくかったですか」。始まった順番に加え、食欲が戻ったあとも眠りづらさが続いたかを確かめます。",
    ],
    parts: [
      ["lecture-pathomechanism-9", "五行の矢印はどちら向き？"],
      ["lecture-pathomechanism-10", "始まったときと、今どう過ごしているか"],
      ["lecture-pathomechanism-11", "二つの見立てを並べる"],
      ["lecture-pathomechanism-12", "食欲が戻った日の夜は？"],
    ],
  },
  {
    slug: "assessment-basics", chapter: "diagnosis", title: "四診と弁証、何を確かめる？",
    description: "頭痛の相談を例に、本人が話したこと、見たこと、声やにおい、触れて分かったことをどう書くかを読みます。",
    opening: [
      "頭痛を相談しに来た人が「夕方になると画面を見ていられない」と話しました。まず、いつ始まり、どのくらい続いたか、いつもの頭痛と違うかを聞き、受診を急ぐ変化があるかを確かめます。東洋医学でいう「四診」では、見た様子、声やにおい、本人から聞いた話、触れて分かったことを記録します。",
    ],
    parts: [
      ["lecture-diagnosis-1", "見立てが「証」、考える過程が「弁証」"],
      ["lecture-diagnosis-2", "急いで受診した方がよいとき"],
      ["lecture-diagnosis-3", "一番困ることをどう伝える？"],
      ["lecture-diagnosis-4", "問診は本人の話から"],
      ["lecture-diagnosis-5", "目、耳、鼻で確かめる"],
      ["lecture-diagnosis-6", "触れる前に説明し、同意を得る"],
    ],
  },
  {
    slug: "assessment-frameworks", chapter: "diagnosis", title: "八綱で体の状態をどう読む？",
    description: "夕方に顔がほてり、寝る前に足先が冷える例を使い、寒熱をどう記録するかを見ます。八綱の四つの軸と、臓腑・経絡の見方を学びます。",
    opening: [
      "「夕方に顔がほてる。寝る前には足先が冷える」と聞きました。どこで何時ごろ感じたかを書き、同じ時間にも両方あったかを尋ねます。東洋医学で体の状態を捉える四組の見方が「八綱」です。この例では、そのうちの「寒熱」で冷えとほてりを読みます。",
    ],
    parts: [["lecture-diagnosis-7", "顔のほてりと足先の冷えをどう読む？"], ["lecture-diagnosis-8", "何が足りず、何が滞る？"], ["lecture-diagnosis-9", "臓腑は働き、経絡は場所を見る"]],
  },
  {
    slug: "principles-and-goals", chapter: "treatment", title: "施術の目標と、治法の読み方",
    description: "「洗濯物を干し終えたい」という例で、結果をどう比べるかを考えます。補瀉や理気などの治法名も、何を目指す言葉なのかから読みます。",
    opening: [
      "「肩は前より楽です。でも、夕方に洗濯物を10枚干す途中で、前回と同じように一度休みました」。これなら、痛みと、やりたい動作ができたかを別々に振り返れます。施術の目標は、本人が何をできるようになりたいかから考えます。",
    ],
    parts: [
      ["lecture-treatment-1", "できるようになりたいことを聞く"],
      ["lecture-treatment-2", "治則・治法・配穴は何を表す？"],
      ["lecture-treatment-4", "背景と、今つらいこと"],
      ["lecture-treatment-10", "次は何を振り返る？"],
      ["lecture-treatment-3", "足りない働きを補い、行き過ぎを抑える"],
      ["lecture-treatment-5", "気を補う、巡りを整える"],
      ["lecture-treatment-6", "血を養う、津液を巡らせる"],
      ["lecture-treatment-7", "二つの臓が入る治法名"],
    ],
  },
];

export function readingPartAnchor(lectureId: string) {
  return `part-${lectureId}`;
}

export const readingUnits = units.map(unit => ({
  ...unit,
  href: `/learn/lectures/${unit.slug}`,
  parts: unit.parts.map(([lectureId, label]) => ({ lectureId, label, anchor: readingPartAnchor(lectureId) })),
}));

export const READING_LECTURES_REVISED_AT = "2026-11-24";

const unitsBySlug = new Map(readingUnits.map(unit => [unit.slug, unit]));
const unitsByPart = new Map(readingUnits.flatMap(unit => unit.parts.map(part => [part.lectureId, unit] as const)));

export function getReadingUnit(slug: string) {
  return unitsBySlug.get(slug);
}

export function getReadingUnitForLecture(lectureId: string) {
  return unitsByPart.get(lectureId);
}

export function readingPartHref(lectureId: string) {
  const unit = getReadingUnitForLecture(lectureId);
  return unit ? `${unit.href}#${readingPartAnchor(lectureId)}` : `/curriculum/${lectureId}`;
}

export function readingLinkHref(href: string, currentUnitHref?: string) {
  const lectureId = /^\/curriculum\/(lecture-[a-z0-9-]+)$/.exec(href)?.[1];
  if (!lectureId) return href;
  const unit = getReadingUnitForLecture(lectureId);
  return unit?.href === currentUnitHref && unit
    ? `#${readingPartAnchor(lectureId)}`
    : readingPartHref(lectureId);
}
