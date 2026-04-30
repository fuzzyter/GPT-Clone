import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../src/src/Dashboard/Dashboard.jsx";
import { renderWithStore } from "../helpers/renderWithStore.jsx";

describe("Regression tests: existing conversation controls", () => {
  it("keeps conversation title editing working", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Dashboard />, {
      conversations: [
        {
          id: "conversation-1",
          title: "Original title",
          messages: [
            {
              id: "message-1",
              content: "First message",
              aiMessage: false,
            },
          ],
        },
      ],
      selectedConversationId: "conversation-1",
    });

    fireEvent.keyDown(window, { key: "Escape" });
    await user.click(screen.getByTitle("Edit title"));

    const input = screen.getByLabelText("Edit conversation title");
    await user.clear(input);
    await user.type(input, "Updated title");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(store.getState().dashboard.conversations[0].title).toBe("Updated title");
    expect(screen.getByText("Updated title")).toBeTruthy();
  });

  it("keeps delete conversations working", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Dashboard />, {
      conversations: [
        {
          id: "conversation-1",
          title: "Chat to delete",
          messages: [],
        },
      ],
      selectedConversationId: "conversation-1",
    });

    fireEvent.keyDown(window, { key: "Escape" });
    localStorage.setItem("conversations", JSON.stringify([{ id: "conversation-1" }]));

    await user.click(screen.getByText("Delete conversations"));

    expect(store.getState().dashboard.conversations).toEqual([]);
    expect(store.getState().dashboard.selectedConversationId).toBeNull();
    expect(localStorage.getItem("conversations")).toBeNull();
  });

  it("keeps the settings font size preference persistent", async () => {
    const user = userEvent.setup();
    renderWithStore(<Dashboard />);

    fireEvent.keyDown(window, { key: "Escape" });
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("button", { name: "Increase font size" }));

    expect(screen.getByText("15px")).toBeTruthy();
    expect(localStorage.getItem("uiFontSize")).toBe("15");
    expect(document.documentElement.style.getPropertyValue("--ui-font-size")).toBe(
      "15px"
    );
  });
});
