import React, { useState } from "react";
import NewChatButton from "./NewChatButton.jsx";
import ListItem from "./ListItem";
import BookmarksButton from "./BookmarksButton.jsx";
import DocumentsButton from "./DocumentsButton.jsx";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationId } from "../dashboardSlice";
import hambugerIcon from "../../../assets/hambuger.png";
import searchIcon from "../../../assets/search.png";

const Sidebar = ({ onSelectConversation, onOpenSearch, onOpenBookmarks, onOpenDocuments }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const conversations = useSelector((state) => state.dashboard.conversations);
  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );

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
      <div className="sidebar_top_row">
        <button
          type="button"
          className="sidebar_toggle_button"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
          title={isCollapsed ? "Open" : "Close"}
        >
          <img className="sidebar_toggle_icon" src={hambugerIcon} alt="" />
        </button>

        {!isCollapsed ? (
          <button
            type="button"
            className="sidebar_search_button"
            onClick={onOpenSearch}
            aria-label="Search"
            title="Search"
          >
            <img className="sidebar_search_icon" src={searchIcon} alt="" />
          </button>
        ) : null}
      </div>

      <div className={isCollapsed ? "sidebar_content sidebar_content_hidden" : "sidebar_content"}>
        <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
        <div className="sidebar_conversations_anchor">

          {conversations.map((c) => (
            <ListItem
              key={c.id}
              title={c.messages[0].content}
              conversationId={c.id}
              handleSetSelectedChat={handleSetSelectedChat}
              isSelected={selectedConversationId === c.id}
            />
          ))}
        </div>
        <DocumentsButton onOpenDocuments={onOpenDocuments} />
        <BookmarksButton onOpenBookmarks={onOpenBookmarks} />
        <DeleteConversationsButton />

      </div>
    </div>
  );
};

export default Sidebar;
