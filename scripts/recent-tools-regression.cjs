/* eslint-disable @typescript-eslint/no-require-imports -- Offline navigation and history migration checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
const savedValues = new Map();
const browserStorage = { getItem: key => savedValues.get(key) ?? null, setItem: (key, value) => savedValues.set(key, value) };
function load(relative) {
  let file = path.resolve(root, relative);
  if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(js, { exports, URL, window: {}, localStorage: browserStorage, require: id => id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) }, { filename: file });
  return exports;
}
const { RECENT_TOOL_CATALOG, RECENT_TOOLS_STORAGE_KEY, recentToolHref, readRecentToolPaths, updateRecentToolPaths } = load('src/utils/recentTools');
assert.equal(RECENT_TOOLS_STORAGE_KEY, 'haritaro_recent_tools', 'old storage is retained');
assert.equal(new Set(RECENT_TOOL_CATALOG.map(tool => tool.href)).size, RECENT_TOOL_CATALOG.length);
assert.equal(recentToolHref('/notes', 'learning'), null);
assert.equal(recentToolHref('/notes'), null);
assert.equal(recentToolHref('/diagnosis', 'gorou'), '/diagnosis?tab=gorou');
assert.equal(recentToolHref('/diagnosis'), '/diagnosis');
assert.equal(recentToolHref('/diagnosis', 'clinical'), null, 'The hidden interview mode never enters public history');
assert.equal(JSON.stringify(readRecentToolPaths(JSON.stringify(['/diagnosis?tab=clinical&patientId=private', '/tsubo']))), '["/tsubo"]', 'Old interview entries are hidden without losing other history');
assert.equal(recentToolHref('/kokushi'), '/learn/review', 'Visiting a retired bookmark records the current lecture-review destination');
assert.equal(recentToolHref('/kokushi/', 'private-text'), '/learn/review');
for (const tab of ['patient-1', 'learning&text=secret', 'gorou&name=secret', 'unknown']) {
  assert.equal(recentToolHref('/notes', tab), null);
  assert.equal(recentToolHref('/diagnosis', tab), '/diagnosis');
}
assert.equal(recentToolHref('/notes/patient-id', 'learning'), null);
assert.equal(recentToolHref('/diagnosis-patient', 'gorou'), null);
assert.equal(readRecentToolPaths('bad json').length, 0);
assert.equal(readRecentToolPaths('{"patientId":"private"}').length, 0);
assert.equal(JSON.stringify(updateRecentToolPaths('bad json', '/diagnosis', 'gorou')), '["/diagnosis?tab=gorou"]', 'bad storage repairs on the next known visit');
const migrated = readRecentToolPaths(JSON.stringify([
  '/notes?tab=learning&sourceType=case&sourceId=fatigue-reasoning&reason=free-text#private',
  '/diagnosis?tab=gorou&patientId=secret&complaint=private',
  '/notes?patientId=secret', '/notes', '/library', '/tsubo',
]));
assert.equal(JSON.stringify(migrated), '["/diagnosis?tab=gorou","/library","/tsubo"]');
for (const href of migrated) assert(!/patient|source|reason|complaint|#/.test(href));
const old = JSON.stringify(['/notes', '/diagnosis', '/library', '/tsubo']);
assert.equal(JSON.stringify(readRecentToolPaths(old)), '["/diagnosis","/library","/tsubo"]', 'Retired entries are removed without affecting other history');
let history = updateRecentToolPaths(old, '/diagnosis', 'clinical');
assert.equal(history[0], '/diagnosis');
history = updateRecentToolPaths(JSON.stringify(history), '/diagnosis', 'gorou');
assert.deepEqual(Array.from(history), ['/diagnosis?tab=gorou', '/diagnosis', '/library', '/tsubo']);
const bad = JSON.stringify(['https://evil.example/notes?tab=learning', '//evil.example/notes', '/notes/patient-id', 4, {}, null, '/missing']);
assert.equal(readRecentToolPaths(bad).length, 0);
assert.equal(JSON.stringify(updateRecentToolPaths(old, '/notes/patient-id', 'learning')), '["/diagnosis","/library","/tsubo"]', 'unlisted routes cannot add patient-specific paths');
assert(!RECENT_TOOL_CATALOG.some(tool => /^\/(?:notes|clinical\/workspace)\b/.test(tool.href)));
const migratedExamHistory = readRecentToolPaths(JSON.stringify([
  '/kokushi?examId=kokushi-33-toyo-71&answer=private#old-question',
  '/learn/review?resumeReview=private#learning-review', '/tsubo', '/notes', '/library',
]));
assert.equal(JSON.stringify(migratedExamHistory), '["/learn/review","/tsubo","/library"]', 'Old and current review history merge without losing other public destinations or retaining question IDs');
assert.equal(JSON.stringify(updateRecentToolPaths(JSON.stringify(['/library', '/kokushi', '/notes', '/tsubo']), '/learn/review')), '["/learn/review","/library","/tsubo"]', 'A new review visit moves the migrated history item instead of creating a duplicate');

const { NAV_STORAGE_KEY, DEFAULT_NAV_CONFIG, loadNavUserConfig, NAV_PRESETS, getNavigationSection, isNavigationItemActive, getCurrentBottomNavItem } = load('src/config/navigationItems');
function configuredNav(items, preset = 'student') {
  savedValues.set(NAV_STORAGE_KEY, JSON.stringify({ version: 1, items, updatedAt: '2026-10-03', preset }));
  return loadNavUserConfig();
}
assert.equal(JSON.stringify(configuredNav(['kokushi', 'haiketsu', 'notes', 'library']).items), '["review","haiketsu","symptoms","library"]', 'A single legacy exam shortcut migrates in place and preserves the other three choices');
assert.equal(JSON.stringify(configuredNav(['kokushi', 'review', 'haiketsu', 'cases']).items), '["review","haiketsu","cases","tsubo"]', 'Alias collision removes only the duplicate and fills the missing fourth slot from defaults');
assert.equal(JSON.stringify(configuredNav(['review', 'kokushi', 'library', 'notes']).items), '["review","library","symptoms","tsubo"]', 'Either alias order keeps other user choices and yields four unique shortcuts');
const unchanged = configuredNav(['simulator', 'haiketsu', 'tsubo', 'notes']);
assert.equal(JSON.stringify(unchanged.items), '["simulator","haiketsu","tsubo","symptoms"]', 'Existing non-exam custom navigation stays unchanged');
assert.equal(unchanged.updatedAt, '2026-10-03', 'Migration does not invent a recent user edit date');

const oldStandardItems = ['tsubo', 'symptoms', 'curriculum', 'search'];
assert.equal(JSON.stringify(DEFAULT_NAV_CONFIG.items), '["tsubo","curriculum","clinical","search"]');
const oldStandard = configuredNav(oldStandardItems, 'standard');
assert.equal(JSON.stringify(oldStandard.items), JSON.stringify(DEFAULT_NAV_CONFIG.items), 'An unchanged saved standard preset follows the new order');
assert.equal(oldStandard.updatedAt, '2026-10-03');
assert.equal(JSON.stringify(configuredNav(oldStandardItems, null).items), JSON.stringify(oldStandardItems), 'The same order manually chosen is kept');
assert.equal(JSON.stringify(configuredNav(['symptoms', 'tsubo', 'curriculum', 'search'], 'standard').items), '["symptoms","tsubo","curriculum","search"]', 'A different saved order is preserved');

assert.equal(NAV_PRESETS.clinician.items[0], 'clinical', 'Clinician shortcuts begin with the public clinical home');
const oldClinician = configuredNav(['simulator', 'haiketsu', 'tsubo', 'notes'], 'clinician');
assert.equal(JSON.stringify(oldClinician.items), '["clinical","haiketsu","tsubo","cases"]', 'The unchanged legacy clinician preset opens the clinical home');
assert.equal(oldClinician.updatedAt, '2026-10-03');
assert.equal(JSON.stringify(configuredNav(['notes', 'haiketsu', 'tsubo', 'simulator'], 'clinician').items), '["symptoms","haiketsu","tsubo","simulator"]', 'A custom clinician arrangement is never silently replaced');
assert.equal(JSON.stringify(configuredNav(['haiketsu', 'workspace', 'tsubo', 'library']).items), '["haiketsu","clinical","tsubo","library"]', 'A workspace shortcut opens the clinical home and keeps the other choices');
assert.equal(JSON.stringify(configuredNav(['clinical', 'workspace', 'tsubo', 'library']).items), '["clinical","tsubo","library","symptoms"]', 'An existing clinical home shortcut stays unique');
for (const route of ['/clinical', '/clinical/workspace', '/clinical/symptoms/neck-shoulder', '/simulator/compare', '/practice/haiketsu', '/tsubo/compare']) assert.equal(getNavigationSection(route), 'clinical', route + ' belongs to the clinical category');
assert.equal(getNavigationSection('/notes'), null, 'The retired notebook is outside public navigation');
assert.equal(getNavigationSection('/tsubo/LI4'), 'dictionary');
assert.equal(getNavigationSection('/curriculum/lecture-intro-1'), 'learn');
assert.equal(getNavigationSection('/clinical-not-a-route'), null, 'Category matching respects route boundaries');
assert(!isNavigationItemActive('clinical', '/clinical/workspace'));
assert(isNavigationItemActive('clinical', '/clinical'));
assert(isNavigationItemActive('tsubo_compare', '/tsubo/compare'));
assert(!isNavigationItemActive('tsubo', '/tsubo/compare'), 'The comparison page does not select the point dictionary at the same time');
assert(isNavigationItemActive('clinical_guides', '/clinical/symptoms/neck-shoulder'));
for (const [route, item] of [
  ['/tsubo/pc6', 'tsubo'], ['/symptoms/headache-stiff-neck', 'tsubo'],
  ['/learn/review', 'curriculum'], ['/learn/lectures/assessment-basics', 'curriculum'],
  ['/cases', 'clinical'], ['/cases/case-01-headache-liver-fire', 'clinical'],
  ['/clinical/symptoms/shoulder', 'clinical'], ['/practice/haiketsu', 'clinical'],
  ['/search', undefined], ['/', undefined],
]) assert.equal(getCurrentBottomNavItem(DEFAULT_NAV_CONFIG.items, route), item, route);
assert.equal(getCurrentBottomNavItem(['curriculum', 'review'], '/learn/review'), 'review');
assert.equal(getCurrentBottomNavItem(['clinical', 'cases'], '/cases/case-01-headache-liver-fire'), 'cases');
assert.equal(getCurrentBottomNavItem(['clinical', 'tsubo', 'tsubo_compare'], '/tsubo/compare'), 'tsubo_compare');
assert.equal(getCurrentBottomNavItem(['tsubo', 'symptoms'], '/symptoms/headache-stiff-neck'), 'symptoms');
for (const [tab, expectedId] of [['', 'diagnosis'], ['unknown', 'diagnosis'], ['clinical', 'diagnosis'], ['gorou', 'gorou']]) {
  const params = new URLSearchParams(tab ? 'tab=' + tab : '');
  const active = ['diagnosis', 'gorou'].filter(id => isNavigationItemActive(id, '/diagnosis', params));
  assert.equal(JSON.stringify(active), JSON.stringify([expectedId]), 'Each diagnosis mode selects exactly one shortcut: ' + tab);
}
assert.equal(JSON.stringify(configuredNav(['clinical_interview', 'haiketsu', 'gorou', 'simulator_compare']).items), '["diagnosis","haiketsu","gorou","simulator_compare"]', 'A saved interview shortcut now opens the constitution check and preserves other choices');
assert.equal(JSON.stringify(configuredNav(['diagnosis', 'clinical_interview', 'gorou', 'simulator_compare']).items), '["diagnosis","gorou","simulator_compare","tsubo"]', 'Existing self-check and interview shortcuts merge without losing other choices');
for (const items of [null, [], ['missing', 'notes', 'tsubo', 'search'], ['notes', 'tsubo', 'search'], [{ id: 'kokushi' }, 'notes', 'tsubo', 'search']]) {
  assert.equal(JSON.stringify(configuredNav(items).items), JSON.stringify(DEFAULT_NAV_CONFIG.items), 'Malformed navigation falls back to the safe defaults');
}
savedValues.set(NAV_STORAGE_KEY, 'broken json');
assert.equal(JSON.stringify(loadNavUserConfig().items), JSON.stringify(DEFAULT_NAV_CONFIG.items));
for (const preset of Object.values(NAV_PRESETS)) assert(!preset.items.includes('kokushi'), 'Public navigation presets no longer offer exam preparation');

// Keep the actual bottom-nav component mounted while only its query changes.
const React = require('react');
const navState = [], navExports = {};
let navCursor = 0, queryReads = 0, pathname = '/diagnosis', searchParams = new URLSearchParams();
const navReact = { ...React, useEffect() {}, useCallback: callback => callback,
  useState(initial) {
    const slot = navCursor++;
    if (!(slot in navState)) navState[slot] = typeof initial === 'function' ? initial() : initial;
    return [navState[slot], next => { navState[slot] = typeof next === 'function' ? next(navState[slot]) : next; }];
  },
  useRef(initial) {
    const slot = navCursor++;
    if (!(slot in navState)) navState[slot] = { current: initial };
    return navState[slot];
  },
};
const NavigationLink = () => null;
const navigationData = load('src/config/navigationItems');
const navFile = path.join(root, 'src/components/navigation/MobileBottomNav.tsx');
const navCode = ts.transpileModule(fs.readFileSync(navFile, 'utf8'), { fileName: navFile,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
vm.runInNewContext(navCode, { exports: navExports, require: id => {
  if (id === 'react') return navReact;
  if (id === 'next/link') return { __esModule: true, default: NavigationLink };
  if (id === 'next/navigation') return { usePathname: () => pathname, useSearchParams: () => { queryReads++; return searchParams; } };
  if (id === '@/config/navigationItems') return { ...navigationData, DEFAULT_NAV_CONFIG: { ...DEFAULT_NAV_CONFIG, items: ['diagnosis', 'gorou', 'review', 'curriculum'] } };
  if (id === '@/hooks/useViewportLayout') return { useViewportLayout() {} };
  if (id === '@/utils/siteMenu') return load('src/utils/siteMenu');
  if (id === './NavCustomizeModal') return { __esModule: true, default: () => null };
  return require(id);
} });
const boundary = navExports.default();
assert.equal(boundary.type, React.Suspense, 'Only the query-aware bottom nav is inside a local Suspense boundary');
assert.equal(boundary.props.fallback, null);
const BottomNavContent = boundary.props.children.type;
function navNodes(node, result = []) {
  if (Array.isArray(node)) { node.forEach(child => navNodes(child, result)); return result; }
  if (!node || typeof node !== 'object') return result;
  result.push(node); navNodes(node.props?.children, result); return result;
}
function activeNavHrefs() {
  navCursor = 0;
  return navNodes(BottomNavContent()).filter(node => node.type === NavigationLink && node.props['aria-current']).map(node => node.props.href);
}
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'The base diagnosis mode selects only the constitution check');
searchParams = new URLSearchParams('tab=gorou');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis?tab=gorou"]', 'A query-only change updates the mounted navigation to Gorou without selecting both modes');
searchParams = new URLSearchParams('tab=unknown');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'An unrecognized mode falls back to the constitution check');
searchParams = new URLSearchParams();
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'Removing the query returns the active state without remounting');
pathname = '/learn/review';
assert.equal(JSON.stringify(activeNavHrefs()), '["/learn/review#learning-review"]', 'Lecture review does not simultaneously select the general learning shortcut');
pathname = '/curriculum/lecture-intro-1';
assert.equal(JSON.stringify(activeNavHrefs()), '["/learn"]', 'A lecture still selects the general learning shortcut');
navState[0] = { ...navState[0], items: ['diagnosis', 'gorou', 'tsubo', 'simulator_compare'] };
pathname = '/diagnosis'; searchParams = new URLSearchParams('tab=clinical');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'An old interview query selects the public constitution check');
searchParams = new URLSearchParams('tab=gorou');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis?tab=gorou"]');
searchParams = new URLSearchParams();
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'Saved self-check shortcuts retain their base destination');
assert.equal(queryReads, 9, 'Every render reads the subscribed search params instead of a cached initial URL');
navState[0] = DEFAULT_NAV_CONFIG;
pathname = '/learn/review';
assert.equal(JSON.stringify(activeNavHrefs()), '["/learn"]');
pathname = '/cases/case-01-headache-liver-fire';
assert.equal(JSON.stringify(activeNavHrefs()), '["/clinical"]');
console.log('Recent tools regression passed: public history privacy, preset and retired-shortcut migration, saved custom choices, corrupted storage recovery, and single selection for section, destination, and query changes.');
