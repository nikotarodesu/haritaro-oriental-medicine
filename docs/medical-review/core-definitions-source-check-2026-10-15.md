# 2026-10-15 基礎定義と合谷の位置の本文照合

教材の重複を整理する際に、旧注記の「PDF未取得」を実際の本文確認へ進めた記録です。編集上の限定照合であり、講義全体・診断精度・有効性・専門家監修を承認するものではありません。古典の底本・訳文や断面モデルの実技条件を確認済みに変更しません。

## WHO 2022 用語集

- 書誌：World Health Organization. *WHO international standard terminologies on traditional Chinese medicine*. Geneva: WHO; 2022. 電子版 ISBN 9789240042322。
- [公式刊行ページ](https://www.who.int/publications/i/item/9789240042322)と、その Download リンク先の[公式PDF](https://iris.who.int/server/api/core/bitstreams/02be07cf-ef55-4ae2-9184-ded49210aa05/content)を確認。
- 取得日：2026-10-15。5,925,189 bytes、PDF 468ページ。以下のページ番号は**冊子に印刷されたページ**。このPDFでは冊子p.1がPDFの13ページ目に対応する。
- 取得ファイルのSHA-256：`e02b764f4e2149908cb8e3e663162565fac246d1a70fe65850aa225c902eadac`。
- 確認方法：PDF全体を取得し、該当ページをテキスト抽出して定義・識別番号・ページ番号を照合。陰陽・五行・気血津液の該当ページは描画画像でも確認した。検索結果の抜粋だけによる確認から更新した。

| 照合した範囲 | 冊子ページ・WGM2番号 | 対応する既存参照ID |
| --- | --- | --- |
| 陰陽の性質・関係・変化 | pp.1–2、3–24 | `who-tcm-terminologies-2022-yinyang` |
| 五行の性質と関係、母子 | pp.3–4、28–41 | `who-wuxing-terms-2022` |
| 臓腑の分類と五臓の役割 | pp.5–6、53–60 | `foundation-zangfu-overview` |
| 心と肺の主要用語 | p.6、59–60、p.9、92–95 | `foundation-lung-heart-terms` |
| 脾胃の関係・主要用語 | p.6、58、p.11、114・116・118、pp.16–17、186・191–194 | `foundation-spleen-stomach-terms` |
| 肝腎の主要用語 | p.12、130・136、p.14、152–153・158・161 | `foundation-liver-kidney-terms` |
| 六腑と相合、小腸・大腸・膀胱・三焦 | p.6、56・58、p.18、200・202・205・207 | `foundation-fu-pairing-terms` |
| 精・気・血・津液と相互関係 | pp.19–22、223–261 | 共通の `who-tcm-terminology-2022` と `who-tcm-terminologies-2022` の注記に、今回確認した範囲として明記 |
| 六淫・七情・飲食・労逸・正気 | p.24、281・284–288、p.31、365 | `path-onset-who-terms-2022` |
| 気の病機 | pp.36–37、417–426 | `path-qi-who-terms-2022` |
| 血の病機と気血の関係 | pp.37–38、427–435・440–442 | `path-blood-who-terms-2022` |

定義の区分について、気は224、血は225、津液は226、血の養う・潤す役割は247、津と液の区別は248–249にあることを確認した。これにより、同じ短い注意文を繰り返す代わりに、講義固有の定義へ参照を置ける。症状だけでこれらの状態を確定できることや、現代の検査項目との同一性を示す根拠にはしない。

参照更新は `src/data/sourceVerification.ts` のID単位で行う。同じ資料が他の講義に掲載されていても、その講義の全記述を照合したとは表示しない。

## WHO経穴位置資料とLI4

- 書誌：World Health Organization, Regional Office for the Western Pacific. *WHO Standard Acupuncture Point Locations in the Western Pacific Region*. 2008、取得PDFに「Updated and Reprinted 2009」と記載。
- [WHO図書館書誌](https://library.wpro.who.int/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=11227)、[WHO IRIS資料レコード](https://iris.who.int/handle/10665/353407)、そのORIGINAL bundleに掲載された[公式PDF](https://iris.who.int/server/api/core/bitstreams/d98c1c98-3fbf-4e4e-8c9a-1bbe72ccd00e/content)を確認。
- 取得日：2026-10-15。10,121,370 bytes、PDF 258ページ。SHA-256：`c9d4095383c636f85e61b5bc5d7631a658308c0336e8f691b0eb29f517d5bf5b`。
- p.2（PDF 11ページ目）の Scope と B-cun・F-cun、pp.13–14（PDF 22–23ページ目）の指寸法、p.35（PDF 44ページ目）のLI4を本文で確認。LI4のページ全体は描画して掲載図も確認した。
- LI4の基準は手背、第2中手骨の中点に対する橈側。既存の `detailedPoints.ts` の位置記述と一致する。教材独自の簡易取穴法・断面図の座標・個人の針路と深度までをこの1頁から確認したとは扱わない。
- `VERIFIED_POINT_LOCATIONS.li4` は体表位置だけの確認記録。断面図の `procedureReviewStatus: pending_expert_review` は維持する。
- 書誌上の注意：公式図書館とIRIS metadataのISBNは9789290613831。一方、取得PDFの著作権頁には9789290612487が記載される不一致がある。サイトでは公式書誌のISBNを維持し、PDF内の番号を使って別資料と同一視しない。

取得時、旧 `apps.who.int/iris/bitstream/...` URLはPDFではなく755-byteのDSpace HTMLを返した。HTTP成功だけでPDF取得済みとせず、上記の現行公式content URLから取得した実PDFのヘッダー・ページ数・本文を確認した。

## 続けて確認が必要な範囲

- WHO 2007用語集、WHO 1991経穴名称、WHO 2021研修資料など、今回取得していない資料の旧確認範囲は拡張しない。
- 古典の底本・異本・訳文、未照合書籍の版と書誌は保留を維持する。
- 経穴の伝統的主治、個別疾患への有効性、模型の座標・神経血管変異・針路・深度・患者ごとの実技条件は、位置資料の確認から推定しない。
- 専門家監修・承認の記録は今回作成していない。
