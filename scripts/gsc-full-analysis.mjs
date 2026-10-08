import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilePath = path.resolve(__dirname, '../credentials/ga4-key.json');

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function analyzeGsc() {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = 'https://www.haritaro.jp/';

  const today = new Date();
  const endDate = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const startDate = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  console.log(`\n======================================================`);
  console.log(`🔍 Search Console 詳細分析レポート (${siteUrl})`);
  console.log(`集計期間: ${startDate} 〜 ${endDate}`);
  console.log(`======================================================\n`);

  // 1. 日別推移
  try {
    const dailyRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 60,
      },
    });
    console.log('--- [1. 日別検索パフォーマンス推移] ---');
    const dailyRows = dailyRes.data.rows || [];
    if (dailyRows.length > 0) {
      console.log('日付       | クリック | 表示回数 | CTR     | 平均順位');
      console.log('-----------|----------|----------|---------|---------');
      dailyRows.forEach(r => {
        const d = r.keys[0];
        const cl = String(r.clicks).padStart(8);
        const im = String(r.impressions).padStart(8);
        const ctr = (r.ctr * 100).toFixed(1).padStart(6) + '%';
        const pos = r.position.toFixed(1).padStart(7);
        console.log(`${d} | ${cl} | ${im} | ${ctr} | ${pos}位`);
      });
    } else {
      console.log('日別データなし');
    }
  } catch (e) {
    console.error('日別取得エラー:', e.message);
  }

  // 2. クエリ×ページ掛け合わせ（詳細）
  try {
    const qpRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 50,
      },
    });
    console.log('\n--- [2. 検索キーワード × 検索対象ページ] ---');
    const qpRows = qpRes.data.rows || [];
    if (qpRows.length > 0) {
      qpRows.forEach((r, idx) => {
        const [q, p] = r.keys;
        const pagePath = p.replace('https://www.haritaro.jp', '') || '/';
        console.log(`${idx + 1}. [${r.clicks}click / ${r.impressions}imp / 順位${r.position.toFixed(1)}]`);
        console.log(`   クエリ: 「${q}」`);
        console.log(`   ページ: ${pagePath}`);
      });
    } else {
      console.log('クエリ×ページデータなし');
    }
  } catch (e) {
    console.error('クエリ×ページエラー:', e.message);
  }

  // 3. デバイス別
  try {
    const devRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['device'],
      },
    });
    console.log('\n--- [3. デバイス別 (検索流入)] ---');
    const devRows = devRes.data.rows || [];
    devRows.forEach(r => {
      console.log(`  ${r.keys[0]}: ${r.clicks} clicks, ${r.impressions} impressions, CTR: ${(r.ctr * 100).toFixed(1)}%, 順位: ${r.position.toFixed(1)}位`);
    });
  } catch (e) {
    console.error('デバイス別エラー:', e.message);
  }

  // 4. サイトマップ送信状況
  try {
    const sitemapRes = await searchconsole.sitemaps.list({ siteUrl });
    console.log('\n--- [4. 登録サイトマップ状況] ---');
    const sitemaps = sitemapRes.data.sitemap || [];
    if (sitemaps.length > 0) {
      sitemaps.forEach(s => {
        console.log(`  Path: ${s.path}`);
        console.log(`  最終送信日: ${s.lastSubmitted}`);
        console.log(`  ステータス: ${s.errors ? 'エラーあり' : '正常'}`);
        if (s.contents) {
          s.contents.forEach(c => console.log(`    - タイプ: ${c.type} / 送信数: ${c.submitted} / インデックス数: ${c.indexed}`));
        }
      });
    } else {
      console.log('  ※ Search Console に登録されたサイトマップはありません。');
    }
  } catch (e) {
    console.error('サイトマップ取得エラー:', e.message);
  }
}

analyzeGsc().catch(console.error);
