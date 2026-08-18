export type Notice = {
  id: string;
  title: string;
  body: string;
};

export function makeNotice(title: string, body: string): Notice {
  return { id: `notice-${Date.now()}-${title}`, title, body };
}

export const seedNotices: Notice[] = [
  {
    id: "notice-welcome",
    title: "Invite email ready",
    body: "DSD is invite-only. We’ll email your guest a link when you invite them.",
  },
];
