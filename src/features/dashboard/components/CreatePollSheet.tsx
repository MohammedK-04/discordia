"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Sheet } from "@/components/shared/sheet";
import ui from "@/components/shared/styles.module.css";

type CreatePollSheetProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (question: string, options: string[]) => void;
};

export function CreatePollSheet({
  open,
  onClose,
  onCreate,
}: CreatePollSheetProps) {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");

  const canPost = question.trim() && optionA.trim() && optionB.trim();

  const close = () => {
    onClose();
    setQuestion("");
    setOptionA("");
    setOptionB("");
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow="QUICK DECISION"
      title="Ask the group"
      footer={
        <button
          type="button"
          className={`${ui.primaryButton} ${ui.block}`}
          disabled={!canPost}
          onClick={() => {
            onCreate(question, [optionA, optionB]);
            close();
          }}
        >
          Post poll <Check size={18} />
        </button>
      }
    >
      <label className={ui.fieldLabel} htmlFor="pollQuestion">
        Question
      </label>
      <input
        id="pollQuestion"
        className={ui.textInput}
        placeholder="Where should we eat?"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <label className={ui.fieldLabel} htmlFor="pollA">
        Option A
      </label>
      <input
        id="pollA"
        className={ui.textInput}
        value={optionA}
        onChange={(event) => setOptionA(event.target.value)}
      />
      <label className={ui.fieldLabel} htmlFor="pollB">
        Option B
      </label>
      <input
        id="pollB"
        className={ui.textInput}
        value={optionB}
        onChange={(event) => setOptionB(event.target.value)}
      />
    </Sheet>
  );
}
