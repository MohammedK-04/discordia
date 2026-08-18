import {
  ArrowRight,
  CalendarDays,
  Car,
  Clock3,
  MapPin,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Avatar, AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import type { Activity, Rsvp } from "@/features/activities";
import { formatShortDate } from "@/features/activities";
import styles from "../styles.module.css";

const MONTH_SHORT = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

type ActivityFeedCardProps = {
  activity: Activity;
  onRsvp: (id: string, rsvp: Exclude<Rsvp, null>) => void;
  onRoles: () => void;
};

function imageClass(kind: Activity["kind"]) {
  if (kind === "Planned") return styles.campingImage;
  if (kind === "Recurring") return styles.soccerImage;
  return styles.hangoutImage;
}

export function ActivityFeedCard({
  activity,
  onRsvp,
  onRoles,
}: ActivityFeedCardProps) {
  const goingSelected = activity.myRsvp === "yes";
  const noSelected = activity.myRsvp === "no";

  return (
    <article className={`${ui.card} ${styles.activityCard}`}>
      <div className={`${styles.activityImage} ${imageClass(activity.kind)}`}>
        <div className={styles.cardTags}>
          {activity.attention === "Action required" && (
            <span className={`${styles.tag} ${styles.tagAction}`}>
              ACTION REQUIRED
            </span>
          )}
          {activity.kind === "Planned" && (
            <span className={`${styles.tag} ${styles.tagPlanned}`}>
              PLANNED TRIP
            </span>
          )}
          {activity.kind === "Recurring" && (
            <span className={`${styles.tag} ${styles.tagRecurring}`}>
              ↻ RECURRING
            </span>
          )}
          {activity.kind === "Casual" && (
            <span className={`${styles.tag} ${styles.tagCasual}`}>
              ✦ CASUAL
            </span>
          )}
        </div>
        <div className={styles.dateTile}>
          <b>{activity.day}</b>
          <span>{MONTH_SHORT[activity.month]}</span>
        </div>
      </div>
      <div className={styles.activityBody}>
        <div className={styles.hostLine}>
          <Avatar person={activity.host} small />
          <span>
            {activity.kind === "Planned" ? "Organized" : "Hosted"} by{" "}
            {activity.host.name}
          </span>
        </div>
        <h3>{activity.title}</h3>
        <p className={styles.detailLine}>
          <CalendarDays size={16} />{" "}
          {formatShortDate(activity.day, activity.month)}
          <span className={ui.dot} />
          <Clock3 size={16} /> {activity.time}
          <span className={ui.dot} />
          <MapPin size={16} /> {activity.place}
        </p>

        {activity.kind === "Planned" && (
          <>
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span>Roles filled</span>
                <b>8 of 12</b>
              </div>
              <div className={ui.progress}>
                <span style={{ width: "66%" }} />
              </div>
              <div className={styles.needList}>
                <span>
                  <Car size={15} /> 2 drivers
                </span>
                <span>
                  <Utensils size={15} /> 1 cook
                </span>
                <span className={styles.maybeChip}>3 maybes</span>
              </div>
            </div>
            <button
              className={`${ui.primaryButton} ${ui.block}`}
              onClick={onRoles}
            >
              Pick up a role <ArrowRight size={17} />
            </button>
            <div className={ui.cardFoot}>
              <div className={ui.footMeta}>
                <AvatarStack count={4} extra={4} />
                <span>{activity.goingCount} going</span>
              </div>
              <span className={styles.deadline}>Locks Aug 22, 5 PM</span>
            </div>
          </>
        )}

        {activity.kind === "Recurring" && (
          <>
            <div className={`${styles.panel} ${styles.panelLime}`}>
              <div className={styles.panelTop}>
                <span>{activity.goingCount} going</span>
                <b>Need 3 more</b>
              </div>
              <div className={ui.progress}>
                <span style={{ width: "78%" }} />
              </div>
            </div>
            <div className={ui.splitButtons}>
              <button
                className={goingSelected ? ui.primaryButton : ui.outlineButton}
                onClick={() => onRsvp(activity.id, "yes")}
              >
                I’m in
              </button>
              <button
                className={noSelected ? ui.primaryButton : ui.outlineButton}
                onClick={() => onRsvp(activity.id, "no")}
              >
                Can’t make it
              </button>
            </div>
            <div className={ui.cardFoot}>
              <div className={ui.footMeta}>
                <AvatarStack
                  count={4}
                  extra={Math.max(activity.goingCount - 4, 0)}
                />
                <span>Weekly run</span>
              </div>
              <span className={styles.deadline}>RSVP by 5:00 PM</span>
            </div>
          </>
        )}

        {activity.kind === "Casual" && (
          <>
            <div className={styles.casualNote}>
              <Sparkles size={18} />
              <span>No roles, no pressure. Bring something if you want.</span>
            </div>
            <div className={ui.splitButtons}>
              <button
                className={goingSelected ? ui.primaryButton : ui.outlineButton}
                onClick={() => onRsvp(activity.id, "yes")}
              >
                Going
              </button>
              <button
                className={noSelected ? ui.primaryButton : ui.outlineButton}
                onClick={() => onRsvp(activity.id, "no")}
              >
                Can’t make it
              </button>
            </div>
            <div className={ui.cardFoot}>
              <div className={ui.footMeta}>
                <AvatarStack
                  count={Math.min(activity.goingCount, 4)}
                  extra={Math.max(activity.goingCount - 4, 0)}
                />
                <span>
                  {activity.goingCount} going
                  {goingSelected
                    ? " · you’re in"
                    : noSelected
                      ? " · you’re out"
                      : ""}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
