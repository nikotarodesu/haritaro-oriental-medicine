// Existing explanations, curated by the question a reader wants to explore.
// These are navigation descriptions, not new clinical claims.
export const LEARNING_DISCOVERY = [
  {
    id: "yinyang-comparison", question: "陰と陽は、何を基準に分ける？",
    description: "同じ対象でも、比較する相手で見方が変わります。身近な例から判断の基準を学びます。",
    lectureId: "lecture-yinyang-2", heading: "1. 比較する対象・基準の重要性", label: "陰陽の比較基準を学ぶ",
  },
  {
    id: "five-elements-relations", question: "相生と相剋は、どう違う？",
    description: "生み支える関係と、抑え制約する関係。図解で向きと順序を比較します。",
    articleId: "science-of-yinyang-gogyo", anchor: "reading-figure-yinyang-generation-restraint", label: "相生・相剋の図解を見る",
  },
  {
    id: "qi-blood-fluid", question: "気・血・津液は、どう整理して覚える？",
    description: "伝統的な機能と相互関係を整理し、所見を組み合わせる考え方を学びます。",
    articleId: "science-of-qi-blood-fluid", heading: "1. 気・血・津液は、伝統的な見立ての言葉", label: "三つの用語を整理する解説へ",
  },
  {
    id: "meridians-research", question: "経絡と神経・筋膜の研究は、どう読み分ける？",
    description: "伝統的な経絡の記述と、神経・筋膜を調べる研究を分けて読みます。",
    articleId: "science-of-meridians-network", heading: "2. 神経・筋膜との比較は、問いを作るために使う", label: "経絡と神経・筋膜の比較へ",
  },
  {
    id: "mechanism-outcome", question: "作用機序の研究と、治療効果の研究はどう違う？",
    description: "組織や神経の反応を調べる研究と、患者の転帰を調べる試験を区別します。",
    articleId: "science-of-acupuncture-neuroscience", anchor: "reading-figure-acupuncture-reaction-benefit", label: "反応と臨床効果の比較図を見る",
  },
  {
    id: "tongue-observation", question: "舌診では、観察と解釈をどう分ける？",
    description: "舌色・舌苔・舌形の観察と、伝統的な分類による解釈を分けて整理します。",
    articleId: "science-of-tongue-diagnosis", heading: "1. まず、観察と解釈を分ける", label: "観察と解釈を分ける解説へ",
  },
] as const;
