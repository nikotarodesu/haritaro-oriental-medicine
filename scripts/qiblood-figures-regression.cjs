/* eslint-disable @typescript-eslint/no-require-imports -- Render the public teaching diagrams. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
let states = [];
let cursor = 0;
const hooks = { ...React, useState(initial) { const value = cursor < states.length ? states[cursor] : initial; cursor++; return [value, () => {}]; } };
function load(candidate) {
  const file = ['.tsx', '.ts'].map(extension => path.resolve(root, candidate) + extension).find(fs.existsSync);
  assert(file, 'Diagram dependency exists: ' + candidate);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (id === 'react') return hooks;
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  };
  vm.runInNewContext(source, { exports, require: localRequire, console, process }, { filename: file });
  return exports;
}
function render(name, values = []) {
  states = values; cursor = 0;
  const html = renderToStaticMarkup(React.createElement(load('src/components/qiblood/' + name).default));
  assert(html.includes('<figcaption'), name + ': scope is part of the published figure');
  assert(html.includes('病気の進行、検査結果、診断や治療効果を示すものではありません'), name + ': scope remains visible');
  assert(html.includes('https://www.who.int/publications/i/item/9789240042322'), name + ': terminology source');
  assert(html.includes('https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know'), name + ': evidence/safety source');
  assert(!/たちまち微小循環|慢性貧血（血虚）|症状の根本原因を撃ち抜く|血塊を融解|血液の製造停止|排出できない過剰な水分は毒|スマホの長時間使用は最も直接的に血を減ら|冷えは血を急速に凝固/.test(html), name + ': old diagnosis, mechanism or efficacy promises are not rendered');
  return html;
}
assert(render('QiBloodThreeLayers').includes('現代医学の臓器や神経・血管の回路と一対一には対応しません'));
const relationText = {
  'qi-blood': '微小循環障害や血液粘稠度の変化を確定することはできません',
  'blood-qi': '血虚を貧血の診断と同一視せず',
  'qi-water': '薬の必要性は、この図や伝統分類だけでは判断できません',
  'blood-water': '発汗・刺絡の手順や適応を判断しません',
};
for (const [relation, text] of Object.entries(relationText)) assert(render('QiBloodTriangle', [relation]).includes(text), relation + ': explanation retains its boundary');
for (const route of ['stress', 'fatigue']) for (let step = 0; step < 4; step++) {
  const html = render('QiBloodDominoProcess', [route, step]);
  assert(html.includes('医学的評価との区別'), route + step + ': each candidate distinguishes medical assessment');
  assert(!html.includes('現代生理学・病理学への翻訳'));
}
for (const name of ['QiBloodConstitutionChecker', 'QiBloodClinicalFlow']) render(name);
console.log('Passed: all five public diagrams, four relation explanations and eight comparison states disclose their learning scope and remove unsupported diagnosis/physiology/treatment promises.');
