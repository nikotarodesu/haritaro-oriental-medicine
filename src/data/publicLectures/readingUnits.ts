import { approvedIntro } from "./approvedIntro";
import { getPublicLectureGroups, getPublicLectureSeries, type PublicLectureSeries } from "./index";

interface UnitDefinition {
  slug: string;
  chapter: string;
  title: string;
  description: string;
  opening: readonly [string, ...string[]];
  parts: readonly (readonly [lectureId: string, label: string])[];
  featuredDiagrams?: readonly string[];
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
    description: "用語集で何が分かり、研究ではどんなことを調べるのか。論文と体調メモを例に、測ったことや聞いたことと、そこから考えたことを分けます。",
    opening: [
      "「休んだら楽になった」。体調メモにあったこの一文から分かるのは、その人がその日にどう感じたかです。ほかの人にも同じ変化があったのかを知りたくなったら、だれに、どんな条件で確かめたのかを調べます。",
    ],
    parts: [["lecture-intro-3", "用語集を開くとき、論文を開くとき"], ["lecture-intro-4", "体調メモに何を書く？"]],
  },
  {
    slug: "yin-yang-basics", chapter: "yin-yang", title: "陰陽とは？ 比べ方と変わり方",
    description: "40℃のお湯、夜明けの空、顔のほてりと足の冷えを例に、陰陽の比べ方と変化を図でたどります。",
    opening: [
      "昼休み、日が差す窓辺でひと休み。明るさに注目すれば、部屋の奥より窓辺が陽です。動きに注目すれば、歩いていたときに比べ、座って休む時間が陰です。同じ窓辺の話でも、何を見たかで陰陽が変わります。",
    ],
    parts: [
      ["lecture-yinyang-1", "明るさで比べるか、動きで比べるか"],
      ["lecture-yinyang-2", "同じお湯が陽にも陰にもなる"],
      ["lecture-yinyang-3", "対立・制約・互根の違い"],
      ["lecture-yinyang-4", "少しずつ変わる、途中で切り替わる"],
      ["lecture-yinyang-5", "どの場所、どの働きを比べる？"],
      ["lecture-yinyang-6", "何が多く、何が足りない？"],
      ["lecture-yinyang-7", "本人の話と診察で見たこと"],
      ["lecture-yinyang-8", "ほてりと冷えは同じ時刻か"],
    ],
    featuredDiagrams: ["lecture-yinyang-1", "lecture-yinyang-2", "lecture-yinyang-4", "lecture-yinyang-7"],
  },
  {
    slug: "qi-blood-fluids", chapter: "qi-blood-water", title: "気・血・津液とは？",
    description: "体を動かす、養う、潤す。気・血・津液の働きと、互いにどう関わると考えられてきたかを図で読みます。",
    opening: [
      "気・血・津液（き・けつ・しんえき）は、初めてだと名前だけでは覚えにくい言葉です。本で「何を動かすのか」「どこを養うのか」「どう潤すのか」と動詞の方から読むと、それぞれの話を追いやすくなります。",
    ],
    parts: [
      ["lecture-qiblood-1", "気は何をする？"],
      ["lecture-qiblood-2", "血が養うもの、潤すもの"],
      ["lecture-qiblood-3", "「津」と「液」はどう違う？"],
      ["lecture-qiblood-4", "気と血の矢印、血と津液のもと"],
      ["lecture-qiblood-5", "散歩のあとに感じた温かさ"],
    ],
    featuredDiagrams: ["lecture-qiblood-1", "lecture-qiblood-3", "lecture-qiblood-4"],
  },
  {
    slug: "zangfu-basics", chapter: "zangfu", title: "五臓と六腑は何をする？",
    description: "呼吸や朝ごはんを例に五臓・六腑の働きを読み、肺と大腸、肝と胆などを結ぶ表裏の六つの組を図で確かめます。",
    opening: [
      "朝ごはんを食べると、古典には「胃が受ける」「脾が運ぶ」といった説明が出てきます。臓腑（ぞうふ）の名前には、東洋医学で体がどんな仕事をすると考えたかが詰まっています。",
    ],
    parts: [
      ["lecture-zangfu-1", "五臓と六腑の名前"],
      ["lecture-zangfu-2", "肺と心は何をする？"],
      ["lecture-zangfu-3", "朝ごはんを受け取る胃、変えて配る脾"],
      ["lecture-zangfu-4", "肝が流すもの、腎が蓄えるもの"],
      ["lecture-zangfu-5", "臓と腑を組にする「表裏」"],
    ],
    featuredDiagrams: ["lecture-zangfu-3", "lecture-zangfu-5"],
  },
  {
    slug: "body-functions", chapter: "vital-function", title: "宗気・営気・衛気の違い",
    description: "精と神の意味や、飲食と呼吸を結ぶ宗気、内を養う営気、体の表面を守る衛気を、普段の生活から考えます。",
    opening: [
      "古典で呼吸や声の話を読んでいると、食べものの話も出てきます。飲食から得るものと、息をすることで取り込むもの。両方が合わさると考えたのが宗気（そうき）です。",
    ],
    parts: [["lecture-lifedynamics-1", "食べる、歩く、休む"], ["lecture-lifedynamics-2", "成長の「精」と心の「神」"], ["lecture-lifedynamics-3", "食べものと呼吸から生まれる宗気"], ["lecture-lifedynamics-4", "内を養う営気、表を守る衛気"]],
  },
  {
    slug: "triple-burner-and-movement", chapter: "vital-function", title: "三焦と、体の中を巡る津液",
    description: "一杯の汁物を例に、三焦の上・中・下と「昇降出入」の向きを読みます。肺・脾・腎は水分をどう扱うと考えるのでしょうか。",
    opening: [
      "朝、温かい汁物を一杯飲みます。口に入ったものを受け取るところから、体に行き渡り、余った分が外に出るまで。古典には、その途中を上・中・下に分けて説明する「三焦（さんしょう）」という言葉があります。",
    ],
    parts: [["lecture-lifedynamics-5", "三焦の上・中・下"], ["lecture-lifedynamics-6", "脾と胃で分けて考える"], ["lecture-lifedynamics-7", "上へ、下へ、外へ、内へ"], ["lecture-lifedynamics-11", "水分を変える、配る、調整する"], ["lecture-lifedynamics-12", "朝の一杯に戻って考える"]],
    featuredDiagrams: ["lecture-lifedynamics-5", "lecture-lifedynamics-11"],
  },
  {
    slug: "daily-and-seasonal-changes", chapter: "vital-function", title: "昼と夜、季節と体調",
    description: "昔の本が昼夜や四季をどう描いたかを紹介します。眠りが浅い日や疲れが残る日は、何をメモすると経過を話しやすいかも考えます。",
    opening: [
      "「冬になると疲れやすい」と書いたあと、外に長くいた日と、前の晩にあまり眠れなかった日を思い出します。同じ冬でも、日によって過ごし方が違います。季節に加え、その日に何があったかを一行書いてみます。",
    ],
    parts: [["lecture-lifedynamics-8", "昼に動き、夜に休む"], ["lecture-lifedynamics-9", "季節の名前と、その日の気温"], ["lecture-lifedynamics-10", "普段の買い物でも疲れる？"]],
  },
  {
    slug: "five-elements", chapter: "five-elements", title: "五行とは？ 矢印と表の読み方",
    description: "木・火・土・金・水。相生と相剋の矢印をたどり、五行表で五臓や体の特徴、季節をどう読むかまでつなげます。",
    opening: [
      "たき火に薪を足すと火が続きます。五行の図では、こうして相手を支える関係を「相生」と呼びます。もう一本、相手の勢いを抑える矢印もあります。木から出る二本をたどってみましょう。",
    ],
    parts: [
      ["lecture-wuxing-1", "五つの名前で何を表す？"],
      ["lecture-wuxing-2", "木は伸び、火は上る"],
      ["lecture-wuxing-3", "相生は支え、相剋は抑える"],
      ["lecture-wuxing-8", "同じ水でも母にも子にもなる"],
      ["lecture-wuxing-4", "五臓はまず縦に探す"],
      ["lecture-wuxing-5", "口と唇は同じ行、違う列"],
      ["lecture-wuxing-6", "五神は心の働き、五志は感情"],
      ["lecture-wuxing-7", "季節と味を横に読む"],
    ],
    featuredDiagrams: ["lecture-wuxing-3", "lecture-wuxing-5"],
  },
  {
    slug: "meridians-and-points", chapter: "meridians", title: "経絡・経脈・経穴の違い",
    description: "経絡図の道筋と、一つずつ名前が付いた経穴（ツボ）。合谷の番号LI4から、ツボ図鑑で場所を探す方法まで説明します。",
    opening: [
      "手のツボ「合谷（ごうこく）」にはLI4という番号が付いています。LIは大腸経、4はその経脈での番号です。路線図で線の名前と駅名を見分けるように読むと、経絡図から合谷を探せます。",
    ],
    parts: [["lecture-meridians-1", "道筋をたどり、一つのツボを探す"]],
  },
  {
    slug: "pathomechanism-basics", chapter: "pathology", title: "病因と病機はどう違う？",
    description: "東洋医学でいう病因は何が関わったか、病機は不調までのどんな過程か。食事や睡眠、天候の例から考えます。",
    opening: [
      "帰り道で雨にぬれた。寝るのが遅くなった。翌朝は体がだるかった。三つを順に書けば、何が起きたかは見えてきます。次に知りたいのは、どの出来事が関わり、どんな経過でだるさが出たのかです。",
    ],
    parts: [["lecture-pathomechanism-1", "何が関わり、どう不調が起きた？"], ["lecture-pathomechanism-2", "出来事とだるさを順に並べる"], ["lecture-pathomechanism-7", "風や寒さを表す古典の言葉"], ["lecture-pathomechanism-8", "食事や休み方が変わった日"]],
  },
  {
    slug: "qi-blood-and-patterns", chapter: "pathology", title: "気・血・津液の不足と滞り",
    description: "気虚・気滞・血虚・瘀血は、何が足りず、何がうまく巡らないという説明か。寒熱・虚実の違いも読みます。",
    opening: [
      "「足が冷える」「階段を上ると疲れる」。一緒に聞いたときでも、足が冷える時刻と、どのくらいの階段で休みたくなるかをそれぞれ聞けます。東洋医学の用語を読むときも、冷えの話なのか、働きの不足の話なのかを分けてみます。",
    ],
    parts: [["lecture-pathomechanism-3", "気の不足・滞り・逆向き・支え"], ["lecture-pathomechanism-4", "口の乾きと水分の滞り"], ["lecture-pathomechanism-5", "血虚と瘀血はどう違う？"], ["lecture-pathomechanism-6", "冷えや熱と、不足や過剰"]],
  },
  {
    slug: "how-patterns-change", chapter: "pathology", title: "不調の経過から、次に何を聞く？",
    description: "不調が始まった日と、今も続く条件を分けます。食欲や眠り、重だるさの例から、見立てを考え直す質問までつなげます。",
    opening: [
      "食欲が落ちた数日後から、寝つきも悪くなったそうです。「食べられるようになった日の夜は、それでも眠りづらかったですか」。そう聞くと、どちらが先に始まったかに加えて、片方が戻ったあとの話も聞けます。",
    ],
    parts: [
      ["lecture-pathomechanism-9", "五行の矢印はどちら向き？"],
      ["lecture-pathomechanism-10", "始まったときと、今どう過ごしているか"],
      ["lecture-pathomechanism-11", "二つの見立てを並べる"],
      ["lecture-pathomechanism-12", "いつ始まり、どんな日に続く？"],
    ],
    featuredDiagrams: ["lecture-pathomechanism-9", "lecture-pathomechanism-12"],
  },
  {
    slug: "assessment-basics", chapter: "diagnosis", title: "四診と弁証、何を確かめる？",
    description: "本人の話、目で見たこと、声やにおい、触れて分かったこと。四診で集めた情報から、どう見立てを考えるかを学びます。",
    opening: [
      "頭痛を相談しに来た人が、「夕方になると画面を見ていられなくなる」と話しました。何に困っているかが伝わる一方、いつからか、今までの頭痛とどう違うかも聞きたくなります。東洋医学の見立てを考える前に、そこから話を始めます。",
    ],
    parts: [
      ["lecture-diagnosis-1", "見立てが「証」、考える過程が「弁証」"],
      ["lecture-diagnosis-2", "急いで受診した方がよいとき"],
      ["lecture-diagnosis-3", "一番困ることをどう伝える？"],
      ["lecture-diagnosis-4", "問診は本人の話から"],
      ["lecture-diagnosis-5", "目、耳、鼻で確かめる"],
      ["lecture-diagnosis-6", "触れる前に説明し、同意を得る"],
    ],
    featuredDiagrams: ["lecture-diagnosis-1", "lecture-diagnosis-2", "lecture-diagnosis-4"],
  },
  {
    slug: "assessment-frameworks", chapter: "diagnosis", title: "八綱で体の状態をどう読む？",
    description: "八綱の表裏・寒熱・虚実・陰陽と、気血津液・臓腑・経絡の見方を、肩の動きや冷えなどの話から読みます。",
    opening: [
      "腕を上げ始めるときにつらいのか、上げきったときか。肩のどこを指すのか。話を詳しく聞くと、図と照らし合わせられることが増えます。場所、冷えや熱、働きのどこに注目するかによって、東洋医学で使う言葉も変わります。",
    ],
    parts: [["lecture-diagnosis-7", "表裏・寒熱・虚実・陰陽の四つの対"], ["lecture-diagnosis-8", "何が足りず、何が滞る？"], ["lecture-diagnosis-9", "臓腑の働きと、経絡の道筋"]],
  },
  {
    slug: "principles-and-goals", chapter: "treatment", title: "施術の目標と、治法の読み方",
    description: "生活での困りごとから施術の目標と振り返りを考え、補瀉や気・血・津液の治法名がどんな方針を表すのかを読みます。",
    opening: [
      "「肩は前より楽です。でも洗濯物を干すときは、まだ途中で休みます」。同じ肩の話でも、痛みの強さと、やりたい動作ができるかは別々に聞けます。本人は何ができるようになりたいか。そこから考え始めます。",
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
    featuredDiagrams: ["lecture-treatment-1", "lecture-treatment-2", "lecture-treatment-3"],
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

export const READING_LECTURES_REVISED_AT = "2026-11-20";

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

export function getLectureIndexGroups(series?: PublicLectureSeries) {
  return getPublicLectureGroups(series).map(group => ({
    id: group.id,
    label: group.label,
    entries: [
      ...(!series || series === "reading" ? readingUnits.filter(unit => unit.chapter === group.id)
        .map(unit => ({ id: unit.slug, href: unit.href, title: unit.title, description: unit.description })) : []),
      ...group.entries.filter(entry => getPublicLectureSeries(entry.id) !== "reading")
        .map(entry => ({ ...entry, href: `/curriculum/${entry.id}` })),
    ],
  }));
}
