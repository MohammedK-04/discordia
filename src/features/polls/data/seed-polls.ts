import { people } from "@/lib/data/people";
import type { Poll } from "./vote";

export const seedPolls: Poll[] = [
  {
    id: "poll-food",
    question: "Food after soccer tonight?",
    host: people[2],
    minutesLeft: 42,
    options: [
      { name: "Nashville Coop", votes: 8 },
      { name: "Afro Deli", votes: 4 },
      { name: "Dave’s Hot Chicken", votes: 2 },
    ],
    myVote: null,
  },
  {
    id: "poll-field",
    question: "Which field for Thursday?",
    host: people[1],
    minutesLeft: 37,
    options: [
      { name: "Bossen Field", votes: 6 },
      { name: "Currie Park", votes: 3 },
    ],
    myVote: null,
  },
];
