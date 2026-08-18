import { describe, expect, it } from "vitest";
import { people } from "@/lib/data/people";
import { applyRsvp } from "./rsvp";
import type { Activity } from "../types";

const activity: Activity = {
  id: "casual-1",
  title: "Hangout",
  kind: "Casual",
  attention: "Whenever",
  day: 22,
  month: 7,
  year: 2026,
  time: "6:30 PM",
  place: "Park",
  host: people[0],
  myRsvp: null,
  goingCount: 8,
};

describe("applyRsvp", () => {
  it("marks going and bumps the count", () => {
    expect(applyRsvp(activity, "yes")).toMatchObject({
      myRsvp: "yes",
      goingCount: 9,
    });
  });

  it("lets someone decline without changing the going count", () => {
    expect(applyRsvp(activity, "no")).toMatchObject({
      myRsvp: "no",
      goingCount: 8,
    });
  });

  it("switching from yes to no drops the count", () => {
    const going = applyRsvp(activity, "yes");
    expect(applyRsvp(going, "no")).toMatchObject({
      myRsvp: "no",
      goingCount: 8,
    });
  });

  it("tapping the same RSVP again clears it", () => {
    const going = applyRsvp(activity, "yes");
    expect(applyRsvp(going, "yes")).toMatchObject({
      myRsvp: null,
      goingCount: 8,
    });
  });
});
