"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  CircleDollarSign,
  Clock3,
  MapPin,
  Plus,
  Users,
  Utensils,
} from "lucide-react";
import { Sheet } from "@/components/shared/sheet";
import ui from "@/components/shared/styles.module.css";
import { attentionMeta, kindMeta } from "../data/meta";
import type { ActivityKind, Attention } from "../types";
import styles from "../styles.module.css";

type CreateActivitySheetProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateActivitySheet({
  open,
  onClose,
}: CreateActivitySheetProps) {
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState<ActivityKind>("Casual");
  const [attention, setAttention] = useState<Attention>("Whenever");
  const [roles, setRoles] = useState(false);
  const [funding, setFunding] = useState(false);

  const needsSetup = kind !== "Casual";
  const lastStep = needsSetup ? 2 : 1;

  const close = () => {
    onClose();
    setStep(1);
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow="NEW ACTIVITY"
      title={step === 1 ? "What are we doing?" : "Set up the details"}
      footer={
        <>
          {step === 2 && (
            <button className={ui.ghostButton} onClick={() => setStep(1)}>
              Back
            </button>
          )}
          <button
            className={`${ui.primaryButton} ${ui.block}`}
            onClick={() => (step < lastStep ? setStep(2) : close())}
          >
            {step < lastStep ? "Continue" : "Post to the group"}
            {step < lastStep ? <ArrowRight size={18} /> : <Check size={18} />}
          </button>
        </>
      }
    >
      <div className={styles.stepLine}>
        <span className={step >= 1 ? styles.stepActive : ""} />
        <span className={step >= 2 ? styles.stepActive : ""} />
      </div>

      {step === 1 ? (
        <>
          <label className={ui.fieldLabel} htmlFor="activityName">
            Activity name
          </label>
          <input
            id="activityName"
            className={ui.textInput}
            placeholder="Dinner after soccer"
          />

          <p className={ui.fieldLabel}>What kind of plan is this?</p>
          <div className={styles.optionList}>
            {(Object.keys(kindMeta) as ActivityKind[]).map((item) => (
              <button
                key={item}
                className={`${styles.optionRow} ${kind === item ? styles.optionRowSelected : ""}`}
                onClick={() => setKind(item)}
              >
                <span className={styles.optionIcon}>{kindMeta[item].icon}</span>
                <span className={styles.optionText}>
                  <strong>{item}</strong>
                  <small>{kindMeta[item].copy}</small>
                </span>
                <span
                  className={`${ui.radio} ${kind === item ? ui.selectedRadio : ""}`}
                >
                  {kind === item && <Check size={14} />}
                </span>
              </button>
            ))}
          </div>

          <p className={ui.fieldLabel}>How soon do people need to act?</p>
          <div className={styles.optionList}>
            {(Object.keys(attentionMeta) as Attention[]).map((item) => (
              <button
                key={item}
                className={`${styles.optionRow} ${styles.optionRowTight} ${attention === item ? styles.optionRowSelected : ""}`}
                onClick={() => setAttention(item)}
              >
                <span className={styles.optionText}>
                  <strong>{item}</strong>
                  <small>{attentionMeta[item]}</small>
                </span>
                <span
                  className={`${ui.radio} ${attention === item ? ui.selectedRadio : ""}`}
                >
                  {attention === item && <Check size={14} />}
                </span>
              </button>
            ))}
          </div>

          {kind === "Casual" && (
            <p className={ui.helper}>
              Casual plans skip setup — post it now and let people show up.
            </p>
          )}
        </>
      ) : (
        <>
          <label className={ui.fieldLabel} htmlFor="activityDate">
            Date
          </label>
          <div className={ui.inputWithIcon}>
            <CalendarDays size={19} />
            <input id="activityDate" defaultValue="Aug 29, 2026" />
          </div>

          <label className={ui.fieldLabel} htmlFor="activityTime">
            Time
          </label>
          <div className={ui.inputWithIcon}>
            <Clock3 size={19} />
            <input id="activityTime" defaultValue="9:00 AM" />
          </div>

          <label className={ui.fieldLabel} htmlFor="activityPlace">
            Location
          </label>
          <div className={ui.inputWithIcon}>
            <MapPin size={19} />
            <input id="activityPlace" placeholder="Add a place or address" />
          </div>

          <div className={styles.toggleRow}>
            <span className={`${styles.toggleIcon} ${styles.toggleIconLilac}`}>
              <Users size={20} />
            </span>
            <span className={styles.toggleText}>
              <strong>Assign roles</strong>
              <small>Drivers, cooks, gear — say how many you need.</small>
            </span>
            <button
              className={`${styles.switch} ${roles ? styles.switchOn : ""}`}
              onClick={() => setRoles(!roles)}
              aria-pressed={roles}
              aria-label="Assign roles"
            >
              <span />
            </button>
          </div>

          {roles && (
            <div className={styles.roleBuilder}>
              <div className={styles.roleBuilderRow}>
                <Car size={18} />
                <input defaultValue="Drivers" aria-label="Role name" />
                <span className={styles.countPill}>4 needed</span>
              </div>
              <div className={styles.roleBuilderRow}>
                <Utensils size={18} />
                <input defaultValue="Cooks" aria-label="Role name" />
                <span className={styles.countPill}>2 needed</span>
              </div>
              <button className={styles.addRole}>
                <Plus size={17} /> Add another role
              </button>
              <p>
                Members can claim a role, join the waitlist, or mark “maybe”
                with a decide-by date. We email them when that date hits.
              </p>
            </div>
          )}

          <div className={styles.toggleRow}>
            <span className={`${styles.toggleIcon} ${styles.toggleIconMint}`}>
              <CircleDollarSign size={20} />
            </span>
            <span className={styles.toggleText}>
              <strong>Attach group funding</strong>
              <small>Set a goal, or require an amount per person.</small>
            </span>
            <button
              className={`${styles.switch} ${funding ? styles.switchOn : ""}`}
              onClick={() => setFunding(!funding)}
              aria-pressed={funding}
              aria-label="Attach group funding"
            >
              <span />
            </button>
          </div>

          {funding && (
            <div className={styles.fundingBuilder}>
              <div>
                <label className={ui.fieldLabel} htmlFor="fundGoal">
                  Goal
                </label>
                <div className={ui.inputWithIcon}>
                  <CircleDollarSign size={18} />
                  <input
                    id="fundGoal"
                    defaultValue="1,200"
                    inputMode="decimal"
                  />
                </div>
              </div>
              <div>
                <label className={ui.fieldLabel} htmlFor="fundShare">
                  Per person
                </label>
                <div className={ui.inputWithIcon}>
                  <CircleDollarSign size={18} />
                  <input id="fundShare" defaultValue="60" inputMode="decimal" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Sheet>
  );
}
