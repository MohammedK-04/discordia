import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateActivitySheet } from "@/features/activities";

describe("CreateActivitySheet", () => {
  it("posts a casual activity without opening the setup step", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<CreateActivitySheet open onClose={onClose} />);

    expect(screen.getByText(/Casual plans skip setup/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post to the group/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Continue/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Date")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Post to the group/i }),
    );

    expect(onClose).toHaveBeenCalledOnce();
  });
});
