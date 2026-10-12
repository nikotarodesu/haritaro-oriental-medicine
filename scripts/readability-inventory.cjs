/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const lectures = load('src/data/curriculumData').CURRICULUM_DATA.flatMap(s => s.lectures);
const quizzes = load('src/data/curriculumQuizzes').CURRICULUM_QUIZZES;
const glossary = load('src/data/glossaryData');
const article = load('src/data/articleData');
const records = lectures.map(l => ({ url: `/curriculum/${l.id}`, id: l.id, title: l.title,
  bodySource: ['intro','zangfu','meridians'].includes(l.seriesId) ? 'src/data/curriculumFoundations.ts' : 'src/data/curriculumData.ts',
  questions: quizzes[l.id]?.questions.length ?? 0,
  status: '共通UI対応・構造確認済み。本文の個別校閲状況は報告書参照',
  hasAnswer: Boolean(l.summary), goals: l.whatYouWillLearn.goals?.length ?? 0,
  comparisonTables: (l.contentMarkdown.match(/^\|.*\|$/gm) ?? []).length,
  review: [l.title,l.subtitle,l.summary,l.whatYouWillLearn.topics,l.whatYouWillLearn.canDo,l.contentMarkdown].join('\n')
    .split(/\n|(?<=。)/).filter(s => /構造的に|位置づけ|体系として理解|評価の目的を明確|分けて考え|思考OS|インストール/.test(s)),
}));
const routes = [];
function walk(dir) { for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
  const p = path.join(dir,e.name); if(e.isDirectory()) walk(p); else if(e.name === 'page.tsx') routes.push(p.replaceAll('\\','/'));
} }
walk('src/app');
const editedLectures = new Set(['lecture-intro-3','lecture-yinyang-2','lecture-lifedynamics-1','lecture-lifedynamics-12','lecture-wuxing-3','lecture-diagnosis-2','lecture-diagnosis-8','lecture-treatment-2','lecture-treatment-4','lecture-treatment-5']);
for (const record of records) record.editorialStatus = editedLectures.has(record.id) ? '要約・学習内容または本文の対象段落を個別改訂' : '冒頭要約と確認語を点検。本文全文の専門校閲は未完了';
const output = { generatedAt:'2026-10-12', lectureCount:lectures.length, questionCount:Object.values(quizzes).reduce((n,q)=>n+q.questions.length,0),
  glossary:Object.entries(glossary.GLOSSARY_TERMS).map(([id,g])=>({id,title:g.term,source:'src/data/glossaryData.ts',url:'/glossary',status:'32項目の定義・要約を点検。明快な既存文を維持。個別の医学的照合は今回行っていない'})),
  articles:article.ARTICLES.map(a=>({id:a.id,title:a.title,url:`/articles/${a.id}`,source:'src/data/articles/',status:['science-of-meridians-network','science-of-tongue-diagnosis'].includes(a.id)?'学習要約または関連リンク説明を改訂。本文全文の専門校閲は未完了':'タイトル・学習要約・導線を点検。本文全文の専門校閲は未完了'})),
  additionalQuizSources:['src/data/curriculumFoundationQuizzes.ts','src/data/curriculumAssessments.ts','src/data/curriculumAssessmentQuestions.ts','src/data/learningQuestionBank.ts','src/data/kokushiPastExams.ts','src/data/tsubo/quizData.ts','src/components/kikei/KikeiQuizSection.tsx'],
  dataExports:{ glossary:Object.keys(glossary), articles:Object.keys(article) },
  routes:routes.map(p=>({source:p, status:'対象一覧に登録。個別表示・文章の確認状況は報告書参照'})), lectures: records };
fs.mkdirSync('docs/readability',{recursive:true});
fs.writeFileSync('docs/readability/inventory.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({lectures:lectures.length, questions:output.questionCount,routes:routes.length,glossary:Object.keys(glossary),articles:Object.keys(article)}));
for (const r of records) if(r.review.length) console.log(r.id+'\n'+r.review.map(x=>x.slice(0,650)).join('\n'));
