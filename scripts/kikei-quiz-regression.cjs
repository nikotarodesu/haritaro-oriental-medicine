/* eslint-disable @typescript-eslint/no-require-imports -- Check real SSR output and quiz event handlers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const { KIKEI_VESSELS } = load('src/data/kikeiData');
const file = 'src/components/kikei/KikeiQuizSection.tsx';
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  fileName: file,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
function component(react = React) {
  const exports = {};
  const renderMath = Object.create(Math);
  renderMath.random = () => { throw new Error('Render must not use unseeded randomness'); };
  vm.runInNewContext(compiled, { exports, Math: renderMath, require: id => id === 'react' ? react : id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) }, { filename: file });
  return exports.default;
}
function nodes(node, result = []) {
  if (Array.isArray(node)) { node.forEach(child => nodes(child, result)); return result; }
  if (!node || typeof node !== 'object') return result;
  result.push(node); nodes(node.props?.children, result); return result;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return typeof node === 'string' || typeof node === 'number' ? String(node) : node && typeof node === 'object' ? text(node.props?.children) : '';
}
function harness(vessel) {
  const states = [];
  let cursor = 0, tree;
  const Quiz = component({ ...React,
    useState(initial) { const slot = cursor++; if (!(slot in states)) states[slot] = typeof initial === 'function' ? initial() : initial; return [states[slot], value => { states[slot] = typeof value === 'function' ? value(states[slot]) : value; }]; },
    // Recompute on every render to catch accidental nondeterminism beyond hydration.
    useMemo: compute => compute(),
  });
  return {
    render() { cursor = 0; tree = Quiz({ vessel }); return tree; },
    options() { return nodes(tree).filter(node => node.type === 'button' && node.props.className?.includes('quiz-option')); },
    button(label) { const found = nodes(tree).find(node => node.type === 'button' && text(node).includes(label)); assert(found, label); return found; },
    text() { return text(tree); },
  };
}
let variedRetryOrders = 0;
for (const vessel of KIKEI_VESSELS) {
  const Quiz = component();
  const ssr = renderToString(React.createElement(Quiz, { vessel }));
  assert.equal(ssr, renderToString(React.createElement(component(), { vessel: { ...vessel } })), `${vessel.slug}: server/client initial render matches`);
  const quiz = harness(vessel);
  quiz.render();
  const firstOrder = quiz.options().map(text).join('|');
  quiz.render();
  assert.equal(quiz.options().map(text).join('|'), firstOrder, `${vessel.slug}: order stable on rerender`);
  const correctTexts = [
    `${vessel.masterPoint.name}（${vessel.masterPoint.meridian}）`,
    `${vessel.couplePoint.name}（${vessel.couplePoint.meridian}）`,
    vessel.indications[0] || '特有の主治病証',
  ];
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt) {
      quiz.button('もう一度挑戦する').props.onClick(); quiz.render();
      assert(quiz.text().includes('現在正答数: 0 / 0 問'), `${vessel.slug}: retry resets score`);
      if (quiz.options().map(text).join('|') !== firstOrder) variedRetryOrders++;
    }
    correctTexts.forEach((answer, index) => {
      const options = quiz.options();
      assert.equal(options.length, index === 2 ? 3 : 4);
      const matching = options.filter(option => text(option).slice(1) === answer);
      assert.equal(matching.length, 1, `${vessel.slug}: exactly one correct option for question ${index + 1}`);
      matching[0].props.onClick(); quiz.render();
      assert(quiz.options().every(option => option.props.disabled), 'Answered choices are locked');
      assert(quiz.text().includes('正解！見事です'), 'Displayed choice retains its correct answer association');
      quiz.button(index < 2 ? '次の問題へ進む' : '演習結果を確認する').props.onClick(); quiz.render();
    });
    assert(quiz.text().includes('正答率: 3 / 3 問正解 (100%)'), `${vessel.slug}: correct scores after shuffle`);
  }
}
assert(variedRetryOrders > 0, 'A user retry changes option order');
console.log(`Passed: ${KIKEI_VESSELS.length} vessels with deterministic SSR/replay, stable rerenders, retry shuffles and 48 correct option grades.`);
