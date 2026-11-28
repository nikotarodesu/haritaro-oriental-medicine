/* eslint-disable @typescript-eslint/no-require-imports -- Test the shipped tablet handlers without network or private data. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const postcss = require('postcss');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader({ URLSearchParams });
const safety = load('src/data/medicalSafety');
const navigation = load('src/config/navigationItems');
const menuEvents = load('src/utils/siteMenu');
function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  return node && typeof node === 'object' ? [node, ...[].concat(node.props?.children || []).flatMap(nodes)] : [];
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return node && typeof node === 'object' ? text(node.props?.children) : node == null || typeof node === 'boolean' ? '' : String(node);
}
function client(relative, overrides = {}, globals = {}) {
  const state = [], effects = [];
  let cursor = 0, tree, Component, boundaryProps = {};
  const react = { ...React,
    useState(initial) { const index = cursor++; if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial; return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }]; },
    useMemo(callback) { return callback(); },
    useCallback(callback) { return callback; },
    useRef(initial) { const index = cursor++; return state[index] ||= { current: initial }; },
    useTransition() { return [false, callback => callback()]; },
    useEffect(callback, dependencies) { const index = cursor++, previous = state[index]; if (!previous || dependencies?.some((value, i) => value !== previous.dependencies?.[i])) { state[index] = { dependencies }; effects.push(() => { previous?.cleanup?.(); state[index].cleanup = callback(); }); } },
  };
  const filename = path.join(root, relative), exported = {};
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { fileName: filename, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports: exported, URLSearchParams, ...globals, require: id => {
    if (id in overrides) return overrides[id];
    if (id === 'react') return react;
    if (id === '@/data/medicalSafety') return safety;
    return require(id);
  } }, { filename });
  Component = exported.default;
  return {
    boundaryChild(props) { const child = Component(props).props.children; Component = child.type; boundaryProps = child.props; },
    render(props) { cursor = 0; tree = Component(props ?? boundaryProps); for (const node of nodes(tree)) if (node.props?.ref) { const element = globals.elementFor?.(node) || {}; if (typeof node.props.ref === 'function') node.props.ref(element); else node.props.ref.current = element; } while (effects.length) effects.shift()(); return tree; },
    tree: () => tree,
    button(label) { const button = nodes(tree).find(node => node.type === 'button' && (text(node) === label || node.props['aria-label'] === label)); assert(button, `Available button: ${label}`); return button; },
    unmount() { for (const slot of state) slot?.cleanup?.(); },
  };
}

// A wide CSS viewport can still have the compact header after text enlargement.
// The actual header layout, not a hard-coded device width, controls the lower shortcuts.
const listeners = new Map(), layoutObservers = [], sizeObservers = [], timers = [];
const styles = new Map();
const documentElement = { dataset: { navigationLayout: 'compact' }, style: { setProperty: (key, value) => styles.set(key, value) } };
const browser = {
  innerWidth: 1180,
  addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
  removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
  dispatchEvent(event) { for (const callback of listeners.get(event.type) || []) callback(event); },
  matchMedia() { throw Error('The bottom navigation must use the actual shared header layout'); },
};
const Link = () => null, Customize = () => null;
const customConfig = { ...navigation.DEFAULT_NAV_CONFIG, items: ['clinical', 'haiketsu', 'tsubo', 'library'] };
let navHeight = 72;
const bottom = client('src/components/navigation/MobileBottomNav.tsx', {
  'next/link': { __esModule: true, default: Link },
  'next/navigation': { usePathname: () => '/clinical', useSearchParams: () => new URLSearchParams() },
  '@/config/navigationItems': { ...navigation, loadNavUserConfig: () => customConfig },
  '@/utils/siteMenu': menuEvents,
  '@/hooks/useAtlasReturn': { useAtlasReturn: () => undefined },
  '@/hooks/useViewportLayout': { useViewportLayout() {} },
  './NavCustomizeModal': { __esModule: true, default: Customize },
}, {
  document: { documentElement, getElementById: () => null }, window: browser,
  elementFor: () => ({ getBoundingClientRect: () => ({ height: navHeight }) }),
  ResizeObserver: class { constructor(callback) { this.callback = callback; sizeObservers.push(this); } observe() {} disconnect() {} },
  MutationObserver: class { constructor(callback) { this.callback = callback; layoutObservers.push(this); } observe() {} disconnect() {} },
  setTimeout(callback) { timers.push(callback); return timers.length; }, clearTimeout() {},
  requestAnimationFrame() { return 1; }, cancelAnimationFrame() {},
});
bottom.boundaryChild(); bottom.render(); timers.splice(0).forEach(callback => callback()); bottom.render();
assert.equal(styles.get('--mobile-nav-height'), '72px', '1180px compact layouts preserve the lower navigation gutter');
const customLinks = () => nodes(bottom.tree()).filter(node => node.type === Link).map(node => node.props.href).join(',');
assert.equal(customLinks(), '/clinical,/practice/haiketsu,/tsubo,/library');
for (const width of [768, 820, 1024, 1100, 1180, 1200]) {
  browser.innerWidth = width; browser.dispatchEvent({ type: 'resize' }); bottom.render();
  assert.equal(styles.get('--mobile-nav-height'), '72px', `The compact header retains its lower gutter at ${width}px, including enlarged-text layouts`);
}
browser.dispatchEvent({ type: menuEvents.NAV_CUSTOMIZE_EVENT }); bottom.render();
assert(nodes(bottom.tree()).some(node => node.type === Customize));
documentElement.dataset.navigationLayout = 'wide'; layoutObservers.forEach(observer => observer.callback()); bottom.render();
assert.equal(styles.get('--mobile-nav-height'), '0px');
assert(!nodes(bottom.tree()).some(node => node.type === Customize), 'A now-hidden shortcut editor closes in the wide layout');
documentElement.dataset.navigationLayout = 'compact'; browser.innerWidth = 1024; layoutObservers.forEach(observer => observer.callback()); bottom.render();
assert.equal(styles.get('--mobile-nav-height'), '72px');
navHeight = 84; sizeObservers.forEach(observer => observer.callback());
assert.equal(styles.get('--mobile-nav-height'), '84px', 'Larger labels update the measured lower gutter');
assert.equal(customLinks(), '/clinical,/practice/haiketsu,/tsubo,/library', 'Rotation and font changes preserve all four custom slots');
bottom.unmount();

// Published labels and keyboard selection both come from anatomy drawn in the SVG.
const structure = (id, name, category = 'muscle') => ({ id, name, category, description: `${name}の説明`, dangerLevel: 'safe' });
const model = {
  id: 'test', title: '検証用の断面', axes: { horizontal: ['左','右'], vertical: ['表','深'] },
  layers: [structure('skin','皮膚','skin'), structure('muscle','筋'), structure('undrawn','非描画の構造'), structure('needle-indicator','非公開の針')],
  boundaries: [], adjacentStructures: [], references: [],
  svgElements: [
    { elementId: 'skin-shape', layerId: 'skin', shapeType: 'rect', x: 0, y: 0, width: 80, height: 20, label: '皮膚' },
    { elementId: 'muscle-shape', layerId: 'muscle', shapeType: 'circle', cx: 50, cy: 50, r: 5, label: '筋' },
    { elementId: 'muscle-second-shape', layerId: 'muscle', shapeType: 'rect', x: 40, y: 80, width: 80, height: 20, label: '筋' },
    { elementId: 'withheld', layerId: 'needle-indicator', shapeType: 'path', d: 'M0,0L50,50', label: '非公開の針' },
  ],
};
const layouts = load('src/data/tsubo/atlas/crossSectionCallouts');
const anatomy = client('src/components/tsubo/CrossSectionViewer.tsx', { '@/data/tsubo/atlas/crossSectionCallouts': layouts });
const anatomyProps = { model, pointName: '検証', pointCode: 'TEST' };
anatomy.render(anatomyProps);
const figureLabels = () => nodes(anatomy.tree()).filter(node => node.props['data-anatomy-callout']);
const shape = id => nodes(anatomy.tree()).find(node => node.props?.id === id);
assert.equal(figureLabels().map(text).join(','), '筋', 'The muscle name is already visible on the drawing');
assert(!text(anatomy.tree()).includes('非描画') && !text(anatomy.tree()).includes('非公開の針'));
assert(!text(anatomy.tree()).includes('構造名から選ぶ'));
nodes(figureLabels()[0]).find(node => node.type === 'text').props.onClick(); anatomy.render(anatomyProps);
assert(shape('muscle-shape').props['aria-pressed']);
assert(text(anatomy.tree()).includes('筋の説明'));
const selectedSvg = nodes(anatomy.tree()).filter(node => ['rect','circle'].includes(node.type) && node.props['aria-pressed']);
assert.equal(selectedSvg.length, 2, 'All SVG shapes for the selected structure stay synchronized');
shape('muscle-shape').props.onClick(); anatomy.render(anatomyProps);
assert.equal(shape('muscle-shape').props['aria-pressed'], false, 'Pressing the same structure clears selection');
let prevented = false;
shape('skin-shape').props.onKeyDown({ key: 'Enter', preventDefault() { prevented = true; } }); anatomy.render(anatomyProps);
assert(prevented); assert(shape('skin-shape').props['aria-pressed'], 'A structure without a printed label is still keyboard accessible');
shape('skin-shape').props.onKeyDown({ key: 'Escape' }); anatomy.render(anatomyProps);
assert.equal(shape('skin-shape').props['aria-pressed'], false);
shape('skin-shape').props.onClick(); anatomy.render(anatomyProps);
anatomy.button('選択解除').props.onClick(); anatomy.render(anatomyProps);
assert(!nodes(anatomy.tree()).some(node => node.props['aria-pressed']));

const crossSections = load('src/data/tsubo/crossSectionsData').CROSS_SECTIONS;
const publishedLandmarks = load('src/data/tsubo/atlas/sharedAnatomyLandmarks').getSharedAnatomyLandmarks;
const heguLabels = layouts.crossSectionCallouts(crossSections.li4, safety.getPublicCrossSectionElements(crossSections.li4), publishedLandmarks('li4'), false).labels;
assert.deepEqual(Array.from(heguLabels, label => label.name).sort(), ['① 第2中手骨','② 第1中手骨','母指内転筋','第1背側骨間筋'].sort());
const pointMarks = () => nodes(anatomy.tree()).filter(node => node.props['data-anatomy-surface-point'] === '');
const pointName = () => nodes(anatomy.tree()).find(node => node.props['data-anatomy-point-name'] === '');
anatomy.render({ model: crossSections.li4, pointName: '合谷', pointCode: 'LI4' });
const legacyPoint = crossSections.li4.svgElements.find(element => element.layerId === 'point-marker-layer');
assert.deepEqual(pointMarks().map(({ props }) => [props.cx, props.cy]), [[legacyPoint.cx, legacyPoint.cy]], 'The individual drawing uses its existing surface coordinates exactly once');
assert.equal(text(pointName()), '合谷 LI4');
anatomy.render({ model: crossSections.pc4, pointName: '郄門', pointCode: 'PC4' });
assert.deepEqual(pointMarks().map(({ props }) => [props.cx, props.cy]), [[crossSections.pc4.surfacePoint.x, crossSections.pc4.surfacePoint.y]]);
assert.equal(text(pointName()), crossSections.pc4.surfacePoint.label);
const regionalSections = load('src/data/tsubo/regionalSections/index');
const { model: regionalModel, landmarks } = regionalSections.createRegionalSectionModel('lu3', regionalSections.getRegionalSection('lu3'));
const regionalLabels = layouts.crossSectionCallouts(regionalModel, safety.getPublicCrossSectionElements(regionalModel), landmarks, true).labels;
assert.deepEqual(Array.from(regionalLabels, label => label.name).sort(), ['上腕三頭筋','上腕二頭筋','上腕骨'].sort());
const surface = React.createElement('svg', null, React.createElement('circle', { 'data-point-marker': '' }));
anatomy.render({ model: regionalModel, pointName: '天府', pointCode: 'LU3', regional: true, sharedLandmarks: landmarks, surface });
assert.equal(pointMarks().length, 0, 'Regional sections do not project an unverified point onto the plane');
assert.equal(text(pointName()), '天府（LU3）');
const paired = nodes(anatomy.tree()).find(node => node.props['data-anatomy-surface-view'] === '');
assert(nodes(paired).some(node => node.props['data-point-marker'] === ''), 'A labelled surface view shares the figure with the regional section');

// Compare markup keeps row/column semantics and all original selection behavior.
const atlasLocations = load('src/data/tsubo/friendlyLocations');
const tsubo = (code, name) => ({ id: code.toLowerCase(), code, name, kana: name, romaji: name, meridian: '検証経絡', meridianShort: '検証経絡', bodyPart: '検証部位', category: [], indications: ['旧版の疾患タグ'], traditional: '公開済みの伝統的な背景', clinicalNote: '公開済みの補足', caution: '公開済みの注意', locationSimple: atlasLocations.getAtlasLocationSimple(code.toLowerCase()), locationFigure: React.createElement('svg', { role: 'img', 'aria-label': name }) });
const TSUBOS = [
  { ...tsubo('LI4','合谷'), hasResearch: true, symptomWarning: '公開済みの受診目安' },
  tsubo('LR3','太衝'),
  { ...tsubo('ST36','足三里'), kana: 'あしさんり', romaji: 'Zusanli', locationDetail: '旧版の部位説明' },
];
const comparisonSelection = load('src/app/tsubo/compare/selection');
let comparisonHref = '/tsubo/compare';
let comparisonFocus;
const swap = () => nodes(compare.tree()).find(node => node.type === 'dialog');
const dialog = { open: false, showModal() { this.open = true; }, close() { this.open = false; swap().props.onClose(); } };
const comparisonRouter = { replace(href, options) { assert.equal(options.scroll, false); comparisonHref = href; } };
const AtlasLocationCheck = () => null;
const compare = client('src/app/tsubo/compare/CompareClient.tsx', {
  './presets': load('src/app/tsubo/compare/presets'),
  './selection': comparisonSelection,
  'next/link': { __esModule: true, default: Link },
  'next/navigation': { useRouter: () => comparisonRouter },
  '@/data/tsubo/atlas/learningPairs': load('src/data/tsubo/atlas/learningPairs'),
  '@/data/tsubo/atlas/practiceReviews': load('src/data/tsubo/atlas/practiceReviews'),
  '@/components/tsubo/atlas/AtlasLocationCheck': { __esModule: true, default: AtlasLocationCheck },
  '@/utils/search': load('src/utils/search'),
}, { window: { print() {} }, document: { getElementById: id => ({ focus() { comparisonFocus = id; } }) }, elementFor: node => node.type === 'dialog' ? dialog : {},
});
const renderComparison = (href = comparisonHref) => {
  comparisonHref = href;
  const params = Object.fromEntries(new URL(href, 'https://www.haritaro.jp').searchParams);
  const { codes, unavailableCount } = comparisonSelection.resolveComparisonSelection(params, TSUBOS);
  const selectedTsubos = Array.from(codes, code => TSUBOS.find(point => point.code === code));
  compare.render({ choices: TSUBOS, selectedTsubos, unavailableCount });
};
renderComparison();
const scroll = () => nodes(compare.tree()).find(node => node.props?.className === 'tsubo-compare-scroll');
const locationCheck = () => nodes(compare.tree()).find(node => node.type === AtlasLocationCheck);
const positionGrid = () => nodes(compare.tree()).find(node => node.props?.className === 'tsubo-compare-position-grid');
const comparePicker = () => nodes(compare.tree()).find(node => node.type === 'details' && node.props?.className.includes('tsubo-compare-controls'));
const caseLinks = () => nodes(compare.tree()).filter(node => node.props?.['data-analytics-action'] === 'compare_case');
assert.equal(locationCheck().props.question.answerCode, 'LI4');
assert.equal(locationCheck().props.reviewQuestion.href, '/tsubo/compare?a=li4&b=lr3#review-atlas-pair-li4-lr3');
assert.equal(caseLinks()[0]?.props.href, '/cases/case-01-headache-liver-fire');
assert(!comparePicker().props.open, 'A preselected pair shows both locations immediately');
assert.equal(scroll().props.tabIndex, 0, 'The two-direction scrolling region is reachable by keyboard');
assert.equal(scroll().props.role, 'region');
assert.equal(scroll().props['aria-describedby'], nodes(compare.tree()).find(node => node.props?.id === 'tsubo-compare-scroll-hint').props.id);
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 3);
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'row').length, 5);
assert(nodes(scroll()).some(node => node.type === 'caption'));
for (const code of ['li4', 'lr3']) {
  assert(nodes(positionGrid()).some(node => node.type === Link && node.props.href === '/tsubo/' + code + '#acupoint-location' && !node.props.target), 'Default comparison links directly to every diagram in the same tab');
  assert(nodes(scroll()).some(node => node.type === Link && node.props.href === '/tsubo/' + code + '#acupoint-cautions'), 'Default comparison links directly to every caution');
}
assert(text(scroll()).includes('公開済みの注意'));
assert(text(scroll()).includes('公開済みの伝統的な背景'));
assert(!text(scroll()).includes('旧版の疾患タグ'));
assert(nodes(scroll()).some(node => node.type === Link && node.props.href === '/tsubo/li4#acupoint-research'), 'Comparison learning notes link to published research and sources');
assert(!nodes(scroll()).some(node => node.type === Link && node.props.href === '/tsubo/lr3#acupoint-research'), 'Comparison skips the research link when the point has no research section');
const compareInput = () => nodes(compare.tree()).find(node => node.type === 'input' && node.props.id === 'compare-search-input');
assert.equal(compareInput().props['aria-label'], '比較するツボを検索');
const compareNodes = nodes(compare.tree());
const pointSelection = compareNodes.find(node => node.props?.className === 'tsubo-compare-selection');
const examples = compareNodes.find(node => node.type === 'details' && node.props?.className.includes('tsubo-compare-presets'));
assert(compareNodes.indexOf(compareInput()) < compareNodes.indexOf(pointSelection) && compareNodes.indexOf(pointSelection) < compareNodes.indexOf(examples), 'Search and selections precede the collapsed presets');
assert(!examples.props.open);
const mobilePointNames = row => nodes(row).filter(node => node.props?.className === 'tsubo-compare-row-point').map(text).join(',');
const itemRows = () => nodes(scroll()).filter(node => node.type === 'tr' && node.props?.children?.[0]?.props?.scope === 'row');
assert.equal(itemRows().length, 5);
assert.equal(text(itemRows()[0].props.children[0]), 'ツボごとの注意', 'Point-specific safety is first in the supplementary table');
assert.equal(text(itemRows()[1].props.children[0]), '症状がある場合の受診目安', 'Triage has a dedicated row');
assert(text(itemRows()[1]).includes('公開済みの受診目安') && !text(itemRows()[0]).includes('公開済みの受診目安'));
assert(compareNodes.indexOf(positionGrid()) < compareNodes.indexOf(scroll()), 'The location cards precede the table');
assert(!compareNodes.find(node => node.type === 'details' && node.props?.className.includes('tsubo-compare-facts')).props.open);
assert.deepEqual(nodes(positionGrid()).filter(node => node.type === 'svg').map(node => node.props['aria-label']), ['合谷', '太衝']);
assert(itemRows().every(row => mobilePointNames(row) === '合谷,太衝'), 'Every item labels both points in the narrow layout');
for (const query of ['ＳＴ３６', 'アシサンリ', 'Zusanli']) {
  compareInput().props.onChange({ target: { value: query } }); renderComparison();
  assert(nodes(compare.tree()).some(node => node.type === 'button' && text(node).startsWith('足三里ST36')), query + ' finds the existing compare option');
}
compareInput().props.onChange({ target: { value: 'LU1' } }); renderComparison();
assert(nodes(compare.tree()).some(node => node.type === 'a' && node.props.href === '/tsubo?q=LU1'), 'The complete atlas lookup uses a full navigation to keep the query out of analytics');
const unmatchedQuery = '該当しない + /?';
compareInput().props.onChange({ target: { value: unmatchedQuery } }); renderComparison();
const fullAtlasLookup = nodes(compare.tree()).find(node => node.type === 'a' && node.props.href?.startsWith('/tsubo?q='));
assert.equal(new URL(fullAtlasLookup.props.href, 'https://www.haritaro.jp').searchParams.get('q'), unmatchedQuery, 'The native link preserves literal spaces, punctuation and Japanese');
compare.button('合谷を変更').props.onClick(); renderComparison();
assert.equal(comparisonFocus, 'compare-search-input', 'Changing a selected point focuses the search input');
compareInput().props.onChange({ target: { value: 'ＳＴ３６' } }); renderComparison();
compare.button('足三里ST36 / 検証経絡').props.onClick({ currentTarget: { focus() {} } }); renderComparison();
assert.equal(comparisonHref, '/tsubo/compare?a=st36&b=lr3', 'Replacing a selected point preserves its column and updates the bookmark URL');
assert.equal(comparisonFocus, 'tsubo-compare-result-title', 'Replacing a point focuses the updated result');
renderComparison('/tsubo/compare');
compareInput().props.onChange({ target: { value: '' } }); renderComparison();
compare.button('合谷を比較から外す').props.onClick();
assert.equal(comparisonHref, '/tsubo/compare?a=lr3');
renderComparison();
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 2, 'Existing removal still updates the comparison columns');
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'row').length, 5);
assert(comparePicker().props.open, 'A single selected point makes the picker available straight away');
assert.equal(locationCheck(), undefined, 'A single point has no pair-specific question');
assert.equal(caseLinks().length, 0);

compare.button('太衝を比較から外す').props.onClick();
assert.equal(comparisonHref, '/tsubo/compare?empty=1');
renderComparison();
assert.equal(scroll(), undefined, 'Removing all points leaves the picker visible without a comparison table');
assert(comparePicker().props.open);

renderComparison('/tsubo/compare?code=LI4&b=LR3&c=ＳＴ３６');
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 4, 'URL synchronization displays all three points without an account');
assert(itemRows().every(row => mobilePointNames(row) === '合谷,太衝,足三里'), 'Each item stays labeled when three points stack');
assert.equal(caseLinks().length, 0);
renderComparison('/tsubo/compare?a=lr3&b=li4');
assert.equal(caseLinks()[0]?.props.href, '/cases/case-01-headache-liver-fire', 'Reversing an existing pair keeps its related case');
renderComparison('/tsubo/compare?a=ST36&b=LI4');
renderComparison('/tsubo/compare?a=LR3&b=ST36');
const comparisonHeaders = nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col');
assert(text(comparisonHeaders[1]).includes('太衝') && text(comparisonHeaders[2]).includes('足三里'), 'Only the latest route supplies the visible columns');
TSUBOS.push({ ...tsubo('GV20', '百会'), locationDetail: '旧版の部位説明' });
renderComparison('/tsubo/compare?a=GV20&b=ST36');
assert.deepEqual(nodes(positionGrid()).filter(node => node.type === 'svg').map(node => node.props['aria-label']), ['百会', '足三里'], 'Non-default points both show their diagrams');
assert(text(positionGrid()).includes(atlasLocations.getAtlasLocationSimple('gv20')), 'Comparison shows the same verified location as the atlas');
assert(text(positionGrid()).includes(atlasLocations.getAtlasLocationSimple('st36')), 'Comparison uses the same canonical location for specialized figure entries');
assert(!text(positionGrid()).includes('旧版の部位説明'));
assert(nodes(positionGrid()).some(node => node.type === Link && node.props.href === '/tsubo/gv20#acupoint-location'));
assert(nodes(positionGrid()).some(node => node.type === Link && node.props.href === '/tsubo/st36#acupoint-location'));

renderComparison('/tsubo/compare?a=li4&b=lr3&c=st36');
compareInput().props.onChange({ target: { value: 'GV20' } }); renderComparison();
const fourthCandidate = { currentTarget: { focus() { comparisonFocus = 'GV20-result'; } } };
compare.button('百会GV20 / 検証経絡').props.onClick(fourthCandidate); renderComparison();
assert(dialog.open, 'Choosing a fourth point opens a native modal');
assert.equal(comparisonFocus, 'GV20-result', 'The native dialog has a named trigger to restore');
assert(text(swap()).includes('百会（GV20）'));
compare.button('キャンセル').props.onClick(); renderComparison();
assert(!dialog.open && comparisonHref === '/tsubo/compare?a=li4&b=lr3&c=st36', 'Cancel preserves the comparison and its address');
compare.button('百会GV20 / 検証経絡').props.onClick(fourthCandidate); renderComparison();
compare.button('太衝（LR3）と入れ替える').props.onClick(); renderComparison();
assert(!dialog.open && comparisonHref === '/tsubo/compare?a=li4&b=gv20&c=st36', 'Confirmed replacement changes only the chosen position');
assert.equal(comparisonFocus, 'tsubo-compare-result-title', 'The updated comparison regains focus');
renderComparison('/tsubo/compare?a=LI99');
assert(!positionGrid() && comparePicker().props.open, 'An explicit unknown code does not silently open the example comparison');
assert(text(compare.tree()).includes('URLで指定されたツボのうち1穴が見つかりませんでした。'));
renderComparison('/tsubo/compare?a=lr3&b=LI99&c=ST36');
assert.deepEqual(nodes(positionGrid()).filter(node => node.type === 'svg').map(node => node.props['aria-label']), ['太衝', '足三里']);
assert(text(compare.tree()).includes('URLで指定されたツボのうち1穴が見つかりませんでした。'));

const publicAtlas = load('src/data/acupointLookup');
const gorou = client('src/components/GorouWorkstyleChecker.tsx', {
  'next/link': { __esModule: true, default: Link },
  '@/data/acupointLookup': publicAtlas,
});
gorou.render();
assert.doesNotMatch(text(gorou.tree()), /学習用.{0,5}点数|\/100/);
assert(!nodes(gorou.tree()).some(node => node.props?.href === '#gorou-rest-heading'), 'The examples shortcut is hidden until a choice is made');
for (const label of ['久視（きゅうし）', '久坐（きゅうざ）', '久立（きゅうりつ）', '久行（きゅうこう）', '久臥（きゅうが）']) {
  const choice = nodes(gorou.tree()).find(node => node.type === 'button' && text(node).includes(label));
  assert(choice, label);
  assert.equal(choice.props['aria-pressed'], false);
  choice.props.onClick();
  gorou.render();
}
const selectedPassages = nodes(gorou.tree()).find(node => node.props?.['aria-labelledby'] === 'gorou-rest-heading');
assert(selectedPassages, 'Selected actions show the classical account beside the rest examples');
assert(nodes(gorou.tree()).some(node => node.type === 'a' && node.props.href === '#gorou-rest-heading' && text(node).includes('休憩・動作の例を見る')));
assert(nodes(gorou.tree()).some(node => node.props?.id === 'gorou-rest-heading' && node.props.tabIndex === -1), 'The examples shortcut has a focusable target');
for (const passage of ['久視傷血', '久坐傷肉', '久立傷骨', '久行傷筋', '久臥傷気']) assert(text(selectedPassages).includes(passage), passage);
assert.doesNotMatch(text(gorou.tree()), /学習用.{0,5}点数|\/100/);
for (const code of ['ST36', 'KI1', 'BL57', 'CV17']) {
  const point = publicAtlas.ACUPOINT_LOOKUP.find(entry => entry.code === code);
  const pointDisclosure = nodes(selectedPassages).find(node => node.type === 'details' && text(node).includes(point.locationSimple));
  assert(pointDisclosure && !pointDisclosure.props.open, code + ' keeps the verified atlas description in a separate, optional learning section');
  for (const anchor of ['acupoint-location', 'acupoint-cautions']) {
    assert(nodes(pointDisclosure).some(node => node.type === Link && node.props.href === '/tsubo/' + code.toLowerCase() + '#' + anchor), code + ' links to ' + anchor);
  }
}
assert.match(text(gorou.tree()), /太陽（たいよう）.*奇穴/);
assert.doesNotMatch(text(gorou.tree()), /指4本分|ぐっと押し込む|ゴルフボール|乳頭を結んだ線|トントンと優しくタッピング/);

const perspectiveOverrides = {
  'next/link': { __esModule: true, default: Link },
  '@/data/acupointLookup': publicAtlas,
};
for (const [initialCaseId, codes] of [
  ['gerd-gastric', ['CV12', 'PC6', 'ST36', 'LR3']],
  ['headache-migraine', ['GB20', 'LI4', 'LR3', 'GV20']],
  ['insomnia-autonomic', ['HT7', 'KI1', 'PC6']],
]) {
  const perspective = client('src/components/EastWestIntegrativeSwitch.tsx', perspectiveOverrides);
  perspective.render({ initialCaseId });
  for (const code of codes) {
    const point = publicAtlas.ACUPOINT_LOOKUP.find(entry => entry.code === code);
    const card = nodes(perspective.tree()).find(node => node.type === 'button' && text(node).includes(point.name + code));
    assert(card, `${initialCaseId}: correct name and code on the ${code} card`);
    card.props.onClick();
    perspective.render({ initialCaseId });
    const dialog = nodes(perspective.tree()).find(node => node.props?.role === 'dialog');
    assert(dialog, `${initialCaseId}: ${code} detail opens`);
    assert(text(dialog).includes(point.locationSimple), `${code} uses the atlas location`);
    for (const anchor of ['acupoint-location', 'acupoint-cautions']) {
      assert(nodes(dialog).some(node => node.type === Link && node.props.href === `/tsubo/${code.toLowerCase()}#${anchor}`), `${code} links to ${anchor}`);
    }
    assert.doesNotMatch(text(dialog), /主治・適応症|取穴法|配穴の真髄/);
    perspective.button('閉じる').props.onClick();
    perspective.render({ initialCaseId });
  }
  if (initialCaseId === 'insomnia-autonomic') {
    const extra = nodes(perspective.tree()).find(node => node.type === 'button' && text(node).includes('安眠図鑑対象外'));
    assert(extra, 'The 安眠 card distinguishes the extra point');
    extra.props.onClick();
    perspective.render({ initialCaseId });
    const dialog = nodes(perspective.tree()).find(node => node.props?.role === 'dialog');
    assert.match(text(dialog), /奇穴（全361穴の範囲外）/);
    assert.doesNotMatch(text(dialog), /EX-HN16|位置の目安|頭部・顔面/);
    assert(!nodes(dialog).some(node => node.type === Link), 'An extra point must not link to a standard atlas page');
  }
}

const simulatorTimers = [];
const simulator = client('src/components/ThreeStageSimulator.tsx', {
  ...perspectiveOverrides,
  '@/data/simulatorData': load('src/data/simulatorData'),
  '@/utils/analytics': { trackEvent() {} },
}, {
  window: {
    location: { search: '?fromTsubo=li4&tsuboName=' + encodeURIComponent('足三里') },
    addEventListener() {},
    removeEventListener() {},
  },
  setTimeout(callback) { simulatorTimers.push(callback); },
  clearTimeout() {},
});
simulator.render();
simulatorTimers.splice(0).forEach(callback => callback());
simulator.render();
assert.match(text(simulator.tree()), /参照元：合谷（LI4）/);
assert.doesNotMatch(text(simulator.tree()), /参照元：足三里（LI4）/);
simulator.button('位置の目安を見る').props.onClick();
simulator.render();
const simulatorPoint = publicAtlas.ACUPOINT_LOOKUP.find(entry => entry.code === 'LR3');
const simulatorDialog = nodes(simulator.tree()).find(node => node.props?.role === 'dialog');
assert.equal(simulatorDialog.props['aria-label'], '太衝の詳細情報');
assert(text(simulatorDialog).includes(simulatorPoint.locationSimple));
assert.doesNotMatch(text(simulatorDialog), /解剖学・骨度法取穴|配穴の極意/);
for (const anchor of ['acupoint-location', 'acupoint-cautions']) {
  assert(nodes(simulatorDialog).some(node => node.type === Link && node.props.href === `/tsubo/lr3#${anchor}`));
}

// Parse the actual style artifact and check the two fixed axes plus print recovery.
const sheet = postcss.parse(fs.readFileSync(path.join(root, 'src/app/tablet-usability.css'), 'utf8'));
const rules = [];
sheet.walkRules(rule => rules.push(rule));
const declares = (selector, property, value) => rules.some(rule => rule.selector === selector && rule.nodes.some(node => node.prop === property && node.value === value));
assert(declares('html[data-navigation-layout="compact"] .clinical-workspace-actions', 'bottom', 'var(--mobile-nav-height, 68px)'), 'Compact headers above 1024px keep workspace actions clear of the visible lower navigation');
assert(declares('.tsubo-compare-table thead th', 'top', '0'));
assert(declares('.tsubo-compare-table tr > :first-child', 'left', '0'));
assert(declares('.tsubo-compare-table thead tr > :first-child', 'z-index', '4'));
assert(rules.some(rule => rule.parent.type === 'atrule' && rule.parent.params === 'screen and (max-width: 899px)' && rule.selector === '.tsubo-compare-scroll' && rule.nodes.some(node => node.prop === 'overflow' && node.value === 'visible')), 'The narrow comparison uses page scrolling');
assert(rules.some(rule => rule.parent.type === 'atrule' && rule.parent.params === 'print' && rule.selector === '.tsubo-compare-scroll' && rule.nodes.some(node => node.prop === 'overflow' && node.value === 'visible')), 'Printing does not clip the scrolling table');
assert(rules.some(rule => rule.parent.type === 'atrule' && rule.parent.params === 'print' && rule.selector === '.tsubo-compare-table thead th, .tsubo-compare-table tr > :first-child' && rule.nodes.some(node => node.prop === 'position' && node.value === 'static')), 'Print rules use equal specificity to disable both sticky axes');
assert(declares('.tsubo-compare-page :is(button, input), .anatomy-viewer :is(button, a)', 'min-height', '44px'));

async function checkComparisonHeader() {
  const emptyComponent = { __esModule: true, default: () => null };
  const DictionaryReturnLink = () => null;
  const page = client('src/app/tsubo/compare/page.tsx', {
    '@/config/seo': { pageSocialMetadata: () => ({}), seriesPageTitle: title => title },
    '@/components/tsubo/AtlasDictionaryReturnLink': { __esModule: true, default: DictionaryReturnLink },
    '@/components/tsubo/HeguAtlasPreview': { heguAtlasReading: { traditional: '', caution: '' } },
    '@/components/tsubo/atlas/HeguHandDiagram': emptyComponent,
    '@/components/tsubo/atlas/PointAtlasDiagrams': { PointAtlasThumbnail: () => null },
    '@/data/tsubo': {
      ALL_ACUPOINTS: TSUBOS.map(point => ({ ...point, codeLower: point.id, legacyId: point.id, categories: point.category })),
      DETAILED_ACUPOINTS: {},
    },
    '@/data/tsubo/atlas/articles': { ATLAS_ARTICLES: Object.fromEntries(TSUBOS.map(point => [point.id, { traditional: [''], cautions: [''] }])) },
    '@/data/tsubo/atlas/evidence': { getAcupointStudies: () => [] },
    '@/data/tsubo/atlas/featuredPairs': { ACUPOINT_PAIRS_PATH: '/tsubo/pairs', featuredPairAnchor: id => 'featured-acupoint-pair-' + id, featuredPairs: [{ id: 'four-gates' }] },
    '@/data/tsubo/friendlyLocations': atlasLocations,
    '@/data/tsubo/atlas/traditionalUses': { TRADITIONAL_POINT_USES: {} },
    '@/data/tsubo/atlas/safetyNotices': load('src/data/tsubo/atlas/safetyNotices'),
    '@/data/tsubo/keyPointTypes': load('src/data/tsubo/keyPointTypes'),
    '@/data/tsubo/atlas/markers': { ATLAS_POINT_MARKERS: {} },
    './CompareClient': emptyComponent,
    './compare-flow.css': {},
    './selection': comparisonSelection,
  });
  for (const params of [{}, { a: 'lr3', b: 'li4' }, { a: 'lr3' }, { a: 'li4', b: 'lr3', c: 'st36' }, { a: 'li4', b: 'lr3', from: 'pairs', pair: 'four-gates' }]) {
    const tree = await page.render({ searchParams: Promise.resolve(params) });
    const header = nodes(tree).find(node => node.type === 'header');
    assert.equal(nodes(header).filter(node => node.type === DictionaryReturnLink).length, 1, 'Comparison header offers a single return to the dictionary');
    assert.equal(nodes(header).some(node => node.props?.href === '/tsubo/pairs?return=1#featured-acupoint-pair-four-gates'), params.from === 'pairs', 'Only pair-directory visits receive a return link');
    const links = nodes(header).filter(node => node.props?.['data-analytics-action'] === 'compare_case');
    assert.equal(links.length, 0, 'Case links follow the diagrams rather than appearing in the heading');
  }
}

checkComparisonHeader().then(() => {
  console.log('Tablet usability regression passed: shared header layout, retained custom slots, measured gutters, published anatomy selection, keyboard/reset synchronization, labeled two-axis comparison, case shortcuts, fixed headers and print recovery.');
}).catch(error => { console.error(error); process.exitCode = 1; });
