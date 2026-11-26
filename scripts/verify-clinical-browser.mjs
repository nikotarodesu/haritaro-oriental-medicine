import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.HARITARO_PLAYWRIGHT_MODULE || 'playwright');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader({ Intl });
const { emptyClinicalEncounter, CLINICAL_ENCOUNTER_KEY } = load('src/utils/clinicalEncounter');
const { clinicalStorageKeys, LEGACY_PATIENT_NOTES_KEY } = load('src/utils/clinicalStorage');
const { CLINICAL_COMPLAINTS } = load('src/data/clinicalWorkflow');
const { CLINICAL_CASES: [introductoryCase] } = load('src/data/clinicalCasesData');
const { CASE_REVIEW_ANCHOR } = load('src/utils/caseStudyNavigation');
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
  await page.getByRole('heading', { name: '症状別の臨床演習ガイド', exact: true }).waitFor();
  assert.equal(await page.locator('#chief-complaints a[href^="/clinical/symptoms/"]').count(), CLINICAL_COMPLAINTS.length);
  await page.getByRole('link', { name: '頭痛の模擬症例を読む', exact: true }).waitFor();
  await page.getByRole('link', { name: '最初の設問へ', exact: true }).waitFor();
  await page.getByRole('heading', { name: '相談から7日後まで追う：頭痛の架空症例', exact: true }).waitFor();
  for (const href of clinicalLinks) assert.equal(await page.locator('main a[href="' + href + '"]').count(), 1, href);
  await noRetiredEntry(page);
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(fits, 'Clinical landing page overflows at ' + page.viewportSize().width + 'px');
}

async function checkGuideAndPractice(page) {
  await page.getByRole('link', { name: '最初の設問へ', exact: true }).click();
  await page.waitForURL('**/cases/case-01-headache-liver-fire#case-reasoning');
  await page.waitForFunction(() => {
    const heading = document.getElementById('case-reasoning-title')?.getBoundingClientRect();
    const header = document.querySelector('header:has(.site-header-container)')?.getBoundingClientRect();
    return heading && header && heading.top >= header.bottom && heading.bottom <= window.innerHeight;
  });
  await page.getByText('頭痛と目の充血があるとき、最初に何を聞きますか。', { exact: true }).waitFor();
  await page.getByRole('link', { name: 'この症例の受診・安全上の注意を読む', exact: true }).click();
  await page.waitForURL('**/cases/case-01-headache-liver-fire#case-safety');

  await page.getByRole('link', { name: '問題に答える', exact: true }).click();
  for (const step of introductoryCase.reasoningSteps) {
    const correctAnswer = step.options.find(option => option.isCorrect);
    await page.getByRole('button', { name: correctAnswer.label, exact: true }).click();
  }
  await page.getByRole('link', { name: '振り返りへ', exact: true }).click();
  await page.waitForURL(`**/cases/case-01-headache-liver-fire#${CASE_REVIEW_ANCHOR}`);

  await open(page, '/cases');
  await page.getByRole('link', { name: 'こめかみが強く痛み、目が赤くなる 症例を読む', exact: true }).waitFor();

  await open(page, '/symptoms/headache-stiff-neck');
  await page.getByRole('link', { name: '受診時に伝えることへ', exact: true }).click();
  await page.waitForURL('**/symptoms/headache-stiff-neck#recording');
  await page.getByRole('heading', { name: '受診時に伝えること', exact: true }).waitFor();
  assert(await page.evaluate(() => {
    const sections = ['safety', 'recording', 'daily-life', 'traditional', 'acupoints'].map(id => document.getElementById(id));
    return sections.every((section, index) => section && (index === 0 || (sections[index - 1].compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING)));
  }));

  await open(page, '/practice/haiketsu');
  const palette = page.getByRole('region', { name: '経穴一覧', exact: true });
  const selectedPoints = palette.locator('button[aria-pressed="true"]');
  await page.getByText('例として2穴を選択済み（合谷・太衝）', { exact: true }).waitFor();
  assert.equal(await selectedPoints.count(), 2);
  const reset = page.getByRole('button', { name: '最初から選ぶ', exact: true });
  await reset.click();
  await page.getByText('選択中 0 / 8穴', { exact: true }).waitFor();
  assert.equal(await selectedPoints.count(), 0);
  assert.equal(await page.getByRole('textbox', { name: 'この組み合わせの名前' }).inputValue(), '');
  await palette.getByRole('button', { name: /^合谷/ }).click();
  await page.getByText('選択中 1 / 8穴', { exact: true }).waitFor();
  assert.equal(await selectedPoints.count(), 1);
  for (let count = 1; count < 8; count += 1) {
    await palette.locator('button[aria-pressed="false"]').first().click();
  }
  await page.getByText('選択中 8 / 8穴', { exact: true }).waitFor();
  const nextClick = palette.locator('button[aria-pressed="false"]').first();
  const limitDialog = page.waitForEvent('dialog');
  const limitClick = nextClick.click();
  const warning = await limitDialog;
  assert.match(warning.message(), /最大8穴/);
  await warning.dismiss();
  await limitClick;
  assert.equal(await selectedPoints.count(), 8);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));

  await open(page, '/diagnosis');
  await page.getByRole('button', { name: '回答に関連する分類を見る' }).click();
  await page.getByText('病気の診断や治療・施術の判断には使えません。', { exact: true }).waitFor();

  await open(page, '/clinical/symptoms/headache');
  await page.getByRole('link', { name: 'この症状の受診の目安を読む（一般向け）' }).click();
  await page.waitForURL('**/symptoms/headache-stiff-neck#safety');
  await page.getByRole('heading', { name: '受診の目安', exact: true }).waitFor();
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
  await checkGuideAndPractice(mobile);
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
