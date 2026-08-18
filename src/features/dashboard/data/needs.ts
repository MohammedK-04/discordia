import type { Activity } from "@/features/activities";
import { rolesFilled, rolesNeeded } from "@/features/activities";
import type { Poll } from "@/features/polls";

export type NeedItem = {
  id: string;
  title: string;
  detail: string;
  activityId?: string;
};

export function needsYou(activities: Activity[], polls: Poll[]): NeedItem[] {
  const items: NeedItem[] = [];

  for (const activity of activities) {
    if (activity.myRsvp === null && activity.attention !== "Whenever") {
      items.push({
        id: `rsvp-${activity.id}`,
        title: `RSVP for ${activity.title}`,
        detail: `${activity.attention} · ${activity.time}`,
        activityId: activity.id,
      });
    }

    if (activity.myRsvp === "yes" && activity.roles) {
      const unanswered = activity.roles.every((role) => role.myReply === null);
      if (
        unanswered &&
        rolesFilled(activity.roles) < rolesNeeded(activity.roles)
      ) {
        items.push({
          id: `role-${activity.id}`,
          title: `Roles still open for ${activity.title}`,
          detail: `${rolesFilled(activity.roles)} of ${rolesNeeded(activity.roles)} filled`,
          activityId: activity.id,
        });
      }
    }

    if (
      activity.myRsvp === "yes" &&
      activity.funding &&
      !activity.funding.myPaid
    ) {
      items.push({
        id: `pay-${activity.id}`,
        title: `Trip fund for ${activity.title}`,
        detail: `$${activity.funding.perPerson} still needed from you`,
        activityId: activity.id,
      });
    }
  }

  for (const poll of polls) {
    if (poll.myVote === null && poll.minutesLeft > 0) {
      items.push({
        id: `poll-${poll.id}`,
        title: poll.question,
        detail: `${poll.minutesLeft} min left to vote`,
      });
    }
  }

  return items;
}
