import { describe, expect, it } from "vitest";
import { seedActivities } from "@/features/activities";
import { seedPolls } from "@/features/polls";
import { needsYou } from "./needs";

describe("needsYou", () => {
  it("flags unanswered RSVPs and open polls", () => {
    const items = needsYou(seedActivities, seedPolls);
    expect(items.some((item) => item.title.includes("North Shore"))).toBe(true);
    expect(items.some((item) => item.title.includes("Food after soccer"))).toBe(
      true,
    );
  });
});
