"use client";

import { useState } from "react";
import {
  applyRsvp,
  CreateActivitySheet,
  seedActivities,
  type Activity,
  type Rsvp,
} from "@/features/activities";
import { RoleSheet } from "@/features/attendance";
import {
  CalendarView,
  charityCalendarItems,
  type CalendarActivity,
} from "@/features/calendar";
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

function toCalendarEvent(activity: Activity): CalendarActivity {
  const kind =
    activity.kind === "Casual"
      ? "casual"
      : activity.kind === "Recurring"
        ? "recurring"
        : "planned";

  return {
    id: activity.id,
    day: activity.day,
    month: activity.month,
    year: activity.year,
    title: activity.title,
    time: activity.time,
    place: activity.place,
    kind,
    iconName:
      activity.kind === "Casual"
        ? "sparkles"
        : activity.kind === "Recurring"
          ? "compass"
          : "car",
    attendees: activity.goingCount,
  };
}

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
  const [activities, setActivities] = useState<Activity[]>(seedActivities);

  const handleCreateCasual = (activity: Activity) => {
    setActivities((current) => [activity, ...current]);
  };

  const handleRsvp = (id: string, rsvp: Exclude<Rsvp, null>) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id ? applyRsvp(activity, rsvp) : activity,
      ),
    );
  };

  const calendarEvents = [
    ...activities.map(toCalendarEvent),
    ...charityCalendarItems,
  ];

  return (
    <div className={layout.appShell}>
      <Sidebar tab={tab} onTabChange={onTabChange} onCreate={onCreateOpen} />

      <main className={layout.main}>
        <AppBar />

        <div className={layout.content}>
          {tab === "Home" ? (
            <Dashboard
              activities={activities}
              onCreate={onCreateOpen}
              onRoles={onRolesOpen}
              onRsvp={handleRsvp}
            />
          ) : tab === "Calendar" ? (
            <CalendarView onCreate={onCreateOpen} events={calendarEvents} />
          ) : (
            <PlaceholderView tab={tab} onGoHome={() => onTabChange("Home")} />
          )}
        </div>
      </main>

      <TabBar tab={tab} onTabChange={onTabChange} onCreate={onCreateOpen} />

      <CreateActivitySheet
        open={createOpen}
        onClose={onCreateClose}
        onCreateCasual={handleCreateCasual}
      />
      <RoleSheet open={rolesOpen} onClose={onRolesClose} />
    </div>
  );
}

export type { TabName } from "./nav";
