import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";

const Messages = () => {
  const { selectedConversationId, conversations } = useSelector(
    (state) => state.dashboard
  );

  const scrollRef = useRef();

  const conversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const scrollToButton = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToButton, [conversation?.messages]);

  return (
    <div className="chat_messages_container">
      {conversation?.messages.map((m) => (
        <Message
          key={m.id}
          messageId={m.id}
          conversationId={conversation?.id}
          content={m.content}
          aiMessage={m.aiMessage}
          bookmarked={Boolean(m.bookmarked)}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
