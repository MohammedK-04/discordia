"use client";

import { useState } from "react";
import { CalendarDays, Car, Check, Clock3, Utensils, X } from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import { Sheet } from "@/components/shared/sheet";
import ui from "@/components/shared/styles.module.css";
import { campingRoles } from "../data/roles";
import type { RoleReply } from "../types";
import styles from "../styles.module.css";

type RoleSheetProps = {
  open: boolean;
  onClose: () => void;
};

const roleIcons: Record<string, React.ReactNode> = {
  Drivers: <Car size={19} />,
  Cooks: <Utensils size={19} />,
};

export function RoleSheet({ open, onClose }: RoleSheetProps) {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [reply, setReply] = useState<Record<string, RoleReply>>({
    Drivers: null,
    Cooks: null,
  });

  const close = () => {
    onClose();
    setAttendance(null);
    setReply({ Drivers: null, Cooks: null });
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow="NORTH SHORE CAMPING"
      title={attendance === "yes" ? "Pick up a role" : "Are you coming?"}
      footer={
        <button
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
          <span>Aug 29–31 · Tettegouche State Park</span>
        </div>
        <div className={styles.attendanceButtons}>
          <button
            className={`${styles.yes} ${attendance === "yes" ? styles.yesSelected : ""}`}
            onClick={() => setAttendance("yes")}
            aria-pressed={attendance === "yes"}
          >
            <Check size={19} /> Yes, I’m going
          </button>
          <button
            className={`${styles.no} ${attendance === "no" ? styles.noSelected : ""}`}
            onClick={() => setAttendance("no")}
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
            needs.
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

      {attendance === "yes" && (
        <>
          <div className={styles.deadlineNote}>
            <Clock3 size={18} />
            <span>
              Great — now choose a role if you can. Organizer locks roles{" "}
              <strong>Aug 22 at 5:00 PM</strong>.
            </span>
          </div>

          {campingRoles.map((role) => (
            <article key={role.name} className={styles.roleCard}>
              <header>
                <span className={styles.roleIcon}>{roleIcons[role.name]}</span>
                <div>
                  <strong>{role.name}</strong>
                  <small>{role.note}</small>
                </div>
                <span className={styles.roleCount}>
                  {role.filled}/{role.needed}
                </span>
              </header>
              <div className={ui.progress}>
                <span
                  style={{ width: `${(role.filled / role.needed) * 100}%` }}
                />
              </div>
              <div className={styles.claimedRow}>
                <AvatarStack list={role.claimed} extra={0} />
                <span>
                  {role.claimed.map((person) => person.name).join(", ")} claimed
                </span>
              </div>
              <div className={styles.replyButtons}>
                <button
                  className={`${styles.yes} ${reply[role.name] === "in" ? styles.replyYesSelected : ""}`}
                  onClick={() =>
                    setReply({
                      ...reply,
                      [role.name]: reply[role.name] === "in" ? null : "in",
                    })
                  }
                >
                  <Check size={17} /> I’ve got it
                </button>
                <button
                  className={`${styles.maybe} ${reply[role.name] === "maybe" ? styles.replyMaybeSelected : ""}`}
                  onClick={() =>
                    setReply({
                      ...reply,
                      [role.name]:
                        reply[role.name] === "maybe" ? null : "maybe",
                    })
                  }
                >
                  <Clock3 size={17} /> Maybe
                </button>
              </div>
              {reply[role.name] === "maybe" && (
                <div className={styles.maybeDetail}>
                  <span>I’ll confirm by</span>
                  <input
                    defaultValue="Aug 21, 5:00 PM"
                    aria-label="Decide by"
                  />
                </div>
              )}
            </article>
          ))}

          <div className={styles.waitlistCard}>
            <strong>Waitlist</strong>
            <p>
              3 people are waiting in case a driver drops. You’ll be first in
              line if someone backs out.
            </p>
            <button className={`${ui.ghostButton} ${ui.block}`}>
              Join the waitlist
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
