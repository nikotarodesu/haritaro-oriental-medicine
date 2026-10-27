/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS regression harness. */
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { createDataLoader } = require('./data-loader.cjs');
const origin = 'https://www.haritaro.jp';
const loadServer = createDataLoader({ Response });
const { subscriptionAnalyticsRelayHtml } = loadServer('src/lib/subscriptionAnalyticsRelay');
for (const id of ['', '553537039', 'G-XXXXXXXXXX', 'G-GE4JNB164V', 'G-X</script>']) assert.equal(subscriptionAnalyticsRelayHtml(id), '');

(async () => {
  const parent = { postMessage: (...args) => acks.push(args) };
  const acks = [], scripts = [], handlers = [];
  const frameWindow = { parent, location: { origin }, addEventListener: (name, handler) => { if (name === 'message') handlers.push(handler); } };
  const frameDocument = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  const html = subscriptionAnalyticsRelayHtml('G-GC398NZKVE');
  vm.runInNewContext(html.match(/<script>([\s\S]*)<\/script>/)[1], { window: frameWindow, document: frameDocument, Date });
  assert.equal(frameWindow['ga-disable-G-GE4JNB164V'], true);
  assert(scripts[0].src.endsWith('id=G-GC398NZKVE'));
  assert.equal(acks[0][0].type, 'haritaro:subscription-ready:v1');
  assert.equal(acks[0][1], origin);
  const valid = { type: 'haritaro:subscription-step:v1', id: 1, name: 'checkout_login_required', plan: 'yearly' };
  const before = frameWindow.dataLayer.length;
  for (const event of [
    { origin: 'https://other.invalid', source: parent, data: valid },
    { origin, source: {}, data: valid },
    { origin, source: parent, data: { ...valid, name: 'purchase' } },
    { origin, source: parent, data: { ...valid, plan: 'private' } },
    { origin, source: parent, data: { ...valid, id: -1 } },
  ]) handlers[0](event);
  assert.equal(frameWindow.dataLayer.length, before);
  handlers[0]({ origin, source: parent, data: { ...valid, patient: 'PRIVATE_SENTINEL', page_location: origin + '/auth/login?secret=PRIVATE_SENTINEL' } });
  const event = frameWindow.dataLayer.at(-1);
  assert.equal(event[1], 'checkout_login_required');
  assert.equal(event[2].send_to, 'G-GC398NZKVE');
  assert.equal(event[2].page_location, origin + '/pricing');
  assert.equal(event[2].page_referrer, '');
  assert(!JSON.stringify(event).includes('PRIVATE_SENTINEL'));
  event[2].event_callback();
  assert.equal(acks.at(-1)[0].id, 1);

  const posted = [], received = [], frames = [];
  const frame = { contentWindow: { postMessage: (...args) => posted.push(args) }, setAttribute() {} };
  const browserWindow = { location: { origin, pathname: '/pricing' }, addEventListener: (name, handler) => { if (name === 'message') received.push(handler); } };
  const browserDocument = { createElement: name => { assert.equal(name, 'iframe'); return frame; }, body: { appendChild: child => frames.push(child) } };
  const loadBrowser = createDataLoader({ window: browserWindow, document: browserDocument, setTimeout, clearTimeout });
  const { trackSubscriptionStep } = loadBrowser('src/utils/analytics');
  const clicked = trackSubscriptionStep('upgrade_click', 'yearly');
  const needsLogin = trackSubscriptionStep('checkout_login_required', 'yearly');
  assert.equal(frames.length, 1);
  assert.equal(frame.referrerPolicy, 'no-referrer');
  browserWindow.location.pathname = '/auth/login';
  received[0]({ origin, source: {}, data: { type: 'haritaro:subscription-ready:v1' } });
  assert.equal(posted.length, 0);
  received[0]({ origin, source: frame.contentWindow, data: { type: 'haritaro:subscription-ready:v1' } });
  assert.deepEqual(posted.map(row => row[0].name), ['upgrade_click', 'checkout_login_required']);
  assert(posted.every(row => row[1] === origin && row[0].plan === 'yearly'));
  for (const [message] of posted) received[0]({ origin, source: frame.contentWindow, data: { type: 'haritaro:subscription-ack:v1', id: message.id } });
  await Promise.all([clicked, needsLogin]);
  await trackSubscriptionStep('upgrade_click', 'monthly');
  assert.equal(posted.length, 2, 'Private-page actions cannot enter the relay');
  browserWindow.location.pathname = '/pricing';
  let deadline;
  await Promise.race([trackSubscriptionStep('checkout_login_required', 'monthly'), new Promise((_, reject) => { deadline = setTimeout(() => reject(new Error('Unavailable relay must not block login')), 3000); })]).finally(() => clearTimeout(deadline));

  const savedId = process.env.NEXT_PUBLIC_GA_ID;
  process.env.NEXT_PUBLIC_GA_ID = 'G-GC398NZKVE';
  const response = loadServer('src/app/api/analytics/subscription-frame/route').GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Referrer-Policy'), 'no-referrer');
  assert.equal(response.headers.get('X-Frame-Options'), 'SAMEORIGIN');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert(response.headers.get('Content-Security-Policy').includes("frame-ancestors 'self'"));
  if (savedId === undefined) delete process.env.NEXT_PUBLIC_GA_ID; else process.env.NEXT_PUBLIC_GA_ID = savedId;
  console.log('Passed: public click relay survives private navigation, rejects forged/unsafe messages, bounds login wait, and exposes no private URLs.');
})().catch(error => { console.error(error); process.exitCode = 1; });
