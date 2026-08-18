"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  HeartHandshake,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";
import { AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { monthNames } from "@/lib/constants/month-names";
import { calendarActivities } from "../data/calendar-activities";
import type { CalendarActivity } from "../types";
import styles from "../styles.module.css";

type CalendarViewProps = {
  onCreate: () => void;
  events?: CalendarActivity[];
};

function getEventIcon(event: CalendarActivity) {
  switch (event.iconName) {
    case "compass":
      return <Compass size={19} />;
    case "sparkles":
      return <Sparkles size={19} />;
    case "heart":
      return <HeartHandshake size={19} />;
    case "car":
      return <Car size={19} />;
  }
}

function getAgendaDateClass(kind: CalendarActivity["kind"]) {
  switch (kind) {
    case "casual":
      return styles.agendaDateCasual;
    case "planned":
      return styles.agendaDatePlanned;
    case "charity":
      return styles.agendaDateCharity;
    default:
      return "";
  }
}

function getAgendaIconClass(kind: CalendarActivity["kind"]) {
  switch (kind) {
    case "casual":
      return styles.agendaIconCasual;
    case "planned":
      return styles.agendaIconPlanned;
    case "charity":
      return styles.agendaIconCharity;
    default:
      return "";
  }
}

function getDesktopLabelClass(kind: CalendarActivity["kind"]) {
  switch (kind) {
    case "casual":
      return styles.desktopEventLabelCasual;
    case "planned":
      return styles.desktopEventLabelPlanned;
    case "charity":
      return styles.desktopEventLabelCharity;
    default:
      return "";
  }
}

export function CalendarView({
  onCreate,
  events = calendarActivities,
}: CalendarViewProps) {
  const [monthDate, setMonthDate] = useState({ month: 7, year: 2026 });
  const [selectedDay, setSelectedDay] = useState<number | null>(20);
  const firstWeekday = new Date(monthDate.year, monthDate.month, 1).getDay();
  const daysInMonth = new Date(
    monthDate.year,
    monthDate.month + 1,
    0,
  ).getDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthEvents = events.filter(
    (event) => event.month === monthDate.month && event.year === monthDate.year,
  );
  const selectedEvents = selectedDay
    ? monthEvents.filter((event) => event.day === selectedDay)
    : [];
  const agendaEvents = selectedEvents.length > 0 ? selectedEvents : monthEvents;

  const moveMonth = (amount: number) => {
    const date = new Date(monthDate.year, monthDate.month + amount, 1);
    setMonthDate({ month: date.getMonth(), year: date.getFullYear() });
    setSelectedDay(null);
  };

  return (
    <div className={styles.calendarPage}>
      <header className={styles.calendarHero}>
        <div>
          <span className={ui.eyebrow}>GROUP SCHEDULE</span>
          <h1>Calendar</h1>
          <p>Everything the group has coming up, in one place.</p>
        </div>
        <button
          className={`${ui.primaryButton} ${styles.addActivityButton}`}
          onClick={onCreate}
        >
          <Plus size={18} /> Add activity
        </button>
      </header>

      <div className={styles.calendarLayout}>
        <section className={`${ui.card} ${styles.monthCard}`}>
          <header className={styles.monthHeader}>
            <button
              className={ui.iconButton}
              onClick={() => moveMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={21} />
            </button>
            <div>
              <h2>
                {monthNames[monthDate.month]} {monthDate.year}
              </h2>
              <button
                onClick={() => {
                  setMonthDate({ month: 7, year: 2026 });
                  setSelectedDay(17);
                }}
              >
                Today
              </button>
            </div>
            <button
              className={ui.iconButton}
              onClick={() => moveMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={21} />
            </button>
          </header>

          <div className={styles.weekdayRow} aria-hidden="true">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {cells.map((day, index) => {
              const events = day
                ? monthEvents.filter((event) => event.day === day)
                : [];
              const isToday =
                day === 17 && monthDate.month === 7 && monthDate.year === 2026;
              return day ? (
                <button
                  key={`${day}-${index}`}
                  className={`${selectedDay === day ? styles.selected : ""} ${
                    isToday ? styles.today : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                  aria-label={`${monthNames[monthDate.month]} ${day}${
                    events.length ? `, ${events.length} activities` : ""
                  }`}
                >
                  <span className={styles.dayNumber}>{day}</span>
                  <span className={styles.eventDots}>
                    {events.map((event) => (
                      <i
                        key={event.id ?? event.title}
                        className={styles[event.kind]}
                        title={event.title}
                      />
                    ))}
                  </span>
                  {events[0] && (
                    <span
                      className={`${styles.desktopEventLabel} ${getDesktopLabelClass(events[0].kind)}`}
                    >
                      {events[0].title}
                    </span>
                  )}
                </button>
              ) : (
                <span className={styles.emptyDay} key={`empty-${index}`} />
              );
            })}
          </div>

          <div className={styles.calendarLegend}>
            <span>
              <i className={styles.recurring} /> Recurring
            </span>
            <span>
              <i className={styles.casual} /> Casual
            </span>
            <span>
              <i className={styles.planned} /> Planned
            </span>
            <span>
              <i className={styles.charity} /> Charity
            </span>
          </div>
        </section>

        <aside className={styles.agenda}>
          <div className={styles.agendaHeader}>
            <div>
              <span className={ui.eyebrow}>
                {selectedEvents.length
                  ? `${monthNames[monthDate.month]} ${selectedDay}`
                  : "THIS MONTH"}
              </span>
              <h2>{selectedEvents.length ? "On this day" : "Coming up"}</h2>
            </div>
            {selectedEvents.length > 0 && (
              <button
                className={ui.linkButton}
                onClick={() => setSelectedDay(null)}
              >
                Show all
              </button>
            )}
          </div>

          <div className={styles.agendaList}>
            {agendaEvents.length > 0 ? (
              agendaEvents.map((event) => (
                <article
                  className={`${ui.card} ${styles.agendaItem}`}
                  key={event.id ?? `${event.month}-${event.day}-${event.title}`}
                >
                  <div
                    className={`${styles.agendaDate} ${getAgendaDateClass(event.kind)}`}
                  >
                    <span>{monthNames[event.month].slice(0, 3)}</span>
                    <b>{event.day}</b>
                  </div>
                  <div className={styles.agendaBody}>
                    <div className={styles.agendaKind}>
                      <span
                        className={`${styles.agendaIcon} ${getAgendaIconClass(event.kind)}`}
                      >
                        {getEventIcon(event)}
                      </span>
                      <span>{event.kind}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>
                      <Clock3 size={15} /> {event.time}
                      <span className={styles.agendaDot} />
                      <MapPin size={15} /> {event.place}
                    </p>
                    <div className={styles.agendaFoot}>
                      <div className={ui.footMeta}>
                        <AvatarStack
                          count={3}
                          extra={Math.max(event.attendees - 3, 0)}
                        />
                        <span>{event.attendees} attending</span>
                      </div>
                      <button className={ui.linkButton}>
                        Details <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyAgenda}>
                <CalendarDays size={28} />
                <strong>No activities this month</strong>
                <p>Move to another month or add a new activity.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
