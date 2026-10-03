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
      afterHeading: "3. 陰陽論と五行論の相補関係",
      afterParagraph: 2,
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
      afterHeading: "第2節：相剋関係（暴走を抑えるブレーキ機構）",
      afterParagraph: 2,
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
      afterHeading: "第3節：気の4大病態（気虚・気滞・気逆・気陥）の鑑別",
      afterParagraph: 2,
      figure: {
        id: "qiblood-amount-movement",
        title: "気の分類を、量と動きに分けて整理する",
        layout: "compare",
        items: [
          { label: "量に注目する", description: "気虚は、気の不足として説明される分類。", icon: "balance" },
          { label: "動きに注目する", description: "気滞・気逆・気陥は、滞りや動きの向きに注目する分類。", icon: "compass" },
        ],
        caption: "本文の用語を区別するための学習図です。症状だけで原因や病名を決めるための判定表ではありません。",
      },
    },
  ],
  "lecture-qiblood-3": [
    {
      afterHeading: "導入：水とは「全身を潤す体液ネットワーク」である",
      afterParagraph: 3,
      figure: {
        id: "qiblood-jin-ye",
        title: "津と液は、性質に注目して読む",
        layout: "compare",
        items: [
          { label: "津（しん）", description: "本文では、比較的さらさらした性質の水分として説明する。", icon: "drop" },
          { label: "液（えき）", description: "本文では、比較的濃厚な性質の水分として説明する。", icon: "drop" },
        ],
        caption: "伝統的な用語の違いを整理する図です。現代医学の体液区分と一対一に対応する分類ではありません。",
      },
    },
  ],
  "lecture-qiblood-4": [
    {
      afterHeading: "第2節：「状態（証）」と「体質」を峻別せよ",
      afterParagraph: 2,
      figure: {
        id: "qiblood-state-tendency",
        title: "今の状態と、長期的な傾向を分ける",
        layout: "compare",
        items: [
          { label: "今の状態（証）", description: "現在の訴えや所見を、時間の経過とともに整理する。", icon: "eye" },
          { label: "長期的な傾向（体質）", description: "以前から繰り返している傾向を、現在の変化と分けて整理する。", icon: "book" },
        ],
        caption: "本文の二つの観点を区別する図です。体質や診断をこの図だけで確定するものではありません。",
      },
    },
  ],
  "lecture-qiblood-5": [
    {
      afterHeading: "第3節：第4章「人体機能動態論」への大いなる飛躍",
      afterParagraph: 1,
      figure: {
        id: "qiblood-foundation-viewpoints",
        title: "三つの基礎理論を、別の観点としてつなぐ",
        layout: "triad",
        items: [
          { label: "陰陽", description: "対になる性質と、比較する基準を整理する。", icon: "balance" },
          { label: "五行", description: "五つの分類と、要素どうしの関係を整理する。", icon: "leaf" },
          { label: "気血水", description: "気・血・水の役割と、相互関係を整理する。", icon: "drop" },
        ],
        caption: "学習した章を振り返るための整理図です。三つの理論を生体の実測値や医学的な機構と同一視しません。",
      },
    },
  ],
};

export interface CurriculumReadingQuestion {
  question: string;
  heading: string;
}

// 質問から既存本文の見出しへ案内する。医学的な説明や本文は追加・変更しない。
export const CURRICULUM_READING_QUESTIONS: Readonly<Record<string, readonly CurriculumReadingQuestion[]>> = {
  "lecture-wuxing-1": [
    { question: "五行は何を整理する考え方？", heading: "2. 「五行」という言葉の意味" },
    { question: "陰陽と五行はどう使い分ける？", heading: "3. 陰陽論と五行論の相補関係" },
  ],
  "lecture-wuxing-3": [
    { question: "相生とはどんな関係？", heading: "第1節：相生関係（生み育てる母子の循環）" },
    { question: "相剋とはどんな関係？", heading: "第2節：相剋関係（暴走を抑えるブレーキ機構）" },
    { question: "相乗と相侮はどう違う？", heading: "第4節：平衡の破綻 ― 相乗（そうじょう）と相侮（そうぶ）" },
  ],
  "lecture-qiblood-1": [
    { question: "気の働きはどう分類する？", heading: "第1節：気の5大作用（生体を駆動するエンジンの働き）" },
    { question: "気虚・気滞・気逆・気陥はどう違う？", heading: "第3節：気の4大病態（気虚・気滞・気逆・気陥）の鑑別" },
  ],
  "lecture-qiblood-3": [
    { question: "津と液はどう違う？", heading: "導入：水とは「全身を潤す体液ネットワーク」である" },
    { question: "津液の生成・循環・排泄をどう整理する？", heading: "第1節：津液の代謝回路 ― 肺・脾・腎・三焦の連携" },
  ],
  "lecture-qiblood-4": [
    { question: "気・血・水の関係を振り返りたい", heading: "第1節：気・血・水の3大相互関係" },
    { question: "現在の状態と体質はどう分ける？", heading: "第2節：「状態（証）」と「体質」を峻別せよ" },
  ],
  "lecture-qiblood-5": [
    { question: "気血水の組み合わせを復習したい", heading: "第1節：臨床で頻出する4大複合病態" },
    { question: "陰陽・五行・気血水をつなげて振り返りたい", heading: "第3節：第4章「人体機能動態論」への大いなる飛躍" },
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
