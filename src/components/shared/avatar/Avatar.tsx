"use client";

import type { Person } from "@/lib/types/person";
import ui from "@/components/shared/styles.module.css";

type AvatarProps = {
  person: Person;
  small?: boolean;
};

export function Avatar({ person, small = false }: AvatarProps) {
  return (
    <span
      className={`${ui.avatar} ${small ? ui.avatarSmall : ""}`}
      style={{ background: person.color }}
      title={person.name}
    >
      {person.initials}
    </span>
  );
}
