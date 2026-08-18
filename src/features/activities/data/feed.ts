import type { Activity } from "../types";

export const FEED_RECURRING_LIMIT = 2;

export function compareActivityDate(a: Activity, b: Activity) {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

export function upcomingForFeed(activities: Activity[]): Activity[] {
  const shown = new Map<string, number>();

  return [...activities].sort(compareActivityDate).filter((activity) => {
    if (!activity.seriesId) return true;
    const count = shown.get(activity.seriesId) ?? 0;
    if (count >= FEED_RECURRING_LIMIT) return false;
    shown.set(activity.seriesId, count + 1);
    return true;
  });
}
