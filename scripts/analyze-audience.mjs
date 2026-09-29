import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propertyId = '553537039';
const keyFilePath = path.resolve(__dirname, '../credentials/ga4-key.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyFilePath,
});

async function runAudienceAnalysis() {
  console.log(`\n==============================================`);
  console.log(`📊 GA4 ユーザー環境・行動属性分析開始`);
  console.log(`==============================================\n`);

  try {
    // 1. デバイス別（モバイル vs デスクトップ vs タブレット）
    const [deviceRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    console.log(`--- [1. デバイス別利用状況] ---`);
    deviceRes.rows.forEach(r => {
      const dev = r.dimensionValues[0].value;
      const users = r.metricValues[0].value;
      const views = r.metricValues[1].value;
      const duration = Math.round(Number(r.metricValues[2].value));
      const bounce = (Number(r.metricValues[3].value) * 100).toFixed(1);
      console.log(`📱 ${dev}: ユーザー ${users}人 | PV ${views} | 平均滞在 ${Math.floor(duration/60)}分${duration%60}秒 | 直帰率 ${bounce}%`);
    });

    // 2. 流入チャネル別
    const [channelRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
      ],
    });

    console.log(`\n--- [2. 流入チャネル別] ---`);
    channelRes.rows.forEach(r => {
      const ch = r.dimensionValues[0].value;
      const sessions = r.metricValues[0].value;
      const users = r.metricValues[1].value;
      const duration = Math.round(Number(r.metricValues[2].value));
      console.log(`🌐 ${ch}: セッション ${sessions} | ユーザー ${users}人 | 平均滞在 ${Math.floor(duration/60)}分${duration%60}秒`);
    });

    // 3. 新規 vs リピーター
    const [userTypeRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' },
      ],
    });

    console.log(`\n--- [3. 新規 vs リピーター] ---`);
    userTypeRes.rows.forEach(r => {
      const type = r.dimensionValues[0].value;
      const users = r.metricValues[0].value;
      const duration = Math.round(Number(r.metricValues[1].value));
      const views = r.metricValues[2].value;
      console.log(`👥 ${type}: ユーザー ${users}人 | PV ${views} | 平均滞在 ${Math.floor(duration/60)}分${duration%60}秒`);
    });

    // 4. イベント別集計
    const [eventsRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 15,
    });

    console.log(`\n--- [4. イベント Top 15] ---`);
    eventsRes.rows.forEach(r => {
      const ev = r.dimensionValues[0].value;
      const cnt = r.metricValues[0].value;
      const users = r.metricValues[1].value;
      console.log(`⚡ ${ev}: 発生回数 ${cnt}回 | ユーザー ${users}人`);
    });

  } catch (e) {
    console.error('Error:', e);
  }
}

runAudienceAnalysis();
