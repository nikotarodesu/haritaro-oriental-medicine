import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HARITARO_PLAYWRIGHT_MODULE || 'playwright');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader({ Intl });
const { emptyClinicalEncounter, CLINICAL_ENCOUNTER_KEY } = load('src/utils/clinicalEncounter');
const { clinicalStorageKeys, LEGACY_PATIENT_NOTES_KEY } = load('src/utils/clinicalStorage');
const { CLINICAL_COMPLAINTS } = load('src/data/clinicalWorkflow');
const origin = new URL(process.argv[2] || 'http://127.0.0.1:3038');
const sample = 'TEST-CLINICAL-PAUSE';
const workspace = '/clinical/workspace?complaint=shoulder&example=private';
const clinicalLinks = ['/cases', '/simulator', '/practice/haiketsu', '/diagnosis', '/diagnosis?tab=gorou'];
const draftStorage = {
  [CLINICAL_ENCOUNTER_KEY]: JSON.stringify({ ...emptyClinicalEncounter(), patientIdentifier: sample }),
  [CLINICAL_ENCOUNTER_KEY + ':former-account']: JSON.stringify({ ...emptyClinicalEncounter(), patientIdentifier: sample + '-account' }),
};
const savedStorage = {
  [LEGACY_PATIENT_NOTES_KEY]: JSON.stringify([{ id: sample + '-legacy' }]),
  [clinicalStorageKeys().notes]: JSON.stringify([{ id: sample + '-guest' }]),
  [clinicalStorageKeys('former-account').memos]: JSON.stringify([{ id: sample + '-account' }]),
};
const browser = await chromium.launch({
  ...(process.env.HARITARO_CHROMIUM_PATH ? { executablePath: process.env.HARITARO_CHROMIUM_PATH } : { channel: process.platform === 'win32' ? 'msedge' : undefined }),
  headless: true,
});
const errors = [];

async function trackedPage(width, colorScheme) {
  const context = await browser.newContext({
    viewport: { width, height: 850 }, locale: 'ja-JP', colorScheme,
    isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'reduce', serviceWorkers: 'block',
  });
  await context.route(/^https?:/, route => new URL(route.request().url()).origin === origin.origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  page.on('pageerror', error => errors.push(error.message));
  return page;
}

async function open(page, route) {
  const response = await page.goto(new URL(route, origin).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
  assert.equal(response?.status(), 200, route);
  await page.locator('main h1').first().waitFor();
}

async function noRetiredEntry(page) {
  const retiredLinks = page.locator('a[href*="/clinical/workspace"], a[href*="#pattern-exercise"], a[href="/notes"]');
  assert.equal(await retiredLinks.count(), 0, page.url());
  assert.doesNotMatch(await page.locator('body').innerText(), /ミニ症例で見立てを練習|下書きを再開する|この主訴で記録を練習する|TEST-CLINICAL-PAUSE/);
}

async function checkClinical(page) {
  await page.getByRole('heading', { name: 'はり太郎の臨床演習', exact: true, level: 1 }).waitFor();
  await page.getByRole('heading', { name: '主訴別ガイド', exact: true }).waitFor();
  assert.equal(await page.locator('#chief-complaints a[href^="/clinical/symptoms/"]').count(), CLINICAL_COMPLAINTS.length);
  for (const href of clinicalLinks) assert.equal(await page.locator('main a[href="' + href + '"]').count(), 1, href);
  await noRetiredEntry(page);
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(fits, 'Clinical landing page overflows at ' + page.viewportSize().width + 'px');
}

try {
  const desktop = await trackedPage(1440, 'light');
  await open(desktop, '/clinical');
  await checkClinical(desktop);
  for (const method of ['GET', 'HEAD']) {
    const redirect = await desktop.request.fetch(new URL(workspace, origin).href, { method, maxRedirects: 0 });
    assert.equal(redirect.status(), 307);
    assert.equal(new URL(redirect.headers().location, origin).href, new URL('/clinical', origin).href);
    assert.match(redirect.headers()['cache-control'], /\bno-store\b/);
  }
  await desktop.context().close();

  const mobile = await trackedPage(390, 'dark');
  await open(mobile, '/clinical');
  await mobile.evaluate(({ draftStorage, savedStorage }) => {
    for (const [key, value] of Object.entries(draftStorage)) sessionStorage.setItem(key, value);
    for (const [key, value] of Object.entries(savedStorage)) localStorage.setItem(key, value);
    localStorage.setItem('haritaro_nav_config_v1', JSON.stringify({
      version: 1, items: ['workspace', 'haiketsu', 'tsubo', 'library'], preset: 'clinician', updatedAt: '2026-11-20',
    }));
  }, { draftStorage, savedStorage });
  await open(mobile, workspace);
  assert.equal(new URL(mobile.url()).pathname + new URL(mobile.url()).search, '/clinical');
  await checkClinical(mobile);

  const bottomNav = mobile.getByRole('navigation', { name: 'モバイル下部ナビゲーション' });
  await bottomNav.getByRole('link', { name: '臨床演習' }).waitFor();
  assert.deepEqual(await bottomNav.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href'))),
    ['/clinical', '/practice/haiketsu', '/tsubo', '/library']);
  await bottomNav.getByRole('button', { name: 'その他メニューを開く' }).click();
  await mobile.getByRole('navigation', { name: 'サイトメニュー' }).waitFor();
  await noRetiredEntry(mobile);

  const destinations = [
    ...CLINICAL_COMPLAINTS.map(item => '/clinical/symptoms/' + item.slug),
    ...clinicalLinks, '/tsubo', '/tsubo/li4', '/curriculum/lecture-diagnosis-11', '/updates', '/editorial-policy',
    '/search?q=' + encodeURIComponent('臨床記録'),
  ];
  for (const route of destinations) {
    await open(mobile, route);
    await noRetiredEntry(mobile);
  }

  const remaining = await mobile.evaluate(({ sessions, saved }) => ({
    draftStorage: Object.fromEntries(sessions.map(key => [key, sessionStorage.getItem(key)])),
    savedStorage: Object.fromEntries(saved.map(key => [key, localStorage.getItem(key)])),
  }), { sessions: Object.keys(draftStorage), saved: Object.keys(savedStorage) });
  assert.deepEqual(remaining, { draftStorage, savedStorage });

  for (const file of ['/llms.txt', '/llms-full.txt', '/sitemap.xml']) {
    const response = await mobile.request.get(new URL(file, origin).href);
    assert.equal(response.status(), 200);
    assert.doesNotMatch(await response.text(), /\/clinical\/workspace\b|#pattern-exercise\b/);
  }
  assert.deepEqual(errors, []);
  console.log('Clinical browser checks passed: desktop and mobile landing, temporary bookmark redirect, updated navigation and search, six guides, available exercises, and byte-for-byte retention of synthetic drafts and saved records.');
} finally {
  await browser.close();
}
