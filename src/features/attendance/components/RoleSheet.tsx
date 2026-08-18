"use client";

import { useState } from "react";
import { CalendarDays, Car, Check, Clock3, Utensils, X } from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import { Sheet } from "@/components/shared/sheet";
import ui from "@/components/shared/styles.module.css";
import {
  formatShortDate,
  type Activity,
  type RoleReply,
} from "@/features/activities";
import styles from "../styles.module.css";

type RoleSheetProps = {
  open: boolean;
  onClose: () => void;
  activity?: Activity | null;
  onAttendance?: (id: string, rsvp: "yes" | "no") => void;
  onRoleReply?: (id: string, roleName: string, reply: RoleReply) => void;
};

const roleIcons: Record<string, React.ReactNode> = {
  Drivers: <Car size={19} />,
  Cooks: <Utensils size={19} />,
};

export function RoleSheet({
  open,
  onClose,
  activity,
  onAttendance,
  onRoleReply,
}: RoleSheetProps) {
  const [decideBy, setDecideBy] = useState("Aug 21, 5:00 PM");
  const attendance = activity?.myRsvp ?? null;

  const close = () => {
    onClose();
  };

  if (!activity) return null;

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow={activity.title.toUpperCase()}
      title={attendance === "yes" ? "Pick up a role" : "Are you coming?"}
      footer={
        <button
          type="button"
          className={`${ui.primaryButton} ${ui.block}`}
          onClick={close}
          disabled={attendance === null}
        >
          {attendance === "yes"
            ? "Save attendance & roles"
            : attendance === "no"
              ? "Send my response"
              : "Choose Yes or No"}
        </button>
      }
    >
      <div className={styles.attendanceQuestion}>
        <div>
          <strong>Will you attend this activity?</strong>
          <span>
            {formatShortDate(activity.day, activity.month)} · {activity.place}
          </span>
        </div>
        <div className={styles.attendanceButtons}>
          <button
            type="button"
            className={`${styles.yes} ${attendance === "yes" ? styles.yesSelected : ""}`}
            onClick={() => onAttendance?.(activity.id, "yes")}
            aria-pressed={attendance === "yes"}
          >
            <Check size={19} /> Yes, I’m going
          </button>
          <button
            type="button"
            className={`${styles.no} ${attendance === "no" ? styles.noSelected : ""}`}
            onClick={() => onAttendance?.(activity.id, "no")}
            aria-pressed={attendance === "no"}
          >
            <X size={19} /> No, I can’t
          </button>
        </div>
      </div>

      {attendance === null && (
        <div className={styles.attendancePrompt}>
          <CalendarDays size={24} />
          <strong>Answer attendance first</strong>
          <p>
            Once you say yes, you can volunteer for any roles the group still
            needs. If you say no, we won’t ask you to drive, cook, or pay.
          </p>
        </div>
      )}

      {attendance === "no" && (
        <div className={styles.declineCard}>
          <span className={styles.declineIcon}>
            <Check size={22} />
          </span>
          <div>
            <strong>Thanks for letting the group know.</strong>
            <p>You won’t be asked to take a role or contribute to this plan.</p>
          </div>
        </div>
      )}

      {attendance === "yes" && activity.roles && (
        <>
          <div className={styles.deadlineNote}>
            <Clock3 size={18} />
            <span>
              Great — now choose a role if you can. Organizer locks roles{" "}
              <strong>{activity.roles[0]?.decideBy ?? "soon"}</strong>.
            </span>
          </div>

          {activity.roles.map((role) => (
            <article key={role.name} className={styles.roleCard}>
              <header>
                <span className={styles.roleIcon}>
                  {roleIcons[role.name] ?? <Car size={19} />}
                </span>
                <div>
                  <strong>{role.name}</strong>
                  <small>
                    {role.claimed.length} of {role.needed} filled
                    {role.waitlist.length
                      ? ` · ${role.waitlist.length} waitlisted`
                      : ""}
                  </small>
                </div>
                <span className={styles.roleCount}>
                  {role.claimed.length}/{role.needed}
                </span>
              </header>
              <div className={ui.progress}>
                <span
                  style={{
                    width: `${Math.min((role.claimed.length / role.needed) * 100, 100)}%`,
                  }}
                />
              </div>
              {role.claimed.length > 0 && (
                <div className={styles.claimedRow}>
                  <AvatarStack list={role.claimed} extra={0} />
                  <span>
                    {role.claimed.map((person) => person.name).join(", ")}{" "}
                    claimed
                  </span>
                </div>
              )}
              <div className={styles.replyButtons}>
                <button
                  type="button"
                  className={`${styles.yes} ${role.myReply === "in" || role.myReply === "waitlist" ? styles.replyYesSelected : ""}`}
                  onClick={() =>
                    onRoleReply?.(
                      activity.id,
                      role.name,
                      role.myReply === "in" || role.myReply === "waitlist"
                        ? null
                        : "in",
                    )
                  }
                >
                  <Check size={17} />{" "}
                  {role.myReply === "waitlist" ? "On waitlist" : "I’ve got it"}
                </button>
                <button
                  type="button"
                  className={`${styles.maybe} ${role.myReply === "maybe" ? styles.replyMaybeSelected : ""}`}
                  onClick={() =>
                    onRoleReply?.(
                      activity.id,
                      role.name,
                      role.myReply === "maybe" ? null : "maybe",
                    )
                  }
                >
                  <Clock3 size={17} /> Maybe
                </button>
              </div>
              {role.myReply === "maybe" && (
                <div className={styles.maybeDetail}>
                  <span>I’ll confirm by</span>
                  <input
                    value={decideBy}
                    onChange={(event) => setDecideBy(event.target.value)}
                    aria-label="Decide by"
                  />
                </div>
              )}
            </article>
          ))}

          <div className={styles.waitlistCard}>
            <strong>Waitlist</strong>
            <p>
              If a role is full you’ll land here first. We’ll email you if
              someone backs out.
            </p>
          </div>
        </>
      )}
    </Sheet>
  );
}
