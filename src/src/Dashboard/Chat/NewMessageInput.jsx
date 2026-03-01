import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsSend } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { addMessage, setSelectedConversationId, sendConversationMessage } from "../dashboardSlice";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const NewMessageInput = () => {
  const [content, setContent] = useState("");
  const helpAnchorRef = useHelpAnchorRef("composer");

  const dispatch = useDispatch();

  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );

  const conversations = useSelector((state) => state.dashboard.conversations);
  const loading = useSelector((state) => state.dashboard.loading);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const proceedMessage = () => {
    if (!content.trim()) return;

    const message = {
      aiMessage: false,
      content,
      id: uuid(),
    };

    const conversationId =
      selectedConversationId === "new" ? uuid() : selectedConversationId;

    // Add user message to store
    dispatch(
      addMessage({
        conversationId,
        message,
      })
    );

    dispatch(setSelectedConversationId(conversationId));

    // Get conversation messages for context
    const conversation = conversations.find(c => c.id === conversationId);
    const conversationMessages = conversation ? conversation.messages : [];

    // Send message to AI
    dispatch(sendConversationMessage({ 
      message, 
      conversationId,
      conversationMessages 
    }));

    // Reset input
    setContent("");
  };

  const handleSendMessage = () => {
    if (content.trim().length > 0 && !loading) {
      proceedMessage();
    }
  };

  const handleKeyPressed = (event) => {
    if (event.code !== "Enter" || loading) return;
    if (event.shiftKey) return;
    if (content.trim().length === 0) return;
    event.preventDefault();
    proceedMessage();
  };

  return (
    <div ref={helpAnchorRef} className="new_message_input_container">
      <div className="new_message_input_wrap">
        <textarea
          className="new_message_input"
          rows={1}
          placeholder={loading ? "Waiting for response..." : "Send a message ..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPressed}
          disabled={loading}
        />
        <div className="new_message_icon_container" onClick={handleSendMessage}>
          <BsSend color={loading ? "lightgrey" : "grey"} />
        </div>
      </div>
    </div>
  );
};

export default NewMessageInput;
