import React, { useEffect, useState } from "react";
import { BsChatLeft } from "react-icons/bs";
import pencilIcon from "../../../assets/pencil.png";

const ListItem = (props) => {
  const {
    title,
    handleSetSelectedChat,
    conversationId,
    isSelected,
    onRenameConversation,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  useEffect(() => {
    if (!isEditing) {
      setEditingTitle(title);
    }
  }, [title, isEditing]);

  const startEditing = (event) => {
    event.stopPropagation();
    setEditingTitle(title);
    setIsEditing(true);
  };

  const saveTitle = () => {
    const nextTitle = editingTitle.trim();
    if (!nextTitle) {
      setEditingTitle(title);
      setIsEditing(false);
      return;
    }

    if (nextTitle !== title) {
      onRenameConversation(conversationId, nextTitle);
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditingTitle(title);
    setIsEditing(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveTitle();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  };

  return (
    <div
      className={isSelected ? "list_item list_item_selected" : "list_item"}
      onClick={() => handleSetSelectedChat(conversationId)}
    >
      <div className="list_item_icon">
        <BsChatLeft color="white" />
      </div>
      {isEditing ? (
        <input
          className="list_item_title_input"
          value={editingTitle}
          autoFocus
          onChange={(event) => setEditingTitle(event.target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={saveTitle}
          onClick={(event) => event.stopPropagation()}
          aria-label="Edit conversation title"
        />
      ) : (
        <p className="list_item_text">{title}</p>
      )}
      
      {!isEditing ? (
        <button
          type="button"
          className="list_item_edit_button"
          onClick={startEditing}
          aria-label="Edit conversation title"
          title="Edit title"
        >
          <img className="list_item_edit_icon" src={pencilIcon} alt="" />
        </button>
      ) : null}
    </div>
  );
};

export default ListItem;
