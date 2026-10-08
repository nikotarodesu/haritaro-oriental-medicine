# カリキュラム一覧の本文分離とbundle検証

2026-10-08、Next.js 16.3.4 の統合buildで検証。変更前は commit `e461da2` の `.next/diagnostics/route-bundle-stats.json` を記録した。値は Next が集計した初期JavaScriptのファイルサイズで、HTML・RSC payloadは含まない。gzip値は各ローカルchunkを個別圧縮した合計で、実際のネットワーク転送量ではない。

| ルート | 変更前の非圧縮JS | 統合後の非圧縮JS | 変更前のgzip合計 | 統合後のgzip合計 |
| --- | ---: | ---: | ---: | ---: |
| `/curriculum` | 2,111,369 B | 1,282,163 B | 646,923 B | 381,078 B |
| `/kokushi` | 1,966,560 B | 1,969,003 B | 501,143 B | 501,588 B |

`/curriculum` は非圧縮で829,206 B（約39%）減少した。サーバー専用の `getCurriculumIndexCatalog()` が、最新の講義データから一覧に必要な見出し・概要・学習目標・IDなどを明示的に選び、Client Componentへ渡す。別の生成カタログを手更新する必要はなく、元の順序、再開先、完了記録、準備中カードを維持する。

`/kokushi` の増加は2,443 B（約0.124%）、gzip合計では445 B（約0.089%）。旧 `KokushiDashboard.tsx` の `CURRICULUM_DATA` は未使用importにしか現れない。旧ソースを今回インストールされている Next のSWCで変換すると、このimportは出力から除去された。したがって、不要importの削除に初期bundleの縮小を必須とする期待は不適切だった。

同じ統合では、共有の復習session機能と計測対象ルートを追加している。実際の初期chunkに `haritaro:temporary-review:v1` が含まれることを確認した。個別モジュールを同じSWCで変換・圧縮した参考値では、`LearningReviewPanel` の差分は4,623 B、新しい `reviewSession` は9,564 B、`analytics` の差分は778 B、`publicGuideRoutes` は635 Bで、合計約15.6 KBになる。一方、クイズデータのJSONサイズは232,107 Bから227,096 Bへ5,011 B減少し、国家試験問題データのJSONサイズは変わっていない。

個別変換の参考値は、bundlerによる最適化・共有・chunk分割後の差分とは一致しない。旧buildの全chunkは保持していないため、2,443 Bの増加を各変更へ正確に割り振ることはできない。全文依存の再混入は、静的依存グラフと本文抜粋の初期chunk照合で別に確認する。

## 回帰検証

```bash
node scripts/curriculum-catalog-regression.cjs
# npm run build が完了した後に実施
node scripts/curriculum-catalog-regression.cjs --bundles
```

通常の検証は、一覧の明示フィールド、最新ソースとの一致、全講義IDと順序、進捗カウンター、実際の一覧HTMLと再開先を確認する。カリキュラム一覧・国家試験ダッシュボード・共通進捗contextの静的client依存に、全講義本文やサーバー側カタログ生成が入ることを禁止する。

build後の検証は、両ルートの初期chunkに本文抜粋が一つも現れないことを確認する。`/curriculum` は記録したbaselineより小さいことを要求する。`/kokushi` は、追加した共有機能の個別変換差分を丸めた16 KiB（baselineの約0.83%）を上限とする成長予算を設定し、今回の2,443 Bを許容する。この予算はfixtureに明記し、将来の増加を無制限には許可しない。

この比較はコードの配信量を確認するもの。スマートフォンでのLCP・INPや検索順位への影響は、公開後の実測で評価する。
