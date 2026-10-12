# はり太郎：専門確認が必要な既存文の一覧

2026年10月12日。文章と学習導線の校閲で、専門家へ確認したい箇所を集めました。医学的な監修や正誤の判定を完了した一覧ではありません。定義・引用・効能・施術条件などの既存文は、推測で訂正していません。

## 件数と数え方

| 元の監査 | 確認項目 |
| --- | ---: |
| 講義・講義クイズ | 41 |
| 公開記事 | 18 |
| 用語集 | 6 |
| 公開ツール・比較モデル | 71 |
| ページ入口・案内・印刷例（前回分） | 9 |
| 今回の入口校閲で追加 | 1 |
| 合計 | 146 |

完全重複は0件、原文とソース位置の組合せは146件です。同じファイルかつ同じ原文だけを完全重複として数えました。論点が似ていても公開箇所や原文が違うものは残しています。たとえば、症状比較の「著効・特効」という共通見出し1項目と、12の経穴説明12項目は関連する論点ですが、確認する文が異なる13項目です。

動的クイズは3つの解説テンプレートを3項目として数え、影響する8脈×3問の24問題IDを省略せず示しています。方剤9行・薬剤9行、同じ論点の主治行は関連文として示し、項目数に二重加算していません。古典引用とその解説も、別の文に別の確認事項がある場合は別項目です。

機械読み取り用の全記録は [specialist-review-index.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/specialist-review-index.json) にあります。元監査は [lecture-editorial-audit.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/lecture-editorial-audit.json)、[article-editorial-audit.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/article-editorial-audit.json)、[foundation-glossary-audit.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/foundation-glossary-audit.json)、[tool-specialist-review.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/tool-specialist-review.json)、[entry-page-audit.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/entry-page-audit.json)、[natural-japanese-entry-audit.json](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/docs/readability/natural-japanese-entry-audit.json) です。

## 一覧の入口

