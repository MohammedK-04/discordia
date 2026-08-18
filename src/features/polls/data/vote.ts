import type { Person } from "@/lib/types/person";

export type PollOption = {
  name: string;
  votes: number;
};

export type Poll = {
  id: string;
  question: string;
  host: Person;
  minutesLeft: number;
  options: PollOption[];
  myVote: string | null;
};

export function totalVotes(poll: Poll) {
  return poll.options.reduce((sum, option) => sum + option.votes, 0);
}

export function applyVote(poll: Poll, optionName: string): Poll {
  if (poll.minutesLeft <= 0) return poll;

  const bump = (name: string, amount: number) =>
    poll.options.map((option) =>
      option.name === name
        ? { ...option, votes: Math.max(option.votes + amount, 0) }
        : option,
    );

  if (poll.myVote === optionName) {
    return { ...poll, myVote: null, options: bump(optionName, -1) };
  }

  let options = poll.options;
  if (poll.myVote) {
    options = bump(poll.myVote, -1);
  }

  return {
    ...poll,
    myVote: optionName,
    options: options.map((option) =>
      option.name === optionName
        ? { ...option, votes: option.votes + 1 }
        : option,
    ),
  };
}

export function createPoll(
  question: string,
  options: string[],
  host: Person,
): Poll {
  return {
    id: `poll-${Date.now()}`,
    question: question.trim(),
    host,
    minutesLeft: 90,
    options: options
      .filter(Boolean)
      .map((name) => ({ name: name.trim(), votes: 0 })),
    myVote: null,
  };
}
