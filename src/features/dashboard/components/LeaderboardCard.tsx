import { Avatar } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import type { LeaderboardRow } from "../data/leaderboard";
import styles from "../styles.module.css";

type LeaderboardCardProps = {
  rows: LeaderboardRow[];
};

export function LeaderboardCard({ rows }: LeaderboardCardProps) {
  return (
    <section className={`${ui.card} ${styles.charityCard}`}>
      <div>
        <span className={ui.eyebrow}>THIS MONTH</span>
        <h2 style={{ margin: "4px 0 10px", fontSize: 20 }}>Leaderboard</h2>
        <p className={ui.sub}>
          Hosting, showing up, and giving — not a score to chase.
        </p>
      </div>
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: 10,
        }}
      >
        {rows.map((row, index) => (
          <li
            key={row.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <strong style={{ width: 18 }}>{index + 1}</strong>
            <Avatar
              person={{
                name: row.name,
                initials: row.initials,
                color: row.color,
              }}
              small
            />
            <span style={{ flex: 1 }}>
              <strong>{row.name}</strong>
              <small style={{ display: "block", color: "var(--muted)" }}>
                {row.blurb}
              </small>
            </span>
            <span>{row.points}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