- [講義・講義クイズ](#lectures)
- [公開記事](#articles)
- [用語集](#glossary)
- [奇経八脈・八脈交会穴](#extraordinary-meridians)
- [経穴比較プリセット](#acupoint-comparison)
- [症状別ガイドの東西医学比較](#symptom-comparison)
- [ページ入口・案内・印刷例](#entry-pages)

## 確認の進め方

各項目の公開ページと実装箇所を開き、原文の前後と既存の出典注記を確認してください。対象・方法・比較・評価時点・効果量・安全性、または古典の版・篇・原文・訳を特定し、確認できた範囲を記録します。研究で示されたことと、伝統モデル・学習用比喩・本人への診断や施術判断を区別してください。

<a id="lectures"></a>

## 講義・講義クイズ（41項目）

### lecture:review-01

陰陽論 レッスン2：陰陽は比較によって決まる

公開先：[/curriculum/lecture-yinyang-2](https://www.haritaro.jp/curriculum/lecture-yinyang-2)。実装：[src/data/curriculumData.ts:337](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:337)。

対象ID：`lecture-yinyang-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 大腿前部（陰中の陽）／ 臀部・深部（陰中の陰）

確認したい事項：下半身内の配属の比較基準、教材・古典出典、上半身の区分や図・問題との一致。

### lecture:review-02

精・気・血・津液・神の関係

公開先：[/curriculum/lecture-lifedynamics-2](https://www.haritaro.jp/curriculum/lecture-lifedynamics-2)。実装：[src/data/curriculumData.ts:2089](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2089)。

対象ID：`lecture-lifedynamics-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 精が足りなければ血が補い、血が充実していれば精へと変換されて蓄えられます。

確認したい事項：精血同源の互相化生の底本・条件・説明範囲。一律の変換規則と述べられるか。

### lecture:review-03

精・気・血・津液・神の関係

公開先：[/curriculum/lecture-lifedynamics-2](https://www.haritaro.jp/curriculum/lecture-lifedynamics-2)。実装：[src/data/curriculumData.ts:2089](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2089)。

対象ID：`lecture-lifedynamics-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 五臓それぞれに固有の知性と感情（五神：ごしん）が宿り、互いに分担して全人格を形成しています。

確認したい事項：五神・五志の区別、知性・感情・人格形成との関係が原典・標準教材に沿うか。

### lecture:review-04

精・気・血・津液・神の関係

公開先：[/curriculum/lecture-lifedynamics-2](https://www.haritaro.jp/curriculum/lecture-lifedynamics-2)。実装：[src/data/curriculumData.ts:2089](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2089)。

対象ID：`lecture-lifedynamics-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 悪夢、情緒不安定、決断不能、幻覚様感覚

確認したい事項：五神の表の精神症状と配当の根拠・掲載範囲。診断の対応表ではない限定は維持。

### lecture:review-05

飲食と呼吸から生命を支える

公開先：[/curriculum/lecture-lifedynamics-3](https://www.haritaro.jp/curriculum/lecture-lifedynamics-3)。実装：[src/data/curriculumData.ts:2146](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2146)。

対象ID：`lecture-lifedynamics-3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 体内の代謝廃棄物である「濁気（だっき）」

確認したい事項：濁気の読みと定義、代謝廃棄物という表現の範囲。酸素・二酸化炭素との同一視を招かないか。

### lecture:review-06

飲食と呼吸から生命を支える

公開先：[/curriculum/lecture-lifedynamics-3](https://www.haritaro.jp/curriculum/lecture-lifedynamics-3)。実装：[src/data/curriculumData.ts:2146](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2146)。

対象ID：`lecture-lifedynamics-3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 最も純粋な栄養物質（水穀の精微）を抽出・吸収する

確認したい事項：水穀の精微と運化について、伝統的役割と実際の栄養素の抽出・吸収の境界。

### lecture:review-07

飲食と呼吸から生命を支える

公開先：[/curriculum/lecture-lifedynamics-3](https://www.haritaro.jp/curriculum/lecture-lifedynamics-3)。実装：[src/data/curriculumData.ts:2146](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2146)。

対象ID：`lecture-lifedynamics-3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> まず肺に送られて清気と合わさり、心に注がれて赤い「血」へと化成（生血）され

確認したい事項：直前の五臓生成篇引用がこの生成順を支持するか。篇章・原文・訳と解説の対応。

### lecture:review-08

営気と衛気の役割

公開先：[/curriculum/lecture-lifedynamics-4](https://www.haritaro.jp/curriculum/lecture-lifedynamics-4)。実装：[src/data/curriculumData.ts:2203](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2203)。

対象ID：`lecture-lifedynamics-4`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 皮膚や筋肉、内臓を温め、生体機能を正常な温度に保つ。

確認したい事項：衛気の温煦の説明範囲と生体の温度調節を測定・保証する説明の違い。

### lecture:review-09

営気と衛気の役割

公開先：[/curriculum/lecture-lifedynamics-4](https://www.haritaro.jp/curriculum/lecture-lifedynamics-4)。実装：[src/data/curriculumData.ts:2203](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2203)。

対象ID：`lecture-lifedynamics-4`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 経脈の外・皮膚筋膜（脈外）

確認したい事項：脈外・分肉・腠理を皮膚筋膜と併記する説明が特定の解剖構造との同一視を招かないか。

### lecture:review-10

三焦で全身の働きを整理する

公開先：[/curriculum/lecture-lifedynamics-5](https://www.haritaro.jp/curriculum/lecture-lifedynamics-5)。実装：[src/data/curriculumData.ts:2261](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2261)。

対象ID：`lecture-lifedynamics-5`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 適度な熱でじっくり発酵・分解（腐熟）させ

確認したい事項：中焦・腐熟の比喩と実際の発酵反応の区別。漚の原典の読み・訳と表の対応。

### lecture:review-11

三焦で全身の働きを整理する

公開先：[/curriculum/lecture-lifedynamics-5](https://www.haritaro.jp/curriculum/lecture-lifedynamics-5)。実装：[src/data/curriculumData.ts:2261](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2261)。

対象ID：`lecture-lifedynamics-5`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 全身の皮膚・筋肉・臓腑へ均一に噴霧・散布・散開させる。

確認したい事項：上焦如霧の比喩を均一な噴霧・組織への散布と説明する範囲。

### lecture:review-12

三焦で全身の働きを整理する

公開先：[/curriculum/lecture-lifedynamics-5](https://www.haritaro.jp/curriculum/lecture-lifedynamics-5)。実装：[src/data/curriculumData.ts:2261](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2261)。

対象ID：`lecture-lifedynamics-5`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 古代中国の医学書『難経』第25難・第38難

確認したい事項：三焦の名有りて形無しの篇章、論争の記述、網膜・腸間膜・腹膜という語の出典。

### lecture:review-13

昇降出入で機能をつなぐ

公開先：[/curriculum/lecture-lifedynamics-7](https://www.haritaro.jp/curriculum/lecture-lifedynamics-7)。実装：[src/data/curriculumData.ts:2373](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2373)。

対象ID：`lecture-lifedynamics-7`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 肝の「拡散」を行き過ぎないように肺が「抑制」し

確認したい事項：肝左昇・肺右降の出典と拡散・抑制として説明する条件。

### lecture:review-14

昇降出入で機能をつなぐ

公開先：[/curriculum/lecture-lifedynamics-7](https://www.haritaro.jp/curriculum/lecture-lifedynamics-7)。実装：[src/data/curriculumData.ts:2373](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2373)。

対象ID：`lecture-lifedynamics-7`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「健康」とは各組織のサイズや数値が正常であること以上に

確認したい事項：気機の説明を健康の定義として述べる範囲と医学的な組織・検査値の評価との関係。

### lecture:review-15

活動と休息のリズムを理解する

公開先：[/curriculum/lecture-lifedynamics-8](https://www.haritaro.jp/curriculum/lecture-lifedynamics-8)。実装：[src/data/curriculumData.ts:2430](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2430)。

対象ID：`lecture-lifedynamics-8`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 腠理（毛穴）を開閉し

確認したい事項：腠理を毛穴と併記する定義。営衛の講の単一の毛穴・汗腺と同一視しない説明との整合性。

### lecture:review-16

活動と休息のリズムを理解する

公開先：[/curriculum/lecture-lifedynamics-8](https://www.haritaro.jp/curriculum/lecture-lifedynamics-8)。実装：[src/data/curriculumData.ts:2430](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2430)。

対象ID：`lecture-lifedynamics-8`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 脳と筋肉の緊張をオフにして「睡眠」へ導く。

確認したい事項：衛気の夜の運行を脳・筋の緊張の解除という医学的機序で述べる根拠・範囲。

### lecture:review-17

活動と休息のリズムを理解する

公開先：[/curriculum/lecture-lifedynamics-8](https://www.haritaro.jp/curriculum/lecture-lifedynamics-8)。実装：[src/data/curriculumData.ts:2430](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2430)。

対象ID：`lecture-lifedynamics-8`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 夜になってもスマホのブルーライトを浴び続けたり、仕事のプレッシャーで興奮していると

確認したい事項：生活状況と陽不入陰を関係づける条件。不眠原因を確定しない限定との整合性。

### lecture:review-18

季節・環境への適応を理解する

公開先：[/curriculum/lecture-lifedynamics-9](https://www.haritaro.jp/curriculum/lecture-lifedynamics-9)。実装：[src/data/curriculumData.ts:2487](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2487)。

対象ID：`lecture-lifedynamics-9`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> （夜更かしせず朝早く起き

確認したい事項：四気調神大論の夜に臥し早く起きの訳・解説、底本・季節・時代の文脈。

### lecture:review-19

正常な調節と、失調の入口を区別する

公開先：[/curriculum/lecture-lifedynamics-10](https://www.haritaro.jp/curriculum/lecture-lifedynamics-10)。実装：[src/data/curriculumData.ts:2545](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2545)。

対象ID：`lecture-lifedynamics-10`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 『黄帝内経素問』調経論には、虚実の定義について決定的な一文

確認したい事項：直後の邪気盛んなる者は実なり、精気奪わるる者は虚なりの篇章帰属・原文・訳。

### lecture:review-20

生命システムを統合して説明する

公開先：[/curriculum/lecture-lifedynamics-11](https://www.haritaro.jp/curriculum/lecture-lifedynamics-11)。実装：[src/data/curriculumData.ts:2602](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2602)。

対象ID：`lecture-lifedynamics-11`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 肝（疎泄による血量配分）

確認したい事項：疏泄と蔵血の役割区分、血量配分を疏泄に関連づける根拠。

### lecture:review-21

生命システムを統合して説明する

公開先：[/curriculum/lecture-lifedynamics-11](https://www.haritaro.jp/curriculum/lecture-lifedynamics-11)。実装：[src/data/curriculumData.ts:2602](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2602)。

対象ID：`lecture-lifedynamics-11`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 脾（気血の統血）

確認したい事項：統血の対象・定義と、気血の統血という表現と既習内容との一致。

### lecture:review-22

安全性と対応範囲を先に確認する

公開先：[/curriculum/lecture-diagnosis-2](https://www.haritaro.jp/curriculum/lecture-diagnosis-2)。実装：[src/data/curriculumData.ts:3320](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3320)。

対象ID：`lecture-diagnosis-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`whatYouWillLearn.goals[1]`。

原文（抜粋）：

> 医原性事故を未然に防止する

確認したい事項：Webで説明できる目標と指導下の実技能力・事故防止の保証の区別。

### lecture:review-23

問診を設計する

公開先：[/curriculum/lecture-diagnosis-4](https://www.haritaro.jp/curriculum/lecture-diagnosis-4)。実装：[src/data/curriculumQuizzes.ts:2160](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumQuizzes.ts:2160)。

対象ID：`lecture-diagnosis-4`、`lecture-diagnosis-4-q2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`quiz.explanation`。

原文（抜粋）：

> 反証所見（矛盾する兆候）を自ら探しに行くことで誤診を防ぎます。

確認したい事項：反証の確認が誤診を防ぐという表現の根拠・条件と推論の学習目標の範囲。

### lecture:review-24

問診を設計する

公開先：[/curriculum/lecture-diagnosis-4](https://www.haritaro.jp/curriculum/lecture-diagnosis-4)。実装：[src/data/curriculumQuizzes.ts:2168](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumQuizzes.ts:2168)。

対象ID：`lecture-diagnosis-4`、`lecture-diagnosis-4-q3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`quiz.explanation`。

原文（抜粋）：

> 客観的鑑別点を絞り込むのが標準面接技法です。

確認したい事項：本人の回答と客観所見の区別、標準面接技法の出典・適用条件。

### lecture:review-25

証から治則・治法へつなぐ

公開先：[/curriculum/lecture-treatment-2](https://www.haritaro.jp/curriculum/lecture-treatment-2)。実装：[src/data/curriculumData.ts:3693](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3693)。

対象ID：`lecture-treatment-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`keyPoints`。

原文（抜粋）：

> 臨床での応用力と安全性を完全に奪う

確認したい事項：短絡的選穴の危険を説明する断定の根拠・強さと本文の限定との整合性。

### lecture:review-26

証から治則・治法へつなぐ

公開先：[/curriculum/lecture-treatment-2](https://www.haritaro.jp/curriculum/lecture-treatment-2)。実装：[src/data/curriculumData.ts:3694](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3694)。

対象ID：`lecture-treatment-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`keyPoints`。

原文（抜粋）：

> 治法は「介入する具体的な生体機能」を定義する

確認したい事項：治法を伝統的な働きへの方針とする本文と、生体機能の定義とする要点の整合性。

### lecture:review-27

本治・標治と優先順位

公開先：[/curriculum/lecture-treatment-4](https://www.haritaro.jp/curriculum/lecture-treatment-4)。実装：[src/data/curriculumData.ts:3745](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3745)。

対象ID：`lecture-treatment-4`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`whatYouWillLearn.goals[0]`。

原文（抜粋）：

> 「本治優先」と「まず標を通す」という2つの流派

確認したい事項：二つの流派という分類の出典・条件。Webの比較学習と実患者への使い分け技能の区別。

### lecture:review-28

気への治法を整理する

公開先：[/curriculum/lecture-treatment-5](https://www.haritaro.jp/curriculum/lecture-treatment-5)。実装：[src/data/curriculumData.ts:3776](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3776)。

対象ID：`lecture-treatment-5`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`whatYouWillLearn.goals`。

原文（抜粋）：

> 気は巡らなければ補えず、満ちていなければ巡らない

確認したい事項：補気・理気の原則の出典・適用条件、処方を組み立てるというWeb目標の範囲。

### lecture:review-29

気への治法を整理する

公開先：[/curriculum/lecture-treatment-5](https://www.haritaro.jp/curriculum/lecture-treatment-5)。実装：[src/data/curriculumData.ts:3777](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3777)。

対象ID：`lecture-treatment-5`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`whatYouWillLearn.goals`。

原文（抜粋）：

> 医療過誤（補気滞気）を自覚的に回避できる

確認したい事項：補気滞気の定義・条件・根拠、医療過誤回避を保証するように読める目標と本文の限定の整合性。

### lecture:review-30

経絡・経穴を選択する

公開先：[/curriculum/lecture-treatment-8](https://www.haritaro.jp/curriculum/lecture-treatment-8)。実装：[src/data/curriculumData.ts:3850](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3850)。

対象ID：`lecture-treatment-8`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 梁丘と中脘、外丘と陽陵泉

確認したい事項：郄穴・八会穴として挙げた組合せの伝統的出典・分類・条件。効果・安全性未確認の限定は維持。

### lecture:review-31

評価・継続・変更・終了を設計する

公開先：[/curriculum/lecture-treatment-11](https://www.haritaro.jp/curriculum/lecture-treatment-11)。実装：[src/data/curriculumData.ts:3926](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:3926)。

対象ID：`lecture-treatment-11`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`whatYouWillLearn.goals[2]`。

原文（抜粋）：

> 4分岐意思決定モデルを臨床で適用できる

確認したい事項：学習例で分岐理由を説明する目標と臨床判断技能の認定の区別。

### lecture:review-32

総合演習・次章への接続

公開先：[/curriculum/lecture-treatment-12](https://www.haritaro.jp/curriculum/lecture-treatment-12)。実装：[src/data/curriculumQuizzes.ts:3040](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumQuizzes.ts:3040)。

対象ID：`lecture-treatment-12`、`lecture-treatment-12-q3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`quiz.explanation`。

原文（抜粋）：

> 患者との信頼関係と治療成果は

確認したい事項：合意形成と治療成果の関係の根拠・条件。説明・理解確認と治療成果への因果主張の区別。

### lecture:review-33

実施中・実施後の反応を評価する

公開先：[/curriculum/lecture-practice-9](https://www.haritaro.jp/curriculum/lecture-practice-9)。実装：[src/data/curriculumQuizzes.ts:3409](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumQuizzes.ts:3409)。

対象ID：`lecture-practice-9`、`lecture-practice-9-q2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`quiz.explanation`。

原文（抜粋）：

> 反応があり単純な失神が疑われる場合は、外傷や呼吸困難がなければ仰向けで下肢を上げます。

確認したい事項：失神時の体位・下肢挙上の条件の原典・救急手順照合。反応・呼吸・外傷・医療連携の条件を専門家確認。

### lecture:review-34

陰陽論 レッスン3：陰陽はどう関係するか

公開先：[/curriculum/lecture-yinyang-3](https://www.haritaro.jp/curriculum/lecture-yinyang-3)。実装：[src/data/curriculumData.ts:479](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:479)。

対象ID：`lecture-yinyang-3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「陰在内、陽之守也。陽在外、陰之使也。」（陰は内に在りて陽の守なり。陽は外に在りて陰の使なり。）──『黄帝内経 素問』

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-35

精・気・血・津液・神の関係

公開先：[/curriculum/lecture-lifedynamics-2](https://www.haritaro.jp/curriculum/lecture-lifedynamics-2)。実装：[src/data/curriculumData.ts:2089](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2089)。

対象ID：`lecture-lifedynamics-2`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「天の我に来す者は徳なり、地の我に来す者は気なり、徳流れて気薄りて生あり。故に生之の来たるをこれ精と謂い、両精相搏つをこれ神と謂い、神に随いて往来する者をこれ魂と謂い、精並びて出入する者をこれ魄と謂い

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-36

飲食と呼吸から生命を支える

公開先：[/curriculum/lecture-lifedynamics-3](https://www.haritaro.jp/curriculum/lecture-lifedynamics-3)。実装：[src/data/curriculumData.ts:2146](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2146)。

対象ID：`lecture-lifedynamics-3`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「諸血の心に属する者は、皆目に注ぐ。諸気の肺に属する者は、皆皮に注ぐ。諸筋の肝に属する者は、皆関節に注ぐ。諸骨の腎に属する者は、皆髄に注ぐ。諸脈の脾に属する者は、皆営に注ぐ。」

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-37

営気と衛気の役割

公開先：[/curriculum/lecture-lifedynamics-4](https://www.haritaro.jp/curriculum/lecture-lifedynamics-4)。実装：[src/data/curriculumData.ts:2203](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2203)。

対象ID：`lecture-lifedynamics-4`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「営は脈中に在り、衛は脈外に在り、周流して休まず、五十度にして復た大会す。陰陽相貫き、環の端無きが如し。」

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-38

昇降出入で機能をつなぐ

公開先：[/curriculum/lecture-lifedynamics-7](https://www.haritaro.jp/curriculum/lecture-lifedynamics-7)。実装：[src/data/curriculumData.ts:2373](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2373)。

対象ID：`lecture-lifedynamics-7`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> 「升降出入、無器不有。故に器なる者は生化の宇なり。器散ずれば則ち分翔し、生化息す。故に無生、無長、無化、無収、無蔵、無生長壮老已。非升降出入にあらざれば、何をもってこれを生ぜん。」

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-39

活動と休息のリズムを理解する

公開先：[/curriculum/lecture-lifedynamics-8](https://www.haritaro.jp/curriculum/lecture-lifedynamics-8)。実装：[src/data/curriculumData.ts:2430](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2430)。

対象ID：`lecture-lifedynamics-8`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> **「陽気尽きて陰に入れば臥（ふ）し、陰気尽きて陽に出れば寤（さ）む。」**（『霊枢』口問篇）

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-40

正常な調節と、失調の入口を区別する

公開先：[/curriculum/lecture-lifedynamics-10](https://www.haritaro.jp/curriculum/lecture-lifedynamics-10)。実装：[src/data/curriculumData.ts:2545](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2545)。

対象ID：`lecture-lifedynamics-10`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> **「正気、内に存すれば、邪干すべからず。」**（『素問』刺法論）

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

### lecture:review-41

生命システムを統合して説明する

公開先：[/curriculum/lecture-lifedynamics-11](https://www.haritaro.jp/curriculum/lecture-lifedynamics-11)。実装：[src/data/curriculumData.ts:2602](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/curriculumData.ts:2602)。

対象ID：`lecture-lifedynamics-11`。 表示条件：既存の講義アクセス条件で表示。

確認する欄：`contentMarkdown`。

原文（抜粋）：

> **「凡そこの十二官は、相失するを得ず。故に主明らかなれば則ち下安く、主不明なれば則ち十二官危うし。」**

確認したい事項：古典引用の底本・篇章・原文・訳・前後の文脈の逐語照合。文章校閲を原典の医学的確認として扱わない。

<a id="articles"></a>

## 公開記事（18項目）

### article:hist-01

東洋医学の歴史と進化：古代の臨床知から現代科学へ／序論の見出し・冒頭

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:43](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:43)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 人体を「複雑適応システム」として捉えた最初の医学

確認したい事項：「最初」とする比較対象・年代・一次史料を確認する。見出しと既存アンカーを推測で改めていない。

確認担当の目安：医学史の専門家。

### article:hist-02

東洋医学の歴史と進化：古代の臨床知から現代科学へ／序論

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:53](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:53)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 人体解剖が厳しく制限されていた古代中国において、筋肉、神経、内臓、血管を直接視覚的に観察することは困難を極めました。

確認したい事項：どの時代・地域・社会制度の制限を指すかを史料で確認し、医学発展の理由を一つに限定できるか検討する。

確認担当の目安：医学史の専門家。

### article:hist-03

東洋医学の歴史と進化：古代の臨床知から現代科学へ／1. 工学・システム同定としてのブラックボックス解析

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:87](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:87)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 古代東洋医学も全く同じ構造を持っていました。

確認したい事項：工学と伝統診察の同一性を示す根拠と、筆者の学習用比喩の範囲を区別する。古代の医家が自律神経・内分泌などを推定したと読める後続文も確認する。

確認担当の目安：医学史・診察教育の専門家。

### article:hist-04

東洋医学の歴史と進化：古代の臨床知から現代科学へ／1. 工学・システム同定としてのブラックボックス解析

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:97](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:97)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 現代医学が静的な「平均値・基準値」を重視するのに対し、東洋医学は「環境に対する応答性と変化率」を重視したのです。

確認したい事項：現代医学と伝統医学の診察を一律に静的/動的と分ける説明の妥当性を確認する。具体的な診察・検査・研究対象での比較が必要。

確認担当の目安：医学史・臨床医学の専門家。

### article:hist-05

東洋医学の歴史と進化：古代の臨床知から現代科学へ／3. 『黄帝内経』の設計図 ― 素問・霊枢と三層階層モデル

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:127](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:127)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 心は肺と関係し、肺は腎と関係し、腎は肝と関係し、肝は脾と関係し、脾は再び心へ還流する

確認したい事項：この順序が古典のどの版・篇・条文のどの関係を指すかを確認する。五行の相生順序や実測された循環と混同しない説明にするかは専門家が判断する。

確認担当の目安：古典・五行論の専門家。

### article:hist-06

東洋医学の歴史と進化：古代の臨床知から現代科学へ／3. 『黄帝内経』の設計図 ― 素問・霊枢と三層階層モデル

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:129](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:129)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 『黄帝内経』は病気を以下の三層階層モデルで捉えていました

確認したい事項：三層分類が古典の明示的記述か筆者の再構成か、引用版・篇・条文を確認する。自律的制御網、多層オミクス、現代予防医学との対応の強さも確認する。

確認担当の目安：古典・医学史の専門家。

### article:hist-07

東洋医学の歴史と進化：古代の臨床知から現代科学へ／4. なぜ東洋医学は二千年以上受け継がれたのか ― 経験医学と科学的医学の相違

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:148](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:148)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 二千年間、数億人規模の臨床で「改善例・悪化例・成功と失敗のデータ」が絶え間なくフィードバックされ、有効な法則だけが淘汰を生き残ってきた

確認したい事項：人数・記録方法・比較条件・無効な慣行の排除を示す史料を確認する。長い使用歴だけでは有効性を証明できないという既存の学習案内との整合性を検討する。

確認担当の目安：医学史・臨床研究の専門家。

### article:hist-08

東洋医学の歴史と進化：古代の臨床知から現代科学へ／4. なぜ東洋医学は二千年以上受け継がれたのか ― 経験医学と科学的医学の相違

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:155](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:155)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 脊髄後角での侵害受容伝達を遮断し、下降性疼痛抑制系

確認したい事項：示唆と断定の範囲、動物種・刺激条件・測定対象・原著出典を確認する。この記事の歴史文献や症例集積だけで神経機序を裏付けたと読ませない。

確認担当の目安：鍼灸の神経生理研究の専門家。

### article:hist-09

東洋医学の歴史と進化：古代の臨床知から現代科学へ／5. 日本東洋医学の成立と適応進化 ― 古方派・管鍼法・腹診の独自発展

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:171](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:171)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 痛覚受容器（自由神経終末）への機械的衝撃を最小限に抑えつつ、無痛に近い切皮とミリ単位の深度制御が可能

確認したい事項：管鍼法で何を測定・比較した研究か、切皮と刺入深度の区別、刺激・痛みの個人差と条件を確認する。技術史の記述と生理学的機序・安全性の証明を区別する。

確認担当の目安：鍼灸手技・安全教育の専門家。

### article:hist-10

東洋医学の歴史と進化：古代の臨床知から現代科学へ／5. 日本東洋医学の成立と適応進化 ― 古方派・管鍼法・腹診の独自発展

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:174](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:174)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 内臓病態と処方を直結させる診断体系を完成させました。

確認したい事項：歴史的な方証相対の説明か、臓器疾患の診断精度・処方効果まで確立したという意味かを確認する。腹診記事の診断・処方の限界との整合性が必要。

確認担当の目安：漢方診察・医学史の専門家。

### article:hist-11

東洋医学の歴史と進化：古代の臨床知から現代科学へ／5. 日本東洋医学の成立と適応進化 ― 古方派・管鍼法・腹診の独自発展

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:177](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:177)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 1976年には医療用漢方エキス製剤148処方が国民皆保険に収載されました。

確認したい事項：1976年の収載処方数と、その後の追加時期を行政資料で照合する。数値や年代を推測で置き換えていない。

確認担当の目安：漢方の制度史に詳しい運営者・専門家。

### article:hist-12

東洋医学の歴史と進化：古代の臨床知から現代科学へ／5. 日本東洋医学の成立と適応進化 ― 古方派・管鍼法・腹診の独自発展

公開先：[/articles/science-of-oriental-medicine-history](https://www.haritaro.jp/articles/science-of-oriental-medicine-history)。実装：[src/data/articles/historyArticle.ts:177](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/historyArticle.ts:177)。

対象ID：`science-of-oriental-medicine-history`。 表示条件：公開。

原文（抜粋）：

> 今日では日本の医師の約8割以上が日常診療で漢方薬を活用しており

確認したい事項：調査年、対象医師、回答率、「使用経験」か「日常使用」かを確認する。「今日」の現行性と分母を特定する必要がある。

確認担当の目安：調査資料を確認できる運営者・専門家。

### article:yy-01

陰陽五行を学ぶ：伝統モデルと現代医学の違い／2. 陰陽の四原則・7. 相乗相侮・8. 五臓への配当

公開先：[/articles/science-of-yinyang-gogyo](https://www.haritaro.jp/articles/science-of-yinyang-gogyo)。実装：[src/data/articles/yinyangGogyoArticle.ts:117](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/yinyangGogyoArticle.ts:117)。

対象ID：`science-of-yinyang-gogyo`。 表示条件：公開。

原文（抜粋）：

> 陰陽の関係は、学習上、次の四つに整理されます。

確認したい事項：WHO用語集は既存注記でも一部定義のみ確認、参考書本文は未照合。四原則・相乗相侮・五臓配当の教材としての定義を、版・ページごとに照合する。

確認担当の目安：陰陽五行・古典教育の専門家。

### article:qi-01

気血津液を学ぶ：伝統的な分類と医学的評価／2. 気の働きを学ぶ

公開先：[/articles/science-of-qi-blood-fluid](https://www.haritaro.jp/articles/science-of-qi-blood-fluid)。実装：[src/data/articles/kiketsusuiArticle.ts:104](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/kiketsusuiArticle.ts:104)。

対象ID：`science-of-qi-blood-fluid`。 表示条件：公開。

原文（抜粋）：

> 自汗は睡眠中の汗だけを指す用語ではありません。

確認したい事項：自汗と盗汗の定義、睡眠/覚醒との区別が読み手に十分伝わるか確認する。現状の否定文だけから正しい定義を推測して追加していない。

確認担当の目安：気血津液・診察教育の専門家。

### article:mer-01

経絡を学ぶ：伝統理論と神経・結合組織の研究／1. 経絡の記述を学ぶ

公開先：[/articles/science-of-meridians-network](https://www.haritaro.jp/articles/science-of-meridians-network)。実装：[src/data/articles/meridianArticle.ts:53](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/meridianArticle.ts:53)。

対象ID：`science-of-meridians-network`。 表示条件：公開。

原文（抜粋）：

> 経脈やその分枝である絡脈を区別し、十二正経と奇経八脈などを学びます。

確認したい事項：WHO用語集の個別用語全件照合は既存注記でも未完了。経脈・絡脈・孫絡・奇経八脈・流注について教材の定義と典拠を確認する。

確認担当の目安：経絡教育・古典の専門家。

### article:tongue-01

舌診の科学：観察できること・確定できないこと／1. まず、観察と解釈を分ける・参考文献

公開先：[/articles/science-of-tongue-diagnosis](https://www.haritaro.jp/articles/science-of-tongue-diagnosis)。実装：[src/data/articles/tongueArticle.ts:28](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/tongueArticle.ts:28)。

対象ID：`science-of-tongue-diagnosis`。 表示条件：公開。

原文（抜粋）：

> 伝統的な舌診文献 [^classic-bian-she-zhinan] の分類

確認したい事項：『辨舌指南』は既存注記で引用版・巻・箇所の原典照合待ち。観察から寒証候補を考える例を含め、参照した具体的な分類を原典と照合する。

確認担当の目安：舌診・古典の専門家。

### article:gerd-01

逆流性食道炎・胃痛の東西相補アプローチ／4. 東洋医学の見立ての位置づけ

公開先：[/articles/east-west-integrative-gerd-gastric](https://www.haritaro.jp/articles/east-west-integrative-gerd-gastric)。実装：[src/data/articles/gerdArticle.ts:45](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/gerdArticle.ts:45)。

対象ID：`east-west-integrative-gerd-gastric`。 表示条件：公開。

原文（抜粋）：

> 「心下痞」はみぞおちのつかえなどを捉える用語で、『傷寒論』に半夏瀉心湯の記述があります。

確認したい事項：第149条の版・条文番号・痞と痞鞕の区別を確認する。GERDやFDの診断・処方適応の証明とは区別した既存の限定を維持する。

確認担当の目安：漢方・古典の専門家。

### article:gerd-02

逆流性食道炎・胃痛の東西相補アプローチ／2. 受診を優先する徴候

公開先：[/articles/east-west-integrative-gerd-gastric](https://www.haritaro.jp/articles/east-west-integrative-gerd-gastric)。実装：[src/data/articles/gerdArticle.ts:33](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/articles/gerdArticle.ts:33)。

対象ID：`east-west-integrative-gerd-gastric`。 表示条件：公開。

原文（抜粋）：

> 急な強い胸痛や息苦しさなどは救急受診を検討してください。

確認したい事項：脈診記事などの119案内との表現の整合性と、救急要請/速やかな受診を使い分ける条件を専門家が確認する。医学的な緊急性を推測で改めていない。

確認担当の目安：救急・消化器の専門家。

<a id="glossary"></a>

## 用語集（6項目）

### foundation:四関:1

四関

公開先：[/glossary#term-四関](https://www.haritaro.jp/glossary#term-%E5%9B%9B%E9%96%A2)。実装：[src/data/glossaryData.ts:199](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:199)。

対象ID：`四関`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 『針灸大成』では、四関を左右の合谷と太衝と記す。

確認したい事項：底本・該当篇・原文を特定し、この要約と「左右」の読みを照合する。古典記載の確認と配穴の臨床効果を区別する。

### foundation:四総穴:1

四総穴

公開先：[/glossary#term-四総穴](https://www.haritaro.jp/glossary#term-%E5%9B%9B%E7%B7%8F%E7%A9%B4)。実装：[src/data/glossaryData.ts:210](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:210)。

対象ID：`四総穴`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 『針灸大成』の四総穴歌は「肚腹は三里に留め、腰背は委中に求む、頭項は列欠に尋ね、面口は合谷に収む」。

確認したい事項：底本・原文・日本語訳の逐語照合、歌訣の部位名称と四穴の対応を専門家が確認する。引用と出典帰属を推測で書き換えない。

### foundation:五労:1

五労

公開先：[/glossary#term-五労](https://www.haritaro.jp/glossary#term-%E4%BA%94%E5%8A%B4)。実装：[src/data/glossaryData.ts:232](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:232)。

対象ID：`五労`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 久視・久臥・久坐・久立・久行と、血・気・肉・骨・筋との伝統的な関連を学ぶ。

確認したい事項：既存の未照合表示を維持。古典の底本と対応順序・訳の確認を要する。活動と臓器損傷の医学的因果関係を意味しないことも維持する。

### foundation:三陰交:1

三陰交

公開先：[/glossary#term-三陰交](https://www.haritaro.jp/glossary#term-%E4%B8%89%E9%99%B0%E4%BA%A4)。実装：[src/data/glossaryData.ts:287](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:287)。

対象ID：`三陰交`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 妊娠中の施術は個別評価を要し、三陰交に限らず強い刺激を避ける。自己判断で刺激せず、産科医と有資格鍼灸師に相談する。

確認したい事項：妊娠の時期・状態、刺激の種類と「強い刺激」の条件、根拠資料、個別評価の説明範囲を有資格者が確認する。この編集では刺激条件や安全性を推測しない。

### foundation:関元:1

関元

公開先：[/glossary#term-関元](https://www.haritaro.jp/glossary#term-%E9%96%A2%E5%85%83)。実装：[src/data/glossaryData.ts:320](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:320)。

対象ID：`関元`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 妊娠中の腹部への施術は特に慎重な評価が必要。体表の寸数は刺入深度や灸量の指示ではない。

確認したい事項：妊娠中の腹部施術に関する評価条件と根拠、位置情報と施術条件の区別を有資格者が確認する。施術手順や安全条件を追加しない。

### foundation:中脘:1

中脘

公開先：[/glossary#term-中脘](https://www.haritaro.jp/glossary#term-%E4%B8%AD%E8%84%98)。実装：[src/data/glossaryData.ts:331](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/glossaryData.ts:331)。

対象ID：`中脘`。 表示条件：公開用語集・本文中の用語ポップアップ。

確認する欄：`summary`。

原文（抜粋）：

> 伝統的な主治として胃痛、胃もたれ、呑酸、食欲不振、腹部膨満などを学ぶ。

確認したい事項：読者に説明のない「呑酸」の定義・読みと、運営教材で使う平易な言い換えを確認する。逆流性食道炎などの現代医学の診断へ置き換えず、主治の範囲を専門家が確認する。

<a id="extraordinary-meridians"></a>

## 奇経八脈・八脈交会穴（25項目）

一覧ページの4ペアは公開。詳細ページの督脈・任脈の本文と演習は無料、他6脈の本文と演習はプレミアムです。公開ルートがあることと、全本文を非会員が読めることを区別しています。

### tool:kikei:index:immediate-effect

効果の速度・範囲／伝統モデルと生理機構

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/app/kikei/page.tsx:50](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/kikei/page.tsx:50)。

対象ID：`kikei:index:immediate-effect`。 表示条件：公開。

原文（抜粋）：

> 正経十二経脈を「縦横に流れる溝渠（河川）」に例えるなら、奇経八脈は「湖や貯水池」。正経の気血が溢れたときに蓄え、不足したときに補うことで、生体の動的平衡を保ちます。臨床では「八脈交会穴」を介して頑固な慢性病や自律神経失調に即効性を発揮します。

確認したい事項：「慢性病」「自律神経失調」の対象定義、配穴と施術方法、比較対象、即効性を評価した時点と指標、害の報告を確認。貯水池の比喩と測定された生理学的な動的平衡を区別できる記述か専門家が確認する。

### tool:kikei:quiz:q1:template

機序・利用頻度

公開先：[/kikei/toku](https://www.haritaro.jp/kikei/toku)、[/kikei/nin](https://www.haritaro.jp/kikei/nin)、[/kikei/sho](https://www.haritaro.jp/kikei/sho)、[/kikei/tai](https://www.haritaro.jp/kikei/tai)、[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)、[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)、[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)、[/kikei/ini](https://www.haritaro.jp/kikei/ini)。実装：[src/components/kikei/KikeiQuizSection.tsx:41](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/kikei/KikeiQuizSection.tsx:41)。

対象ID：`toku/q1`、`nin/q1`、`sho/q1`、`tai/q1`、`yokyo/q1`、`inkyo/q1`、`yoi/q1`、`ini/q1`。

原文（生成テンプレート）：

> ${vessel.name}の八脈交会穴（主穴）は「${vessel.masterPoint.name}（${vessel.masterPoint.code}）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。

確認したい事項：主穴の伝統的な対応と「気血を駆動」「臨床で多用」の主張を区別し、典拠と実際の利用頻度を示す資料を確認する。

生成される表示文と対象問題：

- `toku/q1`／[/kikei/toku](https://www.haritaro.jp/kikei/toku)：督脈の八脈交会穴（主穴）は「後渓（SI3）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `nin/q1`／[/kikei/nin](https://www.haritaro.jp/kikei/nin)：任脈の八脈交会穴（主穴）は「列欠（LU7）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `sho/q1`／[/kikei/sho](https://www.haritaro.jp/kikei/sho)：衝脈の八脈交会穴（主穴）は「公孫（SP4）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `tai/q1`／[/kikei/tai](https://www.haritaro.jp/kikei/tai)：帯脈の八脈交会穴（主穴）は「足臨泣（GB41）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `yokyo/q1`／[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)：陽蹻脈の八脈交会穴（主穴）は「申脈（BL62）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `inkyo/q1`／[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)：陰蹻脈の八脈交会穴（主穴）は「照海（KI6）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `yoi/q1`／[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)：陽維脈の八脈交会穴（主穴）は「外関（TE5）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。
- `ini/q1`／[/kikei/ini](https://www.haritaro.jp/kikei/ini)：陰維脈の八脈交会穴（主穴）は「内関（PC6）」です。奇経八脈の気血を駆動する要穴として臨床で多用されます。

### tool:kikei:quiz:q2:template

即効・配穴相補の断定

公開先：[/kikei/toku](https://www.haritaro.jp/kikei/toku)、[/kikei/nin](https://www.haritaro.jp/kikei/nin)、[/kikei/sho](https://www.haritaro.jp/kikei/sho)、[/kikei/tai](https://www.haritaro.jp/kikei/tai)、[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)、[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)、[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)、[/kikei/ini](https://www.haritaro.jp/kikei/ini)。実装：[src/components/kikei/KikeiQuizSection.tsx:52](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/kikei/KikeiQuizSection.tsx:52)。

対象ID：`toku/q2`、`nin/q2`、`sho/q2`、`tai/q2`、`yokyo/q2`、`inkyo/q2`、`yoi/q2`、`ini/q2`。

原文（生成テンプレート）：

> ${vessel.name}は「${vessel.pairName}」を構成し、主に【${vessel.pairTargetArea}】の病態に即効性を示します。主穴と相補的に作用します。

確認したい事項：各ペアで列挙した領域・疾患への即効性を、対象、配穴、刺鍼等の方法、比較対象、評価時点、効果量と安全性ごとに確認する。「相補的に作用」の根拠も単穴との比較で確認する。

生成される表示文と対象問題：

- `toku/q2`／[/kikei/toku](https://www.haritaro.jp/kikei/toku)：督脈は「後渓 - 申脈ペア」を構成し、主に【目内眥・頚・項・耳・肩背・腰背部】の病態に即効性を示します。主穴と相補的に作用します。
- `nin/q2`／[/kikei/nin](https://www.haritaro.jp/kikei/nin)：任脈は「列欠 - 照海ペア」を構成し、主に【肺系・咽喉・胸部・呼吸器・生殖器】の病態に即効性を示します。主穴と相補的に作用します。
- `sho/q2`／[/kikei/sho](https://www.haritaro.jp/kikei/sho)：衝脈は「公孫 - 内関ペア」を構成し、主に【心・胸・胃・腹部・消化器全般】の病態に即効性を示します。主穴と相補的に作用します。
- `tai/q2`／[/kikei/tai](https://www.haritaro.jp/kikei/tai)：帯脈は「足臨泣 - 外関ペア」を構成し、主に【目外眥・耳後・頚・肩・側頭部・側腹部】の病態に即効性を示します。主穴と相補的に作用します。
- `yokyo/q2`／[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)：陽蹻脈は「申脈 - 後渓ペア」を構成し、主に【目内眥・側頭・背腰部・外果部】の病態に即効性を示します。主穴と相補的に作用します。
- `inkyo/q2`／[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)：陰蹻脈は「照海 - 列欠ペア」を構成し、主に【肺系・咽喉・胸部・内果部】の病態に即効性を示します。主穴と相補的に作用します。
- `yoi/q2`／[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)：陽維脈は「外関 - 足臨泣ペア」を構成し、主に【目外眥・耳・肩・頚・体表部全般】の病態に即効性を示します。主穴と相補的に作用します。
- `ini/q2`／[/kikei/ini](https://www.haritaro.jp/kikei/ini)：陰維脈は「内関 - 公孫ペア」を構成し、主に【心・胸・胃・腹部・精神神経系】の病態に即効性を示します。主穴と相補的に作用します。

### tool:kikei:quiz:q3:template

臨床適応・不可欠の断定

公開先：[/kikei/toku](https://www.haritaro.jp/kikei/toku)、[/kikei/nin](https://www.haritaro.jp/kikei/nin)、[/kikei/sho](https://www.haritaro.jp/kikei/sho)、[/kikei/tai](https://www.haritaro.jp/kikei/tai)、[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)、[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)、[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)、[/kikei/ini](https://www.haritaro.jp/kikei/ini)。実装：[src/components/kikei/KikeiQuizSection.tsx:62](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/kikei/KikeiQuizSection.tsx:62)。

対象ID：`toku/q3`、`nin/q3`、`sho/q3`、`tai/q3`、`yokyo/q3`、`inkyo/q3`、`yoi/q3`、`ini/q3`。

原文（生成テンプレート）：

> ${vessel.name}の主治には「${vessel.indications.slice(0, 2).join("・")}」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。

確認したい事項：「頑固な慢性疾患」の対象と、どの条件で「不可欠」といえるのかを確認する。伝統的な主治と現代医学の適応・必須性を区別し、他の治療を置き換える説明になっていないか確認する。

生成される表示文と対象問題：

- `toku/q3`／[/kikei/toku](https://www.haritaro.jp/kikei/toku)：督脈の主治には「脊柱の強直・背部痛・腰痛・坐骨神経痛・頭痛・めまい・頸部こり・後頭部痛」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `nin/q3`／[/kikei/nin](https://www.haritaro.jp/kikei/nin)：任脈の主治には「月経不順・無月経・不妊症・帯下異常・更年期障害・下腹部痛・冷え・便秘・尿閉・遺尿・前立腺肥大」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `sho/q3`／[/kikei/sho](https://www.haritaro.jp/kikei/sho)：衝脈の主治には「気の突き上げ（逆気・上気・動悸・パニック様症状）・激しい腹痛・胃痙攣・胸やけ・呑酸・悪心・胃下垂」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `tai/q3`／[/kikei/tai](https://www.haritaro.jp/kikei/tai)：帯脈の主治には「帯脈の弛緩による帯下異常（おりもの・帯下の過多）・腰椎骨盤の不安定感（「水の中に座っているような腰の重だるさ」）」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `yokyo/q3`／[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)：陽蹻脈の主治には「下肢外側の筋痙攣・強直（内反足・外側が突っ張る歩行困難）・不眠症・目が冴えて眠れない（陽気亢進・開目）」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `inkyo/q3`／[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)：陰蹻脈の主治には「下肢内側の筋痙攣・引きつれ（外反足・内側が突っ張る）・過剰な傾眠・日中に強烈な眠気に襲われる（嗜眠・閉目）」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `yoi/q3`／[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)：陽維脈の主治には「悪寒発熱の往来（少陽病・マラリア様の寒熱交代）・体表の風邪症状・急性の悪寒・無汗・全身の筋肉痛」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。
- `ini/q3`／[/kikei/ini](https://www.haritaro.jp/kikei/ini)：陰維脈の主治には「心痛・胸痛・胸内苦悶・心悸亢進・狭心症様症状・重度の精神不安・抑うつ・不眠・感情の不安定・悲哀感」などがあり、頑固な慢性疾患や気血の偏在調整に不可欠です。

### tool:kikei:toku:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/toku](https://www.haritaro.jp/kikei/toku)。実装：[src/data/kikeiData.ts:67](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:67)。

対象ID：`toku`。 表示条件：無料の本文・演習。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 督脈の病変には通督脈穴の後渓を用い、申脈を配穴することで脊柱・項背部の筋緊張を急速に緩和させます。百会や大椎との併用で陽気の昇発・自律神経調整に卓効があります。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:nin:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/nin](https://www.haritaro.jp/kikei/nin)。実装：[src/data/kikeiData.ts:109](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:109)。

対象ID：`nin`。 表示条件：無料の本文・演習。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 任脈は気血・津液の根本であり、列欠（通任脈）と照海（通陰蹻脈）の組み合わせは、喉の乾燥や慢性の咳、喉のつかえ感（梅核気）、婦人科系疾患に絶大な効果を発揮します。中脘・気海・関元への施灸との併用が著効です。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:sho:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/sho](https://www.haritaro.jp/kikei/sho)。実装：[src/data/kikeiData.ts:151](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:151)。

対象ID：`sho`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 公孫（通衝脈）と内関（通陰維脈）のペアは八脈交会穴の中で最も使用頻度が高く、「胃・心・胸」のすべての逆気・自律神経緊張に即効性があります。過敏性腸症候群や胃痛・パニック発作の第一選択です。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:tai:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/tai](https://www.haritaro.jp/kikei/tai)。実装：[src/data/kikeiData.ts:191](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:191)。

対象ID：`tai`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 足臨泣（通帯脈）と外関（通陽維脈）を併用することで、少陽経の熱を清解しつつ帯脈を引き締め、頑固な片頭痛や帯下・骨盤痛・側頭部痛を改善します。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:yokyo:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)。実装：[src/data/kikeiData.ts:232](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:232)。

対象ID：`yokyo`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 申脈（通陽蹻脈）は陽気の巡りを助け、後渓と組むことで下肢外側の引き攣れや睡眠リズム障害（特に「夜になっても目が冴えて眠れない」興奮状態）を沈静化します。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:inkyo:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)。実装：[src/data/kikeiData.ts:273](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:273)。

対象ID：`inkyo`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 照海（通陰蹻脈）は腎陰を補い、陰蹻の走行を潤します。列欠と併用することで、過眠症や夜間痛、喉の激しい乾燥を伴う慢性陰虚に素晴らしい効果をもたらします。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:yoi:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)。実装：[src/data/kikeiData.ts:314](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:314)。

対象ID：`yoi`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 外関（通陽維脈）は外邪を解表する要穴であり、足臨泣と組むことで体表の邪を速やかに追い払い、往来寒熱や側頭部の激痛を鎮めます。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:kikei:ini:clinicalTips

配穴の治療効果・速度・機序

公開先：[/kikei/ini](https://www.haritaro.jp/kikei/ini)。実装：[src/data/kikeiData.ts:355](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:355)。

対象ID：`ini`。 表示条件：本文はプレミアム。

確認する欄：`clinicalTips`。

原文（抜粋）：

> 内関（通陰維脈）は心神安寧の特効穴です。公孫と組むことで「心・胸・胃」のすべての気滞・瘀血・情志異常（ストレス性の胃痛や胸痛）を速やかに緩解させます。

確認したい事項：主治の古典的な説明と検証された臨床効果を区別する。列挙した対象疾患、配穴・刺激方法、比較群、評価期間、効果量、安全性、「卓効」「絶大」「即効」「特効」「改善」等の断定強度を支える資料を専門家が確認する。

### tool:hachimyaku:kouson-naikan:clinicalSignificance

配穴の効果・機序・利用頻度

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/data/kikeiData.ts:386](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:386)。

対象ID：`kouson-naikan`。 表示条件：公開。

確認する欄：`clinicalSignificance`。

原文（抜粋）：

> 八脈交会穴の中で最も臨床応用される黄金ペア。消化器の気逆と心神の不安を同時に整える。

確認したい事項：伝統的な配穴の説明と、痛み・炎症・自律神経への臨床効果の主張を分けて確認する。対象、配穴方法、比較、評価時点、利用頻度、根拠資料を特定し、「リセット」「即効」等の表現が支持範囲内か確認する。

### tool:hachimyaku:koukei-shinmyaku:clinicalSignificance

配穴の効果・機序・利用頻度

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/data/kikeiData.ts:395](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:395)。

対象ID：`koukei-shinmyaku`。 表示条件：公開。

確認する欄：`clinicalSignificance`。

原文（抜粋）：

> 脊柱正中と身体後面の全陽気を統括。骨格・筋膜の強直を解き、姿勢と自律神経をリセットする。

確認したい事項：伝統的な配穴の説明と、痛み・炎症・自律神経への臨床効果の主張を分けて確認する。対象、配穴方法、比較、評価時点、利用頻度、根拠資料を特定し、「リセット」「即効」等の表現が支持範囲内か確認する。

### tool:hachimyaku:rinshyu-gaikan:clinicalSignificance

配穴の効果・機序・利用頻度

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/data/kikeiData.ts:404](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:404)。

対象ID：`rinshyu-gaikan`。 表示条件：公開。

確認する欄：`clinicalSignificance`。

原文（抜粋）：

> 側頭部から骨盤を包む少陽・帯脈系統を清熱。ストレスによる気滞や側面の痛みを即効で緩める。

確認したい事項：伝統的な配穴の説明と、痛み・炎症・自律神経への臨床効果の主張を分けて確認する。対象、配穴方法、比較、評価時点、利用頻度、根拠資料を特定し、「リセット」「即効」等の表現が支持範囲内か確認する。

### tool:hachimyaku:rekkesu-shoukai:clinicalSignificance

配穴の効果・機序・利用頻度

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/data/kikeiData.ts:413](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:413)。

対象ID：`rekkesu-shoukai`。 表示条件：公開。

確認する欄：`clinicalSignificance`。

原文（抜粋）：

> 金（肺）水（腎）相生を促し、全身の津液・陰液を滋養。呼吸器の炎症と婦人科・泌尿器の虚熱を鎮める。

確認したい事項：伝統的な配穴の説明と、痛み・炎症・自律神経への臨床効果の主張を分けて確認する。対象、配穴方法、比較、評価時点、利用頻度、根拠資料を特定し、「リセット」「即効」等の表現が支持範囲内か確認する。

### tool:kikei:toku:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/toku](https://www.haritaro.jp/kikei/toku)。実装：[src/data/kikeiData.ts:63](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:63)。

対象ID：`toku`。 表示条件：無料の本文・演習。

確認する欄：`indications`。

原文（抜粋）：

> 精神不安・てんかん・意識障害・自律神経失調

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

同じ論点に含めた主治行：

- [src/data/kikeiData.ts:63](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:63)：精神不安・てんかん・意識障害・自律神経失調
- [src/data/kikeiData.ts:64](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:64)：小児のひきつけ・発熱性痙攣

### tool:kikei:nin:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/nin](https://www.haritaro.jp/kikei/nin)。実装：[src/data/kikeiData.ts:104](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:104)。

対象ID：`nin`。 表示条件：無料の本文・演習。

確認する欄：`indications`。

原文（抜粋）：

> 下腹部痛・冷え・便秘・尿閉・遺尿・前立腺肥大

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

同じ論点に含めた主治行：

- [src/data/kikeiData.ts:104](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:104)：下腹部痛・冷え・便秘・尿閉・遺尿・前立腺肥大
- [src/data/kikeiData.ts:106](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:106)：気管支喘息・咳・息切れ・咽喉腫痛（胸中壇中・天突）

### tool:kikei:sho:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/sho](https://www.haritaro.jp/kikei/sho)。実装：[src/data/kikeiData.ts:145](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:145)。

対象ID：`sho`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 気の突き上げ（逆気・上気・動悸・パニック様症状）

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

同じ論点に含めた主治行：

- [src/data/kikeiData.ts:145](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:145)：気の突き上げ（逆気・上気・動悸・パニック様症状）
- [src/data/kikeiData.ts:149](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:149)：胸内苦悶感・狭心症様胸痛・呼吸促迫

### tool:kikei:tai:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/tai](https://www.haritaro.jp/kikei/tai)。実装：[src/data/kikeiData.ts:187](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:187)。

対象ID：`tai`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 下肢の脱力・運動麻痺・冷え

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

### tool:kikei:yokyo:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/yokyo](https://www.haritaro.jp/kikei/yokyo)。実装：[src/data/kikeiData.ts:228](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:228)。

対象ID：`yokyo`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 日中のてんかん発作・日中の意識もうろう

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

### tool:kikei:inkyo:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/inkyo](https://www.haritaro.jp/kikei/inkyo)。実装：[src/data/kikeiData.ts:268](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:268)。

対象ID：`inkyo`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 過剰な傾眠・日中に強烈な眠気に襲われる（嗜眠・閉目）

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

同じ論点に含めた主治行：

- [src/data/kikeiData.ts:268](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:268)：過剰な傾眠・日中に強烈な眠気に襲われる（嗜眠・閉目）
- [src/data/kikeiData.ts:269](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:269)：夜間のてんかん発作・夜間の下腹部痛

### tool:kikei:yoi:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/yoi](https://www.haritaro.jp/kikei/yoi)。実装：[src/data/kikeiData.ts:311](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:311)。

対象ID：`yoi`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 耳鳴り・難聴・めまい・乗り物酔い

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

### tool:kikei:ini:indications-scope

主治・適応の範囲と医療評価

公開先：[/kikei/ini](https://www.haritaro.jp/kikei/ini)。実装：[src/data/kikeiData.ts:349](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:349)。

対象ID：`ini`。 表示条件：本文はプレミアム。

確認する欄：`indications`。

原文（抜粋）：

> 心痛・胸痛・胸内苦悶・心悸亢進・狭心症様症状

確認したい事項：意識障害・痙攣・胸痛・呼吸症状・尿閉・運動麻痺・強い精神症状などを伝統的主治のリストで示すとき、実際の疾患の診断・緊急性評価・医療上の適応が別に必要であることを、個別の状態と典拠に沿って専門家が確認する。この記録は主治そのものの専門的正誤を判定していない。

同じ論点に含めた主治行：

- [src/data/kikeiData.ts:349](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:349)：心痛・胸痛・胸内苦悶・心悸亢進・狭心症様症状
- [src/data/kikeiData.ts:350](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:350)：重度の精神不安・抑うつ・不眠・感情の不安定・悲哀感
- [src/data/kikeiData.ts:353](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:353)：甲状腺腫大・頚部のしこり・喉の異物感

### tool:hachimyaku:rinshyu-gaikan:indication-scope

現代疾患の適応と医療評価

公開先：[/kikei](https://www.haritaro.jp/kikei)。実装：[src/data/kikeiData.ts:403](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/data/kikeiData.ts:403)。

対象ID：`rinshyu-gaikan`。 表示条件：公開。

確認する欄：`indications`。

原文（抜粋）：

> 耳鳴り・突発性難聴・めまい

確認したい事項：突発性難聴を含む主治一覧の典拠、医療評価の優先順位と時間条件を専門家が確認する。伝統的な関連を疾患への施術適応や改善保証として読ませる範囲になっていないか確認する。

<a id="acupoint-comparison"></a>

## 経穴比較プリセット（4項目）

### tool:compare:LI4-LR3:description

比較プリセットの伝統分類・効能・使い分け

公開先：[/tsubo/compare](https://www.haritaro.jp/tsubo/compare)。実装：[src/app/tsubo/compare/CompareClient.tsx:31](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/compare/CompareClient.tsx:31)。

対象ID：`LI4-LR3`。 表示条件：公開プリセット。

確認する欄：`desc`。

原文（抜粋）：

> 手陽明大腸経（気・昇）と足厥陰肝経（血・降）の原穴対比。全身の気血巡行を司る2大原穴。

確認したい事項：各穴の分類と部位・主治の典拠、比較に使った「気／血」「昇／降」「急性／慢性」「気虚／血虚」「自律神経」の基準を確認する。プリセットの要約から個人への使い分け・有効性が決まる説明になっていないか専門家が確認する。古典の歌訣を含むものは底本・原文・訳の逐語照合も必要。

### tool:compare:ST36-SP6:description

比較プリセットの伝統分類・効能・使い分け

公開先：[/tsubo/compare](https://www.haritaro.jp/tsubo/compare)。実装：[src/app/tsubo/compare/CompareClient.tsx:36](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/compare/CompareClient.tsx:36)。

対象ID：`ST36-SP6`。 表示条件：公開プリセット。

確認する欄：`desc`。

原文（抜粋）：

> 胃の合穴（後天の本・気虚改善）と足三陰の交会穴（血虚・婦人科疾患）の使い分け。

確認したい事項：各穴の分類と部位・主治の典拠、比較に使った「気／血」「昇／降」「急性／慢性」「気虚／血虚」「自律神経」の基準を確認する。プリセットの要約から個人への使い分け・有効性が決まる説明になっていないか専門家が確認する。古典の歌訣を含むものは底本・原文・訳の逐語照合も必要。

### tool:compare:PC6-HT7:description

比較プリセットの伝統分類・効能・使い分け

公開先：[/tsubo/compare](https://www.haritaro.jp/tsubo/compare)。実装：[src/app/tsubo/compare/CompareClient.tsx:41](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/compare/CompareClient.tsx:41)。

対象ID：`PC6-HT7`。 表示条件：公開プリセット。

確認する欄：`desc`。

原文（抜粋）：

> 心包経の絡穴（胸肋・胃腸・動悸の降気）と心経の原穴（心神安寧・不眠・健忘の鎮静）。

確認したい事項：各穴の分類と部位・主治の典拠、比較に使った「気／血」「昇／降」「急性／慢性」「気虚／血虚」「自律神経」の基準を確認する。プリセットの要約から個人への使い分け・有効性が決まる説明になっていないか専門家が確認する。古典の歌訣を含むものは底本・原文・訳の逐語照合も必要。

### tool:compare:BL40-BL23:description

比較プリセットの伝統分類・効能・使い分け

公開先：[/tsubo/compare](https://www.haritaro.jp/tsubo/compare)。実装：[src/app/tsubo/compare/CompareClient.tsx:46](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/compare/CompareClient.tsx:46)。

対象ID：`BL40-BL23`。 表示条件：公開プリセット。

確認する欄：`desc`。

原文（抜粋）：

> 四総穴「腰背は委中に留む」（急性・瘀血・合穴）と腎の背部兪穴（慢性・腎虚腰痛）の比較。

確認したい事項：各穴の分類と部位・主治の典拠、比較に使った「気／血」「昇／降」「急性／慢性」「気虚／血虚」「自律神経」の基準を確認する。プリセットの要約から個人への使い分け・有効性が決まる説明になっていないか専門家が確認する。古典の歌訣を含むものは底本・原文・訳の逐語照合も必要。

<a id="symptom-comparison"></a>

## 症状別ガイドの東西医学比較（42項目）

3症状ページの「東西医学の比較モデルを学ぶ」を展開すると、対象ケースを読み込みます。東洋医学・西洋医学・相補マトリクスの表示切替で読める既存文です。モデルが同一性や効果を証明しないという既存の注記はありますが、個々の断定を裏づける資料の確認とは別です。

### tool:integrative:gerd-gastric:pathology

伝統的病機と現代の原因・生理機構

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:96](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:96)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.pathologyMechanism`。

原文（抜粋）：

> 中焦（ちゅうしょう：脾胃）の気機昇降失調。正常であれば「胃気は下行（降濁）」し、「脾気は上昇（昇清）」して飲食物を運化する。ストレスや冷飲食により胃気が上逆（胃気上逆）することで呑酸・胸焼け・嘔気が生じる。

確認したい事項：伝統用語のモデルと、逆流・血流・栄養失調・睡眠の現代医学的な機序を区別する。ストレスや冷飲食等から症状が生じる因果関係、疾患の病機を一般化する対象・条件・資料を専門家が確認する。

### tool:integrative:gerd-gastric:point:CV12

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:115](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:115)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 胃の募穴・八会穴の腑会。胃気の昇降バランスを整える最重要穴。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:gerd-gastric:point:PC6

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:116](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:116)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 絡穴・八脈交会穴。迷走神経を介して嘔気・胃気上逆を強力に鎮める。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:gerd-gastric:point:ST36

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:117](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:117)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 合穴・下合穴。消化管運動を正常化し、胃気を下行へと導く。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:gerd-gastric:point:LR3

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:118](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:118)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 原穴。ストレス性の肝気横逆（自律神経の過興奮）を鎮静。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:gerd-gastric:lifestyle

生活指導の適用条件・効果

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:120](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:120)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.lifestyle`。

原文（抜粋）：

> 食後2時間は横にならず上体を起こす。就寝前3時間の飲食禁止。白砂糖・脂っこい食事・炭酸・強烈な柑橘類を控え、みぞおちから腹部を冷やさない。

確認したい事項：対象疾患と個人差、食事や運動・温冷刺激の適用条件、禁止時間や内容の根拠、「著効」等の効果表現を確認する。一律の禁止・推奨ではなくどの状態で使う説明かを専門家が確認する。

### tool:integrative:gerd-gastric:coreConcept

統合治療の改善・根本治癒の主張

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:123](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:123)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.coreConcept`。

原文（抜粋）：

> 構造的破壊を西洋医学で即時防ぎ、機能的滞りを東洋医学で根本治癒する協働モデル

確認したい事項：「即時」「根本治癒」「根本改善」「取り戻す」の対象、到達条件、比較介入、評価指標・期間、再発の評価、実証された併用の効果を確認する。役割分担のモデルと治癒・機能回復の保証を区別できるか専門家が確認する。

### tool:integrative:gerd-gastric:synergyEffect

併用による効果の増加・改善保証

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:150](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:150)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.synergyEffect`。

原文（抜粋）：

> 西洋医学の「急性期粘膜防御」と東洋医学の「気機昇降・自律神経回復」が噛み合うことで、難治性胃痛の寛解率が飛躍的に向上します。

確認したい事項：併用が単独介入より有効であることを示す比較研究、対象、効果量、期間、再発や害の評価を確認する。「飛躍的」「ゼロ」「身体に再学習」の断定と機序を支える出典を専門家が確認する。

### tool:integrative:gerd-gastric:step1

疾患・リスク除外の確実性

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:129](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:129)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[0].detail`。

原文（抜粋）：

> まず胃癌・食道癌・急性胃潰瘍・心筋梗塞関連痛を画像と生検で完全に除外。生命の安全を最優先で確立。

確認したい事項：検査の対象・診断精度・限界・追加評価と医療判断を確認する。「完全に除外」「確定」「リスクを排除」等の保証や一律の段階を支える資料があるか専門家が確認する。

### tool:integrative:gerd-gastric:step3

施術・漢方の神経機序と改善量

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:141](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:141)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[2].detail`。

原文（抜粋）：

> PPI抵抗性の胸焼けや機能性ディスペプシアに対し、内関・足三里への刺鍼と半夏瀉心湯等で、胃の適応性弛緩と自律神経リズムを正常化。

確認したい事項：個別の経穴・漢方処方、対象、方法、比較、評価指標と期間、安全性を確認する。神経・血流の機序と症状改善を区別し、「正常化」「激減」「機能を回復」を支える根拠の範囲を専門家が確認する。

### tool:integrative:gerd-gastric:step4

薬剤減量・休薬と再発予防

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:147](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:147)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[3].detail`。

原文（抜粋）：

> 症状安定後はPPIを休薬・頓用化へ導き、東洋医学的な体質改善と生活養生で長期的な中庸状態を保つ。

確認したい事項：薬剤の減量・頓用・休薬の対象と医師の判断、再発や離脱の評価、個別条件を確認する。鍼灸・漢方・体質改善から薬を手放せると一般化する根拠と安全性を専門家が確認する。

### tool:integrative:headache-migraine:pathology

伝統的病機と現代の原因・生理機構

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:182](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:182)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.pathologyMechanism`。

原文（抜粋）：

> 「頭為諸陽之会（頭は諸陽の会す所）」「不通則痛・不栄則痛」。頭部はすべての陽経が集まる場所。肝火の上昇（肝陽上亢）や、冷え・ストレスによる血流鬱滞（瘀血）、気血不足による栄養失調で発症。

確認したい事項：伝統用語のモデルと、逆流・血流・栄養失調・睡眠の現代医学的な機序を区別する。ストレスや冷飲食等から症状が生じる因果関係、疾患の病機を一般化する対象・条件・資料を専門家が確認する。

### tool:integrative:headache-migraine:point:GB20

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:201](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:201)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 後頭動脈と大後頭神経の交点。頭部の血流を一気に解放する要穴。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:headache-migraine:point:LI4

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:202](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:202)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 四総穴（面目は合谷に収む）。頭面部全般の鎮痛と陽気降下。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:headache-migraine:point:LR3

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:203](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:203)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 肝陽上亢を抑え、こめかみの血管拍動痛を速やかに鎮静。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:headache-migraine:point:GV20

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:204](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:204)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 頭頂部で諸陽を統括し、自律神経の交感神経過緊張を解除。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:headache-migraine:lifestyle

生活指導の適用条件・効果

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:206](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:206)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.lifestyle`。

原文（抜粋）：

> 首の後ろを冷やさない。片頭痛の拍動時は暗く静かな部屋で安静にし局所を軽く冷やす。緊張型は肩甲骨の可動域拡大と入浴での温熱が著効。

確認したい事項：対象疾患と個人差、食事や運動・温冷刺激の適用条件、禁止時間や内容の根拠、「著効」等の効果表現を確認する。一律の禁止・推奨ではなくどの状態で使う説明かを専門家が確認する。

### tool:integrative:headache-migraine:coreConcept

統合治療の改善・根本治癒の主張

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:209](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:209)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.coreConcept`。

原文（抜粋）：

> 重大脳血管障害を西洋医学で即座に除外後、東洋医学で体質と血流の根本改善を行う統合体制

確認したい事項：「即時」「根本治癒」「根本改善」「取り戻す」の対象、到達条件、比較介入、評価指標・期間、再発の評価、実証された併用の効果を確認する。役割分担のモデルと治癒・機能回復の保証を区別できるか専門家が確認する。

### tool:integrative:headache-migraine:synergyEffect

併用による効果の増加・改善保証

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:236](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:236)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.synergyEffect`。

原文（抜粋）：

> 西洋医学の急性発作コントロール力と東洋医学の予防的体質改善が組み合わさり、頭痛難民をゼロにします。

確認したい事項：併用が単独介入より有効であることを示す比較研究、対象、効果量、期間、再発や害の評価を確認する。「飛躍的」「ゼロ」「身体に再学習」の断定と機序を支える出典を専門家が確認する。

### tool:integrative:headache-migraine:step1

疾患・リスク除外の確実性

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:215](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:215)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[0].detail`。

原文（抜粋）：

> くも膜下出血や脳血管奇形がないことを確定させ、安心して機能的アプローチを選択できる土台を確保。

確認したい事項：検査の対象・診断精度・限界・追加評価と医療判断を確認する。「完全に除外」「確定」「リスクを排除」等の保証や一律の段階を支える資料があるか専門家が確認する。

### tool:integrative:headache-migraine:step3

施術・漢方の神経機序と改善量

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:227](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:227)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[2].detail`。

原文（抜粋）：

> 風池・天柱への刺鍼と漢方で後頭部・側頭部の慢性虚血を解消し、頭痛の発生頻度そのものを激減させる。

確認したい事項：個別の経穴・漢方処方、対象、方法、比較、評価指標と期間、安全性を確認する。神経・血流の機序と症状改善を区別し、「正常化」「激減」「機能を回復」を支える根拠の範囲を専門家が確認する。

### tool:integrative:headache-migraine:step4

薬剤減量・休薬と再発予防

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:233](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:233)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[3].detail`。

原文（抜粋）：

> 毎日の鎮痛薬依存から脱却させ、天候変化やストレスに揺るがない自律神経基盤を再構築。

確認したい事項：薬剤の減量・頓用・休薬の対象と医師の判断、再発や離脱の評価、個別条件を確認する。鍼灸・漢方・体質改善から薬を手放せると一般化する根拠と安全性を専門家が確認する。

### tool:integrative:insomnia-autonomic:pathology

伝統的病機と現代の原因・生理機構

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:267](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:267)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.pathologyMechanism`。

原文（抜粋）：

> 「心腎不交（しんじんふこう）」「陽不入陰（ようふにゅういん）」。昼は陽気が体表を巡って活動し、夜は陽気が体内の陰に入って潜蔵することで睡眠が訪れる。過労やストレスで腎水が衰え心火を制御できなくなると、神（しん：精神意識）が休まらず不眠となる。

確認したい事項：伝統用語のモデルと、逆流・血流・栄養失調・睡眠の現代医学的な機序を区別する。ストレスや冷飲食等から症状が生じる因果関係、疾患の病機を一般化する対象・条件・資料を専門家が確認する。

### tool:integrative:insomnia-autonomic:point:HT7

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:286](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:286)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 原穴。心を養い精神不安を鎮める安神の代表穴。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:insomnia-autonomic:point:KI1

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:287](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:287)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 井木穴。頭部に昇り詰めた気と血を足元へ引き下ろし陰陽を調和。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:insomnia-autonomic:point:PC6

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:288](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:288)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 胸部の圧迫感や動悸を解除し、副交感神経を優位に導く。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:insomnia-autonomic:point:EX-HN16

単穴・配穴の効果と神経／経絡の関係

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:289](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:289)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.tsubos.pointRole`。

原文（抜粋）：

> 耳の後ろ（翳風と風池の中間）。睡眠中枢を直接穏やかにリラックス。

確認したい事項：この経穴単独と鍼治療全体の研究を区別する。対象疾患、刺激方法、比較、評価時点と臨床効果の大きさを確認する。自律神経・迷走神経・血流・睡眠中枢等の機序が、ヒトで測定された結果か、仮説・伝統モデルかを確認し、伝統用語との同一視や即時改善・正常化の保証にならない範囲を専門家が確認する。

### tool:integrative:insomnia-autonomic:lifestyle

生活指導の適用条件・効果

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:291](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:291)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`oriental.lifestyle`。

原文（抜粋）：

> 就寝前の足湯で湧泉を温める。夕方以降のカフェイン・激しい運動の禁止。寝床でのスマホ閲覧を絶ち、腹式呼吸で吐く息に意識を集中。

確認したい事項：対象疾患と個人差、食事や運動・温冷刺激の適用条件、禁止時間や内容の根拠、「著効」等の効果表現を確認する。一律の禁止・推奨ではなくどの状態で使う説明かを専門家が確認する。

### tool:integrative:insomnia-autonomic:coreConcept

統合治療の改善・根本治癒の主張

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:294](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:294)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.coreConcept`。

原文（抜粋）：

> 睡眠薬への依存を避けながら、自然なサーカディアンリズムと五臓の陰陽潜蔵を取り戻す

確認したい事項：「即時」「根本治癒」「根本改善」「取り戻す」の対象、到達条件、比較介入、評価指標・期間、再発の評価、実証された併用の効果を確認する。役割分担のモデルと治癒・機能回復の保証を区別できるか専門家が確認する。

### tool:integrative:insomnia-autonomic:synergyEffect

併用による効果の増加・改善保証

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:321](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:321)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.synergyEffect`。

原文（抜粋）：

> 薬で無理やり眠らせるのではなく、「自ら眠り、爽快に目覚める力」を身体に再学習させます。

確認したい事項：併用が単独介入より有効であることを示す比較研究、対象、効果量、期間、再発や害の評価を確認する。「飛躍的」「ゼロ」「身体に再学習」の断定と機序を支える出典を専門家が確認する。

### tool:integrative:insomnia-autonomic:step1

疾患・リスク除外の確実性

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:300](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:300)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[0].detail`。

原文（抜粋）：

> 身体的・器質的な睡眠障害を特定し、心筋梗塞や重度精神疾患の併発リスクを排除。

確認したい事項：検査の対象・診断精度・限界・追加評価と医療判断を確認する。「完全に除外」「確定」「リスクを排除」等の保証や一律の段階を支える資料があるか専門家が確認する。

### tool:integrative:insomnia-autonomic:step3

施術・漢方の神経機序と改善量

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:312](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:312)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[2].detail`。

原文（抜粋）：

> 神門・湧泉・安眠穴への刺鍼や温灸で、交感神経緊張を解き、体が自ら「夜に陰へ潜る」機能を回復。

確認したい事項：個別の経穴・漢方処方、対象、方法、比較、評価指標と期間、安全性を確認する。神経・血流の機序と症状改善を区別し、「正常化」「激減」「機能を回復」を支える根拠の範囲を専門家が確認する。

### tool:integrative:insomnia-autonomic:step4

薬剤減量・休薬と再発予防

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:318](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:318)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[3].detail`。

原文（抜粋）：

> 入眠薬をスムーズに手放し、自然な目覚めと日中の活力に満ちた生活へ軟着陸。

確認したい事項：薬剤の減量・頓用・休薬の対象と医師の判断、再発や離脱の評価、個別条件を確認する。鍼灸・漢方・体質改善から薬を手放せると一般化する根拠と安全性を専門家が確認する。

### tool:integrative:gerd-gastric:response-rate

定量的な治療反応・西洋医学の限界

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)。実装：[src/components/EastWestIntegrativeSwitch.tsx:92](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:92)。

対象ID：`gerd-gastric`。 表示条件：比較モデルを展開後に表示。

確認する欄：`western.limitations`。

原文（抜粋）：

> 内視鏡検査で「粘膜に異常なし」と判定される非びらん性胃食道逆流症（NERD）や機能性ディスペプシア（FD）では、PPIの著効割合が約50〜60%にとどまり、原因不明の灼熱感やもたれが持続しやすい。

確認したい事項：PPIの著効割合「約50〜60%」の研究出典、NERDとFDの区別、対象、投与条件、著効の定義・指標と評価時点を確認する。原因不明や持続しやすさまで同じ根拠で支持されるか専門家が確認する。

### tool:integrative:insomnia-autonomic:drug-safety

薬剤の安全性・依存性と適用条件

公開先：[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:306](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:306)。

対象ID：`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[1].detail`。

原文（抜粋）：

> 極度の睡眠不足による中枢疲労を食い止めるため、依存性の極めて低い薬剤でまずは睡眠時間を確保。

確認したい事項：薬剤別の対象、禁忌・注意、依存・耐性や有害事象の評価指標・期間、比較薬と根拠を確認する。「依存性の極めて低い」が全対象に一般化できるか専門家が確認する。

### tool:integrative:headache-migraine:rapid-return

薬剤による速やかな生活機能改善

公開先：[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)。実装：[src/components/EastWestIntegrativeSwitch.tsx:221](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:221)。

対象ID：`headache-migraine`。 表示条件：比較モデルを展開後に表示。

確認する欄：`matrix.steps[1].detail`。

原文（抜粋）：

> 耐え難い急性拍動痛は我慢させず、トリプタンで速やかに日常生活への復帰を果たす。

確認したい事項：トリプタンの対象・禁忌・使用条件、効果の時点と生活機能指標、比較研究を確認する。対象を限定せず速やかな復帰が得られると読める表現の根拠を専門家が確認する。

### tool:integrative:common:standard-medications-label

薬剤の第一選択という位置づけ

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:454](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:454)。

対象ID：`gerd-gastric`、`headache-migraine`、`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 第一選択となる標準薬物群

確認したい事項：3ケースに表示する薬剤それぞれの第一選択の対象・診断・重症度・禁忌と、最新ガイドラインの適用範囲を確認する。すべてが同じ優先順位の推奨薬として読める見出しになっていないか専門家が確認する。

同じ見出しの下に表示する関連文：

- `gerd-gastric/medication-1`／[src/components/EastWestIntegrativeSwitch.tsx:81](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:81)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：プロトンポンプ阻害薬（PPI）：胃酸分泌の最終段階を強力遮断
- `gerd-gastric/medication-2`／[src/components/EastWestIntegrativeSwitch.tsx:82](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:82)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：カリウムイオン競合型アシッドブロッカー（P-CAB）：速やかで持続的な酸抑制
- `gerd-gastric/medication-3`／[src/components/EastWestIntegrativeSwitch.tsx:83](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:83)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：消化管運動機能改善薬（モサプリド等）：胃排出能の促進
- `headache-migraine/medication-1`／[src/components/EastWestIntegrativeSwitch.tsx:167](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:167)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：急性期頓服薬：セロトニン1B/1D作動薬（トリプタン製剤）、NSAIDs
- `headache-migraine/medication-2`／[src/components/EastWestIntegrativeSwitch.tsx:168](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:168)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：新規予防薬：抗CGRP抗体製剤（エムガルティ等）
- `headache-migraine/medication-3`／[src/components/EastWestIntegrativeSwitch.tsx:169](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:169)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：筋弛緩薬・抗不安薬（緊張型頭痛における筋緊張緩和）
- `insomnia-autonomic/medication-1`／[src/components/EastWestIntegrativeSwitch.tsx:253](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:253)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：オレキシン受容体拮抗薬（スボレキサント、レンボレキサント）：覚醒シグナル遮断
- `insomnia-autonomic/medication-2`／[src/components/EastWestIntegrativeSwitch.tsx:254](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:254)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：メラトニン受容体作動薬（ラメルテオン）：生体リズム同調
- `insomnia-autonomic/medication-3`／[src/components/EastWestIntegrativeSwitch.tsx:255](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:255)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：※従来のベンゾジアゼピン系薬は依存性・耐性リスクのため短期最小限使用が推奨

### tool:integrative:common:recommended-formulas-label

症状・証から漢方処方を推奨する適用条件

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:531](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:531)。

対象ID：`gerd-gastric/pattern-1`、`gerd-gastric/pattern-2`、`gerd-gastric/pattern-3`、`headache-migraine/pattern-1`、`headache-migraine/pattern-2`、`headache-migraine/pattern-3`、`insomnia-autonomic/pattern-1`、`insomnia-autonomic/pattern-2`、`insomnia-autonomic/pattern-3`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 推奨方剤：

確認したい事項：3ケースの全9証に示す方剤の典拠、個別評価、用量・禁忌・相互作用・有害事象、治療効果の根拠を確認する。学習モデル上の関連例と、本人への処方推奨を区別できる見出しか専門家が確認する。

同じ見出しの下に表示する関連文：

- `gerd-gastric/pattern-1`／[src/components/EastWestIntegrativeSwitch.tsx:101](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:101)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：半夏瀉心湯（はんげしゃしんとう）：半夏・乾姜の辛温で痞えを開き、黄連・黄芩の苦寒で胃熱を冷ます「辛開苦降」の典型方剤。
- `gerd-gastric/pattern-2`／[src/components/EastWestIntegrativeSwitch.tsx:106](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:106)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：四逆散（しぎゃくさん）合 安中散、柴胡疎肝散（さいこそかんさん）。
- `gerd-gastric/pattern-3`／[src/components/EastWestIntegrativeSwitch.tsx:111](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:111)／[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)：六君子湯（りっくんしとう）、人参湯（にんじんとう）。
- `headache-migraine/pattern-1`／[src/components/EastWestIntegrativeSwitch.tsx:187](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:187)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：釣藤散（ちょうとうさん）、天麻鉤藤飲（てんまこうとういん）。
- `headache-migraine/pattern-2`／[src/components/EastWestIntegrativeSwitch.tsx:192](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:192)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：冠元顆粒（かんげんかりゅう）、桃紅四物湯（とうこうしもつとう）。
- `headache-migraine/pattern-3`／[src/components/EastWestIntegrativeSwitch.tsx:197](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:197)／[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)：川芎茶調散（せんきゅうちょうちょうさん）、葛根湯。
- `insomnia-autonomic/pattern-1`／[src/components/EastWestIntegrativeSwitch.tsx:272](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:272)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：黄連阿膠湯（おうれんあきょうとう）、知柏地黄丸（ちばくじおうがん）。
- `insomnia-autonomic/pattern-2`／[src/components/EastWestIntegrativeSwitch.tsx:277](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:277)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：帰脾湯（きひとう）、加味帰脾湯（かみきひとう）。
- `insomnia-autonomic/pattern-3`／[src/components/EastWestIntegrativeSwitch.tsx:282](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:282)／[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)：酸棗仁湯（さんそうにんとう）、抑肝散（よくかんさん）。

### tool:integrative:common:specific-effect-label

単穴・配穴の著効／特効の保証

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:546](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:546)。

対象ID：`gerd-gastric/CV12`、`gerd-gastric/PC6`、`gerd-gastric/ST36`、`gerd-gastric/LR3`、`headache-migraine/GB20`、`headache-migraine/LI4`、`headache-migraine/LR3`、`headache-migraine/GV20`、`insomnia-autonomic/HT7`、`insomnia-autonomic/KI1`、`insomnia-autonomic/PC6`、`insomnia-autonomic/EX-HN16`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 臨床で著効を示す4大特効ツボ（配穴の妙）

確認したい事項：3ケースの各4穴、合計12の表示行について、対象、配穴の方法と単穴との違い、比較、評価指標・期間、効果量と安全性の出典を確認する。「著効」「特効」という統一見出しで保証できる範囲を専門家が確認する。

### tool:integrative:common:referral

症状別の受診先・緊急度の条件

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:474](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:474)。

対象ID：`gerd-gastric`、`headache-migraine`、`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 以下のサインが1つでもある場合、東洋医学的アプローチ（鍼灸・漢方）に固執せず、直ちに消化器内科・高次救急医療機関での精密検査を最優先してください。

確認したい事項：頭痛・不眠・胃部症状で同じ消化器内科の案内を使う対象範囲、各サインの緊急度、適切な受診先、精密検査を一律に最優先とする条件と出典を専門家が確認する。急性・重症・進行の評価を個別に確認する。

### tool:integrative:common:recurrence-free-plan

役割分担の一般化・安全性と再発の保証

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:636](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:636)。

