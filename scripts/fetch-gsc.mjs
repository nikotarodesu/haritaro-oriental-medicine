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

async function runGscReport() {
  console.log(`\n==============================================`);
  console.log(`🔍 Google Search Console (GSC) データ分析開始`);
  console.log(`==============================================\n`);

  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // 1. 権限のあるサイト一覧を取得
    const sitesRes = await searchconsole.sites.list();
    const siteList = sitesRes.data.siteEntry || [];

    if (siteList.length === 0) {
      console.log('⚠️ サーチコンソールに登録されたサイトが見つかりませんでした。');
      console.log('【確認】サーチコンソールの「設定 ➜ ユーザーと権限」で、サービスアカウント (haritaro-ga4@amiable-way-140712.iam.gserviceaccount.com) が追加されているかご確認ください。');
      return;
    }

    console.log(`✅ 認識されたサイトプロパティ:`);
    siteList.forEach(s => console.log(`   - ${s.siteUrl} (権限: ${s.permissionLevel})`));

    // メインサイトの選定（haritaro.jp を含むプロパティ）
    const targetSite = siteList.find(s => s.siteUrl.includes('haritaro.jp')) || siteList[0];
    const siteUrl = targetSite.siteUrl;

    console.log(`\n--- [対象サイト: ${siteUrl}] ---`);

    // 日付範囲の算出（GSCは直近2〜3日前まで集計されるため、30日前〜3日前）
    const today = new Date();
    const endDate = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const startDate = new Date(today.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log(`集計期間: ${startDate} 〜 ${endDate}\n`);

    // 2. 検索キーワード (Query) Top 20
    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 20,
      },
    });

    console.log(`--- [1. 検索キーワード Top 20 (表示回数・順位)] ---`);
    const queryRows = queryRes.data.rows || [];
    if (queryRows.length > 0) {
      queryRows.forEach((row, i) => {
        const query = row.keys[0];
        const clicks = row.clicks;
        const impressions = row.impressions;
        const ctr = (row.ctr * 100).toFixed(1);
        const position = row.position.toFixed(1);
        console.log(`${i + 1}. 「${query}」`);
        console.log(`   表示回数: ${impressions}回 | クリック: ${clicks}回 | CTR: ${ctr}% | 掲載順位: ${position}位`);
      });
    } else {
      console.log('※ まだ検索クエリの集計データがありません（登録直後の場合、反映に1〜2日かかることがあります）。');
    }

    // 3. 検索流入ページ (Page) Top 10
    const pageRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    console.log(`\n--- [2. 検索表示ページ Top 10] ---`);
    const pageRows = pageRes.data.rows || [];
    if (pageRows.length > 0) {
      pageRows.forEach((row, i) => {
        const page = row.keys[0];
        const clicks = row.clicks;
        const impressions = row.impressions;
        const ctr = (row.ctr * 100).toFixed(1);
        const position = row.position.toFixed(1);
        console.log(`${i + 1}. ${page}`);
        console.log(`   表示回数: ${impressions}回 | クリック: ${clicks}回 | 平均順位: ${position}位`);
      });
    } else {
      console.log('※ ページ別検索データがまだありません。');
    }

    console.log(`\n==============================================`);
    console.log(`✅ GSC データ取得完了`);
    console.log(`==============================================\n`);

  } catch (error) {
    console.error('❌ GSC API エラー:', error.message);
    if (error.message.includes('Google Search Console API has not been used') || error.message.includes('disabled')) {
      console.error('\n【ヒント】Google Cloud Console で「Google Search Console API」を「有効にする」必要があります。');
    }
  }
}

runGscReport();
