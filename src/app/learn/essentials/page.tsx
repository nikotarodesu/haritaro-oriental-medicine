import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import PageIntro from "@/components/design/PageIntro";
import StudyDiagram from "@/components/reading/StudyDiagram";
import { pageSocialMetadata } from "@/config/seo";
import { getPublicLectureDiagram } from "@/data/publicLectures/diagrams";

const path = "/learn/essentials";
const title = "東洋医学の要点";
const description = "陰陽や気・血・津液、経絡など、東洋医学の基本を一問ずつ確認できます。気になったテーマは、図や講義で深められます。";

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
  lectureId: string;
  showDiagram?: boolean;
}

const groups: readonly { id: string; title: string; topics: readonly Topic[] }[] = [
  {
    id: "basic-perspectives",
    title: "基本の見方",
    topics: [
      {
        term: "東洋医学",
        question: "東洋医学とは？",
        answer: "鍼灸や漢方、養生などで受け継がれてきた知識や考え方を広く指します。ここでは、日本の鍼灸で用いる伝統的な考え方を学びます。",
        lectureId: "lecture-intro-1",
      },
      {
        term: "陰陽",
        question: "陰陽とは？",
        answer: "対になる性質や変化を比べる見方です。昼休みに座っている場面なら、明るさで見れば昼は陽、動きで見れば休む側は陰です。",
        lectureId: "lecture-yinyang-1",
        showDiagram: true,
      },
      {
        term: "五行",
        question: "五行とは？",
        answer: "木・火・土・金・水を手がかりに、性質と関係を整理する考え方です。例えば「木が伸びる」は木の性質、「木が火を支える」は行どうしの関係です。",
        lectureId: "lecture-wuxing-1",
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
        answer: "伝統医学では、体を動かすなどの働きを「気」、体を養うものを「血」、体を潤す水分を「津液」と呼び分けます。",
        lectureId: "lecture-qiblood-1",
      },
      {
        term: "五臓と六腑",
        question: "五臓と六腑はどう違う？",
        answer: "伝統理論では、蓄えて体の働きを支える役割を五臓、受け入れて通す役割を六腑として整理します。例えば、飲食の説明では脾と胃が一組で登場します。",
        lectureId: "lecture-zangfu-1",
      },
      {
        term: "三焦",
        question: "三焦で何を見ている？",
        answer: "体の働きを上・中・下の三つの範囲に分ける見方です。上では呼吸と分配、中では飲食、下では水分を分けて出す働きに着目します。",
        lectureId: "lecture-lifedynamics-5",
        showDiagram: true,
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
        answer: "経絡は、体のつながりを道筋として表す伝統的な考え方です。主な道筋は経脈、位置と名前が決まっている一つひとつの点は経穴（ツボ）と呼びます。",
        lectureId: "lecture-meridians-1",
        showDiagram: true,
      },
      {
        term: "病因と病機",
        question: "病因と病機はどう違う？",
        answer: "病因は「何が関わったと考えるか」、病機は「どんな過程で不調が起きたと説明するか」です。本人が感じた症状を書いてから、考えた説明を分けて整理します。",
        lectureId: "lecture-pathomechanism-1",
      },
      {
        term: "寒熱と虚実",
        question: "寒熱と虚実は何を比べる？",
        answer: "寒熱は冷えや熱の側面、虚実は働きの不足や過剰・停滞を見る言葉です。一つの訴えでも、どの面に注目するかで考える問いが変わります。",
        lectureId: "lecture-pathomechanism-6",
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
        answer: "望診は見る、聞診は音やにおいを観察する、問診は本人に聞く、切診は同意を得て触れて確かめることです。方法ごとに、何を確認したかを残します。",
        lectureId: "lecture-yinyang-7",
      },
      {
        term: "証と弁証",
        question: "証と弁証はどう違う？",
        answer: "証は、集めた情報をもとに伝統理論で整理した状態の特徴です。弁証は、候補を比べ、追加の情報で見直しながら特徴を考えていく過程を指します。",
        lectureId: "lecture-diagnosis-1",
        showDiagram: true,
      },
      {
        term: "治則と治法",
        question: "治則と治法は何を決める？",
        answer: "治則は「何を優先するか」という方針、治法は「その方針をどんな考え方で進めるか」です。講義では、選んだ理由や見直す条件も一緒に考えます。",
        lectureId: "lecture-treatment-2",
      },
    ],
  },
];

export default function EssentialsPage() {
  return (
    <div className="page-layout essentials-page">
      <div className="learning-guide-intro">
        <Link href="/learn" className="reader-back"><ArrowLeft aria-hidden="true" />はり太郎の東洋医学</Link>
        <PageIntro title={title} description="陰陽、気・血・津液、経絡などの基本を、一問ずつ確認できます。" />
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
            {group.topics.map(topic => {
              const diagram = topic.showDiagram ? getPublicLectureDiagram(topic.lectureId) : undefined;
              return (
                <article key={topic.lectureId} className="essentials-topic">
                  <h3>{topic.question}</h3>
                  <p>{topic.answer}</p>
                  {diagram && (
                    <details className="essentials-diagram">
                      <summary>図で確かめる<ChevronDown aria-hidden="true" size={16} /></summary>
                      <StudyDiagram id={`essential-${topic.lectureId}`} diagram={diagram} />
                    </details>
                  )}
                  <Link href={`/curriculum/${topic.lectureId}`} prefetch={false} className="ui-text-link" aria-label={`${topic.term}の講義を読む`}>
                    講義を読む<ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <nav aria-label="講義で学ぶ" className="reader-navigation">
        <Link href="/curriculum/lecture-intro-1" className="page-primary-action"><BookOpen aria-hidden="true" />最初の講義から学ぶ</Link>
        <Link href="/learn#learn-courses-heading" className="page-secondary-action">講義の目次</Link>
      </nav>
    </div>
  );
}
