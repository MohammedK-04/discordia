import { describe, expect, it } from "vitest";
import { addWeeks, isOpenDay, parseDateIso, weekdayName } from "./when";

describe("when", () => {
  it("names the weekday for a calendar date", () => {
    expect(weekdayName("2026-08-20")).toBe("Thursday");
  });

  it("advances a date by weeks", () => {
    expect(addWeeks(parseDateIso("2026-08-20"), 2)).toEqual({
      year: 2026,
      month: 8,
      day: 3,
    });
  });

  it("keeps the event day open until midnight", () => {
    const thursday = parseDateIso("2026-08-20");
    expect(isOpenDay(thursday, new Date(2026, 7, 20, 23, 59))).toBe(true);
    expect(isOpenDay(thursday, new Date(2026, 7, 21, 0, 0))).toBe(false);
  });
});
