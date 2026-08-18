import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { QuickPollCard } from "@/features/dashboard";

describe("QuickPollCard", () => {
  it("selects a poll option when clicked", async () => {
    const user = userEvent.setup();
    render(<QuickPollCard />);

    const option = screen.getByRole("button", { name: /Nashville Coop/i });
    await user.click(option);

    expect(option.className).toMatch(/voted/);
  });
});
