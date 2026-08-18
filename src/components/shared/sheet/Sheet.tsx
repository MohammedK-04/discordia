"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import ui from "@/components/shared/styles.module.css";
import sheet from "./sheet.module.css";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function Sheet({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={sheet.sheetBackdrop} onPointerDown={onClose}>
      <section
        className={sheet.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <span className={sheet.sheetGrip} />
        <header className={sheet.sheetHead}>
          <div>
            <span className={ui.eyebrow}>{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button
            className={ui.iconButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </header>
        <div className={sheet.sheetBody}>{children}</div>
        <footer className={sheet.sheetFoot}>{footer}</footer>
      </section>
    </div>
  );
}
