import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateActivitySheet } from "@/features/activities";

describe("CreateActivitySheet", () => {
  it("posts a casual activity without opening the setup step", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onCreateCasual = vi.fn();

    render(
      <CreateActivitySheet
        open
        onClose={onClose}
        onCreateCasual={onCreateCasual}
      />,
    );

    expect(
      screen.getByRole("button", { name: /Post to the group/i }),
    ).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: /Continue/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Date$/i)).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/Activity name/i),
      "Dinner after soccer",
    );
    await user.click(
      screen.getByRole("button", { name: /Post to the group/i }),
    );

    expect(onCreateCasual).toHaveBeenCalledOnce();
    expect(onCreateCasual.mock.calls[0][0]).toMatchObject({
      title: "Dinner after soccer",
      kind: "Casual",
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("sends Recurring plans to the details step instead of posting", async () => {
    const user = userEvent.setup();
    const onCreateCasual = vi.fn();

    render(
      <CreateActivitySheet
        open
        onClose={vi.fn()}
        onCreateCasual={onCreateCasual}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Repeats on a rhythm/i }),
    );
    expect(screen.getByRole("button", { name: /Continue/i })).toBeDisabled();

    await user.type(screen.getByLabelText(/Activity name/i), "Thursday soccer");
    await user.click(screen.getByRole("button", { name: /Continue/i }));

    expect(screen.getByText("Set up the details")).toBeInTheDocument();
    expect(onCreateCasual).not.toHaveBeenCalled();
  });

  it("posts eight weekly instances from the recurring details step", async () => {
    const user = userEvent.setup();
    const onCreateRecurring = vi.fn();

    render(
      <CreateActivitySheet
        open
        onClose={vi.fn()}
        onCreateRecurring={onCreateRecurring}
      />,
    );

    await user.type(screen.getByLabelText(/Activity name/i), "Thursday soccer");
    await user.click(
      screen.getByRole("button", { name: /Repeats on a rhythm/i }),
    );
    await user.click(screen.getByRole("button", { name: /Continue/i }));

    expect(screen.getByLabelText(/First date/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Assign roles/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Post to the group/i }),
    ).toBeEnabled();

    fireEvent.change(screen.getByLabelText(/First date/i), {
      target: { value: "" },
    });

    expect(
      screen.getByRole("button", { name: /Post to the group/i }),
    ).toBeEnabled();

    await user.click(
      screen.getByRole("button", { name: /Post to the group/i }),
    );

    expect(onCreateRecurring).toHaveBeenCalledOnce();
    const series = onCreateRecurring.mock.calls[0][0] as { kind: string }[];
    expect(series).toHaveLength(8);
    expect(series[0]).toMatchObject({
      title: "Thursday soccer",
      kind: "Recurring",
    });
  });

  it("posts a planned trip from the details step", async () => {
    const user = userEvent.setup();
    const onCreatePlanned = vi.fn();

    render(
      <CreateActivitySheet
        open
        onClose={vi.fn()}
        onCreatePlanned={onCreatePlanned}
      />,
    );

    await user.type(screen.getByLabelText(/Activity name/i), "Camping weekend");
    await user.click(
      screen.getByRole("button", { name: /Roles, money, deadlines/i }),
    );
    await user.click(screen.getByRole("button", { name: /Continue/i }));
    await user.click(screen.getByRole("button", { name: /Assign roles/i }));
    await user.click(
      screen.getByRole("button", { name: /Attach group funding/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /Post to the group/i }),
    );

    expect(onCreatePlanned).toHaveBeenCalledOnce();
    expect(onCreatePlanned.mock.calls[0][0]).toMatchObject({
      title: "Camping weekend",
      kind: "Planned",
    });
    expect(onCreatePlanned.mock.calls[0][0].roles?.length).toBeGreaterThan(0);
    expect(onCreatePlanned.mock.calls[0][0].funding?.perPerson).toBe(60);
  });
});
