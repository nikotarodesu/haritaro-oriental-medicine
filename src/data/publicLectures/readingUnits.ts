import { getPublicLectureGroups, getPublicLectureSeries, type PublicLectureSeries } from "./index";

interface UnitDefinition {
  slug: string;
  chapter: string;
  title: string;
  description: string;
  example: string;
  parts: readonly (readonly [lectureId: string, label: string])[];
}

const units: readonly UnitDefinition[] = [
  {
    slug: "getting-started", chapter: "intro", title: "東洋医学の入り口",
    description: "東洋医学で使う言葉を知り、体調を伝えるときに何を整理するかを学びます。",
    example: "「夕方に疲れる」を、夕食の支度中に脚がだるくなり、座ると落ち着く、と書き換えてみましょう。時刻、場面、どう変わったかが伝わります。",
    parts: [["lecture-intro-1", "東洋医学の言葉に触れる"], ["lecture-intro-2", "困りごとから振り返りまで"]],
  },
  {
    slug: "reading-evidence", chapter: "intro", title: "用語・研究・体調の記録を読み分ける",
    description: "用語の意味を知る問いと、変化を研究で確かめる問いを分けます。体調の記録では、事実・解釈・不明点を整理します。",
    example: "「休んだら楽になった」は自分の記録です。「同じ方法でほかの人も楽になるか」を知るには、研究で誰の何を比べたかを確かめます。",
    parts: [["lecture-intro-3", "研究と用語集が答える問い"], ["lecture-intro-4", "事実・解釈・不明点を分ける"]],
  },
  {
    slug: "yin-yang-basics", chapter: "yin-yang", title: "陰陽の基本と、比べ方の違い",
    description: "明暗・動静など、比べる基準を選ぶところから始めます。相対性と、対立・制約・互根の違いまで進みます。",
    example: "昼休みに日差しのある部屋で座っている場面を、明るさと動きの二つの基準で言い表すと、同じ場面から別の説明ができます。",
    parts: [["lecture-yinyang-1", "何を比べるか決める"], ["lecture-yinyang-2", "比較相手で陰陽が変わる"], ["lecture-yinyang-3", "対立・制約・互根を区別する"]],
  },
  {
    slug: "yin-yang-changes", chapter: "yin-yang", title: "陰陽の変化と偏り",
    description: "変化を時間、部位、不足や過剰の観点から読みます。消長・転化、体の上下や表裏、陽虚・陰虚などを整理します。",
    example: "夜明けの空が少しずつ明るくなる過程と、「もう昼だ」と区切って見ることは、同じ変化に対する二つの捉え方です。",
    parts: [["lecture-yinyang-4", "増減と切り替わり"], ["lecture-yinyang-5", "体のどこを何と比べるか"], ["lecture-yinyang-6", "過剰と不足の読み分け"]],
  },
  {
    slug: "yin-yang-observation", chapter: "yin-yang", title: "陰陽と四診から情報を整理する",
    description: "四診が集める情報を確認し、架空例を使って、部位・時間・伝統的な解釈をどう分けるか学びます。",
    example: "「昼に顔がほてる」「夜に足が冷える」は部位も時刻も違います。二つを記録したうえで、まだ聞いていないことを一つ考えます。",
    parts: [["lecture-yinyang-7", "四診で情報を集める"], ["lecture-yinyang-8", "顔のほてりと足の冷えを読み分ける"]],
  },
  {
    slug: "qi-blood-fluids", chapter: "qi-blood-water", title: "気・血・津液の基本",
    description: "気が表す五つの働き、血の滋養・滋潤、津と液の違いを、動詞と役割に注目して整理します。",
    example: "「動きを進める」と「水分などを別の状態に変える」を見比べると、どちらも気の話でも、推動と気化で注目する点が違います。",
    parts: [["lecture-qiblood-1", "気が表す五つの働き"], ["lecture-qiblood-2", "血が表す養いと潤い"], ["lecture-qiblood-3", "津と液はどう違うか"]],
  },
  {
    slug: "qi-blood-connections", chapter: "qi-blood-water", title: "気・血・津液のつながり",
    description: "気が血を導く説明と、血が気を支える説明を矢印で比較し、血と津液の由来を表す用語と読み分けます。",
    example: "「気が血を導く」と「血が気を支える」を書くとき、主語と動詞を並べると、矢印が逆向きになる理由が分かります。",
    parts: [["lecture-qiblood-4", "気と血の矢印と津血同源"], ["lecture-qiblood-5", "散歩の記録で用語を振り返る"]],
  },
  {
    slug: "zangfu-basics", chapter: "zangfu", title: "五臓と六腑の基本",
    description: "臓腑を伝統理論の働きから捉え、肺と心が表す役割や、飲食を受け、変え、配る脾胃の説明を読みます。",
    example: "朝食をとる場面から、食べたものを受け入れる働きと、得られたものを変えて配る働きを分けて考えます。",
    parts: [["lecture-zangfu-1", "五臓・六腑の名前と役割"], ["lecture-zangfu-2", "肺と心の働き"], ["lecture-zangfu-3", "飲食を受け、変え、配る脾胃"]],
  },
  {
    slug: "zangfu-relations", chapter: "zangfu", title: "肝・腎の働きと臓腑の表裏",
    description: "疏泄・蔵血・蔵精が表す三つの働きを区別し、臓と腑を結ぶ六つの組を確認します。",
    example: "「肺と大腸が表裏」と「咳と便の回数が変わった」は別々の情報です。前者は表を引いた答えで、後者はそれぞれの経過を聞ける記録です。",
    parts: [["lecture-zangfu-4", "肝の疏泄・蔵血と腎の蔵精"], ["lecture-zangfu-5", "臓と腑の六つの組"]],
  },
  {
    slug: "body-functions", chapter: "vital-function", title: "体を養う働きと宗気・営衛",
    description: "精・気・血・津液・神を整理し、飲食と呼吸を結ぶ宗気、内を養う営気、外を守る衛気を読み分けます。",
    example: "食事をとることと息を吸うことは別の行動です。古典の図では、その二つをどの言葉で結びつけているかをたどります。",
    parts: [["lecture-lifedynamics-1", "体の働きをつなげて読む"], ["lecture-lifedynamics-2", "精・気・血・津液・神"], ["lecture-lifedynamics-3", "飲食と呼吸を結ぶ宗気"], ["lecture-lifedynamics-4", "営気と衛気の違い"]],
  },
  {
    slug: "triple-burner-and-movement", chapter: "vital-function", title: "三焦・昇降出入と津液のつながり",
    description: "働きの範囲、臓腑の組、動きの向きを見分け、飲食や水分について伝統理論が何を説明しているか整理します。",
    example: "朝食の話を読みながら、「受ける」「変える」「行き渡らせる」に分けると、いくつかの臓腑が登場する理由が見えてきます。",
    parts: [["lecture-lifedynamics-5", "三焦が表す上・中・下"], ["lecture-lifedynamics-6", "表裏で役割をつなぐ"], ["lecture-lifedynamics-7", "昇・降・出・入"], ["lecture-lifedynamics-11", "肺・脾・腎・三焦と津液"], ["lecture-lifedynamics-12", "飲食の例で働きをつなげる"]],
  },
  {
    slug: "daily-and-seasonal-changes", chapter: "vital-function", title: "昼夜と季節、体調の変化",
    description: "活動と休息、四季の見方を学び、普段の変化や続く不調を、時期と生活への影響から振り返ります。",
    example: "「冬は疲れやすい」と書くとき、屋外にいた時間や、数日前の睡眠も記録しておくと、比べる条件が具体的になります。",
    parts: [["lecture-lifedynamics-8", "活動と休息をどう見るか"], ["lecture-lifedynamics-9", "春夏秋冬をどう読むか"], ["lecture-lifedynamics-10", "いつもの変化と続く不調"]],
  },
  {
    slug: "five-elements", chapter: "five-elements", title: "五行の性質と相生・相剋",
    description: "木・火・土・金・水の性質から、支える矢印と抑える矢印へ進み、母と子の関係を確認します。",
    example: "「水は潤す」は水の性質です。「水が木を支える」は二つの行の関係です。同じ「水」という言葉が、どちらの問いに答えているかを確かめます。",
    parts: [["lecture-wuxing-1", "木・火・土・金・水の分類"], ["lecture-wuxing-2", "性質を動詞にして読む"], ["lecture-wuxing-3", "相生と相剋の向き"], ["lecture-wuxing-8", "相生の母と子を見分ける"]],
  },
  {
    slug: "five-elements-table", chapter: "five-elements", title: "五行の表を読む",
    description: "臓腑、体の組織、感情、季節などを表の行と列に分けて読み、分類表で確かめたことと観察したことを区別します。",
    example: "土の行に「口」と「唇」が並んでいたら、口は開竅、唇は五華です。同じ行でも、列の見出しで意味が変わります。",
    parts: [["lecture-wuxing-4", "五臓を置く行"], ["lecture-wuxing-5", "五官・五体・五華"], ["lecture-wuxing-6", "五神と五志"], ["lecture-wuxing-7", "季節・気候・味"]],
  },
  {
    slug: "meridians-and-points", chapter: "meridians", title: "経絡・経脈・経穴とツボの読み方",
    description: "経絡図の全体像、名前のある道筋、個々の点を区別し、図からツボ辞典へたどる方法を学びます。",
    example: "路線図で路線と駅を見分けるように、経絡図では道筋と一つの経穴を分けて読みます。合谷の「LI4」なら、LIは大腸経、4はその経脈での番号です。",
    parts: [["lecture-meridians-1", "道筋と点を区別する"]],
  },
  {
    slug: "pathomechanism-basics", chapter: "pathology", title: "病因・病機と暮らしの記録",
    description: "症状、原因として考えたこと、不調に至る過程を分けます。環境・食事・活動などの情報を時間順に置いて読みます。",
    example: "「雨にぬれた」「その夜は睡眠が短かった」「翌朝だるかった」と分けると、同じ条件で以前も起きたかを尋ねられます。",
    parts: [["lecture-pathomechanism-1", "病因・病機・症状・証"], ["lecture-pathomechanism-2", "体調と暮らしの前後関係"], ["lecture-pathomechanism-7", "環境の影響を表す古典の言葉"], ["lecture-pathomechanism-8", "感情・食事・活動と休息"]],
  },
  {
    slug: "qi-blood-and-patterns", chapter: "pathology", title: "気・血・津液の失調と寒熱・虚実",
    description: "不足、滞り、向きの違いを気・血・津液の言葉で整理します。冷えや熱と、働きの不足や偏りは分けて読みます。",
    example: "足の冷えと、階段で感じる疲れは、それぞれ時刻と場面を記録できます。冷えを読む問いと、働きを読む問いを分けましょう。",
    parts: [["lecture-pathomechanism-3", "気虚・気滞・気逆・気陥"], ["lecture-pathomechanism-4", "津液の不足と水滞"], ["lecture-pathomechanism-5", "血虚と瘀血"], ["lecture-pathomechanism-6", "寒熱と虚実"]],
  },
  {
    slug: "how-patterns-change", chapter: "pathology", title: "不調の広がりと続く条件",
    description: "相乗・相侮などの伝統的な関係を確かめ、始まりと、後から加わった条件から不調の経過を読みます。",
    example: "食欲が落ちた時期と眠りづらくなった時期を並べます。食欲が戻った日にも眠りづらかったかを、次の質問にできます。",
    parts: [["lecture-pathomechanism-9", "五行の図で影響の向きを読む"], ["lecture-pathomechanism-10", "始まりと続く条件を分ける"]],
  },
  {
    slug: "comparing-explanations", chapter: "pathology", title: "不調の説明を比べ、次に聞くことを決める",
    description: "気虚と湿熱の架空例で、候補を比べる材料を選びます。発生・波及・維持の視点で、次の問いを組み立てます。",
    example: "「休んでも重だるさが変わらなかった」と分かると、休めば軽くなると考えた候補を見直せます。まだ確かめたいことも一緒に残します。",
    parts: [["lecture-pathomechanism-11", "二つの候補を同じ条件で比べる"], ["lecture-pathomechanism-12", "発生・波及・維持から質問を考える"]],
  },
  {
    slug: "assessment-basics", chapter: "diagnosis", title: "弁証の入り口と、先に確かめること",
    description: "証と弁証を区別し、受診を優先する場面を押さえたうえで、主訴や経過から候補を組み立てます。",
    example: "「頭が痛い」という一言から、いつ始まったか、普段とどう違うか、何に困っているかを分けて伝えられます。",
    parts: [["lecture-diagnosis-1", "証と弁証の違い"], ["lecture-diagnosis-2", "受診を優先する場面"], ["lecture-diagnosis-3", "主訴・経過・生活への影響を伝える"]],
  },
  {
    slug: "four-examinations", chapter: "diagnosis", title: "四診で確かめる情報",
    description: "問診・望診・聞診・切診で得る情報を見比べ、本人の話、観察したこと、そのときの条件を記録します。",
    example: "「歩きづらい」という言葉は本人の報告です。歩く様子を見た記録と分けて書くと、誰が何を確認したかが分かります。",
    parts: [["lecture-diagnosis-4", "問診で質問を組み立てる"], ["lecture-diagnosis-5", "望診と聞診の観察"], ["lecture-diagnosis-6", "切診で触れて得た情報"]],
  },
  {
    slug: "assessment-frameworks", chapter: "diagnosis", title: "八綱・気血津液・臓腑で所見を読む",
    description: "表裏・寒熱・虚実・陰陽の対を整理し、気血の不足や巡り、臓腑の役割や経絡の場所を別の視点から読みます。",
    example: "同じ肩の訴えでも、動きのどの場面で現れるかを聞くことと、伝統的な図でどの道筋に重なるかを見ることでは、確かめる内容が違います。",
    parts: [["lecture-diagnosis-7", "八綱で使う四つの対"], ["lecture-diagnosis-8", "気血の不足と巡り"], ["lecture-diagnosis-9", "臓腑・経絡と症状の場所"]],
  },
  {
    slug: "principles-and-goals", chapter: "treatment", title: "施術を考える枠組みと振り返り",
    description: "本人が望む変化から治則・治法を考え、本治と標治を分けます。仕事や睡眠も記録し、同じ場面で振り返ります。",
    example: "「夕方の作業を続けたい」と分かれば、痛みの強さに加えて、作業をどれくらい続けられたかを前後で比べられます。",
    parts: [["lecture-treatment-1", "生活の目標を言葉にする"], ["lecture-treatment-2", "治則・治法・配穴の順序"], ["lecture-treatment-4", "本治と標治の考え方"], ["lecture-treatment-10", "仕事・睡眠・服薬も振り返る"]],
  },
  {
    slug: "treatment-terms", chapter: "treatment", title: "補瀉と気・血・津液の治法を読む",
    description: "補う、偏りを減らす、巡りを考えるなど、治法名が表す方針を区別し、臓腑どうしを結ぶ言葉まで読みます。",
    example: "「補気」と「理気」を見かけたら、不足を支える方向か、巡りに着目する方向かに注目すると、名前から読み取れる範囲が分かります。",
    parts: [["lecture-treatment-3", "補法と瀉法の方向"], ["lecture-treatment-5", "気に関わる治法の言葉"], ["lecture-treatment-6", "血や津液に関わる治法の言葉"], ["lecture-treatment-7", "臓腑の関係と治法名"]],
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
