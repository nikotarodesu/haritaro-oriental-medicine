"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Cpu,
  Network,
  Radio,
  Zap,
  Layers,
  ChevronRight,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface OrganCenter {
  id: string;
  name: string;
  role: string;
  element: string;
  acupoints: string;
  wuxingControl: string;
  biomedicalAnalogy: string;
}

const ORGAN_CENTERS: OrganCenter[] = [
  {
    id: "liver",
    name: "肝 ― 交通管制・ストレスバッファ",
    role: "疏泄・血流配分・筋膜張力のリアルタイムコントロール",
    element: "木",
    acupoints: "太衝（原穴）、期門（募穴）、肝兪（背部兪穴）",
    wuxingControl: "【母子補瀉】肝虚には母である腎（水）を補う（水生木）。【相克制御】肝気の暴走を抑えるため、脾（土）を厚く補強する。",
    biomedicalAnalogy: "自律神経系交感神経過緊張の抑制、血管内皮NO産生促進、グリコーゲン分解調節。",
  },
  {
    id: "spleen",
    name: "脾 ― 製造物流・エネルギー工場",
    role: "後天の気血生成・体液運化・組織の保持（昇提）",
    element: "土",
    acupoints: "足三里（合穴）、中脘（募穴）、脾兪（背部兪穴）",
    wuxingControl: "【母子補瀉】脾虚には母である心（火）の陽気で温める（火生土）。【相克制御】湿邪が溜まれば腎（水）の気化を助けて利水。",
    biomedicalAnalogy: "消化管蠕動運動の正常化、腸内細菌叢の代謝産物（短鎖脂肪酸）生成、ミトコンドリアATP産生基盤。",
  },
  {
    id: "kidney",
    name: "腎 ― 根幹バッテリー・生命ボイラー",
    role: "先天の精の貯蔵・骨髄脳髄の滋養・水分代謝の最終関門",
    element: "水",
    acupoints: "太谿（原穴）、関元（募穴）、腎兪・命門（背部兪穴）",
    wuxingControl: "【母子補瀉】腎虚には母である肺（金）の清気を深く引き下げる（金生水）。【相克制御】腎陽で脾（土）を温め下痢・浮腫を防ぐ。",
    biomedicalAnalogy: "視床下部-下垂体-副腎（HPA）軸、コルチゾール・性ホルモン分泌調節、電解質・体液浸透圧維持。",
  },
  {
    id: "heart",
    name: "心 ― 中枢司令塔・情動プロセッサ",
    role: "全身血行の推進・精神（神：意識と睡眠）の統括",
    element: "火",
    acupoints: "神門（原穴）、巨闕（募穴）、心兪（背部兪穴）",
    wuxingControl: "【母子補瀉】心虚には母である肝（木）の蔵血を養う（木生火）。【交通制御】心火を下げ腎水を上げる「交通心腎」。",
    biomedicalAnalogy: "心拍変動（HRV）の最適化、大脳皮質-大脳辺縁系の興奮抑制、睡眠概日リズムの再同期。",
  },
  {
    id: "lung",
    name: "肺 ― 吸排気ユニット・防御シールド",
    role: "呼吸による清気取り込み・宣発粛降・体表衛気のバリア展開",
    element: "金",
    acupoints: "太淵（原穴）、中府（募穴）、肺兪（背部兪穴）",
    wuxingControl: "【母子補瀉】肺虚には母である脾（土）を補って肺気を生み出す「培土生金（ばいどせいきん）」。",
    biomedicalAnalogy: "皮膚・粘膜免疫（IgA分泌）、呼吸筋・横隔膜の力学的可動性、気管支平滑筋トーヌスの調整。",
  },
];

interface MeridianNetwork {
  id: string;
  name: string;
  type: string;
  clinicalStrategy: string;
  biomedicalMechanism: string;
  samplePoints: string;
}

