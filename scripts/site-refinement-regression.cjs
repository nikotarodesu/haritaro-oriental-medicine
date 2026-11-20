/* eslint-disable @typescript-eslint/no-require-imports -- Offline regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const { CLINICAL_CASES } = load('src/data/clinicalCasesData');
const { KIKEI_VESSELS } = load('src/data/kikeiData');
const { OVERDOSE_PRESETS } = load('src/data/haiketsuData');

function component(file) {
  const source = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(source, /useAuth|AuthModal|useSubscriptionAvailability|\/notes|\/pricing|プレミアム/);
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  const mockComponents = {
    'next/link': ({ href, children }) => React.createElement('a', { href }, children),
    '@/components/design/PageIntro': ({ title, children }) => React.createElement('header', null, title, children),
    '@/components/design/PageArtwork': () => null,
    '@/components/MedicalSafetyNotice': () => null,
    '@/components/clinical/ClinicalToolBridge': () => null,
    '@/components/learning/PrescriptionScoringGuide': () => null,
    '@/components/kikei/KikeiPathwaySvg': () => React.createElement('svg', { 'data-test': 'pathway' }),
    '@/components/kikei/KikeiQuizSection': () => React.createElement('div', { 'data-test': 'quiz' }),
    '@/components/kikei/KikeiEvidenceNote': () => null,
  };
  vm.runInNewContext(js, {
    exports,
    URL,
    require(id) {
      if (id === '@/components/design/PageBreadcrumb') return { __esModule: true, default: component('src/components/design/PageBreadcrumb.tsx') };
      if (id === '@/components/design/PageArtwork') return { PageSymbol: mockComponents[id] };
      if (id === 'next/navigation') return { useSearchParams: () => new URLSearchParams() };
      if (id === '@/utils/analytics') return { trackEvent() {} };
      if (mockComponents[id]) return { __esModule: true, default: mockComponents[id] };
      if (id.startsWith('@/')) return load('src/' + id.slice(2));
      return require(id);
    },
  }, { filename: file });
  return exports.default;
}

const casesIndex = renderToStaticMarkup(React.createElement(component('src/app/cases/page.tsx')));
assert.match(casesIndex, /<nav aria-label="パンくず"[^>]*>.*?href="\/clinical"/);
const CaseViewer = component('src/components/cases/CaseStudyViewer.tsx');
assert.equal(CLINICAL_CASES.length, 20);
for (const clinicalCase of CLINICAL_CASES) {
  assert(casesIndex.includes('href="/cases/' + clinicalCase.id + '"'), clinicalCase.id);
  const html = renderToStaticMarkup(React.createElement(CaseViewer, { clinicalCase }));
  assert(html.includes('href="#case-examination"') && html.includes('id="case-examination"'), clinicalCase.id);
  assert(html.includes('href="#case-reasoning"') && html.includes('id="case-reasoning"'), clinicalCase.id);
  assert(html.includes('aria-label="表示する所見"') && html.includes('aria-pressed="true"'), clinicalCase.id);
}

const Vessel = component('src/components/kikei/KikeiDetailClient.tsx');
assert.equal(KIKEI_VESSELS.length, 8);
for (const vessel of KIKEI_VESSELS) {
  const html = renderToStaticMarkup(React.createElement(Vessel, { vessel }));
  assert(html.includes('data-test="pathway"') && html.includes('data-test="quiz"'), vessel.slug);
}

const prescription = renderToStaticMarkup(React.createElement(component('src/app/practice/haiketsu/page.tsx')));
assert(prescription.includes('id="haiketsu-palette"') && prescription.includes('8穴'));
assert(prescription.includes('href="#haiketsu-review"') && prescription.includes('id="haiketsu-review"'));
assert(!prescription.includes('readOnly'), 'Both writing controls accept input');
assert(prescription.includes('id="haiketsu-title"') && prescription.includes('id="haiketsu-rationale"'));
for (const preset of OVERDOSE_PRESETS) assert(prescription.includes(preset.name), preset.id);

const install = fs.readFileSync('src/components/pwa/PwaInstallPrompt.tsx', 'utf8');
assert(!install.includes('setTimeout('), 'Installation must not interrupt an initial visit');
assert.match(install, /addEventListener\("haritaro:install-app"/);
console.log('Passed: 20 public case exercises, all eight Kikei diagrams and quizzes, all prescription exercises, and user-requested install guidance.');
