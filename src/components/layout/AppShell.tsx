"use client";

import { useEffect, useState } from "react";
import {
  applyAttendance,
  applyRoleReply,
  applyTripPay,
  CreateActivitySheet,
  ensureOpenWeek,
  msUntilNextMidnight,
  seedActivities,
  visibleActivities,
  type Activity,
  type RoleReply,
  type Rsvp,
} from "@/features/activities";
import { RoleSheet } from "@/features/attendance";
import {
  CalendarView,
  charityCalendarItems,
  type CalendarActivity,
} from "@/features/calendar";
import {
  CharityBoard,
  giveToCharity,
  nominateCharity,
  seedCharity,
} from "@/features/charity";
import {
  CreatePollSheet,
  Dashboard,
  makeNotice,
  seedNotices,
} from "@/features/dashboard";
import { PlansView } from "@/features/plans";
import { applyVote, createPoll, seedPolls, type Poll } from "@/features/polls";
import { currentUser } from "@/lib/data/people";
import { AppBar } from "./AppBar";
import type { TabName } from "./nav";
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
  const [now, setNow] = useState(() => new Date());
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [polls, setPolls] = useState<Poll[]>(seedPolls);
  const [charity, setCharity] = useState(seedCharity);
  const [notices, setNotices] = useState(seedNotices);
  const [pollOpen, setPollOpen] = useState(false);
  const [rolesId, setRolesId] = useState("planned-camping");

  useEffect(() => {
    const rollAtMidnight = window.setTimeout(
      () => setNow(new Date()),
      msUntilNextMidnight(now) + 50,
    );
    const onVisible = () => {
      if (document.visibilityState === "visible") setNow(new Date());
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(rollAtMidnight);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [now]);

  useEffect(() => {
    setActivities((current) => ensureOpenWeek(current, now));
  }, [now]);

  const note = (title: string, body: string) => {
    setNotices((current) => [makeNotice(title, body), ...current]);
  };

  const patchActivity = (
    id: string,
    next: (activity: Activity) => Activity,
  ) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id ? next(activity) : activity,
      ),
    );
  };

  const handleCreateCasual = (activity: Activity) => {
    setActivities((current) => [activity, ...current]);
    note("Hangout posted", `Emailed the group: ${activity.title}`);
  };

  const handleCreateRecurring = (instances: Activity[]) => {
    setActivities((current) => [...instances, ...current]);
    note(
      "Weekly plan posted",
      `Emailed the group: ${instances[0]?.title ?? "a weekly plan"} starts this week.`,
    );
  };

  const handleCreatePlanned = (activity: Activity) => {
    setActivities((current) => [activity, ...current]);
    note(
      "Trip posted",
      `Emailed the group: ${activity.title}. RSVP before picking roles.`,
    );
  };

  const handleRsvp = (id: string, rsvp: Exclude<Rsvp, null>) => {
    patchActivity(id, (activity) => applyAttendance(activity, rsvp));
  };

  const handleRoleReply = (id: string, roleName: string, reply: RoleReply) => {
    patchActivity(id, (activity) => applyRoleReply(activity, roleName, reply));
  };

  const handlePay = (id: string) => {
    patchActivity(id, applyTripPay);
    note("Trip fund", "Marked your share paid. Stripe checkout comes next.");
  };

  const openRoles = (id: string) => {
    setRolesId(id);
    onRolesOpen();
  };

  const handleVote = (pollId: string, option: string) => {
    setPolls((current) =>
      current.map((poll) =>
        poll.id === pollId ? applyVote(poll, option) : poll,
      ),
    );
  };

  const visible = visibleActivities(activities, now);
  const rolesActivity =
    activities.find((activity) => activity.id === rolesId) ?? null;

  const calendarEvents = [
    ...visible.map(toCalendarEvent),
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
              activities={visible}
              polls={polls}
              charity={charity}
              notices={notices}
              onCreate={onCreateOpen}
              onRoles={openRoles}
              onRsvp={handleRsvp}
              onPay={handlePay}
              onVote={handleVote}
              onNewPoll={() => setPollOpen(true)}
              onGive={() => {
                setCharity(giveToCharity);
                note(
                  "Sadaqa",
                  "Logged your gift. Payouts stay in the charity pot.",
                );
              }}
              onCharity={() => onTabChange("Charity")}
            />
          ) : tab === "Plans" ? (
            <PlansView
              activities={visible}
              onCreate={onCreateOpen}
              onRsvp={handleRsvp}
              onRoles={openRoles}
              onPay={handlePay}
            />
          ) : tab === "Calendar" ? (
            <CalendarView onCreate={onCreateOpen} events={calendarEvents} />
          ) : (
            <CharityBoard
              cycle={charity}
              onGive={() => {
                setCharity(giveToCharity);
                note(
                  "Sadaqa",
                  "Logged your gift. Payouts stay in the charity pot.",
                );
              }}
              onNominate={(name) =>
                setCharity((current) => nominateCharity(current, name))
              }
            />
          )}
        </div>
      </main>

      <TabBar tab={tab} onTabChange={onTabChange} onCreate={onCreateOpen} />

      <CreateActivitySheet
        open={createOpen}
        onClose={onCreateClose}
        onCreateCasual={handleCreateCasual}
        onCreateRecurring={handleCreateRecurring}
        onCreatePlanned={handleCreatePlanned}
      />
      <CreatePollSheet
        open={pollOpen}
        onClose={() => setPollOpen(false)}
        onCreate={(question, options) => {
          setPolls((current) => [
            createPoll(question, options, currentUser),
            ...current,
          ]);
          note("New poll", `Emailed the group: ${question}`);
        }}
      />
      <RoleSheet
        open={rolesOpen}
        activity={rolesActivity}
        onClose={onRolesClose}
        onAttendance={handleRsvp}
        onRoleReply={handleRoleReply}
      />
    </div>
  );
}

export type { TabName } from "./nav";
