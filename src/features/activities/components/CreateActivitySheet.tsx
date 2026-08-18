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
import { createCasualActivity } from "../data/create-casual";
import {
  createRecurringSeries,
  RECURRING_WEEKS,
} from "../data/create-recurring";
import { attentionMeta, kindMeta } from "../data/meta";
import {
  DEFAULT_DATE_ISO,
  DEFAULT_TIME_24,
  isDateIso,
  isTime24,
  weekdayName,
} from "../data/when";
import type { Activity, ActivityKind, Attention } from "../types";
import styles from "../styles.module.css";

type CreateActivitySheetProps = {
  open: boolean;
  onClose: () => void;
  onCreateCasual?: (activity: Activity) => void;
  onCreateRecurring?: (activities: Activity[]) => void;
};

export function CreateActivitySheet({
  open,
  onClose,
  onCreateCasual,
  onCreateRecurring,
}: CreateActivitySheetProps) {
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState<ActivityKind>("Casual");
  const [attention, setAttention] = useState<Attention>("Whenever");
  const [title, setTitle] = useState("");
  const [dateIso, setDateIso] = useState(DEFAULT_DATE_ISO);
  const [time24, setTime24] = useState(DEFAULT_TIME_24);
  const [place, setPlace] = useState("");
  const [roles, setRoles] = useState(false);
  const [funding, setFunding] = useState(false);

  const needsSetup = kind !== "Casual";
  const lastStep = needsSetup ? 2 : 1;
  const hasName = title.trim().length > 0;
  const firstDate = isDateIso(dateIso) ? dateIso : DEFAULT_DATE_ISO;
  const firstTime = isTime24(time24) ? time24 : DEFAULT_TIME_24;
  const weekday = weekdayName(firstDate);

  const reset = () => {
    setStep(1);
    setKind("Casual");
    setAttention("Whenever");
    setTitle("");
    setDateIso(DEFAULT_DATE_ISO);
    setTime24(DEFAULT_TIME_24);
    setPlace("");
    setRoles(false);
    setFunding(false);
  };

  const keepDate = (value: string) => {
    if (isDateIso(value)) setDateIso(value);
  };

  const keepTime = (value: string) => {
    if (isTime24(value)) setTime24(value);
  };

  const close = () => {
    onClose();
    reset();
  };

  const finish = () => {
    if (!hasName) return;

    if (kind === "Casual") {
      onCreateCasual?.(
        createCasualActivity({
          title,
          attention,
          dateIso: firstDate,
          time24: firstTime,
          place,
        }),
      );
    }

    if (kind === "Recurring") {
      onCreateRecurring?.(
        createRecurringSeries({
          title,
          attention,
          startDateIso: firstDate,
          time24: firstTime,
          place,
        }),
      );
    }

    close();
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
            <button
              type="button"
              className={ui.ghostButton}
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className={`${ui.primaryButton} ${ui.block}`}
            disabled={!hasName}
            onClick={() => (step < lastStep ? setStep(2) : finish())}
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
            <>
              <p className={ui.helper}>
                Casual plans skip the full setup — add a time if you have one,
                then post.
              </p>
              <label className={ui.fieldLabel} htmlFor="casualDate">
                Date
              </label>
              <div className={ui.inputWithIcon}>
                <CalendarDays size={19} />
                <input
                  id="casualDate"
                  type="date"
                  value={dateIso}
                  onChange={(event) => keepDate(event.target.value)}
                />
              </div>
              <label className={ui.fieldLabel} htmlFor="casualTime">
                Time
              </label>
              <div className={ui.inputWithIcon}>
                <Clock3 size={19} />
                <input
                  id="casualTime"
                  type="time"
                  value={time24}
                  onChange={(event) => keepTime(event.target.value)}
                />
              </div>
              <label className={ui.fieldLabel} htmlFor="casualPlace">
                Location (optional)
              </label>
              <div className={ui.inputWithIcon}>
                <MapPin size={19} />
                <input
                  id="casualPlace"
                  placeholder="Ibrahim’s, the park, TBD…"
                  value={place}
                  onChange={(event) => setPlace(event.target.value)}
                />
              </div>
            </>
          )}
        </>
      ) : kind === "Recurring" ? (
        <>
          <p className={ui.helper}>
            Pick the first {weekday}. We’ll post the next {RECURRING_WEEKS}{" "}
            weeks — each one has its own RSVP.
          </p>
          <label className={ui.fieldLabel} htmlFor="recurringDate">
            First date
          </label>
          <div className={ui.inputWithIcon}>
            <CalendarDays size={19} />
            <input
              id="recurringDate"
              type="date"
              value={dateIso}
              onChange={(event) => keepDate(event.target.value)}
            />
          </div>
          <label className={ui.fieldLabel} htmlFor="recurringTime">
            Time
          </label>
          <div className={ui.inputWithIcon}>
            <Clock3 size={19} />
            <input
              id="recurringTime"
              type="time"
              value={time24}
              onChange={(event) => keepTime(event.target.value)}
            />
          </div>
          <label className={ui.fieldLabel} htmlFor="recurringPlace">
            Location (optional)
          </label>
          <div className={ui.inputWithIcon}>
            <MapPin size={19} />
            <input
              id="recurringPlace"
              placeholder="Bossen Field, the gym, TBD…"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
            />
          </div>
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
