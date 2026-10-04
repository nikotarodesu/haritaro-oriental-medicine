const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(relative) {
  let file = path.resolve(root, relative);
  if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(js, { exports, URL, require: id => id.startsWith('@/') ? load('src/' + id.slice(2)) : require(id) }, { filename: file });
  return exports;
}
const { RECENT_TOOL_CATALOG, RECENT_TOOLS_STORAGE_KEY, recentToolHref, readRecentToolPaths, updateRecentToolPaths } = load('src/utils/recentTools');
assert.equal(RECENT_TOOLS_STORAGE_KEY, 'haritaro_recent_tools', 'old storage is retained');
assert.equal(new Set(RECENT_TOOL_CATALOG.map(tool => tool.href)).size, RECENT_TOOL_CATALOG.length);
assert.equal(recentToolHref('/notes', 'learning'), '/notes?tab=learning');
assert.equal(recentToolHref('/notes'), '/notes');
assert.equal(recentToolHref('/diagnosis', 'gorou'), '/diagnosis?tab=gorou');
assert.equal(recentToolHref('/diagnosis'), '/diagnosis');
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
console.log('Recent tools regression passed: fixed learning/gorou tabs, query-only mode changes, public path whitelist, no free text/source IDs, deduplication, legacy migration and corrupted storage recovery.');
