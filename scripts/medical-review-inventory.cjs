/* eslint-disable @typescript-eslint/no-require-imports -- Offline data inventory runs as CommonJS. */
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const groups = [
  ['articles', 'src/data/articleData', 'ARTICLES'],
  ['curriculum', 'src/data/curriculumData', 'CURRICULUM_DATA'],
  ['acupoints', 'src/data/tsubo/acupointsMaster', 'ACUPOINTS_MASTER'],
  ['acupoint-anatomy', 'src/data/tsubo/detailedPoints', null],
  ['cases', 'src/data/clinicalCasesData', 'CLINICAL_CASES'],
  ['case-training', 'src/data/progressiveCases', 'PROGRESSIVE_CASES'],
  ['case-reasons', 'src/data/caseReasoningRubrics', 'CASE_REASONING_RUBRICS'],
  ['quizzes', 'src/data/curriculumQuizzes', 'CURRICULUM_QUIZZES'],
  ['glossary', 'src/data/glossaryData', 'GLOSSARY_TERMS'],
  ['clinical-pairs', 'src/types/clinicalMemo', 'CLASSIC_CLINICAL_PAIRS'],
  ['exam-practice', 'src/data/kokushiPastExams', 'KOKUSHI_PAST_EXAMS'],
  ['classics', 'src/data/classicalTextsData', 'SOURCE_CLASSICAL_TEXTS'],
  ['protocols', 'src/data/tcmProtocolsData', null],
  ['symptoms', 'src/data/symptomData', null],
  ['simulator', 'src/data/simulatorData', null],
  ['simulator-reasons', 'src/data/simulatorReasoning', null],
  ['diagnosis', 'src/data/diagnosisData', null],
  ['techniques', 'src/data/acupunctureTechniquesData', null],
  ['archived-cases', 'src/data/cases/archiveCases', 'ALL_ARCHIVE_CASES'],
  ['papers', 'src/data/references/papersData', 'SOURCE_PAPERS'],
  ['paper-interpretations', 'src/data/references/paperInterpretations', 'PAPER_INTERPRETATIONS'],
  ['medical-safety', 'src/data/medicalSafety', null],
];
const statements = [];
const previousReviews = fs.existsSync('docs/medical-review/inventory.json') ? new Map(JSON.parse(fs.readFileSync('docs/medical-review/inventory.json', 'utf8')).map(item => [item.id, item])) : new Map();
const seen = new Set();
const flags = text => [
  /必ず|確実|証明|実証|完全|不可欠|治癒|正常化|保証|劇的/.test(text) && '断定表現',
  /\d+(?:\.\d+)?\s*(?:%|％|mm|Hz|µA|mA|mmHg|cm|寸|点|例|人)/.test(text) && '数値・施術条件',
  /妊娠|妊婦|抗凝固|気胸|脊髄|馬尾|排尿|脳卒中|救急|禁忌|刺入/.test(text) && '安全性',
  /気.*ATP|経絡.*筋膜|脾.*膵|血.*貧血|証.*自律神経/.test(text) && '伝統分類と現代医学の対応',
].filter(Boolean);
function walk(value, trail, group, file, references = []) {
  if (typeof value === 'string') {
    if ((value.length < 12 && !flags(value).length) || /^https?:\/\//.test(value)) return;
    for (const fragment of value.split(/\n|(?<=[。！？])/u).map(text => text.trim()).filter(text => text.length >= 12 || flags(text).length)) {
      const hash = createHash('sha256').update(file + '\n' + trail + '\n' + fragment).digest('hex');
      if (seen.has(hash)) continue; seen.add(hash);
      statements.push({ id: hash.slice(0, 20), group, file: file + '.ts', locator: trail, statement: fragment, flags: flags(fragment).join('・'), declared_references: JSON.stringify(references), inline_references: [...fragment.matchAll(/\[\^([^\]]+)\]|\[ref:([^\]]+)\]/g)].map(match => match[1] || match[2]).join(';'), review_status: 'pending', reviewer: '', qualification: '', source_locator: '', decision: '', reviewed_at: '' });
    }
  } else if (Array.isArray(value)) value.forEach((item, i) => walk(item, trail + '[' + i + ']', group, file, references));
  else if (value && typeof value === 'object') {
    const refs = value.references || value.sources || (value.verifiedQuotation ? [{
      title: value.verifiedQuotation.sourceTitle,
      url: value.verifiedQuotation.sourceUrl,
      section: value.verifiedQuotation.section,
      verificationScope: value.verifiedQuotation.verificationScope,
    }] : references);
    for (const [key, child] of Object.entries(value)) {
      if (['id', 'code', 'slug', 'href', 'url', 'imageUrl', 'publishedAt', 'updatedAt', 'references', 'sources', 'pmid', 'pmcid', 'doi', 'title', 'japaneseTitle', 'authors', 'tags'].includes(key)) continue;
      walk(child, trail + '.' + key, group, file, refs);
    }
  }
}
const counts = {};
for (const [group, file, exported] of groups) {
  const moduleData = load(file); const value = exported ? moduleData[exported] : moduleData;
  const before = statements.length; walk(value, exported || 'exports', group, file); counts[group] = statements.length - before;
}
const headers = Object.keys(statements[0]);
// Preserve signed reviews only when file, locator and exact text still have the same hash.
for (const statement of statements) {
  const previous = previousReviews.get(statement.id);
  if (previous) for (const field of ['review_status', 'reviewer', 'qualification', 'source_locator', 'decision', 'reviewed_at']) statement[field] = previous[field] || statement[field];
  const allowed = ['pending', 'source-checked', 'expert-approved', 'needs-correction', 'unsupported'];
  if (!allowed.includes(statement.review_status)) throw new Error(`Unknown review status: ${statement.id}`);
  if (statement.review_status === 'expert-approved') {
    for (const field of ['reviewer', 'qualification', 'source_locator', 'decision', 'reviewed_at']) {
      if (!statement[field].trim()) throw new Error(`Expert approval missing ${field}: ${statement.id}`);
    }
    if (/codex|chatgpt|openai|自動確認|AI確認/i.test(statement.reviewer)) throw new Error(`Automated review cannot be expert approval: ${statement.id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(statement.reviewed_at)) throw new Error(`Expert approval needs a date: ${statement.id}`);
  }
}
const quote = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
fs.mkdirSync(path.resolve('docs/medical-review'), { recursive: true });
fs.writeFileSync('docs/medical-review/statements.csv', '\ufeff' + [headers, ...statements.map(statement => headers.map(header => statement[header]))].map(row => row.map(quote).join(',')).join('\n') + '\n');
fs.writeFileSync('docs/medical-review/inventory.json', JSON.stringify(statements, null, 2) + '\n');
const summary = { generatedAt: new Date().toISOString().slice(0, 10), statements: statements.length, priorityStatements: statements.filter(statement => statement.flags).length, counts, reviewStatus: 'pending', expertApproved: statements.filter(statement => statement.review_status === 'expert-approved').length, scope: 'Inventory includes withheld source archives and is not verification. Rendered UI, generated diagrams and source passages also need separate review and expert sign-off.' };
fs.writeFileSync('src/data/medicalReviewSummary.json', JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
