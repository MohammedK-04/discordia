import { describe, expect, it } from "vitest";
import { people } from "@/lib/data/people";
import { applyVote, createPoll, totalVotes } from "./vote";

describe("applyVote", () => {
  it("counts a unique vote and lets you switch", () => {
    const poll = createPoll(
      "Food?",
      ["Nashville Coop", "Afro Deli"],
      people[0],
    );
    const first = applyVote(poll, "Nashville Coop");
    expect(first.myVote).toBe("Nashville Coop");
    expect(totalVotes(first)).toBe(1);

    const switched = applyVote(first, "Afro Deli");
    expect(switched.myVote).toBe("Afro Deli");
    expect(switched.options[0]?.votes).toBe(0);
    expect(switched.options[1]?.votes).toBe(1);
  });
});
