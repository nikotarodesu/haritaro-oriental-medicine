import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, ChartLine, ClipboardList, Layers3, MessageCircle, ShieldCheck } from "lucide-react";
import AuthorSupervisorCard from "@/components/common/AuthorSupervisorCard";
import AcupunctureMethodArt, { type AcupunctureMethod } from "@/components/learning/AcupunctureMethodArt";
import AcupunctureTrialComparison from "@/components/learning/AcupunctureTrialComparison";
import SeirinNeedleDiagram from "@/components/learning/SeirinNeedleDiagram";
import HeguHandDiagram from "@/components/tsubo/atlas/HeguHandDiagram";
import { ACUPUNCTURE_GUIDE, NINE_NEEDLES_GUIDE } from "@/config/acupunctureLearning";
import { pageSocialMetadata } from "@/config/seo";
import { ACUPUNCTURE_GUIDE_SOURCES, ACUPUNCTURE_STUDY_EXAMPLES } from "@/data/acupunctureGuide";

const { href, title, description, revisedAt } = ACUPUNCTURE_GUIDE;
const pageTitle = `${title}｜はり太郎の東洋医学`;
const needleExample = "seirin-no3";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description,
  alternates: { canonical: href },
  ...pageSocialMetadata(pageTitle, description, href),
};

const topics = [
  ["methods-details", "はり・灸・ツボ押し"], [needleExample, "セイリンの3番鍼"], ["points", "ツボと配穴"], ["visit", "施術の流れ"],
  ["mechanisms", "鍼への体の反応"], ["evidence", "研究の読み方"], ["combinations", "ツボの組み合わせ"],
  ["safety", "安全性"], ["questions", "よくある疑問"], ["history", "鍼の歴史"],
] as const;

