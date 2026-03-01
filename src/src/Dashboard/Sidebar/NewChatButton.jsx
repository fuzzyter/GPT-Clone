import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const NewChatButton = ({ handleSetSelectedChat }) => {
  const helpAnchorRef = useHelpAnchorRef("newChat");

  const handleChooseNewChat = () => {
    handleSetSelectedChat("new");
  };

  return (
    <div
      ref={helpAnchorRef}
      className="new_chat_button"
      onClick={handleChooseNewChat}
    >
      <div className="new_chat_button_icon">
        <AiOutlinePlus color="white" />
      </div>
      <p className="new_chat_button_text">New Chat</p>
    </div>
  );
};

export default NewChatButton;
