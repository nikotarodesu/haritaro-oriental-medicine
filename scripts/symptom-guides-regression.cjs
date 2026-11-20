/* eslint-disable @typescript-eslint/no-require-imports -- Standalone route regression. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();

function load(candidate) {
  const absolute = path.isAbsolute(candidate) ? candidate : path.resolve(root, candidate);
  const file = ['.ts', '.tsx', '.json'].includes(path.extname(absolute)) ? absolute : ['.ts', '.tsx', '/index.ts'].map(extension => absolute + extension).find(fs.existsSync);
  assert(file, `Module exists: ${candidate}`);
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (id === 'next/link') return { __esModule: true, default: ({ href, children, prefetch, ...props }) => React.createElement('a', { href, ...props }, children) };
    if (id === 'next/navigation') return { notFound: () => { throw new Error('NEXT_HTTP_ERROR_FALLBACK;404'); } };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(js, { exports, require: localRequire, process, URL, Date, console, Map, Set, TextEncoder }, { filename: file });
  return exports;
}

async function main() {
  const { SYMPTOMS, SYMPTOM_SAFETY_GUIDANCE } = load('src/data/symptomData');
  const { PUBLIC_SYMPTOM_CONTENT } = load('src/data/publicSymptoms');
  const { ARTICLES } = load('src/data/articleData');
  const { CURRICULUM_DATA } = load('src/data/curriculumData');
  const { getPublicLectureArticle } = load('src/data/publicLectures');
  const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
  const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
  const { ATLAS_STUDIES, getAcupointStudies, getStudyPointRole, getSymptomStudies } = load('src/data/tsubo/atlas/evidence');
  const { AtlasStudyCard } = load('src/components/tsubo/AcupointResearch');
  const { VERIFIED_PAPERS } = load('src/data/references/papersData');
  const ResearchReferences = load('src/components/symptoms/SymptomResearchReferences').default;
  const helpers = load('src/utils/symptomGuides');
  const route = load('src/app/symptoms/[slug]/page');
  const index = load('src/app/symptoms/page');
  const sitemap = load('src/app/sitemap').default();
  const lectureIds = new Set(CURRICULUM_DATA.flatMap(stage => stage.lectures).map(lecture => lecture.id));
  assert.equal(SYMPTOMS.length, 12);
  assert.deepEqual(Object.keys(PUBLIC_SYMPTOM_CONTENT).sort(), Array.from(SYMPTOMS, guide => guide.id).sort(), 'Every existing guide has one rewrite');
  assert.equal(new Set(Object.values(PUBLIC_SYMPTOM_CONTENT).map(guide => guide.summary)).size, 12, 'All rewritten summaries are distinct');
  assert.equal(route.dynamicParams, false, 'Unknown slugs do not produce extra guide URLs');
  assert.equal(JSON.stringify(route.generateStaticParams()), JSON.stringify(SYMPTOMS.map(guide => ({ slug: guide.id }))), 'Every guide has a build-time route');
  const indexHtml = renderToStaticMarkup(index.default());
  const indexSchema = helpers.getSymptomsIndexJsonLd(index.metadata.title, index.metadata.description);
  assert.equal(indexSchema['@graph'][1].itemListElement.length, SYMPTOMS.length, 'Index schema lists every guide');
  assert(indexHtml.indexOf('id="symptom-guides"') < indexHtml.indexOf('このガイドで確認できること'), 'Usage scope follows the index');
  const pointCodes = new Set(ACUPOINTS_MASTER.map(point => point.codeLower));
  assert.equal(new Set(ATLAS_STUDIES.map(study => study.id)).size, ATLAS_STUDIES.length, 'Evidence index uses distinct anchors');
  for (const study of ATLAS_STUDIES) {
    assert.equal(study.kind === 'point', study.points.length === 1, `${study.id}: point and combination studies are labelled separately`);
    const pointGroups = [
      { points: study.points, role: 'main' },
      { points: study.comparisonPoints || [], role: 'comparison' },
      ...(study.additionalPointGroups || []).map(group => ({
        points: group.points,
        role: group.comparison ? 'comparison' : 'additional',
      })),
    ];
    for (const { points, role } of pointGroups) {
      assert(points.every(code => pointCodes.has(code) && getStudyPointRole(study, code) === role && getAcupointStudies(code).includes(study)), `${study.id}: each ${role} point appears on its detail page`);
    }
    assert(study.sources.length && study.sources.every(source => source.label && new URL(source.url).protocol === 'https:'), `${study.id}: cites a source`);
    assert(!study.guide || SYMPTOMS.some(guide => guide.id === study.guide), `${study.id}: related guide exists`);
  }
  for (const { code, studyId, label } of [
    { code: 'li1', studyId: 'si1-postpartum-milk-volume', label: '比較群で使われたツボ' },
    { code: 'bl57', studyId: 'sciatica-herniated-disk', label: '条件に応じて追加されたツボ' },
  ]) {
    const study = getAcupointStudies(code).find(candidate => candidate.id === studyId);
    const html = renderToStaticMarkup(React.createElement(AtlasStudyCard, { study, currentCode: code }));
    assert(html.indexOf(label) >= 0 && html.indexOf(label) < html.indexOf(study.result), `${code}: research role appears before the outcome`);
    assert(study.sources.every(source => html.includes(source.url)), `${code}: direct sources are visible in the disclosure`);
  }

  for (const guide of SYMPTOMS) {
    const content = PUBLIC_SYMPTOM_CONTENT[guide.id];
    const pathname = helpers.symptomGuidePath(guide);
    const params = Promise.resolve({ slug: guide.id });
    const metadata = await route.generateMetadata({ params });
    const html = renderToStaticMarkup(await route.default({ params }));
    const schema = helpers.getSymptomGuideJsonLd(guide);
    const resources = helpers.SYMPTOM_LEARNING_RESOURCES[guide.id];
    const safety = SYMPTOM_SAFETY_GUIDANCE[guide.id];
    const sources = helpers.getSymptomGuideSources(guide);
    assert.equal(metadata.alternates.canonical, pathname, `${guide.id}: self canonical`);
    assert.equal(metadata.openGraph.url, `https://www.haritaro.jp${pathname}`, `${guide.id}: share URL`);
    assert.equal(metadata.title, schema['@graph'][0].name, `${guide.id}: metadata agrees with schema`);
    assert.equal(metadata.description, schema['@graph'][0].description, `${guide.id}: description agrees with schema`);
    assert(metadata.description.includes(content.summary), `${guide.id}: metadata reflects the rewritten summary`);
    assert.equal(schema['@graph'][1].itemListElement[2].item, metadata.openGraph.url, `${guide.id}: breadcrumb URL`);
    assert(!JSON.stringify(schema).match(/possibleTreatment|MedicalCondition|MedicalTherapy|鍼灸師監修/), `${guide.id}: no treatment or completed review claim`);
    assert(!html.match(/セルフ診断で原因|原因タイプを調べる/), `${guide.id}: no diagnostic CTA`);
    assert(html.includes(content.summary) && indexHtml.includes(content.summary), `${guide.id}: the revised summary appears on both the detail and index pages`);
    assert(content.traditional.length > 0 && content.traditional.every(paragraph => html.includes(paragraph)), `${guide.id}: revised traditional concepts appear in initial HTML`);
    assert(content.dailyLife.length >= 2 && content.dailyLife.every(({ title, body }) => html.includes(title) && html.includes(body)), `${guide.id}: daily advice appears in initial HTML`);
    assert(content.observations.length >= 3 && content.observations.every(item => html.includes(item)), `${guide.id}: practical details for the visit appear in initial HTML`);
    assert(safety && html.includes(safety.message), `${guide.id}: safety message appears before any interaction`);
    assert(html.indexOf(safety.message) < html.indexOf('id="acupoints"') && html.indexOf('id="acupoints"') < html.indexOf('id="daily-life"') && html.indexOf('id="daily-life"') < html.indexOf('id="traditional"'), `${guide.id}: triage and point links precede the guide's longer sections`);
    for (const study of getSymptomStudies(guide.id)) {
      assert(html.includes(study.result) && html.includes(study.limits), `${guide.id}: evidence appears alongside its limits`);
      assert(study.sources.every(source => schema['@graph'][0].citation.includes(source.url)), `${guide.id}: cited clinical studies are in the page schema`);
    }
    assert.equal(new Set(sources.map(source => source.url)).size, sources.length, `${guide.id}: unique sources`);
    for (const source of safety.sources) assert(sources.some(candidate => candidate.url === source.url && candidate.scope.includes('受診の目安') && candidate.section.includes(source.section)) && html.includes(source.url), `${guide.id}: cited safety source is visible`);
    for (const source of content.dailyLifeSources || []) assert(sources.some(candidate => candidate.url === source.url && candidate.scope.includes('日常の工夫') && candidate.section.includes(source.section)) && html.includes(source.url), `${guide.id}: the daily advice scope and section are cited`);
    for (const code of guide.recommendedTsuboIds) assert(ACUPOINTS_MASTER.some(point => point.codeLower === code) && html.includes(`href="/tsubo/${code}"`), `${guide.id}: live acupoint link ${code}`);
    assert(lectureIds.has(resources.lectureId), `${guide.id}: existing related lesson`);
    assert(html.includes(`href="/curriculum/${resources.lectureId}"`), `${guide.id}: related lesson remains linked`);
    const lecture = getPublicLectureArticle(resources.lectureId);
    assert(lecture && html.includes(renderToStaticMarkup(React.createElement(React.Fragment, null, lecture.title))), `${guide.id}: link title matches the revised article`);
    assert(html.includes('href="/diagnosis"'), `${guide.id}: constitution check remains linked`);
    if (resources.articleId) assert(ARTICLES.some(article => article.id === resources.articleId), `${guide.id}: existing related article ${resources.articleId}`);
    if (resources.caseId) assert(CLINICAL_CASES.some(item => item.id === resources.caseId), `${guide.id}: existing fictional case`);
    for (const id of resources.paperIds || []) {
      const paper = VERIFIED_PAPERS.find(candidate => candidate.id === id);
      assert(paper, `${guide.id}: public audited paper ${id}`);
      assert(html.includes(`href="/library#paper-${id}"`), `${guide.id}: research link uses the library's existing fragment`);
      if (paper.claimsStatus === 'source-checked' && paper.sourceLocator && paper.verificationScope) {
        const researchHtml = renderToStaticMarkup(React.createElement(ResearchReferences, { papers: [paper] }));
        assert(researchHtml.includes(paper.verificationScope === 'abstract' ? '抄録を照合' : '本文の一部を照合'), `${id}: exact interpretation scope`);
        assert(researchHtml.includes(paper.claimsCheckedAt), `${id}: interpretation date is separate from bibliography date`);
        assert(researchHtml.includes('専門家による監修・承認は未完了'), `${id}: source check is not expert approval`);
        assert(researchHtml.includes(`href="${paper.sourceUrl}"`), `${id}: direct checked source URL`);
      }
    }
    assert(indexHtml.includes(`id="${guide.id}"`), `${guide.id}: old fragment URL still resolves`);
    assert(indexHtml.includes(`href="${pathname}"`), `${guide.id}: detail URL is discoverable without JavaScript`);
    assert.equal(sitemap.filter(page => new URL(page.url).pathname === pathname).length, 1, `${guide.id}: one sitemap entry`);
    const revision = helpers.getSymptomGuideRevision(guide);
    assert.equal(sitemap.find(page => new URL(page.url).pathname === pathname).lastModified.toISOString().slice(0, 10), revision, `${guide.id}: substantive page update date`);
    assert.equal(schema['@graph'][0].dateModified, revision, `${guide.id}: structured data reflects the revision date`);
    assert(html.includes(`<time dateTime="${revision}">${revision}</time>`), `${guide.id}: editorial disclosure reflects the revision date`);
  }
  const invalidParams = Promise.resolve({ slug: 'missing-guide' });
  await assert.rejects(route.default({ params: invalidParams }), /404/, 'Unknown page returns a 404');
  await assert.rejects(route.generateMetadata({ params: invalidParams }), /404/, 'Unknown metadata returns a 404');
  assert.equal((indexHtml.match(/application\/ld\+json/g) || []).length, 1, 'Index does not inherit a duplicated guide schema');
  assert(!JSON.stringify(indexSchema).includes('possibleTreatment'), 'Index is a guide collection, not a treatment catalogue');
  const uncheckedHtml = renderToStaticMarkup(React.createElement(ResearchReferences, { papers: [{ id: 'bibliography-only', title: 'Audited title', journal: 'Journal', year: 2026, claimsStatus: 'needs-review', abstract: 'WITHHELD CLAIM', targetCondition: 'WITHHELD POPULATION', clinicalTakeaways: ['WITHHELD LIMITATION'] }] }));
  assert(uncheckedHtml.includes('研究結果の解釈・適用範囲は確認中'), 'Bibliography-only entries keep claims pending');
  assert(!uncheckedHtml.includes('WITHHELD'), 'An unchecked interpretation is not published from raw data');
  console.log(`Passed: ${SYMPTOMS.length} static symptom guides, canonical/social/schema agreement, 404s, shared content, safety/source integrity, audited research, legacy anchors and sitemap coverage.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
