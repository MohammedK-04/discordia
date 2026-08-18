import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { seedPolls } from "@/features/polls";
import { QuickPollCard } from "@/features/dashboard";

describe("QuickPollCard", () => {
  it("selects a poll option when clicked", async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();
    render(<QuickPollCard poll={seedPolls[0]!} onVote={onVote} />);

    await user.click(screen.getByRole("button", { name: /Nashville Coop/i }));
    expect(onVote).toHaveBeenCalledWith("poll-food", "Nashville Coop");
  });
});