const MERIDIAN_NETWORKS: MeridianNetwork[] = [
  {
    id: "biaoli",
    name: "表裏配穴",
    type: "陰陽対立ペア（臓腑直結バイパス）",
    clinicalStrategy: "肺病に対しペアの大腸経（合谷）からアプローチ。胃もたれに脾経（公孫）を用いるなど、陰陽の表裏を橋渡しして負荷分散。",
    biomedicalMechanism: "脊髄分節（メタメア）における交感神経節を共有する反射弓。体性-内臓反射による血流の再配分。",
    samplePoints: "合谷（大腸経）＋ 列缺（肺経）、太衝（肝経）＋ 陽陵泉（胆経）",
  },
  {
    id: "distant",
    name: "同名経・遠隔配穴",
    type: "四肢末梢からの全身自律神経変調",
    clinicalStrategy: "頭痛や内臓疾患に対し、肘から先・膝から下の「五兪穴・原穴」を用いて遠隔操作。局所の痛みを刺激せず全身回路を調律。",
    biomedicalMechanism: "手足末梢に高密度に分布するAβ線維・Aδ線維の求心性入力が、脳幹延髄の孤束核・網様体を経てHRV（心拍変動）を劇的改善。",
    samplePoints: "足三里（胃・全身調律）、内関（心膜・横隔膜・自律神経）、委中（腰背部）",
  },
  {
    id: "qijing",
    name: "奇経八脈",
    type: "全体統合マスターバス（広域リセット）",
    clinicalStrategy: "十二経脈の枠に収まらない慢性的歪み、生殖器系、自律神経失調、脊柱変形に対し、任脈・督脈・衝脈の要穴で一括リセット。",
    biomedicalMechanism: "筋膜スパイラルライン・ディープフロントラインと中枢神経軸索群のテンセグリティ構造を再同期。",
    samplePoints: "列缺 ＋ 照海（任脈・喉胸部呼吸系）、後渓 ＋ 申脈（督脈・脊柱運動系）",
  },
];

