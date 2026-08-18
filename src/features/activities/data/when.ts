const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export function parseDateIso(dateIso: string): CalendarDate {
  const [year, month, day] = dateIso.split("-").map(Number);
  return { year, month: month - 1, day };
}

export function addWeeks(date: CalendarDate, weeks: number): CalendarDate {
  const next = new Date(date.year, date.month, date.day + weeks * 7);
  return {
    year: next.getFullYear(),
    month: next.getMonth(),
    day: next.getDate(),
  };
}

export function weekdayName(date: CalendarDate | string) {
  const parts = typeof date === "string" ? parseDateIso(date) : date;
  return WEEKDAYS[new Date(parts.year, parts.month, parts.day).getDay()];
}

export function formatTime24(time24: string) {
  const [hourRaw, minute] = time24.split(":").map(Number);
  const period = hourRaw >= 12 ? "PM" : "AM";
  const hour = hourRaw % 12 || 12;
  return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatShortDate(day: number, month: number) {
  return `${MONTHS[month]} ${day}`;
}
