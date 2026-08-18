import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RoleSheet } from "@/features/attendance";

describe("RoleSheet", () => {
  it("requires attendance before saving", async () => {
    const user = userEvent.setup();
    render(<RoleSheet open onClose={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /Choose Yes or No/i }),
    ).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /Yes, I’m going/i }));

    expect(
      screen.getByRole("button", { name: /Save attendance & roles/i }),
    ).toBeEnabled();
  });
});
