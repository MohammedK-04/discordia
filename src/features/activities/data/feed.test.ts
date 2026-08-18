import { describe, expect, it } from "vitest";
import { createRecurringSeries } from "./create-recurring";
import { upcomingForFeed } from "./feed";
import { seedActivities } from "./seed-activities";

describe("upcomingForFeed", () => {
  it("keeps non-series activities and only the next two of a series", () => {
    const series = createRecurringSeries({
      title: "Thursday Night Soccer",
      attention: "Respond soon",
      startDateIso: "2026-08-20",
      time24: "19:00",
      place: "Bossen Field",
    });
    const grill = seedActivities.find(
      (activity) => activity.id === "casual-grill",
    );
    if (!grill) throw new Error("missing seed");

    const feed = upcomingForFeed([...series, grill]);

    expect(
      feed.filter((activity) => activity.seriesId === series[0]?.seriesId),
    ).toHaveLength(2);
    expect(feed.some((activity) => activity.id === "casual-grill")).toBe(true);
  });
});
