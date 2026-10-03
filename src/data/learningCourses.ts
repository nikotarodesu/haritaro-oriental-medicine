export interface LearningCourseStep {
  lectureId: string;
  title: string;
  focus: string;
}

export interface LearningCourse {
  slug: string;
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
export const LEARNING_COURSES: LearningCourse[] = [
  {
    slug: 'yinyang-foundations',
    title: '陰陽の基礎をつかむ',
    eyebrow: 'はじめての東洋医学',
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
    nextCourseSlug: 'five-elements-relations',
  },
  {
    slug: 'five-elements-relations',
    title: '五行の関係を整理する',
    eyebrow: '関係を図で覚える',
    description: '木・火・土・金・水の分類から、相生・相剋と五臓の配当へ。伝統的な関係を、4つの講義で順に学びます。',
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
    prerequisiteSlug: 'yinyang-foundations',
    nextCourseSlug: 'qi-blood-fluid',
  },
  {
    slug: 'qi-blood-fluid',
    title: '気・血・津液を見分ける',
    eyebrow: '用語の違いを整理',
    description: '気、血、津液の伝統的な役割を、3つの講義で一つずつ確認します。似た用語を混同せずに読むための入門コースです。',
    audience: '気血水の用語を整理し、各講義を読み進める土台を作りたい方',
    goals: [
      '気・血・津液について、伝統的に説明される役割を整理する。',
      'それぞれの講義に出てくる分類名を、区別して読む。',
      '伝統的な分類と、病名や検査値を一対一で対応させない。',
    ],
    steps: [
      { lectureId: 'lecture-qiblood-1', title: '気の用語を整理する', focus: '気血水の全体像と、気に関連する働きや分類を確認する。' },
      { lectureId: 'lecture-qiblood-2', title: '血の用語を整理する', focus: '血についての伝統的な説明と、分類名を読み比べる。' },
      { lectureId: 'lecture-qiblood-3', title: '津液の用語を整理する', focus: '水・津液という用語と、それに関連する伝統的な分類を確認する。' },
    ],
    reading: [{
      href: '/articles/science-of-qi-blood-fluid',
      title: '気・血・津液を図解で振り返る',
      description: '三つの役割を並べ、伝統的な分類と医学的な評価の違いを確認します。',
    }],
    prerequisiteSlug: 'yinyang-foundations',
  },
];

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
