/* eslint-disable @typescript-eslint/no-require-imports -- Public metadata boundary regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const { generateSearchCatalog } = require('./generate-search-catalog.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader();
const { SEARCH_CATALOG } = load('src/data/searchCatalog');
const { CURRICULUM_DATA } = load('src/data/curriculumData');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { GLOSSARY_TERMS } = load('src/data/glossaryData');
const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
const { ARTICLES } = load('src/data/articleData');
const { KOKUSHI_PAST_EXAMS } = load('src/data/kokushiPastExams');
const { PUBLIC_ARCHIVE_CASES, ALL_ARCHIVE_CASES } = load('src/data/cases/archiveCases');
const generated = fs.readFileSync(path.join(root, 'src/data/searchCatalog.ts'), 'utf8').replace(/\r\n/g, '\n');
assert.equal(generated, generateSearchCatalog(), 'Content edits must regenerate the browser metadata');
assert.equal(new Set(SEARCH_CATALOG.map(item => item.id)).size, SEARCH_CATALOG.length, 'Search IDs are unique');
const byId = new Map(SEARCH_CATALOG.map(item => [item.id, item]));
for (const point of ACUPOINTS_MASTER) assert.equal(byId.get(`tsubo-${point.code.toLowerCase()}`)?.url, `/tsubo/${point.code.toLowerCase()}`);
for (const lecture of CURRICULUM_DATA.flatMap(stage => stage.lectures)) {
  assert.equal(byId.has(`lecture-${lecture.id}`), lecture.isPublished, 'Only published lectures are search destinations');
  if (lecture.isPublished) assert.equal(byId.get(`lecture-${lecture.id}`).url, `/curriculum/${lecture.id}`);
}
for (const term of Object.values(GLOSSARY_TERMS)) {
  const item = byId.get(`glossary-${term.term}`);
  assert.equal(item?.url, `/glossary#term-${encodeURIComponent(term.term)}`);
  assert(item.exactTerms.includes(term.term) && item.exactTerms.includes(term.reading), 'Term names and readings are direct lookups');
}
for (const item of CLINICAL_CASES) assert.equal(byId.get(`case-${item.id}`)?.url, `/cases/${item.id}`);
for (const item of ARTICLES) assert.equal(byId.get(item.id)?.url, `/articles/${item.id}`);
assert.equal(KOKUSHI_PAST_EXAMS.length, 10, 'The legacy bank remains available to validate saved learning records');
for (const item of KOKUSHI_PAST_EXAMS) assert(!byId.has(`kokushi-${item.id}`), `${item.id}: retired exam questions must stay out of public search`);
assert.equal(byId.get('tool-kokushi')?.url, '/learn/review', 'The stable tool ID now opens lecture review');
assert(SEARCH_CATALOG.every(item => item.type !== 'kokushi' && !item.url.startsWith('/kokushi')), 'No public result links to retired exam practice');
const publicArchiveIds = new Set(PUBLIC_ARCHIVE_CASES.map(item => item.id));
for (const item of ALL_ARCHIVE_CASES) assert.equal(byId.has(`archive-case-${item.id}`), publicArchiveIds.has(item.id), 'Unreviewed archive cases remain outside public search');
const types = ['article', 'acupoint', 'lecture', 'case', 'tool', 'glossary', 'classic', 'paper', 'symptom'];
for (const type of types) assert(SEARCH_CATALOG.some(item => item.type === type), `${type}: search category retained`);
assert.deepEqual([...new Set(SEARCH_CATALOG.map(item => item.type))].sort(), [...types].sort(), 'Exactly nine public search types remain');

const allowedKeys = new Set(['id', 'type', 'title', 'subtitle', 'badge', 'url', 'tags', 'exactCode', 'exactTerms', 'searchRole', 'reviewStatus']);
const textValues = [];
for (const item of SEARCH_CATALOG) {
  for (const [key, value] of Object.entries(item)) {
    assert(allowedKeys.has(key), `Do not send source bodies, patient records or answers: ${item.id}.${key}`);
    if (typeof value === 'string') textValues.push(value);
    else if (Array.isArray(value)) for (const text of value) { assert.equal(typeof text, 'string'); textValues.push(text); }
  }
}
const searchableText = textValues.join('\n');
for (const lecture of CURRICULUM_DATA.flatMap(stage => stage.lectures)) {
  assert(!searchableText.includes(lecture.contentMarkdown), `${lecture.id}: lecture body must stay out of the browser search index`);
}
for (const question of KOKUSHI_PAST_EXAMS) {
  if (question.explanation.length > 40) assert(!searchableText.includes(question.explanation), `${question.id}: answer explanations are not search metadata`);
}
const modal = fs.readFileSync(path.join(root, 'src/components/search/GlobalSearchModal.tsx'), 'utf8');
const importedData = [...modal.matchAll(/from ["'](@\/data\/[^"']+)["']/g)].map(match => match[1]);
assert.deepEqual(importedData, ['@/data/searchCatalog'], 'The search client must import only generated public data');
const builder = fs.readFileSync(path.join(root, 'src/data/searchCatalogSource.ts'), 'utf8');
assert(!/correctDiagnosis|\.explanation|\.options|contentMarkdown|treatmentAndCourse/.test(builder), 'Do not copy answers or treatment narratives into hidden search tags');

if (process.argv.includes('--build-output')) {
  const dir = path.join(root, '.next/static/chunks');
  const scripts = fs.readdirSync(dir, { recursive: true }).filter(file => file.endsWith('.js')).map(file => ({ file, text: fs.readFileSync(path.join(dir, file), 'utf8') }));
  const searchChunks = scripts.filter(file => file.text.includes('検索語を消して入力し直す'));
  assert(searchChunks.length, 'The built search UI chunk exists');
  for (const chunk of searchChunks) {
    assert(!chunk.text.includes('contentMarkdown'), 'Built search UI must not include lecture body objects');
    assert(!chunk.text.includes('correctDiagnosis'), 'Built search UI must not include case answer objects');
    console.log(`Search UI bundle: ${chunk.file} (${Buffer.byteLength(chunk.text)} bytes, uncompressed).`);
  }
}
console.log(`Search catalog passed: ${SEARCH_CATALOG.length} public destinations, all 9 types, retired exam questions excluded with legacy data retained, published lectures, all point codes, exact term readings and no full bodies or answer records.`);
