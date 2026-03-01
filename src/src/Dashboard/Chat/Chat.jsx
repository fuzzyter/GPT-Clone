import React from "react";
import { useSelector } from "react-redux";

import Messages from "./Messages.jsx";
import NewMessageInput from "./NewMessageInput.jsx";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const ChatLogo = () => {
  return <p className="chat_gpt_logo">MyGPT</p>;
};

const Chat = () => {
  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );
  const logoAnchorRef = useHelpAnchorRef("chatLogo");
  const messagesHelpAnchorRef = useHelpAnchorRef("messages");
  const composerHelpAnchorRef = useHelpAnchorRef("composer");

  return (
    <div className="chat_container">
      {!selectedConversationId ? (
        <>
          <div ref={logoAnchorRef} className="chat_gpt_logo_container">
            <ChatLogo />
          </div>
          <div
            ref={messagesHelpAnchorRef}
            className="chat_help_anchor_slot chat_help_anchor_messages"
            aria-hidden="true"
          />
          <div
            ref={composerHelpAnchorRef}
            className="chat_help_anchor_slot chat_help_anchor_composer"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="chat_selected_container">
          <Messages />
          <NewMessageInput />
        </div>
      )}
    </div>
  );
};

export default Chat;
