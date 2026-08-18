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

export const DEFAULT_DATE_ISO = "2026-08-20";
export const DEFAULT_TIME_24 = "18:30";

export function isDateIso(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function isTime24(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

export function endOfCalendarDay(date: CalendarDate) {
  return new Date(date.year, date.month, date.day + 1);
}

export function isOpenDay(date: CalendarDate, now: Date) {
  return now.getTime() < endOfCalendarDay(date).getTime();
}

export function nextOpenDate(from: CalendarDate, now: Date): CalendarDate {
  let date = from;
  while (!isOpenDay(date, now)) {
    date = addWeeks(date, 1);
  }
  return date;
}

export function msUntilNextMidnight(now: Date) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.max(next.getTime() - now.getTime(), 0);
}
