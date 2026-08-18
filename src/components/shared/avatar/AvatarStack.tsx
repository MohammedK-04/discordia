"use client";

import { people } from "@/lib/data/people";
import type { Person } from "@/lib/types/person";
import ui from "@/components/shared/styles.module.css";
import { Avatar } from "./Avatar";

type AvatarStackProps = {
  count?: number;
  extra?: number;
  list?: Person[];
};

export function AvatarStack({ count = 4, extra = 3, list }: AvatarStackProps) {
  const shown = list ?? people.slice(0, count);

  return (
    <div className={ui.avatarStack}>
      {shown.map((person) => (
        <Avatar key={person.name} person={person} small />
      ))}
      {extra > 0 && (
        <span className={`${ui.avatar} ${ui.avatarSmall} ${ui.avatarMore}`}>
          +{extra}
        </span>
      )}
    </div>
  );
}
