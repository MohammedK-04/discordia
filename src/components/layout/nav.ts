import {
  CalendarDays,
  Compass,
  HeartHandshake,
  Home,
  type LucideIcon,
} from "lucide-react";

export type TabName = "Home" | "Plans" | "Calendar" | "Charity";

export type NavItem = {
  name: TabName;
  icon: LucideIcon;
  badge?: number;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { name: "Home", icon: Home },
  { name: "Plans", icon: Compass, badge: 3 },
  { name: "Calendar", icon: CalendarDays },
  { name: "Charity", icon: HeartHandshake },
];
