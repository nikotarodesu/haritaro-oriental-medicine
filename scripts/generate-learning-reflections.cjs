/* eslint-disable @typescript-eslint/no-require-imports -- Generate public metadata without loading lecture bodies into clients. */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');

function generateReflectionCatalog() {
  const load = createDataLoader();
  const { CURRICULUM_DATA } = load('src/data/curriculumData');
  const { PROGRESSIVE_CASES } = load('src/data/progressiveCases');
  const metadata = items => JSON.stringify(items.map(({ id, title }) => ({ id, title })), null, 2);
  return '// Generated public metadata only. Run node scripts/generate-learning-reflections.cjs after curriculum edits.\n'
    + `export const REFLECTION_LECTURES: ReadonlyArray<{id: string; title: string}> = ${metadata(CURRICULUM_DATA.flatMap(stage => stage.lectures))};\n\n`
    + `export const REFLECTION_CASES: ReadonlyArray<{id: string; title: string}> = ${metadata(PROGRESSIVE_CASES)};\n`;
}

if (require.main === module) {
  const target = path.resolve(__dirname, '../src/data/learningReflectionCatalog.ts');
  const generated = generateReflectionCatalog();
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== generated) {
      console.error('Learning reflection metadata is stale. Run node scripts/generate-learning-reflections.cjs.');
      process.exitCode = 1;
    } else console.log('Passed: reflection destinations match the current lectures and cases.');
  } else {
    fs.writeFileSync(target, generated, 'utf8');
    console.log('Generated public learning reflection metadata.');
  }
}
module.exports = { generateReflectionCatalog };
