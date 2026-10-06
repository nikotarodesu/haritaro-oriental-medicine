/* eslint-disable @typescript-eslint/no-require-imports -- npm lifecycle script runs as CommonJS. */
// Clarity 0.8.71 clears its envelope on stop while an earlier gzip operation may
// still be pending. Use that upload's captured envelope sequence, not live state.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..', 'node_modules/clarity-js');
if (JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version !== '0.8.71') {
  throw new Error('Review the Clarity shutdown fix before changing its SDK version.');
}
const before = 'send(payload, zipped, data$1.sequence, last);';
const after = 'send(payload, zipped, JSON.parse(e)[1], last);';
for (const file of ['build/clarity.module.js', 'build/clarity.js']) {
  const filename = path.join(root, file);
  const source = fs.readFileSync(filename, 'utf8');
  if (source.includes(after)) continue;
  if (source.split(before).length !== 2) throw new Error(`Clarity shutdown fix no longer matches ${file}`);
  fs.writeFileSync(filename, source.replace(before, after));
}
