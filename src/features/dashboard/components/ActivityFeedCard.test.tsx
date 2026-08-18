import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { seedActivities } from "@/features/activities";
import { ActivityFeedCard } from "./ActivityFeedCard";

describe("ActivityFeedCard", () => {
  it("lets you say you are going to a casual hangout", async () => {
    const user = userEvent.setup();
    const onRsvp = vi.fn();
    const grill = seedActivities.find(
      (activity) => activity.id === "casual-grill",
    );
    if (!grill) throw new Error("missing seed");

    render(
      <ActivityFeedCard activity={grill} onRsvp={onRsvp} onRoles={vi.fn()} />,
    );

    await user.click(screen.getByRole("button", { name: /^Going$/i }));
    expect(onRsvp).toHaveBeenCalledWith("casual-grill", "yes");
  });

  it("lets you say you cannot make a casual hangout", async () => {
    const user = userEvent.setup();
    const onRsvp = vi.fn();
    const grill = seedActivities.find(
      (activity) => activity.id === "casual-grill",
    );
    if (!grill) throw new Error("missing seed");

    render(
      <ActivityFeedCard activity={grill} onRsvp={onRsvp} onRoles={vi.fn()} />,
    );

    await user.click(screen.getByRole("button", { name: /Can’t make it/i }));
    expect(onRsvp).toHaveBeenCalledWith("casual-grill", "no");
  });
});
