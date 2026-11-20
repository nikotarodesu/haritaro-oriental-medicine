import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ChartLine, ClipboardList, MessageCircle, ShieldCheck } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import AcupunctureMethodArt, { type AcupunctureMethod } from "@/components/learning/AcupunctureMethodArt";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import { ACUPUNCTURE_GUIDE, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import { pageSocialMetadata } from "@/config/seo";
import { ACUPUNCTURE_GUIDE_SOURCES, ACUPUNCTURE_STUDY_EXAMPLES } from "@/data/acupunctureGuide";

const { href, title, description, revisedAt } = ACUPUNCTURE_GUIDE;
const pageTitle = `${title}｜はり太郎の東洋医学`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description,
  alternates: { canonical: href },
  ...pageSocialMetadata(pageTitle, description, href),
};

const topics = [
  ["methods", "はり・灸・ツボ押し"], ["points", "ツボと配穴"], ["visit", "施術の流れ"],
  ["evidence", "研究の読み方"], ["safety", "安全性"], ["questions", "よくある疑問"],
] as const;

const methods: ReadonlyArray<{ id: AcupunctureMethod; name: string; stimulus: string; summary: string }> = [
  { id: "needle", name: "はり（鍼）", stimulus: "鍼による刺激", summary: "細い鍼を用いる施術です。皮膚に入れる方法や、鍼具で皮膚に触れて刺激する方法があります。" },
  { id: "moxa", name: "お灸（灸）", stimulus: "温熱による刺激", summary: "主にもぐさを使い、熱で刺激する施術です。もぐさは、ヨモギの葉の繊維を加工したものです。" },
  { id: "pressure", name: "ツボ押し", stimulus: "指などで圧を加える刺激", summary: "指などで体の表面を押します。鍼や灸と同じツボが目印になる場合もあり、加える刺激はそれぞれ異なります。" },
];

const visitSteps = [
  { title: "困りごとを聞く", icon: MessageCircle, text: "いつから、どんな動作で気になるかを伝えます。既往歴、服薬、治療中の病気や妊娠の有無なども共有します。" },
  { title: "体の状態を確認する", icon: ClipboardList, text: "動きや触れたときの反応などを確かめます。流派によって舌や脈なども観察し、医療機関での評価が必要か考えます。" },
  { title: "説明を聞き、方法を選ぶ", icon: ShieldCheck, text: "何を目指すか、どんな方法を使うか、起こり得る反応を確認します。疑問や苦手な刺激を伝え、納得してから受けます。" },
  { title: "経過を振り返る", icon: ChartLine, text: "痛みの強さだけでなく、眠りや歩行など、最初に困っていたことの変化と有害な反応を確かめます。" },
];

const evidenceQuestions = [
  ["誰を対象にした？", "症状、診断、重さ、年齢、どのくらい続いたか。"],
  ["何を行った？", "鍼・灸・圧のどれか。使った経穴、組み合わせ、併用した治療。"],
  ["何と比べた？", "通常の治療、疑似刺激、別の方法など、比較群が受けたもの。"],
  ["何が変わった？", "痛み、生活のしやすさ、変化が続いた期間、有害事象。"],
] as const;

type SourceId = (typeof ACUPUNCTURE_GUIDE_SOURCES)[number]["id"];

function SourceLink({ id, children }: { id: SourceId; children: string }) {
  return <a href={`#acupuncture-source-${id}`} className="acupuncture-source-marker">{children}</a>;
}

