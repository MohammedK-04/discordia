import { describe, expect, it } from "vitest";
import { createRecurringSeries } from "./create-recurring";

describe("createRecurringSeries", () => {
  it("pre-creates weekly instances with their own RSVPs", () => {
    const series = createRecurringSeries({
      title: "  Thursday Night Soccer  ",
      attention: "Respond soon",
      startDateIso: "2026-08-20",
      time24: "19:00",
      place: "Bossen Field",
    });

    expect(series).toHaveLength(8);
    expect(new Set(series.map((activity) => activity.seriesId)).size).toBe(1);
    expect(new Set(series.map((activity) => activity.id)).size).toBe(8);

    expect(series[0]).toMatchObject({
      title: "Thursday Night Soccer",
      kind: "Recurring",
      day: 20,
      month: 7,
      year: 2026,
      time: "7:00 PM",
      place: "Bossen Field",
      myRsvp: "yes",
      goingCount: 1,
    });

    expect(series[1]).toMatchObject({
      day: 27,
      month: 7,
      year: 2026,
      myRsvp: null,
      goingCount: 0,
    });

    expect(series[2]).toMatchObject({
      day: 3,
      month: 8,
      year: 2026,
    });
  });
});
