"use client";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Car,
  Clock3,
  HeartHandshake,
  MapPin,
  Plus,
  Sparkles,
  UserPlus,
  Utensils,
} from "lucide-react";
import { Avatar, AvatarStack } from "@/components/shared/avatar";
import ui from "@/components/shared/styles.module.css";
import { people } from "@/lib/data/people";
import { QuickPollCard } from "./QuickPollCard";
import styles from "../styles.module.css";

type DashboardProps = {
  onCreate: () => void;
  onRoles: () => void;
};

export function Dashboard({ onCreate, onRoles }: DashboardProps) {
  return (
    <>
      <header className={styles.greeting}>
        <span className={ui.eyebrow}>MONDAY, AUGUST 17</span>
        <h1>Good evening, Khalid.</h1>
        <p>Here’s what the group is moving on.</p>
      </header>

      <button className={styles.attentionCard} onClick={onRoles}>
        <span className={styles.attentionIcon}>
          <Bell size={19} />
        </span>
        <span className={styles.attentionText}>
          <strong>2 things need you</strong>
          <small>Camping roles close tomorrow · Soccer RSVP due today</small>
        </span>
        <ArrowRight size={18} />
      </button>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>DECIDE TODAY</span>
          <h2>Quick decisions</h2>
        </div>
        <button className={ui.outlineButton}>
          <Plus size={16} /> New poll
        </button>
      </div>

      <div className={styles.pollGrid}>
        <QuickPollCard />
        <article className={`${ui.card} ${styles.pollCard}`}>
          <div className={ui.cardHead}>
            <span className={`${styles.liveBadge} ${styles.liveBadgeViolet}`}>
              <Clock3 size={13} /> 37 MIN LEFT
            </span>
          </div>
          <h3>Which field for Thursday?</h3>
          <p className={ui.sub}>Started by Omar · 9 votes</p>
          <div className={styles.pollOptions}>
            <button className={styles.pollOption}>
              <span className={styles.pollFill} style={{ width: "67%" }} />
              <span className={styles.pollName}>
                <span className={`${ui.radio} ${ui.radioSmall}`} />
                Bossen Field
              </span>
              <span className={styles.pollVotes}>6</span>
            </button>
            <button className={styles.pollOption}>
              <span className={styles.pollFill} style={{ width: "33%" }} />
              <span className={styles.pollName}>
                <span className={`${ui.radio} ${ui.radioSmall}`} />
                Currie Park
              </span>
              <span className={styles.pollVotes}>3</span>
            </button>
          </div>
          <div className={ui.cardFoot}>
            <div className={ui.footMeta}>
              <AvatarStack count={3} extra={6} />
              <span>9 friends voted</span>
            </div>
            <button className={ui.linkButton}>
              Details <ArrowRight size={15} />
            </button>
          </div>
        </article>
      </div>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>COMING UP</span>
          <h2>Activities</h2>
        </div>
        <button className={ui.linkButton}>
          View all <ArrowRight size={15} />
        </button>
      </div>

      <div className={styles.activityGrid}>
        <article className={`${ui.card} ${styles.activityCard}`}>
          <div className={`${styles.activityImage} ${styles.campingImage}`}>
            <div className={styles.cardTags}>
              <span className={`${styles.tag} ${styles.tagAction}`}>
                ACTION REQUIRED
              </span>
              <span className={`${styles.tag} ${styles.tagPlanned}`}>
                PLANNED TRIP
              </span>
            </div>
            <div className={styles.dateTile}>
              <b>29</b>
              <span>AUG</span>
            </div>
          </div>
          <div className={styles.activityBody}>
            <div className={styles.hostLine}>
              <Avatar person={people[1]} small />
              <span>Organized by Omar</span>
            </div>
            <h3>North Shore Camping Weekend</h3>
            <p className={styles.detailLine}>
              <CalendarDays size={16} /> Aug 29–31
              <span className={ui.dot} />
              <MapPin size={16} /> Tettegouche
            </p>
            <div className={styles.panel}>
              <div className={styles.panelTop}>
                <span>Roles filled</span>
                <b>8 of 12</b>
              </div>
              <div className={ui.progress}>
                <span style={{ width: "66%" }} />
              </div>
              <div className={styles.needList}>
                <span>
                  <Car size={15} /> 2 drivers
                </span>
                <span>
                  <Utensils size={15} /> 1 cook
                </span>
                <span className={styles.maybeChip}>3 maybes</span>
              </div>
            </div>
            <button
              className={`${ui.primaryButton} ${ui.block}`}
              onClick={onRoles}
            >
              Pick up a role <ArrowRight size={17} />
            </button>
            <div className={ui.cardFoot}>
              <div className={ui.footMeta}>
                <AvatarStack count={4} extra={4} />
                <span>12 going</span>
              </div>
              <span className={styles.deadline}>Locks Aug 22, 5 PM</span>
            </div>
          </div>
        </article>

        <article className={`${ui.card} ${styles.activityCard}`}>
          <div className={`${styles.activityImage} ${styles.soccerImage}`}>
            <div className={styles.cardTags}>
              <span className={`${styles.tag} ${styles.tagRecurring}`}>
                ↻ RECURRING
              </span>
            </div>
            <div className={styles.dateTile}>
              <b>20</b>
              <span>AUG</span>
            </div>
          </div>
          <div className={styles.activityBody}>
            <div className={styles.hostLine}>
              <Avatar person={people[2]} small />
              <span>Hosted by Yusuf</span>
            </div>
            <h3>Thursday Night Soccer</h3>
            <p className={styles.detailLine}>
              <Clock3 size={16} /> 7:00 PM
              <span className={ui.dot} />
              <MapPin size={16} /> Bossen Field
            </p>
            <div className={`${styles.panel} ${styles.panelLime}`}>
              <div className={styles.panelTop}>
                <span>11 going</span>
                <b>Need 3 more</b>
              </div>
              <div className={ui.progress}>
                <span style={{ width: "78%" }} />
              </div>
            </div>
            <div className={ui.splitButtons}>
              <button className={ui.primaryButton}>I’m in</button>
              <button className={ui.outlineButton}>Can’t make it</button>
            </div>
            <div className={ui.cardFoot}>
              <div className={ui.footMeta}>
                <AvatarStack count={4} extra={7} />
                <span>Weekly run</span>
              </div>
              <span className={styles.deadline}>RSVP by 5:00 PM</span>
            </div>
          </div>
        </article>

        <article className={`${ui.card} ${styles.activityCard}`}>
          <div className={`${styles.activityImage} ${styles.hangoutImage}`}>
            <div className={styles.cardTags}>
              <span className={`${styles.tag} ${styles.tagCasual}`}>
                ✦ CASUAL
              </span>
            </div>
            <div className={styles.dateTile}>
              <b>22</b>
              <span>AUG</span>
            </div>
          </div>
          <div className={styles.activityBody}>
            <div className={styles.hostLine}>
              <Avatar person={people[3]} small />
              <span>Hosted by Ibrahim</span>
            </div>
            <h3>Backyard Grill & Hangout</h3>
            <p className={styles.detailLine}>
              <Clock3 size={16} /> 6:30 PM
              <span className={ui.dot} />
              <MapPin size={16} /> Ibrahim’s place
            </p>
            <div className={styles.casualNote}>
              <Sparkles size={18} />
              <span>No roles, no pressure. Bring something if you want.</span>
            </div>
            <div className={ui.splitButtons}>
              <button className={ui.primaryButton}>Going</button>
              <button className={ui.outlineButton}>Maybe</button>
            </div>
          </div>
        </article>
      </div>

      <div className={styles.sectionHead}>
        <div>
          <span className={ui.eyebrow}>GIVING TOGETHER</span>
          <h2>Charity</h2>
        </div>
      </div>

      <div className={styles.charityGrid}>
        <section className={`${ui.card} ${styles.charityCard}`}>
          <div className={styles.fundTop}>
            <span className={styles.charityIcon}>
              <HeartHandshake size={22} />
            </span>
            <div>
              <span className={ui.eyebrow}>AUGUST SADAQA</span>
              <strong>Help furnish a family’s new home</strong>
            </div>
          </div>
          <p className={ui.sub}>
            $1,420 raised by 18 friends · 4 days left to give
          </p>
          <div className={`${ui.progress} ${ui.progressRose}`}>
            <span style={{ width: "84%" }} />
          </div>
          <div className={ui.splitButtons}>
            <button className={ui.darkButton}>Give now</button>
            <button className={ui.outlineButton}>Nominate</button>
          </div>
        </section>
      </div>

      <section className={`${ui.card} ${styles.inviteRow}`}>
        <span className={styles.inviteIcon}>
          <UserPlus size={20} />
        </span>
        <div>
          <strong>DSD is invite only</strong>
          <small>
            Bring in someone you trust. They’ll need your invite link.
          </small>
        </div>
        <button className={ui.outlineButton}>Invite</button>
      </section>
    </>
  );
}