export default function AcupunctureGuidePage() {
  return (
    <article className="page-layout acupuncture-guide">
      <header className="acupuncture-guide-hero">
        <Link href="/learn" className="reader-back"><span aria-hidden="true">←</span>はり太郎の東洋医学</Link>
        <h1>鍼灸とは？<span> はり・お灸・ツボ押しの違い</span></h1>
        <p>鍼灸（しんきゅう、はりきゅう）は、鍼やお灸で体に刺激を加える施術の呼び名です。鍼と灸で使う道具や刺激が違い、どの部位にどう働きかけるかは、体の状態や施術の目的に合わせて考えます。</p>
        <details className="acupuncture-detail acupuncture-guide-contents">
          <summary>目次</summary>
          <nav aria-label="鍼灸入門の目次" className="acupuncture-guide-nav">
            {topics.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            <a href="#history">鍼の歴史</a>
          </nav>
        </details>
      </header>

      <section id="methods" className="acupuncture-guide-section" aria-labelledby="acupuncture-methods-title">
        <h2 id="acupuncture-methods-title">はり・お灸・ツボ押しを見比べる</h2>
        <div className="acupuncture-methods">
          {methods.map(({ id, name, stimulus, summary }) => (
            <article key={id} className={`acupuncture-method acupuncture-method--${id}`} data-acupuncture-method={id}>
              <AcupunctureMethodArt method={id} />
              <div className="acupuncture-method-copy">
                <h3>{name}</h3>
                <p className="acupuncture-method-stimulus">{stimulus}</p>
                <p>{summary}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="acupuncture-detail-grid">
          <details className="acupuncture-detail">
            <summary>鍼管・接触鍼・電気鍼</summary>
            <p>鍼管（しんかん）は細い鍼を支える筒です。皮膚に触れる接触鍼や、鍼を介して電気刺激を加える電気鍼もあります。研究では、同じ「鍼」でも何を使いどんな刺激を比べたかを確認します。</p>
          </details>
          <details className="acupuncture-detail">
            <summary>直接灸・間接灸・有痕灸・無痕灸</summary>
            <p>直接灸は皮膚の上にもぐさを置く方法、間接灸は台座などを挟んだり皮膚と距離を取ったりして温める方法です。有痕灸は痕を残すことを前提にする方法で、無痕灸は痕を残さないように行う方法です。熱さや煙、やけどへの配慮は方法によって変わります。</p>
          </details>
        </div>
        <p className="acupuncture-section-sources"><SourceLink id="japan">はり・きゅうの定義を確認</SourceLink> <SourceLink id="safety">道具と安全性の出典</SourceLink></p>
      </section>

      <section id="points" className="acupuncture-guide-section" aria-labelledby="acupuncture-points-title">
        <h2 id="acupuncture-points-title">ツボはどう使われる？</h2>
        <div className="acupuncture-points-layout">
          <dl className="acupuncture-terms">
            <div><dt>経穴（けいけつ）</dt><dd>ツボのことです。手の甲の合谷（LI4）のように、名称とコードで位置を共有できます。位置を調べるときは、骨や腱、しわなどの目印を使います。</dd></div>
            <div><dt>経絡（けいらく）</dt><dd>伝統医学で、体の各部位やツボの関係を道筋として説明する考え方です。図鑑では経絡の並びと、骨や腱などの位置の目印をそれぞれ確認できます。</dd></div>
            <div><dt>配穴（はいけつ）</dt><dd>施術に使うツボを選び、組み合わせることです。使う経穴のほかに、鍼・灸などの方法や経過の見方も施術の計画に含まれます。</dd></div>
            <div><dt>寸（すん）</dt><dd>ツボの位置を示す尺度です。骨度法では、体の決まった区間を等分して、一人ひとりの体格に合わせて位置を読み取ります。</dd></div>
          </dl>
          <figure className="acupuncture-point-example">
            <HeguHandDiagram thumbnail />
            <figcaption><strong>合谷 <span>LI4</span></strong><p>人差し指につながる中手骨が目印です。</p></figcaption>
            <Link href="/tsubo/li4#acupoint-diagram" className="ui-text-link">図鑑で骨と位置を確認 <ArrowRight size={16} aria-hidden="true" /></Link>
          </figure>
        </div>
        <p>WHOの標準には経穴の位置や基準が載っています。位置を確認したいときは、図鑑の拡大図と合わせて読めます。 <SourceLink id="who-points">WHOの位置基準</SourceLink></p>
        <div className="acupuncture-inline-links">
          <Link href="/tsubo" className="ui-text-link">全361穴のツボ図鑑へ <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/tsubo/basics/bone-cun" className="ui-text-link">寸の読み方を図で見る <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="visit" className="acupuncture-guide-section" aria-labelledby="acupuncture-visit-title">
        <h2 id="acupuncture-visit-title">相談から施術後の振り返りまで</h2>
        <p>たとえば「肩が痛い」なら、「上着に腕を通すと痛む」「いつから続いている」まで伝えると、体の確認や施術後の比較に役立ちます。 <SourceLink id="who-practice">施術と同意の基準</SourceLink></p>
        <ol className="acupuncture-visit-flow" role="list">
          {visitSteps.map(({ title, icon: Icon, text }) => (
            <li key={title}><Icon size={24} strokeWidth={1.65} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      <section id="evidence" className="acupuncture-guide-section" aria-labelledby="acupuncture-evidence-title">
        <h2 id="acupuncture-evidence-title">効果について調べるときの見方</h2>
        <p>鍼への神経や組織の反応を測る研究と、患者の痛みや生活動作を比べる研究では、確かめる問いが違います。施術の効果を調べたいときは、臨床試験の対象と比較条件を先に見ます。</p>
        <dl className="acupuncture-evidence-questions">
          {evidenceQuestions.map(([question, answer]) => <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}
        </dl>
        <p><strong>偽鍼（ぎしん）</strong>は、研究で比較に使う、鍼施術をまねた方法です。皮膚に入らない器具など、試験によって方法が違います。</p>
        <div className="acupuncture-research-list">
          {ACUPUNCTURE_STUDY_EXAMPLES.map(study => (
            <article key={study.id} id={`example-${study.id}`} className="acupuncture-study">
              <header><span>{study.method}</span><h3>{study.title}</h3></header>
              <p>{study.context}</p>
              <p>{study.result}</p>
              <p className="acupuncture-study-limit">{study.limit}</p>
              <div className="acupuncture-inline-links">
                <a href={study.href} className="ui-text-link">{study.source}</a>
                {"pointHref" in study && <Link href={study.pointHref} className="ui-text-link">{study.pointLabel} <ArrowRight size={16} aria-hidden="true" /></Link>}
              </div>
            </article>
          ))}
        </div>
        <p>複数のツボを使った試験は、その施術全体を比較しています。一穴の寄与や、組み合わせによる上乗せを知るには、その一穴や組み合わせ自体を変えた比較が必要です。</p>
        <div className="acupuncture-inline-links">
          <Link href="/learn/lectures/reading-evidence" className="ui-text-link">講義で研究の読み方を学ぶ <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/articles/science-of-acupuncture-neuroscience" className="ui-text-link">鍼灸の作用機序の研究を読む <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="safety" className="acupuncture-guide-section" aria-labelledby="acupuncture-safety-title">
        <h2 id="acupuncture-safety-title">施術を受ける前に知っておきたい安全性</h2>
        <div className="acupuncture-safety-grid">
          <div><h3>はり</h3><p>出血や内出血、痛みが起こることがあります。感染や気胸などの重い有害事象も報告されています。滅菌済みの単回使用鍼、手指や施術部位の衛生管理について、施術前に確認できます。</p></div>
          <div><h3>お灸</h3><p>温熱によるやけどや水疱、煙による不快感が生じることがあります。皮膚の感覚が鈍い部位や、煙で症状が出やすい場合は、事前に伝えてください。</p></div>
        </div>
        <p>強い胸の痛みや息苦しさ、突然の激しい頭痛などは救急の評価を優先します。施術のあとに出た症状についても、いつ・どこに何を受けたかを医療者に伝えてください。 <SourceLink id="safety">全日本鍼灸学会の安全性資料</SourceLink></p>
        <Link href="/safety" className="ui-text-link">受診の目安と安全性を詳しく読む <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>

      <section id="questions" className="acupuncture-guide-section" aria-labelledby="acupuncture-questions-title">
        <h2 id="acupuncture-questions-title">はじめて受けるときのよくある疑問</h2>
        <div className="acupuncture-faq">
          <details className="acupuncture-detail"><summary>鍼は痛いですか？</summary><p>感じ方は部位や方法、人によって違います。刺激や響きを感じることがあり、痛みや不安があれば、その場で施術者に伝えて調整を相談できます。</p></details>
          <details className="acupuncture-detail"><summary>お灸は熱いですか？</summary><p>伝わる熱は、灸の種類や皮膚の状態で変わります。熱さに不安がある、皮膚の感覚が鈍い、煙が苦手など、気になることを始める前に伝えられます。</p></details>
          <details className="acupuncture-detail"><summary>ツボの図を見て自分で鍼をしてもいいですか？</summary><p>鍼を使う施術は、資格のある施術者に相談してください。図鑑は、骨や腱との位置関係を見て、どこを指すかを学ぶために使えます。</p></details>
          <details className="acupuncture-detail"><summary>何回受けると変化が分かりますか？</summary><p>症状、期間、目標、施術の方法で変わります。まず「夜何回起きるか」「階段をどのくらい上れるか」など、何をいつ確かめるかを相談すると経過を比較しやすくなります。</p></details>
          <details className="acupuncture-detail"><summary>医療機関に通っている場合も相談できますか？</summary><p>治療中の病名や服薬、検査の予定を共有し、施術を併用できるかは担当の医療者に確認してください。出血に影響する薬、妊娠、感覚の異常がある場合も伝えます。</p></details>
          <details className="acupuncture-detail"><summary>日本での資格は何ですか？</summary><p>「はり師」と「きゅう師」はそれぞれ国家資格です。施術を相談するときは、担当者の資格と、どの方法を受けるかを確認できます。 <SourceLink id="japan">免許の出典</SourceLink></p></details>
          <details className="acupuncture-detail"><summary>健康保険は使えますか？</summary><p>はり・きゅうには、決められた条件のもとで療養費の対象になる場合があります。対象となる病気か、保険医の同意書があるかなどを、施術前に保険者へ確認してください。 <SourceLink id="insurance">療養費の制度資料</SourceLink></p></details>
        </div>
      </section>

      <section id="history" className="acupuncture-guide-section acupuncture-history-card" aria-labelledby="acupuncture-history-title">
        <BookOpen strokeWidth={1.5} aria-hidden="true" />
        <div>
          <h2 id="acupuncture-history-title">古代の九鍼と現代の鍼を見比べる</h2>
          <p>『霊枢』には、卵形の先を持つ員鍼から、蚊やアブの口にたとえられた毫鍼まで、九種類の鍼具が出てきます。図で形と名前を見比べ、日本で使われる鍼管の歴史もたどれます。</p>
          <Link href={NINE_NEEDLES_GUIDE.href} className="ui-text-link">古代の九鍼の図へ <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="sources" className="acupuncture-guide-section" aria-labelledby="acupuncture-sources-title">
        <h2 id="acupuncture-sources-title">出典と確認した範囲</h2>
        <ul className="acupuncture-sources">
          {ACUPUNCTURE_GUIDE_SOURCES.map(({ id, title, href, scope }) => (
            <li id={`acupuncture-source-${id}`} key={id}><a href={href}>{title}</a><p>{scope}</p></li>
          ))}
        </ul>
        <p className="acupuncture-review"><time dateTime={revisedAt}>{revisedAt}</time> 更新 · <Link href="/editorial-policy" className="ui-text-link">出典の確認方針と監修状況</Link></p>
      </section>
      <AuthorSupervisorCard topic={title} />
    </article>
  );
}
