"use client";

import { ArrowRight, Bell, HeartHandshake, Plus, UserPlus } from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import type { Activity, Rsvp } from "@/features/activities";
import { ActivityFeedCard } from "./ActivityFeedCard";
import { QuickPollCard } from "./QuickPollCard";
import styles from "../styles.module.css";

type DashboardProps = {
  activities: Activity[];
  onCreate: () => void;
  onRoles: () => void;
  onRsvp: (id: string, rsvp: Exclude<Rsvp, null>) => void;
};

export function Dashboard({
  activities,
  onCreate,
  onRoles,
  onRsvp,
}: DashboardProps) {
  const comingUp = [...activities].sort(
    (a, b) => a.year - b.year || a.month - b.month || a.day - b.day,
  );

  return (
    <>
      <header className={styles.greeting}>
        <span className={ui.eyebrow}>MONDAY, AUGUST 17</span>
        <h1>Good evening, Khalid.</h1>
        <p>Here’s what the group is moving on.</p>
      </header>

      <button className={styles.attentionCard} onClick={onRoles}>
        <span className={styles.attentionIcon}>
          <Bell size={19} />
        </span>
        <span className={styles.attentionText}>
          <strong>2 things need you</strong>
          <small>Camping roles close tomorrow · Soccer RSVP due today</small>
        </span>
        <ArrowRight size={18} />
      </button>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>DECIDE TODAY</span>
          <h2>Quick decisions</h2>
        </div>
        <button className={ui.outlineButton}>
          <Plus size={16} /> New poll
        </button>
      </div>

      <div className={styles.pollGrid}>
        <QuickPollCard />
        <article className={`${ui.card} ${styles.pollCard}`}>
          <div className={ui.cardHead}>
            <span className={`${styles.liveBadge} ${styles.liveBadgeViolet}`}>
              37 MIN LEFT
            </span>
          </div>
          <h3>Which field for Thursday?</h3>
          <p className={ui.sub}>Started by Omar · 9 votes</p>
          <div className={styles.pollOptions}>
            <button className={styles.pollOption}>
              <span className={styles.pollFill} style={{ width: "67%" }} />
              <span className={styles.pollName}>
                <span className={`${ui.radio} ${ui.radioSmall}`} />
                Bossen Field
              </span>
              <span className={styles.pollVotes}>6</span>
            </button>
            <button className={styles.pollOption}>
              <span className={styles.pollFill} style={{ width: "33%" }} />
              <span className={styles.pollName}>
                <span className={`${ui.radio} ${ui.radioSmall}`} />
                Currie Park
              </span>
              <span className={styles.pollVotes}>3</span>
            </button>
          </div>
          <div className={ui.cardFoot}>
            <div className={ui.footMeta}>
              <AvatarStack count={3} extra={6} />
              <span>9 friends voted</span>
            </div>
            <button className={ui.linkButton}>
              Details <ArrowRight size={15} />
            </button>
          </div>
        </article>
      </div>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>COMING UP</span>
          <h2>Activities</h2>
        </div>
        <button className={ui.linkButton} onClick={onCreate}>
          New hangout <ArrowRight size={15} />
        </button>
      </div>

      <div className={styles.activityGrid}>
        {comingUp.map((activity) => (
          <ActivityFeedCard
            key={activity.id}
            activity={activity}
            onRsvp={onRsvp}
            onRoles={onRoles}
          />
        ))}
      </div>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>GIVING TOGETHER</span>
          <h2>Charity</h2>
        </div>
      </div>

      <div className={styles.charityGrid}>
        <section className={`${ui.card} ${styles.charityCard}`}>
          <div className={styles.fundTop}>
            <span className={styles.charityIcon}>
              <HeartHandshake size={22} />
            </span>
            <div>
              <span className={ui.eyebrow}>AUGUST SADAQA</span>
              <strong>Help furnish a family’s new home</strong>
            </div>
          </div>
          <p className={ui.sub}>
            $1,420 raised by 18 friends · 4 days left to give
          </p>
          <div className={`${ui.progress} ${ui.progressRose}`}>
            <span style={{ width: "84%" }} />
          </div>
          <div className={ui.splitButtons}>
            <button className={ui.darkButton}>Give now</button>
            <button className={ui.outlineButton}>Nominate</button>
          </div>
        </section>
      </div>

      <section className={`${ui.card} ${styles.inviteRow}`}>
        <span className={styles.inviteIcon}>
          <UserPlus size={20} />
        </span>
        <div>
          <strong>DSD is invite only</strong>
          <small>
            Bring in someone you trust. They’ll need your invite link.
          </small>
        </div>
        <button className={ui.outlineButton}>Invite</button>
      </section>
    </>
  );
}
