/* eslint-disable @typescript-eslint/no-require-imports -- Data auditing runs in CommonJS. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function createDataLoader(globals = {}) {
  const cache = new Map();
  function load(candidate) {
    const file = path.isAbsolute(candidate) ? candidate : path.resolve(root, candidate);
    if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
    const source = file.endsWith('.ts') ? file : file + '.ts';
    if (cache.has(source)) return cache.get(source);
    const exports = {}; cache.set(source, exports);
    const js = ts.transpileModule(fs.readFileSync(source, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    const localRequire = id => id.startsWith('@/') ? load('src/' + id.slice(2)) : id.startsWith('.') ? load(path.resolve(path.dirname(source), id)) : require(id);
    vm.runInNewContext(js, { exports, require: localRequire, process, URL, Date, console, Map, Set, TextEncoder, ...globals }, { filename: source });
    return exports;
  }
  return load;
}
module.exports = { createDataLoader };
