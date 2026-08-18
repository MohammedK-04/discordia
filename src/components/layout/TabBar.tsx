"use client";

import { Plus } from "lucide-react";
import layout from "./layout.module.css";
import { NAV_ITEMS, type TabName } from "./nav";

type TabBarProps = {
  tab: TabName;
  onTabChange: (tab: TabName) => void;
  onCreate: () => void;
};

export function TabBar({ tab, onTabChange, onCreate }: TabBarProps) {
  return (
    <nav className={layout.tabBar}>
      {NAV_ITEMS.slice(0, 2).map(({ name, icon: Icon }) => (
        <button
          key={name}
          className={tab === name ? layout.tabActive : ""}
          onClick={() => onTabChange(name)}
        >
          <Icon size={22} />
          {name}
        </button>
      ))}
      <button className={layout.tabFab} onClick={onCreate}>
        <Plus size={26} />
        <span className="srOnly">Create activity</span>
      </button>
      {NAV_ITEMS.slice(2).map(({ name, icon: Icon }) => (
        <button
          key={name}
          className={tab === name ? layout.tabActive : ""}
          onClick={() => onTabChange(name)}
        >
          <Icon size={22} />
          {name}
        </button>
      ))}
    </nav>
  );
}
