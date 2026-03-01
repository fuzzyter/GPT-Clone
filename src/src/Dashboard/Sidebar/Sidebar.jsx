import React from "react";
import NewChatButton from "./NewChatButton.jsx";
import ListItem from "./ListItem";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationId } from "../dashboardSlice";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const conversationsAnchorRef = useHelpAnchorRef("conversations");

  const conversations = useSelector((state) => state.dashboard.conversations);

  const handleSetSelectedChat = (id) => {
    dispatch(setSelectedConversationId(id));
  };

  return (
    <div className="sidebar_container">
      <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
      <div ref={conversationsAnchorRef} className="sidebar_conversations_anchor">
        {conversations.map((c) => (
          <ListItem
            key={c.id}
            title={c.messages[0].content}
            conversationId={c.id}
            handleSetSelectedChat={handleSetSelectedChat}
          />
        ))}
      </div>
      <DeleteConversationsButton />
    </div>
  );
};

export default Sidebar;
