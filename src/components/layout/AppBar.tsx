"use client";

import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { currentUser } from "@/lib/data/people";
import layout from "./layout.module.css";

export function AppBar() {
  return (
    <header className={layout.appBar}>
      <span className={layout.appBarBrand}>
        <img className={ui.brandMark} src="/dsd-crew.svg" alt="The DSD crew" />
        DSD
      </span>
      <button className={ui.iconButton} aria-label="Search">
        <Search size={21} />
      </button>
      <button
        className={`${ui.iconButton} ${ui.iconButtonHasDot}`}
        aria-label="Notifications"
      >
        <Bell size={21} />
      </button>
      <button className={ui.avatarButton} aria-label="Your profile">
        <Avatar person={currentUser} small />
      </button>
    </header>
  );
}
