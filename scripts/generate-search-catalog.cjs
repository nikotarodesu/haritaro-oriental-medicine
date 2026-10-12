/* eslint-disable @typescript-eslint/no-require-imports -- Build-time public search metadata. */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');

function generateSearchCatalog() {
  const load = createDataLoader();
  const { buildSearchCatalog } = load('src/data/searchCatalogSource');
  const items = buildSearchCatalog();
  const ids = new Set();
  const allowedKeys = new Set(['id', 'type', 'title', 'subtitle', 'badge', 'url', 'tags', 'exactCode', 'exactTerms', 'searchRole', 'reviewStatus']);
  for (const item of items) {
    if (!item.id || ids.has(item.id)) throw new Error(`Duplicate or missing search ID: ${item.id}`);
    ids.add(item.id);
    if (!item.title || !item.url?.startsWith('/') || item.url.startsWith('//')) throw new Error(`Invalid public destination: ${item.id}`);
    for (const key of Object.keys(item)) if (!allowedKeys.has(key)) throw new Error(`Unexpected search data field: ${item.id}.${key}`);
    if (item.tags?.some(term => typeof term !== 'string')) throw new Error(`Invalid search term: ${item.id}`);
  }
  return '// Generated public search metadata. Run node scripts/generate-search-catalog.cjs after content edits.\n'
    + 'import type { SearchResultItem } from "@/types/searchCatalog";\n\n'
    + `export const SEARCH_CATALOG: SearchResultItem[] = ${JSON.stringify(items)};\n`;
}

if (require.main === module) {
  const target = path.resolve(__dirname, '../src/data/searchCatalog.ts');
  const generated = generateSearchCatalog();
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== generated) {
      console.error('Search metadata is stale. Run node scripts/generate-search-catalog.cjs.');
      process.exitCode = 1;
    } else console.log('Passed: public search metadata matches the current source.');
  } else {
    fs.writeFileSync(target, generated, 'utf8');
    console.log(`Generated public search metadata (${Buffer.byteLength(generated)} bytes).`);
  }
}

module.exports = { generateSearchCatalog };
