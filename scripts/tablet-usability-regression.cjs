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
const load = createDataLoader({});
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
  let cursor = 0, tree, Component;
  const react = { ...React,
    useState(initial) { const index = cursor++; if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial; return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next; }]; },
    useMemo(callback) { return callback(); },
    useCallback(callback) { return callback; },
    useRef(initial) { const index = cursor++; return state[index] ||= { current: initial }; },
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
    boundaryChild() { Component = Component().props.children.type; },
    render(props) { cursor = 0; tree = Component(props || {}); for (const node of nodes(tree)) if (node.props?.ref) { const element = globals.elementFor?.(node) || {}; if (typeof node.props.ref === 'function') node.props.ref(element); else node.props.ref.current = element; } while (effects.length) effects.shift()(); return tree; },
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
const customConfig = { ...navigation.DEFAULT_NAV_CONFIG, items: ['workspace', 'haiketsu', 'tsubo', 'library'] };
let navHeight = 72;
const bottom = client('src/components/navigation/MobileBottomNav.tsx', {
  'next/link': { __esModule: true, default: Link },
  'next/navigation': { usePathname: () => '/clinical/workspace', useSearchParams: () => new URLSearchParams() },
  '@/config/navigationItems': { ...navigation, loadNavUserConfig: () => customConfig },
  '@/utils/siteMenu': menuEvents,
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
assert.equal(customLinks(), '/clinical/workspace,/practice/haiketsu,/tsubo,/library');
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
assert.equal(customLinks(), '/clinical/workspace,/practice/haiketsu,/tsubo,/library', 'Rotation and font changes preserve all four custom slots');
bottom.unmount();

// Reuse exactly the published anatomy filter; an undrawn layer and the withheld needle
// cannot become new structure-name controls merely because they are in the model.
const structure = (id, name) => ({ id, name, description: `${name}の説明`, dangerLevel: 'safe' });
const model = {
  id: 'test', title: '検証用の断面', axes: { horizontal: ['左','右'], vertical: ['表','深'] },
  layers: [structure('skin','皮膚'), structure('muscle','筋'), structure('undrawn','非描画の構造'), structure('needle-indicator','非公開の針')],
  boundaries: [], adjacentStructures: [], references: [],
  svgElements: [
    { elementId: 'skin-shape', layerId: 'skin', shapeType: 'rect', x: 0, y: 0, width: 80, height: 20, label: '皮膚' },
    { elementId: 'muscle-shape', layerId: 'muscle', shapeType: 'circle', cx: 50, cy: 50, r: 5, label: '筋' },
    { elementId: 'muscle-second-shape', layerId: 'muscle', shapeType: 'rect', x: 40, y: 80, width: 80, height: 20, label: '筋' },
    { elementId: 'withheld', layerId: 'needle-indicator', shapeType: 'path', d: 'M0,0L50,50', label: '非公開の針' },
  ],
};
const anatomy = client('src/components/tsubo/CrossSectionViewer.tsx');
const anatomyProps = { model, pointName: '検証', pointCode: 'TEST' };
anatomy.render(anatomyProps);
const picker = () => nodes(anatomy.tree()).find(node => node.props?.className === 'anatomy-structure-picker');
assert.equal(nodes(picker()).filter(node => node.type === 'button').map(text).join(','), '皮膚,筋', 'Only drawn public structures have one large native control each');
assert(!text(picker()).includes('非描画') && !text(anatomy.tree()).includes('非公開の針'));
anatomy.button('筋').props.onClick(); anatomy.render(anatomyProps);
assert(anatomy.button('筋').props['aria-pressed']);
assert(text(anatomy.tree()).includes('筋の説明'));
const selectedSvg = nodes(anatomy.tree()).filter(node => ['rect','circle'].includes(node.type) && node.props['aria-pressed']);
assert.equal(selectedSvg.length, 2, 'All SVG shapes for the selected structure stay synchronized');
anatomy.button('筋').props.onClick(); anatomy.render(anatomyProps);
assert.equal(anatomy.button('筋').props['aria-pressed'], false, 'Pressing the same native control clears selection');
const skinShape = nodes(anatomy.tree()).find(node => node.props?.id === 'skin-shape');
let prevented = false;
skinShape.props.onKeyDown({ key: 'Enter', preventDefault() { prevented = true; } }); anatomy.render(anatomyProps);
assert(prevented); assert(anatomy.button('皮膚').props['aria-pressed'], 'The existing keyboard SVG selection updates the new control');
picker().props.onKeyDown({ key: 'Escape' }); anatomy.render(anatomyProps);
assert.equal(anatomy.button('皮膚').props['aria-pressed'], false);
anatomy.button('皮膚').props.onClick(); anatomy.render(anatomyProps);
anatomy.button('選択解除').props.onClick(); anatomy.render(anatomyProps);
assert(!nodes(picker()).filter(node => node.type === 'button').some(node => node.props['aria-pressed']));

// Compare markup keeps row/column semantics and all original selection behavior.
const tsubo = (code, name) => ({ id: code.toLowerCase(), code, name, kana: name, meridian: '検証経絡', bodyPart: '検証部位', category: [], indications: [], clinicalNote: '公開済みの補足', caution: '公開済みの注意', location: '公開済みの位置' });
const TSUBOS = [tsubo('LI4','合谷'), tsubo('LR3','太衝'), tsubo('ST36','足三里')];
let queryParams = new URLSearchParams(), premium = true, frameId = 0;
const comparisonFrames = new Map();
const compare = client('src/app/tsubo/compare/CompareClient.tsx', {
  'next/link': { __esModule: true, default: Link },
  'next/navigation': { useSearchParams: () => queryParams },
  '@/components/design/PageIntro': { __esModule: true, default: () => null },
  '@/components/auth/AuthModal': { __esModule: true, default: () => null },
  '@/contexts/AuthContext': { useAuth: () => ({ isPremium: premium }) },
  '@/contexts/ClinicalMemoContext': { useClinicalMemo: () => ({ addMemo() {} }) },
  '@/data/tsuboData': { TSUBOS },
}, { window: { print() {} }, document: { getElementById: () => ({ focus() {}, scrollIntoView() {} }) },
  requestAnimationFrame(callback) { comparisonFrames.set(++frameId, callback); return frameId; }, cancelAnimationFrame(id) { comparisonFrames.delete(id); },
});
compare.boundaryChild(); compare.render();
const scroll = () => nodes(compare.tree()).find(node => node.props?.className === 'tsubo-compare-scroll');
assert.equal(scroll().props.tabIndex, 0, 'The two-direction scrolling region is reachable by keyboard');
assert.equal(scroll().props.role, 'region');
assert.equal(scroll().props['aria-describedby'], nodes(compare.tree()).find(node => node.props?.id === 'tsubo-compare-scroll-hint').props.id);
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 3);
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'row').length, 6);
assert(nodes(scroll()).some(node => node.type === 'caption'));
compare.button('合谷を比較から外す').props.onClick(); compare.render();
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 2, 'Existing removal still updates the comparison columns');
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'row').length, 6);

