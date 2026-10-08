import { ARTICLE_LEARNING_GUIDES } from "@/data/articleLearningGuides";
import type { Article } from "@/types/oriental";
import type { ReadingInsert, ReadingLink } from "@/types/reading";

// 本文を変更せず、指定した節の段落の後に学習用の小図を表示する。
// 既存図のない節や、観察と解釈の区別を補う節だけを選ぶ。
export const CURRICULUM_READING_INSERTS: Readonly<Record<string, ReadingInsert[]>> = {
  "lecture-yinyang-2": [
    {
      afterHeading: "1. 比較する対象・基準の重要性",
      afterParagraph: 2,
      figure: {
        id: "yinyang-comparison-reference",
        title: "同じ40℃でも、比べる相手で見方が変わる",
        layout: "compare",
        items: [
          { label: "0℃と比べる", description: "40℃は、より温かい側として陽に整理します。", icon: "balance" },
          { label: "100℃と比べる", description: "40℃は、より冷たい側として陰に整理します。", icon: "balance" },
        ],
        caption: "対象は同じで、比較する基準が違う学習例です。身体の状態を測定する図ではありません。",
      },
    },
  ],
  "lecture-yinyang-4": [
    {
      afterHeading: "2. 陰陽転化（いんようてんか）",
      afterParagraph: 2,
      figure: {
        id: "yinyang-amount-quality",
        title: "量の変化を見る消長と、性質の変化を見る転化",
        layout: "compare",
        items: [
          { label: "消長", description: "増える・減るという、量の変化に注目します。", icon: "balance" },
          { label: "転化", description: "性質が反対へ変わる、という変化に注目します。", icon: "compass" },
        ],
        caption: "伝統的な概念を区別する図です。体温や症状の変化を予測する機構図ではありません。",
      },
    },
  ],
  "lecture-yinyang-7": [
    {
      afterHeading: "4. 観察・解釈・保留を分ける練習",
      afterParagraph: 1,
      figure: {
        id: "yinyang-observation-interpretation",
        title: "記録したこと、解釈したこと、まだ分からないこと",
        layout: "triad",
        items: [
          { label: "観察した事実", description: "顔の熱感と足の冷え、という訴えを記録します。", icon: "eye" },
          { label: "伝統理論の整理", description: "上下・寒熱の違いを比較して考えます。", icon: "book" },
          { label: "未確認の事項", description: "原因や病気の有無には、必要な医学的評価を考えます。", icon: "flask" },
        ],
        caption: "架空の学習例を三つに分けた図です。伝統的な分類や医学的な診断を、この図だけで確定しません。",
      },
    },
  ],
  "lecture-yinyang-8": [
    {
      afterHeading: "1. 分類・関係・変化の整理",
      afterParagraph: 1,
      figure: {
        id: "yinyang-three-viewpoints",
        title: "ひとつの学習例を、三つの視点から見る",
        layout: "triad",
        items: [
          { label: "分類", description: "どの部位・性質を、何と比較しているか。", icon: "balance" },
          { label: "関係", description: "対になる性質を、伝統理論でどう説明するか。", icon: "book" },
          { label: "変化", description: "いつ始まり、時間とともにどう変わったか。", icon: "compass" },
        ],
        caption: "情報を整理するための学習図です。神経やホルモンの状態、病気の原因を判定する図ではありません。",
      },
    },
  ],
  "lecture-wuxing-1": [
    {
      afterHeading: "第2節：陰陽・臓腑との学習上の関係",
      afterParagraph: 1,
      figure: {
        id: "wuxing-two-viewpoints",
        title: "陰陽と五行で、見る観点を分ける",
        layout: "compare",
        items: [
          { label: "陰陽：対になる性質", description: "温かい・冷たい、動く・静かなど、比較の基準を確かめる。", icon: "balance" },
          { label: "五行：要素どうしの関係", description: "木・火・土・金・水の分類と、相生・相剋の関係を確かめる。", icon: "leaf" },
        ],
        caption: "本文の伝統的な分類を整理する学習図です。現代医学の検査値や臓器の働きとの対応を示す図ではありません。",
      },
    },
  ],
  "lecture-wuxing-3": [
    {
      afterHeading: "第2節：相剋と関係の向き",
      afterParagraph: 1,
      figure: {
        id: "wuxing-generation-restraint",
        title: "相生と相剋は、関係の意味と順序で比べる",
        layout: "compare",
        items: [
          { label: "相生：生み、支える", description: "木→火→土→金→水→木。生み出す側を母、生み出される側を子と呼ぶ。", icon: "leaf" },
          { label: "相剋：抑え、制約する", description: "木→土→水→火→金→木。相生とは異なる順序で、制約の関係を表す。", icon: "balance" },
        ],
        caption: "矢印は伝統的な五行モデル内の関係です。臓器間の因果関係や治療効果を示すものではありません。",
      },
    },
  ],
  "lecture-qiblood-1": [
  {
    "afterHeading": "第1節：気・血・津液の基本役割",
    "afterParagraph": 1,
    "figure": {
      "id": "qiblood-basic-roles",
      "title": "気・血・津液は、役割を分けて読む",
      "layout": "triad",
      "items": [
        {
          "label": "気",
          "description": "身体の活動や働きを説明する伝統的な概念。",
          "icon": "compass"
        },
        {
          "label": "血",
          "description": "滋養・滋潤という役割を説明する伝統的な概念。",
          "icon": "book"
        },
        {
          "label": "津液",
          "description": "潤いを支える体内の水液を説明する伝統的な概念。",
          "icon": "drop"
        }
      ],
      "caption": "基本用語を整理する学習図です。現代医学の物質・数値・診断との一対一の対応を示しません。"
    }
  }
],
  "lecture-qiblood-2": [
  {
    "afterHeading": "第1節：滋養・滋潤という役割",
    "afterParagraph": 1,
    "figure": {
      "id": "qiblood-blood-basic-functions",
      "title": "滋養と滋潤を言葉で区別する",
      "layout": "compare",
      "items": [
        {
          "label": "滋養",
          "description": "身体を養うという、血の伝統的な役割。",
          "icon": "book"
        },
        {
          "label": "滋潤",
          "description": "身体を潤すという、血の伝統的な役割。",
          "icon": "drop"
        }
      ],
      "caption": "血の基本的な説明を整理する図です。血液検査の項目や病名を示すものではありません。"
    }
  }
],
  "lecture-qiblood-3": [
  {
    "afterHeading": "第1節：津と液の区分",
    "afterParagraph": 1,
    "figure": {
      "id": "qiblood-jin-ye",
      "title": "津と液は、性質に注目して読む",
      "layout": "compare",
      "items": [
        {
          "label": "津（しん）",
          "description": "比較的さらさらした性質の水液として説明する。",
          "icon": "drop"
        },
        {
          "label": "液（えき）",
          "description": "比較的濃厚な性質の水液として説明する。",
          "icon": "drop"
        }
      ],
      "caption": "伝統的な用語を整理する図です。現代医学の体液区分と一対一に対応する分類ではありません。"
    }
  }
],
  "lecture-qiblood-4": [
  {
    "afterHeading": "第1節：気と血の関係",
    "afterParagraph": 1,
    "figure": {
      "id": "qiblood-normal-relations",
      "title": "役割を知ってから、関係を読む",
      "layout": "compare",
      "items": [
        {
          "label": "気から血を見る",
          "description": "生成・運行・保持との関わりを、伝統用語で整理する。",
          "icon": "compass"
        },
        {
          "label": "血から気を見る",
          "description": "活動を支える滋養との関わりを、伝統用語で整理する。",
          "icon": "book"
        }
      ],
      "caption": "伝統モデル内の関係です。血管・神経などの医学的な機序や治療効果を示しません。"
    }
  }
],
  "lecture-qiblood-5": [
  {
    "afterHeading": "第1節：架空例の情報を三つに分ける",
    "afterParagraph": 1,
    "figure": {
      "id": "qiblood-foundation-viewpoints",
      "title": "一つの例を、事実・解釈・不明点に分ける",
      "layout": "triad",
      "items": [
        {
          "label": "事実",
          "description": "教材に書かれた訴えや時間の情報を、そのまま記録する。",
          "icon": "eye"
        },
        {
          "label": "解釈",
          "description": "基本用語との関係を、根拠を添えて説明する。",
          "icon": "book"
        },
        {
          "label": "不明点",
          "description": "追加で確かめたいことと、まだ決められないことを挙げる。",
          "icon": "compass"
        }
      ],
      "caption": "架空例で情報を整理するための図です。証名・病名・治法を確定する段階ではありません。"
    }
  }
],
};

