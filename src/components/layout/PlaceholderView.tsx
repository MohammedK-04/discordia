"use client";

import { Compass, HeartHandshake } from "lucide-react";
import ui from "@/components/shared/styles.module.css";
import layout from "./layout.module.css";
import type { TabName } from "./nav";

type PlaceholderViewProps = {
  tab: TabName;
  onGoHome: () => void;
};

export function PlaceholderView({ tab, onGoHome }: PlaceholderViewProps) {
  return (
    <div className={layout.placeholder}>
      <span className={layout.placeholderIcon}>
        {tab === "Charity" ? (
          <HeartHandshake size={30} />
        ) : (
          <Compass size={30} />
        )}
      </span>
      <span className={ui.eyebrow}>DSD MODULE</span>
      <h1>{tab}</h1>
      <p>
        The full {tab.toLowerCase()} screen lands here. For now its most useful
        pieces show up on the home feed.
      </p>
      <button
        className={`${ui.primaryButton} ${layout.placeholderAction}`}
        onClick={onGoHome}
      >
        Back home
      </button>
    </div>
  );
}
