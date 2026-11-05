import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Circle, HelpCircle, MessageSquare, Minus } from "lucide-react";
import { DIAGNOSIS_QUESTIONS } from "@/data/diagnosisData";
import type { ClinicalQuestionStatus } from "@/utils/clinicalInterview";
import styles from "./ClinicalInterviewBoard.module.css";

const QUESTION_TITLES: Record<number, string> = {
  1: "疲れ・だるさ",
  2: "ため息・つかえ感",
  3: "肌・髪・爪",
  4: "肩こり・頭痛・舌色",
  5: "天気による不調",
  6: "手足・腰の冷え",
  7: "食後の眠気・胃もたれ",
  8: "気分・イライラ",
  9: "めまい・眠り",
  10: "月経の状態",
  11: "足のむくみ",
  12: "寒がり・夜間のトイレ",
};

const ANSWERS = [
  { value: "applicable", label: "当てはまる", description: "該当あり", Icon: Check },
  { value: "not_applicable", label: "該当なし", description: "確認して当てはまらない", Icon: Minus },
  { value: "unknown", label: "不明", description: "聞いたが判断できない", Icon: HelpCircle },
  { value: "unconfirmed", label: "未確認", description: "まだ確認していない", Icon: Circle },
] as const;

const STATUS_LABELS: Record<ClinicalQuestionStatus, string> = {
  unconfirmed: "未確認",
  applicable: "該当あり",
  not_applicable: "該当なし",
  unknown: "不明",
};

interface Props {
  patientIdentifier: string;
  statuses: Record<number, ClinicalQuestionStatus>;
  notes: Record<number, string>;
  onStatusChange: (id: number, status: ClinicalQuestionStatus) => void;
  onNoteChange: (id: number, note: string) => void;
}

