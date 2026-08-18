"use client";

import { Compass } from "lucide-react";
import ui from "@/components/shared/styles.module.css";
import type { Activity, Rsvp } from "@/features/activities";
import { ActivityFeedCard } from "@/features/dashboard";
import styles from "@/features/dashboard/styles.module.css";

type PlansViewProps = {
  activities: Activity[];
  onCreate: () => void;
  onRsvp: (id: string, rsvp: Exclude<Rsvp, null>) => void;
  onRoles: (id: string) => void;
  onPay: (id: string) => void;
};

export function PlansView({
  activities,
  onCreate,
  onRsvp,
  onRoles,
  onPay,
}: PlansViewProps) {
  return (
    <div>
      <header className={styles.greeting}>
        <span className={ui.eyebrow}>GROUP PLANS</span>
        <h1>Plans</h1>
        <p>Every hangout, weekly run, and trip in one list.</p>
      </header>
      <button
        type="button"
        className={`${ui.primaryButton} ${ui.block}`}
        onClick={onCreate}
        style={{ margin: "12px 0 18px" }}
      >
        <Compass size={18} /> New activity
      </button>
      <div className={styles.activityGrid}>
        {activities.map((activity) => (
          <ActivityFeedCard
            key={activity.id}
            activity={activity}
            onRsvp={onRsvp}
            onRoles={onRoles}
            onPay={onPay}
          />
        ))}
      </div>
    </div>
  );
}
