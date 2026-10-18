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
assert.equal(recentToolHref('/notes', 'learning'), '/notes?tab=learning');
assert.equal(recentToolHref('/notes'), '/notes');
assert.equal(recentToolHref('/diagnosis', 'gorou'), '/diagnosis?tab=gorou');
assert.equal(recentToolHref('/diagnosis'), '/diagnosis');
assert.equal(recentToolHref('/diagnosis', 'clinical'), '/diagnosis?tab=clinical', 'The direct interview mode remains distinct in public recent history');
assert.equal(JSON.stringify(readRecentToolPaths(JSON.stringify(['/diagnosis?tab=clinical&patientId=private']))), '["/diagnosis?tab=clinical"]', 'Interview history keeps only the fixed public mode');
assert.equal(recentToolHref('/kokushi'), '/learn/review', 'Visiting a retired bookmark records the current lecture-review destination');
assert.equal(recentToolHref('/kokushi/', 'private-text'), '/learn/review');
for (const tab of ['patient-1', 'learning&text=secret', 'gorou&name=secret', 'unknown']) {
  assert.equal(recentToolHref('/notes', tab), '/notes');
  assert.equal(recentToolHref('/diagnosis', tab), '/diagnosis');
}
assert.equal(recentToolHref('/notes/patient-id', 'learning'), null);
assert.equal(recentToolHref('/diagnosis-patient', 'gorou'), null);
assert.equal(readRecentToolPaths('bad json').length, 0);
assert.equal(readRecentToolPaths('{"patientId":"private"}').length, 0);
assert.equal(JSON.stringify(updateRecentToolPaths('bad json', '/notes', 'learning')), '["/notes?tab=learning"]', 'bad storage repairs on the next known visit');
const migrated = readRecentToolPaths(JSON.stringify([
  '/notes?tab=learning&sourceType=case&sourceId=fatigue-reasoning&reason=free-text#private',
  '/diagnosis?tab=gorou&patientId=secret&complaint=private',
  '/notes?patientId=secret', '/notes', '/library', '/tsubo',
]));
assert.equal(JSON.stringify(migrated), '["/notes?tab=learning","/diagnosis?tab=gorou","/notes","/library"]');
for (const href of migrated) assert(!/patient|source|reason|complaint|#/.test(href));
const old = JSON.stringify(['/notes', '/diagnosis', '/library', '/tsubo']);
assert.equal(JSON.stringify(readRecentToolPaths(old)), old, 'legacy clinical/base histories keep their destinations');
let history = updateRecentToolPaths(old, '/notes', 'learning');
assert.equal(history[0], '/notes?tab=learning');
history = updateRecentToolPaths(JSON.stringify(history), '/notes', null);
assert.equal(history[0], '/notes', 'query-only same-route changes update recency');
assert.equal(history[1], '/notes?tab=learning', 'clinical and learning note destinations remain distinct');
history = updateRecentToolPaths(JSON.stringify(history), '/diagnosis', 'gorou');
assert.equal(history[0], '/diagnosis?tab=gorou');
assert.equal(history.length, 4);
const bad = JSON.stringify(['https://evil.example/notes?tab=learning', '//evil.example/notes', '/notes/patient-id', 4, {}, null, '/missing']);
assert.equal(readRecentToolPaths(bad).length, 0);
assert.equal(JSON.stringify(updateRecentToolPaths(old, '/notes/patient-id', 'learning')), old, 'unlisted routes cannot add patient-specific paths');
assert.equal(RECENT_TOOL_CATALOG.find(tool => tool.href === '/notes?tab=learning').title, '学習ノート');
assert.equal(RECENT_TOOL_CATALOG.find(tool => tool.href === '/notes').title, '臨床ノート・配穴ストック');
const migratedExamHistory = readRecentToolPaths(JSON.stringify([
  '/kokushi?examId=kokushi-33-toyo-71&answer=private#old-question',
  '/learn/review?resumeReview=private#learning-review', '/tsubo', '/notes', '/library',
]));
assert.equal(JSON.stringify(migratedExamHistory), '["/learn/review","/tsubo","/notes","/library"]', 'Old and current review history merge without losing other public destinations or retaining question IDs');
assert.equal(JSON.stringify(updateRecentToolPaths(JSON.stringify(['/library', '/kokushi', '/notes', '/tsubo']), '/learn/review')), '["/learn/review","/library","/notes","/tsubo"]', 'A new review visit moves the migrated history item instead of creating a duplicate');

const { NAV_STORAGE_KEY, DEFAULT_NAV_CONFIG, loadNavUserConfig, NAV_PRESETS, getNavigationSection, isNavigationItemActive } = load('src/config/navigationItems');
function configuredNav(items, preset = 'student') {
  savedValues.set(NAV_STORAGE_KEY, JSON.stringify({ version: 1, items, updatedAt: '2026-10-03', preset }));
  return loadNavUserConfig();
}
assert.equal(JSON.stringify(configuredNav(['kokushi', 'haiketsu', 'notes', 'library']).items), '["review","haiketsu","notes","library"]', 'A single legacy exam shortcut migrates in place and preserves the other three choices');
assert.equal(JSON.stringify(configuredNav(['kokushi', 'review', 'haiketsu', 'cases']).items), '["review","haiketsu","cases","curriculum"]', 'Alias collision removes only the duplicate and fills the missing fourth slot from defaults');
assert.equal(JSON.stringify(configuredNav(['review', 'kokushi', 'library', 'notes']).items), '["review","library","notes","curriculum"]', 'Either alias order keeps other user choices and yields four unique shortcuts');
const unchanged = configuredNav(['simulator', 'haiketsu', 'tsubo', 'notes']);
assert.equal(JSON.stringify(unchanged.items), '["simulator","haiketsu","tsubo","notes"]', 'Existing non-exam custom navigation stays unchanged');
assert.equal(unchanged.updatedAt, '2026-10-03', 'Migration does not invent a recent user edit date');

assert.equal(NAV_PRESETS.clinician.items[0], 'workspace', 'Clinician shortcuts begin with the complete record workspace');
const oldClinician = configuredNav(['simulator', 'haiketsu', 'tsubo', 'notes'], 'clinician');
assert.equal(JSON.stringify(oldClinician.items), '["workspace","haiketsu","tsubo","notes"]', 'Only an unchanged legacy clinician preset gains the workspace shortcut');
assert.equal(oldClinician.updatedAt, '2026-10-03');
assert.equal(JSON.stringify(configuredNav(['notes', 'haiketsu', 'tsubo', 'simulator'], 'clinician').items), '["notes","haiketsu","tsubo","simulator"]', 'A custom clinician arrangement is never silently replaced');
for (const route of ['/clinical', '/clinical/workspace', '/clinical/symptoms/neck-shoulder', '/notes', '/notes/record', '/simulator/compare', '/practice/haiketsu', '/tsubo/compare']) assert.equal(getNavigationSection(route), 'clinical', route + ' belongs to the clinical category');
assert.equal(getNavigationSection('/tsubo/LI4'), 'dictionary');
assert.equal(getNavigationSection('/curriculum/lecture-intro-1'), 'learn');
assert.equal(getNavigationSection('/clinical-not-a-route'), null, 'Category matching respects route boundaries');
assert(isNavigationItemActive('workspace', '/clinical/workspace'));
assert(!isNavigationItemActive('clinical', '/clinical/workspace'));
assert(isNavigationItemActive('clinical', '/clinical'));
assert(!isNavigationItemActive('workspace', '/clinical'));
assert(isNavigationItemActive('tsubo_compare', '/tsubo/compare'));
assert(!isNavigationItemActive('tsubo', '/tsubo/compare'), 'The comparison page does not select the point dictionary at the same time');
assert(isNavigationItemActive('clinical_guides', '/clinical/symptoms/neck-shoulder'));
for (const [tab, expectedId] of [['', 'diagnosis'], ['unknown', 'diagnosis'], ['clinical', 'clinical_interview'], ['gorou', 'gorou']]) {
  const params = new URLSearchParams(tab ? 'tab=' + tab : '');
  const active = ['diagnosis', 'clinical_interview', 'gorou'].filter(id => isNavigationItemActive(id, '/diagnosis', params));
  assert.equal(JSON.stringify(active), JSON.stringify([expectedId]), 'Each diagnosis mode selects exactly one shortcut: ' + tab);
}
assert.equal(JSON.stringify(configuredNav(['diagnosis', 'clinical_interview', 'gorou', 'simulator_compare']).items), '["diagnosis","clinical_interview","gorou","simulator_compare"]', 'New interview entry and previous self-check / comparison choices coexist without a storage reset');
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
  return navNodes(BottomNavContent()).filter(node => node.type === NavigationLink && node.props['aria-current'] === 'page').map(node => node.props.href);
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
navState[0] = { ...navState[0], items: ['diagnosis', 'clinical_interview', 'gorou', 'tsubo'] };
pathname = '/diagnosis'; searchParams = new URLSearchParams('tab=clinical');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis?tab=clinical"]', 'A clinical interview shortcut updates on a query-only change');
searchParams = new URLSearchParams('tab=gorou');
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis?tab=gorou"]');
searchParams = new URLSearchParams();
assert.equal(JSON.stringify(activeNavHrefs()), '["/diagnosis"]', 'Saved self-check shortcuts retain their base destination');
assert.equal(queryReads, 9, 'Every render reads the subscribed search params instead of a cached initial URL');
console.log('Recent tools regression passed: public history privacy, retired-exam and shortcut migration, preserved custom choices, corrupted storage recovery, and real bottom-nav query-only active-state changes without double selection.');
