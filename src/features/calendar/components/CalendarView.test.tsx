import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CalendarView } from "@/features/calendar";

describe("CalendarView", () => {
  it("filters agenda to a selected day", async () => {
    const user = userEvent.setup();
    render(<CalendarView onCreate={vi.fn()} />);

    expect(screen.getByText("On this day")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Thursday Night Soccer" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Show all/i }));

    expect(screen.getByText("Coming up")).toBeInTheDocument();
  });

  it("shows a hangout passed in from the activity list", () => {
    render(
      <CalendarView
        onCreate={vi.fn()}
        events={[
          {
            id: "casual-new",
            day: 23,
            month: 7,
            year: 2026,
            title: "Dinner after soccer",
            time: "6:30 PM",
            place: "Afro Deli",
            kind: "casual",
            iconName: "sparkles",
            attendees: 1,
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Dinner after soccer" }),
    ).toBeInTheDocument();
  });
});
