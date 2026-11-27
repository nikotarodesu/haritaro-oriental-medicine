import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import PageIntro from "@/components/design/PageIntro";
import StudyDiagram from "@/components/reading/StudyDiagram";
import { pageSocialMetadata, seriesPageTitle } from "@/config/seo";
import type { LectureDiagram } from "@/data/publicLectures/diagrams/types";
import { readingPartHref, readingUnits } from "@/data/publicLectures/readingUnits";

const path = "/learn/essentials";
const heading = "東洋医学の要点";
const title = seriesPageTitle(heading, "reading");
const description = "陰陽、気・血・津液、経絡などの基本を、身近な例と図で確かめられます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...pageSocialMetadata(title, description, path),
};

interface Topic {
  term: string;
  question: string;
  answer: string;
  example: string;
  lectureId: string;
  diagram: LectureDiagram;
}

const groups: readonly { id: string; title: string; topics: readonly Topic[] }[] = [
  {
    id: "basic-perspectives",
    title: "基本の見方",
    topics: [
      {
        term: "東洋医学",
        question: "東洋医学とは？",
        answer: "鍼灸・漢方・養生などに伝わる知識や考え方です。",
        example: "「夕方に疲れる」を「夕食の支度中、脚がだるくなり、座ると楽になる」と書くと、変化が伝わります。",
        lectureId: "lecture-intro-1",
        diagram: {
          title: "体調の変化を言葉にする",
          layout: "flow",
          items: [["気づく", "夕方に脚がだるい。"], ["場面を添える", "夕食の支度中に気づいた。"], ["その後を書く", "座るとどう変わったか。"]],
        },
      },
      {
        term: "陰陽",
        question: "陰陽とは？",
        answer: "明るい・暗いなど、対になる性質を比べる見方です。",
        example: "日が差す窓辺で座っているとき、部屋の奥と比べれば明るいので陽。さっき歩いていたときと比べれば、動きが少ないので陰です。",
        lectureId: "lecture-yinyang-1",
        diagram: {
          title: "昼休みの同じ場面を、二つの基準で見る",
          layout: "compare",
          items: [["部屋の奥と比べる", "明るい窓辺が陽。", "sun"], ["歩いていた時と比べる", "座っている今が陰。", "footprints"]],
        },
      },
      {
        term: "五行",
        question: "五行とは？",
        answer: "木・火・土・金・水の五つで、性質とつながりを整理する考え方です。",
        example: "「枝が伸びる」は木の性質を表し、「木が火を支える」は木と火の関係を表します。",
        lectureId: "lecture-wuxing-1",
        diagram: {
          title: "五行の例で、性質と関係を読む",
          layout: "relations",
          directional: true,
          items: [["木", "伸びる", "性質"], ["木", "火", "支える関係"]],
        },
      },
    ],
  },
  {
    id: "body-functions",
    title: "体の働き",
    topics: [
      {
        term: "気・血・津液",
        question: "気・血・津液は何を表す？",
        answer: "伝統理論では、体を動かす、養う、潤すという働きを区別する言葉です。",
        example: "散歩で体を動かすこと、食べて体を養うこと、口が潤うことを思い浮かべると、三つの違いをたどれます。",
        lectureId: "lecture-qiblood-1",
        diagram: {
          title: "働き・養い・潤いの三つの見方",
          layout: "compare",
          items: [["気", "体を動かすなどの働き。"], ["血", "体の各部を養う役割。"], ["津液", "体を潤す水分。"]],
        },
      },
      {
        term: "五臓と六腑",
        question: "五臓と六腑はどう違う？",
        answer: "伝統理論では、蓄えて働きを支える役割を五臓、受け入れて通す役割を六腑と呼びます。",
        example: "伝統理論では、胃が飲食物を受け入れ、脾がそこから得たものを変えて運ぶと考えます。",
        lectureId: "lecture-zangfu-1",
        diagram: {
          title: "飲食の説明に出てくる一組",
          layout: "compare",
          items: [["胃・六腑", "飲食物を受け入れる。"], ["脾・五臓", "飲食物から得たものを変えて運ぶ。"]],
        },
      },
      {
        term: "三焦",
        question: "三焦で何を見ている？",
        answer: "体の働きを、上・中・下の三つの範囲で整理する見方です。",
        example: "食事の話でも、呼吸や分配、飲食、水分を出す働きのどれを指すかを分けて読むと整理できます。",
        lectureId: "lecture-lifedynamics-5",
        diagram: {
          title: "上・中・下で見ている働き",
          layout: "compare",
          items: [["上焦", "呼吸し、行き渡らせる。"], ["中焦", "飲食物を受け、変える。"], ["下焦", "水分を分け、不要なものを出す。"]],
        },
      },
    ],
  },
  {
    id: "paths-and-changes",
    title: "つながりと経過",
    topics: [
      {
        term: "経絡と経穴",
        question: "経絡とツボはどう違う？",
        answer: "経絡は体のつながりを道筋で表す考え方で、経穴（ツボ）は名前のある一つひとつの点です。",
        example: "路線図で路線と駅を見分けるように、経絡図では道筋と、その図に記された個々の点を見分けます。",
        lectureId: "lecture-meridians-1",
        diagram: {
          title: "大腸経の線と、合谷の点",
          layout: "flow",
          illustration: "meridian",
          items: [["経絡", "体のつながりの全体像。"], ["経脈", "主な道筋。"], ["経穴", "名前の付いた点。"]],
          note: "図の丸は、左から三間（LI3）、合谷（LI4）、陽谿（LI5）です。",
        },
      },
      {
        term: "病因と病機",
        question: "病因と病機はどう違う？",
        answer: "病因は何が関わったと考えるか、病機は不調に至る過程をどう説明するかです。",
        example: "「夜更かしした。翌朝だるかった」と聞いたら、どんな出来事が関わったかと、だるさが出るまでの過程を分けて考えます。",
        lectureId: "lecture-pathomechanism-1",
        diagram: {
          title: "「翌朝だるかった」から考える二つの問い",
          layout: "compare",
          items: [["病因", "夜更かしなど、何が関わったか。"], ["病機", "だるさが出るまでに、どんな変化があったと考えるか。"]],
          note: "夜更かしの翌日に起きたという順序だけでは、だるさの原因は分かりません。",
        },
      },
      {
        term: "寒熱と虚実",
        question: "寒熱と虚実は何を比べる？",
        answer: "寒熱は冷えや熱の側面、虚実は働きの不足や過剰・停滞を見る言葉です。",
        example: "「足が冷える」と「階段を上ると疲れる」を別々に書くと、冷えの場所と、疲れる場面を確かめられます。",
        lectureId: "lecture-pathomechanism-6",
        diagram: {
          title: "寒熱と虚実は、見るところが違う",
          layout: "compare",
          items: [["寒熱", "冷え・熱の側面を読む。"], ["虚実", "不足・過剰・停滞の側面を読む。"]],
        },
      },
    ],
  },
  {
    id: "observation-and-reasoning",
    title: "観察と見立て",
    topics: [
      {
        term: "四診",
        question: "四診では何を確かめる？",
        answer: "情報を、見る・音やにおいを確かめる・本人に聞く・触れて確かめる方法で集めます。",
        example: "歩き方を見た記録と、「いつから歩きづらいか」を本人に聞いた記録は分けて残せます。",
        lectureId: "lecture-diagnosis-4",
        diagram: {
          title: "一つの相談を四つの方法から見る",
          layout: "compare",
          items: [["望診", "歩く姿などを目で見る。"], ["聞診", "声などの音やにおいを観察する。"], ["問診", "本人に時期や困りごとを聞く。"], ["切診", "同意を得て触れ、分かったことを記す。"]],
        },
      },
      {
        term: "証と弁証",
        question: "証と弁証はどう違う？",
        answer: "証は伝統理論でまとめた状態の特徴です。弁証は、情報を集めて候補を比べる過程です。",
        example: "「夕方に疲れる」と聞いたら、休日も同じかを確かめ、集まった情報から候補を見直します。",
        lectureId: "lecture-diagnosis-1",
        diagram: {
          title: "弁証で考えを更新する流れ",
          layout: "flow",
          items: [["情報を集める", "疲れる時刻と場面を聞く。"], ["候補を比べる", "合う点と合わない点を並べる。"], ["見直す", "休日の様子などを聞いて考え直す。"]],
        },
      },
      {
        term: "治則と治法",
        question: "治則と治法は何を決める？",
        answer: "治則は何を優先するかという方針で、治法はその方針を進める考え方です。",
        example: "「肩がつらくても、夕方に洗濯物を最後まで干したい」と聞いたら、その動作で何が変わったかを次に確かめます。",
        lectureId: "lecture-treatment-2",
        diagram: {
          title: "生活の目標から、方針と方法へ",
          layout: "flow",
          items: [["本人の目標", "どんな活動に戻りたいか。"], ["治則", "何を優先する方針か。"], ["治法", "どんな考え方で進めるか。"]],
        },
      },
    ],
  },
];

