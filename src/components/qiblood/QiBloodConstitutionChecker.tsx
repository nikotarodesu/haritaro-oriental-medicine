"use client";

import React, { useState } from "react";
import { Sparkles, RotateCcw, HelpCircle, UserCheck, Shield, ChevronRight, Activity } from "lucide-react";
import QiBloodLearningScope from "./QiBloodLearningScope";

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
  learningCue: string;
}

const CONSTITUTIONS: Constitution[] = [
  {
    id: "qikyo",
    name: "気虚",
    kana: "ききょ",
    category: "気",
    color: "#FFA000",
    tagColor: "bg-[#FFF8E1] text-[#E65100] border-[#FFE082] dark:bg-[#FFA000]/20 dark:text-[#FFE082]",
    statusTitle: "気の働きの不足という伝統分類",
    mechanism: "伝統医学では、活動を支える「気」の働きが不足するという見方を気虚と呼びます。疲れやすさなどを整理する学習用の分類で、ATP量や疲労の原因を測るものではありません。",
    questions: [
      { id: "q1", text: "少し動くだけですぐ疲れ、休んでも疲れが抜けにくい" },
      { id: "q2", text: "食後に強い眠気や身体のだるさに襲われることが多い" },
      { id: "q3", text: "声が小さく張りがなく、息切れしやすい・風邪を引きやすい" },
    ],
    symptoms: ["全身倦怠感", "食後の強い眠気", "息切れ・話すのがおっくう", "泥状便・軟便", "風邪をひきやすい"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["睡眠・休憩時間を振り返る", "負担が増える場面を書き留める", "食事の量・回数を振り返る"],
    caution: "気虚という分類だけでは、疲労の原因や適切な活動量は決まりません。",
    learningCue: "働きの不足という見方",
  },
  {
    id: "kitai",
    name: "気滞",
    kana: "きたい",
    category: "気",
    color: "#00897B",
    tagColor: "bg-[#E0F2F1] text-[#00695C] border-[#80CBC4] dark:bg-[#004D40]/30 dark:text-[#80CBC4]",
    statusTitle: "気の巡りの停滞という伝統分類",
    mechanism: "伝統医学では、張りやため息などを「気の巡りの停滞」と関連づけて説明します。気滞は自律神経の検査結果や性格を示す名称ではなく、原因を確定するものでもありません。",
    questions: [
      { id: "q4", text: "些細なことでイライラしやすく、無意識にため息をついてしまう" },
      { id: "q5", text: "胸・脇腹・下腹部がパンパンに張る感じやガス溜まりがある" },
      { id: "q6", text: "喉に何かがつっかえているような違和感（梅核気）がある" },
    ],
    symptoms: ["イライラ・気分の波", "胸脇や下腹部の張り", "ため息が多い", "喉のつかえ感", "月経前の気分の変化"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["張りや気分の変化が出る場面を記録する", "忙しさ・休憩の取り方を振り返る", "生活の変化と症状の前後関係を確認する"],
    caution: "感情や性格だけで症状の原因を決めつけません。",
    learningCue: "巡りの停滞という見方",
  },
  {
    id: "kekkyo",
    name: "血虚",
    kana: "けっきょ",
    category: "血",
    color: "#D32F2F",
    tagColor: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2] dark:bg-[#D32F2F]/20 dark:text-[#EF9A9A]",
    statusTitle: "血の養う働きの不足という伝統分類",
    mechanism: "伝統医学では、「血」が身体を養う働きの不足を血虚と説明します。血虚と貧血は同じ概念ではなく、このチェックから血算の値や栄養不足を判定することはできません。",
    questions: [
      { id: "q7", text: "立ちくらみ・めまいが起きやすく、顔色が青白いと言われる" },
      { id: "q8", text: "皮膚が乾燥してかゆくなりやすい、爪が割れやすい・スジが入る" },
      { id: "q9", text: "夜間に眠りが浅く夢を多く見る、または不安感で寝付けない" },
    ],
    symptoms: ["立ちくらみ・ふらつき", "爪がもろい・髪のパサつき", "不眠・多夢・健忘", "こむら返り（足のつり）", "月経量が少ない"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["眠り・食事・めまいの経過を記録する", "気になる症状を相談するための情報を整理する", "画面を見る時間や休憩の取り方を振り返る"],
    caution: "血虚の点数から貧血を判断したり、食品で治療できると考えたりしないでください。",
    learningCue: "養う働きの不足という見方",
  },
  {
    id: "oketsu",
    name: "瘀血",
    kana: "おけつ",
    category: "血",
    color: "#880E4F",
    tagColor: "bg-[#FCE4EC] text-[#880E4F] border-[#F8BBD0] dark:bg-[#880E4F]/20 dark:text-[#F48FB1]",
    statusTitle: "血の巡りの停滞という伝統分類",
    mechanism: "伝統医学では、固定した痛みや色の変化などを「血の巡りの停滞」と関連づけて説明します。瘀血は、血栓・微小循環障害・血液粘稠度の検査結果と同一ではありません。",
    questions: [
      { id: "q10", text: "肩こりや腰痛、生理痛など、いつも決まった場所が刺すように痛む" },
      { id: "q11", text: "目の下にクマができやすい、顔色がくすんでシミ・色素沈着が気になる" },
      { id: "q12", text: "舌の裏を見ると紫色の太い血管が浮き出ている、舌に紫のシミがある" },
    ],
    symptoms: ["局所の刺すような固定痛", "暗紫色の舌・唇", "目の下のクマ・肌のくすみ", "月経血に塊が混じる", "冷えとのぼせ感"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["痛む場所・時間・変化を記録する", "活動と休憩の取り方を振り返る", "月経などの経過を個別に相談するための情報を整理する"],
    caution: "舌の色や痛みの場所だけで、血栓の有無や血流の状態は判断できません。",
    learningCue: "血の巡りという見方",
  },
  {
    id: "tanshitsu",
    name: "痰湿",
    kana: "たんしつ",
    category: "水",
    color: "#0288D1",
    tagColor: "bg-[#E1F5FE] text-[#0277BD] border-[#B3E5FC] dark:bg-[#0288D1]/20 dark:text-[#81D4FA]",
    statusTitle: "津液の運行の停滞という伝統分類",
    mechanism: "痰湿は、重だるさなどを津液の運行の停滞と関連づける伝統的な説明です。体内の「毒」や不要な液体を測定した結果ではなく、むくみの原因もこの分類では確定できません。",
    questions: [
      { id: "q13", text: "雨の日や湿度の高い日に、身体や頭が重だるく調子を崩しやすい" },
      { id: "q14", text: "夕方になると足やすねがパンパンにむくみ、靴がきつくなる" },
      { id: "q15", text: "口の中が粘っこい感じがする、便が便器にこびりつくほど粘り気がある" },
    ],
    symptoms: ["頭が重い（濡れタオルを巻かれたよう）", "手足・顔のむくみ", "関節の重痛・こわばり", "粘り気のある便", "痰がからみやすい"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["重だるさやむくみが出る時間を記録する", "生活環境と症状の変化を分けて記録する", "飲水量や発汗の方法を分類だけで決めない"],
    caution: "この集計を理由に飲水を制限したり、発汗による排出を試したりしないでください。",
    learningCue: "津液の運行という見方",
  },
  {
    id: "inkyo",
    name: "陰虚",
    kana: "いんきょ",
    category: "陰陽",
    color: "#7B1FA2",
    tagColor: "bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7] dark:bg-[#7B1FA2]/20 dark:text-[#CE93D8]",
    statusTitle: "陰の潤す・冷やす働きの不足という伝統分類",
    mechanism: "陰虚は、潤す・冷やす働きが不足するという伝統的な説明です。「冷却水不足」は理解を助ける比喩にとどまり、実際の体液量や検査値の判定ではありません。",
    questions: [
      { id: "q16", text: "夕方から夜にかけて手足のひらや足の裏がカッとほてりやすい" },
      { id: "q17", text: "夜間に寝汗（盗汗）をかいて目が覚めることがある" },
      { id: "q18", text: "喉や唇、肌が年中乾燥していて、冷たい水を少しずつ欲しがる" },
    ],
    symptoms: ["手足のほてり（五心煩熱）", "寝汗", "皮膚や粘膜の乾燥", "コロコロとしたウサギ状の乾燥便", "夕方の微熱感・頬の赤み"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["ほてり・乾燥・睡眠の経過を記録する", "症状が出る時間や環境を振り返る", "食事や休憩の取り方を振り返る"],
    caution: "ほてりや乾燥の原因、冷やす・温める方法は点数だけでは決まりません。",
    learningCue: "潤す働きという見方",
  },
  {
    id: "yokyo",
    name: "陽虚",
    kana: "ようきょ",
    category: "陰陽",
    color: "#E65100",
    tagColor: "bg-[#FFF3E0] text-[#BF360C] border-[#FFCC80] dark:bg-[#E65100]/20 dark:text-[#FFB74D]",
    statusTitle: "陽の温める働きの不足という伝統分類",
    mechanism: "陽虚は、温める働きが不足するという伝統的な説明です。気虚から必ず進行する段階ではなく、体温や内臓機能の検査結果を示すものでもありません。",
    questions: [
      { id: "q19", text: "季節を問わず腰や手足の先が激しく冷え、寒さに極端に弱い" },
      { id: "q20", text: "夜間に何度もトイレに起きる、または尿の色が薄く量が多い" },
      { id: "q21", text: "お腹が冷えるとすぐにお腹を下す、朝一番に下痢（五更瀉）しやすい" },
    ],
    symptoms: ["腰から下の激しい冷え", "夜間頻尿", "水のような下痢・未消化便", "寒がり・厚着を好む", "顔色が青白く元気がない"],
    foods: ["主食の例：米・パン", "主菜の例：魚・大豆製品", "副菜の例：野菜"],
    lifestyle: ["冷えが気になる時間や場所を記録する", "日常の活動と食事の間隔を振り返る", "気になる症状を相談するための情報を整理する"],
    caution: "冷えの原因や灸・方剤の選択を、この分類だけで決めないでください。",
    learningCue: "温める働きという見方",
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

  // 分類ごとの選択数を集計（医学的なスコアではない）
  const scores = CONSTITUTIONS.map((c) => {
    const score = c.questions.filter((q) => checkedIds[q.id]).length;
    return {
      constitution: c,
      score,
      total: c.questions.length,
    };
  });

  // 最多の選択数だった説明項目
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
            <span>画像解説④：気血水・陰陽の7つの伝統分類を学ぶ</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            選んだ所見から、伝統分類の説明を読み比べる
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
            所見の学習チェック
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
            7つの分類カード
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
                  説明を読み比べたい所見を選んでください（複数選択可）
                </p>
                <p className="text-[11px] text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                  各項目を1件として数える学習用の集計です。質問と点数の医学的妥当性は未検証で、体質・病名・性格・重症度は判定しません。
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

            {/* 分類ごとの選択数 */}
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

          {/* 学習用の所見リスト（7分類・各3項目＝全21項目） */}
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
                      {c.learningCue}
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
                    説明に使われる所見の例：{c.symptoms[0]}・{c.symptoms[1]}
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

          {/* 学習用の選択数の表示 */}
          {hasAnswers ? (
            <div className="bg-white dark:bg-[#17212A] rounded-2xl border-2 border-[#1E3D34] dark:border-[#74BA9E] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E3D34] text-white text-xs font-bold">
                  選択数の集計
                </span>
                <h5 className="font-bold text-base sm:text-lg text-[#232826] dark:text-[#FAF8F5]">
                  選択数が最多だった説明項目：
                  <span className="text-[#1E3D34] dark:text-[#74BA9E] ml-1">
                    {topConstitutions.map((t) => t.constitution.name).join(" ＆ ")}
                  </span>
                </h5>
              </div>
              <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed">食品の例は全分類で共通です。選択数から食材の効果や個人に合う治療食を判断するものではありません。</p>

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
                        {topC.learningCue}
                      </span>
                    </div>
                    <p className="text-xs text-[#59615D] dark:text-[#96A6B2] leading-relaxed mb-3">
                      {topC.mechanism}
                    </p>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                          食事を振り返る例：
                        </span>
                        <span className="text-[#3E4541] dark:text-[#D1D5DB] ml-1">
                          {topC.foods.join("、")}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-[#B86924] dark:text-[#E6C387]">
                          生活を振り返る例：
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
              項目を選ぶと、選択数が最多だった分類の説明を表示します。分類は併存することもあり、最多の項目が原因や診断を表すわけではありません。
            </div>
          )}
        </div>
      ) : (
        /* 7つの伝統分類カード（図鑑モード） */
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

          {/* 選択された分類の解説カード */}
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
                          {c.category}の伝統分類
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#59615D] dark:text-[#96A6B2] mt-0.5">
                        {c.statusTitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-[#737C77] dark:text-[#94A3B8]">
                    学習の観点：{c.learningCue}
                  </span>
                </div>

                <div className="mb-6">
                  <h5 className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider mb-1">
                    伝統的な説明の範囲
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
                      <span>説明に使われる所見の例</span>
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

                  {/* 分類別の効果を意図しない、通常の食事の例 */}
                  <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
                    <div className="font-bold text-[#1E3D34] dark:text-[#74BA9E] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>食事を振り返る例</span>
                    </div>
                    <p className="mb-2 text-[#59615D] dark:text-[#96A6B2]">全分類で共通の食事の例です。分類別の治療食や効果を示すものではありません。</p>
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
                      <span>生活を振り返る例・解釈の限界</span>
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
      <QiBloodLearningScope />
    </figure>
  );
}
