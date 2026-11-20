import { getPublicLectureGroups, getPublicLectureSeries, type PublicLectureSeries } from "./index";

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
    description: "陰陽・気血水・経絡など、東洋医学で使う言葉を身近な例から学びます。体調を伝えるときに何を整理するかも確認します。",
    opening: [
      "東洋医学は、東アジアで育まれてきた伝統医学を指す言葉です。日本の鍼灸の伝統理論には、陰陽や気・血・津液、経絡の言葉で体を捉える見方があります。",
      "出発点は、たとえば「夕方になると疲れる」という一言です。夕食の支度中に脚がだるくなり、椅子に座ると落ち着く。そこまで話すと、体の変化が時間と場面を伴って伝わります。",
    ],
    parts: [["lecture-intro-1", "東洋医学の言葉に触れる"], ["lecture-intro-2", "困りごとから振り返りまで"]],
  },
  {
    slug: "reading-evidence", chapter: "intro", title: "用語・研究・体調の記録を読み分ける",
    description: "用語の意味を知る問いと、変化を研究で確かめる問いを分けます。体調の記録では、事実・解釈・不明点を整理します。",
    opening: [
      "「休んだら楽になった」は、ある日の記録です。「同じ方法でほかの人も楽になるだろうか」と問いを広げると、誰が、どんな条件で確かめたかを知りたくなります。研究でも体調メモでも、何が実際に記録され、どこからが説明なのかをたどります。",
    ],
    parts: [["lecture-intro-3", "研究と用語集が答える問い"], ["lecture-intro-4", "事実・解釈・不明点を分ける"]],
  },
  {
    slug: "yin-yang-basics", chapter: "yin-yang", title: "陰陽の基本と、比べ方の違い",
    description: "明暗・動静など、比べる基準を選ぶところから始めます。相対性と、対立・制約・互根の違いまで進みます。",
    opening: [
      "昼休み、日が差す窓辺で腰を下ろします。明るさを部屋の奥と比べると、窓辺は陽の側です。動きを比べるなら、座っている間は歩いているときより陰です。陰陽は、何と何を、どんな基準で比べたかと一緒に読むと分かりやすくなります。",
    ],
    parts: [["lecture-yinyang-1", "何を比べるか決める"], ["lecture-yinyang-2", "比較相手で陰陽が変わる"], ["lecture-yinyang-3", "対立・制約・互根を区別する"]],
  },
  {
    slug: "yin-yang-changes", chapter: "yin-yang", title: "陰陽の変化と偏り",
    description: "変化を時間、部位、不足や過剰の観点から読みます。消長・転化、体の上下や表裏、陽虚・陰虚などを整理します。",
    opening: [
      "夜明け前の空は、目を離すたびに少し明るくなります。明るさの増減を追う消長と、条件が変わり反対の性質へ移る転化。夜明けは、変化のどこに目を向けるかを考える手がかりになります。",
    ],
    parts: [["lecture-yinyang-4", "増減と切り替わり"], ["lecture-yinyang-5", "体のどこを何と比べるか"], ["lecture-yinyang-6", "過剰と不足の読み分け"]],
  },
  {
    slug: "yin-yang-observation", chapter: "yin-yang", title: "陰陽と四診から情報を整理する",
    description: "四診が集める情報を確認し、架空例を使って、部位・時間・伝統的な解釈をどう分けるか学びます。",
    opening: [
      "「夕方に顔がほてる。足も冷える」と聞きました。顔のほてりは夕方に起こると分かります。足が冷える時刻は、まだ聞いていません。陰陽の言葉で説明する前に、部位、時刻、誰から得た情報かをそろえてみます。",
    ],
    parts: [["lecture-yinyang-7", "四診で情報を集める"], ["lecture-yinyang-8", "顔のほてりと足の冷えを読み分ける"]],
  },
  {
    slug: "qi-blood-fluids", chapter: "qi-blood-water", title: "気・血・津液の基本",
    description: "気が表す五つの働き、血の滋養・滋潤、津と液の違いを、動詞と役割に注目して整理します。",
    opening: [
      "「気・血・津液」の三語を読む手がかりは、後ろに続く動詞です。気は何を動かし、血はどこを養い、水分はどう行き渡ると考えるのでしょうか。用語を覚える前に、伝統理論の中でそれぞれが担う仕事を見ていきます。",
    ],
    parts: [["lecture-qiblood-1", "気が表す五つの働き"], ["lecture-qiblood-2", "血が表す養いと潤い"], ["lecture-qiblood-3", "津と液はどう違うか"]],
  },
  {
    slug: "qi-blood-connections", chapter: "qi-blood-water", title: "気・血・津液のつながり",
    description: "気が血を導く説明と、血が気を支える説明を矢印で比較し、血と津液の由来を表す用語と読み分けます。",
    opening: [
      "「気が血を導く」「血が気を支える」。並べて読むと、同じ二つの言葉のうち、文の主役が入れ替わっています。気・血・津液のつながりを描いた図は、矢印の出発点と、脇に書かれた働きからたどると意味が見えてきます。",
    ],
    parts: [["lecture-qiblood-4", "気と血の矢印と津血同源"], ["lecture-qiblood-5", "散歩の記録で用語を振り返る"]],
  },
  {
    slug: "zangfu-basics", chapter: "zangfu", title: "五臓と六腑の基本",
    description: "臓腑を伝統理論の働きから捉え、肺と心が表す役割や、飲食を受け、変え、配る脾胃の説明を読みます。",
    opening: [
      "朝ごはんを食べる。その一場面に、伝統理論の本では「胃が受ける」「脾が変えて運ぶ」という二つの働きが登場します。五臓と六腑の表を開き、並んでいる臓腑がそれぞれ何を担うと説明されているかを見ていきます。",
    ],
    parts: [["lecture-zangfu-1", "五臓・六腑の名前と役割"], ["lecture-zangfu-2", "肺と心の働き"], ["lecture-zangfu-3", "飲食を受け、変え、配る脾胃"]],
  },
  {
    slug: "zangfu-relations", chapter: "zangfu", title: "肝・腎の働きと臓腑の表裏",
    description: "疏泄・蔵血・蔵精が表す三つの働きを区別し、臓と腑を結ぶ六つの組を確認します。",
    opening: [
      "臓腑の表を開くと、肺と大腸は「表裏」の一組です。体調メモに咳や便通の変化が出てきたら、それぞれの始まりや経過を尋ねます。伝統理論で結びつける働きと、その人に起きたことを分けておくと、表に何を聞けるかが分かります。",
    ],
    parts: [["lecture-zangfu-4", "肝の疏泄・蔵血と腎の蔵精"], ["lecture-zangfu-5", "臓と腑の六つの組"]],
  },
  {
    slug: "body-functions", chapter: "vital-function", title: "体を養う働きと宗気・営衛",
    description: "精・気・血・津液・神を整理し、飲食と呼吸を結ぶ宗気、内を養う営気、外を守る衛気を読み分けます。",
    opening: [
      "食事のあとも、呼吸は続いています。伝統理論で宗気を説明するとき、この二つの営みが一つの図に入ります。何から生じ、どんな働きを支えると説明されているかを追うと、営気・衛気との違いも見えてきます。",
    ],
    parts: [["lecture-lifedynamics-1", "体の働きをつなげて読む"], ["lecture-lifedynamics-2", "精・気・血・津液・神"], ["lecture-lifedynamics-3", "飲食と呼吸を結ぶ宗気"], ["lecture-lifedynamics-4", "営気と衛気の違い"]],
  },
  {
    slug: "triple-burner-and-movement", chapter: "vital-function", title: "三焦・昇降出入と津液のつながり",
    description: "働きの範囲、臓腑の組、動きの向きを見分け、飲食や水分について伝統理論が何を説明しているか整理します。",
    opening: [
      "朝食で温かい汁物を飲んだ場面を思い浮かべます。飲食を「受ける」「変える」「配る」という臓腑の話に、水分がどこへ向かうかという問いが加わります。三焦では上・中・下のまとまりを、昇降出入では動きの向きをたどります。",
    ],
    parts: [["lecture-lifedynamics-5", "三焦が表す上・中・下"], ["lecture-lifedynamics-6", "表裏で役割をつなぐ"], ["lecture-lifedynamics-7", "昇・降・出・入"], ["lecture-lifedynamics-11", "肺・脾・腎・三焦と津液"], ["lecture-lifedynamics-12", "飲食の例で働きをつなげる"]],
  },
  {
    slug: "daily-and-seasonal-changes", chapter: "vital-function", title: "昼夜と季節、体調の変化",
    description: "活動と休息、四季の見方を学び、普段の変化や続く不調を、時期と生活への影響から振り返ります。",
    opening: [
      "「冬になると疲れやすい」。そう書いたメモに、外にいた時間や前の晩の睡眠を足すと、同じ冬の中で調子が違う日も見えてきます。昼夜や四季を読む伝統的な見方を知り、その日に起きた変化は時期と場面からたどります。",
    ],
    parts: [["lecture-lifedynamics-8", "活動と休息をどう見るか"], ["lecture-lifedynamics-9", "春夏秋冬をどう読むか"], ["lecture-lifedynamics-10", "いつもの変化と続く不調"]],
  },
  {
    slug: "five-elements", chapter: "five-elements", title: "五行の性質と相生・相剋",
    description: "木・火・土・金・水の性質から、支える矢印と抑える矢印へ進み、母と子の関係を確認します。",
    opening: [
      "「木は伸びる」は一つの行の性質です。「水が木を支える」と書くと、二つの行が登場します。五行図の矢印を追う前に、今読んでいるのは性質か、行どうしの関係かを確かめると、相生と相剋を読み分けられます。",
    ],
    parts: [["lecture-wuxing-1", "木・火・土・金・水の分類"], ["lecture-wuxing-2", "性質を動詞にして読む"], ["lecture-wuxing-3", "相生と相剋の向き"], ["lecture-wuxing-8", "相生の母と子を見分ける"]],
  },
  {
    slug: "five-elements-table", chapter: "five-elements", title: "五行の表を読む",
    description: "臓腑、体の組織、感情、季節などを表の行と列に分けて読み、分類表で確かめたことと観察したことを区別します。",
    opening: [
      "五行表で「土」の行を横にたどると、「口」と「唇」が見つかります。同じ行に並ぶ二語の違いは、表の上にある列見出しから分かります。言葉を一つずつ覚える前に、どの列が何をまとめているかを確かめましょう。",
    ],
    parts: [["lecture-wuxing-4", "五臓を置く行"], ["lecture-wuxing-5", "五官・五体・五華"], ["lecture-wuxing-6", "五神と五志"], ["lecture-wuxing-7", "季節・気候・味"]],
  },
  {
    slug: "meridians-and-points", chapter: "meridians", title: "経絡・経脈・経穴とツボの読み方",
    description: "経絡図の全体像、名前のある道筋、個々の点を区別し、図からツボ辞典へたどる方法を学びます。",
    opening: [
      "合谷の図に付いている「LI4」のうち、LIは大腸経、4はその経脈での番号です。路線図で線と駅を見分けるように、経絡の全体像、名前がある経脈、個々の経穴を区別すると、図の一つの点からツボ図鑑へたどり着けます。",
    ],
    parts: [["lecture-meridians-1", "道筋と点を区別する"]],
  },
  {
    slug: "pathomechanism-basics", chapter: "pathology", title: "病因・病機と暮らしの記録",
    description: "症状、原因として考えたこと、不調に至る過程を分けます。環境・食事・活動などの情報を時間順に置いて読みます。",
    opening: [
      "雨にぬれた夜、眠るのが遅くなり、翌朝になって体がだるい。時刻を添えると、出来事と体の変化を順にたどれます。「何がきっかけか」と「どんな過程で今に至ったか」が、病因と病機を学ぶときの二つの問いです。",
    ],
    parts: [["lecture-pathomechanism-1", "病因・病機・症状・証"], ["lecture-pathomechanism-2", "体調と暮らしの前後関係"], ["lecture-pathomechanism-7", "環境の影響を表す古典の言葉"], ["lecture-pathomechanism-8", "感情・食事・活動と休息"]],
  },
  {
    slug: "qi-blood-and-patterns", chapter: "pathology", title: "気・血・津液の失調と寒熱・虚実",
    description: "不足、滞り、向きの違いを気・血・津液の言葉で整理します。冷えや熱と、働きの不足や偏りは分けて読みます。",
    opening: [
      "足が冷える。階段を上ると疲れやすい。二つを分けて書くと、冷えが出る時間と、どんな動作で疲れるかをそれぞれ尋ねられます。寒熱と虚実は、こうした違う側面に目を向けるための伝統的な区分です。",
    ],
    parts: [["lecture-pathomechanism-3", "気虚・気滞・気逆・気陥"], ["lecture-pathomechanism-4", "津液の不足と水滞"], ["lecture-pathomechanism-5", "血虚と瘀血"], ["lecture-pathomechanism-6", "寒熱と虚実"]],
  },
  {
    slug: "how-patterns-change", chapter: "pathology", title: "不調の広がりと続く条件",
    description: "相乗・相侮などの伝統的な関係を確かめ、始まりと、後から加わった条件から不調の経過を読みます。",
    opening: [
      "食欲が落ち、数日後から寝つきも悪くなった。「食欲が戻った夜は眠れましたか」と聞くと、日付を並べた先に、もう一つ手がかりが得られます。不調のきっかけと、その後も続いている条件を、時間の流れの中で読み解きます。",
    ],
    parts: [["lecture-pathomechanism-9", "五行の図で影響の向きを読む"], ["lecture-pathomechanism-10", "始まりと続く条件を分ける"]],
  },
  {
    slug: "comparing-explanations", chapter: "pathology", title: "不調の説明を比べ、次に聞くことを決める",
    description: "気虚と湿熱の架空例で、候補を比べる材料を選びます。発生・波及・維持の視点で、次の問いを組み立てます。",
    opening: [
      "「休んでも重だるさが変わらなかった」。この一言が加わると、「休めば軽くなるはず」と考えていたときの見立てが揺らぎます。架空の事例を読み進めながら、二つの説明候補を比べ、次の一問で何を確かめられるか考えます。",
    ],
    parts: [["lecture-pathomechanism-11", "二つの候補を同じ条件で比べる"], ["lecture-pathomechanism-12", "発生・波及・維持から質問を考える"]],
  },
  {
    slug: "assessment-basics", chapter: "diagnosis", title: "弁証の入り口と、先に確かめること",
    description: "証と弁証を区別し、受診を優先する場面を押さえたうえで、主訴や経過から候補を組み立てます。",
    opening: [
      "「頭が痛い」と聞いたら、いつからか、普段とどう違うかを尋ねます。本人にとっては、痛みで仕事の画面を見続けられないことがいちばんの困りごとかもしれません。医療機関での評価を優先する場面と、本人が相談したいことを押さえて、弁証の考え方へ進みます。",
    ],
    parts: [["lecture-diagnosis-1", "証と弁証の違い"], ["lecture-diagnosis-2", "受診を優先する場面"], ["lecture-diagnosis-3", "主訴・経過・生活への影響を伝える"]],
  },
  {
    slug: "four-examinations", chapter: "diagnosis", title: "四診で確かめる情報",
    description: "問診・望診・聞診・切診で得る情報を見比べ、本人の話、観察したこと、そのときの条件を記録します。",
    opening: [
      "本人は「歩きづらい」と話し、見ていた人は「右足を出すところで一度立ち止まった」と書きました。どちらも一つの場面から得た情報です。四診の記録は、どう確かめたことかを添えると、次の人も経過をたどれます。",
    ],
    parts: [["lecture-diagnosis-4", "問診で質問を組み立てる"], ["lecture-diagnosis-5", "望診と聞診の観察"], ["lecture-diagnosis-6", "切診で触れて得た情報"]],
  },
  {
    slug: "assessment-frameworks", chapter: "diagnosis", title: "八綱・気血津液・臓腑で所見を読む",
    description: "表裏・寒熱・虚実・陰陽の対を整理し、気血の不足や巡り、臓腑の役割や経絡の場所を別の視点から読みます。",
    opening: [
      "肩を動かし始めるときに気になるのか、最後まで上げたときか。場所を示してもらえば、経絡図と照らし合わせる手がかりも増えます。一つの訴えから集めた情報を、八綱、気血津液、臓腑、経絡の視点に置くと、どんな問いが生まれるかを見ます。",
    ],
    parts: [["lecture-diagnosis-7", "八綱で使う四つの対"], ["lecture-diagnosis-8", "気血の不足と巡り"], ["lecture-diagnosis-9", "臓腑・経絡と症状の場所"]],
  },
  {
    slug: "principles-and-goals", chapter: "treatment", title: "施術を考える枠組みと振り返り",
    description: "本人が望む変化から治則・治法を考え、本治と標治を分けます。仕事や睡眠も記録し、同じ場面で振り返ります。",
    opening: [
      "「夕方の作業を続けたい」。本人の望むことが分かると、振り返りで見るものも具体的になります。痛みの強さと、作業を続けられた時間。治則・治法の言葉も、望む変化を聞くところから振り返りまでの流れに置くと読みやすくなります。",
    ],
    parts: [["lecture-treatment-1", "生活の目標を言葉にする"], ["lecture-treatment-2", "治則・治法・配穴の順序"], ["lecture-treatment-4", "本治と標治の考え方"], ["lecture-treatment-10", "仕事・睡眠・服薬も振り返る"]],
  },
  {
    slug: "treatment-terms", chapter: "treatment", title: "補瀉と気・血・津液の治法を読む",
    description: "補う、偏りを減らす、巡りを考えるなど、治法名が表す方針を区別し、臓腑どうしを結ぶ言葉まで読みます。",
    opening: [
      "「補気」は気の働きを補う方針、「理気」は気の巡りに着目する方針を表します。治法名を短い動詞で言い換えると、書き手がどの働きを見ているかが伝わります。補瀉から臓腑どうしを結ぶ言葉まで、その読み方を使ってみます。",
    ],
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
