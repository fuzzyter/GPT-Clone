import React, { useState } from "react";
import NewChatButton from "./NewChatButton.jsx";
import ListItem from "./ListItem";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationId } from "../dashboardSlice";
import { useHelpAnchorRef } from "../Help/HelpAnchorsContext.jsx";
import hambugerIcon from "../../../assets/hambuger.png";

const Sidebar = ({ onSelectConversation }) => {
  const dispatch = useDispatch();
  const conversationsAnchorRef = useHelpAnchorRef("conversations");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const conversations = useSelector((state) => state.dashboard.conversations);

  const handleSetSelectedChat = (id) => {
    dispatch(setSelectedConversationId(id));
    if (onSelectConversation) {
      onSelectConversation();
    }
    
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={isCollapsed ? "sidebar_container sidebar_collapsed" : "sidebar_container"}>
      <button
        type="button"
        className="sidebar_toggle_button"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
        title={isCollapsed ? "Open" : "Close"}
      >

        <img className="sidebar_toggle_icon" src={hambugerIcon} alt="" />
      </button>

      <div className={isCollapsed ? "sidebar_content sidebar_content_hidden" : "sidebar_content"}>
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
    </div>
  );
};

export default Sidebar;
