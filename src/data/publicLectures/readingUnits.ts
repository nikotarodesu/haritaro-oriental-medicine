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
    description: "「気虚」の意味は用語集で、施術を比べた結果は論文で調べます。体調メモの例では、本人が話したことと、聞き手が考えたことを書き分けます。",
    opening: [
      "体調メモに「休んだら楽になった」とありました。そこに書かれているのは、その人がその日に感じたことです。ほかの人にも同じ変化があったかを調べるなら、論文で参加者と比べた方法を確かめます。",
    ],
    parts: [["lecture-intro-3", "用語集を開くとき、論文を開くとき"], ["lecture-intro-4", "体調メモに何を書く？"]],
  },
  {
    slug: "yin-yang-basics", chapter: "yin-yang", title: "陰陽とは？ 比べ方と変わり方",
    description: "40℃のお湯、夜明けの空、顔のほてりと足の冷えを例に、陰陽の比べ方と変化を図でたどります。",
    opening: [
      "昼休みに日が差す窓辺で座って休みます。明るさで比べると、部屋の奥より窓辺が陽です。動きで比べると、歩いていたときより座っている今が陰です。何を比べたかを添えると、同じ場面でも説明が変わる理由が分かります。",
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
    description: "気・血・津液（気血水）がそれぞれ何をするのか、動かす・養う・潤すという働きの違いと関係を図で説明します。",
    opening: [
      "「推動（すいどう）」は、動きや巡りを進めるという気の働きです。血には体を養う「滋養（じよう）」、津液には皮膚などを潤す「滋潤（じじゅん）」という説明が出てきます。三つの名前の横にまず、動かす・養う・潤すと書いてみます。",
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
      "朝ごはんを食べた後の働きを、東洋医学の言葉で読んでみます。飲食物を受け取る役割が「胃」、そこから得たものを変化させて配る役割が「脾」です。臓腑（ぞうふ）の名前を覚えるときは、どの役割を受け持つかも確かめます。",
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
    description: "食事と呼吸から宗気が生まれるという説明を読み、体の内を養う営気と、体の表面を守る衛気を比べます。",
    opening: [
      "声や呼吸についての古典の説明に、宗気（そうき）という言葉が出てきます。食べ物や飲み物から得るものと、呼吸で取り込む気を合わせて生まれると考えました。",
    ],
    parts: [["lecture-lifedynamics-1", "食べる、歩く、休む"], ["lecture-lifedynamics-2", "成長の「精」と心の「神」"], ["lecture-lifedynamics-3", "食べものと呼吸から生まれる宗気"], ["lecture-lifedynamics-4", "内を養う営気、表を守る衛気"]],
  },
  {
    slug: "triple-burner-and-movement", chapter: "vital-function", title: "三焦と、体の中を巡る津液",
    description: "汁物を飲む例で、三焦の上・中・下にどんな働きを当てるかを見ます。図では、気や津液が上がる、下がる、出入りするときの向きを確かめます。",
    opening: [
      "汁物を飲んだ後の働きを、古典では三焦（さんしょう）の上・中・下に分けて説明します。飲食物を受けて変える働き、体に配る働き、外に出す働きを、図で順に読みます。",
    ],
    parts: [["lecture-lifedynamics-5", "三焦の上・中・下"], ["lecture-lifedynamics-6", "脾と胃で分けて考える"], ["lecture-lifedynamics-7", "上へ、下へ、外へ、内へ"], ["lecture-lifedynamics-11", "水分を変える、配る、調整する"], ["lecture-lifedynamics-12", "朝の一杯に戻って考える"]],
    featuredDiagrams: ["lecture-lifedynamics-5", "lecture-lifedynamics-11"],
  },
  {
    slug: "daily-and-seasonal-changes", chapter: "vital-function", title: "昼と夜、季節と体調",
    description: "古典に出てくる昼夜や四季の説明を読みます。眠りや疲れの記録では、寝た時刻、夜に起きた回数、翌日に困ったことを例にします。",
    opening: [
      "「冬になると疲れやすい」と書いたあと、外に長くいた日と、前の晩にあまり眠れなかった日を思い出します。同じ冬でも、日によって過ごし方が違います。季節に加え、その日に何があったかを一行書いてみます。",
    ],
    parts: [["lecture-lifedynamics-8", "昼に動き、夜に休む"], ["lecture-lifedynamics-9", "季節の名前と、その日の気温"], ["lecture-lifedynamics-10", "普段の買い物でも疲れる？"]],
  },
  {
    slug: "five-elements", chapter: "five-elements", title: "五行とは？ 矢印と表の読み方",
    description: "木から火へ向かう相生と、木から土へ向かう相剋。二本の矢印を比べ、次に五行の表で臓腑や季節がどの行に並ぶかを見ます。",
    opening: [
      "薪をくべると、たき火が続きます。五行では「木生火」と言い、木が火を支える相生の例に挙げます。一方、木から土へ向かう矢印は、相手を抑える相剋です。どちらも木から始まりますが、行き先が違います。",
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
    description: "雨にぬれて夜更かしした翌朝、だるさが出た例を読みます。不調に何が関わったと考えるかが病因、どんな変化が重なったと考えるかが病機です。",
    opening: [
      "帰り道で雨にぬれた。寝るのが遅くなった。翌朝は体がだるかった。三つを順に書けば、何が起きたかは見えてきます。次に知りたいのは、どの出来事が関わり、どんな経過でだるさが出たのかです。",
    ],
    parts: [["lecture-pathomechanism-1", "何が関わり、どう不調が起きた？"], ["lecture-pathomechanism-2", "出来事とだるさを順に並べる"], ["lecture-pathomechanism-7", "風や寒さを表す古典の言葉"], ["lecture-pathomechanism-8", "食事や休み方が変わった日"]],
  },
  {
    slug: "qi-blood-and-patterns", chapter: "pathology", title: "気・血・津液の不足と滞り",
    description: "疲れと張り、皮膚の乾きと同じ場所を刺すような痛みを比べます。気虚・気滞・血虚・瘀血の候補を考えるとき、どの所見を見るかを読みます。",
    opening: [
      "「足が冷える」「階段を上ると疲れる」と聞いたら、冷える時刻と、何段くらいで休みたくなるかをそれぞれ尋ねます。寒熱を考えるときに読むのは足の冷え、虚実を考えるときに読むのは階段での疲れ方です。",
    ],
    parts: [["lecture-pathomechanism-3", "気の不足・滞り・逆向き・支え"], ["lecture-pathomechanism-4", "口の乾きと水分の滞り"], ["lecture-pathomechanism-5", "血虚と瘀血はどう違う？"], ["lecture-pathomechanism-6", "冷えや熱と、不足や過剰"]],
  },
  {
    slug: "how-patterns-change", chapter: "pathology", title: "不調の経過から、次に何を聞く？",
    description: "食欲が落ちた後に寝つきが悪くなった例を使います。始まった順番と、片方が戻った後ももう片方が続いたかを聞き、見立てを比べます。",
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
    description: "頭痛の相談を例に、本人が話したこと、見たこと、声やにおい、触れて分かったことをどう書くかを読みます。",
    opening: [
      "頭痛を相談しに来た人が「夕方になると画面を見ていられない」と話しました。最初に聞くのは、いつ始まり、何分くらい続くか、いつもの頭痛と違うかです。受診を急ぐ変化がないかを確かめてから、四診の記録を読みます。",
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
    description: "顔がほてり足が冷える例を、八綱の寒熱で読みます。肩の痛みは部位や動作を書き、経絡図でどの範囲と重なるかを見ます。",
    opening: [
      "腕を上げ始めると痛むのか、上げきったときに痛むのか。肩の前か、後ろか。経絡図を開く前に、痛い場所と動作を分けて書きます。足の冷えや顔のほてりを聞いたら、部位と時刻に注目して寒熱を読みます。",
    ],
    parts: [["lecture-diagnosis-7", "表裏・寒熱・虚実・陰陽の四つの対"], ["lecture-diagnosis-8", "何が足りず、何が滞る？"], ["lecture-diagnosis-9", "臓腑の働きと、経絡の道筋"]],
  },
  {
    slug: "principles-and-goals", chapter: "treatment", title: "施術の目標と、治法の読み方",
    description: "「洗濯物を干し終えたい」という例で、結果をどう比べるかを考えます。補瀉や理気などの治法名も、何を目指す言葉なのかから読みます。",
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
