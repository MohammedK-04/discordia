export type CalendarActivityKind =
  "recurring" | "casual" | "planned" | "charity";

export type CalendarActivity = {
  day: number;
  month: number;
  year: number;
  title: string;
  time: string;
  place: string;
  kind: CalendarActivityKind;
  iconName: "compass" | "sparkles" | "heart" | "car";
  attendees: number;
};
