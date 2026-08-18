import { describe, expect, it } from "vitest";
import { createPlannedActivity } from "./create-planned";
import { applyAttendance, applyRoleReply, applyTripPay } from "./roles";

const camping = createPlannedActivity({
  title: "North Shore Camping",
  attention: "Action required",
  dateIso: "2026-08-29",
  time24: "09:00",
  place: "Tettegouche",
  roles: [
    { name: "Drivers", needed: 1 },
    { name: "Cooks", needed: 2 },
  ],
  funding: { goal: 1200, perPerson: 60 },
});

describe("createPlannedActivity", () => {
  it("saves date, roles, and funding before posting", () => {
    expect(camping).toMatchObject({
      title: "North Shore Camping",
      kind: "Planned",
      day: 29,
      month: 7,
      year: 2026,
      time: "9:00 AM",
      place: "Tettegouche",
      myRsvp: "yes",
    });
    expect(camping.roles).toHaveLength(2);
    expect(camping.funding).toMatchObject({
      goal: 1200,
      perPerson: 60,
      raised: 0,
      myPaid: false,
    });
  });
});

describe("planned attendance and roles", () => {
  it("does not show role claims after someone says no", () => {
    const claimed = applyRoleReply(camping, "Drivers", "in");
    const declined = applyAttendance(claimed, "no");

    expect(declined.myRsvp).toBe("no");
    expect(declined.roles?.[0]?.myReply).toBeNull();
    expect(declined.roles?.[0]?.claimed).toHaveLength(0);
  });

  it("puts extra volunteers on the waitlist when a role is full", () => {
    const full = {
      ...camping,
      roles: camping.roles?.map((role) =>
        role.name === "Drivers"
          ? {
              ...role,
              claimed: [{ initials: "OH", name: "Omar", color: "#ffd4a8" }],
            }
          : role,
      ),
    };
    const waitlisted = applyRoleReply(full, "Drivers", "in");

    expect(waitlisted.roles?.[0]?.myReply).toBe("waitlist");
    expect(
      waitlisted.roles?.[0]?.waitlist.some(
        (person) => person.name === "Khalid",
      ),
    ).toBe(true);
  });

  it("only takes trip money after a yes RSVP", () => {
    expect(applyTripPay({ ...camping, myRsvp: "no" }).funding?.myPaid).toBe(
      false,
    );
    expect(applyTripPay(camping).funding).toMatchObject({
      myPaid: true,
      raised: 60,
    });
  });
});
