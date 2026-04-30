import { describe, expect, it } from "vitest";
import dashboardReducer, {
  addMessage,
  deleteConversations,
  renameConversationTitle,
  setSelectedConversationId,
  toggleBookmark,
} from "../../src/src/Dashboard/dashboardSlice.js";

describe("Unit tests: dashboard reducer", () => {
  it("creates a conversation when a message is added to a new conversation", () => {
    const state = dashboardReducer(
      undefined,
      addMessage({
        conversationId: "conversation-1",
        message: {
          id: "message-1",
          content: "Hello",
          aiMessage: false,
        },
      })
    );

    expect(state.conversations).toHaveLength(1);
    expect(state.conversations[0].id).toBe("conversation-1");
    expect(state.conversations[0].messages[0].content).toBe("Hello");
  });

  it("updates the selected conversation id", () => {
    const state = dashboardReducer(
      undefined,
      setSelectedConversationId("conversation-2")
    );

    expect(state.selectedConversationId).toBe("conversation-2");
  });

  it("toggles a bookmark on a message", () => {
    const initialState = {
      conversations: [
        {
          id: "conversation-1",
          messages: [
            {
              id: "message-1",
              content: "Important answer",
              aiMessage: true,
            },
          ],
        },
      ],
      selectedConversationId: "conversation-1",
      loading: false,
      error: null,
    };

    const bookmarkedState = dashboardReducer(
      initialState,
      toggleBookmark({ conversationId: "conversation-1", messageId: "message-1" })
    );

    expect(bookmarkedState.conversations[0].messages[0].bookmarked).toBe(true);

    const unbookmarkedState = dashboardReducer(
      bookmarkedState,
      toggleBookmark({ conversationId: "conversation-1", messageId: "message-1" })
    );

    expect(unbookmarkedState.conversations[0].messages[0].bookmarked).toBe(false);
  });

  it("renames a conversation title", () => {
    const initialState = {
      conversations: [
        {
          id: "conversation-1",
          title: "Old title",
          messages: [],
        },
      ],
      selectedConversationId: "conversation-1",
      loading: false,
      error: null,
    };

    const state = dashboardReducer(
      initialState,
      renameConversationTitle({
        conversationId: "conversation-1",
        title: "New title",
      })
    );

    expect(state.conversations[0].title).toBe("New title");
  });

  it("deletes all conversations and clears the selected conversation", () => {
    const initialState = {
      conversations: [{ id: "conversation-1", messages: [] }],
      selectedConversationId: "conversation-1",
      loading: false,
      error: null,
    };

    const state = dashboardReducer(initialState, deleteConversations());

    expect(state.conversations).toEqual([]);
    expect(state.selectedConversationId).toBeNull();
  });
});
