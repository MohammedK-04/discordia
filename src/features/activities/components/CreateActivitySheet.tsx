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
import { createPlannedActivity } from "../data/create-planned";
import { createRecurringSeries } from "../data/create-recurring";
import { attentionMeta, kindMeta } from "../data/meta";
import {
  DEFAULT_DATE_ISO,
  DEFAULT_TIME_24,
  isDateIso,
  isTime24,
  weekdayName,
} from "../data/when";
import type { Activity, ActivityKind, Attention, RoleDraft } from "../types";
import styles from "../styles.module.css";

type CreateActivitySheetProps = {
  open: boolean;
  onClose: () => void;
  onCreateCasual?: (activity: Activity) => void;
  onCreateRecurring?: (activities: Activity[]) => void;
  onCreatePlanned?: (activity: Activity) => void;
};

export function CreateActivitySheet({
  open,
  onClose,
  onCreateCasual,
  onCreateRecurring,
  onCreatePlanned,
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
  const [roleDrafts, setRoleDrafts] = useState<RoleDraft[]>([
    { name: "Drivers", needed: 4 },
    { name: "Cooks", needed: 2 },
  ]);
  const [goal, setGoal] = useState("1200");
  const [share, setShare] = useState("60");

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
    setRoleDrafts([
      { name: "Drivers", needed: 4 },
      { name: "Cooks", needed: 2 },
    ]);
    setGoal("1200");
    setShare("60");
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

    if (kind === "Planned") {
      onCreatePlanned?.(
        createPlannedActivity({
          title,
          attention,
          dateIso: firstDate,
          time24: firstTime,
          place,
          roles: roles ? roleDrafts : undefined,
          funding: funding
            ? {
                goal: Number(goal) || 0,
                perPerson: Number(share) || 0,
              }
            : undefined,
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
            People RSVP to this {weekday} only. After midnight that day, next
            week opens with a fresh count.
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
            <input
              id="activityDate"
              type="date"
              value={dateIso}
              onChange={(event) => keepDate(event.target.value)}
            />
          </div>

          <label className={ui.fieldLabel} htmlFor="activityTime">
            Time
          </label>
          <div className={ui.inputWithIcon}>
            <Clock3 size={19} />
            <input
              id="activityTime"
              type="time"
              value={time24}
              onChange={(event) => keepTime(event.target.value)}
            />
          </div>

          <label className={ui.fieldLabel} htmlFor="activityPlace">
            Location
          </label>
          <div className={ui.inputWithIcon}>
            <MapPin size={19} />
            <input
              id="activityPlace"
              placeholder="Add a place or address"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
            />
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
              type="button"
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
              {roleDrafts.map((draft, index) => (
                <div
                  className={styles.roleBuilderRow}
                  key={`${draft.name}-${index}`}
                >
                  {index === 0 ? <Car size={18} /> : <Utensils size={18} />}
                  <input
                    value={draft.name}
                    aria-label="Role name"
                    onChange={(event) =>
                      setRoleDrafts((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, name: event.target.value }
                            : item,
                        ),
                      )
                    }
                  />
                  <label className={styles.countPill}>
                    <input
                      aria-label={`${draft.name} needed`}
                      inputMode="numeric"
                      value={draft.needed}
                      onChange={(event) =>
                        setRoleDrafts((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  needed: Math.max(
                                    Number(event.target.value) || 0,
                                    1,
                                  ),
                                }
                              : item,
                          ),
                        )
                      }
                      style={{ width: 36, textAlign: "center" }}
                    />{" "}
                    needed
                  </label>
                </div>
              ))}
              <button
                type="button"
                className={styles.addRole}
                onClick={() =>
                  setRoleDrafts((current) => [
                    ...current,
                    { name: "New role", needed: 1 },
                  ])
                }
              >
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
              type="button"
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
                    value={goal}
                    inputMode="decimal"
                    onChange={(event) => setGoal(event.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={ui.fieldLabel} htmlFor="fundShare">
                  Per person
                </label>
                <div className={ui.inputWithIcon}>
                  <CircleDollarSign size={18} />
                  <input
                    id="fundShare"
                    value={share}
                    inputMode="decimal"
                    onChange={(event) => setShare(event.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Sheet>
  );
}
