import type { ReadingInsert } from "@/types/reading";

export const FOUNDATION_ARTICLE_FIGURES: Record<string, ReadingInsert[]> = {
  "science-of-oriental-medicine-history": [
    {
      afterHeading: "5. 日本での東洋医学の展開 ― 古方派・管鍼法・腹診",
      afterParagraph: 2,
      figure: {
        id: "history-japan-edo-examples",
        title: "江戸時代の学び方・道具・診察",
        layout: "triad",
        graphic: "comparison",
        items: [
          { label: "古方派", description: "『傷寒論』を重視し、症状や所見と処方の関係を考えた。", icon: "book" },
          { label: "管鍼法", description: "杉山和一が、鍼の刺入を補助する鍼管を使う方法を考案した。", icon: "compass" },
          { label: "腹診", description: "腹部に触れ、腹壁の抵抗や圧痛を所見として記録した。", icon: "eye" },
        ],
        caption: "中国から伝わった医学をもとに、日本で学び方や診察、鍼の道具に工夫が加わりました。",
      },
    },
  ],
  "science-of-yinyang-gogyo": [
    {
      afterHeading: "1. 陰陽とは何か：性質を相対的に捉える",
      afterParagraph: 2,
      figure: {
        id: "yinyang-daylight-and-rest",
        title: "同じ昼の休息を二つの基準で見る",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "明暗で比べる", description: "昼と夜を比べると、明るい昼は陽です。", icon: "eye" },
          { label: "動きで比べる", description: "活動と休息を比べると、動きの少ない休息は陰です。", icon: "balance" },
        ],
        caption: "陰陽を読むときは、何と比べ、どの性質に注目しているかを確かめます。",
      },
    },
  ],
  "science-of-qi-blood-fluid": [
    {
      afterHeading: "2. 気の働きを学ぶ",
      afterParagraph: 1,
      figure: {
        id: "qi-defense-and-retention",
        title: "外から守る防御、内に保つ固摂",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "防御", description: "外からの影響に対して、身体を守る働きです。", icon: "check" },
          { label: "固摂", description: "血や汗などが出すぎないよう、内に保つ働きです。", icon: "drop" },
        ],
        caption: "防御と固摂は、気の働きを説明する伝統的な用語です。",
      },
    },
  ],
  "science-of-meridians-network": [
    {
      afterHeading: "1. 経絡の記述を学ぶ",
      afterParagraph: 2,
      figure: {
        id: "meridian-path-and-branches",
        title: "経脈から細かな連絡へ、用語をたどる",
        layout: "steps",
        graphic: "flow",
        items: [
          { label: "経脈", description: "経絡の中の主な道筋です。", icon: "compass" },
          { label: "絡脈", description: "経脈から分かれる枝を表します。", icon: "leaf" },
          { label: "孫絡", description: "さらに細かな連絡を表します。", icon: "leaf" },
        ],
        caption: "矢印は、伝統的な経絡の説明に出てくる道筋の枝分かれを表します。",
      },
    },
  ],
  "science-of-acupoints-mechanotransduction": [
    {
      afterHeading: "2. ツボの目印と周囲の組織",
      afterParagraph: 1,
      figure: {
        id: "acupoint-wrist-ankle-landmarks",
        title: "手首と足首では、位置の目印が変わる",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "手首の例", description: "腱やしわが位置を読む目印になります。", icon: "eye" },
          { label: "足首の例", description: "くるぶしが位置を読む目印になります。", icon: "compass" },
        ],
        caption: "部位ごとに目印を確かめ、周囲の神経・血管や筋・腱は別に確認します。",
      },
    },
  ],
  "science-of-pulse-diagnosis": [
    {
      afterHeading: "4. 再現性を調べた原著から学ぶ",
      afterParagraph: 1,
      figure: {
        id: "pulse-agreement-accuracy",
        title: "一致率と診断精度は、答える問いが違う",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "記録が一致するか", description: "同じ人の脈を二人が診て、たとえば二人とも「浮」と記録するかを調べます。これが再現性です。", icon: "eye" },
          { label: "病気を見分けられるか", description: "別の検査で診断した結果と照らし合わせ、病気のある人とない人をどこまで見分けられるかを調べます。これが診断精度です。", icon: "flask" },
        ],
        caption: "本文の一致率は再現性の結果です。伝統的な臓腑対応や、病気の診断が同じ割合で正しいという意味ではありません。",
      },
    },
  ],
  "science-of-abdominal-diagnosis": [
    {
      afterHeading: "4. 教育用シミュレータ研究が示したこと",
      afterParagraph: 2,
      figure: {
        id: "abdomen-simulator-and-measurement",
        title: "腹診の模型で学ぶ研究と、人で測る研究",
        layout: "compare",
        graphic: "comparison",
        items: [
          { label: "模型で学ぶ", description: "抵抗や振水音などを模型で体験できるようにする教育方法の研究です。", icon: "book" },
          { label: "人で測る", description: "機器を使い、腹部の沈み込みと、本人が痛いと感じ始めた圧を別々に測りました。", icon: "flask" },
        ],
        caption: "腹部の測定値で病気を見分けられるかは、病気の有無を確かめる別の基準と、異なる対象者で検証する必要があります。",
      },
    },
  ],
};
