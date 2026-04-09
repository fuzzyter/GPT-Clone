import React from "react";
import { useDispatch } from "react-redux";
import { GrUser } from "react-icons/gr";
import { FcMindMap } from "react-icons/fc";
import bookmarkOff from "../../../assets/bookmark_off.png";
import bookmarkOn from "../../../assets/bookmark_on.png";
import { toggleBookmark } from "../dashboardSlice";

const Message = ({ content, aiMessage, messageId, conversationId, bookmarked }) => {
  const dispatch = useDispatch();

  const handleToggleBookmark = () => {
    if (!conversationId || !messageId) return;
    dispatch(toggleBookmark({ conversationId, messageId }));
  };

  return (
    <div
      id={messageId ? `chat-message-${messageId}` : undefined}
      className="message_container"
      style={{ background: aiMessage ? "#ebe5dd" : "#f0ede6" }}
    >
      <div className="message">
        <div className="message_bookmark_slot">
          <button
            type="button"
            className={
              bookmarked ? "message_bookmark_button is_bookmarked" : "message_bookmark_button"
            }
            onClick={handleToggleBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            title={bookmarked ? "Bookmarked" : "Bookmark"}
          >
            <img
              className="message_bookmark_icon"
              src={bookmarked ? bookmarkOn : bookmarkOff}
              alt=""
            />
          </button>
        </div>
        <div className="message_avatar_container">
          {aiMessage ? <FcMindMap /> : <GrUser />}
        </div>
        <p className="message_text">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Message;
