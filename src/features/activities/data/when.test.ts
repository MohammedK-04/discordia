import { describe, expect, it } from "vitest";
import { addWeeks, parseDateIso, weekdayName } from "./when";

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
});
