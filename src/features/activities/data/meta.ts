import type { ActivityKind } from "../types";

export const kindMeta: Record<ActivityKind, { icon: string; copy: string }> = {
  Casual: { icon: "✦", copy: "Quick hangout. Post it in seconds." },
  Recurring: { icon: "↻", copy: "Repeats on a rhythm, like Thursday soccer." },
  Planned: { icon: "◇", copy: "Roles, money, deadlines. Camping and trips." },
};

export const attentionMeta: Record<
  "Whenever" | "Respond soon" | "Action required",
  string
> = {
  Whenever: "Stays quiet. No reminders sent.",
  "Respond soon": "One nudge before your deadline.",
  "Action required": "Pinned up top with reminders until people answer.",
};
