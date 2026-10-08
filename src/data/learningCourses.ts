import { CURRICULUM_CHAPTERS_META } from './curriculumOutline';

export interface LearningCourseStep {
  lectureId: string;
  title: string;
  focus: string;
}

export interface LearningCourse {
  slug: string;
  seriesId: string;
  title: string;
  eyebrow: string;
  description: string;
  audience: string;
  goals: string[];
  steps: LearningCourseStep[];
  reading: { href: string; title: string; description: string }[];
  prerequisiteSlug?: string;
  nextCourseSlug?: string;
}

// Only navigation and learning goals belong here. Lecture bodies and questions
// remain in their existing pages, so course cards do not load the full curriculum.
const COURSE_DEFINITIONS: LearningCourse[] = [
  {
    slug: 'oriental-medicine-introduction', seriesId: 'intro',
    title: '東洋医学の学び方と全体像', eyebrow: 'まずここから',
    description: '東洋医学とは何か、何のために学ぶのか。4つの概論で見通しを持ち、観察したこととまだ分からないことを分ける練習から始めます。',
    audience: '東洋医学を初めて学ぶ方、鍼灸学生',
    goals: ['教材で扱う東洋医学の範囲と、鍼灸・漢方・養生の位置づけを説明する。', '伝統的な説明、学習上の比喩、研究で確かめられたことを分ける。', '短い例から、観察した事実と未確認事項を挙げる。'],
    steps: [
      { lectureId: 'lecture-intro-1', title: '東洋医学とは何か', focus: '言葉の範囲と、この教材で学ぶことを知る。' },
      { lectureId: 'lecture-intro-2', title: '臨床の全体像を知る', focus: '相談から情報収集、解釈、方針、再評価までを見渡し、学ぶ目的を知る。' },
      { lectureId: 'lecture-intro-3', title: '伝統概念・現代医学・根拠を分ける', focus: '資料の役割と根拠の範囲、現代医療との関係を整理する。' },
      { lectureId: 'lecture-intro-4', title: '短い例で観察してみる', focus: '証名や配穴を急がず、事実・解釈・不明点を分けてみる。' },
    ], reading: [],
  },
  {
    slug: 'yinyang-foundations',
    seriesId: 'yinyang',
    title: '陰陽の基礎をつかむ',
    eyebrow: '比較する見方を学ぶ',
    description: '比較の基準、対になる性質の関係、時間による変化。陰陽を読む三つの視点を、4つの講義で整理します。',
    audience: '陰陽の用語から学びたい方、基本を学び直したい方',
    goals: [
      '何を何と比較して、陰・陽と呼んでいるか説明する。',
      '対立・制約・互根と、消長・転化を区別する。',
      '伝統的な説明と、現代医学との比較に用いる比喩を分けて読む。',
    ],
    steps: [
      { lectureId: 'lecture-yinyang-1', title: '陰陽とは何か', focus: 'まず、対になる性質を整理する考え方を知る。' },
      { lectureId: 'lecture-yinyang-2', title: '比較する基準を決める', focus: '同じ対象でも、比較相手によって分類が変わることを確認する。' },
      { lectureId: 'lecture-yinyang-3', title: '関係を見分ける', focus: '対立・制約・互根を、それぞれの説明から区別する。' },
      { lectureId: 'lecture-yinyang-4', title: '変化を読み取る', focus: '量の変化と性質の変化を、消長・転化として整理する。' },
    ],
    reading: [{
      href: '/articles/science-of-yinyang-gogyo',
      title: '陰陽と五行を図解で振り返る',
      description: '陰陽の関係と五行の相生・相剋を、説明図とともに確認します。',
    }],
  },
  {
    slug: 'five-elements-relations',
    seriesId: 'wuxing',
    title: '五行の関係を整理する',
    eyebrow: '関係を図で覚える',
    description: '臓腑の基本を踏まえ、木・火・土・金・水、相生・相剋、五臓の配当を4つの講義で順に学びます。',
    audience: '五行の名前は知っているけれど、関係や配当が混ざってしまう方',
    goals: [
      '木・火・土・金・水という伝統的な分類を整理する。',
      '相生・相剋と、相乗・相侮の関係を区別する。',
      '五臓への配当と、現代解剖学の臓器を区別して読む。',
    ],
    steps: [
      { lectureId: 'lecture-wuxing-1', title: '五行の全体像を知る', focus: '陰陽との関係を振り返り、五つの分類を見渡す。' },
      { lectureId: 'lecture-wuxing-2', title: '五つの性質を並べる', focus: 'それぞれの名前と、伝統的に関連づけられる性質を確認する。' },
      { lectureId: 'lecture-wuxing-3', title: '相生・相剋を区別する', focus: '関係の向きと名称を確認し、相乗・相侮との違いを整理する。' },
      { lectureId: 'lecture-wuxing-4', title: '五臓との配当を確認する', focus: '伝統的な働きの分類として読み、解剖学的な臓器と区別する。' },
    ],
    reading: [{
      href: '/articles/science-of-yinyang-gogyo',
      title: '相生・相剋を図解で振り返る',
      description: '矢印の向きと関係を確認し、理解のための比喩も分けて読みます。',
    }],
  },
  {
    slug: 'qi-blood-fluid',
    seriesId: 'qiblood',
    title: '気・血・津液を見分ける',
    eyebrow: '基本の役割を整理',
    description: '気、血、津液の伝統的な役割を、3つの講義で一つずつ確認します。正常な働きの用語を知り、臓腑の基礎へ進む土台を作ります。',
    audience: '気血水の用語を整理し、各講義を読み進める土台を作りたい方',
    goals: [
      '気・血・津液について、伝統的に説明される役割を整理する。',
      '正常な働きの説明と、実際に観察したことを分けて読む。',
      '伝統的な分類と、病名や検査値を一対一で対応させない。',
    ],
    steps: [
      { lectureId: 'lecture-qiblood-1', title: '気の役割を整理する', focus: '気血津液の全体像と、気の伝統的な働きを確認する。' },
      { lectureId: 'lecture-qiblood-2', title: '血の役割を整理する', focus: '血についての伝統的な説明と、医学的な評価の違いを確認する。' },
      { lectureId: 'lecture-qiblood-3', title: '津液の役割を整理する', focus: '水・津液の用語と、正常な働きについての説明を確認する。' },
    ],
    reading: [{
      href: '/articles/science-of-qi-blood-fluid',
      title: '気・血・津液を図解で振り返る',
      description: '三つの役割を並べ、伝統的な分類と医学的な評価の違いを確認します。',
    }],
  },
  {
    slug: 'zangfu-foundations', seriesId: 'zangfu',
    title: '臓腑の基本を知る', eyebrow: '身体の働きの地図を作る',
    description: '伝統医学の臓腑を、解剖学的な臓器と区別しながら学びます。働きの名前と表裏の関係を、5つの基礎講義で整理します。',
    audience: '五臓・六腑の名前と働きを基礎から確認したい方',
    goals: ['伝統医学の臓腑と、現代解剖学の臓器を区別する。', '五臓・六腑の基本的な役割を伝統的な用語で整理する。', '一つの症状から臓腑の病気を決められないことを説明する。'],
    steps: [
      { lectureId: 'lecture-zangfu-1', title: '臓腑とは何か', focus: '働きを整理する用語として臓腑を読み、臓器との違いを確認する。' },
      { lectureId: 'lecture-zangfu-2', title: '肺と心の働きを知る', focus: '肺・心の基本的な働きを、伝統的な用語で整理する。' },
      { lectureId: 'lecture-zangfu-3', title: '脾胃の働きを知る', focus: '飲食・水分などに関する伝統的な説明を整理する。' },
      { lectureId: 'lecture-zangfu-4', title: '肝と腎の働きを知る', focus: '肝・腎の基本的な働きを、臓器の機能と区別して読む。' },
      { lectureId: 'lecture-zangfu-5', title: '六腑・表裏関係と全体を整理する', focus: '各臓腑の役割と関係をつなぎ、短い例で不明点を挙げる。' },
    ], reading: [],
  },
  {
    slug: 'life-functions-foundations', seriesId: 'lifedynamics',
    title: '生命活動を全体として見る', eyebrow: '用語どうしをつなげる',
    description: '基礎用語から全体の働きへ。生命機能論の4講を選び、役割と関係を見渡します。詳しい各機能は章の全講義で学べます。',
    audience: '臓腑と気血津液を学び、全体の関係を整理したい方',
    goals: ['基礎理論それぞれが説明する側面を整理する。', '臓腑の表裏関係と、複数の働きによる支え合いを説明する。', '生活の観察事実と、伝統理論による説明を分ける。'],
    steps: [
      { lectureId: 'lecture-lifedynamics-1', title: '全体を見る視点を知る', focus: 'これまでの用語と生命機能論の役割を整理する。' },
      { lectureId: 'lecture-lifedynamics-2', title: '精・気・血・津液・神を整理する', focus: '新しい用語を含め、伝統的に説明される関係を確認する。' },
      { lectureId: 'lecture-lifedynamics-6', title: '臓腑の表裏関係を振り返る', focus: '組み合わせと、理論上の関係を説明する。' },
      { lectureId: 'lecture-lifedynamics-11', title: '働きのつながりを見渡す', focus: '個別の用語を、全体の働きの説明へつなげる。' },
    ], reading: [],
  },
  {
    slug: 'meridians-foundations', seriesId: 'meridians',
    title: '経絡・経穴の基本を知る', eyebrow: '位置・関係・安全を分ける',
    description: '経絡と経穴の役割、基本の読み方、位置を確かめる手がかりと安全確認を4講で学びます。',
    audience: '経穴辞典や演習を使う前に、基本的な見方を知りたい方',
    goals: ['経絡と経穴の違いを伝統理論の用語で説明する。', '経穴の名称・コード・所属などの基本情報を読む。', '位置の学習と、個別の施術適応や手技の判断を区別する。'],
    steps: [
      { lectureId: 'lecture-meridians-1', title: '経絡と経穴とは何か', focus: '伝統的な記述と、現代の構造・研究を区別する。' },
      { lectureId: 'lecture-meridians-2', title: '経絡の体系を見渡す', focus: '名前と基本的な関係を整理し、全部を一度に暗記しようとしない。' },
      { lectureId: 'lecture-meridians-3', title: '経穴の情報を読む', focus: '名称・コード・所属・位置の手がかりを一つずつ確認する。' },
      { lectureId: 'lecture-meridians-4', title: '所見と経絡の言葉を分ける', focus: '短い例で関連を考え、単一の所見や辞典情報だけで断定しないことを確認する。' },
    ], reading: [{ href: '/articles/science-of-meridians-network', title: '経絡と研究の違いを読む', description: '伝統的な記述と、神経・筋膜などに関する研究を分けて読みます。' }],
  },
  {
    slug: 'pathomechanism-foundations', seriesId: 'pathomechanism',
    title: '経過から病機の仮説を考える', eyebrow: '複数の説明を比べる',
    description: '病機の意味、寒熱・虚実、仮説比較を4講で見渡します。一つの症状から結論を急がず、支持情報と不一致を探します。',
    audience: '基礎理論を学び、架空例の経過を整理したい方',
    goals: ['病因・病機・症状・証の違いを説明する。', '同じ所見に対して複数の仮説を挙げる。', '仮説を確認するための質問と未確認事項を示す。'],
    steps: [
      { lectureId: 'lecture-pathomechanism-1', title: '病機という言葉を知る', focus: '原因、過程、現れ、状態の整理を分ける。' },
      { lectureId: 'lecture-pathomechanism-6', title: '寒熱と虚実を分ける', focus: '二つの軸を混同せず、根拠が不足する部分は保留する。' },
      { lectureId: 'lecture-pathomechanism-11', title: '仮説を比較する', focus: '支持情報だけでなく、不一致や別の説明を検討する。' },
      { lectureId: 'lecture-pathomechanism-12', title: '追加確認へつなぐ', focus: '仮説を、次に確かめる質問へ変える。' },
    ], reading: [],
  },
  {
    slug: 'diagnosis-foundations', seriesId: 'diagnosis',
    title: '安全確認から情報整理へ', eyebrow: '判断の根拠を集める',
    description: '診断・弁証の全体像、安全確認、主訴の時間軸、観察、八綱の分類軸を5講で学びます。弁証の各論は章の全講義で続けて学べます。',
    audience: '証名の暗記から、情報を集める順序へ進みたい方',
    goals: ['安全確認を先に行う理由を説明する。', '主訴と経過を整理し、観察事実と解釈を分ける。', '分からないことを記録し、追加確認の優先順位を考える。'],
    steps: [
      { lectureId: 'lecture-diagnosis-1', title: '診断・弁証の流れを知る', focus: '症状、病名、証、治療方針を区別する。' },
      { lectureId: 'lecture-diagnosis-2', title: '安全と対応範囲を確かめる', focus: '弁証を進める前に確認する情報を整理する。' },
      { lectureId: 'lecture-diagnosis-3', title: '主訴と時間軸を整理する', focus: '本人の困りごとと、いつ・どう変わったかを記録する。' },
      { lectureId: 'lecture-diagnosis-5', title: '観察した事実を記録する', focus: '見えたことと、そこから考えたことを分ける。' },
      { lectureId: 'lecture-diagnosis-7', title: '八綱の分類軸を分ける', focus: '表裏・寒熱・虚実・陰陽を分け、根拠と不足情報を示す。' },
    ], reading: [],
  },
  {
    slug: 'treatment-foundations', seriesId: 'treatment',
    title: '治療方針と評価の考え方を知る', eyebrow: '選ぶ理由を説明する',
    description: '目標、治則・治法、経穴選択、再評価の位置づけを4講で学びます。個別手技の習得とは分けて、教材の方針を読む土台を作ります。',
    audience: '診断・弁証の学習から、治療方針の理由を考える段階へ進む方',
    goals: ['証と治療方針を区別し、改善したいことを具体化する。', '教材の治法・経穴を選ぶ理由と前提条件を説明する。', '変化を何で確かめ、いつ方針を見直すかを示す。'],
    steps: [
      { lectureId: 'lecture-treatment-1', title: '目的と対応範囲を知る', focus: '何を改善するための方針かを、本人の希望とともに整理する。' },
      { lectureId: 'lecture-treatment-2', title: '証から方針へつなぐ', focus: '状態の整理と、介入の選択を分ける。' },
      { lectureId: 'lecture-treatment-8', title: '経穴を選ぶ理由を考える', focus: '教材の複数の選択肢を、目的と根拠で比較する。' },
      { lectureId: 'lecture-treatment-11', title: '評価と見直しを考える', focus: '継続・変更・終了を検討するための指標を整理する。' },
    ], reading: [],
  },
  {
    slug: 'clinical-process-foundations', seriesId: 'practice',
    title: '症例の経過を振り返る', eyebrow: '判断を更新する',
    description: '臨床過程の全体像、症例情報、反応の評価、次回計画の修正を4講で学びます。総合課題は章の全講義を学んでから取り組めます。',
    audience: '基本的な判断をつなげ、症例の経過を振り返りたい方',
    goals: ['症例の事実、解釈、判断理由を分けて記録する。', '新しい情報や経過に応じて仮説を見直す。', '一時的な変化と、生活への持続的な変化を区別する。'],
    steps: [
      { lectureId: 'lecture-practice-1', title: '全体の流れを振り返る', focus: '各段階の判断と、見直しの位置を確認する。' },
      { lectureId: 'lecture-practice-2', title: '症例情報を読み解く', focus: '重要な事実を要約し、解釈と分ける。' },
      { lectureId: 'lecture-practice-9', title: '反応を評価する', focus: '同じ指標で変化と有害な反応を確認する。' },
      { lectureId: 'lecture-practice-10', title: '次の計画を修正する', focus: '新情報を受けた変更や保留の理由を示す。' },
    ], reading: [],
  },
];