export default function ClinicalInterviewBoard({ patientIdentifier, statuses, notes, onStatusChange, onNoteChange }: Props) {
  const [selectedId, setSelectedId] = useState(DIAGNOSIS_QUESTIONS[0].id);
  const [onlyUnconfirmed, setOnlyUnconfirmed] = useState(false);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const overviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const selectedQuestion = DIAGNOSIS_QUESTIONS.find(question => question.id === selectedId) || DIAGNOSIS_QUESTIONS[0];
  const selectedStatus = statuses[selectedQuestion.id] || "unconfirmed";
  const selectedNote = notes[selectedQuestion.id] || "";
  const unconfirmedQuestions = DIAGNOSIS_QUESTIONS.filter(question => !statuses[question.id] || statuses[question.id] === "unconfirmed");
  const unknownCount = DIAGNOSIS_QUESTIONS.filter(question => statuses[question.id] === "unknown").length;
  const visibleQuestions = onlyUnconfirmed ? unconfirmedQuestions : DIAGNOSIS_QUESTIONS;
  const selectedIndex = DIAGNOSIS_QUESTIONS.findIndex(question => question.id === selectedQuestion.id);
  const nextUnconfirmed = [...DIAGNOSIS_QUESTIONS.slice(selectedIndex + 1), ...DIAGNOSIS_QUESTIONS.slice(0, selectedIndex)]
    .find(question => !statuses[question.id] || statuses[question.id] === "unconfirmed");

  const selectQuestion = (id: number) => {
    setSelectedId(id);
    detailHeadingRef.current?.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 759px)").matches) {
      detailHeadingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
      detailHeadingRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  };

  const showUnconfirmed = () => {
    setOnlyUnconfirmed(true);
    if (selectedStatus !== "unconfirmed" && unconfirmedQuestions.length > 0) {
      setSelectedId(unconfirmedQuestions[0].id);
    }
  };

  return (
    <section id="clinical-interview-board" className={styles.board} aria-label="話題から選べる問診票">
      <div className={styles.encounterContext}><span>問診中の患者識別記号</span><strong>{patientIdentifier.trim() || "未入力"}</strong></div>
      <div className={styles.overview}>
        <div className={styles.overviewHeading}>
          <div>
            <h2 ref={overviewHeadingRef} tabIndex={-1}>話題から選ぶ</h2>
            <p>会話に合わせて、どこからでも。</p>
          </div>
          <span className={styles.remaining}>未確認 <strong>{unconfirmedQuestions.length}</strong></span>
        </div>
        <div className={styles.filters} role="group" aria-label="問診項目の表示">
          <button type="button" aria-pressed={!onlyUnconfirmed} onClick={() => setOnlyUnconfirmed(false)}>すべて <span>{DIAGNOSIS_QUESTIONS.length}</span></button>
          <button type="button" aria-pressed={onlyUnconfirmed} onClick={showUnconfirmed}>未確認のみ <span>{unconfirmedQuestions.length}</span></button>
        </div>
        <div className={styles.questionGrid} aria-label="問診項目一覧">
          {visibleQuestions.map(question => {
            const status = statuses[question.id] || "unconfirmed";
            const hasNote = Boolean(notes[question.id]?.trim());
            const isSelected = question.id === selectedQuestion.id;
            return (
              <button
                type="button"
                key={question.id}
                className={styles.questionCard}
                data-status={status}
                aria-pressed={isSelected}
                aria-controls="clinical-interview-detail"
                aria-label={`${QUESTION_TITLES[question.id] || question.text}、${STATUS_LABELS[status]}${hasNote ? "、メモあり" : ""}`}
                onClick={() => selectQuestion(question.id)}
              >
                <span className={styles.cardTop}><span className={styles.questionNumber}>{String(question.id).padStart(2, "0")}</span><span className={styles.statusLabel}>{STATUS_LABELS[status]}</span></span>
                <span className={styles.questionTitle}>{QUESTION_TITLES[question.id] || question.text}</span>
                <span className={styles.cardFoot}>{hasNote ? <><MessageSquare size={14} aria-hidden="true" />メモあり</> : isSelected ? "入力中" : "項目を開く"}</span>
              </button>
            );
          })}
        </div>
        {onlyUnconfirmed && unconfirmedQuestions.length === 0 && (
          <div className={styles.emptyState} role="status">
            <Check size={22} aria-hidden="true" />
            <p>未確認の項目はありません。</p>
            {unknownCount > 0 && <p>「不明」の回答は {unknownCount} 件あります。</p>}
            <button type="button" onClick={() => setOnlyUnconfirmed(false)}>すべての回答を見直す</button>
          </div>
        )}
        <p className={styles.overviewHint}>回答済み {DIAGNOSIS_QUESTIONS.length - unconfirmedQuestions.length} / {DIAGNOSIS_QUESTIONS.length} 項目{unknownCount > 0 ? `（うち不明 ${unknownCount}）` : ""}</p>
      </div>

      <div id="clinical-interview-detail" className={styles.detail} aria-labelledby="clinical-interview-heading">
        <div className={styles.detailEyebrow}><span>問診 {String(selectedQuestion.id).padStart(2, "0")}</span><span data-status={selectedStatus} className={styles.detailStatus}>{STATUS_LABELS[selectedStatus]}</span></div>
        <h3 ref={detailHeadingRef} id="clinical-interview-heading" className={styles.detailHeading} tabIndex={-1}>{QUESTION_TITLES[selectedQuestion.id] || selectedQuestion.text}</h3>
        <p className={styles.questionText}>{selectedQuestion.text}</p>

        <fieldset className={styles.answers}>
          <legend>患者さんの回答</legend>
          <div className={styles.answerGrid}>
            {ANSWERS.map(({ value, label, description, Icon }) => (
              <button type="button" key={value} data-status={value} aria-label={label} aria-pressed={selectedStatus === value} onClick={() => onStatusChange(selectedQuestion.id, value)} className={styles.answerButton}>
                <span className={styles.answerTitle}><Icon size={20} aria-hidden="true" />{label}</span>
                <span>{description}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className={styles.noteField}>
          <label htmlFor="clinical-interview-note"><MessageSquare size={17} aria-hidden="true" />この項目のメモ <span>任意</span></label>
          <textarea
            id="clinical-interview-note"
            value={selectedNote}
            onChange={event => onNoteChange(selectedQuestion.id, event.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="いつから、どんなときに、患者さんの言葉など"
            aria-describedby="clinical-interview-note-hint"
          />
          <div className={styles.noteHint}><span id="clinical-interview-note-hint">回答・メモは項目を移動しても保持します。</span><span>{selectedNote.length} / 1000</span></div>
        </div>

        <div className={styles.detailActions}>
          <button type="button" className={styles.returnButton} onClick={() => { overviewHeadingRef.current?.focus({ preventScroll: true }); overviewHeadingRef.current?.scrollIntoView({ block: "start", behavior: "instant" }); }}><ArrowLeft size={17} aria-hidden="true" />項目一覧へ</button>
          <button type="button" className={styles.nextButton} disabled={!nextUnconfirmed} onClick={() => nextUnconfirmed && selectQuestion(nextUnconfirmed.id)}>次の未確認へ<ArrowRight size={17} aria-hidden="true" /></button>
        </div>
        <p className={styles.navigationHint}>回答後もこの項目を表示します。次に聞く話題を選んでください。</p>
      </div>
    </section>
  );
}
