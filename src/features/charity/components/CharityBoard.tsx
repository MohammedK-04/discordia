"use client";

import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import ui from "@/components/shared/styles.module.css";
import type { CharityCycle } from "@/features/charity";
import styles from "@/features/dashboard/styles.module.css";

type CharityBoardProps = {
  cycle: CharityCycle;
  onGive: () => void;
  onNominate: (name: string) => void;
};

export function CharityBoard({ cycle, onGive, onNominate }: CharityBoardProps) {
  const [name, setName] = useState("");
  const percent = Math.min((cycle.raised / Math.max(cycle.goal, 1)) * 100, 100);

  return (
    <div>
      <header className={styles.greeting}>
        <span className={ui.eyebrow}>{cycle.monthLabel}</span>
        <h1>Sadaqa board</h1>
        <p>A separate pot from trip money. Nominate, then give what you can.</p>
      </header>

      <section className={`${ui.card} ${styles.charityCard}`}>
        <div className={styles.fundTop}>
          <span className={styles.charityIcon}>
            <HeartHandshake size={22} />
          </span>
          <div>
            <span className={ui.eyebrow}>{cycle.monthLabel}</span>
            <strong>{cycle.title}</strong>
          </div>
        </div>
        <p className={ui.sub}>
          ${cycle.raised.toLocaleString()} raised by {cycle.givers} friends ·{" "}
          {cycle.daysLeft} days left
        </p>
        <div className={`${ui.progress} ${ui.progressRose}`}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className={ui.splitButtons}>
          <button type="button" className={ui.darkButton} onClick={onGive}>
            {cycle.myGiven ? "Given this month" : `Give $${cycle.giveAmount}`}
          </button>
        </div>
      </section>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>THIS CYCLE</span>
          <h2>Nominations</h2>
        </div>
      </div>

      <div className={styles.pollGrid}>
        {cycle.nominees.map((nominee) => (
          <article
            key={nominee.name}
            className={`${ui.card} ${styles.pollCard}`}
          >
            <h3>{nominee.name}</h3>
            <p className={ui.sub}>{nominee.votes} nominations</p>
            <button
              type="button"
              className={ui.outlineButton}
              onClick={() => onNominate(nominee.name)}
            >
              {cycle.myNominee === nominee.name ? "Your pick" : "Nominate"}
            </button>
          </article>
        ))}
      </div>

      <section className={`${ui.card} ${styles.inviteRow}`}>
        <div>
          <strong>Suggest someone</strong>
          <small>We’ll keep this pot separate from trip funding.</small>
        </div>
        <input
          className={ui.textInput}
          placeholder="Who should we help?"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label="Nominee name"
        />
        <button
          type="button"
          className={ui.outlineButton}
          onClick={() => {
            onNominate(name);
            setName("");
          }}
        >
          Nominate
        </button>
      </section>
    </div>
  );
}
