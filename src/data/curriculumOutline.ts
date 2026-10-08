/** 本文を含まない章構成。講数・順序・進捗キーを全画面で共有する。 */
export interface CurriculumChapterMeta {
  id: string;
  progressKey: string;
  chapterNumber: number;
  seriesId: string;
  title: string;
  shortTitle: string;
  lead: string;
  description: string;
  stageId: string;
  lectureIds: string[];
  plannedLessons: number;
}

interface ChapterDefinition {
  id: string;
  seriesId: string;
  shortTitle: string;
  stageId: string;
  lessonCount: number;
  lead: string;
  description: string;
}

const CHAPTER_DEFINITIONS: ChapterDefinition[] = [
  { id: "intro", seriesId: "intro", shortTitle: "東洋医学概論", stageId: "stage-0", lessonCount: 4, lead: "学び方と用語の読み方を知る", description: "伝統理論・現代医学・研究の根拠を区別し、学習の範囲と安全な読み方を確認する。" },
  { id: "yin-yang", seriesId: "yinyang", shortTitle: "陰陽論", stageId: "stage-1", lessonCount: 8, lead: "対になる性質と変化を比べる", description: "分類の基準、対立・互根・消長・転化を学び、観察した事実と伝統的な解釈を分ける。" },
  { id: "qi-blood-water", seriesId: "qiblood", shortTitle: "気血津液論", stageId: "stage-1", lessonCount: 5, lead: "働き・滋養・潤いの基本を学ぶ", description: "気・血・津液の役割と正常な関係を整理する。病態や治療を先取りせず、基本用語の理解を確かめる。" },
  { id: "zangfu", seriesId: "zangfu", shortTitle: "臓腑論", stageId: "stage-1", lessonCount: 5, lead: "臓腑の名称と伝統的な役割を知る", description: "五臓・六腑・奇恒の腑の概観と相互の関係を学び、現代解剖学の臓器との違いを確認する。" },
  { id: "vital-function", seriesId: "lifedynamics", shortTitle: "生命機能論", stageId: "stage-1", lessonCount: 12, lead: "正常な働きの連携を整理する", description: "精気血津液神、飲食と呼吸、営衛、三焦、表裏、昇降出入などを伝統的な説明モデルとして学ぶ。" },
  { id: "five-elements", seriesId: "wuxing", shortTitle: "五行論", stageId: "stage-1", lessonCount: 8, lead: "既習の臓腑を五つの関係で整理する", description: "木火土金水の分類と相生・相剋を学び、臓腑の関係を説明する。病機・弁証・治法への応用は後の章で扱う。" },
  { id: "meridians", seriesId: "meridians", shortTitle: "経絡・経穴の基礎", stageId: "stage-1", lessonCount: 4, lead: "経絡の構成と経穴の表記を知る", description: "経絡と経穴の基本的な構成、名称・番号の読み方、安全な学習範囲を確認する。" },
  { id: "pathology", seriesId: "pathomechanism", shortTitle: "病機論", stageId: "stage-2", lessonCount: 12, lead: "正常との違いを仮説として整理する", description: "外感・内傷、気血津液や臓腑の失調を説明する伝統用語を学び、病名や医学的な機序の確定と区別する。" },
  { id: "diagnosis", seriesId: "diagnosis", shortTitle: "臨床診断論", stageId: "stage-2", lessonCount: 12, lead: "所見・解釈・不足情報を分ける", description: "四診・八綱・臓腑弁証の学習例を通じて、分類の根拠と保留する判断、医療評価の必要性を整理する。" },
  { id: "treatment", seriesId: "treatment", shortTitle: "治則・治法", stageId: "stage-2", lessonCount: 12, lead: "治法の考え方と評価の条件を学ぶ", description: "治法・配穴・標本緩急の考え方を学習する。実際の適応や効果は、資格・安全性・個別の研究根拠と合わせて考える。" },
  { id: "practice", seriesId: "practice", shortTitle: "統合症例・再評価", stageId: "stage-3", lessonCount: 12, lead: "架空例で判断の根拠と見直しを練習する", description: "模擬症例で安全確認、情報整理、仮説、計画、振り返りを統合する。Web学習の修了と実際の診療能力の認定を区別する。" },
];

export const CURRICULUM_CHAPTERS_META: CurriculumChapterMeta[] = CHAPTER_DEFINITIONS.map((chapter, index) => {
  const lectureIds = Array.from({ length: chapter.lessonCount }, (_, lessonIndex) => `lecture-${chapter.seriesId}-${lessonIndex + 1}`);
  return {
    id: chapter.id,
    progressKey: chapter.id,
    chapterNumber: index + 1,
    seriesId: chapter.seriesId,
    title: `第${index + 1}章 ${chapter.shortTitle}`,
    shortTitle: chapter.shortTitle,
    lead: chapter.lead,
    description: chapter.description,
    stageId: chapter.stageId,
    lectureIds,
    plannedLessons: lectureIds.length,
  };
});

export const CURRICULUM_TOTAL_LESSONS = CURRICULUM_CHAPTERS_META.reduce((total, chapter) => total + chapter.lectureIds.length, 0);
export const CURRICULUM_TOTAL_CHAPTERS = CURRICULUM_CHAPTERS_META.length;
export const FIRST_CURRICULUM_LECTURE_ID = CURRICULUM_CHAPTERS_META[0].lectureIds[0];
