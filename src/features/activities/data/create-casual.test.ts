import { describe, expect, it } from "vitest";
import { createCasualActivity } from "./create-casual";

describe("createCasualActivity", () => {
  it("builds a casual hangout from the one-step form", () => {
    const activity = createCasualActivity({
      title: "  Dinner after soccer  ",
      attention: "Whenever",
      dateIso: "2026-08-23",
      time24: "18:30",
      place: "Afro Deli",
    });

    expect(activity).toMatchObject({
      title: "Dinner after soccer",
      kind: "Casual",
      attention: "Whenever",
      day: 23,
      month: 7,
      year: 2026,
      time: "6:30 PM",
      place: "Afro Deli",
      myRsvp: "yes",
      goingCount: 1,
    });
  });

  it("falls back to TBD when no place is given", () => {
    const activity = createCasualActivity({
      title: "Park hang",
      attention: "Whenever",
      dateIso: "2026-08-23",
      time24: "18:30",
      place: "  ",
    });

    expect(activity.place).toBe("TBD");
  });
});