対象ID：`gerd-gastric`、`headache-migraine`、`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 急性期や構造的危険は西洋医学が主導し、慢性期の機能失調や体質改善は東洋医学が主導。患者にとって最も安全で再発のない治療ロードマップを構築します。

確認したい事項：慢性症状や機能失調でも必要な医学的評価を継続する対象と条件、併用の比較研究、安全性・再発率・期間を確認する。「最も安全」「再発のない」と保証できる根拠があるか専門家が確認する。

### tool:integrative:common:source-attribution

出典帰属とガイドライン準拠の確認

公開先：[/symptoms/stomach-fatigue](https://www.haritaro.jp/symptoms/stomach-fatigue)、[/symptoms/headache-stiff-neck](https://www.haritaro.jp/symptoms/headache-stiff-neck)、[/symptoms/stress-insomnia](https://www.haritaro.jp/symptoms/stress-insomnia)。実装：[src/components/EastWestIntegrativeSwitch.tsx:699](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/EastWestIntegrativeSwitch.tsx:699)。

対象ID：`gerd-gastric`、`headache-migraine`、`insomnia-autonomic`。 表示条件：比較モデルを展開後に表示。

原文（抜粋）：

> 『黄帝内経素問』陰陽応象大論 ＆ 現代消化器病学会ガイドライン準拠

確認したい事項：古典の底本・篇・原文・訳を照合する。「現代消化器病学会ガイドライン」の正式名称、発行主体、版、該当推奨とリンクを特定し、頭痛・不眠を含む全3ケースのどの説明が準拠するのか専門家が確認する。

<a id="entry-pages"></a>

## ページ入口・案内・印刷例（10項目）

入口42種類の監査の9項目と、今回の文章校閲で追加した1項目です。印刷例は該当の印刷物や例を表示したときの文章で、一般的な操作案内の改善とは分けて記録しています。

### entry:entry-notes-pattern-label

伝統分類と医学的機序

公開先：[/notes](https://www.haritaro.jp/notes)。実装：[src/app/notes/page.tsx:57](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/notes/page.tsx:57)。

対象ID：`entry-notes-pattern-label`。

表示条件：該当ページの入力候補・説明。

原文（抜粋）：

> 陽虚（冷え・代謝低下）

確認したい事項：陽虚を代謝低下、血虚を栄養・血流不足等に対応させる入力候補の意味と、病名/検査結果との混同を専門家が確認する。

### entry:entry-notes-home-stimulation

印刷物の個別適応

公開先：[/notes](https://www.haritaro.jp/notes)。実装：[src/app/notes/page.tsx:1824](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/notes/page.tsx:1824)。

対象ID：`entry-notes-home-stimulation`。

表示条件：養生印刷物の該当見出し。

原文（抜粋）：

> ご自宅で温める・押すと良いおすすめのツボ

確認したい事項：自宅での温熱・押圧を一律に推奨する見出しが、入力された穴と個人の状態で適切か確認する。空欄時のセルフケア文も対象を分けて確認する。

### entry:entry-notes-print-effective

診断・効能の断定

公開先：[/notes](https://www.haritaro.jp/notes)。実装：[src/app/notes/page.tsx:1949](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/notes/page.tsx:1949)。

対象ID：`entry-notes-print-effective`。

表示条件：待合室用の印刷物を生成したときの案内。

原文（抜粋）：

> 特効ツボ・おすすめ食材を判定

確認したい事項：12問の回答から特効ツボや食材を判定できるとする対象・評価方法・根拠を確認する。現在の診断ツールの分類保留/学習範囲との整合性も確認する。

### entry:entry-notes-print-prescription

個別適応の保証

公開先：[/notes](https://www.haritaro.jp/notes)。実装：[src/app/notes/page.tsx:1967](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/notes/page.tsx:1967)。

対象ID：`entry-notes-print-prescription`。

表示条件：待合室用の印刷物を生成したときの案内。

原文（抜粋）：

> 本日の体調に最も適したツボ・施術処方を組み立てます。

確認したい事項：待合室印刷案内で質問票の結果から最適な個別処方を保証していないか、所見・医学的評価・安全条件・比較の根拠を確認する。

### entry:entry-case-measurement

検査と学習分類の混同

公開先：[/cases/case-01-headache-liver-fire](https://www.haritaro.jp/cases/case-01-headache-liver-fire)、[/cases/case-02-fatigue-spleen-deficiency](https://www.haritaro.jp/cases/case-02-fatigue-spleen-deficiency)、[/cases/case-03-dysmenorrhea-cold-stasis](https://www.haritaro.jp/cases/case-03-dysmenorrhea-cold-stasis)、[/cases/case-04-menopause-yin-deficiency](https://www.haritaro.jp/cases/case-04-menopause-yin-deficiency)、[/cases/case-05-insomnia-heart-kidney](https://www.haritaro.jp/cases/case-05-insomnia-heart-kidney)、[/cases/case-06-gerd-liver-stomach](https://www.haritaro.jp/cases/case-06-gerd-liver-stomach)、[/cases/case-07-ibs-liver-spleen](https://www.haritaro.jp/cases/case-07-ibs-liver-spleen)、[/cases/case-08-sciatica-cold-dampness](https://www.haritaro.jp/cases/case-08-sciatica-cold-dampness)、[/cases/case-09-vertigo-phlegm-dampness](https://www.haritaro.jp/cases/case-09-vertigo-phlegm-dampness)、[/cases/case-10-globus-hystericus](https://www.haritaro.jp/cases/case-10-globus-hystericus)、[/cases/case-11-cervicobrachial-syndrome](https://www.haritaro.jp/cases/case-11-cervicobrachial-syndrome)、[/cases/case-12-orthostatic-hypotension](https://www.haritaro.jp/cases/case-12-orthostatic-hypotension)、[/cases/case-13-alopecia-areata](https://www.haritaro.jp/cases/case-13-alopecia-areata)、[/cases/case-14-knee-osteoarthritis](https://www.haritaro.jp/cases/case-14-knee-osteoarthritis)、[/cases/case-15-peptic-ulcer-pain](https://www.haritaro.jp/cases/case-15-peptic-ulcer-pain)、[/cases/case-16-atopic-dermatitis](https://www.haritaro.jp/cases/case-16-atopic-dermatitis)、[/cases/case-17-panic-anxiety](https://www.haritaro.jp/cases/case-17-panic-anxiety)、[/cases/case-18-severe-eyestrain](https://www.haritaro.jp/cases/case-18-severe-eyestrain)、[/cases/case-19-chronic-dry-cough](https://www.haritaro.jp/cases/case-19-chronic-dry-cough)、[/cases/case-20-bells-palsy](https://www.haritaro.jp/cases/case-20-bells-palsy)。実装：[src/components/cases/CaseStudyViewer.tsx:682](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/components/cases/CaseStudyViewer.tsx:682)。

対象ID：`case-01-headache-liver-fire`、`case-02-fatigue-spleen-deficiency`、`case-03-dysmenorrhea-cold-stasis`、`case-04-menopause-yin-deficiency`、`case-05-insomnia-heart-kidney`、`case-06-gerd-liver-stomach`、`case-07-ibs-liver-spleen`、`case-08-sciatica-cold-dampness`、`case-09-vertigo-phlegm-dampness`、`case-10-globus-hystericus`、`case-11-cervicobrachial-syndrome`、`case-12-orthostatic-hypotension`、`case-13-alopecia-areata`、`case-14-knee-osteoarthritis`、`case-15-peptic-ulcer-pain`、`case-16-atopic-dermatitis`、`case-17-panic-anxiety`、`case-18-severe-eyestrain`、`case-19-chronic-dry-cough`、`case-20-bells-palsy`。

表示条件：各症例ページの関連知識・セルフ診断案内。20症例全文の医学的監査を行った意味ではない。

原文（抜粋）：

> 現在の体質バランスを測定できます。

確認したい事項：12問のセルフチェックを「体質バランスの測定」と呼ぶ妥当性と、学習用分類・病気の診断の区別を確認する。20症例全文の医学的再審査を行ったという意味ではない。

### entry:entry-pricing-care-example

架空の印刷例の効能

公開先：[/pricing](https://www.haritaro.jp/pricing)。実装：[src/app/pricing/page.tsx:285](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/pricing/page.tsx:285)。

対象ID：`entry-pricing-care-example`。

表示条件：料金ページの架空の養生印刷例。

原文（抜粋）：

> イライラ・頭痛を鎮める

確認したい事項：架空例でも自宅の温熱対象として太衝・風池等を示す文の適応・注意と、症状改善を断定する出典を専門家が確認する。料金と契約条件は今回保持。

### entry:entry-bone-cun-accuracy

測定の精度・適用範囲

公開先：[/tsubo/basics/bone-cun](https://www.haritaro.jp/tsubo/basics/bone-cun)。実装：[src/app/tsubo/basics/bone-cun/page.tsx:174](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/basics/bone-cun/page.tsx:174)。

対象ID：`entry-bone-cun-accuracy`。

表示条件：該当ページの入力候補・説明。

原文（抜粋）：

> 体格や骨格の個人差を超えて正確に経穴を特定する

確認したい事項：比率測定で個人差を超えて正確に位置を特定できるとする範囲、目印・触診・誤差の条件を確認する。位置の学習と個別施術の安全を分ける。

### entry:entry-finger-cun-values

伝統的計測の基準値

公開先：[/tsubo/basics/bone-cun](https://www.haritaro.jp/tsubo/basics/bone-cun)。実装：[src/app/tsubo/basics/bone-cun/page.tsx:200](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/basics/bone-cun/page.tsx:200)。

対象ID：`entry-finger-cun-values`。

表示条件：該当ページの入力候補・説明。

原文（抜粋）：

> 示指・中指の2本幅を「1.5寸」

確認したい事項：2本幅1.5寸・3本幅2寸・4本幅3寸、どの指/関節/体位/本人の指を使うか、WHO・採用教科書の版と該当箇所を専門家が照合する。数値を推測で変更していない。

### entry:entry-compare-default-safety

注意情報がない場合の安全表示

公開先：[/tsubo/compare](https://www.haritaro.jp/tsubo/compare)。実装：[src/app/tsubo/compare/CompareClient.tsx:523](/C:/Users/秀喜/.codex/.chatgpt-projects/g-p-6aa3ba87681081918e12c72cdaff6379/haritaro-oriental-medicine/src/app/tsubo/compare/CompareClient.tsx:523)。

対象ID：`entry-compare-default-safety`。

表示条件：経穴の注意事項が空欄のときの既定表示。

原文（抜粋）：

> 標準的刺灸が可能

確認したい事項：注意事項が空の場合の既定表示が、施術可能・安全確認済みと受け取られないか確認する。局所解剖・個人条件・未確認情報から判断できる範囲を専門家が確認する。

### entry:natural-entry-01

経穴数の集計ラベルと根拠（現在は参照されない旧部品）

参照経路の訂正：当初の記録では公開先を `/practice/haiketsu` としていたが、`HaiketsuOptimizer`は現在の公開ルートからimportされていない。実際の配穴ページは`src/app/practice/haiketsu/page.tsx`。旧部品の現在の表示式は`src/components/HaiketsuOptimizer.tsx:366`。

対象ID：`natural-entry-01`。

校閲時の原文（専門確認の履歴として保持）：

> 黄金比（2〜4穴）

2026年10月12日の追加改善：実際の配穴ページに、穴数と役割分類を使う独自集計の判定条件を追加。点数表示を避けて分類結果を示す従来の方針と、選択・保存操作は維持。旧部品も、未選択・穴数による減点なし・穴数に応じた減点の説明へ変更し、共通の判定説明を使用する。1〜4穴は穴数による減点なし、5穴は15点、6穴以上は（穴数−5）×15点であり、「2〜4穴が黄金比」という条件は実装にない。

専門確認は継続：減点の重み、経穴の役割分類、臨床への適用条件・妥当性は専門家が確認する。表示の改善を、効果・安全性・医学的監修の確認完了とは扱わない。

変更と検証：[learning-entry-improvements-report.md](learning-entry-improvements-report.md)。

## 確認範囲と除外

ルート・import・実際の表示式を追って公開利用を確認し、行番号は統合時のソースから再検索しました。公開で使われない旧図解と、比較コンポーネント内の未表示フィールドを、単なる文字ヒットだけで対象に加えていません。

実会員での全画面操作、全経穴の医学的な再照合、外部資料全文や最新ガイドラインの再確認は、この一覧作成では完了していません。既存の安全案内や出典欄が、ここに挙げた全主張を裏づけるものとも扱っていません。
