"use client";

import { ArrowRight, Check } from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { totalVotes, type Poll } from "@/features/polls";
import styles from "../styles.module.css";

type QuickPollCardProps = {
  poll: Poll;
  onVote: (pollId: string, option: string) => void;
};

export function QuickPollCard({ poll, onVote }: QuickPollCardProps) {
  const total = totalVotes(poll);
  const closed = poll.minutesLeft <= 0;

  return (
    <article className={`${ui.card} ${styles.pollCard}`}>
      <div className={ui.cardHead}>
        <span className={styles.liveBadge}>
          <span /> {closed ? "CLOSED" : "QUICK DECISION"}
        </span>
        <span className={styles.timeLeft}>
          {closed ? "Voting ended" : `Closes in ${poll.minutesLeft} min`}
        </span>
      </div>
      <h3>{poll.question}</h3>
      <p className={ui.sub}>
        Started by {poll.host.name} · {total} votes
      </p>
      <div className={styles.pollOptions}>
        {poll.options.map((option) => {
          const percent =
            total === 0 ? 0 : Math.round((option.votes / total) * 100);
          const selected = poll.myVote === option.name;
          return (
            <button
              type="button"
              key={option.name}
              className={`${styles.pollOption} ${selected ? styles.voted : ""}`}
              onClick={() => onVote(poll.id, option.name)}
              disabled={closed}
            >
              <span
                className={styles.pollFill}
                style={{ width: `${percent}%` }}
              />
              <span className={styles.pollName}>
                <span
                  className={`${ui.radio} ${ui.radioSmall} ${selected ? ui.votedRadio : ""}`}
                >
                  {selected && <Check size={13} />}
                </span>
                {option.name}
              </span>
              <span className={styles.pollVotes}>{option.votes}</span>
            </button>
          );
        })}
      </div>
      <div className={ui.cardFoot}>
        <div className={ui.footMeta}>
          <AvatarStack count={3} extra={Math.max(total - 3, 0)} />
          <span>
            {total} friends voted
            {poll.myVote ? ` · you picked ${poll.myVote}` : ""}
          </span>
        </div>
        <span className={ui.linkButton}>
          Live tally <ArrowRight size={15} />
        </span>
      </div>
    </article>
  );
}
