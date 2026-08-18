"use client";

import { ArrowRight, Bell, HeartHandshake, Plus, UserPlus } from "lucide-react";
import ui from "@/components/shared/styles.module.css";
import type { Activity, Rsvp } from "@/features/activities";
import type { CharityCycle } from "@/features/charity";
import type { Poll } from "@/features/polls";
import { ActivityFeedCard } from "./ActivityFeedCard";
import { LeaderboardCard } from "./LeaderboardCard";
import { QuickPollCard } from "./QuickPollCard";
import { leaderboard } from "../data/leaderboard";
import { needsYou } from "../data/needs";
import type { Notice } from "../data/notices";
import styles from "../styles.module.css";

type DashboardProps = {
  activities: Activity[];
  polls: Poll[];
  charity: CharityCycle;
  notices: Notice[];
  onCreate: () => void;
  onRoles: (id: string) => void;
  onRsvp: (id: string, rsvp: Exclude<Rsvp, null>) => void;
  onPay: (id: string) => void;
  onVote: (pollId: string, option: string) => void;
  onNewPoll: () => void;
  onGive: () => void;
  onCharity: () => void;
};

export function Dashboard({
  activities,
  polls,
  charity,
  notices,
  onCreate,
  onRoles,
  onRsvp,
  onPay,
  onVote,
  onNewPoll,
  onGive,
  onCharity,
}: DashboardProps) {
  const comingUp = activities;
  const needs = needsYou(activities, polls);
  const ranks = leaderboard(activities, charity);
  const percent = Math.min(
    (charity.raised / Math.max(charity.goal, 1)) * 100,
    100,
  );

  return (
    <>
      <header className={styles.greeting}>
        <span className={ui.eyebrow}>MONDAY, AUGUST 17</span>
        <h1>Good evening, Khalid.</h1>
        <p>Here’s what the group is moving on.</p>
      </header>

      {needs.length > 0 && (
        <button
          type="button"
          className={styles.attentionCard}
          onClick={() => {
            const first = needs[0];
            if (first?.activityId) onRoles(first.activityId);
          }}
        >
          <span className={styles.attentionIcon}>
            <Bell size={19} />
          </span>
          <span className={styles.attentionText}>
            <strong>
              {needs.length} thing{needs.length === 1 ? "" : "s"} need you
            </strong>
            <small>
              {needs
                .map((item) => item.title)
                .slice(0, 2)
                .join(" · ")}
            </small>
          </span>
          <ArrowRight size={18} />
        </button>
      )}

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>DECIDE TODAY</span>
          <h2>Quick decisions</h2>
        </div>
        <button type="button" className={ui.outlineButton} onClick={onNewPoll}>
          <Plus size={16} /> New poll
        </button>
      </div>

      <div className={styles.pollGrid}>
        {polls.map((poll) => (
          <QuickPollCard key={poll.id} poll={poll} onVote={onVote} />
        ))}
      </div>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>COMING UP</span>
          <h2>Activities</h2>
        </div>
        <button type="button" className={ui.linkButton} onClick={onCreate}>
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
            onPay={onPay}
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
              <span className={ui.eyebrow}>{charity.monthLabel}</span>
              <strong>{charity.title}</strong>
            </div>
          </div>
          <p className={ui.sub}>
            ${charity.raised.toLocaleString()} raised by {charity.givers}{" "}
            friends · {charity.daysLeft} days left to give
          </p>
          <div className={`${ui.progress} ${ui.progressRose}`}>
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className={ui.splitButtons}>
            <button type="button" className={ui.darkButton} onClick={onGive}>
              {charity.myGiven ? "Given this month" : "Give now"}
            </button>
            <button
              type="button"
              className={ui.outlineButton}
              onClick={onCharity}
            >
              Nominate
            </button>
          </div>
        </section>
      </div>

      <LeaderboardCard rows={ranks} />

      {notices.length > 0 && (
        <section className={`${ui.card} ${styles.inviteRow}`}>
          <span className={styles.inviteIcon}>
            <Bell size={20} />
          </span>
          <div>
            <strong>{notices[0]?.title}</strong>
            <small>{notices[0]?.body}</small>
          </div>
        </section>
      )}

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
        <button type="button" className={ui.outlineButton}>
          Invite
        </button>
      </section>
    </>
  );
}
