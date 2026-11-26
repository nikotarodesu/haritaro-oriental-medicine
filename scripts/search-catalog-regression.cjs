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
const { getPublicLectureSeries } = load('src/data/publicLectures/index');
const { readingUnits } = load('src/data/publicLectures/readingUnits');
const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
const { EXTRA_POINTS } = load('src/data/tsubo/extraPoints');
const { GLOSSARY_TERMS } = load('src/data/glossaryData');
const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
const { ARTICLES } = load('src/data/articleData');
const { KOKUSHI_PAST_EXAMS } = load('src/data/kokushiPastExams');
const { PUBLIC_ARCHIVE_CASES, ALL_ARCHIVE_CASES } = load('src/data/cases/archiveCases');
const { NEARBY_COMPARISON_LINKS } = load('src/data/tsubo/atlas/nearbyComparisonLinks');
const generated = fs.readFileSync(path.join(root, 'src/data/searchCatalog.ts'), 'utf8').replace(/\r\n/g, '\n');
assert.equal(generated, generateSearchCatalog(), 'Content edits must regenerate the browser metadata');
assert.equal(new Set(SEARCH_CATALOG.map(item => item.id)).size, SEARCH_CATALOG.length, 'Search IDs are unique');
const byId = new Map(SEARCH_CATALOG.map(item => [item.id, item]));
const { prepareSearchItem } = load('src/utils/search');
const { preparePurposeSearchQuery, rankPurposeSearchResults } = load('src/utils/searchPurpose');
const ranked = query => rankPurposeSearchResults(SEARCH_CATALOG.map(prepareSearchItem), preparePurposeSearchQuery(query));
assert.equal(byId.get('tool-tsubo-pairs')?.url, '/tsubo/pairs', 'The pair directory is searchable');
const fourGates = ranked('四関穴');
assert.equal(fourGates[0].item.url, '/tsubo/pairs');
assert(fourGates.some(result => result.item.url === '/tsubo/li4'));
assert(fourGates.some(result => result.item.url === '/tsubo/lr3'));
assert.match(fourGates.find(result => result.item.id === 'classic-classic-reisu-01').hint, /原文の「四関」と、後世の合谷・太衝/);
assert.match(byId.get('tsubo-li4').context, /手の陽明大腸経・手・腕/);
assert.match(byId.get('tsubo-li4').subtitle, /^手の甲で、/);
for (const query of ['合谷', 'LI4', 'LI-4', ' 合谷 ']) assert.equal(ranked(query)[0].item.url, '/tsubo/li4', query);
for (const query of ['列缺', '列欠']) assert.equal(ranked(query)[0].item.url, '/tsubo/lu7', query);
assert.equal(ranked('頭痛')[0].item.url, ranked('ずつう')[0].item.url);
assert.equal(NEARBY_COMPARISON_LINKS.length, 8);
assert.equal(byId.get('atlas-comparison-medial-knee')?.url, '/tsubo/sp10#acupoint-nearby');
for (const comparison of NEARBY_COMPARISON_LINKS) {
  const result = byId.get('atlas-comparison-' + comparison.id);
  assert.equal(result?.url, comparison.guideHref ?? comparison.href);
  assert.deepEqual(Array.from(result.comparisonCodes), Array.from(comparison.codes));
  for (const code of result.comparisonCodes) assert(byId.has('tsubo-' + code));
}
for (const point of ACUPOINTS_MASTER) assert.equal(byId.get(`tsubo-${point.code.toLowerCase()}`)?.url, `/tsubo/${point.code.toLowerCase()}`);
for (const point of EXTRA_POINTS) {
  const item = byId.get(`extra-point-${point.slug}`);
  assert.equal(item?.url, point.href);
  assert.equal(item.exactCode, point.code);
  assert.equal(item.badge, '奇穴');
  assert(point.alternateCodes.every(code => item.exactTerms.includes(code)));
}
for (const lecture of CURRICULUM_DATA.flatMap(stage => stage.lectures)) {
  const isIndependent = lecture.isPublished && getPublicLectureSeries(lecture.id) !== 'reading';
  assert.equal(byId.has(`lecture-${lecture.id}`), isIndependent, 'The search lists individual exercises and dictionary lessons');
  if (isIndependent) assert.equal(byId.get(`lecture-${lecture.id}`).url, `/curriculum/${lecture.id}`);
}
assert.equal(SEARCH_CATALOG.filter(item => item.url.startsWith('/learn/lectures/')).length, readingUnits.length);
for (const unit of readingUnits) {
  const result = byId.get(`reading-lecture-${unit.slug}`);
  assert.equal(result?.url, unit.href);
  assert(unit.parts.every(part => result.tags.includes(part.label)), unit.slug + ' is searchable by section');
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

const allowedKeys = new Set(['id', 'type', 'title', 'subtitle', 'context', 'relatedQueryNote', 'badge', 'url', 'tags', 'exactCode', 'exactTerms', 'searchRole', 'reviewStatus', 'comparisonCodes']);
const textValues = [];
for (const item of SEARCH_CATALOG) {
  for (const [key, value] of Object.entries(item)) {
    assert(allowedKeys.has(key), `Do not send source bodies, patient records or answers: ${item.id}.${key}`);
    if (typeof value === 'string') textValues.push(value);
    else if (Array.isArray(value)) for (const text of value) { assert.equal(typeof text, 'string'); textValues.push(text); }
    else if (key === 'relatedQueryNote') textValues.push(value.term, value.text);
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
  const searchChunks = scripts.filter(file => file.text.includes('本文も含めてサイト全体を検索'));
  assert(searchChunks.length, 'The built search UI chunk exists');
  for (const chunk of searchChunks) {
    assert(!chunk.text.includes('contentMarkdown'), 'Built search UI must not include lecture body objects');
    assert(!chunk.text.includes('correctDiagnosis'), 'Built search UI must not include case answer objects');
    console.log(`Search UI bundle: ${chunk.file} (${Buffer.byteLength(chunk.text)} bytes, uncompressed).`);
  }
}
console.log(`Search catalog passed: ${SEARCH_CATALOG.length} public destinations, all 9 types, retired exam questions excluded with legacy data retained, published lectures, all point codes, exact term readings and no full bodies or answer records.`);
