/* eslint-disable @typescript-eslint/no-require-imports -- Run the retired note routes offline. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader({ Response });
for (const source of ['notes', 'mynote']) {
  const route = load('src/app/' + source + '/route');
  for (const method of ['GET', 'HEAD']) {
    const response = route[method](new Request('https://www.haritaro.jp/' + source + '?patientId=private#old-note', { method }));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), '/updates#notes-ended');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
}
assert.match(fs.readFileSync('src/app/updates/page.tsx', 'utf8'), /id="notes-ended"/);
assert(!fs.existsSync('src/components/MyClinicalRecordDrawer.tsx'), 'Retired saved-record drawer is removed');
console.log('Passed: legacy note URLs reach the public notice without forwarding old query values.');
