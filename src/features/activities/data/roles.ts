import { currentUser } from "@/lib/data/people";
import type { Activity, ActivityRole, RoleReply, Rsvp } from "../types";
import { applyRsvp } from "./rsvp";

function withoutUser(people: ActivityRole["claimed"]) {
  return people.filter((person) => person.name !== currentUser.name);
}

function withUser(people: ActivityRole["claimed"]) {
  return withoutUser(people).concat(currentUser);
}

function clearMyRole(role: ActivityRole): ActivityRole {
  return {
    ...role,
    claimed: withoutUser(role.claimed),
    waitlist: withoutUser(role.waitlist),
    maybes: withoutUser(role.maybes),
    myReply: null,
  };
}

export function applyAttendance(
  activity: Activity,
  next: Exclude<Rsvp, null>,
): Activity {
  const updated = applyRsvp(activity, next);
  if (updated.myRsvp === "yes") return updated;

  return {
    ...updated,
    roles: updated.roles?.map(clearMyRole),
    funding: updated.funding
      ? { ...updated.funding, myPaid: false }
      : undefined,
  };
}

export function applyRoleReply(
  activity: Activity,
  roleName: string,
  reply: RoleReply,
): Activity {
  if (activity.myRsvp !== "yes" || !activity.roles) return activity;

  return {
    ...activity,
    roles: activity.roles.map((role) => {
      if (role.name !== roleName) return role;
      const cleared = clearMyRole(role);
      if (reply === "in") {
        if (cleared.claimed.length >= cleared.needed) {
          return {
            ...cleared,
            waitlist: withUser(cleared.waitlist),
            myReply: "waitlist",
          };
        }
        return {
          ...cleared,
          claimed: withUser(cleared.claimed),
          myReply: "in",
        };
      }
      if (reply === "maybe") {
        return {
          ...cleared,
          maybes: withUser(cleared.maybes),
          myReply: "maybe",
        };
      }
      if (reply === "waitlist") {
        return {
          ...cleared,
          waitlist: withUser(cleared.waitlist),
          myReply: "waitlist",
        };
      }
      return cleared;
    }),
  };
}

export function applyTripPay(activity: Activity): Activity {
  if (
    !activity.funding ||
    activity.myRsvp !== "yes" ||
    activity.funding.myPaid
  ) {
    return activity;
  }

  return {
    ...activity,
    funding: {
      ...activity.funding,
      myPaid: true,
      raised: activity.funding.raised + activity.funding.perPerson,
    },
  };
}
