/* eslint-disable @typescript-eslint/no-require-imports -- Test the real shared menu event and focus handlers offline. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const load = createDataLoader({});
const nav = load('src/config/navigationItems');
const menu = load('src/utils/siteMenu');
const events = new Map(), documentEvents = new Map(), instances = new Map(), frames = new Map();
let activeHooks, dirty = false, nextFrame = 1, desktop = false, pathname = '/clinical/workspace';
const pendingEffects = [];
const add = (map, name, callback) => { if (!map.has(name)) map.set(name, new Set()); map.get(name).add(callback); };
const remove = (map, name, callback) => map.get(name)?.delete(callback);
function emit(map, event) { for (const callback of [...(map.get(event.type) || [])]) callback(event); }
class BrowserEvent { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } }
class Element {
  constructor() { this.children = []; this.isConnected = true; this.props = {}; this.parent = null; }
  contains(target) { return target === this || this.children.some(child => child.contains(target)); }
  getClientRects() {
    const hidden = element => {
      const className = element.props.className || '';
      return className.includes('header-desktop') && !desktop || className.includes('header-compact') && desktop || Boolean(element.parent && hidden(element.parent));
    };
    return this.isConnected && !hidden(this) ? [1] : [];
  }
  getBoundingClientRect() { return { height: 60 }; }
  focus() { document.activeElement = this; }
  querySelector() { return flatten(this).find(child => ['button', 'a', 'summary'].includes(child.type)) ?? null; }
}
function flatten(element) { return element.children.flatMap(child => [child, ...flatten(child)]); }
const document = {
  activeElement: null,
  documentElement: { style: { setProperty() {} } },
  getElementById(id) { return [...instances.values()].find(element => element.isConnected && element.props.id === id) ?? null; },
  querySelector() { return null; },
  addEventListener(name, callback) { add(documentEvents, name, callback); },
  removeEventListener(name, callback) { remove(documentEvents, name, callback); },
};
const window = {
  location: { search: '' },
  addEventListener(name, callback) { add(events, name, callback); },
  removeEventListener(name, callback) { remove(events, name, callback); },
  dispatchEvent(event) { emit(events, event); return true; },
  matchMedia() { return { matches: desktop, addEventListener() {}, removeEventListener() {} }; },
};
const hooks = {
  ...React,
  useState(initial) {
    const owner = activeHooks, index = owner.cursor++;
    if (!(index in owner.state)) owner.state[index] = typeof initial === 'function' ? initial() : initial;
    return [owner.state[index], value => { const next = typeof value === 'function' ? value(owner.state[index]) : value; if (!Object.is(next, owner.state[index])) { owner.state[index] = next; dirty = true; } }];
  },
  useRef(initial) { const owner = activeHooks, index = owner.cursor++; if (!(index in owner.state)) owner.state[index] = { current: initial }; return owner.state[index]; },
  useId() { const index = activeHooks.cursor++; return 'header-' + index; },
  useCallback(callback, deps) { const owner = activeHooks, index = owner.cursor++; const previous = owner.state[index]; if (!previous || deps.some((dep, i) => !Object.is(dep, previous.deps[i]))) owner.state[index] = { deps, callback }; return owner.state[index].callback; },
  useEffect(effect, deps) {
    const owner = activeHooks, index = owner.cursor++, previous = owner.state[index];
    if (!previous || !deps || deps.some((dep, i) => !Object.is(dep, previous.deps?.[i]))) {
      owner.state[index] = { deps, cleanup: previous?.cleanup };
      pendingEffects.push(() => { owner.state[index].cleanup?.(); owner.state[index].cleanup = effect(); });
    }
  },
};
const Link = () => null, Customize = () => null, SearchModal = () => null;
let savedDrawerOpened = 0, installRequested = 0;
add(events, 'haritaro:install-app', () => installRequested++);
function component(relative) {
  const filename = path.join(root, relative), exports = {};
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    exports, window, document, URLSearchParams, HTMLElement: Element, Node: Element, Event: BrowserEvent, CustomEvent: BrowserEvent,
    requestAnimationFrame(callback) { const id = nextFrame++; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    ResizeObserver: class { observe() {} disconnect() {} }, MutationObserver: class { observe() {} disconnect() {} },
    setTimeout() { return 1; }, clearTimeout() {},
    require: id => {
      if (id === 'react') return hooks;
      if (id === 'next/link') return { __esModule: true, default: Link };
      if (id === 'next/dynamic') return { __esModule: true, default: () => SearchModal };
      if (id === 'next/navigation') return { usePathname: () => pathname, useSearchParams: () => new URLSearchParams() };
      if (id === '@/config/navigationItems') return nav;
      if (id === '@/utils/siteMenu') return menu;
      if (id === '@/contexts/ClinicalMemoContext') return { useClinicalMemo: () => ({ clipCount: 2, patientNoteCount: 1, openDrawer() { savedDrawerOpened++; } }) };
      if (id === '@/contexts/AuthContext') return { useAuth: () => ({ user: { name: '確認用' }, isPremium: false, isLoading: false }) };
      if (id === '@/hooks/useViewportLayout') return { useViewportLayout() {} };
      if (id === './NavCustomizeModal') return { __esModule: true, default: Customize };
      if (id.startsWith('./') || id === '@/components/brand/BrandLogo') return { __esModule: true, default: () => null };
      return require(id);
    },
  }, { filename });
  return exports.default;
}
const Header = component('src/components/Header.tsx');
const BottomBoundary = component('src/components/navigation/MobileBottomNav.tsx');
const Bottom = BottomBoundary().props.children.type;
const owners = [{ name: 'header', component: Header, state: [], cursor: 0 }, { name: 'bottom', component: Bottom, state: [], cursor: 0 }];
function nodes(node, result = []) {
  if (Array.isArray(node)) node.forEach(child => nodes(child, result));
  else if (node && typeof node === 'object') { result.push(node); nodes(node.props?.children, result); }
  return result;
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  return node && typeof node === 'object' ? text(node.props?.children) : node == null || typeof node === 'boolean' ? '' : String(node);
}
function mount(node, prefix, parent = null) {
  if (Array.isArray(node)) { node.forEach((child, i) => mount(child, prefix + '-' + i, parent)); return; }
  if (!node || typeof node !== 'object') return;
  if (typeof node.type !== 'string' && node.type !== Link) { mount(node.props?.children, prefix + '-f', parent); return; }
  let element = instances.get(prefix);
  if (!element) { element = new Element(); instances.set(prefix, element); }
  element.props = node.props; element.type = node.type === Link ? 'a' : node.type; element.parent = parent; element.isConnected = true; element.children = [];
  if (parent) parent.children.push(element);
  if (typeof node.props.ref === 'function') node.props.ref(element);
  else if (node.props.ref) node.props.ref.current = element;
  mount(node.props.children, prefix + '-c', element);
}
function render() {
  for (let pass = 0; pass < 10; pass++) {
    dirty = false;
    for (const element of instances.values()) element.isConnected = false;
    for (const owner of owners) { activeHooks = owner; owner.cursor = 0; owner.tree = owner.component(); mount(owner.tree, owner.name); }
    while (pendingEffects.length) pendingEffects.shift()();
    if (!dirty) return;
  }
  throw Error('Unexpected render loop');
}
function flushFrames() { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); render(); }
function byId(id) { return nodes(owners[0].tree).concat(nodes(owners[1].tree)).find(node => node.props?.id === id); }
function button(label) { const found = nodes(owners[0].tree).filter(node => node.type === 'button' && (node.props['aria-label'] === label || text(node) === label)).at(-1); assert(found, 'Available button ' + label); return found; }
function topTrigger() { return nodes(owners[0].tree).find(node => node.type === 'button' && node.props['aria-controls'] === menu.SITE_MENU_ID); }
function clickBottom() { document.getElementById('mobile-more-trigger').focus(); byId('mobile-more-trigger').props.onClick(); render(); flushFrames(); }
function openFromTop() { const top = topTrigger(); top.props.ref.current.focus(); top.props.onClick({ currentTarget: top.props.ref.current }); render(); flushFrames(); }
render();
assert.equal(topTrigger().props['aria-controls'], byId('mobile-more-trigger').props['aria-controls'], 'Both controls reference the same panel');
assert.equal(byId(menu.SITE_MENU_ID), undefined);
clickBottom();
assert(byId(menu.SITE_MENU_ID), 'The bottom control opens the Header panel');
assert.equal(topTrigger().props['aria-expanded'], true);
assert.equal(byId('mobile-more-trigger').props['aria-expanded'], true);
assert.equal(nodes(owners[0].tree).filter(node => node.props?.id === menu.SITE_MENU_ID).length, 1, 'Only one site menu is rendered');
function expandedLinks(node, result = []) {
  if (Array.isArray(node)) node.forEach(child => expandedLinks(child, result));
  else if (node && typeof node === 'object') {
    if (['HeaderLinks', 'ClinicalMenu'].includes(node.type?.name)) expandedLinks(node.type(node.props), result);
    else { if (node.type === Link) result.push(node); expandedLinks(node.props?.children, result); }
  }
  return result;
}
const menuDestinations = expandedLinks(byId(menu.SITE_MENU_ID)).map(node => node.props.href);
for (const href of ['/glossary', '/tsubo/practice', '/kikei', '/simulator/compare', '/diagnosis?tab=gorou', '/symptoms', '/safety', '/notes?tab=learning']) assert(menuDestinations.includes(href), 'Existing secondary destination remains discoverable: ' + href);
pathname = '/diagnosis'; window.location.search = '?tab=gorou'; render();
const queryActive = expandedLinks(byId(menu.SITE_MENU_ID)).filter(node => node.props['aria-current'] === 'page').map(node => node.props.href);
assert(queryActive.includes('/diagnosis?tab=gorou'));
assert(!queryActive.includes('/diagnosis'), 'The shared panel distinguishes query-only diagnosis modes');
pathname = '/clinical/workspace'; window.location.search = ''; render();
let prevented = false;
emit(documentEvents, { type: 'keydown', key: 'Escape', preventDefault() { prevented = true; } }); render();
assert(prevented);
assert.equal(byId(menu.SITE_MENU_ID), undefined);
assert.equal(document.activeElement.props.id, 'mobile-more-trigger', 'Escape returns to the initiating lower control');
openFromTop();
button('メニューを閉じる').props.onClick(); render();
assert.equal(document.activeElement, topTrigger().props.ref.current, 'The menu close action returns to the initiating upper control');
clickBottom();
emit(documentEvents, { type: 'pointerdown', target: document.getElementById('mobile-more-trigger') }); render();
assert(byId(menu.SITE_MENU_ID), 'Pointer down on the lower trigger does not close then reopen the panel');
clickBottom();
assert.equal(byId(menu.SITE_MENU_ID), undefined, 'The lower control toggles the shared panel closed');
clickBottom();
const search = button('サイト内検索');
const searchElement = [...instances.values()].find(element => element.props === search.props); searchElement.focus(); search.props.onClick(); render();
assert.equal(byId(menu.SITE_MENU_ID), undefined);
const modal = nodes(owners[0].tree).find(node => node.type === SearchModal); assert(modal, 'Menu search hands over to the existing search modal');
modal.props.onClose(); render(); flushFrames();
assert.equal(document.activeElement.props.id, 'mobile-more-trigger', 'Closing search restores the persistent initiating control');
clickBottom();
button('下部メニューを編集').props.onClick(); render();
const customize = nodes(owners[1].tree).find(node => node.type === Customize); assert(customize, 'The unified menu keeps the shortcut editor');
assert.equal(customize.props.currentConfig.items.length, 4);
const custom = { ...nav.DEFAULT_NAV_CONFIG, items: ['workspace', 'haiketsu', 'tsubo', 'library'] };
customize.props.onSaved(custom); customize.props.onClose(); render();
assert.deepEqual(nodes(owners[1].tree).filter(node => node.type === Link).map(node => node.props.href), ['/clinical/workspace', '/practice/haiketsu', '/tsubo', '/library'], 'Existing four custom slots remain independently editable');
clickBottom();
const settings = nodes(owners[0].tree).filter(node => node.type?.name === 'HeaderSettings').at(-1); settings.props.onOpenInstall(); render();
assert.equal(installRequested, 1);
assert.equal(document.activeElement.props.id, 'mobile-more-trigger', 'Install guidance returns to a persistent control');
clickBottom();
button('保存一覧3件').props.onClick(); render();
assert.equal(savedDrawerOpened, 1, 'Saved items remain reachable');
clickBottom();
emit(documentEvents, { type: 'pointerdown', target: new Element() }); render();
assert.equal(byId(menu.SITE_MENU_ID), undefined, 'An outside pointer closes the disclosure');
clickBottom();
desktop = true; window.dispatchEvent(new BrowserEvent('resize')); flushFrames();
assert.equal(byId(menu.SITE_MENU_ID), undefined, 'The compact menu closes when its upper control becomes hidden');
assert.equal(byId('mobile-more-trigger').props['aria-expanded'], false);
assert(document.activeElement.getClientRects().length, 'Resize moves focus out of hidden menu contents to a visible desktop control');
assert(document.activeElement.props['aria-controls']?.endsWith('-account'));
console.log('Unified navigation regression passed: one panel for both controls, expanded state, toggle/Escape/outside/resize closure, initiating focus return, search/install/saved handoff, and preserved four-slot customization.');
