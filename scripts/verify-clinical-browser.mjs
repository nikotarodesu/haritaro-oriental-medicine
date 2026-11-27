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
  await page.getByRole('heading', { name: '頭痛の別症例を、初回相談から7日後まで追う', exact: true }).waitFor();
  await page.getByRole('link', { name: '第6段階：7日後の再評価', exact: true }).waitFor();
  for (const href of clinicalLinks) assert.equal(await page.locator('main a[href="' + href + '"]').count(), 1, href);
  assert.equal(await page.locator('main a[href="/symptoms"]').count(), 1, 'One general-audience entry appears in the clinical hub');
  await noRetiredEntry(page);
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  assert(fits, 'Clinical landing page overflows at ' + page.viewportSize().width + 'px');
}

async function checkCaseAnchor(page, id) {
  await page.waitForFunction(anchor => {
    const target = document.getElementById(anchor);
    const title = target?.querySelector('h2, h3, summary')?.getBoundingClientRect();
    const header = document.querySelector('header:has(.site-header-container)')?.getBoundingClientRect();
    const bottom = document.querySelector('nav[aria-label="モバイル下部ナビゲーション"]')?.getBoundingClientRect();
    const viewportBottom = bottom?.height ? bottom.top : window.innerHeight;
    return target && document.activeElement === target && title && header && title.top >= header.bottom && title.bottom <= viewportBottom;
  }, id);
}

async function activateLinkWithKeyboard(link) {
  await link.focus();
  await link.press('Enter');
}

