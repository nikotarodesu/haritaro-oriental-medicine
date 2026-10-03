import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propertyId = process.env.GA4_PROPERTY_ID || process.argv[2];
if (!propertyId || !/^\d+$/.test(propertyId)) {
  throw new Error('GA4_PROPERTY_ID または第1引数で、対象サイトのプロパティIDを指定してください。');
}
const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve(__dirname, '../credentials/ga4-key.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyFilePath,
});

// Never mix another site's visits into the haritaro improvement report.
const haritaroFilter = { filter: { fieldName: 'hostName', stringFilter: {
  matchType: 'FULL_REGEXP', value: '^(www\\.)?haritaro\\.jp$', caseSensitive: false,
} } };

async function runHaritaroReport(request) {
  return analyticsDataClient.runReport({ ...request, dimensionFilter: haritaroFilter });
}

async function runReport() {
  console.log(`\n==============================================`);
  console.log(`📊 GA4 データ分析レポート取得開始 (Property: ${propertyId})`);
  if (propertyId === '553537039') {
    console.log(`💡【お知らせ】プロパティID 553537039 は旧設定です。はり太郎専用プロパティを指定する場合は:`);
    console.log(`   node scripts/fetch-ga4.mjs <HARITARO_PROPERTY_ID> または GA4_PROPERTY_ID 環境変数をご設定ください。`);
  }
  console.log(`==============================================\n`);

  try {
    // 1. 全体サマリー（過去30日間・過去7日間）
    const [summaryResponse] = await runHaritaroReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        { startDate: '30daysAgo', endDate: 'yesterday' },
        { startDate: '7daysAgo', endDate: 'yesterday' },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    console.log(`--- [1. 全体サマリー] ---`);
    if (summaryResponse.rows && summaryResponse.rows.length > 0) {
      summaryResponse.rows.forEach((row, idx) => {
        const rangeName = idx === 0 ? '過去30日間' : '過去7日間';
        const [users, pvs, sessions, avgDuration, bounceRate] = row.metricValues.map(m => m.value);
        console.log(`【${rangeName}】`);
        console.log(`  - アクティブユーザー数: ${users}`);
        console.log(`  - 総ページビュー数 (PV): ${pvs}`);
        console.log(`  - セッション数: ${sessions}`);
        console.log(`  - 平均滞在時間: ${Math.round(parseFloat(avgDuration))} 秒`);
        console.log(`  - 直帰率: ${(parseFloat(bounceRate) * 100).toFixed(1)} %`);
      });
    } else {
      console.log('※ まだ十分なデータが集計されていないか、データがありません。');
    }

    // 2. 人気ページ Top 15（過去30日）
    const [pageResponse] = await runHaritaroReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' }
      ],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 15,
    });

    console.log(`\n--- [2. 人気ページ Top 15 (過去30日)] ---`);
    if (pageResponse.rows && pageResponse.rows.length > 0) {
      pageResponse.rows.forEach((row, i) => {
        const [pagePath, pageTitle] = row.dimensionValues.map(d => d.value);
        const [pvs, users, duration] = row.metricValues.map(m => m.value);
        console.log(`${i + 1}. [PV: ${pvs} / ユーザー: ${users} / 平均滞在: ${Math.round(parseFloat(duration))}s]`);
        console.log(`   パス: ${pagePath}`);
        console.log(`   タイトル: ${pageTitle}`);
      });
    } else {
      console.log('※ ページデータがまだありません。');
    }

    // 3. 流入元・参照元 Top 5
    const [trafficResponse] = await runHaritaroReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' }
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    });

    console.log(`\n--- [3. 流入チャネル・参照元 Top 5] ---`);
    if (trafficResponse.rows && trafficResponse.rows.length > 0) {
      trafficResponse.rows.forEach((row, i) => {
        const [source] = row.dimensionValues.map(d => d.value);
        const [sessions, users] = row.metricValues.map(m => m.value);
        console.log(`${i + 1}. ${source}: ${sessions} セッション (${users} ユーザー)`);
      });
    } else {
      console.log('※ トラフィックデータがまだありません。');
    }

    console.log(`\n==============================================`);
    console.log(`✅ GA4 疎通・データ取得完了`);
    console.log(`==============================================\n`);

  } catch (error) {
    console.error('❌ GA4 API エラー:', error.message);
    if (error.message.includes('User does not have sufficient permissions') || error.message.includes('403')) {
      console.error('\n【ヒント】GA4の管理画面で、サービスアカウント (haritaro-ga4@amiable-way-140712.iam.gserviceaccount.com) を「プロパティのアクセス管理」に閲覧者として追加したかご確認ください。');
    }
  }
}

runReport();
