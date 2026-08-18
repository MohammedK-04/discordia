"use client";

import { CreateActivitySheet } from "@/features/activities";
import { RoleSheet } from "@/features/attendance";
import { CalendarView } from "@/features/calendar";
import { Dashboard } from "@/features/dashboard";
import { AppBar } from "./AppBar";
import type { TabName } from "./nav";
import { PlaceholderView } from "./PlaceholderView";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import layout from "./layout.module.css";

type AppShellProps = {
  tab: TabName;
  onTabChange: (tab: TabName) => void;
  createOpen: boolean;
  onCreateOpen: () => void;
  onCreateClose: () => void;
  rolesOpen: boolean;
  onRolesOpen: () => void;
  onRolesClose: () => void;
};

export function AppShell({
  tab,
  onTabChange,
  createOpen,
  onCreateOpen,
  onCreateClose,
  rolesOpen,
  onRolesOpen,
  onRolesClose,
}: AppShellProps) {
  return (
    <div className={layout.appShell}>
      <Sidebar tab={tab} onTabChange={onTabChange} onCreate={onCreateOpen} />

      <main className={layout.main}>
        <AppBar />

        <div className={layout.content}>
          {tab === "Home" ? (
            <Dashboard onCreate={onCreateOpen} onRoles={onRolesOpen} />
          ) : tab === "Calendar" ? (
            <CalendarView onCreate={onCreateOpen} />
          ) : (
            <PlaceholderView tab={tab} onGoHome={() => onTabChange("Home")} />
          )}
        </div>
      </main>

      <TabBar tab={tab} onTabChange={onTabChange} onCreate={onCreateOpen} />

      <CreateActivitySheet open={createOpen} onClose={onCreateClose} />
      <RoleSheet open={rolesOpen} onClose={onRolesClose} />
    </div>
  );
}

export type { TabName } from "./nav";