async function checkGuideAndPractice(page) {
  await page.getByRole('link', { name: '最初の設問へ', exact: true }).click();
  await page.waitForURL('**/cases/case-01-headache-liver-fire#case-reasoning');
  await checkCaseAnchor(page, 'case-reasoning');
  await page.getByText('頭痛と目の充血があるとき、最初に何を聞きますか。', { exact: true }).waitFor();
  const safety = page.locator('details#case-safety');
  assert.equal(await safety.evaluate(details => details.open), false, 'Case safety details start folded when opening a question');
  await page.getByRole('complementary', { name: '症例演習の注意' }).getByRole('link', { name: '受診の目安と鍼灸の安全性' }).waitFor();
  await activateLinkWithKeyboard(page.getByRole('link', { name: '受診・安全上の注意を読む', exact: true }));
  await page.waitForURL('**/cases/case-01-headache-liver-fire#case-safety');
  await page.locator('details#case-safety[open]').waitFor();
  await checkCaseAnchor(page, 'case-safety');
  await activateLinkWithKeyboard(page.getByRole('link', { name: '安全上の注意から設問に戻る', exact: true }));
  await checkCaseAnchor(page, 'case-reasoning');
  await activateLinkWithKeyboard(page.getByRole('link', { name: '症状の経過を読む', exact: true }));
  await page.waitForURL('**/cases/case-01-headache-liver-fire#case-history');
  await checkCaseAnchor(page, 'case-history');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await checkCaseAnchor(page, 'case-history');
  await page.goBack();
  await checkCaseAnchor(page, 'case-reasoning');
  await page.goForward();
  await checkCaseAnchor(page, 'case-history');
  await activateLinkWithKeyboard(page.getByRole('link', { name: '症状の経過から設問に戻る', exact: true }));
  await checkCaseAnchor(page, 'case-reasoning');

  await page.getByRole('link', { name: '問題に答える', exact: true }).click();
  const firstIncorrect = introductoryCase.reasoningSteps[0].options.find(option => !option.isCorrect);
  const firstIncorrectButton = page.locator('#case-question-1').getByRole('button', { name: firstIncorrect.label, exact: true });
  await firstIncorrectButton.focus();
  await page.keyboard.press('Enter');
  await page.locator('#case-question-1').getByRole('status').filter({ hasText: '解答例と異なります' }).waitFor();
  assert.equal(await firstIncorrectButton.getAttribute('aria-pressed'), 'true', 'Feedback keeps the original answer button name');
  for (const step of introductoryCase.reasoningSteps) {
    const correctAnswer = step.options.find(option => option.isCorrect);
    await page.getByRole('button', { name: correctAnswer.label, exact: true }).click();
  }
  await page.getByRole('link', { name: '振り返りへ', exact: true }).click();
  await page.waitForURL(`**/cases/case-01-headache-liver-fire#${CASE_REVIEW_ANCHOR}`);
  await page.getByRole('button', { name: '解答と配穴例を見る', exact: true }).click();
  const explanation = page.locator('#case-explanation');
  await explanation.waitFor();
  assert.equal(await explanation.locator('a[href^="/simulator"]').count(), 1);
  assert((await explanation.locator('.clinical-role-figure a[href^="/tsubo/"]').count()) > 0);
  assert.equal(await page.locator('.case-practice a[href="/cases#case-catalog"]').count(), 1);

  await open(page, '/cases');
  await page.getByRole('link', { name: 'こめかみが強く痛み、目が赤くなる', exact: true }).waitFor();
  const catalogSafety = page.getByRole('complementary', { name: '症例演習の注意' });
  assert.equal(await catalogSafety.locator('details').evaluate(details => details.open), false, 'Case catalog safety details start folded');
  await catalogSafety.getByRole('link', { name: '受診の目安と鍼灸の安全性' }).waitFor();
  const catalog = page.locator('#case-catalog');
  await catalog.getByRole('link', { name: introductoryCase.title, exact: true }).getByText('難易度 ' + introductoryCase.difficulty, { exact: true }).waitFor();
  await catalog.getByRole('link', { name: '同じ訴えの2例を読み比べる', exact: true }).waitFor();
  await catalog.getByRole('button', { name: '頭痛・めまい', exact: true }).click();
  await page.waitForURL('**/cases?symptom=headache');
  await catalog.getByRole('button', { name: '首・肩・腰・ひざ', exact: true }).click();
  await page.waitForURL('**/cases?symptom=movement');
  await page.goBack();
  await catalog.getByRole('status').filter({ hasText: '3件の症例' }).waitFor();
  await page.goForward();
  await catalog.getByRole('status').filter({ hasText: '4件の症例' }).waitFor();
  await catalog.locator('a[href="/cases/case-11-cervicobrachial-syndrome?symptom=movement"]').click();
  const caseNavigation = page.getByRole('navigation', { name: 'ほかの症例へ', exact: true });
  await caseNavigation.getByRole('link', { name: '同じ分類の次の症例へ（症例14）', exact: true }).click();
  await page.waitForURL('**/cases/case-14-knee-osteoarthritis?symptom=movement');
  await caseNavigation.getByRole('link', { name: '同じ分類の次の症例へ（症例18）', exact: true }).click();
  await page.waitForURL('**/cases/case-18-severe-eyestrain?symptom=movement');
  const returnToCatalog = caseNavigation.locator('a[href="/cases?symptom=movement#case-catalog"]');
  await returnToCatalog.waitFor();
  assert.equal(await caseNavigation.getByRole('link', { name: /次の症例へ/ }).count(), 0);
  await returnToCatalog.click();
  await page.waitForURL('**/cases?symptom=movement#case-catalog');
  await catalog.getByRole('status').filter({ hasText: '4件の症例' }).waitFor();

  await open(page, '/cases/case-11-cervicobrachial-syndrome');
  await caseNavigation.getByRole('link', { name: '次の症例へ（症例12）', exact: true }).waitFor();
  await open(page, '/cases/case-01-headache-liver-fire#case-safety');
  await page.locator('details#case-safety[open]').waitFor();
  await checkCaseAnchor(page, 'case-safety');

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
  assert.equal(await page.getByRole('heading', { name: '選んだツボを見直すポイント' }).count(), 0);
  assert.equal(await page.locator('main a[href="#haiketsu-review"]').count(), 1);
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
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: '選んだ項目を集計する' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('heading', { name: '選んだ項目はありません', exact: true }).waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-labelledby') === 'self-check-result-heading');
  await page.getByText('病気の診断や治療・施術の判断には使えません。', { exact: true }).waitFor();

  await open(page, '/diagnosis?tab=gorou');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: /画面や文字を長く見続ける/ }).click();
  const restLink = page.getByRole('link', { name: '休憩・動作の例を見る', exact: true });
  await restLink.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.activeElement?.id === 'gorou-rest-heading');

  await open(page, '/clinical/symptoms/headache');
  const lectureLinks = page.getByRole('navigation', { name: '候補に関連する講義' }).getByRole('link');
  const lectureHrefs = await lectureLinks.evaluateAll(links => links.map(link => link.getAttribute('href')));
  assert.equal(lectureHrefs.length, 3);
  assert.equal(new Set(lectureHrefs).size, lectureHrefs.length);
  await page.getByRole('link', { name: 'この症状の受診の目安を読む（一般向け）' }).click();
  await page.waitForURL('**/symptoms/headache-stiff-neck#safety');
  await page.getByRole('heading', { name: '受診の目安', exact: true }).waitFor();
}