const orderedCourses = CURRICULUM_CHAPTERS_META.map(chapter => {
  const course = COURSE_DEFINITIONS.find(item => item.seriesId === chapter.seriesId);
  if (!course) throw new Error(`Missing learning course: ${chapter.seriesId}`);
  return course;
});
export const LEARNING_COURSES: LearningCourse[] = orderedCourses.map((course, index) => ({
  ...course,
  prerequisiteSlug: orderedCourses[index - 1]?.slug,
  nextCourseSlug: orderedCourses[index + 1]?.slug,
}));

export function getLearningCourseForSeries(seriesId: string): LearningCourse | undefined {
  return LEARNING_COURSES.find((course) => course.seriesId === seriesId);
}

export function getLearningCourse(slug: string): LearningCourse | undefined {
  return LEARNING_COURSES.find((course) => course.slug === slug);
}

export function getLearningCoursesForLecture(lectureId: string): LearningCourse[] {
  return LEARNING_COURSES.filter((course) => course.steps.some((step) => step.lectureId === lectureId));
}

export function getCourseProgress(course: LearningCourse, completed: Record<string, boolean>, lastVisitedLectureId?: string | null) {
  const completedCount = course.steps.filter((step) => completed[step.lectureId]).length;
  const lastStep = course.steps.find((step) => step.lectureId === lastVisitedLectureId && !completed[step.lectureId]);
  const nextStep = lastStep || course.steps.find((step) => !completed[step.lectureId]) || null;
  return {
    completedCount,
    percentage: Math.round((completedCount / course.steps.length) * 100),
    nextStep,
    finished: completedCount === course.steps.length,
  };
}
