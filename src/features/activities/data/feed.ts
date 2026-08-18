import type { Activity } from "../types";
import { isOpenDay, nextOpenDate } from "./when";

export function compareActivityDate(a: Activity, b: Activity) {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

export function currentOccurrence(
  instances: Activity[],
  now: Date,
): Activity | undefined {
  return instances
    .filter((activity) => isOpenDay(activity, now))
    .sort(compareActivityDate)[0];
}

export function visibleActivities(
  activities: Activity[],
  now: Date = new Date(),
): Activity[] {
  const grouped = new Map<string, Activity[]>();

  for (const activity of activities) {
    if (!activity.seriesId) continue;
    const list = grouped.get(activity.seriesId) ?? [];
    list.push(activity);
    grouped.set(activity.seriesId, list);
  }

  const openIds = new Set<string>();
  for (const instances of grouped.values()) {
    const current = currentOccurrence(instances, now);
    if (current) openIds.add(current.id);
  }

  return [...activities]
    .filter((activity) => !activity.seriesId || openIds.has(activity.id))
    .sort(compareActivityDate);
}

export function upcomingForFeed(
  activities: Activity[],
  now: Date = new Date(),
): Activity[] {
  return visibleActivities(activities, now);
}

function instanceOnDate(
  template: Activity,
  date: {
    year: number;
    month: number;
    day: number;
  },
): Activity {
  return {
    ...template,
    id: `${template.seriesId}-${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`,
    day: date.day,
    month: date.month,
    year: date.year,
    myRsvp: null,
    goingCount: 0,
  };
}

export function ensureOpenWeek(
  activities: Activity[],
  now: Date = new Date(),
): Activity[] {
  const extras: Activity[] = [];
  const seriesIds = [
    ...new Set(
      activities
        .map((activity) => activity.seriesId)
        .filter((seriesId): seriesId is string => Boolean(seriesId)),
    ),
  ];

  for (const seriesId of seriesIds) {
    const instances = activities.filter(
      (activity) => activity.seriesId === seriesId,
    );
    if (currentOccurrence(instances, now)) continue;

    const latest = [...instances].sort(compareActivityDate).at(-1);
    if (!latest) continue;

    const nextDate = nextOpenDate(latest, now);
    const alreadyHave = instances.some(
      (activity) =>
        activity.year === nextDate.year &&
        activity.month === nextDate.month &&
        activity.day === nextDate.day,
    );
    if (alreadyHave) continue;

    extras.push(instanceOnDate(latest, nextDate));
  }

  return extras.length > 0 ? [...activities, ...extras] : activities;
}
