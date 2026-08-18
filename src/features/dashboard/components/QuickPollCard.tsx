"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { foodPollOptions } from "../data/poll-options";
import styles from "../styles.module.css";

export function QuickPollCard() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <article className={`${ui.card} ${styles.pollCard}`}>
      <div className={ui.cardHead}>
        <span className={styles.liveBadge}>
          <span /> QUICK DECISION
        </span>
        <span className={styles.timeLeft}>Closes 8:30 PM</span>
      </div>
      <h3>Food after soccer tonight?</h3>
      <p className={ui.sub}>Started by Yusuf · 14 votes</p>
      <div className={styles.pollOptions}>
        {foodPollOptions.map(([name, votes, percent]) => (
          <button
            key={name}
            className={`${styles.pollOption} ${selected === name ? styles.voted : ""}`}
            onClick={() => setSelected(name)}
          >
            <span
              className={styles.pollFill}
              style={{ width: `${percent}%` }}
            />
            <span className={styles.pollName}>
              <span
                className={`${ui.radio} ${ui.radioSmall} ${selected === name ? ui.votedRadio : ""}`}
              >
                {selected === name && <Check size={13} />}
              </span>
              {name}
            </span>
            <span className={styles.pollVotes}>{votes}</span>
          </button>
        ))}
      </div>
      <div className={ui.cardFoot}>
        <div className={ui.footMeta}>
          <AvatarStack count={3} extra={8} />
          <span>11 friends voted</span>
        </div>
        <button className={ui.linkButton}>
          Details <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
