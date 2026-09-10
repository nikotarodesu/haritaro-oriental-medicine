"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, UserCheck, Shield, ChevronRight, Activity } from "lucide-react";

type ConstitutionId = "qikyo" | "kitai" | "kekkyo" | "oketsu" | "tanshitsu" | "inkyo" | "yokyo";

interface Constitution {
  id: ConstitutionId;
  name: string;
  kana: string;
  category: "気" | "血" | "水" | "陰陽";
  color: string;
  tagColor: string;
  statusTitle: string;
  mechanism: string;
  questions: { id: string; text: string }[];
  symptoms: string[];
  foods: string[];
  lifestyle: string[];
  caution: string;
  characterTrait: string;
}

const CONSTITUTIONS: Constitution[] = [
  {
    id: "qikyo",
    name: "気虚",
    kana: "ききょ",
    category: "気",
    color: "#FFA000",
    tagColor: "bg-[#FFF8E1] text-[#E65100] border-[#FFE082] dark:bg-[#FFA000]/20 dark:text-[#FFE082]",
    statusTitle: "エネルギー不足（動力低下・バッテリー切れ）",
    mechanism: "生命エネルギーである「気」の産生が追いつかず、推進力と防衛力が低下している状態。充電が20%以下のスマートフォンのような状態。",
    questions: [
      { id: "q1", text: "少し動くだけですぐ疲れ、休んでも疲れが抜けにくい" },
      { id: "q2", text: "食後に強い眠気や身体のだるさに襲われることが多い" },
      { id: "q3", text: "声が小さく張りがなく、息切れしやすい・風邪を引きやすい" },
    ],
    symptoms: ["全身倦怠感", "食後の強い眠気", "息切れ・話すのがおっくう", "泥状便・軟便", "風邪をひきやすい"],
    foods: ["山芋", "かぼちゃ", "米（玄米より白米）", "鶏肉", "大豆", "なつめ"],
    lifestyle: ["無理な運動を避け、十分な睡眠をとる", "冷たい飲食物を控え胃腸を温める", "一度にドカ食いせず、消化の良い食事を小分けに摂る"],
    caution: "「気合が足りない」と激しい筋トレをすると余計に消耗します。まずは休養と補給が最優先です。",
    characterTrait: "おっとり・省エネ型",
  },
  {
    id: "kitai",
    name: "気滞",
    kana: "きたい",
    category: "気",
    color: "#00897B",
    tagColor: "bg-[#E0F2F1] text-[#00695C] border-[#80CBC4] dark:bg-[#004D40]/30 dark:text-[#80CBC4]",
    statusTitle: "気の流通障害（自律神経緊張・エネルギーの交通渋滞）",
    mechanism: "ストレスや感情の抑圧により、全身を巡る「気」のハイウェイが渋滞している状態。身体の内圧が高まり、張る痛みやイライラが生じる。",
    questions: [
      { id: "q4", text: "些細なことでイライラしやすく、無意識にため息をついてしまう" },
      { id: "q5", text: "胸・脇腹・下腹部がパンパンに張る感じやガス溜まりがある" },
      { id: "q6", text: "喉に何かがつっかえているような違和感（梅核気）がある" },
    ],
    symptoms: ["イライラ・気分の波", "胸脇や下腹部の張り", "ため息が多い", "喉のつかえ感", "PMS（月経前症候群）"],
    foods: ["柑橘類（レモン・ゆず）", "しそ・みょうが", "ジャスミン茶・ミント", "セロリ", "玉ねぎ"],
    lifestyle: ["深呼吸と軽い全身ストレッチ", "香りの良いハーブティーを飲む", "感情を溜め込まず、書き出す・話す"],
    caution: "じっと座ったままスマホを見つめていると気がさらに滞ります。軽く歩いて風に当たりましょう。",
    characterTrait: "がんばり屋・アクセル踏みっぱなし型",
  },
  {
    id: "kekkyo",
    name: "血虚",
    kana: "けっきょ",
    category: "血",
    color: "#D32F2F",
    tagColor: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
    statusTitle: "材料・栄養不足（ガソリン切れ・脳と末梢の栄養不足）",
    mechanism: "全身の組織を滋養し、精神（神）を安定させる「血」が不足した状態。燃料計がEランプ点灯状態。不眠や肌・爪の劣化を招く。",
    questions: [
      { id: "q7", text: "立ちくらみ・めまいが起きやすく、顔色が青白いと言われる" },
      { id: "q8", text: "皮膚が乾燥してかゆくなりやすい、爪が割れやすい・スジが入る" },
      { id: "q9", text: "夜間に眠りが浅く夢を多く見る、または不安感で寝付けない" },
    ],
    symptoms: ["立ちくらみ・ふらつき", "爪がもろい・髪のパサつき", "不眠・多夢・健忘", "こむら返り（足のつり）", "月経量が少ない"],
    foods: ["牛赤身肉", "レバー", "ほうれん草", "黒ごま", "プルーン", "にんじん", "クコの実"],
    lifestyle: ["23時前の就寝（血は夜間に肝で作られる）", "夜間のスマホ・PC画面凝視を避ける（目の酷使は血を消耗する）", "過度な減量ダイエットを中止する"],
    caution: "「目は血を養い、血を消費する」器官です。スマホの長時間使用は最も直接的に血を減らします。",
    characterTrait: "繊細・インプット過多消耗型",
  },
  {
    id: "oketsu",
    name: "瘀血",
    kana: "おけつ",
    category: "血",
    color: "#880E4F",
    tagColor: "bg-[#FCE4EC] text-[#880E4F] border-[#F8BBD0] dark:bg-[#880E4F]/20 dark:text-[#F48FB1]",
    statusTitle: "血行障害・微小循環不全（血のドロドロ・滞留）",
    mechanism: "血流の巡りが悪く、毛細血管レベルで滞っている状態。川の底にヘドロが沈殿しているイメージ。刺すような固定痛や黒ずみを引き起こす。",
    questions: [
      { id: "q10", text: "肩こりや腰痛、生理痛など、いつも決まった場所が刺すように痛む" },
      { id: "q11", text: "目の下にクマができやすい、顔色がくすんでシミ・色素沈着が気になる" },
      { id: "q12", text: "舌の裏を見ると紫色の太い血管が浮き出ている、舌に紫のシミがある" },
    ],
    symptoms: ["局所の刺すような固定痛", "暗紫色の舌・唇", "目の下のクマ・肌のくすみ", "月経血にレバー状の塊が混じる", "静脈瘤・冷えのぼせ"],
    foods: ["青魚（イワシ・サバ）", "納豆", "玉ねぎ", "酢・黒酢", "ターメリック（ウコン）", "チンゲン菜"],
    lifestyle: ["湯船にしっかり浸かる入浴習慣", "ウォーキングなど下半身を動かす適度な運動", "体を締め付ける下着や服装を避ける"],
    caution: "冷えは血を急速に凝固させます。特に足首・仙骨・首の後ろを絶対に冷やさないようにしましょう。",
    characterTrait: "凝り固まり・血流ブロック型",
  },
  {
    id: "tanshitsu",
    name: "痰湿",
    kana: "たんしつ",
    category: "水",
    color: "#0288D1",
    tagColor: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC] dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
    statusTitle: "水液停滞・老廃物の蓄積（身体の重だるいヘドロ）",
    mechanism: "水分代謝が乱れ、体内に濁った不要な液体が滞留している状態。水浸しのスポンジや湿った布団を背負っているような重さを感じる。",
    questions: [
      { id: "q13", text: "雨の日や湿度の高い日に、身体や頭が重だるく調子を崩しやすい" },
      { id: "q14", text: "夕方になると足やすねがパンパンにむくみ、靴がきつくなる" },
      { id: "q15", text: "口の中が粘っこい感じがする、便が便器にこびりつくほど粘り気がある" },
    ],
    symptoms: ["頭が重い（濡れタオルを巻かれたよう）", "手足・顔のむくみ", "関節の重痛・こわばり", "粘り気のある便", "痰がからみやすい"],
    foods: ["ハトムギ（ヨクイニン）", "小豆", "冬瓜", "海藻類（昆布・わかめ）", "とうもろこしのひげ茶"],
    lifestyle: ["甘いもの・脂っこい食事・飲酒を控える", "軽く汗をかく有酸素運動や岩盤浴", "冷たい水分をがぶ飲みせず、温かいものを少しずつ飲む"],
    caution: "「水分補給は多ければ多いほど良い」という誤解に注意。排出できない過剰な水分は毒（湿邪）になります。",
    characterTrait: "水浸し・スポンジ型",
  },
  {
    id: "inkyo",
    name: "陰虚",
    kana: "いんきょ",
    category: "陰陽",
    color: "#7B1FA2",
    tagColor: "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7] dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8]",
    statusTitle: "潤い枯渇・冷却水不足（ラジエーター故障・空焚き熱）",
    mechanism: "身体を潤し冷やす体液（陰液）が不足し、相対的に陽気が過剰になった状態。冷却水が切れてオーバーヒートしたエンジンのような状態。",
    questions: [
      { id: "q16", text: "夕方から夜にかけて手足のひらや足の裏がカッとほてりやすい" },
      { id: "q17", text: "夜間に寝汗（盗汗）をかいて目が覚めることがある" },
      { id: "q18", text: "喉や唇、肌が年中乾燥していて、冷たい水を少しずつ欲しがる" },
    ],
    symptoms: ["手足のほてり（五心煩熱）", "寝汗", "皮膚や粘膜の乾燥", "コロコロとしたウサギ状の乾燥便", "夕方の微熱感・頬の赤み"],
    foods: ["白きくらげ", "豆腐・豆乳", "梨", "百合根", "豚肉", "すっぽん", "アスパラガス"],
    lifestyle: ["夜更かしを絶対にやめる（夜の睡眠が最大の補陰アクション）", "激しい発汗（サウナの入りすぎ）を控える", "辛い刺激物（唐辛子・ニンニク）を控える"],
    caution: "ほてりを感じるからといって氷水やアイスで急激に冷やすと、胃腸を壊しさらに潤いが作れなくなります。",
    characterTrait: "オーバーヒート・乾き型",
  },
  {
    id: "yokyo",
    name: "陽虚",
    kana: "ようきょ",
    category: "陰陽",
    color: "#E65100",
    tagColor: "bg-[#FFF3E0] text-[#BF360C] border-[#FFCC80] dark:bg-[#E65100]/20 dark:text-[#FFB74D]",
    statusTitle: "温める力（陽気）の衰退（体内の暖房故障・深部冷え）",
    mechanism: "気虚がさらに進行し、体温を保つ「陽気」そのものが衰えた状態。火の消えかけた暖炉。特に下半身の冷えや内臓機能の低下が著しい。",
    questions: [
      { id: "q19", text: "季節を問わず腰や手足の先が激しく冷え、寒さに極端に弱い" },
      { id: "q20", text: "夜間に何度もトイレに起きる、または尿の色が薄く量が多い" },
      { id: "q21", text: "お腹が冷えるとすぐにお腹を下す、朝一番に下痢（五更瀉）しやすい" },
    ],
    symptoms: ["腰から下の激しい冷え", "夜間頻尿", "水のような下痢・未消化便", "寒がり・厚着を好む", "顔色が青白く元気がない"],
    foods: ["生姜（加熱した乾姜）", "シナモン（桂皮）", "羊肉", "ねぎ・ニラ", "エビ", "くるみ"],
    lifestyle: ["腰・仙骨・お腹にカイロや腹巻きを使用する", "足湯やお灸で下半身のツボ（湧泉・三陰交・関元）を温める", "生野菜や冷たいサラダを避け、煮込み料理を摂る"],
    caution: "陽気は生命の根源の火です。薄着やエアコン直撃を避け、体温を逃さない生活を徹底しましょう。",
    characterTrait: "暖房故障・冷凍庫型",
  },
];

