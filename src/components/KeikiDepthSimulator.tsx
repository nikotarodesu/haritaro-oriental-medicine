"use client";

import React, { useState, useMemo } from "react";
import {
  Waves,
  Sparkles,
  Zap,
  Activity,
  Flame,
  CloudRain,
  Wind,
  Compass,
  ArrowRight,
  Info,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

// 五輸穴の型定義
export type ShuType = "井" | "滎" | "兪" | "経" | "合";

export interface FiveShuPoint {
  type: ShuType;
  level: number; // 1 to 5
  name: string;
  reading: string;
  element: "木" | "火" | "土" | "金" | "水";
  elementColor: string;
  flowMetaphor: string; // 泉湧く、小川流る、大河注ぐ、奔流巡る、大海へ没す
  flowKanji: string; // 出、流、注、行、入
  nankeiClassic: string; // 原文
  nankeiMeaning: string; // 臨床解釈
  symptomTrigger: string; // 逆引き病態トリガー
  location: string; // 取穴法
  depthDescription: string; // 刺鍼深度
  depthLevelMm: string; // 推奨深度
  depthRatio: number; // 深度割合（0-100）
  neuroPhysiology: string; // 現代神経科学的メカニズム
  clinicalAdvice: string; // 臨床実践の要諦
  isYuan?: boolean; // 原穴を兼ねるか（陰経の兪穴）
}

export interface MeridianData {
  id: string;
  name: string;
  shortName: string;
  limb: "手" | "足";
  yinYang: "陰" | "陽";
  organ: string;
  accentColor: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  points: FiveShuPoint[];
  yuanPointNotice?: string;
}

// 経絡データ
const MERIDIANS: MeridianData[] = [
  {
    id: "lu",
    name: "手の太陰肺経",
    shortName: "肺経",
    limb: "手",
    yinYang: "陰",
    organ: "肺・呼吸器・体表",
    accentColor: "#1E3D34",
    bgLight: "#EBF3EF",
    bgDark: "#182823",
    borderColor: "#C5DED4",
    yuanPointNotice: "太淵（兪穴）が原穴を兼ねます（陰経五兪穴の原則：兪穴＝原穴）。",
    points: [
      {
        type: "井",
        level: 1,
        name: "少商",
        reading: "しょうしょう",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所出為井（泉が微かに湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "胸腹部の急性閉塞感、のどの急激な腫痛、救急時の意識混濁、熱性痙攣。",
        symptomTrigger: "急激な咽頭痛・のどの閉塞・救急",
        location: "母指橈側爪甲根部、角を去ること1分",
        depthDescription: "極浅刺（1〜2mm）または三稜針による点刺放血。",
        depthLevelMm: "1〜2mm（極浅層）",
        depthRatio: 15,
        neuroPhysiology: "指先の高密度侵害受容器（メルケル小体）刺激による網様体賦活系への求心性インパルス、中枢覚醒反射。",
        clinicalAdvice: "急性扁桃炎や高熱時の咽頭閉塞感には、少商の点刺放血（1〜2滴）が劇的な即効性を示します。",
      },
      {
        type: "滎",
        level: 2,
        name: "魚際",
        reading: "ぎょさい",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "発熱、肺熱による咳嗽、手のひらのほてり、局所急性の赤み・熱感。",
        symptomTrigger: "肺の熱感・手のひらの火照り・急性炎症",
        location: "第1中手骨中点の橈側、赤白肉際（母指球の膨らみの境目）",
        depthDescription: "浅刺（2〜3mm）で素早く捻針、熱を抜く瀉法。",
        depthLevelMm: "2〜3mm（表皮下・筋膜浅層）",
        depthRatio: 35,
        neuroPhysiology: "局所微小循環の交感神経性血管収縮を解除し、軸索反射による抗炎症ニューロペプチドの局所拡散を促進。",
        clinicalAdvice: "風熱による激しい咳嗽や、母指球が赤く熱を持っている熱証タイプに極めて有効です。",
      },
      {
        type: "兪",
        level: 3,
        name: "太淵",
        reading: "たいえん",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "身体の重だるさ、手関節痛、肺気虚による慢性の息切れ・倦怠感。",
        symptomTrigger: "雨の日の重だるさ・慢性息切れ・脈微弱",
        location: "手関節前掌側横紋上、橈骨動脈拍動部（脈会）",
        depthDescription: "中等度刺入（3〜5mm）。動脈に触れぬよう愛護的に刺入。",
        depthLevelMm: "3〜5mm（腱・関節包近傍）",
        depthRatio: 55,
        neuroPhysiology: "関節受容器および脈管周囲神経叢の刺激により、自律神経反射を介して肺循環と組織間質液の循環を促進。",
        clinicalAdvice: "兪土穴かつ原穴であり、肺経全体の虚損を補う本治穴（肺虚証の第一選択）です。",
        isYuan: true,
      },
      {
        type: "経",
        level: 4,
        name: "経渠",
        reading: "けいきょ",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "気道過敏による咳嗽、喘息、悪寒と発熱、咽喉の違和感、胸痛。",
        symptomTrigger: "止まらない喘咳・悪寒発熱・気道過敏",
        location: "橈骨茎状突起の内側で、橈骨動脈と橈骨の間、手関節横紋の上1寸",
        depthDescription: "深刺（5〜8mm）。骨際を沿わせるように丁寧に進針。",
        depthLevelMm: "5〜8mm（深部腱鞘・骨膜際）",
        depthRatio: 75,
        neuroPhysiology: "腕神経叢分枝（橈骨神経浅枝）への刺激が脊髄C5-T1を介し、気管支平滑筋調節の交感反射を誘導。",
        clinicalAdvice: "自経の本穴（金経の金穴）。寒熱の往来を伴う頑固な咳止めに用いられます。",
      },
      {
        type: "合",
        level: 5,
        name: "尺沢",
        reading: "しゃくたく",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "激しい咳き込み（気逆）、嘔吐、急性の下痢、肺胃不和による上気。",
        symptomTrigger: "激しい咳き込み・胃酸逆流・吐き気",
        location: "肘窩横紋上、上腕二頭筋腱の外側陥凹部",
        depthDescription: "最深刺（10〜15mm）。筋腹の深部へしっかり刺入。",
        depthLevelMm: "10〜15mm（深層大筋群・関節深部）",
        depthRatio: 95,
        neuroPhysiology: "太い筋求心性線維（Ia/Ib群）を刺激し、上位脳幹・迷走神経複合体へ働きかけ、気道内圧と呼吸筋痙攣を抑制。",
        clinicalAdvice: "肺熱が激しく気が逆上しているとき、尺沢への深刺瀉法は逆気（上気）を一気に降ろす強力なブレーキになります。",
      },
    ],
  },
  {
    id: "li",
    name: "手の陽明大腸経",
    shortName: "大腸経",
    limb: "手",
    yinYang: "陽",
    organ: "大腸・頭面部・皮膚",
    accentColor: "#B86924",
    bgLight: "#FCF4EB",
    bgDark: "#2A2117",
    borderColor: "#E6C387",
    yuanPointNotice: "陽経の原穴は三間（兪穴）と陽渓（経穴）の間にある「合谷」が担います。",
    points: [
      {
        type: "井",
        level: 1,
        name: "商陽",
        reading: "しょうよう",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所出為井（泉が微かに湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "急性高熱、下歯痛、意識消失、激しい腹満・便秘による悶絶感。",
        symptomTrigger: "急な高熱・急性歯痛・意識障害",
        location: "示指橈側爪甲根部、角を去ること1分",
        depthDescription: "極浅刺（1〜2mm）または点刺放血。",
        depthLevelMm: "1〜2mm（極浅層）",
        depthRatio: 15,
        neuroPhysiology: "正中神経末梢感覚受容器の瞬間的高頻度刺激による脳幹賦活。",
        clinicalAdvice: "顔面部の急性実熱（急な激しい歯痛や高熱）の緊急瀉熱穴として用いられます。",
      },
      {
        type: "滎",
        level: 2,
        name: "二間",
        reading: "じかん",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "身熱、歯肉の腫熱、喉の渇き、口内炎、鼻出血など陽明の熱。",
        symptomTrigger: "歯茎の腫れ・口内炎・鼻出血・顔の熱",
        location: "第2中手指節関節の前、橈側の陥凹部",
        depthDescription: "浅刺（2〜3mm）。",
        depthLevelMm: "2〜3mm（浅層皮下）",
        depthRatio: 35,
        neuroPhysiology: "末梢血管収縮抑制による局所充血の緩和。",
        clinicalAdvice: "大腸経の熱を瀉する子穴（金生水・実すればその子を瀉す）として重用されます。",
      },
      {
        type: "兪",
        level: 3,
        name: "三間",
        reading: "さんかん",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "手指の関節痛・こわばり、肩背痛、腸内ガスの停滞・重だるさ。",
        symptomTrigger: "指の関節痛・手のこわばり・腹部膨満",
        location: "第2中手指節関節の後、橈側の陥凹部",
        depthDescription: "中等度刺入（3〜5mm）。",
        depthLevelMm: "3〜5mm（筋膜・関節包近傍）",
        depthRatio: 55,
        neuroPhysiology: "手指小関節の固有受容器刺激による脊髄節反射（抗侵害受容）。",
        clinicalAdvice: "リウマチや腱鞘炎など、手指〜手関節の重苦しい運動痛に頻用されます。",
      },
      {
        type: "経",
        level: 4,
        name: "陽渓",
        reading: "ようけい",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "寒熱を伴う頭痛、咽頭腫痛、手関節の激しい痛み。",
        symptomTrigger: "発熱に伴う頭痛・手関節痛・喉の腫れ",
        location: "手関節背側横紋の橈側、長母指伸筋腱と短母指伸筋腱の間の陥凹部（解剖学的嗅ぎタバコ入れ）",
        depthDescription: "深刺（5〜8mm）。腱を避けて窪みの深部へ。",
        depthLevelMm: "5〜8mm（深部腱間隙）",
        depthRatio: 75,
        neuroPhysiology: "橈骨神経浅枝刺激による三叉神経脊髄路核への抑制性インパルス。",
        clinicalAdvice: "手の使いすぎによる腱鞘炎（ドケルバン病）および頭痛の要穴です。",
      },
      {
        type: "合",
        level: 5,
        name: "曲池",
        reading: "きょくち",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "激しい下痢、便秘、大腸の機能不全、皮膚炎、全身の熱性逆上。",
        symptomTrigger: "激しい下痢・便秘・アトピー湿疹・高血圧",
        location: "屈肘時、肘窩横紋の外端の陥凹部",
        depthDescription: "最深刺（10〜20mm）。直刺でずっしりと響かせる。",
        depthLevelMm: "10〜20mm（腕橈骨筋深層）",
        depthRatio: 95,
        neuroPhysiology: "太い筋求心性線維を介する視床下部・自律神経中枢へのフィードバック、腸管運動の双方向調整（下痢・便秘両用）。",
        clinicalAdvice: "「合穴は六腑を治す」の代表格。大腸の病だけでなく、全身の皮膚熱毒や血熱を冷ます大穴です。",
      },
    ],
  },
  {
    id: "sp",
    name: "足の太陰脾経",
    shortName: "脾経",
    limb: "足",
    yinYang: "陰",
    organ: "脾・消化吸収・湿気",
    accentColor: "#92400E",
    bgLight: "#FEF3C7",
    bgDark: "#261A0C",
    borderColor: "#FCD34D",
    yuanPointNotice: "太白（兪穴）が原穴を兼ねます（陰経五兪穴の原則：兪穴＝原穴）。",
    points: [
      {
        type: "井",
        level: 1,
        name: "隠白",
        reading: "いんぱく",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所出為井（泉が微かに湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "胃部痞満、急激な腹痛・膨満、不正出血（脾不統血）、悪夢・不眠。",
        symptomTrigger: "急な腹部膨満・胃のつかえ・不正出血",
        location: "足の第1指内側爪甲根部、角を去ること1分",
        depthDescription: "極浅刺（1〜2mm）または温灸（糸状灸）。",
        depthLevelMm: "1〜2mm（極浅層）",
        depthRatio: 15,
        neuroPhysiology: "足底感覚神経終末刺激による交感神経反射、子宮平滑筋・消化管収縮力調節。",
        clinicalAdvice: "脾が血を統括できなくなった慢性出血（月経過多など）には、隠白のお灸が古来から特効とされます。",
      },
      {
        type: "滎",
        level: 2,
        name: "大都",
        reading: "だいと",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "熱病で汗が出ない、食後のほてり、胃熱による過食・口渇。",
        symptomTrigger: "食後の異常なほてり・胃熱による口渇",
        location: "足の第1指内側、第1中足指節関節の前、赤白肉際",
        depthDescription: "浅刺（2〜3mm）。",
        depthLevelMm: "2〜3mm（浅層皮下）",
        depthRatio: 35,
        neuroPhysiology: "局所微小循環を介する発汗中枢の賦活。",
        clinicalAdvice: "脾経の母穴（火生土・虚すればその母を補う）。胃腸虚弱に伴う無汗熱病に補法で使われます。",
      },
      {
        type: "兪",
        level: 3,
        name: "太白",
        reading: "たいはく",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "全身の重だるさ、足腰の重痛、慢性消化不良、雨天時の倦怠感。",
        symptomTrigger: "湿気による身体の重だるさ・慢性消化不良",
        location: "足の内側、第1中足指節関節の後、赤白肉際",
        depthDescription: "中等度刺入（3〜5mm）。",
        depthLevelMm: "3〜5mm（筋膜・腱付着部）",
        depthRatio: 55,
        neuroPhysiology: "固有受容器から脊髄後角への入力により、深部筋緊張緩和と組織間液（リンパ）還流を促進。",
        clinicalAdvice: "兪土穴かつ原穴であり、脾経の本穴。「脾は湿を悪む」ため、湿邪による重だるさの特効穴です。",
        isYuan: true,
      },
      {
        type: "経",
        level: 4,
        name: "商丘",
        reading: "しょうきゅう",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "腹鳴を伴う咳、寒熱の往来、足関節痛、舌のこわばり。",
        symptomTrigger: "胃腸症状を伴う咳・足首の痛み・悪寒",
        location: "内果の前下方、舟状骨粗面と内果を結ぶ線の中点、陥凹部",
        depthDescription: "深刺（5〜8mm）。関節腔に入らぬよう配慮。",
        depthLevelMm: "5〜8mm（腱間隙）",
        depthRatio: 75,
        neuroPhysiology: "伏在神経刺激による下肢リンパ流促進と体温調節反射。",
        clinicalAdvice: "消化器系由来の呼吸器症状（湿痰が肺を犯す）に用いられる要穴です。",
      },
      {
        type: "合",
        level: 5,
        name: "陰陵泉",
        reading: "いんりょうせん",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "水瀉性下痢、尿閉・頻尿・失禁、腹水、むくみ、下腹部重圧感。",
        symptomTrigger: "激しい水様下痢・下肢のむくみ・尿トラブル",
        location: "脛骨内側顆の下方、脛骨後縁の陥凹部",
        depthDescription: "最深刺（10〜20mm）。脛骨の後ろへ深く刺入。",
        depthLevelMm: "10〜20mm（深層ヒラメ筋・脛骨神経近傍）",
        depthRatio: 95,
        neuroPhysiology: "脛骨神経深部求心性線維刺激により、骨盤内臓神経および腎・膀胱・腸管平滑筋の水分再吸収・排泄を強力に統御。",
        clinicalAdvice: "東洋医学最強の「利水穴（体内の余分な水を排出する穴）」。下痢や下肢浮腫の第一選択です。",
      },
    ],
  },
  {
    id: "st",
    name: "足の陽明胃経",
    shortName: "胃経",
    limb: "足",
    yinYang: "陽",
    organ: "胃・食物受納・気血生成",
    accentColor: "#D97706",
    bgLight: "#FEF9C3",
    bgDark: "#262208",
    borderColor: "#FDE047",
    yuanPointNotice: "陽経の原穴は陥谷（兪穴）と解渓（経穴）の間にある「衝陽」が担います。",
    points: [
      {
        type: "井",
        level: 1,
        name: "厲兌",
        reading: "れいだ",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所出為井（泉が微かに湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "胃部の激しい痞え、悪夢、精神錯乱・躁狂、急性歯痛。",
        symptomTrigger: "急な胸やけ胃痛・悪夢・精神興奮",
        location: "足の第2指外側爪甲根部、角を去ること1分",
        depthDescription: "極浅刺（1〜2mm）または点刺放血。",
        depthLevelMm: "1〜2mm（極浅層）",
        depthRatio: 15,
        neuroPhysiology: "足指先端の受容器刺激による大脳皮質抑制性インターニューロンの賦活。",
        clinicalAdvice: "胃熱による夜間の悪夢や多夢、精神が高ぶって眠れないときに井穴の浅刺が奏功します。",
      },
      {
        type: "滎",
        level: 2,
        name: "内庭",
        reading: "ないてい",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "胃熱による発熱、口臭、激しい歯痛、咽頭腫痛、過食飢餓感。",
        symptomTrigger: "胃熱による口臭・激しい歯痛・口の渇き",
        location: "足の背側、第2・第3指の間、みずかきの後縁、赤白肉際",
        depthDescription: "浅刺（2〜3mm）。",
        depthLevelMm: "2〜3mm（皮下組織）",
        depthRatio: 35,
        neuroPhysiology: "浅層知覚神経への持続刺激による自律神経性胃酸分泌過多の抑制。",
        clinicalAdvice: "胃火（胃の炎症熱）を速やかに消火する名穴。胃熱性の激しい歯痛や口内炎の特効穴です。",
      },
      {
        type: "兪",
        level: 3,
        name: "陥谷",
        reading: "かんこく",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "顔面や足背のむくみ、足関節の重だるい痛み、腹痛、腸鳴。",
        symptomTrigger: "顔や足背のむくみ・胃腸の重だるさ",
        location: "足の背側、第2・第3中足骨間、第2中足指節関節の後方陥凹部",
        depthDescription: "中等度刺入（3〜5mm）。",
        depthLevelMm: "3〜5mm（骨間筋浅層）",
        depthRatio: 55,
        neuroPhysiology: "深腓骨神経刺激を介する下肢微小循環の改善。",
        clinicalAdvice: "水腫（むくみ）の排出に優れ、特にまぶたや顔のむくみと足背痛を同時に解消します。",
      },
      {
        type: "経",
        level: 4,
        name: "解渓",
        reading: "かいけい",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "頭痛、眩暈、発熱、足関節痛、胃腸虚弱に伴う動悸。",
        symptomTrigger: "熱感を伴う頭痛・足首前面の痛み・眩暈",
        location: "足関節前面の中央、長母指伸筋腱と長指伸筋腱の間の陥凹部",
        depthDescription: "深刺（5〜8mm）。腱を避けて関節裂隙へ。",
        depthLevelMm: "5〜8mm（足関節前面深部）",
        depthRatio: 75,
        neuroPhysiology: "足関節包の固有感覚受容器刺激による歩行運動神経の再統合。",
        clinicalAdvice: "胃経の母穴（火生土）。胃経のエネルギー不足を補い、足首の脱力感を力強く引き締めます。",
      },
      {
        type: "合",
        level: 5,
        name: "足三里",
        reading: "あしさんり",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "嘔吐・悪心・吃逆（気逆）、激しい下痢（気泄）、胃潰瘍、内臓疲労、免疫力低下。",
        symptomTrigger: "胃酸逆流・吐き気・急な下痢・全身倦怠感",
        location: "膝蓋骨靭帯の外側陥凹（外膝眼）の下3寸、脛骨前縁の外側1横指",
        depthDescription: "最深刺（15〜25mm）。前脛骨筋の深部へずっしりと刺入。",
        depthLevelMm: "15〜25mm（前脛骨筋深部・深腓骨神経）",
        depthRatio: 95,
        neuroPhysiology: "深腓骨神経刺激が視床下部・迷走神経複合体を駆動し、胃運動亢進と腸管炎症抑制を誘発（迷走神経抗炎症経路）。",
        clinicalAdvice: "東洋医学の最高峰「治病・養生の大穴」。「肚腹は三里に留む」と言われ、あらゆる消化器病変の根幹を治します。",
      },
    ],
  },
  {
    id: "ki",
    name: "足の少陰腎経",
    shortName: "腎経",
    limb: "足",
    yinYang: "陰",
    organ: "腎・先天の精・水分代謝",
    accentColor: "#0284C7",
    bgLight: "#E0F2FE",
    bgDark: "#0B2133",
    borderColor: "#BAE6FD",
    yuanPointNotice: "太谿（兪穴）が原穴を兼ねます（陰経五兪穴の原則：兪穴＝原穴）。",
    points: [
      {
        type: "井",
        level: 1,
        name: "湧泉",
        reading: "ゆうせん",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所出為井（生命の泉が地下より湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "激しいのぼせ、狂躁、失神、心下の急迫感、熱発痙攣。",
        symptomTrigger: "激しいのぼせ・失神救急・足底の熱感",
        location: "足底の前部、足の指を屈したときにできる中央の陥凹部",
        depthDescription: "極浅刺（1〜2mm）または強圧搾・温灸。",
        depthLevelMm: "1〜3mm（足底腱膜浅層）",
        depthRatio: 15,
        neuroPhysiology: "足底メカノレセプターの最大荷重部刺激による全身交感神経緊張の抑制、引火帰原作用。",
        clinicalAdvice: "人体の最下点から生命エネルギーが湧き出る泉。逆上した血熱を足底へ一気に引き下ろす特効穴です。",
      },
      {
        type: "滎",
        level: 2,
        name: "然谷",
        reading: "ねんこく",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "陰虚による潮熱（午後の発熱）、盗汗（寝汗）、口渇、喉の乾燥。",
        symptomTrigger: "夕方の微熱・寝汗・喉の渇き・足裏の火照り",
        location: "足の内側、舟状骨粗面の下方、赤白肉際",
        depthDescription: "浅刺（2〜3mm）。",
        depthLevelMm: "2〜3mm（浅層皮下）",
        depthRatio: 35,
        neuroPhysiology: "局所知覚神経刺激による体温中枢（視床下部視索前野）への抑制調節。",
        clinicalAdvice: "腎陰が枯渇して生じる「虚熱（骨蒸潮熱）」を優しく冷まし、潤いを取り戻す要穴です。",
      },
      {
        type: "兪",
        level: 3,
        name: "太谿",
        reading: "たいけい",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "足腰の脱力痛・重だるさ、耳鳴り、冷えのぼせ、腎気虚。",
        symptomTrigger: "足腰の重だるい痛み・耳鳴り・手足の冷え",
        location: "内果尖とアキレス腱の間の陥凹部、後脛骨動脈拍動部",
        depthDescription: "中等度刺入（3〜5mm）。動脈に触れぬよう直刺。",
        depthLevelMm: "3〜5mm（アキレス腱周囲組織）",
        depthRatio: 55,
        neuroPhysiology: "後脛骨神経および周囲交感神経網刺激による下肢血流増大・腎血流促進。",
        clinicalAdvice: "腎経の原穴にして兪土穴。先天の原気をダイレクトに補う腎虚治療の最重要穴です。",
        isYuan: true,
      },
      {
        type: "経",
        level: 4,
        name: "復溜",
        reading: "ふくりゅう",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "腎虚喘息（呼多吸少）、異常発汗または無汗、悪寒。",
        symptomTrigger: "息を吸い込めない喘息・異常な発汗・冷え",
        location: "内果尖の上方2寸、太谿の直上、ヒラメ筋の前縁",
        depthDescription: "深刺（5〜8mm）。筋膜を通過させて刺入。",
        depthLevelMm: "5〜8mm（下腿深層筋膜）",
        depthRatio: 75,
        neuroPhysiology: "交感神経節後線維を介する汗腺の開閉コントロール、副腎皮質ホルモン分泌への影響。",
        clinicalAdvice: "腎経の母穴（金生水）。「腎不納気（腎が気を納められず深く吸えない）」による呼吸困難を解消します。",
      },
      {
        type: "合",
        level: 5,
        name: "陰谷",
        reading: "いんこく",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "生殖器の重度の機能低下、インポテンツ、遺精、不正子宮出血、激しい頻尿。",
        symptomTrigger: "骨盤臓器の機能低下・夜間頻尿・尿漏れ",
        location: "膝後内側、半腱様筋腱の外縁、膝窩横紋上",
        depthDescription: "最深刺（10〜15mm）。",
        depthLevelMm: "10〜15mm（膝窩深部腱間隙）",
        depthRatio: 95,
        neuroPhysiology: "脛骨神経深部枝刺激が骨盤内臓神経（S2-S4副交感神経）に直接届き、生殖・泌尿器平滑筋を強力に賦活。",
        clinicalAdvice: "腎経の本穴（水経の水穴）。下焦（骨盤腔深部）のエネルギー低下と水分滞留を深層から根本治療します。",
      },
    ],
  },
  {
    id: "lr",
    name: "足の厥陰肝経",
    shortName: "肝経",
    limb: "足",
    yinYang: "陰",
    organ: "肝・気血の巡り・筋の緊張",
    accentColor: "#166534",
    bgLight: "#DCFCE7",
    bgDark: "#0D2818",
    borderColor: "#86EFAC",
    yuanPointNotice: "太衝（兪穴）が原穴を兼ねます（陰経五兪穴の原則：兪穴＝原穴）。",
    points: [
      {
        type: "井",
        level: 1,
        name: "大敦",
        reading: "だいとん",
        element: "木",
        elementColor: "#2B8256",
        flowMetaphor: "所出為井（泉が微かに湧き出る）",
        flowKanji: "出",
        nankeiClassic: "井主心下満（井は心下満を主る）",
        nankeiMeaning: "突然の激しい側腹痛、陰嚢収縮・ヘルニア疝気、子宮脱、精神鬱屈の爆発。",
        symptomTrigger: "急な下腹部疝痛・ヘルニア・感情の爆発",
        location: "足の第1指外側爪甲根部、角を去ること1分",
        depthDescription: "極浅刺（1〜2mm）または糸状灸・温灸。",
        depthLevelMm: "1〜2mm（極浅層）",
        depthRatio: 15,
        neuroPhysiology: "深腓骨神経感覚枝終末刺激による大脳辺縁系の鎮静。",
        clinicalAdvice: "肝経の本穴（自経の井木穴）。気鬱が極まって起こる急性の疝痛や下腹痙攣に驚くべき効能を発揮します。",
      },
      {
        type: "滎",
        level: 2,
        name: "行間",
        reading: "こうかん",
        element: "火",
        elementColor: "#C2410C",
        flowMetaphor: "所流為滎（小川となって滑らかに流れる）",
        flowKanji: "流",
        nankeiClassic: "滎主身熱（滎は身熱を主る）",
        nankeiMeaning: "肝火上炎（目の充血、激しい頭痛、激昂・怒り、不眠、口の苦味）。",
        symptomTrigger: "目の充血・激しい頭痛・イライラ怒り・不眠",
        location: "足の背側、第1・第2指の間、みずかきの後縁、赤白肉際",
        depthDescription: "浅刺（2〜3mm）。瀉法（強刺激）。",
        depthLevelMm: "2〜3mm（皮下）",
        depthRatio: 35,
        neuroPhysiology: "交感神経中枢の過剰興奮を抑制し、頭頸部血管の拍動性過拡張を収縮鎮静。",
        clinicalAdvice: "肝経の子穴（木生火・実すればその子を瀉す）。燃え盛る「肝火」を消火する臨床必須の瀉火穴です。",
      },
      {
        type: "兪",
        level: 3,
        name: "太衝",
        reading: "たいしょう",
        element: "土",
        elementColor: "#B45309",
        flowMetaphor: "所注為兪（大河へ水が注ぎ込む）",
        flowKanji: "注",
        nankeiClassic: "兪主体重節痛（兪は体重節痛を主る）",
        nankeiMeaning: "全身の筋肉のひきつり・こむら返り、頭重感、情緒不安定、月経不順。",
        symptomTrigger: "筋肉のこわばり・こむら返り・全身の気滞",
        location: "足の背側、第1・第2中足骨底の結合部前方の陥凹部、足背動脈拍動部",
        depthDescription: "中等度刺入（3〜5mm）。",
        depthLevelMm: "3〜5mm（骨間筋・深部腱組織）",
        depthRatio: 55,
        neuroPhysiology: "深腓骨神経刺激を介し、全身の筋紡錘感度を正常化し、自律神経（交感・副交感）のバランスを中庸化。",
        clinicalAdvice: "原穴かつ兪土穴。全身の「気滞」を散らし、血流を再起動する全身屈指の超重要穴です。",
        isYuan: true,
      },
      {
        type: "経",
        level: 4,
        name: "中封",
        reading: "ちゅうほう",
        element: "金",
        elementColor: "#4B5563",
        flowMetaphor: "所行為経（広大な本流を滔々と巡る）",
        flowKanji: "行",
        nankeiClassic: "経主喘咳寒熱（経は喘咳寒熱を主る）",
        nankeiMeaning: "悪寒を伴う下腹痛、排尿障害、足関節内側の痛み。",
        symptomTrigger: "冷えを伴う下腹痛・排尿時の重苦しさ",
        location: "内果の前方1寸、前脛骨筋腱の内側の陥凹部",
        depthDescription: "深刺（5〜8mm）。",
        depthLevelMm: "5〜8mm（前脛骨筋腱内縁深部）",
        depthRatio: 75,
        neuroPhysiology: "前脛骨動脈周囲知覚神経刺激による骨盤底循環の改善。",
        clinicalAdvice: "肝気鬱結による排尿痛や、下腹部の引きつるような冷え痛みに効果的です。",
      },
      {
        type: "合",
        level: 5,
        name: "曲泉",
        reading: "きょくせん",
        element: "水",
        elementColor: "#1D4ED8",
        flowMetaphor: "所入為合（大海へ深く潜入合流する）",
        flowKanji: "入",
        nankeiClassic: "合主逆気而泄（合は逆気而泄を主る）",
        nankeiMeaning: "気の激しい逆上による眩暈・嘔気、下腹部の下垂感、下痢、子宮脱。",
        symptomTrigger: "激しい眩暈・胃酸逆流・骨盤底の下垂感",
        location: "屈膝時、膝の内側横紋端、半腱様筋・半膜様筋腱の前縁陥凹部",
        depthDescription: "最深刺（10〜15mm）。",
        depthLevelMm: "10〜15mm（膝内側深部関節包近傍）",
        depthRatio: 95,
        neuroPhysiology: "伏在神経および坐骨神経分枝刺激により、脳血流 autoregulation を安定化し、めまい・逆上を停止。",
        clinicalAdvice: "肝経の母穴（水生木・虚すればその母を補う）。肝血虚によるめまいや目の乾燥を深部から潤します。",
      },
    ],
  },
];

// ワンタップ逆引き病態プリセット
const SYMPTOM_PRESETS: {
  title: string;
  sub: string;
  shuLevel: number;
  icon: any;
  color: string;
}[] = [
  {
    title: "急激な胸苦しさ・救急・失神",
    sub: "井穴（心下満・表層受容器）",
    shuLevel: 1,
    icon: Zap,
    color: "#EF4444",
  },
  {
    title: "局所の熱感・炎症・発熱",
    sub: "滎穴（身熱・微小血管瀉熱）",
    shuLevel: 2,
    icon: Flame,
    color: "#F97316",
  },
  {
    title: "雨の日の重だるさ・関節痛",
    sub: "兪穴（体重節痛・原気本治）",
    shuLevel: 3,
    icon: CloudRain,
    color: "#D97706",
  },
  {
    title: "止まらない喘咳・悪寒発熱",
    sub: "経穴（喘咳寒熱・気道反射）",
    shuLevel: 4,
    icon: Wind,
    color: "#6B7280",
  },
  {
    title: "胃酸逆流・吐き気・急な下痢",
    sub: "合穴（逆気而泄・自律神経中枢）",
    shuLevel: 5,
    icon: Activity,
    color: "#2563EB",
  },
];

export default function KeikiDepthSimulator() {
  const [selectedMeridianId, setSelectedMeridianId] = useState<string>("lu");
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"classic" | "depth" | "neuro">("classic");

  // 現在の経絡
  const meridian = useMemo(() => {
    return MERIDIANS.find((m) => m.id === selectedMeridianId) || MERIDIANS[0];
  }, [selectedMeridianId]);

  // 現在選択中の五輸穴
  const currentPoint = useMemo(() => {
    return meridian.points.find((p) => p.level === currentLevel) || meridian.points[0];
  }, [meridian, currentLevel]);

  // スライダー変更ハンドラ
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLevel(parseInt(e.target.value, 10));
  };

  // プリセットクリックハンドラ
  const handlePresetClick = (level: number) => {
    setCurrentLevel(level);
  };

  // 水流モデルのステップ名
  const getShuBadge = (level: number) => {
    switch (level) {
      case 1:
        return { name: "井穴", tag: "出（泉）", desc: "体表へ湧き出る", depth: "極浅刺" };
      case 2:
        return { name: "滎穴", tag: "流（小川）", desc: "浅層を流れる", depth: "浅刺" };
      case 3:
        return { name: "兪穴", tag: "注（大河）", desc: "中層へ注ぎ入る", depth: "中深刺" };
      case 4:
        return { name: "経穴", tag: "行（本流）", desc: "深層を巡る", depth: "深刺" };
      case 5:
        return { name: "合穴", tag: "入（大海）", desc: "最深部へ没す", depth: "最深刺" };
      default:
        return { name: "五輸穴", tag: "", desc: "", depth: "" };
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. 経絡切り替えセレクター */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
            <h3 className="text-sm sm:text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
              観察する経絡を選択（手足・陰陽）
            </h3>
          </div>
          <span className="text-xs text-[#737C77] dark:text-[#8899A6]">
            全6代表経脈 完備（手足の出流注入モデル）
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {MERIDIANS.map((m) => {
            const isSelected = m.id === selectedMeridianId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMeridianId(m.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? "bg-[#FAF8F5] dark:bg-[#1E2B37] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-1 ring-[#1E3D34] dark:ring-[#74BA9E]"
                    : "bg-white dark:bg-[#121920] border-[#E5DEC9] dark:border-[#2A3B4A] hover:border-[#C5DED4] dark:hover:border-[#385060]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: m.bgLight,
                      color: m.accentColor,
                    }}
                  >
                    {m.limb}・{m.yinYang}
                  </span>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#1E3D34] dark:bg-[#74BA9E]" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] line-clamp-1">
                  {m.shortName}
                </span>
                <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] line-clamp-1 mt-0.5">
                  {m.organ}
                </span>
              </button>
            );
          })}
        </div>

        {meridian.yuanPointNotice && (
          <div className="mt-3 p-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] flex items-center gap-2 text-xs text-[#59615D] dark:text-[#A0B0BC]">
            <Info className="w-4 h-4 text-[#B86924] shrink-0" />
            <span>{meridian.yuanPointNotice}</span>
          </div>
        )}
      </div>

      {/* 2. 動的ビジュアル・水流アニメーション & スライダーキャンバス */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-8 shadow-sm space-y-6">
        {/* ビジュアルヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] text-xs font-bold mb-1">
              <Waves className="w-3.5 h-3.5" />
              <span>『難経』六十八難 経気水流モデル</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
              {meridian.name}（{meridian.limb}の{meridian.yinYang}経）
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF8F5] dark:bg-[#121920] px-4 py-2 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A]">
            <span className="text-xs text-[#737C77] dark:text-[#8899A6]">現在の深度：</span>
            <span className="text-base font-bold text-[#1E3D34] dark:text-[#74BA9E]">
              {getShuBadge(currentLevel).name}（{currentPoint.flowKanji}）
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#E6C387] text-[#1E3D34] font-bold">
              {currentPoint.depthLevelMm}
            </span>
          </div>
        </div>

        {/* 動的SVGビジュアル（水流と手足の経絡パス） */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-[#F2EDE4] dark:from-[#10161C] dark:to-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 overflow-hidden">
          {/* 背景のグリッドと波紋装飾 */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1E3D34_1px,transparent_1px)] dark:bg-[radial-gradient(#74BA9E_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG キャンバス */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] max-h-[260px] flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 水流グラデーション */}
                <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2B8256" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#C2410C" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#B45309" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#4B5563" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9" />
                </linearGradient>

                {/* 水流の活性化光彩 */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 手足の構造を象徴するベースライン（末梢から深部関節へ） */}
              <path
                d="M 80 180 C 250 180, 450 150, 650 130 C 780 115, 870 95, 930 90"
                stroke="currentColor"
                strokeWidth="28"
                strokeLinecap="round"
                className="text-[#E5DEC9]/40 dark:text-[#2A3B4A]/40"
              />

              {/* 刺鍼深度の深浅グラデーション層 */}
              <path
                d="M 80 210 C 250 210, 450 185, 650 170 C 780 155, 870 145, 930 140"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-[#B86924]/30 dark:text-[#E6C387]/30"
              />
              <text
                x="80"
                y="235"
                className="fill-[#737C77] dark:fill-[#8899A6] text-[12px] font-sans"
              >
                表層（皮膚・極浅層）
              </text>
              <text
                x="850"
                y="170"
                className="fill-[#737C77] dark:fill-[#8899A6] text-[12px] font-sans"
              >
                深部（大関節・主要神経幹）
              </text>

              {/* 経気水流のダイナミックパス（出流注入） */}
              {/* 背景の不活性ライン */}
              <path
                d="M 80 180 C 250 180, 450 150, 650 130 C 780 115, 870 95, 930 90"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-[#C5DED4]/40 dark:text-[#385060]/40"
              />

              {/* 活性化している水流（スライダー深度に応じてリアルタイム伸長） */}
              <path
                d="M 80 180 C 250 180, 450 150, 650 130 C 780 115, 870 95, 930 90"
                stroke="url(#streamGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#glow)"
                className="transition-all duration-700 ease-out"
                strokeDasharray="950"
                strokeDashoffset={950 - (currentLevel / 5) * 950}
              />

              {/* 5つの五輸穴ノード */}
              {meridian.points.map((p, idx) => {
                // X座標とY座標（パスに沿った位置）
                const positions = [
                  { x: 100, y: 180 }, // 井
                  { x: 300, y: 172 }, // 滎
                  { x: 500, y: 147 }, // 兪
                  { x: 700, y: 125 }, // 経
                  { x: 900, y: 92 },  // 合
                ];
                const pos = positions[idx];
                const isSelected = p.level === currentLevel;
                const isPassed = p.level <= currentLevel;

                return (
                  <g
                    key={p.type}
                    className="cursor-pointer group"
                    onClick={() => setCurrentLevel(p.level)}
                  >
                    {/* 選択中のパルスリング（波紋） */}
                    {isSelected && (
                      <>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="28"
                          fill="none"
                          stroke={p.elementColor}
                          strokeWidth="2"
                          className="animate-ping opacity-60"
                        />
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="22"
                          fill={p.elementColor}
                          fillOpacity="0.2"
                        />
                      </>
                    )}

                    {/* ノード外枠 */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? "15" : "11"}
                      fill={isPassed ? p.elementColor : "#FAF8F5"}
                      stroke={isSelected ? "#FAF8F5" : p.elementColor}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300 group-hover:scale-125"
                    />

                    {/* ノード中央のマーク */}
                    {isPassed && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? "5" : "3.5"}
                        fill="#FFFFFF"
                      />
                    )}

                    {/* ツボ名ラベル */}
                    <text
                      x={pos.x}
                      y={pos.y - 28}
                      textAnchor="middle"
                      className={`text-[15px] font-serif font-bold transition-all duration-300 ${
                        isSelected
                          ? "fill-[#1E3D34] dark:fill-[#74BA9E] scale-110 font-black"
                          : "fill-[#232826] dark:fill-[#FAF8F5]"
                      }`}
                    >
                      {p.name}
                    </text>

                    {/* 五輸穴種別＆五行バッジ */}
                    <text
                      x={pos.x}
                      y={pos.y + 32}
                      textAnchor="middle"
                      className="text-[12px] font-sans fill-[#59615D] dark:fill-[#A0B0BC]"
                    >
                      {p.type}（{p.element}）
                    </text>

                    {/* 水流の比喩表記 */}
                    <text
                      x={pos.x}
                      y={pos.y + 50}
                      textAnchor="middle"
                      className={`text-[11px] font-sans ${
                        isSelected
                          ? "fill-[#B86924] dark:fill-[#E6C387] font-bold"
                          : "fill-[#8A948F] dark:fill-[#6A7C8B]"
                      }`}
                    >
                      {p.flowKanji}・{p.flowMetaphor.split("（")[1]?.replace("）", "")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 指先 ➜ 肘膝の方向ガイド */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#737C77] dark:text-[#8899A6] pt-2 px-2 border-t border-[#E5DEC9]/60 dark:border-[#2A3B4A]/60">
            <span className="flex items-center gap-1">
              <span>👈 指先・足趾の先端（末梢）</span>
            </span>
            <span className="text-[11px] text-[#B86924] dark:text-[#E6C387]">
              経気深度：浅層（1mm） ➜ ➜ ➜ 深部大動脈・神経幹（20mm）
            </span>
            <span className="flex items-center gap-1">
              <span>肘・膝関節（中枢合流） 👉</span>
            </span>
          </div>
        </div>

        {/* スライダーコントローラー */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="depth-slider"
              className="text-xs sm:text-sm font-bold text-[#232826] dark:text-[#FAF8F5] flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E]" />
              <span>経気深度スライダーを動かして深さを体感：</span>
            </label>
            <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
              STEP {currentLevel} / 5
            </span>
          </div>

          <div className="relative">
            <input
              id="depth-slider"
              type="range"
              min="1"
              max="5"
              step="1"
              value={currentLevel}
              onChange={handleSliderChange}
              className="w-full h-3 bg-[#E5DEC9] dark:bg-[#2A3B4A] rounded-lg appearance-none cursor-pointer accent-[#1E3D34] dark:accent-[#74BA9E] focus:outline-none"
            />
            {/* 5段階の目盛り */}
            <div className="flex justify-between px-1 mt-2 text-xs font-bold text-[#59615D] dark:text-[#A0B0BC]">
              {meridian.points.map((p) => {
                const isSelected = p.level === currentLevel;
                return (
                  <button
                    key={p.level}
                    onClick={() => setCurrentLevel(p.level)}
                    className={`flex flex-col items-center transition-all ${
                      isSelected
                        ? "text-[#1E3D34] dark:text-[#74BA9E] scale-110 font-black"
                        : "hover:text-[#232826] dark:hover:text-[#FAF8F5]"
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{p.type}穴</span>
                    <span className="text-[10px] text-[#737C77] dark:text-[#8899A6]">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. 病態からの「ワンタップ逆引き」ボタン群 */}
      <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#B86924]" />
          <h4 className="text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
            臨床病態からのワンタップ逆引き（難経六十八難の法則）
          </h4>
          <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] hidden sm:inline">
            ― 症状をクリックすると適切な深度・ツボへ自動連動します ―
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SYMPTOM_PRESETS.map((preset) => {
            const IconComponent = preset.icon;
            const isCurrent = currentLevel === preset.shuLevel;
            return (
              <button
                key={preset.shuLevel}
                onClick={() => handlePresetClick(preset.shuLevel)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-white dark:bg-[#17212A] border-[#1E3D34] dark:border-[#74BA9E] shadow-sm ring-1 ring-[#1E3D34] dark:ring-[#74BA9E]"
                    : "bg-white/70 dark:bg-[#17212A]/60 border-[#E5DEC9] dark:border-[#2A3B4A] hover:bg-white dark:hover:bg-[#17212A]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: preset.color }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#737C77] dark:text-[#8899A6]">
                      深度 {preset.shuLevel}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#232826] dark:text-[#FAF8F5] leading-snug">
                    {preset.title}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-[#E5DEC9]/50 dark:border-[#2A3B4A]/50 flex items-center justify-between">
                  <span className="text-[10px] text-[#B86924] dark:text-[#E6C387] font-semibold">
                    {preset.sub}
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#737C77]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. リアルタイム臨床適応パネル（選択中のツボの徹底深掘り） */}
      <div className="bg-white dark:bg-[#17212A] rounded-2xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm space-y-6">
        {/* ツボ基本情報バナー */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DEC9] dark:border-[#2A3B4A] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded text-white"
                style={{ backgroundColor: currentPoint.elementColor }}
              >
                {currentPoint.type}穴（{currentPoint.element}行）
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#A0B0BC] border border-[#E5DEC9] dark:border-[#2A3B4A]">
                深度レベル {currentPoint.level}（{currentPoint.flowMetaphor}）
              </span>
              {currentPoint.isYuan && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#E6C387] text-[#1E3D34]">
                  原穴兼備
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                {currentPoint.name}
              </h3>
              <span className="text-sm sm:text-base text-[#737C77] dark:text-[#8899A6]">
                （{currentPoint.reading}）
              </span>
              <span className="text-xs text-[#1E3D34] dark:text-[#74BA9E] font-semibold">
                {meridian.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] mt-2">
              <strong>取穴部位：</strong> {currentPoint.location}
            </p>
          </div>

          {/* 深度メーターカード */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] min-w-[240px]">
            <span className="text-[11px] font-bold text-[#737C77] dark:text-[#8899A6] block mb-1">
              刺鍼の推奨深度 ＆ 手技
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                {currentPoint.depthLevelMm}
              </span>
            </div>
            {/* ゲージバー */}
            <div className="w-full h-2 bg-[#E5DEC9] dark:bg-[#2A3B4A] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2B8256] via-[#B86924] to-[#1D4ED8] transition-all duration-500"
                style={{ width: `${currentPoint.depthRatio}%` }}
              />
            </div>
            <span className="text-[10px] text-[#737C77] dark:text-[#8899A6] block mt-1.5">
              {currentPoint.depthDescription}
            </span>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="flex border-b border-[#E5DEC9] dark:border-[#2A3B4A] gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("classic")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "classic"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ① 『難経』六十八難の主治
          </button>
          <button
            onClick={() => setActiveTab("neuro")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "neuro"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ② 現代神経科学的メカニズム
          </button>
          <button
            onClick={() => setActiveTab("depth")}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "depth"
                ? "border-[#1E3D34] dark:border-[#74BA9E] text-[#1E3D34] dark:text-[#74BA9E]"
                : "border-transparent text-[#737C77] dark:text-[#8899A6] hover:text-[#232826] dark:hover:text-[#FAF8F5]"
            }`}
          >
            ③ 臨床実践の極意（要穴の活かし方）
          </button>
        </div>

        {/* タブ内容 */}
        <div className="pt-2 animate-fadeIn">
          {activeTab === "classic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>古典原文の法則</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {currentPoint.nankeiClassic}
                </h4>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  {currentPoint.nankeiMeaning}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>水流ダイナミクスの意味</span>
                </div>
                <h4 className="text-base font-bold text-[#232826] dark:text-[#FAF8F5]">
                  {currentPoint.flowMetaphor}
                </h4>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                  経脈の気は末梢先端（爪甲根部）から細い泉のように湧き出し、肘や膝の関節部に向かうにつれて水量と深さを増し、深海（体内深部）へと潜入合流していきます。
                  この「病態の深さ」と「ツボの位置深度」の完全一致が、五輸穴選択の根底にあります。
                </p>
              </div>
            </div>
          )}

          {activeTab === "neuro" && (
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                <Activity className="w-3.5 h-3.5" />
                <span>受容器密度と反射弓の生理学</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                現代医学から見た「{currentPoint.type}穴」の作用機序
              </h4>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {currentPoint.neuroPhysiology}
              </p>
              <div className="mt-3 pt-3 border-t border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#737C77] dark:text-[#8899A6]">
                💡 <strong>生理学的対応関係：</strong>
                {currentPoint.level === 1 && " 指先・足先の皮膚受容器（Aβ・Aδ線維）の高密度刺激による交感神経・中枢覚醒の駆動。"}
                {currentPoint.level === 2 && " 皮下組織における微小血管拡張抑制と局所軸索反射による速効性の抗炎症。"}
                {currentPoint.level === 3 && " 関節包・靭帯の固有知覚受容器によるゲートコントロール（脊髄後角痛覚遮断）。"}
                {currentPoint.level === 4 && " 腱鞘・骨膜受容器を介する筋緊張反射と自律神経系上行性シグナル伝達。"}
                {currentPoint.level === 5 && " 大筋群・主要神経幹の深部刺入による強力な体性内臓反射（迷走神経複合体駆動）。"}
              </div>
            </div>
          )}

          {activeTab === "depth" && (
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B86924]">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>臨床実践のワンポイントアドバイス</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#232826] dark:text-[#FAF8F5]">
                {currentPoint.name}（{currentPoint.type}穴）を臨床で最も効かせる勘所
              </h4>
              <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                {currentPoint.clinicalAdvice}
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs text-[#59615D] dark:text-[#A0B0BC]">
                <strong>深浅の原則：</strong> 病が表にあれば浅く刺し（井穴・滎穴）、病が深部内臓にあれば深く刺入する（経穴・合穴）。
                深度を誤ると「浅刺すべき熱証に深刺して気を散らす」「深刺すべき内臓病に浅刺して刺激が届かない」という臨床ミスにつながるため、この五輸穴水流モデルが極めて重要となります。
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
