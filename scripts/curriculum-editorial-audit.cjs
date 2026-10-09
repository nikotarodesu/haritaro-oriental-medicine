/* eslint-disable @typescript-eslint/no-require-imports -- Matches the content audit runners. */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { CURRICULUM_DATA, CURRICULUM_CHAPTERS_META } = load('src/data/curriculumData');
const { CURRICULUM_QUIZZES } = load('src/data/curriculumQuizzes');
const lectures = CURRICULUM_DATA.flatMap(stage => stage.lectures);
const byId = new Map(lectures.map(lecture => [lecture.id, lecture]));
const chapterById = new Map(CURRICULUM_CHAPTERS_META.flatMap(chapter => chapter.lectureIds.map(id => [id, chapter])));
const patterns = {
  rhetoric: /思考OS|インストール|最高峰|完璧|絶対的|魔法|劇的|プロフェッショナルとは|二度と|患者は.*(?:来院|通院)|エゴ|自己満足|高潔|必ず.*(?:改善|治|効)/,
  causalClaim: /自律神経.*(?:改善|回復|調整|乱れ)|(?:交感|副交感)神経.*(?:優位|抑制)|(?:肝|脾|腎).*(?:ホルモン|ミトコンドリア)|好転反応|薬.*ゼロ|ゼロ.*薬|医学的目標/,
  transition: /次章|次の章|前章|前の章|前回|次回のレッスン|次のレッスン|第\d+章|共通(?:模擬)?(?:症例|ケース)/,
};
const entries = lectures.map(lecture => {
  const quiz = CURRICULUM_QUIZZES[lecture.id];
  const paragraphs = lecture.contentMarkdown.split(/\n\s*\n/);
  const issues = [];
  if (!quiz || quiz.questions.length !== 3) issues.push(`Missing three-question quiz: ${lecture.id}`);
  for (const [label, destination] of [...lecture.contentMarkdown.matchAll(/\[([^\]]+)\]\(\/curriculum\/(lecture-[a-z0-9-]+)(?:[?#][^)]*)?\)/g)].map(match => [match[1], match[2]])) {
    if (!byId.has(destination)) issues.push(`Missing lecture: ${destination}`);
    const number = label.match(/第(\d+)章/);
    if (number && Number(number[1]) !== chapterById.get(destination)?.chapterNumber) issues.push(`Wrong chapter label: ${label} -> ${destination}`);
  }
  const headings = lecture.contentMarkdown.split('\n').filter(line => /^#{2,4} /.test(line)).map(line => line.replace(/^#+ /, ''));
  for (const q of quiz?.questions || []) {
    if (!q.relatedSectionTitle || !headings.includes(q.relatedSectionTitle)) issues.push(`Missing quiz heading: ${q.id} -> ${q.relatedSectionTitle}`);
    if (new Set(q.options).size !== q.options.length) issues.push(`Duplicate option: ${q.id}`);
    if (!q.options[q.correctIndex]) issues.push(`Invalid answer: ${q.id}`);
  }
  return {
    id: lecture.id, title: lecture.title, subtitle: lecture.subtitle, summary: lecture.summary,
    goals: lecture.whatYouWillLearn, keyPoints: lecture.keyPoints, headings,
    characters: lecture.contentMarkdown.length, issues,
    excerpts: Object.fromEntries(Object.entries(patterns).map(([key, pattern]) => [key, paragraphs.filter(p => pattern.test(p))])),
    questions: quiz?.questions || [],
  };
});
const args = process.argv.slice(2);
const series = args.find(arg => arg.startsWith('--series='))?.slice(9).split(',');
const ids = args.find(arg => arg.startsWith('--ids='))?.slice(6).split(',');
const selected = entries.filter(entry => (!series || series.includes(byId.get(entry.id).seriesId)) && (!ids || ids.includes(entry.id)));
const mode = args.find(arg => arg.startsWith('--mode='))?.slice(7) || 'summary';
let report;
if (mode === 'full') report = selected.map(entry => ({ ...entry, contentMarkdown: byId.get(entry.id).contentMarkdown }));
else if (mode === 'quiz') report = selected.map(({ id, questions }) => ({ id, questions }));
else if (mode === 'flags') report = selected.map(({ id, goals, keyPoints, issues, excerpts }) => ({ id, goals, keyPoints, issues, excerpts })).filter(entry => entry.issues.length || entry.excerpts.rhetoric.length || entry.excerpts.causalClaim.length);
else report = selected.map(({ id, title, characters, headings, issues }) => ({ id, title, characters, headings, issues }));
const result = { lectureCount: lectures.length, questionCount: entries.reduce((sum, entry) => sum + entry.questions.length, 0), findingsAreReviewCandidates: true, entries: report };
const output = args.find(arg => arg.startsWith('--output='))?.slice(9);
if (output) {
  fs.writeFileSync(path.resolve(output), JSON.stringify(result, null, 2) + '\n');
  console.log(`Editorial inventory: ${lectures.length} lectures, ${result.questionCount} questions, ${entries.reduce((sum, entry) => sum + entry.issues.length, 0)} structural findings.`);
} else console.log(JSON.stringify(result, null, 2));
if (args.includes('--check') && entries.some(entry => entry.issues.length)) process.exitCode = 1;
