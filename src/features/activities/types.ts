import type { Person } from "@/lib/types/person";

export type ActivityKind = "Casual" | "Recurring" | "Planned";
export type Attention = "Whenever" | "Respond soon" | "Action required";
export type Rsvp = "yes" | "no" | null;

export type Activity = {
  id: string;
  title: string;
  kind: ActivityKind;
  attention: Attention;
  day: number;
  month: number;
  year: number;
  time: string;
  place: string;
  host: Person;
  myRsvp: Rsvp;
  goingCount: number;
};

export type CreateCasualInput = {
  title: string;
  attention: Attention;
  dateIso: string;
  time24: string;
  place: string;
};
