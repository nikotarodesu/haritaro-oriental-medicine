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

function checkRecordingFigure(recording, guideId, example) {
  const figure = recording.match(/<figure id="recording-example"[\s\S]*?<\/figure>/)?.[0];
  assert(figure?.includes('架空の記録です。'), `${guideId}: one visible fictional recording example`);
  assert.equal((recording.match(/id="recording-example"/g) ?? []).length, 1, `${guideId}: existing figure anchor is unique`);
  assert(figure.includes('aria-labelledby="recording-example-title"') && figure.includes('aria-describedby="recording-example-note"'), `${guideId}: figure title and note are accessible`);
  assert.match(figure, /<svg\b[^>]*aria-hidden="true"/);

  if (!example) {
    assert.equal(guideId, 'lower-back-pain-sciatica');
    assert.equal((figure.match(/class="symptoms-back-view"/g) ?? []).length, 2, 'The illustrated comparison of pain locations remains');
    return;
  }

  if (example.layout === 'flow') {
    const { items, offsets } = example;
    const axis = figure.match(/<svg class="symptoms-recording-axis"[\s\S]*?<\/svg>/)?.[0] ?? '';
    const points = [...axis.matchAll(/transform="translate\(([\d.]+) 16\)"/g)].map(match => Number(match[1]));
    assert.equal(points.length, items.length, `${guideId}: every event has a mark on the SVG`);
    assert(figure.includes('<ol') && items.every(([label, observation]) => figure.includes(label) && figure.includes(observation)), `${guideId}: the complete timeline is available as HTML`);
    assert(axis.includes(`data-recording-scale="${offsets ? 'interval' : 'sequence'}"`), `${guideId}: only known intervals get a time scale`);
    const extent = points.at(-1) - points[0];
    points.forEach((point, index) => {
      const expected = offsets ? offsets[index] / offsets.at(-1) : index / (items.length - 1);
      assert(Math.abs((point - points[0]) / extent - expected) < 0.000001, `${guideId}: each point matches the order or actual interval`);
    });
  } else if (example.layout === 'matrix') {
    assert(figure.includes('<table') && example.columns.every(label => figure.includes(`scope="col">${label}`)), `${guideId}: observation conditions are semantic column headers`);
    for (const { label, cells: [before, after], change } of example.rows) {
      assert(figure.includes(`scope="row">${label}`) && figure.includes(before) && figure.includes(after) && figure.includes(`data-change="${change}"`), `${guideId}: each change is described in text and SVG`);
    }
  } else {
    const arrows = [...figure.matchAll(/class="symptoms-recording-stair-arrow" d="([^"]+)"/g)];
    assert.equal(new Set(arrows.map(match => match[1])).size, 2, 'Stairs have two different SVG directions');
    assert(example.items.every(([label, observation]) => figure.includes(label) && figure.includes(observation)), 'Both stair activities are described in HTML');
  }
}

