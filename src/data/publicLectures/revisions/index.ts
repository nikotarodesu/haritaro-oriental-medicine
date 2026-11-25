import { readingLectureMerges } from "../readingLectureMerges";
import { readingUnits } from "../readingUnits";
import { assessmentRevisions } from "./assessment";
import { basicRevisions } from "./basics";
import { bodyFunctionRevisions } from "./bodyFunctions";
import { relationshipRevisions } from "./relationships";
import type { ReadingUnitRevision } from "./types";

const topicRevisions: Readonly<Record<string, ReadingUnitRevision>> = {
  ...basicRevisions,
  ...bodyFunctionRevisions,
  ...relationshipRevisions,
  ...assessmentRevisions,
};

const consolidatedTakeaways: Readonly<Partial<Record<string, ReadingUnitRevision["takeaways"]>>> = {
  "yin-yang-basics": [
    "陰陽は何と何を、どんな基準で比べるかで変わります。同じ40℃のお湯でも、比べる相手によって陽にも陰にもなります。",
    "消長は少しずつ増減すること、転化は条件が変わって反対側の性質へ移ることです。",
    "顔のほてりと足の冷えは、どこに、いつ出たかを一つずつ記録すると、同じ時間帯に重なったかが分かります。",
  ],
  "qi-blood-fluids": [
    "気は動かす、温めるなどの働き、血は養いや潤い、津液は体を潤す水分の説明に使います。",
    "気が血の巡りを導き、血が気を養うと考えます。二本の矢印では、働きかける側が入れ替わります。",
    "津血同源は、血と津液がどちらも飲食から得たものに由来するという考え方です。",
  ],
  "zangfu-basics": [
    "五臓と六腑を読むときは、名前の横に、何をするかを書いてみます。",
    "胃は飲食を受け、脾は得たものを変えて配り、肝は気を巡らせ、腎は精を蓄えると考えます。",
    "表裏の図では、肺と大腸などの組を確かめられます。本人からせきと便の回数の変化を聞いたら、それぞれがいつ始まったかを記録します。",
  ],
  "five-elements": [
    "相生は支える向き、相剋は抑える向きです。五行の図で、木から出る二本の矢印をたどれます。",
    "同じ水でも、木と組にすれば母、金と組にすれば子です。",
    "五行表では、土の行に口・肉・唇が並びます。何を表すかは列の見出しで確かめます。",
  ],
  "how-patterns-change": [
    "始まったときの出来事と、今も不調が続く条件を分けて聞きます。",
    "発生は始まり、波及はあとから加わった変化、維持は今も続く条件を見ます。",
    "予想と違う答えが返ったときも記録に残し、見立てを考え直す材料にします。",
  ],
  "assessment-basics": [
    "四診で得た情報は、本人の話、見聞きしたこと、触れて分かったことが区別できるように書きます。",
    "証は今の状態の見立て、弁証はその見立てを考える過程です。",
    "突然の激しい頭痛など、急を要する症状があるときは、すぐに119番へ連絡してください。始まった時刻と今の状態を伝えます。",
  ],
  "principles-and-goals": [
    "たとえば夕方に洗濯物を10枚干すなら、痛みの強さと、途中で休んだ回数をそれぞれ比べます。",
    "治則は大きな方針、治法は進め方、配穴はツボの組み合わせです。",
    "補法は足りない働きを支え、瀉法は行き過ぎや滞りを減らす考え方です。",
  ],
};

export const readingUnitRevisions: Readonly<Record<string, ReadingUnitRevision | undefined>> = Object.fromEntries(
  readingUnits.map(({ slug }) => {
    const mergedSlugs = readingLectureMerges.filter(([, destination]) => destination === slug).map(([former]) => former);
    const revisions = [slug, ...mergedSlugs].map(topic => topicRevisions[topic]);
    return [slug, {
      copy: Object.assign({}, ...revisions.map(revision => revision.copy)),
      takeaways: consolidatedTakeaways[slug] ?? revisions[0].takeaways,
      questions: revisions.flatMap(revision => revision.questions),
    }];
  }),
);