export default function QiBloodConstitutionChecker() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [selectedCardId, setSelectedCardId] = useState<ConstitutionId>("qikyo");
  const [viewMode, setViewMode] = useState<"checker" | "cards">("checker");

  // チェックトグル
  const toggleCheck = (qId: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // 全リセット
  const handleReset = () => {
    setCheckedIds({});
  };

  // 各体質のスコア集計
  const scores = CONSTITUTIONS.map((c) => {
    const score = c.questions.filter((q) => checkedIds[q.id]).length;
    return {
      constitution: c,
      score,
      total: c.questions.length,
    };
  });

  // 最高スコアの体質
  const maxScore = Math.max(...scores.map((s) => s.score));
  const topConstitutions = scores.filter((s) => s.score > 0 && s.score === maxScore);
  const hasAnswers = Object.values(checkedIds).some(Boolean);

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説④：気血水による「7つの体質診断」＆パーソナライズ養生</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            今のあなたの優位体質はどれ？ ── 臨床鑑別チェックと食養生マップ
          </h4>
        </div>

        {/* モード切り替えタブ */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#121920] p-1.5 rounded-2xl border border-[#E8E1D1] dark:border-[#2A3B4A]">
          <button
            onClick={() => setViewMode("checker")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              viewMode === "checker"
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            セルフ診断チェッカー
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              viewMode === "cards"
                ? "bg-[#1E3D34] text-white shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            7大体質カード一覧
          </button>
        </div>
      </div>

      {viewMode === "checker" ? (
        <div>
          {/* チェッカー説明 & スコアバー */}
          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  タップで当てはまる自覚症状をチェックしてください（複数選択可）
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                  日常的に気になるサインをチェックすると、リアルタイムで優位な体質傾向がハイライトされます。
                </p>
              </div>
              {hasAnswers && (
                <button
                  onClick={handleReset}
                  className="self-start sm:self-auto text-xs text-[#8C9691] hover:text-[#D32F2F] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg border border-[#E8E1D1] dark:border-[#2A3B4A]"
                >
                  <RotateCcw className="w-3 h-3" />
                  選択をリセット
                </button>
              )}
            </div>

            {/* 体質スコアゲージ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {scores.map(({ constitution: c, score, total }) => {
                const isTop = hasAnswers && score > 0 && score === maxScore;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCardId(c.id)}
                    className={`cursor-pointer p-2.5 rounded-xl border text-center transition-all ${
                      isTop
                        ? "bg-white dark:bg-[#17212A] shadow-sm border-2 ring-2 ring-offset-1"
                        : "bg-white/60 dark:bg-[#17212A]/60 border-[#E8E1D1] dark:border-[#22303D]"
                    }`}
                    style={{
                      borderColor: isTop ? c.color : undefined,
                    }}
                  >
                    <div className="text-[10px] font-bold text-[#737C77] dark:text-[#94A3B8]">
                      {c.kana}
                    </div>
                    <div className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                      {c.name}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {Array.from({ length: total }).map((_, idx) => (
                        <span
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full transition-colors"
                          style={{
                            backgroundColor: idx < score ? c.color : "#E0E0E0",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 質問リスト（7体質分・3問ずつ＝全21問） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {CONSTITUTIONS.map((c) => (
              <div
                key={c.id}
                className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        borderColor: c.color,
                        color: c.color,
                      }}
                    >
                      {c.category}の失調：{c.name}（{c.kana}）
                    </span>
                    <span className="text-[11px] font-medium text-[#737C77] dark:text-[#94A3B8]">
                      {c.characterTrait}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {c.questions.map((q) => {
                      const isChecked = Boolean(checkedIds[q.id]);
                      return (
                        <label
                          key={q.id}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all border text-xs leading-relaxed ${
                            isChecked
                              ? "bg-white dark:bg-[#17212A] border-[#FFA000] dark:border-[#FFA000] shadow-xs font-medium text-[#232826] dark:text-[#FAF8F5]"
                              : "bg-white/40 dark:bg-[#17212A]/40 border-transparent text-[#59615D] dark:text-[#96A6B2] hover:bg-white dark:hover:bg-[#17212A]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(q.id)}
                            className="mt-0.5 rounded border-gray-300 text-[#1E3D34] focus:ring-0 cursor-pointer"
                          />
                          <span>{q.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#EAE4D5] dark:border-[#22303D] flex items-center justify-between text-[11px]">
                  <span className="text-[#8C9691] dark:text-[#64748B]">
                    典型症状：{c.symptoms[0]}・{c.symptoms[1]}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCardId(c.id);
                      setViewMode("cards");
                    }}
                    className="text-[#1E3D34] dark:text-[#74BA9E] font-bold hover:underline flex items-center gap-0.5"
                  >
                    詳細へ <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 診断結果表示ボックス */}
          {hasAnswers ? (
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34] dark:border-[#74BA9E] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E3D34] text-white text-xs font-bold">
                  診断結果
                </span>
                <h5 className="font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  あなたの現在の優位体質傾向：
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] ml-1">
                    {topConstitutions.map((t) => `${t.constitution.name}型`).join(" ＆ ")}
                  </span>
                </h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {topConstitutions.map(({ constitution: topC }) => (
                  <div
                    key={topC.id}
                    className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#232826] dark:text-[#FAF8F5]">
                        【{topC.name}（{topC.kana}）】{topC.statusTitle}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-md font-bold"
                        style={{ color: topC.color }}
                      >
                        {topC.characterTrait}
                      </span>
                    </div>
                    <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                      {topC.mechanism}
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                          おすすめの食養生：
                        </span>
                        <span className="text-[#3E4541] dark:text-[#D1D5DB] ml-1">
                          {topC.foods.join("、")}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-[#B86924] dark:text-[#E6C387]">
                          生活アクション：
                        </span>
                        <span className="text-[#3E4541] dark:text-[#D1D5DB] ml-1">
                          {topC.lifestyle[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-dashed border-[#D2C8B5] dark:border-[#2A3B4A] text-center text-xs text-[#737C77] dark:text-[#94A3B8]">
              当てはまる症状をチェックすると、ここにあなた専用の体質解説とパーソナル養生法が表示されます。
            </div>
          )}
        </div>
      ) : (
        /* 7大体質カード一覧（図鑑モード） */
        <div>
          {/* カード選択ピル */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CONSTITUTIONS.map((c) => {
              const isSelected = selectedCardId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCardId(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? "bg-white dark:bg-[#121920] shadow-xs scale-105"
                      : "bg-[#FAF8F5] dark:bg-[#17212A] opacity-75 hover:opacity-100 border-[#E8E1D1] dark:border-[#22303D]"
                  }`}
                  style={{
                    borderColor: isSelected ? c.color : undefined,
                    color: isSelected ? c.color : undefined,
                  }}
                >
                  {c.name}（{c.kana}）
                </button>
              );
            })}
          </div>

          {/* 選択された体質の特大カード */}
          {(() => {
            const c = CONSTITUTIONS.find((item) => item.id === selectedCardId)!;
            return (
              <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE4D5] dark:border-[#22303D] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-xs"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name[0]}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-xl text-[#232826] dark:text-[#FAF8F5]">
                          {c.name}（{c.kana}）
                        </h4>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${c.tagColor}`}>
                          {c.category}の失調
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                        {c.statusTitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#94A3B8]">
                    キャラクター：{c.characterTrait}
                  </span>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
                    状態と発生メカニズム
                  </h5>
                  <p className="text-sm text-[#232826] dark:text-[#D1D5DB] leading-relaxed">
                    {c.mechanism}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* 自覚症状 */}
                  <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <div className="font-bold text-[#D32F2F] dark:text-[#EF5350] mb-2 flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      <span>典型的な自覚症状</span>
                    </div>
                    <ul className="space-y-1 text-[#3E4541] dark:text-[#CBD5E1]">
                      {c.symptoms.map((s, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 食養生食材 */}
                  <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <div className="font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>おすすめの養生食材</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.foods.map((food, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#121920] border border-[#E8E1D1] dark:border-[#22303D] font-medium text-[#232826] dark:text-[#FAF8F5]"
                        >
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 生活アクション＆注意点 */}
                  <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <div className="font-bold text-[#B86924] dark:text-[#E6C387] mb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>生活養生とNG行動</span>
                    </div>
                    <ul className="space-y-1.5 text-[#3E4541] dark:text-[#CBD5E1]">
                      {c.lifestyle.map((act, i) => (
                        <li key={i} className="leading-tight">
                          ・{act}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2.5 pt-2 border-t border-[#F2ECE0] dark:border-[#22303D] text-[11px] text-[#C62828] dark:text-[#EF9A9A] font-medium">
                      ⚠️ {c.caution}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </figure>
  );
}
