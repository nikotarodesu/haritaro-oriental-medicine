/* eslint-disable @typescript-eslint/no-require-imports -- Build-time public guide generation. */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const root = path.resolve(__dirname, '..');

function generateFullGuide() {
  const load = createDataLoader();
  const { ACUPOINTS_MASTER } = load('src/data/tsubo/acupointsMaster');
  const { SYMPTOMS } = load('src/data/symptomData');
  const { LEARNING_COURSES } = load('src/data/learningCourses');
  const shortGuide = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8').replace(/\r\n/g, '\n').trimEnd();
  const lines = [shortGuide, '', '## 公開ページの追加索引', '',
    '以下は上記の案内とサイトの公開データから生成した索引です。経穴名や症状との関連は治療効果・個人への適応を示すものではありません。確認範囲と出典はリンク先で確認してください。', '',
    '### 目的別の学習コース'];
  for (const course of LEARNING_COURSES) lines.push(`- [${course.title}](https://www.haritaro.jp/learn/courses/${course.slug})`);
  lines.push('', '### 症状別の学習ガイド');
  for (const symptom of SYMPTOMS) lines.push(`- [${symptom.title}](https://www.haritaro.jp/symptoms/${symptom.id}): ${symptom.summary}`);
  lines.push('', '### 経脈別の経穴索引', '',
    '位置・伝統的な主治・注意事項を分けて学ぶための索引です。刺入深度・角度・灸量・針路の指示は含みません。');
  const meridians = new Map();
  for (const point of ACUPOINTS_MASTER) {
    if (!meridians.has(point.meridianId)) meridians.set(point.meridianId, []);
    meridians.get(point.meridianId).push(point);
  }
  for (const points of meridians.values()) {
    lines.push('', `#### ${points[0].meridian}（${points.length}穴）`);
    for (const point of points) lines.push(`- [${point.name}（${point.code}）](https://www.haritaro.jp/tsubo/${point.codeLower})`);
  }
  return lines.join('\n') + '\n';
}

if (require.main === module) {
  const target = path.join(root, 'public/llms-full.txt');
  const generated = generateFullGuide();
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') !== generated) {
      console.error('llms-full.txt is stale. Run npm run generate:llms.');
      process.exitCode = 1;
    } else console.log('Passed: AI guide matches the canonical guide and public route data.');
  } else {
    fs.writeFileSync(target, generated, 'utf8');
    console.log('Generated llms-full.txt from llms.txt and the public catalogs.');
  }
}
module.exports = { generateFullGuide };
