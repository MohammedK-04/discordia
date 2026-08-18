import type { Person } from "@/lib/types/person";

export const people: Person[] = [
  { initials: "KA", name: "Khalid", color: "#a7c7ff" },
  { initials: "OH", name: "Omar", color: "#ffd4a8" },
  { initials: "YA", name: "Yusuf", color: "#c8e6c0" },
  { initials: "IH", name: "Ibrahim", color: "#e0c1ff" },
  { initials: "MA", name: "Mahad", color: "#ffc5d3" },
];

export const currentUser = people[0];
