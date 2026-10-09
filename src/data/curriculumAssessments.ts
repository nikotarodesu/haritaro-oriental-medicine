import { CURRICULUM_CHAPTERS_META } from './curriculumOutline';
import { CHAPTER_APPLIED_QUESTIONS, CHAPTER_WRITING_EXERCISES } from './curriculumAssessmentQuestions';
import { CURRICULUM_DATA } from './curriculumData';
import { parseMarkdownBlocks } from '../utils/markdownParser';

export interface ChapterAssessmentData {
  id: string;
  title: string;
  lectureId: string;
  questions: { id: string; question: string; options: readonly string[]; correctIndex: number; explanation: string; href: string }[];
  writing: { prompt: string; example: string; criteria: string[] };
}

// This builder runs in the page on the server; the reader receives one chapter.
const integrated: Record<string, [string, [string, string, string], number, string]> = {
  intro: ['古典の用語説明と、ある介入の比較試験を読んだ。効果について述べるとき、何を根拠にする？', ['古典での説明と、研究の対象・比較条件を分ける', '古典での説明を、研究結果の作用機序とみなす', '用語の標準化を、研究対象外の効果へ広げる'], 0, '用語の定義は効果の証明ではありません。研究の対象、介入、比較、結果、限界を確認して、どこまで述べられるかを分けます。'],
  yinyang: ['手足は冷たく、顔はほてるという架空例。陰陽で整理する前にどう記録する？', ['手足の冷えを全身の陰盛という結論にまとめる', '部位・時刻・条件を分け、他の所見と照合する', '顔のほてりを全身の陽盛という結論にまとめる'], 1, '比較する部位と条件を定めます。対立・消長などの概念は説明のモデルであり、一つの所見から全身の病態や神経活動を断定しません。'],
  qiblood: ['疲れと乾燥を訴える架空例で、気・血・津液の候補を比べる。適切な記録は？', ['疲れを気虚と確定し、乾燥は随伴所見にする', '乾燥を血虚と確定し、疲れは随伴所見にする', '両方の経過を記録し、各候補の不足情報を示す'], 2, '機能・滋養・潤いという観点を使って候補を比較します。症状一つで証や原因を確定せず、経過・取得条件・別の説明を確認します。'],
  zangfu: ['「脾は運化を主る」と学んだ後、食後のもたれを読む。最も適切な説明は？', ['伝統的役割と、実際の消化器疾患の評価を分ける', '伝統的な脾の分類を、解剖学的な脾臓病へ結ぶ', '伝統的な運化の説明を、胃の検査結果へ置き換える'], 0, '臓腑の名称と伝統的役割を整理することは、解剖学的な臓器疾患を診断することとは異なります。症状の経過や必要な医学的評価を別に確認します。'],
  lifedynamics: ['飲食・呼吸・営衛・三焦を用いて正常な連携を説明する。適切なまとめ方は？', ['役割を一つの臓に集め、他の働きを従属させる', '生成・分布・調節を分け、既習概念の関係を示す', '伝統的な働きを測定済みの生理指標へ置換する'], 1, '各概念が答える問いを分けて関係を示します。正常な連携の説明と、症状の原因の確定、現代生理学との同一視を区別します。'],
  wuxing: ['木と土の相克を学び、ストレスと胃の症状を読む。次にすることは？', ['相克の図から肝の過剰を確定して方針を書く', '相克の図から脾の不足を確定して方針を書く', '関係の仮説と経過・反対情報・不足情報を書く'], 2, '相生・相克・相乗・相侮は関係を整理するモデルです。図だけから原因や治療方針を確定せず、支持情報と反対情報を照合します。'],
  meridians: ['経絡の走行と経穴コードを覚えた後、経穴の説明を読む。学習の範囲として適切なのは？', ['位置と表記を確認し、実技条件は別に評価する', 'コードと走行を根拠に、刺入条件まで決める', '伝統的な分類を根拠に、実際の効果を予測する'], 0, '経穴の位置・コード・分類の学習と、個別の解剖、安全評価、施術条件、有効性の評価は別です。位置を知るだけで施術技能を認定できません。'],
  pathomechanism: ['冷えと口渇が同時にある架空例。病機の候補を比較するとき、適切な順序は？', ['冷えを優先し、口渇を同じ病機の結果と書く', '条件を記録し、各候補の支持・反対情報を比べる', '口渇を優先し、冷えを同じ病機の結果と書く'], 1, '寒熱・虚実・気血津液などの分類軸を分け、矛盾を残したまま追加確認します。臓腑や病邪の名称で未確認の因果関係を埋めません。'],
  diagnosis: ['舌の色は照明条件が不明、脈は一度だけ測定、本人は疲れを訴える。八綱のまとめ方は？', ['疲れを虚証と確定し、他の情報を支持所見にする', '舌の印象で寒熱を確定し、脈で裏付けたとする', '取得条件と未確認事項を残し、各軸を保留する'], 2, '問診・望聞診・切診を取得条件とともに記録し、表裏・寒熱・虚実・陰陽の各軸を整理します。弱い情報を重ねて確定扱いにしないことが大切です。'],
  treatment: ['同じ証を候補にした二人で、既往・服薬・目標が異なる。計画で先にそろえるものは？', ['目標と安全制約を整理し、候補と評価を比較する', '証名に対応する経穴をそろえ、評価時期を決める', '治法名に対応する刺激量をそろえ、目標を決める'], 0, '証・治則・治法・配穴・方法・評価の階層を分けます。同じ証名でも、本人の目標や個別の制約が異なるため、施術条件を一律に指定しません。'],
  practice: ['架空例で施術直後は楽だったが、翌日悪化し、胸の圧迫感も加わった。次の判断は？', ['直後の改善を根拠に、同じ計画をもう一度続ける', '新症状の緊急性を確認し、医療評価を優先する', '翌日の悪化を根拠に、刺激を減らした案を選ぶ'], 1, '現在の胸部症状などの緊急性を先に確認します。急な胸の圧迫感や息切れがある場合は119へ。直後の変化だけで効果や安全性を判断せず、必要な医療評価を遅らせません。'],
};

