import { describe, expect, it } from "vitest";
import { giveToCharity, nominateCharity, seedCharity } from "./cycle";

describe("charity cycle", () => {
  it("records a gift once and a nomination", () => {
    const given = giveToCharity(seedCharity);
    expect(given.myGiven).toBe(true);
    expect(given.raised).toBe(seedCharity.raised + seedCharity.giveAmount);
    expect(giveToCharity(given).raised).toBe(given.raised);

    const nominated = nominateCharity(seedCharity, "School supplies");
    expect(nominated.myNominee).toBe("School supplies");
    expect(nominated.nominees.at(-1)?.votes).toBe(1);
  });
});
