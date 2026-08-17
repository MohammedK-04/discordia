"use client";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  HeartHandshake,
  Home,
  MapPin,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type ActivityKind = "Casual" | "Recurring" | "Planned";
type Attention = "Whenever" | "Respond soon" | "Action required";
type RoleReply = "in" | "maybe" | null;

const people = [
  { initials: "KA", name: "Khalid", color: "#a7c7ff" },
  { initials: "OH", name: "Omar", color: "#ffd4a8" },
  { initials: "YA", name: "Yusuf", color: "#c8e6c0" },
  { initials: "IH", name: "Ibrahim", color: "#e0c1ff" },
  { initials: "MA", name: "Mahad", color: "#ffc5d3" },
];

const kindMeta: Record<ActivityKind, { icon: string; copy: string }> = {
  Casual: { icon: "✦", copy: "Quick hangout. Post it in seconds." },
  Recurring: { icon: "↻", copy: "Repeats on a rhythm, like Thursday soccer." },
  Planned: { icon: "◇", copy: "Roles, money, deadlines. Camping and trips." },
};

const attentionMeta: Record<Attention, string> = {
  Whenever: "Stays quiet. No reminders sent.",
  "Respond soon": "One nudge before your deadline.",
  "Action required": "Pinned up top with reminders until people answer.",
};

function Avatar({
  person,
  small = false,
}: {
  person: (typeof people)[number];
  small?: boolean;
}) {
  return (
    <span
      className={`avatar ${small ? "avatarSmall" : ""}`}
      style={{ background: person.color }}
      title={person.name}
    >
      {person.initials}
    </span>
  );
}

function AvatarStack({
  count = 4,
  extra = 3,
  list,
}: {
  count?: number;
  extra?: number;
  list?: (typeof people)[number][];
}) {
  const shown = list ?? people.slice(0, count);

  return (
    <div className="avatarStack">
      {shown.map((person) => (
        <Avatar key={person.name} person={person} small />
      ))}
      {extra > 0 && <span className="avatar avatarSmall avatarMore">+{extra}</span>}
    </div>
  );
}

function Sheet({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="sheetBackdrop" onPointerDown={onClose}>
      <section
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <span className="sheetGrip" />
        <header className="sheetHead">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button className="iconButton" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </header>
        <div className="sheetBody">{children}</div>
        <footer className="sheetFoot">{footer}</footer>
      </section>
    </div>
  );
}

function CreateActivitySheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState<ActivityKind>("Casual");
  const [attention, setAttention] = useState<Attention>("Whenever");
  const [roles, setRoles] = useState(false);
  const [funding, setFunding] = useState(false);

  const needsSetup = kind !== "Casual";
  const lastStep = needsSetup ? 2 : 1;

  const close = () => {
    onClose();
    setStep(1);
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow="NEW ACTIVITY"
      title={step === 1 ? "What are we doing?" : "Set up the details"}
      footer={
        <>
          {step === 2 && (
            <button className="ghostButton" onClick={() => setStep(1)}>
              Back
            </button>
          )}
          <button
            className="primaryButton block"
            onClick={() => (step < lastStep ? setStep(2) : close())}
          >
            {step < lastStep ? "Continue" : "Post to the group"}
            {step < lastStep ? <ArrowRight size={18} /> : <Check size={18} />}
          </button>
        </>
      }
    >
      <div className="stepLine">
        <span className="active" />
        <span className={step >= 2 ? "active" : ""} />
      </div>

      {step === 1 ? (
        <>
          <label className="fieldLabel" htmlFor="activityName">
            Activity name
          </label>
          <input
            id="activityName"
            className="textInput"
            placeholder="Dinner after soccer"
          />

          <p className="fieldLabel">What kind of plan is this?</p>
          <div className="optionList">
            {(Object.keys(kindMeta) as ActivityKind[]).map((item) => (
              <button
                key={item}
                className={`optionRow ${kind === item ? "selected" : ""}`}
                onClick={() => setKind(item)}
              >
                <span className="optionIcon">{kindMeta[item].icon}</span>
                <span className="optionText">
                  <strong>{item}</strong>
                  <small>{kindMeta[item].copy}</small>
                </span>
                <span className="radio">{kind === item && <Check size={14} />}</span>
              </button>
            ))}
          </div>

          <p className="fieldLabel">How soon do people need to act?</p>
          <div className="optionList">
            {(Object.keys(attentionMeta) as Attention[]).map((item) => (
              <button
                key={item}
                className={`optionRow tight ${attention === item ? "selected" : ""}`}
                onClick={() => setAttention(item)}
              >
                <span className="optionText">
                  <strong>{item}</strong>
                  <small>{attentionMeta[item]}</small>
                </span>
                <span className="radio">
                  {attention === item && <Check size={14} />}
                </span>
              </button>
            ))}
          </div>

          {kind === "Casual" && (
            <p className="helper">
              Casual plans skip setup — post it now and let people show up.
            </p>
          )}
        </>
      ) : (
        <>
          <label className="fieldLabel" htmlFor="activityDate">
            Date
          </label>
          <div className="inputWithIcon">
            <CalendarDays size={19} />
            <input id="activityDate" defaultValue="Aug 29, 2026" />
          </div>

          <label className="fieldLabel" htmlFor="activityTime">
            Time
          </label>
          <div className="inputWithIcon">
            <Clock3 size={19} />
            <input id="activityTime" defaultValue="9:00 AM" />
          </div>

          <label className="fieldLabel" htmlFor="activityPlace">
            Location
          </label>
          <div className="inputWithIcon">
            <MapPin size={19} />
            <input id="activityPlace" placeholder="Add a place or address" />
          </div>

          <div className="toggleRow">
            <span className="toggleIcon lilac">
              <Users size={20} />
            </span>
            <span className="toggleText">
              <strong>Assign roles</strong>
              <small>Drivers, cooks, gear — say how many you need.</small>
            </span>
            <button
              className={`switch ${roles ? "on" : ""}`}
              onClick={() => setRoles(!roles)}
              aria-pressed={roles}
              aria-label="Assign roles"
            >
              <span />
            </button>
          </div>

          {roles && (
            <div className="roleBuilder">
              <div className="roleBuilderRow">
                <Car size={18} />
                <input defaultValue="Drivers" aria-label="Role name" />
                <span className="countPill">4 needed</span>
              </div>
              <div className="roleBuilderRow">
                <Utensils size={18} />
                <input defaultValue="Cooks" aria-label="Role name" />
                <span className="countPill">2 needed</span>
              </div>
              <button className="addRole">
                <Plus size={17} /> Add another role
              </button>
              <p>
                Members can claim a role, join the waitlist, or mark “maybe” with a
                decide-by date. We email them when that date hits.
              </p>
            </div>
          )}

          <div className="toggleRow">
            <span className="toggleIcon mint">
              <CircleDollarSign size={20} />
            </span>
            <span className="toggleText">
              <strong>Attach group funding</strong>
              <small>Set a goal, or require an amount per person.</small>
            </span>
            <button
              className={`switch ${funding ? "on" : ""}`}
              onClick={() => setFunding(!funding)}
              aria-pressed={funding}
              aria-label="Attach group funding"
            >
              <span />
            </button>
          </div>

          {funding && (
            <div className="fundingBuilder">
              <div>
                <label className="fieldLabel" htmlFor="fundGoal">
                  Goal
                </label>
                <div className="inputWithIcon">
                  <CircleDollarSign size={18} />
                  <input id="fundGoal" defaultValue="1,200" inputMode="decimal" />
                </div>
              </div>
              <div>
                <label className="fieldLabel" htmlFor="fundShare">
                  Per person
                </label>
                <div className="inputWithIcon">
                  <CircleDollarSign size={18} />
                  <input id="fundShare" defaultValue="60" inputMode="decimal" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Sheet>
  );
}

function RoleSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [reply, setReply] = useState<Record<string, RoleReply>>({
    Drivers: null,
    Cooks: null,
  });

  const close = () => {
    onClose();
    setAttendance(null);
    setReply({ Drivers: null, Cooks: null });
  };

  const roles = [
    {
      name: "Drivers",
      icon: <Car size={19} />,
      filled: 2,
      needed: 4,
      claimed: [people[1], people[3]],
      note: "Trunk space for two tents",
    },
    {
      name: "Cooks",
      icon: <Utensils size={19} />,
      filled: 1,
      needed: 2,
      claimed: [people[2]],
      note: "Saturday dinner for 12",
    },
  ];

  return (
    <Sheet
      open={open}
      onClose={close}
      eyebrow="NORTH SHORE CAMPING"
      title={attendance === "yes" ? "Pick up a role" : "Are you coming?"}
      footer={
        <button
          className="primaryButton block"
          onClick={close}
          disabled={attendance === null}
        >
          {attendance === "yes"
            ? "Save attendance & roles"
            : attendance === "no"
              ? "Send my response"
              : "Choose Yes or No"}
        </button>
      }
    >
      <div className="attendanceQuestion">
        <div>
          <strong>Will you attend this activity?</strong>
          <span>Aug 29–31 · Tettegouche State Park</span>
        </div>
        <div className="attendanceButtons">
          <button
            className={attendance === "yes" ? "yes selected" : "yes"}
            onClick={() => setAttendance("yes")}
            aria-pressed={attendance === "yes"}
          >
            <Check size={19} /> Yes, I’m going
          </button>
          <button
            className={attendance === "no" ? "no selected" : "no"}
            onClick={() => setAttendance("no")}
            aria-pressed={attendance === "no"}
          >
            <X size={19} /> No, I can’t
          </button>
        </div>
      </div>

      {attendance === null && (
        <div className="attendancePrompt">
          <CalendarDays size={24} />
          <strong>Answer attendance first</strong>
          <p>
            Once you say yes, you can volunteer for any roles the group still
            needs.
          </p>
        </div>
      )}

      {attendance === "no" && (
        <div className="declineCard">
          <span className="declineIcon">
            <Check size={22} />
          </span>
          <div>
            <strong>Thanks for letting the group know.</strong>
            <p>You won’t be asked to take a role or contribute to this plan.</p>
          </div>
        </div>
      )}

      {attendance === "yes" && (
        <>
          <div className="deadlineNote">
            <Clock3 size={18} />
            <span>
              Great — now choose a role if you can. Organizer locks roles{" "}
              <strong>Aug 22 at 5:00 PM</strong>.
            </span>
          </div>

          {roles.map((role) => (
            <article key={role.name} className="roleCard">
              <header>
                <span className="roleIcon">{role.icon}</span>
                <div>
                  <strong>{role.name}</strong>
                  <small>{role.note}</small>
                </div>
                <span className="roleCount">
                  {role.filled}/{role.needed}
                </span>
              </header>
              <div className="progress">
                <span style={{ width: `${(role.filled / role.needed) * 100}%` }} />
              </div>
              <div className="claimedRow">
                <AvatarStack list={role.claimed} extra={0} />
                <span>
                  {role.claimed.map((person) => person.name).join(", ")} claimed
                </span>
              </div>
              <div className="replyButtons">
                <button
                  className={reply[role.name] === "in" ? "yes selected" : "yes"}
                  onClick={() =>
                    setReply({
                      ...reply,
                      [role.name]: reply[role.name] === "in" ? null : "in",
                    })
                  }
                >
                  <Check size={17} /> I’ve got it
                </button>
                <button
                  className={
                    reply[role.name] === "maybe" ? "maybe selected" : "maybe"
                  }
                  onClick={() =>
                    setReply({
                      ...reply,
                      [role.name]: reply[role.name] === "maybe" ? null : "maybe",
                    })
                  }
                >
                  <Clock3 size={17} /> Maybe
                </button>
              </div>
              {reply[role.name] === "maybe" && (
                <div className="maybeDetail">
                  <span>I’ll confirm by</span>
                  <input defaultValue="Aug 21, 5:00 PM" aria-label="Decide by" />
                </div>
              )}
            </article>
          ))}

          <div className="waitlistCard">
            <strong>Waitlist</strong>
            <p>
              3 people are waiting in case a driver drops. You’ll be first in line
              if someone backs out.
            </p>
            <button className="ghostButton block">Join the waitlist</button>
          </div>
        </>
      )}
    </Sheet>
  );
}

function QuickPollCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const options: [string, number, number][] = [
    ["Nashville Coop", 8, 58],
    ["Afro Deli", 4, 29],
    ["Dave’s Hot Chicken", 2, 13],
  ];

  return (
    <article className="card pollCard">
      <div className="cardHead">
        <span className="liveBadge">
          <span /> QUICK DECISION
        </span>
        <span className="timeLeft">Closes 8:30 PM</span>
      </div>
      <h3>Food after soccer tonight?</h3>
      <p className="sub">Started by Yusuf · 14 votes</p>
      <div className="pollOptions">
        {options.map(([name, votes, percent]) => (
          <button
            key={name}
            className={`pollOption ${selected === name ? "voted" : ""}`}
            onClick={() => setSelected(name)}
          >
            <span className="pollFill" style={{ width: `${percent}%` }} />
            <span className="pollName">
              <span className="radio small">
                {selected === name && <Check size={13} />}
              </span>
              {name}
            </span>
            <span className="pollVotes">{votes}</span>
          </button>
        ))}
      </div>
      <div className="cardFoot">
        <div className="footMeta">
          <AvatarStack count={3} extra={8} />
          <span>11 friends voted</span>
        </div>
        <button className="linkButton">
          Details <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

function Dashboard({
  onCreate,
  onRoles,
}: {
  onCreate: () => void;
  onRoles: () => void;
}) {
  return (
    <>
      <header className="greeting">
        <span className="eyebrow">MONDAY, AUGUST 17</span>
        <h1>Good evening, Khalid.</h1>
        <p>Here’s what the group is moving on.</p>
      </header>

      <button className="attentionCard" onClick={onRoles}>
        <span className="attentionIcon">
          <Bell size={19} />
        </span>
        <span className="attentionText">
          <strong>2 things need you</strong>
          <small>Camping roles close tomorrow · Soccer RSVP due today</small>
        </span>
        <ArrowRight size={18} />
      </button>

      <div className="sectionHead">
        <div>
          <span className="eyebrow">DECIDE TODAY</span>
          <h2>Quick decisions</h2>
        </div>
        <button className="outlineButton">
          <Plus size={16} /> New poll
        </button>
      </div>

      <div className="pollGrid">
        <QuickPollCard />
        <article className="card pollCard">
          <div className="cardHead">
            <span className="liveBadge violet">
              <Clock3 size={13} /> 37 MIN LEFT
            </span>
          </div>
          <h3>Which field for Thursday?</h3>
          <p className="sub">Started by Omar · 9 votes</p>
          <div className="pollOptions">
            <button className="pollOption">
              <span className="pollFill" style={{ width: "67%" }} />
              <span className="pollName">
                <span className="radio small" />
                Bossen Field
              </span>
              <span className="pollVotes">6</span>
            </button>
            <button className="pollOption">
              <span className="pollFill" style={{ width: "33%" }} />
              <span className="pollName">
                <span className="radio small" />
                Currie Park
              </span>
              <span className="pollVotes">3</span>
            </button>
          </div>
          <div className="cardFoot">
            <div className="footMeta">
              <AvatarStack count={3} extra={6} />
              <span>9 friends voted</span>
            </div>
            <button className="linkButton">
              Details <ArrowRight size={15} />
            </button>
          </div>
        </article>
      </div>

      <div className="sectionHead">
        <div>
          <span className="eyebrow">COMING UP</span>
          <h2>Activities</h2>
        </div>
        <button className="linkButton">
          View all <ArrowRight size={15} />
        </button>
      </div>

      <div className="activityGrid">
        <article className="card activityCard">
          <div className="activityImage campingImage">
            <div className="cardTags">
              <span className="tag action">ACTION REQUIRED</span>
              <span className="tag planned">PLANNED TRIP</span>
            </div>
            <div className="dateTile">
              <b>29</b>
              <span>AUG</span>
            </div>
          </div>
          <div className="activityBody">
            <div className="hostLine">
              <Avatar person={people[1]} small />
              <span>Organized by Omar</span>
            </div>
            <h3>North Shore Camping Weekend</h3>
            <p className="detailLine">
              <CalendarDays size={16} /> Aug 29–31
              <span className="dot" />
              <MapPin size={16} /> Tettegouche
            </p>
            <div className="panel">
              <div className="panelTop">
                <span>Roles filled</span>
                <b>8 of 12</b>
              </div>
              <div className="progress">
                <span style={{ width: "66%" }} />
              </div>
              <div className="needList">
                <span>
                  <Car size={15} /> 2 drivers
                </span>
                <span>
                  <Utensils size={15} /> 1 cook
                </span>
                <span className="maybeChip">3 maybes</span>
              </div>
            </div>
            <button className="primaryButton block" onClick={onRoles}>
              Pick up a role <ArrowRight size={17} />
            </button>
            <div className="cardFoot">
              <div className="footMeta">
                <AvatarStack count={4} extra={4} />
                <span>12 going</span>
              </div>
              <span className="deadline">Locks Aug 22, 5 PM</span>
            </div>
          </div>
        </article>

        <article className="card activityCard">
          <div className="activityImage soccerImage">
            <div className="cardTags">
              <span className="tag recurring">↻ RECURRING</span>
            </div>
            <div className="dateTile">
              <b>20</b>
              <span>AUG</span>
            </div>
          </div>
          <div className="activityBody">
            <div className="hostLine">
              <Avatar person={people[2]} small />
              <span>Hosted by Yusuf</span>
            </div>
            <h3>Thursday Night Soccer</h3>
            <p className="detailLine">
              <Clock3 size={16} /> 7:00 PM
              <span className="dot" />
              <MapPin size={16} /> Bossen Field
            </p>
            <div className="panel lime">
              <div className="panelTop">
                <span>11 going</span>
                <b>Need 3 more</b>
              </div>
              <div className="progress">
                <span style={{ width: "78%" }} />
              </div>
            </div>
            <div className="splitButtons">
              <button className="primaryButton">I’m in</button>
              <button className="outlineButton">Can’t make it</button>
            </div>
            <div className="cardFoot">
              <div className="footMeta">
                <AvatarStack count={4} extra={7} />
                <span>Weekly run</span>
              </div>
              <span className="deadline">RSVP by 5:00 PM</span>
            </div>
          </div>
        </article>

        <article className="card activityCard">
          <div className="activityImage hangoutImage">
            <div className="cardTags">
              <span className="tag casual">✦ CASUAL</span>
            </div>
            <div className="dateTile">
              <b>22</b>
              <span>AUG</span>
            </div>
          </div>
          <div className="activityBody">
            <div className="hostLine">
              <Avatar person={people[3]} small />
              <span>Hosted by Ibrahim</span>
            </div>
            <h3>Backyard Grill & Hangout</h3>
            <p className="detailLine">
              <Clock3 size={16} /> 6:30 PM
              <span className="dot" />
              <MapPin size={16} /> Ibrahim’s place
            </p>
            <div className="casualNote">
              <Sparkles size={18} />
              <span>No roles, no pressure. Bring something if you want.</span>
            </div>
            <div className="splitButtons">
              <button className="primaryButton">Going</button>
              <button className="outlineButton">Maybe</button>
            </div>
          </div>
        </article>
      </div>

      <div className="sectionHead">
        <div>
          <span className="eyebrow">GIVING TOGETHER</span>
          <h2>Charity</h2>
        </div>
      </div>

      <div className="charityGrid">
        <section className="card charityCard">
          <div className="fundTop">
            <span className="charityIcon">
              <HeartHandshake size={22} />
            </span>
            <div>
              <span className="eyebrow">AUGUST SADAQA</span>
              <strong>Help furnish a family’s new home</strong>
            </div>
          </div>
          <p className="sub">$1,420 raised by 18 friends · 4 days left to give</p>
          <div className="progress rose">
            <span style={{ width: "84%" }} />
          </div>
          <div className="splitButtons">
            <button className="darkButton">Give now</button>
            <button className="outlineButton">Nominate</button>
          </div>
        </section>
      </div>

      <section className="card inviteRow">
        <span className="inviteIcon">
          <UserPlus size={20} />
        </span>
        <div>
          <strong>DSD is invite only</strong>
          <small>Bring in someone you trust. They’ll need your invite link.</small>
        </div>
        <button className="outlineButton">Invite</button>
      </section>
    </>
  );
}

type CalendarActivity = {
  day: number;
  month: number;
  year: number;
  title: string;
  time: string;
  place: string;
  kind: "recurring" | "casual" | "planned" | "charity";
  icon: React.ReactNode;
  attendees: number;
};

const calendarActivities: CalendarActivity[] = [
  {
    day: 20,
    month: 7,
    year: 2026,
    title: "Thursday Night Soccer",
    time: "7:00 PM",
    place: "Bossen Field",
    kind: "recurring",
    icon: <Compass size={19} />,
    attendees: 11,
  },
  {
    day: 22,
    month: 7,
    year: 2026,
    title: "Backyard Grill & Hangout",
    time: "6:30 PM",
    place: "Ibrahim’s place",
    kind: "casual",
    icon: <Sparkles size={19} />,
    attendees: 8,
  },
  {
    day: 25,
    month: 7,
    year: 2026,
    title: "August Sadaqa closes",
    time: "10:00 PM",
    place: "Online",
    kind: "charity",
    icon: <HeartHandshake size={19} />,
    attendees: 18,
  },
  {
    day: 29,
    month: 7,
    year: 2026,
    title: "North Shore Camping Weekend",
    time: "9:00 AM",
    place: "Tettegouche State Park",
    kind: "planned",
    icon: <Car size={19} />,
    attendees: 12,
  },
  {
    day: 3,
    month: 8,
    year: 2026,
    title: "Thursday Night Soccer",
    time: "7:00 PM",
    place: "Bossen Field",
    kind: "recurring",
    icon: <Compass size={19} />,
    attendees: 9,
  },
  {
    day: 6,
    month: 8,
    year: 2026,
    title: "Coffee & catch-up",
    time: "4:00 PM",
    place: "FRGMNT Coffee",
    kind: "casual",
    icon: <Sparkles size={19} />,
    attendees: 6,
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CalendarView({ onCreate }: { onCreate: () => void }) {
  const [monthDate, setMonthDate] = useState({ month: 7, year: 2026 });
  const [selectedDay, setSelectedDay] = useState<number | null>(20);
  const firstWeekday = new Date(
    monthDate.year,
    monthDate.month,
    1,
  ).getDay();
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

  const monthEvents = calendarActivities.filter(
    (event) =>
      event.month === monthDate.month && event.year === monthDate.year,
  );
  const selectedEvents = selectedDay
    ? monthEvents.filter((event) => event.day === selectedDay)
    : [];
  const agendaEvents =
    selectedEvents.length > 0 ? selectedEvents : monthEvents;

  const moveMonth = (amount: number) => {
    const date = new Date(monthDate.year, monthDate.month + amount, 1);
    setMonthDate({ month: date.getMonth(), year: date.getFullYear() });
    setSelectedDay(null);
  };

  return (
    <div className="calendarPage">
      <header className="calendarHero">
        <div>
          <span className="eyebrow">GROUP SCHEDULE</span>
          <h1>Calendar</h1>
          <p>Everything the group has coming up, in one place.</p>
        </div>
        <button className="primaryButton" onClick={onCreate}>
          <Plus size={18} /> Add activity
        </button>
      </header>

      <div className="calendarLayout">
        <section className="card monthCard">
          <header className="monthHeader">
            <button
              className="iconButton"
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
              className="iconButton"
              onClick={() => moveMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={21} />
            </button>
          </header>

          <div className="weekdayRow" aria-hidden="true">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>

          <div className="calendarGrid">
            {cells.map((day, index) => {
              const events = day
                ? monthEvents.filter((event) => event.day === day)
                : [];
              const isToday =
                day === 17 &&
                monthDate.month === 7 &&
                monthDate.year === 2026;
              return day ? (
                <button
                  key={`${day}-${index}`}
                  className={`${selectedDay === day ? "selected" : ""} ${
                    isToday ? "today" : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                  aria-label={`${monthNames[monthDate.month]} ${day}${
                    events.length ? `, ${events.length} activities` : ""
                  }`}
                >
                  <span className="dayNumber">{day}</span>
                  <span className="eventDots">
                    {events.map((event) => (
                      <i
                        key={event.title}
                        className={event.kind}
                        title={event.title}
                      />
                    ))}
                  </span>
                  {events[0] && (
                    <span className={`desktopEventLabel ${events[0].kind}`}>
                      {events[0].title}
                    </span>
                  )}
                </button>
              ) : (
                <span className="emptyDay" key={`empty-${index}`} />
              );
            })}
          </div>

          <div className="calendarLegend">
            <span><i className="recurring" /> Recurring</span>
            <span><i className="casual" /> Casual</span>
            <span><i className="planned" /> Planned</span>
            <span><i className="charity" /> Charity</span>
          </div>
        </section>

        <aside className="agenda">
          <div className="agendaHeader">
            <div>
              <span className="eyebrow">
                {selectedEvents.length
                  ? `${monthNames[monthDate.month]} ${selectedDay}`
                  : "THIS MONTH"}
              </span>
              <h2>
                {selectedEvents.length ? "On this day" : "Coming up"}
              </h2>
            </div>
            {selectedEvents.length > 0 && (
              <button className="linkButton" onClick={() => setSelectedDay(null)}>
                Show all
              </button>
            )}
          </div>

          <div className="agendaList">
            {agendaEvents.length > 0 ? (
              agendaEvents.map((event) => (
                <article className="card agendaItem" key={`${event.month}-${event.day}-${event.title}`}>
                  <div className={`agendaDate ${event.kind}`}>
                    <span>{monthNames[event.month].slice(0, 3)}</span>
                    <b>{event.day}</b>
                  </div>
                  <div className="agendaBody">
                    <div className="agendaKind">
                      <span className={`agendaIcon ${event.kind}`}>
                        {event.icon}
                      </span>
                      <span>{event.kind}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>
                      <Clock3 size={15} /> {event.time}
                      <span className="dot" />
                      <MapPin size={15} /> {event.place}
                    </p>
                    <div className="agendaFoot">
                      <div className="footMeta">
                        <AvatarStack count={3} extra={Math.max(event.attendees - 3, 0)} />
                        <span>{event.attendees} attending</span>
                      </div>
                      <button className="linkButton">
                        Details <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="emptyAgenda">
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

export default function Page() {
  const [tab, setTab] = useState("Home");
  const [createOpen, setCreateOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  const tabs = [
    ["Home", Home],
    ["Plans", Compass],
    ["Calendar", CalendarDays],
    ["Charity", HeartHandshake],
  ] as const;

  const desktopNav = [
    ["Home", Home],
    ["Plans", Compass],
    ["Calendar", CalendarDays],
    ["Charity", HeartHandshake],
  ] as const;

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <img className="brandMark" src="/dsd-crew.png" alt="The DSD crew" />
          <div>
            <strong>DSD</strong>
            <small>MOVE TOGETHER</small>
          </div>
        </div>
        <nav>
          {desktopNav.map(([name, Icon]) => (
            <button
              key={name}
              className={tab === name ? "active" : ""}
              onClick={() => setTab(name)}
            >
              <Icon size={19} />
              {name}
              {name === "Plans" && <span className="navCount">3</span>}
            </button>
          ))}
        </nav>
        <button className="primaryButton block" onClick={() => setCreateOpen(true)}>
          <Plus size={18} /> Create activity
        </button>
        <div className="profile">
          <Avatar person={people[0]} />
          <div>
            <strong>Khalid A.</strong>
            <small>Member</small>
          </div>
          <ChevronDown size={17} />
        </div>
      </aside>

      <main>
        <header className="appBar">
          <span className="appBarBrand">
            <img className="brandMark" src="/dsd-crew.png" alt="The DSD crew" />
            DSD
          </span>
          <button className="iconButton" aria-label="Search">
            <Search size={21} />
          </button>
          <button className="iconButton hasDot" aria-label="Notifications">
            <Bell size={21} />
          </button>
          <button className="avatarButton" aria-label="Your profile">
            <Avatar person={people[0]} small />
          </button>
        </header>

        <div className="content">
          {tab === "Home" ? (
            <Dashboard
              onCreate={() => setCreateOpen(true)}
              onRoles={() => setRolesOpen(true)}
            />
          ) : tab === "Calendar" ? (
            <CalendarView onCreate={() => setCreateOpen(true)} />
          ) : (
            <div className="placeholder">
              <span className="placeholderIcon">
                {tab === "Charity" ? (
                  <HeartHandshake size={30} />
                ) : (
                  <Compass size={30} />
                )}
              </span>
              <span className="eyebrow">DSD MODULE</span>
              <h1>{tab}</h1>
              <p>
                The full {tab.toLowerCase()} screen lands here. For now its most
                useful pieces show up on the home feed.
              </p>
              <button className="primaryButton" onClick={() => setTab("Home")}>
                Back home
              </button>
            </div>
          )}
        </div>
      </main>

      <nav className="tabBar">
        {tabs.slice(0, 2).map(([name, Icon]) => (
          <button
            key={name}
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
          >
            <Icon size={22} />
            {name}
          </button>
        ))}
        <button className="tabFab" onClick={() => setCreateOpen(true)}>
          <Plus size={26} />
          <span className="srOnly">Create activity</span>
        </button>
        {tabs.slice(2).map(([name, Icon]) => (
          <button
            key={name}
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
          >
            <Icon size={22} />
            {name}
          </button>
        ))}
      </nav>

      <CreateActivitySheet
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <RoleSheet open={rolesOpen} onClose={() => setRolesOpen(false)} />
    </div>
  );
}
