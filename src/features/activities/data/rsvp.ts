import type { Activity, Rsvp } from "../types";

export function applyRsvp(
  activity: Activity,
  next: Exclude<Rsvp, null>,
): Activity {
  if (activity.myRsvp === next) {
    return {
      ...activity,
      myRsvp: null,
      goingCount:
        next === "yes"
          ? Math.max(activity.goingCount - 1, 0)
          : activity.goingCount,
    };
  }

  let goingCount = activity.goingCount;
  if (activity.myRsvp === "yes") goingCount -= 1;
  if (next === "yes") goingCount += 1;

  return {
    ...activity,
    myRsvp: next,
    goingCount: Math.max(goingCount, 0),
  };
}
