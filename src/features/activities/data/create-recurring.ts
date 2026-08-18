import { currentUser } from "@/lib/data/people";
import type { Activity, CreateRecurringInput } from "../types";
import { addWeeks, formatTime24, parseDateIso } from "./when";

export const RECURRING_WEEKS = 8;

export function createRecurringSeries(input: CreateRecurringInput): Activity[] {
  const title = input.title.trim();
  const weeks = input.weeks ?? RECURRING_WEEKS;
  const start = parseDateIso(input.startDateIso);
  const seriesId = `series-${Date.now()}`;
  const time = formatTime24(input.time24);
  const place = input.place.trim() || "TBD";

  return Array.from({ length: weeks }, (_, index) => {
    const date = addWeeks(start, index);
    const first = index === 0;

    return {
      id: `${seriesId}-${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`,
      seriesId,
      title,
      kind: "Recurring",
      attention: input.attention,
      day: date.day,
      month: date.month,
      year: date.year,
      time,
      place,
      host: currentUser,
      myRsvp: first ? "yes" : null,
      goingCount: first ? 1 : 0,
    };
  });
}
