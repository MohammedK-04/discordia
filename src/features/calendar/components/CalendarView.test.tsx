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
});