const methods: ReadonlyArray<{ id: AcupunctureMethod; name: string; stimulus: string; summary: string }> = [
  { id: "needle", name: "はり", stimulus: "鍼の刺激", summary: "細い鍼を用います。皮膚に入れる方法や、鍼具で皮膚に触れて刺激する方法があります。" },
  { id: "moxa", name: "お灸", stimulus: "熱の刺激", summary: "ヨモギの葉の繊維を加工した「もぐさ」などを使い、温めて刺激します。" },
  { id: "pressure", name: "ツボ押し", stimulus: "圧の刺激", summary: "指などで体の表面に圧を加えます。鍼や灸と同じツボを目印にする場合もあります。" },
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
        <p>鍼灸（しんきゅう、はりきゅう）は、はりとお灸で体に刺激を加える施術です。ツボ押しと共通のツボを使うこともあります。</p>
        <figure id="methods" className="acupuncture-method-figure" aria-label="はり・お灸・ツボ押しの比較">
          <ul className="acupuncture-methods" role="list">
            {methods.map(({ id, name, stimulus }) => (
              <li key={id} className={`acupuncture-method acupuncture-method--${id}`} data-acupuncture-method={id}>
                <AcupunctureMethodArt method={id} />
                <strong>{name}</strong>
                <span>{stimulus}</span>
              </li>
            ))}
          </ul>
          <figcaption>
            <p>各図を横切る実線が皮膚の表面です。鍼を入れる、台座で間接的に温める、指で押す例を並べています。</p>
            <a href={`#${needleExample}`} className="acupuncture-method-example-link">セイリンの3番鍼を図で見る <ArrowRight size={15} aria-hidden="true" /></a>
          </figcaption>
        </figure>
        <details className="acupuncture-detail acupuncture-guide-contents">
          <summary>目次</summary>
          <nav aria-label="鍼灸入門の目次" className="acupuncture-guide-nav">
            {topics.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </details>
      </header>

      <section id="methods-details" className="acupuncture-guide-section" aria-labelledby="acupuncture-methods-title">
        <h2 id="acupuncture-methods-title">使う道具と刺激の違い</h2>
        <dl className="acupuncture-method-notes">
          {methods.map(({ id, name, summary }) => (
            <div key={id}><dt>{name}</dt><dd>{summary}</dd></div>
          ))}
        </dl>
        <section id={needleExample} className="acupuncture-needle-example" aria-labelledby="seirin-no3-title">
          <header>
            <h3 id="seirin-no3-title">現代の鍼を図で見る <span>セイリン Jタイプの3番</span></h3>
            <p>鍼管付きで鍼体が40 mmの「寸3」を例に、製品の表記と各部の名前を見てみます。</p>
          </header>
          <dl className="acupuncture-needle-measurements">
            <div><dt>太さ（線径）・3番</dt><dd>0.20 <span>mm</span></dd></div>
            <div><dt>鍼体の長さ・寸3</dt><dd>40 <span>mm</span></dd></div>
          </dl>
          <div className="acupuncture-needle-layout">
            <figure>
              <SeirinNeedleDiagram />
              <figcaption>鍼と鍼管を分けて描いた模式図です。鍼体の太さと右下の断面は拡大しています。</figcaption>
            </figure>
            <dl className="acupuncture-needle-parts">
              <div><dt>鍼柄（しんぺい）</dt><dd>プラスチックの持ち手です。この3番は青い鍼柄で見分けられます。</dd></div>
              <div><dt>鍼体（しんたい）</dt><dd>持ち手から伸びるステンレス鋼の部分です。線径は、その断面の直径です。</dd></div>
              <div><dt>鍼尖（しんせん）</dt><dd>鍼体の先端です。</dd></div>
              <div><dt>鍼管（しんかん）</dt><dd>施術者が細い鍼を支えるために使う筒です。</dd></div>
            </dl>
          </div>
          <p>Jタイプの3番には、40 mmのほかにも鍼体が30・50・60 mmのものがあります。鍼灸師は施術する部位や目的に応じて、太さと長さを選びます。</p>
          <p>滅菌済みの単回使用品で、鍼と鍼管が1本ずつ組になって包装されています。</p>
          <div className="acupuncture-inline-links">
            <Link href="/tsubo/basics/bone-cun" className="ui-text-link">体の位置を示す「寸」の図解へ <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <p className="acupuncture-section-sources">
            <SourceLink id="seirin-insert">PMDAの電子添文</SourceLink>
            <SourceLink id="seirin-j-type">セイリンの製品資料</SourceLink>
            <SourceLink id="seirin-sun">「寸3」の表記資料</SourceLink>
          </p>
        </section>
        <div className="acupuncture-detail-grid">
          <details className="acupuncture-detail">
            <summary>接触鍼・電気鍼</summary>
            <p>皮膚に触れる接触鍼や、鍼を介して電気刺激を加える電気鍼もあります。研究では、同じ「鍼」でも何を使いどんな刺激を比べたかを確認します。</p>
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

      <section id="mechanisms" className="acupuncture-guide-section" aria-labelledby="acupuncture-mechanisms-title">
        <h2 id="acupuncture-mechanisms-title">鍼を受けた体の反応は、どう調べる？</h2>
        <p>鍼の周りで起きたこと、神経系の変化、生活で感じる変化は、測る方法が違います。</p>
        <div className="acupuncture-mechanisms">
          <div>
            <Layers3 size={26} strokeWidth={1.5} aria-hidden="true" />
            <h3>鍼の周りの組織</h3>
            <p>60人を対象に鍼を抜くときに必要な力を測り、鍼の操作によって値が変わることを確かめた研究があります。</p>
            <SourceLink id="tissue">組織の反応を測った研究</SourceLink>
          </div>
          <div>
            <Brain size={26} strokeWidth={1.5} aria-hidden="true" />
            <h3>脳で測れる反応</h3>
            <p>線維筋痛症の人を対象に、PET（体内の働きを画像で調べる検査）で痛みの調節に関わる受容体を調べました。その指標は鍼と偽鍼（鍼を模した方法）で異なる変化を示しました。</p>
            <SourceLink id="brain">脳画像を比べた研究</SourceLink>
          </div>
          <div>
            <ChartLine size={26} strokeWidth={1.5} aria-hidden="true" />
            <h3>日常生活での変化</h3>
            <p>患者が感じる痛みや動きやすさは臨床試験で比べます。慢性腰痛の試験では、日常の動作にどのくらい困っているかを質問票で調べました。</p>
            <a href="#example-back-pain-point-selection" className="acupuncture-source-marker">慢性腰痛の試験を見る</a>
          </div>
        </div>
        <p>組織や画像の変化は仕組みを考える手がかりです。その変化が日常生活の改善とどう結びつくかは、別に確かめる必要があります。</p>
        <Link href="/articles/science-of-acupuncture-neuroscience" className="ui-text-link">鍼灸の作用機序の研究を読む <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>

      <section id="evidence" className="acupuncture-guide-section" aria-labelledby="acupuncture-evidence-title">
        <h2 id="acupuncture-evidence-title">効果について調べるときの見方</h2>
        <p>施術の効果を知りたいときは、誰が何を受け、どんな条件の人と比べたかを見ます。同じ「鍼の研究」でも、その条件や測り方によって答えられる問いは変わります。</p>
        <dl className="acupuncture-evidence-questions">
          {evidenceQuestions.map(([question, answer]) => <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}
        </dl>
        <p><strong>偽鍼（ぎしん）</strong>は、研究で比較に使う、鍼施術をまねた方法です。皮膚に入らない器具など、試験によって方法が違います。</p>
        <div className="acupuncture-research-list">
          {ACUPUNCTURE_STUDY_EXAMPLES.map(study => (
            <article key={study.id} id={`example-${study.id}`} className="acupuncture-study">
              <header><span>{study.method}</span><h3>{study.title}</h3></header>
              <p>{study.context}</p>
              <div className="acupuncture-study-results">
                {"outcomes" in study && (
                  <figure className="acupuncture-study-chart">
                    <figcaption><strong>8週後、困りごとの点数が平均で何点下がったか</strong><p>質問票は0〜23点。低いほど日常動作での困りごとが少ないことを表します。</p></figcaption>
                    <ul role="list">
                      {study.outcomes.map(({ label, change }) => (
                        <li key={label}>
                          <span>{label}</span>
                          <svg viewBox="0 0 5 1" preserveAspectRatio="none" aria-hidden="true">
                            <rect width="5" height="1" />
                            <rect width={change} height="1" />
                          </svg>
                          <strong>{change.toFixed(1)}点</strong>
                        </li>
                      ))}
                    </ul>
                    <div className="acupuncture-study-chart-axis" aria-hidden="true"><span><span>0</span><span>5点</span></span></div>
                  </figure>
                )}
                <p>{study.result}</p>
              </div>
              <p className="acupuncture-study-limit">{study.limit}</p>
              <div className="acupuncture-inline-links">
                <a href={study.href} className="ui-text-link">{study.source}</a>
                {"pointHref" in study && <Link href={study.pointHref} className="ui-text-link">{study.pointLabel} <ArrowRight size={16} aria-hidden="true" /></Link>}
              </div>
            </article>
          ))}
        </div>
        <Link href="/learn/lectures/reading-evidence" className="ui-text-link">講義で研究の読み方を学ぶ <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>

      <section id="combinations" className="acupuncture-guide-section" aria-labelledby="acupuncture-combinations-title">
        <h2 id="acupuncture-combinations-title">一穴の効果と組み合わせをどう確かめる？</h2>
        <p>全員が通常の治療を受け、経穴AとBを加えるかどうかで4群に分ける架空の試験です。問いを選ぶと、どの群を比べるかが変わります。</p>
        <AcupunctureTrialComparison />
        <p>実際の論文では、共通の治療や刺激方法がそろっているか、比べたい差とその不確かさが報告されているかを確かめます。 <SourceLink id="factorial">4群の試験を読むための報告指針</SourceLink></p>
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
