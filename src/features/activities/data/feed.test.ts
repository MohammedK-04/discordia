import { describe, expect, it } from "vitest";
import { createRecurringSeries } from "./create-recurring";
import { ensureOpenWeek, upcomingForFeed } from "./feed";
import { seedActivities } from "./seed-activities";

const series = createRecurringSeries({
  title: "Thursday Night Soccer",
  attention: "Respond soon",
  startDateIso: "2026-08-20",
  time24: "19:00",
  place: "Bossen Field",
});

const grill = seedActivities.find((activity) => activity.id === "casual-grill");
if (!grill) throw new Error("missing seed");

describe("upcomingForFeed", () => {
  it("shows only this week’s occurrence until midnight that day", () => {
    const tuesday = new Date(2026, 7, 18, 15, 0);
    const feed = upcomingForFeed([...series, grill], tuesday);
    const weeks = feed.filter(
      (activity) => activity.seriesId === series[0]?.seriesId,
    );

    expect(weeks).toHaveLength(1);
    expect(weeks[0]).toMatchObject({ day: 20, month: 7, year: 2026 });
    expect(feed.some((activity) => activity.id === "casual-grill")).toBe(true);
  });

  it("opens next week after midnight on the event day", () => {
    const thursdayNight = new Date(2026, 7, 20, 23, 59);
    const friday = new Date(2026, 7, 21, 0, 0);

    expect(upcomingForFeed(series, thursdayNight)[0]).toMatchObject({
      day: 20,
      month: 7,
    });
    expect(upcomingForFeed(series, friday)[0]).toMatchObject({
      day: 27,
      month: 7,
    });
  });
});

describe("ensureOpenWeek", () => {
  it("creates the next Thursday when every stored week has closed", () => {
    const firstWeekOnly = series.slice(0, 1);
    const friday = new Date(2026, 7, 21, 0, 0);
    const rolled = ensureOpenWeek(firstWeekOnly, friday);

    expect(rolled).toHaveLength(2);
    expect(rolled[1]).toMatchObject({
      day: 27,
      month: 7,
      year: 2026,
      seriesId: firstWeekOnly[0]?.seriesId,
      myRsvp: null,
      goingCount: 0,
    });
  });
});