async function checkContinuousCase(page) {
  await open(page, '/clinical');
  const stages = await page.locator('#headache-course a[href^="/curriculum/lecture-practice-"]')
    .evaluateAll(links => links.map(link => link.getAttribute('href')));
  assert.equal(stages.length, 7, 'The continuous exercise links to its introduction and six stages');
  for (const href of stages) assert.equal(await page.locator('main a[href="' + href + '"]').count(), 1, href);
  assert.equal(await page.locator('main a[href="/curriculum/lecture-practice-3"]').count(), 1, 'Supplementary lectures remain listed');
  for (const route of stages) {
    await open(page, route);
    const exercises = page.locator('details#lecture-supplements');
    assert.equal(await exercises.evaluate(details => details.open), true, route + ' questions start open');
    const firstQuestion = exercises.locator('#lecture-quiz .quiz-question').first();
    await firstQuestion.waitFor();
    assert.equal(await firstQuestion.locator('[data-quiz-option-label]').count(), 3, route + ' has three answer choices');
    assert.equal(await firstQuestion.locator('[role="status"]').textContent(), '', route + ' starts without an answer');
  }
  await page.locator('#lecture-quiz .quiz-question [data-quiz-option-label]').first().click();
  await page.waitForFunction(() => /^第1問、(?:正解|不正解)/.test(document.querySelector('#lecture-quiz .quiz-question [role="status"]')?.textContent ?? ''));

  await open(page, '/learn/lectures/yin-yang-basics');
  assert.equal(await page.locator('details#lecture-check').evaluate(details => details.open), true, 'The public lecture confirmation questions also start open');
}

async function checkAcupunctureResearch(page) {
  await open(page, '/learn/acupuncture');
  await page.getByRole('navigation', { name: '鍼灸入門の目次' }).getByRole('link', { name: '研究の読み方' }).click();
  await page.waitForURL('**/learn/acupuncture#acupuncture-research');
  const sections = ['mechanisms', 'evidence', 'combinations', 'study-examples'];
  const research = page.getByRole('navigation', { name: '研究の読み方の目次' });
  const links = research.getByRole('link');
  assert.deepEqual(await links.evaluateAll(items => items.map(item => item.hash)), sections.map(id => '#' + id));
  for (const [index, id] of sections.entries()) {
    await links.nth(index).click();
    await page.waitForURL('**/learn/acupuncture#' + id);
    await page.locator('#' + id + ' h3').waitFor();
  }
  await page.locator('#combinations').getByRole('radio', { name: 'AにBを足す', exact: true }).check();
  await page.locator('#combinations').getByText('＋3点', { exact: true }).waitFor();
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
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
  await checkContinuousCase(mobile);
  await checkAcupunctureResearch(mobile);
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
  console.log('Clinical browser checks passed: desktop and mobile landing, initial questions and grading for the continuous case, the acupuncture research contents, temporary bookmark redirect, updated navigation and search, six guides, available exercises, and byte-for-byte retention of synthetic drafts and saved records.');
} finally {
  await browser.close();
}
