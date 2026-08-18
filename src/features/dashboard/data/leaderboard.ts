import type { Activity } from "@/features/activities";
import type { CharityCycle } from "@/features/charity";
import { people } from "@/lib/data/people";

export type LeaderboardRow = {
  name: string;
  initials: string;
  color: string;
  points: number;
  blurb: string;
};

export function leaderboard(
  activities: Activity[],
  charity: CharityCycle,
): LeaderboardRow[] {
  const scores = new Map<string, { points: number; bits: string[] }>();

  const add = (name: string, points: number, bit: string) => {
    const current = scores.get(name) ?? { points: 0, bits: [] };
    current.points += points;
    current.bits.push(bit);
    scores.set(name, current);
  };

  for (const activity of activities) {
    add(activity.host.name, 3, "hosted");
    if (activity.myRsvp === "yes") add("Khalid", 1, "showed up");
    if (activity.funding?.myPaid) add("Khalid", 2, "trip fund");
    for (const role of activity.roles ?? []) {
      for (const person of role.claimed) add(person.name, 2, role.name);
    }
  }

  if (charity.myGiven) add("Khalid", 2, "sadaqa");
  add("Omar", 2, "sadaqa");
  add("Yusuf", 1, "sadaqa");

  return people
    .map((person) => {
      const score = scores.get(person.name) ?? { points: 0, bits: [] };
      return {
        name: person.name,
        initials: person.initials,
        color: person.color,
        points: score.points,
        blurb: score.bits.slice(0, 2).join(" · ") || "getting started",
      };
    })
    .sort((a, b) => b.points - a.points);
}
