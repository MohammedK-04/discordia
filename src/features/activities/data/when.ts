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

export function parseDateIso(dateIso: string) {
  const [year, month, day] = dateIso.split("-").map(Number);
  return { year, month: month - 1, day };
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