export interface CurriculumReadingQuestion {
  question: string;
  heading: string;
}

// 質問から既存本文の見出しへ案内する。医学的な説明や本文は追加・変更しない。
export const CURRICULUM_READING_QUESTIONS: Readonly<Record<string, readonly CurriculumReadingQuestion[]>> = {
  "lecture-wuxing-1": [
    { question: "五行は何を整理する考え方？", heading: "第1節：木・火・土・金・水という分類" },
    { question: "陰陽・臓腑と五行はどうつながる？", heading: "第2節：陰陽・臓腑との学習上の関係" },
  ],
  "lecture-wuxing-3": [
    { question: "相生とはどんな関係？", heading: "第1節：相生と母子の関係" },
    { question: "相剋とはどんな関係？", heading: "第2節：相剋と関係の向き" },
    { question: "相乗と相侮はどう違う？", heading: "第3節：相乗・相侮は応用の入り口" },
  ],
  "lecture-qiblood-1": [
  {
    "question": "気・血・津液はどんな役割？",
    "heading": "第1節：気・血・津液の基本役割"
  },
  {
    "question": "気の五つの作用を整理したい",
    "heading": "第2節：気の五つの作用"
  }
],
  "lecture-qiblood-2": [
  {
    "question": "血の滋養・滋潤とは？",
    "heading": "第1節：滋養・滋潤という役割"
  },
  {
    "question": "血の生成や病態はどこで学ぶ？",
    "heading": "第3節：生成と病態は後の章で学ぶ"
  }
],
  "lecture-qiblood-3": [
  {
    "question": "津と液はどう違う？",
    "heading": "第1節：津と液の区分"
  },
  {
    "question": "伝統的な潤いと医学的な水分評価を区別したい",
    "heading": "第3節：水分量の評価と分ける"
  }
],
  "lecture-qiblood-4": [
  {
    "question": "気と血の正常な関係を振り返りたい",
    "heading": "第1節：気と血の関係"
  },
  {
    "question": "関係の説明と医学的な機序はどう分ける？",
    "heading": "第3節：関係の説明と医学的な機序を分ける"
  }
],
  "lecture-qiblood-5": [
  {
    "question": "学習例の事実と解釈を分けたい",
    "heading": "第1節：架空例の情報を三つに分ける"
  },
  {
    "question": "次に臓腑を学ぶ理由は？",
    "heading": "第3節：次章「臓腑論」への接続"
  }
],
};

export function getCurriculumReadingInserts(lectureId: string): ReadingInsert[] {
  return CURRICULUM_READING_INSERTS[lectureId] ?? [];
}

export function getCurriculumRelatedArticleIds(lectureId: string): string[] {
  return Object.entries(ARTICLE_LEARNING_GUIDES)
    .filter(([, guide]) => guide.lectureId === lectureId)
    .slice(0, 2)
    .map(([articleId]) => articleId);
}

// サーバー側で抽出した公開メタデータだけを受け取る。
// Client Componentへ記事本文や参考文献データを追加で持ち込まない。
export function createCurriculumReadingLinks(
  lectureId: string,
  articlePreviews: ReadonlyArray<Pick<Article, "id" | "title" | "readTime">>,
): ReadingLink[] {
  return getCurriculumRelatedArticleIds(lectureId).flatMap((articleId) => {
    const article = articlePreviews.find((candidate) => candidate.id === articleId);
    if (!article) return [];
    return [{
      href: `/articles/${article.id}`,
      title: article.title,
      description: ARTICLE_LEARNING_GUIDES[articleId].focus,
      meta: `記事 · 約${article.readTime}`,
    }];
  });
}
