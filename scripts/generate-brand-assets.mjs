// Regenerate the editable brand SVGs and platform icons from shared geometry.
// Run: node scripts/generate-brand-assets.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = await fs.readFile(path.join(root, 'src/config/brand.ts'), 'utf8');
const brand = await import(`data:text/javascript;base64,${Buffer.from(ts.transpileModule(config, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText).toString('base64')}`);
const outlines = JSON.parse(await fs.readFile(path.join(root, 'scripts/brand-wordmark-paths.json'), 'utf8'));
const folder = path.join(root, 'public/brand');
await fs.mkdir(folder, { recursive: true });

const mark = `<path d="${brand.BRAND_ARC_PATH}"/><rect x="47" y="28" width="7" height="18" rx="2.5"/><path d="${brand.BRAND_NEEDLE_PATH}"/>`;
const svg = (width, height, title, content) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${content}</svg>\n`;
for (const [suffix, fill] of [['', brand.BRAND_INK], ['-white', '#FFFFFF']]) {
  await fs.writeFile(path.join(folder, `symbol${suffix}.svg`), svg(100, 104, 'はり太郎のシンボル', `<g fill="${fill}">${mark}</g>`));
  let x = 112;
  const letters = outlines.glyphs.map(glyph => {
    const element = `<path transform="translate(${x.toFixed(2)} 78) scale(.074 -.074)" d="${glyph.path}"/>`;
    x += glyph.advance * .074 + 2;
    return element;
  }).join('');
  await fs.writeFile(path.join(folder, `logo${suffix}.svg`), svg(Math.ceil(x + 4), 104, brand.BRAND_WORDMARK, `<g fill="${fill}">${mark}${letters}</g>`));
}

// A slightly heavier simplified mark remains legible in a native 16 px tab.
const smallMark = '<path d="M4.32 11.68A5.2 5.2 0 1 1 8.90 13.12" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/><rect x="7" y="4.25" width="2" height="3" rx=".6" fill="#FFFFFF"/><path d="M7.5 6.5H8.5V10L8 11.25L7.5 10Z" fill="#FFFFFF"/>';
const iconSvg = (rounded = false, maskable = false) => svg(16, 16, 'はり太郎', `<rect width="16" height="16"${rounded ? ' rx="3"' : ''} fill="${brand.BRAND_INK}"/><g${maskable ? ' transform="translate(.8 .8) scale(.9)"' : ''}>${smallMark}</g>`);
await fs.writeFile(path.join(root, 'public/favicon.svg'), iconSvg(true));
const png = (size, rounded = false, maskable = false) => sharp(Buffer.from(iconSvg(rounded, maskable))).resize(size, size).png().toBuffer();
for (const size of [192, 512]) {
  await fs.writeFile(path.join(root, `public/icon-${size}.png`), await png(size));
  await fs.writeFile(path.join(root, `public/icon-maskable-${size}.png`), await png(size, false, true));
}
const apple = await png(180);
await fs.writeFile(path.join(root, 'public/apple-touch-icon.png'), apple);
await fs.writeFile(path.join(root, 'src/app/apple-icon.png'), apple);
await fs.writeFile(path.join(root, 'src/app/icon.png'), await png(512));

const sizes = [16, 32, 48];
const frames = [];
for (const size of sizes) frames.push(await png(size, true));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
sizes.forEach((size, index) => {
  const entry = 6 + index * 16;
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frames[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frames[index].length;
});
const ico = Buffer.concat([directory, ...frames]);
await fs.writeFile(path.join(root, 'src/app/favicon.ico'), ico);
await fs.writeFile(path.join(folder, 'favicon.ico'), ico);
// Next's app file routes own these paths; duplicate public files would conflict.
for (const file of ['public/favicon.ico', 'public/icon.png']) await fs.rm(path.join(root, file), { force: true });

const previewFolder = path.resolve(root, '../audits/2026-10-03/brand');
await fs.mkdir(previewFolder, { recursive: true });
await fs.writeFile(path.join(previewFolder, 'logo-preview.png'), await sharp(path.join(folder, 'logo.svg')).resize({ width: 640 }).png().toBuffer());
const rows = [];
for (const size of sizes) {
  await fs.writeFile(path.join(previewFolder, `favicon-${size}.png`), frames[sizes.indexOf(size)]);
  rows.push(`<div class="row"><span>${size} px</span><img width="${size}" height="${size}" src="favicon-${size}.png"><span class="dark"><img width="${size}" height="${size}" src="favicon-${size}.png"></span></div>`);
}
await fs.writeFile(path.join(previewFolder, 'native-icon-preview.html'), `<!doctype html><html lang="ja"><meta charset="utf-8"><title>はり太郎 アイコン確認</title><style>body{font:16px system-ui;background:#f6f4ee;padding:32px;color:#184f49}h1{font-size:20px}.row{display:flex;align-items:center;gap:24px;margin:20px 0}.row>span:first-child{width:70px}.dark{display:flex;align-items:center;justify-content:center;background:#10161c;padding:16px}img{image-rendering:auto}small{display:block}</style><h1>はり太郎・原寸アイコン</h1><small>左：明るい背景　右：暗い背景（ブラウザ倍率100%）</small>${rows.join('')}</html>`);
console.log('Generated four outlined SVG logos, platform PNGs and 16/32/48 px ICO.');
