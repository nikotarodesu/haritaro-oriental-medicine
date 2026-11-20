const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { createDataLoader } = require('./data-loader.cjs');

const load = createDataLoader();
const { HOME_HEADING, SITE_ORIGIN, SITE_SECTIONS_LABEL } = load('src/config/seo');
const { BRAND_ARC_PATH, BRAND_NEEDLE_PATH, BRAND_INK, BRAND_PAPER } = load('src/config/brand');
const logo = fs.readFileSync(path.join(__dirname, '../public/brand/logo.svg')).toString('base64');
const domain = new URL(SITE_ORIGIN).hostname.replace(/^www\./, '');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BRAND_PAPER}"/>
  <rect x="35" y="35" width="1130" height="560" rx="24" fill="none" stroke="#C4CEC6" stroke-width="2"/>
  <g transform="translate(780 116) scale(3.5)" fill="#CBD7CD">
    <path d="${BRAND_ARC_PATH}"/>
    <path d="${BRAND_NEEDLE_PATH}"/>
  </g>

  <image x="86" y="83" width="190" height="48" href="data:image/svg+xml;base64,${logo}"/>
  <text x="82" y="298" fill="${BRAND_INK}" font-family="'Noto Serif JP', 'Noto Serif CJK JP', 'Yu Mincho', serif" font-size="78" font-weight="600">${HOME_HEADING}</text>
  <text x="86" y="373" fill="${BRAND_INK}" font-family="'Noto Sans JP', 'Noto Sans CJK JP', 'Yu Gothic', sans-serif" font-size="36" font-weight="500">${SITE_SECTIONS_LABEL}</text>
  <text x="86" y="533" fill="#456457" font-family="'Noto Sans JP', 'Segoe UI', sans-serif" font-size="27" font-weight="600">${domain}</text>
</svg>
`;

const outputPath = path.join(__dirname, '../public/og-image.png');
sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outputPath)
  .then(info => console.log('Generated public/og-image.png', info.width, info.height, info.size))
  .catch(error => {
    console.error('Failed to generate the social image', error);
    process.exitCode = 1;
  });
