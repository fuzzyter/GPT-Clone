import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../src/src/Dashboard/Dashboard.jsx";
import { renderWithStore } from "../helpers/renderWithStore.jsx";

const { sendMessageToAI } = vi.hoisted(() => ({
  sendMessageToAI: vi.fn(async () => "Mock AI response"),
}));

vi.mock("../../src/src/services/openaiService.js", () => ({
  sendMessageToAI,
}));

describe("Acceptance tests: user requirements", () => {
  it("meets R1 by showing and closing the help overlay", async () => {
    const user = userEvent.setup();
    renderWithStore(<Dashboard />);

    expect(screen.getByText("Help: shows short tips for controls.")).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByText("Help: shows short tips for controls.")
    ).toBeNull();

    await user.click(screen.getByRole("button", { name: "Open help" }));
    expect(screen.getByText("Help: shows short tips for controls.")).toBeTruthy();
  });

  it("meets R6 by saving a document and sending it with a prompt", async () => {
    const user = userEvent.setup();
    renderWithStore(<Dashboard />);

    fireEvent.keyDown(window, { key: "Escape" });
    await user.click(screen.getByText("Documents"));
    await user.click(screen.getByTitle("Add document"));
    await user.type(
      screen.getByPlaceholderText("Write your document..."),
      "My saved project notes"
    );
    await user.click(screen.getByText("Save"));

    expect(localStorage.getItem("documents")).toContain("My saved project notes");

    await user.click(screen.getByRole("button", { name: "Back" }));
    await user.click(screen.getByText("New Chat"));
    await user.click(screen.getByRole("button", { name: "Insert documents" }));
    await user.click(screen.getByText("My saved project notes"));

    expect(screen.getByText("1 doc selected")).toBeTruthy();

    const promptInput = screen.getByPlaceholderText("Send a message ...");
    await user.type(promptInput, "Summarize this document");
    fireEvent.keyDown(promptInput, { code: "Enter" });

    await waitFor(() => {
      expect(sendMessageToAI).toHaveBeenCalled();
    });

    const sentMessages = sendMessageToAI.mock.calls[0][0];
    expect(sentMessages[0].content).toContain("Summarize this document");
    expect(sentMessages[0].content).toContain("Referenced documents:");
    expect(sentMessages[0].content).toContain("My saved project notes");
  });
});
