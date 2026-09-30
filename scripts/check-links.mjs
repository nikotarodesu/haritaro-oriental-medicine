import fs from 'fs';
import path from 'path';

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        walk(full, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(full);
    }
  }
  return fileList;
}

function getRoutes(dir, base = '') {
  let routes = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      routes = routes.concat(getRoutes(full, base + '/' + file));
    } else if (file === 'page.tsx') {
      routes.push(base === '' ? '/' : base);
    }
  }
  return routes;
}

const existingRoutes = getRoutes('src/app');
console.log('Existing static routes count:', existingRoutes.length);

const allFiles = walk('src');
const internalLinks = new Map();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/href=["'](\/[a-zA-Z0-9_\-/?=&%#]+)["']/g)].map(m => m[1]);
  for (const m of matches) {
    if (!internalLinks.has(m)) {
      internalLinks.set(m, []);
    }
    internalLinks.get(m).push(file);
  }
}

console.log('Found internal links:', internalLinks.size);

const broken = [];
for (const [link, callers] of internalLinks.entries()) {
  const cleanPath = link.split('?')[0].split('#')[0];
  if (
    cleanPath.startsWith('/_next') ||
    cleanPath.startsWith('/api') ||
    cleanPath === '/llms.txt' ||
    cleanPath.endsWith('.png') ||
    cleanPath.endsWith('.ico') ||
    cleanPath.endsWith('.webmanifest')
  ) {
    continue;
  }

  const isTsuboDetail = cleanPath.startsWith('/tsubo/');
  const isArticleDetail = cleanPath.startsWith('/articles/');
  const isCaseDetail = cleanPath.startsWith('/cases/');
  const isKikeiDetail = cleanPath.startsWith('/kikei/');

  if (
    !existingRoutes.includes(cleanPath) &&
    !isTsuboDetail &&
    !isArticleDetail &&
    !isCaseDetail &&
    !isKikeiDetail
  ) {
    broken.push({ link, callers: callers.slice(0, 3) });
  }
}

console.log('Potentially broken links:', JSON.stringify(broken, null, 2));
