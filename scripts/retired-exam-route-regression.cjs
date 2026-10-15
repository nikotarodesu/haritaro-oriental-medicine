/* eslint-disable @typescript-eslint/no-require-imports -- Execute the actual legacy route offline. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
const { permanentRedirect } = require('next/navigation');
function load(relative) {
  let file = path.resolve(root, relative);
  if (!path.extname(file)) file += fs.existsSync(file + '.tsx') ? '.tsx' : '.ts';
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { fileName: file,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(js, { exports, URLSearchParams, require: id => {
    if (id === 'next/navigation') return { permanentRedirect };
    if (id.startsWith('@/')) return load('src/' + id.slice(2));
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), id));
    return require(id);
  } }, { filename: file });
  return exports;
}
async function main() {
  const route = load('src/app/kokushi/page.tsx').default;
  const { getURLFromRedirectError, getRedirectStatusCodeFromError } = require('next/dist/client/components/redirect');
  async function destination(params) {
    try { await route({ searchParams: Promise.resolve(params) }); }
    catch (error) {
      assert.equal(getRedirectStatusCodeFromError(error), 308, 'Bookmarks receive a permanent redirect');
      return getURLFromRedirectError(error);
    }
    assert.fail('The legacy page must redirect');
  }
  assert.equal(await destination({}), '/learn/review');
  assert.equal(await destination({ examId: 'kokushi-33-toyo-71', answer: 'private', next: 'https://outside.example' }), '/learn/review', 'Retired exam and unrecognized/private parameters are not forwarded');
  const session = '12345678-abcd-4abc-8abc-123456789abc';
  assert.equal(await destination({ resumeReview: session }), `/learn/review?resumeReview=${session}`, 'An existing lecture review bookmark retains its session');
  const { LEARNING_FOCUS } = load('src/data/learningFocus');
  for (const focus of LEARNING_FOCUS) assert.equal(await destination({ focus: focus.id }), `/learn/review?focus=${focus.id}`);
  const combined = new URL(await destination({ focus: 'safety-check', resumeReview: session }), 'https://www.haritaro.jp');
  assert.equal(combined.searchParams.get('focus'), 'safety-check');
  assert.equal(combined.searchParams.get('resumeReview'), session);
  for (const invalid of ['https://outside.example', '../../private', '<script>', '', ['safety-check', 'comparison']]) {
    assert.equal(await destination({ focus: invalid, resumeReview: invalid }), '/learn/review', 'Malformed or duplicated bookmark parameters fall back to the public review page');
  }
  console.log('Retired exam route passed: actual permanent 308, preserved valid review/focus bookmarks, retired exam removal, and malformed/private parameter rejection.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
