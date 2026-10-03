import type { ArticleReadingGuide } from "@/types/reading";

// 本文の要点を図にする。新しい医学的事実・治療効果を追加しない。
// afterParagraph は、指定H2節内の paragraph ブロックだけを1から数える。
export const ARTICLE_READING_GUIDES: Record<string, ArticleReadingGuide> = {
  "science-of-oriental-medicine-history": {
    inserts: [
      {
        afterHeading: "1. 工学・システム同定としてのブラックボックス解析",
        afterParagraph: 3,
        figure: {
          id: "history-observation-model",
          title: "観察したことと、内部状態の仮説を分ける",
          layout: "steps",
          items: [
            { label: "外からの観察", description: "脈、舌、汗、症状など、確認できた情報を記録する。", icon: "eye" },
            { label: "説明の候補", description: "観察をもとに、内部状態について仮説を考える。", icon: "book" },
            { label: "別に検証する", description: "その説明が正しいか、診断や治療に役立つかを確かめる。", icon: "flask" },
          ],
          caption: "筆者の学習用の比喩です。古代の医学と現代工学の同一性や、診断精度を示す図ではありません。",
        },
      },
      {
        afterHeading: "4. なぜ東洋医学は二千年以上受け継がれたのか ― 経験医学と科学的医学の相違",
        afterParagraph: 4,
        figure: {
          id: "history-experience-comparison",
          title: "経験の蓄積と、因果関係の検証",
          layout: "compare",
          items: [
            { label: "臨床での観察", description: "改善・悪化を記録し、確かめたい問いを見つける。", icon: "eye" },
            { label: "比較による検証", description: "自然経過や他の要因も考慮して、効果と害を調べる。", icon: "flask" },
          ],
          caption: "長く使われてきたことだけでは、治療効果や伝統的な説明の正しさは証明されません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-yinyang-gogyo", reason: "歴史の中で使われた陰陽五行を、分類の意味と学習上の限界から学べます。" },
      { articleId: "science-of-abdominal-diagnosis", reason: "日本漢方で重視された腹診を、観察の記録と医学的な評価に分けて学べます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "歴史から生まれた説明を、仮説と臨床的な検証に分けて読み直せます。" },
    ],
  },
  "science-of-yinyang-gogyo": {
    inserts: [
      {
        afterHeading: "3. 八綱：寒熱・表裏・虚実を整理する",
        afterParagraph: 1,
        figure: {
          id: "yinyang-three-axes",
          title: "八綱を読む三つの分類軸",
          layout: "triad",
          items: [
            { label: "寒・熱", description: "冷えや熱感などを、伝統的な性質として整理する。", icon: "balance" },
            { label: "表・裏", description: "伝統医学でいう病位を整理する。", icon: "compass" },
            { label: "虚・実", description: "正気の不足や邪気の盛んさなどを整理する。", icon: "book" },
          ],
          caption: "伝統モデルの分類です。検査値や病名の対応表ではなく、症状の原因・緊急性は医学的に評価します。",
        },
      },
      {
        afterHeading: "6. 相剋：抑え、制約する関係",
        afterParagraph: 3,
        figure: {
          id: "yinyang-generation-restraint",
          title: "相生と相剋で、関係の向きを比べる",
          layout: "compare",
          items: [
            { label: "相生：生み、支える", description: "木→火→土→金→水→木という順序。", icon: "leaf" },
            { label: "相剋：抑え、制約する", description: "木→土→水→火→金→木という順序。", icon: "balance" },
          ],
          caption: "矢印は伝統モデル内の関係を表します。臓器の因果関係や、正・負のフィードバックと同じ意味ではありません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-qi-blood-fluid", reason: "陰陽五行に続く気血津液の用語を、検査値や病名と区別して整理できます。" },
      { articleId: "science-of-meridians-network", reason: "伝統的な関係の表し方を、経絡の名称・走行と現代の研究から学べます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "伝統モデルと現代医学を比較するときに、仮説と検証を分ける方法を学べます。" },
    ],
  },
  "science-of-qi-blood-fluid": {
    inserts: [
      {
        afterHeading: "3. 気虚・気滞・気逆を、病名と分ける",
        afterParagraph: 2,
        figure: {
          id: "qi-observation-interpretation",
          title: "一つの症状から、病名を決めない",
          layout: "triad",
          items: [
            { label: "観察した情報", description: "症状の経過、誘因、他の所見、生活への影響を記録する。", icon: "eye" },
            { label: "伝統的な候補", description: "複数の所見から、気虚・気滞などの分類を考える。", icon: "book" },
            { label: "医学的な評価", description: "原因を確かめるため、必要な問診・診察・検査を検討する。", icon: "flask" },
          ],
          caption: "所見・伝統的な分類・医学的な診断は別の情報です。気虚や血虚という見立てだけで貧血は診断・除外できません。",
        },
      },
      {
        afterHeading: "5. 津液・水の分類は、現代の体液区分と同じではない",
        afterParagraph: 3,
        figure: {
          id: "fluid-pattern-amount",
          title: "水の見立てと、水分量の判断を分ける",
          layout: "compare",
          items: [
            { label: "津液・水の分類", description: "潤いや水の偏りを、伝統理論の言葉で整理する。", icon: "drop" },
            { label: "水分量の判断", description: "病気・服薬・体調を踏まえ、医療者と確認する。", icon: "check" },
          ],
          caption: "水滞は水分総量の過剰を意味するとは限りません。むくみやめまいだけで水分を増減しないでください。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-yinyang-gogyo", reason: "気血津液の前提となる伝統的な分類を、相対的な陰陽や八綱から復習できます。" },
      { articleId: "science-of-kampo-network-pharmacology", reason: "気血の見立てを処方の自動決定にしないため、証と製剤の安全性を学べます。" },
      { articleId: "science-of-tongue-diagnosis", reason: "乾燥や色の所見を、観察・伝統的な解釈・医学的な原因評価に分けて学べます。" },
    ],
  },
  "science-of-meridians-network": {
    inserts: [
      {
        afterHeading: "3. 結合組織の研究が示す範囲",
        afterParagraph: 1,
        figure: {
          id: "meridian-location-theory",
          title: "位置の関連と、理論全体の検証は別",
          layout: "compare",
          items: [
            { label: "特定部位の比較", description: "経穴と結合組織面の位置関係を調べる。", icon: "compass" },
            { label: "別に残る問い", description: "全身の経絡との一致や、患者への効果を検証する。", icon: "flask" },
          ],
          caption: "限定された解剖学的比較からの仮説です。位置が近いことだけで、経絡の機能や治療効果は確定しません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-acupoints-mechanotransduction", reason: "経絡上の経穴について、位置の共有・局所解剖・刺激条件の違いを学べます。" },
      { articleId: "science-of-acupuncture-neuroscience", reason: "経絡と比較される刺激反応を、動物の機序研究と患者の臨床効果に分けて読めます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "ネットワークという比喩を、診断や治療の根拠に広げず使う方法を学べます。" },
    ],
  },
  "science-of-acupoints-mechanotransduction": {
    inserts: [
      {
        afterHeading: "5. 「どこを刺激するか」を検証するには",
        afterParagraph: 1,
        figure: {
          id: "acupoint-comparison-conditions",
          title: "位置の違いを確かめる比較",
          layout: "steps",
          items: [
            { label: "位置を比較する", description: "どの部位同士を比べるかを明確にする。", icon: "compass" },
            { label: "他の条件をそろえる", description: "深度・強度・手技・施術回数などの違いを確認する。", icon: "balance" },
            { label: "転帰を評価する", description: "患者の症状・機能など、何が変わったかを比較する。", icon: "check" },
          ],
          caption: "研究を読むための整理です。無治療との比較と、他の位置への刺激との比較は異なる問いに答えます。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-meridians-network", reason: "経穴の位置を含む経絡の枠組みを、神経・筋膜との比較の限界から学べます。" },
      { articleId: "science-of-acupuncture-neuroscience", reason: "位置や組織の反応から一歩進み、鍼の臨床効果と安全性を分けて検討できます。" },
      { articleId: "science-of-pulse-diagnosis", reason: "測定できることと診断に役立つことの違いを、脈診の再現性研究から学べます。" },
    ],
  },
  "science-of-pulse-diagnosis": {
    inserts: [
      {
        afterHeading: "4. 再現性を調べた原著から学ぶ",
        afterParagraph: 1,
        figure: {
          id: "pulse-agreement-accuracy",
          title: "一致率と診断精度は、答える問いが違う",
          layout: "compare",
          items: [
            { label: "再現性", description: "同じ触知所見を、評価者が同じように記録できるか。", icon: "eye" },
            { label: "診断精度", description: "病気のある人・ない人を、基準に照らして判別できるか。", icon: "flask" },
          ],
          caption: "本文の一致率は再現性の結果です。伝統的な臓腑対応や、病気の診断が同じ割合で正しいという意味ではありません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-tongue-diagnosis", reason: "触れて得た情報と同じように、舌で見えた特徴も観察と解釈に分けて記録できます。" },
      { articleId: "science-of-abdominal-diagnosis", reason: "脈以外の切診を学び、腹部の抵抗や圧痛から確定できないことを確認できます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "再現性から診断精度、臨床的な有用性へ進むときの検証の違いを整理できます。" },
    ],
  },
  "science-of-abdominal-diagnosis": {
    inserts: [
      {
        afterHeading: "3. 力学・反射の説明と腹証の検証",
        afterParagraph: 1,
        figure: {
          id: "abdomen-resistance-cause",
          title: "触れた抵抗と、病気の原因を分ける",
          layout: "compare",
          items: [
            { label: "触診で感じたこと", description: "抵抗は体位・呼吸・押圧・筋緊張などにも左右される。", icon: "eye" },
            { label: "原因の評価", description: "腹証だけで臓器の病気を確定せず、必要な診察・検査を考える。", icon: "flask" },
          ],
          caption: "腹証の観察と医学的診断は別です。強い痛みを伝統的な見立てで済ませず、自分で強く押さないでください。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-kampo-network-pharmacology", reason: "腹証から処方を考える際に、他の所見・添付文書・副作用も確認する理由を学べます。" },
      { articleId: "east-west-integrative-gerd-gastric", reason: "心下痞と胃部症状の例で、伝統用語とGERD・FDの医学的な評価を区別できます。" },
      { articleId: "science-of-pulse-diagnosis", reason: "触診の教育や所見の一致を、病気を正しく見つける精度と分けて検討できます。" },
    ],
  },
  "science-of-tongue-diagnosis": {
    inserts: [
      {
        afterHeading: "3. 白い部分や痛みを、単一の原因で説明しない",
        afterParagraph: 1,
        figure: {
          id: "tongue-observation-followup",
          title: "見た特徴を、追加確認につなげる",
          layout: "steps",
          items: [
            { label: "見えた特徴", description: "白い部分の部位・範囲など、観察したことを記録する。", icon: "eye" },
            { label: "追加の確認", description: "痛み、経過、乾燥、服薬、口腔の状態を確かめる。", icon: "book" },
            { label: "必要な評価", description: "症状・経過に応じ、医師や歯科医師への相談につなげる。", icon: "check" },
          ],
          caption: "見た目だけで病名や証は確定しません。伝統的な分類で、持続する痛みや白い斑点の評価を省かないでください。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-pulse-diagnosis", reason: "舌の観察と脈の触知を比べ、所見の記録と診断の確かさの違いを学べます。" },
      { articleId: "science-of-qi-blood-fluid", reason: "乾燥や色から連想する気血津液の分類を、医学的な原因評価と区別できます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "画像やAIが特徴を分類できることと、患者に役立つ診断になることを分けて考えられます。" },
    ],
  },
  "science-of-acupuncture-neuroscience": {
    inserts: [
      {
        afterHeading: "2. ヒトで測定された鍼の力学的反応",
        afterParagraph: 2,
        figure: {
          id: "acupuncture-reaction-benefit",
          title: "測定した反応と、患者への利益",
          layout: "compare",
          items: [
            { label: "力学的な反応", description: "鍼を引き抜く抵抗など、組織との相互作用を測る。", icon: "flask" },
            { label: "患者への効果", description: "痛み・機能・生活の質が改善するかを、別に評価する。", icon: "check" },
          ],
          caption: "引き抜き抵抗は得気全体や症状改善と同じ指標ではありません。強い刺激ほど有効という結論にもなりません。",
        },
      },
      {
        afterHeading: "4. 自律神経・抗炎症経路を正確に読む",
        afterParagraph: 2,
        figure: {
          id: "acupuncture-animal-patient",
          title: "マウスの機序研究と、患者の臨床試験",
          layout: "compare",
          items: [
            { label: "機序研究の範囲", description: "特定のマウス・刺激部位・強度で、神経経路の関与を調べる。", icon: "flask" },
            { label: "人で確かめる問い", description: "対象疾患と比較条件を定め、症状・機能への利益と害を調べる。", icon: "check" },
          ],
          caption: "動物の炎症応答を、人の感染症やすべての炎症の治療効果に広げません。標準治療を置き換える根拠ではありません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-acupoints-mechanotransduction", reason: "鍼の反応を調べる前提として、経穴の位置と刺激条件を比較する方法を学べます。" },
      { articleId: "science-of-meridians-network", reason: "神経経路の研究を経絡理論全体の証明に広げないため、比較の範囲を確認できます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "併用治療を考えるときに、評価する目的・症状の変化・害を整理する方法を学べます。" },
    ],
  },
  "science-of-kampo-network-pharmacology": {
    inserts: [
      {
        afterHeading: "4. ネットワーク薬理学の予測をどう読むか",
        afterParagraph: 1,
        figure: {
          id: "kampo-prediction-clinical",
          title: "予測・実験・臨床が確認すること",
          layout: "triad",
          items: [
            { label: "標的の予測", description: "成分と標的の関係から、作用の候補を考える。", icon: "compass" },
            { label: "細胞・動物の実験", description: "そのモデルや条件で、指標・反応の変化を調べる。", icon: "flask" },
            { label: "患者での検証", description: "製剤・対象・比較条件ごとに、症状への効果と害を調べる。", icon: "check" },
          ],
          caption: "それぞれ別の検証です。複雑なネットワークや動物の反応だけでは、人への有効性・安全性は決まりません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-abdominal-diagnosis", reason: "処方を考える情報の一つである腹証を、観察・解釈・医学的な評価に分けて学べます。" },
      { articleId: "science-of-qi-blood-fluid", reason: "証に使われる気血津液の用語を、ATPや検査値に固定対応させずに復習できます。" },
      { articleId: "east-west-integrative-gerd-gastric", reason: "胃部症状への併用例で、処方名だけで治療を選ばず再評価する理由を確認できます。" },
    ],
  },
  "east-west-integrative-unified-theory": {
    inserts: [
      {
        afterHeading: "4. フィードバックという比喩を使う範囲",
        afterParagraph: 2,
        figure: {
          id: "integration-learning-review",
          title: "学習用の確認と再評価の流れ",
          layout: "steps",
          items: [
            { label: "観察・仮説", description: "所見を記録し、病気の可能性・伝統分類・情報不足を分ける。", icon: "eye" },
            { label: "介入の検討", description: "標準治療や併用の目的、患者の希望、効果と害を確認する。", icon: "balance" },
            { label: "再評価", description: "症状・機能・有害事象を見直し、必要な変更や紹介を考える。", icon: "check" },
          ],
          caption: "筆者の学習モデルです。安全性の確認を優先し、診断・処方の代行や、恒常性の回復を保証する図として使いません。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-acupuncture-neuroscience", reason: "学習モデルの検証例として、鍼の機序研究と患者への臨床効果を分けて読めます。" },
      { articleId: "science-of-kampo-network-pharmacology", reason: "併用療法の検討を、製剤ごとの研究・添付文書・副作用の確認につなげられます。" },
      { articleId: "science-of-pulse-diagnosis", reason: "再現性と診断精度を混同しない読み方を、脈診の具体的な研究例から学べます。" },
    ],
  },
  "east-west-integrative-gerd-gastric": {
    inserts: [
      {
        afterHeading: "4. 東洋医学の見立ての位置づけ",
        afterParagraph: 2,
        figure: {
          id: "gerd-pattern-evaluation",
          title: "伝統用語と医学的な評価を分ける",
          layout: "compare",
          items: [
            { label: "伝統的な見立て", description: "胃気上逆・心下痞などの言葉で、症状や所見を整理する。", icon: "book" },
            { label: "医学的な評価", description: "症状の原因や、酸への曝露・内視鏡所見などを評価する。", icon: "flask" },
          ],
          caption: "胃気上逆＝GERD、心下痞＝FDという一対一の対応ではありません。受診や標準治療を置き換えないでください。",
        },
      },
    ],
    nextArticles: [
      { articleId: "science-of-abdominal-diagnosis", reason: "胃部症状の説明に出てくる心下痞を、腹証の観察と医学的診断の違いから学べます。" },
      { articleId: "science-of-kampo-network-pharmacology", reason: "漢方の併用を検討するときに、製剤の添付文書・重複成分・副作用を確認できます。" },
      { articleId: "east-west-integrative-unified-theory", reason: "併用する目的と再評価の方法を整理し、必要な検査や標準治療と共有できます。" },
    ],
  },
};
