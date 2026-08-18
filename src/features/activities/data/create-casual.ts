import { currentUser } from "@/lib/data/people";
import type { Activity, CreateCasualInput } from "../types";
import { formatTime24, parseDateIso } from "./when";

export function createCasualActivity(input: CreateCasualInput): Activity {
  const title = input.title.trim();
  const { year, month, day } = parseDateIso(input.dateIso);

  return {
    id: `casual-${Date.now()}`,
    title,
    kind: "Casual",
    attention: input.attention,
    day,
    month,
    year,
    time: formatTime24(input.time24),
    place: input.place.trim() || "TBD",
    host: currentUser,
    myRsvp: "yes",
    goingCount: 1,
  };
}