export default function EssentialsPage() {
  return (
    <div className="page-layout essentials-page">
      <div className="learning-guide-intro">
        <Link href="/learn" className="reader-back"><ArrowLeft aria-hidden="true" />東洋医学の学習案内へ</Link>
        <PageIntro title={heading} description={description} />
        <nav className="essentials-index" aria-label="要点のテーマ">
          {groups.map(group => (
            <a key={group.id} href={`#${group.id}`} className="page-secondary-action">{group.title}<ArrowDown size={16} aria-hidden="true" /></a>
          ))}
        </nav>
      </div>

      {groups.map(group => (
        <section key={group.id} id={group.id} className="essentials-group" aria-labelledby={`${group.id}-title`}>
          <h2 id={`${group.id}-title`} className="reader-section-title">{group.title}</h2>
          <div className="essentials-topics">
            {group.topics.map(topic => (
              <article key={topic.lectureId} className="essentials-topic">
                <h3>{topic.question}</h3>
                <p>{topic.answer}</p>
                <p className="essentials-example"><strong>身近な例</strong> {topic.example}</p>
                <div className="essentials-actions">
                  <details className="essentials-diagram">
                    <summary>{topic.term}を図で確認<ChevronDown aria-hidden="true" size={16} /></summary>
                    <StudyDiagram id={`essential-${topic.lectureId}`} diagram={topic.diagram} />
                  </details>
                  <Link href={readingPartHref(topic.lectureId)} prefetch={false} className="ui-text-link">
                    講義で「{topic.term}」を読む<ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <nav aria-label="講義で学ぶ" className="reader-navigation">
        <Link href={readingUnits[0].href} className="page-primary-action"><BookOpen aria-hidden="true" />第1講を読む</Link>
        <Link href="/learn#learn-courses-heading" className="page-secondary-action">講義から選ぶ</Link>
        <Link href="/learn/review" className="ui-text-link min-h-11">確認問題と復習</Link>
      </nav>
    </div>
  );
}
