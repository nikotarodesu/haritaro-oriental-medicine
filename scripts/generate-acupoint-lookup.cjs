/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');
const { ACUPOINTS_MASTER } = createDataLoader()('src/data/tsubo/acupointsMaster');
const rows = ACUPOINTS_MASTER.map(({ legacyId, name, code, meridianShort, locationSimple }) => ({ id: legacyId, name, code, meridianShort, locationSimple }));
const content = '// Generated from the public acupoint catalog. Run generate-acupoint-lookup.cjs after changes.\nexport const ACUPOINT_LOOKUP = ' + JSON.stringify(rows, null, 2) + ' as const;\n';
const file = path.join(root, 'src/data/acupointLookup.ts');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) throw new Error('Acupoint lookup is stale');
} else fs.writeFileSync(file, content);
console.log(`Public acupoint lookup: ${rows.length} points, position and identity fields only.`);
