import http from 'node:http';

// Local-only presentation fixtures. No production routes or browser profiles are changed.
// node scripts/mobile-preview-fixtures.mjs http://localhost:3043 3044 [block-fonts]
const origin = new URL(process.argv[2] || 'http://localhost:3043');
if (!['localhost', '127.0.0.1'].includes(origin.hostname)) throw new Error('Fixtures require a local source');
const port = Number(process.argv[3] || 3044);
const blockFonts = process.argv[4] === 'block-fonts';
const fixtureDocument = Object.fromEntries([
  ['lecture:lecture-yinyang-1', true],
  ['last-visit', 'lecture-yinyang-2'],
].map(([key, value], index) => [key, { key, value, counter: index + 1, device: '00000000-0000-4000-8000-000000000000' }]));

http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', origin);
  if (blockFonts && /\.woff2?(?:$|\?)/.test(url.pathname)) {
    response.writeHead(503, { 'cache-control': 'no-store' }); response.end(); return;
  }
  const fixture = url.searchParams.get('ui-test');
  const text200 = url.searchParams.get('text') === '200';
  url.searchParams.delete('ui-test'); url.searchParams.delete('text');
  try {
    const upstream = await fetch(url, { headers: { 'accept-encoding': 'identity' }, redirect: 'manual' });
    const type = upstream.headers.get('content-type') || '';
    response.writeHead(upstream.status, { 'content-type': type, 'cache-control': 'no-store' });
    if (!type.includes('text/html')) { response.end(Buffer.from(await upstream.arrayBuffer())); return; }
    let html = await upstream.text();
    let injection = '<meta name="haritaro-ui-fixture" content="local-only">';
    if (text200) injection += '<style>html,html[data-font-size]{font-size:200%!important;transition:none!important}</style>';
    if (fixture === 'history' || fixture === 'empty' || fixture === 'failure') {
      // Synthetic guest progress on this separate localhost port only; no private identifiers.
      injection += `<script>(function(){const get=Storage.prototype.getItem,set=Storage.prototype.setItem;
        const fixture=${JSON.stringify(fixture)},history=${JSON.stringify(JSON.stringify(fixtureDocument))};
        Storage.prototype.getItem=function(key){if(key==='haritaro-learning-v2:guest'){
          if(fixture==='failure')throw new Error('Fixture: blocked learning storage');
          return fixture==='history'?history:'{}';}return get.call(this,key)};
        Storage.prototype.setItem=function(key,value){if(fixture==='failure'&&key.startsWith('haritaro-learning-v2:'))throw new Error('Fixture: blocked learning storage');return set.call(this,key,value)};
      })();</script>`;
    }
    html = html.replace('<head>', '<head>' + injection);
    response.end(html);
  } catch { response.writeHead(502); response.end('Local source unavailable'); }
}).listen(port, '127.0.0.1', () => console.log(`Local UI fixtures: http://127.0.0.1:${port} (fonts ${blockFonts ? 'blocked' : 'normal'})`));
