import { assessmentAxesDiagram } from "./applied";
import type { LectureDiagram } from "./types";

type SupportingDiagram = LectureDiagram & { anchor: string; afterSection: 1 | 2 | 3 };

export const supportingLectureDiagrams: Readonly<Partial<Record<string, SupportingDiagram>>> = {
  "lecture-diagnosis-7": assessmentAxesDiagram,
  "lecture-intro-1": {
    anchor: "intro-where-to-check",
    afterSection: 3,
    title: "知りたいことから、確かめる先を選ぶ",
    illustration: "reading-sources",
    layout: "compare",
    items: [
      ["用語集", "気虚など、言葉の意味を調べる。"],
      ["研究", "どんな人を対象に、何と比べたかを読む。"],
      ["診察・相談", "自分の症状がいつ、どんな場面で出たかを伝える。"],
    ],
  },
  "lecture-intro-2": {
    anchor: "intro-shoulder-goals",
    afterSection: 1,
    title: "同じ肩のつらさでも、戻りたい場面は違う",
    illustration: "daily-goals",
    layout: "compare",
    items: [["眠る", "夜中に目が覚める人は、夜に眠れるようになりたい。"], ["会議に出る", "途中で立ちたくなる人は、最後まで座って会議に出たい。"]],
  },
  "lecture-intro-3": {
    anchor: "intro-finding-and-interpretation",
    afterSection: 2,
    title: "研究で測った結果と、その理由を分けて読む",
    illustration: "research-reading",
    layout: "compare",
    items: [["測った結果", "何を、いつ測ったか。"], ["考察", "理由まで測ったか、結果から推測したか。"]],
  },
};
