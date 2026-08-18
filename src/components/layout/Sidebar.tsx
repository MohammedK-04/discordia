"use client";

import { ChevronDown, Plus } from "lucide-react";
import { Avatar } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { currentUser } from "@/lib/data/people";
import layout from "./layout.module.css";
import { NAV_ITEMS, type TabName } from "./nav";

type SidebarProps = {
  tab: TabName;
  onTabChange: (tab: TabName) => void;
  onCreate: () => void;
};

export function Sidebar({ tab, onTabChange, onCreate }: SidebarProps) {
  return (
    <aside className={layout.sidebar}>
      <div className={layout.brand}>
        <img className={ui.brandMark} src="/dsd-crew.svg" alt="The DSD crew" />
        <div>
          <strong>DSD</strong>
          <small>MOVE TOGETHER</small>
        </div>
      </div>
      <nav className={layout.sidebarNav}>
        {NAV_ITEMS.map(({ name, icon: Icon, badge }) => (
          <button
            key={name}
            className={tab === name ? layout.navActive : ""}
            onClick={() => onTabChange(name)}
          >
            <Icon size={19} />
            {name}
            {badge !== undefined && (
              <span className={layout.navCount}>{badge}</span>
            )}
          </button>
        ))}
      </nav>
      <button className={`${ui.primaryButton} ${ui.block}`} onClick={onCreate}>
        <Plus size={18} /> Create activity
      </button>
      <div className={layout.profile}>
        <Avatar person={currentUser} />
        <div>
          <strong>Khalid A.</strong>
          <small>Member</small>
        </div>
        <ChevronDown size={17} />
      </div>
    </aside>
  );
}
