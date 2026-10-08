/* eslint-disable @typescript-eslint/no-require-imports -- Offline rendering and real button handlers. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { createDataLoader } = require('./data-loader.cjs');

const root = path.resolve(__dirname, '..');
const cases = [
  {
    file: 'src/components/pathomechanism/PathomechanismThermoXushi.tsx',
    diagram: 'pathomechanism-thermo-xushi', lecture: 'lecture-pathomechanism-6',
    buttons: 3, caption: '伝統分類を学ぶための模式図',
    forbidden: /38\.5℃|35\.0℃|高麗人参|内関・太衝・足三里|プロの治療手順|神経細胞が連続発火/,
    required: ['観察した事実', '伝統上の解釈候補', 'まだ分からないこと', 'サーモグラフィではありません'],
    panels: ['<g opacity="1">', '<g opacity="0.3">', '<g opacity="0.3">'],
  },
  {
    file: 'src/components/pathomechanism/PathomechanismPathogenInvasion.tsx',
    diagram: 'pathomechanism-pathogen-invasion', lecture: 'lecture-pathomechanism-7',
    buttons: 3, caption: '必ずこの順に進む悪化段階ではありません',
    forbidden: /葛根湯|麻黄湯|小柴胡湯|防壁.*突破|器質化|自律神経.*プログラム/,
    required: ['記録する事実', 'まだ分からないこと', '六つの分類'],
    panels: ['実際の皮膚から病原体が侵入したことを意味しません', '自律神経の異常や身体の中間層と一対一に対応する用語ではありません', '器質的な損傷、重症度'],
  },
  {
    file: 'src/components/pathomechanism/PathomechanismEmotionCascade.tsx',
    diagram: 'pathomechanism-emotion-cascade', lecture: 'lecture-pathomechanism-8',
    buttons: 4, caption: '必ず進む悪化の連鎖として示した図ではありません',
    forbidden: /HPA軸|完全疲弊|引火帰元|湧泉|太衝|照海|微小血管破綻|逆回転させる/,
    required: ['事実：架空例の記録', '解釈：仮説として比較', '不明点：追加の確認'],
    panels: ['自律神経の収縮や筋緊張と同じものだとは決められません', 'リンパの異常を示す言葉ではありません', '血栓、血液粘度の変化、微小血管の損傷', 'ほかの三つの末期段階'],
  },
  {
    file: 'src/components/lifedynamics/LifeDynamicsDynamicXushi.tsx',
    diagram: 'lifedynamics-dynamic-xushi', lecture: 'lecture-pathomechanism-10',
    buttons: 3, caption: '伝統分類から検査結果、診断、治療効果を保証しません',
    forbidden: /9割|太衝|太渓|湧泉|鎮痛薬.*傷|鎮痛剤.*傷|根治|プロの治療手順/,
    required: ['事実は記録した変化', '因果関係や病名はまだ不明'],
    panels: ['上熱下寒と上実下虚は同じ分類ではありません', '薬の害や施術の順序をこの図から決めず', '身体の三つの解剖区画'],
  },
];

function loadComponent(file, hookReact = React) {
  const absolute = path.join(root, file);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    fileName: absolute,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: id => id === 'react' ? hookReact : require(id) }, { filename: absolute });
  return exports.default;
}

function buttonsIn(element) {
  const buttons = [];
  function visit(node) {
    if (!React.isValidElement(node)) return;
    if (node.type === 'button') buttons.push(node);
    React.Children.forEach(node.props.children, visit);
  }
  visit(element);
  return buttons;
}

const lectures = createDataLoader()('src/data/curriculumData.ts').CURRICULUM_DATA.flatMap(stage => stage.lectures);
let exercisedButtons = 0;
for (const item of cases) {
  const lecture = lectures.find(candidate => candidate.id === item.lecture);
  assert(lecture?.contentMarkdown.includes(`:::diagram ${item.diagram}`), `${item.diagram}: still appears in the intended published lecture`);
  assert.equal(lectures.filter(candidate => candidate.contentMarkdown.includes(`:::diagram ${item.diagram}`)).length, 1);
  const source = fs.readFileSync(path.join(root, item.file), 'utf8');
  assert(!item.forbidden.test(source), `${item.diagram}: a known unsafe claim or fixed procedure returned`);

  // Actual React SSR also checks useId/useState and JSX, independently of the handler harness.
  const defaultHtml = renderToStaticMarkup(React.createElement(loadComponent(item.file)));
  assert(defaultHtml.startsWith('<figure'), `${item.diagram}: actual figure HTML`);
  assert(defaultHtml.includes('<figcaption') && defaultHtml.includes(item.caption), `${item.diagram}: visible scope caption`);
  for (const text of item.required) assert(defaultHtml.includes(text), `${item.diagram}: ${text}`);
  assert.equal((defaultHtml.match(/<button\b/g) ?? []).length, item.buttons);
  assert.equal((defaultHtml.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.equal((defaultHtml.match(/aria-pressed="false"/g) ?? []).length, item.buttons - 1);

  // Exercise each component's real native button handlers and every conditional panel.
  // Only hook storage is replaced; component logic and rendered markup are unchanged.
  let state;
  const hookReact = {
    ...React,
    useId: () => `connected-${item.diagram}`,
    useState: initial => {
      if (state === undefined) state = initial;
      return [state, next => { state = typeof next === 'function' ? next(state) : next; }];
    },
  };
  const Component = loadComponent(item.file, hookReact);
  for (let index = 0; index < item.buttons; index++) {
    const button = buttonsIn(Component())[index];
    assert.equal(button.props.type, 'button');
    assert.equal(typeof button.props.onClick, 'function');
    button.props.onClick();
    const tree = Component();
    const updatedButtons = buttonsIn(tree);
    assert.equal(updatedButtons.filter(candidate => candidate.props['aria-pressed']).length, 1);
    assert.equal(updatedButtons[index].props['aria-pressed'], true);
    const html = renderToStaticMarkup(tree);
    assert(html.includes(item.panels[index]), `${item.diagram}: selecting ${index} updates the teaching panel`);
    if (button.props['aria-controls']) assert(html.includes(`id="${button.props['aria-controls']}"`));
    exercisedButtons++;
  }
}

const diagnosis = lectures.find(lecture => lecture.id === 'lecture-diagnosis-8').contentMarkdown;
assert(diagnosis.includes('血虚は貧血や造血障害、瘀血は血栓や凝固した血の同義語ではありません'));
assert(diagnosis.includes('対象集団と判定基準を定めた検証が必要'));
const treatment = lectures.find(lecture => lecture.id === 'lecture-treatment-7').contentMarkdown;
assert(treatment.includes('マウス') && treatment.includes('確認は抄録に限り'));
assert(treatment.includes('人の過敏性腸症候群への配穴効果や木克土の同一性を証明する研究として引用しません'));
console.log(`Passed: four published legacy figures render real captions and ${exercisedButtons} native button flows; known temperature/drug/procedure claims stay removed, and diagnosis/research boundaries remain explicit.`);
