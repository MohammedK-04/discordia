import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { seedActivities } from "@/features/activities";
import { RoleSheet } from "@/features/attendance";

describe("RoleSheet", () => {
  it("requires attendance before saving", async () => {
    const user = userEvent.setup();
    const camping = seedActivities.find(
      (activity) => activity.id === "planned-camping",
    );
    if (!camping) throw new Error("missing seed");

    render(
      <RoleSheet
        open
        activity={camping}
        onClose={vi.fn()}
        onAttendance={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Choose Yes or No/i }),
    ).toBeDisabled();
    expect(screen.getByText(/Answer attendance first/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Yes, I’m going/i }));
  });

  it("hides roles when you say you cannot come", async () => {
    const user = userEvent.setup();
    const camping = seedActivities.find(
      (activity) => activity.id === "planned-camping",
    );
    if (!camping) throw new Error("missing seed");

    render(
      <RoleSheet
        open
        activity={{ ...camping, myRsvp: "no" }}
        onClose={vi.fn()}
        onAttendance={vi.fn()}
      />,
    );

    expect(
      screen.getByText(/won’t be asked to take a role or contribute/i),
    ).toBeInTheDocument();
    expect(screen.queryByText("Drivers")).not.toBeInTheDocument();
  });
});
