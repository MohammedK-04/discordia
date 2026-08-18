import { people } from "@/lib/data/people";

export const campingRoles = [
  {
    name: "Drivers",
    filled: 2,
    needed: 4,
    claimed: [people[1], people[3]],
    note: "Trunk space for two tents",
  },
  {
    name: "Cooks",
    filled: 1,
    needed: 2,
    claimed: [people[2]],
    note: "Saturday dinner for 12",
  },
];