async function main() {
  const { SYMPTOMS, SYMPTOM_SAFETY_GUIDANCE } = load('src/data/symptomData');
  const { PUBLIC_SYMPTOM_CONTENT } = load('src/data/publicSymptoms');
  const { SYMPTOM_RECORDING_EXAMPLES } = load('src/data/symptomRecordingExamples');
  const { ARTICLES } = load('src/data/articleData');
  const { CURRICULUM_DATA } = load('src/data/curriculumData');
  const { getPublicLectureArticle } = load('src/data/publicLectures');
  const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
  const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
  const { ATLAS_STUDIES, getAcupointStudies, getAtlasStudyPoint, getStudyPointRole, getSymptomStudies } = load('src/data/tsubo/atlas/evidence');
  const { SUPPLEMENTAL_ATLAS_STUDIES } = load('src/data/tsubo/atlas/supplementalClinicalStudies');
  const { SCITE_FOLLOWUP_ATLAS_STUDIES, SCITE_SYMPTOM_ATLAS_STUDIES } = load('src/data/tsubo/atlas/sciteFollowupStudies');
  const { RARE_POINT_REHAB_STUDIES } = load('src/data/tsubo/atlas/rarePointRehabStudies');
  const { RECHECKED_POINT_STUDIES } = load('src/data/tsubo/atlas/recheckedPointStudies');
  const { ADDITIONAL_VERIFIED_STUDIES } = load('src/data/tsubo/atlas/additionalVerifiedStudies');
  const { SYMPTOM_RESEARCH_NOTES } = load('src/data/symptomResearchNotes');
  const { ATLAS_LITERATURE_SEARCH_COUNTS } = load('src/data/tsubo/atlas/literatureSearch');
  const { default: AcupointResearch, AtlasStudyCard } = load('src/components/tsubo/AcupointResearch');
  const { getAcupointDetail } = load('src/data/tsubo');
  const heguResearch = renderToStaticMarkup(React.createElement(AcupointResearch, { point: getAcupointDetail('li4') }));
  const [featuredStudies, remainingStudies] = heguResearch.split('研究をすべて見る');
  assert.equal((featuredStudies.match(/class="atlas-study-card /g) ?? []).length, 3);
  assert.equal((remainingStudies.match(/class="atlas-study-card /g) ?? []).length, getAcupointStudies('li4').length - 3);
  for (const { id } of getAcupointStudies('li4')) assert(heguResearch.includes(`id="${id}"`), id + ' still has a fragment target');
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
  const laterStudies = new Set([...SCITE_FOLLOWUP_ATLAS_STUDIES, ...SCITE_SYMPTOM_ATLAS_STUDIES, ...ADDITIONAL_VERIFIED_STUDIES, ...RARE_POINT_REHAB_STUDIES, ...RECHECKED_POINT_STUDIES]);
  const atlasBeforeScite = ATLAS_STUDIES.filter(study => !laterStudies.has(study));
  const previousStudies = atlasBeforeScite.filter(study => !SUPPLEMENTAL_ATLAS_STUDIES.includes(study));
  const pendingBeforeSearch = [...pointCodes].filter(code => !previousStudies.some(study => getStudyPointRole(study, code)));
  assert.equal(pendingBeforeSearch.length, 262);
  assert.deepEqual(Object.keys(ATLAS_LITERATURE_SEARCH_COUNTS).sort(), pendingBeforeSearch.sort(), 'Each previously unlisted point was searched');
  assert(Object.values(ATLAS_LITERATURE_SEARCH_COUNTS).every(counts => counts.length === 2 && counts.every(count => Number.isInteger(count) && count >= 0)), 'Both databases provided search counts');
  assert(SUPPLEMENTAL_ATLAS_STUDIES.every(study => pendingBeforeSearch.some(code => getStudyPointRole(study, code))), 'Each addition covers a previously unlisted point');
  assert(SCITE_FOLLOWUP_ATLAS_STUDIES.every(study => [...pointCodes].some(code => getStudyPointRole(study, code) && !atlasBeforeScite.some(previous => getStudyPointRole(previous, code)))), 'Each follow-up study covers a previously unlisted point');
  assert.equal(new Set(ATLAS_STUDIES.map(study => study.id)).size, ATLAS_STUDIES.length, 'Evidence index uses distinct anchors');
  for (const study of ATLAS_STUDIES) {
    assert(study.kind === 'point' ? study.points.length === 1 : study.points.length > 1 || study.otherPoints || study.additionalPointGroups?.length, `${study.id}: point and combination studies are labelled separately`);
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
    const mainPoint = getAtlasStudyPoint(study);
    assert(pointCodes.has(mainPoint) && getAcupointStudies(mainPoint).includes(study), `${study.id}: the full study has a reachable point page`);
    assert(!study.guide || SYMPTOMS.some(guide => guide.id === study.guide), `${study.id}: related guide exists`);
  }
  for (const { code, studyId, label } of [
    { code: 'li1', studyId: 'si1-postpartum-milk-volume', label: '比較群で使われたツボ' },
    { code: 'bl57', studyId: 'sciatica-herniated-disk', label: '条件に応じて追加されたツボ' },
    { code: 'cv21', studyId: 'antiretroviral-gastrointestinal-relaxation', label: '比較群で使われたツボ' },
    { code: 'bl53', studyId: 'lumbar-spinal-stenosis-pharmacopuncture-acupotomy', label: '薬鍼で選択できた候補' },
    { code: 'bl2', studyId: 'childhood-myopia-plum-blossom-point-sets', label: '両群で共通して使った経穴' },
    { code: 'bl45', studyId: 'vascular-cognitive-impairment-acupuncture', label: '複数のツボを使った研究' },
  ]) {
    const study = getAcupointStudies(code).find(candidate => candidate.id === studyId);
    const html = renderToStaticMarkup(React.createElement(AtlasStudyCard, { study, currentCode: code }));
    assert(html.indexOf(label) >= 0 && html.indexOf(label) < html.indexOf(study.result), `${code}: research role appears before the outcome`);
    const mainPoint = getAtlasStudyPoint(study);
    const method = code === mainPoint ? html.indexOf('<details') : html.indexOf(`href="/tsubo/${mainPoint}#${study.id}"`);
    assert(method > 0 && study.sources.every(source => {
      const link = html.indexOf(source.url);
      return link > html.indexOf(study.limits) && link < method;
    }), `${code}: direct sources follow the limits and stay visible before the research method or link`);
    if (code !== mainPoint) assert(!html.includes('atlas-study-method'), `${code}: related point links to the full method without duplicating it`);
    if (code === 'bl45') {
      const mainHtml = renderToStaticMarkup(React.createElement(AtlasStudyCard, { study, currentCode: mainPoint }));
      const disclosure = mainHtml.indexOf('<details');
      assert(disclosure > 0 && mainHtml.includes(`id="${study.id}"`), 'The full method is available at the shared study anchor');
      assert.match(mainHtml.slice(disclosure), /使用した経穴（16穴）/);
      assert(!mainHtml.slice(0, disclosure).includes('atlas-research-points'), 'All 16 acupoints are inside the details');
    }
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
    assert(content.dailyLife.length > 0 && content.dailyLife.every(({ title, body }) => html.includes(title) && html.includes(body)), `${guide.id}: daily advice appears in initial HTML`);
    assert(content.observations.length >= 3 && content.observations.every(item => html.includes(item)), `${guide.id}: practical details for the visit appear in initial HTML`);
    assert(safety && html.includes(safety.message), `${guide.id}: safety message appears before any interaction`);
    const guideOrder = [safety.message, '受診時に伝えることへ', 'id="recording"', 'id="daily-life"', 'id="traditional"', 'id="acupoints"'].map(marker => html.indexOf(marker));
    assert(guideOrder.every((position, index) => position >= 0 && (index === 0 || position > guideOrder[index - 1])), `${guide.id}: triage and recording precede daily advice and study examples`);
    assert(html.includes('東洋医学の教材で扱うツボの例です。'), `${guide.id}: the point list states its purpose before readers choose a point`);
    assert(html.includes(`aria-current="page">${guide.title}</span>`), `${guide.id}: breadcrumb identifies the current guide`);
    const recording = html.slice(html.indexOf('id="recording"'), html.indexOf('id="daily-life"'));
    checkRecordingFigure(recording, guide.id, SYMPTOM_RECORDING_EXAMPLES[guide.id]);
    assert(html.includes('href="#recording"'), `${guide.id}: the recording section is linked from the table of contents`);
    for (const study of getSymptomStudies(guide.id)) {
      assert(html.includes(study.result) && html.includes(study.limits), `${guide.id}: evidence appears alongside its limits`);
      assert(study.sources.every(source => schema['@graph'][0].citation.includes(source.url)), `${guide.id}: cited clinical studies are in the page schema`);
    }
    const researchNote = SYMPTOM_RESEARCH_NOTES[guide.id];
    if (researchNote) {
      assert(html.indexOf('id="guide-studies"') > html.indexOf('id="safety"'), `${guide.id}: triage precedes the research note`);
      assert(html.includes(researchNote.title) && html.includes(researchNote.body), `${guide.id}: original research note is readable in HTML`);
      for (const source of researchNote.sources) {
        assert(html.includes(`href="${source.url}"`) && schema['@graph'][0].citation.includes(source.url), `${guide.id}: the original source is visible and cited`);
      }
    }
    assert.equal(new Set(sources.map(source => source.url)).size, sources.length, `${guide.id}: unique sources`);
    for (const source of safety.sources) assert(sources.some(candidate => candidate.url === source.url && candidate.scope.includes('受診の目安') && candidate.section.includes(source.section)) && html.includes(source.url), `${guide.id}: cited safety source is visible`);
    for (const source of content.dailyLifeSources || []) assert(sources.some(candidate => candidate.url === source.url && candidate.scope.includes('日常の工夫') && candidate.section.includes(source.section)) && html.includes(source.url), `${guide.id}: the daily advice scope and section are cited`);
    for (const code of guide.recommendedTsuboIds) assert(ACUPOINTS_MASTER.some(point => point.codeLower === code) && html.includes(`href="/tsubo/${code}"`), `${guide.id}: live acupoint link ${code}`);
    assert(lectureIds.has(resources.lectureId), `${guide.id}: existing related lesson`);
    assert(html.includes(`href="/curriculum/${resources.lectureId}"`), `${guide.id}: related lesson remains linked`);
    const lecture = getPublicLectureArticle(resources.lectureId);
    assert(lecture && html.includes(renderToStaticMarkup(React.createElement(React.Fragment, null, lecture.title))), `${guide.id}: link title matches the revised article`);
    assert.equal((html.match(/専門家による監修は完了していません。/g) || []).length, 1, `${guide.id}: review status appears once with the author`);
    assert(html.includes('href="/diagnosis"') && html.includes('気血水の体質チェック（学習用）'), `${guide.id}: constitution check is linked as a learning tool`);
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
        assert(!researchHtml.includes('専門家による監修'), `${id}: research cards leave review status to the author section`);
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
  assert(uncheckedHtml.includes('著者・論文名・掲載誌を確認した資料です。研究の詳細は原典で読めます。'), 'Bibliography-only entries keep claims pending');
  assert(!uncheckedHtml.includes('WITHHELD'), 'An unchecked interpretation is not published from raw data');
  console.log(`Passed: ${SYMPTOMS.length} static symptom guides, canonical/social/schema agreement, 404s, shared content, safety/source integrity, audited research, legacy anchors and sitemap coverage.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
