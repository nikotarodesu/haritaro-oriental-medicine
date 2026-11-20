/* eslint-disable @typescript-eslint/no-require-imports -- Render the server dashboard with its real guide data. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader({ Response });
const { CLINICAL_COMPLAINTS } = load('src/data/clinicalWorkflow');
const file = path.resolve(__dirname, '../src/components/clinical/ClinicalDashboard.tsx');
const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  fileName: file,
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const exportsUnderTest = {};
vm.runInNewContext(code, {
  exports: exportsUnderTest,
  require(id) {
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id === './ClinicalArtwork') return { ClinicalComplaintIcon: () => null };
    if (id === '@/data/clinicalWorkflow') return { CLINICAL_COMPLAINTS };
    return require(id);
  },
}, { filename: file });

const markup = renderToStaticMarkup(React.createElement(exportsUnderTest.default));
assert.match(markup, /id="chief-complaints"/);
const hrefs = Array.from(markup.matchAll(/\bhref="([^"]+)"/g), ([, href]) => href);
assert.deepEqual(hrefs, [
  ...CLINICAL_COMPLAINTS.map(item => '/clinical/symptoms/' + item.slug),
  '/tsubo',
  '/tsubo/compare',
  '/safety',
]);
assert.doesNotMatch(markup, /臨床記録|下書き|<button/);

const workspace = load('src/app/clinical/workspace/route');
for (const method of ['GET', 'HEAD']) {
  const response = workspace[method](new Request('https://www.haritaro.jp/clinical/workspace?complaint=shoulder', { method }));
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), '/clinical');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
}
console.log('Clinical dashboard regression passed: complaint guides, reference links and a temporary, query-free workspace redirect.');