premium = false; queryParams = new URLSearchParams('a=LI4&b=LR3&c=ST36'); compare.render();
for (const callback of comparisonFrames.values()) callback(); comparisonFrames.clear(); compare.render();
assert.equal(nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col').length, 3, 'URL synchronization retains the two-column free limit');
queryParams = new URLSearchParams('a=ST36&b=LI4'); compare.render();
queryParams = new URLSearchParams('a=LR3&b=ST36'); compare.render();
assert.equal(comparisonFrames.size, 1, 'A newer route cancels a pending older route selection');
for (const callback of comparisonFrames.values()) callback(); comparisonFrames.clear(); compare.render();
const comparisonHeaders = nodes(scroll()).filter(node => node.type === 'th' && node.props.scope === 'col');
assert(text(comparisonHeaders[1]).includes('太衝') && text(comparisonHeaders[2]).includes('足三里'), 'Only the latest route supplies the visible columns');

// Parse the actual style artifact and check the two fixed axes plus print recovery.
const sheet = postcss.parse(fs.readFileSync(path.join(root, 'src/app/tablet-usability.css'), 'utf8'));
const rules = [];
sheet.walkRules(rule => rules.push(rule));
const declares = (selector, property, value) => rules.some(rule => rule.selector === selector && rule.nodes.some(node => node.prop === property && node.value === value));
assert(declares('html[data-navigation-layout="compact"] .clinical-workspace-actions', 'bottom', 'var(--mobile-nav-height, 68px)'), 'Compact headers above 1024px keep workspace actions clear of the visible lower navigation');
assert(declares('.tsubo-compare-table thead th', 'top', '0'));
assert(declares('.tsubo-compare-table tr > :first-child', 'left', '0'));
assert(declares('.tsubo-compare-table thead tr > :first-child', 'z-index', '4'));
assert(rules.some(rule => rule.parent.type === 'atrule' && rule.parent.params === 'print' && rule.selector === '.tsubo-compare-scroll' && rule.nodes.some(node => node.prop === 'overflow' && node.value === 'visible')), 'Printing does not clip the scrolling table');
assert(rules.some(rule => rule.parent.type === 'atrule' && rule.parent.params === 'print' && rule.selector === '.tsubo-compare-table thead th, .tsubo-compare-table tr > :first-child' && rule.nodes.some(node => node.prop === 'position' && node.value === 'static')), 'Print rules use equal specificity to disable both sticky axes');
assert(declares('.tsubo-compare-page :is(button, input), .anatomy-viewer :is(button, a)', 'min-height', '44px'));
console.log('Tablet usability regression passed: shared header layout, retained custom slots, measured gutters, published anatomy selection, keyboard/reset synchronization, labeled two-axis comparison, fixed headers and print recovery.');
