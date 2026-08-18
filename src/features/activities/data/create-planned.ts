import { currentUser } from "@/lib/data/people";
import type {
  Activity,
  ActivityRole,
  CreatePlannedInput,
  RoleDraft,
} from "../types";
import { formatTime24, parseDateIso } from "./when";

export function draftsToRoles(drafts: RoleDraft[]): ActivityRole[] {
  return drafts
    .filter((draft) => draft.name.trim() && draft.needed > 0)
    .map((draft) => ({
      name: draft.name.trim(),
      needed: draft.needed,
      claimed: [],
      waitlist: [],
      maybes: [],
      myReply: null,
      decideBy: "Aug 22, 5:00 PM",
    }));
}

export function createPlannedActivity(input: CreatePlannedInput): Activity {
  const title = input.title.trim();
  const { year, month, day } = parseDateIso(input.dateIso);

  return {
    id: `planned-${Date.now()}`,
    title,
    kind: "Planned",
    attention: input.attention,
    day,
    month,
    year,
    time: formatTime24(input.time24),
    place: input.place.trim() || "TBD",
    host: currentUser,
    myRsvp: "yes",
    goingCount: 1,
    roles: input.roles ? draftsToRoles(input.roles) : undefined,
    funding: input.funding
      ? {
          goal: input.funding.goal,
          perPerson: input.funding.perPerson,
          raised: 0,
          myPaid: false,
        }
      : undefined,
  };
}

export function rolesFilled(roles: ActivityRole[]) {
  return roles.reduce((total, role) => total + role.claimed.length, 0);
}

export function rolesNeeded(roles: ActivityRole[]) {
  return roles.reduce((total, role) => total + role.needed, 0);
}

export function maybeCount(roles: ActivityRole[]) {
  return roles.reduce((total, role) => total + role.maybes.length, 0);
}
