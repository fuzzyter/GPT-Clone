import React from "react";
import { BsChatLeft } from "react-icons/bs";

const ListItem = (props) => {
  const { title, handleSetSelectedChat, conversationId, isSelected } = props;

  return (
    <div
      className={isSelected ? "list_item list_item_selected" : "list_item"}
      onClick={() => handleSetSelectedChat(conversationId)}
    >
      <div className="list_item_icon">
        <BsChatLeft color="white" />
      </div>
      <p className="list_item_text">{title}</p>
    </div>
  );
};

export default ListItem;
