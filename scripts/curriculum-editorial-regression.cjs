/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA, CURRICULUM_CHAPTERS_META } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const { parseMarkdownBlocks } = load('src/utils/markdownParser');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const byId = new Map(lectures.map(lecture => [lecture.id, lecture]));
const chapters = new Map(CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds.map(id => [id, chapter.chapterNumber])));
let links = 0;
for (const lecture of lectures) {
  const blocks = parseMarkdownBlocks(lecture.contentMarkdown);
  assert(blocks.some(block => block.type === 'h2'), `${lecture.id}: structured lesson`);
  const questions = CURRICULUM_QUIZZES[lecture.id].questions;
  assert.equal(new Set(questions.map(q => q.question.trim())).size, 3, `${lecture.id}: distinct prompts`);
  assert(new Set(questions.map(q => q.options[q.correctIndex])).size > 1, `${lecture.id}: not three identical correct answers`);
  for (const [, label, id] of lecture.contentMarkdown.matchAll(/\[([^\]]+)\]\(\/curriculum\/(lecture-[a-z0-9-]+)(?:[?#][^)]*)?\)/g)) {
    assert(byId.has(id), `${lecture.id}: target ${id}`);
    const number = label.match(/第(\d+)章/);
    if (number) assert.equal(Number(number[1]), chapters.get(id), `${lecture.id}: chapter label ${label}`);
    links++;
  }
}
const body = id => byId.get(`lecture-${id}`).contentMarkdown;

// Guard contradictions between the cautious diagrams/quizzes and legacy body text.
const regressions = {
  'pathomechanism-9': /伝染ハイウェイ|第4ドミノ|完全な現代科学的実体/,
  'pathomechanism-11': /激甚に悪化します|三流です|最先端の人工知能.*完全に同調/,
  'diagnosis-4': /瘢痕組織が経絡を断裂|因果関係を自ら捏造/,
  'diagnosis-5': /妄想日記|生体エネルギーの残存量/,
  'diagnosis-6': /完璧に一致|骨盤内の血行鬱滞.*決定的/,
  'diagnosis-7': /ショック死|平性（中性）のツボや方剤を選択/,
  'diagnosis-9': /現代科学によって証明されています|ネットワークを再起動/,
  'diagnosis-10': /真のサイン.*確定|医療事故・訴訟の最大の原因/,
  'diagnosis-11': /すべての所見が完璧に一致|平調（中立）な施術に留め/,
  'treatment-1': /東洋医学の独壇場/,
  'treatment-3': /副交感神経を優位にし|ブロック・リセット/,
  'treatment-6': /水毒.*だけを排泄し|スマートな制御技術|微小循環不全で詰まっている/,
  'treatment-10': /3〜5回施術しても|共通の敵/,
  'practice-2': /① 客観的事実|混沌とした/,
  'practice-6': /服薬頻度.*ゼロ|二度と同じ苦しみ/,
  'practice-9': /頭の重いヘルメット|温灸により/,
  'practice-11': /治療依存ビジネス|笑顔で杖を取り上げ/,
};
for (const [id, pattern] of Object.entries(regressions)) assert(!pattern.test(body(id)), `${id}: removed editorial/safety regression`);

// Check the shared-case handoff and actual examples, not just a promise of examples.
assert(body('practice-2').includes('本人の報告') && body('practice-2').includes('観察・測定した所見'));
assert(body('practice-5').includes('### 候補の比較表') && body('practice-5').includes('次へ渡す暫定的な要約'));
assert(body('practice-6').includes('NRS 7/10') && body('practice-6').includes('約20分'));
assert(body('practice-7').includes('次講への設定') && body('practice-7').includes('具体的な経穴や手技の処方は固定せず'));
assert(body('practice-8').includes('| S：本人の報告') && body('practice-8').includes('| P：計画'));
assert(body('practice-9').includes('| 7/10 | 3/10 |'));
assert(body('practice-10').includes('直前NRS 7、直後3') && body('practice-10').includes('約30分'));
assert(body('practice-11').includes('8週間後') && body('practice-11').includes('別の分岐'));
for (let number = 1; number < 12; number++) assert(body(`practice-${number}`).includes(`/curriculum/lecture-practice-${number + 1}`) || number === 7, `practice-${number}: explicit next-stage handoff`);
assert(byId.get('lecture-practice-8').references.some(ref => typeof ref !== 'string' && ref.id === 'maryland-acupuncture-soap-documentation'));
const practiceGuide = load('src/data/clinicalLearning').CLINICAL_LEARNING_GUIDES.practice;
assert.equal(practiceGuide.complaintSlug, 'headache');
assert.match(practiceGuide.situation, /情報収集.*再評価/);
assert.match(practiceGuide.check, /不足情報.*次の段階/);
assert(!CURRICULUM_QUIZZES['lecture-qiblood-1'].questions[2].question.includes('順番'));
assert.equal(new Set(CURRICULUM_QUIZZES['lecture-practice-5'].questions.map(q => q.question)).size, 3);
console.log(`Passed: ${lectures.length} lessons, ${links} labelled lesson links, distinct prompts, 17 known editorial regressions, shared-case chronology and worked SOAP.`);
