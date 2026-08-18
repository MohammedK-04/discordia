export type CharityNominee = {
  name: string;
  votes: number;
};

export type CharityCycle = {
  id: string;
  monthLabel: string;
  title: string;
  raised: number;
  goal: number;
  givers: number;
  daysLeft: number;
  nominees: CharityNominee[];
  myNominee: string | null;
  myGiven: boolean;
  giveAmount: number;
};

export const seedCharity: CharityCycle = {
  id: "sadaqa-aug",
  monthLabel: "AUGUST SADAQA",
  title: "Help furnish a family’s new home",
  raised: 1420,
  goal: 1700,
  givers: 18,
  daysLeft: 4,
  nominees: [
    { name: "Furnish a family’s new home", votes: 11 },
    { name: "Ramadan food boxes", votes: 7 },
  ],
  myNominee: null,
  myGiven: false,
  giveAmount: 20,
};

export function giveToCharity(cycle: CharityCycle): CharityCycle {
  if (cycle.myGiven) return cycle;
  return {
    ...cycle,
    myGiven: true,
    raised: cycle.raised + cycle.giveAmount,
    givers: cycle.givers + 1,
  };
}

export function nominateCharity(
  cycle: CharityCycle,
  name: string,
): CharityCycle {
  const trimmed = name.trim();
  if (!trimmed) return cycle;

  const existing = cycle.nominees.find(
    (nominee) => nominee.name.toLowerCase() === trimmed.toLowerCase(),
  );
  const nominees = existing
    ? cycle.nominees.map((nominee) =>
        nominee.name === existing.name
          ? { ...nominee, votes: nominee.votes + 1 }
          : nominee,
      )
    : [...cycle.nominees, { name: trimmed, votes: 1 }];

  return { ...cycle, nominees, myNominee: existing?.name ?? trimmed };
}