export function getChapterAssessment(lectureId: string): ChapterAssessmentData | null {
  const chapter = CURRICULUM_CHAPTERS_META.find(c => c.lectureIds.at(-1) === lectureId);
  if (!chapter) return null;
  const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
  const questions: ChapterAssessmentData['questions'] = CHAPTER_APPLIED_QUESTIONS[chapter.seriesId].map(([lesson, section, question, options, correctIndex, explanation], i) => {
    const sourceId = chapter.lectureIds[lesson - 1];
    const source = lectures.find(lecture => lecture.id === sourceId)!;
    const headingIndex = parseMarkdownBlocks(source.contentMarkdown).findIndex(block => (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') && block.content === section);
    if (headingIndex < 0) throw new Error(`Missing chapter assessment heading: ${sourceId} / ${section}`);
    // The fragment also handles same-lecture navigation, where the reader stays mounted.
    return { id: `chapter-${chapter.seriesId}-q${i + 1}`, question, options, correctIndex, explanation, href: `/curriculum/${sourceId}?focus=${encodeURIComponent(section)}#curriculum-heading-${headingIndex}` };
  });
  const [question, options, correctIndex, explanation] = integrated[chapter.seriesId];
  questions.push({ id: `chapter-${chapter.seriesId}-q9`, question, options, correctIndex, explanation, href: `/curriculum/${lectureId}#lecture-content` });
  return {
    id: `chapter-${chapter.seriesId}`, title: chapter.title, lectureId, questions,
    writing: CHAPTER_WRITING_EXERCISES[chapter.seriesId],
  };
}