export default function TreatmentBioElectronicsMap() {
  const [activeTab, setActiveTab] = useState<"organs" | "meridians">("organs");
  const [selectedOrganId, setSelectedOrganId] = useState<string>("liver");
  const [selectedMeridianId, setSelectedMeridianId] = useState<string>("biaoli");

  const currentOrgan =
    ORGAN_CENTERS.find((o) => o.id === selectedOrganId) || ORGAN_CENTERS[0];
  const currentMeridian =
    MERIDIAN_NETWORKS.find((m) => m.id === selectedMeridianId) || MERIDIAN_NETWORKS[0];

  return (
    <figure className="my-8 bg-[#FFFFFF] dark:bg-[#17212A] rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-8 shadow-sm transition-colors overflow-hidden">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE0] dark:border-[#22303D] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold text-[#1E3D34] dark:text-[#74BA9E] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B86924] dark:text-[#E6C387]" />
            <span>画像解説⑥：バイオ・エレクトロニクス統合図</span>
          </span>
          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#232826] dark:text-[#FAF8F5] mt-1">
            中枢センター（五臓） ＆ 通信インフラ網（経絡）のハイブリッド制御
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-[#F5F2EB] dark:bg-[#1C2630] p-1 rounded-xl border border-[#E8E1D1] dark:border-[#2A3B4A] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("organs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "organs"
                ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>中枢センター（臓腑治法）</span>
          </button>
          <button
            onClick={() => setActiveTab("meridians")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "meridians"
                ? "bg-white dark:bg-[#22303D] text-[#1E3D34] dark:text-[#74BA9E] shadow-xs"
                : "text-[#59615D] dark:text-[#96A6B2]"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>通信インフラ（経絡治法）</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-[#59615D] dark:text-[#CBD5E1] leading-relaxed mb-6">
        生体は、制御センターである<strong>「五臓」</strong>と、その指令を全身の末梢組織へ伝達する通信回線である<strong>「経絡（筋膜間質ネットワーク）」</strong>が密結合したバイオ・エレクトロニクス回路です。中枢の再駆動と通信網の最適化を同時に行うことで、劇的な治療効果を生み出します。
      </p>

      {/* タブ①：五臓センター制御 */}
      {activeTab === "organs" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ORGAN_CENTERS.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrganId(org.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedOrganId === org.id
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
                }`}
              >
                <div className="text-[10px] font-bold opacity-80">{org.element}</div>
                <div className="text-xs sm:text-sm font-bold mt-0.5 truncate">{org.name.split("（")[0]}</div>
              </button>
            ))}
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div>
                <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
                  CENTRAL CONTROLLER UNIT
                </span>
                <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentOrgan.name}
                </h5>
              </div>
              <span className="text-xs font-bold text-[#1E3D34] dark:text-[#74BA9E] bg-[#EBF3EF] dark:bg-[#182823] px-2.5 py-1 rounded-lg">
                五行属性：{currentOrgan.element}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  生体システムの役割 ＆ 代表経穴
                </span>
                <p className="text-[#232826] dark:text-[#FAF8F5] font-medium leading-relaxed">
                  {currentOrgan.role}
                </p>
                <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <strong className="text-[11px] text-[#B86924] dark:text-[#E6C387] block">
                    主要介入コード（原穴・募穴・背部兪穴）：
                  </strong>
                  <span className="text-[#59615D] dark:text-[#CBD5E1] font-bold">
                    {currentOrgan.acupoints}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#0288D1] dark:text-[#38BDF8] block">
                  五行ネットワーク制御（相生・相克戦略）
                </span>
                <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {currentOrgan.wuxingControl}
                </p>
                <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <strong className="text-[10px] text-[#8C9691] dark:text-[#64748B] block">
                    現代医科学・生理学メカニズム：
                  </strong>
                  <span className="text-[#59615D] dark:text-[#CBD5E1]">
                    {currentOrgan.biomedicalAnalogy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タブ②：経絡通信インフラ網 */}
      {activeTab === "meridians" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MERIDIAN_NETWORKS.map((net) => (
              <button
                key={net.id}
                onClick={() => setSelectedMeridianId(net.id)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  selectedMeridianId === net.id
                    ? "bg-[#1E3D34] text-white border-[#1E3D34] shadow-sm"
                    : "bg-[#FAF8F5] dark:bg-[#121920] text-[#59615D] dark:text-[#96A6B2] border-[#E8E1D1] dark:border-[#22303D] hover:border-[#1E3D34]/50"
                }`}
              >
                <div className="text-[10px] font-mono opacity-80">{net.type}</div>
                <div className="text-xs sm:text-sm font-bold mt-0.5">{net.name}</div>
              </button>
            ))}
          </div>

          <div className="bg-[#FAF8F5] dark:bg-[#121920] rounded-2xl border border-[#E8E1D1] dark:border-[#22303D] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DEC9] dark:border-[#2A3B4A]">
              <div>
                <span className="text-[10px] font-mono text-[#8C9691] dark:text-[#64748B]">
                  COMMUNICATION ARCHITECTURE
                </span>
                <h5 className="font-bold text-base text-[#232826] dark:text-[#FAF8F5]">
                  {currentMeridian.name}
                </h5>
              </div>
              <span className="text-xs font-bold text-[#B86924] dark:text-[#E6C387]">
                {currentMeridian.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                <strong className="text-[10px] font-mono font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                  臨床戦略
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {currentMeridian.clinicalStrategy}
                </p>
                <div className="pt-2 border-t border-[#F2ECE0] dark:border-[#22303D]">
                  <span className="text-[10px] font-bold text-[#1E3D34] dark:text-[#74BA9E] block">
                    代表的配穴コンビネーション：
                  </span>
                  <span className="font-bold text-[#232826] dark:text-[#FAF8F5]">
                    {currentMeridian.samplePoints}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#17212A] p-4 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-2">
                <strong className="text-[10px] font-mono font-bold text-[#0288D1] dark:text-[#38BDF8] block">
                  バイオ・エレクトロニクス伝達機構（現代神経・筋膜科学）
                </strong>
                <p className="text-[#59615D] dark:text-[#CBD5E1] leading-relaxed">
                  {currentMeridian.biomedicalMechanism}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
