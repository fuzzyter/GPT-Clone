import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../src/src/Dashboard/Dashboard.jsx";
import { renderWithStore } from "../helpers/renderWithStore.jsx";

const conversations = [
  {
    id: "conversation-1",
    title: "Study chat",
    messages: [
      {
        id: "message-1",
        content: "Explain how bookmarks work in this app.",
        aiMessage: false,
      },
      {
        id: "message-2",
        content: "A bookmark saves a useful answer.",
        aiMessage: true,
        bookmarked: true,
      },
    ],
  },
  {
    id: "conversation-2",
    title: "Cooking chat",
    messages: [
      {
        id: "message-3",
        content: "Give me a pasta recipe.",
        aiMessage: false,
      },
    ],
  },
];

describe("Integration tests: dashboard feature pages", () => {
  it("searches saved conversations and opens a matching conversation", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Dashboard />, {
      conversations,
      selectedConversationId: null,
    });

    fireEvent.keyDown(window, { key: "Escape" });
    await user.click(screen.getByRole("button", { name: "Search" }));
    await user.type(screen.getByPlaceholderText("Search conversations..."), "bookmark");
    fireEvent.keyDown(screen.getByPlaceholderText("Search conversations..."), {
      code: "Enter",
    });

    expect(screen.getByText('Results: 1 for "bookmark"')).toBeTruthy();
    await user.click(screen.getByTitle("Open conversation"));

    expect(store.getState().dashboard.selectedConversationId).toBe("conversation-1");
  });

  it("opens the bookmarks page and navigates to a bookmarked message", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<Dashboard />, {
      conversations,
      selectedConversationId: null,
    });

    fireEvent.keyDown(window, { key: "Escape" });
    await user.click(screen.getByText("Bookmarks"));

    expect(screen.getByText("Results: 1")).toBeTruthy();
    expect(screen.getByText("A bookmark saves a useful answer.")).toBeTruthy();

    await user.click(screen.getByTitle("Open message"));

    expect(store.getState().dashboard.selectedConversationId).toBe("conversation-1");
  });
});
